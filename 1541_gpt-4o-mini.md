# Tealium iQ Extension Documentation: AEM c-404 Calendar Component

## 1. Extension Overview
- **Name**: AEM c-404 calendar component
- **ID**: 1541
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The AEM c-404 calendar component extension captures click events on calendar links found within a designated `div` element and tracks these interactions using the LBG Analytics library. When a user clicks on a calendar link, the event's title, calendar type, and corresponding file information are sent to the analytics tracking system. This allows for better understanding of user engagement with calendar components, enhancing data collection for analytics.

## 2. Code Explanation

### Key Variables
- `var $ = LBGAnalytics.$;`  
  This assigns the jQuery-like function from the LBGAnalytics library to the variable `$`.

### Logic Flow
1. The extension selects all `div` elements with the class `c-404-add-to-calendar`.
2. It iterates over each of these elements.
3. Inside each selected element, it binds a click event to anchor (`a`) tags that have a `target` attribute.
4. On the click event:
   - It retrieves the event title from a nested `span` with class `cal-event`.
   - It captures the text of the clicked link to determine the type of calendar (e.g., Google Calendar, Outlook).
   - It gets the filename (URL) from the link's `href` attribute.
   - It constructs a label for the tracking event.
   - It configures the context and file type for analytics tracking.
5. If the `download` method in the LBGAnalytics.events is available, it triggers the send action with the constructed data.

### Dependencies
- **LBGAnalytics**: The code assumes the existence of the LBGAnalytics library which must include a `$` selector function and an `events.download` method to properly interact with analytics.

## 3. Usage Examples

### Scenario 1: Normal Flow
1. A user clicks on a link labelled "Add to Google Calendar".
2. The extension finds the parent `div`, extracts the event title (e.g., "Team Meeting").
3. It records an analytics event with the label "Add Google Calendar: Team Meeting".

### Scenario 2: Edge Cases
- If there are multiple calendar links in the component, each click correctly registers an individual event without interfering with others.
- Clicking a link that does not have a `target` attribute does not trigger any analytics call, thus avoiding unnecessary data submission.

## 4. Known Limitations & Gotchas
- If the structure of the HTML changes (e.g., renaming classes or changing nesting of elements), the extension may fail to find the required values leading to broken functionality.
- This extension relies heavily on the LBGAnalytics library being loaded and available globally. Any issues arising from this library may affect the performance of the extension.

## 5. Recommendations for Refactoring
1. **Defensive Checks**: While direct checks on the presence of `eventType` and `eventPayload` are unnecessary, you may want to consider validating the existence and correctness of the URL (e.g., checking if it's a properly formatted link).
   
2. **Code Style**: Maintain consistent use of indentation and whitespace for improved readability.
   
3. **Modularization**: Consider breaking up repetitive code into functions for reusability. For example, extracting the event tracking logic into a separate function that can be called with different parameters.

### Suggested Code Snippet for Modularisation
```javascript
function trackEvent(link, calendarType, eventTitle) {
  var filename = link.attr("href");
  var label = "Add " + calendarType + ": " + eventTitle;
  var context = "Add to Calendar";
  var filetype = "cal";

  if (LBGAnalytics.events.download) {
    LBGAnalytics.events.download(filename, label, context, filetype).send();
  }
}
```

## 6. Maintenance & Further Notes
- **Ownership**: Assign a specific developer or team responsible for maintaining this extension, ensuring they are knowledgeable about both the code and the LBGAnalytics library.
- **Testing Guidelines**: Regularly test the extension in staging environments whenever changes are made to the site or LBGAnalytics to ensure continued functionality.
- **Documentation Updates**: Any changes to the code should be mirrored with updates to this documentation so that it remains a reliable resource for current and future developers. 

By adhering to these guidelines, developers can ensure that the AEM c-404 calendar component remains functional and effective for tracking user interactions.