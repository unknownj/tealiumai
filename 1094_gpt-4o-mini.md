# Tealium iQ Extension Documentation

## Extension Overview

- **Name**: ApplyCCC utag_data/datalayer reconciliation
- **ID**: 1094
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension processes specific event data related to user journeys, primarily focusing on the reconciliation of `JourneyStep` information between the `utag_data` object and the `eventPayload`. If the `JourneyName` indicates an "ApplyCCC" or "ApplyCreditCard" journey, and there is a discrepancy between the `JourneyStep` in `utag_data` and the incoming event data, the extension updates the `JourneyStep` in the event payload to ensure data accuracy. This reconciliation is essential to maintain consistency in tracking user behaviour across different segments of the application.

---

## Code Explanation

### Key Variables
- **`a` (eventType)**: Represents the type of event triggering this extension (e.g., "click", "pageview").
- **`b` (eventPayload)**: This object contains the relevant data for the event, such as `JourneyName` and `JourneyStep`, which are used for processing.

### Logic Flow
1. The code checks if the `JourneyName` is either "ApplyCCC" or "ApplyCreditCard".
2. If the condition is met, it further checks:
   - Whether the `window.utag_data` object exists.
   - Whether the `JourneyStep` property is defined within `utag_data`.
   - Whether the `JourneyStep` in `utag_data` differs from the one in the incoming event payload (`b`).
3. If all conditions are satisfied, the `JourneyStep` in the event payload is updated to reflect the value from `utag_data`.

### Dependencies
- **Global Objects**: The extension relies on:
  - `window.utag_data`: Must be available in the global scope as it contains critical data for comparison and updates.
  
---

## Usage Examples

### Normal Condition
1. **Event**: A user navigates to a credit card application page and triggers an "ApplyCCC" journey.
2. **Data**:
   - Incoming `eventPayload`: `{ JourneyName: "ApplyCCC", JourneyStep: "Initial" }`
   - `utag_data`: `{ JourneyStep: "Review" }`
3. **Outcome**: The `JourneyStep` in the `eventPayload` is updated to "Review".

### Edge Condition
1. **Event**: A user returns to the "ApplyCCC" journey, but the `JourneyStep` does not exist in `utag_data`.
2. **Data**:
   - Incoming `eventPayload`: `{ JourneyName: "ApplyCCC", JourneyStep: "Initial" }`
   - `utag_data`: `{ JourneyStep: undefined }`
3. **Outcome**: No change occurs to the `JourneyStep` in the `eventPayload`, preserving the original value "Initial".

---

## Known Limitations & Gotchas
- **Undefined Steps**: If `JourneyStep` in `utag_data` is not defined (i.e., `undefined`), the extension will not update the `eventPayload`, which may lead to stale data.
- **Single Responsibility Violation**: The current design lacks clear separation of concerns, which could complicate debugging and updates.
- **Conflict with Other Extensions**: If other extensions manipulate `utag_data` or the `eventPayload` simultaneously, unexpected data states can occur.

---

## Recommendations for Refactoring
- **Enhance Readability**: Document the purpose of each logic block through comments to improve clarity.
- **Modularisation**: Break down logic into smaller, self-contained functions (e.g., a dedicated validation function for checking Journey names).
- **Defensive Checks**: Although eventType and eventPayload are guaranteed, consider implementing checks on the structure of `utag_data` properties to avoid runtime errors in edge scenarios.

---

## Maintenance & Further Notes
- **Ownership**: Assign a dedicated team member for ongoing maintenance and review of this extension as business requirements evolve.
- **Testing Guidelines**: Implement a suite of unit tests to validate the functionality, especially focusing on the conditions affecting `JourneyStep`.
- **Documentation Updates**: Ensure this document is updated whenever code modifications are made to reflect the latest implementation accurately.

--- 

This comprehensive documentation should serve as a resource for understanding, maintaining, and extending the functionalities of the Tealium iQ extension. Anyone accessing this document should have a clear sense of the extension’s purpose, how it operates, and best practices for its use and future enhancement.