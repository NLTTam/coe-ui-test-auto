const { test, expect } = require("@playwright/test");
const { Login } = require("../pages/login-page");

test.describe("Login page", async () => {
  test("TC01_Verify that standard user can login successfully with valid credentials", async ({
    page,
  }) => {
    const login = new Login(page);

    await login.navigateToLoginPage();

    const username = "standard_user";
    const password = "secret_sauce";
    await login.fillLoginForm(username, password);

    await login.submitLoginForm();

    await login.waitForSuccessfulLogin();

    expect(page.url()).toContain("inventory.html");
  });

  test("TC02_ Verify that elements on login page is correct", async ({
    page,
  }) => {
    const login = new Login(page);

    await login.navigateToLoginPage();

    await expect(login.logo).toBe("Swag Labs");
    expect(login.username).toBeTruthy();
    expect(login.password).toBeTruthy();
  });

  test("TC03_Verify that error message will be shown when user entered invalid credentials", async ({
    page,
  }) => {
    const username = "standard_user";
    const password = "secret_sauces";

    const login = new Login(page);
    await login.loginWithInvalidCredentials(username, password);

    await expect(page.url()).not.toContain("inventory.html");
  });

  test("TC04_Verify that user cannot access without login", async ({
    page,
  }) => {
    await page.goto("https://saucedemo.com/inventory.html");

    const errorMessage = await page
      .locator(".error-message-container h3")
      .textContent();
    await expect(errorMessage).toBe(
      "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
  });
});
