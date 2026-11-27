import { test } from "@playwright/test";
import { acceptHomeMilestone } from "./home-acceptance";

for (const controls of ["classic", "guided", "actions"] as const) {
  test(`${controls} records the complete home fieldwork (narrow)`, async ({ page }, testInfo) => {
    test.setTimeout(480_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await acceptHomeMilestone(page, controls, testInfo);
  });
}
