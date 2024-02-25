const { expect } = require("playwright/test");
const { Login } = require("./login-page");
const { Inventory } = require("./inventory-page");

class InventoryDetail {
  constructor(page) {
    this.page = page;
  }

  async setup() {
    const login = new Login(this.page);
    const inventory = new Inventory(this.page);

    const username = "standard_user";
    const password = "secret_sauce";
    await login.loginWithValidCredentials(username, password);

    await this.page.click("a#item_0_img_link");

    this.inventoryDetailsName = await this.page
      .locator("div.inventory_details_name")
      .textContent();
    this.inventoryDetailsDesc = await this.page
      .locator("div.inventory_details_desc")
      .textContent();
    this.inventoryDetailsPrice = await this.page
      .locator("div.inventory_details_price")
      .textContent();
    this.inventoryDetailsImg = await this.page
      .locator("img.inventory_details_img")
      .isVisible();
  }

  async addToCart(itemName) {
    let initialCartCount = "0";
    if (await this.page.locator("span.shopping_cart_badge").isVisible()) {
      initialCartCount = await this.page
        .locator("span.shopping_cart_badge")
        .textContent();
    } else {
      initialCartCount = "0";
    }

    await this.page.click(`button[name=add-to-cart-${itemName}]`);

    // Verify cart count has increased
    const updatedCartCount = await this.page
      .locator("span.shopping_cart_badge")
      .textContent();
    expect(parseInt(updatedCartCount)).toEqual(parseInt(initialCartCount) + 1);
  }

  async removeItem(itemName) {
    let initialCartCount = "0";
    if (await this.page.locator("span.shopping_cart_badge").isVisible()) {
      initialCartCount = await this.page
        .locator("span.shopping_cart_badge")
        .textContent();
    } else {
      initialCartCount = "0";
    }

    await this.page.click(`button[name=remove-${itemName}]`);

    let updatedCartCount = "0";
    if (await this.page.locator("span.shopping_cart_badge").isVisible()) {
      updatedCartCount = await this.page
        .locator("span.shopping_cart_badge")
        .textContent();
    } else {
      updatedCartCount = "0";
    }
    expect(parseInt(updatedCartCount)).toEqual(parseInt(initialCartCount) - 1);
  }
}

module.exports = { InventoryDetail };
