# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name**: LBG : BLR : SET : CANONICALDOMAINPROD
- **ID**: 1322
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension is designed to set a canonical domain value in the Tealium data layer (`CanonicalDomainProd`) based on the current hostname or a predefined mapping for various products. The intention is to standardise the canonical domain variables sent from different environments and brands, ensuring that the correct URLs are used when tracking user interactions.

---

## 2. Code Explanation
### Key Variables
- **datalayer**: This variable references the Tealium `clova3.datalayer` object for setting and retrieving data layer values.
- **CanonicalDomain**: This variable captures the current canonical domain either from the data layer or defaults to the current window hostname.

### Logic Flow
1. **Array Conversion Function**: `arrayToString` is defined to convert an array into a string, after removing the first element. If the array is undefined or null, the function returns `undefined`.
2. **Domain Matching Functions**: 
   - `returnStingMatcher` processes the canonical domain to match it against a regex pattern for non-public domains, returning corresponding strings.
   - `returnStringMatcherPublic` does the same for public domains, using a different regex pattern.
3. **Production Domain Resolver**: `returnProductionDomain` maps matched strings to known canonical domains for Lloyds, Halifax, Bank of Scotland, MBNA, and their testing/sandbox counterparts.
4. **Canonical Domain Setting**: The extension determines the correct domain to set based on whether the canonical domain belongs to a public or non-public domain. It sets the `CanonicalDomainProd` data layer variable.

### Dependencies
- **Global Objects**: The extension relies on `window.location` to retrieve the hostname and `clova3.datalayer` to interact with the Tealium data layer.

---

## 3. Usage Examples

### Normal Conditions
1. If the canonical domain is set to `wwwlloydsbankcom`, the extension will resolve it to `www.lloydsbank.com` and store it in `CanonicalDomainProd`.
2. A hostname like `mponline` will return `online.mbna.co.uk`.

### Edge Conditions
1. For an unknown domain like `test.bank.com`, the function falls back to the existing `CanonicalDomain` value, and `CanonicalDomainProd` remains unchanged.
2. If `CanonicalDomain` contains `.intranet.test.group`, the extension will attempt to use `returnStringMatcherPublic`, providing specific public domains.

---

## 4. Known Limitations & Gotchas
- The regex patterns for domain matching are hardcoded and may need updates if new product domains are added or existing ones are modified.
- If the hostname isn't matched by any specified cases, it will default to the current value of `CanonicalDomain`, which might lead to inconsistencies in tracking.
- Must ensure that `clova3.datalayer` is properly initialised prior to executing this extension; failure to do so could lead to runtime errors.

---

## 5. Recommendations for Refactoring
- **Defensive Checks**: Add checks to ensure that regex patterns compile successfully.
- **Code Style**: Consider breaking long functions into smaller, more manageable ones for improved readability.
- **Modularisation**: Separate the production domain mapping logic into its own module for easier updates and maintenance.
- Use variables consistently for readability. For instance, consider renaming `returnStingMatcher` to `returnStringMatcher` for clarity.

---

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Regularly review and update the regex patterns and mappings to reflect any changes in product domains.
- **Ownership**: Assign a dedicated developer or team responsible for maintaining this extension and ensuring its compatibility with other Tealium extensions.
- **Testing Guidelines**: Implement thorough unit tests to validate that the domain resolutions are accurate and that the extension behaves as expected in various scenarios.

This documentation provides a comprehensive overview and guidance for working with the `CanonicalDomainProd` extension in "Tealium iQ," ensuring clarity for future developers and stakeholders.