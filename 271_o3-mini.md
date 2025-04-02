# Anti Phishing Script Documentation

This document provides a comprehensive overview of the Tealium iQ extension named “Anti Phishing Script”. The documentation covers the extension’s purpose, a detailed explanation of its code, sample usage scenarios, known limitations, refactoring recommendations, and guidance for ongoing maintenance.

---

## 1. Extension Overview

- **Name**: Anti Phishing Script  
- **ID**: 271 (with an associated extensionId of 100036)  
- **Type**: Javascript Code  
- **Scope**: Pre Loader  
- **Execution Frequency**: Run Once  

**Summary**:  
This extension is designed to mitigate phishing risks by validating the website’s domain against a set of obfuscated (Base64 encoded) strings that represent suspicious domains or configurations. Running shortly after page load (after a 3-second delay), it decodes several obfuscated values and checks specific conditions related to the current environment. If a match is detected (i.e. if the current domain or configuration is deemed suspicious), it triggers a protective action such as redirecting the user or altering the page’s content to prevent phishing.

---

## 2. Code Explanation

The extension utilises several techniques and variables in order to achieve its goals. Below are the key aspects:

### Structure and Execution Flow

- **Delayed Execution**:  
  The entire script is wrapped in a `setTimeout` with a 3000ms (3 seconds) delay. This delay allows the page to complete initial loading before performing security checks.

- **Try-Catch Block**:  
  The main logic is enclosed in a try-catch block to ensure that any runtime errors do not interfere with other page functions.

- **Obfuscated String Arrays**:  
  Two arrays of Base64 encoded strings (named here as `i` and `G`) are defined. Each entry likely represents suspicious domain names or configurations:
  - The first array (`i`) contains multiple encoded strings.
  - A second array (`G`) contains an alternate set of encoded values.

- **Decoding References**:  
  - A local function `a` is assigned to `b.atob` (where `b` is the global window object) to perform Base64 decoding.
  - Several string constants such as `"body"`, `"location"`, `"hostname"`, `"link"`, etc., are also obfuscated and decoded on the fly.

- **Global Dependencies**:  
  - **Window Object**: The script heavily relies on properties of the `window` object, such as `window.atob`, `window.location`, and other window properties.
  - **JSON Parsing**: A nested function `v` is used to decode JSON configurations that are also obfuscated in Base64 format. This JSON may contain style or behavioural settings (e.g. colours, fonts, site names) for the anti-phishing action.
  - **DOM Method Invocation**: Once a condition is met (a match found in the domain of the current page), the script calls a method (decoded as `"link"`) on an object (retrieved from the window’s location properties) to trigger a response, such as redirecting the user or modifying the display.

### Logic Flow

1. **Initial Delay**:  
   The script is executed 3 seconds after page load to ensure that all required elements and configurations are in place.

2. **Primary IIFE**:  
   An Immediately Invoked Function Expression (IIFE) is used to encapsulate the obfuscated logic, minimising the risk of variable collisions and keeping the global namespace clean.

3. **Base64 Decoding and Variable Setup**:  
   The function decodes several critical strings:
   - It translates pre-defined Base64 strings, which serve as keys, configuration objects (such as CSS settings), or domain names.
   - It establishes references to the current page’s hostname and other location details.

4. **Iteration and Validation**:  
   - The code iterates over each entry in the first array (`i`).  
     - For each decoded value, it checks whether the current page’s hostname (or a related property) contains the suspicious component.
   - If no match is found in `i`, the code proceeds to iterate over the second array (`G`) and performs a similar check.
   - Upon detecting a match (i.e. if any decoded value is found in the current domain or configuration), it executes:
     - A chain of method calls via the object `W(N)` (where `N` is also derived from decoding), which manipulates the style or triggers a link action.  
     - Finally, it calls a method (decoded as `"link"`) on another object, potentially to redirect the user or display an alert.

5. **Catching Exceptions**:  
   Any exceptions thrown during the execution are silently caught, ensuring that the extension does not break the overall functionality of the page.

---

## 3. Usage Examples

