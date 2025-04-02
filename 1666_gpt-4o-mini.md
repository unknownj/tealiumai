# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name:** Analytics CNAME Switch
- **ID:** 1666
- **Type:** Javascript Code
- **Scope:** 928
- **Execution Frequency:** Active

### Summary
The Analytics CNAME Switch extension modifies the tracking server settings for the Lloyds Banking Group analytics configurations based on specific conditions, such as the current hostname and the status of certain flags. This allows for the seamless routing of analytics data through a CNAME, improving data processing and integrity.

---

## 2. Code Explanation

### Key Variables
- `s`: Represents the global analytics object where tracking server properties are defined.
- `b`: Represents the global object containing tagging mechanics which is used to modify the tracking configuration.
- `utag_data`: This global object is used to access specific data fields regarding the application state.

### Logic Flow
1. The function `enableCNAME` sets the tracking server's URL by updating both the `trackingServer` and `trackingServerSecure` properties.
2. It retrieves the existing list of tagging mechanics, appends `"CNAME"` to it, and saves it back in `b.TaggingMechanics`.
3. The main function checks for the presence of the `analyticsCNAME` flag in the `LBGAnalytics` object, enabling the CNAME if it exists.
4. Additional checks are performed based on the current hostname and `utag_data.System` to conditionally call `enableCNAME()`:
   - `www.lloydsbank.com` and `secure.lloydsbank.co.uk` are checked against a specific condition.
   - `www.halifax.co.uk` is also checked for the `SCEP` system.

### Dependencies
- The code relies on global objects: `s`, `b`, and `utag_data`.
- It presumes the existence of the `LBGAnalytics` object for configuration flags.

---

## 3. Usage Examples

### Scenario 1: Standard Use-Case
When a user visits `www.lloydsbank.com` while the `utag_data.System` is set to `"SCEP"`:
- The tracking server will be set to `analytics.data.lloydsbankinggroup.com`.
- `b.TaggingMechanics` will include `CNAME`, ensuring that the data is routed correctly.

### Scenario 2: Edge Case Handling
If the user navigates to `secure.lloydsbank.co.uk/somepage.jsp`:
- The condition for the hostname and pathname will trigger `enableCNAME()`.
- The tracking server settings will be updated accordingly, even if the application ordinarily would not route to this server.

### Scenario 3: Flag Dependency
If `LBGAnalytics.featureFlags.analyticsCNAME` is false, none of the hostname conditions will trigger any changes in the tracking settings:
- The analytics system remains unchanged regardless of the hostname.

---

## 4. Known Limitations & Gotchas

### Limitations
- The extension will not execute if `LBGAnalytics.featureFlags.analyticsCNAME` is not defined, potentially leading to untracked scenarios.
- Modifications are specific to the defined hostnames. Any variations (e.g., subdomains or different paths) won't be captured.

### Conflicts
- If other extensions alter the global `s` or `b` objects without coordination, it may lead to unexpected behaviour.
- Be cautious when integrating with other scripts that manipulate analytics data to avoid conflicts.

---

## 5. Recommendations for Refactoring

1. **Modularization:** Consider encapsulating logic within an IIFE (Immediately Invoked Function Expression) to avoid polluting the global scope.
2. **Defensive Checks:** Ensure to check the existence of required properties (e.g. `s` and `b`) before attempting to modify them.
3. **Logging:** Implement logging for better debugging, especially for cases when conditions are not met.
4. **Code Style:** Maintain consistent whitespace and indentation for improved readability.

Note: The code does not require updates for ES2015+ features, adhering to ES5 compliance.

---

## 6. Maintenance & Further Notes

### Ongoing Maintenance
- Regularly review the extension as system conditions and requirements evolve.
- Verify that flag checks remain relevant as new CNAME configurations may be added.

### Ownership
- Assign a primary developer or team to manage this extension, ensuring any changes are documented and versioned in your code repository.

### Testing Guidelines
- Test the extension in various environments to ensure conditions are correctly triggering.
- Validate that the desired tracking server settings are applied across all defined hostnames and conditions to avoid data loss.

By adhering to these guidelines, future developers and stakeholders can ensure the longevity and effectiveness of the Analytics CNAME Switch extension.