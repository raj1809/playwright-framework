import {test, expect} from '../fixtures/pages.fixture.js'
import {users} from '../data/users.js'

test.use({ ignoreHTTPSErrors: true }); // to  ignore the ssl issue

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  
  test("Logged in page fixture @smoke", async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL(/inventory\.html/);
});

  test("Valid Login @smoke ", async ({ page }) => {
    await page.goto('/inventory.html')
    await expect(page).toHaveTitle("Swag Labs");
  });

  test("Invalid Username @regression", async ({ loginPage }) => {
      await loginPage.login('stan_user', users.standard.password)
     await expect(loginPage.getErrorMessage()).toHaveText("Epic sadface: Username and password do not match any user in this service");
  });

  test("Invalid password @regression", async ({ loginPage }) => {
      await loginPage.login(users.standard.username, 'secret_sau')
    await expect(loginPage.getErrorMessage()).toHaveText("Epic sadface: Username and password do not match any user in this service");
  });

  test("Empty username field submitted @regression", async ({ loginPage }) => {
      await loginPage.login('', users.standard.password);
    await expect(loginPage.getErrorMessage()).toHaveText("Epic sadface: Username is required");
  });

  test("Empty password field submitted @regression", async ({ loginPage }) => {
      await loginPage.login(users.standard.username, '')
    await expect(loginPage.getErrorMessage()).toHaveText("Epic sadface: Password is required");
  });

  test("Both fields empty submitted @regression", async ({ loginPage }) => {
      await loginPage.login('', '')
    await expect(loginPage.getErrorMessage()).toHaveText("Epic sadface: Username is required");
  });

  test("Locked out user @smoke", async ({ loginPage }) => {
      await loginPage.login(users.lockedOut.username, users.lockedOut.password)
    await loginPage.assertLoginError("Epic sadface: Sorry, this user has been locked out.")
  });

  test("Logout flow @regression", async ({ loginPage, inventoryPage,page }) => {
    await test.step("Login", async () => {
      await loginPage.login(users.standard.username, users.standard.password)
      await expect(page).toHaveURL(/inventory\.html/);
      expect(await inventoryPage.isLoggedIn()).toBe(true)
    });

    await test.step("Logout", async () => {
      await inventoryPage.header.logout()
      await expect(page).toHaveURL("https://www.saucedemo.com/");
    });
  });

  test("Session persist test @regression", async ({ loginPage, page }) => {
      await loginPage.login(users.standard.username, users.standard.password)
    await expect(page).toHaveURL(/inventory\.html/);
    await page.reload();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("Login page displays required fields @regression", async ({ page }) => {
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("Problem user can login @regression", async ({ loginPage, page }) => {   
      await loginPage.login(users.problem.username, users.problem.password)
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