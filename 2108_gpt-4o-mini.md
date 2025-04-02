# Tealium iQ Extension Documentation: MCMA v2 - Mortgage Calc and AIP

## 1. Extension Overview
- **Name**: MCMA v2 - Mortgage Calc and AIP
- **ID**: 2108
- **Type**: Advanced JavaScript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to capture and classify user financial data from a mortgage calculator on the web page. It aims to identify "mass affluent" traffic by evaluating users' income and savings information, setting relevant flags that can be sent via Tealium's data layer for analytics purposes. This is essential for targeted marketing efforts, particularly in the mortgage sector.

## 2. Code Explanation

### Key Variables
- `ValueSeg`: Stores the segment classification based on income and savings information.
- `utag.data.MCMA`: An object used to persist data associated with users interacting with the mortgage calculator.
- `dataItems`: An array that specifies fields relevant to the mortgage calculation and their associated selectors and validation logic.

### Logic Flow
1. **Initialization**: The extension checks if `utag.data.MCMA` is already set. If not, it initializes the structure and data items.
2. **Event Listener**: An event listener (`change`) is added to the document, which listens for changes in input fields relevant to financial data.
3. **Data Validation**: When a relevant field's value changes, it validates the input using predefined functions and sets the respective income or savings values.
4. **Income and Savings Calculation**: After capturing the user inputs, the code segment determines the number of applicants and calculates income thresholds to classify the user's financial status.
5. **Flag Setting**: If a valid classification (`ValueSeg`) is determined based on income and savings, it is set to multiple data layers for further processing.

### Dependencies
The extension relies on:
- Global object: `utag.data` for storing and retrieving information.
- `LBGAnalytics`: An external library assumed to exist for logging purposes.
- Browser's `window.performance` for performance metrics.

## 3. Usage Examples

### Scenario 1: Valid Input Flow
1. A user enters their income in the first applicant field.
2. The change event triggers, capturing the value.
3. Assuming valid input, it gets validated and stored under `utag.data.MCMA.data.income1`.
4. If both applicants have values, it computes the total income and sets the appropriate `ValueSeg`.

### Scenario 2: Edge Case with Invalid Input
1. A user enters a non-numeric value (e.g., "abc") in the income field.
2. The validation function detects the invalid value and does not set it in the `utag.data.MCMA`.
3. As a result, the user may fall into a default segment (e.g., 'NA' if no valid income is provided).

## 4. Known Limitations & Gotchas
- The extension heavily relies on selectors; if these field names change or are not available, the extension will not function as intended, leading to potential null values.
- No error handling or logging exists for cases where `LBGAnalytics` is not available, which may cause uncaught exceptions during execution.
- Event listeners may lead to performance issues if fired too frequently from rapid changes in inputs.

## 5. Recommendations for Refactoring
- **Modularisation**: Break down the code into smaller, reusable functions for better readability and maintenance.
- **Error Handling**: Introduce proper logging for scenarios where values fail to validate, aiding in debugging.
- **Defensive Checks**: Apply checks to ensure that elements queried via selectors are present before invoking operations on them.
- **Consistency**: Enforce a consistent coding style and documentation within the code sections for clarity.

## 6. Maintenance & Further Notes
- Regularly review field selectors to ensure they are up to date with the web application's current state.
- Implement logging mechanisms to monitor how many times each value is being set, aiding in performance assessments.
- Set up a testing framework to validate functionality whenever updates or changes are made to the extension, ensuring its reliability across various scenarios.
- Designate ownership of the extension to ensure accountability and oversight during its lifecycle. 

This documentation serves as a detailed guide for developers and stakeholders to understand, maintain, and improve the MCMA v2 extension within Tealium iQ.