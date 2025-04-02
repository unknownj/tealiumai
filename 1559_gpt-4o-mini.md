# Tealium iQ Extension Documentation: Show and Hide

## 1. Extension Overview
- **Name**: Show and Hide
- **ID**: 1559
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The "Show and Hide" extension aims to dynamically show or hide elements on specific pages based on user interactions and predefined criteria. It integrates with Tealium's data layer and analytics, allowing collection of user journey data as users navigate through different steps of online application forms. This functionality enhances user experience by guiding users through the application process and providing analytics on user interaction.

## 2. Code Explanation

### Key Variables
- **LBGAnalytics**: A global object that encapsulates all analytics functionalities.
- **$**: A reference to the jQuery-like object provided by LBGAnalytics, enabling DOM manipulation.
- **Q**: A method within LBGAnalytics for evaluating conditions on the page, likely similar to `jQuery`.

### Logic Flow
1. **Registration of Pages**: The extension registers multiple pages with specific criteria (e.g., `CanonicalPath`) and associated selectors. 
2. **Registration Function**: The `registerPage` function captures each page's journey data and defines actions based on user clicks. It increments a counter for each invocation of the registered handler.
3. **Delayed Data Setting**: The extension sets analytics data to the data layer either on immediate load (if no selector is specified) or on click events for specified selectors.
4. **Data Extraction**: For specific paths, the extension extracts user-related data from visible elements and sets it to the data layer, ready for analytics integration.

### Dependencies
- **LBGAnalytics**: The code relies heavily on the global `LBGAnalytics` object for handling events, manipulating the DOM, and interacting with the data layer.

## 3. Usage Examples

### Normal Conditions
For the URL `CanonicalPath contains /pensions-transfer/application.html`, the extension sets the data layer with:
```javascript
JourneyName: "Retail New RA Application",
JourneyStep: 0,
JourneyStepName: "Taking Money From Pension",
ApplicationState: "Application",
JourneyProduct: "Retail Retirement Account"
```
Based on user interactions with the selector (e.g., `"[data-show-elements*=about-you]"`), further data is pushed to the data layer on click events.

### Edge Conditions
If the registered page is visited but the specified element does not exist (i.e., `selector` is invalid), nothing will be registered, which means there will be no interaction captured for that specific scenario. It’s essential to ensure that selectors are valid and exist on the page.

## 4. Known Limitations & Gotchas
- **Selector Validity**: Any misconfigured selectors (non-existing DOM elements) will lead to no interactions being captured, potentially causing data loss.
- **Performance**: A large number of click handlers on the same page may degrade performance, particularly if the DOM structure is complex.
- **Dependence on Specific Paths**: As the logic heavily relies on the `CanonicalPath`, any change to the paths (URL structure) would necessitate updates to this extension.
- **Global Namespace Pollution**: It may cause issues if other scripts on the site also use the same global variable names or alter LBGAnalytics. Care must be taken to ensure compatibility.

## 5. Recommendations for Refactoring
- **Error Handling**: Consider adding checks to validate whether elements exist before attaching event handlers to prevent unexpected failures.
- **Modularization**: Group related registration calls to avoid repetition. This could enhance code maintainability.
- **Documentation and Naming**: Improving inline comments to comprehensively describe each block of code and its purpose would be beneficial for future developers interacting with the codebase.
- **Performance Optimization**: If performance issues arise, consider debouncing click events or using event delegation to manage handler registrations effectively.

## 6. Maintenance & Further Notes
- **Ownership**: Assign a specific team member or group to maintain this extension. They should regularly check for updates and ensure the extension remains functional as frontend or backend systems evolve.
- **Testing Guidelines**: Regular testing is essential, particularly after any changes to the data layer or user journey. Automated unit tests could help identify failures early.
- **Documentation Updates**: Keep this documentation updated with code changes to ensure it remains a reliable reference for developers and stakeholders.

This comprehensive documentation aims to provide insights into the "Show and Hide" extension, ensuring that developers and analysts can effectively implement, maintain, and troubleshoot the extension.