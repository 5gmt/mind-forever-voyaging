import { test } from "@playwright/test";
import { acceptRestaurantMilestone } from "./restaurant-acceptance";
import { acceptMealScope } from "./restaurant-scope";

for (const viewport of ["desktop", "narrow"] as const) for (const controls of ["classic", "guided", "actions"] as const) {
  test(`${controls} records Courthouse, Newspaper and Restaurant in one fresh session (${viewport})`, async ({ page }, testInfo) => {
    test.setTimeout(180_000);
    await page.setViewportSize(viewport === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 });
    await acceptRestaurantMilestone(page, controls, testInfo);
    if (controls === "actions" && viewport === "desktop") await acceptMealScope(page, testInfo);
  });
}
