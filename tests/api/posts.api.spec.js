import { test, expect } from '@playwright/test';

    test('API Exercise 1', async ({ request }) => {

        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1')
        expect(response.status()).toBe(200)
        
        const body = await response.json()
        
        expect(body.title.length).toBeGreaterThan(0);     // can run tests via npx playwright test --project=api or npx playwright test tests/api/day22.spec.js
        expect(typeof body.title).toBe('string');
        expect(body.id).toBe(1)
    }) 

    test('API Exercise 2', async({ request }) => {

        const response = await request.post('https://jsonplaceholder.typicode.com/posts', 
            {
            data: {
                title: 'Test', 
                body: 'Content', 
                userId: 1,
            },
        })

            expect(response.status()).toBe(201)

            const body = await response.json()
            expect(body.title).toBe('Test');

    })
    
    test('API Exercise 3', async ({ request }) => {
        const  response = await request.get('https://jsonplaceholder.typicode.com/posts', {
             params: { userId: 2 }
        })
        const body = await response.json();
        expect(body.every(post => post.userId === 2)).toBe(true)

    })

    test('API Exercise 4', async ({ request }) => {
        const  response = await request.delete('https://jsonplaceholder.typicode.com/posts/1')
        expect(response.status()).toBe(200)

    })

       test('API Exercise 5', async ({ playwright }) => {
         const apiContext = await playwright.request.newContext({
         baseURL: 'https://jsonplaceholder.typicode.com',
  })

                const response = await apiContext.get('/users/1')
                      expect(response.status()).toBe(200);
                    
                      const body = await response.json();
                      const city = body?.address?.city
                      expect(city).toBeTruthy();
                      await apiContext.dispose();

    })

test('API Automation task 1', async ({ request }) => {
 const response = await request.post('https://reqres.in/api/login', 
            {
            data: {
                    email: 'eve.holt@reqres.in',
                    password: 'cityslicka',
            },
        })

             expect(response.status()).toBe(200)

             const body = await response.json()
             const token = body?.token
             expect(token).toBeTruthy()
             console.log(token)
})

test('API Automation task 2', async({ request}) => {

    const response = await request.get('https://reqres.in/api/users/23')
        expect(response.status()).toBe(404)

        const body = await response.json()
       expect(body).toEqual({})
       // expect(Object.keys(body)).toHaveLength(0); // can do this
})

// debugging challenge:

test('API  - check post title', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  const body = await response.json();
  expect(body.title).toBeTruthy();
});

// await was missing as "response.json() parses the response body as JSON, and this is also async" hence, the solution