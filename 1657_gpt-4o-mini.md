# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name**: Stupid Parties
- **ID**: 1657
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Stupid Parties" extension processes the `RetailCustomerID` from the event payload to extract components, delete specific IDs, and prepare it for further processing. The primary purpose of this extension is to clean the `RetailCustomerID` field by removing certain identifiers, ensuring that only valid or necessary data is retained. This helps in maintaining data quality and integrity in the analytics environment.

---

## 2. Code Explanation

### Key Variables
- `a`: Represents `eventType` (string) - a predefined global variable indicating the type of event being processed.
- `b`: Represents `eventPayload` (object) - a predefined global object containing the event data.

### Logic Flow
1. **Check for `RetailCustomerID` with "-OCIS"**: 
   - If `RetailCustomerID` exists and contains the substring `"-OCIS"`, it splits the value using `"-OCIS"` as the delimiter and assigns the first part to `OCISID`. The original `RetailCustomerID` is then deleted from the payload.
   
2. **Handle Unique Identifiers**: 
   - If `RetailCustomerID` is equal to `"unique identifier"` or `"uniqueidentifier"`, it will be deleted from the payload.

3. **Length Check**: 
   - If `RetailCustomerID` has a length greater than 12, it is also deleted.

### Dependencies
The extension relies on the global objects `eventType` and `eventPayload`. The functions and properties accessed are standard JavaScript functionalities that are expected to be available in the environment where this extension runs.

---

## 3. Usage Examples

### Normal Condition
- **Input**: An event payload containing `RetailCustomerID` as `"12345-OCIS"`.
- **Output**: 
  - `OCISID` is set to `"12345"`.
  - `RetailCustomerID` is removed from the payload.

### Edge Conditions
1. **Input**: 
   - `RetailCustomerID` set to `"unique identifier"`.
   - **Output**: `RetailCustomerID` is removed from the payload.
   
2. **Input**: 
   - `RetailCustomerID` as `"1234567890123"`.
   - **Output**: `RetailCustomerID` is removed since it exceeds 12 characters.

3. **Input**: 
   - `RetailCustomerID` as `null` or `undefined`.
   - **Output**: The code will skip any processing, leaving the payload unchanged.

---

## 4. Known Limitations & Gotchas
- **Missing Edge Cases**: If `RetailCustomerID` is malformed or in a format not explicitly handled (e.g., special characters), existing checks may not catch it, potentially resulting in unexpected values remaining in the payload.
- **Performance Impact**: For large payloads, the repeated string manipulations and checks may introduce performance overhead, especially if executed frequently.
- **Conflict with Other Extensions**: If multiple extensions modify the `RetailCustomerID` field, the order of execution and data integrity may be compromised.

---

## 5. Recommendations for Refactoring
- **Defensive Checks**: Consider implementing checks for malformed `RetailCustomerID` values.
- **Code Style & Readability**: 
  - Group related checks together to improve readability—consider using helper functions for complex logic.
  - Use descriptive variable names (if possible) to enhance understanding.
- **Modularisation**: Splitting logic into functions could improve maintainability and testing. For example, extracting the identifier cleanup logic into a separate function.
  
While the current code fulfils its function, applying best practices would enhance maintainability and clarity.

---

## 6. Maintenance & Further Notes
- **Ownership**: Assign a developer to oversee updates and changes to this extension.
- **Testing Guidelines**: 
  - Regularly test under various payload configurations to ensure robustness.
  - Incorporate unit tests where feasible to automate validation of input/output cases.
- **Documentation Updates**: Keep the documentation up-to-date with any changes in logic or scope of the extension.

This documentation serves as a comprehensive guide to understanding, maintaining, and effectively utilising the "Stupid Parties" extension within the Tealium iQ environment.