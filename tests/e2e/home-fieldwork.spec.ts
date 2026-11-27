import { test } from "@playwright/test";
import { acceptHomeMilestone, probeHomeBoundary, probeUnrecordedLivingRoom } from "./home-acceptance";

for (const controls of ["classic", "guided", "actions"] as const) {
  test(`${controls} records the complete home fieldwork (desktop)`, async ({ page }, testInfo) => {
    test.setTimeout(480_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await acceptHomeMilestone(page, controls, testInfo);
  });
}

test("unrecorded living-room LOOK preserves the previous seven tasks", async ({ page }, testInfo) => {
  test.setTimeout(480_000);
  await acceptHomeMilestone(page, "actions", testInfo, false);
});

test("recording only the entrance and hall does not credit a later living-room LOOK", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await probeUnrecordedLivingRoom(page, testInfo);
});

for (const scenario of ["history", "guards", "recording"] as const) {
  test(`guards home ${scenario} with controlled observations`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await probeHomeBoundary(page, testInfo, scenario);
  });
}
