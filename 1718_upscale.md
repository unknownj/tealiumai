# CSP Fill Extension Documentation

This document provides a thorough explanation of the “CSP Fill” Tealium iQ JavaScript Code Extension. It is written in GitHub-flavoured Markdown and uses British English conventions.

---

## 1. Extension Overview

- **Name**: CSP Fill  
- **ID**: 1718  
- **Type**: JavaScript Code  
- **Scope**: Pre Loader  
- **Execution Frequency**: Run Once  

### Summary

The CSP Fill extension sets up and manages a Content Security Policy (CSP) for certain Lloyds Banking Group websites. It defines CSP rules, inserts a corresponding `<meta>` tag into the page, handles policy overrides via query parameters or cookies, and reports CSP violations for analytics correlation.

Essentially, it does the following:  
- Creates a global `window.LBGCSP` object for CSP-related data and functions.  
- Conditionally configures a default or specialised CSP.  
- Injects a `<meta http-equiv="Content-Security-Policy" ...>` tag when applicable.  
- Logs and stores any CSP violations in `window.LBGCSP.violationList`.  
- Applies or overrides the policy based on query string parameters (`?enableCSP=...`) or the presence of a meta tag with `name="LBG-CSP"`.  
- Integrates with analytics (if `window.LBGAnalytics` is present) to capture violation events.

---

## 2. Code Explanation

This extension is triggered once, early in the page load (Pre Loader). Below is a breakdown of its main components and logic flow:

### 2.1 Global Object: `window.LBGCSP`
The extension begins by checking if `window.LBGCSP` is already defined. If not, it creates an empty object `window.LBGCSP = {}`. One of the primary purposes of this object is to store:

- **CSP configuration** (in the `config` sub-object).
- **Parent domain** detection logic.  
- **Functions** for:  
  - Converting selected CSP profiles into a single CSP string.  
  - Injecting the CSP `<meta>` tag.  
  - Applying a policy (default or profile-based).  
  - Tracking and handling security policy violations.

### 2.2 `config` Object
Inside the anonymous function `(function (target, config) { ... })(window.LBGCSP, { ... });`, a large `config` object is passed in. This object contains several named profiles (e.g., `"core"`, `"marketing"`, `"media"`, `"service"`) each defining the allowed sources for different CSP directives (`script-src`, `img-src`, `font-src`, `connect-src`, and so on).

In Tealium iQ, this is effectively a hardcoded configuration that outlines which external domains are permitted to load resources of various types. The extension later filters or combines these profiles depending on the environment or explicit instructions.

### 2.3 Parent Domain Extraction
The code calculates `target.parentDomain` by splitting the `window.location.hostname` into tokens and retaining only the relevant parts, e.g.:
- For a .uk domain, the last three tokens (e.g., `example.co.uk`).  
- For non-.uk TLDs, the last two tokens (e.g., `example.com`).  

This helps ensure that cookies and trust rules consistently apply across subdomains.

### 2.4 `target.profilesToString(filterFunction)`
This function:  
1. Collects only those profiles in the configuration that pass the given `profileFilter`.  
2. Gathers all unique CSP directives encompassed by those profiles.  
3. Builds a final CSP directive string, ensuring `'self'`, the `parentDomain`, and `*.[parentDomain]` are always included.  
4. Iterates over each directive’s allowed endpoints, appending each unique source to the string.  
5. Returns a formatted string ready to be written into a CSP `<meta>` tag.

### 2.5 `target.addMetaTag(content)`
Creates a `<meta>` element with `http-equiv="Content-Security-Policy"` and sets its `content` attribute to the CSP string from `profilesToString()`. Once appended to `document.head`, it effectively enforces the policy in that environment.

### 2.6 `target.applyContentSecurityPolicy(profileExpression)`
Applies the CSP based on either a default (include all profiles), or a comma-separated list of specific profiles.  
1. Checks if the page is inside Adobe Target (via `window.top` and `document.referrer`) to avoid applying CSP in that scenario.  
2. Checks `window.LBGAnalytics.cookies.vecContext` to skip if certain analytics contexts are active.  
3. If no CSP has yet been set (`!this.policyName`), the method filters profiles and converts them to a single policy string.  
4. Injects the `<meta>` tag via `addMetaTag()`.  
5. Stores the final policy name as `this.policyName` for reference.

### 2.7 Violation List & Handlers
The code attaches a `securitypolicyviolation` event listener to `document`, capturing any violation data. It compiles relevant fields (e.g., the directive that was violated, blocked URI, policy name) into a string and saves it in `target.violationList`.  
- Any functions registered with `violationList.on(callback)` get invoked whenever a new violation is logged.  
- If `window.LBGAnalytics.correlations` is available, the extension shares violation details there too.

### 2.8 Cookie and Query Parameter Overrides
The extension checks the querystring for `enableCSP`, and if found, sets a cookie named `LBGAnalyticsCSP`. On subsequent runs (or page loads), the extension reads this cookie and applies the specified CSP using `target.applyContentSecurityPolicy()`. This provides a convenient way to override or test different policy profiles by just adding `?enableCSP=marketing,media`, for example.

