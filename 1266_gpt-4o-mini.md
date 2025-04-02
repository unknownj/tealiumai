# Documentation for Tealium iQ Extension: Sensitive Query Strings

## 1. Extension Overview

- **Name**: Sensitive Query Strings
- **ID**: 1266
- **Type**: Advanced Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The **Sensitive Query Strings** extension processes URL query strings to identify and redact sensitive parameters before transmitting analytics data. This is crucial for protecting sensitive information, such as account details and code values, from being logged or sent externally. It ensures compliance with privacy regulations by stripping out unwanted data and maintaining data integrity in analytics.

---

## 2. Code Explanation

### Key Variables
- **qry**: The input string representing the query parameters from the URL.
- **output**: An array used to collect non-sensitive query parameters.
- **redactedParams**: An array containing parameter names that are deemed sensitive and should be redacted.

### Logic Flow
1. The script begins by checking if the given query string (`qry`) is empty and returns an empty string if so.
2. The query string is processed to remove the leading `?`, if present.
3. The script splits the query string into individual parameters using the `&` delimiter and iterates over each parameter.
4. For each parameter, it:
   - Strips special characters from the parameter name using the **toAlpha** function, which also converts it to lowercase.
   - Checks if the parameter name is in the **redactedParams** list.
   - If the parameter is not sensitive, it adds it to the **output** array. Otherwise, it logs the redaction.
5. Finally, after processing all parameters, the function appends a new parameter (`jwr`) indicating the count of redacted parameters, then constructs and returns the modified query string.

### Dependencies on Global Objects
- **window.location**: Used to get the URL components such as protocol, hostname, and pathname.
- **b.CanonicalDomainProd** and **b.CanonicalPath**: Utilised for forming the complete URL if present in the payload.
- **s**: This object is expected to be a global analytics object (e.g., Adobe Analytics) where the modified page URL will be assigned.

---

## 3. Usage Examples

### Normal Condition
Given the URL:
```
https://example.com?page=products&account=12345&category=electronics
```
**Outcome**: After processing, the URL will be transformed to:
```
https://example.com/page=products&category=electronics&jwr=1
```
Here, the `account` parameter is redacted.

### Edge Condition
Given the URL:
```
https://example.com?page=&cardn=67890
```
**Outcome**: The processed URL will be:
```
https://example.com?page=&jwr=1
```
The `cardn` parameter is redacted.

---

## 4. Known Limitations & Gotchas

- **Query String Position**: The extension does not handle the case where query parameters might be in a different format or encoding. Special characters (besides those specified) may not be properly handled.
- **Compatibility with Other Extensions**: If other extensions modify the URL or the `s.pageURL` variable after this extension executes, unexpected data might be captured or sent.
- **Logging Overheads**: In production environments, excessive logging of redacted parameters could result in performance hits or API rate limits being exceeded.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Although it is guaranteed that `eventType` and `eventPayload` will be present, adding a sanity check for potentially malformed URLs can prevent runtime errors.
- **Code Style**: Use consistent naming conventions across functions, especially for variables. Consider creating helper functions for repeated logic (e.g., redaction checking).
- **Modularization**: The `stripSensitive` function could be split into smaller functions to enhance readability and maintainability. For example, separating the logic for redaction checks from the main processing loop could make it easier to extend in the future.
- **Comments**: Increase inline comments to clarify the purpose of specific sections of the code to assist future developers in understanding it at a glance.

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign a specific developer or team responsible for maintaining the extension, ensuring timely updates to reflect changes in compliance regulations or system requirements.
- **Testing Guidelines**: Implement unit tests for various scenarios including normal data, potential edge cases involving special characters, and ensuring performance metrics do not degrade.
- **Documentation Updates**: Regularly update this documentation to reflect any changes made to the codebase or functionality of the extension, ensuring clarity for all stakeholders.