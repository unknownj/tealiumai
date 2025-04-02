# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name**: Celebrus RTIM Code
- **ID**: 1506
- **Type**: Advanced JavaScript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
This extension interfaces with the LBG Analytics JavaScript library to manage leads and interactions for real-time integration with the Celebrus platform. It retrieves, processes, and sends data related to user interactions (clicks) on lead components through specific elements identified by data attributes. It also maintains a history of interactions to manage duplicate clicks and potential "negative clicks" (false impressions).

## 2. Code Explanation

### Key Variables
- **`$`**: A reference to the LBG Analytics jQuery-like object for accessing DOM elements.
- **`LBGAnalytics.leads`**: An object namespace for encapsulating lead-related methods.

### Logic Flow
1. **Initialization**: 
   - The code begins by defining `LBGAnalytics.leads` and initializes it as an empty object if it doesn't exist.
   
2. **Lead Data Parsing**:
   - The `parseCMSID` function extracts and organises lead information from a string, returning an object with various attributes.
   
3. **Lead Retrieval**:
   - Functions (`getAllLeads`, `getVisibleLeads`) fetch all leads from the DOM or specifically those that are visible.
   - `getFailedLeads` checks for errors related to lead data from a global variable and returns any failed entries.

4. **Response Handling**:
   - `getAllResponses` aggregates successful and failed leads, mapping them to a common response format for easier processing.

5. **Event Handling**:
   - The `leadClick` function captures click events on lead elements and sends pertinent data to both Celebrus and Adobe systems, ensuring duplicates are managed using a history array.
   - `listenForLeads` sets a polling interval to continually check for new leads and manage events, including potential negative clicks.

### Global Dependencies
- **`LBGAnalytics`**: The primary object that the extension builds upon, which must be defined and available in the global scope before this extension runs.

## 3. Usage Examples

### Scenario 1: Normal Operation
1. A user views a product page.
2. The extension retrieves and sends any leads present on the page.
3. The user clicks on a lead element (e.g., a button).
4. The `leadClick` method processes this event, sending the click data to the tracking services.

### Scenario 2: Edge Case Handling
1. If a user clicks on a lead more than once in quick succession, the `duplicateClick` flag prevents multiple entries into the interaction history.
2. If a lead element does not have the expected format, the `catch` block in `parseCMSID` ensures that the extension does not break, reporting errors in the console instead.

## 4. Known Limitations & Gotchas

- **Negative Clicks**: If not properly managed, a misidentified negative click may hinder user experience by causing valid interactions not to be sent.
- **Event Duplication**: If a user clicks a lead and quickly interacts with another lead of the same content path, the duplicate detection logic may prevent the second interaction from being processed correctly.
- **Polling Impact**: The use of setInterval for polling may lead to performance issues or conflicts with extensive DOM operations if many elements marked with `data-content-path` exist on the page.

## 5. Recommendations for Refactoring

- **Code Structure**: The code could be modularised into separate files or methods that adhere to a single-responsibility principle. Each function should focus on one task (e.g., separate parsing from event management).
- **Error Handling**: Consider using more descriptive error logging or providing fallback behaviours when key data is absent.
- **Optimization**: Use `.each()` rather than `map()` where possible if modifications to elements are not returning a new array—aiming to reduce memory usage.
  
## 6. Maintenance & Further Notes

- **Ownership**: Assign a primary maintainer for this extension who will oversee updates and modifications in tandem with any organisational changes in analytics requirements.
- **Testing Guidelines**: Ensure thorough testing of click events and data retrieval across various browsers and devices to guarantee consistency and reliability.
- **Document Changes**: Any updates to the code should be well documented, indicating the purpose and expected impact of those changes on existing functionality.

This documentation serves as a comprehensive guide for developers and stakeholders for understanding, using, and maintaining the Celebrus RTIM Code extension within the Tealium iQ platform.