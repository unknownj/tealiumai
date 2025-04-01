# God Mode – Tealium iQ JavaScript Extension Documentation

This document captures key details and best practices pertaining to the “God Mode” extension in Tealium iQ. It includes an overview, code explanation, usage examples, known limitations, refactoring recommendations (with ES5 compatibility), and maintenance notes.

---

## 1. Extension Overview

- **Name:** God Mode  
- **Extension ID:** 1723  
- **Type:** JavaScript Code  
- **Scope:** DOM Ready  
- **Execution Frequency:** Run Once  

**Summary**  
This extension injects a custom command palette (sometimes referred to as “God Mode”) into the web page. The command palette provides interactive tools for testing and debugging analytics functionality within the Lloyds Banking Group (LBG) environment. It offers commands to:

- Enable or disable certain analytics behaviours (e.g., Adobe Target, triggerView).  
- View and manipulate cookies and data layer values.  
- Display environment/versioning information.  
- Inject debugging scripts on-the-fly.  
- Set up a sticky icon in the corner to access all these commands.

This is primarily a developer/QA-focused tool to streamline debugging tasks by providing a single UI with multiple utilities.

---

## 2. Code Explanation

### 2.1 High-Level Flow

The code is enclosed in an **immediately invoked function expression** (IIFE), which accepts a single parameter (`override`). Inside this function:

1. **Helper Functions (the “el” Object)**  
   - `el.make(selector, optionalText, optionalStyleObject)`: Creates a standard HTML element given a CSS-like selector string (e.g. `"div#myid.myclass[attribute=value]"`).  
   - `el.text(value)`: Creates a simple text node.  
   - `el.draw(selector, optionalText, optionalStyleObject)`: Similar to `el.make`, but creates SVG elements within the SVG namespace.

2. **Z-Index Fetcher**  
   - `getNextZIndex()`: Retrieves the highest `z-index` in the document and returns a value one higher, ensuring that newly created elements appear on top.

3. **Global State Variables**  
   - `idspispopd`: Tracks the multi-key combination used to initialise the command palette (`Ctrl + Alt + j` followed by `Ctrl + Alt + w`). This prevents accidental triggers.
   - `funcs`: An array of command definitions. Each entry is either an object describing a command or a function returning an array of commands. These commands offer functionalities like disabling/enabling triggerView, pasting QA links, listing cookies, showing versions, and more.

4. **Command Palette Initialisation** (`init()` function)  
   - Injects custom fonts (Google Fonts) into the `<head>`.  
   - Creates a container (`<section>`), an input box, and a suggestions list.  
   - Dynamically applies styling (position, colours, and transitions).  
   - Wires up the input to filter matching commands from `funcs` on each keystroke, displaying possible suggestions.  
   - Handles the interaction (click) on each suggestion to run its `action` method or show its `info`.

5. **Hotkey Listener**  
   - A `keyup` event on the document checks for `Ctrl + Alt + j` followed by `Ctrl + Alt + w`. Upon detection, it calls `init()`, rendering the command palette.

6. **Sticky Icon Creation** (`createCommandPaletteIcon`)  
   - If a specific cookie is set (`LBGCommandPaletteShortcut=true`), an SVG “cog” icon is injected onto the page, allowing the user to click it to initialise the palette without pressing the keyboard combination.  
   - This icon is also designed to dynamically hide if right-clicked.

7. **External Dependencies**  
   - The extension references `window.LBGAnalytics` for many of its functionalities (e.g., `triggerView`, `cookies`, `consents`).  
   - It references Tealium objects like `utag`, `utag.data`, and `utag.cfg`.  
   - It occasionally references Adobe Target (`adobe.target`).

### 2.2 Key Variables and Objects

- **`el`**: A utility object for creating DOM and SVG elements.  
- **`getNextZIndex()`**: A function that scans all elements to compute the highest z-index.  
- **`idspispopd`**: Controls the activation flow for the palette through keystrokes.  
- **`funcs`**: A list of commands. Each command typically has:  
  - `label`: The displayed name of the command.  
  - `action(prompt?)`: A function invoked when the command is selected. Sometimes prompts the user.  
  - `info()`: A function which, if present, displays information or debug output.  
  - `suggest()`: A function returning a boolean to indicate whether the command is suggested for quick selection (usually only when `. ` is typed in the input box).

### 2.3 Loading Additional Scripts  
Towards the end of `init()`, and also in the sticky icon creation logic, the code appends `<script>` elements sourced from `tags.tiqcdn.com`. These are additional Tealium vendor scripts for debugging or analytics usage.

---

## 3. Usage Examples

### 3.1 Activating God Mode Manually  
1. Open a web page containing this extension.  
2. Press `Ctrl + Alt + j`.  
3. Press `Ctrl + Alt + w`.  
4. A black console-like bar appears at the top of the screen with an input box.  
5. Type partial or full keywords (space-separated) of the command you want (e.g., “triggerView” or “cookies”).  
6. Click on the displayed suggestion to run the command or see info.

