# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Santa  
- **ID**: 1821  
- **Type**: Javascript Code  
- **Scope**: Pre Loader  
- **Execution Frequency**: Run Once  

**Summary**:  
This extension provides a comprehensive set of utility methods for text processing, numeric manipulation, and object handling. It also includes a custom rule-processing engine that can interpret and react to complex criteria. The code resides in the global `LBGAnalytics.santa` object and is available for downstream extensions and libraries to utilise. By loading as a "Pre Loader" and running "Once", the extension ensures its methods and utilities are accessible to all subsequent tags and extensions within the Tealium iQ environment.

## 2. Code Explanation

### High-Level Flow

1. **Global Object Definition**  
   The extension is set up under `LBGAnalytics.santa`, creating two primary constructor functions within that namespace:
   - `QOps()` – A collection of string, numeric, and object manipulation routines.  
   - `QALRP()` – The main rule processor, providing methods to evaluate criteria expressions and execute actions.

2. **Text Manipulation (QOps)**  
   The functions in this section handle fancy string operations, for instance:
   - `removeWhitespace`, `toUpperCase`, `trim`, `replaceAll`, etc.  
   - Casing transformations (`camelCase`, `snakeCase`, `kebabCase`)  
   - Special manipulations like `maskString`, `removeHTML`, and `toBase64`.

3. **Numeric Manipulation (QOps)**  
   These functions focus on numeric transformations:
   - `toNumber`, `toInteger`, `removeNonNumeric`, `round`, arithmetic helpers (`add`, `subtract`, `multiply`, etc.).

4. **Object / JSON Manipulation (QOps)**  
   - `formatDate` as a quick way of converting date objects to localised strings.  
   - `jsonParse` / `jsonStringify` for basic JSON conversions.

5. **Main Rule Processor (`QALRP()`)**  
   - A logging utility (`enableLogging` / `log`) to control debugging output.  
   - A function-resolution system (`resolveFunction`) that attempts to run functions up to a certain depth.  
   - Core evaluation logic (`processRule`, `processString`, `processArray`, etc.) that interprets strings, arrays, or objects as potential "rules" and returns boolean outcomes.  
   - Support for custom string processors (`addStringProcessor`) that allows custom expansions of textual expressions.

6. **Action Handling & Execution (`QALRP` continued)**  
   - After describing an action block or rule, the processor can evaluate it to decide if it should execute.  
   - Compound “all” or “any” rules let you combine multiple expressions.  
   - Methods like `if` / `then` / `else` enable conditional logic checks that integrate with the library’s flexible rule evaluation.

7. **Final Integration & Initialisation**  
   - Additional logic is included to manage a queue (`LBGAnalytics.santaQueue`) for any actions that run before the extension is fully set up.  
   - Once initialised, the code flushes and processes queued actions.  
   - References to external objects like `LBGAnalytics` and `document` are used as data sources and DOM manipulations are performed where needed.

### Dependencies

- **Global Objects**:  
  - `LBGAnalytics`: Used heavily for namespacing (`LBGAnalytics.santa`), data layer retrieval and transformations (`LBGAnalytics.datalayer`, `LBGAnalytics.cookies`).  
  - `document`, `window`: Used for DOM interactions, such as adding event listeners or querying the DOM.
- **No Additional Libraries**:  
  The code does not require external libraries beyond what is provided by the browser environment and Tealium iQ's host site.

## 3. Usage Examples

### Example A: Simple Text Transformations

If part of your Tealium mapping references the extension’s text operations through `QALRP`, you might use:

```js
var Q = new LBGAnalytics.santa.QALRP();
// Suppose you want to process a string:
var transformedValue = Q.get("UserInput.trim() toLowerCase()");
```

Here, `.trim()` and `.toLowerCase()` are operations that `QOps` can interpret. The final result is returned as a lowercased, whitespace-trimmed string.

### Example B: Evaluating Rules

```js
var Q = new LBGAnalytics.santa.QALRP();
// Evaluate a simple condition:
if (Q("pageName equals 'home'")) {
  // do something for the home page
}
```

