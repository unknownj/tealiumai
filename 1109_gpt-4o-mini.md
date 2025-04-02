# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Disable Webtrends tag after 200 events per page
- **ID**: 1109
- **Type**: Advanced Javascript Code
- **Scope**: 894
- **Execution Frequency**: On each tracked event

### Summary
This extension is designed to manage the number of events sent to Webtrends by disabling the Webtrends tag after a threshold of 200 events has been reached on a page. The primary goal is to prevent the excessive firing of events that could overwhelm the analytics server and lead to data inaccuracies or performance issues.

## 2. Code Explanation

### Key Variables
- **window.utag.eventCounter**: A global variable that keeps track of the number of events triggered on the page. It is initialized to zero if it does not already exist.

### Logic Flow
1. The extension runs immediately upon being triggered by an event.
2. The event counter (`window.utag.eventCounter`) is incremented by 1 each time an event occurs.
3. A conditional check verifies if the `eventCounter` has exceeded the limit of 200.
4. If the limit is exceeded, the function returns `false`, which effectively disables the Webtrends tag from firing further events.

### Dependencies
- The extension relies on the global `window.utag` object, which is part of the Tealium Universal Tag framework. No external libraries are required for this code; it operates solely within the context of the Tealium iQ environment.

## 3. Usage Examples

### Normal Flow
- A user triggers various events (e.g., page views, button clicks).
- As events fire, they increment the `window.utag.eventCounter`.

### Edge Conditions
- After 200 events, the `window.utag.eventCounter` becomes 201:
  - At this point, any subsequent events will not trigger the Webtrends tag since the extension returns `false`. 
  - Events will continue to be counted but will not be sent to Webtrends.
- If a user refreshes the page, the `eventCounter` will persist, starting again from the last recorded count unless explicit logic is introduced to reset it on page load.

## 4. Known Limitations & Gotchas

- **Limit on Event Firing**: Users may unknowingly trigger events that exceed the threshold, leading to loss of potentially important analytics data.
- **Page Reload Behaviour**: The counter persists even with page reloads, which may lead to confusion if users are unaware that the threshold applies to cumulative events rather than per session.
- **Potential Conflicts**: If other scripts interact with `window.utag` or manipulate the `eventCounter`, this could result in unexpected behaviours.

## 5. Recommendations for Refactoring

- **Defensive Checks**: While not necessary for variables guaranteed to exist, consider implementing checks for the presence of `window.utag` to ensure that there are no unintended errors if the script is misconfigured.
- **Code Style**: Maintain consistent spacing and indentation for readability.
- **Modularity**: While this extension is compact, consider separating the counting logic into a dedicated function. This could improve readability and make future modifications easier.

Example:
```javascript
(function(a,b,u) {
    function incrementEventCounter() {
        window.utag.eventCounter = (window.utag.eventCounter || 0) + 1;
    }
    
    incrementEventCounter();
    if (window.utag.eventCounter > 200) return false;
})(eventType, eventPayload, tagObject);
```

## 6. Maintenance & Further Notes

- **Ownership**: Assign ownership of the extension to a specific member of the analytics or development team to ensure accountability for updates and maintenance.
- **Testing Guidelines**: Ensure that rigorous testing is performed in a staging environment to simulate event triggering and validate that the 200-event cap accurately controls the tag firing.
- **Documentation Update**: Maintain this documentation to reflect any changes made to the extension over time. It is critical to ensure that both the technical and functional aspects are consistently documented for clarity among developers and stakeholders.

By adhering to these guidelines, the extension can effectively manage the flow of events to Webtrends, ensuring data quality while maintaining performance.