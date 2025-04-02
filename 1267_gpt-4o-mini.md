# Tealium iQ Extension Documentation: SCEP 404

## 1. Extension Overview

- **Name**: SCEP 404
- **ID**: 1267
- **Type**: Advanced Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The SCEP 404 extension is designed to track page not found (404) errors by detecting if the current page's canonical URL includes "/404." in its path. Upon detection, it triggers a generic event in LBGAnalytics with an error message stating "Page Not Found." This extension enables enhanced analytics for error pages, allowing for better troubleshooting and UX improvements.

## 2. Code Explanation

### Key Variables
- **a, b**: Parameters intended for potential future use, representing event type and payload.
- **jQuery Object**: Utilised to select the canonical link element in the DOM.

### Logic Flow
1. The extension begins executing by defining an immediately invoked function that takes `eventType` and `eventPayload` as arguments.
2. It checks if the canonical link's `href` contains the substring "/404." using the `indexOf` method.
3. If the condition evaluates as true, it triggers the LBGAnalytics `events` object to log a generic event indicating that an error page has been encountered.

### Dependencies
- **jQuery**: This extension requires jQuery to manipulate the DOM and check the canonical link.
- **LBGAnalytics Library**: The extension calls upon the LBGAnalytics library to log events. Ensure that this library is loaded on the page for correct functionality.

## 3. Usage Examples

### Scenario 1: Normal Operation
- **Given**: A user visits a page with the canonical URL `https://example.com/404.page`.
- **Flow**:
  - The jQuery selector finds the canonical link.
  - The URL is evaluated, and the condition succeeds (`indexOf` returns an index greater than 0).
  - The event is logged as an error page: `LBGAnalytics.events.genericEvent(180).errorPage("Page Not Found");`.

### Scenario 2: Edge Condition
- **Given**: A user visits a page with a non-404 URL (e.g., `https://example.com/about`).
- **Flow**:
  - The canonical link is still selected but does not contain "/404.".
  - The condition fails, and no event is logged.

## 4. Known Limitations & Gotchas

- The extension relies heavily on the jQuery library. If this is missing or not loaded before this code runs, the extension will fail silently.
- The code assumes that there is always a canonical link present on the page. If the canonical link is absent, a `null` reference may cause unexpected behavior.
- The extension does not account for variations of 404 page URLs (e.g., when using different suffixes besides ".page").
- Conflicts may arise if multiple extensions attempt to manipulate or track canonical links in differing ways.

## 5. Recommendations for Refactoring

- **Defensive Checks**: While it is stated that `eventType` and `eventPayload` will always be present, it is prudent to add checks to ensure `$("link[rel=canonical]")` exists before trying to access its `href` attribute.
- **Avoid Hardcoding**: Consider defining "/404." as a constant variable to avoid magic strings in the code.
- **Separation of Concerns**: For better readability and maintainability, the event logging logic could be abstracted into a separate function.
  
  ```javascript
  function logErrorPage() {
      LBGAnalytics.events.genericEvent(180).errorPage("Page Not Found");
  }
  ```

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly check that the LBGAnalytics library is updated and functional. This extension should be tested whenever updates are made to related systems or libraries.
- **Ownership**: Assign a specific team or individual responsible for this extension to ensure accountability in managing updates and fixes.
- **Testing Guidelines**: Implement regular checks to ensure the extension behaves as intended, especially after upgrades to the site or changes in the URL structure. Validate its performance across different browsers and devices.

---

This documentation should serve as a comprehensive guide for developers and stakeholders to understand, maintain, and enhance the SCEP 404 extension in Tealium iQ.