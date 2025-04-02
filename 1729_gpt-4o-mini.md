# Tealium iQ Extension Documentation: Privacy Manager Version 3

## 1. Extension Overview
- **Name**: Privacy Manager Version 3
- **ID**: 1729
- **Type**: JavaScript Code
- **Scope**: Pre Loader
- **Execution Frequency**: Run Once

### Summary
The Privacy Manager Version 3 extension is designed to manage user consent for cookies and tracking technologies on the website. It prompts users for permission to use non-essential cookies and provides options to accept or decline such cookies. The extension ensures that necessary compliance with privacy regulations is maintained while providing a seamless user experience. This is particularly relevant in the context of GDPR and ePrivacy directives.

## 2. Code Explanation

### Key Variables
- **window.LBGAnalytics**: A namespace containing the analytics framework, used to manage events and user consent.
- **privacyObject**: An object that holds methods and properties related to privacy management, such as consent status and customised privacy messaging.
- **cookies**: Object for managing cookie read/write operations.
- **version**: A constant string representing the version of the wording used in the consent prompt.
- **cookieDurations**: Lookup object that defines common durations for setting cookies.

### Logic Flow
1. **Initial Setup**: The extension checks for the existence of the `LBGAnalytics` object. If not present, it terminates early.
2. **Wording Configuration**: Sets up privacy wording used across consent dialogues.
3. **Consent Management**: 
   - Users can either opt-in or opt-out of cookie tracking.
   - Consent is stored in cookies and can be updated based on user interactions.
4. **Prompt Logic**: The extension detects conditions to show the consent prompt based on user interactions, such as marketing traffic detection or previous consent states.
5. **Cookie Management**: Consent decisions are stored in cookies for distinct durations depending on the category of cookies (essential, performance, targeting).
6. **Display Privacy Manager**: The UI elements of the privacy manager are dynamically created and styled based on the skin applied to the site.

### Dependencies
- **window.LBGAnalytics**: The extension relies on this global object for tracking and managing cookies/consent.
- **User cookies**: The functionality is interdependent on browser cookies from the LBGAnalytics framework.

## 3. Usage Examples

### Normal Scenario
1. A user visits the website.
2. The extension checks the consent status through cookies.
3. If no consent exists, the extension displays a prompt asking the user to accept or decline cookies.
4. Depending on the user’s choice, consent is recorded and appropriate cookies are set.

### Edge Cases
- **No Previous Consent**: If a user has never been prompted, the extension assumes that consent needs to be obtained.
- **Incognito Mode**: If the user accesses the site in incognito mode without any marketing parameters in the URL, the prompt may be suppressed.
- **Cookie Expiry**: If cookies have expired, the extension triggers a re-prompt for consent.

## 4. Known Limitations & Gotchas
- **Incognito Handling**: Special logic for suppressing prompts in incognito mode might not cover all browser implementations.
- **Overlapping Scripts**: Conflicts may arise if other extensions or scripts attempt to set cookies before or concurrently with this extension.
- **Versioning Issues**: If the wording or logic needs to be updated, it may not properly detect users who have already provided consent if the previous data structure wasn't accounted for.

## 5. Recommendations for Refactoring
- **Modularisation**: Break down large functions into smaller, more manageable ones to enhance readability and maintainability.
- **Defensive Checks**: Introduce more checks to ensure that the expected structures (e.g., `cookies`) exist before proceeding with operations.
- **Code Style Consistency**: Maintain consistent styles for variable names and comments throughout the code. This includes ensuring function comments provide clear guidance on parameters and expected behaviour.

## 6. Maintenance & Further Notes
- **Ownership**: Assign a dedicated owner to manage updates and changes to the extension as privacy regulations evolve.
- **Testing**: Develop a suite of test cases that cover various consent scenarios, cross-browser checks, and cookie management cases.
- **Documentation Updates**: Regularly update documentation as changes are made, particularly after major updates or discoveries of bugs.

This documentation aims to assist developers and stakeholders in understanding and maintaining the Privacy Manager Version 3 extension effectively, ensuring ongoing compliance with privacy frameworks and user engagement best practices.