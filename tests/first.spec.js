
    import { test, expect } from '@playwright/test'

    test('Homepage has correct title', async({ page }) => {
            await page.goto('https://www.saucedemo.com')
            await expect(page).toHaveTitle('Swag Labs')

    })

    test('homepage URL contains saucedemo.com', async({ page }) => {
        await page.goto('https://www.saucedemo.com')
        await page.pause()
        await expect(page).toHaveURL(/saucedemo\.com/)

    })