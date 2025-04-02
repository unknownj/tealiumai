# Tealium iQ Extension Documentation: Abort Send for Duplicated Data

## 1. Extension Overview

- **Name:** Abort Send for Duplicated Data
- **ID:** 1760
- **Type:** Javascript Code
- **Scope:** 928
- **Execution Frequency:** Active

### Summary
The purpose of this extension is to prevent the sending of duplicated or irrelevant data to the Tealium data layer, particularly during specific user journeys. It checks various conditions to determine whether an event should be transmitted, ensuring only meaningful interactions are processed. This minimises data clutter and enhances the integrity of tracked events.

## 2. Code Explanation

### Key Variables
- **`a`**: Represents the event type.
- **`b`**: Represents the event payload containing various properties, such as `JourneyName`, `JourneyStepName`, and `EventNarrative`.
- **`u`**: Represents the tag object (not directly used in the logic).

### Logic Flow
1. **Force Send Check**: If the `ForceSend` property in the payload (`b`) is set to true, the function immediately allows the event to be sent.
2. **Pathname Check**: If the URL path contains "cwa", the extension verifies if the user journey details (`JourneyName`, `JourneyStepName`, `JourneyAction`) are present. If they are absent, the event is abortively rejected.
3. **Specific Journey Check**: When the `JourneyName` is "maketransaction":
   - The code checks if `EventNarrative` is a string.
   - A series of specific narrative values are evaluated, and if matched, the event will not be sent.
4. **Logon Second Factor Check**: If the `JourneyName` corresponds to "Logon Second Factor":
   - It constructs a combined key from relevant journey properties.
   - The extension checks against a global variable (`window.lsfCurrentStep`) to see if the step is already being processed. If it is, the event is discarded; otherwise, it updates the variable to the current step.

### Dependencies
- The extension relies on the global `window` object to store and retrieve the state of `lsfCurrentStep`.
- Assumes the existence of certain properties (like `ForceSend`) within the data payload.

## 3. Usage Examples

### Normal Condition
- When `JourneyName` is set to "maketransaction", and `EventNarrative` is `"select beneficiary"`, the event is prevented from sending, thereby maintaining data quality.

### Edge Condition
- If the user is on a path containing "cwa" and does not provide essential journey parameters, the transmission is aborted, ensuring that only strategically relevant user actions are captured.

### Multiple Subsequent Events
- If a user performs several actions during the "Logon Second Factor" journey, the state stored in `window.lsfCurrentStep` ensures that only the first action in a set of duplicate actions is sent, preventing redundancies.

## 4. Known Limitations & Gotchas

- The extension assumes that specific payload properties exist. If these properties — such as `JourneyName` and `EventNarrative` — are not provided, it may lead to unexpected results.
- There is a reliance on the correct sequencing of events, particularly within the "Logon Second Factor". If the event order is disrupted (e.g., due to asynchronous callbacks), this may affect performance.
- Potential conflicts with other extensions that manipulate the global `window` object or depend on the event payload structure.

## 5. Recommendations for Refactoring

- **Defensive Coding**: Although current constraints do not require it, adding checks for property existence in the payload could enhance robustness if future changes are made.
- **Code Style**: Use consistent naming conventions for variables. Consider adding comments to explain complex logical branches.
- **Modularisation**: Refactor larger logical blocks into separate functions for clarity. This will simplify testing and maintenance without compromising the ES5 requirement.

### Sample Refactoring Suggestion
```javascript
function isJourneyValid(b) {
  return !(!b.JourneyName && !b.JourneyStepName && !b.JourneyAction);
}
```

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly review the extension’s performance against new user journeys or changes in business logic. Update the list of `EventNarrative` values as needed.
- **Ownership**: Assign a primary owner responsible for making necessary updates to the extension based on stakeholder feedback and data analysis.
- **Testing Guidelines**: Implement both unit tests for potential logical branches and integration tests to verify interactions with other Tealium extensions. Verify maximum data integrity in environments mimicking production.

This documentation serves as a comprehensive guide to understanding and maintaining the "Abort Send for Duplicated Data" extension. It is essential for ensuring reliable data flow within the Tealium ecosystem.