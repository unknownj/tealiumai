# Tealium iQ Extension Documentation: FPHD

## 1. Extension Overview
- **Name**: FPHD
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: 1459
- **Execution Frequency**: On page load, on change events of specified input fields

### Summary
The FPHD (First Party Hash Data) extension is designed to track and securely hash sensitive user data, specifically email and phone number information, captured via input elements on a webpage. The hashed data is subsequently stored and managed through the browser's session storage and passed to the data layer. The primary objective is to enhance user privacy while ensuring that analytics and tracking requirements are met.

---

## 2. Code Explanation
### Key Variables
- **window.fphdLog**: A logging object to monitor the extension’s execution state.
- **u.FPHD**: The main object that encapsulates all functionality related to the extension, including methods for setting data, validation, handling events, and accessing data items.
- **dataItems**: An array containing configuration for email and phone number fields, including field selectors and validation logic.

### Logic Flow
1. **Initialization**: The extension checks if the FPHD namespace exists and initializes it, setting up logging and basic structure.
2. **Event Handlers**: 
   - Listens for changes on the designated input fields to capture user input data.
   - Has a separate handler for loading events to retrieve existing values from certain field classes.
3. **Data Validation**: Utilises specific validation functions to ensure the data received is in the correct format (email or phone).
4. **Data Hashing**: Validated values are hashed using SHA-256 and stored in `u.FPHD.data`.
5. **Data Storage**: Sets data into the data layer `b` as well as the session storage for persistence through the user’s session.

### Dependencies
- **LBGAnalytics**: A global object assumed to be available for logging and certain analytic purposes.
- **utag.ut.sha256**: A utility for hashing data using SHA-256.
- **document.addEventListener**: Standard DOM method to register event listeners.
- **LBGAnalytics.$()**: A jQuery-like function for element selection.

---

## 3. Usage Examples

### Scenario 1: Normal Data Capture
A user types their email address into an input field that matches one of the specified selectors. Upon typing, the extension logs the event and captures the email. It processes this email by:
- Validating its format.
- Hashing the validated email.
- Storing it in the `b` data layer and session storage.

### Scenario 2: Edge Case - Invalid Email
If the user enters an invalid email (e.g., "not_an_email"), the validation function will not return a value. Consequently, the extension:
- Does not set the data for email.
- Logs no activity regarding successful data capture (i.e., `window.fphdLog.E` remains false).

### Scenario 3: Pre-Existing Values
Upon page load, the extension checks pre-existing input field values:
- If an email matches the selectors and is validated, it is also hashed and stored.
- This ensures that even if a user returns to the page with previously filled information, their data will be captured accurately.

---

## 4. Known Limitations & Gotchas
- The extension does not handle all potential errors robustly, evident with empty `catch` blocks; this could hinder debugging if unexpected exceptions occur.
- Multiple elements with the same class may lead to data conflicts; this limitation arises from the selective nature of the element matching process.
- If cookies targeting is disabled (`b["CookiesTargeting"]` is not true), logging and data capture is skipped, which may lead to missing analytics data.
- Session storage reliance means that data could be lost if the user navigates away from the page or closes the browser.

---

## 5. Recommendations for Refactoring
- **Defensive Checks**: Consider providing console or error logging within the catch blocks to facilitate easier troubleshooting.
- **Modularization**: Break down large functions into smaller, reusable functions for clarity and maintainability.
- **Consistent Naming**: Maintain a consistent naming convention for variables, functions, and identifiers to improve readability.
- **Data Storage Validation**: Implement checks to confirm that data is successfully set in session storage and appropriate error handling to manage potential failures in data storage.
- **Comments and Documentation**: Add more inline comments to clarify complex logic, especially around validation and event handling.

---

## 6. Maintenance & Further Notes
- **Ownership**: Assign a team member or a small group to oversee ongoing maintenance and updates to the extension.
- **Testing Guidelines**: Incorporate automated tests for critical functions (e.g., hashing, validation). Regularly conduct manual tests, especially after updates to any dependencies or related systems.
- **Version Control**: Ensure all changes are documented in a version control system, with proper commit messages explaining modifications and updates.
- **Regular Reviews**: Periodically review the extension for potential enhancements or to ensure compatibility with current security standards and practices.

With careful attention to detail and adherence to best practices, this documentation can serve as a comprehensive guide for both current and future developers working with the FPHD extension.