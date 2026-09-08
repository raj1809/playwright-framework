1. Write a one-paragraph comment explaining, in your own words: if SauceDemo did have a real backend cart API, what would the ideal hybrid test for "verify cart shows 3 items" look like, step by step? Be specific about what happens via API vs UI.

 An ideal hybrid test would: 
(1) use the API to login to the  app with valid credentials, 
(2) use the API to add 3 specific products to that user's cart (POST /cart/items three times with different product IDs), 
(3) navigate the UI to the cart page, and 
(4) assert via UI that the badge and item list display exactly 3 items with the correct product details. 

 This approach tests the full integration—the API ensures the backend correctly stored the cart data, while the UI assertions verify the frontend properly fetches and renders it. Skipping the API setup means you're testing fragile UI-only workflows (like relying on localStorage); using only API assertions means you miss UI rendering bugs (wrong count displayed, items cut off, badge not updating). The hybrid approach catches both layers.

 