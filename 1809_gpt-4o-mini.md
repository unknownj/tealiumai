# Tealium iQ Extension Documentation

## 1. Extension Overview

- **Name**: MAU: put values into arrays for the tag
- **ID**: 1809
- **Type**: Javascript Code
- **Scope**: 1550, 1611
- **Execution Frequency**: Active

### Summary
This extension is designed to process data from an event and populate several arrays within the `u.data` object that are required by a specific marketing tag. The extension ensures that the data is passed correctly, as the target tag is unable to accept string values directly, necessitating the use of arrays. The functionality includes setup for product attributes and order information based on the event's payload.

---

## 2. Code Explanation

### Key Variables
- `eventType`: Represents the type of event triggering the extension.
- `eventPayload` (b): An object containing data related to the event, including:
  - `JourneyProduct`: The product ID.
  - `JourneyName`: The name of the product.
  - `Brand`: The brand name of the product.
  - `ProductGroup`: The category of the product.
  - `JourneyAmount`: The total monetary value of the product.
- `tagObject` (u): An object used to store data for the tag that will be sent to the marketing platform.

### Logic Flow
1. The function begins by accepting three parameters (`eventType`, `eventPayload`, `tagObject`).
2. Values from the `eventPayload` are taken and pushed into the respective arrays in `u.data`:
   - `product_id`
   - `product_name`
   - `product_brand`
   - `product_category`
   - `product_quantity` is statically set to `1`.
3. The `order_subtotal` is conditionally set, where if `JourneyAmount` is less than or equal to zero, it assigns the `JourneyAmount`; otherwise, it sets the subtotal to `1`.
4. The `order_currency` is explicitly set to "GBP".

### Dependencies
- This extension relies on the `u.data` object structure provided by Tealium and may not function correctly if this structure is altered.
- Assumes the event triggering it is correctly formatted, particularly the `eventPayload`.

---

## 3. Usage Examples

### Normal Conditions
When an event is triggered with the following payload:
```json
{
  "JourneyProduct": "SKU123",
  "JourneyName": "Example Product",
  "Brand": "Example Brand",
  "ProductGroup": "Electronics",
  "JourneyAmount": 100
}
```
The `u.data` object will be populated as follows:
```javascript
u.data.product_id = ["SKU123"];
u.data.product_name = ["Example Product"];
u.data.product_brand = ["Example Brand"];
u.data.product_category = ["Electronics"];
u.data.product_quantity = [1];
u.data.order_subtotal = 1; // since JourneyAmount is > 0
u.data.order_currency = "GBP";
```

### Edge Conditions
If the event payload has:
```json
{
  "JourneyProduct": "SKU456",
  "JourneyName": "Another Product",
  "Brand": "Another Brand",
  "ProductGroup": "Home Goods",
  "JourneyAmount": -10
}
```
The `u.data` object will populate as follows:
```javascript
u.data.product_id = ["SKU456"];
u.data.product_name = ["Another Product"];
u.data.product_brand = ["Another Brand"];
u.data.product_category = ["Home Goods"];
u.data.product_quantity = [1];
u.data.order_subtotal = -10; // JourneyAmount is less than 0
u.data.order_currency = "GBP";
```

---

## 4. Known Limitations & Gotchas

- If the `JourneyAmount` is negative, `order_subtotal` will reflect this value, which may not be the intended functionality. Further validation may be required to avoid negative totals.
- If any of the array properties (`product_id`, `product_name`, etc.) does not exist on `u.data`, the code will throw an error since it tries to push into an undefined array. Ensure arrays are initialized before calling this extension.
- This extension may conflict with other extensions that modify the same arrays or manipulate the `u.data` object concurrently.

---

## 5. Recommendations for Refactoring

- **Defensive Checks**: Before pushing into the arrays, check if they are already initialised. If they are not, create them as empty arrays:
  ```javascript
  u.data.product_id = u.data.product_id || [];
  u.data.product_name = u.data.product_name || [];
  ```
- **Code Style**: Maintain consistent indentation and comments for clarity.
- **Modularisation**: Consider breaking the code into smaller functions to encapsulate logic for handling different aspects of `u.data` (e.g., one function for product data, another for order data).

---

## 6. Maintenance & Further Notes

- **Ongoing Maintenance**: Review and test the extension with each new product or brand integration to ensure compatibility and correct functionality.
- **Ownership**: Assign a developer as the primary contact for any questions or updates regarding this extension.
- **Testing Guidelines**: Execute thorough testing upon updates to the event structure and ensure all conditions are handled through unit tests or QA processes.

--- 

This documentation serves as a comprehensive guide to understanding this Tealium iQ extension, aiding developers and stakeholders in implementation and maintenance.