
    import { test, expect } from '@playwright/test'
    import { createTestUser } from '../data/userFactory.js'



     test('Homepage has correct title', async({ page }) => {
             await page.goto('https://www.saucedemo.com')
             await expect(page).toHaveTitle('Swag Labs')

    })

     test('homepage URL contains saucedemo.com', async({ page }) => {
         await page.goto('https://www.saucedemo.com')
         await expect(page).toHaveURL(/saucedemo\.com/)

     })

    test('print users', async ({ page}) => {
    const user1 = createTestUser();             
            const user2 = createTestUser()
    
             console.log(user1)
              console.log(user2);
    
    const saraUser = createTestUser({ firstName: 'Sara' });
    
    console.log(saraUser)
     })
