
    export class ProductDetailsPage{
        constructor(page){
                    this.page = page
                    this.itemName =  page.locator('[data-test="inventory-item-name"]')
                    this.itemPrice = page.locator('[data-test="inventory-item-price"]')
                    this.itemDescription = page.locator('[data-test="inventory-item-desc"]')
                    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' })
    }

                async addToCart(){
                    await this.addToCartButton.click()
                }

}