```markdown
# Tealium iQ Extension Documentation: Disable Adobe on NFT Domain

## 1. Extension Overview

- **Name**: Disable Adobe on NFT Domain
- **ID**: 1558
- **Type**: Advanced Javascript Code
- **Scope**: 928
- **Execution Frequency**: Upon Page Load

### Summary
This extension is designed to disable Adobe Analytics tracking for a specific domain (`business-nft.test.lloydsbank.co.uk`). It serves as a precautionary measure during testing phases, specifically when stress tests are being conducted on this domain. The intention is to prevent interference with Adobe tracking data during these tests.

---

## 2. Code Explanation

### Key Variables
- `a`, `b`, `u`: These represent the input parameters for the anonymous function, which are the `eventType`, `eventPayload`, and `tagObject` variables expected to be passed to the function by Tealium.
  
### Logic Flow
1. The extension checks if the current hostname matches `business-nft.test.lloydsbank.co.uk`.
2. If it matches, a message is logged to the console indicating that Adobe Analytics tracking is disabled.
3. The function returns `false`, effectively preventing any further tracking actions related to Adobe Analytics on this domain.

### Dependencies
- The code makes use of the `window.location.hostname` global object to retrieve the current hostname.
- It uses the `console.log` method to output messages to the browser console. 

---

## 3. Usage Examples

### Normal Condition
- If the user visits the domain `business-nft.test.lloydsbank.co.uk`:
  - The console will display: 
    ```
    Adobe Analytics disabled until you stop running stress tests on this domain
    ```
  - Adobe Analytics tracking will not be executed.

### Edge Condition
- If the user visits any other domain (e.g., `www.lloydsbank.co.uk`):
  - No console message will appear, and Adobe Analytics will proceed as usual.

---

## 4. Known Limitations & Gotchas

- This extension only checks for one specific domain. If an additional testing domain is introduced, the code needs to be updated to include this new hostname.
- The console message could lead to confusion if users or testers are unaware of the purpose of the extension; hence, clear documentation is essential.
- The extension does not implement any logging or user alerts outside of console outputs, which may limit visibility on production environments.

---

## 5. Recommendations for Refactoring

- **Code Style**: Although ES5 is the requirement, consider adhering to a consistent code styling convention (such as indentation and spacing) for enhanced readability.
- **Modularisation**: Instead of nested code, consider extracting the domain check into a separate function:
  ```javascript
  function isNftDomain() {
      return window.location.hostname === "business-nft.test.lloydsbank.co.uk";
  }

  if (isNftDomain()) {
      console.log("Adobe Analytics disabled until you stop running stress tests on this domain");
      return false;
  }
  ```
- **Logging & Alerts**: Enhance the communication feedback by considering adding visual alerts or logs that indicate success or failure in other parts of the script as well.

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly check the extension to ensure it remains functional with the current testing protocols and domains. Be diligent in testing across different environments.
- **Ownership**: Identify an owner for the extension to manage future changes and documentation updates.
- **Testing Guidelines**: Always test the extension in the staging environment before promoting it to production. Consider automated tests that verify the expected behaviour without relying solely on console outputs.

#### Additional Notes
- Keep abreast of any changes in testing requirements to ensure this extension is updated accordingly to maintain its purpose effectively.
```
