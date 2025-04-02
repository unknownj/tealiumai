# Tealium iQ Extension Documentation: Workday Querystring Persistence

## 1. Extension Overview
- **Name:** Workday Querystring Persistence
- **ID:** 100036
- **Type:** Javascript Code
- **Scope:** 1495
- **Execution Frequency:** On every page load/event

### Summary
The Workday Querystring Persistence extension captures specific query string parameters (such as UTM parameters and the "source" parameter) from the URL of the current page and persists them into a session cookie. This cookie is then utilised to append the stored UTM parameters to any Workday-related hyperlinks present on the webpage. This is essential for tracking referral sources and ensuring that users retain UTM information when navigating to job postings on Workday.

---

## 2. Code Explanation
### Key Variables
- `relevantQuerystring`: A string composed of the relevant query parameters (DEMO: UTM and "source") extracted from the current URL's query string.
- `workday_utm`: The value of the `workday_utm` cookie which holds the relevant parameters for later use.
- `workdayLinks`: An HTMLCollection containing all anchor (`<a>`) elements on the page.
- `workdayLinksArray`: An array to hold filtered Workday links for which the UTM parameters need to be appended.

### Logic Flow
1. **Query String Extraction**:
   - Retrieves the query string from the current URL.
   - Filters for query parameters that start with "utm" or are equal to "source".
   - Encodes the values and assembles them into a single query string.
  
2. **Cookie Management**:
   - If the query string contains relevant parameters, it sets the `workday_utm` cookie.
   - Attempts to retrieve the value of this cookie for later use.

3. **Filtering Links**:
   - Collects all hyperlinks on the page and filters them down to those related to Workday (specifically checking the URL).
   - Ensures that UTM parameters are only appended to links that either do not already contain query parameters or match certain conditions.

4. **Link Modification**:
   - Updates the filtered Workday links' `href` attributes by appending the stored UTM parameters.

5. **Logging**:
   - If a specific global object (`LBGAnalytics`) exists, it logs the number of updated Workday links for analytics purposes.

### Dependencies
- Relies on the global `document` object for DOM manipulation and `window` for URL access.
- Utilises the global `LBGAnalytics` object for analytics logging, if available.

---

## 3. Usage Examples
### Normal Condition
1. **User visits a page with UTM parameters** (`?utm_source=google&utm_medium=cpc&source=marketing`):
   - The extension extracts and stores `utm_source` and `source` values in the `workday_utm` cookie.
   - All applicable Workday links on the page are updated to include these UTM parameters in their URLs.

### Edge Cases
1. **No relevant UTM parameters**:
   - If no UTM parameters or `source` is found, the `workday_utm` cookie does not get set, and no Workday links are modified.
  
2. **Workday links already contain query parameters**:
   - If a Workday link already contains a query string, it will not receive the `workday_utm` parameters unless it meets specified conditions.
  
3. **Multiple Workday links present**:
   - If multiple links match the filter, all will be updated with the same UTM parameters.

---

## 4. Known Limitations & Gotchas
- **Cookie Lifetime**: The `workday_utm` cookie is stored as a session cookie, meaning it will expire when the browser session ends, which may cause issues in tracking across different sessions.
- **Browser Limitations**: Certain browser settings or extensions that block cookies may prevent the functionality of this extension.
- **JavaScript Errors**: If any JavaScript errors occur before the execution of this extension, it may fail to run altogether.
- **Overwriting Links**: If multiple extensions manipulate the same set of links, conflicts may arise, causing an unexpected result.
  
---

## 5. Recommendations for Refactoring
- **Defensive Programming**: Add checks to ensure the `relevantQuerystring` has valid data before processing.
- **Modularisation**: Break down the functions into smaller, separate functions to enhance maintainability and readability. For instance, consider creating separate functions for:
  - Extracting query parameters
  - Setting and retrieving cookies
  - Filtering links
  
- **Code Style**: Maintain consistent variable naming conventions and add comments for clarity in more complex logic sections.
- **Error Handling**: Consider logging errors or unexpected behaviour to the console for easier troubleshooting.

---

## 6. Maintenance & Further Notes
- **Ownership**: Designate a dedicated owner for ongoing maintenance, who will be responsible for reviewing and updating the code as necessary.
- **Testing Guidelines**: Regularly test the extension across various browsers and devices to ensure compatibility and functionality, especially after significant updates or website changes.
- **Version Control**: Use version control (e.g., Git) to track changes and collaborate with other developers effectively. 

By keeping this documentation updated and following these recommendations, the long-term viability and usability of the Workday Querystring Persistence extension can be ensured.