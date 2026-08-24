import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";


test.use({ ignoreHTTPSErrors: true }); // to  ignore the ssl issue

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test("Valid Login @smoke ", async ({ page }) => {
      const loginpage = new LoginPage(page)
      await loginpage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("Invalid Username @regression", async ({ page }) => {
  const loginpage = new LoginPage(page)
      await loginpage.login('stan_user', 'secret_sauce')
   await expect(loginpage.getErrorMessage()).toHaveText("Epic sadface: Username and password do not match any user in this service");
  });

  test("Invalid password @regression", async ({ page }) => {
      const loginpage = new LoginPage(page)
      await loginpage.login('standard_user', 'secret_sau')
    await expect(loginpage.getErrorMessage()).toHaveText("Epic sadface: Username and password do not match any user in this service");
  });

  test("Empty username field submitted @regression", async ({ page }) => {
    const loginpage = new LoginPage(page)
      await loginpage.login('', 'secret_sauce');
    await expect(loginpage.getErrorMessage()).toHaveText("Epic sadface: Username is required");
  });

  test("Empty password field submitted @regression", async ({ page }) => {
      const loginpage = new LoginPage(page)
      await loginpage.login('standard_user', '')
    await expect(loginpage.getErrorMessage()).toHaveText("Epic sadface: Password is required");
  });

  test("Both fields empty submitted @regression", async ({ page }) => {
    const loginpage = new LoginPage(page)
      await loginpage.login('', '')
    await expect(loginpage.getErrorMessage()).toHaveText("Epic sadface: Username is required");
  });

  test("Locked out user @smoke", async ({ page }) => {
    const loginpage = new LoginPage(page)
      await loginpage.login('locked_out_user', 'secret_sauce')
    await loginpage.assertLoginError("Epic sadface: Sorry, this user has been locked out.")
  });

  test("Logout flow @regression", async ({ page }) => {
    await test.step("Login", async () => {
      const loginpage = new LoginPage(page)
      const inventorypage = new InventoryPage(page)
      await loginpage.login('standard_user', 'secret_sauce')
      await expect(page).toHaveURL(/inventory\.html/);
      expect(await inventorypage.isLoggedIn()).toBe(true)
    });

    await test.step("Logout", async () => {
      const inventorypage = new InventoryPage(page)
      await inventorypage.header.logout()
      await expect(page).toHaveURL("https://www.saucedemo.com/");
    });
  });

  test("Session persist test @regression", async ({ page }) => {
     const loginpage = new LoginPage(page)
      await loginpage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/inventory\.html/);
    await page.reload();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("Login page displays required fields @regression", async ({ page }) => {
     
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("Problem user can login @regression", async ({ page }) => {
     const loginpage = new LoginPage(page)
   
      await loginpage.login('problem_user', 'secret_sauce')
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page).toHaveTitle("Swag Labs");
  });
});


// debugging challenge:
test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  });


   test('cart is empty initially', async ({page}) => {
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0)
  })

   test('add item shows badge count 1', async ({page}) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
  })
  
})
// reasoning: Changed beforeAll → beforeEach because: the original challenge's beforeAll is problematic because both tests share the same page. 
// The second test modifies the state by adding an item. With beforeEach, each test starts from a fresh logged-in session:
// Playwright's built-in { page } fixture already creates and manages the page for each test. So we get test isolation without manually managing the page lifecycle.