The above checks if `pageName` equals `"home"` in the data object (by default, the Tealium data object or a custom object you pass in). If `true`, your code proceeds accordingly.

### Example C: Using the Action Queue

Tealium-based actions can be set by feeding JSON structures into `LBGAnalytics.santa.do(...)`, for example:

```js
var actions = [
  {
    "action": "branch",
    "if": "isMobile equals true",
    "then": [
      { "action": "lbga-events", "method": "track", "args": ["UserIsMobile"] }
    ],
    "else": [
      { "action": "lbga-events", "method": "track", "args": ["UserIsNotMobile"] }
    ]
  }
];
LBGAnalytics.santa.do(actions);
```

This snippet runs one of two event-tracking calls based on whether the user is on a mobile device.

### Example D: Masking Sensitive Data

Using the masking function to protect user input:

```js
// QOps usage in a direct call
var ops = new LBGAnalytics.santa.QOps();
var maskedValue = ops.maskString("123456789", 3, 4);
// maskedValue => "123****89"
```

This is helpful for partial hiding of PII in logs or data layer variables.

## 4. Known Limitations & Gotchas

1. **Complex Data / Functions**:  
   The rule processor can unroll functions up to a depth of three. If you pass in deeply nested functions or data structures, it may not resolve them fully.

2. **Selector Limitations**:  
   Some string checks (e.g., `" selector-exists"`) assume valid CSS selectors. If an invalid selector is provided, that part of the logic will fail gracefully but yield no result.

3. **Mutation Observers**:  
   In some scenarios, the code uses a `MutationObserver` (e.g., for show/hide triggers). Older browsers without `MutationObserver` may cause partial or no functionality for those features. A fallback is not included in the code.

4. **Performance Overheads**:  
   Extensive usage of repeated rule checks on large arrays or DOM queries can incur performance costs if handled in rapid succession.

5. **Empty or Null Data**:  
   Because the library frequently casts values to strings or attempts numeric conversions, data that are `null` or `undefined` might result in unexpected string outputs like `"null"` or incomplete transformations.

## 5. Recommendations for Refactoring

1. **Modularisation**:  
   Currently, a large portion of logic is placed in monolithic blocks. Splitting out the code into separate Tealium iQ extensions or single-purpose modules could increase clarity and maintainability (while still abiding by ES5).

2. **Defensive Checks**:  
   Although event payloads and types are guaranteed to be present in your environment, you may still wish to add cautious checks when referencing deeply nested objects like `window`, `document`, or external dependencies such as `LBGAnalytics`.

3. **Documentation & Naming**:  
   Some functions have descriptive names, others are more cryptic (e.g., `QOps.snakeCase`). Consider direct references in comments to clarify typical usage patterns, especially for advanced transformations like `maskStringFromStringMatch`.

4. **Performance Considerations**:  
   If certain rules or manipulations will be executed very frequently, you could look into caching or avoiding repeated DOM queries. For instance, collecting all required DOM elements in one pass before applying transformations.

5. **Error Handling**:  
   All caught exceptions are mostly `console.log`ged. You might add fallback logic or track error events to ensure robust failure handling, rather than silently failing in production.

## 6. Maintenance & Further Notes

- **Ownership**:  
  Given the breadth of functionality, it would be beneficial to have a dedicated owner to update the extension if business rules change or new transformations are required.
  
- **Testing Guidelines**:  
  - Write dedicated unit tests for each function in `QOps`.  
  - Perform integration tests to ensure combined rules and logic (`QALRP`) behave as expected when data or references are missing.  
  - Test on older browsers that do not support certain Web APIs (like `MutationObserver`) if those functionalities are demanded.

- **Deployment & Updates**:  
  - Keep a version marker (currently seen as `version: "2.2"` in the code), and update it whenever changes are applied.  
  - Document any important modifications so that other developers can track the feature set and bug fixes.

This completes the documentation of the Santa Tealium iQ extension. For any further updates or clarifications, please refer to the in-code comments, or consult the maintainers of `LBGAnalytics`.