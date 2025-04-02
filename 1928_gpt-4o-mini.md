# Tealium iQ Extension Documentation - Query Param List

## 1. Extension Overview

- **Name**: Query Param List
- **ID**: 1928
- **Type**: JavaScript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary

The Query Param List extension is designed to extract query parameters from the current page's URL. It processes the URL's query string to create a semicolon-separated list of parameter names, which can then be used for various analytics purposes or further processing within Tealium. This extension is particularly useful for tracking specific query parameters that might affect user behaviour and for integrating with other analytics tools.

## 2. Code Explanation

### Key Variables

- **`window.location.search`**: This global object accesses the query string of the current URL, allowing the extension to parse it for parameters.
- **`b.QueryParamList`**: This variable is assigned the processed string of query parameter names.

### Logic Flow

1. **Access Query String**: `window.location.search` retrieves everything following the `?` in the URL.
2. **Split and Map**:
   - The query string is split into individual parameters using `&` as a delimiter.
   - The first mapping retrieves the parameter names by splitting each parameter at the `=` sign.
3. **Conditional Transformation**:
   - During the second mapping, the extension checks if the first parameter starts with a `?` and removes it, allowing for clean parameter names.
4. **Join Parameters**: The final output is a semicolon-separated string of parameter names, which is assigned to `b.QueryParamList`.

### Dependencies

The extension relies on the global `window` object to access the current URL’s query string. No external libraries or additional dependencies are used in the code.

## 3. Usage Examples

### Normal Case

- **Scenario**: The URL is `https://example.com?param1=value1&param2=value2`
- **Output**: `param1;param2`

### Edge Case

- **Scenario**: The URL is `https://example.com?param1=value1&param2=value2&param3=`
- **Output**: `param1;param2;param3` (The third parameter is included, even with an empty value.)

### Edge Case with Empty Query String

- **Scenario**: The URL is `https://example.com`
- **Output**: An empty string. No parameters are present, so the output reflects that.

## 4. Known Limitations & Gotchas

- **Handling Special Characters**: If a parameter name contains special characters or spaces (which are usually encoded), this extension will output those characters as-is, which may not conform to expected standard formats.
- **Query String Format**: The code assumes that the query parameters are formatted as `key=value`, if not (for instance, if a parameter is passed as `key=`), it will still include it in the output.
- **Other Extensions**: If other extensions manipulate the `window.location.search` value before this extension runs, it may yield unexpected results. It is essential to evaluate the execution order of all extensions.

## 5. Recommendations for Refactoring

- **Defensive Checks**: Although we do not need to check the existence of `eventType` or `eventPayload`, consider adding checks for the value of `window.location.search` to ensure it is non-empty before processing.
- **Code Style and Clarity**: 
  - Consider adding comments to clarify the logic flow in the mapping functions for better readability.
  - Inline comments can be helpful to document intentions behind specific transformation logic.
- **Modularity**: For larger projects, consider encapsulating the parameter extraction logic in its function to improve testability and reusability across different extensions or scopes.

## 6. Maintenance & Further Notes

- **Ownership**: Assign a specific developer or team responsible for maintaining this extension, including code reviews and updates as needed.
- **Testing Guidelines**: Regularly test the extension with different URL structures in a development environment before deploying changes to production. Consider automated tests for various scenarios to ensure expected outcomes.
- **Documentation**: Keep this documentation updated as changes are made to the extension, including enhancements, bug fixes, or usage modifications. Regular reviews should be scheduled to confirm accuracy.