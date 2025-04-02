# Tealium iQ Extension: Celebrus Load Trigger

## 1. Extension Overview
- **Name**: Celebrus Load Trigger
- **ID**: 1909
- **Type**: JavaScript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The Celebrus Load Trigger JavaScript extension detects specific query parameters in the URL and sets cookies accordingly. It then conditionally loads various scripts based on the cookie values. The main purpose of this extension is to control the loading of the Celebrus SDK and relevant Tealium tags depending on the environment (development, preproduction, production, or snippet) specified in the query parameters.

## 2. Code Explanation

### Key Variables
- **window.location.search**: Contains the query string of the URL, used to determine the environment mode.
- **document.cookie**: Utilised to store the environment setting based on the URL query parameters.
- **scriptElement**: A JavaScript DOM element used to dynamically load other script files.

### Logic Flow
1. **URL Parameter Detection**: The code checks for the presence of `enableCelebrus=true`, `enableCelebrus=dev`, `enableCelebrus=preprod`, `enableCelebrus=prod`, or `enableCelebrus=snippet` in the URL.
2. **Cookie Setting**: Corresponding cookies are set based on the detected query parameters.
3. **Script Loading**: 
   - If `enableCelebrus=true` is set, the general Celebrus SDK is loaded.
   - For development, preproduction, and production modes, specific Tealium scripts are loaded based on the respective cookie values.
   - If `enableCelebrus=snippet` is found or if the hostname mirrors a testing environment (e.g., "put0"), a specific wrapper function is called to load additional Celebrus scripts.

### Dependencies
The code relies on the following global objects:
- **`window`**: Used for accessing the current URL and manipulating cookies.
- **`document`**: Utilised to create and append script elements to the DOM.

## 3. Usage Examples

### Scenario 1: Normal Operation
- **URL**: `https://example.com?enableCelebrus=true`
  - **Result**: Cookie `enableCelebrus=true` is set.
  - **Load**: The general Celebrus SDK script is appended to the document.

### Scenario 2: Development Environment
- **URL**: `https://example.com?enableCelebrus=dev`
  - **Result**: Cookie `enableCelebrus=dev` is set.
  - **Load**: The `utag.1789.js` script is loaded into the document.

### Scenario 3: Preproduction Environment
- **URL**: `https://example.com?enableCelebrus=preprod`
  - **Result**: Cookie `enableCelebrus=preprod` is set.
  - **Load**: The `utag.1790.js` script is loaded into the document.

### Edge Case: Missing Cookie
- **URL**: No parameter set (e.g., `https://example.com`)
  - **Result**: No cookie is set, and no Celebrus or Tealium scripts are loaded.

## 4. Known Limitations & Gotchas
- This extension exclusively reacts to the specified query parameters and will not function correctly if these parameters are omitted.
- If multiple query parameters are present, only the last one processed will dictate the cookie value, potentially leading to unexpected behaviour.
- The extension may conflict with other scripts that manipulate cookies or the DOM, leading to race conditions or load order issues.

## 5. Recommendations for Refactoring
- **Code Style**: Use consistent indentation and spacing to improve readability.
- **Modularisation**: Consider breaking the code into smaller, reusable functions to handle URL parsing and script loading.
- **Defensive Checks**: Although eventType and eventPayload are guaranteed to be present, implementing checks for `window` and `document` availability could prevent critical issues if used in a different context.
- **Logging**: Adding console logs during critical operations (like cookie setting and script loading) may help in troubleshooting and provide better visibility during debugging.

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Periodic reviews of URL parameters and script URLs should be performed to ensure accuracy and relevancy.
- **Ownership**: Assign ownership to a dedicated team member responsible for updates and enhancements.
- **Testing Guidelines**: It is important to test this extension in all expected environments (dev, preprod, prod) to confirm the correct loading of scripts. Automated testing should cover both expected and edge cases to ensure stability over time.

This documentation serves as a comprehensive guide to understanding and working with the Celebrus Load Trigger extension for Tealium iQ.