# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: CM GDC : TAG : Set : Payload : Source, Type and Category Variables
- **ID**: 1764
- **Type**: JavaScript Code
- **Scope**: 1516, 1518
- **Execution Frequency**: Active

### Summary
This extension is designed to enhance Google DoubleClick (DC) tag functionality within the Tealium iQ environment. It performs two main operations:
1. It checks whether the `DC_target` datalayer variable has been populated. If not, it aborts the tag firing process.
2. If `DC_target` is present, it unpacks its value by splitting the string on the delimiter `!` and assigns the resulting values to datalayer variables `DC_src`, `DC_type`, and `DC_cat`. If `DC_src` is not present, only `DC_type` and `DC_cat` are assigned.

## 2. Code Explanation

### Key Variables
- `active`: A flag to check if the current extension is active.
- `extensions`: A reference to the existing extensions in the `u` (e.g., Tealium) object.
- `dcObject`: An object used to store the final mapped values of `DC_src`, `DC_type`, and `DC_cat`.

### Logic Flow
- The code begins by checking if the extension is the active one by scanning through the list of extension codes.
- It then verifies whether `DC_target` is populated by calling `checkDcTarget()`. If it's not, the function returns false to prevent the tag from firing.
- If `DC_target` is valid, the code proceeds to unpack its value into an array using the `unpackDc()` function.
- Depending on the length of the unpacked array, it maps the values to the `dcObject` using `createDefaultObj()`, `createSrcObj()`, or `createGADObj()`, which handle different scenarios based on the array length.
- Finally, the values are merged back into the `eventPayload` object for use in the tag firing process.

### Dependencies
- The code relies on global objects such as `b` for the event data and `u` for accessing the Tealium extensions.
- Functions within the extension are not dependent on any external libraries, operating solely on the provided `eventPayload`.

## 3. Usage Examples

### Normal Conditions
- **Scenario**: `DC_target` is populated as `"source!type!category"`.
  - **Input**: `b.DC_target = "source!type!category";`
  - **Output**: 
    - `b.DC_src = "source";`
    - `b.DC_type = "type";`
    - `b.DC_cat = "category";`
  
### Edge Conditions
- **Scenario**: `DC_target` is empty or zero.
  - **Input**: `b.DC_target = "";`
  - **Output**: Tag firing is aborted; no variables are set.

- **Scenario**: `DC_target` contains only `type` and `category`.
  - **Input**: `b.DC_target = "type!category";`
  - **Output**: 
    - `b.DC_type = "type";`
    - `b.DC_cat = "category";`
    - `b.DC_src` remains unset.

## 4. Known Limitations & Gotchas

- **Failure on Non-Standard Input**: The extension assumes that `DC_target` is always a correctly formatted string. Incorrect formats may lead to unexpected results.
- **Order Dependency**: This extension relies on the execution order of the Tealium extensions. If other extensions modify `DC_target`, it could lead to incorrect data mapping.
- **No Fallbacks**: If `DC_target` is incorrectly populated or absent, the extension does not set default values for other variables, which could lead to data loss.

## 5. Recommendations for Refactoring

- **Defensive Checks**: While we assume that `eventType` and `eventPayload` are present, additional checks validating the format of `DC_target` could enhance the robustness.
- **Code Style**: Consistency in using semicolons and indentation can improve readability.
- **Modularization**: Separating code sections into distinct functions with clear names can make maintenance easier (e.g., placing object creation functions in a separate module).
- **Logging**: Adding error logging for unexpected data formats could be beneficial for debugging.

## 6. Maintenance & Further Notes

- **Ownership**: Assign a maintenance owner responsible for monitoring the extension's performance and making necessary updates as data structures change.
- **Testing Guidelines**: Establish a set of test cases that simulate both normal and edge conditions to ensure correct functionality after changes.
- **Documentation Updates**: Keep this documentation in sync with any changes to the code or its functionality for clarity among the development team.

By following this structured documentation, developers and stakeholders can gain a comprehensive understanding of the extension's purpose, functionality, and maintenance requirements.