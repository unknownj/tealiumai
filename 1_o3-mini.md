# Tealium iQ Extension Documentation

This document provides a comprehensive overview, explanation, usage scenarios, limitations, recommendations, and maintenance guidelines for the Tealium iQ extension "LBG : BLR : Set : Merge Data Layer with CLOVA3".

---

## 1. Extension Overview

- **Name:** LBG : BLR : Set : Merge Data Layer with CLOVA3  
- **ID:** 100036 (Extension ID in the metadata object); internal extension instance has an ID of 1  
- **Type:** Javascript Code  
- **Scope:** Before Load Rules  
- **Execution Frequency:** Every Event (occurrence: Run Always)

**Summary:**  
This extension merges an external data layer (window.clova3.datalayer) into the Tealium event payload. Before the final event payload is sent, it iterates over the keys in the external data layer and integrates them into the payload if they are not already defined. In addition, the extension keeps a debug log for analytics event counting, creates a simplified payload object without cookies (keys with "cp." prefix), and integrates optional processing via the QALRP functionality if available through the LBGAnalytics library. The extension ensures that event payload modifications occur consistently for each event in the Before Load Rule phase.

---

## 2. Code Explanation

### Key Variables and Objects

- **eventType (alias a):**  
  Provided global parameter representing the type of event being tracked.
  
- **eventPayload (alias b):**  
  Provided global parameter representing the current event’s payload object.

- **window.clova3.datalayer:**  
  Expected global object with a `.get()` method that returns an object containing key-value pairs to be merged into the event payload.

- **window.analytics_event_count:**  
  Global counter incremented for every event processed; used to generate a debug event ID.

- **window.analytics_event_log:**  
  An array maintained globally to store debug logs for each event's data such as eventId, eventType, timestamp, and merged payload details.

- **utag.sender[928].map:**  
  Optional mapping for the debug event ID to a property (prop74), ensuring that the debug identifier is passed along with the analytics event.

- **window.LBGAnalytics.santa.QALRP:**  
  An optional global function that, if available, is used to create an instance of a processor (assigned to b.Q) for additional custom string processing functions.

### Logic Flow

1. **Merging Data Layer into the Event Payload:**  
   - The extension initially retrieves an external data layer object via `window.clova3.datalayer.get()`.
   - It uses a loop to iterate over the `eventPayload` keys. A temporary object (`pl`) is constructed while a boolean flag (`plb`) is used to disable copying once a key starting with "cp." is encountered.
   - A debug object is constructed using the current event details, composed of:
     - A sequential event identifier.
     - Event type and a timestamp.
     - Stringified versions of the simplified payload (`pl`) and the entire data layer.
   - The debug event is added to a global log array and is integrated back into the event payload via the `debugEventId` property.
   - Additionally, if a specific Tealium sender mapping exists, it maps the debug event ID to a designated property (prop74).

2. **Merging Processed Data Layer Keys:**  
   - The code iterates over each key in the external `datalayer` object.
   - For each key, if it is not already present in the event payload `b`, the value from `datalayer` is added to `b`.

3. **Initialising Optional QALRP Processing:**  
   - The code checks for the presence of the optional `window.LBGAnalytics.santa.QALRP` function.
   - If available and `b.Q` is not set, it creates a new processor instance with `b` as initial input.
   - It then immediately registers multiple string processor functions that modify or return the processed values based on specific conditions (e.g., matching JourneyName, pathname, hostname, and Brand).

4. **Registering a Data Handler with QALRP:**  
   - If `b.Q.if.registerHandler` is available, a handler function is registered.
   - This handler verifies that any data object passed in is a valid object, then iterates through its keys.
   - Only keys with primitive values (string, number, or boolean) are merged directly into the event payload.
   - A response log object is also maintained and subsequently returned.

### Dependencies on Global Objects or Libraries

- The extension depends on the existence of:
  - `window.clova3.datalayer` with a `.get()` method.
  - A Tealium sender object, particularly `utag.sender[928]`, with a mapping to support debugging.
  - Optionally, the `window.LBGAnalytics.santa.QALRP` constructor/function for additional event data processing.
- The logic assumes standard JavaScript global objects like `window` and `Date` are available.

---

## 3. Usage Examples

### Example 1: Standard Event Processing

- **Scenario:**  
  An event is triggered with a payload already containing some default keys (e.g., page, userId).

- **Flow:**
  1. The external data layer from `window.clova3.datalayer.get()` returns an object such as `{ campaign: "summer", locale: "en-GB" }`.
  2. The extension loops through each key in the original event payload, logging non-cookie keys into a temporary object for debugging.
  3. A debug log is created, incrementing the global `analytics_event_count`.
  4. The missing keys, such as "campaign" and "locale", are added to the event payload.
  5. Optionally, if QALRP is available, the payload is further processed by the added string processor functions.

