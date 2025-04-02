# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name**: WTA : TAG : Set : Q&A with Event Value & Narrative
- **ID**: 1072
- **Type**: Javascript Code
- **Scope**: 894
- **Execution Frequency**: On each event triggering

### Summary
This Tealium iQ extension is designed to extract question and answer pairs from a given event. It takes the values of `EventValue` and `EventNarrative` and sets them to `QAQuestion` and `QAAnswer`, respectively, as long as both values are present. Additionally, it implements a filter that redacts sensitive information from the `QAAnswer` if the `QAQuestion` contains certain problematic keywords.

## 2. Code Explanation

### Key Variables
- `a`, `b`, `u`: Placeholder parameters for the function, where:
  - `a` is `eventType` (a string indicating the type of event).
  - `b` is `eventPayload` (an object carrying event data).
  - `u` is `tagObject` (not utilised in this extension).

### Logic Flow
1. **Existence Check**: It first checks if both `EventValue` and `EventNarrative` are not empty and if `EventNarrative` is defined.
2. **Assignment**: If the conditions are satisfied, it assigns `EventNarrative` to `QAQuestion` and `EventValue` to `QAAnswer`.
3. **Sensitive Information Handling**:
    - It iterates through a predefined list of problematic keywords.
    - If any of these keywords are detected in `QAQuestion`, it replaces `QAAnswer` with the string `"(Redacted)"`.

### Dependencies
This extension depends on:
- A valid structure of `eventPayload` containing `EventValue` and `EventNarrative`.
- The existence of a global execution environment provided by Tealium iQ to execute Javascript.

## 3. Usage Examples

### Normal Condition
- **Input**: 
  - `eventPayload.EventValue`: "Blue Widget"
  - `eventPayload.EventNarrative`: "What is the colour of the widget?"
- **Output**: 
  - `QAQuestion`: "What is the colour of the widget?"
  - `QAAnswer`: "Blue Widget"

### Edge Condition (Sensitive information)
- **Input**: 
  - `eventPayload.EventValue`: "mypassword123"
  - `eventPayload.EventNarrative`: "What is your password?"
- **Output**: 
  - `QAQuestion`: "What is your password?"
  - `QAAnswer`: "(Redacted)"

### Edge Condition (Missing values)
- **Input**: 
  - `eventPayload.EventValue`: ""
  - `eventPayload.EventNarrative`: "What is the colour of the widget?"
- **Output**: 
  - No assignment to `QAQuestion` or `QAAnswer`.

## 4. Known Limitations & Gotchas
- The sensitivity filter is only as effective as the `problematic_questions` list; any keywords not included will not trigger redaction.
- If multiple problematic keywords are present in the `QAQuestion`, only the answer is redacted, regardless of how many keywords are detected.
- The extension does not handle inputs where `EventValue` or `EventNarrative` is null or undefined beyond initial checks.
- There could be potential conflicts if other extensions manipulate `eventPayload`, particularly if they adjust `EventValue` or `EventNarrative` after this extension runs.

## 5. Recommendations for Refactoring
- **Defensive Checks**: Consider adding checks to ensure `eventPayload` has valid entries for `EventValue` and `EventNarrative` before operating on them. Although it’s stated these will always be present, this will help to safeguard against future changes.
- **Code Style**: For improved readability, consider employing consistent spacing before and after operators and using descriptive variable names where possible.
- **Modularisation**: Implement the redaction logic in a separate function to encapsulate the behaviour, making the code cleaner and potentially reusable.

```javascript
function redactSensitiveInformation(question, answer) {
  // Redaction logic as currently implemented
}
```

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Regularly review and update the `problematic_questions` list to ensure it reflects current standards of sensitive information.
- **Ownership**: Designate a responsible team or individual for maintaining and updating this extension, including handling bug reports or enhancement requests.
- **Testing Guidelines**: Ensure thorough testing of the extension after any updates to confirm that it handles both expected and edge case scenarios as anticipated. Unit tests can help in validating the assignment and redaction logic effectively.

---

This documentation should serve as a comprehensive guide for developers and stakeholders to understand, utilise, and maintain the Tealium iQ extension effectively.