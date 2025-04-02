# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: WTA : TAG : Set : Reporting Action & Narrative with Journey Variables
- **ID**: 1076
- **Type**: Javascript Code
- **Scope**: 894
- **Execution Frequency**: Active

### Summary
This extension modifies the reporting action and narrative based on predefined journey variables. It first attempts to set the reporting action to the generic event action and narrative. If journey variables associated with the current event are present and non-empty, the extension will override these with the journey-specific values. This behaviour ensures more accurate event tracking, particularly in user journeys.

---

## 2. Code Explanation

### Key Variables
- **`a`**: Represents the event type (assumed a string).
- **`b`**: Represents the event payload (assumed to be an object).
- **`u`**: Represents `tagObject`, which is presumably a global object to manage other tag functionalities.

### Logic Flow
1. **Initialization**: The function takes three parameters: `eventType`, `eventPayload`, and `tagObject`.
2. **Setting Default Values**:
   - `b.ReportingAction` is initially set to the event's action: `b.EventAction`.
   - `b.ReportingActionNarrative` is initially set to the event's narrative: `b.EventNarrative`.
3. **Checking Journey Variables**:
   - If `b.JourneyAction` exists and is a non-empty string, it overrides the `ReportingAction`.
   - It also sets the `ReportingActionNarrative` to `b.JourneyActionNarrative`.

### Dependencies
- The code relies on properties from the `eventPayload` object (specifically `EventAction`, `EventNarrative`, `JourneyAction`, and `JourneyActionNarrative`).
- The global object `tagObject` is used for broader context, but it is not modified by this extension.

---

## 3. Usage Examples

### Normal Case
1. **Event Triggered**: An event occurs where `eventType` is `pageView` and the incident's `EventAction` and `EventNarrative` are both set.
2. **Journey Variables Present**: If `b.JourneyAction` is equal to `"Checkout"` and `b.JourneyActionNarrative` equals `"User has added items to cart"`, then:
   - The result will be:
     - `ReportingAction` → `"Checkout"`
     - `ReportingActionNarrative` → `"User has added items to cart"`

### Edge Case
1. **No Journey Variables**: If the event does not have any journey parameters:
   - The values for `ReportingAction` and `ReportingActionNarrative` will stay as originally set from `EventAction` and `EventNarrative`.
2. **Empty JourneyAction**: If `b.JourneyAction` is present but an empty string:
   - The `ReportingAction` and `ReportingActionNarrative` will remain unchanged from the initial values.

---

## 4. Known Limitations & Gotchas

- **Handling Undefined Properties**: The code does not perform checks on the presence of properties; if they are missing in `eventPayload`, it could lead to undefined behaviours.
- **Assumption of Non-empty Strings**: The function assumes that if `JourneyAction` is provided, it will not be an empty string. If it is, the output may not be as expected.
- **Impact on Other Extensions**: If other extensions modify the same properties (`ReportingAction`, `ReportingActionNarrative`), this extension may conflict depending on the execution order.

---

## 5. Recommendations for Refactoring

- **Implement Defensive Checks**: Before accessing properties from `b`, consider adding checks to avoid possible runtime errors when accessing properties that may not exist.
- **Code Style**: 
  - Consistency in spacing and formatting can improve readability.
  - Comment blocks prior to each major logic section can help future developers understand intent.
- **Modularization**: Breaking the code into smaller functions could enhance maintainability, particularly if checks or additional logic could bulk it up in future iterations.

---

## 6. Maintenance & Further Notes

- **Ownership**: Designate a team member responsible for ongoing updates and ensure that proper knowledge transfer occurs during onboarding.
- **Testing Guidelines**: Regularly test the extension in a variety of scenarios, particularly after updates to related systems or when integrating new variables.
- **Documentation Updates**: Keep this documentation updated as the extension evolves or as new requirements are identified.

---

This documentation is intended for developers and team members working with the extension to provide clear insights into functionality, usage scenarios, limitations, and future considerations.