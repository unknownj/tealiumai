var fs = require('fs').promises;

var config = {
    apiEndpoint: "platform.tealiumapis.com",
    user: "",
    key: "",
    token: undefined,
    account: "",
    profile: ""
};

async function tiqAuth(){
    if(config.token) return true;

    var authEndpoint = `https://${config.apiEndpoint}/v3/auth/accounts/${config.account}/profiles/${config.profile}`;
    var authPayload = {
        username: config.user,
        key: config.key
    };

    var response = await fetch(authEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: Object.keys(authPayload).map(key => `${key}=${authPayload[key]}`).join('&')
    });

    var responseData = await response.json();

    if(responseData.host && responseData.host !== config.apiEndpoint){
        config.apiEndpoint = responseData.host;
    }

    config.token = responseData.token;

    return true;
};

async function getProfile(){

    await tiqAuth();

    var inclusions = [
        "loadRules",
        "tags",
        "extensions",
        "variables",
        "events",
        "versionIDs"
    ];

    var baseProfileEndpoint = `https://${config.apiEndpoint}/v3/tiq/accounts/${config.account}/profiles/${config.profile}`;

    var profileEndpoint = `${baseProfileEndpoint}?${ inclusions.map(function(inclusion){ return "includes=" + inclusion; }).join("&") }`;

    var profileData = await fetch(profileEndpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${config.token}`
        }
    });

    var profileObject = await profileData.json();

    return profileObject;

};

async function writeObjectToHistoryFolder(filename, obj){
    var historyFolder = "./history/";
    var filename = filename.split(".json").join("") + ".json";

    await fs.writeFile(historyFolder + filename, JSON.stringify(obj, null, 2));

};

var sortObjectKeys = function(obj){
    if(typeof obj === "object" && obj !== null && !Array.isArray(obj)){
        return Object.keys(obj).sort().reduce(function(acc, key){
            acc[key] = sortObjectKeys(obj[key]);
            return acc;
        }, {});
    } else if(Array.isArray(obj)){
        return obj.map(sortObjectKeys);
    } else {
        return obj;
    }
};

(async function(){

    var mainProfile = sortObjectKeys(await getProfile());

    writeObjectToHistoryFolder("main", mainProfile);
    writeObjectToHistoryFolder("extensions", mainProfile.extensions);

    for(var i = 0; i < mainProfile.extensions.length; i++){

        var extension = mainProfile.extensions[i];

        var id, code, topComment;

        if(extension && extension.id && extension.configuration && extension.configuration.code){

            id = extension.id;
            code = extension.configuration.code;

        } else if (extension && extension.id && extension.configuration && extension.configuration.codeDevData && extension.configuration.codeDevData.promotedSnippets){
            var snippets = extension.configuration.codeDevData.promotedSnippets;
            for(var snippetName in snippets){
                if(snippets[snippetName].name === "prod"){
                    id = extension.id;
                    code = snippets[snippetName].code;
                }
            }
        }

        if(id && code){
            var configCopy = {};
            for(var configItem in extension){
                if(configItem !== "configuration" && configItem !== "selectedTargets" && configItem !== "environmentVersions"){
                    configCopy[configItem] = extension[configItem];
                }
            }
            topComment = JSON.stringify(configCopy,null,2).split("\n").map(function(line){ return "// " + line; }).join("\n");

            if(extension.scope){
                if(extension.scope === "Before Load Rules"){
                   code = "(function(a,b){\n" + code + "\n})(eventType, eventPayload);";
                } else if(extension.scope === "After Load Rules"){
                    code = "(function(a,b){\n" + code + "\n})(eventType, eventPayload);";
                } else if(extension.scope === "After Tags"){
                    code = "(function(a,b){\n" + code + "\n})(eventType, eventPayload);";
                } else if(!isNaN(extension.scope) || extension.scope.indexOf(",") >= 0){
                    code = "(function(a,b,u){\n" + code + "\n})(eventType, eventPayload, tagObject);";
                }
            }

            if(extension.status !== "inactive") await fs.writeFile(`./extensions/${id}.js`, `${topComment}\n\n${code}`);
        }

    }

})();