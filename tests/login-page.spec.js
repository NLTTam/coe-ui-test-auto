// @ts-check
const { test, expect } = require("@playwright/test");
const { Login } = require("../pages/login-page");

test.describe("Swag Labs Login", () => {
  test("Login with valid credentials", async ({ page }) => {
    const login = new Login(page);

    // Navigate to login page
    await login.navigateToLoginPage();

    // Fill login form with valid credentials
    const username = "standard_user";
    const password = "secret_sauce";
    await login.fillLoginForm(username, password);

    // Submit login form
    await login.submitLoginForm();

    // Wait for successful login
    await login.waitForSuccessfulLogin();

    // Assertions
    expect(page.url()).toContain("inventory.html");
  });

  test("Check elements on login page", async ({ page }) => {
    const login = new Login(page);

    // Navigate to login page
    await login.navigateToLoginPage();
    // Check for logo
    await expect(login.logo).toBe("Swag Labs");
    // Check for username input field
    expect(login.username).toBeTruthy();
    // Check for password input field
    expect(login.password).toBeTruthy();
  });

  test("Login with invalid credentials", async ({ page }) => {
    const username = "standard_user";
    const password = "secret_sauces";

    const login = new Login(page);
    await login.loginWithInvalidCredentials(username, password);

    // Assertions
    await expect(page.url()).not.toContain("inventory.html"); // Shouldn't be redirected to inventory

    // You can add further assertions based on your specific requirements,
    // such as checking for specific error messages or element visibility
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
