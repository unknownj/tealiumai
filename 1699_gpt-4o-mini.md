# Tealium iQ Extension: Performance Timings

## 1. Extension Overview
- **Name**: Performance Timings
- **ID**: 1699
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Once

### Summary
The **Performance Timings** extension is designed to capture and log various performance timings of page load events using the Navigation Timing API. By recording these timings, it allows for better analysis and understanding of page load performance, which can be crucial for optimising user experience and debugging performance issues. The captured events are sent to the LBGAnalytics system, facilitating real-time monitoring and reporting of website performance metrics.

## 2. Code Explanation

### Key Variables
- **`p`**: This variable holds the result of `performance.getEntriesByType("navigation")[0]`, which is an object containing various timing properties related to the navigation of the page.

### Logic Flow
1. The extension first checks if the `loadEventEnd` property on the `performance` object is greater than zero to ensure the page load event has completed.
2. If the condition is satisfied, it logs multiple timing metrics measured in milliseconds, each constrained to a maximum value of 60000 ms (1 minute) using `Math.min`.
3. The metrics include:
   - `connectEnd`: Time when the connection to the server was completed.
   - `responseEnd`: Time when the last byte was received from the server.
   - `domContentLoadedEventEnd`: Time when the DOMContentLoaded event fired.
   - `domComplete`: Time when the page's DOM is fully loaded and parsed.
   - `domInteractive`: Time when the page becomes interactive.
   - `loadEventEnd`: Time when the load event fired.
   - `connectEnd - fetchStart`: Time taken for the connection phase.
   - `responseEnd - requestStart`: Time taken for processing the request and response.
   - `domContentLoadedEventEnd - domContentLoadedEventStart`: Time taken from the start to the end of the DOMContentLoaded event.
   - `loadEventEnd - loadEventStart`: Time taken from starting the load event to its completion.

### Dependencies
- The extension relies on the global `performance` object provided by modern browsers and assumes the presence of `LBGAnalytics` for sending the logged events.

## 3. Usage Examples

### Normal Scenario
When a page is loaded and the performance timings are available, the extension collects the timings and sends them via generic events to the LBGAnalytics system as follows:

- The user navigates to the webpage.
- The `loadEventEnd` timing is checked to confirm page load completion.
- Multiple metrics, including `domContentLoadedEventEnd` and `loadEventEnd`, are sent to LBGAnalytics for reporting.

### Edge Conditions
1. **Missing Navigation Timing Data**: If the `performance.getEntriesByType("navigation")` returns an empty array, the code will not run or send any data. This can happen in certain older browsers that do not support the Navigation Timing API.
2. **Exceeding Maximum Time**: Any timing exceeding 60000 ms will be capped at this value, which may not accurately represent performance for very slow connections.

## 4. Known Limitations & Gotchas
- **Browser Compatibility**: The extension depends on the availability of the Navigation Timing API, which may not be supported in older browsers. Testing should ensure compatibility with the target audience's browsers.
- **Potential Failures**: If `LBGAnalytics` is not properly initialized or is unavailable, the events may fail to log without any indication.
- **Execution Timing**: Since the extension runs after load rules, its execution relies on the appropriate loading sequence of other dependent scripts.

## 5. Recommendations for Refactoring
- **Error Handling**: Consider adding more robust error handling around the `LBGAnalytics` calls to prevent silent failures if the analytics service is down.
- **Modularisation**: Splitting the code into smaller functions for each event sent could improve readability and maintainability.
- **Logging for Debugging**: Introduce console logging where needed during development for tracking execution flow and potential issues in data capture.
- **Commenting**: Adding descriptive comments to complex sections of the code will improve understanding for other developers.

## 6. Maintenance & Further Notes
- **Ownership**: Assign a dedicated team member for ongoing maintenance and updates to ensure compliance with the latest web standards and technologies.
- **Testing Guidelines**: Regularly test the extension as part of the overall website performance testing suite. Ensure browser compatibility tests are up to date.
- **Documentation Updates**: Keep documentation current with any changes made to the extension to assist future developers or stakeholders.

---

This documentation aims to provide an exhaustive understanding of the Performance Timings extension, facilitating effective collaboration and maintenance among developers and stakeholders.