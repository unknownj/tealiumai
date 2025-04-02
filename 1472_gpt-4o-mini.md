# Tealium iQ Extension Documentation: Offsite Links

## 1. Extension Overview

- **Name**: Offsite Links
- **ID**: 1472
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The Offsite Links extension is designed to enhance user tracking on specific pages of the website by intercepting clicks on offsite links. When a link that meets predetermined criteria is clicked, an event is sent to LBGAnalytics to log the interaction. This provides valuable insights into user engagement with external resources, thereby informing marketing and content strategies.

---

## 2. Code Explanation

### Key Variables
- **`$`**: Represents a jQuery object, utilized for DOM manipulation and event handling.
- **`a[href]`**: Targets all anchor tags (`<a>`) with an `href` attribute in the DOM.
- **`utag.data.Brand`**: A global variable that holds the current brand's identifier.

### Logic Flow
1. **Function Definition**: The function `addOffsiteLinkTracking($)` is defined to encapsulate the tracking functionality.
2. **Filter Links**:
   - The first filter excludes links that don't contain a forward slash (`/`).
   - The second filter excludes links from the same hostname (e.g. scottish) or those that contain the brand or the term "insure-systems".
3. **Target Attribute**: The function sets the `target` attribute to `_blank` for links that do not already specify a target, ensuring they open in a new tab.
4. **Click Event**: On each qualifying link click, an event is sent to LBGAnalytics with details about the interaction.
5. **Conditional Execution**: The function checks if the current URL matches predefined paths before executing the tracking functionality.

### Dependencies
- **jQuery**: The code relies on the jQuery library for DOM manipulation and handling. It expects `window.clova2.$` to point to a jQuery object.

---

## 3. Usage Examples

### Normal Behaviour
1. **Scenario**: User visits the page at `/helpcentre/coronavirus` and clicks an offsite link.
   - The click event triggers and logs data to LBGAnalytics, including the text of the link and the `href`.
   
### Edge Conditions
1. **Scenario**: User clicks a link to an internal page (e.g., `https://scottishins.co.uk/about`).
   - The event is not sent to LBGAnalytics since the link does not meet the filtering criteria.

2. **Scenario**: User clicks a link which targets the same hostname (e.g., `https://scottishins.co.uk/contact`).
   - No event is sent as it is filtered out based on the hostname check.

---

## 4. Known Limitations & Gotchas

- The extension currently does not handle AJAX-loaded content. If offsite links are dynamically added to the DOM after the initial page load, they will not be tracked unless additional logic is implemented to re-trigger the `addOffsiteLinkTracking` function.
- If the `href` attribute is modified after the initial load (e.g., due to user interaction or scripts), the tracking event may not capture the final state.
- Be cautious of potential conflicts with other extensions that modify links or track click events as there could be duplicate events if multiple extensions are active on the same link.

---

## 5. Recommendations for Refactoring

- **Modularisation**: Consider breaking down the code into multiple smaller functions. For example, separate the filtering logic and event binding to enhance readability and maintainability.
- **Error Handling**: While the current error handling for the click event is minimal (`catch (e) { }`), consider logging errors to the console or external service for better debugging insights.
- **Performance**: Instead of using chaining like `.get().filter().map()`, process the elements in a single loop to improve performance, especially on pages with numerous links.

---

## 6. Maintenance & Further Notes

- **Ownership**: Designate a team or individual responsible for the ongoing maintenance of this extension. Regularly review the tracking criteria to ensure it still aligns with business objectives.
- **Testing**: Implement regular testing when deploying changes, especially across different pages and conditions to ensure the extension's functionality remains intact.
- **Documentation Updates**: Keep this documentation current with any changes to the extension code or general tracking strategy.

--- 

This comprehensive documentation captures all the relevant details about the Offsite Links extension and serves as a valuable resource for current and future developers interacting with the code.