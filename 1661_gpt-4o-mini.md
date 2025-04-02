# Tealium iQ Extension Documentation: ContentSquare Custom Variables

## 1. Extension Overview
- **Name**: ContentSquare Custom Variables
- **ID**: 1661
- **Type**: Javascript Code
- **Scope**: 1471
- **Execution Frequency**: On every 'view' event

### Summary
The "ContentSquare Custom Variables" extension is designed to create and manage custom variables for the ContentSquare analytics platform. It retrieves data from the event payload and constructs a comprehensive set of variables that aid in tracking user interactions and page characteristics. This enables enhanced analytics capabilities, ensuring insights into user behaviour and content performance.

---

## 2. Code Explanation

### Key Variables
- `csDefinitions`: An object that defines mapping between different page attributes and their corresponding keys in the event payload.
- `csVariables`: An object that stores the processed custom variables, combining the keys from `csDefinitions` with their respective values from the `eventPayload`.
- `csVariableIDs`: An array of identifiers representing the keys for the custom variables that will be pushed to the ContentSquare analytics.

### Logic Flow
1. **Definition Mapping**: The extension defines a mapping for various attributes (like PageRole, ProductGroup, etc.) that it expects in the `eventPayload`.
2. **Variable Extraction**: It processes each attribute defined in `csDefinitions`, extracts the corresponding values from `eventPayload`, and formats them into a string separated by " > ".
3. **AdobeMatchKey Handling**: Attempts to extract `AdobeMatchKey` from a specific property within the event payload. If unsuccessful, it gracefully handles the error without interruption.
4. **Custom Variable Submission**: For each variable defined in `csVariableIDs`, it pushes a custom variable set operation to the `_uxa` array if the event type is 'view'.

### Dependencies
- The code relies on the presence of the global `window._uxa` array.
- It also assumes that the `eventType` and `eventPayload` parameters are provided correctly by Tealium.

---

## 3. Usage Examples

### Normal Condition
- Upon a view event, the extension processes the `eventPayload`, extracts the predefined variables (e.g., Brand, Channel), and pushes them to `_uxa`. For instance:
  - If `eventPayload` includes:
    ```json
    {
      "PageRoleFamily": "Product Page",
      "Brand": "BrandX",
      "ProductFamily": "Electronics"
    }
    ```
  - The extension would create a custom variable: 
    ```
    _uxa.push(['setCustomVariable', 1, 'Brand', 'BrandX']);
    ```

### Edge Condition
- If the `AdobeMatchKey` extraction fails (e.g. the specified key doesn't exist in `eventPayload`), the extension will continue processing without interruption or error:
  - Input: 
    ```json
    {
      "cp.AMCV_230D643E5A2550980A495DB6%40AdobeOrg": "MCMID|"
    }
    ```
  - Output: The AdobeMatchKey variable will simply not be set.

---

## 4. Known Limitations & Gotchas

- **Missing Data**: The extension assumes that specific keys will always be in the `eventPayload`. If these keys are absent, the resulting custom variables may be empty or missing.
- **Cascading Joins**: The output string of each custom variable is formatted using " > ". If any key is missing, the resultant string may not convey comprehensive data.
- **Potential Conflicts**: If other extensions modify the `_uxa` array or interact with the same custom variable identifiers, conflicts may arise, leading to inaccurate or incomplete analytics.
- **AdobeMatchKey Logic**: In cases where the expected format of `cp.AMCV_230D643E5A2550980A495DB6%40AdobeOrg` changes, the extraction logic may fail without notice.

---

## 5. Recommendations for Refactoring

- **Modular Code**: Consider breaking the script into smaller functions to enhance readability and reusability, e.g. separating variable extraction into its own function.
- **Defensive Coding**: Introduce additional checks to ensure that expected keys exist in the `eventPayload` before attempting to access their values, enhancing robustness against unexpected data formats.
- **Consistent Formatting**: Ensure that the constructed variable strings are consistently formatted to meet the requirements of any downstream systems that consume them.
- **Comments & Documentation**: Adding inline comments to elaborate on the purpose of complex logic would benefit future maintainers of the code.

---

## 6. Maintenance & Further Notes

- **Ownership**: Designate a lead developer to oversee changes to this extension and ensure best practices are adhered to.
- **Testing Guidelines**: Establish a robust testing framework to validate the extension's functionality with various payloads, especially focusing on edge cases.
- **Update Schedule**: Regularly review the extension's performance and any dependencies to ensure it continues to meet organisational analytics needs effectively.

By documenting this extension thoroughly, we ensure all developers have the knowledge necessary for its successful implementation and can easily maintain and improve its functionality over time.