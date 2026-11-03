import { expect, test, type Page } from "@playwright/test";

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900, desktop: true },
  { name: "desktop-1024", width: 1024, height: 800, desktop: true },
  { name: "tablet-768", width: 768, height: 900, desktop: false },
  { name: "mobile-390", width: 390, height: 844, desktop: false },
];

const cardColumns = (page: Page) =>
  page.locator("article").evaluateAll((els) => new Set(els.map((e) => Math.round(e.getBoundingClientRect().left))).size);

for (const vp of VIEWPORTS) {
  test.describe(vp.name, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("layout: columns, nav mode, no horizontal overflow", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("article")).toHaveCount(8);
      expect(await cardColumns(page)).toBe(vp.desktop ? 3 : 1);

      const nav = page.getByRole("navigation", { name: "Primary" });
      const burger = page.getByRole("button", { name: "Open menu" });
      if (vp.desktop) {
        await expect(nav).toBeVisible();
        await expect(burger).toBeHidden();
      } else {
        await expect(nav).toBeHidden();
        await expect(burger).toBeVisible();
      }
      const logoLeft = await page.getByRole("link", { name: "OWNDAYS x MELLER" }).evaluate((el) => el.getBoundingClientRect().left);
      expect(logoLeft).toBeGreaterThanOrEqual(16);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("modal: open, switch color, close with ESC", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("region", { name: "Products" }).getByRole("button", { name: "View ADISA" }).click();
      const dialog = page.getByRole("dialog", { name: "ADISA" });
      await expect(dialog).toBeVisible();
      const carousel = dialog.getByRole("region", { name: "ADISA images" });
      const firstSrc = await carousel.locator("img").first().getAttribute("src");
      await dialog.getByRole("radio", { name: "Brown Demi" }).click();
      await expect(dialog.getByText("ML2001D-6S C2")).toBeVisible();
      await expect.poll(() => carousel.locator("img").first().getAttribute("src")).not.toBe(firstSrc);
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
    });

    test("out-of-stock product shows disabled OUT OF STOCK", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("region", { name: "Products" }).getByRole("button", { name: "View CHAUEN" }).click();
      await expect(page.getByRole("button", { name: "OUT OF STOCK" })).toBeDisabled();
    });

    test("style them strip scrolls horizontally and + opens the modal", async ({ page }) => {
      await page.goto("/");
      const strip = page.getByRole("region", { name: "Style looks" });
      await strip.scrollIntoViewIfNeeded();
      expect(await strip.evaluate((e) => e.scrollWidth > e.clientWidth)).toBe(true);
      await strip.getByRole("button", { name: "View ADISA" }).first().click();
      await expect(page.getByRole("dialog", { name: "ADISA" })).toBeVisible();
    });
  });
}

test("mobile menu navigates and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await menu.getByRole("link", { name: "PRODUCTS" }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#products$/);
});