### Normal Operation Scenario

- **Scenario**: The page is loaded from a trusted domain.
  - **Flow**:  
    1. The page loads, and after 3 seconds the extension activates.
    2. The specified arrays are iterated, but no match is found with the current hostname.
    3. No action is taken, and the user experience remains unaffected.

### Suspicious Domain Detection Scenario

- **Scenario**: The page is loaded from a domain that matches one of the encoded suspicious entries.
  - **Flow**:  
    1. The page loads, and the extension runs after the initial 3-second delay.
    2. During iteration, one of the decoded domain strings matches part of the current hostname.
    3. The script decodes additional configuration values (such as CSS styles or site name details).
    4. A protective action is triggered, such as redirecting the user by invoking the method (decoded as `"link"`) on the location object.
  - **Edge Conditions**:  
    - If a domain is borderline (e.g. a subdomain of a known safe site that loosely matches a suspicious pattern), the decoding and matching process might trigger an unnecessary action. In such cases, the obfuscated configuration must be verified.

---

## 4. Known Limitations & Gotchas

- **Delayed Intervention**:  
  The 3-second delay might allow certain phishing-related actions to occur before the script intervenes. Timing may need adjustment based on the environment.

- **Obfuscation Complexity**:  
  The heavy reliance on Base64 encoding and obfuscation makes the code difficult to read and debug. Changes to the encoded strings require careful handling to avoid breaking the decoding logic.

- **Global Object Dependence**:  
  The extension operates directly on global objects such as `window` and `location`. Changes in the environment or conflicting scripts that manipulate these globals might cause unexpected behaviour.

- **Browser Support Considerations**:  
  The script utilises `atob` for decoding, which is supported by most modern browsers, but care should be taken for legacy browsers that might require polyfills.

- **Potential Conflicts**:  
  Other Tealium extensions or external scripts that also manipulate `window.location` or similar properties could conflict with the anti-phishing actions.

---

## 5. Recommendations for Refactoring

- **Improve Readability**:  
  Although obfuscation may be intentional, consider abstracting the Base64 decoding and comparison logic into well-named helper functions. This would aid debugging and future maintenance.

- **Modularisation**:  
  Break the large IIFE into smaller, modular parts:
  - One module to handle decoding.
  - Another for the logic flow of comparing domains.
  - A separate module to execute the protective action.

- **Defensive Coding Enhancements**:  
  - While the code is wrapped in a try-catch, additional logging (even if only in development mode) could help identify when and why a phishing attempt is detected.
  - Verify that all necessary global objects exist before relying on them, even though critical objects like `eventType` or `eventPayload` are guaranteed.

- **Documentation and Comments**:  
  Increase inline comments explaining the purpose of specific blocks, especially where Base64 strings are decoded. This would help any future developers understand why each string exists and what it represents.

- **Maintain ES5 Compliance**:  
  Continue to support ES5 by avoiding newer syntax features. Refactoring should maintain compatibility with older browsers as required by the project.

---

## 6. Maintenance & Further Notes

- **Ongoing Testing**:  
  Regularly test the extension across supported browsers to ensure that decoding functions (e.g. `atob` and JSON parsing) work as expected. Automated tests could simulate both safe and suspicious environments.

- **Ownership and Updates**:  
  The anti-phishing functionality is crucial for security. Document the contact information of the team or people responsible for maintaining this extension. Set up a process for reviewing and updating the obfuscated domain list as threats evolve.

- **Monitoring and Logging**:  
  Although the current implementation opts for silent error handling, consider introducing configurable logging for diagnostic purposes. This can prove invaluable when debugging in production environments.

- **Change Management**:  
  Any modifications to the obfuscated strings or the protective actions should go through a rigorous code review process. Maintain version history and change logs.

- **Security Audits**:  
  Periodically audit the extension to ensure that obfuscation or decoding mechanisms are not bypassable by external scripts or malicious actors.

---

This documentation should serve as a definitive guide for developers and stakeholders working with this Tealium iQ extension. Regular reviews and updates to this document are recommended as part of your ongoing security and maintenance procedures.