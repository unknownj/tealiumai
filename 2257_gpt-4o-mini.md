# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Pegasus V2 : MAU functions
- **ID**: 2257
- **Type**: Advanced Javascript Code
- **Scope**: 1611
- **Execution Frequency**: On event triggers defined in the lookup table

### Summary
This Tealium iQ extension implements various functions to send Microsoft Advertising Universal Event Tracking (MAU) events based on user interactions, such as purchases and views of items. The extension processes data from a predefined lookup table and triggers MAU events with relevant parameters, enhancing tracking accuracy and marketing campaigns effectiveness.

---

## 2. Code Explanation

### Key Variables
- **`b`**: Contains the payload data, including order ID, journey details, and other relevant information sent to the extension.
- **`ev`**: Represents the event type being processed (e.g., "purchase" or "view_item").
- **`label`**: A string that concatenates various identifiers for tracking.
- **`ord`**: Represents the transaction or order identifier.
- **`value`**: The monetary value associated with the event.

### Logic Flow
1. **Event Handling**: The main function is invoked with parameters `eventType`, `eventPayload`, and `tagObject`.
2. **MAU Event Function**: The `mau_event` function determines which parameters to send based on the event type (`ev`). It configures the values of `ord`, `value`, and `label`, then pushes this information to `window.uetq`.
3. **String and Array Manipulation**: Functions like `unpackStr`, `createElig`, and `unpackTag` are used to parse strings into arrays and create eligibility rules based on lookup tables.
4. **Tag Handling**: The `setTags` function checks the event triggers (e.g. "Page", "Timed", or "Event") and executes the respective MAU event function under the specified conditions.
5. **Lookup Processing**: The `runLookups` function iterates through the lookup table and processes each entry, evaluating eligibility and triggering events based on defined rules.

### Dependencies
- **Global Objects**: This extension depends on the presence of `window.uetq` for Microsoft Advertising tracking and `LBGAnalytics` for event handling.

---

## 3. Usage Examples

### Normal Conditions
- **Purchase Event**:
  - When a user completes a purchase, `mau_event` would capture the `purchase` event type, set `ord` as the `paid_order_id`, populate `value` from `JourneyAmount`, and generate a label combining `JourneyName` and `JourneyProduct`.

### Edge Conditions
- **Unrecognised Event Types**:
  - For unsupported event types, the code defaults to setting `label` as the concatenation of `JourneyName` and `JourneyProduct`, with `value` and `ord` defaulting to `0` and `1` respectively. Logging will occur to track which labels are generated for unidentified events.

---

## 4. Known Limitations & Gotchas

- **Dependency on Proper Data Structure**: The extension assumes that the data structure of `eventPayload` will always contain fields like `paid_order_id`, `JourneyAmount`, `JourneyName`, etc. Missing fields could lead to erroneous behavior.
- **Timing Issues**: The implementation includes a timeout for "Timed" triggers. If the delay is not adequately set, it could result in missed events if the user navigates away from the page before it fires.
- **Conflicts with Other Scripts**: If multiple scripts manipulate `window.uetq`, this can lead to unpredictable behaviour in tracking events.

---

## 5. Recommendations for Refactoring

1. **Modularisation**: Consider breaking down the code into reusable modules for better maintainability. Each function could reside in separate files, imported where needed.
2. **Error Handling**: While catches are used, expanding on error handling and logging mechanisms could ensure improved diagnosis of issues during execution.
3. **Parameter Validation**: Before processing event parameters, performing checks would ensure stability — e.g., checking if keys exist before referencing them in `b`.
4. **Documentation**: Inline comments should clearly state the purpose of each function and key variable, improving readability and making it easier for future developers to understand the code.

---

## 6. Maintenance & Further Notes

- **Ownership**: Define clear ownership roles for updates and bug fixes. Regular reviews of the extension should be scheduled to ensure compatibility with revised tracking strategies or libraries.
- **Testing Guidelines**: Incorporate unit tests to verify the functionality of individual components. End-to-end testing should also be undertaken to ensure the extension behaves as expected in real scenarios.
- **Performance Monitoring**: Implement analytics to track the performance of the extension's event firing, ensuring it meets the necessary service level agreements (SLAs).

---

This documentation serves as a comprehensive resource for developers and stakeholders working with the Tealium iQ extension for Microsoft's MAU functions. An understanding of the extension's roles and functionalities will support effective integration and troubleshooting.