```markdown
# Tealium iQ Extension Documentation: Pegasus V2 : GDC Functions

## 1. Extension Overview
- **Name**: Pegasus V2 : GDC functions
- **ID**: 2096
- **Type**: Advanced JavaScript Code
- **Scope**: 1655
- **Execution Frequency**: Active

### Summary
This extension is designed to facilitate the reporting of conversion and transaction events to Google Ads through the Floodlight mechanism. It processes user interaction data related to financial products and generates payloads that include various user and journey attributes. The extension significantly aids marketing and tracking efforts, allowing for better audience segmentation and reporting.

## 2. Code Explanation

### Key Variables
- **DC_src, DC_type, DC_cat**: These represent different identifiers used to classify the data sent to Google Floodlight.
- **payload**: An object that holds various transaction details to be sent to Google Ads.
- **trigger**: Represents the event or condition under which the tag should be fired (e.g., Page load, Timed events, or User interactions).

### Logic Flow
1. **Conversion Reporting**: The `gfl_report_conversion` function checks if the application state is 'Fulfilled' and then sets the transaction or conversion parameters accordingly.
2. **Payload Structure**: Constructs a payload that includes identifiers (like `transaction_id`, `order_id`, etc.) and user journey details.
3. **Consent Handling**: If user consent isn't present, certain identifiers (like `paid_order_id` and `MobileAdvertiserID`) are removed from the payload.
4. **Event Handling**: Depending on the type of trigger (Page, Timed, or Event), the extension either immediately fires the Google Ads conversion event or sets up a delay/event listener accordingly.
5. **Lookup Handling**: The `runLookups` function processes conditions defined in the lookup table to determine if conditions are met to fire specific tags.

### Dependencies
- **Global Object `LBGAnalytics`**: The code depends on methods from the `LBGAnalytics` object for event handling and DOM manipulation.
- **`gtag` Function**: This is the Google Tags function used to report conversions and needs to be defined in the global context.

## 3. Usage Examples

### Normal Conditions
- **Scenario**: A user completes a purchase.
  - Data will flow as follows:
    - User data is gathered (e.g., `paid_order_id`, `JourneyAmount`).
    - The `gfl_report_conversion` function is invoked with "purchase" as conversion type along with relevant data in the payload.
  
### Edge Conditions
- **Scenario**: User clicks on a button.
  - If the button is tracked via `Event`, an event listener is set that triggers `gfl_report_conversion` when the click event occurs.
- **Scenario**: User does not give consent.
  - The payload excludes sensitive identifiers, ensuring compliance with privacy regulations.

## 4. Known Limitations & Gotchas
- **Handling of Data Types**: The extension may not handle unexpected data formats gracefully (e.g., if an expected string is received as `undefined`).
- **Overlapping Triggers**: If multiple triggers are set up, it could lead to multiple events firing unintentionally.
- **Performance**: Heavy reliance on asynchronous callbacks may lead to performance issues if the data layer or user interactions lead to numerous events being queued at once.

## 5. Recommendations for Refactoring
- **Modularization**: Consider breaking down the code into smaller, reusable functions that can be independently tested.
- **Error Logging**: Implement comprehensive error logging to capture issues that may arise throughout the execution of functions.
- **Validation Checks**: Add checks to validate the format of incoming variables before performing operations to ensure resilience against malformed inputs.
- **Code Style**: Maintain consistency in comments and formatting to enhance code readability.

## 6. Maintenance & Further Notes
- **Ownership**: Assign a dedicated team or individual responsible for ongoing updates and performance monitoring.
- **Testing Guidelines**: Regularly test the extension in various environments to ensure it behaves as expected. Implement a staging environment where changes can be validated before going live.
- **Documentation Update**: Ensure any updates to functionalities or added conditions are documented immediately to keep the team informed.

### Contact for Queries
For further queries regarding this extension, please contact the development lead or the analytics team.
```
