# Tealium iQ Extension Documentation: EventStream uvar code

## 1. Extension Overview
- **Name**: EventStream uvar code
- **ID**: 1893
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension processes and sanitises user variable data for integration with the Floodlight connector. It maps various user data attributes to unique identifiers (u variables) while ensuring privacy by filtering out any Personally Identifiable Information (PII). The extension executes on every event, providing a refined dataset to be sent to the Floodlight service.

## 2. Code Explanation

### Key Variables
- **pl**: A mapping object containing user variable identifiers (U1, U2, etc.) mapped to corresponding values from the `eventPayload` (`b`).
- **k**: Used as a loop iterator to access keys in the `pl` object.

### Logic Flow
1. **Mapping User Variables**: 
   - An object `pl` is constructed where keys are unique identifiers (e.g., `U1`, `U2`) and values are fetched from the `eventPayload` using the corresponding attribute names (e.g., `b.Brand`, `b.ProductGroup`).

2. **Sanitisation of PII**: 
   - The code checks each value in `pl`. If a value is a string containing "@" (email-like structure), or "%40" (URL-encoded @), it is set to an empty string.

3. **Filtering Out Missing Values**: 
   - Any entry in `pl` with a falsy value is deleted from the object, ensuring only valid data is sent.

4. **Consent-Based Filtering**:
   - If `CookiesTargeting` is `false`, sensitive information related to identifiers (e.g., `U8`, `U7`, `U28`) is removed.

5. **Output Assignment**:
   - The variable names and values from `pl` are extracted and assigned to the `b` data layer for further processing.

### Dependencies
- Uses global objects `clova3` and its `datalayer` method for output.
- Relies on the `eventType` and `eventPayload` parameters which are provided by the Tealium environment.

## 3. Usage Examples

### Normal Conditions
- When a user completes a journey through a website, triggering the corresponding event, the extension runs and populates `b.uVariableNames` and `b.uVariableValues` with active user data.

### Edge Conditions
- If `b.FirstPartyCookie` contains an email string (e.g., "user@example.com"), it would be sanitised to `""` before being processed further.
- If the user has not consented to cookies (`b["CookiesTargeting"]` is `false`), more values will be filtered out, significantly altering the dataset sent to the Floodlight service.

## 4. Known Limitations & Gotchas
- The extension assumes all required variables in `eventPayload` are present; missing attributes can lead to empty values without warnings.
- Conflicts may arise if other extensions attempt to modify `b` or `clova3.datalayer` simultaneously, potentially leading to inconsistent data outputs or overwrites.
- The extension currently does not handle scenarios where none of the variables in `pl` are set; this could lead to an empty dataset being transmitted, which may not be handled gracefully by the Floodlight service.

## 5. Recommendations for Refactoring
- **Modularisation**: Consider breaking down the sanitisation and filtering logic into separate functions to enhance readability and modularity.
- **Error handling**: Implement diagnostics or logging, especially around the consent checks to capture any instances where data may be unintentionally removed.
- **Code style**: Ensure consistent usage of semicolons and indentation for better maintainability. Additionally, consider adding inline comments throughout the code for clarity of each step.

## 6. Maintenance & Further Notes
- Regularly review the mapping in `pl` against the required attributes from the Floodlight documentation to ensure it remains up-to-date with changes.
- Establish ownership procedures so that one team member is responsible for maintaining this extension.
- Set up tests to verify functionality, especially after any updates or changes to the structure of `eventPayload` or `clova3`.

This documentation aims to provide a comprehensive view of the EventStream uvar code extension, ensuring that developers and stakeholders have the necessary context and guidance for effective use and maintenance.