# Tealium iQ Extension Documentation: Appsflyer : SmartScript

## 1. Extension Overview

- **Name**: Appsflyer : SmartScript
- **ID**: 2115
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The Appsflyer : SmartScript extension is designed to integrate with the Appsflyer platform, enabling the generation of specific tracking URLs and handling data associated with mobile marketing campaigns. It ensures that important parameters related to ad clicks, campaigns, and user engagement are correctly processed and forwarded to the relevant endpoints, enabling enhanced tracking and analytics.

## 2. Code Explanation

### Key Variables
1. **AF_URL_SCHEME**: Regular expression that defines the structure for validated URLs used in Appsflyer.
2. **VALID_AF_URL_PARTS_LENGTH**: Constant that sets the expected length of valid Appsflyer URLs.
3. **GOOGLE_CLICK_ID**: Constant key for Google click identifiers for tracking.
4. **FACEBOOK_CLICK_ID**: Constant key for Facebook click identifiers for tracking.
5. **ASSOCIATED_AD_KEYWORD**: Key for the associated keyword from ad campaigns.
6. **LOCAL_STORAGE_VALUES**: An object storing keys for local storage references.

### Logic Flow
1. **Initialization**: The script is structured to run once during the DOM ready state, setting up necessary local storage values and initial parameters.
2. **URL Validation**: It verifies the validity of incoming URLs and parameters using regular expressions and validation functions.
3. **Parameter Processing**: The main logic aggregates parameters for passing to the Appsflyer through either the URL or tracking pixels.
4. **URL Generation**: Constructs URLs that contain tracking information and prepares them for redirection or display as QR codes.

### Dependencies
The extension relies on:
- **Global Objects**: `window`, `localStorage`, and `document`.
- **External Libraries**: None specified. The code primarily utilises standard JavaScript features supported by ES5.

## 3. Usage Examples

### Normal Conditions
**Scenario**: When a user clicks an advertisement link that directs to the website:

1. The extension captures the referrer and URL.
2. It checks whether the incoming URL matches the criteria defined by the specified domains (`www.lloydsbank.com`, `www.halifax.co.uk`, etc.).
3. Valid parameters are aggregated to construct a complete tracking URL.
4. This URL is then either displayed as a QR code for users to scan or sent for pixel tracking.

### Edge Conditions
**Scenario**: If a user arrives via an unsupported URL or without the necessary parameters:

1. The extension identifies the unsupported domain or missing parameters.
2. If conditions are unmet (e.g., URL structure invalid), the extension gracefully logs errors via `console.debug()` but does not halt execution.
3. A fallback or default behaviour is applied, which might redirect users to a homepage or display an error message.

## 4. Known Limitations & Gotchas

- **URL Length**: Some parameters may exceed the maximum URL length, leading to failure in attribution.
- **Browser Compatibility**: Users on outdated browsers may face issues with URL handling, specifically with URL parsing.
- **Local Storage Limits**: The extension relies on localStorage, which has size limitations (typically around 5MB), which may impact performance if large amounts of data are stored.
- **Conflict with Other Extensions**: Depending on how other Tealium extensions manipulate the DOM or local storage, conflicts may arise, potentially leading to data inconsistencies.

## 5. Recommendations for Refactoring

- **Code Modularisation**: The existing codebase could be broken down into smaller, more manageable functions that each handle specific tasks (e.g., generating URLs, validating domains).
- **Defensive Checks**: Although the availability of `eventType` and `eventPayload` is guaranteed, it would be beneficial to include additional checks throughout the code to validate incoming parameters.
- **Consistent Logging**: Implement a standard logging mechanism, rather than relying on console debug calls scattered throughout the code, to ensure easier tracking of execution flow and errors.

Example refactor for the URL generation logic could look like this:
```javascript
function generateTrackingURL(params) {
    // TODO: implementation of URL generation logic
}
```

## 6. Maintenance & Further Notes

- **Ownership**: Regularly assign a maintainer for the extension who ensures that the tracking parameters remain relevant to business needs and Appsflyer updates.
- **Testing Guidelines**: Conduct thorough testing when updates are made, especially related to URL generation and parameter validation.
- **Monitoring Performance**: Active monitoring of performance and load times due to local storage use; refactor if the extension begins to drag down site performance.

By adhering to these maintenance practices, the Appsflyer : SmartScript extension can continue to function optimally and assist in comprehensive tracking of marketing efforts for years to come.