# Tealium iQ Extension Documentation: Anti Phishing Script

## 1. Extension Overview

- **Name:** Anti Phishing Script
- **ID:** 271
- **Type:** Javascript Code
- **Scope:** Pre Loader
- **Execution Frequency:** Run Once

### Summary
The Anti Phishing Script is designed to identify and react to phishing attempts by monitoring specific URL patterns. With a delay of three seconds upon page load, this extension checks the current window location against a predetermined list of known phishing domains. If a match is found, it triggers a response that could involve redirection or alert mechanisms for users.

## 2. Code Explanation

The provided code implements an anonymous function executed after a three-second timeout. Below are the key aspects of the code:

- **Key Variables:**
  - `i`: An array containing base64 encoded strings representing known phishing domains.
  - `G`: An array storing additional base64 encoded values.
  - `a`: A function that decodes base64 encoded strings.
  - `m`: Represents the current window's location.
  - `v`: A function that decodes and checks the supplied base64 string.
  - `Z` and `y`: Contain parsed objects that represent action parameters upon identifying a phishing domain.
  
- **Logic Flow:**
  1. The code waits for three seconds after the page loads (due to `setTimeout`).
  2. It attempts to execute a self-invoking function (IIFE) that:
     - Iterates over `i` and checks if the current window's hostname matches any of the decoded phishing domains.
     - If a match is found, it performs an action defined in `Z` and `y`.
  3. Additionally, it checks against another list `G`, triggering the same action if matches are found.

- **Dependencies on Global Objects or Libraries:**
  - Utilises the `window` object to access the current page's `location`.
  - A reliance on the `atob` method for decoding base64 strings.

## 3. Usage Examples

### Normal Condition
When a user visits a webpage that loads this extension, after three seconds, it checks the hostnames. If the current hostname is `maliciousdomain.com`, the extension performs the defined redirection or alert actions specified.

### Edge Conditions
- If network speed is significantly slow, there could be a user experience delay in processing actions after the page loads.
- If the page loads from a source that is not in the defined lists, no actions will be taken, and the user continues as normal.

## 4. Known Limitations & Gotchas

- **Timeout Dependency:** Any inaccuracies in the delay may lead to incorrect detection if the page load happens very quickly or if there are other heavy scripts.
- **Global State**: The code alters the global state without checks, which can be problematic if other scripts assume the absence of such changes.
- **Compatibility**: Base64 encoded strings are hardcoded. Adding/removing domains requires code changes and redeployment.
- **Potential Conflicts**: If other extensions manipulate window `location` or redirect users, this may introduce conflicts.

## 5. Recommendations for Refactoring

- **Defensive Checks**: Implement checks to verify that required global objects like `window` and its properties exist before accessing them to avoid errors in environments where these may not be defined.
- **Code Style**: Introduce comments throughout the code for better readability and maintainability.
- **Modularize**: Consider breaking the code into smaller, reusable functions, rather than a single block for better cohesion and testing.

#### Example Refactor:
Instead of calling base64 decode inline, define it as a utility function:

```javascript
function decodeB64(encodedStr) {
  return b.atob(encodedStr);
}
```

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly review and update known phishing domain lists. Test thoroughly whenever changes are made to avoid introducing bugs.
- **Ownership**: Designate a specific developer or team to handle updates and maintenance of the Anti Phishing Script.
- **Testing Guidelines**: Build a testing suite to verify the extension's behaviour in various environments and use cases. Ensure to simulate different network conditions to account for timeout actions.

---

This complete and structured documentation should assist developers and stakeholders in understanding, using, and maintaining the Anti Phishing Script efficiently.