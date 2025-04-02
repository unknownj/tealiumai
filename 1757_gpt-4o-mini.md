# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Calculate interest income for floodlight
- **ID**: 1757
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension calculates the interest income for a loan based on the input amounts, rates, and terms provided in the `eventPayload`. The calculated income is stored in both the `utag.data` object and the `clova3.datalayer`. This functionality is essential for integrating floodlight tracking with financial data, allowing marketing teams to measure and optimise campaigns based on the income generated from loans.

## 2. Code Explanation

### Key Variables

- **`JourneyAmount`**: Represents the principal amount of the loan.
- **`JourneyRate`**: The interest rate applied to the loan.
- **`JourneyTerm`**: The duration of the loan in months.
- **`JourneyIncome`**: The calculated income from the loan, which is generated if it does not already exist or is invalid.

### Logic Flow
1. **Data Checks**: The code first verifies the existence of `JourneyAmount`, `JourneyRate`, and `JourneyTerm`. If any are `undefined`, the calculation does not proceed.
2. **Price Calculation**:
   - If `JourneyIncome` is either `undefined`, `<= 0`, or `NaN`, the extension calculates the monthly payment using the formula:
     \[
     \text{MonthlyPayment} = \frac{\text{amount} \times \text{mi}}{1 - (1 + \text{mi})^{-\text{term}}}
     \]
   - The total income is computed as:
     \[
     \text{Income} = \text{MonthlyPayment} \times \text{term} - \text{amount}
     \]
3. **Storing Results**: The calculated income is then stored in three places:
   - `utag.data.JourneyIncome`
   - `clova3.datalayer` using `set()`
   - `eventPayload` under `JourneyIncome`

### Dependencies
- **Global Objects**:
  - `utag.data`: Utilised for storing calculated income for further use in the Tealium ecosystem.
  - `clova3.datalayer`: Indicates that this extension interacts with a specific data layer object for data management.

## 3. Usage Examples

### Normal Scenario
When an event occurs carrying valid values:
- **Input**:
  - `JourneyAmount`: 10000
  - `JourneyRate`: 5
  - `JourneyTerm`: 12

- **Output**:
  - `JourneyIncome` would be calculated and stored as a positive integer, aggregating the income generated over the term of the loan.

### Edge Case
If `JourneyIncome` is already set to a valid positive value, the extension will not recalculate:
- **Input**:
  - `JourneyIncome`: 1000 (valid and > 0)

- **Output**:
  - The extension skips the calculation entirely.

## 4. Known Limitations & Gotchas

- **Missing Values**: If any of `JourneyAmount`, `JourneyRate`, or `JourneyTerm` are `undefined`, the extension cannot perform calculations.
- **Invalid Data**: If inputs are non-numeric or lead to invalid outcomes (like NaN), it will skip processing.
- **Potential Conflicts**: If there are other extensions that also manipulate `JourneyIncome`, this could lead to inconsistent values.
- **Assumptions**: The extension assumes that all relevant data has already been loaded before execution due to its position within the loading sequence.

## 5. Recommendations for Refactoring

- **Modularisation**: Consider breaking down the logic into smaller functions (e.g., `calculateMonthlyPayment()` and `calculateIncome()`).
- **Defensive Programming**: Add checks for numeric types of `JourneyAmount`, `JourneyRate`, and `JourneyTerm` to prevent runtime errors.
- **Code Style**: Ensure consistent variable naming conventions (select a format: camelCase or snake_case) for maintainability.
- **Comments**: Enhance code comments for clarity, explaining complex calculations and decision points.

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly test the extension with different sets of data, especially after updates or changes in related Tealium tags or extensions.
- **Ownership**: Designate a team member responsible for managing and updating the extension.
- **Testing Guidelines**: Implement rigorous testing across various scenarios including edge cases, invalid inputs, and data conflicts to ensure robustness.

This documentation serves as a foundation for both current and future developers working with this Tealium iQ extension, enabling effective maintenance and usage.