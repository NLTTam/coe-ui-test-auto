const { expect } = require("playwright/test");
const { ShoppingCart } = require("./shopping-cart-page");

class Checkout {
    constructor(page) {
      this.page = page;
    }

    async setup() {
      const shoppingCart = new ShoppingCart(this.page);

      await shoppingCart.setup()

      await shoppingCart.checkout()
    }
  
    async fillCheckoutInformation(firstName, lastName, zipCode) {
      await this.page.fill('#first-name', firstName);
      await this.page.fill('#last-name', lastName);
      await this.page.fill('#postal-code', zipCode);
      await this.page.click('#continue');
    }
  
    async completePurchase() {
      await this.page.click('#finish');
    }
  }
  
  module.exports = { Checkout };
  