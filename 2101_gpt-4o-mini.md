# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name:** CanonicalURL fix redux
- **ID:** 2101
- **Type:** Advanced Javascript Code
- **Scope:** Before Load Rules
- **Execution Frequency:** Run Always

### Summary
The "CanonicalURL fix redux" extension is designed to generate a complete canonical URL by concatenating the canonical domain and path. This is crucial for proper SEO practices, ensuring that search engines index the appropriate versions of pages. The extension sets the CanonicalURL in multiple locations, allowing for consistent tracking and data usage across different analytics platforms.

## 2. Code Explanation

### Key Variables
- **`a` and `b`:** These are the parameters passed into the function, where `a` is typically the event type, and `b` is an object containing various properties related to the event, including `CanonicalDomainProd` and `CanonicalPath`.
- **`c`:** An array that stores the concatenated canonical domain and path.

### Logic Flow
1. The function takes two arguments: `eventType` and `eventPayload`.
2. It constructs the `CanonicalURL` by combining `b['CanonicalDomainProd']` and `b['CanonicalPath']` into an array `c`.
3. The elements of array `c` are then joined into a single string and set as follows:
    - `b['CanonicalURL']`
    - `utag.data["CanonicalURL"]`
    - `LBGAnalytics.datalayer.set("CanonicalURL", c.join(''), true)`
    - `clova3.datalayer.set("CanonicalURL", c.join(''), true)`

### Dependencies
- This extension depends on the availability of the `utag` and `LBGAnalytics` global objects for seamless data layer integration.

## 3. Usage Examples

### Normal Conditions
- When a page loads, the `CanonicalDomainProd` is set to `"www.example.com"` and `CanonicalPath` to `"/path/to/resource"`. 
- The resulting `CanonicalURL` would be `"www.example.com/path/to/resource"`.

### Edge Conditions
- If either `CanonicalDomainProd` or `CanonicalPath` is undefined, the extension will still execute, but the resulting `CanonicalURL` might be incomplete. For example:
  - `CanonicalDomainProd` = undefined, `CanonicalPath` = `"/path/to/resource"` would yield `/path/to/resource`.
  - Best practice would be to ensure values are present or check for such cases.

## 4. Known Limitations & Gotchas
- If `CanonicalDomainProd` or `CanonicalPath` is improperly set (e.g., includes trailing slashes or whitespace), the resulting `CanonicalURL` may not be valid.
- Conflicts may arise with other Tealium extensions if they manipulate the same data points (i.e., `CanonicalURL`).
- The extension assumes that no other parts of the code will modify the concatenated output after it has been set.

## 5. Recommendations for Refactoring
- Consider adding defensive checks to validate the values of `CanonicalDomainProd` and `CanonicalPath` before concatenation to prevent malformed `CanonicalURL`.
- Modularise the code by creating a separate function for generating and setting the `CanonicalURL` to enhance readability and maintainability.
- Maintain consistent coding style by using single quotes for string literals throughout the code.

### Suggested Code Refactoring
```javascript
function setCanonicalURL(domain, path) {
    if (domain && path) {
        var canonicalURL = domain + path;
        utag.data["CanonicalURL"] = canonicalURL;
        LBGAnalytics.datalayer.set("CanonicalURL", canonicalURL, true);
        clova3.datalayer.set("CanonicalURL", canonicalURL, true);
    }
}

// Usage in IIFE
(function(a,b){
    setCanonicalURL(b['CanonicalDomainProd'], b['CanonicalPath']);
})(eventType, eventPayload);
```

## 6. Maintenance & Further Notes
- Ongoing maintenance should include regular checks for any updates to the data layer structure or integrations with analytics platforms that might impact the way data is set.
- Ownership should be with the front-end development team, with a responsibility to document performance outcomes and anomalies.
- Testing guidelines should include unit tests to confirm proper functionality for various input scenarios, especially edge cases involving undefined or malformed inputs. 

This documentation serves as a comprehensive guide for understanding, implementing, and maintaining the "CanonicalURL fix redux" extension within Tealium iQ.