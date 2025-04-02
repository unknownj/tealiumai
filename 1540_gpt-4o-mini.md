# Tealium iQ Extension Documentation: Workday Link Tracking

## 1. Extension Overview

- **Name**: Workday Link Tracking
- **ID**: 1540
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The Workday Link Tracking extension is designed to track user interactions with links that point to external Workday resources. When users click such links, the extension captures data about the click event and sends it to the LBGAnalytics event system. This enables marketers and analysts to understand user behaviour regarding external links, facilitating optimised marketing efforts and better insights into external engagement.

---

## 2. Code Explanation

### Key Variables
- `var $ = LBGAnalytics.$;`: This line assigns the jQuery-like library `LBGAnalytics.$` to the variable `$`, allowing use of jQuery-style selectors and methods.

### Logic Flow
1. The extension waits for the DOM to be ready.
2. It attaches a click event handler to all anchor (`<a>`) elements that have an `href` attribute containing the substring `workday`.
3. When such a link is clicked, the event handler:
   - Captures the text of the clicked link (`$(this).text()`).
   - Captures the URL from the link’s `href` attribute (`$(this).attr("href")`).
   - Sends an event to the LBGAnalytics with the following data:
     - `JourneyEvent`: Static string "External Click".
     - `EventAction`: Static string "Offsite Link".
     - `EventNarrative`: The text of the clicked link.
     - `ResourceFileName`: The URL of the clicked link.

### Dependencies
The extension relies on the `LBGAnalytics` global object, specifically the `$` method, which behaves similarly to jQuery. Ensure that it is loaded prior to this extension for proper functionality.

---

## 3. Usage Examples

### Normal Conditions
- A user clicks a link that leads to a Workday page, e.g., `https://example.com/workday/some-resource`.
  - **Captured Data**:
    - `JourneyEvent`: "External Click"
    - `EventAction`: "Offsite Link"
    - `EventNarrative`: "View Resource"
    - `ResourceFileName`: "https://example.com/workday/some-resource"

### Edge Conditions
- **Edge Case 1**: No Workday links present on the page.
  - **Outcome**: No events will be triggered. There will be no console errors or unwanted behaviour, as the code checks for the existence of matching links.
  
- **Edge Case 2**: Multiple Workday links are present.
  - **Outcome**: The click event listener is registered for each link independently; thus, any number of clicks will be tracked without interference among events.

---

## 4. Known Limitations & Gotchas

- The extension only tracks links with `href` attributes that contain the substring `workday`. Links that do not include this substring will not be tracked.
- The extension may conflict with other scripts that also attempt to intercept clicks on `<a>` tags, leading to potential duplicate tracking or event cancellations.
- If the `LBGAnalytics.$` object is not defined when this code executes, the extension will fail to attach the click event handler, causing loss of tracking for Workday links.

---

## 5. Recommendations for Refactoring

- **Variable Naming**: Improve the readability of the variable names by using more descriptive identifiers, e.g., rename `LBGAnalytics` to `AnalyticsLibrary`.
- **Event Binding**: Consider decoupling the binding process from the direct inline code to enhance maintainability. This can be done by creating a separate function dedicated to handling link clicks.
- **Modularisation**: If additional tracking logic is planned in the future, encapsulating the click tracking logic in a named function might promote reusability and reduce code duplication.
- **Logging**: Introduce logging (e.g., `console.log`) within the click event to aid in debugging and ensure that the expected data is being collected.

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Review the extension periodically for compatibility with updates to the LBGAnalytics library or other website changes. Ensure that changes to the underlying site structure do not break the functionality.
- **Ownership**: Assign a dedicated team member to oversee the extension's performance, making adjustments and improvements as needed.
- **Testing Guidelines**: Regularly test the extension in various scenarios to ensure reliability. Consider employing automated testing tools to verify that the click tracking operates as expected, particularly after significant website updates or redesigns.

---

This documentation should provide all necessary information for developers and stakeholders to understand and maintain the Workday Link Tracking extension in Tealium iQ. For further queries, please refer to the internal documentation standards or reach out to the designated project lead.