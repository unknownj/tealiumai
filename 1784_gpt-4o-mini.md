# Tealium iQ Extension Documentation: GA4 Debug Mode (Dev Only)

## 1. Extension Overview
- **Name**: GA4: Debug mode (dev only)
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: 1536
- **Execution Frequency**: Active (executed when the conditions are met)

### Summary
This extension is designed to enable debug mode for Google Analytics 4 (GA4) in a development environment. By setting the `debug_mode` parameter to `true`, developers can easily track and troubleshoot data sent to GA4 during testing, without affecting production data. This is essential for ensuring accurate configuration and data integrity before deployment.

## 2. Code Explanation

### Key Variables
- **eventType**: A string representing the type of event being processed.
- **eventPayload**: An object containing the details of the event, which may include various parameters dependent on specific use cases.
- **tagObject**: An object that is expected to contain the necessary configurations for tag management.

### Logic Flow
1. The code encapsulates a function that accepts three parameters: `eventType`, `eventPayload`, and `tagObject`.
2. (Commented Out) There is a condition to check if the environment variable `ut.env` is set to `"dev"`. Currently, this line is commented out, meaning it will always execute the subsequent code block regardless of the environment.
3. The `gtag` function is called with the configuration ID `G-DFK4D55H81`, enabling debug mode by passing `{ 'debug_mode': true }` as a second parameter.

### Dependencies
- **gtag()**: This global function is part of the GA4 library and must be loaded prior to this extension for successful execution.
- **utag**: The `utag.data` object is referenced (commented conditionally), which indicates potential dependencies on the Tealium Data Layer.

## 3. Usage Examples

### Normal Condition
In a typical development environment:
- When `ut.env` is set to "dev" (if uncommented), the extension will activate and send the event data along with the debug mode flag to GA4.
- This allows for real-time monitoring and diagnosis of the data being sent.

### Edge Condition
If the environment variable check is not performed:
- The `gtag('config', 'G-DFK4D55H81',{ 'debug_mode':true });` will execute regardless of the environment, potentially leading to unwanted debug data being sent in a production or test environment.

## 4. Known Limitations & Gotchas
- The environment check is currently commented out, which may lead to unintended debug mode activation in production environments.
- If other extensions or scripts also manipulate the `gtag` function, it may lead to conflicts or overwriting of the configurations that this extension aims to set.
- This extension assumes the existence of the `gtag` function; if it is not loaded, the extension will fail silently.

## 5. Recommendations for Refactoring
- **Uncomment the Environment Check**: Ensure that the condition checking for `ut.env` is active to prevent debug mode from being triggered in production environments.
- **Code Style**: Maintain consistent spacing and formatting for better readability.
- **Modular Structure**: Consider refactoring the logic into smaller, named functions if the complexity increases, allowing for easier testing and maintenance.
- **Document Assumptions**: Explicitly document any dependent variables or object structures expected by this code, including any assumptions about what data `eventPayload` might contain.

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: The extension should be regularly reviewed for any updates in the GA4 API and to verify that dependencies are still valid.
- **Ownership**: Assign ownership to a specific team or individual to ensure accountability for updates and debugging.
- **Testing Guidelines**: Thoroughly test this extension in different environments (dev, test, production) to ensure the correct functionality and that no debug data is leaked into production analytics.

This documentation serves as a comprehensive guide for the GA4 Debug Mode extension, aimed at facilitating understanding, usage, and future enhancements.