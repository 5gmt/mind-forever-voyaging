import { test } from "@playwright/test";
import { acceptCityHallMilestone, probeCityHallBoundary } from "./city-hall-acceptance";

for (const scenario of ["history", "input-scope"] as const) {
  test(`guards City Hall ${scenario} with controlled raw observations`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await probeCityHallBoundary(page, testInfo, scenario);
  });
}

for (const viewport of ["desktop", "narrow"] as const) for (const controls of ["classic", "guided", "actions"] as const) {
  test(`${controls} completes the City Hall fieldwork after three recorded tasks (${viewport})`, async ({ page }, testInfo) => {
    test.setTimeout(240_000);
    await page.setViewportSize(viewport === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 });
    await acceptCityHallMilestone(page, controls, testInfo);
  });
}

test("unrecorded government conversation does not infer the fourth assignment", async ({ page }, testInfo) => {
  test.setTimeout(240_000);
  await acceptCityHallMilestone(page, "actions", testInfo, false);
});