### Example 2: Handling Payload with Cookie Data

- **Scenario:**  
  The original payload contains keys that start with "cp." (e.g., "cp.sessionid").

- **Flow:**
  1. When iterating through the event payload, the code detects keys starting with "cp." and sets the flag `plb` to false so that subsequent keys might not be processed for debugging (depending on the order).
  2. The original cookie keys remain untouched in the final payload.
  3. The external data layer is still merged only if the key is missing; however, careful handling ensures that cookie-related data are not duplicated or altered unintentionally.
  4. The result is a final event payload with both non-cookie global data merged and cookie keys preserved.

### Example 3: QALRP Data Handling

- **Scenario:**  
  The LBGAnalytics library is available and initialises QALRP processing.

- **Flow:**
  1. If `window.LBGAnalytics.santa.QALRP` is present, a new QALRP instance is created with the current payload.
  2. Multiple string processors are added to process event properties like JourneyName, pathname, hostname, and Brand.
  3. When `b.Q.if.registerHandler` is invoked, any valid object passed will have its primitive-type keys merged into the payload.
  4. A response log is generated for further processing or tracking.

---

## 4. Known Limitations & Gotchas

- **Cookie Key Handling:**  
  The logic uses a sequential check with a boolean flag (`plb`) that might prevent some keys from being included in the debug object if a cookie key ("cp." prefix) is encountered early. Order of keys in the object could affect intended behaviour.

- **Global Object Dependencies:**  
  If `window.clova3.datalayer` is not available or does not have a proper `.get()` method, the extension will silently fail to merge the expected external data layer.

- **Error Handling Limitations:**  
  While errors within the debugging and merging logic are caught by the try-catch block, the extension does not log or flag the exceptions, potentially masking issues during runtime.

- **Potential Conflicts:**  
  Depending on other Tealium iQ extensions and global scripts, modifications to `eventPayload` or shared globals like `window.analytics_event_log` might lead to conflicts or unexpected behaviour.

---

## 5. Recommendations for Refactoring

- **Enhanced Debug Logging:**  
  Consider logging errors caught in the catch block, even if only to a dedicated debug console or a remote logging endpoint, to aid in troubleshooting issues.

- **Refine Cookie Key Logic:**  
  The current logic using the `plb` flag could be revisited. A more specific filtering mechanism might ensure that only intended keys are excluded without affecting the logging mechanism.

- **Modularise Code:**  
  Break the code into functions for:
  - Debug event formation.
  - Data layer merging.
  - QALRP initialisation and handler registration.  
  This modularisation can simplify maintenance and potential unit testing.

- **Comment Clarity and Consistency:**  
  Enhance inline comments to better explain rationale behind specific logic sections, such as the use of the `plb` flag and the conditions applied in QALRP registration.

- **Testing and Validation:**  
  Add explicit unit tests (if possible within your testing framework) to ensure that:
  - The data layer is merged correctly in various scenarios.
  - The debug events are logged as expected.
  - QALRP processing works as intended under different payload conditions.

*(Note: Maintain ES5 syntax throughout the refactoring to comply with support requirements.)*

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance:**  
  - Monitor dependencies on external global objects (e.g., `window.clova3.datalayer` and `window.LBGAnalytics`) to ensure that any updates or deprecations are tracked and handled in a timely manner.
  - Regularly review the debug logging mechanism and adjust the level of logging based on production needs versus testing environments.

- **Ownership and Documentation:**  
  - Ensure that the extension is appropriately version-controlled and that changes follow the contributions guidelines.
  - Maintain a changelog for the extension to track why and when changes were made.
  - Encourage code reviews, especially when integrating changes that involve global objects or dependencies.

- **Testing Guidelines:**  
  - Develop a suite of unit tests covering key functionality such as data layer merging, debug event generation, and QALRP processing.
  - Simulate scenarios where dependencies may not be available and assess the extension's graceful degradation.
  - Document edge cases during testing, particularly around the ordering of payload keys and the handling of cookie-prefixed keys.

- **Future Enhancements:**  
  - Consider adding configuration options within the Tealium iQ interface to enable/disable certain debug features.
  - Explore conditional logging based on the environment (development vs. production).

---

This documentation should serve as a complete guide for developers and stakeholders to understand, maintain, and extend the "LBG : BLR : Set : Merge Data Layer with CLOVA3" Tealium iQ extension.