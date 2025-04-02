# Tealium iQ Extension Documentation: AEM Link Tracking (Adobe Tag Scoped)

## 1. Extension Overview

- **Name**: AEM Link Tracking (Adobe Tag Scoped)
- **ID**: 1543
- **Type**: Advanced Javascript Code
- **Scope**: 928
- **Status**: Active

### Summary
The **AEM Link Tracking (Adobe Tag Scoped)** extension is designed to facilitate tracking of link clicks within a web application using Adobe analytics. It retrieves link-related data from `LBGAnalytics.navLinks` and integrates it into the event payload for further processing. This enables accurate analytics tracking associated with user interactions, ensuring that link clicks are correctly attributed within the Adobe Tag framework.

---

## 2. Code Explanation

### Key Variables
- **`a`**: Represents the `eventType`, a string indicating the type of event being processed.
- **`b`**: Represents the `eventPayload`, an object containing details about the event.
- **`u`**: Represents the `tagObject`, which holds the configuration and metadata for the Tealium tags.

### Logic Flow
1. The extension checks if the `LBGAnalytics.navLinks` object exists and if it contains a method named `retrieveClickData`.
2. If the conditions are met, it retrieves click data by invoking `retrieveClickData()` method.
3. The retrieved data is assigned to `b.LinkValue`, ensuring that this property is set only if it was not already defined.

### Dependencies
- This extension depends on the global object `LBGAnalytics`, which is expected to be defined elsewhere in the application.
- It requires the presence of the method `retrieveClickData()` within `LBGAnalytics.navLinks`.

---

## 3. Usage Examples

### Normal Condition
- When a user clicks a link, the `AEM Link Tracking` extension will call the `retrieveClickData()` method:
  ```javascript
  eventType = 'linkClick'; 
  eventPayload = {}; 
  // ... Other functionalities
  // Assume `LBGAnalytics.navLinks.retrieveClickData()` returns { linkType: 'internal', linkName: 'Homepage' }
  // b.LinkValue becomes { linkType: 'internal', linkName: 'Homepage' }
  ```

### Edge Condition
- If `LBGAnalytics.navLinks` does not exist:
  ```javascript
  // b.LinkValue remains undefined, and no data is appended to the eventPayload.
  ```
- If `retrieveClickData()` does not return any data:
  ```javascript
  // b.LinkValue remains an empty object or may stay undefined if it was not set previously.
  ```

---

## 4. Known Limitations & Gotchas

- If `LBGAnalytics` or the method `retrieveClickData()` are not defined, the extension will silently fail without generating any errors or warnings.
- This extension assumes that multiple instances of click data retrieval will not conflict with each other. However, relying too heavily on global variables can lead to inconsistencies if other scripts manipulate them.
- There may be conflicts with other extensions that also modify the `eventPayload`, leading to loss of previously stored data.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Consider adding more robust checks to verify that `LBGAnalytics` and `retrieveClickData()` are defined, even if current assumptions are guaranteed.
- **Code Style**: Use meaningful variable names within the closure for clarity, e.g., `eventType, eventPayload, tagObject` instead of `(a,b,u)`. This enhances readability.
- **Modularisation**: Consider refactoring the logic into a named function for testing and reuse.
  
Example refactor:
```javascript
function trackLinkClick(eventType, eventPayload) {
  if (LBGAnalytics.navLinks && typeof LBGAnalytics.navLinks.retrieveClickData == "function") {
    eventPayload.LinkValue = eventPayload.LinkValue || LBGAnalytics.navLinks.retrieveClickData();
  }
}
trackLinkClick(eventType, eventPayload);
```

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Assign ownership to a single developer or a small team to ensure consistent updates and troubleshooting. Regularly review the dependency on `LBGAnalytics`.
- **Testing Guidelines**: Implement unit tests focusing on scenarios where `LBGAnalytics` is defined/undefined and where `retrieveClickData()` returns valid data versus undefined or null.
- **Documentation Updates**: Maintain thorough documentation updates as changes are made, and establish a procedure for collecting developer feedback.

---

This document is intended to serve as a comprehensive guide for developers interacting with the AEM Link Tracking extension, ensuring clarity on implementation and functionality.