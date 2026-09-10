import { test, expect } from '@playwright/test'

test('Task 1', async({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts/1', async(route) => {
            await route.fulfill({
                status: 200,
                 contentType: 'application/json',
                 body: JSON.stringify({  
                    "id": 1, 
                    "title": "Mocked Title" 
                })
            })   
 })
        await page.goto('https://jsonplaceholder.typicode.com/posts/1')
        await expect(page.locator('body')).toContainText('Mocked Title')
})


test('Task 2', async ({ page }) => {
        await page.route('**/*.css', (route) => route.abort())
        await page.goto('https://www.saucedemo.com/')

        await expect(page.locator('#user-name')).toBeVisible()
        await expect(page.locator('#password')).toBeVisible()
        await expect(page.locator('#login-button')).toBeVisible()
        await page.screenshot({ path: 'full-page.png', fullPage: true });
})

test('Test 3', async({ page }) => {

await page.route('**/api/nonexistent', (route) => route.abort())
 await page.goto('https://www.saucedemo.com/')
 await expect(page.locator('#user-name')).toBeVisible()
})

test('Test 4', async({ page }) => {

      let start = Date.now()
  await page.goto('https://www.saucedemo.com/')
  console.log('Normal load:', Date.now() - start, 'ms')

  await page.route('**/*.css', async (route) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    await route.continue()
  })

  start = Date.now()
  await page.reload()
  console.log('Slow load:', Date.now() - start, 'ms')

  await expect(page.locator('#login-button')).toBeVisible()

})

// route.abort() → Stops the request completely. Use when you want to block a request.
// route.fulfill() → Provides your own custom response. Use when you want to mock or replace a response.
// route.continue() → Lets the original request continue normally.  Use when you want to let the request proceed, optionally with changes.

test('Automation task 1', async({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts/1', (route) => {
     route.fulfill({ status: 500, body: JSON.stringify({ error: 'Internal Server Error' }) })
  })
await page.goto('https://jsonplaceholder.typicode.com/posts/1');
await expect(page.locator('body')).toContainText('Internal Server Error')
})

 test('Automation task 2', async ({ page }) => {
  await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([])
    })
  })

  await page.goto('https://jsonplaceholder.typicode.com/posts')

  await expect(page.locator('body')).toContainText('[]')
})

// Debugging challenge:

test('mock the products API', async ({ page }) => {
  await page.route('**/posts/1', (route) => {
    route.fulfill({ status: 200, body: JSON.stringify({ id: 1, title: 'Mocked' }) })
  })
    await page.goto('https://jsonplaceholder.typicode.com/posts/1');

})

//  The ordering problem is that page.route() must be registered before the request happens.
// page.goto() already sends the request, so the real response is received before the route handler exists.

