# Tealium iQ Extension Documentation: CWR Hub Retail Customer ID to OCISID

## 1. Extension Overview
- **Name**: CWR Hub Retail Customer ID to OCISID
- **ID**: 1652
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This Tealium iQ extension is designed to facilitate the assignment of a retail customer ID to an OCISID (Online Customer ID) when certain conditions are met. Specifically, it checks if the URL contains the path "cwr-hub". If the condition is satisfied and the `RetailCustomerID` is present within the event payload without an existing `OCISID`, it copies the `RetailCustomerID` value to the `OCISID` variable. This ensures that the online customer identification data is consistently applied for visitors from specific marketing channels or campaigns.

---

## 2. Code Explanation

### Key Variables
- **`eventType`**: This global variable indicates the type of event triggering the extension's execution.
- **`eventPayload`**: An object that contains data relevant to the event, including properties like `RetailCustomerID` and `OCISID`.

### Logic Flow
1. The function checks if `window.location.pathname` contains the string "cwr-hub".
2. If the condition is true, it proceeds to:
   - Check if `eventPayload` includes `RetailCustomerID` and does not already have `OCISID`.
   - If both conditions are met, it assigns the value of `RetailCustomerID` to `OCISID`.

### Dependencies
- **Global Objects**: The extension relies on the `window` object to access the URL.
- **No External Libraries**: The extension does not depend on any external libraries, ensuring minimal overhead and compatibility with Tealium’s existing environment.

---

## 3. Usage Examples

### Sample Scenarios

#### Normal Condition
1. **Scenario**: A user visits the URL `https://example.com/cwr-hub`.
2. **Data Input**:
   ```json
   {
     "RetailCustomerID": "12345",
     "OCISID": null
   }
   ```
3. **Output**:
   ```json
   {
     "RetailCustomerID": "12345",
     "OCISID": "12345"
   }
   ```

#### Edge Condition
1. **Scenario**: A user visits a different URL `https://example.com/other-page`.
2. **Data Input**:
   ```json
   {
     "RetailCustomerID": "67890",
     "OCISID": null
   }
   ```
3. **Output**:
   - No changes made, remains:
   ```json
   {
     "RetailCustomerID": "67890",
     "OCISID": null
   }
   ```

### Additional Considerations
If the `OCISID` were to already exist, the extension would not overwrite it even if a `RetailCustomerID` is present. This ensures that the system does not unintentionally replace valid identifiers.

---

## 4. Known Limitations & Gotchas
- **URL Dependency**: The extension only processes data when the URL contains "cwr-hub". Any other URL will not trigger the desired behaviour.
- **Multiple Executions**: If the extension is executed multiple times during a single page load, it may lead to unexpected behaviour such as the `OCISID` being set multiple times if conditions change.
- **Custom Implementation**: The behaviour may conflict if other extensions also manipulate `OCISID` or `RetailCustomerID` within the same execution context. Careful management of extension ordering and load rules is required to avoid unintended data manipulation.

---

## 5. Recommendations for Refactoring

1. **Defensive Checks**: Although the current assumption is that `eventType` and `eventPayload` are always available, implementing checks for the structure of the `eventPayload` could prevent potential runtime errors should the data structure change in future.
2. **Code Modularisation**: Consider refactoring the URL check and ID assignment logic into separate functions for clearer readability and maintainability. This would make it easier to test or update individual components.
3. **Code Style Consistency**: While adhering to ES5 standards, ensuring consistent indentation and spacing will improve readability.
4. **Comments**: Adding additional inline comments to explain the purpose of key code sections would assist future developers in understanding the logic.

---

## 6. Maintenance & Further Notes

### Ongoing Maintenance
- **Ownership**: Identify specific team members responsible for this extension to manage updates and address any issues that may arise.
- **Testing Guidelines**: Regularly test the extension under various scenarios, especially when there are changes made to `eventPayload` structures or Tealium iQ configurations.
- **Documentation Updates**: Keep this documentation updated with any changes to functionality or intended behaviour as the platform evolves.

By following the above recommendations, the maintenance of this extension can be streamlined and its effectiveness improved in real-world applications.