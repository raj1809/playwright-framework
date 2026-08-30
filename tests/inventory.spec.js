import { test, expect } from '../fixtures/pages.fixture.js'

test.describe("Cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

    test('can add item to cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test("Verify product name", async ({ page }) => {
    
    const productNames = await page.locator('.inventory_item_name').allTextContents()
           expect(productNames).toContain('Sauce Labs Backpack')
  })   

  test('Assert title', async({ page }) => {
        const title = page.getByText('Products', { exact: true })
       await  expect(title).toHaveText('Products')
})


})

