# Tealium iQ Extension Documentation: iWeb Brand Fix

## 1. Extension Overview

- **Name**: iWeb Brand fix
- **ID**: 100040
- **Type**: Advanced JavaScript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to identify and set the brand to "iWeb" within the Tealium iQ data layer if the current domain matches "iweb". This is useful for ensuring that the correct branding is reflected in subsequent data collection and analytics, particularly for businesses operating on multiple domains or brands.

## 2. Code Explanation

### Key Variables
- **`a` (eventType)**: Represents the type of event that has triggered the extension. It is expected to be a string that indicates the nature of the event (e.g., 'load', 'link', etc.).
- **`b` (eventPayload)**: An object that holds various data points related to the event. This includes the 'dom.domain', which indicates the current domain being processed.

### Logic Flow
1. The extension is initially invoked with two parameters, `eventType` and `eventPayload`.
2. It checks if the string "iweb" exists in the `b['dom.domain']`.
3. If the condition is met, it sets the property `b['Brand']` to "iWeb".

### Code Processing Details
```javascript
(function(a,b){
 if (b['dom.domain'].indexOf("iweb") !== -1) {
    b['Brand'] = "iWeb";
}
})(eventType, eventPayload);
```
- The anonymous function is executed immediately with `eventType` and `eventPayload` as arguments.
- The `indexOf` method is used to check for the presence of "iweb" in the domain string. If found, it modifies the eventPayload directly, assigning the value "iWeb" to the `Brand` property.

### Dependencies
- The extension relies on the `eventPayload` object to be well-formed, particularly that it contains the 'dom.domain' property to perform the string check.

## 3. Usage Examples

### Normal Scenario
When a user visits `www.iweb.com`, the `eventPayload` contains the domain information as:
```javascript
{
  "dom.domain": "www.iweb.com"
}
```
Upon running the extension, the `b['Brand']` is set as follows:
```javascript
b['Brand'] = "iWeb";
```
This brand information can now be used for tracking and reporting within analytics tools.

### Edge Condition
If a user visits `www.example.com`, the `eventPayload` contains:
```javascript
{
  "dom.domain": "www.example.com"
}
```
Since the domain does not contain "iweb", the `Brand` property remains unset or unchanged.

## 4. Known Limitations & Gotchas

- The extension currently only checks for the presence of the substring "iweb". This could lead to unintended matches (e.g., domains containing "iwebsite").
- If other extensions manipulate or overwrite the `b['Brand']` property after this extension runs, the intended brand assignment may be lost.
- If the `dom.domain` is altered or not set properly in the `eventPayload`, the logic will fail silently, leading to incorrect brand information being passed downstream.

## 5. Recommendations for Refactoring

- **Defensive Checks**: Although the availability of `eventType` and `eventPayload` is guaranteed, consider adding checks in a production environment for properties within `eventPayload` to ensure robust functionality.
- **Code Style Improvements**: To enhance readability, consider introducing comments within the code to clarify the purpose and functionality of various sections.
  
  For example:
  ```javascript
  // Check if the domain contains "iweb"
  if (b['dom.domain'].indexOf("iweb") !== -1) {
      // Set the Brand to "iWeb"
      b['Brand'] = "iWeb";
  }
  ```
- **Modularisation**: The current code could benefit from being modularised into smaller functions for better reusability and testing.

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regular reviews should be conducted to ensure that the domain checks remain relevant and accurate as business requirements change.
- **Ownership**: Designate a team member to manage updates or modifications to this extension and ensure documentation is up-to-date.
- **Testing Guidelines**: Employ thorough testing whenever changes are made to the domain logic or the structure of `eventPayload` to prevent data integrity issues.

By following this documentation, developers and stakeholders should have a comprehensive understanding of the iWeb Brand Fix extension and how it operates within the Tealium iQ environment.