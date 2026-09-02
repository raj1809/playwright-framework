# playwright-framework

What is tested

All tests are tagged so they can be run selectively.

| Tag | Purpose |
|-----|---------|
| `@smoke` | Critical happy-path — runs on every deploy |
| `@regression` | Full suite — runs on every PR |

| Test | Tag |
|------|-----|
| Add one product to cart | @regression |
| Add multiple products, verify cart count and items | @regression |
| Remove item, verify count decreases | @regression |
| Product details match inventory listing | @regression |
| Full checkout flow — end to end | @smoke |
| Negative checkout — each required field missing | @regression |
| Cancel during checkout returns to cart | @regression |
| Products sorted by price low to high | @regression |
| Cart persists after navigating away and back | @regression |

Assertion strategy

All assertions use Playwright's built-in expect with auto-retrying locators, so there are no manual waits or waitForTimeout calls anywhere in the suite. Every toHaveText / toHaveURL / toContainText polls until the condition is true or the default 5 s timeout expires.

The negative checkout test runs as a deterministic for...of loop so that all three required fields are validated on every run, rather than relying on a random pick that would only cover one field per run.

Running the tests

# Install dependencies
npm install
npx playwright install

# Run the full regression suite
npx playwright test --grep @regression

# Run smoke tests only
npx playwright test --grep @smoke

# Run on a specific browser
npx playwright test --project=chromium

# Open the HTML report after a run
npx playwright show-report

Generating test data; 
Test users are created with createTestUser() from data/userFactory.js, which uses Faker.js to produce a unique firstName, lastName, and zipCode on every call. This avoids hardcoded credentials and makes tests independent of each other.

Key design decisions: 

Page Object Model — every page has its own class exposing locators and actions. Tests never use raw selectors; they call named methods like checkoutPage.fillInfo() or inventoryPage.addProductToCart().

Fixtures — page objects are injected via a custom Playwright fixture (pages.fixture.js), keeping test files clean and removing boilerplate setup from every test.

Deterministic negative tests — the negative checkout test iterates over all required fields in a fixed order rather than selecting one randomly, so CI always gets consistent, reproducible coverage.

No test.only in source — test.only is only ever used locally during debugging and is never committed.