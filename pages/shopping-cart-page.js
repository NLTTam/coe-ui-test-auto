const { expect } = require("playwright/test");
const { Login } = require("./login-page");
const { Inventory } = require("./inventory-page");

class ShoppingCart {
  constructor(page) {
    this.page = page;
  }

  async setup() {
    const login = new Login(this.page);
    const inventory = new Inventory(this.page);

    const username = "standard_user";
    const password = "secret_sauce";
    await login.loginWithValidCredentials(username, password);

    await inventory.addToCart("sauce-labs-fleece-jacket");
    await inventory.addToCart("sauce-labs-onesie");

    await this.page.click("a.shopping_cart_link");

    this.cartQuantitiyLabel = await this.page.locator(
      "div.cart_quantity_label"
    ).textContent();
    this.cartDescLabel = await this.page.locator("div.cart_desc_label").textContent();
    this.title = await this.page.locator("span.title").textContent();
  }

  async removeFromCart(itemName) {
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

  async continueShopping() {
    await this.page.click("#continue-shopping");
  }

  async checkout() {
    await this.page.click("#checkout");
  }

  async checkInventoryItemElement() {

    expect(this.page.locator(".cart_quantity")).toBeTruthy(); // Cart quantity
    expect(this.page.locator(".inventory_item_name")).toBeTruthy(); // Item name
    expect(this.page.locator(".inventory_item_desc")).toBeTruthy(); // Item price
    expect(this.page.locator(".inventory_item_price")).toBeTruthy(); // Item price
    expect(this.page.locator(".cart_button")).toBeTruthy(); // "Add to cart"/"Remove" button
  }
}

module.exports = { ShoppingCart };
