import { test } from "@playwright/test";
import { acceptPowerStationMilestone, probePowerStationBoundary } from "./power-station-acceptance";

for (const scenario of ["history", "scope"] as const) {
  test(`guards Power Station ${scenario} with controlled observations`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await probePowerStationBoundary(page, testInfo, scenario);
  });
}

for (const viewport of ["desktop", "narrow"] as const) for (const controls of ["classic", "guided", "actions"] as const) {
  test(`${controls} records the complete Power Station fieldwork (${viewport})`, async ({ page }, testInfo) => {
    test.setTimeout(300_000);
    await page.setViewportSize(viewport === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 });
    await acceptPowerStationMilestone(page, controls, testInfo);
  });
}

test("entrance recording and unrecorded facility LOOK do not infer the fifth task", async ({ page }, testInfo) => {
  test.setTimeout(300_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await acceptPowerStationMilestone(page, "actions", testInfo, false);
});
