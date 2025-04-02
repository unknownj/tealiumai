# Tealium iQ Extension Documentation: Event Enrichment

## 1. Extension Overview

- **Name**: Event Enrichment
- **ID**: 1215
- **Type**: Advanced Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The Event Enrichment extension is designed to enhance user event tracking by capturing user gender based on title and products held by the user on the account overview page. This information is pivotal for segmenting analytics and improving user understanding and targeting.

## 2. Code Explanation

### Key Variables
- `e`: A reference to the `window.LBGAnalytics.events` object, responsible for handling analytics events.
- `title`: Extracted from the DOM; indicates the user's title (e.g., Mr, Mrs) to determine gender.
- `gender`: Derived from the `titleLookup` object, translating the title into a gender value.
- `productLookup`: A mapping from product codes to human-readable product names.
- `products`: An array of products held by the user, obtained by mapping over `window.CoreDispatcher.loadMeta`.

### Logic Flow
1. The function checks if the event type (`a`) is `"view"` and triggers `e.pageView()` if true.
2. If the pathname includes `"account_overview"` and `window.CoreDispatcher.loadMeta` is defined:
   - The title is retrieved and gender is determined using `titleLookup`.
   - The `b.CustomerGender` property is set for the analytics payload, if gender is identified.
3. The function retrieves product data from `loadMeta`, converting the codes to human-readable formats using `productLookup`.
4. Any undefined products are filtered out, ensuring a clean list of held products.
5. Finally, the products are sent to analytics through `e.productsHeld(products)`.

### Dependencies
- Relies on `window.LBGAnalytics` and `window.CoreDispatcher`. Proper functionality is contingent upon these global objects being available.

## 3. Usage Examples

### Normal Scenario
1. A user with the title "Mr" navigates to the account overview page.
2. The extension captures this title and translates it to "Male", setting `b.CustomerGender` accordingly.
3. If the user holds products identified by codes (e.g., `"SD"`, `"TD"`), they are converted to `"Sharedealing"` and `"Treasury Deposit"`, respectively, and sent to analytics.

### Edge Case Scenarios
- If a user does not have a title that exists in the `titleLookup`, then `b.CustomerGender` remains undefined.
- If `window.CoreDispatcher.loadMeta` is absent or does not contain valid product codes, the products array could be empty, but no error will be thrown.

## 4. Known Limitations & Gotchas

- **Absence of Title**: If the title element (`.m-hf-02-name`) is missing from the DOM, the `title` will not be set, leading to no gender being captured.
- **Product Code Mapping**: If new product codes are introduced, the `productLookup` must be updated manually to ensure proper mappings are maintained.
- **Performance Concerns**: Excessive undefined values may lead to performance inefficiencies as products are filtered multiple times to clean up.

## 5. Recommendations for Refactoring

- **Modularisation**: Consider breaking the logic into smaller functions to improve readability and maintainability. Functions could be created for gender determination and product mapping.
  
  ```javascript
  function getGender(title) {
      return titleLookup[title] || null;
  }
  
  function mapProducts(loadMeta) {
      ... // implement the product mapping logic
  }
  ```

- **Defensive Checks**: While the availability of `eventType` and `eventPayload` is guaranteed, adding checks around the presence of DOM elements (like the title query) could enhance robustness.
- **Inline Comments**: Adding comments throughout the code can help future developers understand the purpose of each section quickly.

## 6. Maintenance & Further Notes

- **Ownership**: Designate a team member to oversee the extension's updates. Regularly review and test the functionality with updates to the codebase or external dependencies.
- **Testing Guidelines**: Implement unit tests where feasible, particularly focusing on edge cases such as missing DOM elements or product codes.
- **Documentation Updates**: As the code evolves, ensure this document is revisited and updated to reflect changes in functionality or logic accurately.

By following these guidelines, the Event Enrichment extension will maintain its relevance and utility within the Tealium iQ ecosystem, ensuring optimal performance in tracking user behavior.