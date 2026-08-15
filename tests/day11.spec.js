import { test, expect } from "@playwright/test";

test("login on saucedemo using fill", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
});

test("check the first checkbox, uncheck the second if it is checked", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/checkboxes");

  const checkboxes = page.getByRole("checkbox");
  await checkboxes.first().check();
  if (await checkboxes.last().isChecked()) {
    await checkboxes.last().uncheck();
  }
});

test('Go to app, use selectOption to choose "Option 2" from the dropdown. Assert the selected value is "2"', async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/dropdown");

  const dropdown = page.getByRole("combobox");

  await dropdown.selectOption("2");
  await expect(dropdown).toHaveValue("2");
});

test('Go to app and hover over the first user avatar Assert that the caption text containing "name" becomes visible', async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/hovers");
  const firstImg = page.locator('.figure').first().locator('img')
  await firstImg.hover();
  const name = page.getByRole("heading", { name: "name: user1" });
  await expect(name).toBeVisible();
});

test('Go to app, click the input field, and press the "A" key using page.keyboard.press. Assert the result text shows "You entered: A" ', async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/key_presses");
  await page.getByRole("textbox").click();
  await page.keyboard.press("A");
  const testResult = page.getByText("You entered: A", { exact: true });
  await expect(testResult).toBeVisible();
});

test("Handle and accept the JS alert before clicking, then verify the result confirms acceptance", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Click for JS Alert" }).click();

  const clickResult = page.getByText("You successfully clicked an alert", {
    exact: true,
  });
  await expect(clickResult).toBeVisible();
});
