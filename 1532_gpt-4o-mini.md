# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: GA360: Set GA360 page (&dp)
- **ID**: 1532
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to generate a URL suitable for Google Analytics 360 (GA360) tracking by constructing the `GA360Page` variable based on the data layer attributes. The constructed URL contains canonical paths, virtual paths, and pertinent query parameters. It also sets the `GA4EventTitle` based on certain conditions. This is essential for accurate data collection and reporting in Google Analytics.

## 2. Code Explanation

### Key Variables
- `cd`: Represents the canonical domain from the data layer.
- `cp`: Represents the canonical path from the data layer.
- `vp`: Represents the virtual path name from the data layer.
- `ga4vet`: Represents the GA4 virtual event title from the data layer.
- `ctitle`: Represents the page title from the DOM.
- `qp_*`: Various query parameters, including `qp.q`, `qp.term`, `qp.qp`, `qp.l`, `qp._ga`, and `qp.gclid`.

### Logic Flow 
1. **Domain Checking**: The script first checks if the canonical domain matches specific patterns for either `bankofscotland` or `halifax` to determine whether to use the canonical or virtual path.
2. **URL Construction**: Based on domain checks, it constructs the `ga_page` URL:
   - If the domain matches specific patterns, it uses the virtual path.
   - Otherwise, it defaults to using the canonical path.
3. **Query Parameters**: The script then checks for the presence of various query parameters (e.g., search terms, `_ga`, `gclid`) and appends them to the `ga_page` URL appropriately.
4. **Setting Data Layer Variables**: The extension finally sets `dl.GA4EventTitle` to either the `ga4vet` or `ctitle` depending on prior evaluations before returning the `ga_page`.

### Dependencies
The extension relies on the global object `eventPayload` and `eventType`, which are guaranteed to be present. It also utilises properties from the data layer (`dl`) to gather information for URL construction.

## 3. Usage Examples

### Normal Condition
- **Input**: For a user visiting `https://secure.bankofscotland.co.uk/home`, the data layer may have:
  - `CanonicalDomain`: `secure.bankofscotland.co.uk`
  - `CanonicalPath`: `/home`
  - `dom.title`: `"Home Page"`
- **Output**: The `GA360Page` would be set to `/home`, and `GA4EventTitle` would be `"Home Page"`.

### Edge Condition
- **Input**: For a user searching for "loans" where the URL is `https://example.halifax.co.uk/search?q=loans&qp=1234`:
  - `qp.q`: `"loans"`
  - `qp.qp`: `1234`
  - `CanonicalPath`: `/search`
- **Output**: The `GA360Page` could be constructed as `/search?q=loans&qp=1234`, with appropriate query parameters appended.

## 4. Known Limitations & Gotchas
- **Domain Handling**: If the canonical domain does not match expected patterns, it may lead to incorrect path assignments, as the logic defaults to the canonical path.
- **Query Parameters**: The extension requires that expected query parameters exist in the data layer; if missing, it will generate incomplete insights for GA360.
- **Conflict Potential**: This extension could have conflicts with other extensions modifying the same data layer variables, such as `GA4EventTitle`.

## 5. Recommendations for Refactoring
- **Defensive Checks**: Although already guaranteed, ensure to check the existence of `qp_*` parameters before using them to avoid potential undefined behaviour.
- **Code Modularity**: Break down the URL-building logic into separate reusable functions to improve readability and maintenance.
- **Consistent Naming**: Consider renaming some variables to improve clarity on their purpose (e.g., `ga_page` could be clearer as `ga360_pageUrl`).

## 6. Maintenance & Further Notes
- **Ownership**: Assign a specific developer or team responsible for updates and clarifications surrounding this extension.
- **Testing Guidelines**: Regularly test the extension in both development and production environments to ensure compatibility with website changes and data structure modifications.
- **Documentation Updates**: Keep this documentation updated with any code changes or enhancements to ensure it remains a reliable resource for current and future developers working with Tealium iQ. 

By adhering to these guidelines, developers will ensure that the GA360: Set GA360 page (&dp) extension is robust, maintainable, and efficient for tracking in Google Analytics.