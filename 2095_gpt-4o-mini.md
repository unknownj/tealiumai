```markdown
# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Pegasus V2 : GAD Functions
- **ID**: 2095
- **Type**: Advanced Javascript Code
- **Scope**: 1656
- **Execution Frequency**: On each page load and user-triggered events where applicable

### Summary
This extension is designed to facilitate Google Ads Conversion Tracking through Google’s Global Site Tag (gtag.js). The code sends conversion data based on user interactions and conditions defined in Tealium’s data layer, ensuring that the collected data aligns with GDPR compliance where necessary.

---

## 2. Code Explanation

### Key Variables

- `b`: The event payload containing all relevant data for the execution of the extension.
- `eventType`: Represents the type of event that triggered the code execution.
- `tagObject`: The object representing the tag being processed.

### Logic Flow
1. **gtag_report_conversion**: This function constructs a payload to report conversion details to Google Ads:
   - It captures identifiers from the payload and handles consent checks.
   - Implements a callback function to redirect the user if a URL is specified.
 
2. **unpackStr**: This function splits a string by a specified delimiter and returns an array.

3. **createElig**: Maps a given array of data to an object for eligibility rules, creating an array of conditions for when tags should fire.

4. **findTag**: Checks if the tag relates to Google Ads, returning parameters if it does.

5. **setTags**: Determines how and when to trigger the gtag_report_conversion function based on the type of trigger (Page, Timed, or Event).

6. **runLookups**: Processes the provided lookup table to check eligibility against user interactions and trigger conversion reporting where applicable.

### Dependencies on Global Objects or Libraries
- `gtag`: Google’s Global Site Tag function.
- `LBGAnalytics`: This appears to be a custom analytics library, presumably defined elsewhere in the code or environment.

---

## 3. Usage Examples

### Normal Conditions

- **Event Trigger**: A page load triggers the extension. If the user has consented, the tag data is collected and GAD conversion reporting occurs.
- **User Action**: A button click defined by the trigger setup leads to a conversion report being sent.

### Edge Conditions

- **No Consent**: If the user has not given consent, identifiers like `order_id` and `application_id` are stripped from the payload before sending.
- **Invalid Events**: If an unexpected event occurs or an unsupported tag is processed, the conversion reporting may not execute, and errors will be logged in the console.

---

## 4. Known Limitations & Gotchas

- **Consent Management**: If the consent cookie is not recognised or malfunctions, the tagging may fail silently, resulting in unreported conversions.
- **Multiple Tags**: If there are multiple tags triggered simultaneously, the outcomes can be unpredictable without careful event handling logic.
- **Global Dependencies**: Depending on external libraries like `LBGAnalytics` without ensuring they are loaded may lead to runtime errors.

---

## 5. Recommendations for Refactoring

- **Modularisation**: Consider splitting functions into separate modules to improve readability and testing.
- **Error Handling**: Implement consistent error logging mechanisms across all functions to capture issues more effectively.
- **Comments and Documentation**: Add inline comments for complex logic to guide future maintainers.
- **Code Style**: Adhere to a consistent code style for better maintainability (e.g., spacing, indentation).

---

## 6. Maintenance & Further Notes

### Suggestions for Ongoing Maintenance

- **Ownership**: Assign a dedicated team for the maintenance and updates of the extension.
- **Testing**: Implement automated unit tests for core functions, especially those handling conversions.
- **User Consent Logic**: Continually review and refine the user consent mechanisms to adapt to changing regulations.

### Further Notes
Regularly review the performance of the extension and its ability to send conversion data. Monitor for changes in the Google Ads API that could necessitate updates to the code.
```
