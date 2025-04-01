# Target Interface Polyfill – Comprehensive Documentation

This document details the Tealium iQ “Target Interface Polyfill” extension, explaining its purpose, configuration, usage, and suggested best practices. It is written in GitHub-flavoured markdown so that it can be easily shared among developers and stakeholders.

---

## 1. Extension Overview

- **Name**: Target Interface Polyfill  
- **ID**: 1776  
- **Type**: Javascript Code  
- **Scope**: Pre Loader  
- **Execution Frequency**: Run Once  
- **Status**: Active  

### Summary

This extension provides a polyfill and helper functions for Adobe Target integrations. By attaching functionality to the global `LBGAnalytics` object, it offers:

1. Logging utilities that push events to an internal array (`LBGAnalytics.target.events`).
2. Methods to detect newly added DOM elements and subsequently trigger Adobe Target experiences (`fireWhenElementAvailable`).
3. An interface (`targetExperienceInterface`) to set up audience enrolments, retrieve experiences, and invoke callback functions within the host application.
4. A “getOffers” function to fetch and display Adobe Target offers, with specialised tracking and notifications in the data layer.

---

## 2. Code Explanation

This extension is comprised of several functional blocks:

### 2.1 Global Namespace & Dependencies

- **`(function (LBGAnalytics) { ... })(window.LBGAnalytics);`**  
  The code is wrapped in an immediately invoked function expression (IIFE) that expects a global `LBGAnalytics` object. All functionality is defined within this IIFE to avoid polluting the global scope.
  
- **Assumed Dependencies**:  
  - `LBGAnalytics.target`: A pre-existing object or an object assigned here.  
  - `LBGAnalytics.events.genericEvent(eventNumber)` and `LBGAnalytics.datalayer.set(...)`: Used to publish internal analytics events and update the data layer.  
  - `window.adobe.target`: Used by the “getOffers” method to interact with Adobe Target.

### 2.2 Logging and Generic Events

1. **`log(eventType, eventData)`**  
   - Responsible for pushing an event into `LBGAnalytics.target.events`.  
   - Wrapped in a `try/catch` to avoid impacting the user experience if logging fails.

2. **`genericEvent(eventNumber)`**  
   - Calls an existing `LBGAnalytics.events.genericEvent(eventNumber)` function.  
   - Used extensively to indicate significant milestones (e.g., element detection, audience changes).

### 2.3 `fireWhenElementAvailable(selector, triggerView, forceRefire)`

- **Purpose**: Observes the DOM for the appearance of a specific element, then triggers Adobe Target’s `triggerView` once the element is detected.  
- **Mechanism**:  
  - Utilises a `MutationObserver` that monitors DOM changes for `childList` and `subtree`.  
  - If the element with the given `selector` is found and was not previously present, it fires `LBGAnalytics.triggerView.invoke(triggerView, true, false, !!forceRefire)`.  
- **Error Handling**:  
  - All potentially fragile calls are wrapped in `try/catch`.  
  - If `MutationObserver` is not supported or fails, the function returns `false`.

### 2.4 `targetExperienceInterface`

A set of functions attached to `LBGAnalytics.target.targetExperienceInterface`:

1. **`audiences`**  
   - An object caching activity name → experience name mappings for the current visitor.

2. **`setAudience(activityName, experienceName)`**  
   - Stores the experience mapping in the `audiences` object (`this.audiences`).  
   - Fires a generic event (`693`) and logs the assignment.

3. **`getAudience(activityName)`**  
   - Retrieves the stored experience for the specified activity name.  
   - If not found, returns `"default"`.  
   - Fires a generic event (`694` or `695`) and logs an event indicating which audience is retrieved.

4. **`retrieveAudienceForView(upcomingTriggerViewString)`**  
   - Invokes `LBGAnalytics.triggerView.invoke("preload_" + upcomingTriggerViewString, true, false)` to force preloading of experiences for a specific view.  
   - Fires a generic event (`696`) and logs accordingly.

