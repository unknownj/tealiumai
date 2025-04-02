# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name:** Set click IDs for event stream
- **ID:** 1786
- **Type:** Javascript Code
- **Scope:** Before Load Rules
- **Execution Frequency:** Run Always

### Summary
This extension sets the `click_id` and associated click source for tracking user interactions through various marketing channels. By checking specific cookie and query parameters (like Facebook and Google IDs), it populates the data layer for better campaign tracking and reporting in analytics. This is crucial for understanding the effectiveness of marketing campaigns and optimising them based on incoming user data.

---

## 2. Code Explanation

### Key Variables
- **`click_id`**: Represents the identifier for the campaign click that brought the user to the site.
- **`click_source`**: Denotes the source of the click (e.g., Facebook, Google).
  
### Logic Flow
1. **Check for Existing Click ID**: The extension first checks if `click_id` is already set in the data layer.
2. **Conditionally Set Click IDs**:
   - It checks for the Facebook Click ID (`cp._fbc`) and sets it as `click_id` if not already defined, along with setting the `click_source` to "facebook".
   - It subsequently checks for the Google Click ID (`gclid`), following similar logic.
3. **Log Information**: Whenever a click ID or related variable is set, it logs the change using the `LBGAnalytics.analyticsLog` function if available.
4. **Handle Additional IDs**: It checks for other parameters like `gbraid`, `wbraid`, etc., and updates the data layer accordingly.

### Dependencies
- **`clova3.datalayer`**: Used for setting and getting data layer values.
- **`LBGAnalytics`**: Conditional logging functionality for tracking purposes.
- **`utag.data`**: Holds query parameters and customer parameters that are checked against the extension logic.

---

## 3. Usage Examples

### Sample Scenario
- **Normal Condition**:
   - A user arrives at the site via a Facebook ad that provides `cp._fbc`.
   - The extension sets `click_id` to the value from `cp._fbc` and `click_source` to "facebook", allowing analysts to attribute the visit correctly.

### Edge Condition
- **Multiple Sources**:
   - If both Facebook and Google ID parameters are present, only the first matching ID will be set as `click_id`.
   - E.g., If a user has both `cp._fbc` and `qp.gclid`, only `click_id` derived from `cp._fbc` will be set—subsequent checks for `qp.gclid` will have no effect.

---

## 4. Known Limitations & Gotchas

- **Overlapping Sources**: The code does not account for scenarios where multiple identifiers from different platforms could be present simultaneously.
- **Variable Naming Convention**: The extension currently uses `facebook_customer_id` but notes that it is misnamed. This can lead to confusion when referencing this ID.
- **Field Availability**: If certain parameters (e.g., `qp.gclid`) are not present, the corresponding functionalities will not be invoked, possibly leading to untracked user sources.
- **Potential Conflicts**: If another extension manipulates the same data layer variables, it could lead to unexpected results or data loss.

---

## 5. Recommendations for Refactoring

1. **Improve Code Readability**:
   - Introduce consistent indentation and spacing for better readability.
  
2. **Centralise Logging**:
   - Create a separate function for logging to reduce redundancy and encapsulate logic.

3. **Use Function Declarations**:
   - Encapsulate repeated actions (like setting click IDs) in functions to enhance modularity and reduce code duplication.

4. **Error Handling**:
   - Consider adding warnings or logging for cases where expected query parameters are not found, enhancing debugging capabilities without affecting performance.

5. **Documentation Comments**:
   - Include comments in the code explaining the purpose of each block or function to enhance understanding for future developers.

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign a team member responsible for regular updates and checks of the extension to ensure it continues to perform as expected with any UI or marketing campaign changes.
- **Testing Guidelines**: Implement unit tests or QA checks whenever changes are made to ensure that logging and data layer integration continues to work correctly.
- **Version Control**: Maintain a version history of the extension code in the repository to track changes and facilitate rollbacks if necessary.

**Note**: Ongoing monitoring of campaign identifiers and adaptation as new marketing sources or identifiers emerge is crucial for maintaining the integrity of the data collected.