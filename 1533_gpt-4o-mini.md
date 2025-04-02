# Tealium iQ Extension Documentation: Kulu Valley Temp Fix

## 1. Extension Overview

- **Name**: Kulu Valley Temp Fix
- **ID**: 100040
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The "Kulu Valley Temp Fix" extension is designed to modify hyperlink attributes on the webpage that contain specific query parameters. Specifically, it targets anchor (`<a>`) elements whose `href` attribute includes both the substring "kulu" and the query string "?optout". This extension removes the query string from the `href`, which is important for ensuring that users are not tracked or opted out when they interact with these links. By doing so, it helps in preserving user privacy and correcting tracking issues.

## 2. Code Explanation

### Key Variables
- **`$`**: This is assigned from the global object `LBGAnalytics`. It represents a jQuery-like function that is used to select DOM elements.
- **`LBGAnalytics.intervals`**: This object is checked and initialized if it doesn't exist, allowing the code inside to manage intervals reliably.
- **`kuluvalley`**: This is a named interval set to run a specific function every second, used for detecting and altering link attributes.

### Logic Flow
1. **Initial Setup**: The code initializes an interval that will execute every 1000 milliseconds (or 1 second).
2. **Check jQuery Availability**: If the jQuery-like `$` is not available (undefined or null), the execution of the interval function is halted immediately.
3. **Link Selection and Modification**:
   - The interval function selects all anchor (`<a>`) elements where the `href` attribute contains both "kulu" and the query string "?optout".
   - For each matched element, it retrieves the current `href`, splits the string at the "?" and keeps only the first part (the base URL).
   - The `href` attribute of the element is updated to this new value without the query string.

### Dependencies
- The code depends on the global `LBGAnalytics` object, which must be correctly configured to ensure that `$` functions as intended. This indicates the use of a jQuery-like library, so additional dependencies such as jQuery are not needed.

## 3. Usage Examples

### Normal Condition
When the extension is running normally, any links in the document that match the criteria will have their `href` attributes modified. For instance, a link initially defined as:

```html
<a href="https://example.com/kulu?optout=true">Opt-out Link</a>
```

Will be modified to:

```html
<a href="https://example.com/kulu">Opt-out Link</a>
```

### Edge Condition
If there are no links matching the specified criteria or if the `$` object is not defined, the extension will simply not modify any links. This means:
- An empty set of links will not cause errors, and the interval function will exit early.
- If the interval is not clearing, it may cause performance issues after prolonged usage.

## 4. Known Limitations & Gotchas

- The interval is set to run indefinitely every second. If there are performance concerns, modifications may be required to either clear the interval once it's no longer necessary or manage its execution more efficiently.
- If other scripts manipulate the same anchor elements simultaneously, there could be conflicts or unexpected behaviours due to race conditions.
- If the `href` strings contain additional query strings after "?optout", those will not be preserved, which may lead to loss of desired tracking parameters.

## 5. Recommendations for Refactoring

- **Modularisation**: Consider encapsulating the link modification logic within its own function that can be called as needed, allowing greater flexibility in controlling its execution.
  
```javascript
function modifyOptoutLinks() {
  if (!$) return; 
  $("a[href*=kulu][href*=\\?optout]")
    .each(function (i, e) {
      $(e).attr(
        "href",
        $(e).attr("href").split("?")[0]
      );
    });
}
```

- **Clearing the Interval**: Introduce a mechanism to clear the interval after its first successful run (once all the necessary links are updated), thereby preventing unnecessary repeated executions.

```javascript
var intervalId = setInterval(function () {
  modifyOptoutLinks();
  clearInterval(intervalId); // Clears interval after first run
}, 1000);
```

- **Comments/Documentation**: Ensure that comments are present in the code to describe complex sections of logic, improving maintainability.

## 6. Maintenance & Further Notes

- **Ownership**: Assign a dedicated developer or team to oversee ongoing maintenance, ensuring that the code aligns with evolving tracking requirements and privacy standards.
- **Testing Guidelines**: Regularly test the extension on various browsers and devices to ensure consistent behaviour. Automated tests could be useful to capture regressions or integration issues with other parts of the site.
- **Documentation Updates**: Keep this documentation updated based on any changes made to the codebase in future iterations to ensure clarity for new developers or stakeholders who may work with this extension.

---

This documentation is intended to aid developers and stakeholders in understanding and effectively managing the Kulu Valley Temp Fix extension within the Tealium iQ platform. Regular reviews and updates will help maintain its effectiveness and compliance with tracking practices.