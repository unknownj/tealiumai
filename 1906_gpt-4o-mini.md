# Tealium iQ Extension Documentation: Cookie Audit

## 1. Extension Overview

- **Name**: Cookie Audit
- **ID**: 1906
- **Type**: Javascript Code
- **Scope**: 928
- **Execution Frequency**: Active

### Summary
The **Cookie Audit** extension retrieves a random cookie name from the document's cookie storage. It does so by splitting the cookie string into individual cookies, extracting their names, and selecting one at random. This is useful for analytics purposes where understanding cookie usage can inform about user sessions or preferences. 

## 2. Code Explanation

### Key Variables
- **`b`**: This is expected to be the global object provided by Tealium where the extension writes its output.
- **`CookieAuditName`**: A property added to the `b` object that stores a randomly selected cookie name.

### Logic Flow
1. The outer function is executed immediately with parameters that are expected to come from the Tealium environment.
2. Inside the function, the `document.cookie` string is split into individual cookies using the `split("; ")` method.
3. The names (keys) of these cookies are obtained by further splitting each cookie string at the `=` character.
4. A random index is generated using `Math.random()` multiplied by the length of the cookie names array, and `Math.floor` ensures it is a valid index.
5. The randomly selected cookie name is assigned to `b.CookieAuditName`.

### Dependencies
- **Global Objects**: The extension relies on the `document` object to access the cookies.
- **Tealium Global Object**: The `b` object is assumed to be provided by the Tealium environment to store the output.

## 3. Usage Examples

### Normal Flow
When the extension is triggered (e.g., on page load):
- It retrieves all available cookie names from the browser's cookies.
- It picks one at random and assigns it to `b.CookieAuditName`.

Example: If the cookies are `session_id=abc123; user_id=xyz456; preferences=dark_mode`, a possible output could be:
```javascript
b.CookieAuditName = "user_id";
```

### Edge Conditions
- If no cookies are present: 
  - The `document.cookie` string would be empty, leading to an empty array of cookie names. The assignment to `b.CookieAuditName` would result in `undefined`.

Example: If there are no cookies, the output would be:
```javascript
b.CookieAuditName = undefined;
```

## 4. Known Limitations & Gotchas

- The extension assumes that the `document.cookie` string will always return a valid cookie format. Malformed cookies could lead to unexpected behaviour.
- There is no handling for the case where there are no cookies, which could inadvertently set `b.CookieAuditName` to `undefined`.
- If other extensions or scripts manipulate cookies at the same time (for example, during user sessions), the cookie names retrieved may not reflect the user's current state accurately.

## 5. Recommendations for Refactoring

- **Defensive Checks**: Add validation to ensure that `document.cookie` contains valid cookies before attempting to split and process them. 
- **Code Style**: Consider breaking down the logic into smaller functions for readability and maintainability, for instance:
  - A function for retrieving cookie names
  - A function for selecting a random cookie name
- **Modularisation**: While the current setup fits within a single function, introducing modularisation can enhance testability and reuse.

### Example of Suggested Refactoring
```javascript
function getCookieNames() {
    return document.cookie.split("; ").map(function(cookie) {
        return cookie.split("=")[0];
    });
}

function selectRandomCookieName(cookieNames) {
    if (cookieNames.length === 0) return undefined;
    let randomIndex = Math.floor(Math.random() * cookieNames.length);
    return cookieNames[randomIndex];
}

(function(a, b, u) {
    var cookieNames = getCookieNames();
    b.CookieAuditName = selectRandomCookieName(cookieNames);
})(eventType, eventPayload, tagObject);
```

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly review the extension for compatibility with new cookie storage standards or changes in browser behaviour regarding cookies.
- **Ownership**: Assign a lead developer responsible for overseeing updates and ensuring that the extension remains functional with any related analytics processes.
- **Testing Guidelines**: Develop unit tests to cover both normal and edge cases, such as validating the output for scenarios with varying numbers of cookies and their formats. Consider implementing integration tests alongside any related tracking features.

By adhering to the guidelines and suggestions outlined in this document, developers can ensure that the **Cookie Audit** extension remains robust, maintainable, and efficient in its purpose.