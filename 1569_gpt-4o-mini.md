# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name**: Set Eloqua eligibility
- **ID**: 100040
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension sets a cookie (`AddEloqua=true`) when the URL contains the query parameter `elqtrack`. The presence of this cookie will also trigger a setting (`TrackEmailVisit`) in the `eventPayload`, enabling tracking of email visits in the Eloqua system. This functionality is essential for marketers leveraging Eloqua to optimise campaign performance and user engagement tracking.

---

## 2. Code Explanation

### Key Variables
- **a**: Represents the event type which is passed to the function, providing contextual information about the event.
- **b**: Represents the event payload object that can be modified to include additional data for tracking.

### Logic Flow
1. The code checks if the current URL contains the query parameter `elqtrack`:
   - If it finds this parameter, it creates a cookie `AddEloqua` set to `true` and sets `b.TrackEmailVisit` to `1`.
2. If the parameter is not present, it checks if the cookie `AddEloqua` exists:
   - If the cookie is found, it also sets `b.TrackEmailVisit` to `1` without needing the URL parameter.
   
This ensures that if a user has previously interacted with an email link tracked by Eloqua, subsequent visits will still reflect that interaction.

### Dependencies
- The extension relies on global objects `window` and `document` for accessing URL parameters and setting cookies, respectively.
- The parameters `eventType` and `eventPayload` are supplied by the Tealium iQ platform and are guaranteed to be present.

---

## 3. Usage Examples

### Normal Scenario
**URL**: `https://example.com/?elqtrack=12345`  
- The extension runs, setting `document.cookie` to `AddEloqua=true` and `b.TrackEmailVisit` to `1`.

### Edge Case 1: Cookie Already Set
**Scenario**: The user visits the site via a URL without `elqtrack` but previously set the cookie.  
**URL**: `https://example.com/`  
- Since `AddEloqua` is present in cookies, `b.TrackEmailVisit` will be set to `1`.

### Edge Case 2: No Cookie and No Parameter
**URL**: `https://example.com/`  
- Neither condition matches, and `b.TrackEmailVisit` will remain undefined.

---

## 4. Known Limitations & Gotchas
- **Cookie Domain Restrictions**: The cookie is set with a path of `/`, which means it will be accessible across the website. If the site operates on subdomains that do not share cookies, this may lead to unexpected behaviour.
- **Privacy Regulations**: The setting of cookies may conflict with GDPR compliance if proper user consent mechanisms are not in place.
- **Dependency on JavaScript**: If JavaScript is disabled in the user's browser, this extension will not function, leading to potential missed tracking opportunities.

---

## 5. Recommendations for Refactoring
- **Modularisation**: Consider separating the cookie-setting logic into its own function to improve readability and maintainability.
  ```javascript
  function setCookie(name, value, path) {
      document.cookie = name + '=' + value + '; path=' + path;
  }
  ```
- **Use Constants**: Instead of hardcoding strings like `"AddEloqua"` and `"/"`, consider using constants at the top of the file for easier management and updates.
- **Add Comments**: Inline comments could help clarify the purpose of each check and assignment for future developers or stakeholders reviewing the code.
- **Error Handling**: While defensive coding isn't required for `eventType` and `eventPayload`, consider adding checks on cookie storage availability or issues with writing to `document.cookie` in edge cases.

---

## 6. Maintenance & Further Notes
- **Ownership**: Assign a dedicated owner for the extension who is responsible for updates and modifications.
- **Testing**: Regularly test the extension across various browsers and devices, ensuring compatibility and performance.
- **Documentation Updates**: Keep this documentation updated with any changes to functionality or scope, and specify a version control scheme for code changes.

---

This detailed documentation should help future developers understand the purpose and functionality of the "Set Eloqua eligibility" extension within Tealium iQ, ensuring ease of use and facilitating maintenance.