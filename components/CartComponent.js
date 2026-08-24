// 3 automation tasks

// 1. Task
// login page has only 4 locators and 3 methods as of now. There is not much functionality on the login page. it is manageable.so it cant become god object as
// the framework grows

// Inventory page can become god object as there are so many locators & functionaliies here, like 6 products, 4 sort actions, 4 hamburger menu actiosn
// shopping cart link, cart icon link as well as remove button for each selected products buttons with product details (like product name, details, prices, and decriptions)
//  it can end up with multiple locators and methods

// 2. Task
// Everything already follows the convention
// Page objects: PascalCase: suffixed Page = BasePage.js, InventoryPage.js and LoginPage.js
// Component objects: suffixed Component = CartComponent.js and HeaderComponent.js
// Locators: camelCase, named after what they are:
           // this.title = page.locator('[data-test="title"]')
            // this.cartIcon = page.locator('.shopping_cart_link')
            // this.cartBadge = page.locator('.shopping_cart_badge')
            // this.menuButton = page.getByRole('button', { name : 'Open Menu'})
            // this.logoutLink = page.getByRole('link', { name : 'Logout'})  
            // this.usernameInput = page.getByPlaceholder("Username")
        // this.passwordInput = page.getByPlaceholder("Password")
        // this.loginButton =  page.getByRole('button')
        // this.errorMessage = page.locator('[data-test="error"]')
// Action methods: verbs : async goto(path  = ''),  async isLoggedIn(), async logout(),  async login(username, password),  async assertLoginError(expectedMessage)

// 3. Task
// I usually keep assertions in the tests rather than inside page objects because it keeps the page object focused on actions and element interactions. 
// From what I practiced, this made the tests easier to read and understand because the expected result stayed visible in the test itself. 
// That said, I think it depends on the project—shared validation that is tightly coupled to a page could sometimes belong in the page object.
//  Overall, I prefer assertions in tests for better separation of responsibilities and maintainability.


// Debugging challenge
// // InventoryPage.js
export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new HeaderComponent(page); // bug
  }
}

// if page is not passed,then the then this.page will be undefined, which can cause failures later when the component tries to interact with the browser.