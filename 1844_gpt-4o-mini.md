# Tealium iQ Extension Documentation: Nav Tracking 2023

## 1. Extension Overview
- **Name**: Nav Tracking 2023
- **ID**: 1844
- **Type**: Javascript Code
- **Scope**: Pre Loader
- **Execution Frequency**: Run Once

### Summary
The "Nav Tracking 2023" extension is designed to track navigation links on a webpage. It collects information about user interactions with site navigation elements, including complex navigation structures such as progressive navigation, mega menus (versions 2 and 3), and promotional boxes. The goal is to populate a data layer with navigation path data that can be sent to analytics tools for further analysis. 

## 2. Code Explanation
### Key Variables
- **SELECTOR_PROGRESSIVE**: A CSS selector to target links in the progressive navigation.
- **SELECTOR_MEGAV2**: A CSS selector for links in the second version of the mega navigation.
- **SELECTOR_MEGAV3**: A CSS selector for links in the third version of the mega navigation.
- **SELECTOR_PROMO**: A CSS selector for links in the promotional boxes.
- **LINK_DELIMITER**: Used to concatenate components of the link path.
- **STORAGE_KEY**: The key used to store and retrieve link data from session storage.

### Logic Flow
1. **Event Listener**: Each target element is assigned an event listener for click events.
2. **Tracking Function**: When a link is clicked, a payload (containing the link path and timestamp) is saved in session storage.
3. **Retrieval of Previous Link**: On page load, the code retrieves this data and sets it to a data layer variable (if appropriate).
4. **Gather Navigation Links**: The `trackNavLinks` function iterates over the defined selectors and processes each link accordingly, generating a structured link path string. 
5. **Error Handling**: Many sections of the code are wrapped in try/catch blocks for graceful failure management.

### Dependencies
The extension relies on the following global objects:
- `window.LBGAnalytics`: Specific to the implementation for data layer tracking.
- `sessionStorage`: For temporary data storage.

## 3. Usage Examples
### Example 1: Normal Flow
- A user clicks on a link in the progressive navigation.
- The click event triggers `trackLink`:
  - The link's path and timestamp are stored in `sessionStorage`.
- Upon loading the page, an existing link path is sent to the data layer for analytics.

### Example 2: Edge Case - Incognito Mode
- If the user is in incognito mode, storing data in session storage fails silently.
- The navigation data cannot be tracked, but no errors disrupt user experience.

### Example 3: Timing
- The `trackNavLinks` function is set to execute after a 1-second delay.
- If the DOM is not fully rendered during this delay, some elements may not be tracked.

## 4. Known Limitations & Gotchas
- **Session Storage Restrictions**: In some browsers (i.e., incognito mode), session storage is unavailable, leading to data loss.
- **HTML Structure Dependence**: The selectors are tightly coupled with specific HTML structures. Changes to the site’s markup may break functionality.
- **Timing Issues**: If the `trackNavLinks` function runs before the elements are present in the DOM, it will not track those elements until the next page load.

## 5. Recommendations for Refactoring
- **Defensive Checks**: Consider implementing additional checks to verify the existence of elements before attempting to access their properties.
- **Modularization**: Extract large anonymous functions into named functions for improved readability and maintainability.
- **Error Logging**: Add a logging mechanism to capture and report unexpected errors instead of silently failing.
- **Code Comments**: Further document the purpose of complex statements to enhance clarity.

## 6. Maintenance & Further Notes
- **Ownership**: Designate a team member for ongoing support and clarification regarding the extension's functionality.
- **Testing Guidelines**: Regularly test the extension across browsers and check for any changes in the underlying HTML structure.
- **Version Control**: Use version control for documentation and code changes, noting significant updates or modifications to the extension for future reference.

---

Feel free to reach out for further clarification or additional assistance regarding the "Nav Tracking 2023" extension.