
    export class CartComponent{
            constructor(page){
            this.page = page
            this.cartIcon = page.locator('.shopping_cart_link')
            this.cartBadge = page.locator('.shopping_cart_badge')
              
        }

            async goToCartPage(){
                    await this.cartIcon.click()
            }

}
