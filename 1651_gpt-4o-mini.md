# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: PageViewID and SendDepth
- **ID**: 1651
- **Type**: Javascript Code
- **Scope**: 928
- **Execution Frequency**: Active

### Summary
This extension is designed to manage the identification of page views by generating a unique `PageViewID` and maintaining a `SendDepth` counter for each page view. The `PageViewID` is assigned based on the existing `PageViewID` in the `eventPayload` or generates a new unique ID if it doesn't exist. The `SendDepth` tracks the number of times the page has been viewed during a session. This functionality is essential for analytics purposes, enabling better tracking of user behaviour across multiple views.

---

## 2. Code Explanation

### Key Variables
- **`u.lbgPageViewID`**: A unique identifier assigned to each page view. It is derived from the existing `PageViewID` if available; otherwise, it generates a new unique string.
- **`u.lbgSendDepth`**: A counter that increments on each page view, starting from zero.

### Logic Flow
1. The function checks if `PageViewID` exists in the `eventPayload` (`b`). If it does and `u.lbgPageViewID` is not set, it assigns `b.PageViewID` to `u.lbgPageViewID`.
2. If `u.lbgPageViewID` still does not exist, it creates a new one by combining the current timestamp (converted to a base-36 string) and a random number (also converted to base-36, excluding the decimal point).
3. The `u.lbgSendDepth` variable is initialised to zero if not already set. It then increments `SendDepth` by one.
4. Finally, it assigns the values back to the `eventPayload` (`b.PageViewID` and `b.SendDepth`).

### Dependencies
This extension relies on the standard Tealium global object model. Specifically:
- **`eventType`**: Represents the type of event triggering this extension.
- **`eventPayload`**: An object containing event data, specifically `PageViewID`.
- **`tagObject`**: Represents the context in which this script runs (not explicitly used but included for completeness).

---

## 3. Usage Examples

### Scenario 1: Typical Page View
- **Input**:
  - `eventPayload` includes `{ PageViewID: "abc123" }`.
  
- **Output**:
  - After execution, `eventPayload` will contain:
    ```javascript
    {
      PageViewID: "abc123",
      SendDepth: 1
    }
    ```

### Scenario 2: New Page View
- **Input**:
  - `eventPayload` does not include `PageViewID`.
  
- **Output**:
  - After execution, `eventPayload` will contain a new `PageViewID` and `SendDepth`:
    ```javascript
    {
      PageViewID: "1h0av3j5kl", // Example of a generated ID
      SendDepth: 1
    }
    ```

### Edge Condition: Repeated Page Views
- **Input**:
  - `eventPayload` includes the existing ID.
  
- **Output**:
  - On subsequent page views, `SendDepth` increments:
    ```javascript
    {
      PageViewID: "abc123",
      SendDepth: 2
    }
    ```

---

## 4. Known Limitations & Gotchas

- **Multiple Page View Events**: If not properly configured, rapid or multiple page views might lead to unexpected results in `SendDepth`, potentially causing inaccurate tracking.
- **Conflict with Other Extensions**: Other extensions modifying the `eventPayload` might interfere with or overwrite `PageViewID` and `SendDepth` values, depending on execution order.
- **Unique ID Collision**: Though the ID generation mechanism is highly unlikely to produce duplicates, there's a theoretical risk, especially in low-traffic environments where the random number component may not differ significantly.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Incorporate validations on existing properties of `eventPayload` to ensure robust handling (though the requirements specify not to worry about this).
- **Modularization**: To enhance clarity, consider breaking out ID generation and depth counting into separate functions, allowing potential reuse in other parts of the codebase.
- **Code Style**: Maintain consistent formatting and documentation of variables for better readability.

---

## 6. Maintenance & Further Notes

- **Ownership**: Designate a team member to regularly review and update the extension based on user feedback and changes in analytics requirements.
- **Testing Guidelines**: Implement testing protocols to validate functionality with diverse `eventPayload` inputs, including edge cases.
- **Documentation**: Keep the inline documentation updated to reflect any changes or enhancements made to the code over time.

--- 

This documentation should serve as a comprehensive guide for developers and stakeholders, ensuring clarity on the purpose and functionality of the `PageViewID and SendDepth` extension in Tealium iQ.