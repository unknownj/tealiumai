# Tealium iQ Extension Documentation: WTA : TAG : Set : Send Retarget Variables

## 1. Extension Overview

- **Name**: WTA : TAG : Set : Send Retarget Variables
- **ID**: 1077
- **Type**: Javascript Code
- **Scope**: 894
- **Execution Frequency**: Active

### Summary
This extension is designed to selectively set retargeting variables based on the application status and journey action of the user. It checks certain criteria within the event payload and determines whether to suppress retargeting or send specific retargeting details. This ensures that only relevant and meaningful retargeting information is sent, potentially increasing the effectiveness of retargeting campaigns.

---

## 2. Code Explanation

### Key Variables
- **`appStatus`**: Determines the current application status by checking properties from the global object `b`.
- **`statusConfig`**: An object that defines which application statuses should result in suppression of retargeting.
- **`actionConfig`**: An object that defines which journey actions should also trigger suppression.

### Logic Flow
1. **Determine Application Status**: The current application's status is extracted and stored in `appStatus`.
2. **Suppression Check**:
   - The extension checks if the `appStatus` exists in the `statusConfig`. If it does, `b.SendRetargetSuppress` is set to "yes".
   - Similarly, the extension checks if the current journey action exists in the `actionConfig`, and if so, it sets `b.SendRetargetSuppress` to "yes".
3. **Set Retargeting Variables**: If `SendRetargetSuppress` is not set:
   - It checks for the presence of necessary retargeting attributes (`RetargetEmail`, `RetargetPostcode`, etc.) and assigns their values to `b.SendRetargetEmail`, `b.SendRetargetPostcode`, etc.
   
### Dependencies
- The code relies on properties present within the `b` object, which is expected to be populated by the Tealium environment. There are no direct dependencies on external libraries.

---

## 3. Usage Examples

### Normal Scenario
1. **Input**:
   - `appStatus` = "Fulfilled"
   - `JourneyAction` = "l1"
   - The user has filled in the necessary retargeting attributes.
2. **Output**:
   - `b.SendRetargetSuppress` will be set to "yes".
   - Retargeting details will **not** be sent.

### Edge Conditions
1. **Without Key Information**:
   - Input:
   - `appStatus` = "Not Scored"
   - `JourneyAction` = "d1"
   - `RetargetEmail` and other fields are not present.
2. **Output**:
   - `b.SendRetargetSuppress` is set to "yes".
   - Retargeting details will still not be sent, regardless of the presence of fields.

### Successful Retargeting
1. **Input**:
   - `appStatus` = "Referred"
   - `JourneyAction` = "p"
   - All retargeting attributes are present.
2. **Output**:
   - `b.SendRetargetSuppress` remains unset.
   - Values are assigned to `b.SendRetargetEmail`, `b.SendRetargetPostcode`, and others accordingly.

---

## 4. Known Limitations & Gotchas

- If the `b` object does not contain the expected properties, unexpected results may occur.
- There may be cases where the `appStatus` or `JourneyAction` is similar but not an exact match in the configuration; this could lead to incorrect suppression behaviour.
- Conflicts might arise if other extensions modify or rely on the same properties of the `b` object which are being checked or set in this extension.

---

## 5. Recommendations for Refactoring

- **Modularization**: Consider breaking down the logic into separate functions for clarity, such as a function to check suppression conditions and a separate function for setting retargeting variables.
- **Code Style**: Maintain consistency in naming conventions and terminology (e.g., using camelCase for variables).
- **Defensive Checks**: While there are guarantees provided for `eventType` and `eventPayload`, it is always a good practice to perform checks before utilizing potentially undefined variables (e.g., checking if `b.RetargetEmail` exists before accessing it).
  
```javascript
if(b && b.RetargetEmail) {...}
```

---

## 6. Maintenance & Further Notes

- **Ownership**: It is recommended that a specific team or individual is assigned to oversee the maintenance of this extension.
- **Testing Guidelines**:
  - Comprehensive testing should be conducted after any changes to ensure that all application statuses and journey actions behave as expected.
  - Regular audits of the extension’s effectiveness on retargeting campaigns should be performed to measure success and identify opportunities for improvement.
  
- **Documentation Updates**: Ensure that this documentation is kept up to date with any changes in functionality or requirements.

This documentation is structured to assist developers and stakeholders in understanding the purpose, functionality, and best practices associated with the WTA : TAG : Set : Send Retarget Variables extension.