### 2.9 `CSPEnablement` Object
Separately, a `CSPEnablement` object holds:  
- A list of hostnames or paths in `enabled`.  
- Logic to detect if the current page’s hostname/path matches the `enabled` list.  
- A function `enableDefaultCSP()` that injects `<meta name="LBG-CSP" content="default">`.  

This meta tag instructs the extension to apply the default CSP when the extension sees `content="default"`.

### 2.10 Integration with `window.LBGAnalytics`
If the global `window.LBGAnalytics.correlations` is present, the extension logs CSP deployment status and violations as correlations:
- Once a CSP policy is set, it logs an event in `evar248: LBGCSP/[policy]/deployed`.  
- Upon any CSP violation, `evar248: LBGCSP/[policy]/blocked`.

---

## 3. Usage Examples

**Example 1: Default CSP Injection**  
- A page with `<meta name="LBG-CSP" content="default">` in its `<head>` automatically triggers the extension’s `applyContentSecurityPolicy()` with the `"default"` argument.  
- This merges all configured profiles (e.g. `"core"`, `"marketing"`, `"media"`, `"service"`) into a single CSP string.  
- The extension then creates and inserts the `<meta http-equiv="Content-Security-Policy">` tag at runtime.

**Example 2: Overriding CSP with a Query Parameter**  
1. The user navigates to the site with `?enableCSP=marketing,service`.  
2. The extension captures that parameter and sets a session cookie `LBGAnalyticsCSP=marketing,service`.  
3. On page reload, the extension reads the cookie and calls `applyContentSecurityPolicy("marketing,service")`.  
4. Only the sources defined in `"core"` plus `"marketing"` plus `"service"` are combined into the final CSP.

**Example 3: Edge Condition – Page in Adobe Target IFrame**  
- If the page is running inside an Adobe Target IFrame (`document.referrer` contains `lloydsbankinggroup.experiencecloud.adobe.com`), the extension bypasses CSP injection.  
- This avoids collisions or breakages in test environments.

---

## 4. Known Limitations & Gotchas

1. **Single CSP Per Page**  
   If another script or extension also attempts to insert a conflicting `Content-Security-Policy` meta tag, unexpected behaviour might arise. Web browsers generally honour the first CSP they see or combine them in unpredictable ways.  
2. **Domain Logic Specificity**  
   The parent domain extraction logic is tailored for `.uk` domains (it picks the last three tokens) and everything else (last two tokens). This might cause issues on TLDs not covered by `.uk` or typical patterns.  
3. **IFrame Restrictions**  
   The code is designed to skip CSP injection if it detects an Adobe Target environment. If there are other IFrame scenarios requiring CSP, the code may need further adjustments.  
4. **Browser Support**  
   CSP is not fully supported in older browsers. This code attempts to attach a `securitypolicyviolation` event handler which may not be universally available.  
5. **Multiple Subdomains**  
   The extension always trusts the “parent domain” and its subdomains. If an environment has more complex domain structures, additional measures might be needed.  
6. **Analytics Dependency**  
   Logging of violations to `window.LBGAnalytics.correlations` will fail silently if `window.LBGAnalytics` is not defined or not structured as expected.

---

## 5. Recommendations for Refactoring

1. **Modularise the Configuration**  
   The large `config` object could be separated into smaller files or data objects. This would make it easier to maintain, especially as new profiles or domains are added.  
2. **Improve Error Handling**  
   Where possible, add try/catch around critical steps (like reading cookies or injecting the meta tag) and handle failures gracefully, logging helpful information to the console.  
3. **Encapsulation of Domain Logic**  
   The logic for extracting parent domains (specifically for `.uk` TLD matching) could be a standalone function that is easier to test and maintain.  
4. **Reduce Code Duplication**  
   There is repetition in checking for Adobe Target or `LBGAnalytics` for various sections. Consolidating those checks into a single method might simplify future updates and debugging.  
5. **Consistent Code Style**  
   Ensuring consistent formatting, naming conventions, and comment style will make it easier for multiple developers to collaborate.  
6. **Maintain ES5 Compatibility**  
   Continue to avoid ES6 features (e.g. arrow functions, `let`, `const`, template literals) to ensure this extension remains widely compatible.

---

## 6. Maintenance & Further Notes

- **Ownership**: Ensure that a single team or designated developer is responsible for updating the CSP list (`config`) and domain logic as new requirements emerge.  
- **Testing Strategy**:  
  - Test across environments (Development, UAT, Production).  
  - Verify correct domain trust is applied, particularly if the site structure changes.  
  - Confirm that violations are logged correctly to `LBGAnalytics`.  
- **Periodic Review**: CSP requirements evolve. External service providers or new subdomains may require the policy to be expanded or updated for new resources.  
- **Monitoring & Alerts**: Set up monitoring of `window.LBGCSP.violationList` or your analytics correlation to detect frequently blocked resources, which may indicate missing configurations or new third-party tags.

---

**End of Documentation**