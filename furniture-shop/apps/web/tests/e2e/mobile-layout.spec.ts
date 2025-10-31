import { test, expect, devices } from "@playwright/test";

test.use(devices["iPhone SE"]);

test.describe("Mobile layout - 375px", () => {
  test("header, category filter, checkout CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("heading", { name: /loom & lattice/i })).toBeVisible();

    await page.getByRole("link", { name: /쇼파 & 체어 보기/i }).first().click();
    await expect(page).toHaveURL(/category\/seating/);
    await expect(page.getByRole("button", { name: /ETA 빠른 순/ })).toBeVisible();

    await page.getByRole("link", { name: /orion modular sofa/i }).first().click();
    await expect(page).toHaveURL(/product\/orion-modular-sofa/);
    await page.getByRole("button", { name: /장바구니에 담기/i }).click();

    await page.waitForURL("**/cart");
    await page.getByRole("link", { name: /결제 진행하기/i }).click();
    await expect(page).toHaveURL(/checkout$/);

    const floatingCTA = page.getByRole("button", { name: /다음 단계: 배송 옵션/ });
    await expect(floatingCTA).toBeVisible();
    const boundingBox = await floatingCTA.boundingBox();
    expect(boundingBox?.y ?? 0).toBeGreaterThan(500);
  });
});
