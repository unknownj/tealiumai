# Tealium iQ Extension Documentation

## Extension Overview

- **Name:** Misc Bits for other places
- **ID:** 1315
- **Type:** Advanced Javascript Code
- **Scope:** After Load Rules
- **Execution Frequency:** Run Always

### Summary
This extension serves to capture and augment data from the document's cookie string into the `eventPayload` object. It specifically extracts a first-party cookie identifier, `FirstPartyCookie`, based on the presence of `MCMID` in the cookie string, while also capturing timestamps. The extension is designed to integrate with other Tealium configurations seamlessly.

## Code Explanation

The extension is structured as an immediately invoked function expression (IIFE) that takes `eventType` and `eventPayload` as parameters.

### Key Variables
- `b.Timestamp`: Captures the current timestamp in milliseconds since the Unix epoch.
- `b.Timestamp36`: Captures the timestamp as a base-36 string.
- `b.FirstPartyCookie`: Intended to store the value extracted from the cookie string if the relevant cookie exists.

### Logic Flow
1. **Timestamp Generation:**
   - Two properties (`Timestamp` and `Timestamp36`) are generated using the Date object and added to the `eventPayload` object (`b`).

2. **Cookie Processing:**
   - The cookie string is retrieved and stored in `cookieString`.
   - A series of conditional checks determine if `FirstPartyCookie` is already set or if it can be populated from the cookie string based on two possible formats:
     - URL-encoded `MCMID%7C`
     - Regular format `MCMID|`
   - If neither condition is met, `FirstPartyCookie` remains unset, and no action is taken.

3. **Error Handling:**
   - A try-catch block encapsulates the entire cookie processing logic to gracefully handle any potential errors without interrupting the code flow.

### Dependencies
- **Global Objects:**
  - The extension relies on the `document.cookie` property for retrieving the cookie data.
  - Standard JavaScript objects such as Date are used for timestamp retrieval.

## Usage Examples

### Normal Flow
1. **Scenario:** User visits a page with an existing `MCMID` cookie.
   - **Input:** Cookie: `MCMID|abcd1234|`
   - **Result:** `b.FirstPartyCookie` is set to `abcd1234`, and both timestamps are added to `eventPayload`.

### Edge Conditions
1. **Scenario:** User visits a page without an `MCMID` cookie.
   - **Input:** Cookie: `session_id=xyz; user_id=123;`
   - **Result:** `b.FirstPartyCookie` remains unset. The timestamps are still recorded successfully.

2. **Scenario:** User has `MCMID%7C` cookie format.
   - **Input:** Cookie: `MCMID%7Cxyz789%7C`
   - **Result:** `b.FirstPartyCookie` is set to `xyz789`, demonstrating the flexibility in cookie formats.

## Known Limitations & Gotchas

- **Failure to Match:** If the cookie format is not recognised (e.g., `MCMID-xyz`), `b.FirstPartyCookie` will remain undefined, which could lead to incomplete data capture.
- **Cookie Accessibility:** This extension assumes that cookies are accessible at the time of execution. If cookies are not available due to browser settings or privacy policies, the functionality will be impaired.
- **Multiple Extensions:** If other extensions manipulate `eventPayload` simultaneously, potential overwriting of `b.FirstPartyCookie` could occur, leading to loss of the expected value.

## Recommendations for Refactoring

- **Modularisation:** Consider separating timestamp generation and cookie processing into distinct functions for improved readability and maintainability. 
- **Error Logging:** Introduce logging mechanisms within the catch block to identify issues during cookie processing for easier debugging.
- **Defensive Coding:** Although availability checks for `eventType` and `eventPayload` are outside the scope here, ensure all future extensions consistently handle data expectations clearly and robustly to prevent potential runtime errors.

```javascript
function setTimestamps(b) {
    b.Timestamp = (new Date()).getTime();
    b.Timestamp36 = b.Timestamp.toString(36);
}

function extractFirstPartyCookie(cookieString, b) {
    if (b.FirstPartyCookie) {
        return;
    }
    var match = cookieString.match(/MCMID(?:%7C|\|)([^|]*)/);
    if (match) {
        b.FirstPartyCookie = match[1];
    }
}

(function(a, b) {
    setTimestamps(b);
  
    try {
        var cookieString = document.cookie;
        extractFirstPartyCookie(cookieString, b);
    } catch (e) {
        // Log error if necessary
    }
})(eventType, eventPayload);
```

## Maintenance & Further Notes

- **Ownership & Testing:** Designate a specific team member for ongoing ownership of this extension. Ensure thorough testing during any changes to cookie handling policies or extensions interfacing with `eventPayload`.
- **Documentation Updates:** Keep this documentation updated with any changes made to the extension functionality or logic to ensure clarity among all stakeholders.
- **Testing Schedules:** Regularly test across different browsers and scenarios, especially after updates to the Tealium platform or changes in privacy policies that might affect cookie accessibility. 

---

This structured documentation provides an in-depth overview of the "Misc Bits for other places" extension, detailing its purpose, functionality, and guidelines for future developers engaging with it.