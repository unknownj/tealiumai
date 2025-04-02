# Tealium iQ Extension Documentation: GA4 - Set GA4EventTitle

## 1. Extension Overview

- **Name**: GA4 : Set GA4EventTitle
- **ID**: 1700
- **Type**: Advanced Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The "GA4 : Set GA4EventTitle" extension is designed to process data layer information and construct a custom event title for Google Analytics 4 (GA4). This title is generated from the `PegasusTagName` variable in the Universal Data Object (UDO), formatted in a way that is compatible with GA4 event tracking. By transforming this data, the extension allows for better categorisation and analysis of events within GA4, improving overall analytics reporting.

## 2. Code Explanation

### Key Variables
- **dl**: Represents the data layer object passed to the function.
- **arr**: An array derived from splitting the `dl.PegasusTagName` variable on " | ".
- **event_name**: A string variable that stores the final formatted event title.

### Logic Flow
1. The function `set_ga4_custom_events` is invoked with the global data layer object.
2. The `PegasusTagName` string is split into an array `arr` at every " | ".
3. The first two elements of the array are removed to exclude unwanted prefixes.
4. The array is iterated over to:
   - Remove any occurrence of "Sales".
   - Remove the last element of the array if more than two elements remain.
   - Remove any occurrence of "NA".
5. Finally, the processed elements are joined into a single string, converted to lowercase, and spaces are replaced with underscores.
6. This string is assigned to `b.GA4VirtualEventTitle`, which is likely a global object for further processing.

### Dependencies
- **Global Objects**: The function relies on the `utag.data` object as a source of the `PegasusTagName` variable.
- **Event Type & Payload**: The parameters `eventType` and `eventPayload` are expected to be owned at the time of execution, as they are guaranteed to be present.

## 3. Usage Examples

### Normal Conditions
- If `utag.data.PegasusTagName` is `"Click | Product | NA | Details"`, the function will process it to yield `product_details` as the event title, which will be set to `b.GA4VirtualEventTitle`.

### Edge Conditions
1. **No Valid Tags**:
   - If `PegasusTagName` is `"Sales | NA"`, the output would be an empty string, as all components are filtered out.

2. **Handling of Long Strings**:
   - For a string like `"Click | Product | Promotion | NA | Spring Sale"`, it will result in `"product_promotion"`, as it truncates the last element due to the rules set in the logic.

## 4. Known Limitations & Gotchas

- **Empty Output**: If the `PegasusTagName` does not contain valid segments (only "Sales" or "NA"), it will output an empty string.
- **Dependency on Format**: The extension assumes a specific format of `PegasusTagName` and may not function as intended if different delimiters or structures are used.
- **Regex and Special Characters**: The current implementation does not handle any special characters that may exist in the `PegasusTagName`, which could result in unexpected outputs.

## 5. Recommendations for Refactoring

### Suggested Improvements
- **Error Handling**: Consider implementing checks for the existence and validity of `dl.PegasusTagName` before processing to avoid potential errors.
- **Modularization**: Refactor the splitting, filtering, and transformation logic into separate functions for better readability and maintainability.
  
### Code Style
- Maintain consistent spacing and formatting to improve readability.
- Use descriptive variable names where possible to clarify purpose.

## 6. Maintenance & Further Notes

### Ongoing Maintenance
- Regularly review use cases to ensure that the extension meets evolving analytics requirements.
- Test after major changes in the data layer structure or third-party tools to ensure compatibility.

### Ownership
- Assign developer ownership to maintain and update this extension, ensuring that documentation is kept in sync with code changes.

### Testing Guidelines
- Implement unit tests that mimic different `PegasusTagName` structures to validate the output consistently.
- Ensure thorough testing across multiple scenarios to confirm the expected behaviour and identify edge cases.

---

This documentation serves as a guide to understanding and maintaining the "GA4 : Set GA4EventTitle" Tealium iQ extension, ensuring that developers and stakeholders are well-informed and can effectively utilise the extension within their analytics workflows.