# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: CM : GAD : Set : Mappings
- **ID**: 1772
- **Type**: Javascript Code
- **Scope**: 1516
- **Execution Frequency**: Active

### Summary
This extension is designed to integrate with Google DoubleClick tags, ensuring consistent mapping of identifiers across various tags. It injects a predefined `u.map` object, allowing central management of key mapping variables, thus simplifying updates and maintaining consistency throughout all Google DoubleClick tags. This decentralised management is essential for streamlined tracking and analytics implementation.

## 2. Code Explanation

### Key Variables
- **u.map**: This object holds key-value pairs that represent the mapping between Google DoubleClick identifiers and the custom identifiers used within the project. 
  
### Logic Flow
1. The `u.map` object is hardcoded to include a variety of mappings for Google DoubleClick tags.
2. The extension checks for user consent using `LBGAnalytics.privacy.decodeCookie()`.
3. If consent is not given, specific entries (like `paid_order_id` and `ApplicationID`) are removed from the `u.map` object.

### Dependencies
- The extension relies on a global object `LBGAnalytics` for checking user consent. This object must be defined prior to the execution of this extension to ensure functionality.

## 3. Usage Examples

### Normal Scenario
1. A user engages with the website and gives consent to cookies.
2. The `u.map` object includes all mappings, including `paid_order_id` and `ApplicationID`. 
3. The Google DoubleClick tags can utilize these mapping values for tracking conversions effectively.

### Edge Condition
1. A user visits the site but declines consent cookies.
2. The extension triggers the conditional logic that removes `paid_order_id` and `ApplicationID` from the `u.map` object.
3. Google DoubleClick tags will be executed without these identifiers, ensuring compliance with consent requirements.

## 4. Known Limitations & Gotchas

- If `LBGAnalytics` is not available, the consent check fails which may lead to undesired behaviour in the mapping application.
- Modifications to the `u.map` object must be communicated and coordinated across teams to avoid inconsistencies.
- This extension assumes that the identifiers in the mapping will always align with the required values expected by the Google DoubleClick tags.

## 5. Recommendations for Refactoring

- **Central Configurations**: Consider moving the mapping logic to a configuration object to simplify potential future updates.
- **Code Modularity**: Break down the logic into smaller functions, especially for consent checks and mapping assignment, which would enhance readability.
- **Logging**: Add logging before significant operations (like removal of identifiers) to aid in debugging and monitoring the functionality.
- **Variable Naming**: Consider using more descriptive variable names to clarify their purpose, which would improve maintainability.

## 6. Maintenance & Further Notes

- **Ownership**: Designate a team member responsible for the maintenance of this extension, ensuring it's regularly reviewed and tested after any changes are made.
- **Testing Guidelines**: Implement unit tests for the extension logic and consent handling. Simulate different conditions to ensure correctness and reliability.
- **Documentation Updates**: Maintain this documentation alongside code changes; any modifications made to the extension should be immediately reflected in this document for clarity to stakeholders and other developers.

---

This comprehensive documentation serves as a guide for understanding, using, and maintaining the Tealium iQ extension, ensuring clarity and consistency across the development team and associated stakeholders.