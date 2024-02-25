const { test, expect } = require("@playwright/test");
const { ShoppingCart } = require("../pages/shopping-cart-page");

test.describe("Swag Labs Shopping Cart", () => {
  test("Check if element in shopping cart page", async ({ page }) => {
    const shoppingcart = new ShoppingCart(page);

    await page.goto("https://saucedemo.com/");

    await shoppingcart.setup();

    expect(page.url()).toContain('cart.html')
    expect(shoppingcart.title).toBe('Your Cart')
    expect(shoppingcart.cartDescLabel).toBe('Description')
    expect(shoppingcart.cartQuantitiyLabel).toBe('QTY')
  });

  test("Check countinue shopping and check button", async ({ page }) => {
    const shoppingcart = new ShoppingCart(page);

    await page.goto("https://saucedemo.com/");

    await shoppingcart.setup();

    await shoppingcart.continueShopping()

    await page.goBack()

    await shoppingcart.checkout()

    await page.click("#cancel")
  });

  test("Remove an item", async ({ page }) => {
    const shoppingcart = new ShoppingCart(page);

    await page.goto("https://saucedemo.com/");

    await shoppingcart.setup();

    await shoppingcart.removeFromCart("sauce-labs-onesie")
  });
});
