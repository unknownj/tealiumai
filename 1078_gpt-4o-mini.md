# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: WTA : TAG : Set : Consent Cookie Status
- **ID**: 1078
- **Type**: Javascript Code
- **Scope**: 894
- **Execution Frequency**: Active

### Summary
This extension modifies the Cookie Consent values from boolean (true/false) to integers (1/0) for the purpose of compatibility with WebTrends analytics. The extension ensures that the values within the event payload are correctly formatted for analytical collection by transforming the consent cookie statuses.

---

## 2. Code Explanation

### Key Variables
- `eventType`: Represents the type of event being processed.
- `eventPayload`: An object holding the payload data for the event, which includes the Cookie Consent values.
- `tagObject`: An object that may contain additional information about the tag, although not explicitly used in this code.

### Logic Flow
1. The extension checks if the `CookiesFunctional`, `CookiesPerformance`, and `CookiesTargeting` properties exist in the `eventPayload`.
2. If a property exists and its value is `true`, it is converted to the string `'1'`.
3. If the value is `false`, it is converted to `'0'`.

### Code Processing
```javascript
if (b.hasOwnProperty('CookiesFunctional')) {
  b['CookiesFunctional'] = (b['CookiesFunctional']) ? '1' : '0';
}
```
This snippet checks if the `CookiesFunctional` property exists in the `eventPayload`. If it does, it assigns either `'1'` or `'0'` based on the current boolean value.

### Dependencies
- This extension relies on the existence of the properties within the `eventPayload` object. It does not have dependencies on global objects or external libraries beyond the standard JavaScript environment.

---

## 3. Usage Examples

### Normal Scenario
- **Input**: 
```javascript
{
  'CookiesFunctional': true,
  'CookiesPerformance': false,
  'CookiesTargeting': true
}
```
- **Output**:
```javascript
{
  'CookiesFunctional': '1',
  'CookiesPerformance': '0',
  'CookiesTargeting': '1'
}
```
In this scenario, the boolean values are correctly transformed to their respective string representations.

### Edge Condition
- **Input**:
```javascript
{
  'CookiesFunctional': undefined,
  'CookiesPerformance': true,
  'CookiesTargeting': false
}
```
- **Output**:
```javascript
{
  'CookiesFunctional': undefined,
  'CookiesPerformance': '1',
  'CookiesTargeting': '0'
}
```
Here, the `CookiesFunctional` property is absent, so it remains unchanged, while the other properties are converted appropriately. This shows the extension's grace in handling missing properties.

---

## 4. Known Limitations & Gotchas

- **Default Values**: If any of the cookie consent properties are not present in the `eventPayload`, they will not be modified. The extension does not provide default values for these properties, which might lead to unexpected outcomes if not handled elsewhere.
- **Data Types**: The transformation results in string representations, which may need to be handled appropriately downstream in the data processing pipeline.
- **Compatibility**: Ensure that other extensions or scripts relying on the 'CookiesFunctional', 'CookiesPerformance', and 'CookiesTargeting' fields do not expect boolean values, as this extension alters their types.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Although we are instructed not to implement defensive coding for `eventType` and `eventPayload`, consider including validation checks for the properties to ensure they are of the expected type (boolean).
- **Descriptive Comments**: Improve code comments to ensure other developers can quickly understand the purpose of each condition and statement.
- **Modularisation**: Consider extracting the transformation logic into separate functions for better readability and possible reuse.

---

## 6. Maintenance & Further Notes

- **Code Ownership**: Assign a dedicated developer or team responsible for maintaining this extension, ensuring they are familiar with the implications of altering cookie consent values.
- **Testing Guidelines**: Set up automated tests that verify the output of the extension for various input scenarios, including all edge cases. Manual testing should also be considered for initial deployments.
- **Documentation Updates**: Regularly update this documentation as the extension evolves or as new requirements emerge.

For further questions or discussions, please reach out to the development team or check the project management tool for ongoing tasks and issues related to this extension. 

--- 

This documentation should facilitate understanding and maintenance of the Tealium iQ extension by developers and stakeholders alike.