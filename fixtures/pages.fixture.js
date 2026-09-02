import { test as base} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import { InventoryPage } from '../pages/InventoryPage.js'
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { ProductDetailsPage } from  '../pages/ProductDetailsPage.js'


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

    cartPage: async({page}, use) => {
        const cartPage = new CartPage(page)
        await use(cartPage)
    },

    checkoutPage: async ({page}, use) => {
        const checkoutPage = new CheckoutPage(page)
        await use(checkoutPage)
    },

    productDetailsPage: async({page}, use) => {
        const productDetailsPage = new ProductDetailsPage(page)
        await use(productDetailsPage)
    }

})

export {expect} from '@playwright/test'

