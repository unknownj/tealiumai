# Documentation for Tealium iQ Extension: Adobe Virtual Pageviews

## 1. Extension Overview

- **Name**: Adobe Virtual Pageviews
- **ID**: 100040
- **Type**: Advanced Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Adobe Virtual Pageviews" extension facilitates the interaction between Tealium and Adobe's Target platform by triggering virtual pageviews based on user navigation events. This helps in tracking user journeys more accurately in Adobe Analytics, enhancing the capability of the analytics setup by ensuring that page views can be recorded even on single-page applications or dynamic content changes.

---

## 2. Code Explanation

### Key Variables
- **LBGAnalytics.triggerView**: An object that comprises methods for triggering Adobe Target's `triggerView`.
- **history**: An array that tracks previously triggered views to avoid duplicate triggers.

### Logic Flow
1. **Availability Checks**:
   - `triggerViewAvailable` checks if the `adobe.target.triggerView` function exists.
   - `triggerViewDisabled` verifies if the triggering is disabled via cookies.

2. **Trigger Logic**:
   - The `invoke` method initiates the `triggerView` functionality if the triggers are available and not disabled.
   - It has handling for immediate and delayed execution, which also logs the events in a history array.
   - Use of cookies is facilitated through `enable` and `disable` methods to manage triggering state.

3. **Execution Conditions**:
   - The main execution block checks an event type and extracts journey details, or checks if the user is on a landing page to invoke the tracking functionality accordingly.

### Dependencies
- The extension relies on global objects such as `window.adobe`, particularly for `adobe.target.triggerView`.
- Access to cookies through a custom `LBGAnalytics.cookies` object or directly through `document.cookie`.

---

## 3. Usage Examples

### Normal Flow
- When a user navigates to a new step in a journey, the extension triggers a virtual page view with a name formatted as `JourneyName.JourneyStepName`.
- If on a specific landing page, it captures the `<h1>` tag text and triggers a view with the string `Landing Page.<h1_text>`.

### Edge Cases
- If the user navigates to the same step without the `forceDuplicate` flag set, it logs an event of type `"trigger-view-duplicate"` rather than triggering the `triggerView` method again.
- If cookies are disabled, the script defaults to using `document.cookie`, which may raise issues in older browsers.

---

## 4. Known Limitations & Gotchas

- **Cookie Management**: Users who have cookies disabled may not have their trigger view functionality work seamlessly.
- **Duplicate Events**: Users navigating to the same journey step will not trigger the `triggerView` function unless explicitly forced, which could lead to missing data if not managed correctly.
- **Dependency on Adobe Target**: If Adobe Target is not properly initialized in the environment, the function calls will silently fail, logging a duplicate trigger instead.

---

## 5. Recommendations for Refactoring

- **Code Structure**: Consider modularising the code into more functions to separate concerns, such as cookie management, trigger event logging, and Adobe Target integration.
- **Event Logging**: Implement additional logging for failure cases when `triggerViewAvailable` or `triggerViewDisabled` checks fail to enhance debugging and tracking.
- **Defensive Programming**: While not required, adding checks for the existence of properties in the `LBGAnalytics` object can prevent runtime errors in cases where the library may not fully initialise.
- **Code Style**: Consistent naming conventions for functions and variables can improve code readability.

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly check for updates or changes to the Adobe Target API that might require updates to invoke calls.
- **Ownership**: Assign code ownership to a developer or engineering team familiar with both Tealium and Adobe systems for smoother handling of incidents.
- **Testing Guidelines**: Implement unit tests to verify that various paths in the logic flow are covered, especially around cookie management and trigger conditions.

This documentation aims to provide a comprehensive understanding of the Adobe Virtual Pageviews extension within Tealium iQ, equipping developers and stakeholders with the necessary information for effective use and management.