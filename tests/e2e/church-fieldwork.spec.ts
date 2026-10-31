import { test } from "@playwright/test";
import { acceptChurchMilestone, probeChurchBoundary } from "./church-acceptance";

for (const scenario of ["history", "input-scope", "recording"] as const) {
  test(`guards church ${scenario} with controlled observations`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await probeChurchBoundary(page, testInfo, scenario);
  });
}

for (const viewport of ["desktop", "narrow"] as const) for (const controls of ["classic", "guided", "actions"] as const) {
  test(`${controls} records the complete church fieldwork (${viewport})`, async ({ page }, testInfo) => {
    test.setTimeout(360_000);
    await page.setViewportSize(viewport === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 });
    await acceptChurchMilestone(page, controls, testInfo);
  });
}

test("unrecorded church conversation preserves the previous five tasks", async ({ page }, testInfo) => {
  test.setTimeout(360_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await acceptChurchMilestone(page, "actions", testInfo, false);
});
