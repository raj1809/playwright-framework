import { test, expect } from "@playwright/test";

test("Exercise 1- part 1", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  const prodOne = page.getByText("Sauce Labs Backpack", { exact: true });
  await page.waitForTimeout(2000)
   const isVisible = await prodOne.isVisible();
  if (!isVisible) {
    throw new Error("Sauce Labs Backpack is not visible");
  }

});

test("Exercise 1- part 2", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
    const prodOne = page.getByText('Sauce Labs Backpack', { exact: true })
    await expect(prodOne).toBeVisible()

// Strictly better: toBeVisible() automatically retries until the
// assertion passes or Playwright's assertion timeout is reached,
  // so there is no arbitrary hard-coded wait.

})

test('Exercise 2', async({page}) => {
      await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await  page.waitForURL(/inventory\.html/)

  await expect(page).toHaveURL(/inventory\.html/)

// we can use waitForURL to wait for the actual condition when you specifically need to WAIT for navigation
//  Use toHaveURL() when you want to ASSERT that the page ended up at the expected URL.
})

test('Exercise 3', async({page}) => {
      await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await page.pause()
})


test.only('Exercise 4', async({ page }) => {
 await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()

})


test("Automation Task 1", async({page}) => {

    // already done

})

test('Automation task 2', async ({page}) => {
   
    const responsePromise = page.waitForResponse(
      response => response.url().includes('saucedemo.com')
    );

    await page.goto('https://www.saucedemo.com');

    const response = await responsePromise;

    console.log('Response found:', response.url());
    console.log('Status:', response.status());

})



test('checkout flow -- debugging challenge', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
//   await page.waitForTimeout(3000); -- will remmove this wait 
// and do the following:
    const addProduct = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    // click() automatically waits for the element to be ready for interaction, so a hard-coded waitForTimeout() is unnecessary.
    await addProduct.click()
})
