# Tealium iQ Extension Documentation: Event Timings

## 1. Extension Overview
- **Name**: Event Timings
- **ID**: 100040
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Event Timings" extension is designed to capture and store timing-related data during a webpage's lifecycle. Specifically, it records timestamps for page load and view events. This information is central to understanding user engagement and performance metrics, such as "Time Since Page Load" and "Time Since View Event." By tracking these metrics, businesses can enhance user experience and make data-driven decisions related to website optimization.

## 2. Code Explanation

### Key Variables
- **now**: Represents the current time in milliseconds since January 1, 1970 (UTC). It is used to timestamp various events.
- **PageLoadTimeStamp**: Timestamp for when the page began loading. It is stored in the data layer.
- **UtagViewTimeStamp**: Timestamp for the last recorded view event. It also resides in the data layer.
- **TimeSincePageLoad**: A computed function that calculates the time elapsed since the page load.
- **TimeSinceViewEvent**: A computed function for calculating the elapsed time since the last view event.

### Logic Flow
1. **Initialisation**: 
   - The script checks if `PageLoadTimeStamp` is undefined. If it is, the current timestamp is logged for both `PageLoadTimeStamp` and `UtagViewTimeStamp`.
   - Functions `TimeSincePageLoad` and `TimeSinceViewEvent` are defined to compute the time since the last occurrences.
   
2. **Event Handling**:
   - If the event type (`eventType`) is "view", `UtagViewTimeStamp` is updated to the current time, and `TimeSinceViewEvent` is reset.
   
3. **Data Layer Updates**:
   - If both `TimeSincePageLoad` and `TimeSinceViewEvent` are defined, it updates the data layer to include event metrics (`aa.event601`, `aa.event602`, `aa.event603`).

### Dependencies
- Relies on `LBGAnalytics.datalayer` which is expected to be a globally available object for setting data in the analytics layer.

## 3. Usage Examples

### Normal Scenario
- When a user loads a page, the extension captures the initial `PageLoadTimeStamp`. When the page finishes loading, it calculates timings for subsequent user actions. If they click an interactive element triggering a "view" event, the extension refreshes the `UtagViewTimeStamp` and calculates the elapsed time since the last event.

### Edge Conditions
- If the page is loaded and navigated quickly back to a previous state, the `TimeSincePageLoad` might reflect a very short duration, potentially less than expected (like a few milliseconds).
- If the webpage remains open for an extended period (more than 10 minutes), the timing functions will return `undefined`, as defined in the current logic.

## 4. Known Limitations & Gotchas
- The timing values will only be calculated for events occurring within a 10-minute window. Subsequently, they could yield `undefined` results for longer durations.
- If there are multiple simultaneous view events, the `UtagViewTimeStamp` could be set repeatedly, potentially impacting the accuracy of timing calculations if not properly managed.
- Ensure that other scripts do not overwrite the configurations in `LBGAnalytics.datalayer`, as it may conflict with the intended data capture.

## 5. Recommendations for Refactoring
- **Defensive Checks**: Even though variable presence is guaranteed, additional validation could ensure robustness and improve error handling.
- **Code Style**: Consider adding comments for clarity on variable intent, especially within complex calculations.
- **Modularisation**: Extract timestamp calculation logic into reusable functions for better maintenance.
- **Consolidate Functionality**: Merge similar functionalities into single functions to avoid redundancy and enhance readability.

## 6. Maintenance & Further Notes
- **Ownership**: Designate a dedicated team or individual responsible for maintenance of the extension.
- **Testing Guidelines**: Regularly validate the extension in a staging environment to ensure that timing data is logged correctly before pushing updates to production.
- **Documentation Updates**: Keep this documentation up-to-date with any changes to functionality, dependencies, or code improvements.

---
This comprehensive documentation serves as a reference for developers and stakeholders to understand the `Event Timings` extension in detail, facilitating better collaboration and maintenance.