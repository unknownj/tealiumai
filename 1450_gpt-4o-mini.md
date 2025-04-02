# Tealium iQ Extension Documentation: OVA : TAG : Set : Halifax : Event Listeners : Mortgage

## 1. Extension Overview

- **Name**: OVA : TAG : Set : Halifax : Event Listeners : Mortgage
- **ID**: 1450
- **Type**: Javascript Code
- **Scope**: 1214
- **Execution Frequency**: Active (executed upon loading the page and after a 3s delay)

### Summary
This extension is designed to facilitate the integration of a Virtual Assistant (VA) interface on the Halifax website, allowing users to interact with the VA for mortgage-related queries. It listens for specific events like clicks on trigger buttons and submission actions, enabling tracking of user interactions through the `utag.link` calls. By capturing these interactions, it enables the tracking of user journeys and aids in providing insights into customer behaviour.

---

## 2. Code Explanation

### Key Variables
- `c$`: A shorthand for `window.clova2.$`, which likely represents a jQuery-like function for DOM manipulation.
- `VAMD`: An object that encapsulates all the logic for the Virtual Assistant, containing methods and configurations.

### Logic Flow
1. **Container Creation**: The `createCVContainer` function generates a `<div>` element that serves as the placement for the VA on the webpage.
2. **Event Handlers Setup**: The `createCVEventHandlers` function sets up event listeners for:
   - The VA trigger button (to open the VA interface).
   - The VA submission button (to request information based on user input).
   - Clicks on FAQ items (to gather user interest and provide more information).
3. **Loading the VA**: The `loadCV` function orchestrates the loading of the VA by:
   - Initialising necessary scripts.
   - Setting up functionality such as handling user questions and navigating to different URLs.
4. **User Interaction**: Events such as clicking on certain elements are handled in a modular way, capturing and sending relevant data via `utag.link`.

### Dependencies
- **Global Objects**:
  - `window.clova2`: Indicates the presence of a wrapper around jQuery or a similar library.
  - `window.utag`: Represents the Tealium Universal Tag library for sending data.
- **External Libraries**: It relies on jQuery for DOM manipulation and event handling.

---

## 3. Usage Examples

### Normal Conditions
- **Opening VA**: When a user clicks on the “Ask us” button, the interface will display the VA, and an event will be sent to Tealium indicating the start of the user journey with `JourneyEvent: "Overlay"`.

- **Submitting a Question**: Upon entering a mortgage-related question in the input field and pressing “Submit”, the VA captures this question and sends it as `EventValue` to provide insights into the topics the user is interested in.

- **Clicking FAQ Items**: If the user selects an FAQ item, the extension logs the action with the text of the item clicked, providing insight into common queries.

### Edge Conditions
- **Slow Loading**: If the VA scripts do not load properly (e.g., due to network issues), users may experience delays or a lack of interaction capabilities. It is recommended to monitor script loading and provide user feedback in such cases.

---

## 4. Known Limitations & Gotchas

- The extension explicitly relies on the jQuery library being available. If it is not loaded before this extension runs, it may produce errors.
- There may be potential conflicts with other extensions in Tealium that manipulate the same DOM elements or global objects, which could interfere with event handling.
- Users on older browsers may encounter issues if they do not support the features used; it's crucial to be aware of browser compatibility.

---

## 5. Recommendations for Refactoring

- **Modularisation**: Consider breaking down longer functions into smaller, reusable functions, especially within `loadCV`, to enhance readability and maintainability.
- **Defensive Checks**: Implement checks to ensure that the necessary global objects (`window.clova2` and `window.utag`) are available before attempting operations on them.
- **Code Style**: Consistently format spacing and indentation throughout the code to improve readability. Ensure that comments are detailed and clarifying.
- **Error Handling**: Introduce error handling within AJAX calls to manage failures gracefully, allowing for user feedback in case of errors.

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Regularly review the extension for performance and functionality, especially after updates to external libraries or conflicts with new Tealium features.
- **Ownership**: Assign a dedicated team or individual to manage updates and document issues encountered during development or production.
- **Testing Guidelines**: Implement thorough testing to cover various user interaction scenarios, including but not limited to opening the VA, submitting questions, and interactive FAQs. Automated tests can be beneficial if integrated into the CI/CD pipeline.

This documentation aims to facilitate understanding and usage of the extension among developers and stakeholders. Regular reviews and updates to this documentation will promote best practices and keep all team members informed about the functionalities and limitations of the extension.