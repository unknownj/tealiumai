# Documentation for Tealium iQ Extension: Hotfix for Commercial Onboarding PII

## 1. Extension Overview

- **Name**: Hotfix for Commercial Onboarding PII
- **ID**: 100036
- **Type**: JavaScript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to ensure the privacy of personally identifiable information (PII) by cleansing two specific customer-related fields: `RetailCustomerID` and `BusinessCustomerID`. It checks if either of these fields is a string containing an '@' character (indicative of an email address) and, if so, it resets the field to an empty string. This is important for compliance with privacy regulations and to protect sensitive customer data during the onboarding process.

## 2. Code Explanation

### Key Variables
- **`eventType`**: Represents the type of event being processed. This can be any string that Tealium identifies based on the event context.
- **`eventPayload`**: An object containing the data associated with the event. It is expected to include the customer identifiers `RetailCustomerID` and `BusinessCustomerID`.

### Logic Flow
1. The function is immediately invoked with `eventType` and `eventPayload` as parameters.
2. The code first checks if the `RetailCustomerID` is a string and contains an '@':
   - If true, it sets `RetailCustomerID` to an empty string.
3. It then performs the same check and reset operation for the `BusinessCustomerID`.

### Dependencies
The extension relies on the global object `b`, which represents the event payload. No external libraries are required for this extension; it solely manipulates the properties of the `eventPayload` object.

## 3. Usage Examples

### Normal Condition
- **Input**:
  - `eventPayload`:
    ```json
    {
      "RetailCustomerID": "customer@example.com",
      "BusinessCustomerID": "business@example.com"
    }
    ```
- **Output**:
  - `eventPayload`:
    ```json
    {
      "RetailCustomerID": "",
      "BusinessCustomerID": ""
    }
    ```
- **Description**: In this scenario, both customer IDs contain an '@', and thus they are both reset to empty strings.

### Edge Condition - No '@' Present
- **Input**:
  - `eventPayload`: 
    ```json
    {
      "RetailCustomerID": "123456",
      "BusinessCustomerID": "someID"
    }
    ```
- **Output**:
  - `eventPayload`: 
    ```json
    {
      "RetailCustomerID": "123456",
      "BusinessCustomerID": "someID"
    }
    ```
- **Description**: In this case, since neither ID contains an '@', the fields remain unchanged.

### Edge Condition - Non-String ID
- **Input**:
  - `eventPayload`: 
    ```json
    {
      "RetailCustomerID": 12345,
      "BusinessCustomerID": null
    }
    ```
- **Output**:
  - `eventPayload`: 
    ```json
    {
      "RetailCustomerID": 12345,
      "BusinessCustomerID": null
    }
    ```
- **Description**: As the IDs are not strings, no actions are taken, and the values remain the same.

## 4. Known Limitations & Gotchas

- This extension specifically checks if `RetailCustomerID` and `BusinessCustomerID` are strings. If any other data type (e.g., numbers or objects) is passed, the extension does not perform any cleansing, potentially leaving sensitive data unhandled.
- There may be conflicts if other extensions attempt to manipulate these same fields concurrently, leading to unpredictable results. Coordination between various extensions affecting these fields is crucial to ensure data integrity.
- Should there be any conditional modifications of the IDs elsewhere, the removal performed by this extension could impact downstream processes that rely on the IDs.

## 5. Recommendations for Refactoring

- **Error Logging**: Implement logging to capture instances where non-string values for `RetailCustomerID` or `BusinessCustomerID` are encountered. This can help track data quality issues.
- **Function Modularization**: Consider breaking out the checks for each ID into separate functions for better readability and maintenance.
- **Commenting**: Add comments within the code to explain the purpose of the checks clearly, aiding future developers in understanding the intention quickly.
- **Use of `typeof` Checks**: When checking for strings, ensure that other non-string types are explicitly handled to prevent confusion in the data processing pipeline.

## 6. Maintenance & Further Notes

- **Ownership**: A dedicated team member should oversee the maintenance of this extension, ensuring currency with changing data privacy regulations.
- **Testing Guidelines**: Regular testing should be conducted to ensure that the cleansing mechanism remains effective and that no unintended side effects occur due to updates in connected systems.
- **Documentation Updates**: This documentation should be updated whenever changes are made to the logic or functionality of the extension to maintain accuracy and relevance.

---

This documentation page serves as a comprehensive guide for developers and stakeholders involved in maintaining and utilising the Tealium iQ extension for sensitive data protection.