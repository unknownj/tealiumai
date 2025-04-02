# Tealium iQ Extension Documentation: Tealium Event Definitions

## 1. Extension Overview

- **Name**: Tealium Event definitions  
- **ID**: 1654  
- **Type**: Javascript Code  
- **Scope**: After Load Rules  
- **Execution Frequency**: Run Always  

### Summary
This Tealium iQ extension is responsible for defining various custom events based on specific application states and page interactions. It assesses the state of an application in conjunction with the page being viewed and sets the appropriate `tealium_event` to enable tracking of user journeys and interactions effectively. This is particularly useful for gaining insights into user behaviours during key milestones in an application's lifecycle.

---

## 2. Code Explanation

### Key Variables
- `a`: Represents the event type (expected to be a string).
- `b`: Represents the event payload (expected to be an object) containing various properties which influence the `tealium_event`.

### Logic Flow
1. **Resetting Existing Events**: 
   - If the current `tealium_event` equals the event type input (`a`), it is removed from `b`.
  
2. **Defining Journey Events**:
   - For each expected application state (like Fulfilled, Offered, Application, Declined), check the presence of `ProductGroup` and `JourneyName` to set corresponding journey event names.

3. **Cache Check**:
   - Utilises a caching mechanism (`LBGAnalytics.tescache`) to avoid duplicate event tracking.
   - If the current event already exists in the cache, it is removed; if not, it is added.

4. **Special Cases for Specific Pages**:
   - Checks the `window.location.pathname` to determine if certain predefined pages are being accessed, setting the respective event (like `logon` or `online_registration`).

5. **Defaults**:
   - Sets default events (`journey_interaction` or `brochureware_view`) based on the presence of certain properties in `b` when no specific event is established yet.

6. **Final Fallback**:
   - If no event has been set through previous logic, it defaults to the value of `a`.

### Dependencies
- This extension relies on the global object `LBGAnalytics` to maintain a cache of previously seen events.
- It uses the `window` object to access the current page's URL for conditional checks.

---

## 3. Usage Examples

### Normal Conditions
- **Scenario**: User completes a journey that is recognized in the tracking system.
    - **Input**:
        ```javascript
        eventType = "view";
        eventPayload = {
            ApplicationState: "Fulfilled",
            ProductGroup: "Home Loan",
            JourneyName: "Mortgage Journey"
        };
        ```
    - **Output**:
        - `eventPayload.tealium_event` is set to `"journey_completion"`.

### Edge Cases
- **Scenario**: User visits a brochureware page without other defined events.
    - **Input**:
        ```javascript
        eventType = "view";
        eventPayload = {
            ProductGroup: "Brochureware",
            PageRole: "Brochureware"
        };
        ```
    - **Output**:
        - `eventPayload.tealium_event` is set to `"brochureware_view"`.
  
- **Scenario**: User visits a logon page multiple times.
    - **Input**:
        ```javascript
        eventType = "view";
        eventPayload = {};
        window.location.pathname = "/personal/a/logon/entermemorableinformation.jsp";
        ```
    - **Output**:  
        - If the event is already cached, it is removed; otherwise, it's set to `"logon"`.

---

## 4. Known Limitations & Gotchas

- **Shared Cache**: The current cache is global (`LBGAnalytics.tescache`). If other events modify this cache without regard, it may lead to unexpected behaviours.
- **Page Role Dependence**: The logic for the `PageRole` property assumes valid mappings, which might change if the underlying data model is updated.
- **Hardcoded Paths**: The integration is specific to certain URLs and might break if URLs change without corresponding updates to this extension code.

---

## 5. Recommendations for Refactoring

### Suggested Improvements
- **Defensive Checks**: Consider adding checks to validate the existence of properties (like `ApplicationState`, `ProductGroup`, and `JourneyName`) before accessing them, even though we assume they are present.
- **Modularisation**: Break down long logic blocks into smaller functions for easier comprehension and maintenance. For instance, consider creating dedicated functions for cache operations and event settings.
- **Consistency in Conditionals**: To increase readability, consider using a switch statement where applicable, especially when checking the `ApplicationState`.
  
---

## 6. Maintenance & Further Notes

- **Ownership**: Assign specific team members to own this extension so they can manage changes effectively as application requirements evolve.
- **Testing Guidelines**: Regularly test the extension against the expected inputs and document test cases comprehensively. Preferably, create unit tests to check for edge cases.
- **Documentation Updates**: Maintain this documentation whenever changes are made to the logic or functionality of the extension to ensure all stakeholders remain aligned with the workings of the extension.

--- 

This structured documentation aims to provide clarity and guidance to developers and stakeholders involved in implementing and maintaining the Tealium Event Definitions extension.