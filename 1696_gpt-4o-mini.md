# Tealium iQ Extension Documentation: SCEP Components

## 1. Extension Overview

- **Name**: SCEP Components
- **ID**: 1696
- **Type**: Javascript Code
- **Scope**: 928
- **Execution Frequency**: Executes on a specific condition (1% chance)

### Summary
The **SCEP Components** extension is designed to capture and log the usage of specific CSS class components across a webpage. When executed, it randomly selects a component class, constructs an identifier, and assigns it to two properties in the analytics tool (s.prop61 and s.prop62). This functionality aids in monitoring and analysing the occurrence of AEM components within a site, providing valuable insights into user interaction with these components.

---

## 2. Code Explanation

### Key Variables
- `tags`: A list of all DOM elements selected from the document.
- `classes`: An object used to count the occurrences of class names starting with "c-".
- `classList`: An array holding the keys (unique class names) extracted from the `classes` object.
- `randomClass`: A randomly selected class name from `classList`.
- `classPieces`: An array derived from splitting the `randomClass` by a hyphen ("-").
- `classID`: A constructed string to serve as the identifier.

### Logic Flow
1. The function checks if the global object `s` exists and if properties `s.prop61` and `s.prop62` are not already set.
2. It also ensures the execution runs with a random chance of 1%.
3. The code collects all HTML elements and reduces them to a count of classes prefixed with "c-".
4. A random class is then selected, the class name is split to create a structured format, and finally, the resulting identifier is assigned to `s.prop61` and `s.prop62` for further analytics processing.

### Dependencies
- The code depends on the global object `s`, which is typically provided by Adobe Analytics.
- No other external libraries or frameworks are required.

---

## 3. Usage Examples

### Normal Condition
- When a user visits a page with various AEM component classes, and the script executes, it may log something like:
  - `s.prop61 = "AEM Component Inventory"`
  - `s.prop62 = "AEM/c-component-name"` (where `component-name` is one of the random classes).

### Edge Condition
- If a page does not have any elements with class names starting with "c-", the script will not assign values to `s.prop61` or `s.prop62`, resulting in no tracking data for that session.

---

## 4. Known Limitations & Gotchas

- **CSS Class Dependency**: This extension relies solely on class names starting with "c-". If class naming conventions change, the effectiveness of the extension may diminish.
- **Execution Frequency**: The random execution condition (1%) may lead to underreporting of component usage, especially on pages with fewer visits.
- **Potential Conflicts**: If other extensions manipulate `s.prop61` and `s.prop62` concurrently, the values may be overwritten, leading to inaccurate data reporting.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: While the current implementation is straightforward, incorporating checks to handle cases where DOM queries return `null` could prevent errors.
- **Code Style**: Maintain consistent formatting and indentation for better readability.
- **Modularization**: Consider breaking the functionality into smaller functions for clarity, such as separating concerns of gathering classes and constructing the identifier.
- **Logging**: Introducing logging during critical operations can help with troubleshooting and debugging.

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign a dedicated owner for the ongoing maintenance of this extension to ensure timely updates in response to web changes or analytics requirements.
- **Testing Guidelines**: Regular testing should be scheduled to ensure the extension continues to perform as expected, especially after any changes to the webpage structure or styling conventions.
- **Documentation Updates**: Maintain an up-to-date documentation page reflecting any changes made to the extension or new insights gained from the collected data.

---

This documentation aims to provide a thorough understanding of the SCEP Components extension, ensuring effective utilisation and maintenance within the Tealium iQ framework. 