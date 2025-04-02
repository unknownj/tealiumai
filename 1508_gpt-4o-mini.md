# Tealium iQ Extension Documentation - SCEP Link Decoration

## 1. Extension Overview

- **Name**: SCEP Link Decoration
- **ID**: 100040
- **Type**: Advanced JavaScript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The SCEP Link Decoration extension enhances outgoing links in the navigation header of a specific webpage from Lloyds Bank. It appends custom query string parameters to links that meet certain criteria, enabling concise tracking of user interactions. This is particularly useful to ensure the correct attribution of user engagement with the navigation elements, providing valuable insights for analysis and optimisation.

## 2. Code Explanation

### Key Variables
- **`href`**: Extracts the current link's URL for processing.
- **`$e`**: A jQuery-wrapped element representing each link in the specified selector.

### Logic Flow
1. **Selector Iteration**: The function iteratively processes all anchor (`<a>`) elements within the `#nav-header` using jQuery's `each()` method.
2. **Link Validation**:
   - It first checks if the `href` is valid, ensuring that it is not too short, undefined, or already contains a query string or anchor.
   - It excludes absolute links (those starting with `http`) to maintain focus on internal navigation.
3. **Link Modification**: If all checks pass:
   - Appends `?WT.ac=topnav` to the `href`.
   - Adds an additional parameter `linkid`, combining the current path and index to create a unique identifier for tracking.

### Dependencies
- **jQuery**: The code relies on the jQuery library, accessed via `LBGAnalytics.$`.

## 3. Usage Examples

### Normal Conditions
If a user visits the webpage `www.lloydsbank.com/current-accounts/all-accounts/club-lloyds.html`:
- The function will iterate through all anchors in `#nav-header` that do not have query strings or hashes.
- A link like `/about` would be transformed to `/about?WT.ac=topnav&linkid=all-accounts-club-lloyds-0`.

### Edge Conditions
- An anchor link directing to an external site (`https://example.com`) will remain unchanged.
- A link already containing a query string (e.g., `/contact?ref=nav`) will remain unaltered.

## 4. Known Limitations & Gotchas

- **Link Validity**: Links must adhere to the criteria of being internal and not previously modified; otherwise, they are ignored.
- **Selector Dependency**: If the DOM structure changes (e.g., renaming `#nav-header`), the extension will fail to operate as intended.
- **Execution Context**: If the script runs in an environment where jQuery is not available or improperly loaded, it will error out.
- **Query String Conflicts**: If further functionalities depend on specific query parameters, additional handling may be necessary to avoid conflicting results.

## 5. Recommendations for Refactoring

- **Defensive Checks**: Ensure that `window.location.pathname` correctly returns the expected value before executing the function.
- **Modularisation**: Consider breaking out the validation checks into their own functions or using a single function to handle all checks to enhance readability and maintainability.
- **Code Clarity**: Document inline within the code using comments to explain complex logic or decisions to future developers.
- **Performance**: Instead of repeatedly accessing the `href` attribute, store its value to reduce DOM queries for better performance.

## 6. Maintenance & Further Notes

- **Ownership**: Assign a dedicated maintainer for this extension to oversee updates, troubleshoot issues, and streamline testing processes.
- **Testing Guidelines**: Implement regular regression tests to ensure functionality remains intact as other parts of the website evolve.
- **Documentation Updates**: Continuously update the documentation to reflect any changes made to the extension or its dependencies.

--- 

This documentation serves as a comprehensive guide for developers and stakeholders, ensuring clarity on purpose, functionality, and maintenance guidelines for the SCEP Link Decoration extension within Tealium iQ.