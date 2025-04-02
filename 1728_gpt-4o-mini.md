# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: LivePerson Override - SW Encashments
- **ID**: 1728
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to override the value of the `JourneyProduct` variable based on specific conditions related to the domain of the website. It primarily targets two domains: `take-my-pension.scottishwidows.co.uk` and `appduv03b7.machine.test.group`. If the event occurs on these domains, it captures the canonical path of the page and assigns it to the `JourneyProduct`. This helps in effectively tracking user journeys for accurate reporting and analysis.

---

## 2. Code Explanation

### Key Variables
- **a**: Represents the `eventType` parameter; a string indicating the type of event being processed.
- **b**: Represents the `eventPayload` parameter; an object containing relevant event data.

### Logic Flow
1. The code checks if the `CanonicalDomain` of the incoming event matches either "take-my-pension.scottishwidows.co.uk" or "appduv03b7.machine.test.group".
2. If the domain matches, it assigns the `CanonicalPath` value to `JourneyProduct`.
3. This serves the purpose of tracking which product journey a user is on, based on the canonical path of the webpage.

### Dependencies
- The extension relies on global variables `eventType` and `eventPayload`, which are assumed to be available in Tealium's execution environment.

```javascript
(function(a,b){
    if(
        (b.CanonicalDomain === "take-my-pension.scottishwidows.co.uk" || b.CanonicalDomain === "appduv03b7.machine.test.group")
    ){
        b.JourneyProduct=b.CanonicalPath;
    }
})(eventType, eventPayload);
```

---

## 3. Usage Examples

### Normal Conditions
- **Scenario**: A user visits the canonical path `/pension-options` on `take-my-pension.scottishwidows.co.uk`.
  - **Input**:
    ```javascript
    eventPayload = {
        CanonicalDomain: "take-my-pension.scottishwidows.co.uk",
        CanonicalPath: "/pension-options"
    };
    ```
  - **Output**:
    ```javascript
    JourneyProduct = "/pension-options";
    ```

### Edge Conditions
- **Scenario**: A user visits an unexpected domain, e.g., `example.com`.
  - **Input**:
    ```javascript
    eventPayload = {
        CanonicalDomain: "example.com",
        CanonicalPath: "/random-path"
    };
    ```
  - **Output**:
    ```javascript
    JourneyProduct remains undefined;
    ```

---

## 4. Known Limitations & Gotchas

- The extension currently only supports two specific domains. If other domains should also override `JourneyProduct`, modifications to the condition in the code are necessary.
- The extension may not function as intended if the `CanonicalDomain` or `CanonicalPath` properties are missing or have unexpected formats, although these are out of the control of the extension code itself.
- Potential conflicts may arise if other extensions attempt to modify `JourneyProduct` at the same time or are placed after this extension in the execution order, which could override its value.

---

## 5. Recommendations for Refactoring

1. **Code Style**: Consider using more meaningful variable names instead of `a` and `b` for improved readability.
   - Example: `eventType` and `eventPayload` can be used directly within the function without conditionally renaming.
   
2. **Modularisation**: Future refactoring could make the conditions for domain checks and property assignments modular, allowing easier updates if new domains need support.

3. **Defensive Checks**: While it is not needed at the moment, implementing checks for the presence and type of `CanonicalDomain` and `CanonicalPath` could safeguard the extension against unforeseen data structures.

4. **Performance**: It's advisable to structure the code to avoid multiple checks in an expanding domain list. This could be optimally done using arrays or objects for lookup in a more advanced implementation.

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: It is crucial that the extension be reviewed regularly, especially as website structures or domain conditions may change over time.
  
- **Ownership**: Assign a responsible developer for the upkeep and ensure they are aware of any changes in tracking requirements or domain updates.

- **Testing Guidelines**: Establish a test plan to validate functionality across both supported domains, including edge cases for different input scenarios, and ensure consistent performance across various browsers.

This documentation should serve as a comprehensive guide for developers and stakeholders involved with the Tealium iQ extension.