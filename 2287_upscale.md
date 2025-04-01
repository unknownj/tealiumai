# AEM Hub Events POC Extension Documentation

This document provides a comprehensive overview of the “AEM Hub Events POC” extension within Tealium iQ. It is written in GitHub-flavoured Markdown and intended for British English audiences.

---

## 1. Extension Overview

- **Name**: AEM Hub Events POC  
- **Extension ID**: 2287  
- **Type**: JavaScript Code  
- **Scope**: DOM Ready  
- **Execution Frequency**: Run Once  

**Summary**  
This extension listens for clicks on custom links (specifically those whose `href` attribute begins with `nga:`) on pages whose URL path contains `/secure-aem-hub/`. After waiting three seconds, it attaches event listeners to these links. When any of these links is clicked, the extension sends information about the click action to `LBGAnalytics` for tracking external link usage.

---

## 2. Code Explanation

Below is the core JavaScript code included in the extension (with explanatory comments added):

```js
if (window.location.pathname.indexOf("/secure-aem-hub/") >= 0) {
  setTimeout(function () {
    try {
      // Identify any anchor tags with an href that starts with 'nga'
      Array.from(document.querySelectorAll("a[href^=nga]")).forEach(function (a) {

        // Set up click listener for each matching link
        a.addEventListener("click", function (ev) {
          try {
            // Send event data to LBGAnalytics
            LBGAnalytics.events.send({
              EventAction: "External Click",
              EventNarrative:
                a.getAttribute("href").split(":").splice(1).join(":") +
                " (" + a.textContent + ")"
            });
          } catch (e) {
            // Suppress any errors from LBGAnalytics or the event sending
          }
        });
      });
    } catch (e) {
      // Suppress any unexpected errors during link selection
    }
  }, 3000);
}
```

### Key Variables and Logic Flow

1. **Window Location Check**  
   The extension first checks `window.location.pathname` to see whether the current page’s path contains the substring `/secure-aem-hub/`. If it does not, the extension does nothing.

2. **setTimeout (3000ms)**  
   Once the path condition is satisfied, a `setTimeout` waits for three seconds before running the link-binding logic. This delay can help ensure that the relevant DOM elements are fully loaded, especially if other scripts or dynamic content are still loading.

3. **Link Selection**  
   The code uses `document.querySelectorAll("a[href^=nga]")` to find all anchor elements (`<a>`) where the `href` attribute begins with `nga`. This effectively targets links that have a custom protocol or reference.

4. **Event Listener Attachment**  
   For each matching anchor, a “click” event listener is attached. When such a link is clicked, the code:
   - Retrieves the full `href`.
   - Splits the `href` on the colon character (`:`) to reshape the string.
   - Appends the text content of the link (`a.textContent`) into the message.
   - Sends an event object to `LBGAnalytics.events.send()`, specifying:
     - **EventAction**: "External Click"
     - **EventNarrative**: A string that includes any parts after the protocol plus the link text in parentheses.

5. **Global Dependencies**  
   - **`LBGAnalytics.events`**: A global object assumed to be available in the page context. The extension uses `LBGAnalytics.events.send()` to dispatch tracking data.

6. **Error Handling**  
   - `try...catch` blocks are used to suppress any runtime errors (e.g., if `LBGAnalytics` is not present). This prevents script failure but may mean events are silently not tracked if the library is missing.

---

## 3. Usage Examples

### 3.1 Normal Scenario
1. A page’s URL is https://www.example.com/secure-aem-hub/page.  
2. The content contains several links with hrefs such as:  
   - `<a href="nga:custom-scheme:SomeLink">My Secure Link</a>`  
3. After the page has loaded, three seconds pass.  
4. The extension finds and attaches a click listener to each `nga:...` link.  
5. When a user clicks on “My Secure Link”, `LBGAnalytics.events.send()` is called with:  
   ```js
   {
     EventAction: "External Click",
     EventNarrative: "custom-scheme:SomeLink (My Secure Link)"
   }
   ```

### 3.2 Edge Scenario (No Matching Links)
- The page is still under `/secure-aem-hub/` but contains no links with an `href` starting with `nga`.  
- The code runs the `setTimeout`, tries to attach listeners, and finds none.  
- No events are tracked because there are no matching anchors.

