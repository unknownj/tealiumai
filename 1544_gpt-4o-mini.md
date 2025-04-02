# Tealium iQ Extension Documentation: Track Videos

## Extension Overview

- **Name**: Track Videos
- **ID**: 100040
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
The "Track Videos" extension is designed to facilitate video tracking in web applications using the LBGAnalytics framework. Upon the page being fully loaded, this extension checks if the `LBGAnalytics.video` object is defined and whether its `track` method is available as a callable function. If both conditions are met, the `track` method is invoked to record video interactions (such as play events), enabling accurate analytics of user engagement with video content. This is crucial for understanding user behaviour and enhancing content strategy.

## Code Explanation

### Key Variables
- **LBGAnalytics.video**: A global object representing the video tracking functionality provided by the LBGAnalytics library.

### Logic Flow
1. The extension checks for the presence of the `LBGAnalytics.video` object.
2. It further verifies whether `LBGAnalytics.video.track` is a callable function.
3. If both conditions are satisfied, the `track` method is invoked, which presumably records a video engagement event.

### Dependencies
- **Global Objects**: This extension relies on the existence of the `LBGAnalytics` object and its `video` property, which must be defined for the extension to function correctly. Ensure that the LBGAnalytics library is loaded prior to this extension execution.

## Usage Examples

### Normal Condition Scenario
1. A user visits a webpage containing embedded video content.
2. The complete document is loaded (DOM Ready).
3. The "Track Videos" extension runs and checks conditions:
    - If `LBGAnalytics.video` is defined and `track` is available.
4. If true, the `track` method is called, logging user engagement.

### Edge Condition Scenario
1. A user visits a webpage but the `LBGAnalytics` library fails to load.
2. The "Track Videos" extension checks conditions:
   - `LBGAnalytics.video` is `undefined`.
3. The extension does not execute the `track` method, and no tracking occurs.

In an alternative scenario where `track` is defined but not a function (e.g., it is set to `null`), this would also prevent any tracking from occurring.

## Known Limitations & Gotchas

- **Failure to Load**: If the required LBGAnalytics library does not load correctly, the extension will not be able to track video interactions.
- **Conflict with Other Scripts**: If another extension or script modifies the `LBGAnalytics` object or its properties, this may lead to unexpected behaviour or errors during execution.
- **Single Execution**: As the extension is designed to run once, subsequent video events will not be tracked unless the page reloads or the extension is invoked again on a new page load.

## Recommendations for Refactoring

1. **Defensive Coding**: Although we are permitted to assume `eventType` and `eventPayload` are present, enhancing error handling for other potential issues (e.g., undefined properties) could provide robustness.
2. **Modularisation**: Consider encapsulating the tracking logic in a separate function for clarity. This approach would enhance readability and testability.
3. **Code Style**: 
   - Maintain consistent indentation and formatting to enhance readability. 
   - Document the purpose of the `track` method call inline with comments to guide future developers.
4. **Logging**: Implement logging statements to record when the tracking events occur or when conditions are not met, aiding in troubleshooting and diagnostics.

## Maintenance & Further Notes

- **Ownership**: This extension should be maintained by the web analytics team, with regular reviews to ensure compatibility with updates to the LBGAnalytics library or changes in tracking specifications.
- **Testing Guidelines**: Implement functional testing to ensure that video tracking engages correctly post-deployment. This should include checking the tracking flow under various conditions (with and without the LBGAnalytics library). Regular audits should be conducted to monitor for impacts from app updates or changes to the video tracking process.
- **Documentation Updates**: Keep this documentation up-to-date with changes in the extension's functionality or external dependencies, ensuring that it remains a reliable resource for developers.

This documentation is designed to provide a comprehensive understanding of the "Track Videos" extension, to facilitate further development, maintenance, and testing efforts.