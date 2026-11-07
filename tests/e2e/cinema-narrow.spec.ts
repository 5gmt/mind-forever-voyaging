import { test } from "@playwright/test";
import { acceptCinemaMilestone } from "./cinema-acceptance";

for (const controls of ["classic", "guided", "actions"] as const) {
  test(`${controls} records the complete cinema fieldwork (narrow)`, async ({ page }, testInfo) => {
    test.setTimeout(480_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await acceptCinemaMilestone(page, controls, testInfo);
  });
}
