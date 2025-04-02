# Tealium iQ Extension Documentation: Temp Sortcode Fix for Investments

## 1. Extension Overview
- **Name**: Temp Sortcode fix for Investments
- **ID**: 1914
- **Type**: Advanced Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to modify the value of the `QAAnswer` attribute within event payloads based on specific conditions. When certain journey names and QA questions are matched, the extension redacts the answer to maintain confidentiality. This temporary fix addresses scenarios where sensitive information might be inadvertently exposed, ensuring compliance with privacy standards.

---

## 2. Code Explanation
### Key Variables
- **var1Values**: An array containing the values `["applyinvestment", "applyrmpension"]` which represent specific journey names.
- **var2Values**: An array of strings that holds possible QA questions (e.g., "edit ni number", "sortcode", etc.) that will be checked against the incoming payload.

### Logic Flow
1. The extension checks if the `JourneyName` in the payload (`b`) is one of the values in `var1Values`. This is achieved using the `includes` method, which performs a case-insensitive comparison through `toLowerCase()`.
2. It also checks if the `QAQuestion` in the same payload is found in `var2Values`.
3. If both conditions are satisfied, the `QAAnswer` in the payload is set to the string `"(Redacted)"`, effectively obscuring the sensitive information.

### Dependencies
- The code relies on two properties from the `eventPayload` object: `JourneyName` and `QAQuestion`.
- These properties are assumed to be in a formatted object structure and are guaranteed to be available, which obviates the need for defensive checks in this context.

---

## 3. Usage Examples
### Normal Condition
- **Input**: 
  - `JourneyName`: "applyinvestment"
  - `QAQuestion`: "sortcode"
- **Output**: 
  - `QAAnswer`: "(Redacted)"

In this case, since both conditions match, the extension explicitly redacts the answer.

### Edge Condition
- **Input**: 
  - `JourneyName`: "applyinvestment"
  - `QAQuestion`: "age"
- **Output**: 
  - `QAAnswer`: "29" (no change, as the question does not match)

Here, the `QAAnswer` remains unchanged, as the `QAQuestion` does not meet the criteria for redaction.

### Additional Example
- **Input**: 
  - `JourneyName`: "applyrmpension"
  - `QAQuestion`: "postcode"
- **Output**: 
  - `QAAnswer`: "(Redacted)"

As both conditions are satisfied, redaction occurs.

---

## 4. Known Limitations & Gotchas
- **Case Sensitivity**: The extension converts strings to lower case, which may introduce unexpected behaviour if external systems generate inconsistent casing.
- **Dependency on Attribute Names**: Any changes to the structure or names of incoming event payloads may cause the extension to break, necessitating timely updates to the code.
- **Performance**: Extensive lists in `var1Values` and `var2Values` may impact performance if significantly expanded, as every event evaluated incurs comparison processing.

---

## 5. Recommendations for Refactoring
- **Modularisation**: Consider breaking down the logic into smaller, reusable functions to enhance readability and maintainability. For example, separate functions could handle the conditions checking and the redaction.
  
  ```javascript
  function isJourneyNameValid(journeyName) {
      return var1Values.includes(journeyName.toLowerCase());
  }
  
  function isQAQuestionValid(qaQuestion) {
      return var2Values.includes(qaQuestion.toLowerCase());
  }
  ```

- **Code Style**: Maintaining consistent naming conventions (e.g., camelCase) throughout the code could improve clarity.
- **Documentation**: Inline comments explaining specific logic conditions or the purpose of key sections will provide clarity for future developers.

---

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Assign ownership to a dedicated team member for continuous monitoring and updates, especially in light of potential changes in data structure.
- **Testing Guidelines**: Ensure thorough testing is in place after updates or changes, especially concerning the entry points of the payload. Unit tests (if applicable) should cover various scenarios (normal and edge cases).
- **Audit Trail**: Maintain logs of modifications to the extension to facilitate future review and debugging processes.

This documentation serves as a guideline for developers and stakeholders to understand the purpose, functionality, and maintenance of the "Temp Sortcode fix for Investments" extension in Tealium iQ.