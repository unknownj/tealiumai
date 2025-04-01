# Elementool – Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: Elementool  
- **Extension ID**: 100036  
- **Internal ID**: 1885  
- **Extension Type**: Javascript Code  
- **Scope**: Pre Loader  
- **Execution Frequency**: Run Once  
- **Status**: Active  

### Summary

The Elementool extension is a self-contained toolkit for creating, manipulating, and dynamically rendering HTML, SVG, and MathML elements. It provides utility methods to apply styles, attributes, and event listeners; to insert elements into the DOM; and to handle rudimentary dynamic behaviour through a render loop. Its purpose is to offer a consolidated approach to DOM creation within Tealium iQ, reusing the same methods to reduce boilerplate and encourage consistent element handling.

---

## 2. Code Explanation

The extension defines a constructor function, `Elementool()`, which houses multiple sub-features and helpers:

1. **DOM Creation Methods**  
   - **`make(selector, optionalDescendants, optionalStyleObject, optionalEventListeners)`**  
     Creates standard HTML elements.  
   - **`draw(selector, optionalDescendants, optionalStyleObject, optionalEventListeners)`**  
     Creates SVG elements (e.g., `<circle>` or `<svg>`).  
   - **`math(selector, optionalDescendants, optionalStyleObject, optionalEventListeners)`**  
     Creates MathML elements (e.g., `<math>` or `<mrow>`).  
   - **`objectToElement(obj)`**  
     Converts a JavaScript object definition into a corresponding DOM or SVG element (supports `make`, `draw`, or `math` properties).

2. **Utility Functions** (`this.util` property)  
   - **`polarToCartesian`**: Converts polar coordinates to Cartesian coordinates.  
   - **`selectorToComponents`**: Interprets a CSS selector for tag name, ID, classes, and attributes.  
   - **`resolveRelativeElement`**: Identifies if a selector includes a parent (`>`) or sibling (`+`) combinator.  
   - **`applyStylesToElement`**: Applies inline styles to an element, also supports dynamic style functions.  
   - **`setAttributesOnElement`**: Applies attributes to an element, also supports dynamic attribute functions.  
   - **`make`**: Core routine that merges selector parsing, element creation, content insertion, style application, and event binding.  

3. **SVG Helpers** (`this.svgHelpers`)  
   A robust collection of methods specifically tailored for creating and manipulating SVG shapes and applying animations. This includes:  
   - Basic shapes (e.g., `circle`, `ellipse`, `line`, etc.).  
   - Compound graphics (e.g., `regularNGon`, `star`).  
   - Path creation and manipulation (`pathInstructions`).  
   - Basic animation support (`animate`, `animateTransform`, `animateMotion`).  

4. **Accessibility Helpers** (`this.accessibilityHelpers`)  
   Simplified functions to add accessibility attributes to elements (e.g., `role="button"` or `aria-label`).  

5. **Lifecycle**  
   - **`.render()`**: Manually triggers a re-computation of all dynamic styles, attributes, and content.  
   - **`elementsWithDynamicValues`**: Tracks which elements contain dynamic properties so they can be refreshed or “rendered” again.  

6. **Global Object Dependency**  
   - If `window.LBGAnalytics` exists, the code assigns the constructor to `window.LBGAnalytics.Elementool` and also creates an instance `window.LBGAnalytics.el4`. If `window.LBGAnalytics` is missing, these assignments are simply not made, but the constructor itself still functions when included in the page.

No external libraries beyond the standard DOM and browser APIs are assumed. The extension references `document`, `window`, and `Element` features, which must be available in the Tealium environment where this code loads.

---

## 3. Usage Examples

Below are sample usage patterns showing the typical flow of how this extension creates and manipulates elements.

### 3.1 Basic HTML Creation

```js
// Creates a DIV, sets "Hello, world!" as text content, and appends to the <body>:
window.LBGAnalytics.el4.make('div', 'Hello, world!').appendTo(document.body);
```

### 3.2 Adding Styles and Event Listeners

```js
var clickableDiv = window.LBGAnalytics.el4.make(
  'div',
  'Click me',
  { backgroundColor: 'yellow', cursor: 'pointer' },
  { click: function() { alert('Clicked!'); } }
);
document.body.appendChild(clickableDiv);
```

### 3.3 Creating an SVG Circle

```js
// Draws a circle with a red fill and black stroke, then appends to the body:
window.LBGAnalytics.el4.draw('circle', undefined, { fill: 'red', stroke: 'black' })
  .appendTo(document.body);
```

### 3.4 Dynamic Rendering

