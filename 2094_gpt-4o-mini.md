# Tealium iQ Extension Documentation: Pegasus V2 : Lookups

## 1. Extension Overview
- **Name**: Pegasus V2 : Lookups
- **ID**: 100040
- **Type**: Advanced JavaScript Code
- **Scope**: 1656, 1655, 1611, 1783
- **Execution Frequency**: Each event (Page, Event, Timed)

**Summary**:  
This extension serves as a master lookup table for conversion values and criteria related to various marketing events within the Tealium iQ platform. It consolidates mapping of event types and associated identifiers for tags (Google Floodlight, Google Ads, Microsoft Ads, etc.), ensuring proper data flow and tracking across web applications.

## 2. Code Explanation
Key variables and logic flow are defined in the extension as follows:

### Key Variables:
- **`b["structureLkps"]`**: An object determining the structure for lookup variables based on different event types. This object defines the expected variables for each lookup type by grouping relevant identifiers.

- **`b["lookupTable"]`**: An array that contains the mapping of various events to their respective identifiers in the format:
  ```
  [<lookup_type>!<event_type>!<additional_data>, <mapping>]
  ```

### Logic Flow:
1. The extension initializes the `structureLkps` object that dictates which variables are necessary for various events and lookup types.
   
2. The `lookupTable` array is populated with relevant event mappings, linking the identifiers with their corresponding tag types.

3. The extension processes data from `eventPayload` using these structures, allowing for dynamic interchange of marketing data.

### Dependencies:
The extension relies on:
- Global objects `eventType`, `eventPayload`, and `tagObject`.
- Tealium's event mapping logic to interpret the data correctly.

## 3. Usage Examples

### Normal Conditions:
- **Scenario**: An event is triggered when a user completes a loan application on the Halifax website.
- **Flow**: The `eventPayload` includes the event context, which is matched against the `lookupTable`. The corresponding tag identifiers (`gfl`, `gad`, `mau`) are triggered for analytics.

### Edge Conditions:
- **Scenario**: A user interacts with a UI element that is not defined in the `lookupTable`.
- **Flow**: The extension will not trigger any actions as there is no match in the `lookupTable`. It may result in missing data in analytics unless additional error handling is introduced.

## 4. Known Limitations & Gotchas
- **Lookup Not Found**: If the tag type or event is not listed in the `lookupTable`, it will not be processed, leading to potential tracking gaps.
  
- **Performance Impact**: If the `lookupTable` grows substantially, the performance of the extension might be impacted during lookups.

- **Namespace Conflicts**: Naming conventions for keys in the `lookupTable` need to be strictly adhered to, as any naming discrepancies may result in misalignment in analytics.

## 5. Recommendations for Refactoring
- **Modularization**: Split the extension code into smaller, reusable functions to enhance readability and maintainability. Helper functions for managing the `lookupTable` could be beneficial.

- **Error Handling**: Introduce more robust handling for cases where data does not map to the expected structure, possibly logging these instances for further analysis.

- **Avoiding Global Pollution**: Ensure that any new variable declarations are scoped appropriately to avoid conflicts with other scripts.

- **Code Style**: Maintain consistent indentation and spacing for better readability. Add inline comments for clarity on complex logic.

## 6. Maintenance & Further Notes
- **Ownership**: The extension should have designated owners responsible for ongoing updates and maintenance. Regular reviews should be scheduled to ensure the mapping data remains current.

- **Testing Guidelines**: 
  - Conduct testing with various scenarios to ensure data integrity.
  - Regular regression tests should be implemented after any updates to the extension code or underlying data structures.

- **Documentation Updates**: As changes are made to the extension, maintain comprehensive documentation detailing the modifications and justifications behind them.

--- 

This structured documentation serves to equip developers and stakeholders with an in-depth understanding of the Pegasus V2 : Lookups extension, allowing for informed decision-making and effective usage within the Tealium iQ framework.