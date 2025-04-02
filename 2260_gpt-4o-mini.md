# Tealium iQ Extension Documentation: MAU : set cookie defaults

## 1. Extension Overview

- **Name**: MAU : set cookie defaults
- **ID**: 2260
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Once

### Summary
This Tealium iQ extension sets default cookie consent settings for ad storage in the user's browser. It initializes the `uetq` queue with a default `consent` command, marking `ad_storage` as `denied`. If the targeting cookies are allowed (based on the specified condition), it updates the consent status to `granted`. This extension plays a critical role in managing user consent and compliance with privacy regulations such as GDPR.

## 2. Code Explanation

### Key Variables
- **`window.uetq`**: This is a global queue that stores user event and consent commands. It ensures that all commands are executed in order, even if they are queued due to loading conditions.
- **`a`**: Represents the `eventType` parameter that provides context for the event being processed.
- **`b`**: Represents the `eventPayload` object that may contain various properties, including the `CookiesTargeting` property, which determines if targeting cookies are allowed.

### Logic Flow
1. **Initialise the Queue**: The code first ensures that `window.uetq` is initialized as an empty array if it does not already exist.
2. **Set Default Consent**: The script pushes a default consent command into `uetq`, marking `ad_storage` as `denied`.
3. **Update Consent if Allowed**: It checks the `CookiesTargeting` property in the `eventPayload` (`b`). If it is `true`, it updates the consent setting, changing `ad_storage` to `granted`.

### Dependencies
- The extension increments existing functionality without any external dependencies besides the Tealium ecosystem itself. It primarily relies on the browser's global object and intrinsic JavaScript functionalities.

## 3. Usage Examples

### Normal Conditions
1. **When Targeting Cookies are not Allowed**:
   - Event Type: `eventType`
   - Payload: `{ "CookiesTargeting": false }`
   - Action: The consent for `ad_storage` will be set to `denied`.

2. **When Targeting Cookies are Allowed**:
   - Event Type: `eventType`
   - Payload: `{ "CookiesTargeting": true }`
   - Action: The initial consent is set to `denied`, but it will immediately be updated to `granted` when the condition is satisfied.

### Edge Conditions
- **Missing `CookiesTargeting` Property**:
  - If the `eventPayload` lacks the `CookiesTargeting` property, the script will simply default to setting `ad_storage` to `denied`.

- **Multiple Calls on the Same Event**:
  - The function is designed to be called once per event since the execution frequency is set to "Run Once". Multiple calls will not incorrectly set consent multiple times.

## 4. Known Limitations & Gotchas

- **Assumptions on `CookiesTargeting`**: If there is ever a case where `b` does not include `CookiesTargeting`, the consent status will not change from its default setting, leading to potential misconfigurations if not handled externally.
  
- **Race Conditions**: Should multiple scripts access `window.uetq` simultaneously, race conditions may arise. Ensure proper ordering in the loading of your scripts to avoid conflicts.

- **Conflicts with Other Extensions**: If there are other extensions manipulating `uetq`, unintended behaviour may occur. It’s critical to monitor the load order of extensions in the Tealium interface.

## 5. Recommendations for Refactoring

- **Defensive Coding**: Consider implementing checks to verify whether `b.CookiesTargeting` exists before checking its value. This could prevent potential issues if the structure of the incoming payload ever changes.
  
- **Modularization**: The consent management logic could be refactored into a dedicated function that could be reused in other extensions.

- **Consistency**: Follow consistent naming conventions for variables for readability. For example, using more descriptive names for `a` and `b` could aid understanding.

- **Comments**: Add inline comments to clarify each step further, particularly for team members who may be less familiar with JavaScript or the consent management flow.

## 6. Maintenance & Further Notes

- **Ownership**: Assign a specific team or individual responsible for maintaining the extension. Regular audits of the logic should be performed to ensure compliance with evolving privacy regulations.
  
- **Testing Guidelines**: Implement thorough unit testing around the handling of the `CookiesTargeting` property, ensuring both allowed and disallowed scenarios are covered.

- **Documentation Updates**: Ensure that any changes to the logic or structure of the data layers triggering this extension are reflected in the documentation to keep it accurate and relevant. 

This documentation is intended to provide clarity on the function and use of the "MAU : set cookie defaults" extension within Tealium iQ while ensuring that future developers can maintain and enhance its functionality effectively.