5. **`callbackFunctions`**  
   - An object to store application-level callback functions.

6. **`registerApplicationCallback(nameOfCallback, functionToExecute)`**  
   - Registers a function under a given name in `callbackFunctions`.  
   - Note that the second argument is expected to be a function but is tested as a string in the code. This is presumably a placeholder or simplified validation.

7. **`invokeApplicationCallback(nameOfCallback, args)`**  
   - Invokes the named callback if it is stored under `callbackFunctions`.  
   - Logs success or failure events.  
   - Any unhandled errors during callback execution are logged.

### 2.5 `LBGAnalytics.target.getOffer` (IIFE)

Provides a method to retrieve offers from Adobe Target:

1. **Logging**  
   - Logs “getoffer-loaded” upon initial load.

2. **Helper Functions**  
   - **`uuid()`**: Generates a UUID for the Adobe Target notifications.  
   - **`createNotification(mbox, type)`**: Creates a notification object for Adobe Target’s display or other event.  
   - **`setProperty(propertyId)`**: Overrides the `at_property` with a given property ID if needed.  
   - **`mBoxToRequest(mbox)`**: Creates a standard prefetch request object for the specified mbox.  

3. **`getOffers(mboxName, optionalProperty)`**  
   - Initiates a request to Adobe Target for the specified mbox name.  
   - If `optionalProperty` is provided, the property is set via `setProperty(...)`.  
   - Returns a Promise which, on success, provides:  
     - An array of items (each containing variant content, activity/experience details).  
     - A `notification` method that sends a “display” or other event to Adobe Target.  
     - A `display` method that wraps `notification("display")` for convenience.  
   - On failure, an error is logged, and the Promise is rejected.

---

## 3. Usage Examples

### 3.1 Element Detection and Triggering Adobe Target

Example usage for dynamically inserted DOM elements (as described in the code comments):

```javascript
fireWhenElementAvailable("input[name=applyAip]", "better-step-2");
fireWhenElementAvailable("input[name=imThinkingAbout]", "better-step-3");
fireWhenElementAvailable("select[name=applicant0Title]", "better-step-4");

// Example with multiple checks
if (window.location.pathname.indexOf("/personal/cwa/cwr-hub/") === 0) {
  fireWhenElementAvailable("section.borrowing-options-section", "optionsVisible");
  fireWhenElementAvailable("section.explore-borrowing-options", "optionsHidden");
}
```

Each call monitors the DOM until the targeted element appears (or reappears), then triggers the specified Adobe Target view.

### 3.2 Setting and Retrieving Audiences

```javascript
// Setting an audience for an activity
LBGAnalytics.target.targetExperienceInterface.setAudience(
  "TestActivity", 
  "ExperienceA"
);

// Retrieving the audience
var currentExperience = LBGAnalytics.target.targetExperienceInterface.getAudience(
  "TestActivity"
);
// currentExperience would be "ExperienceA"
```

If no experience was set, the function returns `"default"`.

### 3.3 Preloading for a View

```javascript
LBGAnalytics.target.targetExperienceInterface.retrieveAudienceForView("myUpcomingView");
// Logs a preload event and invokes `LBGAnalytics.triggerView.invoke("preload_myUpcomingView", true, false)`
```

### 3.4 Callbacks for Web Applications

Registering a callback:

```javascript
// Suppose your application has a function called 'myCallback'
function myCallbackFunction(args) {
  console.log("Callback invoked with args:", args);
}

// Register in targetExperienceInterface
LBGAnalytics.target.targetExperienceInterface.registerApplicationCallback(
  "myCallback",
  myCallbackFunction
);

// Later, from a Target script, you could do:
LBGAnalytics.target.targetExperienceInterface.invokeApplicationCallback("myCallback", { key: "value" });
```

### 3.5 Retrieving Adobe Target Offers

