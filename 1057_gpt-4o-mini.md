# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: GWC : Tag : Set : Phone Conversion Number  
- **ID**: 1057  
- **Type**: Javascript Code  
- **Scope**: 879  
- **Execution Frequency**: Each time the associated event is triggered  

### Summary
This extension is designed to set a specific phone conversion number within the Google Ads tracking through the `gtag` library. Its primary function is to ensure that calls to the defined tracking ID include the specified phone number, thereby enhancing the measurement of phone call conversions for marketing performance analysis.

---

## 2. Code Explanation

The core functionality of the extension revolves around the following code block:

```javascript
(function(a,b,u){
    gtag('config', 'AW-807971864/dUE3CMLrooIBEJjYooED', {
        'phone_conversion_number': '0345 608 0374'
    });
})(eventType, eventPayload, tagObject);
```

### Key Variables 

- **a**: Represents the event type being passed to the extension.
- **b**: Represents the event payload, containing any data associated with the event.
- **u**: Represents the tag object, which may contain additional metadata for tracking.

### Logic Flow
1. The code is wrapped in an Immediately Invoked Function Expression (IIFE) that takes three parameters: `eventType`, `eventPayload`, and `tagObject`.
2. Inside the IIFE, the `gtag` function is called with two parameters:
   - The first parameter `'config'` indicates that we are configuring a specific Google Ads tag.
   - The second parameter is the tracking ID associated with the Google Ads account.
3. The third parameter is an object where the phone number for conversion tracking is defined.

### Dependencies
The code relies on the `gtag` function from the Google Analytics/Google Ads library to operate correctly. Ensure that the `gtag.js` library is properly included in the environment where this extension runs.

---

## 3. Usage Examples

### Normal Conditions
When an event is triggered, this extension runs, and the specified phone conversion number (`'0345 608 0374'`) is sent to Google Ads. This allows for accurate tracking of phone conversions associated with the defined tracking ID.

### Edge Conditions
- **Scenario**: If the `gtag` library is not loaded, this extension will not execute as intended, and the phone conversion number will not be sent.
- **Scenario**: If the function is invoked multiple times quickly, it will attempt to set the same phone conversion number repeatedly. While this won't cause errors, it could lead to redundant calls.

---

## 4. Known Limitations & Gotchas

- **gtag Dependency**: Ensure that the `gtag` function is available before running this extension; otherwise, it will fail silently without setting the phone number.
- **Multiple Instances**: If this extension is available in scripts loaded on the same page, it may lead to multiple invocations. It would be best to manage the execution to avoid redundancy.
- **Event Scoping**: Ensure that the event triggering this extension aligns properly with the expected tracking needs; if the incorrect event fires, the data may not reflect the intended conversions.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Although `eventType` and `eventPayload` are guaranteed to be present, additional validation for other properties of `tagObject` could be beneficial if the structure is subject to change.
- **Versioning & Documentation**: Consider including comments within the code explaining the purpose of each parameter and its expected data type.
- **Modular Code**: If this extension grows in complexity, consider breaking functionality into smaller functions to improve maintainability and readability.

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign a primary owner for the maintenance of this extension, ensuring accountability for updates and issues that may arise.
- **Testing Guidelines**:
    - Regularly test the extension after any changes to ensure that it functions correctly with the latest version of the `gtag` library.
    - Monitor analytics to verify that phone conversion numbers are being tracked accurately in Google Ads.
- **Documentation**: Keep this documentation updated alongside any changes made to the extension code or functionality to ensure clarity for future developers.

--- 

This documentation can be shared with developers, stakeholders, and team members to provide a comprehensive overview of the functionality and usage of the Tealium iQ extension.