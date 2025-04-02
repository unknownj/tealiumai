# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: GA360 : XD : Handle cross-track params : receiving pages
- **ID**: 1584
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to capture Google Analytics Client IDs (`GA`) and `gid` values from the URL, either through the URL fragment, query string, or persisted values in the data layer. This is essential for tracking user behaviour accurately across pages and ensuring that client identifiers are properly captured even if the URL changes before the "Page Load" event occurs.

## 2. Code Explanation

### Key Variables
- `passed_ga_cid`: Holds the Client ID extracted from the URL fragment or query string.
- `passed_gid`: Holds the `gid` extracted from the URL fragment or query string.
- `persisted_ga_cid`: Holds the persisted Client ID stored in the `utag_main_xd_cid`.
- `persisted_gid`: Holds the persisted `gid` stored in the `utag_main_xd_gid`.
- `google_cookie_ids`: Array to store the Client ID and `gid` values.

### Logic Flow
1. The main function `capture_ga_cid_and_gid_from_url` checks whether `_ga` is present in the URL's hash or whether it exists in the query string.
2. Depending on where the data is found, it parses the necessary values and saves them into the `google_cookie_ids` array.
   - If `_ga` is found in the fragment, it splits to extract the Client ID and `gid`.
   - If found in the query string, it follows the same extraction process.
   - If persisted values are available, it retrieves them.
   - It also handles existing cookie values for `_ga` and `_gid`.
3. The helper function `set_google_cookies_in_udo` sets the values of `GA360ClientID` and `GA360gid` in the data layer.

### Dependencies
- This extension relies on the global `dl` object, which contains the necessary key-value pairs for processing.
- The extension assumes that `utag.data` is the data layer being manipulated.

## 3. Usage Examples

### Scenario 1: Normal Operation
- When the URL contains a hash like `#hello-world?_ga=GA1.2.1234567890.1234567890`, the extension extracts:
  - Client ID: `1234567890`
  - `gid`: `GA1.2`

The data layer would then update:
```javascript
dl.GA360ClientID = "1234567890";
dl.GA360gid = "GA1.2";
```

### Scenario 2: Query String Use
- If the URL is `https://example.com?utm_source=facebook&utm_medium=cpc&0_ga=GA1.2.11111111111.1111111111`, it will extract:
  - Client ID: `11111111111`
  - `gid`: `GA1.2`

### Edge Conditions
1. If no `_ga` is found in either the fragment or query string:
   - The function returns `false` and logs "No _ga available" (if in development environment).
   
2. If only `_ga` exists and `_gid` does not:
   - `gid` is set to `undefined` and logged accordingly.

## 4. Known Limitations & Gotchas

- The extension behaviour may change if the `_ga` format is modified by Google Analytics.
- It only supports specific formats for `_ga` and `_gid`; unexpected formats may lead to parsing issues.
- The logs operate only in the development environment, limiting visibility during production.
- Conflicts may arise if other extensions manipulate the same keys in the data layer (`GA360ClientID`, `GA360gid`).

## 5. Recommendations for Refactoring

- **Defensive Checks**: Include checks to ensure that the `dom.hash` or query parameters exist before accessing them directly to avoid potential runtime errors.
- **Modularization**: Consider breaking down the code into smaller, distinct functions for readability and ease of maintenance.
- **Code Style**: Consistency in naming conventions and comments can improve code clarity. Options for handling data could be encompassed in mapping functions for reusability.

## 6. Maintenance & Further Notes

- Ensure that the extension is tested whenever changes in tracking implementations or Google Analytics updates occur.
- Ownership of this extension should be designated to a specific team or individual responsible for updates and monitoring.
- Regular audits and reviews of the logs and extracted values help ensure accurate data tracking and adherence to evolving business requirements. 

**End of Documentation**