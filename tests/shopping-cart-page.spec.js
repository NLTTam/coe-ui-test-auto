const { test, expect } = require("@playwright/test");
const { ShoppingCart } = require("../pages/shopping-cart-page");

test.describe("Shopping Cart page", () => {
  test("TC05_Verify element in shopping cart page is correct", async ({
    page,
  }) => {
    const shoppingcart = new ShoppingCart(page);

    await page.goto("https://saucedemo.com/");

    await shoppingcart.setup();

    expect(page.url()).toContain("cart.html");
    expect(shoppingcart.title).toBe("Your Cart");
    expect(shoppingcart.cartDescLabel).toBe("Description");
    expect(shoppingcart.cartQuantitiyLabel).toBe("QTY");
  });

  test("TC06_Verify if user can use countinue shopping button and checkout button", async ({
    page,
  }) => {
    const shoppingcart = new ShoppingCart(page);

    await page.goto("https://saucedemo.com/");

    await shoppingcart.setup();

    await shoppingcart.continueShopping();

    await page.goBack();

    await shoppingcart.checkout();

    await page.click("#cancel");
  });

  test("TC07_ Verify that user can remove an item in the shopping cart", async ({
    page,
  }) => {
    const shoppingcart = new ShoppingCart(page);

    await page.goto("https://saucedemo.com/");

    await shoppingcart.setup();

    await shoppingcart.removeFromCart("sauce-labs-onesie");
  });
});
