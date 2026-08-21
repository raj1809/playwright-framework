import { test, expect} from '@playwright/test'

// Exercise 1: done, all the test passed

// Exercise 2: Done

// Exercise 3: what would happen if you ran npx playwright test with a test.only left in a file, with and without CI set as an environment variable
// Without CI set: forbidOnly is false, so npx playwright test will run only the test marked with test.only.
// With CI set: forbidOnly is true, so Playwright will fail the test run if a test.only is present, preventing accidentally skipping other tests in CI.

// Exercise 4: 
// npx playwright test --project=chromium --> it ran the tests on chromium browser
// npx playwright test --project=firefox --> ran the test on firefox browser
// npx playwright test --> ran the test across all the browsers, i.e, chromium, firefox and webkit

// Exercise 5: it displayed simple terminal output, one line per test

// Automation tasks:

// Task 1: It displayed the out put in terminal as well as the html reporter which is the by-default setting

// Task 2: it printed "Global setup running once before all tests" in the consoole before runnign the test

// Task 3: yes, the count increased, fromm 39 tests to 52 tests

// Task 4: Done

//Debugging challenge
// In CI: process.env.CI is set/truthy, so retries becomes 2. A failing test can therefore be run again up to two times.
// Locally: process.env.CI is normally unset/falsy, so retries becomes 0. A failing test runs once and fails without retrying.

// This is intentional: CI gets retries to reduce failures caused by transient/flaky behavior, while local runs avoid hiding failures 
// behind automatic retries and stay faster.

// For debugging, the teammate can temporarily run Playwright locally with the CI environment variable set. 
// That makes the existing configuration resolve retries to 2, allowing them to reproduce the same retry behavior they see in CI.



