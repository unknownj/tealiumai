# Tealium iQ Extension Documentation: Yext Switches

## 1. Extension Overview

- **Name**: Yext switches
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: 1525
- **Execution Frequency**: Every event

### Summary
The Yext switches extension is designed to enable session tracking and analytics events within the Yext platform. By setting the appropriate flags for both analytics and session tracking, this extension ensures that user interactions are appropriately captured for analytic purposes, contributing to data-driven decision-making within the organisation.

---

## 2. Code Explanation

### Key Variables
- **ANSWERS**: Global object that manages the Yext interface and configurations.
- **AnswersExperienceFrame**: Global object that provides the runtime configuration for experience frames in Yext.

### Logic Flow
1. The function checks if the `ANSWERS` object is available.
   - If it is, it calls `setAnalyticsOptIn(true)` to opt-in for analytics data collection.
   - It also calls `setSessionsOptIn(true)` to enable session tracking.

2. It checks if the `AnswersExperienceFrame` object is accessible.
   - If so, it sets two runtime configuration options:
     - `sessionTrackingEnabled` to `true`, enabling session tracking.
     - `analyticsEventsEnabled` to `true`, allowing for the recording of analytics events.

### Dependencies
- The extension depends on the presence of the global `ANSWERS` and `AnswersExperienceFrame` objects. If these are not available, the code will not execute as intended. It is assumed that the environment in which this code runs will have these objects defined.

---

## 3. Usage Examples

### Normal Operation
When the Yext platform is referenced and the extension is triggered in a valid session context:
```javascript
(eventType, eventPayload, tagObject) // function execution with valid parameters
```
- Analytics and session tracking are enabled, and user actions will be logged accurately in the analytics dashboard.

### Edge Conditions
- **Scenario**: If the `ANSWERS` object is not defined.
  - Outcome: The extension does not execute the settings for analytics or session tracking, leading to potential gaps in user interaction data.

- **Scenario**: If the `AnswersExperienceFrame` is not defined.
  - Outcome: Session tracking and analytics events may not be recorded, leading to incomplete data collection.

---

## 4. Known Limitations & Gotchas

- The extension does not handle cases where the `ANSWERS` or `AnswersExperienceFrame` objects are missing. This could result in silent failures with no feedback.
- If another script modifies these global objects after this extension runs, the expected behaviour may change, causing conflicts.
- Additionally, the extension does not log any errors or warnings regarding its execution. Thus, any failure to opt-in for analytics or sessions will go unnoticed.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Though eventType and eventPayload are guaranteed, consider checking for the existence of `ANSWERS` and `AnswersExperienceFrame` before attempting to call their methods to prevent potential errors. 
- **Code Style**: Ensure consistent indentation and formatting for better readability.
- **Modularisation**: Consider breaking the code into distinct functions to enhance modularity and maintainability. This would create separate responsibilities for checking dependencies and setting configurations.
  
Example:
```javascript
function enableAnalytics() {
    if (ANSWERS) {
        ANSWERS.setAnalyticsOptIn(true);
    }
}

function enableSessionTracking() {
    if (AnswersExperienceFrame) {
        AnswersExperienceFrame.runtimeConfig.set("sessionTrackingEnabled", true);
        AnswersExperienceFrame.runtimeConfig.set("analyticsEventsEnabled", true);
    }
}

(enableAnalytics(), enableSessionTracking());
```

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign a specific developer or team responsible for the maintenance of this extension. This person should ensure updates comply with any changes to the Yext API.
- **Testing Guidelines**: Regularly test the extension's functionality in staging environments when making modifications or introducing new dependencies.
- **Documentation Updates**: Keep this documentation up to date with any changes made to the extension, including modifications to the logic or functionality.

By adhering to these guidelines, the Yext switches extension will continue to function accurately and effectively within the Tealium iQ environment, ensuring reliable data collection for analytic purposes.