# Tealium iQ Extension Documentation: AEM Link Tracking

## 1. Extension Overview
- **Name:** AEM Link Tracking
- **ID:** 100040
- **Type:** Advanced JavaScript Code
- **Scope:** DOM Ready
- **Execution Frequency:** Run Once

### Summary
The AEM Link Tracking extension is designed to enhance the tracking of user interactions with various links on the page. By monitoring clicks on links, the extension collects valuable data that can be used for analytics and reporting, aiming to provide insights into user behaviour across different sections of the website.

## 2. Code Explanation

### Key Variables
- **`LBGAnalytics`:** A global object representing the analytics functionality implemented by the client.
- **`navLinks`:** An object within `LBGAnalytics` that handles the functionalities related to link tracking.

### Logic Flow
1. **Add Click Handlers:** The `addClicksToSection` function is invoked for different sections of the webpage (header, footer, main, etc.) to set up tracking for links.
   
2. **Data Processing:**
   - Links are selected based on provided selectors.
   - Each link is mapped to an object containing details such as:
     - `linkArea`: The section in which the link resides.
     - `linkIndex`: The position index of the link.
     - `href`: The URL associated with the link.
   - Additional properties are computed:
     - `linkDepth`: Represents the depth of the link in the navigation hierarchy.
     - `linkName`: The text or aria-label associated with the link.
     - `linkAction`: Categorises the type of link based on its URL (e.g., same site, same brand, etc.).
     - `linkValue`: A formatted string that combines multiple link attributes for easier tracking.

3. **Store Click Data:** Click events are registered for each link, invoking `storeClickData` when a link is clicked, which stores the click information in session storage.

4. **Retrieve Click Data:** The `retrieveClickData` function allows the retrieval of stored click data, checking for expiration based on a set duration.

### Dependencies on Global Objects or Libraries
- **LBGAnalytics:** Utilised as a primary namespace for analytics functions.
- **jQuery (`$`):** The code assumes jQuery is available as it's used for element selection and event handling.

## 3. Usage Examples

### Normal Condition
When a user clicks a link in the header, the extension collects the following data:
- Area: "header"
- Depth: Based on the link's parent classes.
- Index: Position of the link in the list of header links.

This data is then stored for later retrieval analytics.

### Edge Condition
If a link's URL does not conform to the expected patterns (e.g., does not start with "http" or is malformed), the `linkAction` field may not be populated correctly. The extension performs checks to ensure some default values are set, but malformed URLs could lead to inconsistent data.

## 4. Known Limitations & Gotchas
- **Session Storage Limitation:** The click data is stored in session storage, which is cleared after a browser tab is closed. This may result in any accumulated data being lost on page refresh.
- **Inconsistent Link Text:** If the link text varies or is blank across the same link, tracking might be skewed due to duplicated `linkName`.
- **External Link Tracking:** The `linkAction` logic may need adjustments if external domains are added to the tracking.

## 5. Recommendations for Refactoring
- **Error Handling:** Implement more robust error handling, especially when interacting with session storage or JSON parsing.
- **Code Modularity:** Consider splitting long functions into smaller ones to improve clarity and maintenance.
- **Consistency in Data Structures:** Standardise how link data is accessed and transformed. This ensures easier updates in the future.
- **Performance Optimisation:** Assess and reduce the number of DOM queries, as excessive jQuery selections can lead to performance degradation, especially on larger DOMs.

## 6. Maintenance & Further Notes
- **Ownership:** Assign a dedicated owner for the extension to ensure that updates and maintenance are regularly performed.
- **Testing:** Ensure thorough testing with various link structures across multiple sections of different user journeys.
- **Documentation Updates:** Maintain the documentation in sync with any changes made to the code to ensure all stakeholders are aware of the current functionality.

This documentation provides a comprehensive overview of the AEM Link Tracking extension, detailing its purpose, functionality, and areas for improvement. By adhering to the recommendations and maintaining an active testing regimen, the extension can remain robust and effective in tracking user interactions.