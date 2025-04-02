# Tealium iQ Extension Documentation: Report Suite Overrides

## 1. Extension Overview

- **Name**: Report Suite Overrides
- **ID**: 100036
- **Type**: Javascript Code
- **Scope**: After Load Rules
- **Execution Frequency**: Run Always

### Summary
The "Report Suite Overrides" extension modifies the `ReportSuiteOverride` property of the event payload based on specific conditions related to the `Brand` and `JourneyName`. This is particularly useful for directing analytics data to the appropriate report suites based on the brand context of the event, ensuring accurate tracking and analysis.

---

## 2. Code Explanation

### Key Variables
- **`a`**: Represents `eventType`, which is expected to be of type string.
- **`b`**: Represents `eventPayload`, which is expected to be an object containing various properties, such as `Brand` and `JourneyName`.

### Logic Flow
1. The code immediately enters a `try-catch` block, which helps to suppress any errors that occur during execution.
2. The `Brand` attribute of the `eventPayload` is checked to see if it matches certain brands (`lexautoloease` and `blackhorse`). 
    - If a match is found, the `ReportSuiteOverride` is set to two specific report suite values: `"lloydsbankinggroupprod,lloydsbankinggroupmotor"`.
3. Separately, if the `JourneyName` is present in the `eventPayload` and contains the word `investmentadvised`, the `ReportSuiteOverride` is set to `"lloydsbankinggroupprod"`.
4. The `catch` block is designed to handle any exceptions that might occur during execution without throwing an error or stopping the extension's execution.

### Dependencies
- The extension is reliant on the `eventPayload` object, which must contain the keys `Brand` and `JourneyName` for the logic to function properly. No external libraries are used in this extension.

---

## 3. Usage Examples

### Example Scenario 1: Matching Brand
- **Input**: 
    ```json
    {
      "Brand": "Lex Auto Lease",
      "JourneyName": "Some Journey"
    }
    ```
- **Output**: 
    - `eventPayload.ReportSuiteOverride` will be set to `"lloydsbankinggroupprod,lloydsbankinggroupmotor"`.

### Example Scenario 2: Matching Journey Name
- **Input**:
    ```json
    {
      "Brand": "Some Other Brand",
      "JourneyName": "InvestmentAdvised"
    }
    ```
- **Output**: 
    - `eventPayload.ReportSuiteOverride` will be set to `"lloydsbankinggroupprod"`.

### Example Scenario 3: No Matches
- **Input**: 
    ```json
    {
      "Brand": "Unknown Brand",
      "JourneyName": "Normal Journey"
    }
    ```
- **Output**: 
    - `eventPayload.ReportSuiteOverride` remains undefined, as no conditions were met.

---

## 4. Known Limitations & Gotchas

- The extension does not handle scenarios where the properties `Brand` or `JourneyName` are missing from the `eventPayload`. If these keys are non-existent, the extension simply does not set the `ReportSuiteOverride`.
- Be aware of potential conflicts if other extensions attempt to modify `ReportSuiteOverride` after this extension executes. Since it is set to run always, other mechanisms may inadvertently change the value without awareness of this business logic.
- The decision-making relies on string matches which can be case-sensitive due to the conversion to lowercase. Any unexpected casing variations in `Brand` or `JourneyName` may lead to missed matches.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: While the existence of `eventType` and `eventPayload` is guaranteed, consider including checks for the existence and type of expected properties (`Brand` and `JourneyName`) to preemptively avoid any potential runtime errors.
- **Code Style**: Organise the `if` blocks for better readability, perhaps encapsulating the logic for determining the `ReportSuiteOverride` in a separate function.
  
### Example Refactored Logic (Pseudocode)
```javascript
function setReportSuiteOverride(brand, journeyName) {
    if (brand.toLowerCase().split(" ").join("").indexOf("lexautoloease") >= 0 ||
        brand.toLowerCase().split(" ").join("").indexOf("blackhorse") >= 0) {
        return "lloydsbankinggroupprod,lloydsbankinggroupmotor";
    }
    if (journeyName && journeyName.toLowerCase().indexOf("investmentadvised") >= 0) {
        return "lloydsbankinggroupprod";
    }
    return undefined; // Return undefined if no conditions are met
}

// Usage
b.ReportSuiteOverride = setReportSuiteOverride(b.Brand, b.JourneyName);
```
- This encapsulated approach improves modularity, enhances readability, and promotes code reuse.

---

## 6. Maintenance & Further Notes

- **Owners**: Identify team members responsible for this extension and ensure they understand its functionality and purpose.
- **Testing Guidelines**: Regularly validate the extension in various scenarios during staging to verify that it behaves as expected across different `Brand` and `JourneyName` inputs.
- **Change Log**: Maintain a change log for any modifications made to this extension, including updates to the logic and any modifications to the report suite identifiers.

By documenting the extension thoroughly, stakeholders and other developers can easily understand its purpose and maintenance requirements, ensuring smooth collaboration within the team.