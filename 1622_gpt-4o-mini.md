# Tealium iQ Extension Documentation

## 1. Extension Overview
- **Name**: Temporary Cookie Stitch Rollout
- **ID**: 1622
- **Type**: JavaScript Code
- **Scope**: Pre Loader
- **Execution Frequency**: Run Once

### Summary
The **Temporary Cookie Stitch Rollout** extension enhances cookie management within the context of LBG Analytics. It focuses on stitching together and preserving user cookie data across sessions to improve tracking and analytics accuracy. The extension captures cookies from outgoing links, prepares a hashed format for transmission, and re-establishes cookies upon user return, thereby streamlining user profile consistency.

---

## 2. Code Explanation

### Key Variables and Functions
- **enhanceCookieLogic(target)**: Main function that augments the `LBGAnalytics.cookies` object to add custom cookie handling methods.
- **target.stitchCookies(a)**: Determines if a given cookie should be preserved. It checks if the cookie name falls under specific categories, including optional out-multis, specific tracking IDs, or a designated short code.
- **target.getCookieHash(seconds)**: Generates a hashed string of relevant cookies, along with a timestamp encoded in Base64, valid for a specified number of seconds.
- **target.decodeCookieHash(hash)**: Parses and decodes the hashed cookie string to return an object representing the cookie values and their validity.

### Logic Flow
1. **Cookie Hashing**: Upon execution, the extension attempts to extract a cookie hash from the URL or the window name.
2. **Cookie Decoding**: The hash is then decoded to build a JavaScript object representing the cookie values.
3. **Cookie Restoration**: If valid cookies are found, they are set with a retention period of 90 days.
4. **Link Decoration**: Outgoing links are dynamically modified to append the cookie hash to maintain continuity between pages.
5. **Event Handling**: Attach event listeners to specified links to manage cookie states during user navigation.

### Dependencies
- **LBGAnalytics Library**: The extension relies on the global `LBGAnalytics` object to handle cookie manipulations and DOM interactions. It assumes certain methods (like `cookies.getItem` and `cookies.setItem`) are available and functions as intended.

---

## 3. Usage Examples

### Normal Scenario
1. A user clicks a link leading to `https://www.halifaxsharedealing-online.co.uk/?wt.ac=HalifaxInvestinghomepage/SignIn`.
2. The extension captures the relevant cookie data and encodes it into a hash.
3. The user navigates to another page while the hash is still valid, allowing the system to reconstruct cookies seamlessly.

### Edge Conditions
- **Invalid Hash Handling**: If the provided hash is malformed or does not contain valid cookies, the extension safely returns `undefined` without breaking execution.
- **Cross-domain Navigation**: If the user clicks a link from a different domain, the cookies are not transferred, preserving cookie integrity.

---

## 4. Known Limitations & Gotchas
- **Cookie Expiry Conflicts**: If cookies expire before the user interacts with links that rely on this extension, user state may be lost.
- **Performance Implications**: Extensive usage of the `listCookies()` and `filter()` methods may lead to performance issues in pages with many cookies.
- **Potential Conflicts**: If other extensions manipulate the `window.name` or shared cookie data, unexpected behaviour may arise.

---

## 5. Recommendations for Refactoring
- **Modularization**: Consider breaking down the logic into smaller, well-named functions for clarity.
- **Defensive Checks**: Add checks for the existence of required methods on the `LBGAnalytics` object to gracefully handle undefined values.
- **Avoid Global Pollution**: Localise variables to prevent conflicts and improve encapsulation by wrapping functions within IIFEs or similar patterns.
- **Clear Documentation**: Inline comments within the code can aid in future maintenance, making the logic easier to follow.

---

## 6. Maintenance & Further Notes
- **Ownership**: Assign a primary developer or team to oversee updates and modifications to the extension.
- **Testing Guidelines**: Regularly test across multiple scenarios, especially during changes to the core tracking systems or cookie policies.
- **Documentation Updates**: Encourage updates to this documentation with each change in logic or functionalities to ensure developer awareness.

--- 

This documentation serves as a comprehensive resource for understanding and maintaining the Temporary Cookie Stitch Rollout extension within Tealium iQ. Ensure to refer back to it for best practices and troubleshooting guidelines.