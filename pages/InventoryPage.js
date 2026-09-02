import { HeaderComponent } from "../components/HeaderComponent.js";
import { CartComponent } from "../components/CartComponent.js";

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.cart = new CartComponent(page);
    this.title = page.locator('[data-test="title"]');
    this.sortButton = page.getByRole("combobox");
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButtons = page.getByRole("button", { name: "Add to cart" });
  }

  async isLoggedIn() {
    return await this.title.isVisible();
  }

  async sortProducts(option) {
    await this.sortButton.selectOption(option);
  }

  async openProduct(productName) {
    await this.page.getByText(productName, { exact: true }).click();
  }

 async addProductToCart(productName) {
    const product = this.page
        .locator('[data-test="inventory-item"]')
        .filter({ hasText: productName });

    await product.getByRole('button', { name: 'Add to cart' }).click();
}


}
