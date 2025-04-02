# Tealium iQ Extension Documentation: CSP Fill

## 1. Extension Overview
- **Name:** CSP Fill
- **ID:** 1718
- **Type:** Javascript Code
- **Scope:** Pre Loader
- **Execution Frequency:** Run Once

### Summary
The CSP Fill extension is designed to dynamically generate and enforce a Content Security Policy (CSP) for web pages under the Lloyds Banking Group domain. The purpose of this extension is to enhance security by specifying which content sources are allowed to be loaded on a page, thereby protecting against attacks like Cross-Site Scripting (XSS). This extension also incorporates mechanisms to log policy violations and ensure that the appropriate CSP configurations are applied based on user-defined profiles.

---

## 2. Code Explanation

### Key Variables
- **window.LBGCSP**: The main object that encapsulates the CSP functionality.
- **target**: A reference to `LBGCSP`, allowing internal functions to manipulate it easily.
- **config**: A configuration object passed at instantiation, defining CSP rules for various profiles.

### Logic Flow
1. **Initialization**: The extension checks if `window.LBGCSP` is already defined. If not, it initializes it as an empty object and proceeds to configure the CSP.
  
2. **Parent Domain Extraction**: It extracts the parent domain from the current location to allow implicit trust for subdomains.

3. **CSP Generation**:
   - The method `profilesToString` filters profiles based on a provided filter and returns a CSP string for each scope.
   - The method `applyContentSecurityPolicy` checks for existing policies, handles profile expressions, and applies the generated policy.

4. **Meta Tag Creation**: The `addMetaTag` function creates a meta tag for CSP and appends it to the document head.

5. **Violation Handling**: The extension listens for CSP violation events and logs them for analysis.

6. **CSP Enablement**: It checks if CSP is enabled based on certain URL paths and creates a default CSP if necessary.

### Dependencies
- **Global Objects**: 
  - `window`: The global object that represents the window containing the DOM.
  - `window.performance`: Used for marking performance-related events.
  - `document`: Represents the DOM to manipulate elements.

---

## 3. Usage Examples

### Normal Condition
When a user navigates to a valid Lloyds Banking Group domain (e.g., `www.lloydsbank.com`), the CSP Fill extension checks the current domain against its `enabled` list. If the domain is found, it generates a default CSP and creates a meta tag in the head of the document.

### Edge Condition
When navigating from a non-allowed domain (not included in the `enabled` list), the extension does not apply any CSP, thus allowing all resources to load without restrictions. Moreover, if the CSP is already set, the extension will not attempt to set it again, preventing multiple CSP meta tags.

---

## 4. Known Limitations & Gotchas
- **Multiple CSP Instances**: If the extension runs in an environment where multiple CSPs may be applied recursively, the first CSP applied may prevent subsequent policies from taking effect.
- **Ineffective in Frames**: The extension contains logic to avoid setting CSPs if the window is not the topmost (i.e., it is in an iframe). This may limit its effectiveness in some scenarios.
- **Overly Broad CSP**: If a catch-all CSP is applied, it can lead to unintended consequences from excessive trust in allowed sources.
- **CSP Violations**: If a script violates the defined CSP, it may not be logged if it is not set up correctly for the current domain or if there are issues with the event listener for `securitypolicyviolation`.

---

## 5. Recommendations for Refactoring
- **Modularisation**: Split different functionalities into smaller modules or functions to enhance readability and maintainability.
- **Error Handling**: Introduce specific logging or callbacks in the catch blocks to log errors or handle them more gracefully.
- **Code Style**: Maintain consistent formatting across the codebase. Consider using named functions instead of anonymous functions for easier debugging.
- **Profile Filtering**: Consider creating a dedicated method for handling profile filters, which can improve code clarity.

---

## 6. Maintenance & Further Notes
- **Ownership**: Designate a specific team or individual for ongoing maintenance, ensuring they are familiar with CSPs and security best practices.
- **Testing Guidelines**: Regularly test the extension under different environments to ensure compatibility, especially with new domains added to the `enabled` list.
- **Documentation Updates**: Keep the documentation updated with any changes in the business logic or CSP rules to ensure all team members are aligned.

---

This documentation aims to provide a comprehensive overview of the CSP Fill extension in Tealium iQ, detailing its functionality, code structure, and best practices for maintenance and future development.