```javascript
LBGAnalytics.target.getOffer("myMboxName", "myPropertyID")
  .then(function(result) {
    // The result object contains offer data
    console.log("Mbox Name:", result.mbox);
    console.log("Activities & Items:", result.items);

    // Displaying the offer triggers a notification
    result.display();
  })
  .catch(function(err) {
    console.error("Failed to retrieve offers:", err);
  });
```

---

## 4. Known Limitations & Gotchas

1. **Dependency on `window.LBGAnalytics`**  
   This extension relies on certain methods (`genericEvent`, `datalayer.set`, and `triggerView.invoke`) existing within `LBGAnalytics`. If they are not present or not fully implemented, many parts of this code will silently fail.

2. **Dependency on `window.adobe.target`**  
   Sections of the code that use `window.adobe.target` (in the “getOffers” method) will fail if the Adobe Target library is not present or is loaded after this extension.

3. **MutationObserver Support**  
   The `fireWhenElementAvailable` function depends on a `MutationObserver`. In older browsers without this API, the function returns `false` gracefully. There is no fallback for pure legacy environments.

4. **Multiple Calls for the Same Element**  
   If `forceRefire` is set to `true`, `triggerView.invoke` may be called multiple times, which can potentially lead to repeated targeting actions. Ensure you fully understand the implications of repeated calls on your site’s Target logic.

5. **Potential Overlaps with Other Code**  
   If another extension or script manipulates `LBGAnalytics.datalayer` or redefines any global objects used here, conflicts or unexpected state changes could occur.

---

## 5. Recommendations for Refactoring

1. **Modularisation**  
   Consider splitting this large script into smaller modules (or separate Tealium extensions). One module for DOM observation (`fireWhenElementAvailable`), another for the target experience interface, and another for the offer retrieval logic. This clearer separation can reduce complexity.

2. **Error Reporting**  
   Currently, errors are swallowed using `try/catch` blocks that “fail silently”. For debugging in production, you might want to allow a more detailed logger or a fallback so that critical errors are not missed by developers.

3. **Unified Logging Approach**  
   Logging is scattered throughout the script. Consolidating logging into a single utility could help maintain consistency, especially if you need to adapt or extend how logs are captured.

4. **Parameter Validation**  
   Although the code does some checks (e.g., ensuring arguments are strings), these checks sometimes differ from the stated function requirements. Aligning them to ensure a strictly consistent pattern could prevent unexpected inputs from slipping through.

5. **Maintain ES5 Compatibility**  
   Since you are supporting ES5, continue to avoid modern JavaScript features (such as arrow functions or `let/const`). Verify that any newly introduced features (like `Promise`) are polyfilled or handled compatibly with all target browsers.

---

## 6. Maintenance & Further Notes

1. **Testing Guidelines**  
   - Verify that each method (`fireWhenElementAvailable`, `setAudience`, `getAudience`, `retrieveAudienceForView`, etc.) is tested in an environment with `LBGAnalytics` and Adobe Target present.  
   - Use integration tests to ensure the extension behaves correctly in various scenarios (element not found, errors from Adobe Target, etc.).

2. **Ownership**  
   - Delegate a single team or individual to maintain the logic in this file. Changes to the `LBGAnalytics` object or Adobe Target configuration should be communicated to them promptly.

3. **Clear Documentation**  
   - Keep this documentation (or a similar source) alongside the code, ensuring that future developers understand the extension’s architecture and constraints.  
   - When new features or functionalities are added, update the code comments and relevant sections in this document.

4. **Versioning**  
   - Consider versioning your Tealium iQ extension changes to track different iterations of this script.  
   - Major changes—like adding or removing dependencies, or altering how the extension integrates with Adobe Target—warrant a new version for easy rollback if needed.

---

This completes the documentation for the “Target Interface Polyfill” Tealium iQ extension. If any clarifications are needed, please consult the owners of the `LBGAnalytics` project or your Adobe Target implementation lead.