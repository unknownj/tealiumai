# Tealium iQ Extension Documentation: WTA : Passthrough Parameters

## 1. Extension Overview
- **Name**: WTA : Passthrough Parameters
- **ID**: 1090
- **Type**: Javascript Code
- **Scope**: 894
- **Execution Frequency**: Active

### Summary
The **WTA : Passthrough Parameters** extension processes user-defined objects (UDOs) to map elements prefixed with "WTP:" to specified parameters. This allows seamless integration of custom data into analytics tags by stripping the prefix and forwarding the remaining portion as the parameter name.

---

## 2. Code Explanation

### Key Variables
- **`a` (eventType)**: The type of event being processed (e.g., `link`, `view`).
- **`b` (eventPayload)**: The payload object containing UDO elements for processing.
- **`u` (tagObject)**: The object used to map the resulting parameters for tagging.

### Logic Flow
1. The function is invoked with three arguments: `eventType`, `eventPayload`, and `tagObject`.
2. The function iterates through each key in the `eventPayload` object.
3. For every key that starts with "WTP:", the following occurs:
   - The key is mapped to a parameter by removing the "WTP:" prefix.
   - The resultant key is added to the `tagObject` map, allowing it to be sent onward to the respective analytics platform.

```javascript
for (var k in b) {
  if (k.indexOf("WTP:") === 0) {
    u.map[k] = k.substr(4); // Removes 'WTP:' and maps the remaining string
  }
}
```

### Dependencies
- Utilises global variables provided by the Tealium iQ platform (`eventType`, `eventPayload`, `tagObject`).
- No external libraries are required.

---

## 3. Usage Examples

### Normal Condition
Assuming the `eventPayload` contains the following:
```javascript
{
  "WTP:WT.ti": "This is a page title",
  "WT.event": "pageview"
}
```
The extension will transform it to:
```javascript
tagObject.map["WT.ti"] = "This is a page title";
```

### Edge Condition
If the `eventPayload` does not contain any keys that start with "WTP:", for instance:
```javascript
{
  "WT.event": "pageview"
}
```
No mapping occurs, and the `tagObject.map` remains unaffected.

---

## 4. Known Limitations & Gotchas
- **Lack of Validation**: The extension does not validate the content of the UDO elements mapped, which could lead to unintended results if improperly formatted data is passed.
- **Naming Conflicts**: If multiple elements in the payload begin with "WTP:", they may overwrite each other in the `tagObject.map`.
- **No Error Handling**: The extension does not include error handling, which may lead to silent failures if unexpected data structures are provided.

---

## 5. Recommendations for Refactoring
- **Defensive Programming**: While not mandatory, consider adding checks to validate the expected structure of `eventPayload`.
- **Iterate with `hasOwnProperty`**: Use `b.hasOwnProperty(k)` within the loop to avoid processing inherited properties.
- **Modularisation**: Consider breaking down the mapping logic into a separate function for improved readability and modular testing.

### Example of Separation
```javascript
function mapPassthroughParameters(eventPayload, tagObject) {
    for (var k in eventPayload) {
        if (eventPayload.hasOwnProperty(k) && k.indexOf("WTP:") === 0) {
            tagObject.map[k.substr(4)] = eventPayload[k];
        }
    }
}
```

---

## 6. Maintenance & Further Notes
- **Ownership**: Designate a primary developer or team responsible for the maintenance of this extension to ensure timely updates and modifications.
- **Testing**: Implement unit tests to validate the extension's behaviour under various conditions. Ensure to cover scenarios with both valid and invalid `eventPayload` structures.
- **Documentation Updates**: Regularly review and update this documentation whenever changes or enhancements are made to the extension.

---

This structured documentation aims to provide relevant developers and stakeholders with a comprehensive understanding of the **WTA : Passthrough Parameters** extension, its functionality, and best practices for implementation and maintenance.