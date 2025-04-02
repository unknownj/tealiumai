# Tealium iQ Extension Documentation: Recite Me Tagging

## 1. Extension Overview

- **Name**: Recite Me Tagging
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The Recite Me Tagging extension is designed to track user interactions with the Recite Me accessibility tool. It captures events such as button clicks on the Recite Me toolbar and modal interactions, sending this data to the LBGAnalytics for analysis. This functionality enhances the comprehension of user engagement with assistive technology features, helping to improve user support.

## 2. Code Explanation

### Key Variables
- **reciteMeEnabled**: A function that checks for the existence of a specific cookie ("Recite.Persist=true") to determine if the Recite Me functionality is enabled for the user.
  
- **trackReciteMe**: A function that listens for click events and sends specific analytics events to LBGAnalytics depending on which button was clicked.

- **trackReciteMeEnablement**: A function that listens for clicks on a button to enable Recite Me, recording this action as an analytics event.

### Logic Flow
1. **Initial Check**: The script checks if the Recite Me feature is enabled by calling `reciteMeEnabled()`.
2. If enabled, it calls the `trackReciteMe()` function:
   - This function adds a click event listener to the document.
   - Only clicks on designated buttons (identified by their IDs or classes) are processed to send corresponding analytics events.
3. If not enabled, it sets up a listener on an "enable" button to trigger `trackReciteMe()` once clicked.

### Global Object Dependencies
- **LBGAnalytics**: This external analytics object is required for sending event data. The code assumes its existence and correct implementation.

## 3. Usage Examples

### Normal Workflow
1. A user enables the Recite Me feature by clicking an "Enable Recite Me" button.
2. Upon enabling, a click event is registered, sending an event to LBGAnalytics with the narrative "Recite me".
3. The user interacts with the Recite Me toolbar, where various buttons trigger additional tracking events sent to LBGAnalytics.

### Edge Cases
- If the Recite Me feature is not enabled and the user attempts to interact with the toolbar:
  - No analytics events will be sent since `trackReciteMe()` is not invoked.
- If no buttons on the page match the specified selectors, the script continues to listen for clicks but does not send any analytics events.

## 4. Known Limitations & Gotchas

- **Browser Support**: As the script uses standard DOM methods, ensure compatibility across the targeted browsers.
- **Event Binding**: If the DOM does not contain the expected buttons when the script runs, it may not function as intended. This could especially be a problem if the interface is rendered after the script execution.
- **Multiple Instances**: If multiple instances of the Recite Me implementation exist on the same page, this could lead to unintended behaviour unless each instance manages its own listeners properly.

## 5. Recommendations for Refactoring

- **Modular Code Structure**: Consider breaking the script into more modular functions, improving readability and maintainability.
  
- **Error Handling**: Implement more robust error handling to provide fallback behaviours/information rather than silently failing.

- **DRY Principle**: The code currently contains repeated logic for setting up event listeners. Consider a more data-driven approach to reduce redundancy.

- **Optimisation of Queries**: Store repeated DOM queries (like `document.querySelector("p.steps-title")`) in variables to improve performance.

- **Consistent Naming Conventions**: Maintain consistent naming conventions (camelCase, etc.) for better readability and maintainability.

## 6. Maintenance & Further Notes

### Ongoing Maintenance
- **Ownership**: Assign a dedicated team member for the upkeep and enhancement of this extension, ensuring regular reviews of its performance and modification to adapt to changes in the user interface or user interaction patterns.
  
- **Testing**: Implement unit tests for key functions to ensure reliability. Manual UX testing should also be part of the release process to confirm the feature works as intended in the real world.

- **Analytics Review**: Regularly review analytics data captured through LBGAnalytics for insights relating to user engagement and determine areas for improvement in the user experience with Recite Me.

By thoroughly documenting and structuring the above points, developers and stakeholders can effectively understand the purpose and functionality of the Recite Me Tagging extension, ensuring its proper use and maintenance.