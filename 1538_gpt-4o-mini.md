# Tealium iQ Extension Documentation: Persistence BLR Code

## 1. Extension Overview

- **Name**: Persistence BLR code
- **ID**: 1538
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to manage the persistence of certain data items within the Tealium iQ environment. It retrieves currently persisted data items from the `LBGAnalytics` object and adds them to the event payload if they are not already present. This process ensures that the necessary data is available for further processing while maintaining existing values when appropriate. The extension also condenses any array-like structures (specifically `CachedImpression`) into a semicolon-separated string for easier data handling.

## 2. Code Explanation

### Key Variables
- **`p`**: This variable stores the currently persisted data items retrieved from `LBGAnalytics.persist.get()`.
- **`b`**: This is the event payload object that the extension modifies to include new persisted data items.

### Logic Flow
1. The code starts by invoking a self-executing function that accepts two parameters: `eventType` and `eventPayload`.
2. The current persisted data items are obtained and stored in the variable `p`.
3. A `for` loop iterates through each key in the retrieved data object `p`.
   - If the key does not already exist in the event payload (`b`), the corresponding value is assigned.
   - If the key already exists, a message is logged to the console indicating that the value for that key cannot be overwritten.
4. Finally, if `b.CachedImpression` is defined and is an array, it is transformed into a semicolon-separated string.

### Dependencies
The extension relies on the global object `LBGAnalytics`, specifically the `persist` sub-object, to retrieve previously stored data.

## 3. Usage Examples

### Scenario 1: Normal Data Flow
1. An event is triggered that results in this extension being executed.
2. The extension fetches persisted data such as `user_id`, `session_token`, etc., from `LBGAnalytics`.
3. These values are added to `eventPayload` if they don't already exist.
4. If `CachedImpression` exists as an array (e.g., `["impression1", "impression2"]`), the output would become `impression1;impression2`.

### Scenario 2: Edge Conditions
- If the persisted data contains a key that already exists in `eventPayload`, the extension logs to the console: `Could not persist <key>, value already set`. For example, if `user_id` is already present, it will not be overwritten.
- If `CachedImpression` is not an array or is undefined, that transformation is skipped, and the original value remains unchanged.

## 4. Known Limitations & Gotchas

- **Console Logging**: Console logging may expose sensitive data if not handled carefully; ensure logs are monitored and that sensitive values are not included.
- **Conflicting Extensions**: If other extensions modify `eventPayload` after this extension runs, the values may be overwritten, leading to unexpected outcomes.
- **Array Handling**: If `CachedImpression` is not an array, the code does not convert anything and will leave the `CachedImpression` value intact; this could lead to inconsistencies in how `CachedImpression` is used later.

## 5. Recommendations for Refactoring

- **Error Handling**: Consider implementing error handling for cases when `LBGAnalytics.persist.get()` fails or returns undefined.
- **Modularisation**: Refactoring the logic into smaller functions could improve readability and maintainability. For example, a separate function could handle the transformation of `CachedImpression`.
- **Code Style**: Use consistent semicolon placement and indentation throughout the code to improve readability.

## 6. Maintenance & Further Notes

- **Ownership**: Assign a specific team member as the owner of this extension, responsible for updates and modifications.
- **Testing Guidelines**: Ensure thorough testing in a staging environment before deployment. Tests should cover various scenarios, including the presence or absence of persisted keys and different data types in `CachedImpression`.
- **Documentation Updates**: Keep this documentation updated with any changes made to the extension. Adding comments directly within the code may also assist future maintainers.

---

This documentation serves as a comprehensive guide for developers and stakeholders, ensuring clarity on how the Persistence BLR code operates within the Tealium iQ environment.