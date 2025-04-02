# Tealium iQ Extension Documentation: SCEP Integration POC

## 1. Extension Overview

- **Name:** SCEP Integration POC  
- **ID:** 1713  
- **Type:** Javascript Code  
- **Scope:** DOM Ready  
- **Execution Frequency:** Run Once  

### Summary
The SCEP Integration POC is a custom JavaScript extension designed for tracking user interactions with a dynamic postcode finder and other form elements on a webpage. It interfaces with LBGAnalytics to send event data related to user engagement, such as field updates, interactions with buttons, and visibility tracking of form fields. The primary goal is to improve data collection and enhance analytical insights into user behaviour during postcode searches and form submissions.

---

## 2. Code Explanation

### Key Variables
- **verboseLogging:** Boolean flag to enable or disable logging for debugging purposes.
- **formModel:** Object to store values of form fields being tracked.
- **trackedElements:** Array to hold elements that have been tracked by the extension.
- **formSendSelectors:** Array of CSS selectors aimed at identifying form submission elements.

### Logic Flow
1. **Initial Setup:** The extension checks for the presence of the `LBGAnalytics` object. If absent, it exits immediately.
2. **Event Handling:**
   - Tracks interactions with postcode finder inputs, search buttons, manual entry buttons, and results list.
   - Uses `IntersectionObserver` where available to track visibility of specific elements.
   - Implements event listeners for form fields, accordions, tooltips, and range sliders.
3. **Data Processing:**
   - Collects user input and interactions into the `formModel`.
   - Sends event data to `LBGAnalytics` upon trigger conditions (e.g., button clicks, field changes).
   - Handles state changes for user inputs, such as tracking engagement and completion rates.

### Dependencies
- **LBGAnalytics:** The extension relies on the presence of this global object, which is expected to provide the methods for sending analytics data.
- **IntersectionObserver:** Utilised for visibility tracking of elements. A fallback provides basic functionality if not supported.

---

## 3. Usage Examples

### Example 1: Standard Interaction
1. A user types in the postcode input field.
2. The extension captures the value in the `formModel` and logs the interaction.
3. An event is sent to `LBGAnalytics` indicating the user has engaged with the postcode input.

### Example 2: Search Button Click
1. The user clicks the postcode search button.
2. The extension increments search click count and sends an event indicating a click.
3. If this is the first click, it also tracks the interaction as "75% Done."

### Example 3: Edge Condition
1. No postcode input is made, and the user clicks on the manual entry button.
2. A "Cancelled" tracking event is sent if no prior search click has been performed.
3. This behaviour helps differentiate users who abandon the search process without valid input.

---

## 4. Known Limitations & Gotchas

- **Inconsistent Element State:** If any target elements are not loaded in the DOM, the extension will log a message but will not throw an error. Ensure layout consistency to avoid issues.
- **Dependency on LBGAnalytics:** The lack of this global object will halt the entire functionality of the extension, making it vital to ensure proper loading order of scripts.
- **Performance Overhead:** Extensive logging, specifically if `verboseLogging` is enabled, can lead to performance issues in production environments. It's recommended to disable this in non-debug scenarios.

---

## 5. Recommendations for Refactoring

- **Avoid Global Polluting:** Encapsulate the `scepAnalytics` object further within a module to limit its exposure to the global namespace.
- **Modularisation:** Break down large functions (like `init`) into smaller helper functions to improve readability and maintainability.
- **Error Handling:** Consider adding more robust error handling in sections that interface with the DOM, such as resolving selectors.
- **Code Documentation:** Include more inline comments to explain complex logic or less intuitive sections of the code. This will help future developers understand the purpose behind various implementation decisions.
- **DRY Principle:** Review repeated code patterns, especially in event handler setups, and consider creating reusable functionality to reduce redundancy.

---

## 6. Maintenance & Further Notes

- **Ownership:** Assign a primary owner for the extension within the development team to oversee updates and fixes, ensuring accountability.
- **Testing Guidelines:** Establish a comprehensive testing strategy to verify functionality after changes, particularly focusing on user interaction scenarios.
- **Documentation Updates:** Maintain the documentation in sync with code changes to ensure accuracy. Encourage contributors to refer to this document whenever modifications are made.

By adhering to this structured documentation, future developers and stakeholders can maintain, enhance, and utilise the SCEP Integration POC extension effectively.