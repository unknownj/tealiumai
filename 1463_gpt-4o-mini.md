# Tealium iQ Extension Documentation: LivePerson

## 1. Extension Overview

- **Name**: LivePerson
- **ID**: 1463
- **Type**: Advanced Javascript Code
- **Scope**: 1072
- **Execution Frequency**: Runs every 250 milliseconds until conditions are met

### Summary

The LivePerson extension facilitates the integration of live chat functionality within a website using the LivePerson platform. This extension listens for chat events and binds event handlers to collect and send data to the LBGAnalytics service. It operates on a predefined interval until the chat interface is fully initialised.

## 2. Code Explanation

### Key Variables

- **`window.webchateventinterval`**: A global interval variable that manages the polling for chat events.
- **`lpTag`**: The LivePerson global object, which holds functions related to the live chat interface.
- **`LBGAnalytics`**: A global analytics object that receives the chat context and state for reporting purposes.

### Logic Flow

1. **Initial Setup**: The code first checks if `window.webchateventinterval` is undefined, which ensures that the interval is not already running.
  
2. **Interval Creation**: An interval is created that runs every 250 milliseconds. This interval:
   - Checks for the existence of `lpTag`, its `events` method, and `LBGAnalytics`.
   - If all dependencies are met, it clears the interval and logs a message indicating that event handlers are being attached.
  
3. **Event Handling**: Two event types from LivePerson (`conversationInfo` and `state`) are bound to the `handlerFunction`, which collects data and sends it to `LBGAnalytics`.
  
4. **Identities Management**: The code sets `lpTag.identities` to an empty array and pushes a function that calls the callback with `null`.

### Dependencies

This extension relies on the following global objects:
- **`lpTag`**: Must be loaded by the time this code executes.
- **`LBGAnalytics`**: Must be available to store analytics data.

## 3. Usage Examples

### Normal Flow

1. A user starts a chat session using the LivePerson interface.
2. The extension initiates the interval, waiting to bind events.
3. Once the LivePerson chat is ready, the interval is cleared, and the events are bound.
4. Chat data is captured and sent to LBGAnalytics, allowing for tracking user interactions effectively.

### Edge Cases

- **No LivePerson chat initialisation**: If `lpTag` is never defined, the interval will continue to run indefinitely (every 250ms) until conditions are met. This can lead to performance issues.
- **Analytic Handling**: If `LBGAnalytics` is not present, the event handlers will not execute as intended, which may result in missing data.

## 4. Known Limitations & Gotchas

- **Polling Interval**: The 250ms polling interval can create performance overhead if the condition for event binding is not met quickly.
- **Global Dependencies**: The behaviour of this extension is tightly coupled with the existence of `lpTag` and `LBGAnalytics`, which, if modified or removed in future updates, may lead to failures in function.
- **Multiple Instances**: Care should be taken to prevent multiple instances of this extension from being initiated on the same page.

## 5. Recommendations for Refactoring

- **Defensive Checks**: Although not needed for `eventType` and `eventPayload`, increased robustness could be achieved by validating the existence of `lpTag`, `lpTag.events`, and `LBGAnalytics` before proceeding.
- **Code Organisation**: Extract event handling logic into a separate function to promote modularity and readability.
- **Logging Mechanism**: Consider implementing a more sophisticated error logging mechanism instead of console logs to track issues in production environments.

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: The extension should be reviewed periodically, particularly following updates to the LivePerson SDK or LBGAnalytics.
- **Ownership**: Designate a team or individual responsible for monitoring the extension's performance and any related incidents.
- **Testing Guidelines**: Test the extension in various scenarios, including different browsers and environments, to ensure compatibility and performance under various conditions.

---

This documentation serves as a detailed guide for developers interacting with the LivePerson extension on Tealium iQ, ensuring clarity on its function, usage, and maintenance.