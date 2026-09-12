// import { test, expect } from '@playwright/test';
import { test, expect } from '../fixtures/pages.fixture.js'

const userIds = [1, 5, 10];

for (const userId of userIds) {
  test(`GET posts returns only posts for userId=${userId}`, async ({ request }) => {
    const response = await request.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    expect(response.ok()).toBeTruthy();

    const posts = await response.json();

    for (const post of posts) {
      expect(post.userId).toBe(userId);
    }
  });
}


// debugging challenge:

// const users = ['standard_user', 'problem_user'];

// for (const user of users) {
//   test(`${user} can log in`, async ({ loginPage, page}) => {
//     await loginPage.login(user, 'secret_sauce');
//     await expect(page).toHaveURL(/inventory\.html/);
//   });
// }

// The problem is test name collision. Both iterations create a test with the identical name 'user can log in',
//  so when one fails, you can't tell which user caused the failure. The test runner will report just one failing test, not two.