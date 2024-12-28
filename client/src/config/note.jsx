//query
// Exactly! You’ve got it right. Let me break it down further:

// 1. **`useEffect` Hook**: This hook triggers a function every time the `filters` state changes. So, whenever the user selects or deselects a filter option, the `useEffect` will re-run to update the URL with the new filter criteria.

// 2. **`createSearchParamsHelper` Function**: 
//    - This function receives the current `filters` state as `filterParams`.
//    - It loops through each key-value pair in the `filters` object.
//      - The key represents the filter category (like "brand", "color", etc.).
//      - The value is typically an array of selected options for that filter (e.g., `["Nike", "Adidas"]` for "brand").
//    - For each key:
//      - It joins the array of selected options into a single string using commas (`,`), which is common in query strings.
//      - Then, it encodes this value using `encodeURIComponent` to ensure the data is safe for use in URLs.
//    - The key-value pairs are combined into a query string where:
//      - Keys and values are separated by `=` (e.g., `brand=Nike,Adidas`).
//      - Each key-value pair is separated by an `&` (e.g., `brand=Nike,Adidas&color=Red,Blue`).
   
//    Example: If the filters object is:
//    ```js
//    {
//      brand: ["Nike", "Adidas"],
//      color: ["Red", "Blue"]
//    }
//    ```
//    The function will create a query string:
//    ```
//    brand=Nike,Adidas&color=Red,Blue
//    ```

// 3. **`setSearchParams(new URLSearchParams(createQueryString))`**: 
//    - This part updates the URL by appending the newly created query string. It uses `setSearchParams` from `react-router-dom` to modify the URL query parameters without reloading the page.
//    - The result is a URL like:
//      ```
//      www.yourwebsite.com/shop?brand=Nike,Adidas&color=Red,Blue
//      ```

// ### Flow Recap:
// - **User selects filters** → `filters` state updates → `useEffect` runs → `createSearchParamsHelper` generates a query string → `setSearchParams` updates the URL.
  
// This ensures that the selected filters are always reflected in the URL. Even if the user refreshes the page, the filters will persist because they are now stored in the URL!