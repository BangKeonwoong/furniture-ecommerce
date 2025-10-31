import { test, expect } from "@playwright/test";

test.describe("Smoke - purchase funnel", () => {
  test("home → category → PDP → cart → checkout", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /loom & lattice/i })).toBeVisible();

    await page.getByRole("link", { name: /쇼파 & 체어 보기/i }).first().click();
    await expect(page).toHaveURL(/category\/seating/);

    const productLink = page.getByRole("link", { name: /orion modular sofa/i }).first();
    await expect(productLink).toBeVisible();
    await productLink.click();
    await expect(page).toHaveURL(/product\/orion-modular-sofa/);

    const outOfStockVariant = page.getByRole("button", { name: /fog linen/i });
    await expect(outOfStockVariant).toBeDisabled();

    await page.getByRole("button", { name: /장바구니에 담기/i }).click();
    await page.waitForURL("**/cart");
    await expect(page.getByRole("heading", { name: /장바구니/ })).toBeVisible();

    await page.getByRole("button", { name: "+" }).click();

    await page.getByRole("link", { name: /결제 진행하기/i }).click();
    await expect(page).toHaveURL(/checkout$/);
    await expect(page.getByText(/× 2/)).toBeVisible();

    await page.fill('input[name="name"]', "홍길동");
    await page.fill('input[name="phone"]', "010-0000-0000");
    await page.fill('input[name="postalCode"]', "06000");
    await page.fill('input[name="address1"]', "서울 강남구 압구정로 1");
    await page.fill('input[name="address2"]', "101동 101호");
    await page.getByRole("button", { name: /다음 단계: 배송 옵션/ }).click();
    await expect(page).toHaveURL(/checkout\/shipping/);

    await page.getByRole("radio", { name: /화이트글러브/ }).check();
    await page.getByRole("link", { name: /다음 단계: 결제 정보/ }).click();
    await expect(page).toHaveURL(/checkout\/payment/);
    await expect(page.getByText(/결제 수단/)).toBeVisible();
    await expect(page.getByText(/PG:/)).toBeVisible();
    const approveButton = page.getByRole("button", { name: /모의 승인 후 주문 완료하기/ });
    await expect(approveButton).toBeEnabled();
    await approveButton.click();
    await expect(page).toHaveURL(/checkout\/success/);
    await expect(page.getByRole("heading", { name: /주문이 완료되었습니다/ })).toBeVisible();
  });
});
