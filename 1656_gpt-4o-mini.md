# Tealium iQ Extension Documentation: Custom CCC QueryString Override

## 1. Extension Overview
- **Name**: Custom CCC QueryString override
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to modify the `CustomerSegment` property of the `eventPayload` object based on certain query string parameters present in the URL, specifically when the application is accessed from a pathname that includes `/ccc/`. The purpose is to capture and standardise customer segment identification for analytics purposes effectively.

## 2. Code Explanation
### Key Variables
- `window.location.pathname`: Retrieves the current page's URL path, checked for `/ccc/`.
- `window.location.search`: Captures the URL query string, including parameter-value pairs.
- `qs`: This object stores the parsed query string parameters after they are converted into key-value pairs.

### Logic Flow
1. The function checks if `b.CustomerSegment` is undefined and if the pathname includes `/ccc/`.
2. If both conditions are satisfied, it processes the query string:
   - It splits the search string into individual parameters.
   - For each parameter, it populates the `qs` object with decoded values.
3. If `qs` contains:
   - `pnic`, it prefixes it with "PNIC:" and assigns it to `b.CustomerSegment`.
   - `aggso`, it prefixes it with "AGGSO:" and assigns it to `b.CustomerSegment`.
   - `so`, it prefixes it with "SO:" and assigns it to `b.CustomerSegment`.

### Dependencies
This code relies on the global `window` object and does not depend on any external libraries.

## 3. Usage Examples

### Scenario 1: Normal Flow
**Given:**
- URL: `http://example.com/ccc/?pnic=123&aggso=456`

**Result:**
- `b.CustomerSegment` would be set to `PNIC:123`.

### Scenario 2: Multiple Parameters
**Given:**
- URL: `http://example.com/ccc/?aggso=789&so=101`

**Result:**
- `b.CustomerSegment` would be set to `AGGSO:789` (the last match in the sequence).

### Scenario 3: Edge Case - No Parameter
**Given:**
- URL: `http://example.com/ccc/`

**Result:**
- `b.CustomerSegment` would remain undefined as there are no relevant parameters.

## 4. Known Limitations & Gotchas
- If multiple parameters are specified (e.g., `pnic`, `aggso`, `so`), only the last one processed will overwrite `b.CustomerSegment`. This may lead to unexpected behaviours if more than one parameter is expected to be processed simultaneously.
- The extension only activates under specific conditions (i.e., when the pathname contains `/ccc/`). It may not function properly when accessed from other paths.
- Be cautious of potential conflicts with other Tealium extensions that modify the `eventPayload` or `CustomerSegment`.

## 5. Recommendations for Refactoring
- **Defensive Checks**: Consider implementing additional checks to ensure that the query string parameters exist before attempting to read them. This would prevent potential errors in parsing.
- **Code Style**: Ensure consistent indentation and spacing for readability. Use more descriptive variable names for clarity if necessary (e.g., `queryString` instead of `qs`).
- **Modularization**: If the extension grows in complexity, consider breaking down the initialising function into smaller functions. This will improve maintainability and readability.
  
```javascript
// Example of a smaller Helper Function
function parseQueryString(queryString) {
    return queryString
        .toLowerCase()
        .split("&")
        .reduce(function(c, v) {
            c[v.split("=")[0]] = decodeURIComponent(v.split("=")[1]);
            return c;
        }, {});
}
```

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Regularly review the functionality of this extension alongside changes in the URL structure or business logic.
- **Ownership**: Assign a lead developer or team responsible for updates and troubleshooting.
- **Testing Guidelines**: Implement unit tests covering various scenarios, such as multiple parameters, absence of parameters, and paths both with and without `/ccc/`.

This documentation can be easily referenced by developers and stakeholders for understanding, using, and maintaining the Custom CCC QueryString Override extension effectively.