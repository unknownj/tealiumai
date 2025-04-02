# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Division Override for Business Domains
- **ID**: 2274
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension identifies the business domain from which the user is accessing the application. It checks the current hostname against a predefined list of business domain names and, if a match is found, overrides the `Division` variable to `"Commercial"`. This is particularly useful for tailoring content or functionality based on the business domain the user belongs to.

---

## 2. Code Explanation

### Key Variables
- **businessDomainMatches**: An array containing specific business domain strings that the extension will check against the current hostname.

### Logic Flow
1. The extension iterates through each domain in the `businessDomainMatches` array.
2. For each domain, it checks if the substring is present in `window.location.hostname`.
3. If a match is found, it sets `b.Division` to `"Commercial"`.

### Global Dependencies
- **window**: The global `window` object is used to access the current `location.hostname`.
- **eventType** and **eventPayload**: These parameters are expected to be available in the execution context and are passed into the immediately invoked function.

---

## 3. Usage Examples

### Normal Scenario
- When a user navigates to `securebusiness.lloydsbank.co.uk`, the `Division` will be set to `"Commercial"`. If this domain is part of the defined list, any subsequent logic that relies on `b.Division` will treat this user as part of the "Commercial" division.

### Edge Condition 
- If the user accesses a domain not included in the `businessDomainMatches` array, such as `personal.lloydsbank.co.uk`, the extension will not modify `b.Division`, leaving it undefined or unchanged.

### Flow Visualization
```plaintext
User Accesses: securebusiness.lloydsbank.co.uk
   |
   +--> Checks against businessDomainMatches
   +--> Match found
   +--> Sets b.Division = "Commercial"

User Accesses: personal.lloydsbank.co.uk
   |
   +--> Checks against businessDomainMatches
   +--> No match found
   +--> b.Division remains unchanged
```

---

## 4. Known Limitations & Gotchas

- **Limited Domain Configuration**: The hardcoded list of domains may become outdated. Any addition or removal of domains requires code changes.
- **Performance Concern**: In scenarios with a large number of business domains, the check may become less efficient.
- **Potential Conflicts**: If another Tealium extension also modifies `b.Division` without coordination, it may lead to inconsistent values.
- **Browser Compatibility**: While the code adheres to ES5 standards, ensure compatibility across all intended browsers, especially older ones.

---

## 5. Recommendations for Refactoring

- **Dynamic Configuration**: Consider fetching the list of business domains dynamically from a server or a configuration file instead of hardcoding them. This would improve maintainability.
- **Code Style**: Use consistent variable naming conventions. For example, prefer camelCase for all variable names.
- **Error Handling**: While defensive coding is not a primary concern, consider logging errors or unexpected behaviours, such as if the hostname is not in the expected format.
- **Modularisation**: Separate the logic of domain checking into its function. This would help in testing and isolating changes.

#### Refactored Code Example
```javascript
(function(a,b){
  var businessDomainMatches = [
    "securebusiness.lloydsbank.co.uk",
    "onlinebusiness.lloydsbank.co.uk",
    "secure-business.bankofscotland.co.uk",
    "online-business.bankofscotland.co.uk"
  ];
  
  function setDivisionIfNeeded(domainList) {
    var found = false;
    domainList.forEach(function(domain){
      if (window.location.hostname.indexOf(domain) > -1) {
        found = true;
        b.Division = "Commercial";
      }
    });
    return found;
  }
  
  setDivisionIfNeeded(businessDomainMatches);
})(eventType, eventPayload);
```

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Review the business domain list periodically to ensure it aligns with current business requirements.
- **Ownership**: Designate team members responsible for the monitoring and updating of this extension.
- **Testing Guidelines**: 
  - Conduct unit tests for various hostname scenarios to ensure correct handling by the extension.
  - Check for conflicts with other extensions, especially those modifying `b.Division`.
  - Ensure regression testing after any changes to the domains list or related code.

By following these guidelines, the functionality and maintenance of the extension can be optimised, ensuring it meets business requirements effectively.