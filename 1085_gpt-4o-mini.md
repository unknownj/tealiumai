# Tealium iQ Extension Documentation: WTA : TAG : Set : Tealium Version

## 1. Extension Overview

- **Name**: WTA : TAG : Set : Tealium Version
- **ID**: 1085
- **Type**: Javascript Code
- **Scope**: 894
- **Execution Frequency**: On every user interaction (event-driven)

### Summary
This Tealium iQ extension is designed to set and append the Tealium version information to a global variable (`FullTealiumVersion`). The extension extracts the current Tealium IQ version and, if the environment is not production, modifies the document title to include the current environment name. This adaptation improves the visibility of which environment the user is interacting with, assisting in diagnostics and testing.

---

## 2. Code Explanation

### Key Variables
- **`utv`**: Holds the numeric part of the current Tealium IQ version, derived from the variable `b["ut.version"]`.
- **`ute`**: Represents the current environment (e.g. `prod`, `dev`, etc.), fetched from `b["ut.env"]`.

### Logic Flow
1. The extension begins by obtaining the current Tealium IQ version.
2. It splits this version string to retrieve the latest numeric segment (e.g., `1.0.0` becomes `0`).
3. It concatenates this version number to `b.TealiumVersion`, resulting in a composite version string stored in `b.FullTealiumVersion`.
4. If the current environment (`ute`) is not production:
   - It appends the environment name to `b.FullTealiumVersion`.
   - It checks the document title. If the title does not start with the environment name, it prepends the environment name to it.

### Dependencies
- **Global Variables**: The script depends on the presence of `b["ut.version"]` and `b["ut.env"]`. These are expected to be set by the Tealium system during tag execution.
- **Document Object**: Utilises the `document.title` object to modify the webpage title based on environment conditions.

---

## 3. Usage Examples

### Normal Scenario:
1. If `b["ut.version"]` is `1.0.0` and `b["ut.env"]` is `prod`:
   - `b.FullTealiumVersion` will be set to `TealiumVersion/0` (last segment of version).
   - Document title remains unchanged.

### Edge Condition 1:
2. If `b["ut.version"]` is `1.0.0` and `b["ut.env"]` is `dev`:
   - `b.FullTealiumVersion` will be set to `TealiumVersion/0/dev`.
   - If `document.title` initially is `Page Title`, it will change to `dev: Page Title`.

### Edge Condition 2:
3. If `b["ut.version"]` is malformed (e.g., not in the expected format):
   - The extension might fail at `utv = b["ut.version"].split(".")`, leading to potential JavaScript errors.

---

## 4. Known Limitations & Gotchas

- If `b["ut.version"]` does not follow the expected string format, the code may throw errors during the split operation.
- This extension assumes that `b["ut.version"]` is always defined, but if it isn’t, handling must be added externally.
- Modifying `document.title` may conflict with other scripts that expect to manage the title. Care must be taken to ensure that this modification does not interfere with other title-setting logic.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Implement checks to ensure that `b["ut.version"]` conforms to a valid version string before splitting.
- **Modularisation**: Consider encapsulating the version extraction logic into a separate function to improve readability.
- **Logging**: Add console logs or a mechanism for capturing erroneous versions for future debugging.
- **Documentation**: In-line comments could be more descriptive for better understanding of each step.

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign a specific developer or team responsible for maintaining this code to ensure clarity about changes and updates.
- **Testing Guidelines**:
  - Regularly test in different environments (prod, dev) to catch any discrepancies.
  - Verify the impact of changes on `document.title` to avoid unintended consequences in the user experience.
- **Periodic Reviews**: Regularly review the latest Tealium updates for any enhancements that could affect this extension's functionality.

This documentation should serve as a comprehensive guide to understanding, using, and maintaining the WTA : TAG : Set : Tealium Version extension effectively.