// * ASSERTION STRATEGY — checkout.spec.js
//  *
//  * All assertions use Playwright's built-in `expect` with auto-retry locators.
//  * This means every `expect(...).toHaveText(...)` / `toHaveURL(...)` will poll
//  * until the condition is true or the timeout expires (default 5 s), so there
//  * is no need for manual waits or retries.
//  *
//  * Error messages are asserted via `checkoutPage.errorMessage(errorKey)` where
//  * `errorKey` is the plain field name the page object wraps with
//  * "Error: … is required". The full expected string is stored separately in
//  * each field object so the two can be compared without relying on string
//  * construction inside the test.
//  *
//  * Negative checkout cases run as a deterministic `for...of` loop so that
//  * every field is validated on every run, giving consistent coverage rather
//  * than the random single-field approach.
//  *




import { test, expect } from "../fixtures/pages.fixture.js";
import { createTestUser } from "../data/userFactory.js";

test.describe("Cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
  });

  test("Add one product to cart @regression", async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await expect(inventoryPage.cart.cartBadge).toHaveText("1");
  });

  test("Add multiple products to cart, verify cart page shows the correct items and count @regression", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Bike Light");

    // for (const item of ['Sauce Labs Backpack', 'Sauce Labs Bike Light']) await inventoryPage.addProductToCart(item); // we can do this as well

    await expect(inventoryPage.cart.cartBadge).toHaveText("2");
    await inventoryPage.cart.goToCartPage();
    await expect(cartPage.cartItemName).toContainText([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
    ]);
  });

  test("Remove an item from the cart, verify count decreases @regression", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    await expect(inventoryPage.cart.cartBadge).toHaveText("2");
    await cartPage.removeItem("Sauce Labs Backpack");
    await expect(inventoryPage.cart.cartBadge).toHaveText("1");
  });

  test("Product Details Verification @regression", async ({
    inventoryPage,
    productDetailsPage,
  }) => {
    const name = await inventoryPage.productNames.nth(0).innerText();
    const price = await inventoryPage.productPrices.nth(0).innerText();

    await inventoryPage.openProduct("Sauce Labs Backpack");

    await expect(productDetailsPage.itemName).toHaveText(name);
    await expect(productDetailsPage.itemPrice).toHaveText(price);
  });

  test('full checkout flow test @smoke', async ({ inventoryPage, cartPage, checkoutPage }) => {

    const user = createTestUser()

    await test.step('Add product to cart', async () => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack')
    })

    await test.step('Open cart', async () => {
        await inventoryPage.cart.goToCartPage()
    })

    await test.step('Start checkout', async () => {
        await cartPage.checkout()
    })

    await test.step('Enter customer information', async () => {
        await checkoutPage.fillInfo(
            user.firstName,
            user.lastName,
            user.zipCode
        )
    })

    await test.step('Continue to order overview', async () => {
        await checkoutPage.continueToOverview()
    })

    await test.step('Finish order', async () => {
        await checkoutPage.finishOrder()
    })

    await test.step('Verify order confirmation', async () => {
        await expect(checkoutPage.confirmationMessage)
            .toHaveText('Thank you for your order!')
    })
})

const fields = [
  { name: "First Name", errorKey: "First Name", error: "Error: First Name is required" },
  { name: "Last Name", errorKey: "Last Name", error: "Error: Last Name is required" },
  { name: "Zip/Postal Code", errorKey: "Postal Code", error: "Error: Postal Code is required" },
];

for (const field of fields) {
  test(`Checkout fails with missing ${field.name} @regression`, async ({ inventoryPage, cartPage, checkoutPage }) => {
    const user = createTestUser();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.cart.goToCartPage();
    await cartPage.checkout();
    await checkoutPage.fillInfo(user.firstName, user.lastName, user.zipCode);

    if (field.name === 'First Name') await checkoutPage.firstName.fill('');
    if (field.name === 'Last Name') await checkoutPage.lastName.fill('');
    if (field.name === 'Zip/Postal Code') await checkoutPage.zipCode.fill('');

    await checkoutPage.continueToOverview();
    await expect(checkoutPage.errorMessage(field.errorKey)).toHaveText(field.error);
  });
}


test('Verify that clicking Cancel during checkout takes the user back to the cart @regression', async({inventoryPage, cartPage, checkoutPage, page}) => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack')
        await inventoryPage.cart.goToCartPage()
        await cartPage.checkout()
        await checkoutPage.cancel()
        await expect(page).toHaveURL(/cart\.html/)
})

test('Verify products are sorted by price from low to high @regression', async ({ inventoryPage }) => {

    await inventoryPage.sortProducts('lohi')
    const priceTexts = await inventoryPage.productPrices.allInnerTexts()
    const prices = priceTexts.map(price => parseFloat(price.replace('$', '')))

    for (let i = 0; i < prices.length - 1; i++) 
      {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1])
       }
  })

  test('Cart persists after navigating to product details and back @regression', async ({inventoryPage, page}) => {

    await inventoryPage.addProductToCart('Sauce Labs Backpack')
    await expect(inventoryPage.cart.cartBadge).toHaveText('1')
    await inventoryPage.openProduct('Sauce Labs Backpack')
    await page.goBack()
    await expect(inventoryPage.cart.cartBadge).toHaveText('1')
})

})
