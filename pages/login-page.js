const { expect } = require("playwright/test");

class Login {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto("https://saucedemo.com/");
    this.logo = await this.page.locator("div.login_logo").textContent();
    this.username = await this.page.locator("#user-name");
    this.password = await this.page.locator("#password");
  }

  async fillLoginForm(username, password) {
    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
  }

  async submitLoginForm() {
    await this.page.click("#login-button");
  }

  async waitForSuccessfulLogin() {
    await expect(this.page).toHaveURL(/inventory.html$/); // Check for inventory.html in URL
  }

  async waitForErrorMessage() {
    const errorMessage = await this.page
      .locator(".error-message-container h3")
      .textContent();
    await expect(errorMessage).toBe(
      "Epic sadface: Username and password do not match any user in this service"
    );
  }

  async loginWithValidCredentials(username, password) {
    await this.fillLoginForm(username, password);
    await this.submitLoginForm();
  }

  async loginWithInvalidCredentials(username, password) {
    await this.navigateToLoginPage();
    await this.fillLoginForm(username, password);
    await this.submitLoginForm();
    await this.waitForErrorMessage();
  }
}

module.exports = { Login };
