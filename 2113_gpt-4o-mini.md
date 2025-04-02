# Tealium iQ Extension Documentation: Performance Marks for Timing Measurement

## 1. Extension Overview
- **Name**: Performance Marks for Timing Measurement
- **ID**: 2113
- **Type**: Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
This extension is designed to measure performance timings for specific events on a webpage. It allows for the crucial benchmarking of user interactions against timestamps of key events (such as page load and page view). The primary goal is to identify metrics which can be analysed to improve user experience, identify bottlenecks, and inform performance-related adjustments on the site.

## 2. Code Explanation
### Key Variables
- **markName**: Input parameter for the two main functions (`markStart` and `mark`);
  only strings with a length of 100 characters or less are accepted.
  
- **markTime**: A variable capturing the current time (in milliseconds) at which an event is marked.

- **dl**: Reference to the data layer, obtained via `LBGAnalytics.datalayer.getCache()`, containing timestamps for page load and view.

- **relativeEventValues**: A string that forms part of the product string, expressing the relative timing of the marked events.

### Logic Flow
1. The `markStart` function initialises a start mark for a specific event name, storing the time when the event starts.
2. The `mark` function calculates the elapsed time since the start mark for that event, alongside two other metrics: time since page load and time since last page view.
3. If time metrics are within acceptable bounds (not older than 30 minutes), data is formatted into a product string and pushed to a cache.
4. This data is then stored in local storage for further use.

### Dependencies
- **LBGAnalytics**: The code relies on the presence of the global `LBGAnalytics` object, which includes:
  - `LBGAnalytics.events`: Where the functions `markStart` and `mark` are defined.
  - `LBGAnalytics.datalayer`: Used for accessing performance timestamps.
  - `LBGAnalytics.correlations`: Used for tracking product metrics and counting events.

## 3. Usage Examples
### Normal Flow
- **Event Flow**: When the user interacts with an element and triggers a timing measurement:
  1. `LBGAnalytics.events.markStart('button_click')` is called to start monitoring the event.
  2. After a specific user action related to that event, `LBGAnalytics.events.mark('button_click')` is invoked.
  3. Data on elapsed timing and other relevant metrics are stored for analytics purposes.

### Edge Conditions
- **Invalid Inputs**: If a non-string or excessively long string is passed to either function, the action will be discarded (no performance data recorded).
- **Timeliness Checks**: If an event is marked after more than 30 minutes from the page load or view timestamps, that marking is ignored.

## 4. Known Limitations & Gotchas
- **No Fallback Handling**: If either a page load or view timestamp is missing in the data layer, the marking function may fail silently.
- **Dependency on Timestamps**: The extension requires accurate timestamps in the data layer, and any discrepancies can lead to incorrect metrics or ignored event timings.
- **Storage Limits**: Usage of `localStorage` is subject to browser storage limits; excessive tracking data may lead to failures in persistence for large datasets.

## 5. Recommendations for Refactoring
- **Parameter Validation**: While the input checks are present, consider further checks for edge cases (e.g., null or undefined values).
- **Modularisation**: The functionality can be split into smaller helper functions for readability and testing.
- **Code Comments**: Add comments to clarify the purpose of certain sections, especially for future maintainers or external developers.
- **Logging**: Introduce error logging to better handle cases where timestamp data is missing or invalid.

## 6. Maintenance & Further Notes
- **Ownership**: The maintenance of this extension should be assigned to team members familiar with performance analytics.
- **Testing Guidelines**: Regular testing should be conducted especially when making changes to the data layer or introducing new features. Consider writing unit tests to validate functionality.
- **Documentation Updates**: Ensure that any changes to the functionality of this extension are documented immediately to keep the knowledge base current for other developers.

This documentation should provide a comprehensive overview for both developers and stakeholders, ensuring a clear understanding of the functionality and requirements of the Performance Marks for Timing Measurement extension within Tealium iQ.