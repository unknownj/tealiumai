# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name:** Change Cookie variables to Booleans for Celebrus
- **ID:** 1483
- **Type:** Advanced Javascript Code
- **Scope:** 1222
- **Execution Frequency:** Active

### Summary
This extension translates specific Universal Data Object (UDO) variables into boolean values that are compatible with Celebrus. By mapping variables to corresponding keys, it enables the correct transmission of cookie data to facilitate effective tracking and analytics. This extension is essential for ensuring that Celebrus can interpret the necessary values from the environment.

---

## 2. Code Explanation

### Key Variables
- **`mapping`:** An object containing key-value pairs where the key represents the original UDO variable names and the value represents the corresponding Celebrus variable names.
- **`k`:** A variable used in the `for` loop to iterate through the `mapping` object keys.

### Logic Flow
1. The extension begins by defining a mapping object that links UDO keys to their Celebrus counterparts.
2. Using a `for` loop, it iterates over the keys in the `mapping` object, assigning the mapped values to `u.map`, which is likely part of Tealium's internal structure for storing mapping data.
3. The extension explicitly sets the `CookiesTargeting` and `CookiesPerformance` variables in the `b` object to boolean values using the double negation operator (`!!`). This converts the values to true or false, depending on their initial state.

### Dependencies
- The extension relies on two global objects: `u` (presumably the Tealium Universal Data Object) and `b` (potentially another object for storing cookie configurations). It is assumed that these objects are available and correctly initialized within the Tealium environment.

---

## 3. Usage Examples

### Normal Condition
When a standard UDO object is passed to the extension:
- The UDO may contain variables for Campaign Source, Journey Action, etc.
- These variables are mapped to the respective Celebrus keys and stored in `u.map`, enabling seamless data capture for analytics.

### Edge Condition
If the UDO object does not include certain variables (e.g., some campaign or journey variables):
- The mappings for those variables will simply not be added to `u.map`, as unsupported variables are filtered out.
- The extension will not throw an error, but the missing data will not be sent to Celebrus, highlighting the importance of the supported UDO structure.

---

## 4. Known Limitations & Gotchas

- **Missing UDO Variables:** If the UDO object does not contain all expected variables, the corresponding mappings will not be created, which might result in incomplete data being sent to Celebrus.
- **Conflicts with Other Extensions:** If other Tealium extensions also modify `u.map` or any of the `b` properties, there may be unexpected outcomes, especially if they operate in the same execution context.
- **Global Object Dependencies:** The extension assumes the existence of `u` and `b`. If these objects are modified or overwritten by another extension or external script, it could lead to failures in behaviour.

---

## 5. Recommendations for Refactoring

- **Defensive Checks:** Although we are not required to implement defensive coding for the availability of `eventType` and `eventPayload`, ensure other dependencies (i.e., the global objects `u` and `b`) are checked prior to use to enhance reliability.
- **Modularization:** Consider breaking down the mapping functionality into smaller, reusable functions that could be tested independently.
- **Code Style:** Maintain consistency in variable naming and indentation for clarity. Comments should be improved to give context for each section of the code.

---

## 6. Maintenance & Further Notes

- **Ownership & Responsibilities:** Assign a dedicated owner for this extension to ensure accountability for updates and performance.
- **Testing Guidelines:** Regularly validate the functionality of the extension with various datasets to ensure compatibility with changes in UDO or external systems. Use automated tests where feasible.
- **Ongoing Maintenance:** Review and update the mapping object periodically to ensure it remains in sync with changes in business requirements or underlying data structures.

---

This documentation serves as a detailed guide for developers and stakeholders involved with the Tealium iQ extension for Celebrus cookie management. Ensure to keep it updated as code changes occur or as more knowledge about the system is gained.