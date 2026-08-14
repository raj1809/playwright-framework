import { test, expect } from "@playwright/test";

test("Locators testing", async ({ page }) => {
  // Go to saucedemo.com. Use getByPlaceholder to fill in the username field with standard_user and the password field with secret_sauce.
  //  Use getByRole('button', ...) to click login.

  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  // After logging in, use getByText to assert that the text 'Products' is visible on the page.
  await expect(page.getByText("Products")).toBeVisible();

  // Use page.locator('.inventory_item') to locate all product cards. Use .count() and log how many there are (should be 6 on this site).
  const productCount = await page.locator(".inventory_item").count();
  console.log(productCount);

  // Use filter({ hasText: ... }) to locate the specific product card containing 'Sauce Labs Backpack', then click the 'Add to cart' button inside that specific card
  //  (chain a getByRole off the filtered locator)
  const addToCart = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" });
  await addToCart.getByRole("button", { name: "Add to cart" }).click();

  // Use .first() and .last() on page.locator('.inventory_item_name') to log the first and last product names shown on the page.
  const firstProductName = await page
    .locator(".inventory_item_name")
    .first()
    .textContent();
  console.log(firstProductName);

  const lastProductName = await page
    .locator(".inventory_item_name")
    .last()
    .textContent();
  console.log(lastProductName);
});

test("Automation tasks", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  // On the products page, deliberately write a locator matching multiple buttons at once
  // (e.g. all "Add to cart" buttons via getByRole('button', { name: /Add to cart/ }) without narrowing it) and try to .click() it directly.
  // Confirm you get a strict mode violation. Then fix it properly by narrowing to one specific product using filter.

  // await page.getByRole('button', { name : /Add to cart/ }).click()  // got srict mod eviolation here

  const addProd1 = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" });
  await addProd1.getByRole("button", { name: "Add to cart" }).click();

  // Add the backpack and the bike light to your cart (two separate filter + click sequences).
  //  Then click the cart icon (getByRole('link', ...) or similar — inspect the page if needed) and assert the cart page URL contains cart.html.

  const addProd2 = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Bike Light" });
  await addProd2.getByRole("button", { name: "Add to cart" }).click();

  await page.locator(".shopping_cart_link").click();

  await expect(page).toHaveURL(/cart\.html/);

  const cartCount = await page.locator(".cart_item").count();
  expect(cartCount).toBe(2);
});

test("Debugging challenge", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  // await page.locator('input[type="text"], input[type="password"]').fill('test')
  // throwing strict mode violation because the locator resolved to 2 elements:

  // await page.locator('input[type="text"], input[type="password"]').fill('test')
  // fix
  await page.locator('input[type="text"]').fill("test");
  await page.locator('input[type="password"]').fill("test");
});
