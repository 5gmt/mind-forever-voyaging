import { expect, test, type Locator, type Page } from "@playwright/test";

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

type ExpectedBlock = { kind: "command" | "prose" | "spacer" | "list"; text?: string; items?: readonly string[] };

const startJapaneseStory = async (page: Page, controls: "classic" | "guided") => {
  await page.goto("/");
  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  const continueButton = page.getByRole("button", { name: /Begin the original story/i });
  await expect(introduction.or(continueButton)).toBeVisible({ timeout: 20_000 });
  if (!(await continueButton.isVisible())) await introduction.getByRole("button", { name: /^Begin/ }).click();
  await expect(continueButton).toBeEnabled({ timeout: 20_000 });
  await page.getByTitle("Reading and play settings").click();
  const settings = page.getByRole("region", { name: /Reading and play settings|読書とプレイの設定/ });
  await settings.getByRole("button", { name: controls === "classic" ? "Classic" : "Guided" }).click();
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
    lang: block.kind === "command" ? "en" : null,
    items: block.items ? [...block.items] : [],
  })));
};

for (const controls of ["classic", "guided"] as const) {
  test(`${controls} completes the first localized Simulation Mode recording loop`, async ({ page }, testInfo) => {
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

    await send(page, input, "ENTER SIMULATION MODE");
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
      await decoder.getByRole("button", { name: `Submit code ${answer}` }).click();
    }
    const answerEcho = presentation.locator(".story-presentation-command").nth(answerCommandIndex);
    await expect(answerEcho).toHaveText(`> ${answer}`);
    await expect(answerEcho).toHaveAttribute("lang", "en");

    await expect(presentation).toContainText("このシミュレーションの時代設定は、10年後です。");
    await expect(presentation.locator(".story-presentation-title", { hasText: "ケネディ公園" })).toHaveCount(1);
    const description = "ここは市街地にある小さな公園で、北東、南東、南西へ通じる門がある。公園の中央では、ジョン・F・ケネディ像を取り囲むように、自由な形の大きな水盤が広がっている。";
    await expect(presentation).toContainText(description);
    await send(page, input, "LOOK");
    await expect(presentation.locator(".story-presentation-title", { hasText: "ケネディ公園" })).toHaveCount(2);

    await send(page, input, "RECORD");
    await expect(presentation).toContainText("記録機能を起動しました。");
    await expect(frame.locator(".GridWindow")).toContainText(/Simulation Mode\s*\(recording\)/i);
    await send(page, input, "WAIT");
    await expect(presentation.locator(".story-presentation-prose", { hasText: "時間が過ぎていく……" })).toHaveCount(5);
    await send(page, input, "RECORD OFF");
    await expect(presentation).toContainText("記録機能を停止しました。");
    await expect(frame.locator(".GridWindow")).toContainText(/Simulation Mode/i);
    await expect(frame.locator(".GridWindow")).not.toContainText(/\(recording\)/i);
    await expect(input).toBeEnabled();
    await input.focus();
    await expect(input).toBeFocused();

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
