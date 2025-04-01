# Cardnet Webchat Test – Tealium iQ Extension Documentation

## 1. Extension Overview

- **Extension Name**: Cardnet Webchat Test  
- **Extension ID**: 100036  
- **Extension Type**: JavaScript Code  
- **Scope**: Before Load Rules  
- **Execution Frequency**: Run Always  
- **Status**: Active  

**Summary**  
This extension injects a custom Salesforce webchat (Cardnet) onto the page when a particular search query parameter is present (`cardnetwebchat=test`). It appends a style block to style the chat elements, initialises Salesforce’s `embedded_svc` functionality, and dynamically loads the required external chat scripts.

## 2. Code Explanation

Below is a high-level walkthrough of the code and its purpose:

1. **Condition Check**  
   ```js
   if (b.Q("search.toLowerCase contains cardnetwebchat=test")) {
       // ...
   }
   ```
   - The extension checks if the URL’s search query string contains `cardnetwebchat=test`. If found, the rest of the script executes to initialise the Cardnet webchat environment.

2. **Setting a Data Layer Variable**  
   ```js
   b.WebchatPlatformOverride = "NewCardnet";
   ```
   - Creates or assigns the variable `WebchatPlatformOverride` (presumably within the `b` object, which is the Tealium data layer) to `"NewCardnet"`. This can be used downstream to identify or customise processing based on the chat platform.

3. **Safety Check for `window.initESW`**  
   ```js
   if (!window.initESW) {
       // ...
   }
   ```
   - Prevents re-defining the `initESW` function if it already exists on the page.

4. **Creating a Style Tag**  
   ```js
   var sS = document.createElement("style");
   sS.textContent = [ /* custom CSS rules */ ].join("\n\n");
   document.head.appendChild(sS);
   ```
   - Injects styling for the Salesforce webchat UI. The CSS adjusts the colours, outlines, and text for chat buttons and modal text.

5. **Defining `initESW`**  
   ```js
   window.initESW = function(gslbBaseURL) {
       window.embedded_svc.settings.displayHelpButton = true;
       window.embedded_svc.settings.language = '';
       window.embedded_svc.settings.enabledFeatures = ['LiveAgent'];
       window.embedded_svc.settings.entryFeature = 'LiveAgent';
       // ...
       window.embedded_svc.init(/* ... */);
   };
   ```
   - This function configures Salesforce’s Embedded Service SDK. Key configurations include enabling the help button, specifying features, and hooking up direct routing logic based on user input. `initESW` calls the `embedded_svc.init(...)` method with environment-specific parameters:
     - URL references to Salesforce endpoints
     - A deployment ID, button ID, and other details that link the chat window to the correct Salesforce chat instance

6. **Loading Chat Scripts Dynamically**  
   ```js
   var loadChatScript = function(src, callback) {
       var s = document.createElement('script');
       s.setAttribute('src', src);
       s.onload = callback;
       document.body.appendChild(s);
   };
   ```
   - A helper function to create and load script tags on the fly. Once loaded, it calls the provided callback.

7. **Script Loading Flow**  
   ```js
   loadChatScript("https://service.force.com/embeddedservice/5.0/esw.min.js", function(){
       if (!window.embedded_svc) {
         loadChatScript("https://firstforce--macaw.sandbox.my.salesforce.com/embeddedservice/5.0/esw.min.js", function(){
           window.initESW(null);
         });
       } else {
         window.initESW('https://service.force.com');
       }
   });
   ```
   - The script first attempts to load `esw.min.js` from `service.force.com`. If `window.embedded_svc` is not available after loading, it tries another endpoint (`firstforce--macaw.sandbox.my.salesforce.com`). After successful loading, it invokes `window.initESW`, passing either a `null` or `'https://service.force.com'` base URL.

**Dependencies**  
- **Tealium Data Layer (`b`)**: The extension uses `b.Q(...)` for the condition and sets `b.WebchatPlatformOverride`.  
- **Global Objects**: Uses `window` for `initESW` and references `document` for DOM manipulation.  
- **Salesforce Scripts**: Relies on Salesforce’s Embedded Service scripts (`esw.min.js`) to function.

## 3. Usage Examples

Below are scenarios illustrating how the extension behaves:

- **Scenario 1: Query Parameter Present**  
  - URL: `https://example.com?cardnetwebchat=test`  
  - The search query is checked, the condition is satisfied, and the script runs. A new style block is injected, the Salesforce chat scripts are loaded, and a help button is displayed on the page.

- **Scenario 2: Query Parameter Absent**  
  - URL: `https://example.com` (no `cardnetwebchat=test`)  
  - The condition is not met, so the extension remains dormant. No chat scripts are loaded, and the user does not see any changes.

- **Scenario 3: Failing First Script Load**  
  - In the event that `https://service.force.com/embeddedservice/5.0/esw.min.js` fails to load (e.g., network issues), the fallback script from `https://firstforce--macaw.sandbox.my.salesforce.com/embeddedservice/5.0/esw.min.js` is attempted, ensuring a second chance for the chat to initialise.

- **Edge Case**:  
  - If an ad blocker or script blocker is preventing Salesforce scripts from loading, the code tries both sources. If both fail, the chat will not initialise.

## 4. Known Limitations & Gotchas

- **Reliance on External Scripts**  
  - If both Salesforce script URLs fail to load, the chat widget will not display.  
- **Condition-based Execution**  
  - The code only runs when `cardnetwebchat=test` exists in the query string. Any mis-spelling or different casing of the parameter will prevent the code from executing.  
- **Potential Styling Conflicts**  
  - The injected style rules could conflict with other existing styles if there are naming collisions, or if other code manipulates `.embeddedServiceHelpButton` elements.  
- **Intended Use**  
  - Designed to work in a standard browser setting. If a user’s environment blocks or modifies `document.head` insertion, chat customisation may fail.

## 5. Recommendations for Refactoring

- **Centralise Salesforce Settings**  
  - Consider moving URL paths (e.g., `https://service.force.com`, `https://firstforce--macaw.sandbox.my.salesforce.com`) and deployment details into easily maintainable variables to make updates simpler should endpoints change.
- **Reduce Duplication**  
  - The logic that loads scripts could be further modularised—particularly the fallback routine for `embedded_svc`.  
- **Styling Management**  
  - If more custom CSS is required in the future, consider grouping styles in a single object or separate dedicated file for clarity.
- **Defensive Checks (Within ES5)**  
  - Although `eventType` and `eventPayload` are guaranteed, ensure that potential global objects like `document` and `window` are referenced safely in older environments if there are known constraints. (Although typical browsers do not require additional checks here, it is sometimes prudent to confirm their existence.)

## 6. Maintenance & Further Notes

- **Ownership & Updates**  
  - This extension interacts heavily with external Salesforce resources. Any changes in the Salesforce environment (new deployment IDs, new domain, etc.) will require timely updates within the extension.
- **Testing Guidelines**  
  - Test in a variety of browsers (Internet Explorer, older versions of Chrome, etc.) to ensure ES5 compatibility.  
  - Verify the fallback logic regularly by artificially failing the first script load in a staging or QA environment.  
  - Confirm that the style injection does not inadvertently overwrite desired page elements or conflict with other styling.  
- **Version Tracking**  
  - Keep a record of any changes to the URL endpoints, deployment IDs, or style rules. Communicate changes to relevant stakeholders to maintain consistent behaviour across environments.

