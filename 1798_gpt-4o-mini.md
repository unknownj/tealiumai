# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Firestore ID lookup payload unpack
- **ID**: 1798
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is specifically designed for Google DoubleClick tags, executing two primary functions:

1. It checks whether the `DC_target` variable has been populated. If not, it aborts the firing of the tag.
2. It unpacks the `DC_target` string by splitting it based on the delimiter `!`, mapping the resulting values into `DC_src`, `DC_type`, and `DC_cat`. The unpacking behaviour is conditional on the presence of `DC_src` in the unpacked values.

## 2. Code Explanation

### Key Variables
- **`b`**: Represents the global object within the extension context. It is used to access or manipulate data such as `DC_IDs`.
- **`dcObject`**: An object constructed to hold the unpacked values of `DC_src` and `DC_act`.
- **`flag`**: A boolean variable indicating if `DC_IDs` is populated.

### Logic Flow
1. **Check Data Validity**: The function `checkDcIDs` verifies whether `DC_IDs` is present and not equal to zero. If not, execution stops early.
2. **Unpack Values**: The `unpackDc` function splits the `DC_IDs` string into an array using the `!` delimiter.
3. **Mapping Values**: If the unpacked array has two elements, `createActObj` constructs an object from these values, assigning them to `DC_src` and `DC_act`.
4. **Data Integration**: The populated values in `dcObject` are merged back into the event payload, enabling them to be accessed by subsequent tags.
5. **Data Layer Updates**: Finally, the updated values are set in both the `utag.data` object and the external `clova3.datalayer`.

### Dependencies
- **Global Objects**: Relies on `utag.data` and `clova3.datalayer`, which need to be present in the Tealium data layer for successful execution.

## 3. Usage Examples

### Normal Flow
1. **Input Scenario**:
   - `b.DC_IDs` = `"sourceType!actionType"`
2. **Processing**:
   - `flag` is true, `unpackDc` splits the string into `["sourceType", "actionType"]`.
   - `createActObj` constructs `dcObject` = `{ DC_src: "sourceType", DC_act: "actionType" }`.
3. **Output**:
   - Sets `utag.data.DC_src` to `"sourceType"` and `utag.data.DC_act` to `"actionType"`.

### Edge Condition
1. **Input Scenario**:
   - `b.DC_IDs` = `""` (empty string)
2. **Processing**:
   - `flag` is false, early exit occurs.
3. **Output**:
   - No values are set in `utag.data` or `clova3.datalayer`, and the tag firing is aborted.

## 4. Known Limitations & Gotchas

- **Invalid Data Format**: If `DC_IDs` is not formatted correctly (not containing `!`), the extension does not handle this explicitly. It may result in undefined values being assigned to `DC_src` and `DC_act`.
- **Dependency on Global Objects**: The extension's functionality is contingent on the availability of `clova3.datalayer`. If this object does not exist in the environment, it will throw an error.
- **Non-Descriptive Failures**: When `DC_IDs` is empty or improperly formatted, the extension fails silently; debugging can be challenging without adequate logging.

## 5. Recommendations for Refactoring

- **Error Handling**: Introduce validation for `DC_IDs` to ensure it conforms to expected formats before attempting unpacking. Log errors appropriately for easier debugging.
  
  ```javascript
  if (typeof b.DC_IDs !== 'string' || !b.DC_IDs.includes('!')) {
      console.error("Invalid DC_IDs format");
      return false;
  }
  ```
  
- **Modularisation**: Consider breaking out utility functions into separate modules if the codebase expands. This enhances readability and maintainability.
- **Code Style Consistency**: Maintain consistent use of variable declarations and format across the extension for better readability. For instance, opt for consistent naming conventions.
  
## 6. Maintenance & Further Notes

- **Ownership**: Assign a responsible developer for ongoing maintenance and updates to the extension as system requirements evolve.
- **Testing Guidelines**: Regularly test functionality in multiple environments, especially after making any changes or updates to the extension.
- **Document Changes**: Keep a log of any modifications to the code so that future developers can understand the history and reasoning behind changes.

This documentation should serve as a comprehensive guide to understanding, using, and maintaining the Firestore ID lookup payload unpack extension within Tealium iQ.