# Yext Search Analytics Extension Documentation

## Extension Overview
- **Name**: Yext Search Analytics
- **ID**: 1745
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
The Yext Search Analytics extension is designed to collect and send analytics data regarding user interactions with search functionalities on Yext-hosted web pages. This extension captures key variables such as search terms entered by users, vertical impressions based on navigation, and content impressions (like FAQs, products, and locations displayed). The data collected helps in understanding user behaviour and optimising content for better engagement.

## Code Explanation

### Key Variables
1. **verticalContext**: Stores the current vertical context (e.g., "ALL", "None").
2. **verticalImpression**: An array to track impressions related to the currently active vertical.
3. **contentImpression**: An array to track content impressions including FAQs, tools, products, etc.
4. **searchTerm**: Captures the search term inputted by the user.

### Logic Flow
1. **Environment Check**: The extension initiates only if the hostname contains specific identifiers (e.g., `.pagescdn.com` or `answers.`).
2. **Search Term Capture**: Tries to obtain the user’s search term from the input field.
3. **Vertical Tab Navigation Tracking**:
   - If the active tab is a vertical tab, it captures the associated verticalKey.
   - If the active tab is "All", it collects vertical impressions based on displayed results.
4. **Content Impressions Collection**:
   - Collects impressions for FAQs, tools, products, case studies, help articles, and locations, restricting to the first five items in each category, cleaning the text by removing non-alphanumeric characters.
5. **Payload Construction**: Constructs an object (`payload`) containing the journey name, product, tariff, interface impressions, and search terms and sends it to `eventPayload`.

### Dependencies
- The extension relies on:
  - **DOM Elements**: Queries specific to the document structure (e.g., class names, input fields) which are expected to exist on the page when the extension runs. 
  - **Global Objects**: It uses the `window` and `document` global objects extensively for checking conditions and capturing data.

## Usage Examples

- **Normal Operation**:
  - When a user searches for "digital marketing" on a Yext page, the extension captures "digital marketing" as the search term, records which vertical is active, and lists what FAQ items or products were displayed with their titles formatted correctly.

- **Edge Cases**:
  - If the search bar is empty, the `searchTerm` variable will be an empty string but will still pass through without failing the extension.
  - If no results are found, it will capture "NO_RESULTS" as part of `contentImpression`, reflecting this state without throwing an error.

## Known Limitations & Gotchas

- **Error Handling**: The extension uses `try-catch` blocks liberally, which can obscure errors if the underlying DOM structure changes and could lead to silent failures.
- **Dependency on DOM Structure**: The extension relies heavily on the existing structure of the Yext HTML elements. Any changes in class names or structure may lead to incorrect data collection or missed events.
- **Performance Impact**: The extensive use of DOM queries (especially in `Array.from`) may lead to performance issues on pages with a large number of elements being processed during runtime.

## Recommendations for Refactoring

- **Modularisation**: Consider breaking down the code into smaller functions that handle specific tasks (like extracting search terms, building the payload, etc.) to improve readability and maintainability.
- **Defensive Checks**: While the requirements specify not to worry about defensive coding regarding `eventType` and `eventPayload`, adding checks to ensure that queried DOM elements exist before accessing their properties would improve robustness.
- **Minimise Use of `try-catch`**: Limiting the scope of `try-catch` statements to critical areas could make it easier to diagnose issues if they arise.

## Maintenance & Further Notes

- **Ownership**: Assign an owner or a team to oversee the extension to ensure updates can be made as the site evolves.
- **Testing Guidelines**: Regularly test the extension to ensure compatibility with the existing DOM structure, especially after any updates to the site or its content.
- **Logging**: Implement logging for capturing performance metrics and errors, aiding future debugging efforts.

This document serves as a comprehensive guide for developers and stakeholders to understand, maintain, and improve the Yext Search Analytics extension effectively.