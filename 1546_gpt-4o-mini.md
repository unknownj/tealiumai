# Tealium iQ Extension Documentation: Step Number Offset

## 1. Extension Overview

- **Name**: Step Number Offset
- **ID**: 1546
- **Type**: Advanced Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Step Number Offset" extension processes incoming journey step data by adjusting the `JourneyStep` value based on a specified offset provided in `JourneyStepOffset`. This modification allows for dynamic modification of journey steps in user interactions, facilitating more accurate tracking and reporting.

## 2. Code Explanation

### Key Variables
- **`toNumber`**: A utility function that converts its input to a number if possible. Returns `false` if the conversion is not feasible.
- **`js`**: A variable representing the converted value of `JourneyStep`.
- **`jso`**: A variable representing the converted value of `JourneyStepOffset`.

### Logic Flow
1. The `toNumber` function is defined to handle the conversion of values to numbers, encapsulating error handling to return `false` in case of an invalid input.
2. The extension retrieves the `JourneyStep` and `JourneyStepOffset` from the `eventPayload` (denoted as `b`).
3. It checks whether both `js` and `jso` are valid numbers (not `false`).
4. If valid, `JourneyStep` is updated by adding the offset value (`js + jso`), and `JourneyStepOffset` is subsequently deleted from the payload.

### Dependencies
This extension does not rely on any external libraries or global objects beyond the provided `eventType` and `eventPayload`.

## 3. Usage Examples

### Normal Condition
- **Input**:
  - `JourneyStep`: 3
  - `JourneyStepOffset`: 2
- **Output**:
  - `JourneyStep`: 5 (3 + 2)
  - `JourneyStepOffset` is removed.

### Edge Conditions
1. **Non-numeric JourneyStep Input**:
   - **Input**:
     - `JourneyStep`: "abc"
     - `JourneyStepOffset`: 2
   - **Output**:
     - `JourneyStep`: remains unchanged (no valid conversion).

2. **Missing JourneyStepOffset**:
   - **Input**:
     - `JourneyStep`: 3
     - `JourneyStepOffset` is absent.
   - **Output**:
     - `JourneyStep`: remains 3 (no modification).

3. **Negative Offset**:
   - **Input**:
     - `JourneyStep`: 5
     - `JourneyStepOffset`: -2
   - **Output**:
     - `JourneyStep`: 3 (5 - 2).

## 4. Known Limitations & Gotchas

- **Invalid Input Handling**: The extension depends on the presence of valid numeric inputs for `JourneyStep` and `JourneyStepOffset`. Non-numeric inputs will result in no modification, which may lead to unexpected data conditions.
- **Payload Size**: Deleting `JourneyStepOffset` reduces the payload size; however, if there are dependencies on this value elsewhere, this could lead to data integrity issues.
- **Potential Conflicts**: If other extensions manipulate `JourneyStep` during the same execution context, there could be unintended interactions or data overwrites.

## 5. Recommendations for Refactoring

- **Modularisation**: Consider separating the `toNumber` function into a standalone utility to enhance reusability and maintainability.
- **Additional Defensive Checks**: While it is guaranteed that `eventType` and `eventPayload` are present, further validation of the contents of `eventPayload` could provide stability in unforeseen scenarios.
- **Clear Documentation of Edge Cases**: Explicitly document behaviours under edge conditions to facilitate better understanding for future developers.

```javascript
// Example for modularization
var Utility = {
  toNumber: function(n){
    try{
      if(typeof n == "number") return n;
      if(!isNaN(n)) return 1 * n;
      return false;
    } catch(e){
      return false;
    }
  }
};
```

## 6. Maintenance & Further Notes

- **Ownership**: Assign a designated owner for ongoing maintenance of this extension to ensure consistent updates and reviews.
- **Testing Guidelines**: Implement thorough unit tests to validate all potential scenarios, especially edge conditions, to guarantee robust functionality.
- **Documentation Updates**: Periodically review this documentation and update as the business or technical requirements evolve, ensuring all developers have access to current information. 

This documentation serves as a comprehensive guide for developers and stakeholders to understand the "Step Number Offset" extension's functionality and maintain it effectively.