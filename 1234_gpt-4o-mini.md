# Tealium iQ Extension Documentation: Downloads

## 1. Extension Overview
- **Name**: Downloads
- **ID**: 100040
- **Type**: Advanced Javascript Code
- **Scope**: DOM Ready
- **Execution Frequency**: Run Once

### Summary
This Tealium iQ extension is designed to capture download events for specific file types (PDF and XLS) on a webpage. It leverages event tracking to collect and send relevant data (such as file names and types) to the Tealium data layer. This helps in understanding user interactions with downloadable resources, thereby aiding in analytics and reporting efforts.

## 2. Code Explanation

### Key Variables
- **filename**: Name of the file being downloaded.
- **label**: Text or label associated with the download, typically the link text.
- **context**: Provides information about the context of the download (defaults to "Supporting Material" if not provided).
- **filetype**: The type of file being downloaded. Defaults to the extension derived from the filename if not explicitly provided.

### Logic Flow
1. **Event Binding**: The extension binds click events to anchor (`<a>`) elements with `.pdf` and `.xls` file extensions.
2. **Event Triggering**: When an anchor tag is clicked, the `download` function is invoked, capturing the filename, provided label, and optional context. 
3. **Variable Setting**: The function sets several variables using the `setVariables` method, including:
   - `ResourceFileName`
   - `ResourceFileType` (derived from filename if not specified)
   - `ResourceFileContext`
   - `JourneyEvent` and `EventAction`
   - `EventNarrative` (up to 64 characters or full filename)
4. **Event Sending**: The function eventually calls `this.genericEvent(140)` to send the captured data as a tracking event.

### Dependencies
- Utilises the `clova2` JQuery-like library for DOM manipulation and event handling.
- Relies on `utag.sender[928].map` for mapping variables to specific Tealium data layer variables.

## 3. Usage Examples

### Sample Scenario 1: Normal Download Event
- A user clicks a link: `<a href="example.pdf">Download PDF</a>`.
- The extension captures:
  - `filename`: `"example.pdf"`
  - `label`: `"Download PDF"`
  - `ResourceFileType`: `"pdf"`
  - The event is sent with a structured payload including these parameters.

### Sample Scenario 2: Edge Condition with Long Label
- A user clicks a link: `<a href="example.pdf">This is an exceptionally long download label that exceeds sixty-four characters</a>`.
- The extension captures:
  - `filename`: `"example.pdf"`
  - `label`: `"This is an exceptionally long download label that exceeds sixty-four characters"`
  - `EventNarrative`: `"example.pdf"` (as label exceeds limit)

## 4. Known Limitations & Gotchas
- **File Types**: Currently only supports PDF and XLS file extensions. Other file types are not captured.
- **Dynamic Elements**: If the links are injected into the DOM after the page load, this event binding will not apply to them without re-initialising the event listeners.
- **Potential Mapping Conflicts**: Ensure that the `eVar` mappings (e.g., `eVar160`, `eVar161`, `eVar162`) do not conflict with other extensions that might use the same variables.

## 5. Recommendations for Refactoring
- **Error Handling**: Consider adding checks to ensure `filename` and `label` are defined before processing to avoid any unexpected runtime errors.
- **Modularisation**: Separate concerns by refactoring the event binding logic and the download logic into distinct functions. This will enhance readability and maintainability.
- **Code Style**: Consistently use semicolons (`;`) to terminate statements to prevent issues related to JavaScript's automatic semicolon insertion.

## 6. Maintenance & Further Notes
- **Ongoing Maintenance**: Ensure to review the logic annually or after major updates in the website architecture to keep it functional with any changes.
- **Ownership**: Assign ownership to a team member familiar with both Tealium and the website structure for consistent updates and documentation.
- **Testing Guidelines**: Regularly test the extension in various scenarios, particularly after any changes to website links or structure. Use browser developer tools to validate whether the events are correctly captured and sent.

This structured documentation serves as a comprehensive guide for developers and stakeholders to effectively understand, implement, and maintain the Downloads extension within Tealium iQ.