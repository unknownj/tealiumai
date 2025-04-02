# Tealium iQ Extension Documentation: Spending Rewards Correlations

## 1. Extension Overview

- **Name**: Spending Rewards Correlations
- **ID**: 1479
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The "Spending Rewards Correlations" extension is designed to extract information about offers related to spending rewards from a defined section of a webpage. When users navigate to specific paths (i.e., `/sr_hub` or `/spending_rewards_hub`), the extension waits for the DOM to be fully loaded and subsequently collects offer details that are structured in a predefined format. The collected data is then sent to a specified analytics correlation service.

## 2. Code Explanation

### Key Variables
- **`$`**: A reference to the jQuery-like library (likely from the global `clova2`) used for DOM manipulation.
- **`offers`**: An array of DOM elements representing the available spending rewards offers extracted from the webpage.

### Logic Flow
1. **Path Check**: The code first checks if the current URL path contains either `"sr_hub"` or `"spending_rewards_hub"`. If not, the subsequent logic will not execute.
2. **Deferred Execution**: A `setTimeout` function is employed to delay the execution of the offer extraction logic by 3 seconds, allowing ample time for the DOM to load.
3. **Offer Extraction**: The code selects and iterates through each offer element within the specified selectors and extracts:
   - The ID of the accordion title button.
   - The merchant name.
   - Reward percentage.
   - Expiry date, cleaning the extracted string by removing the "Expires:" label.
4. **Formatting**: Each piece of extracted data undergoes formatting to replace slashes (`/`) with spaces for safer string concatenation.
5. **Data Transmission**: Finally, the formatted offer details are sent to `LBGAnalytics.correlations.add` for further processing.

### Dependencies
- **Global Objects**: The code depends on the global `$` object from `window.clova2`, which must be available for proper functionality.
- **LBGAnalytics**: The extension also interacts with an external analytics service denoted as `LBGAnalytics()` to dispatch the data collected.

## 3. Usage Examples

### Sample Scenario (Normal Operation)
- A user navigates to `/sr_hub`, and the extension executes after 3 seconds. 
  - Let's say the DOM contains two offers:
    1. Offer 1: Button ID: `offer1`, Merchant Name: `Merchant A`, Discount: `20%`, Expiry: `Expires: December 2023`
    2. Offer 2: Button ID: `offer2`, Merchant Name: `Merchant B`, Discount: `15%`, Expiry: `Expires: January 2024`
  - The extracted output would format as:
    - "offer1/Merchant A/20%/December 2023"
    - "offer2/Merchant B/15%/January 2024"
  - This data is sent to LBGAnalytics for correlation tracking.

### Edge Condition
- If the DOM elements for the offers are not present when the script runs, the offers array will be empty, and no data will be sent to LBGAnalytics.

## 4. Known Limitations & Gotchas

- **Delayed Execution**: The reliance on a fixed timeout of 3 seconds may lead to issues if the page takes longer to load or if the offer elements are dynamically generated after the timeout has elapsed.
- **DOM Structure Changes**: Any modifications to the HTML structure of the offers section may break the selectors if they are not updated accordingly, potentially leading to missing data submissions.
- **Interference with Other Scripts**: The extension may conflict with other scripts or extensions that also manipulate the DOM or perform similar data gathering within the same scope.

## 5. Recommendations for Refactoring

1. **Defensive Checks**: Before executing the main logic, add checks to ensure that the `$` and `LBGAnalytics` objects are defined and accessible to avoid runtime errors.
2. **Modularisation**: Break the code into smaller, reusable functions for better readability and maintainability. For instance, create a function dedicated to extracting offer data.
3. **Use of Comments**: Add comments within the code to describe intentions and logic to improve maintainability for other developers.
4. **Error Handling**: Implement basic error handling or logging mechanisms to aid debugging if the data extraction fails.

## 6. Maintenance & Further Notes

- **Ownership**: The ownership of this extension should be assigned to a specific team or individual who understands both the functionality and the analytical requirements.
- **Ongoing Maintenance**: Regularly review and test the extension to ensure compatibility with any changes in the external DOM structure or analytical service requirements.
- **Testing Guidelines**: Establish a testing framework including unit tests for each piece of extracted data and end-to-end tests for the full execution path. Testing should be performed after any code modifications or changes to the external dependencies.

**End of Document**