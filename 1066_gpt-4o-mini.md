# Tealium iQ Extension Documentation: Fire Tag Once

## 1. Extension Overview

- **Name**: Fire Tag Once
- **ID**: 1066
- **Type**: Javascript Code
- **Scope**: 893, 1214, 995
- **Execution Frequency**: Active

### Summary
The "Fire Tag Once" extension is designed to ensure that a specific tag within the Tealium environment is executed only a single time during the lifecycle of an event. This is crucial in preventing duplicate data submissions or redundant actions triggered by the same event, thereby maintaining data integrity and efficiency in tag management.

## 2. Code Explanation

### Key Variables
- **`a` (eventType)**: This represents the type of event that triggers the extension (e.g., "page_view", "click").
- **`b` (eventPayload)**: This object holds the details pertinent to the event, such as data attributes associated with the action.
- **`u` (tagObject)**: This object is passed from Tealium and contains a property, `loaded`, which indicates whether the tag has already been executed.

### Logic Flow
1. The function immediately checks if the tag associated with the extension has already been loaded by examining the `u.loaded` flag.
2. If `u.loaded` is `true`, the function exits and prevents any further action, effectively stopping the extension from executing the tag more than once.
3. If the tag has not been loaded, the function sets `u.loaded` to `true`, marking it as executed for the current event.

### Dependency
- The extension depends on the `tagObject` passed by Tealium, which is expected to have the `loaded` property defined. No other global libraries or JavaScript features are used.

## 3. Usage Examples

### Normal Condition
When a user triggers an event designated as "page_view":
- On the first trigger, the function executes, checks `u.loaded`, finds it `false`, sets it to `true`, and allows the associated tag to be fired.
- A subsequent "page_view" event will check `u.loaded`, find it `true`, and skip the execution.

### Edge Condition
If multiple rapid "click" events occur:
- On the first click, the tag fires successfully.
- Any further clicks in quick succession will be ignored if `u.loaded` remains `true`, preventing duplicate firing.

### Example Scenario
1. **Event Trigger**: User navigates to a new page (event: "page_view").
   - `u.loaded` = false → Tag fires.
2. **Subsequent Navigation**: User refreshes the page.
   - `u.loaded` = true → Tag does not fire.

## 4. Known Limitations & Gotchas

- **Single Execution**: This extension's design inherently limits the tag to fire only once per page load. If tags are expected to be fired multiple times under varying conditions, alternative strategies must be employed.
- **Potential Conflicts**: If other extensions or scripts also manipulate the `loaded` property of the `tagObject`, there may be unintended behaviour. It is advisable to ensure proper coordination among extensions.
- **Inherit Behaviour**: If the tagObject is reset before the next event occurs, the extension may not function as intended.

## 5. Recommendations for Refactoring

- **Defensive Checks**: Although the presence of `eventType` and `eventPayload` is guaranteed, consider adding checks to verify the structure of `tagObject` before accessing its properties.
- **Code Style**: Consider encapsulating the logic in a named function for better readability and potential reuse in different contexts within the Tealium system.
- **Documentation**: Clearly document the expected input format for the `eventPayload` object to ensure consistency in how data is passed into the extension.

## 6. Maintenance & Further Notes

- **Ownership**: Assign team ownership to ensure that there are always designated individuals responsible for reviewing and updating this extension.
- **Testing Guidelines**: Regularly validate the extension's functionality, especially when changes are made to associated tags or when new extensions are added.
- **Version Control**: Track changes through version control to facilitate rollback if necessary.

By adhering to these recommendations and maintaining thorough documentation, the "Fire Tag Once" extension will continue to serve as an effective tool within the Tealium ecosystem for managing tag execution.