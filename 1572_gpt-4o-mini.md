# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name**: Clean up upgrade link account nicknames
- **ID**: 1572
- **Type**: Advanced Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

**Summary**:  
This extension modifies specific properties in the event payload when the conditions are met. Specifically, it targets the `LinkValue` and `WTP:WT.ac` parameters, ensuring that any occurrence of `,upgrade account` within these string fields is consistently formatted and includes a predefined path. The primary purpose is to standardise the data being passed, which may be necessary for downstream systems that rely on accurate and clean data inputs.

## 2. Code Explanation

### Key Variables
- **`a`**: This parameter represents the event type (not used directly in the logic).
- **`b`**: This parameter is the event payload object that contains the properties being processed, such as `LinkValue` and `WTP:WT.ac`.

### Logic Flow
1. The extension first checks if `b.LinkValue` is a string and whether it contains the substring `,upgrade account`. If both conditions are true, it:
   - Splits the string at each `/` (forward slash), takes the first two segments, joins them back together with `/`, and appends `/CHQ,upgrade account`.
2. Similar logic is applied to `b["WTP:WT.ac"]`:
   - The same transformation is applied if it contains `,upgrade account`, effectively ensuring a uniform formatting to these values.

### Dependencies
- The code depends on the existence of two global properties within the `eventPayload` object: `LinkValue` and `WTP:WT.ac`.
- It also assumes that the `eventPayload` structure conforms to expected specifications defined by the business requirements.

## 3. Usage Examples

### Normal Conditions
Given an incoming event with:
```javascript
eventPayload = {
  "LinkValue": "https://example.com/accounts,upgrade account",
  "WTP:WT.ac": "https://example.com/accounts,upgrade account"
};
```
After execution, the updated `eventPayload` would be:
```javascript
eventPayload = {
  "LinkValue": "https://example.com/CHQ,upgrade account",
  "WTP:WT.ac": "https://example.com/CHQ,upgrade account"
};
```

### Edge Conditions
- **Case Sensitivity**: The function is case-insensitive due to the `toLowerCase()` check. For instance:
  ```javascript
  eventPayload = {
    "LinkValue": "https://example.com/accounts,UPGRADE account",
    "WTP:WT.ac": "https://example.com/accounts,UPGRADE account"
  };
  ```
  This would still format the values correctly.

- **No Change Scenario**: If the values do not contain `,upgrade account`:
  ```javascript
  eventPayload = {
    "LinkValue": "https://example.com/accounts",
    "WTP:WT.ac": "https://example.com/accounts"
  };
  ```
  The output will remain unchanged:
  ```javascript
  eventPayload = {
    "LinkValue": "https://example.com/accounts",
    "WTP:WT.ac": "https://example.com/accounts"
  };
  ```

## 4. Known Limitations & Gotchas
- The code assumes that the initial string format adheres to a certain structure (i.e., it contains at least two segments separated by `/`). Failures may occur if the string does not follow this format, potentially causing unexpected results.
- If there are unexpected symbols or formats in the strings, the manipulation may yield incorrect paths.
- The extension does not include defensive coding practices such as checking for malformed URLs or invalid data types beyond string checks. This could lead to errors if modifications are required under different conditions.

## 5. Recommendations for Refactoring
- **Code Style**: Improve readability by adding more comments explaining the purpose of each block of code.
- **Modularisation**: Consider separating string manipulation logic into a reusable function to avoid code duplication and enhance maintainability.
- **Error Handling**: Implement basic error handling or logging to capture any anomalies during execution, which can aid in debugging.
- **Defensive Checks**: Although not required, additional checks for `undefined` or `null` values might prevent the function from failing unnecessarily during execution.

## 6. Maintenance & Further Notes
- **Ownership**: Designate a developer or a small team as custodians of this extension, responsible for updates and performance monitoring.
- **Testing Guidelines**: Establish a suite of unit tests to validate the functionality under various scenarios, including edge cases. Ensure that these tests cover both the expected conditions and the nuances of string manipulation.
- **Documentation Updates**: Encourage continuous documentation updates whenever changes are made, keeping all stakeholders informed of the most current functionality and coding practices. 

This documentation provides comprehensive insights into the workings and management of the Tealium iQ extension, enhancing clarity and understanding among developers and stakeholders alike.