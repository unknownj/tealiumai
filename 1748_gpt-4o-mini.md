# Tealium iQ Extension Documentation: Qualtrics Load Rules

## Extension Overview
- **Name**: Qualtrics load rules (monz woz ere)
- **ID**: 1748
- **Type**: Javascript Code
- **Scope**: Before Load Rules
- **Execution Frequency**: Run Always

### Summary
This extension defines a set of load rules for Qualtrics, which determine the appropriate ZoneID to use based on the current page's domain and path. The extension filters through a predefined list of rules to identify the first eligible rule that matches the current page, aiding in personalised event tracking for different domains associated with the organisation.

## Code Explanation

### Key Variables
- **loadRules**: An array of objects that defines various load rules, each containing:
  - `name`: A descriptive label for the rule.
  - `urls`: An array of acceptable domains for this rule.
  - `ZoneID`: An identifier for the Qualtrics zone.
  - `paths`: (optional) An array of paths that should be matched for this rule.
  - `ignore`: (optional) An array of paths that should be ignored if matched.

### Logic Flow
1. **Filtering Eligible Rules**:
   - The extension first checks if a rule has a `ZoneID`. If not, it's excluded.
   - If a rule has an `ignore` array, any matching paths in the current canonical path will cause the rule to be excluded.
   - The code then checks if the current path matches any of the defined paths and if the current domain matches any of the specified URLs in the rule.

2. **Assigning Zone Variables**:
   - If there are any eligible rules found after filtering, the first rule's `ZoneID` and `name` are assigned to the variables `b.QualtricsZoneID` and `b.QualtricsZoneName`, respectively.

### Dependencies
- **LBGAnalytics**: This code relies on the `LBGAnalytics` global object for checking domain conditions. It utilises a method `Q` that evaluates if the current page's URL matches any of the specified `urls`.

## Usage Examples

### Normal Flow
- When a user navigates to `www.lloydsbank.com/business`, the extension checks the load rules. The rule for `QAL : BOSLYD : Business Banking Public 2` matches because its URL and path criteria are satisfied. The corresponding `ZoneID` is set for tracking.

### Edge Cases
- If a user visits a page that does not match any defined load rules (e.g., an unrecognised domain or path), then `b.QualtricsZoneID` and `b.QualtricsZoneName` remain undefined, effectively not sending any Qualtrics-specific tracking data for that page.

## Known Limitations & Gotchas
- **Lack of Fallback**: If no rule matches, no default ZoneID is set, leading to potential data loss for tracking.
- **Path Matching**: The extension only matches full paths against defined paths and ignores partial matches not explicitly defined in the rules.
- **Dependence on `LBGAnalytics`**: If the `LBGAnalytics.Q` function is unavailable or fails, the extension may not correctly filter URLs, potentially resulting in incorrect tracking logic.
  
## Recommendations for Refactoring
- **Error Handling**: Implement error handling for edge case scenarios where `b.CanonicalPath` might not behave as intended.
- **Separation of Concerns**: Consider modularising the logic for path and URL matching into separate functions for enhanced readability and maintainability.
- **Commenting**: Improve inline comments to describe individual sections of filtering logic for clarity.
- **Consistent Naming**: Use consistent naming conventions for variables to improve the readability of the code. For example, prefer `urlMatcher` instead of `a`.

## Maintenance & Further Notes
- **Regular Updates**: Periodically review and update load rules to ensure they reflect current website URLs and paths.
- **Testing Guidelines**: Conduct extensive testing whenever load rules are modified, particularly in a staging environment, to confirm that the correct `ZoneID` is being applied across all relevant scenarios.
- **Ownership**: Assign a specific team member or group to maintain this extension's documentation and codebase, ensuring it is up-to-date with business requirements.

This documentation is designed to assist developers and stakeholders in understanding the functionality, limitations, and maintenance of the Qualtrics load rules Tealium iQ extension.