# Tealium iQ Extension Documentation: GA360 : Set GA360 page_location (&dl)

## 1. Extension Overview
- **Name**: GA360 : Set GA360 page_location (&dl)
- **ID**: 1491
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to set the Google Analytics 360 `page_location` (`&dl`) parameter based on the current page's canonical and virtual path. It checks the `CanonicalDomain` to determine which path to use, appending any relevant site search parameters or query strings as needed for accurate tracking. It ensures that the appropriate URL is sent to Google Analytics for effective data capture and reporting.

## 2. Code Explanation

### Key Variables
- `protocol`: Protocol of the current page (HTTP/HTTPS).
- `cd`: Current `CanonicalDomain`.
- `cp`: Current `CanonicalPath`.
- `vp`: Current `VirtualPathName`.
- `qp_q`: Site search query parameter (typically `q`).
- `qp_term`, `qp_qp`, `qp_l`: Additional site search parameters.
- `qp_ga`: `_ga` parameter for cross-domain linking.
- `qp_gclid`: `gclid` parameter for paid search.

### Logic Flow
1. **URL Construction**: Initializes `ga_page_location` to construct the URL by combining the protocol and canonical domain.
2. **Path Determination**: 
   - If the `CanonicalDomain` matches certain known patterns and a `VirtualPathName` is present, it uses the `VirtualPathName`.
   - Otherwise, it falls back to using the `CanonicalPath`.
3. **Site Search Parameters**: Checks for the presence of site search parameters and appends them to the `ga_page_location`.
4. **Query Parameters for Analytics**: 
   - Checks for the existence of `_ga` and `gclid` parameters and appends them to the URL, ensuring that appropriate query string formatting is followed.
5. **Return Statement**: Outputs the final constructed `ga_page_location` string.

### Dependencies
This extension relies on the global `utag` object and expects the presence of certain structured data within `utag.data`.

## 3. Usage Examples

### Normal Scenario
For a typical page view with no search parameters:
- Given:
  - `CanonicalDomain`: "www.example.com"
  - `CanonicalPath`: "/home"
  - `VirtualPathName`: ""
- Expected Output:
  ```
  ga_page_location = "https://www.example.com/home"
  ```

### Site Search Example
For a page where a search was made:
- Given:
  - `CanonicalDomain`: "www.example.com"
  - `CanonicalPath`: "/search"
  - `VirtualPathName`: ""
  - `qp_q`: "shoes"
  - `qp_term`: "shoes"
- Expected Output:
  ```
  ga_page_location = "https://www.example.com/search?q=shoes&qp_term=shoes"
  ```

### Edge Case
For a virtual path being used:
- Given:
  - `CanonicalDomain`: "www.example.com"
  - `CanonicalPath`: "/home"
  - `VirtualPathName`: "/products"
- Expected Output:
  ```
  ga_page_location = "https://www.example.com/products"
  ```

## 4. Known Limitations & Gotchas
- This extension may not work correctly if the structure of `CanonicalDomain` varies significantly from the expected patterns, leading to incorrect URL generation.
- The extension does not handle cases where neither the `CanonicalPath` nor the `VirtualPathName` is available, which can lead to an incomplete URL.
- Potential conflicts with other extensions that also manipulate the `ga_page_location` may cause unintended behaviours or overwrite this data.

## 5. Recommendations for Refactoring
- **Defensive Checks**: Consider adding validation for `CanonicalDomain` to ensure that it is a valid URL format before processing.
- **Code Style**: Consider using more meaningful variable names to enhance readability (e.g., `canonicalDomain`, `canonicalPath`).
- **Modularisation**: Break down the functionality into smaller helper functions (e.g., for URL building, parameter constructing, etc.) to improve maintainability.
- **Comments**: Expand inline comments for improved clarity on complex logic sections.

## 6. Maintenance & Further Notes
- Ownership of this extension should be assigned to a designated team member familiar with Google Analytics integration.
- Regular code reviews and updates should be scheduled, especially when integrated with other Tealium extensions or when there's a change in the site's URL structure.
- Testing should involve checking various site search scenarios and ensure accurate data capture in Google Analytics. Logging can be toggled based on the environment (development or production) to aid in debugging without polluting production logs.

---

This documentation provides a clear understanding of the GA360 extension, ensuring ease of use and maintainability for future developers and stakeholders.