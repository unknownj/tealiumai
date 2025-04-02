# Tealium iQ Extension Documentation

## Extension Overview

- **Name**: In Flight Adobe Event Triggers
- **ID**: 1226
- **Type**: Advanced JavaScript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension processes various events related to user interactions within the application using Adobe's analytics framework. It listens for specific event types, particularly those related to journey tracking, field updates, and page submissions, and triggers corresponding analytic events based on the state of the journey. The extension is crucial for capturing meaningful user interactions in the context of the application to better understand user behaviour and enhance reporting.

---

## Code Explanation

### Key Variables
- `e`: References the global `window.LBGAnalytics.events` object to access event-related methods.
- `b`: Represents the event payload, which contains information about the event being processed.
  
### Logic Flow
1. **Field Update Events**: If the event action is a "Field Update", it triggers the `fieldUpdate` method with details such as `EventNarrative` and `EventDuration`.
   
2. **Journey Unique ID Handling**: If a `JourneyUniqueID` is present:
   - It logs a generic event associated with the unique ID.
   - It triggers further events based on the application's state, such as "Pre-Application", "Application", etc.
   - Special handling for the "Fulfilled" state, logging further events and amounts if applicable.

3. **Branch Finder Specific Tracking**:
   - If the event type is "view" and the `JourneyName` is "BranchFinder", it sets a variable for `SearchType` as "Branch Locator".
   - Similar checks are performed during event submissions, ensuring that relevant analytics events for searches in the branch finder context are logged.

4. **Service Action Complete Condition**: Additional conditions for service actions relate specifically to the branch finder search page.

### Dependencies
- Utilises the global object `window.LBGAnalytics` which must be present for the code to execute properly.
  
---

## Usage Examples

### Normal Flow
- When a user updates a field in the application, an event gets triggered:
  - Input: `{"EventAction": "Field Update", "EventNarrative": "User update", "EventDuration": 5}`
  - Output: Calls `e.fieldUpdate("User update", 5)`.

### Edge Conditions
- If a user reaches the "Fulfilled" state:
  - Input: `{"JourneyUniqueID": "1234", "ApplicationState": "Fulfilled", "JourneyAmount": 1000}`
  - Output: Triggers events for fulfilled applications and amounts. If the journey action is a transaction complete, additional logging occurs.

- For invalid states (e.g., an unknown state for `ApplicationState`), no event will be triggered, which illustrates a current limitation on handling unexpected states.

---

## Known Limitations & Gotchas

- This extension relies heavily on the existence of specific fields in the event payload, which, if missing or malformed, might cause the extension to fail silently (e.g., missing `JourneyUniqueID`).
- Potential conflicts may arise if other Tealium extensions modify the same global variable (`window.LBGAnalytics`). 
- Events targeted by specific URLs (like "/branch-locator/search.asp") must be strictly validated against the exact pathname; discrepancies could lead to missed tracking.

---

## Recommendations for Refactoring

- **Defensive Checks**: Implement checks for the validity of `b.ApplicationState` before accessing it to avoid potential runtime errors.
- **Code Style**: Consider breaking down conditional logic into smaller functions for better readability and maintainability.
- **Modularisation**: Separate the event handling into dedicated functions, allowing for easier testing and updates.
- **Documentation Comments**: Adding in-line comments to explain complex logic flows or conditional checks would enhance maintainability by future developers.
  
---

## Maintenance & Further Notes

- **Ownership**: Define a single owner for the extension to ensure accountability.
- **Testing Guidelines**: Establish a robust testing process to cover various scenarios, particularly edge cases and failure conditions.
- **Version Control**: Document changes and maintain a version history for the extension, facilitating easier rollbacks if issues are found post-deployment.
- **Regular Reviews**: Schedule periodic reviews of the extension to ensure it continues to meet business needs and remains compatible with the latest platform updates.

--- 

This documentation aims to provide a clear, detailed overview of the Tealium iQ extension to aid developers in maintaining and extending its functionality effectively.