### 3.3 Outside the /secure-aem-hub/ Path
- If the page URL does not contain `/secure-aem-hub/`, the initial `if` condition is not met.  
- The entire code block within the `if` statement is skipped, so no click listeners are attached and no events are sent.

---

## 4. Known Limitations & Gotchas

1. **Dependency on `LBGAnalytics`**  
   - The extension expects `LBGAnalytics.events.send()` to exist and function correctly. If this library is absent or not fully loaded, the click events will not be tracked.  
   - Errors inside the `LBGAnalytics.events.send()` call are safely caught by a `try...catch` block, preventing any JS breakage but also swallowing diagnostic messages.

2. **Hard-Coded Delay**  
   - There is a three-second delay (`setTimeout`) before link listeners are attached. If a user clicks an `nga` link within those three seconds (e.g., page loads quickly, user clicks instantly), the event will not be recorded.  
   - Decreasing the timeout could reduce missed clicks, but might risk missing links added by slower scripts.

3. **Use of `Array.from()`**  
   - The code uses `Array.from()`, which can be problematic in older browsers if no polyfill is available. This is relevant when supporting pure ES5 environments. If older browsers must be supported without transpilers or polyfills, consider an alternative iteration approach (e.g., a simple `for` loop).

4. **Potential Overlap with Other Extensions**  
   - If other extensions or external scripts also bind click listeners to the same links, there could be conflicts or multiple event triggers. Tealium does not specifically manage or queue multiple event listeners that target the same element.

5. **Silent Failures**  
   - Because most of the logic is inside `try...catch` blocks, potential code issues remain undiagnosed. This can hide underlying problems that might otherwise be surfaced in debugging logs.

---

## 5. Recommendations for Refactoring

1. **Reduce or Conditionally Remove `setTimeout`**  
   - Since the extension is already scoped to DOM Ready, consider removing or reducing the three-second delay. In many cases, DOM Ready indicates the DOM is stable enough to attach listeners immediately.

2. **Graceful Fallback for `Array.from()`**  
   - To maximise compatibility with purely ES5-compliant environments, replace the `Array.from(document.querySelectorAll(...))` usage with a more traditional loop, for example:
     ```js
     var links = document.querySelectorAll("a[href^=nga]");
     for (var i = 0; i < links.length; i++) {
       // Attach event listener
     }
     ```
   - This avoids any need for a polyfill and ensures better browser support.

3. **Optimise Error Handling**  
   - Instead of catching all errors in a blanket manner, consider logging them to the console (if available). This will help diagnose issues in test environments without affecting live environments, although it is understandable if the intention is to hide or suppress error messages.

4. **Code Clarity**  
   - While the logic is relatively simple, moving parts of it into small helper functions can improve readability and make future changes easier. For instance:
     - A helper function to filter and collect links.  
     - A helper function to attach event listeners.  
     - A helper function to construct the event payload and send it.

5. **Maintain Strict ES5 Compliance**  
   - Continue to avoid ES2015+ features like arrow functions, `let`, `const`, template literals, or default parameters if the environment does not support them.  

---

## 6. Maintenance & Further Notes

1. **Ownership and Responsibility**  
   - This extension should have a designated owner who manages updates or fixes, especially if the page structure or link protocols change.  
   - Regularly verify that `LBGAnalytics` is still the correct analytics vendor or library if the organisation’s analytics approach evolves.

2. **Testing Guidelines**  
   - Test on pages that do and do not include the `/secure-aem-hub/` path to ensure the extension respects the condition.  
   - Verify clicks on multiple `nga` links to confirm events are correctly dispatched.  
   - Confirm that the event payload in `LBGAnalytics.events.send()` matches expected naming conventions and data requirements.

3. **Future Updates**  
   - If the three-second delay proves problematic, revisit whether a DOM-ready approach (or a specific custom event that signals all elements are loaded) better suits the environment.  
   - As the website evolves, ensure that the `a[href^=nga]` selector remains valid. If new protocols or link types require tracking, the logic should be extended or reconfigured.

---

**Last Updated**: This documentation reflects the extension code at the time of writing and should be reviewed periodically to ensure accuracy as site requirements and analytics frameworks evolve.