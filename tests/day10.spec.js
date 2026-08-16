import { test, expect } from "@playwright/test";



test("Locators testing", async ({ page }) => {   // async keyword makes the function return the pomise and await keyword makes the function wait for the promise

 
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Products")).toBeVisible();

  const productCount = await page.locator(".inventory_item").count();
  console.log(productCount);

 
  const addToCart = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" });
  await addToCart.getByRole("button", { name: "Add to cart" }).click();

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



  const addProd1 = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" });
  await addProd1.getByRole("button", { name: "Add to cart" }).click();


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

  await page.locator('input[type="text"]').fill("test");
  await page.locator('input[type="password"]').fill("test");
});


//note:

// When to use role locators : prioritize role locators to locate elements, as it is the closest way to how users and assistive technology perceive the page.
// When to use label locators : Use this locator when locating form fields.
// When to use placeholder locators : Use this locator when locating form elements that do not have labels but do have placeholder texts.
// When to use text locators :recommend using text locators to find non interactive elements like div, span, p, etc. For interactive elements like button, a, input, etc. use role locators.
// When to use alt locators : Use this locator when your element supports alt text such as img and area elements.
// When to use title locators : Use this locator when your element has the title attribute.
// When to use testid locators : You can also use test ids when you choose to use the test id methodology or when you can't locate by role or text.

// when to use css/xpath : CSS and XPath are not recommended as the DOM can often change leading to non resilient tests. 
// Instead, try to come up with a locator that is close to how the user perceives the page such as role locators or define an explicit testing contract using test ids.


