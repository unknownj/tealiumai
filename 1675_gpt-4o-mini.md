# Tealium iQ Extension Documentation: ContentSquare Adobe Analytics Integration

## 1. Extension Overview

- **Name**: ContentSquare Adobe Analytics Integration
- **ID**: 1675
- **Type**: Javascript Code
- **Scope**: 928
- **Execution Frequency**: On every page view event

### Summary
This extension is designed to integrate ContentSquare's functionalities with Adobe Analytics. It runs after a page view event and manages user tracking through cookies. By establishing a matching key for ContentSquare, it enables tracking of user behaviour more effectively in conjunction with Adobe Analytics. This integration helps in providing deeper insights into user interaction and enhances the analytics capabilities for the website.

---

## 2. Code Explanation

### Key Variables
- **window._uxa**: An array used for tracking certain events and dynamic variables within the ContentSquare framework.
- **b.ContentSquareMatchKey**: A unique identifier generated for ContentSquare tracking.
- **cookieName**: The name of the cookie that stores the ContentSquare matching key.

### Logic Flow
1. The function initializes an array if `_uxa` doesn't already exist.
2. It pushes an event to track if Adobe Analytics is integrated with ContentSquare after the page view.
3. If certain conditions regarding cookies are met:
   - It generates a unique matching key and sets a cookie for 30 minutes.
   - It pushes the matching key to `_uxa` for tracking.
4. If the `OCISID` variable exists within the `b` object, it tracks this value as well.

### Dependencies
- **Global Objects**: The extension makes use of `window`, `document`, and the global structure provided by ContentSquare (`CS_CONF`), assuming that this structure is predefined in the broader application context.

---

## 3. Usage Examples

### Scenario: Regular Page View Tracking
On a typical page load:
- The extension checks if `CS_CONF` is defined.
- If yes, it registers Adobe Analytics as an integration.
- A cookie is created to store the ContentSquare matching key, which will aid in future user session tracking.

### Scenario: User with Existing OCISID
If a user visits the site and their `OCISID` is available:
- This ID will be tracked through `window._uxa` allowing Adobe Analytics to capture further user details.

### Edge Case: Missing Conditions
If the conditions for cookies are not met (i.e., if `b.CookiesTargeting` or `b.CookiesPerformance` are undefined or false):
- The extension will skip generating and tracking the ContentSquare matching key.

---

## 4. Known Limitations & Gotchas

- If the site does not properly configure cookies, the ContentSquare functionality may not work as intended.
- Conflicts may arise with other extensions or scripts that manipulate the `_uxa` array, potentially leading to duplicate entries or event tracking errors.
- Should the presence of `CS_CONF` be conditional upon other scripts being loaded, missing this can lead to skipped functionality.

---

## 5. Recommendations for Refactoring

- Improve **Error Handling**: While defensive coding isn’t required for `eventType` and `eventPayload`, consider logging when `CS_CONF` is absent to facilitate debugging.
- **Code Style Consistency**: Use consistent variable naming conventions across the codebase to improve readability.
- **Modularisation**: Extract the cookie management logic into a separate function, which could enhance maintainability.
  
```javascript
function setContentSquareCookie(key, value, hours) {
    var now = new Date();
    now.setTime(now.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = key + "=" + value + "; expires=" + now.toUTCString() + "; path=/; domain=." + utag.cfg.domain + "; SameSite=None; Secure";
}
```

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly review the extension in conjunction with any updates to the ContentSquare or Adobe Analytics APIs.
- **Ownership**: It is crucial to assign a dedicated developer or team responsible for monitoring the performance and integrity of this integration.
- **Testing Guidelines**: Implement comprehensive testing across different browsers and devices to ensure cookies are set correctly and user tracking occurs as expected. Unit tests for the cookie-setting functionality could enhance robustness.

This documentation should serve as a comprehensive guide for developers interacting with the ContentSquare Adobe Analytics Integration extension in Tealium iQ. Adjustments and updates to the extension should be made in accordance with these guidelines for optimal performance and maintainability.