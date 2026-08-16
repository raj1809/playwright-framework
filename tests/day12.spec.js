import { test, expect } from "@playwright/test";

test("Exercise 1 and 2", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveTitle("Swag Labs");
  await expect(page).toHaveURL(/inventory\.html/);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  const cartBadge = page.locator(".shopping_cart_badge");
  await expect(cartBadge).toHaveText("1");
});

test("Exercise 3", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await expect(page.getByRole("button", { name: "Login" })).toBeEnabled();
});

test("Exercise 4", async ({ page }) => {
  await page.goto("https://www.saucedemo.com")
  await page.getByPlaceholder("Username").fill("standard_user")
  await page.getByPlaceholder("Password").fill("secret_sauce")
  await page.getByRole("button", { name: "Login" }).click()

  const productNames = await page.locator('.inventory_item_name').allTextContents()
        console.log(productNames)
         expect(productNames).toContain('Sauce Labs Backpack')
})

test('Exercise 5', async({page}) => {

  await page.goto("https://www.saucedemo.com")
 await page.getByPlaceholder("Username").fill("locked_out_user")
  await page.getByPlaceholder("Password").fill("secret_sauce")
  await page.getByRole("button", { name: "Login" }).click()

    const errorMsg = page.locator('[data-test="error"]')
    await expect(errorMsg).toContainText('locked out')
})


test('Automation Exrecise 1', async({page}) => {
    await page.goto("https://www.saucedemo.com")
     await page.getByPlaceholder("Username").fill("standard_user")
     await page.getByPlaceholder("Password").fill("secret_sauce")
     await page.getByRole("button", { name: "Login" }).click()

    const addProductOne =   page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    await addProductOne.click()
    //await expect.soft(addProductOne).toHaveText('Remove');

    const cartBadge = page.locator(".shopping_cart_badge");
     await expect.soft(cartBadge).toHaveText("1")
     // failure check
    // await expect.soft(cartBadge).toHaveText("3")
   
    await expect.soft(page).toHaveTitle('Swag Labs')
})

test('Automation Exercise 2', async({ page }) => {
  await page.goto("https://www.saucedemo.com")
     await page.getByPlaceholder("Username").fill("standard_user")
     await page.getByPlaceholder("Password").fill("secret_sauce")
     await page.getByRole("button", { name: "Login" }).click()

      const dropdown = page.getByRole("combobox");
        await dropdown.selectOption("lohi");

        const rawPrices = await page.locator('.inventory_item_price').allTextContents()
        
        console.log(rawPrices)

        const prices = rawPrices.map(price => parseFloat(price.replace(/[^0-9.-]+/g, "")))
        console.log(prices)
        
        const sortedPrices = [...prices].sort((a, b) => a - b)
        expect(prices).toEqual(sortedPrices)
        
}) 

test('Custom failure message', async ({ page }) => {
  await page.goto("https://www.saucedemo.com");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  const cartBadge = page.locator(".shopping_cart_badge");

  await expect(
    cartBadge,
    "Cart badge should show exactly 2 after adding one product"
  ).toHaveText("2");
})

// Debugging challenge
// const cartCount = await page.locator('.shopping_cart_badge').count();
// await expect(cartCount).toHaveCount(1);

//  fix:
// const cartCount = await page.locator('.shopping_cart_badge').count();
// expect(cartCount).toBe(1);
// toHaveCount(1) expects a Locator object, not a number.