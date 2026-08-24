export class HeaderComponent {
        constructor(page){
            this.page = page
            this.cartIcon = page.locator('.shopping_cart_link')
            this.cartBadge = page.locator('.shopping_cart_badge')
            this.menuButton = page.getByRole('button', { name : 'Open Menu'})
            this.logoutLink = page.getByRole('link', { name : 'Logout'})    
        }


            async logout(){
                await this.menuButton.click()
                await this.logoutLink.click()
                
            }


}
