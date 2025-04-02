Below is a comprehensive GitHub-flavoured Markdown documentation page for your Tealium iQ extension, "Detect brand and environment".

---

# Detect brand and environment Extension Documentation

## 1. Extension Overview

- **Name:** Detect brand and environment  
- **ID:** 221 (Extension ID: 100036)  
- **Type:** Javascript Code  
- **Scope:** Before Load Rules  
- **Execution Frequency:** Run Always  

**Summary:**  
This extension is designed to detect the current brand and environment of a test site by parsing the document domain and optionally reading from a global data layer (clova3). It also sets global flags to indicate whether the device is mobile or a tablet based on the user agent string. Determining the appropriate brand (e.g. lloyds, halifax, bos, mbna, etc.) and the environment (e.g. online, secure, apply, www, private) supports targeted analytics and tracking across different site configurations.

---

## 2. Code Explanation

### Key Variables and Global Dependencies

- **utag.data:**  
  The extension relies on various properties of the `utag.data` object. This includes `dom.domain`, `dom.pathname`, and values like `current_brand` and `current_environment` that are updated by the extension.

- **window.clova3:**  
  The global object `window.clova3` is used (if available) to retrieve brand and environment values through its `datalayer.get` method. This serves as a fallback if `current_brand` is not already defined by domain checking.

- **navigator.userAgent / navigator.vendor / window.opera:**  
  These values are used to evaluate whether the user’s device is mobile or a tablet. The regular expressions in the code check for indicators in the user agent string.

### Logic Flow

1. **Initial Domain Check for Test Sites:**
   - The extension first checks whether the domain (`utag.data['dom.domain']`) contains strings such as `digital.lloydsbank` or `intranet.test`. If so, it enters a special block for test site processing.

2. **Brand Detection by Domain Substring:**
   - It checks for various substrings (e.g. "-dlp", "-dhp", "-dbp", "-dmp", etc.) in the current domain.  
   - Depending on which substring is found, the corresponding brand is assigned (e.g. `"lloyds"`, `"halifax"`, `"bos"`, or `"mbna"`).
   - It also handles alternate domain formats like `wwwlloydsbankcom`, `wwwbankofscotlandcouk`, etc.

3. **Environment Detection for Test Sites:**
   - The environment is determined by searching the domain for markers such as `"p-online"`, `"p-apply"`, or `"p-secure"`, with the default being `"www"` if none of these are found.

4. **Fallback to Global Data Layer (clova3):**
   - If `utag.data.current_brand` is still undefined after the test site checks, the code attempts to retrieve both brand and environment from `window.clova3.datalayer.get()`.
   - A try-catch block is used to silently catch errors if these properties are not available.

5. **Additional Domain Checks:**
   - If the brand is still undefined, a subsequent check inspects the domain for keywords such as `halifax.co.uk`, `bankofscotland.co.uk`, `mbna.co.uk`, `iwebsharedealing.co.uk`, and `scottishwidows.co.uk`.
   - A default brand of `"lloyds"` is applied if no known substring is found.

6. **Environment Reassignment by Domain:**
   - If the environment is still undefined or empty, further checks are carried out by looking for `"secure."`, `"online."`, or `"apply"` in the domain, with a default assignment of `"www"`.

7. **Specific Case for Private Banking:**
   - If the brand is `"bos"` and the pathname includes `"/privatebanking/"`, the environment is set to `"private"`.

8. **Special Handling for Scottish Widows:**
   - A specific check for `www.scottishwidowsyourfutureself.co.uk` sets the brand to `"scottishwidows"`.

9. **Mobile and Tablet Detection:**
   - Two separate immediately-invoked function expressions (IIFEs) are used to create global flags (`utag.data.is_mobile` and `utag.data.is_tablet`) based on regular expressions testing the user agent.
   - These flags are set to a string value of either `'1'` or `'0'`.

### Dependencies

- The extension is dependent on pre-existing `utag.data` properties and possibly on the global `window.clova3` object if available.  
- It uses browser-level objects (e.g. `navigator`, `window.opera`) to detect device types.

---

## 3. Usage Examples

### Scenario 1: Standard Test Site with Domain Markers

- **Domain:** "digital.lloydsbank-dlp.example.com"  
- **Processing:**  
  - The code detects that the domain is a test site.
  - It finds the substring "-dlp" and sets `utag.data.current_brand` to `"lloyds"`.
  - If `"p-online"` exists in the domain, `utag.data.current_environment` is set to `"online"`, otherwise falls back to `"www"`.
  - Mobile/tablet flags are evaluated via the user agent.

