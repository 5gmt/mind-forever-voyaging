import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("amfv:locale", "ja");
    localStorage.setItem("amfv:interaction-level", "guided");
  });
});

test("a persisted Japanese fresh state localizes the inert identity rail and shared shell", async ({ page }) => {
  await page.goto("/");

  const introduction = page.getByRole("dialog", { name: "A Mind Forever Voyaging" });
  await expect(introduction).toBeVisible();

  const rail = page.locator(".identity-rail");
  const shell = page.locator(".experience-shell");
  await expect(rail).toHaveAttribute("aria-labelledby", "identity-rail-label");
  await expect(rail.locator("#identity-rail-label")).toHaveText("作品情報");
  await expect(rail.locator("#identity-rail-label")).toHaveAttribute("lang", "ja");
  await expect(rail).toHaveAttribute("aria-hidden", "true");
  await expect(rail).toHaveAttribute("inert", "");
  await expect(shell).toHaveAttribute("aria-labelledby", "experience-shell-label");
  await expect(shell.locator("#experience-shell-label")).toHaveText("インタラクティブな物語");
  await expect(shell.locator("#experience-shell-label")).toHaveAttribute("lang", "ja");
  await expect(shell).toHaveAttribute("aria-hidden", "true");
  await expect(shell).toHaveAttribute("inert", "");

  const wordmark = rail.locator(".wordmark");
  await expect(wordmark).toHaveAttribute("aria-label", "作品名と版の情報を開く");
  await expect(wordmark.locator("span")).toHaveCount(3);
  expect(await wordmark.locator("span").evaluateAll((elements) => elements.map((element) => element.getAttribute("lang")))).toEqual(["en", "en", "en"]);
  await expect(rail.locator(".edition-mark")).toHaveText("インタラクティブ小説 · Release 79");
  await expect(rail.locator(".era-caption")).toHaveText("通信チャンネル");
  await expect(rail.locator(".carrier-readout")).toContainText("搬送波");
  await expect(rail.locator(".carrier-readout")).toContainText("受信中");
  await expect(rail.locator(".rail-footer > span")).toHaveText("RELEASE 79 · SERIAL 851122");
  await expect(rail.locator(".rail-footer > span")).toHaveAttribute("lang", "en");
  await expect(rail.getByRole("button", { name: "この版について", includeHidden: true })).toHaveCount(1);
  await expect(page.locator(".skip-link")).toHaveText("ストーリー操作へスキップ");
  await expect(page.locator(".skip-link")).toHaveAttribute("href", "#command-input");
  await expect(page.locator(".system-state")).toHaveText(/初期化中|キー入力待機中|入力待機中|処理中/);
  await expect(page.locator('iframe[src="/player.html"]')).toHaveAttribute("title", "A Mind Forever Voyaging — オリジナル版 Release 79");
  await expect(page.locator('iframe[src="/player.html"]')).toHaveAttribute("aria-labelledby", "canonical-story-label");
  const canonicalLabel = page.locator("#canonical-story-label");
  await expect(canonicalLabel).toHaveAttribute("lang", "ja");
  await expect(canonicalLabel.locator('[lang="en"]')).toHaveText(["A Mind Forever Voyaging", "Release 79"]);
  expect(await rail.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  expect(await page.locator(".console-header").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test("Japanese opening, Communications, and PEOF copy restores exactly to English", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await page.getByRole("dialog", { name: "A Mind Forever Voyaging" }).getByRole("button", { name: "始める · ガイド付き" }).click();

  const rail = page.getByRole("complementary", { name: "作品情報" });
  const continueButton = page.getByRole("button", { name: /原作を始める/ });
  await expect(continueButton).toBeEnabled({ timeout: 30_000 });
  await expect(page.locator(".system-state")).toContainText("キー入力待機中");
  await continueButton.click();

  const commandInput = page.locator("#command-input");
  await expect(commandInput).toBeEnabled({ timeout: 30_000 });
  await expect(rail).toContainText("識別名");
  await expect(rail).toContainText("PRISM");
  await expect(rail).toContainText(/通信機能稼働中|認知システム稼働中/);
  await expect(rail).toContainText("現在のモード");
  await expect(rail.locator(".mode-readout")).toHaveText("通信");
  await expect(page.locator(".system-state")).toContainText("入力待機中");

  await commandInput.fill("PEOF");
  await page.getByRole("button", { name: /送信/ }).click();
  const location = page.locator(".location-block");
  await expect(location).toContainText("アウトレット PEOF");
  await expect(location.locator(":scope > span").last()).toHaveAttribute("lang", "ja");
  await expect(location.getByText("PEOF", { exact: true })).toHaveAttribute("lang", "en");
  const activePrompt = page.frameLocator('iframe[src="/player.html"]').getByLabel("現在のゲームプロンプト");
  await expect(activePrompt).toHaveText(">");
  await expect(activePrompt).toHaveAttribute("lang", "ja");

  const aboutRelease = rail.getByRole("button", { name: "この版について" });
  await aboutRelease.focus();
  await aboutRelease.press("Enter");
  await expect(page.getByRole("complementary", { name: "読者ガイド" })).toBeVisible();
  await page.getByRole("button", { name: "読書とプレイの設定" }).click();
  let settings = page.getByRole("region", { name: "読書とプレイの設定" });
  await settings.getByRole("button", { name: "English" }).click();

  const englishRail = page.getByRole("complementary", { name: "Story context" });
  await expect(englishRail.getByRole("button", { name: "Open title and edition information" })).toBeVisible();
  await expect(englishRail.locator(".edition-mark")).toHaveText("INTERACTIVE NOVEL · RELEASE 79");
  await expect(englishRail.locator(".mode-readout")).toHaveText("Communications");
  await expect(page.locator("#experience-shell-label")).toHaveText("Interactive story");
  await expect(page.locator(".skip-link")).toHaveText("Skip to interaction controls");
  await expect(page.locator('iframe[src="/player.html"]')).toHaveAttribute("title", "A Mind Forever Voyaging — canonical Release 79 story");

  await englishRail.getByRole("button", { name: "Open title and edition information" }).click();
  await page.getByRole("dialog", { name: "A Mind Forever Voyaging" }).getByRole("button", { name: "Return to story" }).click();
  await expect(commandInput).toBeFocused();
  settings = page.getByRole("region", { name: "Reading and play settings" });
  await settings.getByRole("button", { name: "日本語" }).click();
  await page.getByRole("button", { name: "作品名と版の情報を開く" }).click();
  await page.getByRole("dialog", { name: "A Mind Forever Voyaging" }).getByRole("button", { name: "物語に戻る" }).click();
  await expect(commandInput).toBeFocused();
  settings = page.getByRole("region", { name: "読書とプレイの設定" });
  await settings.getByRole("button", { name: "English" }).click();
  await page.getByRole("button", { name: "Open title and edition information" }).click();
  await page.getByRole("dialog", { name: "A Mind Forever Voyaging" }).getByRole("button", { name: "Return to story" }).click();
  await expect(commandInput).toBeFocused();
});

test("stateful controls preserve canonical transport and excluded English boundaries", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await page.getByRole("dialog", { name: "A Mind Forever Voyaging" }).getByRole("button", { name: "始める · ガイド付き" }).click();
  const continueButton = page.getByRole("button", { name: /原作を始める/ });
  await expect(continueButton).toBeEnabled({ timeout: 30_000 });
  await continueButton.click();
  await expect(page.locator("#command-input")).toBeEnabled({ timeout: 30_000 });

  const frame = page.frameLocator('iframe[src="/player.html"]');
  await frame.locator("body").evaluate(() => {
    const state = window as typeof window & { AMFVObservedCommands?: string[]; AMFVParentPost?: typeof window.parent.postMessage };
    state.AMFVObservedCommands = [];
    state.AMFVParentPost = window.parent.postMessage.bind(window.parent);
    window.parent.postMessage = ((message: unknown, targetOrigin: string) => {
      const bridgeMessage = message as { channel?: string; type?: string };
      if (bridgeMessage?.channel === "amfv:bridge" && bridgeMessage?.type === "transcript") return;
      state.AMFVParentPost?.(message, targetOrigin);
    }) as typeof window.parent.postMessage;
    window.addEventListener("message", (event) => {
      if (event.data?.channel === "amfv:bridge" && event.data?.type === "command") state.AMFVObservedCommands?.push(event.data.command);
    });
  });
  const report = async (text: string, statusText = "Mode: Communications Mode") => frame.locator("body").evaluate((_body, { text, statusText }) => {
    const state = window as typeof window & { AMFVParentPost?: typeof window.parent.postMessage };
    state.AMFVParentPost?.({
      channel: "amfv:bridge",
      type: "transcript",
      text,
      recentText: text,
      statusText,
      inputKind: "line",
      acceptsInput: true,
    }, window.location.origin);
  }, { text, statusText });
  const observedCommands = () => frame.locator("body").evaluate(() => (window as typeof window & { AMFVObservedCommands?: string[] }).AMFVObservedCommands ?? []);

  await report("Do you want to quit? (y/n)");
  const answers = page.getByRole("group", { name: "質問に答える" });
  await expect(answers).toHaveAttribute("lang", "ja");
  await expect(answers).toContainText("回答");
  await answers.getByRole("button", { name: "いいえ" }).click();
  await expect.poll(observedCommands).toContain("n");

  await report("PRISM confirms you are a computer. Library Mode and Interface Mode are available.");
  const eraCaption = page.locator(".era-caption");
  await expect(eraCaption).toHaveText("PRISM / オンライン");
  await expect(eraCaption.getByText("PRISM", { exact: true })).toHaveAttribute("lang", "en");
  const awakenedHeader = page.locator(".location-block .section-kicker");
  await expect(awakenedHeader).toHaveText("PRISM オンライン");
  await expect(awakenedHeader.getByText("PRISM", { exact: true })).toHaveAttribute("lang", "en");
  const actions = page.locator(".quick-actions");
  const library = actions.getByRole("button", { name: "ライブラリを開く" });
  const interfaces = actions.getByRole("button", { name: "インターフェースを確認" });
  await expect(library).toHaveAttribute("lang", "ja");
  await expect(interfaces).toHaveAttribute("lang", "ja");
  await library.click();
  await expect.poll(observedCommands).toContain("enter library mode");
  await report("PRISM confirms you are a computer. Library Mode and Interface Mode are available.");
  await interfaces.click();
  await expect.poll(observedCommands).toContain("enter interface mode");

  await report("PRISM confirms you are a computer. Library Mode is active.", "Mode: Library Mode");
  await expect(page.locator(".mode-readout")).toHaveText("Library");
  await expect(page.locator(".mode-readout")).toHaveAttribute("lang", "en");
  await report("Part II and all evidence simulations unlocked", "Mode: Communications Mode");
  await expect(eraCaption).toHaveText("SIMULATION / ARCHIVE");
  await expect(eraCaption).toHaveAttribute("lang", "en");
  await expect(page.locator(".location-block .section-kicker")).toHaveAttribute("lang", "en");

  await report("Do you want to quit? (y/n)");
  await page.getByRole("group", { name: "質問に答える" }).getByRole("button", { name: "はい" }).click();
  await expect.poll(observedCommands).toContain("y");
});
