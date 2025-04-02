# Tealium iQ Extension Documentation: New Payments Transformations

## 1. Extension Overview

- **Name:** New Payments Transformations
- **ID:** 1823
- **Type:** Javascript Code
- **Scope:** Before Load Rules
- **Execution Frequency:** Run Always

### Summary
The "New Payments Transformations" extension processes various payment-related data fields extracted from the event payload. It collates relevant information about transactions into a structured format that allows for further analysis and decision-making in the Tealium ecosystem. The primary purpose of this extension is to construct a comprehensive `JourneyProduct` string based on the provided fields when the `JourneyName` indicates a transaction-related event, specifically one that begins with "MakeTransaction".

---

## 2. Code Explanation

### Key Variables
- **paymentType**: An array used to store formatted strings representing different attributes of the transaction.
- **b**: Represents the payload object (assumed to be `eventPayload`).

### Logic Flow
1. The function is immediately invoked with two parameters (`eventType` and `eventPayload`).
2. It checks for the presence of specific properties in the `b` object (i.e., `b.RemitterAccountType`, `b.BeneficiaryAccountType`, etc.).
3. If these properties exist, the function constructs strings in the format `X:value` (where `X` is a single-character identifier) and pushes them into the `paymentType` array.
   - `F`: Remitter Account Type
   - `T`: Beneficiary Account Type
   - `Q`: Transaction Frequency
   - `D`: Transaction Date
   - `R`: Transaction Recurrence
4. After populating the `paymentType` array, if its length is greater than 0 and `b.JourneyName` starts with "MakeTransaction", it concatenates the entries of the `paymentType` array(using a pipe `|` as a delimiter) and assigns the resulting string to `b.JourneyProduct`.

### Dependencies
- The extension relies on the `eventType` and `eventPayload` global objects that are assumed to be passed as function parameters. No other external libraries or global variables are referenced.

---

## 3. Usage Examples

### Normal Conditions
1. **Input**:
   ```json
   {
     "JourneyName": "MakeTransaction",
     "RemitterAccountType": "Saving",
     "BeneficiaryAccountType": "Current",
     "TransactionFrequency": "Weekly",
     "TransactionDate": "2023-10-10",
     "TransactionRecurrence": "Monthly"
   }
   ```
   
2. **Output**:
   ```json
   {
     "JourneyProduct": "F:Saving|T:Current|Q:Weekly|D:2023-10-10|R:Monthly"
   }
   ```

### Edge Conditions
- **Edge Case 1**: If `JourneyName` does not start with "MakeTransaction":
   - **Input**: 
     ```json
     {
       "JourneyName": "ViewTransaction",
       "RemitterAccountType": "Saving",
       "TransactionFrequency": "Weekly"
     }
     ```
   - **Output**:
     ```json
     {
       "JourneyProduct": undefined
     }
     ```

- **Edge Case 2**: If none of the data properties are present:
   - **Input**:
     ```json
     {
       "JourneyName": "MakeTransaction"
     }
     ```
   - **Output**: 
     ```json
     {
       "JourneyProduct": undefined
     }
     ```

---

## 4. Known Limitations & Gotchas

- If the `JourneyName` does not start with "MakeTransaction", the `JourneyProduct` will not be populated, which may lead to unexpected results in downstream analytics.
- The function does not perform validation on the values extracted from the `b` object; thus, invalid formats (e.g., incorrect date formats) may lead to unused data without notification.
- Ensure that the keys being accessed in the event payload exist, as undefined values will not contribute to `JourneyProduct`, potentially impacting data integrity.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Although `eventType` and `eventPayload` are guaranteed to be present, consider explicitly checking for key value presence in `b` to provide clarity and understandability.
  
- **Code Style**: Maintain consistent formatting of strings, consider abstracting string creation into a dedicated function if further types are added later, enhancing modularity.

- **Modularization**: Refactor the logic that constructs the `paymentType` strings into a separate helper function to improve readability and reusability.

```javascript
function addPaymentType(paymentArray, prefix, value) {
    if(value) {
        paymentArray.push(prefix + value);
    }
}

// Example usage within the main function:
addPaymentType(paymentType, "F:", b.RemitterAccountType);
```

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: It is crucial to ensure that the event payload structure remains consistent across deployments. Any modifications in the payload could potentially affect this extension's functionality.
  
- **Ownership**: Assign a dedicated owner who is responsible for the oversight of this extension, including any updates and documentation changes.

- **Testing Guidelines**: Establish a testing protocol that includes unit tests and integration tests to validate changes. Create a sandbox environment to test how changes affect the event payload without impacting live data.

---

This documentation serves as a comprehensive guide for developers and stakeholders interacting with the "New Payments Transformations" extension in Tealium iQ. For additional queries, please reach out to the assigned owner.