### Scenario 2: Fallback with Global Data Layer

- **Domain:** "unknown.example.com"  
- **Processing:**  
  - The initial domain checks do not set `current_brand` or `current_environment`.
  - The script then checks for `window.clova3` and retrieves the brand and environment from its data layer if available.
  - If `window.clova3` is not available or the values are not defined there, the subsequent domain checks are applied.
 
### Scenario 3: Edge Case with Private Banking

- **Domain:** "bankofscotland.co.uk"  
- **Pathname:** "/privatebanking/dashboard"  
- **Processing:**  
  - The domain check sets the brand to `"bos"`.
  - The pathname check identifies `"/privatebanking/"` and hence resets `current_environment` to `"private"`.

### Scenario 4: Mobile/Tablet Detection

- **User Agent:** A string that matches common mobile device patterns  
- **Processing:**  
  - The mobile detection IIFE returns `'1'` so `utag.data.is_mobile` is set to `'1'`.
  - Similarly, if the user agent matches tablet patterns (e.g. contains `"ipad"`), `utag.data.is_tablet` becomes `'1'`.

---

## 4. Known Limitations & Gotchas

- **Reliance on Domain String Matching:**  
  The extension uses substring matching to decide on the brand and environment. This may lead to false positives/negatives if the domain naming conventions change or if unexpected domains are used.

- **Silent Failures:**  
  Use of try-catch blocks in the clova3 data layer retrieval means errors are swallowed silently. If the clova3 object exists but returns unexpected values or errors, there is no logging for troubleshooting.

- **Global Namespace Pollution:**  
  The extension sets global flags (e.g. `utag.data.current_brand`, `utag.data.is_mobile`) which might conflict with other extensions or scripts if naming collisions occur.

- **Regular Expression Complexity:**  
  The mobile device detection regular expression is very long and may be difficult to maintain or modify over time, especially if new devices or user agents are not accounted for.

- **Assumption of Guaranteed eventType & eventPayload:**  
  Although it is stated that these are guaranteed to be present, any future change in the environment that affects these values might require additional validation.

---

## 5. Recommendations for Refactoring

- **Modularise the Code:**  
  Consider breaking out the detection logic (brand, environment, mobile/tablet) into separate functions. This would improve readability and testability.

- **Defensive Coding Improvements:**  
  - While eventType and eventPayload are guaranteed, additional checks around the availability and format of `utag.data['dom.domain']` and `utag.data['dom.pathname']` can help avoid runtime errors.
  - Consider logging or alerting when certain assumptions fail (e.g. clova3 data layer errors) without breaking the flow of the script.

- **Clearer Variable Naming:**  
  Use comments throughout the code to explain non-obvious regular expressions and domain checks. Even though inline comments exist, more descriptive naming for helper functions could be beneficial.

- **Documentation Within Code:**  
  Add inline comments for complex regular expressions to briefly outline what type of patterns are matching. This will help future maintainers understand the purpose without having to decipher complex regex.

- **Externalise Configuration:**  
  If the brand/environment mapping is subject to change, consider moving these mappings to a configuration object or JSON file that can be updated without modifying the core logic.

- **Maintain ES5 Compatibility:**  
  All refactoring proposals should continue supporting ES5. Avoid any ES6/ES2015+ features such as arrow functions, template literals, or let/const replacements.

---

## 6. Maintenance & Further Notes

- **Ongoing Testing:**  
  - Regularly test the extension across all supported test sites and real domains to verify that the brand and environment detections are accurate.
  - Automate tests for mobile and tablet detection, especially after any browser updates.

- **Ownership:**  
  - Assign clear ownership to a team or individual for periodic review. Consider code reviews when modifications are made.
  - Create a changelog document for updates to both the brand/environment mapping and the mobile/tablet detection routines.

- **Monitoring:**  
  - Implement monitoring or logging to help detect if any domains are failing to be mapped correctly.
  
- **Documentation Updates:**  
  - Keep this documentation updated with any modifications to the logic or dependencies.
  - Provide examples and test cases in the project repository to aid in troubleshooting.

---

This documentation should serve as a solid starting point for understanding, using, and maintaining the "Detect brand and environment" Tealium iQ extension. If further clarifications or updates are required, ensure to circulate the revised documentation among relevant stakeholders and developers.