```markdown
# Tealium iQ Extension Documentation: Meta Account Lookup

## 1. Extension Overview
- **Name**: Meta account lookup
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: 1783
- **Execution Frequency**: On every relevant event

**Summary**:  
The "Meta account lookup" extension is designed to map various brand and event types to specific conversion IDs using a lookup table. It processes incoming event data and interacts with the global `LBGAnalytics` object, contributing to data layer management and improving conversion tracking.

## 2. Code Explanation

### Key Variables
- **`structureLkpsM`**: An object mapping lookup types to their corresponding keys which define the event and brand relationships.
- **`lkptbl`**: A master lookup table that contains pairs of eligibility criteria (input strings) and their corresponding conversion IDs (output).

### Logic Flow
1. **Initialization**: The extension checks the presence of the `LBGAnalytics` global object and its `datalayer`. It then sets specific values for the keys `PegasusBrand_lc` and `CanonicalPath_lc` from the `eventPayload`.
   
2. **Lookup Process**:
   - The `runLookups` function iterates over the `lkptbl`, unpacking each record and testing against eligibility criteria.
   - If eligibility criteria are met, it retrieves conversion parameters and sets the `fbID` tag.

3. **Functions**:
   - `unpackStr(MValues, delim)`: Splits a delimited string into an array.
   - `createElig(arr)`: Creates an eligibility rule array based on the presence and relation of brand events from the lookup structure.
   - `unpackM(arr)`: Splits an input array into two strings (input and output).
   - `setTags(fbID)`: Sets the fetched `fbID` for later use if a match is found.

### Dependencies
- The code relies on the existence of the `window.LBGAnalytics` object, which must be included in the global scope for the extension to function correctly.

## 3. Usage Examples

### Sample Scenario
**Normal Flow**:  
- An event is triggered, and the payload contains:
  - `{ "PegasusBrand": "Lloyds", "CanonicalPath": "/financial-skills/five-sixteen" }`
  
- The extension processes this input and identifies that it matches the eligibility rules for Lloyds, retrieving the conversion ID `3742614036051827` for further tracking.

### Edge Conditions
- **No Matches Found**: If the input from the event payload does not match any entry in `lkptbl`, the extension will complete without adjusting any tags.
- **Incomplete State**: If either `PegasusBrand` or `CanonicalPath` is missing from the event payload, the extension will not function as intended, resulting in no conversion ID being set.

## 4. Known Limitations & Gotchas
- The extension does not have defensive checks against malformed input in the event payload, assuming inputs are well-formed and as per Tealium's structural expectations.
- If multiple extensions manipulate the same keys in `LBGAnalytics.datalayer`, it could lead to data inconsistency.
- Any changes in event structure may require corresponding updates in this extension.

## 5. Recommendations for Refactoring
- **Defensive Checks**: Introduce checks to validate the presence and format of expected event properties before processing.
- **Code Style**: Consider consistent naming conventions for functions and variables for improved readability.
- **Modularisation**: Break down larger functions into smaller, reusable functions to better manage complexity and readability, such as further encapsulating the event data unpacking logic.

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Regularly validate the mappings in `lkptbl` to ensure they are aligned with business requirements and any changes in branding strategy.
- **Ownership**: Assign a team member to own this extension, monitor its performance, and update the documentation as necessary.
- **Testing Guidelines**: Test thoroughly whenever changes are made to the event structure or mapping logic to ensure that the extension behaves as expected.

--- 

This documentation provides a comprehensive overview of the "Meta account lookup" extension, detailing its functionality, usage, and considerations for future modifications and maintenance. It serves as a reference for developers and stakeholders involved in managing Tealium iQ implementations.
```
