# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Embark Webchat Override
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Embark Webchat Override" extension is designed to modify the behaviour of the webchat platform for specific domains under Lloyds Bank's digital wealth services. When the browser's hostname matches any of the specified test domains, the extension sets the `WebchatPlatformOverride` variable to "Embark". This ensures that the appropriate webchat platform is loaded for users accessing these domain URLs.

## 2. Code Explanation

### Key Variables
- **`testDomains`**: An array containing specific domain names where the extension's functionality should be applied.
  
### Logic Flow
1. The extension immediately invokes an anonymous function with two parameters: `eventType` and `eventPayload`. These are provided by the Tealium platform and provide context for the extension's operation.
2. The extension checks if the current `window.location.hostname` exists in the `testDomains` array.
3. If a match is found, it sets the global property `b.WebchatPlatformOverride` to "Embark".

### Dependencies
- **Global Objects**:
  - `window.location.hostname`: Utilised to obtain the current domain.
  - `b`: Assumed to be a predefined global object provided by Tealium for extending functionality.
  
No external libraries are utilised in this extension, making it lightweight and self-contained.

## 3. Usage Examples

### Normal Condition
When a user accesses the URL `https://put02-dlp-secure.digital.wealth.lloydsbank.co.uk`:
- The extension checks if the hostname matches one in the `testDomains` array.
- It sets `b.WebchatPlatformOverride` to "Embark", allowing the webchat platform for users accessing this domain to operate correctly.

### Edge Condition
When a user accesses a URL not included in the `testDomains`, such as `https://example.com`:
- The condition in the extension will evaluate to false, and no modification to `b.WebchatPlatformOverride` will occur.
- The default webchat platform will remain unaffected.

## 4. Known Limitations & Gotchas
- The extension is hardcoded to specific domain names. If new domains need to be added or existing ones need to be removed, manual changes to the `testDomains` array are required, which could introduce deployment risks.
- Future updates in the webchat platform may require re-evaluation of the logic used within this extension.
- Potential conflicts may arise if other extensions or scripts manipulate the `b` object. Care should be taken when integrating multiple Tealium extensions that modify global objects.

## 5. Recommendations for Refactoring
- **Code Style**: 
  - Consider using meaningful variable names for `a` and `b` to improve readability.
  
- **Modularization**:
  - Refactor the initialization logic into a separate function to decouple the execution from immediately invoking the function within the anonymous closure.
  
- **Defensive Checks**: 
  - Although defensive coding for `eventType` and `eventPayload` is not required as stated, consider adding checks to ensure `b` and `b.WebchatPlatformOverride` are not undefined before assignment. This can enhance stability, especially if `b` could be modified by other scripts.
  
  Example:
  ```javascript
  if (typeof b !== 'undefined' && typeof b.WebchatPlatformOverride !== 'undefined') {
      b.WebchatPlatformOverride = "Embark";
  }
  ```

## 6. Maintenance & Further Notes
- Ongoing maintenance should include:
  - Regular reviews of the `testDomains` array to ensure its accuracy as business needs evolve.
  - Comprehensive testing whenever modifications are made to the extension or the webchat platform.
  
- **Ownership**: Assign a developer or team responsible for the extension to ensure accountability and tracking of changes.
  
- **Testing Guidelines**:
  - Establish a testing protocol to validate that the extension behaves as expected across all specified domains and does not interfere with other functionalities.
  
By following this structured documentation, developers and stakeholders can better understand the workings of the "Embark Webchat Override" extension and its implications for the larger Tealium iQ implementation.