### 3.2 Using the Sticky Cog Icon  
1. If the extension sets the `LBGCommandPaletteShortcut=true` cookie, you may see a cog icon at the top-left of the page.  
2. Click the cog icon to open the palette directly.  
3. Right-click to hide the icon.

### 3.3 Running Example Commands  
- **“Disable triggerView for session”**: This toggles `triggerView` off. You might do this before testing page tags without generating new analytics events.  
- **“View current Tealium datalayer”**: This displays the entire data layer (via `LBGAnalytics.datalayer.get()`) in formatted JSON.  
- **“Cookie Consent Status”**: Shows which consent categories are currently allowed.  
- **“Opt In to All Cookies”** or **“Opt Out of All Cookies”**: Immediately toggles consent states.  
- **“Get current Tealium version”**: Displays the last-published Tealium library build timestamps and how long ago they were updated.

---

## 4. Known Limitations & Gotchas

1. **Dependency on LBGAnalytics**  
   The extension heavily depends on the presence of `window.LBGAnalytics`, particularly `triggerView`, `cookies`, `datalayer`, and `consents`. If `LBGAnalytics` is not defined, many commands will fail or do nothing.

2. **Handling of Adobe Target**  
   Certain commands check `window.adobe.target`. If Adobe Target is not present, those commands return “Target not found”.

3. **Potential DOM Conflicts**  
   The extension appends several elements (`<section>#godmodecontainer`, scripts from `tiqcdn.com`, an optional `<svg>#jwcog`). Other scripts or styles might conflict with these if they reuse IDs (#godmodecontainer, #jwcog) or override top-level z-index values.

4. **Cookies**  
   Some commands read or modify cookies. If browser configurations block cookies or if domain-scoped logic is incorrect, certain operations may fail silently.

5. **Performance Considerations**  
   The `getNextZIndex()` function queries all elements in the document. On pages with a massive number of DOM elements, this could be expensive. Use carefully in heavy DOM contexts.

---

## 5. Recommendations for Refactoring (ES5 Compatible)

The current implementation is logically sound, but here are a few areas for improvement while staying within ES5 constraints:

1. **Modularise the Helper Functions**  
   - Consider moving the element-creation helper (`el`) into a standalone file or grouping related methods in a sub-object. This makes them reusable and more maintainable.

2. **Break Up Long Functions**  
   - The `init()` function orchestrates many tasks (DOM creation, styling, event binding). Splitting these responsibilities into smaller ES5 functions (e.g., createContainer, configureStyles, bindEvents) can improve readability.

3. **Centralised Error-Handling**  
   - Many commands catch errors individually. A centralised try/catch block or a small logging utility would help gather information for debugging any command that might fail.

4. **Reduce Global Scope Reliance**  
   - Where possible, reference global objects in a defensive manner or define placeholders. Although you need not check for `eventPayload` or `eventType`, you might still encapsulate references to `window.LBGAnalytics` to ensure the code doesn’t break if that object fails in unusual conditions.

5. **Name Spacing**  
   - If multiple custom Tealium extensions exist, ensure your IDs, class names, and function names are unique enough to avoid collisions (e.g., prefix them with `GodMode_` or similar).

6. **Performance Checks**  
   - For `getNextZIndex()`, consider caching the largest z-index if it won’t change frequently, or implement a more targeted search to avoid scanning every tag.

---

## 6. Maintenance & Further Notes

1. **Ongoing Maintenance**  
   - Monitor the global objects (`window.LBGAnalytics`, `adobe.target`, `utag`) for any changes in naming or usage. The extension heavily depends on them.  
   - Periodically check the code that injects additional scripts from `tiqcdn.com` to ensure they are still valid and up-to-date.

2. **Ownership & Testing**  
   - This extension is best owned by the analytics or front-end engineering team.  
   - When new debugging or analytics tools are introduced, add them as new commands in the `funcs` array.  
   - Perform regression tests after any major changes to LBGAnalytics libraries, ensuring all commands (especially those with `info` or `action` callbacks) still behave as intended.

3. **Compatibility**  
   - The code is maintained in ES5 syntax. Avoid introducing any ES2015+ features like arrow functions, const/let, or template literals, to keep compatibility with older browsers or page contexts.

4. **Version Control & Collaboration**  
   - Keep the code in a version-controlled environment (e.g., GitHub) for tracking changes over time and facilitating collaborative work.  
   - Write descriptive commit messages about changes to commands or dependencies.

---

**Last Updated:** This document reflects the code state aligned with Extension ID 1723 in the Tealium iQ environment. For any queries, please contact the appropriate tag management or analytics engineering team. 

*End of Document*