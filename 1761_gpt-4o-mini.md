# Tealium iQ Extension Documentation: AEM Fragment Code

## 1. Extension Overview

- **Name**: AEM Fragment Code
- **ID**: 1761
- **Type**: JavaScript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
This extension is designed to track user interactions within the Secure AEM Hub by capturing form submissions. When a user clicks the "showresult" button, it collects relevant data—such as form IDs and field values—and sends it to the Celebrus tag and the data layer for analytics purposes. The extension ensures that it captures and sends information regarding the user's journey and form submissions, aiding in understanding user behaviour during their interaction with the AEM Hub.

---

## 2. Code Explanation

### Key Variables
- **celebrusTagObject**: The main object that holds various attributes and data for tracking.
- **fields**: An array that collects pairs of field names and their values from the form, ensuring only non-empty values are included.
- **dl**: Accesses the data layer to retrieve IDs and brand names required for tracking.
- **ocisID**: A unique identifier that comes from the data layer, linked to the user's session.
  
### Logic Flow
1. The extension checks the current URL for the path `secure-aem-hub`.
2. An event listener is attached to the document body for click events, specifically looking for clicks on the "showresult" button.
3. If clicked, it:
   - Initializes or increments the `CelebrusSendIndex`.
   - Maps form-related data (IDs, values) to `celebrusTagObject`.
   - Collects field values from input elements and constructs a clean array of field data.
4. Sends an event to the Celebrus tag if the requirements are met, including relevant form data and user identifiers.
5. Sets up properties in a global object (e.g., `s`) for further processing and tracking.

### Dependencies
- **`utag`**: Utilised for tracking events and sending data to the associated tags.
- **`LBGAnalytics`**: Used to retrieve the data layer which holds user-specific information like OCIS IDs and brand names.
- **Global variable `s`**: Utilised to hold additional tracking properties.

---

## 3. Usage Examples

### Normal Flow
1. The user accesses a page within the Secure AEM Hub.
2. The user interacts with the form and submits by clicking the "showresult" button.
3. The extension captures the form data and sends it to both `Celebrus` and the `s` object for tracking.

### Edge Cases
- **No Input Data**: If no fields are populated in the form, the extension will still run but will not send any meaningful data to the Celebrus tag.
- **Multiple Clicks**: Consecutive clicks on "showresult" will increment the `CelebrusSendIndex`, and all form data will be captured and sent as expected.
- **Error Handling**: Any errors encountered during execution will be logged to the console but will not disrupt the extension's overall function.

---

## 4. Known Limitations & Gotchas

- **HTML Structure Dependency**: The extension's ability to locate elements relies on the presence of specific class names (e.g., `.scep-input`). Any modifications to the HTML structure may break functionality.
- **Limitation on Field Count**: Only the first 9 form fields are captured for the `s` object, which may lead to loss of data for forms with more fields.
- **Error Management**: The extension currently logs errors to the console, which may not be sufficient for a production environment where errors should be reported more formally.
- **Potential Conflicts**: If other scripts interact with elements in the form or change the structure of the DOM, unexpected behaviour could occur. 

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Before dereferencing properties or accessing global objects, checks should be implemented to ensure they are defined. This can prevent runtime errors.
- **Code Modularity**: Consider breaking the code into smaller, reusable functions. For example, you could have separate functions for collecting field names and values, and for sending events to avoid long blocks of code.
- **Error Reporting**: Introduce a more robust error handling mechanism that could notify developers or log errors to a server for monitoring, rather than just logging to the console.
- **Use of Constants**: Define constants for commonly used strings or numeric values (e.g., the path to check), aiding maintainability and clarity in your code.

---

## 6. Maintenance & Further Notes

### Ongoing Maintenance
- Regularly check for changes in HTML structure or associated back-end logic that may impact functionality.
- Monitor logs for any captured errors and address them promptly.

### Ownership
- The extension should have an assigned owner responsible for the continuous improvement and update cycle.

### Testing Guidelines
- Thoroughly test the extension across various scenarios: from normal user behaviour to edge cases where form inputs may be empty or malformed.
- Use browser developer tools to monitor network requests and ensure that data is sent as expected.

By adhering to the guidelines outlined in this documentation, developers can maintain and enhance the functionality of the AEM Fragment Code extension effectively.