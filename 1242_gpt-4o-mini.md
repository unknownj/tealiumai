# Tealium iQ Extension Documentation: SCA Events

## 1. Extension Overview
- **Name**: SCA Events
- **ID**: 1242
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The SCA Events extension is designed to capture specific user interactions on the website, such as clicks on designated buttons. When a user clicks on either the "#sca_Trust_now" or "#sca_not_my_device" buttons, it triggers specific analytics events via the `LBGAnalytics` library. This allows for granular tracking of user behaviour and enhances the website's analytical capabilities, aiding in understanding user intent related to trust and device verification.

## 2. Code Explanation

### Key Variables
- **window.clova2**: This object provides access to jQuery within a specific namespace. It is used to attach event handlers to DOM elements.
- **#sca_Trust_now** and **#sca_not_my_device**: These are IDs of elements on which the click events are being tracked.

### Logic Flow
1. The code listens for click events on two specific buttons identified by their IDs.
2. When "#sca_Trust_now" is clicked, it sends a generic event with an ID of 171 to the `LBGAnalytics` system.
3. When "#sca_not_my_device" is clicked, it sends a generic event with an ID of 172 to the same analytics system.

### Dependencies
- **jQuery**: The extension is reliant on jQuery, accessed through the `window.clova2.$` object. Ensure that jQuery is loaded on the page for this extension to function correctly.
- **LBGAnalytics**: This is a global object assumed to be defined elsewhere in the application; it contains methods for sending analytics data.

## 3. Usage Examples

### Normal Conditions
- **Scenario**: A user visits the website and sees two buttons: “Trust Now” and “Not My Device”.
  - **Action**: The user clicks the “Trust Now” button.
  - **Expected Outcome**: A generic event with ID 171 is sent to `LBGAnalytics`, capturing the interaction for further analysis.

- **Scenario**: The same user decides that the detected device is not theirs.
  - **Action**: The user clicks the “Not My Device” button.
  - **Expected Outcome**: A generic event with ID 172 is sent to `LBGAnalytics`.

### Edge Conditions
- **Scenario**: The user rapidly clicks the “Trust Now” button multiple times.
  - **Outcome**: The event is still sent only once due to the "Run Once" setting of the extension, reducing potential event flooding.

- **Scenario**: Another script modifies the availability of the buttons after the extension runs.
  - **Outcome**: No events will be captured for modifications made post-initialisation unless the buttons are present at the time of the extension's execution.

## 4. Known Limitations & Gotchas
- **Event Overlap**: If multiple clicks occur in quick succession, only the first click will register due to the "Run Once" configuration.
- **Dependency on jQuery**: If jQuery is not available when this extension is executed, the event handlers will not be attached, leading to no analytics events being sent.
- **Conflicts with Other Scripts**: If any other script alters the DOM and targets the same button IDs, there may be unexpected behaviours. Ensure unique IDs are used.

## 5. Recommendations for Refactoring
- **Naming Consistency**: Ensure consistent naming conventions for IDs. If button names change, consider updating how these are referenced in the code.
- **Error Handling**: Implement error handling to catch issues with the analytics library (e.g., if `window.LBGAnalytics` is not defined).
- **Modularisation**: Consider wrapping the event handlers in an anonymous function to avoid polluting the global namespace.
- **Commenting**: Add comments throughout the code to explain the purpose of each event handler and function call for clarity.

## 6. Maintenance & Further Notes
- **Ownership**: Assign an owner for the extension to ensure accountability for updates and maintenance.
- **Testing Guidelines**: Regularly test the extension on various browsers and devices to ensure compatibility and performance.
- **Updates**: Keep abreast of any changes to the `LBGAnalytics` library or jQuery that may affect this extension.

--- 

This documentation provides a comprehensive understanding of the SCA Events extension, guiding future enhancements and collaborations. Please feel free to reach out for further clarifications or additions.