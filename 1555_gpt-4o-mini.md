# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name**: GA360 : Test for duplicate tag load
- **ID**: 1555
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to prevent the duplicate loading of tags during specific marketing journeys (referred to as PCA journeys). It does this by:
- Comparing values associated with `JourneyStep` and `JourneyUniqueID` from the data layer (`dl`) with persisted values (`utag_main_js` and `utag_main_juid`).
- Returning a boolean value (`true` or `false`) to indicate whether a duplicate tag load has occurred. This is stored in the variable `isPCADuplicateTagLoad`.

---

## 2. Code Explanation

### Key Variables
- `journey_step`: Extracts the current journey step from the data layer.
- `journey_step_cp`: Extracts the persisted journey step from the data layer variable `cp.utag_main_js`.
- `journey_unique_id`: Extracts the current unique ID from the data layer.
- `journey_unique_id_cp`: Extracts the persisted unique ID from the data layer variable `cp.utag_main_juid`.

### Logic Flow
1. The function `test_for_dupe_tag_load` is invoked with the `data layer (dl)` as an argument.
2. It first checks if both `journey_step_cp` and `journey_unique_id_cp` are truthy.
   - If both match their counterparts, it returns `true`, indicating a duplicate.
3. If only `journey_step_cp` exists and `journey_unique_id_cp` is either `undefined` or `null`, it will only compare `journey_step`.
4. If neither variable is provided, it returns `false`, as it determines that no duplicate is present.
5. The result of `test_for_dupe_tag_load(b)` is stored in `b.isPCADuplicateTagLoad`.

### Dependencies
- The extension relies on the global `data layer` (dl) object for retrieving journey step and unique ID values.

---

## 3. Usage Examples

### Normal Scenario
- **Input**: 
  - `dl.JourneyStep` = "Step1"
  - `dl.JourneyUniqueID` = "UID12345"
  - `dl["cp.utag_main_js"]` = "Step1"
  - `dl["cp.utag_main_juid"]` = "UID12345"
- **Output**: `isPCADuplicateTagLoad` = `true` (indicating a duplicate tag load)

### Edge Condition
- **Input**: 
  - `dl.JourneyStep` = "Step1"
  - `dl.JourneyUniqueID` = "UID12345"
  - `dl["cp.utag_main_js"]` = "Step2"
  - `dl["cp.utag_main_juid"]` = null
- **Output**: `isPCADuplicateTagLoad` = `false` (indicating no duplicate tag load)

### Failure Scenario
- **Input**: 
  - `dl.JourneyStep` = "Step1"
  - `dl.JourneyUniqueID` = "UID12345"
  - Both `dl["cp.utag_main_js"]` and `dl["cp.utag_main_juid"]` are undefined.
- **Output**: `isPCADuplicateTagLoad` = `false` (as no comparison can be made)

---

## 4. Known Limitations & Gotchas
- If both `journey_step_cp` and `journey_unique_id_cp` are not provided or are `null`/`undefined`, the extension will always return `false`, which might falsely indicate no duplicates.
- The extension may conflict with other extensions that manipulate or depend on the same data layer variables, possibly leading to unexpected results from one or both extensions.

---

## 5. Recommendations for Refactoring
- Consider adding comments before each conditional block to clarify the intention behind them.
- For increased readability, segment logic into smaller helper functions that can be reused or better understood.
- Employ defensive checks within functions to safeguard against potential errors—even though `eventType` and `eventPayload` are guaranteed, validating their structure can reduce future debugging overhead.
- Ensure consistent naming conventions and code style to maintain clarity, for example, use consistent casing for variable names.

---

## 6. Maintenance & Further Notes
- Ongoing maintenance responsibility should be assigned to a designated team or individual familiar with the logic of the extension.
- It is advisable to regularly test the extension, particularly after any changes to the data layer or related extensions.
- Ensure that any updates to requirements or individual behaviours are documented within this documentation for future reference.

--- 

This document is intended to provide a comprehensive reference for developers and stakeholders involved with the Tealium iQ extensions, promoting clarity and understanding of functionality, usage, and maintenance practices.