# GA360 : Current Account : View Eligible Extension Documentation

## 1. Extension Overview

- **Name**: GA360 : Current Account : View eligible
- **ID**: 1565
- **Type**: Advanced JavaScript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension determines whether a user is eligible for a subsequent page view event related to the "Current Accounts" product group. It specifically checks if the user has a Journey Step that exceeds a previously stored Journey Step while ensuring the event type is "view" and the JourneyEvent does not equal "Page Load" or "Hash Change". This is essential for accurately tracking user interactions in Google Analytics 360 and ensuring data integrity in the marketing analytics pipeline.

## 2. Code Explanation

### Key Variables
- **product_group**: This variable stores the lowercase representation of the product group, with spaces removed. It is derived from the `ProductGroup` property in the data layer (`dl`).
- **current_journey_step**: Captures the current Journey Step from the data layer.
- **stored_journey_step**: Stores the last known Journey Step (from `cp.utag_main_js`) for comparison purposes.
- **journey_step_name**: Contains the name of the current Journey Step.

### Logic Flow
1. The function `subsequentAccountViewEligible` takes in the `dataLayer` (`dl`) as an argument.
2. It first checks if the `product_group` equals "currentaccounts".
3. If true, it verifies the existence of both `journey_step_name` and `stored_journey_step`.
4. If both are defined, it compares `current_journey_step` to `stored_journey_step`. If the current step is greater, it returns `true`, indicating eligibility.
5. If any checks fail, the function returns `false`.

### Dependencies
- The function relies on properties from the `eventPayload` object, specifically: `ProductGroup`, `JourneyStep`, `cp.utag_main_js`, and `JourneyStepName`.
- It assumes that `eventType` and `eventPayload` are globally defined and correctly passed to the function.

## 3. Usage Examples

### Normal Scenario
- **Input**: 
  - `eventPayload` contains:
    - `ProductGroup: "CurrentAccounts"`
    - `JourneyStep: 2`
    - `cp.utag_main_js: 1`
    - `JourneyStepName: "Step 2"`
- **Output**: Function returns `true`, indicating user is eligible for the subsequent page view.

### Edge Case Scenario
- **Input**: 
  - `eventPayload` contains:
    - `ProductGroup: "CurrentAccounts"`
    - `JourneyStep: 1`
    - `cp.utag_main_js: 2`
    - `JourneyStepName: "Step 1"`
- **Output**: Function returns `false`, as the current Journey Step does not exceed the stored Journey Step.

### Failure Scenario
- **Input**: 
  - `eventPayload` contains:
    - `ProductGroup: "OtherAccounts"`
    - `JourneyStep: 3`
    - `cp.utag_main_js: 2`
- **Output**: Function returns `false`, since the Product Group does not match.

## 4. Known Limitations & Gotchas

- If `ProductGroup` does not include "CurrentAccounts", eligibility checks will fail by default.
- If `JourneyStep` or `Stored JourneyStep` are not defined in the data layer, the function will return `false`, which may lead to unintended tracking anomalies.
- Special handling might be required when integrating with other extensions to avoid conflicts, especially those further altering the `eventPayload`.

## 5. Recommendations for Refactoring

- **Defensive Checks**: While the code assumes the existence of certain variables, adding checks for `undefined` or unexpected types could prevent potential errors during execution.
- **Code Style**: Group related operations together and comment on them succinctly for easier understanding.
- **Modularization**: Consider packaging this logic into an object or module to improve reusability and maintainability.

```javascript
function isDefined(value) {
    return value !== undefined && value !== null;
}
```

Utilising helper functions like `isDefined` can enhance readability and maintainability.

## 6. Maintenance & Further Notes

- **Ownership**: Ensure a designated team member is responsible for the ongoing maintenance and updates to this extension.
- **Testing Guidelines**: Implement unit tests to validate the correctness of the logic across various scenarios, particularly edge cases.
- **Documentation Updates**: Regularly review this documentation to reflect any changes in functionality or logic flow, ensuring consistency across development resources.

---

This documentation is structured to provide clarity on the purpose and functionality of the GA360 : Current Account : View Eligible extension in Tealium iQ, guiding both current and future developers in understanding and maintaining the code effectively.