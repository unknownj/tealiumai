# Compound Journey Analytics Props Extension

Below is a comprehensive documentation for the **Compound Journey Analytics Props** extension found in Tealium iQ, covering its overview, code explanation, usage, known limitations, refactoring suggestions, and guidance for future maintenance. This document is written in GitHub-flavoured Markdown and in British English.

---

## 1. Extension Overview

- **Name**: Compound Journey Analytics Props  
- **ID**: 1487  
- **Type**: Advanced Javascript Code  
- **Scope**: 928  
- **Execution Frequency**: Runs once per event where the extension is triggered (when the condition `if (b.JourneyName) { ... }` is satisfied)

**Summary**:  
This extension combines various data layer variables (`JourneyName`, `JourneyStepName`, `ApplicationState`, `JourneyAction`, `JourneyActionNarrative`, `JourneyEvent`, `EventAction`, and `EventNarrative`) into three “compound” string properties, each assigned to `s.prop21`, `s.prop22`, and `s.prop23`. These properties are created by concatenating and normalising the string values with punctuation removed and converting the result to lower-case.  

By populating these Adobe Analytics props, the extension makes it easier to track a user’s journey and the events or actions taken within that journey. This aggregated data can be used for reporting and analysis in Adobe Analytics.

---

## 2. Code Explanation

The code is contained within an immediately-invoked function expression (IIFE):  
```js
(function(a, b, u) {
  /* global b, s */

  if (b.JourneyName) {
    b.JourneyAnalytics1 = ([
      b.JourneyName,
      b.JourneyStepName || "None",
      b.ApplicationState || "None"
    ])
      .map(function(a) {
        return "" + a;
      })
      .map(function(a) {
        return a.split(";").join("").split(";").join("");
      })
      .map(function(a) {
        return a.toLowerCase();
      })
      .join(".");

    b.JourneyAnalytics2 = ([
      b.JourneyAction || "None",
      b.JourneyActionNarrative || "None"
    ])
      .map(function(a) {
        return "" + a;
      })
      .map(function(a) {
        return a.split(";").join("");
      })
      .map(function(a) {
        return a.toLowerCase();
      })
      .join(".");

    b.JourneyAnalytics3 = ([
      b.JourneyEvent || "None",
      b.EventAction || "None",
      b.EventNarrative || "None"
    ])
      .map(function(a) {
        return "" + a;
      })
      .map(function(a) {
        return a.split(";").join("");
      })
      .map(function(a) {
        return a.toLowerCase();
      })
      .join(".");

    s.prop21 = b.JourneyAnalytics1;
    s.prop22 = b.JourneyAnalytics2;
    s.prop23 = b.JourneyAnalytics3;

    u.map.JourneyAnalytics1 = "prop21";
    u.map.JourneyAnalytics2 = "prop22";
    u.map.JourneyAnalytics3 = "prop23";
  }
})(eventType, eventPayload, tagObject);
```

### Key Variables and Flow

1. **Global Objects**:
   - `b`: The Tealium data layer object containing your site’s or app’s variables.  
   - `s`: The Adobe Analytics tracking object (commonly referred to as the `s` object in Adobe implementations).
   - `u`: Tealium’s internal extension object that allows mapping of data layer variables to vendor-specific parameters (in this case, Adobe Analytics).

2. **Conditional Check**:  
   The entire logic runs only if `b.JourneyName` is present. If `b.JourneyName` is undefined or falsy, the code within the `if` statement does not execute.

3. **JourneyAnalytics1**:  
   - Built by combining `b.JourneyName`, `b.JourneyStepName`, and `b.ApplicationState`.  
   - Defaults to `"None"` for any missing variables.  
   - Each value is converted to a string, stripped of semicolons, converted to lower-case, and then joined by `.`.

4. **JourneyAnalytics2**:  
   - Built by combining `b.JourneyAction` and `b.JourneyActionNarrative`.  
   - Follows the same normalisation rules described above.

5. **JourneyAnalytics3**:  
   - Built by combining `b.JourneyEvent`, `b.EventAction`, and `b.EventNarrative`.  
   - Follows the same normalisation rules described above.

6. **Adobe Props**:  
   - The resulting strings are assigned to `s.prop21`, `s.prop22`, and `s.prop23`, respectively.

7. **Mapping**:  
   - `u.map.JourneyAnalytics1 = "prop21"`  
   - `u.map.JourneyAnalytics2 = "prop22"`  
   - `u.map.JourneyAnalytics3 = "prop23"`  
   These map the data layer variables to the Adobe props within the Tealium interface.

### Processing Steps and Dependencies

- The extension relies on the presence of:
  - The Adobe Analytics tracker object `s`.  
  - The data layer object `b` containing journey-related attributes.  
- Once the conditions are met (i.e., `b.JourneyName` is truthy), the code executes and updates the props accordingly.

---

## 3. Usage Examples

Below are scenarios illustrating typical usage and data flows:

### 3.1 Normal Operation

