# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: GA360 : XD : Set cross-track domain list
- **ID**: 1585
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension defines a set of cross-track domains based on the brand specified in the user-defined object (`udo.Brand`). It generates and returns an array of domains that will be used in Google Analytics 360 linker functionality. The primary purpose of this extension is to facilitate tracking across multiple domains that are associated with different brands, ensuring that user sessions are maintained accurately across these domains.

## 2. Code Explanation

### Key Variables
- **`dl`**: Represents the data layer (user-defined object) being passed in, which contains brand information.
- **`brand`**: The specific brand for which the domain list is generated. It is fetched from the `dl.Brand` property.
- **`domains`**: An array that stores the cross-track domains corresponding to the specified brand.

### Logic Flow
1. A function `set_cross_track_domains(dl)` is created to process the input data.
2. The `brand` variable is assigned the value of `dl.Brand`.
3. The function uses conditional checks (`if...else if` statements) to determine the appropriate domains based on the brand.
4. Depending on the value of `brand`, the function returns a corresponding array of domains or `undefined` if the brand does not match any predefined options.
5. The returned `set_cross_track_domains` method is then assigned to `b.cross_track_domains`, making it available for use elsewhere.

### Dependencies
- The extension relies on the `eventType` and `eventPayload` objects, which are guaranteed to be present.
- This extension interacts with a global object, `b`, which serves as a context for the function and potentially allows for cross-extension compatibility within Tealium iQ.

## 3. Usage Examples

### Normal Conditions
For instance, when the `udo.Brand` is set to "Halifax":
```javascript
var crossTrackDomains = b.cross_track_domains(udc.data);
// Returns: ["halifax.co.uk", "halifax-online.co.uk", "halifaxsharedealing-online.co.uk"]
```
When the `udo.Brand` is set to "Lloyds":
```javascript
var crossTrackDomains = b.cross_track_domains(udc.data);
// Returns: ["lloydsbank.co.uk", "lloydsbank.com"]
```

### Edge Conditions
If `udo.Brand` is set to a value that does not correspond to any cases in the function:
```javascript
var crossTrackDomains = b.cross_track_domains(udc.data);
// Returns: undefined (no domains defined for the specified brand)
```

## 4. Known Limitations & Gotchas

- The function currently does not handle scenarios where `udo.Brand` is set to an unexpected or invalid value, leading to undefined behaviour. It's good practice to ensure that `udo.Brand` only contains predefined options.
- There is no fallback mechanism for brands that do not match the existing conditions, which might lead to difficulties in cross-domain tracking.
- Conflicts may arise if there are other extensions within Tealium that modify or interfere with the global object `b`.

## 5. Recommendations for Refactoring

- **Defensive Checks**: It may be beneficial to add a basic check that logs an error when an unsupported brand is encountered.
- **Modularization**: Consider refactoring the domain definitions into a separate mapping function or object for easier modification and maintenance.
- **Consistency Checks**: Ensure consistent handling of all potential values for `udo.Brand` to prevent issues due to typos or changes in brand naming conventions.

## 6. Maintenance & Further Notes

- **Ownership**: It is recommended that a specific team member be assigned as the owner of this extension for consistency in maintenance.
- **Testing Guidelines**: Regularly test the extension with various values for `udo.Brand` to ensure expected functionality, particularly after introducing changes to related extensions or global objects.
- **Documentation Updates**: Keep this documentation updated with any changes to the logic or functionality of the extension to ensure all stakeholders are aligned.

---

This document serves as a comprehensive guide for understanding, using, and maintaining the GA360 cross-track domain list extension within Tealium iQ. It is intended for use by developers and stakeholders involved in the implementation and management of tracking strategies within the platform.