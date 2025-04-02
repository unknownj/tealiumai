# Tealium iQ Extension Documentation: Enable Event Stream

## 1. Extension Overview
- **Name**: Enable Event Stream
- **ID**: 1653
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Enable Event Stream" extension enables the event stream functionality for various domains if the environment is set to development ("dev") or quality assurance ("qa"). It checks the current hostname against a predefined list of enabled domains, and if a match is found, it sets the `EnableEventStream` property to `true`. This allows for tailored event handling suitable for specific testing or operational environments.

## 2. Code Explanation
### Key Variables
- `enabledDomains`: An array of strings representing the domains where the event stream should be enabled.
- `a`: A function parameter representing the event type.
- `b`: A function parameter representing the event payload, which is an object expected to receive properties.

### Logic Flow
1. **Environment Check**: The extension first checks if the environment (`b["ut.env"]`) is either "dev" or "qa". If so, it sets `b.EnableEventStream` to `true`.
2. **Domain Checking**: It iterates over the `enabledDomains` array using the `map` method:
   - For each domain, it compares the `window.location.hostname` and the `b.CanonicalDomainProd` against the current domain.
   - If either matches, it updates `b.EnableEventStream` to `true`.

### Dependencies
- The extension relies on the existence of the global `window` object to retrieve the current hostname.
- It also expects the `eventType` and `eventPayload` to be passed to it during execution, which are guaranteed to be present.

## 3. Usage Examples
### Normal Condition
Suppose the hostname is `www.lloydsbank.com` and the `b["ut.env"]` is set to "dev":
- The extension will set `b.EnableEventStream` to `true`, enabling the event stream.

### Edge Conditions
- If `b["ut.env"]` is set to "prod", regardless of the hostname, `b.EnableEventStream` will not be set to `true`.
- If a domain in `enabledDomains` is not a match (e.g., `www.example.com`), and while the environment is "dev", `b.EnableEventStream` will remain unchanged unless explicitly set elsewhere.

## 4. Known Limitations & Gotchas
- **Sensitive to Environment**: The extension only operates under specific environments ("dev" or "qa"), so it may not be suitable for production use without modification.
- **Domain Dependency**: If the domain is not included in the `enabledDomains` array, the stream will not activate, which may lead to missed data collection.
- **Performance Impact**: Overhead due to the iteration over a potentially large array of domains could impact performance, particularly if this extension is run frequently.

## 5. Recommendations for Refactoring
- **Modularisation**: Consider extracting the domain-checking logic into a separate function for better readability and maintainability.
- **Defensive Checks**: Verify the contents of `eventPayload` before usage, even though it is guaranteed to be present. This would enhance resilience to changes in the structure.
- **Documentation**: Commenting the purpose of the `map` function and what it accomplishes would aid future developers in understanding its role.

## 6. Maintenance & Further Notes
- **Ownership**: Assign a dedicated team member to oversee this extension, ensuring it is updated in line with any changes to domain-related policies.
- **Testing Guidelines**: Set up automated tests to cover various scenarios, particularly focusing on domain matching and environment checks.
- **Monitoring**: Include logging capabilities to monitor how frequently and effectively the event stream is enabled across different domains and environments for performance tuning.

This documentation serves as a guide for developers and stakeholders involved with the "Enable Event Stream" extension in Tealium iQ. For further questions or issues, please refer to the assigned owner or enter a ticket in the support system.