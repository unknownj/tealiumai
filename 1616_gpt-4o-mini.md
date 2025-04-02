# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Set Mapp Brand ID
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: 1460
- **Execution Frequency**: On every event triggered

### Summary
The **Set Mapp Brand ID** extension is designed to map specific brand names to their corresponding Mapp Brand IDs. By utilising a predefined lookup table, it assigns a unique identifier based on the `Brand` property found in the event payload. This extension facilitates data consistency and alignment with the Mapp analytics framework, ensuring that the correct Brand ID is tracked across various data layers.

---

## 2. Code Explanation

### Key Variables
- **mappBrandLookup**: An object that contains key-value pairs where each key is a brand name and the corresponding value is its Mapp Brand ID.
  ```javascript
  var mappBrandLookup = {
    "Lloyds": "206",
    "Halifax": "207",
    "BOS": "208"
  };
  ```

### Logic Flow
1. **Invocation**: The extension is invoked with three arguments: `eventType`, `eventPayload`, and `tagObject`.
2. **Lookup Process**: The code checks if the `Brand` present in the `eventPayload` is a key in the `mappBrandLookup` object.
   ```javascript
   if(mappBrandLookup[b.Brand]){
       b.MappBrandID = mappBrandLookup[b.Brand];
   }
   ```
3. **Assignment**: If a match is found, the corresponding Mapp Brand ID is assigned to `b.MappBrandID`.

### Dependencies
- This extension relies on the global objects `eventType`, `eventPayload`, and `tagObject` provided by Tealium environments, which are guaranteed to be available during execution.
- No external libraries or dependencies are utilised in this extension.

---

## 3. Usage Examples

### Normal Conditions
When an event payload contains a valid `Brand`, the extension will successfully assign the Mapp Brand ID. For example:
- **Input**: `{ "Brand": "Lloyds" }`
- **Output**: `{ "MappBrandID": "206" }`

### Edge Conditions
1. **Unrecognised Brand**:
   - **Input**: `{ "Brand": "Unknown" }`
   - **Output**: No `MappBrandID` is assigned, leaving it undefined.

2. **Missing Brand**:
   - **Input**: `{ }`
   - **Output**: No changes made to the `eventPayload`.

---

## 4. Known Limitations & Gotchas
- **Unmapped Brands**: Brands that are not present in the `mappBrandLookup` object will not be assigned a Mapp Brand ID, potentially leading to untracked or misidentified data.
- **Key Sensitivity**: The lookup relies on exact matches of the `Brand` property (case-sensitive), so variations in spelling or case will yield no results.
- **Potential Conflicts**: If multiple extensions are modifying the same `eventPayload`, there might be conflicts in data, especially if another extension is manipulating `MappBrandID` or `Brand`.

---

## 5. Recommendations for Refactoring
- **Defensive Checks**: While the availability of `eventType` and `eventPayload` is guaranteed, consider logging or handling scenarios where the `Brand` attribute is absent or incorrectly formatted.
- **Code Style**: Use consistent naming conventions and indentation styles to enhance readability. Consider comments for complex logic sections.
- **Modularisation**: While scoped to a single function, future extensions may benefit from breaking out the lookup mechanism into a reusable function, enabling more flexible testing and adjustments.

---

## 6. Maintenance & Further Notes
- **Ownership**: Assign a dedicated developer to oversee the maintenance of this extension, with a focus on updates to brand mappings as business needs evolve.
- **Testing Guidelines**: Regularly field test the extension using a variety of brand names to ensure robust performance. Consider setting up unit tests to automate validation of expected inputs and outputs.
- **Documentation Updates**: Maintain this documentation alongside any changes made to the extension or its dependencies, ensuring that it remains current and accurate.

--- 

This documentation serves as a detailed reference for developers and stakeholders looking to understand the functionality and maintenance of the **Set Mapp Brand ID** extension within the Tealium iQ framework.