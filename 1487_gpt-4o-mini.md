# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Compound Journey Analytics Props
- **ID**: 100040
- **Type**: Advanced Javascript Code
- **Scope**: 928
- **Execution Frequency**: On each event trigger

### Summary
This extension is designed to capture and format analytics metadata from a user's journey within an application. It compiles various journey-related properties into lowercased dot-separated strings and assigns them to specific Adobe Analytics properties. By preparing this structured information, the extension aids in effectively tracking user interactions for improved insight and analytics.

---

## 2. Code Explanation

### Key Variables
- `b`: Represents the global context in which the extension operates, usually referred to as the `window` or a similar global object.
- `s`: Represents the Adobe Analytics object used to set properties for tracking.
- `u`: Represents the tag object that aids in mapping incoming data to the Adobe Analytics properties.

### Logic Flow
1. **Initialization**: The function is invoked with three parameters: `eventType`, `eventPayload`, and `tagObject`.
2. **Journey Name Check**: The extension first checks if `b.JourneyName` is defined. If it is, the code proceeds to extract and format multiple analytics properties.
3. **Analytics Properties Creation**:
   - **`b.JourneyAnalytics1`**: Compiles the journey name, step name, and application state.
   - **`b.JourneyAnalytics2`**: Compiles the journey action and narrative.
   - **`b.JourneyAnalytics3`**: Compiles the journey event, action, and narrative.
4. **Data Processing**: Each value is transformed into a string, cleaned by removing semicolons, and converted to lowercase, followed by concatenation with a dot (`.`) as a separator.
5. **Property Assignment**: The generated analytics strings are assigned to `s.prop21`, `s.prop22`, and `s.prop23`.
6. **Mapping**: Finally, the properties are mapped to the appropriate variables in the `u.map` object for tracking.

### Dependencies
- **Global Objects**: 
    - `b`: Constantly referenced, assuming the presence of the relevant journey properties.
    - `s`: Relies on the Adobe Analytics object to set properties.
    - **No external libraries** are used; the code operates purely within the defined extension.

---

## 3. Usage Examples

### Normal Conditions
- When a user navigates through a series of steps in an application, variables such as `b.JourneyName`, `b.JourneyStepName`, `b.ApplicationState`, etc., are populated. Upon triggering the event, the extension executes successfully, populating `s.prop21`, `s.prop22`, and `s.prop23` with cleaned and formatted strings representing the user's journey.

### Edge Conditions
- **Missing Properties**: If any of the properties like `JourneyStepName` or `ApplicationState` are not defined, the default value "None" is used.
- **Special Characters**: If properties contain unexpected characters, the extension removes semicolons, ensuring that only valid data is stored.

---

## 4. Known Limitations & Gotchas

- **Dependence on Journey Properties**: If critical properties (`JourneyName`, `JourneyStepName`, etc.) are absent or undefined, the output will default to "None", which could lead to less informative analytics.
- **Inconsistent Data**: If there are issues with how data is set before the extension executes, the expected output may not align with actual journey events.
- **Conflict with Other Extensions**: If other extensions manipulate `s.prop21`, `s.prop22`, or `s.prop23`, there might be overwrites or unexpected behaviours in reported data analytics.

---

## 5. Recommendations for Refactoring

- **Modularization**: Consider splitting the logic for each analytics string into separate functions to enhance readability and maintainability.
- **Variable Naming**: Ensure variable names are descriptive enough to clarify their purpose without requiring comments.
- **Validation Checks**: Implement defensive checks to confirm the validity of properties before processing, although it is established that `eventType` and `eventPayload` will always be present.
- **Remove Redundant Operations**: The mapping calls to `String()` can be minimised; JavaScript will automatically convert most types to strings.

---

## 6. Maintenance & Further Notes

- **Ownership**: Designate a primary owner for this extension to ensure consistency and accountability in updates.
- **Testing Guidelines**: Develop unit tests to validate the behaviour under various input conditions, especially focusing on edge cases.
- **Documentation Updates**: Keep the documentation in sync with any code changes to maintain clarity for future developers or stakeholders.

---

This structured format should facilitate sharing among developers and stakeholders to ensure understanding and effective collaboration on the Tealium iQ extension.