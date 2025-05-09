# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Page Load Adobe Event Triggers
- **ID**: 1225
- **Type**: Advanced JavaScript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
This Tealium iQ extension is designed to enhance tracking functionalities by firing Adobe Analytics events under specific conditions. It generates a unique ID for a journey whenever the URL path contains `/cwa/`, and it captures click events on telephone links with a structured event sent to Adobe Analytics. This supports better tracking of user interactions, enabling data-driven insights into user behaviour, particularly during significant engagement moments such as phone calls.

## 2. Code Explanation

### Key Variables
- `window.location.pathname`: Used to identify the current URL path.
- `window.clova3.datalayer.set`: A method to set values in the Clova data layer.
- `window.LBGAnalytics.events`: An object that is leveraged to send events to Adobe Analytics.
- `ev`: The event object passed to the click event handler, capturing details about the event.

### Logic Flow
1. **JourneyUniqueID Generation**: 
   - If the current path contains `/cwa/`, a unique ID is generated by combining the current timestamp and a random number, then converted to a base-36 string format. This unique identifier is crucial for tracking individual user journeys.

2. **Before Print Event Listener**: 
   - An event listener is added for the `beforeprint` event, which triggers the sending of a generic event (ID: 87) to Adobe Analytics whenever a print action is initiated.

3. **Click Event Listener**: 
   - A click event listener is added on all anchor elements (`<a>`) that have an `href` attribute starting with `tel:`, which denotes telephone links. When clicked, this sends a structured event (ID: 204) to Adobe Analytics, capturing the narrative of the click event based on the hyperlink text.

### Dependencies
- The extension relies on the global `window` object and associated analytics libraries (`window.clova3` and `window.LBGAnalytics`). The `$` method from `window.clova2` is used as a jQuery-like selector.

## 3. Usage Examples

### Normal Condition
- When a user navigates to `www.example.com/cwa/some-page`, a unique Journey ID is generated. If the user clicks on a telephone link like `<a href="tel:123456789">Call Us</a>`, the following data is sent to Adobe Analytics:
  ```javascript
  {
    JourneyEvent: "External Click",
    EventAction: "Click to Call",
    EventNarrative: "Call Us"
  }
  ```

### Edge Condition
- Navigating to `www.example.com/other-page` will not trigger the unique Journey ID creation but will still allow telephone link clicks to fire the analytics event as intended.

## 4. Known Limitations & Gotchas

- **Path Matching**: The condition checking for `/cwa/` is strict; any variation (case sensitivity, additional or missing slashes) in the URL may result in the unique ID not being set.
- **Event Handling for Print**: If the print event is triggered before the page has fully loaded, the corresponding Adobe event may not be sent.
- **Compatibility**: This extension may conflict with other extensions that modify the global `window` object or manipulate the DOM in a similar manner.

## 5. Recommendations for Refactoring

- **Defensive Checks**: Although it is stated not to worry about the availability of `eventType` and `eventPayload`, it might still be prudent to check for the existence of `window.clova3` and `window.LBGAnalytics` before invoking their methods to prevent runtime errors.
  
- **Code Styling**: Use consistent formatting, such as proper indentation and semicolons across the codebase, to improve readability and maintainability.

- **Modularisation**: Consider breaking down the large block into smaller functions, such as `generateJourneyUniqueID`, `trackPrintEvent`, and `trackClickEvent`, allowing for better code organisation and reusability.

## 6. Maintenance & Further Notes

- **Ownership**: Designate a specific developer or team responsible for the ongoing maintenance of the extension to ensure swift integration of updates and fixes if required.

- **Testing Guidelines**: Establish comprehensive testing procedures, including unit tests and user acceptance testing (UAT), to ensure the extension works as expected under various scenarios and does not interfere with other site functionalities.

- **Documentation Updates**: Continuously update this documentation as the extension evolves or when new features are added, ensuring that it remains a reliable source of information for all users and developers interacting with the extension.

--- 

This structured documentation should serve as a comprehensive reference for developers working with the Tealium iQ extension, providing clarity on functionality, implementation, and ongoing maintenance.