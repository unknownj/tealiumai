# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name:** Scrub SW Protect instances of Business User ID
- **ID:** 1751
- **Type:** Javascript Code
- **Scope:** After Load Rules
- **Execution Frequency:** Run Always

### Summary
This extension is designed to enhance user privacy by redacting instances of the Business User ID when certain conditions are met. Specifically, if the user is visiting a page with "swprotect" in its pathname and a Business User ID is present, the extension will replace the value of that ID with "(redacted)". This ensures that sensitive information is not inadvertently exposed in environments where privacy is a concern.

---

## 2. Code Explanation

### Key Variables
- **`a`**: Represents the event type (not explicitly used in the logic).
- **`b`**: Represents the event payload, which is an object that may contain the `BusinessUserID` property.

### Logic Flow
1. The extension is executed as a self-invoking function, passing `eventType` and `eventPayload` as arguments.
2. The presence of `BusinessUserID` in the `eventPayload` is checked.
3. The current URL's pathname is evaluated to see if it includes the substring "swprotect" (case insensitive).
4. If both conditions are satisfied, `BusinessUserID` in the payload is overwritten with the string "(redacted)`".

### Dependencies
- The extension relies on the presence of the global `eventType` and `eventPayload` objects.
- The logic utilizes standard JavaScript methods and properties available in the browser environment (e.g., `window.location.pathname`, `indexOf`).

---

## 3. Usage Examples

### Normal Conditions
- **Input:** `eventPayload` = { "BusinessUserID": "12345" }, URL = "https://example.com/swprotect/page"
- **Output:** `eventPayload` = { "BusinessUserID": "(redacted)" }

### Edge Conditions
1. **Business User ID Not Present:**
   - **Input:** `eventPayload` = {}, URL = "https://example.com/swprotect/page"
   - **Output:** No change to `eventPayload`.

2. **"swprotect" Not in Pathname:**
   - **Input:** `eventPayload` = { "BusinessUserID": "12345" }, URL = "https://example.com/other/page"
   - **Output:** No change to `eventPayload`.

3. **Case Sensitivity:**
   - **Input:** `eventPayload` = { "BusinessUserID": "12345" }, URL = "https://example.com/SWProtect/page"
   - **Output:** `eventPayload` = { "BusinessUserID": "(redacted)" } (case insensitive check).

---

## 4. Known Limitations & Gotchas

- **Non-Existing Event Properties:** If `BusinessUserID` does not exist within the `eventPayload`, the extension will simply skip the redaction without generating an error.
- **Conflicts with Other Extensions:** If multiple extensions attempt to modify the same property on the `eventPayload`, the order of execution may lead to unexpected results.
- **Performance Considerations:** Excessive page requests to paths with "swprotect" could lead to multiple invocations. Frequent checks on the URL may slightly impact performance due to repeated calculations in high-traffic scenarios.

---

## 5. Recommendations for Refactoring

- **Defensive Checks:** Although not necessary as per the given context, always consider checking for the existence of properties such as `b.BusinessUserID` before accessing them. This is a good practice, especially in varying environments.
- **Code Style Improvements:** Consider extracting the redaction logic into a separate function to promote code reusability and readability. E.g., `function redactID(payload) { if (payload.BusinessUserID) { payload.BusinessUserID = "(redacted)"; } }`
  
  However, keep in mind that the extension must remain compliant with ES5 standards, therefore avoid modern JavaScript features.

---

## 6. Maintenance & Further Notes

- **Ownership:** An individual or team should take ownership of this extension to ensure it remains relevant and functional.
- **Testing Guidelines:** Include thorough tests for various scenarios, especially edge cases that could occur due to different paths and payload formats.
- **Documentation Updates:** This documentation should be updated whenever modifications to the extension are made to ensure all stakeholders have the latest information.
  
- **Monitoring for Changes:** Regularly check for new updates in business requirements or privacy policies that may necessitate further modifications to this extension's logic.

--- 

This documentation is intended to provide comprehensive guidance on the functionality and best practices related to this Tealium iQ extension. For further inquiries or updates, please reach out to the extension owner.