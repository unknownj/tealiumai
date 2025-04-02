# Tealium iQ Extension Documentation: DeepLinkURL

## Extension Overview:
- **Name**: DeepLinkURL
- **ID**: 2277
- **Type**: Javascript Code
- **Scope**: 1459
- **Execution Frequency**: On every relevant event triggered

### Summary
The `DeepLinkURL` extension creates a deep link URL for passing data to AppsFlyer when a deep link event occurs. It processes various marketing parameters, enabling seamless tracking and analysis of campaigns. This extension optimises user engagement by ensuring proper attribution from multiple sources such as Google Ads, Facebook, and TikTok, helping to enhance marketing insights and strategy. 

## Code Explanation
### Key Variables
- **`base`**: This variable captures the canonical URL for building the deep link.
- **`u.dlv`**: This object stores configuration data such as eligibility expressions and data items for deep linking.
- **`dataItems`**: An array that defines the data fields to be extracted or defaulted when constructing the deep link URL.

### Logic Flow
1. The code checks if the `u.dlv` variable is defined. If not, it initializes it.
2. The canonical URL (`base`) is extracted from a global object `b`.
3. The eligibility expressions are checked to determine if the deep link conditions are met (e.g., `PresentationFamily contains Webview`).
4. If eligible, the code iterates over `dataItems`, mapping values from the global object `b` or applying default values or overrides.
5. Any personally identifiable information (PII) detected in the data is eliminated to enhance user privacy.
6. Finally, the constructed query parameters are appended to the base URL and assigned to `b.DeepLinkURL`.

### Dependencies
- The extension relies on global objects:
  - `eventType`
  - `eventPayload`
  - `tagObject`
  - `LBGAnalytics.Q`: A function expected to check the eligibility expressions.

## Usage Examples
### Normal Scenarios
1. **Standard Deep Link Event**: When a user clicks on a Google Ads link with UTM parameters, the extension constructs a deep link URL that includes the app-specific campaign data (`pid`, `af_channel`, etc.), resulting in a link such as `https://yourapp.com?pid=googleads_int&af_channel=cpc&c=summer_campaign`.

### Edge Cases
1. **Missing Campaign Medium**: If the `CampaignMedium` is missing, the extension defaults this to "website", ensuring the link still functions.
2. **PII Handling**: If any of the data fields contain an email address, the extension will clear that value, ensuring compliance with privacy standards.

## Known Limitations & Gotchas
- **Eligibility Expression Logic**: If the conditions set in `eligibilityExpressions` are not applicable or wrongly configured, the extension will not execute, resulting in the absence of a deep link URL.
- **Complex Override Scenarios**: Overriding values may lead to unexpected results if not explicitly matched, which can confuse debugging efforts.
- **Potential Conflicts**: If other extensions modify the `b` object or tamper with the global variables, it may create conflicts or erroneous data flow.

## Recommendations for Refactoring
- **Modularization**: Separating functionality into functions would allow for better maintainability and readability. For example, extracting the mapping logic into its own function.
- **Error Logging**: Implementing logging to capture scenarios where defaults are applied or overrides fail could aid in debugging.
- **Defensive Checks**: Although checks for `eventType` and `eventPayload` are guaranteed, it is also wise to validate the fields in `dataItems` before using them. This can prevent runtime errors.
- **Code Style**: Adopting consistent indentation practices and proper comments may help maintain clarity, especially in sections involving complex logic.

## Maintenance & Further Notes
- **Ownership**: Assign an owner for the extension to ensure it is kept up-to-date with the latest marketing practices and strategies.
- **Testing**: Regularly test the extension with various deep linking scenarios, especially after any changes to related variables or external integrations.
- **Documentation**: Keep a changelog documenting any changes made to the extension to maintain clarity for future developers interacting with this code base.

### Conclusion
This documentation provides a coherent understanding of the `DeepLinkURL` extension for Tealium iQ. By adhering to the presented guidelines, developers can effectively manage its operation, optimising user engagement while ensuring compliance with marketing standards.