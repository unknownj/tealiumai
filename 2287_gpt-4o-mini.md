# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: AEM Hub Events POC
- **ID**: 2287
- **Type**: JavaScript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

**Summary**:
The "AEM Hub Events POC" extension is designed to track external link clicks within the "/secure-aem-hub/" pathname on the website. Upon clicking an external link, it sends an event to the LBGAnalytics system capturing the link's action and its respective narrative, which includes the link's formatted URL and the link's text. The extension waits for a delay of 3 seconds after the page is loaded to ensure that the links are present in the DOM before attaching event listeners.

---

## 2. Code Explanation

### Key Variables
- The extension uses `window.location.pathname` to check if the user is on a specific path.
- `setTimeout` is employed to delay the execution of the code by 3000 milliseconds (3 seconds).
- `document.querySelectorAll("a[href^=nga]")` selects all anchor (`<a>`) elements whose `href` attribute starts with "nga".

### Logic Flow
1. **Pathname Check**: The code checks if the current pathname includes "/secure-aem-hub/".
2. **Delayed Execution**: A timeout of 3 seconds is set before executing the following logic.
3. **Anchor Selection**: It retrieves all anchor elements with an `href` attribute starting with "nga".
4. **Event Listener Attachment**: For each selected anchor link:
    - An event listener is attached to handle click events.
    - On click, it attempts to send an event using `LBGAnalytics.events.send` with a defined structure: capturing `EventAction` and `EventNarrative`.

### Global Dependencies
- The extension relies on the presence of the `LBGAnalytics` global object to send analytics data. It assumes that this library is correctly loaded in the environment where the extension operates.

---

## 3. Usage Examples

### Normal Condition
- **Scenario**: A user clicks an external link `<a href="nga://some_action">Some Action</a>`.
- **Expected Behaviour**: After a 3-second delay, the click event listener triggers, sending the event with:
    - `EventAction`: "External Click"
    - `EventNarrative`: `"some_action (Some Action)"`

### Edge Conditions
- **Scenario**: No links starting with "nga" are present on the page.
- **Expected Behaviour**: No event listeners are added, and the code executes without error.
  
- **Scenario**: The click event occurs before the 3-second delay.
- **Expected Behaviour**: Click events are not captured since the listener has not yet been attached.

---

## 4. Known Limitations & Gotchas

- **Missing Links**: If the links are dynamically added after the timeout completes, those links will not have event listeners attached.
- **Multiple Page Loads**: If the user navigates through multiple pages quickly, only the first page load will register events due to the "Run Once" execution setting.
- **Asynchronous Loading**: The reliance on a timeout can lead to race conditions if the external links are not present when the timeout completes.
- **Event Handling Errors**: Errors within the click event listener are caught and ignored, potentially leading to loss of information about issues occurring during the tracking process.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Consider adding checks for the existence of `LBGAnalytics` before attempting to call methods on it. This could help avoid potential errors when dealing with undefined objects.
- **Error Logging**: Log errors to the console instead of silently catching them. This would aid debugging efforts by providing visibility into issues.
- **Modular Functions**: Break down the code into modular functions for better readability and maintainability. For example, consider creating a function specifically for handling event attachments.
- **Optimisation of Selectors**: If possible, use more specific selectors to reduce the number of elements processed, enhancing performance.

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly check to ensure the `LBGAnalytics` codebase is up to date and operates as expected with this extension.
- **Ownership**: Assign a responsible developer or team to oversee the extension's performance and troubleshooting as required.
- **Testing Guidelines**: Create a testing plan to assess the functionality of the extension across different scenarios, especially after updates or changes to the site structure.

This documentation should serve as a comprehensive guide for developers and stakeholders who require detailed understanding and insight into the "AEM Hub Events POC" extension.