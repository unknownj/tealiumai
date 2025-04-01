# Appsflyer : SmartScript Extension Documentation

This document provides a comprehensive overview of the “Appsflyer : SmartScript” extension, explains its code, offers usage examples, highlights limitations, and provides recommendations for refactoring and maintenance. It is written in GitHub-flavoured Markdown in British English.

---

## 1. Extension Overview

- **Name:** Appsflyer : SmartScript  
- **Extension ID:** 100040  
- **Extension Type:** Advanced Javascript Code  
- **Scope:** DOM Ready  
- **Execution Frequency:** Run Once  

### Summary of Purpose

This extension integrates with AppsFlyer functionality to:

- Collect click IDs and other tracking parameters (e.g., Google click ID, Facebook click ID, and custom query parameters).  
- Store and retrieve incoming URL parameters in local storage, removing expired entries.  
- Construct custom OneLink URLs for tracking and redirection.  
- Generate direct click URLs for iOS or Android app deep linking.  
- Optionally render QR codes with tracking parameters.  

The goal is to provide a comprehensive solution for capturing inbound campaign parameters, handling them in local storage, and constructing dynamic links or QR codes for marketing attribution via AppsFlyer.

---

## 2. Code Explanation

The script itself is extensive. Below is an outline of the key variables and logic flow within the extension.

### 2.1 Key Variables

- **AF_URL_SCHEME**: A regular expression pattern to validate OneLink URLs.  
- **VALID_AF_URL_PARTS_LENGTH**: The minimum number of segments in a valid OneLink URL pattern.  
- **GOOGLE_CLICK_ID**, **FACEBOOK_CLICK_ID**, **GBRAID**, **WBRAID**: Parameter names used to capture various click IDs and related analytics.  
- **AF_KEYWORDS**, **AF_CUSTOM_EXCLUDE_PARAMS_KEYS**, **GCLID_EXCLUDE_PARAMS_KEYS**: Arrays and constants controlling whether certain parameters are excluded or replaced when constructing URLs.  
- **LOCAL_STORAGE_VALUES**: Holds string constants referencing local storage keys (for example, 'ss_incoming_params').  
- **Functions like**:  
  - **isSkippedURL**: Checks if the current URL should be skipped due to matching items in a skip list.  
  - **getQueryParamsAndSaveToLocalStorage**: Parses the current page’s query parameters and stores them in local storage.  
  - **removeExpiredLocalStorageItems**: Removes parameters from local storage that are older than a given expiration time.  
  - **isValidUrl**: Basic validation to see if a string is a valid URL.  
  - **createImpressionsLink**: Constructs an impressions tracking link used in some AppsFlyer flows.  
  - **QRCode** Implementation: A minified QR code generation library for creating SVG or canvas-based QR codes.  

### 2.2 Logic Flow

1. **Local Storage Management**  
   - The code retrieves incoming parameters from the URL (using the browser’s `URL` and `URLSearchParams`).
   - Those parameters are stored (unshifted) into a local storage array named “ss_incoming_params”.  
   - It also removes expired entries by checking timestamps.  

2. **Referrer Tracking**  
   - The code checks the document referrer and, if the navigation is from a different site, saves it in `LOCAL_STORAGE_VALUES.SS_WEB_REFERRER`.  

3. **Setting Up OneLink URLs**  
   - The function `generateOneLinkURL` validates that the provided OneLink URL matches `AF_URL_SCHEME`.  
   - It checks skip lists for specific domains or URL substrings to decide if link generation should proceed.  
   - Gathers parameters from local storage and merges them with default or custom mapping rules.  
   - Processes special parameters (Google click ID, Facebook click ID, etc.) and excludes keys as needed.  
   - Returns a final tracking URL (and if a QR code is requested, uses the integrated QR code library to render it).  

4. **Direct Click URLs**  
   - The function `generateDirectClickURL` is used primarily for iOS or Android deep linking.  
   - It constructs a URL that points to `app.appsflyer.com/<app_id>` or `engagements.appsflyer.com/v1.0/c2s/click/app/<platform>/<app_id>` with the relevant query parameters.  
   - It merges local storage data, excludes certain items, and ensures the final link is properly appended with user tracking details.  

5. **QR Code Generation**  
   - Under the `window.AF_SMART_SCRIPT.displayQrCode` method, the code calls the minified `QRCode` class.  
   - The QR code library can produce to `<canvas>` or `<svg>` (depending on code path) and is drawn on a DOM element with specified styles, logos, and colours.  

### 2.3 Global Dependencies

- **Window and Document**: The script references `window.location`, `document.referrer`, `localStorage`, and `navigator` objects for environment data.  
- **Global `URL`, `URLSearchParams`**: Used for parsing and constructing URLs.  
- **QRCode** (minified library)**:** A code block within this script provides an ES5-compatible interpretation of a QR code generator.  
- **AppsFlyer**: The constructed links (OneLink or direct) rely on AppsFlyer’s link structure.  

---

## 3. Usage Examples

Below are some example scenarios:

### 3.1 Standard Inbound Link with GCLID

