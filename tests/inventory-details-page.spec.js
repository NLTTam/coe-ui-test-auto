const { test, expect } = require("@playwright/test");
const { InventoryDetail } = require("../pages/inventory-detail-page");

test.describe("Swag Labs Inventory Details", () => {
  test("Check if element in shopping cart page", async ({ page }) => {
    const inventoryDetail = new InventoryDetail(page);

    await page.goto("https://saucedemo.com/");

    await inventoryDetail.setup();

    expect(page.url()).toContain('inventory-item.html?id=')
    expect(inventoryDetail.inventoryDetailsName).toBe('Sauce Labs Bike Light')
    expect(inventoryDetail.inventoryDetailsDesc).toBe("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.")
    expect(inventoryDetail.inventoryDetailsPrice).toBe('$9.99')
    expect(inventoryDetail.inventoryDetailsImg).toBeTruthy()
  });

  test("Add to cart", async ({ page }) => {
    const inventoryDetail = new InventoryDetail(page);

    await page.goto("https://saucedemo.com/");

    await inventoryDetail.setup();

    const lowercaseJoinedText = inventoryDetail.inventoryDetailsName.toLowerCase().replace(/ /g, "-");

    await inventoryDetail.addToCart(lowercaseJoinedText)
  });

  test("Add to cart and remove it", async ({ page }) => {
    const inventoryDetail = new InventoryDetail(page);

    await page.goto("https://saucedemo.com/");

    await inventoryDetail.setup();

    const lowercaseJoinedText = inventoryDetail.inventoryDetailsName.toLowerCase().replace(/ /g, "-");

    await inventoryDetail.addToCart(lowercaseJoinedText)

    await inventoryDetail.removeItem(lowercaseJoinedText)
  });
});
