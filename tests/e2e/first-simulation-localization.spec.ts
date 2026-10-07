import { expect, test, type Locator, type Page } from "@playwright/test";
import { acceptNewspaperFieldwork } from "./newspaper-acceptance";

const SECURITY_COLORS = [
  "WHITE", "DARK GREEN", "DARK BLUE", "PINK", "ORANGE", "PURPLE", "TAN", "AQUA",
  "LIGHT BLUE", "LIGHT GREEN", "LIGHT GRAY", "YELLOW", "BLACK", "DARK GRAY", "BROWN", "RED",
] as const;
const SECURITY_INNER = [89, 61, 50, 18, 29, 82, 46, 77, 27, 68, 22, 95, 40, 58, 15, 86, 28, 33, 94, 11, 64, 98, 34, 49, 60, 16, 85, 52, 37, 53, 93, 91] as const;
const SECURITY_OUTER = [12, 66, 73, 36, 90, 41, 19, 48, 62, 92, 55, 23, 84, 99, 57, 20, 78, 67, 51, 88, 17, 31, 70, 39, 96, 25, 81, 83, 47, 54, 13, 43] as const;
const ASSIGNMENTS = [
  "レストランで食事をすること", "政府職員と話すこと", "発電施設を訪れること",
  "新聞を読むこと", "何らかの公共交通機関に乗ること", "開廷中の裁判を傍聴すること",
  "教会関係者と話すこと", "映画を見に行くこと", "自分の家、または居住区を訪れること",
] as const;
const TIME_PASSES = "時間が過ぎていく……";
const SECRETARY = "ペレルマンの秘書、アリソン・プライスが戸口からひょいと顔をのぞかせる。「ねえ博士！　今夜、ほかに何か用はある？」ペレルマンはにやりとして答える。「その反則なくらいハンサムなご亭主を捨てる気になったのなら話は別だがね」明らかに聞き飽きた冗談に、彼女はうんざりした顔で、脅すふりをして拳を振る。「冗談はさておき、本当にもう大丈夫だよ」とペレルマン。「さあ、帰った帰った」彼女は姿を消し、隣の部屋から声を張り上げる。「おやすみ、博士。あんまり遅くまで残らないでね！」";
const STAFF_ARRIVAL = "PRISMプロジェクトのスタッフが駆け込んできて、ペレルマンにメモを手渡すと立ち去る。メモに目を通したペレルマンは、あなたの視界の外へ歩いていく。しばらくして、スイッチを入れたようなカチッという音が聞こえる。";
const BRIEF_INTRO = "通信回線からメッセージが流れ始める。「ペレルマンからPRISMへ。プログラミング・チームがプランのパラメーター入力を完了した。いよいよだ――いつでもシミュレーション・モードに入れる。社会科学グループが記録すべき項目のリストをまとめた。";
const BRIEF_OUTRO = "なお、シミュレーション・コントローラーが進行中に大量のデータ処理を行うため、シミュレーションはリアルタイムで進むようだ――向こうでの1分が、こちらでの約1分に相当する。それでは、健闘を祈る！」";
const PERELMAN_RETURN = "しばらくして、ペレルマンがあなたの視界に戻ってくる。";

type ExpectedBlock = { kind: "command" | "title" | "prose" | "spacer" | "list"; text?: string; items?: readonly string[]; lang?: "en" };

const startJapaneseStory = async (page: Page, controls: "classic" | "guided" | "actions") => {
  await page.goto("/");
  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  const continueButton = page.getByRole("button", { name: /Begin the original story|原作を始める/i });
  await expect(introduction.or(continueButton)).toBeVisible({ timeout: 60_000 });
  if (!(await continueButton.isVisible())) await introduction.getByRole("button", { name: /^Begin/ }).click();
  await expect(continueButton).toBeEnabled({ timeout: 60_000 });
  await page.getByTitle("Reading and play settings").click();
  const settings = page.getByRole("region", { name: /Reading and play settings|読書とプレイの設定/ });
  await settings.getByRole("button", { name: controls === "classic" ? "Classic" : controls === "guided" ? "Guided" : "Action menus" }).click();
  await settings.getByRole("button", { name: "日本語" }).click();
  await page.getByTitle("読書とプレイの設定").click();
  await expect(settings).toBeHidden();
  await page.getByRole("button", { name: /原作を始める/ }).click();
  const frame = page.frameLocator('iframe[src="/player.html"]');
  const presentation = frame.getByRole("log", { name: "日本語ストーリー表示" });
  await expect(presentation).toContainText("通信モードに入りました");
  return { frame, presentation, input: page.locator("#command-input") };
};

