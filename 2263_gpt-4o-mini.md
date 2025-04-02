# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name**: Appstore redirect - remove internal UTMs if paid
- **ID**: 2263
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
This extension is designed to remove specific UTM parameters from internal links on the `/current-accounts.html` page when a visitor arrives with a tracked source. The primary objective is to ensure that internal marketing links direct users to the specified application page without unintended tracking parameters that could lead to misattribution of traffic sources.

---

## 2. Code Explanation

### Key Variables
- **`window.location.pathname`**: Checks the current page URL path to determine if it matches `/current-accounts.html`.
- **`new URLSearchParams(window.location.search).get('utm_source')`**: Extracts the value of the `utm_source` query parameter from the page URL to determine if it exists.
- **`AppNodes`**: A NodeList containing all anchor (`<a>`) elements that include the string `/app.html` in their `href` attribute.

### Logic Flow
1. The extension first verifies if the current page is `/current-accounts.html`.
2. It checks for the presence of the `utm_source` parameter in the URL.
3. If both conditions are satisfied, it retrieves all appropriate links and updates them to redirect to `https://www.lloydsbank.com/app.html`.
4. The process is executed only once upon the page loading, due to the defined occurrence scope.

### Dependencies
The extension relies on standard web APIs such as `window`, `document`, and `URLSearchParams`, which are native to the browser environment and do not require any external libraries.

---

## 3. Usage Examples

### Normal Conditions
- **Scenario**: A user navigates to `/current-accounts.html?utm_source=google`.
  - **Expected Outcome**: All links on the page containing `/app.html` are updated to `https://www.lloydsbank.com/app.html`, removing any `utm_source` trail.

### Edge Conditions
- **Scenario**: A user visits `/current-accounts.html` without any UTM parameters.
  - **Expected Outcome**: No changes are made to the links; they retain their original values.

- **Scenario**: A user visits `/current-accounts.html?utm_source=affiliate&other_param=123`.
  - **Expected Outcome**: Links with `/app.html` are still modified, and the additional parameters remain in the URL unused (as only `utm_source` is checked).

---

## 4. Known Limitations & Gotchas
- **URL Structure Changes**: The extension explicitly checks for the path `/current-accounts.html` only. If the path structure changes, the logic would fail to trigger.
- **Multiple UTM Parameters**: While the code successfully removes links, it only targets the presence of `utm_source`. Any additional UTM parameters will remain in the URL unless explicitly handled.
- **Potential Conflicts**: If multiple scripts are modifying the same set of anchor elements, races might occur, leading to unexpected link behaviours. Care should be taken to ensure that extensions do not interfere with one another.

---

## 5. Recommendations for Refactoring
- **Defensive Checks**: Insert validation checks to ensure `AppNodes` is neither `null` nor empty before attempting to modify its `href` attributes, thus preventing potential runtime errors.
  
    ```javascript
    if (AppNodes.length > 0) {
        // ... update href logic
    }
    ```

- **Code Style**: Make use of meaningful variable names for clarity. For instance, rename `AppNodes` to `appLinks` to enhance understandability.
  
- **Modularization**: Consider breaking out the functionality into smaller reusable functions for better structure and maintainability in larger codebases.

---

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Keep track of any changes to the URL structures or external systems that may affect the functionality of this extension. Regularly review for performance and behaviour consistency.
- **Ownership**: Assign a team member as the point of contact for this extension to handle updates or bugs.
- **Testing Guidelines**: Implement thorough testing whenever changes are made to ensure expected functionality remains intact, particularly after site updates.

---

By adhering to this documentation framework, the development and maintenance of the Tealium iQ extension can remain organized and accessible to all stakeholders involved.