# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name**: Password Complexity Measurement
- **ID**: 1737
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Password Complexity Measurement" extension is designed to assess the complexity of passwords entered into any password input fields on a webpage. It evaluates the password based on its length and character variety, assigning a complexity score that can be used for analytics and monitoring. This can help in understanding user behaviour regarding password security and enforcing better password practices across the application.

## 2. Code Explanation

### Key Variables
- **`a`**: The eventType, which indicates the nature of the event triggering the extension.
- **`b`**: The eventPayload, possibly containing additional context or information related to the event.
- **`score`**: An integer variable that reflects the calculated complexity score for a password.

### Logic Flow and Data Processing
1. **Password Input Selection**: The extension first selects all input elements of type "password" using `querySelectorAll`.
2. **Single Password Input Handling**: If only one password input exists, the current processing continues.
3. **Filtering Valid Inputs**: The extension cleans up the results to ensure it only processes inputs that have a value (i.e., non-empty).
4. **Complexity Scoring**:
   - The score starts at zero and increments based on certain criteria:
     - Length of at least 8 characters: +1 point
     - Length of at least 12 characters: +1 additional point
     - Length of at least 16 characters: +1 additional point
     - Contains lowercase letters: +1 point
     - Contains uppercase letters: +1 point
     - Contains numbers: +1 point
     - Contains special characters: +1 point
5. **Event Triggering**: For each score calculated, two separate generic events are fired via `LBGAnalytics.events.genericEvent(61,a).genericEvent(62)`.

### Dependencies
The code relies on the following global objects:
- `document`: To manipulate and access the DOM for password input fields.
- `Array.from()`, `.map()`, `.filter()`, and `.forEach()`: Arrays methods to process the selected password inputs and calculate the complexity score.
- `LBGAnalytics`: A global object for logging analytics events.

## 3. Usage Examples

### Normal Condition
- When a user enters a password "Abcdefgh1!" (which is 12 characters long), the complexity score will be calculated as follows:
  - Length check: 12 characters (score +1)
  - Contains lowercase letters (score +1)
  - Contains uppercase letters (score +1)
  - Contains a numeric digit (score +1)
  - Contains a special character (score +1)
  
  Final Score: 5.

### Edge Conditions
- If no password is entered, the extension will not fire any events, as the filtering step will return no valid inputs.
- If there are multiple password fields, only the first one will be processed due to the condition that returns `e` only when `a.length === 1`.

## 4. Known Limitations & Gotchas
- **Single Input Handling**: The extension only processes the first password input if multiple inputs exist. This may lead to unmonitored complexity scoring for other password fields.
- **Analysis Scope**: The extension does not provide feedback to users; it merely generates analytics events. Implementing user-facing feedback might be advisable for a better user experience.
- **Analytics Dependency**: If `LBGAnalytics` is not properly configured or fails to load, the events may not be logged as intended.

## 5. Recommendations for Refactoring

### Suggested Improvements
- **Defensive Checks**: Although there are guaranteed conditions for `eventType` and `eventPayload`, additional checks on the validity of the password input elements would improve robustness.
- **Modularization**: Consider breaking down the password complexity score calculation into a separate function that can be easily tested and reused. For example:
  
  ```javascript
  function calculatePasswordScore(password) {
      var score = 0;
      if (password.length >= 8) score++;
      // Additional scoring logic...
      return score;
  }
  ```

### Style Considerations
- Consistent naming conventions should be used for variables and functions. For instance, use `inputElements`, `passwordScore`, etc., to enhance code readability.

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Regularly review the extension, especially to ensure compatibility with any changes in the `LBGAnalytics` framework.
- **Ownership**: Assign a designated owner to manage the extension, ensuring clarity on who is responsible for updates and troubleshooting.
- **Testing Guidelines**: 
  - Create tests for scenarios where different passwords are entered, ensuring that the complexity score is accurately calculated and logged.
  - Consider edge cases, such as empty input fields and multiple password fields, to validate correct behaviour across various conditions. 

By adhering to these documentation guidelines, a comprehensive understanding of the "Password Complexity Measurement" extension is achieved, facilitating better collaboration and knowledge sharing among developers and stakeholders.