const send = async (page: Page, input: ReturnType<Page["locator"]>, command: string) => {
  await expect(input).toBeEnabled();
  await input.fill(command);
  await page.getByRole("button", { name: /送信/ }).click();
};

const expectNewBlocks = async (
  presentation: Locator,
  previousCount: number,
  expected: readonly ExpectedBlock[],
) => {
  const blocks = presentation.locator(".story-presentation-content > *");
  await expect(blocks).toHaveCount(previousCount + expected.length);
  const actual = await blocks.evaluateAll((elements, start) => elements.slice(start).map((element) => ({
    kind: element.className.replace("story-presentation-", ""),
    text: element.textContent ?? "",
    lang: element.getAttribute("lang"),
    items: [...element.querySelectorAll("li")].map((item) => item.textContent ?? ""),
  })), previousCount);
  expect(actual).toEqual(expected.map((block) => ({
    kind: block.kind,
    text: block.kind === "command" ? `> ${block.text}` : block.text ?? "",
    lang: block.kind === "command" ? "en" : block.lang ?? null,
    items: block.items ? [...block.items] : [],
  })));
};

const expectNewBlocksWithCanonicalTail = async (
  presentation: Locator,
  previousCount: number,
  expected: readonly ExpectedBlock[],
  canonicalFallbackIndexes: readonly number[] = [],
) => {
  const blocks = presentation.locator(".story-presentation-content > *");
  await expect(blocks.nth(previousCount + expected.length - 1)).toBeVisible();
  const actual = await blocks.evaluateAll((elements, start) => elements.slice(start).map((element) => ({
    kind: element.className.replace("story-presentation-", ""),
    text: element.textContent ?? "",
    lang: element.getAttribute("lang"),
    items: [...element.querySelectorAll("li")].map((item) => item.textContent ?? ""),
  })), previousCount);
  const expectedBlocks = expected.map((block) => ({
    kind: block.kind,
    text: block.kind === "command" ? `> ${block.text}` : block.text ?? "",
    lang: block.kind === "command" ? "en" : block.lang ?? null,
    items: block.items ? [...block.items] : [],
  }));
  for (const [index, expectedBlock] of expectedBlocks.entries()) {
    const actualBlock = actual[index];
    if (canonicalFallbackIndexes.includes(index) && actualBlock.text !== expectedBlock.text) {
      expect(actualBlock).toMatchObject({ kind: expectedBlock.kind, lang: "en", items: [] });
      expect(actualBlock.text).not.toBe("");
    } else {
      expect(actualBlock).toEqual(expectedBlock);
    }
  }
  const tail = actual.slice(expected.length);
  expect(tail.length % 2).toBe(0);
  for (let index = 0; index < tail.length; index += 2) {
    expect(tail[index]).toMatchObject({ kind: "prose", lang: "en" });
    expect(tail[index].text).not.toBe("");
    expect(tail[index + 1]).toEqual({ kind: "spacer", text: "", lang: null, items: [] });
  }
};

