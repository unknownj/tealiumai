# Tealium iQ Extension Documentation: Pegasus Tag Title

## 1. Extension Overview

- **Name**: Pegasus Tag Title
- **ID**: 1270
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
The Pegasus Tag Title extension is designed to enhance and structure marketing and product information by creating specific tags in the data layer. It differentiates brands and divisions in data processing, adds flexibility to product groupings, page roles, and application states, and ensures the resulting tags adhere to a curated list of allowable values. This extension improves the accuracy and reliability of tracking for analytics and reporting purposes.

---

## 2. Code Explanation

### Key Variables
- **`b`**: The object that carries the event payload, which contains the attributes needed for processing.
- **`dl`**: A reference to the data layer that is being manipulated.
- **`tag_structure`**: An array defining the structure for generating tags, including allowable values and mapping.

### Logic Flow
1. **Pegasus Brand Processing**: 
   - The extension checks the `Brand` property for known values (e.g., "LLOYDS", "HALIFAX"). 
   - If a match is found, it constructs a `PegasusBrand` by concatenating the `Brand` with its `Division` if applicable.
   - If the brand is not one of the known values, a simple brand name is set.

2. **Product Group, Page Role, and Application State Initialization**:
   - If `PegasusProductGroup`, `PegasusPageRole`, or `PegasusApplicationState` do not exist or are empty, they are populated with their respective original values.

3. **Tag Structure Definition**:
   - Sets up an array of objects defining the mapping for various data points like brands, product groups, etc.
   - Maps values from the incoming data to normalized tags.

4. **Data Layer Updates**:
   - Constructs a `PegasusTagsName` based on the values in `tag_structure` and updates the data layer accordingly.

### Dependencies
- This extension relies on the global `utag` object for data layer writing (`utag.data`) and retrieval.
- It is contingent on certain attributes being available in the incoming event payload, such as `Brand`, `Division`, etc.

---

## 3. Usage Examples

### Normal Flow
1. **Input**: An event payload with `Brand = "Lloyds"`, `Division = "Commercial"`, `ProductGroup = "Savings"`, `PageRole = "Homepage"`, `ApplicationState = "Pre-Application"`.
2. **Output**: 
   - `PegasusBrand = "Lloyds Commercial"`
   - `PegasusProductGroup = "Savings"`
   - `PegasusPageRole = "Homepage"`
   - `PegasusApplicationState = "App Start"`

### Edge Conditions
1. **Missing Values**: If `PageRole` is missing from the payload, it defaults to `NA` in the output.
2. **Non-Standard Values**: For values outside the allowable list, the output will contain "NA". For example, if `ProductGroup = "Other"`, `PegasusProductGroup` becomes `"NA"`.

---

## 4. Known Limitations & Gotchas

- **Undefined Variables**: If the properties such as `Brand`, `ProductGroup`, or `Division` are not present in the incoming payload, it may lead to undefined references or incorrect tagging.
- **Hard-Coded Values**: The allowable values and mappings are hardcoded, requiring updates in the code for any changes in policy or business needs.
- **Potential Conflicts**: If there are other extensions or scripts that modify the same variables in the data layer, it could lead to inconsistencies.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: While not mandated, adding checks for the presence of expected properties could mitigate errors in edge cases.
- **Code Modularity**: Consider refactoring the lengthy processing logic into smaller, self-contained functions to improve readability and maintenance.
- **Documentation within Code**: Adding inline comments to clarify complex logic sections can benefit future developers.
- **Consistent Naming Conventions**: Ensure variable names are consistently formatted, aiding in readability.

---

## 6. Maintenance & Further Notes

- **Ownership**: Designate a project owner who is responsible for the documentation and updates of this extension.
- **Testing Guidelines**: Encourage thorough testing whenever any modifications are made to the extension. Use real-world scenarios to validate tag outputs.
- **Regular Reviews**: Set a schedule for periodic reviews to check for dependencies, updates, and potential refactoring opportunities.

This documentation provides a comprehensive overview of the Pegasus Tag Title extension, supporting effective usage, continuous improvement, and best practices for development within the Tealium iQ environment.