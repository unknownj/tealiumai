# Tealium iQ Extension Documentation: Show Hide 2 Prototype

## 1. Extension Overview

- **Name**: Show Hide 2 Prototype
- **ID**: 1716
- **Type**: Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The "Show Hide 2 Prototype" extension is designed to trigger specific analytics events when users interact with elements on the page: `/bankaccounts/overdrafts/lloyds-cost-calculator.html`. This extension captures user interactions (e.g., clicks to show elements) and sends corresponding data to the LBGAnalytics datalayer. The aim is to enhance user tracking and insights into how users interact with features on the Lloyds cost calculator page.

## 2. Code Explanation

### Key Variables
- **window.location.pathname**: Checks the current URL path to ensure the extension runs only on the specific page of interest.
- **LBGAnalytics**: A global object that manages data layer interactions and event tracking.
- **analyticsIntegration**: An array of objects, each specifying how to handle data mapping, datalayer updates, and event tracking for different elements.
- **handlers**: An object that contains methods to handle datalayer updates, property mapping, and event sending.

### Logic Flow
1. The extension starts by checking if the current page matches the specified URL path for the Lloyds cost calculator.
2. If it matches, it sets the "Brand" in the datalayer.
3. The extension defines an `analyticsIntegration` array, which contains configurations for tracking.
4. A click event listener is added to the entire document body that checks for specific conditions:
   - If the clicked element has a `data-show-elements` attribute containing a target element specified in the `analyticsIntegration`.
5. If conditions are met, the handlers for datalayer updates, property mapping, and event submission are invoked.

### Dependencies
- **Global Objects**: The code relies on the availability of the `LBGAnalytics` object, which should be loaded prior to this extension. Additionally, it depends on standard DOM methods such as `document.querySelector` and event listener functionality.

## 3. Usage Examples

### Normal Condition
- **Scenario**: A user clicks on a button with a data attribute `data-show-elements` containing `classic-layout`.
- **Flow**: The extension triggers the following:
  - Updates the datalayer with `JourneyProduct: "Classic"`.
  - Maps the text content from `<p scep-template='##total-cost##'>` to `JourneyAmount`.
  - Sends an event with `EventAction: "Select Account"` and `EventNarrative: "Classic"`.

### Edge Condition
- **Scenario**: A user clicks on an element that does not correspond to any `data-show-elements`.
- **Flow**: The extension does nothing as no matching elements are found, thus no datalayer updates or events are sent.

## 4. Known Limitations & Gotchas

- **Single Page Limitation**: Currently, the extension is hardcoded to execute only on one specific path. It will not function on any other pages without modifications.
- **Event Bubbling**: Since the event listener is attached to the document body, it may inadvertently capture clicks on child elements that should not trigger the analytics events.
- **Compatibility with Others**: There could be conflicts with other extensions that also listen for click events on the document body.

## 5. Recommendations for Refactoring

- **Modularisation**: Consider breaking down handlers into separate, modular functions to improve readability and maintainability.
- **Error Handling**: Implement checks for `document.querySelector` to ensure the target element exists before attempting property access.
- **Simplified Conditionals**: Streamline the condition checks in the event listener to reduce complexity and increase performance.
- **Consistent Naming Conventions**: Use a consistent naming pattern for variables and methods to enhance code clarity.

## 6. Maintenance & Further Notes

- **Ownership**: Assign specific team members responsible for updating and maintaining this extension.
- **Testing Guidelines**: Regularly test the extension on the target page post any updates or modifications to ensure functionality remains intact.
- **Documentation Updates**: Keep this documentation updated with any changes made to the extension, including added features or fixed bugs.

This documentation provides a thorough overview and practical insights for developers and stakeholders to ensure effective use and maintenance of the Tealium iQ extension.