for (const controls of ["classic", "guided", "actions"] as const) {
  test(`${controls} completes the localized Simulation Mode and Courthouse-to-Newspaper fieldwork`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    const { frame, presentation, input } = await startJapaneseStory(page, controls);
    await send(page, input, "PEOF");
    await expect(presentation).toContainText("ペレルマン博士は机に向かい、仕事をしている。");

    const waitTurns: readonly (readonly ExpectedBlock[])[] = [
      [
        { kind: "command", text: "WAIT" },
        { kind: "prose", text: TIME_PASSES },
        { kind: "spacer" },
      ],
      [
        { kind: "command", text: "WAIT" },
        { kind: "prose", text: TIME_PASSES },
        { kind: "spacer" },
        { kind: "prose", text: SECRETARY },
        { kind: "spacer" },
      ],
      [
        { kind: "command", text: "WAIT" },
        { kind: "prose", text: TIME_PASSES },
        { kind: "spacer" },
      ],
      [
        { kind: "command", text: "WAIT" },
        { kind: "prose", text: TIME_PASSES },
        { kind: "spacer" },
        { kind: "prose", text: STAFF_ARRIVAL },
        { kind: "spacer" },
        { kind: "prose", text: BRIEF_INTRO },
        { kind: "list", text: ASSIGNMENTS.join(""), items: ASSIGNMENTS },
        { kind: "prose", text: BRIEF_OUTRO },
        { kind: "spacer" },
        { kind: "prose", text: PERELMAN_RETURN },
        { kind: "spacer" },
      ],
    ];
    for (const expectedBlocks of waitTurns) {
      const blockCount = await presentation.locator(".story-presentation-content > *").count();
      await send(page, input, "WAIT");
      await expectNewBlocks(presentation, blockCount, expectedBlocks);
    }

    if (controls !== "classic") {
      const ready = page.getByRole("region", { name: "Simulation Mode が利用できます" });
      await expect(ready).toContainText("依頼された観察を始める");
      await ready.getByRole("button", { name: "Simulation Mode に入る" }).click();
    } else {
      await send(page, input, "ENTER SIMULATION MODE");
    }
    const prompt = presentation.locator(".story-presentation-prompt").last();
    await expect(prompt).toContainText("シミュレーション・モードはクラス1セキュリティ・モードです。");
    const promptText = await prompt.innerText();
    const match = promptText.match(/(WHITE|DARK GREEN|DARK BLUE|PINK|ORANGE|PURPLE|TAN|AQUA|LIGHT BLUE|LIGHT GREEN|LIGHT GRAY|YELLOW|BLACK|DARK GRAY|BROWN|RED) (\d+)$/);
    expect(match).not.toBeNull();
    const colorIndex = SECURITY_COLORS.indexOf(match![1] as typeof SECURITY_COLORS[number]);
    const innerIndex = SECURITY_INNER.indexOf(Number(match![2]) as typeof SECURITY_INNER[number]);
    expect(colorIndex).toBeGreaterThanOrEqual(0);
    expect(innerIndex).toBeGreaterThanOrEqual(0);
    const answer = SECURITY_OUTER[(2 * colorIndex + innerIndex) % SECURITY_OUTER.length];

    const answerCommandIndex = await presentation.locator(".story-presentation-command").count();
    if (controls === "classic") {
      await expect(page.locator(".security-decoder")).toHaveCount(0);
      await expect(page.locator("body")).not.toContainText(`Submit code ${answer}`);
      await send(page, input, String(answer));
    } else {
      const decoder = page.locator(".security-decoder");
      await expect(decoder).toContainText(`${colorIndex >= 0 ? match![1] : ""} · ${match![2]}`);
      await expect(decoder).toHaveAttribute("aria-label", "セキュリティコード・デコーダー");
      await decoder.getByRole("button", { name: `コード ${answer} を送信` }).click();
    }
    const answerEcho = presentation.locator(".story-presentation-command").nth(answerCommandIndex);
    await expect(answerEcho).toHaveText(`> ${answer}`);
    await expect(answerEcho).toHaveAttribute("lang", "en");

    await expect(presentation).toContainText("このシミュレーションの時代設定は、10年後です。");
    await expect(page.locator(".mode-subreadout")).toHaveText("ロックヴィル");
    await expect(page.locator(".mode-subreadout")).toHaveAttribute("lang", "ja");
    await expect(presentation.locator(".story-presentation-title", { hasText: "ケネディ公園" })).toHaveCount(1);
    const description = "ここは市街地にある小さな公園で、北東、南東、南西へ通じる門がある。公園の中央では、ジョン・F・ケネディ像を取り囲むように、自由な形の大きな水盤が広がっている。";
    await expect(presentation).toContainText(description);
    await send(page, input, "LOOK");
    await expect(presentation.locator(".story-presentation-title", { hasText: "ケネディ公園" })).toHaveCount(2);

    if (controls === "actions") {
      const launcher = page.locator(".compact-map-button");
      await launcher.click();
      const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
      await expect(drawer).toHaveAttribute("lang", "ja");
      await expect(drawer.locator('.fieldwork-drawer-tabs[aria-label="現地調査の表示"]')).toHaveCount(1);
      const checklist = drawer.getByRole("region", { name: "現地調査チェックリスト" });
      await expect(checklist.locator("li")).toHaveCount(9);
      await expect(checklist).toContainText("レストランで食事をすること");
      await expect(checklist).toContainText("自分の家、または居住区を訪れること");
      await expect(checklist).toContainText("補助的な推定です");
      const navigator = drawer.locator(".rockvil-navigator");
      await expect(navigator).toHaveAttribute("aria-label", "Navigate Rockvil using the original map");
      await expect(navigator).toHaveAttribute("lang", "en");
      const close = drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" });
      await expect(close).toBeFocused();
      await close.click();
      await expect(launcher).toBeFocused();
      await page.getByTitle("読書とプレイの設定").click();
      let settings = page.getByRole("region", { name: "読書とプレイの設定" });
      await settings.getByRole("button", { name: "English" }).click();
      await page.getByTitle("Reading and play settings").click();
      await launcher.click();
      const englishDrawer = page.getByRole("dialog", { name: "Map & recording brief" });
      await expect(englishDrawer).toHaveAttribute("lang", "en");
      await expect(englishDrawer.getByRole("region", { name: "Fieldwork checklist" })).toContainText("Eat a meal in a restaurant");
      await englishDrawer.getByRole("button", { name: "Close map and fieldwork brief" }).click();
      await page.getByTitle("Reading and play settings").click();
      settings = page.getByRole("region", { name: "Reading and play settings" });
      await settings.getByRole("button", { name: "日本語" }).click();
      await page.getByTitle("読書とプレイの設定").click();
    }

    const firstRecordBlockCount = await presentation.locator(".story-presentation-content > *").count();
    if (controls !== "classic") {
      const actions = page.locator(".quick-actions").filter({ has: page.getByRole("button", { name: "持ち物" }) });
      await expect(actions.getByRole("button", { name: "持ち物" })).toBeVisible();
      await expect(actions.getByRole("button", { name: "待つ" })).toBeVisible();
      await expect(actions.getByRole("button", { name: "中止" })).toBeVisible();
      await actions.getByRole("button", { name: "録画開始" }).click();
    } else {
      await send(page, input, "RECORD");
    }
    await expectNewBlocks(presentation, firstRecordBlockCount, [
      { kind: "command", text: "RECORD" },
      { kind: "prose", text: "記録機能を起動しました。" },
      { kind: "spacer" },
    ]);
    await expect(frame.locator(".GridWindow")).toContainText(/Simulation Mode\s*\(recording\)/i);
    await send(page, input, "WAIT");
    await expect(presentation.locator(".story-presentation-prose", { hasText: "時間が過ぎていく……" })).toHaveCount(5);
    if (controls !== "classic") {
      await page.locator(".quick-actions").getByRole("button", { name: "録画停止" }).click();
    } else {
      await send(page, input, "RECORD OFF");
    }
    await expect(presentation).toContainText("記録機能を停止しました。");
    await expect(frame.locator(".GridWindow")).toContainText(/Simulation Mode/i);
    await expect(frame.locator(".GridWindow")).not.toContainText(/\(recording\)/i);

    if (controls !== "actions") {
      const secondRecordBlockCount = await presentation.locator(".story-presentation-content > *").count();
      await send(page, input, "RECORD");
      await expectNewBlocks(presentation, secondRecordBlockCount, [
        { kind: "command", text: "RECORD" },
        { kind: "prose", text: "記録機能を起動しました。" },
        { kind: "spacer" },
      ]);
    }
    const courthouseRoute: readonly (readonly [string, readonly ExpectedBlock[], string])[] = [
      ["SW", [
        { kind: "command", text: "SW" },
        { kind: "title", text: "エルム通りとパーク通り" },
        { kind: "prose", text: "ここは南北に走るパーク通りと東西に走るエルム通りの交差点だ。北東の角には公園の入口があり、残る三つの角には古風な大建築が建っている。歩道も車道も人で混み合っている。" },
        { kind: "spacer" },
      ], "エルム通りとパーク通り"],
      ["NW", [
        { kind: "command", text: "NW" },
        { kind: "title", text: "裁判所" },
        { kind: "prose", text: "この裁判所は周辺のほかの官庁舎と同じ年代の建物で、1990年頃に建てられたものだ。出口は南東へ通じている。" },
        { kind: "spacer" },
        { kind: "prose", text: "法廷は開廷中だ。女性が軽窃盗の罪で裁判にかけられている。" },
        { kind: "spacer" },
      ], "裁判所"],
      ["LOOK", [
        { kind: "command", text: "LOOK" },
        { kind: "title", text: "裁判所" },
        { kind: "prose", text: "この裁判所は周辺のほかの官庁舎と同じ年代の建物で、1990年頃に建てられたものだ。出口は南東へ通じている。" },
        { kind: "spacer" },
        { kind: "prose", text: "法廷は開廷中だ。女性が軽窃盗の罪で裁判にかけられている。" },
        { kind: "spacer" },
      ], "裁判所"],
      ["SE", [
        { kind: "command", text: "SE" },
        { kind: "title", text: "エルム通りとパーク通り" },
        { kind: "spacer" },
      ], "エルム通りとパーク通り"],
      ["NE", [
        { kind: "command", text: "NE" },
        { kind: "title", text: "ケネディ公園" },
        { kind: "spacer" },
      ], "ケネディ公園"],
    ];
    for (const [command, expectedBlocks, place] of courthouseRoute) {
      if (controls === "actions" && command === "LOOK") {
        const reminder = page.locator(".record-reminder");
        await expect(reminder).toContainText("録画は停止中");
        await expect(reminder).toContainText("開廷中の裁判を傍聴すること");
        const recordCommandCount = await presentation.locator(".story-presentation-command").count();
        await reminder.getByRole("button", { name: "録画を開始" }).click();
        await expect(presentation.locator(".story-presentation-command").nth(recordCommandCount)).toHaveText("> RECORD");
        await expect(frame.locator(".GridWindow")).toContainText(/Simulation Mode\s*\(recording\)/i);
        await expect(input).toBeEnabled();
        await send(page, input, "RECORD OFF");
        await page.locator(".compact-map-button").click();
        const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
        await drawer.getByRole("button", { name: "RECORD を開始" }).click();
        await expect(frame.locator(".GridWindow")).toContainText(/Simulation Mode\s*\(recording\)/i);
        await drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
        await expect(input).toBeEnabled();
      }
      const blockCount = await presentation.locator(".story-presentation-content > *").count();
      await send(page, input, command);
      await expect(page.locator(".location-block strong")).toHaveText(place);
      await expectNewBlocksWithCanonicalTail(presentation, blockCount, expectedBlocks, command === "SW" ? [2] : []);
      await expect(page.locator(".location-block strong")).toHaveAttribute("lang", "ja");
    }
    await expect(frame.locator(".GridWindow")).toContainText(/Location:\s*Kennedy Park/i);
    await send(page, input, "RECORD OFF");
    await expect(presentation.locator(".story-presentation-prose", { hasText: "記録機能を停止しました。" })).toHaveCount(controls === "actions" ? 3 : 2);
    await expect(frame.locator(".GridWindow")).not.toContainText(/\(recording\)/i);
    await expect(input).toBeEnabled();
    await input.focus();
    await expect(input).toBeFocused();

    await acceptNewspaperFieldwork(page, frame, presentation, input, controls, testInfo);

    await page.getByTitle("読書とプレイの設定").click();
    const settings = page.getByRole("region", { name: "読書とプレイの設定" });
    await expect(settings).toBeVisible();
    await settings.getByRole("button", { name: "English" }).click();
    await expect(presentation).toBeHidden();
    const canonicalInput = frame.locator("textarea.Input.LineInput");
    await expect(canonicalInput).toBeEnabled();
    await canonicalInput.focus();
    await expect(canonicalInput).toBeFocused();

    const englishSettings = page.getByRole("region", { name: "Reading and play settings" });
    await englishSettings.getByRole("button", { name: "日本語" }).click();
    await expect(presentation).toContainText("記録機能を停止しました。");
    await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("aria-hidden", "true");
    await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("inert", "");
    await expect(input).toBeEnabled();
    await input.focus();
    await expect(input).toBeFocused();

    const japaneseSettings = page.getByRole("region", { name: "読書とプレイの設定" });
    await japaneseSettings.getByRole("button", { name: "English" }).click();
    await expect(presentation).toBeHidden();
    await expect(frame.locator(".BufferWindowInner")).not.toHaveAttribute("inert", "");
    await expect(canonicalInput).toBeEnabled();
    await canonicalInput.focus();
    await expect(canonicalInput).toBeFocused();

    await testInfo.attach(`first-simulation-${controls}`, { body: await page.screenshot(), contentType: "image/png" });
    await testInfo.attach(`first-simulation-${controls}-dynamic`, {
      body: JSON.stringify({ color: match![1], innerNumber: Number(match![2]) }), contentType: "application/json",
    });
  });
}

