# Tealium iQ Extension Documentation: Cardnet Webchat Test

## 1. Extension Overview

- **Name**: Cardnet Webchat Test
- **ID**: 2272
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Cardnet Webchat Test" extension is designed to enhance the webchat experience on the site when specific conditions are met. It checks for a condition in the URL query string and, if matched, overrides the default webchat configurations to implement custom styling and functionality using Salesforce's Embedded Service for Web. This extension aims to provide seamless integration of customer support through live chat, helping improve user engagement and support resolution times.

---

## 2. Code Explanation

### Key Variables
- `a`, `b`: Function parameters representing `eventType` and `eventPayload`. 
- `sS`: A newly created `<style>` element to apply custom CSS styles for the chat interface.
- `loadChatScript`: A function that dynamically loads the Salesforce Embedded Service script.

### Logic Flow
1. **Condition Check**: The extension starts by checking if the `search` parameter in the URL contains `cardnetwebchat=test`.
2. **Webchat Override**:
   - If the condition is met, it sets `b.WebchatPlatformOverride` to `"NewCardnet"`.
   - It checks if the global variable `window.initESW` has been defined. If not, it proceeds to load necessary CSS styles and the Embedded Service script.
3. **Styling**: Custom styles are applied for mobile views and specific button appearances.
4. **Initialization**: The `initESW` function initializes the Salesforce chat settings, including UI configurations and prechat form details.
5. **Dynamic Script Loading**: The `loadChatScript` function is called to load the required chat script from Salesforce. Depending on whether the `embedded_svc` object is already defined, it either initializes the service with or without a specific `gslbBaseURL`.

### Global Object Dependencies
- `window`: Used to create and check properties like `initESW` and `embedded_svc`.
- External scripts from Salesforce for the Embedded Service chat functionality.

---

## 3. Usage Examples

### Normal Conditions
1. **Scenario**: A user navigates to a URL with a query string `?search=cardnetwebchat=test`.
   - Expected Outcome: The webchat appears with custom styling and is fully functional, allowing users to engage with a live agent.

### Edge Conditions
2. **Scenario**: The user accesses the site without the specific query string.
   - Expected Outcome: The extension does not execute, and the default chat functionality remains unaffected.

3. **Scenario**: The Salesforce script fails to load due to network issues.
   - Expected Outcome: The chat feature may not be available, and there should be fallback mechanisms in place to inform users accordingly.

---

## 4. Known Limitations & Gotchas

- **Network Dependency**: The extension’s functionality is dependent on external Salesforce scripts; failures in loading these scripts may lead to the webchat not initializing.
- **Mobile Styling**: CSS applied is limited to screens smaller than 767px, which may not account for all mobile devices effectively.
- **Global Variable Usage**: If `window.initESW` is modified or interfered with by another script, this extension may fail.
- **Conditional Logic**: The check for the URL query string is case-sensitive; variations may result in the extension not executing as intended.

---

## 5. Recommendations for Refactoring

- **Modularisation**: Consider breaking out the CSS injection and chat service initialization into separate functions for better code readability and maintainability.
- **Function Naming**: Use more descriptive names for functions (e.g., `loadSalesforceChatScript`) to enhance understanding of their purpose.
- **Error Handling**: Implement basic error logging to capture failed script loads or initialization errors, helping with debugging and user feedback.
- **Consistent Indentation**: Ensure consistent use of indentation and whitespace throughout the code for enhanced readability.

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign a specific developer or team to oversee this extension’s performance and updates, especially to accommodate any changes to the Salesforce API.
- **Testing Guidelines**: Regularly test the extension in multiple browsers and devices to ensure compatibility. Create a staging environment where changes to the extension can be validated before deployment.
- **Documentation Update**: Ensure this documentation is updated following any changes in the code or external dependencies to maintain clarity and usability for future developers.

---

This documentation should provide a comprehensive understanding of the "Cardnet Webchat Test" extension, facilitating easier maintenance, enhancements, and collaboration within the development team.