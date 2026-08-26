import { test as base} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import { InventoryPage } from '../pages/InventoryPage.js'
import { users } from '../data/users.js';

export const test = base.extend({
     loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage)
    },

    loggedInPage: async ({ loginPage, page }, use) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await use(page);
    }, 

    inventoryPage: async({page}, use) => {
        const inventoryPage = new InventoryPage(page)
        await use(inventoryPage)
    },
})

export {expect} from '@playwright/test'

