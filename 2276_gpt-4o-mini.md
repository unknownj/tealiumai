# Tealium iQ Extension Documentation: CBO AppsFlyer Simulator

## 1. Extension Overview
- **Name**: CBO AppsFlyer Simulator
- **ID**: 2276
- **Type**: Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The CBO AppsFlyer Simulator extension is designed for capturing and manipulating analytics parameters from URLs in scenarios involving AppsFlyer. It facilitates the injection of necessary global variables into the `window` object based on specific conditions, allowing for greater flexibility in tracking and data processing within the Tealium environment. The extension uses cookies to determine whether certain functionalities are enabled, thereby managing global states around URL tracking parameters.

## 2. Code Explanation
### Key Variables
- **pollutionObject1** and **pollutionObject2**: These objects contain the global configuration for various tracking parameters used by the AppsFlyer system.
- **Variables in pollutionObject1**:
    - `AF_URL_SCHEME`: Regular expression to match and capture parts of the URL for AppsFlyer tracking.
    - `VALID_AF_URL_PARTS_LENGTH`: Valid length for parts in the AppsFlyer URL scheme.
    - `AF_CUSTOM_EXCLUDE_PARAMS_KEYS`: Array of query parameters to be excluded for AppsFlyer URLs.
- **Variables in pollutionObject2**: Similar structure but includes additional parameters such as `FACEBOOK_CLICK_ID`, `GBRAID`, and functions that assist in URL processing and validation.

### Logic Flow
- The script first checks if the cookie `testgloballeak=true` exists.
- Upon validation, it executes an IIFE (Immediately Invoked Function Expression) that injects the defined objects into the global `window` object.
- Each of the keys defined in `pollutionObject1` and `pollutionObject2` becomes accessible globally, implementing the configuration for AppsFlyer tracking.

### Dependencies
- The extension relies solely on built-in JavaScript functions and the `window` object. No external libraries or frameworks are imported.

## 3. Usage Examples
### Normal Conditions
1. If the cookie `testgloballeak=true` is set in the user's browser, the extension will allow the global variables defined in `pollutionObject1` and `pollutionObject2` to be accessible throughout the application.
   
   Example access:
   ```javascript
   console.log(window.GOOGLE_CLICK_ID); // Outputs: gclid
   ```

### Edge Conditions
1. If the cookie is not set, none of the global variables will be defined.
   
   Example check:
   ```javascript
   if (typeof window.AF_URL_SCHEME === 'undefined') {
       console.log('AF_URL_SCHEME is not set');
   }
   ```

2. Invalid or unexpected data structures in URLs might lead to unexpected tracking behaviour due to reliance on certain URL parameters.

## 4. Known Limitations & Gotchas
- **Cookie Dependency**: The extension's functionality hinges entirely on the existence of the specified cookie. If a user clears their cookies or if it's not set, the variables will not be available, potentially leading to tracking issues.
- **Global Scope Pollution**: The extension adds several properties to the global `window` object, which could potentially lead to conflicts with other scripts or extensions that use the same variable names.
- **Complex URL Structures**: The regex used in `AF_URL_SCHEME` may not cover all edge cases, leading to potential failures if the structure of URLs vary unexpectedly.

## 5. Recommendations for Refactoring
- **Improve Documentation**: Add inline comments and structured documentation to clarify the responsibilities of each function and variable.
- **Modularisation**: Consider breaking down the IIFE into smaller helper functions that each handle a specific task, such as setting up configurations or handling exclusions, to enhance code readability and maintainability.
- **Function Naming**: Make function names in `pollutionObject2` more descriptive to clarify their intended operations.
- **Testing for Existence**: Before accessing global properties, implement checks that verify each expected global variable's existence to avoid potential errors.

## 6. Maintenance & Further Notes
- **Ownership**: Assign a primary maintenance owner for this extension who can monitor changes and ensure that it continues to function as expected.
- **Testing Guidelines**: Establish a testing phase whenever modifications are made to the code, especially when introducing new parameters or logic.
- **Version Management**: Keep detailed records of changes made to the extension to facilitate troubleshooting and updates in the future.

By following these guidelines, the CBO AppsFlyer Simulator extension can be effectively maintained and improved to meet evolving tracking and reporting requirements within the Tealium ecosystem.