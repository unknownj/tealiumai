# Tealium iQ Extension Documentation: GA360 : Set VirtualPathName

## 1. Extension Overview
- **Name**: GA360 : Set VirtualPathName
- **ID**: 1490
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension generates virtual URLs for Google Analytics 360 by machining together multiple data layer (dl) variables into a structured path format based on user navigation and data context. The virtual path is composed of `/PageRole/ApplicationState/ProductGroup/ProductSubGroup/JourneyStep`, allowing for consistent tracking of user interactions across multiple domains and products. The extension also manages variations in naming conventions and transforms certain values, aiding in accurate data collection and reporting. 

---

## 2. Code Explanation

### Key Variables
- **`v`**: String that stores the final virtual path name.
- **`a`**: String of the alphabet used for indexing.
- **`prod`, `prodsub`, `jproduct`, `pagerole`, `appstate`**: Variables pulled from the data layer that represent product-related information, page roles, and application states.
- **`hashAfterBang`, `hashSlashArray`**: Parsed elements from the URL hash used in generating the virtual URL.
- **`dl`**: The data layer object that consists of various tracking variables.

### Logic Flow
1. **Input Variables**: The function starts by retrieving values from the data layer.
2. **Normalization**: Several checks and transformations are applied to standardise names and derive the product type. This includes trimming spaces and replacing specific strings with defined values.
3. **Conditional Logic**: The function employs a series of `if-else` statements to handle different cases for the journey product, product groups, and sub-groups, creating a virtual URL specific to the user’s journey.
4. **Output Generation**: The constructed virtual path is written back to the data layer under the key `VirtualPathName`, with an additional formatted title for GA4 events.
5. **Debug Logging**: In development mode, console logs are produced for better visibility into the internal processing.

### Dependencies
- The extension relies on the existence of global variables defined within the data layer, ensuring proper data flow.
- No external libraries are used beyond what is intrinsically available in the Tealium environment.

---

## 3. Usage Examples

### Scenario 1: Typical User Journey
1. A user navigates to **halifax-online.co.uk** and views a **savings** product.
2. The data layer may contain:
   ```javascript
   {
     "ProductGroup": "Bank Savings",
     "ProductSubGroup": "Fixed Saver 2 Year",
     "PageRole": "product",
     "ApplicationState": "viewing",
     "JourneyStep": "introduction"
   }
   ```
3. The extension will generate a virtual path like `/product/viewing/savings/introduction`.

### Scenario 2: Edge Case with Undefined Product Information
1. A user visits **lloydsbank.co.uk** without defined product data.
2. Data layer input:
   ```javascript
   {
     "ProductGroup": "",
     "PageRole": "landing",
     "ApplicationState": "initial"
   }
   ```
3. The extension will output a simplified virtual path: `/landing/initial`.

### Additional Edge Case
- If there is a journey step but no associated product:
   Input:
   ```javascript
   {
     "PageRole": "servicing",
     "JourneyStep": "Forgotten Logon Details"
   }
   ```
   Output: `/servicing//Forgotten Logon Details`

---

## 4. Known Limitations & Gotchas
- The extension may not handle certain unexpected or malformed inputs gracefully, particularly if required variables (e.g., `ProductGroup`) are undefined.
- Variations in journey product naming may lead to inconsistent virtual path outputs depending on the source of the input data.
- The extension assumes the presence of the `hash` property in the data layer and may fail if this is not defined correctly.

### Potential Conflicts
- The logic within this extension could conflict with other extensions that modify the data layer or manage virtual paths simultaneously. Careful coordination is required when deploying multiple extensions that interact with the same `dl` variables.

---

## 5. Recommendations for Refactoring
- **Modularization**: Consider breaking down the `buildVirtualURL` function into smaller, more manageable helper functions. For example, create distinct functions to normalise product names, handle journey steps, and construct the final output.
- **Defensive Programming**: Implement checks to ensure that critical variables are defined before performing operations on them to avoid potential runtime errors.
- **Commenting**: Enhance the readability of the code by adding more inline comments that clarify the purpose of complex logic segments and decision-making processes.

---

## 6. Maintenance & Further Notes
- **Ownership**: Assign a dedicated owner or team responsible for maintaining the extension and ensuring it aligns with evolving business requirements.
- **Testing**: Establish a testing regimen to verify the correctness of the outputs generated by the extension across various scenarios. This should include unit tests as well as QA against real user journeys.
- **Documentation Updates**: Ensure the documentation is updated whenever changes are made to the code to keep it relevant and accurate for future developers and stakeholders.

---

This documentation is structured for easy access to information relevant to developers working with the Tealium iQ extension, promoting effective collaboration and code maintenance.