# Tealium iQ Extension Documentation: Eventstream Abort Flag

## 1. Extension Overview

- **Name**: Eventstream abort flag
- **ID**: 1899
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The Eventstream Abort Flag extension is designed to prevent the server-side sending of duplicate events, specifically targeting duplicates arising from the FPHD (First-party Header Detection) mechanism. By managing session storage and logging unique tag names, the extension controls whether to allow or abort further actions based on previously seen identifiers, ensuring that only unique events are processed server-side.

## 2. Code Explanation

### Key Variables
- **`flg`**: A flag variable passed into the `setAbortf` function, indicating whether an event should be aborted (`"Y"`), not aborted (`"N"`), or left blank.
- **`FPHDLog`**: Uses the `sessionStorage` API to store a log of previously seen Pegasus tag names to track duplicates.
- **`currentFPHD`**: The current value of the `utag.data.PegasusTagName`, representing the tag name that could potentially be logged.

### Logic Flow
1. The extension starts by defining a self-invoking function that accepts `eventType` and `eventPayload` as parameters.
2. **Tag Name Check**: It checks if the event type is `"view"` and if the brand is either `"LLOYDS"` or `"HALIFAX"`.
3. **Abort Flag Initialization**: Resets the `FPHDAbortFlg` to an empty string every time a view is loaded.
4. **Duplicate Check**: It checks the condition of the abort flag:
    - If empty or non-existent, it checks `sessionStorage` for `FPHDLog`.
    - If `FPHDLog` exists:
        - It checks if `currentFPHD` is in `FPHDLog`.
            - If a match is found, the `FPHDAbortFlg` is set to `"Y"`.
            - If no match, it checks if FPHD-related flags (`E` or `P`) are set. If true, it adds `currentFPHD` to the log and sets `FPHDAbortFlg` to `"N"`.
    - If `FPHDLog` does not exist, it creates it with the current `PegasusTagName` if FPHD flags are set.

### Dependencies
- **Global Objects**: The extension relies on global objects like `window`, `utag`, and `sessionStorage`.
- **Data Layer**: Utilises the `clova3.datalayer` object to facilitate setting values.

## 3. Usage Examples

### Normal Conditions
- When a user views a page with the LLOYDS brand and the `PegasusTagName` is unique, the extension sets `FPHDAbortFlg` to `"N"`, allowing the event to be sent server-side.

### Edge Conditions
- If a user navigates back to a page with the same `PegasusTagName` while the `FPHDLog` already contains it, the extension sets `FPHDAbortFlg` to `"Y"`, preventing the duplicate event from being sent server-side and logging "match" in the console.

## 4. Known Limitations & Gotchas

- **Session Storage Limitations**: The extension depends on the availability of `sessionStorage`, which may be restricted in certain browsers (e.g., browsers with privacy settings that block \(local\)storage).
- **Race Conditions**: If multiple events are triggered in quick succession, the extension may not correctly handle overlapping checks of the `FPHDLog`.
- **Conflict with Other Extensions**: Extensions that manipulate `sessionStorage` or interact with the `utag.data` object may interfere with this functionality, leading to unexpected abort flags.

## 5. Recommendations for Refactoring

- **Modularisation**: Consider encapsulating the setting and getting of `sessionStorage` logic into helper functions for better readability and maintainability.
- **Defensive Checks**: While not required for `eventType` and `eventPayload`, ensuring that they exist and are properly formatted at the start of the script can prevent future issues.
- **Consistent Logging**: Add additional logging statements to monitor how often the flag is set to ensure clarity during debugging and maintenance.

## 6. Maintenance & Further Notes

- **Ownership**: Assign a dedicated developer or team to maintain and update the extension as business needs evolve.
- **Testing Guidelines**: Create automated unit tests to check various scenarios, ensuring that the extension behaves as intended under normal and edge conditions.
- **Documentation Updates**: Regularly update this document to reflect any changes, improvements, or identified bugs to ensure it remains a reliable resource for current and future developers.

This documentation aims to provide a comprehensive overview and serves as a knowledge base to enhance the understanding and maintainability of the Eventstream Abort Flag extension.