for (const checkpoint of ["opening", "Part II"] as const) {
  test(`preserves the first canonical Simulation UI after visiting QA ${checkpoint}`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    const { frame, presentation, input } = await startJapaneseStory(page, "actions");
    await send(page, input, "PEOF");
    for (let turn = 0; turn < 4; turn++) await send(page, input, "WAIT");
    await page.getByRole("button", { name: "Simulation Mode に入る" }).click();
    const decoder = page.locator(".security-decoder");
    await expect(decoder).toBeVisible();
    await decoder.getByRole("button", { name: /コード \d+ を送信/ }).click();
    await expect(page.locator(".mode-subreadout")).toHaveText("ロックヴィル");
    const canonicalStatus = await frame.locator(".GridWindow").innerText();
    const canonicalTranscript = await frame.locator(".BufferWindowInner").innerText();

    await page.getByRole("button", { name: "ガイドの表示を切り替える" }).click();
    await page.getByRole("tab", { name: "この作品について" }).click();
    await page.getByRole("button", { name: "Open spoiler/debug tools" }).click();
    await page.getByRole("button", { name: "Enable spoilers & load QA build" }).click();
    const qa = page.frameLocator('iframe[src*="qa=1"]');
    await expect(qa.locator(".BufferWindowInner")).toContainText("Tomorrow never yet", { timeout: 60_000 });
    if (checkpoint === "Part II") {
      await page.getByRole("button", { name: /Part II · all horizons/ }).click();
      await expect(page.locator(".debug-message")).toHaveText("Checkpoint ready.");
      await expect(qa.locator(".BufferWindowInner")).toContainText("QA jump: Part II");
      await send(page, input, "ENTER SIMULATION MODE");
      await decoder.getByRole("button", { name: /Submit code \d+/ }).click();
      await expect(qa.locator(".BufferWindowInner")).toContainText(/simulations are available/i);
    }
    await page.getByRole("button", { name: "Leave QA and return to canonical story" }).click();
    await expect(page.locator("main")).toHaveAttribute("data-qa", "false");
    await expect(page.locator(".mode-subreadout")).toHaveText("ロックヴィル");
    await expect(page.locator(".mode-subreadout")).toHaveAttribute("lang", "ja");
    await expect(page.locator(".mode-readout")).toHaveText("Simulation");
    await expect(page.locator(".mode-readout")).toHaveAttribute("lang", "en");
    await expect(frame.locator(".GridWindow")).toHaveText(canonicalStatus, { useInnerText: true });
    await expect(frame.locator(".BufferWindowInner")).toHaveText(canonicalTranscript, { useInnerText: true });
    await expect(presentation).toBeVisible();
    const actions = page.locator(".quick-actions");
    await expect(actions.getByRole("button", { name: "持ち物", exact: true })).toBeVisible();
    await expect(actions.getByRole("button", { name: "録画開始", exact: true })).toHaveAttribute("lang", "ja");
    await page.locator(".compact-map-button").click();
    const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
    await expect(drawer).toHaveAttribute("lang", "ja");
    await expect(drawer.locator(".fieldwork-checklist")).toContainText("開廷中の裁判を傍聴すること");
    await drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
    await testInfo.attach(`canonical-after-qa-${checkpoint}`, { body: await page.screenshot(), contentType: "image/png" });
    await actions.getByRole("button", { name: "録画開始", exact: true }).click();
    await expect(frame.locator(".GridWindow")).toContainText("(recording)");
    await expect(actions.getByRole("button", { name: "録画停止", exact: true })).toBeVisible();
  });
}