Elements with dynamic style or content functions can be updated with `.render()`:

```js
var dynamicElem = window.LBGAnalytics.el4.make(
  'div',
  function() { return 'Current time: ' + new Date().toLocaleTimeString(); },
  { color: function() {
      return (new Date().getSeconds() % 2) ? 'green' : 'blue';
    }
  }
);

// Add to the DOM:
dynamicElem.appendTo(document.body);

// Manually re-render every 1 second:
setInterval(function() {
  window.LBGAnalytics.el4.render();
}, 1000);
```

### 3.5 Object-Based Element Definition

```js
// A single object describing how to create an SVG rectangle:
var rectDef = {
  draw: 'rect[x=10][y=10][width=80][height=80]',
  styles: { fill: 'blue', stroke: 'black' },
  attributes: { 'stroke-width': '2' }
};

var svgRect = window.LBGAnalytics.el4.objectToElement(rectDef);
document.body.appendChild(svgRect);
```

---

## 4. Known Limitations & Gotchas

1. **DOM Queries**  
   The `document.querySelector` calls for parent or sibling elements expect a valid selector. If it fails or returns `null`, no error is surfaced and the new element is simply not inserted. This silent failing might obscure potential configuration issues.

2. **Silent Failures**  
   In `objectToElement`, errors inside the try/catch are swallowed (“fail silently”). This approach ensures no runtime error is thrown but can mask underlying logic or data errors.

3. **Behaviour When `window.LBGAnalytics` Is Absent**  
   Certain references are only assigned if `window.LBGAnalytics` exists, so be aware that the global usage pattern might differ across environments.

4. **Older Browser Support**  
   Although the code attempts to handle older browsers, usage of `classList` and other modern properties might require careful polyfilling. This is somewhat mitigated with fallback to `element.className`, but thorough cross-browser testing is recommended.

5. **Event Listener String References**  
   If a string is passed (e.g., `{ click: "someGlobalFunctionName" }`), the code attempts to resolve a named function on the `window` object. Ensure that the function is truly defined in global scope to avoid unexpected undefined references.

6. **No Defensive Check for `document`**  
   This extension assumes a standard web environment. In contexts where `document` or DOM APIs are not available (e.g., server-side rendering), you will encounter errors.

---

## 5. Recommendations for Refactoring

1. **Modular Organisation**  
   Although it must remain ES5 compatible, it could be beneficial to split the code into logical segments (for instance, placing the SVG helpers in a separate utility). This helps reduce the overall length of the main file, making it more approachable.

2. **Enhanced Error Handling**  
   Instead of silently failing, consider logging or signalling issues where parent or sibling selectors do not match. This transparency often aids debugging.

3. **Improved Clarity of Large Methods**  
   Methods like `make` handle a variety of different input types (strings, arrays, objects, functions). Splitting some of this logic into smaller private helper functions could improve readability.

4. **Centralised Dynamic Logic**  
   The dynamic updates for styles, attributes, and content are spread across multiple points. Consolidating these calls under a single update routine might make maintenance more straightforward.

5. **Synchronous vs. Asynchronous Renders**  
   If dynamic rendering is heavily used, consider an approach to throttle or debounce updates, rather than calling `.render()` in short intervals. This is more of a design consideration to avoid rapid DOM thrashing.

(Per your requirements, no modern ES2015+ features such as arrow functions, template literals, or `let/const` are recommended.)

---

## 6. Maintenance & Further Notes

1. **Ongoing Maintenance**  
   - Review any external scripts or Tealium extensions that might interfere with the DOM environment or override properties on the `window` object.  
   - Keep a consistent naming convention in new helper methods and maintain the existing structure for clarity.

2. **Ownership & Change Process**  
   - Ideally, assign a dedicated owner for changes to the `Elementool` extension.  
   - Follow a standard code review process to maintain quality and limit regressions.

3. **Testing Guidelines**  
   - Ensure thorough browser testing given the broad array of DOM manipulation features and possible edge cases such as attribute rendering, event binding, and fallback for older browsers.  
   - Test dynamic behaviour (`render()`) by validating that all references to dynamic style or content update as expected.

4. **Compatibility**  
   - The extension is designed to work in standard browsers that support `window`, `document`, and basic DOM APIs. If your environment runs in partial DOM contexts (for instance in certain app shells), additional checks or polyfills may be required.

Overall, Elementool is a flexible extension that can dramatically simplify DOM, SVG, and MathML element creation within Tealium iQ. By following best practices and performing regular checks, you will find it a useful building block for any interface or dynamic element requirements.