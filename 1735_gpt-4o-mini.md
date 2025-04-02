# Tealium iQ Extension Documentation: Global Virtual Assistant Controller

## 1. Extension Overview
- **Name**: Global Virtual Assistant Controller
- **ID**: 1735
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
The Global Virtual Assistant Controller extension is designed to manage the configuration of virtual assistants on a website based on the user's current context (URL and hostname). It checks the location of the user and dynamically assigns appropriate virtual assistants based on predefined criteria, enhancing user interaction and support.

## 2. Code Explanation

### Key Variables
- **assistants**: An array containing configurations for various virtual assistants. Each element has:
  - `name`: The display name of the assistant.
  - `config`: Configuration string for the assistant.
  - `criteria`: A function determining if the assistant should activate based on the current page.

### Logic Flow
1. The extension begins by defining an array of assistant configurations.
2. For each assistant, it checks if the current `window.location.hostname` matches permitted domains and if the `window.location.pathname` meets specific criteria.
3. If both conditions are satisfied, it assigns the corresponding `config` and `name` to the variables `VirtualAssistantConfig` and `VirtualAssistantName` within the `eventPayload` object.

### Dependencies
- Uses global objects `window` and Tealium-specific objects `eventType` and `eventPayload`.
- The extension assumes that these global objects are available and correctly populated.

## 3. Usage Examples

### Normal Condition
- **Scenario**: A user visits `https://www.lloydsbank.com/business/help.html`.
- **Flow**:
  - The hostname is checked against the permitted domains for Lloyds Business.
  - The pathname matches an exact path.
  - The appropriate configuration `("lloydsbank:lbg_biz")` is assigned to `VirtualAssistantConfig`, and name `("Lloyds Business")` is assigned to `VirtualAssistantName`.

### Edge Condition
- **Scenario**: A user accesses `https://www.lloydsbank.com/nonexistent.html`.
- **Flow**:
  - The hostname matches, but the pathname does not match any configured criteria.
  - No values are assigned to `VirtualAssistantConfig` or `VirtualAssistantName`.

## 4. Known Limitations & Gotchas
- **Hostname Matching**: The extension relies heavily on the exact match of hostname strings. If the hostname is altered, such as with incorrect subdomains or typos, the extension will not activate.
- **Pathname Specificity**: The current code checks for specific paths. If new pages are added to the site but not included in the `exactPaths` or `pathStems`, the extension will fail to trigger.
- **Commented Code**: Some parts of the extension are commented out. This could lead to confusion for future developers.
- **Compatibility**: May introduce conflicts with other Tealium extensions if they are also managing similar configurations or altering `eventPayload`.

## 5. Recommendations for Refactoring
- **Modularisation**: Consider breaking down the criteria functions for different assistants into separate functions for improved readability and maintainability.
  
  ```javascript
  function checkLloydsBusiness(dl) {
      // Function Logic
  }
  
  // Similarly for other assistants
  ```

- **Defensive Checks**: Although not required, implementing fallbacks in the criteria functions would allow handling unexpected values gracefully.

- **Documentation Consistency**: Ensure that any future variables or functions are consistently documented to ease maintenance.

- **Testing Framework**: Consider setting up unit tests for the criteria functions to verify they behave as expected against various input scenarios.

## 6. Maintenance & Further Notes
- **Ownership**: Assign a team or individual responsible for monitoring and updating the extension as necessary.
- **Testing**: Regular tests should be conducted, especially after site updates, to ensure continued functionality.
- **Code Reviews**: Recommend setting up periodic code reviews to maintain code quality and identify opportunities for improvement.

### Conclusion
This documentation serves as a comprehensive guide to the `Global Virtual Assistant Controller` extension, detailing its purpose, functionality, and aspects to consider for effective usage and maintenance. Regular reviews and updates will ensure that the extension continues to meet the evolving needs of web users.