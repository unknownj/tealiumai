# Tealium iQ Extension Documentation: Celebrus RTIM BLR Code

## Extension Overview

- **Name**: Celebrus RTIM BLR Code
- **ID**: 1507
- **Type**: Advanced Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

**Summary**:  
The Celebrus RTIM BLR Code extension is designed to enable Celebrus tracking for specific environments and domains by setting flags in the `eventPayload` object. By evaluating the current hostname and environment settings, the extension dynamically determines when to enable or disable the Celebrus parameters, ensuring that tracking only occurs under designated conditions, while also managing lead data collection from `LBGAnalytics`.

## Code Explanation

### Key Variables

- `b`: Represents the `eventPayload` object, to which various properties are added based on the conditions evaluated.
- `LBGAnalytics`: Global object that the extension relies on for retrieving lead data.
- `devdomains`: An array containing known development domains to check against the current hostname.

### Logic Flow

1. **Environment Check**: The extension first checks if the environment is set to `dev` and sets the `CelebrusEnabled` flag accordingly.
2. **Hostname-based Conditions**: The extension inspects the `window.location.hostname` to determine if certain keywords (like "luat", "mbna", "bankofscotland", etc.) are present to set the `CelebrusEnabled` flag.
3. **Path-based Conditions**: The extension checks the page path for "gform" to enable tracking.
4. **Hostname Exceptions**: Specific hostnames (like calculator.halifax.co.uk) force the removal of the `CelebrusEnabled` flag.
5. **Pre-Prod Check**: Checks if the current hostname matches known development domains or if the `Platform` or `ut.env` is not `prod` to set the `CelebrusPreProd` flag.
6. **Lead Data Collection**: If `LBGAnalytics.leads` is available, it retrieves lead IDs and prepares them for later use. A commented-out section shows where further lead data processing could occur.
7. **Event Listener Setup**: The extension sets a timeout to invoke lead listening methods on the `LBGAnalytics` object, ensuring that they are executed slightly after the next JavaScript tick.

### Dependencies on Global Objects or Libraries

- **LBGAnalytics**: This is a critical global object that must be present for the extension to function correctly. The extension depends on its methods for accessing and processing leads.

## Usage Examples

### Normal Conditions

- When a user visits `http://luat-dmp.example.com`, `b.CelebrusEnabled` would be set to "Y". Simultaneously, if this is the development environment (`b["ut.env"] == "dev"`), both `b.CelebrusEnabled` and `b.CelebrusPreProd` would be true, facilitating Celebrus tracking.

### Edge Conditions

- Visiting `http://calculator.halifax.co.uk` results in `b.CelebrusEnabled` being deleted despite meeting previous conditions. This demonstrates an edge case where specific hostnames are restricted from enabling Celebrus tracking.

## Known Limitations & Gotchas

- The extension does not cater to all possible hostname patterns or exceptions. Future URLs introduced may require updates to prevent unintended tracking.
- Potential performance hit from not efficiently managing frequent checks against the `window.location` and arrays, especially if many conditions are added.
- If the `LBGAnalytics` object is not available, subsequent calls to `LBGAnalytics.leads` will fail, leading to a silent failure due to the try-catch around the lead listener functions.

## Recommendations for Refactoring

- **Modularization**: Consider creating functions for repetitive checks (e.g., for determining if a hostname matches development patterns). This would enhance maintainability and readability.
- **Code Style**: Implement consistent commenting and formatting to improve clarity. For instance, use uniform sentence structures in comments.
- **Error Handling**: Although there is minimal error handling in network operations, implementing monitoring could be valuable for production diagnostics.
- **Caching Mechanism**: Instead of the current mechanism where lead data is built in memory, consider a more efficient way to manage this data that could involve batch processing during high traffic.

## Maintenance & Further Notes

- **Ownership**: Assign a dedicated individual or team to oversee the extension's functionality, especially during deployments or updates to the `LBGAnalytics` system.
- **Testing Guidelines**: Regularly perform testing against known and new hostnames, ensuring that enabling and disabling Celebrus tracking aligns with business requirements.
- **Documentation Updates**: As system updates occur, update this documentation to reflect changes in logic, functionality, or external dependencies regularly.

This documentation aims to equip both developers and stakeholders with the necessary knowledge to understand, maintain, and potentially expand upon the Celebrus RTIM BLR Code extension effectively.