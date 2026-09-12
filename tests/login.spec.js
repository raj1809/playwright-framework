import {test, expect} from '../fixtures/pages.fixture.js'
import {users} from '../data/users.js'
import loginCases from '../data/loginCases.json' assert { type: 'json' };


test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  for (const data of loginCases){
    test(`login failed when: ${data.username || '(empty)'} / ${data.password || '(empty)'}`, async({ loginPage}) => {
      await loginPage.login(data.username, data.password);
    await expect(loginPage.getErrorMessage()).toHaveText(data.expectedError);

    })

  }

  const userTypes = ['standard_user', 'problem_user', 'performance_glitch_user']

      for (const userType of userTypes) {
         test(`${userType} can log in and reach inventory`, async ({ loginPage, page }) => {
         await loginPage.login(userType, 'secret_sauce');
        await expect(page).toHaveURL(/inventory\.html/);
  })
}

  test("Logged in page fixture @smoke", async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL(/inventory\.html/);
});

  test("Valid Login @smoke ", async ({ page }) => {
    await page.goto('/inventory.html')
    await expect(page).toHaveTitle("Swag Labs");
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
test.describe('Cart Test', () => {
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