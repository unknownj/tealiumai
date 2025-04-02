# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name:** LivePerson Site ID
- **ID:** 1451
- **Type:** Advanced Javascript Code
- **Scope:** Before Load Rules
- **Execution Frequency:** Run Always

### Summary
This extension is designed to dynamically determine the appropriate LivePerson site ID based on the current webpage conditions. It checks various configurations tailored for different environments, including testing, development, and production. By leveraging the URL and Data Layer variables, it identifies which configuration to apply, ensuring the correct LivePerson integration is employed for user interactions.

---

## 2. Code Explanation

### Key Variables
- `livePersonAccountConfigs`: This is an array containing a set of configuration objects, each of which defines:
  - `name`: A human-readable identifier for the configuration.
  - `criteria`: A function that returns a boolean indicating whether this configuration is applicable based on the current context.
  - `id`: The specific LivePerson site ID corresponding to that configuration.

### Logic Flow
1. The extension initiates by checking if a LivePerson site ID (`LP_SiteID`) is already set in the global variable `b`. If it is present, the extension terminates early to conserve resources.
2. The `getLivePersonConfig` function iterates through the `livePersonAccountConfigs` array, invoking each configuration's `criteria` function with the current data layer.
3. Upon finding a configuration whose criteria return true, the relevant site ID and name are assigned to `b.LP_SiteID` and `b.LP_SiteName`, respectively.
4. The extension then updates the data layer using `LBGAnalytics.datalayer.set`, making the site ID and name available for subsequent events.

### Dependencies
- The extension relies on the global `LBGAnalytics` object, particularly its `datalayer` for updating parameters.
- It assumes that `eventType` and `eventPayload` are valid inputs supplied to the function call.

---

## 3. Usage Examples

### Normal Operation
When a user visits `secure-business.bankofscotland.co.uk`, and `ut.env` is set to "dev," the extension will:
1. Identify this host through the criteria function of the relevant configuration.
2. Set `b.LP_SiteID` to `78049607` and `b.LP_SiteName` to "LivePerson Site IDs - O4B".

### Edge Conditions
- **Missing Configuration**: If none of the criteria match for the current environment, the extension still returns a default configuration due to the "Default" entry in `livePersonAccountConfigs` (ID `49955747`).
- **Error Handling**: The try-catch block around the main operations ensures that unexpected errors do not disrupt the functionality, although no specific error handling is performed.

---

## 4. Known Limitations & Gotchas
- The extension depends heavily on well-structured data in the Data Layer. If `ut.env` is not set or if it contains unrecognised values, it may lead to predictable behaviour not matching user expectations.
- Performance can be impacted if many configurations have complex criteria functions. Minimising checks within criteria would enhance performance.
- Interactions with other extensions should be tested to ensure they are not altering or conflicting with the expected values of the Data Layer or global variables.

---

## 5. Recommendations for Refactoring
- **Defensive Checks**: While it's stated that `eventType` and `eventPayload` are guaranteed to be present, it's a good practice to assert their expected types (e.g., checking if the payload is an object).
- **Modularization**: Extracting criteria functions into standalone functions might aid clarity and maintainability, allowing for easier unit tests in the future.
- **Code Style**: Consistent and clear indentation along with comments directly above significant blocks of code would improve readability.
- **Logging**: Consider implementing more granular logging for debugging purposes, especially if any failure occurs in determining the configuration.

---

## 6. Maintenance & Further Notes
- **Ownership**: This extension should be owned by the team responsible for Digital Customer Interactions, with periodic reviews to ensure it meets evolving business needs.
- **Testing**: Regular validation of all criteria should be done, particularly after any changes to the infrastructure or related domains.
- **Documentation Updates**: Keeping this documentation up to date with any changes to configurations or logic changes is vital for ongoing developer support and troubleshooting.

This documentation should help developers understand the LivePerson integration through the Tealium extension and guide future enhancements and upkeep of the code.