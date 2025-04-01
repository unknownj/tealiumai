# Misc Bits for Other Places – Tealium iQ Extension Documentation

Below is a comprehensive documentation for the “Misc Bits for other places” extension in Tealium iQ. This documentation is intended for developers and stakeholders who need to understand, maintain, or integrate with this extension. All code and approaches conform to ES5 standards.

---

## 1. Extension Overview

- **Name:** Misc Bits for other places  
- **ID (extensionId):** 100040  
- **Type:** Advanced Javascript Code  
- **Scope:** After Load Rules  
- **Execution Frequency (Occurrence):** Run Always  
- **Status:** Active  

### Summary

This extension captures a high-resolution timestamp and a base-36 variant of the timestamp, storing both in the `b` object. It also inspects the current browser cookies to look for values associated with `MCMID`. The found value is assigned to `b.FirstPartyCookie` if it is not already set. The primary use case is to provide additional data points (timestamps and a first-party cookie value) for downstream tags, load rules, or other Tealium extensions.

---

## 2. Code Explanation

Below is the general structure of the extension (for reference):

```js
(function(a, b) {
  // Set timestamp properties
  b.Timestamp = (new Date()).getTime();
  b.Timestamp36 = (new Date()).getTime().toString(36);

  try {
    var cookieString = ("" + document.cookie);

    if (b.FirstPartyCookie) {
      // If b.FirstPartyCookie is already defined, do nothing      
    } else if (cookieString.indexOf("MCMID%7C") >= 0) {
      // Extract between "MCMID%7C" and the next "%7C"
      b.FirstPartyCookie = cookieString.split("MCMID%7C")[1].split("%7C")[0];
    } else if (cookieString.indexOf("MCMID|") >= 0) {
      // Extract between "MCMID|" and the next "|"
      b.FirstPartyCookie = cookieString.split("MCMID|")[1].split("|")[0];
    } else {
      // No matching MCMID substring found, do nothing
    }

  } catch(e) {
    // Catch and suppress any errors
  }
})(eventType, eventPayload);
```

### Key Variables and Logic Flow

- **`b.Timestamp`**:  
  Stores the current Unix timestamp in milliseconds using `new Date().getTime()`.

- **`b.Timestamp36`**:  
  Stores the same timestamp in base-36 (via `.toString(36)`), useful when a shorter, encoded string is needed.

- **`cookieString`**:  
  A string representation of `document.cookie`, used to search for relevant cookie segments.

- **`b.FirstPartyCookie`**:  
  - If this property is already defined, the code does nothing further.  
  - If not defined, it checks for `MCMID%7C` or `MCMID|` patterns in the cookie string and extracts the subsequent piece as the first-party cookie ID.

### Dependencies on Global Objects or Libraries

- **`document.cookie`**:  
  The extension depends on the presence of a browser environment that provides `document.cookie`.

- **`b` object**:  
  The Tealium iQ extension mechanism supplies the second parameter (`b`), which represents the data object. This extension populates it with additional values for use by other extensions or tags.

No external libraries or additional global objects are used.

---

## 3. Usage Examples

### Example 1: Normal Cookie Presence

1. Cookies contain a string like:  
   "… MCMID|12345|someOtherValue …"  
2. The code finds the substring "12345" and sets `b.FirstPartyCookie = "12345"`.  
3. Two additional properties are set:  
   - `b.Timestamp` (e.g., `1669926524567`)  
   - `b.Timestamp36` (e.g., `ke9lkp`)  

Result:  
• Downstream extensions can read `b.FirstPartyCookie`, `b.Timestamp`, and `b.Timestamp36`.

### Example 2: Missing MCMID Markers

1. Cookies do not contain `MCMID|` or `MCMID%7C`.  
2. The code checks but does not find a match, so `b.FirstPartyCookie` is not set or remains unchanged if already defined.  
3. `b.Timestamp` and `b.Timestamp36` are still assigned.

### Example 3: Already Defined First-Party Cookie

1. `b.FirstPartyCookie` is pre-defined by another process or extension.  
2. The extension detects that value and does not overwrite it.  
3. Timestamps are still generated.

### Edge Conditions

- If `document.cookie` is empty or missing the targeted substring, the extension remains silent about `b.FirstPartyCookie`.  
- The `try/catch` ensures that any runtime error (for instance, parsing anomalies or unusual cookie formats) does not break your Tealium profile.

---

## 4. Known Limitations & Gotchas

1. **Cookie Parsing Assumptions**:  
   The code relies on the presence of `MCMID|` or `MCMID%7C`. If your cookies use a different encoding, the extraction logic may fail.

2. **Quiet Failures**:  
   All exceptions are caught and suppressed. If something fails, you will have no explicit logs or error messages. Consider logging or reporting errors if you need transparency.

3. **Data Overwrites**:  
   This extension respects any pre-existing `b.FirstPartyCookie`, so if another extension expects this property to be overwritten, it will not occur.

4. **Potential Conflicts**:  
   - Other extensions might be setting or removing `b.FirstPartyCookie`.  
   - Ensure that any extension-based transformations of `document.cookie` or custom cookie manipulations do not inadvertently break search patterns for `MCMID`.

---

## 5. Recommendations for Refactoring

1. **Single Date Retrieval**  
   Instead of calling `new Date()` multiple times, consider retrieving the date object once and reusing it, for consistency:
   ```js
   var now = new Date();
   b.Timestamp = now.getTime();
   b.Timestamp36 = now.getTime().toString(36);
   ```

2. **Consolidating Cookie Extraction**  
   You could encapsulate the cookie extraction logic into a small function to improve readability:
   ```js
   function extractMCMID(cookie) {
     if (cookie.indexOf("MCMID%7C") >= 0) {
       return cookie.split("MCMID%7C")[1].split("%7C")[0];
     } else if (cookie.indexOf("MCMID|") >= 0) {
       return cookie.split("MCMID|")[1].split("|")[0];
     }
     return null;
   }
   ```

3. **Error Handling Strategy**  
   Instead of swallowing all errors, consider gracefully logging them. If production logging is an issue, you might enable or disable logs based on environment flags.

4. **Maintain Consistent Code Style**  
   Use consistent spacing, brace style, and naming conventions. For clarity, add inline comments to describe the intention behind certain parsing steps.

---

## 6. Maintenance & Further Notes

1. **Ongoing Maintenance**  
   - Test the extension regularly (especially cookie parsing) whenever changes are made to your site’s cookie policy or structure.  
   - Monitor if new cookies or different encodings are introduced, which might require updating the string patterns.

2. **Ownership**  
   - Identify who is responsible for ensuring `b.FirstPartyCookie` remains accurate and updated.  
   - Coordinate with other teams that manipulate cookies to avoid conflicts or breaks.

3. **Testing Guidelines**  
   - Use multiple browsers and devices to ensure consistent cookie access and parsing.  
   - Validate that timestamps and the base-36 timestamp appear properly when the tag is fired.  
   - Check that `b.FirstPartyCookie` is either set or unchanged in typical user flow scenarios (first-page load, subsequent pages, returning visitors, etc.).

This extension aims to be straightforward, offering time and cookie data for other extensions and tags. By following the recommendations above and keeping an eye on changes to your cookie environment, you can ensure that the “Misc Bits for other places” extension remains reliable and useful.