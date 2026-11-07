import { test } from "@playwright/test";
import { acceptCinemaMilestone, probeCinemaBoundary } from "./cinema-acceptance";

for (const controls of ["classic", "guided", "actions"] as const) {
  test(`${controls} records the complete cinema fieldwork (desktop)`, async ({ page }, testInfo) => {
    test.setTimeout(480_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await acceptCinemaMilestone(page, controls, testInfo);
  });
}

test("unrecorded movie preserves the previous six tasks", async ({ page }, testInfo) => {
  test.setTimeout(480_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await acceptCinemaMilestone(page, "actions", testInfo, false);
});

for (const scenario of ["history", "input-scope", "recording"] as const) {
  test(`guards cinema ${scenario} with controlled observations`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await probeCinemaBoundary(page, testInfo, scenario);
  });
}
