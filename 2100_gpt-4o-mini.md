# NGA Webchat Integration Load Rule Extension Documentation

## 1. Extension Overview:

- **Name:** NGA Webchat Integration Load Rule
- **ID:** 2100
- **Type:** Javascript Code
- **Scope:** Before Load Rules
- **Execution Frequency:** Run Always

### Summary:
The NGA Webchat Integration extension is designed to enable or disable web chat functionalities for specific user journeys and environments. It uses a series of conditions to evaluate whether the web chat functionality should be activated based on factors such as the current URL, the presence of specific query parameters, and the user's app version. The extension ensures that the integration works optimally during designated journeys while logging events for analytics purposes.

---

## 2. Code Explanation:

### Key Variables:
- `loadConditions`: A list of arrays determining when to enable the web chat feature based on criteria such as URL pathname and environment. 
- `LBGAnalytics.featureFlags`: A global object used to manage feature flags, which dictate whether the web chat integration is active.

### Logic Flow:
1. The extension first sets up an array of conditions (loadConditions) that dictate when the web chat feature should be active.
2. It evaluates these conditions through an internal method (`b.Q(loadConditions)`), setting the `ngaWebchat` flag.
3. If the feature flag is not present, the code execution halts.
4. If the flag is present, the code checks several factors to determine if the web chat should be enabled:
   - The existence and functionality of the `window.JSBridge.updateNgaValue` method.
   - Query string parameters to override default settings (`ngawebchat=enabled`).
   - Specific app versions for both Android and iOS to enable the feature.
   - Presence of different versions of the `JSBridge` method.
   - A general feature flag override.

### Dependencies:
- `LBGAnalytics`: A global analytics logging object.
- `window.JSBridge`: A global object assumed to provide methods and versioning info.
- Expectation of specific URL structures and app versions.

---

## 3. Usage Examples:

### Normal Conditions:
- **Scenario 1:** A user visits the path `/personal-loan-auth/` on a SIT environment. The web chat is enabled because the URL matches a load condition.
- **Scenario 2:** A user with `AppVersion` set to `an147.00` accesses the application; the feature flag is activated accordingly.

### Edge Conditions:
- **Scenario 1:** If a user accesses the site without the required `JSBridge` method, the web chat will not be activated.
- **Scenario 2:** A query string `ngawebchat=enabled` in the URL will force enablement of the web chat regardless of other conditions.

---

## 4. Known Limitations & Gotchas:

- The extension relies heavily on the presence of the `JSBridge` and its available methods; any updates or changes to this global object can disrupt functionality.
- Only specified environments will trigger the extension; users not in these environments will not benefit from web chat.
- Additional logging or features added to `LBGAnalytics` should be thoroughly tested with this extension to prevent conflicts.

---

## 5. Recommendations for Refactoring:

1. **Defensive Checks:** While it's guaranteed that `eventType` and `eventPayload` are present, adding checks where appropriate could ensure stability.
2. **Code Style & Readability:** Consider adding comments to elaborate on complex logic, especially in condition evaluations.
3. **Modularisation:** Split code into smaller, reusable functions or methods to enhance maintainability. For example, separate the logic that checks JSBridge methods into its own function.
4. **Error Handling:** Currently, all errors are caught and logged but not managed. Consider adding notifications or alerts to notify users or developers of specific failures.

---

## 6. Maintenance & Further Notes:

- **Ongoing Maintenance:** Regularly review and test the extension against updates in the `JSBridge` and environments.
- **Ownership:** Designate a developer or team responsible for maintaining this extension in conjunction with agency/project updates.
- **Testing Guidelines:** Conduct automated tests in SIT/PUT and QA environments prior to deployment to ensure conditions and logging behave as expected.

---

By following this structured documentation, developers and stakeholders should have a comprehensive understanding of the NGA Webchat Integration Load Rule extension, facilitating its use, maintenance, and potential enhancements in the future.
