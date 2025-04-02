# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Locate all QR codes on the site
- **ID**: 2273
- **Type**: JavaScript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to locate all QR codes present on a webpage, specifically within `<picture>` elements. When QR codes are found, their associated data is extracted and concatenated into a list in the `CustomList` object. This functionality is essential for enabling detailed tracking and analysis of QR code usage across multiple domains, including www.lloydsbank.com, www.halifax.co.uk, www.mbna.co.uk, and www.bankofscotland.co.uk, thereby allowing for tailored marketing and measurement strategies.

---

## 2. Code Explanation

### Key Variables
- **divs**: A NodeList of `<picture>` elements retrieved through `document.querySelectorAll("picture")`.
- **qrs**: An array initialized to store the types of QR codes found on the page.

### Logic Flow
1. The code selects all `<picture>` elements present on the page.
2. It iterates through each `<picture>` element:
   - Checks if it contains the substring ‘qr’ in its innerHTML.
   - If it does, it queries for a child element with the attribute `data-selector` and retrieves its value.
   - The retrieved value is pushed into the `qrs` array.
3. After the iteration, the contents of `qrs` are concatenated to the `CustomList` property on the `eventPayload` object. If `CustomList` already exists, the new values are appended; otherwise, a new string is created.

### Global Objects or Libraries
The extension relies on the global `document` object to access and manipulate the DOM. There are no external libraries or dependencies.

---

## 3. Usage Examples

### Normal Condition
- **Scenario**: On loading the page www.lloydsbank.com, the extension locates three QR codes contained within `<picture>` tags. The resulting `CustomList` in the `eventPayload` would appear as:
  ```
  "QRs/qrcodeType1,qrcodeType2,qrcodeType3"
  ```

### Edge Condition
- **Scenario**: If no QR codes are present on the webpage, the `CustomList` will be set to `"QRs/"` with no additional data. This situation underscores that the extension gracefully handles the absence of QR codes.

---

## 4. Known Limitations & Gotchas

- **Limitation on Element Types**: The extension currently only scans `<picture>` elements, meaning QR codes placed in other HTML elements will not be identified.
- **InnerHTML Dependency**: The use of `innerHTML` to check for the substring 'qr' may yield false negatives if QR codes don't follow a consistent format in the markup.
- **Potential Conflicts**: If other scripts manipulate the `CustomList` at the same time (particularly concurrently running Tealium extensions), there could be unexpected results in how data is consolidated.

---

## 5. Recommendations for Refactoring

1. **Defensive Checks**: Implement checks to validate if `divs` contains elements before attempting to iterate through it. Adding error handling could improve resilience.
   
   Example:
   ```javascript
   if (divs.length) {
       // proceed with existing logic
   }
   ```

2. **Modularization**: Encapsulate the logic in functions (e.g., separate functions for finding QR codes, updating `CustomList`, etc.) for improved readability and maintainability.

   Example:
   ```javascript
   function findQRCodes(divs) {
       // existing QR code finding logic
   }
   ```

3. **Code Style**: Consistently declare variables using `var` to stay compliant with ES5 standards. Ensure proper indentation and clear variable naming.

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly review the extension's effectiveness in identifying QR codes as web standards and user behaviours evolve. Updating the logic will be essential if new QR code implementations are introduced.
- **Ownership**: Designate a responsible party for the upkeep of this extension, ensuring they are familiar with the business logic and potential technical issues.
- **Testing Guidelines**: Create a test suite to verify the functionality of the extension across all specified domains, especially during significant updates or changes in the page structure.

This structured documentation provides a holistic view of the Tealium iQ extension, ensuring clarity for current developers and a guiding resource for future stakeholders.