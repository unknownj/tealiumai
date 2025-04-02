# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name:** GA360 : XD : Set link decoration type : linking pages
- **ID:** 1583
- **Type:** Advanced Javascript Code
- **Scope:** Before Load Rules
- **Execution Frequency:** Run Always

### Summary
This extension is designed to determine and set the appropriate link decoration type for different pages based on the user's brand (Halifax or Lloyds). It implements a simple mapping of section identifiers to link decoration methods (standard or fragment), allowing seamless tracking of user interactions in Google Analytics 360. It ensures that any undefined pages default to a "none" value, ensuring consistent handling across various scenarios.

---

## 2. Code Explanation

### Key Variables
- `section_id_array`: An array created by splitting the `SectionID` string using colons (:) as delimiters.
- `section_id_last`: The last element of `section_id_array`, serving as the unique identifier for the current page's section.
- `brand`: The brand name obtained from the data layer (`dl`).
- `link_decoration_type_values`: An object that maps specific section IDs to their corresponding link decoration types.
- `link_decoration_type`: The determined link decoration type for the current page, based on its section ID.

### Logic Flow
1. **Brand Check**: Depending on whether the brand is "Halifax" or "Lloyds", a specific set of link decoration values is defined in `link_decoration_type_values`.
2. **Mapping Determination**: The code looks up the `section_id_last` in `link_decoration_type_values` to find the corresponding decoration type.
3. **Default Value Handling**: If no mapping is found, the link decoration type defaults to "none".
4. **Development Log**: In a development environment, the determined link decoration type is logged for verification.

### Dependencies
The extension relies on a global object structure defined by Tealium, specifically:
- `dl`: This represents the data layer containing relevant data (such as `SectionID` and `Brand`) needed for the extension's logic.
- `b`: This object is used to set the output value for `link_decoration_type`.

---

## 3. Usage Examples

### Normal Condition
- **Input**: The `SectionID` is "bankaccounts_current_accounts_current_account" and the `Brand` is "Halifax".
- **Output**: The extension determines the `link_decoration_type` as "standard" for this page, reflecting the defined mapping.

### Edge Condition
- **Input**: The `SectionID` is "unknown_section" and the `Brand` is "Lloyds".
- **Output**: The extension defaults the `link_decoration_type` to "none" as there is no mapping available for "unknown_section", ensuring no undefined behaviour occurs.

---

## 4. Known Limitations & Gotchas

- **Static Mapping**: The link decoration values are hardcoded, which means any updates will require a modification to the extension code.
- **Limited Brand Support**: Currently, only "Halifax" and "Lloyds" are supported. Any other brands will not have defined behaviour.
- **No Error Handling**: If the `SectionID` property is undefined or incorrectly formatted, unexpected behaviour may occur.
- **Global Dependencies**: The reliance on the structure of `dl` and `b` without checks could lead to issues if those structures change in future implementations.

---

## 5. Recommendations for Refactoring

- **Modularisation**: Consider breaking out the logic determining `link_decoration_type_values` into separate functions for clarity and maintainability.
- **Dynamic Mapping**: Explore options for loading mappings from an external configuration to allow for easier updates without modifying the extension code directly.
- **Default Handling**: Introduce more descriptive handling when the brand or section ID is unknown, possibly logging meaningful error messages.
- **Consistency Checks**: Implement checks to validate the presence and format of `SectionID` before attempting to split it, ensuring robustness.

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign ownership to specific team members responsible for maintaining and updating the extension.
- **Testing Guidelines**: Establish a procedure for testing each mapping update in a development environment to ensure correctness before deployment.
- **Version Control**: Use version control to keep track of changes to avoid regressions and maintain a history of modifications.
- **Documentation Updates**: Regularly review and update this documentation upon modifications to the code or mapping requirements.

This documentation serves as a comprehensive reference for developers and stakeholders involved with the GA360 XD extension in Tealium iQ. Careful adherence to these guidelines will ensure better maintainability and functionality in analytics tracking.