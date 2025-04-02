# Tealium iQ Extension Documentation: Hide Smart Banner on SW Referral

## 1. Extension Overview

- **Name**: Hide Smart Banner on SW Referral
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: Pre Loader
- **Execution Frequency**: Run Once

### Summary
This extension is designed to hide the Smart Banner on the page when the user is referred from a specific source identified by the presence of the query parameter `swappwebview` in the URL. The primary purpose of this extension is to enhance user experience by ensuring that the Smart Banner does not display when users arrive through specific avenues, potentially preventing confusion or redundant prompts.

---

## 2. Code Explanation

### Key Variables
- **`window.location.search`**: A string representing the query parameters of the current URL. It is checked to determine if it includes `swappwebview`.
- **`ss`**: A newly created `<style>` element. This is used to insert CSS rules for hiding the Smart Banner.

### Logic Flow
1. The code initiates an immediately invoked function expression (IIFE) to create a private scope.
2. Inside the `try` block, it checks if `window.location.search` is a string and contains the substring `swappwebview`.
3. If the condition is met, a new `<style>` element is created, and the rule `.smartbanner { display: none !important }` is assigned to the `innerText` property of the element.
4. The created style element is then appended to the document's `<head>` section, effectively hiding the Smart Banner.
5. If an error occurs at any stage, the `catch` block is executed, preventing any harm or disruption in functionality.

### Dependencies on Global Objects or Libraries
The code relies on the global `window` and `document` objects to access the URL and manipulate the DOM. There are no external libraries or dependencies required.

---

## 3. Usage Examples

### Scenario 1: Normal Condition
- **Input**: User accesses the website with the URL `https://example.com/?swappwebview=true`.
- **Output**: The Smart Banner is hidden upon loading the page due to the CSS rule being applied.

### Scenario 2: Edge Condition
- **Input**: User accesses the website with the URL `https://example.com/?randomparam=value`.
- **Output**: The Smart Banner remains visible because the required query parameter `swappwebview` is absent.

### Additional Notes
The extension runs once per page load, making it efficient for use in performance-sensitive contexts.

---

## 4. Known Limitations & Gotchas

- **Case Sensitivity**: The check for `swappwebview` is case-insensitive due to the use of `toLowerCase()`, but variations not adhering to this standard may cause unexpected results.
- **Browser Compatibility**: Tests should be conducted across various browsers, ensuring that the mechanism to hide the Smart Banner works uniformly.
- **Conflicts**: This extension may conflict with other scripts that manipulate the Smart Banner or similar UI elements. Care should be taken to review any changes to other scripts that might impact its functionality.

---

## 5. Recommendations for Refactoring

- **Error Handling**: While the `try/catch` block handles exceptions gracefully, logging the error could provide insights during debugging.
- **Code Style**: Consider consistent indentation for better readability. Additionally, providing comments within the code can help future developers understand the purpose of each segment.
- **Modularity**: If this extension were to grow, encapsulating functionality into smaller functions could improve maintainability.
- **Preventing Multiple Invocations**: Ensure that the check can only trigger once during a single page load, which is currently handled by the `Run Once` execution frequency.

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign a primary owner or point of contact for this extension to monitor its performance and functionality over time.
- **Testing Guidelines**: Carry out regular tests when deploying new versions of the website or making significant changes to the application to ensure the extension behaves as expected.
- **Documentation Updates**: Regularly update this documentation to reflect changes, improvements, or any alterations made to the extension.

---

This structured documentation should provide a comprehensive view of the `Hide Smart Banner on SW Referral` extension, helping developers and stakeholders understand its purpose and functionality clearly.