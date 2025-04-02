# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Client Hints
- **ID**: 100036
- **Type**: JavaScript Code
- **Scope**: Pre Loader
- **Execution Frequency**: Run Once

### Summary
The "Client Hints" extension retrieves and processes high entropy values from the user's browser, which give information about the client's device characteristics, such as brand, model, and platform. It populates the Tealium data layer with these values, facilitating rich analytics and audience insights for targeted marketing strategies. The extension is designed to enhance data quality by cleaning and standardizing the user agent data received from the browser.

## 2. Code Explanation

### Key Variables
- **clientHints**: An array containing the keys for the high entropy values that the extension retrieves from the `navigator.userAgentData` object.

### Logic Flow
1. **Retrieve High Entropy Values**:
    - The extension uses `navigator.userAgentData.getHighEntropyValues(clientHints)` to get detailed device information.
    
2. **Data Processing**:
    - The resulting user agent data object (`ua`) is iterated over:
      - For each property:
        - **String Values**: Store directly.
        - **Number Values**: Store directly.
        - **Boolean Values**: Convert to "Y" or "N" before storing.
        - **Object Values**: Convert to a JSON string before storing.

3. **Data Layer Setters**:
    - Several functions populate the data layer for specific client hints:
      - `ClientHintPlatform`: Combines `platform` and `platformVersion`.
      - `ClientHintBrands`: Parses and formats brand information.
      - `ClientHintMobile`: Directly retrieves mobile information.

4. **Data Layer Cleanup**:
    - On data layer `get` events, the extension deletes any existing client hint keys to maintain a clean state.

### Dependencies
- Requires `navigator.userAgentData` to be available for fetching client hints.
- Utilises `LBGAnalytics.datalayer` for setting and managing data in the Tealium data layer.

## 3. Usage Examples

### Scenario 1: Normal Operation
1. A user visits the website with a modern browser that supports `navigator.userAgentData`.
2. The extension runs on page load:
   - It retrieves the client hints (e.g., `{ brands: [...] , mobile: true, model: "iPhone", platform: "iOS", platformVersion: "15.0" }`).
   - Sets the respective entries in the data layer:
     - `ClientHint_brands`
     - `ClientHint_mobile`
     - `ClientHint_model`
     - `ClientHint_platform`
     - `ClientHint_platformVersion`
3. These values can now be used for analytics purposes.

### Scenario 2: Edge Conditions
- **Unsupported Browsers**: If a user is on an older browser that does not support `navigator.userAgentData`, the extension may not populate any hints, skipping to the cleanup phase without errors.
- **Errors in Data Parsing**: If brand information is malformed, the extension will not stop execution; it will simply fail silently for that part, maintaining overall functionality.

## 4. Known Limitations & Gotchas

- **Browser Support**: Not all browsers support the `navigator.userAgentData` API; users on unsupported browsers will not receive any client hints.
- **Silent Failures**: Errors are caught and ignored; thus debugging may be complicated if no data is collected and there’s no indication of the failure.
- **Data Layer Conflicts**: If multiple extensions are modifying the same keys without coordination, inconsistencies may arise.

## 5. Recommendations for Refactoring

- **Defensive Checks**: While there's a requirement to support ES5, adding checks before assigning values (e.g., ensuring `ua` is not null) could enhance reliability.
- **Code Readability**: Consider modularizing functionality into smaller helper functions for clarity (e.g., data type checks).
- **Consistent Exception Handling**: Instead of just catch statements that do nothing, consider logging unexpected errors to help with debugging, perhaps by integrating a lightweight logging mechanism.

## 6. Maintenance & Further Notes

- **Ownership**: Assign a specific team or individual responsible for the ongoing maintenance of the extension, ensuring that updates to the `userAgentData` API are monitored.
- **Testing Guidelines**: Implement a protocol for testing the extension across various browsers regularly to ensure continued functionality, especially as browser implementations evolve.
- **Documentation Updates**: As new requirements or enhancements are identified, feedback should be integrated into this documentation promptly to ensure it remains a vital resource for developers and stakeholders.

--- 

This documentation is designed to provide comprehensive insights into the "Client Hints" extension, serving as a resource for current and future developers interacting with the Tealium iQ ecosystem.