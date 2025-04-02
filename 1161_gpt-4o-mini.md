# Tealium iQ Extension Documentation: Legacy Event Support for Tablet in Branch

## 1. Extension Overview

- **Name**: Legacy Event Support for Tablet in Branch
- **ID**: 100040
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
This extension is designed to facilitate the handling of legacy event data specifically for tablet devices within the Branch framework. It remaps URL query string parameters to their corresponding names suitable for integration with the Tealium platform then triggers a `utag.view` call with the newly structured payload. This is especially useful for ensuring that both legacy and modern systems can communicate without losing data integrity.

## 2. Code Explanation

### Key Variables
- `qs`: This parameter represents the query string that is passed to the function.
- `m`: A mapping object obtained from `utag.sender[894].map` that contains the legacy mappings.
- `remap`: An object that will contain the relationships between legacy parameter names and their corresponding new names.

### Logic Flow
1. **Check for `utag`**: The code first checks if the `utag` object is defined within the window. If it is not defined, it retrieves a mapping from `utag.sender[894].map`.
  
2. **Mapping Creation**: The code iterates through the mapping `m` and constructs a `remap` object that maps legacy parameter names to their current equivalents. This is done by splitting the values of each mapping entry on commas to generate a usable pair.

3. **Query String Processing**: The query string `qs` is processed to remove unwanted characters and break it down into its component parts, storing it into `qsparts`.

4. **Payload Construction**: For each part of the query string, it splits the key and value and constructs a `payload` object using the `remap` object. If a legacy key is found in `remap`, it uses the new name; otherwise, it falls back to the original key.

5. **Trigger Event**: Finally, it calls `utag.view(payload)`, sending the constructed payload to be tracked by Tealium.

### Global Objects and Dependencies
- **`utag`**: The extension depends on the presence of the global `utag` object for operation. It specifically accesses `utag.sender` for legacy parameter mappings.
- **`window`**: Used to check if `utag` is defined in the global scope.

## 3. Usage Examples

### Normal Conditions
- **Input**: A query string such as `utm_source=google&utm_medium=cpc` is passed to the function.
- **Process**: The function remaps `utm_source` using existing mappings, constructs a new payload such as `{ source: 'google', medium: 'cpc' }`, and triggers `utag.view`.

### Edge Conditions
- **Without Mapping**: If an input parameter does not exist in the `remap`, such as `utm_test=example`, the output will still include it as `{ utm_test: 'example' }`.
- **Malformed Query String**: For an input like `utm_source=google&badparam`, the function should still parse valid parameters and ignore corrupt or malformed ones.

## 4. Known Limitations & Gotchas

- **Dependency on `utag`**: If `utag` is entirely missing, the extension will fail silently since it doesn’t have error handling for this scenario.
- **Mapping Availability**: The extension assumes that the mapping `utag.sender[894].map` is correctly configured and available; otherwise, it can't map legacy parameters.
- **Global Scope Conflicts**: If another script manipulates the `utag` object or associated properties, it may cause unexpected behaviour.

## 5. Recommendations for Refactoring

- **Input Validation**: Consider adding checks to ensure that the input `qs` is a valid string before processing it. This can prevent runtime errors.
- **Code Modularity**: You might want to break the functionality into smaller functions, such as a dedicated function for mapping creation and another for payload assembly.
- **Variable Naming**: Improve variable naming for better clarity. For example, `m` and `m2` could be replaced with `mappings` and `mappingParts`.
  
```javascript
var mappings = utag.sender[894].map;
```

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Assign a team member to regularly review the mappings and update the extension as necessary, especially when new parameters or systems are introduced.
- **Testing Guidelines**: Implement unit tests focusing on various input cases, including valid, missing, and malformed query strings. Validate the outputs against expected payloads.
- **Documentation Updates**: Any changes to the mapping or functionality should reflect immediately in the documentation to ensure clear communication within the team.

By following this structure and the recommendations laid out, this documentation should serve as a comprehensive guide for understanding, maintaining, and extending the functionality of the Legacy Event Support for Tablet in Branch extension within the Tealium iQ ecosystem.