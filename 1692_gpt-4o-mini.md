# SR Icons Extension Documentation

## 1. Extension Overview

- **Name**: SR Icons
- **ID**: 1692
- **Type**: Javascript Code
- **Scope**: 928
- **Execution Frequency**: On every page load (based on randomness)

### Summary

The **SR Icons** extension is designed to randomly select an image from specific elements on the webpage that match the selectors `img.sn-sr-accordion-title-accordion-image` and `img.sn-sraov-img`. Upon selection, it sets two properties (`prop61` and `prop62`) in the `s` object of Adobe Analytics. The extension operates under a 1% probability, ensuring that it collects data related to spending reward icons, thereby enabling more targeted analytics and insights regarding user interactions with these elements.

---

## 2. Code Explanation

### Key Variables

- **`a`, `b`, `u`**: Parameters representing the event type, event payload, and tag object respectively in the wrapper function.
- **`img`**: Array of image elements selected from the DOM based on the specified selectors.
  
### Logic Flow

1. The function checks if the `s` object is available and if `prop61` and `prop62` are not already set, alongside a random condition to ensure the block executes approximately 1% of the time.
2. Retrieves the images matching the specified selectors and stores them in the `img` array.
3. A random image is then selected from this array:
   - The selected image is removed from the `img` array and processed.
   - Its `alt` attribute and the parsed source URL (from `src` attribute) are combined and assigned to `s.prop62`.
   - The fixed string "Spending Rewards Icon" is assigned to `s.prop61`.

### Dependencies

- Utilises jQuery for DOM manipulation, specifically the `$` function for selection and `get()` method to transform jQuery objects into an array of DOM elements.

---

## 3. Usage Examples

### Normal Scenario

- On a typical webpage load, the extension executes with a 1% probability. If the conditions are satisfied and an image is found:
  - An image with `class="sn-sr-accordion-title-accordion-image"` or `class="sn-sraov-img"` may be selected.
  - For example, if an image element has:
    - `alt="Reward Image"`
    - `src="https://example.com/image.png?size=large"`
  - The properties would be set as:
    - `s.prop61 = "Spending Rewards Icon"`
    - `s.prop62 = "Reward Image !! image.png"`

### Edge Condition

- If no matching images exist on the page or the random check does not pass, no properties will be set, and the extension will effectively skip processing.
- The function will do nothing without causing errors, as all operations depend on conditions being met.

---

## 4. Known Limitations & Gotchas

- **Dependence on jQuery**: The extension requires jQuery to be loaded on the page. If jQuery is not present, it will fail silently as it relies on jQuery's `$` for selecting elements.
- **Randomisation**: With only a 1% execution probability, the data collection is limited and may not represent overall user interactions firmly.
- **Property Overwrite**: If multiple images are present, repeated executions can lead to the constant updating of `s.prop61` and `s.prop62` with potentially different values, which may cause inconsistency in reporting.
- **Potential conflicts**: Other extensions manipulating the `s` object or competing for analytics properties may lead to unexpected results.

---

## 5. Recommendations for Refactoring

- **Encapsulation**: Consider wrapping the core functionality into a named function for better readability and testability.
- **Error Handling**: Include checks to log a warning when no images are found, to facilitate debugging when a valid state is expected.
- **Code Style**: Maintain consistent formatting and indentation. Consider using descriptive variable names instead of single letters for clarity.
   ```javascript
   var selectedImages = /*...*/; // instead of img
   ```
- **Avoid Global Dependencies**: Explicitly pass or check for `jQuery` to reduce unintentional reliance on it being globally available.

---

## 6. Maintenance & Further Notes

- **Ownership**: Define a clear owner for this extension within the team who will be responsible for updates and maintenance.
- **Testing Guidelines**: Implement testing under various scenarios, particularly focusing on page loads with different numbers of matching image elements. Ensure that the randomness behaves as expected.
- **Documentation Updates**: Maintain documentation clarity by updating this document whenever the extension logic or its dependencies change. Include any changes to randomisation settings, new selectors, or dependencies.

--- 

This structured documentation should provide a comprehensive overview for developers and stakeholders to understand, maintain, and extend the functionality of the **SR Icons** extension within Tealium iQ.