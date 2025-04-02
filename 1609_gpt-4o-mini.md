# Tealium iQ Extension Documentation

## Extension Overview

- **Name**: Event Stream Data Mappings
- **ID**: 1609
- **Type**: Javascript Code
- **Scope**: 1459
- **Execution Frequency**: On every event trigger.

### Summary
This Tealium iQ extension processes `eventPayload` to map variables to EventStream based on predefined criteria. It ensures that sensitive data is not sent unless marketing consent is granted and dynamically includes additional variables defined within the Adobe Analytics tag. This extension facilitates controlled data mapping for analytics purposes, ensuring compliance with marketing consent regulations.

---

## Code Explanation

### Key Variables
1. **eventStreamVariables**: 
   - An array storing core variable names that should always be sent to EventStream.

2. **eventStreamVariablePrefixes**: 
   - An array containing prefixes for variable names. Variables that begin with any of these prefixes will also be included in the mapping.

3. **eventStreamCMVariableRemoves**: 
   - An array of variable names that should be removed from the payload if marketing consent is not granted.

### Logic Flow
1. **Dynamic Variable Collection**: 
   - The code attempts to add all variables defined within the Adobe Analytics tag to the `eventStreamVariables`. If the tag is not present, it safely catches the error and continues execution.

2. **Additional Variable Mapping**: 
   - The code checks for any variable names in the `eventPayload` that start with the specified prefixes. Qualified variables are then added to `eventStreamVariables`.

3. **Payload Cleanup**: 
   - It iterates over `eventPayload` and removes any variable that is not included in `eventStreamVariables`.

4. **Marketing Consent Check**: 
   - If marketing consent (tracked by `b["CookiesTargeting"]`) is not granted, the code removes variables listed in `eventStreamCMVariableRemoves` from the `eventPayload`.

### Dependencies on Global Objects
- **`utag`**: This extension relies on the global `utag` object to access the Adobe Analytics tag data. If the required tag is absent, it handles the situation without throwing errors.

---

## Usage Examples

### Normal Condition
When a user interacts with the application, the `eventPayload` might contain several variables, including `cp.trace_id`, `gclid`, and user-click data. When the event triggers, this extension will:
- Include `gclid` (since it's in the always-mapped list).
- Add any variables starting with specified prefixes (e.g. `cp.utag_main`).
- Remove any variables that aren't permitted based on consent status.

### Edge Condition
When `b["CookiesTargeting"]` is not true, and `eventPayload` contains sensitive variables like `CustomerEmail`:
- Those variables will be removed from the payload, ensuring compliance with marketing regulations.

---

## Known Limitations & Gotchas

- **Dependency on `utag`**: If the expected Adobe Analytics tag is not loaded, the extension may not function as intended, although it gracefully handles the missing tag.
- **Variable Name Conflicts**: If variable names in `eventPayload` inadvertently match sensitive variables, they may get deleted erroneously when consent is not granted, potentially impacting analytics data.
- **No Fallback Mechanism**: There is no fallback mechanism for variables not captured in `eventStreamVariables`. If such a variable is crucial for analytics, it could be lost when the payload is cleaned.
  
---

## Recommendations for Refactoring

1. **Modularization**: Consider breaking down the logic into smaller, more focused functions. Functions could handle:
   - Dynamic variable collection
   - Consent checks
   - Payload cleanup

2. **Consistent Error Handling**: While the extension currently uses try-catch for error handling, consider logging errors for troubleshooting purposes.

3. **Variable Checking**: Utilise `indexOf` sparingly or consider using a more robust searching mechanism for validating the presence of variables within arrays to enhance readability and performance.

4. **Code Documentation**: Each function should have a descriptive comment that explains its purpose and parameters, improving maintainability.

---

## Maintenance & Further Notes

- **Ownership**: Assign a dedicated team or individual for ongoing maintenance. This role should oversee updates and implementation of best practices.
  
- **Testing Guidelines**: Before deploying changes, thoroughly test the extension in staging environments that mirror production conditions.
  
- **Version Control**: Use version control meticulously to track changes and revert to previous versions as necessary.

- **Documentation Updates**: Regularly review and update documentation to reflect code changes, ensuring that new team members or stakeholders can understand the extension's functionality accurately.

--- 

This documentation serves as a comprehensive guide for developers and stakeholders involved with the Event Stream Data Mappings extension in the Tealium iQ platform, highlighting its purpose, functionality, and best practices.