# Tealium iQ Extension Documentation: Event Volume Counts

## 1. Extension Overview
- **Name:** Event Volume Counts
- **ID:** 1771
- **Type:** Javascript Code
- **Scope:** After Tag Extensions
- **Execution Frequency:** Run Always

### Summary
The Event Volume Counts extension is designed to collect and store event volume data in a global analytics object (`LBGAnalytics`). This enables tracking of various events within the system, allowing for effective monitoring and analysis of user interactions. By storing original event data in a structured way, this extension supports better reporting and insights into user behaviour, which is vital for behavioural analysis and marketing strategies.

## 2. Code Explanation
### Key Variables
- `window.LBGAnalytics`: A global namespace for the analytics object.
- `a`: Represents the event type or category (assumed to be previously defined elsewhere in the code).
- `b`: Represents the event payload (assumed to carry `OriginalEventData`).

### Logic Flow
1. The extension checks if `LBGAnalytics` is defined; if not, it initializes it as an empty object.
2. Similarly, it checks if `eventVolumes` is defined under `LBGAnalytics` and initializes it if it is not.
3. It then ensures that an array corresponding to the event type `a` exists in `eventVolumes`.
4. The `OriginalEventData` from the event payload `b` is pushed into the appropriate event volume array. If `OriginalEventData` is not found, it defaults to the string "Data not found".

### Dependencies
- **Global Object:** The extension depends on the `window` object to access `LBGAnalytics`. 
- No external libraries are required; it operates with vanilla JavaScript.

## 3. Usage Examples
### Normal Conditions
- **Scenario:** An event of type "click" is fired with original event data:
    ```javascript
    var a = "click"; 
    var b = { OriginalEventData: { elementId: "button1", action: "clicked" } };
    ```

    The extension stores the original event data as follows:
    ```javascript
    window.LBGAnalytics.eventVolumes[a].push(b.OriginalEventData);
    ```
    Output:
    ```javascript
    window.LBGAnalytics.eventVolumes.click;
    // [ { elementId: "button1", action: "clicked" } ]
    ```

### Edge Conditions
- **Scenario:** An event occurs without `OriginalEventData`:
    ```javascript
    var a = "submit"; 
    var b = {};
    ```

    The extension handles this by pushing "Data not found":
    ```javascript
    window.LBGAnalytics.eventVolumes[a].push(b.OriginalEventData || "Data not found");
    ```
    Output:
    ```javascript
    window.LBGAnalytics.eventVolumes.submit;
    // [ "Data not found" ]
    ```

## 4. Known Limitations & Gotchas
- **Global Namespace Conflicts:** If other scripts also use `LBGAnalytics`, it could lead to conflicts unless properly namespaced or handled.
- **Data Overwrites:** If multiple events of the same type occur in quick succession, data may overwrite or be missed if not managed appropriately.
- **No Event Type Validation:** The code assumes that the variable `a` (event type) is always defined correctly, which may lead to potential errors if misconfigured.

## 5. Recommendations for Refactoring
- **Defensive Checks:** Consider adding checks to ensure `a` and `b` are valid before processing them (e.g., ensure `b` is an object and not `null`).
- **Commenting:** Add comments to clarify the purpose of variables and functions to enhance code readability.
- **Encapsulation:** If possible, encapsulate the functionality within a dedicated function to avoid potential global scope pollution.
- **Use of Named Constants:** Create constants for common strings or status messages to avoid hardcoding within the code.

## 6. Maintenance & Further Notes
- **Ownership:** Assign a primary owner or team responsible for this extension to manage updates and changes.
- **Testing Guidelines:** Regularly test the extension under various event scenarios to ensure it behaves as expected across different environments.
- **Logging:** Implement logging for better auditing of events captured to aid in troubleshooting and performance monitoring.

This documentation should serve as a comprehensive guide for understanding, using, and maintaining the Event Volume Counts extension within the Tealium iQ framework.