const { test, expect } = require("@playwright/test");
const { Login } = require("../pages/login-page");

test.describe("Swag Labs Login", () => {
  test("Login with valid credentials", async ({ page }) => {
    const login = new Login(page);

    await login.navigateToLoginPage();

    const username = "standard_user";
    const password = "secret_sauce";
    await login.fillLoginForm(username, password);

    await login.submitLoginForm();

    await login.waitForSuccessfulLogin();

    expect(page.url()).toContain("inventory.html");
  });

  test("Check elements on login page", async ({ page }) => {
    const login = new Login(page);

    await login.navigateToLoginPage();
  
    await expect(login.logo).toBe("Swag Labs");
    expect(login.username).toBeTruthy();
    expect(login.password).toBeTruthy();
  });

  test("Login with invalid credentials", async ({ page }) => {
    const username = "standard_user";
    const password = "secret_sauces";

    const login = new Login(page);
    await login.loginWithInvalidCredentials(username, password);

    await expect(page.url()).not.toContain("inventory.html");

  });

  test("Check if access without login", async ({ page }) => {
    await page.goto("https://saucedemo.com/inventory.html");

    const errorMessage = await page
      .locator(".error-message-container h3")
      .textContent();
    await expect(errorMessage).toBe(
      "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
  });
});
