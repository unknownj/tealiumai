# Tealium iQ Extension Documentation: Travel Money Pref Rates

## 1. Extension Overview
- **Name**: Travel money pref rates
- **ID**: 1648
- **Type**: JavaScript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension detects whether a user is engaging with a travel money journey providing preferential rates. Based on the user's journey step within the process, it evaluates the presence of a preferential rate icon on the page. Depending on this evaluation, it sends an attribute to LBGAnalytics indicating whether the user is viewing a preferential or standard rate for their travel money.

## 2. Code Explanation

### Key Variables
- `a`: Represents the event type (e.g., "view").
- `b`: An object containing various details about the current event. It includes:
  - `JourneyName`: The name associated with the user's journey (e.g., "BuyTravelMoney").
  - `JourneyStep`: The current step in the journey (e.g., "2").
- `prefRates`: A collection of elements with the class name `get-a-quote-page__pref-rate-icon`, used to check for the presence of the preferential rate icon.

### Logic Flow
1. A 3-second timeout is initiated to allow for page elements to load.
2. The code checks if the `JourneyName` is defined and is equal to "BuyTravelMoney".
3. It further checks if the `JourneyStep` is "2".
4. If the event type (`a`) is "view":
   - The code checks if there are any elements with class `get-a-quote-page__pref-rate-icon`.
   - If such elements exist, it sets the customer attribute to "Preferential rate" and triggers an event.
   - If no elements are found, it sets the attribute to "Standard rate" instead.

### Dependencies
- The extension relies on the global `document` object to retrieve elements from the DOM.
- It uses the `LBGAnalytics` global object to set customer attributes and trigger events, which needs to be defined within the environment for the extension to function correctly.

## 3. Usage Examples

### Scenario 1: Normal Flow
- **User Journey**: The user begins a travel money journey and reaches step 2.
- **Data Flow**:
  - The user views the page.
  - The extension identifies `JourneyName` as "BuyTravelMoney" and `JourneyStep` as "2".
  - If a preferential rate icon exists on the page, the extension sends "Preferential rate" to LBGAnalytics.

### Scenario 2: Edge Cases
- **No Preferential Rate Icon Present**:
  - The user views the page, and the icon is not present.
  - The extension sends "Standard rate" to LBGAnalytics.

- **Incorrect Journey Name/Step**:
  - If `JourneyName` is not "BuyTravelMoney" or the `JourneyStep` is not "2", the extension does nothing.

## 4. Known Limitations & Gotchas
- If elements take longer than 3 seconds to load, there is a risk that the extension won't capture the correct state and may send an incorrect customer attribute.
- The extension may conflict with other extensions if they also manipulate the same analytics events in the same flow.
- Ensure that the necessary `LBGAnalytics` object is available in the page's JavaScript context prior to this script running.

## 5. Recommendations for Refactoring
- **Defensive Checks**: Consider adding checks to ensure `prefRates` is loaded before trying to access its length, even though eventType and eventPayload are guaranteed to be present.
- **Code Style**: Use more descriptive variable names instead of `a` and `b` for better readability.
- **Modularization**: Refactor the code into smaller functions to separate concerns. For example, a function to check for preferential rates and another to send analytics data.
- **Adding Comments**: Enhance code comments for clarity on logic, especially around the DOM checks and analytics calls.

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Regularly test this extension to ensure compatibility with any updates to the underlying page structure, particularly the class name for preferential rate icons.
- **Ownership**: Assign a specific team member as the owner of this extension for clarity and accountability.
- **Testing Guidelines**: Implement user journey simulations in a staging environment to verify the expected behaviour of the extension before deployment. Run cross-browser tests to ensure compatibility. 

By following this structure, the documentation provides a clear, comprehensive understanding of the extension's purpose, functionality, and operational guidelines.