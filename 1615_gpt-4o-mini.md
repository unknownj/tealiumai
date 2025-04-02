# Tealium iQ Extension Documentation: Bucketed Journey Amount

## 1. Extension Overview

- **Name**: Bucketed Journey Amount
- **ID**: 1615
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Bucketed Journey Amount" extension is designed to format a journey amount value extracted from the event payload. The extension converts this value into a consistent bucketed format for tracking or reporting purposes. It ensures that the journey amount is correctly represented with two decimal places while stripping formatting for easier processing. This helps in maintaining uniformity in financial data and ensures accurate reporting.

---

## 2. Code Explanation

### Key Variables
- **`getReportingNumber` Function**: A function that takes a number (or string representation of a number) as input and formats it to a consistent string representation without commas and with specified decimal places.
  - **Parameters**:
    - `number`: The value to be parsed (string or number).
  - **Returns**: A string formatted number or `NaN` if an error occurs.

### Logic Flow
1. The function `getReportingNumber` attempts to:
   - Parse the input `number` into a float.
   - Format it using the UK locale to have two decimal digits.
   - Convert the formatted number into a string, removing commas.
   - Map the characters of the resultant string, replacing values beyond the decimal with "0", while preserving the decimal point.
   
2. The extension checks if `b.JourneyAmount` is either a string or a number. If it is valid (i.e., not `NaN`), the formatted result is stored in `b.JourneyAmountBucketed`.

### Global Dependencies
- **`eventType`**: A string representing the type of event being processed.
- **`eventPayload`**: An object containing the event data with properties including `JourneyAmount`.

---

## 3. Usage Examples

### Normal Condition
Given an input `b.JourneyAmount` of "1234.56":
- The extension processes this by converting it to `1234.56`, and the output `b.JourneyAmountBucketed` becomes `"123456"`.

### Edge Conditions
1. **Non-numeric Values**: If `b.JourneyAmount` is "abc":
   - The function will return `NaN`, and `b.JourneyAmountBucketed` will not be set.
   
2. **Missing Values**: If `b.JourneyAmount` is undefined or null:
   - `b.JourneyAmountBucketed` will not be assigned a value.
   
3. **Large Numbers**: If `b.JourneyAmount` is a large number, e.g., `1000000.99`:
   - The output will correctly bucket the amount, yielding `100000099`.

---

## 4. Known Limitations & Gotchas

- **Data Format**: The extension relies on the `JourneyAmount` being a valid number or numeric string. Incorrect formats may lead to `NaN` outputs.
- **Overwriting Behaviour**: If `b.JourneyAmountBucketed` already exists in the payload, it will be overwritten by this extension, which may lead to data loss if not properly managed.
- **Cross-Extension Conflicts**: If another extension manipulates `b.JourneyAmount` after this extension runs, it may produce unexpected results.
- **Locale Dependence**: The current implementation uses UK formatting, which might not be suitable for locales that use other formatting conventions (like commas for decimal points).

---

## 5. Recommendations for Refactoring

1. **Error Handling**: While exceptions are caught in `getReportingNumber`, additional logging (e.g., `console.error`) could provide insights during the debugging process.
   
2. **Code Style**: Consider adding comments to clarify the purpose and logic of individual blocks and functions for better readability.

3. **Modularisation**: If this function is to be reused in multiple extensions, consider separating it out into its own utility extension or library for better maintainability.

4. **Optimised Mapping**: Examine the mapping function used to replace digits beyond the decimal; ensure it aligns with the overall intent and is optimally coded.

---

## 6. Maintenance & Further Notes

- **Ownership**: Designate a team member responsible for maintaining this extension and reviewing its functionality periodically.
- **Testing Guidelines**: Implement rigorous unit testing for different cases of input data to ensure reliability; consider edge cases such as very large or malformed numbers.
- **Documentation Updates**: Keep this documentation up-to-date with any changes in functionality, input expectations, or processing logic.

This documentation serves to inform stakeholders and developers about the inner workings of the "Bucketed Journey Amount" extension within Tealium iQ, ensuring that it remains a reliable and efficient part of the data processing pipeline.