# Tealium iQ Extension Documentation: Signly Load Rule

## 1. Extension Overview

- **Name**: Signly Load Rule
- **ID**: 1915
- **Type**: JavaScript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Signly Load Rule" extension is designed to evaluate specific conditions to determine if the Signly feature should be enabled on the webpage. This extension checks for various criteria, including cookie values, local storage items, specific URL patterns, and the presence of a relevant HTML element. If any of these conditions are met, the Signly feature will be activated.

---

## 2. Code Explanation

### Key Variables
- `SIGNLY_KEY`: A constant string that is used to reference a key for local storage and other checks. Its value is "showSignly".
- `SIGNLY_SELECTOR`: A constant string defining a CSS selector to identify an `<input>` element with the name "signly".

### Logic Flow
The main functional part of the extension consists of an immediately-invoked function expression (IIFE):

1. **Conditions to Enable Signly**:
   The extension populates the `b.EnableSignly` variable with "Y" or "N" based on the outcome of several checks:
   - Checks if `b.EnableSignly` is already set to "Y".
   - Checks if a cookie with the name `cp.showSignly` is set to "true".
   - Checks if an HTML input element matching `SIGNLY_SELECTOR` is present on the page.
   - Verifies if the hostname is "www.lloydsbankinggroup.com" and if the pathname starts with "/careers/job-search".
   - Checks the value of `localStorage` for the `SIGNLY_KEY` to see if it equals "true".

2. **Reduction Logic**:
   The results of these checks are aggregated using the `reduce()` function, evaluating if any condition returned "true". If at least one condition is met, `b.EnableSignly` is set to "Y", otherwise it defaults to "N".

### Dependencies
This extension relies on:
- The global object `b`, which is typically provided by Tealium for storing configuration and states.
- The `document` object for querying the DOM.
- The `window` object for accessing local storage.

---

## 3. Usage Examples

### Normal Conditions
- **Scenario**: A user visits the careers page of Lloyds Banking Group with the URL `www.lloydsbankinggroup.com/careers/job-search` and has the `showSignly` cookie set to "true".
  - **Outcome**: The extension sets `b.EnableSignly` to "Y".

### Edge Conditions
- **Scenario**: A user visits a different page on the same site such as `/careers/about`.
  - **Outcome**: The URL condition fails, and if no other conditions are met, `b.EnableSignly` is set to "N".
  
- **Scenario**: A user’s browser does not support local storage.
  - **Outcome**: The function will handle the absence of `localStorage` gracefully by catching the exception and returning `false`, ensuring the extension does not break.

---

## 4. Known Limitations & Gotchas

- **Cross-Browser Compatibility**: Older browsers that do not support `localStorage` may lead to the extension not functioning as expected. 
- **Conflicts**: This extension may conflict with other extensions or scripts that manipulate the `b.EnableSignly` value, potentially leading to unexpected behaviour.
- **Cookie Handling**: This extension assumes that cookies are enabled in the user’s browser. If cookies are disabled, the relevant conditions will not hold, and `b.EnableSignly` may default to "N".

---

## 5. Recommendations for Refactoring

- **Modularization**: Consider breaking out the condition checks into separate functions for better readability and maintainability.
- **Defensive Checks**: Even though the availability of `eventType` and `eventPayload` is guaranteed, adding checks may help in future-proofing the code against unforeseen changes.
- **Code Style**: Standardise indentation and spacing in the code for better readability. 

Here's a suggested approach for modularization:
```javascript
function checkCookie() {
  return b["cp." + SIGNLY_KEY] === "true";
}

function checkElement() {
  return !!document.querySelector(SIGNLY_SELECTOR);
}

// Further condition functions can be created
```

---

## 6. Maintenance & Further Notes

- **Ownership**: Ensure that a designated developer is responsible for maintaining this extension and addressing any issues that arise.
- **Testing Guidelines**: Regularly test the extension across different browsers and environments, especially when deploying changes to ensure consistent behaviour.
- **Documentation Updates**: Keep this documentation updated whenever changes are made to the extension functionality or configuration.

This comprehensive documentation aims to assist developers and stakeholders in understanding, implementing, and maintaining the "Signly Load Rule" extension within Tealium iQ.