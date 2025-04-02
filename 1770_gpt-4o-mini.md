# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: CM : TAG : Set : Mappings : Source, Type and Category Variables
- **ID**: 1770
- **Type**: JavaScript Code
- **Scope**: 1518
- **Execution Frequency**: Active

### Summary
This extension is designed to streamline the mapping of Google DoubleClick tags by injecting a common mapping object (`u.map`) into each tag. By centralising the variable mappings, any amendments made within this extension will automatically propagate to all Google DoubleClick tags, ensuring consistency and reducing maintenance overhead.

---

## 2. Code Explanation

### Key Variables

- **`b`**: A reference to the current `window` object, which holds various properties, including settings specific to DoubleClick.
- **`u`**: Represents the mapping object where all the necessary variables for DoubleClick tags are defined.
- **`eventType` and `eventPayload`**: Parameters that are guaranteed to be present, indicating the type of event and associated data.

### Logic Flow

1. **Mapping Object Creation**: The `u.map` object is populated with key-value pairs that assign specific variable names for Google DoubleClick tracking.
2. **Hardcoding Logic**:
   - If `b.DC_target` is not defined, the script assigns `b.DC_src` to `b.DCSrcLkp`, facilitating the use of the source data.
3. **PII Sanitisation**:
   - Loops through properties in `b`, checking each for sensitive information (e.g., email addresses). If such information is found, it is removed.
4. **Consent Mode Management**:
   - It checks the user's consent status through `LBGAnalytics.privacy.decodeCookie().statusCode`. If consent has not been provided, certain identifiers related to the user (like `paid_order_id`, `FirstPartyCookie`, `applicationID`, and `MobileAdvertiserID`) are deleted from `u.map`.

### Dependencies
- **Global Objects**: The extension depends on the `LBGAnalytics` global object to check the user's consent status.
- **No external libraries** have been referenced; the extension operates solely within the Tealium iQ ecosystem.

---

## 3. Usage Examples

### Normal Scenario
A user visits a product page that is tracked using Google DoubleClick tags. The `u.map` object is populated with values unique to that page, and sensitive information is cleaned before being sent to DoubleClick.

### Edge Conditions
1. **Missing Consent**: If the user has not provided consent (indicated by a status code that is neither "y" nor "t"), the mapping will exclude any identifiers related to the user to comply with privacy regulations.
  
2. **PII Presence**: In situations where user information inadvertently makes its way into the `b` object (like email addresses), those will be removed dynamically, thus preventing PII from being sent unintentionally.

---

## 4. Known Limitations & Gotchas

- **No Fallback Mechanism**: If the `DC_target` variable is expected in other scenarios but not defined, there’s a risk that mappings may not be correctly set, potentially leading to track failures.
- **Potential Script Conflicts**: Conflicts might arise if other extensions or external scripts attempt to manipulate the same `b` or `u` objects, resulting in unexpected behaviour.
  
- **Manual Updates Required**: Changes to the mappings in `u.map` affect all Google DoubleClick tags uniformly. Care is needed to ensure that changes do not inadvertently disrupt data collection across different tags.

---

## 5. Recommendations for Refactoring

1. **Defensive Checks**: While eventType and eventPayload are guaranteed, consider implementing checks to ensure compatibility in scenarios where the library may be adjusted.
   
2. **Code Modularity**: Split logic into separate helper functions (done in a clear modular style) for readability. For example, consider a function for PII sanitisation and another dedicated to consent management.

3. **Variable Naming Consistency**: Ensure consistent naming conventions throughout the code to enhance clarity and maintainability.

4. **Commentary and Documentation**: Further enhance inline comments to explain non-obvious logic and mappings for future developers.

---

## 6. Maintenance & Further Notes

- **Ownership**: Designate an owner for this extension to ensure accountability for updates and changes.
  
- **Testing Guidelines**: Regularly conduct tests to verify mappings are applied correctly across various scenarios, especially after each major update.

- **Documentation Updates**: Keep this documentation updated with any changes in the codebase or variable mappings to facilitate easier onboarding of new developers and stakeholders.

---
  
This documentation aims to provide a comprehensive understanding of the Tealium iQ extension and facilitate its usage and maintenance within your organisation.