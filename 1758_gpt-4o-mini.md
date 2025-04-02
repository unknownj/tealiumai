# Tealium iQ Extension Documentation: **GAD : Fire on workday links**

## 1. Extension Overview

- **Name**: GAD : Fire on workday links
- **ID**: 1758
- **Type**: JavaScript Code
- **Scope**: 1502
- **Execution Frequency**: Active

### Summary
This extension is designed to intercept link events and determine whether they are classified as "Offsite Link" actions. By only processing such events, the extension can aid in tracking and managing user interactions with links, specifically those leading outside the site. It serves to ensure that specific analytics or marketing tags are fired correctly based on user behaviour.

---

## 2. Code Explanation

### Key Variables
- **a**: Represents the `eventType` which conveys the type of event being processed.
- **b**: Represents the `eventPayload` that contains additional data pertinent to the event.
- **u**: Represents the `tagObject` which may hold context about the current tag and its execution.

### Logic Flow
1. The function is immediately invoked with three parameters: `eventType`, `eventPayload`, and `tagObject`.
2. Within the function, a conditional check is performed to determine if the `EventAction` property of the `eventPayload` object is equal to "Offsite Link".
3. If the condition is met, the function returns `false`, effectively halting further processing or tag firing.

### Dependencies
- The extension relies on global objects `eventType` and `eventPayload`, which are assumed to be present.
- The logic uses the property `EventAction` from the `payload`, necessitating that this property exists and is correctly populated during the event lifecycle.

---

## 3. Usage Examples

### Normal Conditions
- **Scenario**: A user clicks on an external link labelled "Visit Example.com".
  - The `EventAction` for this click event is "Offsite Link".
  - As a result, the extension does not suppress further actions, allowing any defined tags associated with offsite links to fire.

### Edge Conditions
- **Scenario**: A user clicks on an internal link.
  - The `EventAction` for this click event is something other than "Offsite Link".
  - In this case, the extension returns `false`, preventing the execution of any subsequent tags or analytics events related to offsite tracking.

---

## 4. Known Limitations & Gotchas

- **Non-Standard EventAction Values**: If an event’s `EventAction` is not populated or uses unexpected values, the extension may not function as intended, blocking all tag firing for those events.
- **Integration with Other Extensions**: If other extensions modify the `eventPayload` and change `EventAction` unexpectedly, it could lead to conflicts where intended offsite events are not tracked properly.
- **Browser Compatibility**: As this extension is written in ES5, it should work across all modern browsers; however, older browsers may have quirks that need consideration.

---

## 5. Recommendations for Refactoring

### Suggested Improvements
- **Error Logging**: Implement logging functionality to capture unexpected states or values, helping diagnose issues in event processing.
- **Modularisation**: Consider isolating the condition check into a named function for better readability and potential reuse in other extensions.
  
### Code Style
- Following consistent naming conventions, especially for parameters, can enhance readability:
  - Instead of using `a`, `b`, and `u`, consider using more descriptive names, e.g., `eventType`, `eventPayload`, and `tagObject`.
  
#### Example Refactor
```javascript
(function(eventType, eventPayload, tagObject) {
    if (eventPayload["EventAction"] !== "Offsite Link") {
        return false;
    }
    // Continue processing if the condition is met
})(eventType, eventPayload, tagObject);
```

---

## 6. Maintenance & Further Notes

### Ongoing Maintenance
- **Ownership**: Assign a specific team member to maintain this extension, ensuring ongoing reviews and updates are conducted as required.
- **Testing Guidelines**:
  - Regularly test under different scenarios to validate the extension’s firing conditions.
  - Ensure cross-browser testing, focusing on compatibility with various user-agent strings.

### Documentation Updates
- Encourage developers to document any changes made to the extension directly in the code comments, making future revisions easier for subsequent developers.

By providing thorough documentation, this extension can be better understood and maintained, ensuring reliable performance for tracking offsite link interactions.