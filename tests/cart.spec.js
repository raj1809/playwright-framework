import { test, expect } from '../fixtures/pages.fixture.js'

test.describe("Cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('can add item to cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});