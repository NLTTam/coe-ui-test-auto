const { test, expect } = require("@playwright/test");
const { Checkout } = require("../pages/checkout-page");

test.describe("Swag Labs Inventory Details", () => {
  test("Checkout", async ({ page }) => {
    const checkout = new Checkout(page);

    await page.goto("https://saucedemo.com/");

    await checkout.setup();

    expect(page.url()).toContain('checkout-step-one.html');
    expect(page.getByPlaceholder("First Name").isVisible()).toBeTruthy();
    expect(page.getByPlaceholder("Last Name").isVisible()).toBeTruthy();
    expect(page.getByPlaceholder("Zip/Postal Code").isVisible()).toBeTruthy();
    
  });

  test("Checkout complete", async ({ page }) => {
    const checkout = new Checkout(page);

    await page.goto("https://saucedemo.com/");

    await checkout.setup();

    expect(page.url()).toContain('checkout-step-one.html');
    await checkout.fillCheckoutInformation("Abc", "Xyz", "700000");
    expect(page.url()).toContain('checkout-step-two.html');
    await checkout.completePurchase()
    expect(page.url()).toContain('checkout-complete.html');
    await page.click("#back-to-products")
    expect(page.url()).toContain('inventory.html');
    
  });
});
