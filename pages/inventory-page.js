const { expect } = require("playwright/test");
const { Login } = require("./login-page");

class Inventory {
  constructor(page) {
    this.page = page;
  }

  async navigateToInventoryPage(username, password) {
    await this.page.goto("https://saucedemo.com/");

    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
    await this.page.click("#login-button");

    this.logo = await this.page.locator("div.app_logo").textContent();
    this.menuBar = await this.page.locator("#react-burger-menu-btn");
    this.shoppingCart = await this.page.locator(".shopping_cart_link");
    this.twitter = await this.page.getByText("Twitter");
    this.facebook = await this.page.getByText("Facebook");
    this.linkedin = await this.page.getByText("LinkedIn");
    this.sideBar_inventory = await this.page.locator(
      "a#inventory_sidebar_link"
    );
    this.sideBar_about = await this.page.locator("a#about_sidebar_link");
    this.sideBar_logout = await this.page.locator("a#logout_sidebar_link");
    this.sideBar_reset = await this.page.locator("a#reset_sidebar_link");
    this.copyright = await this.page.locator(".footer_copy");
    this.sort = await this.page.locator(".product_sort_container");
  }

  async checkInventoryItemElement() {
    await expect(this.page.locator(".inventory_item")).toBeTruthy();

    // Assert presence of elements
    expect(this.page.locator(".inventory_item_img")).toBeTruthy(); // Item image
    expect(this.page.locator(".inventory_item_name")).toBeTruthy(); // Item name
    expect(this.page.locator(".inventory_item_desc")).toBeTruthy(); // Item price
    expect(this.page.locator(".inventory_item_price")).toBeTruthy(); // Item price
    expect(this.page.locator(".btn_inventory")).toBeTruthy(); // "Add to cart"/"Remove" button
  }

  async checkMenuSideBarElement() {
    await expect(this.sideBar_about).toHaveAttribute("tabIndex", "-1");
    await expect(this.sideBar_inventory).toHaveAttribute("tabIndex", "-1");
    await expect(this.sideBar_logout).toHaveAttribute("tabIndex", "-1");
    await expect(this.sideBar_reset).toHaveAttribute("tabIndex", "-1");

    await this.menuBar.click(); //expand the menu bar

    await expect(this.sideBar_about).toBeTruthy();
    await expect(this.sideBar_about).toHaveText("About");
    await expect(this.sideBar_about).toHaveAttribute("tabIndex", "0");

    await expect(this.sideBar_inventory).toBeTruthy();
    await expect(this.sideBar_inventory).toHaveText("All Items");
    await expect(this.sideBar_inventory).toHaveAttribute("tabIndex", "0");

    await expect(this.sideBar_logout).toBeTruthy();
    await expect(this.sideBar_logout).toHaveText("Logout");
    await expect(this.sideBar_logout).toHaveAttribute("tabIndex", "0");

    await expect(this.sideBar_reset).toBeTruthy();
    await expect(this.sideBar_reset).toHaveText("Reset App State");
    await expect(this.sideBar_reset).toHaveAttribute("tabIndex", "0");
  }

  async checkSortElement() {
    await expect(this.sort).toBeTruthy();
    await expect(this.sort.locator('option[value="az"]')).toBeTruthy();
    await expect(this.sort.locator('option[value="az"]')).toHaveText(
      "Name (A to Z)"
    );
    await expect(this.sort.locator('option[value="za"]')).toBeTruthy();
    await expect(this.sort.locator('option[value="za"]')).toHaveText(
      "Name (Z to A)"
    );
    await expect(this.sort.locator('option[value="lohi"]')).toBeTruthy();
    await expect(this.sort.locator('option[value="lohi"]')).toHaveText(
      "Price (low to high)"
    );
    await expect(this.sort.locator('option[value="hilo"]')).toBeTruthy();
    await expect(this.sort.locator('option[value="hilo"]')).toHaveText(
      "Price (high to low)"
    );
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

}

module.exports = { Inventory };
