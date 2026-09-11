export class HeaderComponent {
        constructor(page){
            this.page = page
            this.menuButton = page.getByRole('button', { name : 'Open Menu'})
            this.logoutLink = page.getByRole('button', { name : 'Logout'})    
        }


            async logout(){
                await this.menuButton.click()
                  await this.logoutLink.click();  
            }
}
