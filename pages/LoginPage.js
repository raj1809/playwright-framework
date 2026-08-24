import { expect } from '@playwright/test'
import { BasePage } from './BasePage.js'

export class LoginPage extends BasePage {
    constructor(page) {
        super(page)
        this.usernameInput = page.getByPlaceholder("Username")
        this.passwordInput = page.getByPlaceholder("Password")
        this.loginButton =  page.getByRole('button')
        this.errorMessage = page.locator('[data-test="error"]');
    }


    
    async login(username, password){
         await this.usernameInput.fill(username);
         await this.passwordInput.fill(password);
         await this.loginButton.click();
        
    }
    
      getErrorMessage(){
        return this.errorMessage
     }

     async assertLoginError(expectedMessage){
        await expect(this.errorMessage).toHaveText(expectedMessage)
     }


}

