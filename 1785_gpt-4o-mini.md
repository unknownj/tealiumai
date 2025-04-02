# Tealium iQ Extension Documentation: ReciteMe Feature Impressions

## 1. Extension Overview

- **Name**: ReciteMe Feature Impressions
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
The "ReciteMe Feature Impressions" extension is designed to collect and structure user preference data related to accessibility features provided by the ReciteMe toolbar. This extension retrieves cookie information concerning user settings and formats it for further processing within the Tealium ecosystem. It aims to enhance accessibility reporting by tracking how users are engaging with various features of the ReciteMe tool.

---

## 2. Code Explanation

### Key Variables
- **reciteMeCookieData**: This variable holds parsed JSON data extracted from the cookie named `Recite.Preferences`. It includes the user's chosen accessibility settings.
- **rmData**: An object that collects various accessibility feature settings such as the toolbar visibility, font size, and colour scheme.

### Logic Flow
1. The code begins by searching for a cookie named `Recite.Preferences`. If it is not found, the function exits early.
2. If the cookie exists, it retrieves user preferences and stores relevant information in the `rmData` object.
3. Each aspect of the user's preferences is checked; if a value does not exist or is equal to `"null/null"`, that particular property is deleted from the `rmData` object.
4. Finally, the collected data is formatted into a semicolon-separated string prefixed with "RECITEME/" and is assigned to `b.AccessibilityImpressions` for further use.

### Dependencies
This extension relies on global objects:
- `document.cookie`: Utilised to read cookie values.
- The `eventType` and `eventPayload` parameters are expected to be present as per the extension's context within Tealium.

---

## 3. Usage Examples

### Normal Conditions
- When the ReciteMe cookie `Recite.Preferences` is set, for example:
  ```json
  {
    "style": {
      "font": {
        "size": 120,
        "face": "Arial"
      },
      "backgroundColor": "#ffffff",
      "font": {
        "color": "#000000"
      },
      "screenMask": {
        "enabled": true
      },
      "ruler": {
        "enabled": true
      }
    },
    "magnifier": {
      "enabled": false
    }
  }
  ```
  The extension will output:
  ```
  RECITEME/toolbar/true;RECITEME/fontSize/120;RECITEME/fontFace/Arial;RECITEME/colorScheme/#ffffff/#000000;RECITEME/mask/true;RECITEME/ruler/true;RECITEME/magnifier/false
  ```

### Edge Conditions
- If the `Recite.Preferences` cookie is missing or malformed, the function will bypass any data collection, resulting in an empty `b.AccessibilityImpressions`.

---

## 4. Known Limitations & Gotchas

- **Cookie Dependency**: The operation of this extension is entirely contingent on the presence and format of the `Recite.Preferences` cookie. If it is absent, no data will be collected.
- **Malformed JSON**: If the cookie data is corrupted or improperly formatted, the extension may throw an error during `JSON.parse`, leading to unintended consequences.
- **Potential Conflicts**: There may be conflicts with other extensions that manipulate cookies or rely on similar naming conventions, requiring careful auditing of existing extensions to prevent overlapping functionality.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: While not required here, consider adding checks to validate the structure of `reciteMeCookieData` before accessing its properties; this would help prevent runtime errors if the cookie format changes.
- **Enhanced Code Readability**: Use descriptive variable names to clarify usage. For instance, replace `a` and `b` with more meaningful identifiers relevant to your application context.
- **Function Modularisation**: Consider separating the cookie parsing logic into a dedicated function to isolate functionality and improve testability.
- **Commenting**: Include in-line comments that detail the purpose of sections and specific lines for easier understanding and maintenance.

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign a specific individual or team to oversee the maintenance and updates of this extension, ensuring accountability.
- **Testing**: Rigorous testing in different environments is necessary to confirm that the extension behaves as expected with various cookie states.
- **Documentation Updates**: Regularly review and update this documentation to reflect any changes in functionality or requirements.

---

### Conclusion
This documentation serves as a comprehensive guide for understanding the "ReciteMe Feature Impressions" Tealium iQ extension. By following the outlined recommendations and being aware of the limitations, developers and stakeholders can effectively utilise, maintain and enhance the extension's functionality.