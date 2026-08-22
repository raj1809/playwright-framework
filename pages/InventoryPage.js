
        export class InventoryPage  {

                constructor(page){
                    this.page = page
                    this.title = page.locator('[data-test="title"]')
                    this.hamburgerMenu =  page.getByRole('button', { name: 'Open Menu' })
                    this.logoutLink = page.getByRole('link', { name : 'Logout'})
                }


        async logout(){
            await this.hamburgerMenu.click()
            await this.logoutLink.click()
        
    }   
        async isLoggedIn(){
             return await this.title.isVisible()
        }

    }