export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.cartItemName = page.locator('[data-test="inventory-item-name"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async getItemCount() {
    return await this.cartItemName.count();
  }

  async removeItem(productName) {
    const item = this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName });
    await item.getByRole("button", { name: "Remove" }).click();
  }
}
