# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: OVA : TAG : Set : Lloyds : Event Listeners : Mortgage
- **ID**: 1216
- **Type**: Javascript Code
- **Scope**: 995
- **Execution Frequency**: Active

### Summary
The purpose of this extension is to integrate with a virtual assistant for Lloyds Bank. It sets up event listeners to capture user interactions with the virtual assistant interface, specifically tracking when the assistant is initiated, when a search is submitted, and when internal links are clicked. This data is then sent to Tealium via the `utag.link` function, allowing for comprehensive tracking of user interactions and engagement with the virtual assistant.

---

## 2. Code Explanation

### Key Variables
- **`cvdiv`**: A new DIV element created to house the virtual assistant.
- **`cvscript`**: A SCRIPT element that links to the virtual assistant's script source.
- **`c$`**: A reference to the `$` function from `clova2` library used for DOM manipulation.

### Logic Flow
1. The script checks if the `u.initialised` flag is set. If not, it proceeds to initialize.
2. It creates a DIV (cvdiv) and SCRIPT (cvscript) element to load the virtual assistant's JavaScript from an external source.
3. It appends these elements to the document's body, which starts the virtual assistant on the webpage.
4. Event listeners are set up for various user actions:
   - Clicking on the virtual assistant trigger.
   - Submitting a search.
   - Clicking FAQ links.
5. When these events occur, data is pushed to Tealium using the `utag.link` method, including information about the user's journey through the virtual assistant.

### Dependencies
- The extension relies on the `clova2` library, which is assumed to be loaded in the environment for the `$` function to work correctly.
- The `utag` object must also be available for tracking events.

---

## 3. Usage Examples

### Normal Conditions
1. **User clicks the virtual assistant trigger**: 
   - The event captures the action and sends the following data to Tealium:
     ```json
     {
       "JourneyName": "VirtualAssistant",
       "JourneyStep": 1,
       "JourneyEvent": "Overlay"
     }
     ```

2. **User submits a search**:
   - The event captures the action and sends the following data:
     ```json
     {
       "JourneyName": "VirtualAssistant",
       "JourneyStep": 2,
       "JourneyEvent": "Field Update",
       "EventAction": "Filter",
       "EventNarrative": "Virtual Assistant Search",
       "EventValue": "<user input value>"
     }
     ```

3. **User clicks on an internal link in the FAQ**:
   - The event captures the action and sends:
     ```json
     {
       "JourneyName": "VirtualAssistant",
       "JourneyStep": 3,
       "JourneyEvent": "Internal Link",
       "EventAction": "Supporting Information",
       "EventNarrative": "<link text clicked>"
     }
     ```

### Edge Conditions
- If the virtual assistant script fails to load, the event listeners will not be functional, and no tracking of user actions will occur.
- Clicking on elements that do not have the specified classes may lead to no events being captured.

---

## 4. Known Limitations & Gotchas

- **Dependency on External Script**: If the Lloyds virtual assistant script fails to load, the entire event tracking feature will become inactive.
- **Global Conflict**: There might be conflicts if other scripts on the page also try to define global objects or modify the same DOM elements.
- **Single Instance Assumption**: The code currently assumes only one instance of the virtual assistant will exist. Multiple instances may cause unexpected behaviour.
- **Event Listener Attachment**: The current code does not perform checks to see if the event listeners are already attached, which may cause duplicate events in some scenarios.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Consider adding checks to ensure that required elements are present before attaching the event listeners, to prevent errors if elements are not found.
- **Modularisation**: Break down the code into smaller functions for better readability and maintainability. For example, separate the script loading and event listener attachment into dedicated functions.
- **Error Handling**: Implement error handling for potential failures on loading the virtual assistant script (to provide fallbacks or warnings).
- **Commenting**: Add comments in the code to clarify the purpose of each section and variable, improving the maintenance of the code.

---

## 6. Maintenance & Further Notes

- **Ownership**: Assign a team member as the owner of this code to ensure ongoing maintenance and updates.
- **Testing Guidelines**: Regularly test the extension in various browser environments to ensure cross-compatibility and to detect any potential breakage due to changes in the external virtual assistant script.
- **Documentation Updates**: Keep documentation up-to-date with any changes made to the extension or its dependencies, ensuring new developers can quickly understand the purpose and functionality of the extension.

--- 

This documentation provides a comprehensive overview of the Tealium iQ extension, ensuring that developers and stakeholders can clearly understand its functionality, use cases, and maintenance requirements.