test("keeps rolling first-entry state, re-entry, unknown places, and later phases in English", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const { frame } = await startJapaneseStory(page, "actions");
  await frame.locator("body").evaluate(() => {
    const state = window as typeof window & { AMFVParentPost?: typeof window.parent.postMessage };
    state.AMFVParentPost = window.parent.postMessage.bind(window.parent);
    window.parent.postMessage = ((message: unknown, targetOrigin: string) => {
      const bridgeMessage = message as { channel?: string; type?: string };
      if (bridgeMessage?.channel === "amfv:bridge" && bridgeMessage?.type === "transcript") return;
      state.AMFVParentPost?.(message, targetOrigin);
    }) as typeof window.parent.postMessage;
  });
  const report = async (text: string, statusText: string) => frame.locator("body").evaluate((_body, payload) => {
    (window as typeof window & { AMFVParentPost?: typeof window.parent.postMessage }).AMFVParentPost?.({
      channel: "amfv:bridge",
      type: "transcript",
      text: payload.text,
      recentText: payload.text,
      statusText: payload.statusText,
      inputKind: "line",
      acceptsInput: true,
    }, window.location.origin);
  }, { text, statusText });

  await report("This simulation is based 10 years hence.\n>", "Mode: Simulation Mode Location: Unobserved Room Date: 3/10/2041");
  const longFirstEntryWindow = `${"Routine observation.\n".repeat(1200)}>`;
  await report(longFirstEntryWindow.slice(-20_000), "Mode: Simulation Mode Location: Unobserved Room Date: 3/10/2041");
  await expect(page.locator(".mode-subreadout")).toHaveText("ロックヴィル");
  await expect(page.locator(".mode-subreadout")).toHaveAttribute("lang", "ja");

  // Keep the canonical observation window truncated while visiting QA. The
  // saved first-entry discovery must survive even without its original marker.
  await page.getByRole("button", { name: "ガイドの表示を切り替える" }).click();
  await page.getByRole("tab", { name: "この作品について" }).click();
  await page.getByRole("button", { name: "Open spoiler/debug tools" }).click();
  await page.getByRole("button", { name: "Enable spoilers & load QA build" }).click();
  await expect(page.frameLocator('iframe[src*="qa=1"]').locator(".BufferWindowInner")).toContainText("Tomorrow never yet", { timeout: 60_000 });
  await page.getByRole("button", { name: "Leave QA and return to canonical story" }).click();
  await report(longFirstEntryWindow.slice(-20_000), "Mode: Simulation Mode Location: Unobserved Room Date: 3/10/2041");
  await expect(page.locator(".mode-subreadout")).toHaveText("ロックヴィル");
  await expect(page.locator(".mode-subreadout")).toHaveAttribute("lang", "ja");
  await expect(page.locator("main")).toHaveAttribute("data-phase", "field");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".open-fieldwork").click();
  const narrowDrawer = page.getByRole("dialog", { name: "地図と録画要項" });
  const narrowBody = narrowDrawer.locator(".fieldwork-drawer-body");
  const narrowNavigator = narrowDrawer.locator(".rockvil-navigator");
  await expect(narrowNavigator).toHaveAttribute("lang", "en");
  expect((await narrowNavigator.boundingBox())!.height).toBeLessThanOrEqual((await narrowBody.boundingBox())!.height);
  await narrowNavigator.getByRole("button", { name: /City Hall, fieldwork destination/ }).click();
  await expect(narrowNavigator.locator(".navigator-route-actions").getByRole("button", { name: "Clear" })).toBeVisible();
  await narrowDrawer.getByRole("tab", { name: /要項/ }).click();
  const finalAssignment = narrowDrawer.locator(".fieldwork-checklist li").last();
  await finalAssignment.scrollIntoViewIfNeeded();
  await expect(finalAssignment).toBeVisible();
  await testInfo.attach("narrow-fieldwork-drawer", { body: await page.screenshot(), contentType: "image/png" });
  await narrowDrawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
  await page.setViewportSize({ width: 1440, height: 900 });

  await frame.locator("body").evaluate(() => {
    (window as typeof window & { AMFVParentPost?: typeof window.parent.postMessage }).AMFVParentPost?.({
      channel: "amfv:bridge",
      type: "command",
      command: "RESTORE",
    }, window.location.origin);
  });
  await expect(page.locator(".mode-subreadout")).toHaveText("Rockvil");
  await expect(page.locator(".mode-subreadout")).toHaveAttribute("lang", "en");

  await report("Tomorrow never yet.\nHit any key to continue", "");
  await report("This simulation is based 10 years hence.\n>", "Mode: Simulation Mode Location: Unobserved Room Date: 3/10/2041");
  await expect(page.locator(".mode-subreadout")).toHaveText("ロックヴィル");
  await expect(page.locator(".mode-subreadout")).toHaveAttribute("lang", "ja");

  await report(">ABORT\nCommunications Mode\n>", "Mode: Communications Mode");
  const reentryTranscript = "This simulation is based 10 years hence.\n>";
  await report(reentryTranscript, "Mode: Simulation Mode Location: Unobserved Room Date: 3/10/2041");
  const actions = page.locator(".quick-actions");
  await expect(actions.getByRole("button", { name: "Look", exact: true })).toHaveAttribute("lang", "en");
  await expect(actions.getByRole("button", { name: "Record", exact: true })).toBeVisible();
  const explore = page.locator('.companion-tabs button[role="tab"]', { hasText: "Explore" });
  await expect(explore).toHaveAttribute("lang", "en");
  await expect(page.locator(".mode-subreadout")).toHaveText("Rockvil");
  await expect(page.locator(".mode-subreadout")).toHaveAttribute("lang", "en");
  await page.locator(".open-fieldwork").click();
  const reentryDrawer = page.getByRole("dialog", { name: "Map & recording brief" });
  await expect(reentryDrawer).toHaveAttribute("lang", "en");
  await expect(reentryDrawer.getByText("Unobserved Room", { exact: true })).toHaveAttribute("lang", "en");
  await expect(reentryDrawer.locator(".rockvil-navigator")).toHaveAttribute("lang", "en");
  await reentryDrawer.getByRole("button", { name: "Close map and fieldwork brief" }).click();

  await report(`${reentryTranscript}\nThe programming team has finished entering the parameters for the Plan.\n* Part II *\nSimulations are available`, "Mode: Communications Mode");
  const laterCta = page.getByRole("region", { name: "Simulation archive available" });
  await expect(laterCta).toHaveAttribute("lang", "en");
  await expect(laterCta.getByRole("button", { name: "Enter Simulation Mode" })).toBeVisible();
});