1. A user arrives on “example.com?gclid=123XYZ&pid=google”.  
2. The extension parses the query parameters, storing them in local storage.  
3. If the site meets the extension’s domain rules (i.e., it is not in a skip list), `generateOneLinkURL` constructs a OneLink URL, including `gclid` if appropriate.  
4. When generating the link, the code merges default values, stored parameters, and excludes keys configured in arrays like `GCLID_EXCLUDE_PARAMS_KEYS`.  

### 3.2 Generating a QR Code for a Campaign

1. A user triggers a function call to `window.AF_SMART_SCRIPT.generateOneLinkURL({...})`.  
2. The returned object includes `{ clickURL: "https://onelink.myapp.com/... }`.  
3. You call `window.AF_SMART_SCRIPT.displayQrCode("my-qrcode-element", { logo: "logo.png", codeColor: "#FF0000" })`.  
4. The script inserts a QR code with the link in the “my-qrcode-element” container, optionally with a company logo in the middle.  

### 3.3 Direct Link to iOS or Android

1. The extension is given a `platform`, `app_id`, `mediaSource`, `campaign`, and `redirectURL`.  
2. `generateDirectClickURL` merges the stored local storage parameters.  
3. The final link is formed, pointing to `https://app.appsflyer.com/<app_id>` (for iOS/Android).  
4. This link is then used for direct app deep linking.  

### 3.4 Edge Condition with Referrer Skip List

1. The user visits from a known domain in the “referrerSkipList”.  
2. The script checks `document.referrer` to see if it matches the skip list.  
3. If it matches, the generation of the AppsFlyer URL is skipped.  
4. No link is produced, and the extension quietly terminates that function.  

---

## 4. Known Limitations & Gotchas

1. **Local Storage Availability**  
   - If local storage is disabled or in private browsing modes, parameters may fail to persist, causing missing data.  

2. **URL and DOM API Requirements**  
   - The code relies on the browser’s `URL`, `URLSearchParams`, `localStorage`, and `document.referrer` API. In older browsers that do not support these natively, polyfills would be needed.  

3. **Referrer and URL Skip Lists**  
   - If your site environment or usage scenario changes domains frequently, you may need to adjust the skip lists to avoid unexpected blocking of the script.  

4. **Large or Complex Query Parameters**  
   - The code for retrieving and storing parameters does not have a built-in limit for the local storage array. This could expand local storage usage with many large query strings.  

5. **QR Code Rendering**  
   - The integrated QR code logic is minified and can be hard to debug. Any modifications to the library might be non-trivial.  

6. **Potential Conflicts**  
   - If other Tealium extensions or third-party scripts modify `localStorage` or override `URLSearchParams`, it may lead to unexpected behaviour.  

---

## 5. Recommendations for Refactoring

Below are some suggestions for improving clarity, maintainability, and performance, while still supporting ES5:

1. **De-Minify the QR Code Library**  
   - Consider importing an unminified, ES5-compatible version of the QR code library. This would improve readability, maintainability, and debug-ability.  

2. **Modularise the Code**  
   - Break up the large script into smaller functions or modules for:  
     - Local storage handling (parsing, expiring, reading/writing).  
     - Campaign parameter logic.  
     - QR code generation.  
     - OneLink direct link logic.  

3. **Consolidate Constant Arrays**  
   - The script has multiple arrays for “exclude or skip keys” (e.g., `AF_CUSTOM_EXCLUDE_PARAMS_KEYS`, `GCLID_EXCLUDE_PARAMS_KEYS`). You could reduce duplication by unifying them or referencing them from a single config object.  

4. **Enhanced Logging**  
   - Currently logging is done with `console.debug`, `console.error`. You could standardise the logging approach with more verbose or summarised logs based on environment flags.  

5. **Ensure Strict Validation**  
   - Enhance checks to ensure that each parameter is validated. For instance, if a custom param is invalid, the code should discard or handle it gracefully.  

6. **Centralised Configuration**  
   - Many placeholders for default values (like default `mediaSource` and `campaign`). Storing them in a single configuration object would reduce scattered references across the script.  

---

## 6. Maintenance & Further Notes

1. **Ownership & Versioning**  
   - Clearly define ownership for the extension’s code. Updates to external scripts or AppsFlyer’s OneLink structure should be tracked and tested.  

2. **Testing Guidelines**  
   - Perform regression testing with real query parameters across multiple browser versions.  
   - Verify correctness of local storage expiry, especially around boundary conditions.  
   - Confirm that skip lists remain accurate for your company’s domain changes.  

3. **Continuous Monitoring**  
   - Because the extension handles inbound parameters for marketing attributions, keep track of changes in third-party specifications (e.g., Facebook, Google, or other ad networks).  

4. **Staging & Production**  
   - It is recommended to keep a staging environment for verifying changes in skip lists, domain references, or local storage structure prior to production release.  

---

### Final Note

This extension is a comprehensive solution for handling inbound marketing parameters, constructing specially tailored AppsFlyer OneLink URLs, and optionally generating QR codes. By following the outlined usage, understanding the known limitations, and applying suggested refactoring steps, you can maintain a robust, ES5-compliant integration with your marketing campaigns and attribution needs.