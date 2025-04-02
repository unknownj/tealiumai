```markdown
# Tealium iQ Extension Documentation: Onelink Appstore Redirect

## 1. Extension Overview
- **Name**: Onelink Appstore Redirect
- **ID**: 2259
- **Type**: JavaScript Code
- **Scope**: After Tag Extensions
- **Execution Frequency**: Run Once

### Summary
The "Onelink Appstore Redirect" extension is designed to dynamically redirect users to the appropriate app store (Google Play or Apple App Store) based on the brand and the user's device type. It ensures that the app download links are modified in real-time before the user interacts with them, thereby improving the user experience and increasing app installations.

## 2. Code Explanation

### Key Variables
1. **appStoreRedirect**: An object containing:
   - `onelinkURLs`: Maps brand names to their respective OneLink URLs.
   - `getBrand()`: A method to determine if the user is on a mobile device or if a forced redirect is needed.
   - `onelink(brand)`: Main method that handles the redirection logic for given brand inputs.

### Logic Flow
1. The `getBrand()` function checks the user agent and URL parameters to identify mobile users.
2. The `onelink(brand)` method constructs the OneLink URL using data from the `onelinkURLs`.
3. The method modifies the href attributes for the app store buttons on the page and potentially redirects the mobile users to the relevant app store link.
4. The extension checks specific URLs upon page load to trigger the `onelink()` function with the appropriate brand.

### Dependencies
- **AF_SMART_SCRIPT**: A global object that handles the generation of OneLink URLs. This must be included in the page for the extension to function correctly.

## 3. Usage Examples

### Normal Conditions
- When a user navigates to `https://lloydsbank.com/app.html` on a mobile device:
  - The extension updates the links to point to `https://lloydsbank.onelink.me/TCXD` and redirects the user if applicable.

### Edge Conditions
- If the user navigates to a non-supported brand or device type:
  - The extension gracefully handles it by not executing the redirect or link modification, keeping the user on the original page.

### Example Scenarios
- **Scenario 1**: User visits a Lloyds app page on an Android device. The extension updates the Google Play link to the correct OneLink URL and redirects them.
- **Scenario 2**: User visits a Halifax app page on an iPad. The links are updated, and redirection occurs to the appropriate app store.

## 4. Known Limitations & Gotchas
- The extension does not currently handle desktop users explicitly, meaning redirects are only initiated for mobile users.
- Business brand ("LloydsBusiness") users are not redirected to app stores as per current logic, which might confuse customers expecting to download the app.
- Conflicts may arise if other extensions manipulate the same DOM nodes or URL rewrites are applied simultaneously.

## 5. Recommendations for Refactoring
- **Defensive Checks**: Add validations to ensure `appStoreRedirect.onelinkURLs` contains valid URLs to prevent undefined errors.
- **Code Style**: Improve readability with consistent indentation and spacing.
- **Modularisation**: Consider breaking down complex methods like `onelink()` into smaller, reusable functions for maintainability.

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Regularly review brand URLs in `onelinkURLs` to ensure they remain active and correct.
- **Ownership**: Assign a designated developer or team for monitoring errors and updates to the extension.
- **Testing Guidelines**: Employ automated testing for different user agent strings and scenarios to ensure that redirects function correctly across various devices.
- Evaluate the performance of the extension in real production environments to monitor user engagement and the effectiveness of app store redirects.
```
