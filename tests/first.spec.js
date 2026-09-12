
    import { test, expect } from '@playwright/test'
    import { createTestUser } from '../data/userFactory.js'

    test('Homepage has correct title', async({ page }) => {
             await page.goto('https://www.saucedemo.com')
             await expect(page).toHaveTitle('Swag Labs')

    })

     test('homepage URL contains saucedemo.com', async({ page }, testInfo) => {
                 await page.goto('https://www.saucedemo.com')

        const screenshotBuffer = await page.screenshot()   
        await testInfo.attach('test-screenshot', { body: screenshotBuffer, contentType: 'image/png' });
         await expect(page).toHaveURL(/saucedemo\.com/)

     })

    test('print users', async ({ page }) => {
             const user1 = createTestUser();             
            const user2 = createTestUser()
    
             console.log(user1)
              console.log(user2);
    
    const saraUser = createTestUser({ firstName: 'Sara' });
    
    console.log(saraUser)
     })




// BAD: dynamic title done wrong — every test gets the same title.
// for (const data of invalidLogins) {
//   test('login fails', async ({ loginPage }) => { ... });
// }

// This is a real CI problem because identical titles make failures ambiguous,
// so you can't reliably tell which test data caused the failure.
