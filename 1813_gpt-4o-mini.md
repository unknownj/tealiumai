```markdown
# Tealium iQ Extension Documentation: Sustainability Metrics

## 1. Extension Overview
- **Name**: Sustainability Metrics
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The "Sustainability Metrics" extension is designed to capture various metrics related to the sustainability of web pages. It gathers data such as the number of elements on the page, the size of the body content, and transfer sizes for network performance. The primary purpose of this extension is to send these metrics to the LBG Analytics platform for further analysis, enabling insights into web performance and sustainability.

## 2. Code Explanation

### Key Variables
- `sustainabilityMetrics`: An object that stores metrics related to the sustainability of the web page.
  - `elementsOnPage`: The total number of elements present on the page.
  - `bodySize`: The length of the inner HTML of the body element.
  - `transferSize`: The total transfer size of the initial navigation request.
  - `decodedBodySize`: The size of the body content after decompression.
  - `encodedBodySize`: The size of the body content in its encoded state.

### Logic Flow
1. The code executes once when the DOM is ready and only if the random number generated is less than 0.001, ensuring the metrics are collected infrequently (approximately once in every 1000 page loads).
2. It initializes the `sustainabilityMetrics` object and populates it with various metrics obtained from the `document` and `window.performance` APIs.
3. A check is performed to ensure that none of the collected metrics fall outside specified thresholds (less than 0 or greater than 10,000,000). If any of the metrics are deemed 'broken,' the data is not sent.
4. If the data is valid, the metrics are sent to the LBG Analytics system using multiple `genericEvent` method calls, each sending a different metric.

### Global Dependencies
- `document`: Utilised to access the DOM and count elements.
- `window`: Used for accessing the performance-related metrics.
- `LBGAnalytics`: A global object that handles the sending of metrics to the analytics platform.

## 3. Usage Examples

### Normal Conditions
- When a user navigates to any page on the site, this extension may run (approximately a 0.1% chance). If executed, it would gather and send the number of elements and body sizes, provided the metrics are within the acceptable range.

### Edge Conditions
- If the page contains a massive number of elements or an extremely large body size, the extension will classify this data as 'broken' and will not transmit it.
- If JavaScript is disabled in the user's browser, the extension will not run, and thus no analytics data will be collected.

## 4. Known Limitations & Gotchas
- **Random Execution**: Given that execution is based on a random number, metrics may be underrepresented in the analytics system, leading to potential data gaps.
- **Data Breakdown**: Metrics exceeding the defined thresholds are discarded, which may lead to an incomplete dataset.
- **Event Sending**: If the LBGAnalytics library is not loaded or fails, the events will not be sent, and performance data will be lost.
- **Other Scripts**: The extension may conflict with other scripts manipulating the DOM or performance measurement, leading to inaccurate metrics.

## 5. Recommendations for Refactoring
- **Defensive Checks**: Although global assumptions for `eventType` and `eventPayload` are made, further checks could help prevent failures if those data structures are modified in the future.
- **Code Organisation**: Consider encapsulating the gathering of sustainability metrics in a separate function. This improves readability and could facilitate easier testing.
  ```javascript
  function gatherSustainabilityMetrics() {
      var metrics = {};
      metrics.elementsOnPage = document.querySelectorAll("*").length;
      metrics.bodySize = document.body.innerHTML.length;
      // additional metric calculations...
      return metrics;
  }
  ```
- **Centralised Logging**: Instead of empty catch blocks, logging errors to a monitoring system might help identify issues during execution.
- **Comments**: Include more comments within the code to clarify complex logic or decisions, especially around the metric thresholds and why certain checks are performed.

## 6. Maintenance & Further Notes
- **Ownership**: This extension should be maintained by the web performance team, with periodic reviews suggested to ensure ongoing accuracy and relevance.
- **Testing Guidelines**: Regular testing is encouraged, particularly after updates to the Tealium iQ environment or related JavaScript libraries. Create automated tests to validate the execution of the metrics gathering logic.
- **Documentation Updates**: As this is a live monitoring tool, the documentation should be revisited and updated following any significant updates to the codebase or changes in the functionality.
```
