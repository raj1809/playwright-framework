// import { test as setup } from '@playwright/test'
// import { LoginPage } from '../pages/LoginPage.js'

// const authFile = '../playwright/.auth/user.json'

// setup('authenticate', async ({ page }) => {
//      const loginPage = new LoginPage(page);
//  //    await loginPage.goto()
//    await page.goto('/')
//      await loginPage.login('standard_user', 'secret_sauce');
//      await page.waitForURL(/inventory\.html/);

//     await page.context().storageState({ path: authFile });

// })

import { test as setup } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import path from 'path'

const authFile = path.resolve('playwright/.auth/user.json')

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');  // ← uses baseURL from config
  await loginPage.login(process.env.STANDARD_USER, process.env.STANDARD_PASSWORD); // ← uses .env
  await page.waitForURL(/inventory\.html/);
  await page.context().storageState({ path: authFile });
})