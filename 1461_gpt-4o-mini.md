# Tealium iQ Extension Documentation - CommCode Fix

## 1. Extension Overview

- **Name**: CommCode Fix  
- **ID**: 100040  
- **Type**: Advanced JavaScript Code  
- **Scope**: DOM Ready  
- **Execution Frequency**: Run Once  

### Summary
The `CommCode Fix` extension is designed to enhance link redirection by appending a `CommCode` query parameter to specific URLs on the Lloyds Bank and Halifax websites. The main purpose of this extension is to capture and store the `CommCode` from the URL parameters and ensure it is included in outbound links, thus preserving marketing tracking across navigations.

---

## 2. Code Explanation

### Key Variables
- **`commcode`**: A variable capturing the `CommCode` from the current URL's parameters.
- **`cookie`**: Stores the value of the `CommCode` cookie for subsequent link modifications.
- **`aspinc`, `commcode`, `carinsure`, `vaninsure`**: Node lists that contain links that require modifications based on URL parameters.

### Logic Flow
1. Checks if the hostname matches either `www.lloydsbank.com`, any stage or preview versions of Lloyds Bank, or any version of Halifax.
2. Defines helper functions to handle:
   - **Parameter Extraction** (`getParameterByName`): Retrieves a specified parameter from the URL.
   - **Cookie Management** (`setCookie`, `getCookie`): Stores and retrieves the `CommCode` from cookies.
   - **Link Replacement**:
     - `replaceLink`: Modifies the `href` attribute of a link, appending the `CommCode` if available.
     - `replaceInLink`: Modifies a link with a specific format by replacing predefined placeholders with the `CommCode`.
3. On page load, it retrieves and sets the `CommCode` cookie based on the URL.
4. Searches for specific link patterns in the HTML and applies the relevant modifications.

### Dependencies
The extension relies on the global `window` object and the `document` object for URL handling and DOM manipulation. No external libraries are used.

---

## 3. Usage Examples

### Normal Scenario
- If a user visits `https://www.lloydsbank.com?CommCode=12345`, the extension will:
  - Store `12345` in a cookie named `CommCode`.
  - Modify any links matching the selectors by appending `&CommCode=12345` or `?CommCode=12345` appropriately.

### Edge Condition
- If the URL does not contain a `CommCode`, the links are processed without appending additional parameters. For example, `https://www.lloydsbank.com` will not modify the links that the extension checks.

---

## 4. Known Limitations & Gotchas

- The variable `aspinc` is declared but not used due to it being an empty array. This may indicate a logic oversight or incomplete feature implementation.
- The `document.querySelectorAll` calls could potentially return empty NodeLists leading to unnecessary function calls (e.g., if no links are found, it still tries to loop through an empty list).
- If the `CommCode` cookie is not properly set and the `replaceLink` function runs afterwards, links may be modified incorrectly or left unmodified, depending on the order of operations in the DOM.

---

## 5. Recommendations for Refactoring

- **Code Modularisation**: Consider grouping related functions together to separate concerns. For example, cookie management functions could be in a separate utility.
- **Defensive Checks**: Include checks when fetching URLs to ensure no errors are thrown if the `href` attribute is missing.
- **Consistent Naming**: Ensure variable names are consistent to avoid confusion (`commcode` is reused within different scopes).
- **Documentation**: Add inline comments to clarify complex logic, especially where regular expressions are involved.

---

## 6. Maintenance & Further Notes

### Ongoing Maintenance
- Regularly check for updates related to the `CommCode` capturing logic, as business requirements may evolve.
- Monitor performance impacts on page load, especially if many links match the selectors.

### Ownership
- This extension should be owned and maintained by a member of the Digital Marketing or Development team responsible for link tracking and analytics.

### Testing Guidelines
- Test the extension across various environments (production, staging, preview) to ensure it behaves correctly in all scenarios.
- Validate cookie persistence; ensure cookies are set and retrieved accurately on different user pathways.

--- 

This documentation aims to provide a thorough understanding of the `CommCode Fix` extension and its implementation within the Tealium iQ framework, facilitating smooth collaboration and future development.