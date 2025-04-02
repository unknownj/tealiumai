# Tealium iQ Extension Documentation: Activity Map

## 1. Extension Overview

- **Name**: Activity Map
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: 928
- **Execution Frequency**: Active

### Summary
The Activity Map extension enhances tracking capabilities by modifying the DOM elements associated with specific links on a webpage. It assigns a `lpos` attribute to the parent elements of specified links, providing valuable context for analytics processes. This allows for better identification and segmentation of link interactions based on their position and content, effectively improving user activity tracking and engagement analysis.

## 2. Code Explanation

### Key Variables
- **activityMap**: A reference to the `ActivityMap` object from the global `u.o` namespace, which is used to manage link activities.
- **applyLinkSelectors**: An array of CSS selectors used to identify specific links (containing "apply" in their href) on the page.
- **linkExclusions**: A string of link text values that should be excluded from the activity mapping, preventing common terms from cluttering the data.

### Logic Flow
1. The `activityMap.regionIDAttribute` is set to `"lpos"`, indicating that the link position will be tracked.
2. A query is made to gather all elements matching the `applyLinkSelectors`.
3. For each selected link element:
   - The parent element is assigned a `lpos` attribute formatted with the index and link text, cleaned of excessive whitespace.
   - Any errors during this process are silently ignored to ensure robustness.
4. `activityMap.linkExclusions` is populated with common phrases to avoid unnecessary tracking. 
5. If a global `LBGAnalytics.activityMapExclusions` exists, it is merged with the existing exclusions.

### Dependencies
- **Global Objects**: The code depends on the presence of `window.LBGAnalytics` for any additional exclusions. It also uses standard DOM query selectors and manipulation methods.

## 3. Usage Examples

### Normal Conditions
- **Data Flow**: When users click links that match the defined selectors (e.g., `a[href*=apply.]`), the extension captures the link's text and its index in the list, updating the parent element with a `lpos` attribute. For instance, clicking an "Apply Now" link might result in its parent's attribute being set to `0. Apply Now`.

### Edge Conditions
- **Unhandled Elements**: The extension will ignore any links that do not match the selectors. Also, if the user clicks on a link not intended to be tracked (like exclusions), no `lpos` attribute will be set, maintaining data integrity.
- **Error Handling**: If, for some reason, the parent element does not exist or cannot have attributes set (due to structural changes), the extension will not throw errors, ensuring the page continues to function without issues.

## 4. Known Limitations & Gotchas

- **Link Exclusions**: The extension relies heavily on the accurate configuration of exclusions. If new terms need to be added or existing ones removed, manual updates are necessary.
- **Global Dependency**: The function checks for `window.LBGAnalytics` which, if absent, will not append any additional exclusions.
- **Potential Conflicts**: There may be conflicts with other scripts or extensions that modify the same elements or attributes, leading to unintended behaviours in the user interface.

## 5. Recommendations for Refactoring

- **Defensive Checks**: Although guaranteed availability of `eventType` and `eventPayload` are acknowledged, consider implementing checks for the existence of DOM elements to avoid performance hits.
- **Code Style**: Include comments for clarity on complex logical flows to enhance readability for future developers. 
- **Modularisation**: Functions should be broken down into smaller, reusable components. For example, the logic that sets `lpos` could be encapsulated in its function.
- **Error Logging**: While the current code does nothing on errors, consider logging these errors to a monitoring system for easier debugging.

## 6. Maintenance & Further Notes

- **Ownership**: Assign a primary individual or team responsible for maintenance, ensuring they keep track of future updates and potential bug fixes.
- **Testing Guidelines**: Regularly test the extension using various scenarios, including the addition and removal of links on the web page and ensuring the exclusion logic behaves correctly.
- **Documentation Updates**: Maintain this documentation as code changes occur, covering any new functionality or alterations in the logic flow.

---

This documentation should serve as a comprehensive guide for understanding and maintaining the Activity Map extension within Tealium iQ, providing clarity to current and future developers.