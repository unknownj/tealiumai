# Tealium iQ Extension Documentation - ContentSquare Masking

## 1. Extension Overview:
- **Name**: ContentSquare Masking
- **ID**: 1662
- **Type**: JavaScript Code
- **Scope**: 1471
- **Execution Frequency**: On Page Load

### Summary
The ContentSquare Masking extension is designed to handle Personally Identifiable Information (PII) by implementing data masking strategies on specific elements within the web page. By setting PII selectors, it allows for the masking of sensitive information when tracking user interactions, aimed at enhancing data privacy and meeting compliance requirements.

---

## 2. Code Explanation

### Key Variables:
- **window._uxa**: This is an array that contains commands for the ContentSquare analytics library. It is initialized as an empty array if it doesn't exist.
- **PIISelectors**: An array of CSS selectors that identify elements containing PII that need to be masked.
- **b.EnableReplay**: A boolean property used to enable or disable replay functionality based on the hostname conditions and the `journeyReplay` flag.

### Logic Flow:
1. The extension begins by checking if the `_uxa` global object exists; if not, it initializes it as an empty array.
2. The `setPIISelectors` command is pushed to the `_uxa` array with a comprehensive list of selectors that identify PII elements on the page.
3. Conditional statements check the current hostname of the page against a predefined list, setting `b.EnableReplay` to `true` if there is a match.
4. There is a commented-out section for additional checks on specific analytics conditions to set `journeyReplay`.
5. If `journeyReplay` is `true`, `b.EnableReplay` is also set to `true`.

### Dependencies:
- The extension depends on the global `window` object to store and manipulate the `_uxa` array. 
- It may rely on the presence of the ContentSquare library for the PII masking functionality to work effectively.

---

## 3. Usage Examples

### Scenario 1: Normal Data Masking
When a user navigates to `www.lloydsbank.com`, the extension identifies and masks content based on the defined PIISelectors. For instance, elements with the class `.tl-mask` will not be captured in the user journey.

### Scenario 2: Enabling Replay
If a user visits `www.halifax.co.uk`, `b.EnableReplay` is set to `true`, allowing the analytics team to replay the session. This enables a review of the user’s journey without exposing masked PII.

### Edge Conditions:
- Visiting an unsupported hostname (e.g., `www.example.com`) will prevent replay functionality, as none of the defined conditions will evaluate to `true`.
- If the selectors do not match any elements on the page, no PII will be masked, potentially causing compliance issues.

---

## 4. Known Limitations & Gotchas
- The extension relies heavily on accurate selectors. If the page structure changes, updates may be needed to ensure PII is still masked correctly.
- If multiple extensions are manipulating `b.EnableReplay`, conflicts may arise.
- The commented-out lines for additional hostname checks involve restrictions due to Content Security Policies (CSP), meaning certain hosts cannot be tracked for replay.
- If the ContentSquare library is not loaded before this extension executes, the `_uxa` array won't function as intended, risking data integrity.

---

## 5. Recommendations for Refactoring
- Consider modularizing the hostname checks into a function to reduce code duplication. For example:
  ```javascript
  function enableReplayForHostnames(hostnames) {
      if (hostnames.includes(window.location.hostname)) {
          b.EnableReplay = true;
      }
  }
  ```
- Implement defensive checks to ensure `b` is properly initialized before setting properties, helping to prevent runtime errors.
- Keep the PIISelectors array externalized in a configuration file if it may change frequently or be reused across different extensions.
- Commenting and documenting the purpose of each section and selector can facilitate easier future updates.

---

## 6. Maintenance & Further Notes
- **Ownership**: Determine a dedicated team or individual responsible for maintaining the extension, ideally with a strong understanding of data privacy regulations.
- **Testing Guidelines**: Set up a testing environment to verify that PII is being masked effectively across various scenarios. Use tools to confirm that user sessions behave as expected without exposing sensitive data.
- **Ongoing Maintenance**: Regularly review the selectors and hostname conditions to ensure continued compliance as the web application evolves.

This documentation serves as a comprehensive guide for developers and stakeholders interacting with the ContentSquare Masking extension, providing clarity on usage, implementation, and long-term maintenance.