Suppose the data layer (`b`) includes:
```js
b = {
  JourneyName: "MortgageApplication",
  JourneyStepName: "EligibilityCheck",
  ApplicationState: "InProgress",
  JourneyAction: "FormSubmit",
  JourneyActionNarrative: "UserSubmittedForm",
  JourneyEvent: "AccountCreate",
  EventAction: "ButtonClick",
  EventNarrative: "UserClickedSubmit"
};
```
When this extension runs:
1. `JourneyAnalytics1` becomes `"mortgageapplication.eligibilitycheck.inprogress"`.
2. `JourneyAnalytics2` becomes `"formsubmit.usersubmittedform"`.
3. `JourneyAnalytics3` becomes `"accountcreate.buttonclick.userclickedsubmit"`.

These values populate `s.prop21`, `s.prop22`, and `s.prop23`, respectively.

### 3.2 Missing Variables

If some variables are missing:
```js
b = {
  JourneyName: "MortgageApplication",
  // b.JourneyStepName is not defined
  ApplicationState: "",
  // b.JourneyAction is not defined
  JourneyActionNarrative: "SomeNarrative",
  // ...
};
```
Then the extension assigns:
1. `JourneyStepName || "None"` → `"None"`,  
2. `ApplicationState || "None"` → `"None"`,  
3. `JourneyAction || "None"` → `"None"`.  

Regardless, each value defaults to `"None"`, so properties remain consistent:
- `JourneyAnalytics1` might become `"mortgageapplication.none.none"`.
- Any undefined variable becomes `"none"` in the final concatenated string.

### 3.3 Invalid or Edge Conditions

- If `b.JourneyName` is not present, the entire logic is skipped, so no Adobe props are set by this extension.  
- If values contain semicolons, those are stripped out. For example, `"User;Name"` becomes `"username"`.

---

## 4. Known Limitations & Gotchas

1. **Dependency on `s`**:  
   If for any reason the `s` object (the Adobe Analytics object) is not available in the runtime environment, the code will fail when attempting to set `s.prop21`, `s.prop22`, and `s.prop23`.

2. **Requires `b.JourneyName`**:  
   Because the extension runs only if `b.JourneyName` is truthy, no journey analytics are populated otherwise.

3. **Semicolon Stripping**:  
   The extension specifically strips semicolons (`;`). Other special characters are not removed. If you require removal of additional characters, the code must be updated.

4. **No Other Data Types**:  
   Variables are assumed to be strings or empty. Objects or arrays would not be properly handled given the current logic.

5. **Potential Conflicts**:  
   - If there is another extension or script setting `s.prop21`, `s.prop22`, or `s.prop23` in a conflicting manner, this extension may overwrite those values or be overwritten.  
   - If multiple Tealium extensions manipulate the same data layer variables (`b` object fields), the final state could become unpredictable depending on load order.

---

## 5. Recommendations for Refactoring

Below are some suggestions to improve clarity and maintain compliance with ES5:

1. **Consolidate Mapping Steps**  
   Currently, the code uses multiple `.map()` calls. We can reduce these by chaining logic together or by performing transformations in a single pass. This might make debugging easier.

2. **Use Clearer Variable Names**  
   Instead of reusing `a` in the `.map()` callback, consider naming the function parameter something more descriptive like `value` to improve readability, although this is optional.

3. **Group Common Logic**  
   The normalisation (converting to string, removing semicolons, lowercasing, joining by a period) is repeated for each set of journey analytics. This can be abstracted into a small reusable function (still using ES5) to reduce the chance of minor discrepancies between each set.

4. **Error Handling**  
   While not strictly required here, you may want to consider adding checks to ensure `s` is available before setting analytics props. However, if your environment guarantees `s`, this may not be needed.

5. **No ES2015+ Features**  
   Since ES5 support is mandatory, avoid using arrow functions (`() => {}`), `let`, `const`, or template literals. Instead, continue using `function`, `var`, and string concatenation.

---

## 6. Maintenance & Further Notes

1. **Ongoing Maintenance**  
   - Designate a single team or individual to own this extension.  
   - Regularly review the code to ensure that any new or changed journey attributes in the data layer (`b`) are handled.  
   - Infuse the extension with test data or use Tealium’s Debugger to verify the output props are as expected.

2. **Testing Guidelines**  
   - Test a variety of data layer states: complete data, partial data, and no journey data.  
   - Check that `s.prop21`, `s.prop22`, and `s.prop23` consistently follow the expected format (dot-separated, no semicolons, all lower-case).  
   - Validate that no collisions occur with other extensions or with the final Adobe Analytics deployment.

3. **Version Control**  
   - Whenever changes are made, increment an internal version or add notes to the Tealium iQ extension’s description.  
   - Store a copy of the code in a source control repository (e.g. GitHub) to track changes over time.

4. **Ownership**  
   - Encourage one or two primary developers to maintain clarity in approach and contact points for queries or escalations.  
   - If multiple teams collaborate, clarify who has final authority on updates to the extension.

---

**Document Version**: 1.0 (initial)  

For any questions or clarifications, please reach out to the Tealium implementation team or your Adobe Analytics administrators.