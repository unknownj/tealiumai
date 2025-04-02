# Tealium iQ Extension Documentation

## Extension Overview

- **Name**: AOU and BOU Config for custom template 992
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: Pre Loader
- **Execution Frequency**: Run Once

### Summary
This Tealium iQ extension is designed to configure analytics settings and manage the execution of various tags in accordance with privacy regulations and site context. It establishes rules to allow or disallow specific tags based on the user consent status while ensuring essential functionalities are maintained across key pages, such as login functionalities. The configuration supports Customer-Specific Policies (CSP) and allows concise integration of vital analytics on the logging pages without impacting user experience.

## Code Explanation

The code defines an object `LBGAnalytics.tagConfig` which contains several properties for managing analytics tags. Here’s a breakdown of the key components:

- **requiresCSP**: 
  - An array that dictates the tags requiring a Content Security Policy (CSP) with the identifier `1550`.

- **omitTags**: 
  - An array of tag IDs that should be excluded from the Privacy Manager framework, as these tags are not reliant on user consent—indicating they serve technical purposes that run automatically.

- **essentialTags**: 
  - Lists the tag IDs approved to run on login pages, essentially forming a whitelist against which other tags may be compared. Notably, some tags are marked with comments indicating specific approvals or intended functionality.

- **criticalPages**: 
  - An array listing the URLs deemed critical for logon processes where non-essential tags are to be excluded to enhance security and performance.

- **ngaAllowable**: 
  - Defines the tags permissible to execute within app webviews, including specific comments about uses of Adobe and Mapp tags.

### Dependencies
This extension relies on the global object `LBGAnalytics`. It is vital to ensure that this global object exists within the scope where this extension is loaded.

## Usage Examples

### Normal Condition
When a user accesses a standard page, the extension evaluates the user's consent status and executes only the necessary tags listed under `essentialTags`, ensuring compliance and function.

### Edge Condition
1. **Logon Page Access**: 
   On accessing `/logon/login.jsp`, the extension verifies the page alignment with `criticalPages` and executes only those tags specified in `essentialTags`, while omitting other non-essential tags.

2. **App Webview**: 
   If entering an app webview, only tags specified in `ngaAllowable` are executed, ensuring responsiveness and compliance with app-specific policies.

## Known Limitations & Gotchas

- **Non-Functioning Tags**: If any tags not listed in `essentialTags` are required for functionality on critical logon pages, their omission could result in degraded user experiences.
- **Potential Conflicts**: Other Tealium extensions or scripts that attempt to handle the same tags might interfere with the operation of this extension. Care should be taken to test integrations thoroughly.
- **CSP Issues**: Inclusion of the `requiresCSP` tags within environments that do not support CSP could lead to script failures.

## Recommendations for Refactoring

- **Modularisation**: Consider breaking down `tagConfig` settings into more discrete functions or modules, each responsible for a specific subset of configurations. This enhances readability and maintainability.
- **Code Style**: Implement consistent commenting throughout the code. This includes consistent formatting for the comments and better explanation of why certain decisions were made, especially for array values.
- **Defensive Checks**: While we are not to apply them for `eventType` and `eventPayload`, addition of checks for the existence of `LBGAnalytics` at the beginning of the execution could prevent error states if the global object is not present.

## Maintenance & Further Notes

- **Ongoing Maintenance**: It's essential to routinely audit the tags in `omitTags`, `essentialTags`, `criticalPages`, and `ngaAllowable` to ensure they meet the latest compliance and business requirements as these environments change.
- **Ownership**: Assign a dedicated team or individual to oversee the extension’s functionality who should also be responsible for documenting any updates or changes made to the extension configuration.
- **Testing Guidelines**: Develop a testing protocol for scenarios where consent changes or tag behaviours are expected to shift due to user actions, ensuring that the application of this extension remains effective under all intended conditions.

This documentation should provide a comprehensive understanding of the Tealium iQ extension, enabling team members and stakeholders to engage with, modify, or maintain its functionality as needed.