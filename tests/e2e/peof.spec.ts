import { expect, test, type FrameLocator, type TestInfo } from "@playwright/test";

const canonicalFrame = (page: import("@playwright/test").Page) =>
  page.frameLocator('iframe[title*="canonical Release 79 story"]');

const attachPayload = async (testInfo: TestInfo, frame: FrameLocator) => {
  const payload = await frame.locator("body").evaluate(() => {
    const bridge = (window as typeof window & {
      AMFVPresentationBridge?: { extract: (documentRoot: Document, getStyle: typeof getComputedStyle) => unknown };
    }).AMFVPresentationBridge;
    return bridge?.extract(document, (element) => getComputedStyle(element)) ?? null;
  });
  await testInfo.attach("peof-presentation-v3", {
    body: Buffer.from(JSON.stringify(payload, null, 2)),
    contentType: "application/json",
  });
};

test("fresh Japanese session presents the observed PEOF office scene and recovers input", async ({ page }, testInfo) => {
  await page.goto("/");
  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  const continueButton = page.getByRole("button", { name: /Begin the original story/i });
  await expect(introduction.or(continueButton)).toBeVisible({ timeout: 20_000 });
  if (!(await continueButton.isVisible())) {
    await expect(introduction).toBeVisible();
    await introduction.getByRole("button", { name: /^Begin/ }).click();
  }
  await expect(continueButton).toBeEnabled({ timeout: 20_000 });
  await page.getByTitle("Reading and play settings").click();
  const settings = page.getByRole("region", { name: /Reading and play settings|読書とプレイの設定/ });
  await settings.getByRole("button", { name: "日本語" }).click();

  const frame = canonicalFrame(page);
  const presentation = frame.getByRole("log", { name: "日本語ストーリー表示" });
  await expect(presentation).toContainText("明日という日はまだ");
  await page.getByRole("button", { name: /原作を始める/ }).click();
  await expect(presentation).toContainText("通信モードに入りました");

  await page.getByRole("button", { name: "ガイドの表示を切り替える" }).click();
  const companion = page.getByRole("complementary", { name: "読者ガイド" });
  await companion.getByRole("tab", { name: "通信" }).click();

  const commandInput = page.locator("#command-input");
  await expect(commandInput).toBeEnabled();
  await frame.locator("body").evaluate(() => {
    const state = { exposedFrames: 0, sampledFrames: 0, raf: 0 };
    const sample = () => {
      state.sampledFrames += 1;
      const inner = document.querySelector<HTMLElement>("#gameport .BufferWindowInner");
      if (inner) {
        const style = getComputedStyle(inner);
        if (style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0) state.exposedFrames += 1;
      }
      state.raf = requestAnimationFrame(sample);
    };
    state.raf = requestAnimationFrame(sample);
    (window as typeof window & { AMFVExposureSampler?: typeof state }).AMFVExposureSampler = state;
  });
  await commandInput.fill("PEOF");
  await page.getByRole("button", { name: /送信/ }).click();

  await expect(presentation.locator(".story-presentation-command")).toHaveText(/PEOF/);
  await expect(presentation.locator(".story-presentation-command")).toHaveAttribute("lang", "en");
  await expect(presentation.locator(".story-presentation-title", { hasText: "ペレルマン博士のオフィス" }).last()).toHaveText("ペレルマン博士のオフィス");
  await expect(presentation.locator(".story-presentation-prose", { hasText: "エイブラハム・ペレルマン博士" })).toHaveCount(1);
  await expect(presentation).toContainText("ペレルマン博士は机に向かい、仕事をしている。");
  await expect(page.locator(".location-block")).toContainText("ペレルマン博士のオフィス");
  await expect(companion.getByRole("heading", { name: "ペレルマン博士のオフィス" })).toBeVisible();
  await expect(companion.getByRole("button", { name: /PEOF ペレルマン博士のオフィス 接続済み/ })).toBeVisible();
  await expect(presentation).toContainText("通信モードに入りました");
  const guidedSceneActions = page.getByRole("region", { name: "この場面で言及された語" });
  await expect(guidedSceneActions).toBeVisible();
  await expect(guidedSceneActions).toHaveAttribute("lang", "ja");
  await expect(guidedSceneActions.locator(".scene-actions-heading span")).toHaveText("試してみる");
  await expect(guidedSceneActions.locator(".scene-actions-heading small")).toHaveText("選ぶとコマンドを下書きします");
  await expect(guidedSceneActions.getByRole("button")).toHaveCount(6);
  for (const name of ["ペレルマン博士話す", "机調べる", "デコーダー読む", "地図読む", "ペン調べる", "雑誌記事読む"]) {
    await expect(guidedSceneActions.getByRole("button").filter({ hasText: name })).toBeVisible();
  }
  const commandsBeforeDraft = await presentation.locator(".story-presentation-command").count();
  await guidedSceneActions.getByRole("button").filter({ hasText: "ペレルマン博士話す" }).click();
  await expect(commandInput).toHaveValue("perelman, hello");
  await expect(commandInput).toBeFocused();
  await expect(presentation.locator(".story-presentation-command")).toHaveCount(commandsBeforeDraft);

  await settings.getByRole("button", { name: "アクションメニュー" }).click();
  const actionMenus = page.getByRole("region", { name: "この場面で言及された対象へのアクション" });
  await expect(actionMenus).toBeVisible();
  await expect(actionMenus.locator(".scene-actions-heading span")).toHaveText("この場面で");
  await expect(actionMenus.locator(".scene-actions-heading small")).toHaveText("原作に用意されたアクション");
  const expectedActions = [
    ["ペレルマン博士", ["話す", "調べる"]],
    ["机", ["調べる", "中をのぞく"]],
    ["デコーダー", ["調べる", "読む"]],
    ["地図", ["調べる", "読む"]],
    ["ペン", ["調べる"]],
    ["雑誌記事", ["調べる", "読む"]],
  ] as const;
  for (const [name, labels] of expectedActions) {
    const object = actionMenus.locator(".scene-object", { has: page.getByText(name, { exact: true }) });
    await expect(object.getByRole("button")).toHaveText(labels);
  }
  await actionMenus.locator(".scene-object", { has: page.getByText("机", { exact: true }) }).getByRole("button", { name: "中をのぞく" }).click();
  await expect(presentation.locator(".story-presentation-command").last()).toHaveText(/^> LOOK INSIDE DESK$/i);
  await expect(frame.getByLabel("Current game prompt")).toHaveText(">");
  await expect(frame.locator(".GridWindow")).toContainText(/Dr\. Perelman's Office/i);
  await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("aria-hidden", "true");
  await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("inert", "");
  const exposure = await frame.locator("body").evaluate(() => {
    const state = (window as typeof window & { AMFVExposureSampler?: { exposedFrames: number; sampledFrames: number; raf: number } }).AMFVExposureSampler;
    if (!state) return null;
    cancelAnimationFrame(state.raf);
    return { exposedFrames: state.exposedFrames, sampledFrames: state.sampledFrames };
  });
  expect(exposure?.sampledFrames).toBeGreaterThan(0);
  expect(exposure?.exposedFrames).toBe(0);
  await attachPayload(testInfo, frame);

  await commandInput.fill("SCORE");
  await page.getByRole("button", { name: /送信/ }).click();
  await expect(presentation).toContainText(/I don't know the word "score\."/i);
  await expect(presentation.locator(".story-presentation-command")).toContainText(["PEOF", "SCORE"]);

  await settings.getByRole("button", { name: "English" }).click();
  const englishActionMenus = page.getByRole("region", { name: "Actions for things mentioned here" });
  await expect(englishActionMenus).toBeVisible();
  await expect(englishActionMenus.locator(".scene-object", { has: page.getByText("Dr. Perelman", { exact: true }) }).getByRole("button")).toHaveText(["Talk", "Examine"]);
  await expect(presentation).toBeHidden();
  await expect(frame.locator(".BufferWindowInner")).not.toHaveAttribute("inert", "");
  const canonicalInput = frame.locator("textarea.Input.LineInput");
  await canonicalInput.fill("LOOK");
  await canonicalInput.press("Enter");
  await expect.poll(async () => frame.locator("#gameport .BufferLine").allTextContents())
    .toEqual(expect.arrayContaining([expect.stringMatching(/LOOK/i)]));
  await settings.getByRole("button", { name: "日本語" }).click();
  await expect(presentation.locator(".story-presentation-title", { hasText: "ペレルマン博士のオフィス" }).last()).toHaveText("ペレルマン博士のオフィス");
  await expect(presentation).toContainText(/LOOK/i);
  await settings.getByRole("button", { name: "English" }).click();
  await expect(presentation).toBeHidden();
  await expect(frame.locator(".BufferWindowInner")).not.toHaveAttribute("inert", "");
  await expect(canonicalInput).toBeVisible();
  await expect(canonicalInput).toBeEnabled();

  await testInfo.attach("localized-peof-scene", { body: await page.screenshot(), contentType: "image/png" });
});
