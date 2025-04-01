# NGA Webchat Integration – Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: NGA Webchat Integration  
- **Extension ID**: 100036  
- **Type**: JavaScript Code  
- **Scope**: Tag-Specific (ID 1657)  
- **Execution Frequency**: Triggered each time the associated Tag fires  

**Summary**:  
This extension enables integration between Tealium iQ data layer events and a global object called `window.JSBridge`, specifically using the method `updateNgaValue`. The extension takes a `SectionID` string from the event payload, splits it into an array, and passes it as a JSON string into the `updateNgaValue` method of `window.JSBridge`. This allows third-party scripts or components (such as a webchat interface) to handle changes or updates related to messaging sections dynamically.

## 2. Code Explanation

Below is the full extension code:

```js
// {
//   "conditions": [],
//   "extensionId": 100036,
//   "extensionType": "Javascript Code",
//   "id": 2099,
//   "library": null,
//   "loadRule": null,
//   "name": "NGA Webchat Integration",
//   "notes": "",
//   "occurrence": null,
//   "scope": "1657",
//   "status": "active"
// }

(function(a, b, u){
    if (window.JSBridge && typeof window.JSBridge.updateNgaValue === "function") {
        console.log("Setting messagingSection in JSBridge");
        window.JSBridge.updateNgaValue(
            "messagingSection",
            JSON.stringify(b.SectionID.split(","))
        );
    }
})(eventType, eventPayload, tagObject);
```

### Key Variables

- **`(a, b, u)`**: The immediately invoked function expression (IIFE) receives three parameters:
  - `a` corresponds to the `eventType` (string).
  - `b` corresponds to the `eventPayload` (object).
  - `u` corresponds to the `tagObject` (object).
  
- **`b.SectionID`**: A comma-separated string of messaging section IDs. The code calls `b.SectionID.split(",")` to convert this string into an array.

### Logic Flow

1. **Check for JSBridge**:  
   The extension first checks if `window.JSBridge` exists and if it has the method `updateNgaValue`. If either is missing, the extension does nothing.

2. **Call `updateNgaValue`**:  
   If `updateNgaValue` is available, the extension logs a message to the console and then calls:  
   ```js
   window.JSBridge.updateNgaValue(
     "messagingSection",
     JSON.stringify(b.SectionID.split(","))
   );
   ```  
   - The first argument, `"messagingSection"`, identifies the type of update.  
   - The second argument is the JSON stringified array derived from splitting `SectionID` on commas.

3. **No Return Value**:  
   This extension does not return any value; its purpose is purely to call a function on `window.JSBridge`.

### Dependencies

- **Global Object**:  
  Relies on the presence of `window.JSBridge` with a callable method `updateNgaValue`.  
- **Data Layer**:  
  Requires the `SectionID` field in the event payload (`b.SectionID`). Lack of this field or an unexpected data format could affect functionality (though the Tealium environment guarantees `eventPayload` structure in this scenario).

## 3. Usage Examples

### Normal Scenario (Valid `SectionID`)

1. **Data Layer**:  
   ```json
   {
     "eventType": "chat_initiated",
     "SectionID": "sectionA,sectionB,sectionC"
   }
   ```

2. **Extension Execution**:  
   - The code splits `"sectionA,sectionB,sectionC"` into `["sectionA", "sectionB", "sectionC"]`.
   - Calls:
     ```js
     window.JSBridge.updateNgaValue(
       "messagingSection",
       "[\"sectionA\",\"sectionB\",\"sectionC\"]"
     );
     ```
   - Console output:
     ```
     Setting messagingSection in JSBridge
     ```

### Edge Scenario (Empty `SectionID`)

1. **Data Layer**:  
   ```json
   {
     "eventType": "chat_initiated",
     "SectionID": ""
   }
   ```

2. **Extension Execution**:  
   - The code splits `""` into `[""]` (an array with one empty string).  
   - Calls:
     ```js
     window.JSBridge.updateNgaValue("messagingSection", "[\"\"]");
     ```
   - Depending on the logic in `window.JSBridge.updateNgaValue`, this may or may not be a meaningful update.  

### Edge Scenario (Multiple Commas)

1. **Data Layer**:  
   ```json
   {
     "eventType": "chat_initiated",
     "SectionID": "sectionA,,sectionC"
   }
   ```

2. **Extension Execution**:  
   - Splits the string on commas to get `["sectionA", "", "sectionC"]`.  
   - Calls:
     ```js
     window.JSBridge.updateNgaValue(
       "messagingSection",
       "[\"sectionA\",\"\",\"sectionC\"]"
     );
     ```
   - Results in an array that includes an empty value for the double comma.

## 4. Known Limitations & Gotchas

- **Dependency on `window.JSBridge`**:  
  If `window.JSBridge` or `window.JSBridge.updateNgaValue` is not defined, the extension will skip execution. This is by design, but it means no updates occur under such circumstances.

- **`SectionID` Format**:  
  This code assumes that `b.SectionID` is a comma-separated list of strings. If `SectionID` does not exist or is not in the expected format (e.g., null, non-string), the `.split(",")` call may not behave as intended.

- **Potential Conflicts**:  
  - If another extension or script modifies or overwrites `window.JSBridge`, it could disrupt this functionality.  
  - If other extensions manipulate `SectionID` prior to this extension's run, unexpected values could be passed to `updateNgaValue`.

## 5. Recommendations for Refactoring

- **Conditional Checks**:  
  Although we do not add defensive checks for `eventType` or `eventPayload` (as guaranteed by Tealium), it may be beneficial to gracefully handle an unexpected `SectionID` to avoid console errors from `.split()`. For instance:  
  ```js
  var sectionIdString = b.SectionID || "";
  var sectionArray = sectionIdString.split(",");
  ```

- **Logging**:  
  If console clutter is a concern, consider removing or minimising `console.log` statements, or replacing them with Tealium's debug logging (if available).

- **Modularisation**:  
  To improve maintainability, you could move the core logic for updating `window.JSBridge` into a separate helper function within the same code block. For example:  
  ```js
  function updateMessagingSection(sectionIdString) {
      if (window.JSBridge && typeof window.JSBridge.updateNgaValue === "function") {
          window.JSBridge.updateNgaValue(
              "messagingSection",
              JSON.stringify(sectionIdString.split(","))
          );
      }
  }

  (function(a, b, u) {
      console.log("Setting messagingSection in JSBridge");
      updateMessagingSection(b.SectionID);
  })(eventType, eventPayload, tagObject);
  ```
  Note: Careful to remain in ES5 (using `var`, standard function definitions, etc.).

## 6. Maintenance & Further Notes

- **Ownership & Responsibility**:  
  Identify a team or individual responsible for `window.JSBridge` integrations. Their coordination is key to ensuring that updates to `JSBridge` do not break this extension.

- **Testing Guidelines**:  
  - Validate that the extension triggers only when attaching to the correct tags or load rules.  
  - Test various `SectionID` payloads (including edge cases like empty strings, missing fields, multiple commas) to ensure stability.  
  - Periodically confirm that `window.JSBridge.updateNgaValue` remains available and functions as expected after library or site updates.

- **Ongoing Maintenance**:  
  - Keep documentation current if `SectionID` semantics or `JSBridge` integration changes over time.  
  - Monitor console output for error messages that might arise if the environment changes.

---

**Last Updated**: Please update this documentation whenever the extension logic or usage changes.