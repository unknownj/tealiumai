# Tealium iQ Extension Documentation: Emergency Overdrafts Fix

## 1. Extension Overview
- **Name:** Emergency Overdrafts Fix
- **ID:** 100040
- **Type:** Advanced Javascript Code
- **Scope:** 894
- **Execution Frequency:** On every applicable page load

### Summary
The "Emergency Overdrafts Fix" extension is designed to track user interactions on the "Apply Overdraft" pages of a website. It modifies the data layer based on specific journey steps and actions related to overdraft applications, allowing for better analytics and insight into user behaviours during the application process. The primary goal is to ensure accurate representation of user actions and statuses, especially in situations where overdrafts may be declined or referred.

## 2. Code Explanation
### Key Variables
- **`a`**: Represents the `eventType`, a string indicating the type of event (e.g., "view", "click").
- **`b`**: Represents the `eventPayload`, an object that carries data related to the event.
- **`u`**: Represents the `tagObject`, an object that is used within the Tealium environment.

### Logic Flow
1. **Path Check**: The script first checks if the URL contains `"/applyod/"` and whether the `JourneyVersion` is `"1"`. If both conditions are met, it proceeds.
2. **Journey Name Assignment**: The variable `b.JourneyName` is set to `"ApplyOD"`.
3. **Overwrite Journey Action**: If `b.JourneyAction` is `"pca manage overdrafts"`, it resets it to an empty string.
4. **Journey Step Normalisation**: If `b.JourneyStep` is `0`, it sets `b.JourneyStep` to `1`.
5. **Product Tracking**: `b.JourneyProduct` is assigned the value of `b.JourneyActionNarrative`, after which it resets `b.JourneyActionNarrative` to an empty string.
6. **Amount Extraction**: If the first character of `b.JourneyAction` is a pound sign (`£`), it extracts the remaining substring as `b.JourneyAmount` and resets `b.JourneyAction`.
7. **Step Name Evaluation**: Depending on the value of `b.JourneyStepName`, it modifies `b.JourneyStep` and `b.JourneyAction` to reflect the specific scenario:
   - If `b.JourneyStepName` is `"Overdraft downsell"`, it sets `b.JourneyStep` to `3` and `b.JourneyAction` to `"Downsell"`.
   - If `b.JourneyStepName` is `"Overdraft declined"`, it sets `b.JourneyStep` to `3` and `b.JourneyAction` to `"Credit Decline"`.
   - If `b.JourneyStepName` is `"Overdraft referred"`, it sets `b.JourneyStep` to `3` and `b.JourneyAction` to `"Referred to Branch"`.
   - If `b.JourneyStepName` is `"Success Page"`, it sets `b.JourneyAction` to `"Service Action Complete"`.

### Dependencies
- The extension relies on the `eventType`, `eventPayload`, and `tagObject` passed by the Tealium iQ environment and assumes they are always available.

## 3. Usage Examples
### Scenario 1: Normal Flow
- **User navigates to**: `/applyod/`
- **Initial `eventPayload`**:
  ```javascript
  {
    JourneyVersion: "1",
    JourneyStep: 0,
    JourneyStepName: "Overdraft downsell",
    JourneyAction: "pca manage overdrafts",
    JourneyActionNarrative: "Apply for an overdraft"
  }
  ```
- **Output after execution**:
  ```javascript
  {
    JourneyName: "ApplyOD",
    JourneyStep: 3,
    JourneyAction: "Downsell",
    JourneyProduct: "Apply for an overdraft",
    JourneyActionNarrative: "",
    JourneyAmount: undefined
  }
  ```

### Scenario 2: Edge Case - Invalid Journey Step Name
- **User navigates to**: `/applyod/`
- **Initial `eventPayload`**:
  ```javascript
  {
    JourneyVersion: "1",
    JourneyStep: 0,
    JourneyStepName: "Unknown step",
    JourneyAction: "pca manage overdrafts",
    JourneyActionNarrative: "Apply for an overdraft"
  }
  ```
- **Output after execution**:
  ```javascript
  {
    JourneyName: "ApplyOD",
    JourneyStep: 1,
    JourneyAction: "",
    JourneyProduct: "Apply for an overdraft",
    JourneyActionNarrative: "",
    JourneyAmount: undefined
  }
  ```

## 4. Known Limitations & Gotchas
- The extension only considers navigating to paths containing `/applyod/`, so it won't trigger for any other paths or scenarios.
- If `JourneyStepName` does not match any predefined values, it defaults to step `1` with no action logged, which might lead to unclear analytics in some flows.
- Potential conflicts may arise with other extensions that modify the `eventPayload` in similar ways, particularly if they run on the same load and alter the same properties.

## 5. Recommendations for Refactoring
- **Modularisation**: Consider splitting the code into smaller functions for better readability and maintainability. For instance, create a function that handles `JourneyStepName` checking.
- **Detailing Comments**: Add comments to explain important logic, especially around conditional checks for future maintainers.
- **Defensive Coding**: Though availability of parameters is guaranteed, consider checks for types or expected formats to enhance robustness.

## 6. Maintenance & Further Notes
- **Ownership**: Assign a dedicated team member for ongoing maintenance of the extension to ensure timely updates based on new business requirements or changes in the application flow.
- **Testing Guidelines**: Regularly test the extension in different environments (staging, production) to validate its performance and function as desired, especially after updates to related analytics systems.
- **Documentation Updates**: Ensure this documentation is updated to reflect any changes in code logic, business requirements, or transition to different versions of the parent product. All changes should be logged for future reference.