# Tealium iQ Extension Documentation: OBK Fixes (OLD JS)

## Extension Overview
- **Name**: OBK Fixes (OLD JS)
- **ID**: 1265
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The **OBK Fixes (OLD JS)** extension is designed to normalise the `ProductGroup` values within the `eventPayload` object. It specifically targets car finance and credit card categories, ensuring consistent casing for internal processing. The normalisation helps maintain consistency in data tracking and reporting across the Tealium platform, preventing discrepancies caused by variations in string formats (e.g., casing).

---

## Code Explanation
### Key Variables
- **eventType**: This represents the type of event that triggers the extension.
- **eventPayload**: This is an object containing various key-value pairs, one of which is `ProductGroup`.

### Logic Flow
1. The extension begins by executing an **Immediately Invoked Function Expression (IIFE)** to encapsulate the logic and prevent variable leakage into the global scope.
2. It checks if the `ProductGroup` property exists within the `eventPayload` object.
3. If `ProductGroup` exists, it converts the value to lowercase and checks against known product categories.
4. Based on the matched condition, it reassigns `ProductGroup` to a predefined format:
   - "car finance" becomes "CarFinance"
   - "credit cards" or "creditcard" becomes "CreditCards"

### Dependencies
- The extension relies on the `eventType` and `eventPayload` variables being available in the global scope. These are guaranteed to be present by the Tealium framework when the extension is invoked.

---

## Usage Examples
### Normal Conditions
- **Input**: 
  - `eventPayload.ProductGroup = "car finance"`
- **Output**: 
  - After execution, `eventPayload.ProductGroup` will be `"CarFinance"`.

### Edge Conditions
- **Input**: 
  - `eventPayload.ProductGroup = "UNKNOWN"`
- **Output**: 
  - The `ProductGroup` remains unchanged at `"UNKNOWN"`, as no mapping is provided for this value.
  
### Execution Scenarios
- When the `eventPayload` does not include a `ProductGroup`, the script will simply do nothing, leaving the `ProductGroup` unchanged if it exists.

---

## Known Limitations & Gotchas
- If `ProductGroup` is set to `null` or is an empty string, it will result in no action, which may lead to inconsistencies if downstream systems depend on a valid `ProductGroup` value.
- Misspellings or unexpected formats in the `ProductGroup` may lead to failure in mapping to the desired category.
- This extension may conflict with other extensions that attempt to modify the `ProductGroup`, potentially leading to unexpected results. Care should be taken to coordinate with other developers regarding shared variable spaces.

---

## Recommendations for Refactoring
- **Defensive Checks**: Although the existence of `eventType` and `eventPayload` is guaranteed, it is considered good practice to validate structured contents to prevent unexpected behaviour (e.g., ensuring `ProductGroup` is a string).
- **Code Style**: Consider breaking out repetitive code into helper functions, e.g., mapping product groups, to improve readability and maintenance.
- **Modularisation**: If possible, isolate this logic in a broader context to make it reusable across other extensions that may benefit from similar processing.

---

## Maintenance & Further Notes
- **Ownership**: Clear responsibility for the ongoing maintenance should be assigned to a specific team member or group.
- **Testing Guidelines**: Regular tests should be conducted to ensure that the extension works within the latest ecosystem of Tealium and does not conflict with other extensions. Automated tests should be implemented wherever possible to cover normal and edge cases.
- **Documentation Updates**: Keep the documentation current as modifications are made to the extension to ensure all stakeholders remain informed about changes and capabilities.