import { test, expect } from '../fixtures/pages.fixture.js'

test('Task 1', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.evaluate(() => {
    localStorage.setItem('cart-contents', JSON.stringify([{ id: 4, qty: 1 }]));
  });

  await page.reload();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test(' Task 2', async ({ page }) => {
 await page.goto('/inventory.html')
 await page.evaluate(() => {
   localStorage.setItem('cart-contents', JSON.stringify([{ id: 4, qty: 1}, {id: 3, qty: 1 }]));
 })

    await page.reload()
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2')

});

    test('Task 3', async({ request }) => {

        const create = await request.post('https://jsonplaceholder.typicode.com/posts', 
            {
            data: {
                title: 'Test', 
                body: 'Content', 
                userId: 1,
            },
        })

            expect(create.status()).toBe(201)
             const createBody = await create.json()
    
            const response = await request.get(`https://jsonplaceholder.typicode.com/posts/${createBody.id}`)
            const body = await response.json()
            expect(createBody.title).toBe('Test')
  

    })




    test('Task 4', async({ request }) => {


        const createResponse  = await request.post('https://jsonplaceholder.typicode.com/posts', 
            {
            data: {
                title: 'Test', 
                body: 'Content', 
                userId: 1,
            },
        })

            const created = await createResponse.json();
            expect(createResponse.status()).toBe(201)

          const deleteResponse =  await request.delete(`https://jsonplaceholder.typicode.com/posts/${created.id}`)
                    expect(deleteResponse.status()).toBe(200)
    })


    test('Task 5', async ({ request, page }) => {
  const loginResponse = await request.post('https://reqres.in/api/login', {
    data: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
  });
  const { token } = await loginResponse.json();

  await page.context().addCookies([
    { name: 'authToken', value: token, url: 'https://test.com' },
  ]);
});


// Automation task 2:
// If your test's goal is to verify the "Add to Cart" button works, 
// you must click it in the test—otherwise the test passes even if the button is broken.

test('Automation task 3', async({ request }) => {

  // JSONPlaceholder doesn't persist POSTs, so we test:
  // 1. POST returns correct data in response
  // 2. GET on pre-existing posts works

  const titles = ['Post 1', 'Post 2', 'Post 3']
  const createdPosts = []

  // Test POST: verify responses contain what we sent
  for (const title of titles) {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: title,
        body: 'Test content',
        userId: 1,
      },
    })
    expect(response.status()).toBe(201)
    
    const body = await response.json()
    createdPosts.push(body)
    
    // Verify POST response contains our data
    expect(body.title).toBe(title)
    expect(body.body).toBe('Test content')
    expect(body.userId).toBe(1)
  }

  // Test GET: verify pre-existing posts are fetched
  const allPostsResponse = await request.get('https://jsonplaceholder.typicode.com/posts');
  expect(allPostsResponse.status()).toBe(200)
  
  const allPosts = await allPostsResponse.json();
  expect(allPosts.length).toBeGreaterThan(0)
  
  // Verify we can get a specific pre-existing post
  const specificPostResponse = await request.get('https://jsonplaceholder.typicode.com/posts/1')
  expect(specificPostResponse.status()).toBe(200)
  
  const specificPost = await specificPostResponse.json()
  expect(specificPost.id).toBe(1)
  expect(specificPost.title).toBeDefined()
})

// Debugging challenge:
// This test is NOT hybrid because it only uses the UI layer—there's no API call at all.
// The one-sentence test for "hybrid": if your test doesn't make at least one API request 
// to set up or verify state (separate from UI actions), it's not hybrid; it's just UI testing.
// 
// To make it truly hybrid, you'd do something like:
// await request.post('https://jsonplaceholder.typicode.com/cart/add', { productId: 123 });
// await request.post('https://jsonplaceholder.typicode.com/cart/add', { productId: 456 });
// Then navigate UI and assert the badge shows '2'.
// This way: API seeds the cart data fast (no slow click-add interactions)