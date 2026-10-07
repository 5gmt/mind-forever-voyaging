import { expect, type FrameLocator, type Locator, type Page, type TestInfo } from "@playwright/test";
import { writeFile } from "node:fs/promises";

// Exact copy from the approved N2 packet, independent of the production catalog.
const ARTICLE_JA = [
  "ニュース欄のトップ記事は景気先行指数を取り上げている。前月比で驚異の9.7%上昇し、経済の力強い成長をまたしても裏づけたという。関連記事では、失業率が約30年ぶりの低水準にあることや、商業施設と住宅の建設が史上最高水準に達していることが報じられている。",
  "別の主要記事は、国境警備隊アカデミーの著名講師シリーズで行われたライダー大統領の講演を伝えている。演説で大統領は40年代を「新たな希望の10年」と呼び、その希望の多くはBSFの働きによるものだと述べた。さらに大統領は、USNAが「最大の独裁国家にも、テロリストの殺人集団の最小の一派にも、言いなりにはならない」という姿勢を全世界に示した。",
  "中面の一つには犯罪に関する詳細な報告があり、過去10年間で犯罪率全体はわずか4%しか低下していないにもかかわらず、世間では犯罪がそれ以上に大幅に減ったと受け止められていることを明らかにしている。報告は、この認識を三つの点に帰している。暴力犯罪はほかの種類の犯罪よりはるかに速く減少し、10年前より15%低下した。常に最も大きく報道されてきた学校内犯罪は40%減少した。そして何より、かつてのように法手続き上の不備や低額の保釈金、容易な仮釈放によって放免されるのとは対照的に、犯罪者にはより厳しい刑が科されている。",
  "ニュース欄のほかの記事では、インフォテックの新たな軌道工場の建設、医薬品産業の規制緩和、トルコでの戦争、月面採掘事業の計画が取り上げられている。社説は、刑務所の過密を緩和するため、徴兵委員会の要件を緩和するよう求めている。"
] as const;
const ARTICLE_EN = [
  "The headline story in the news section is about the Index of Leading Economic Indicators, which are up a stunning 9.7% over last month, yet another indication of the economy's robust performance. Related stories discuss the unemployment rate, which is at the lowest level in almost thirty years, and commercial and housing construction, which are at an all-time high.",
  "Another major story covers President Ryder's speech for the Distinguished Lecturer Series of the Border Security Force Academy. In his address, the President called the '40s a \"decade of new hope,\" and attributed much of that new hope to the work of the BSF, sending a signal to the entire world that the USNA \"won't be pushed around by the biggest dictatorship or the smallest band of terrorist murderers.\"",
  "On one of the inside pages, an in-depth report on crime reveals that, although the overall crime rate has dropped only 4% over the last decade, public perception is that crime has fallen much further. The report attributes this perception to three points: Violent crime has decreased much faster than other types of crime, and is down by 15% from ten years ago. Crime in the schools, which has always gotten the most publicity, has dropped by 40%. Most importantly, offenders are getting harsher sentences, as opposed to the old days of getting off on technicalities, low bail, and easy parole.",
  "Other stories in the news section deal with the construction of a new InfoTech orbiting factory, deregulation of the medicinal drug industry, the war in Turkey, and plans for a lunar mining operation. An editorial calls for lowering draft board requirements in order to ease prison overcrowding."
] as const;

const inputLineId = async (frame: FrameLocator) => frame.locator("body").evaluate(() => {
  const bridge = (window as typeof window & {
    AMFVPresentationBridge?: {
      extract: (documentRoot: Document, getStyle: typeof getComputedStyle) => {
        lines: { id: string }[];
        activeInput: { kind: string; line: number } | null;
      };
    };
  }).AMFVPresentationBridge;
  const snapshot = bridge?.extract(document, getComputedStyle);
  return snapshot?.activeInput?.kind === "line" ? snapshot.lines[snapshot.activeInput.line]?.id ?? null : null;
});

export const acceptNewspaperFieldwork = async (
  page: Page, frame: FrameLocator, presentation: Locator, input: Locator,
  controls: string, testInfo: TestInfo,
) => {
  const attach = async (name: string, evidence: { body: string | Buffer; contentType: string }) => {
    const extension = evidence.contentType === "image/png" ? "png" : evidence.contentType === "application/json" ? "json" : "txt";
    const path = testInfo.outputPath(`${name}.${extension}`);
    await writeFile(path, evidence.body);
    await testInfo.attach(name, { path, contentType: evidence.contentType });
  };
  const blocks = presentation.locator(".story-presentation-content > *");
  const status = frame.locator(".GridWindow");
  const canonical = frame.locator(".BufferWindowInner");
  const canonicalInput = frame.locator("textarea.Input.LineInput");
  const surface = presentation.locator(".story-presentation-scroll");
  const sendTurn = async (command: string) => {
    await expect.poll(() => inputLineId(frame)).not.toBeNull();
    const previousInput = await inputLineId(frame);
    const previousCount = await blocks.count();
    await input.fill(command);
    await page.getByRole("button", { name: /^送信/ }).click();
    await expect(blocks.nth(previousCount)).toHaveText(`> ${command}`);
    await expect.poll(async () => {
      const nextInput = await inputLineId(frame);
      return nextInput !== null && nextInput !== previousInput;
    }).toBe(true);
    await expect(input).toBeEnabled();
    return { previousInput, nextInput: await inputLineId(frame), previousCount };
  };

  await sendTurn("INVENTORY");
  const activation = await sendTurn("RECORD");
  await expect(blocks.nth(activation.previousCount + 1)).toHaveText("記録機能を起動しました。");
  await expect(status).toContainText(/Simulation Mode\s*\(recording\)/i);
  for (const [command, place] of [
    ["NE", "メイン通りとケネディ通り"],
    ["N", "センター通りとケネディ通り"],
    ["NE", "ボダンスキー広場"],
  ] as const) {
    await sendTurn(command);
    await expect(page.locator(".location-block strong")).toHaveText(place);
  }
  const purchase = await sendTurn("BUY NEWSPAPER");
  await expect(blocks.nth(purchase.previousCount + 1)).toHaveText("新聞販売機にカードを差し込む。表示に「NEW BALANCE: $599」と点滅し、新聞が一部、手元へ飛び出してくる。");
  await expect(status).toContainText(/Simulation Mode\s*\(recording\)/i);
  const statusBeforeRead = await status.innerText();
  const read = await sendTurn("READ NEWSPAPER");
  await expect(status).toContainText(/Simulation Mode\s*\(recording\)/i);
  const statusAfterRead = await status.innerText();

  // Scope the complete ordered paragraphs and blank lines to this READ turn.
  const expectArticle = async () => {
    await expect(blocks.nth(read.previousCount + 8)).toHaveClass("story-presentation-spacer");
    expect(await blocks.evaluateAll((elements, start) => elements.slice(start, start + 9).map((element) => ({
      kind: element.className, text: element.textContent,
    })), read.previousCount)).toEqual([
      { kind: "story-presentation-command", text: "> READ NEWSPAPER" },
      ...ARTICLE_JA.flatMap((text) => [
        { kind: "story-presentation-prose", text },
        { kind: "story-presentation-spacer", text: "" },
      ]),
    ]);
  };
  await expectArticle();
  const paragraphs = ARTICLE_JA.map((_, index) => blocks.nth(read.previousCount + 1 + index * 2));
  const lastTextVisible = () => paragraphs.at(-1)!.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const end = [...range.getClientRects()].at(-1);
    if (!end || end.width <= 0) return false;
    const viewport = { top: 0, left: 0, right: innerWidth, bottom: innerHeight };
    // Range rectangles include clipped text. Intersect every clipping ancestor,
    // including the paragraph itself, rather than accepting its layout bounds.
    for (let node: Element | null = element; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      const box = node.getBoundingClientRect();
      if (/hidden|clip|auto|scroll/.test(style.overflowY)) {
        viewport.top = Math.max(viewport.top, box.top + node.clientTop);
        viewport.bottom = Math.min(viewport.bottom, box.top + node.clientTop + node.clientHeight);
      }
      if (/hidden|clip|auto|scroll/.test(style.overflowX)) {
        viewport.left = Math.max(viewport.left, box.left + node.clientLeft);
        viewport.right = Math.min(viewport.right, box.left + node.clientLeft + node.clientWidth);
      }
    }
    return end.top >= viewport.top && end.bottom <= viewport.bottom
      && end.left >= viewport.left && end.right <= viewport.right;
  });
  const readToEnd = async (label: string) => {
    await paragraphs[0].evaluate((element) => element.scrollIntoView({ block: "start" }));
    // On a tall viewport all four paragraphs can already fit at the tail.
    // Start earlier in the history so reaching the editorial requires a wheel.
    await surface.evaluate((element) => { element.scrollTop = Math.max(0, element.scrollTop - element.clientHeight / 2); });
    await expect(paragraphs[0]).toBeInViewport();
    const startTop = await surface.evaluate((element) => element.scrollTop);
    await surface.hover();
    for (let step = 0; step < 12 && !(await lastTextVisible()); step++) {
      const previousTop = await surface.evaluate((element) => element.scrollTop);
      await page.mouse.wheel(0, 180);
      await expect.poll(() => surface.evaluate((element) => element.scrollTop)).toBeGreaterThan(previousTop);
    }
    expect(await surface.evaluate((element) => element.scrollTop)).toBeGreaterThan(startTop);
    await expect.poll(lastTextVisible).toBe(true);
    await expect(paragraphs.at(-1)!).toBeInViewport();
    await expect(page.locator('iframe[src="/player.html"]')).toBeInViewport({ ratio: 1 });
    await expect(input).toBeVisible();
    await expect(input).toBeInViewport({ ratio: 1 });
    await input.click();
    await expect(input).toBeFocused();
    await input.fill("LOOK");
    await expect(input).toHaveValue("LOOK");
    await expect(page.getByRole("button", { name: /^送信/ })).toBeEnabled();
    await attach(`newspaper-${controls}-${label}`, { body: await page.screenshot(), contentType: "image/png" });
    await attach(`newspaper-${controls}-${label}-scroll`, {
      body: JSON.stringify({ startTop, ...(await surface.evaluate((element) => ({
        endTop: element.scrollTop, scrollHeight: element.scrollHeight, clientHeight: element.clientHeight,
      }))), editorialEndVisible: await lastTextVisible(), inputLine: await inputLineId(frame) }), contentType: "application/json",
    });
  };
  const expectJapaneseOwner = async () => {
    await expect(presentation).toBeVisible();
    await expect(presentation).toHaveAttribute("lang", "ja");
    await expect(canonical).toHaveAttribute("aria-hidden", "true");
    await expect(canonical).toHaveAttribute("inert", "");
    const accessibility = await frame.locator("body").ariaSnapshot();
    for (const text of ARTICLE_JA) expect(accessibility.split(text)).toHaveLength(2);
    for (const text of ARTICLE_EN) expect(accessibility).not.toContain(text);
    await attach(`newspaper-${controls}-ja-accessibility`, { body: accessibility, contentType: "text/plain" });
  };
  await expectJapaneseOwner();
  await readToEnd("ja-editorial");

  // Toggle while still reading, with an editable draft and the same canonical input.
  const transcript = await canonical.innerText();
  const readingInput = await inputLineId(frame);
  const historyCount = await blocks.count();
  const setLocale = async (locale: "English" | "日本語") => {
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
    const settings = page.getByRole("region", { name: /Reading and play settings|読書とプレイの設定/ });
    await settings.getByRole("button", { name: locale, exact: true }).click();
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
    await expect(settings).toBeHidden();
  };
  const expectEnglishOwner = async (label: string) => {
    await expect(presentation).toBeHidden();
    await expect(canonical).not.toHaveAttribute("aria-hidden", "true");
    await expect(canonical).not.toHaveAttribute("inert", "");
    await expect(canonical).toHaveText(transcript, { useInnerText: true });
    const accessibility = await frame.locator("body").ariaSnapshot();
    // The canonical log is serialized as one YAML string, escaping its quotes.
    const accessibleText = accessibility.replace(/\\"/g, '"');
    let previousIndex = -1;
    for (const text of ARTICLE_EN) {
      const index = accessibleText.indexOf(text);
      expect(index).toBeGreaterThan(previousIndex);
      expect(accessibleText.split(text)).toHaveLength(2);
      previousIndex = index;
    }
    for (const text of ARTICLE_JA) expect(accessibility).not.toContain(text);
    await expect(canonicalInput).toBeEnabled();
    // English restores the prior canonical scroll position. Read down to the
    // current article/input rather than requiring a different recovery policy.
    const canonicalWindow = frame.locator(".BufferWindow");
    await canonicalWindow.hover();
    await page.mouse.wheel(0, await canonicalWindow.evaluate((element) => element.scrollHeight));
    await expect(canonical.locator(".BufferLine", { hasText: ARTICLE_EN[3] })).toBeInViewport({ ratio: 1 });
    // The wrapper's command field is the visible player input in both locales.
    await expect(input).toBeVisible();
    await expect(input).toBeInViewport({ ratio: 1 });
    await expect(input).toHaveValue("LOOK");
    await input.click();
    await expect(input).toBeFocused();
    await expect(page.getByRole("button", { name: /^SEND/ })).toBeEnabled();
    expect(await inputLineId(frame)).toBe(readingInput);
    await attach(`newspaper-${controls}-${label}-accessibility`, { body: accessibility, contentType: "text/plain" });
    await attach(`newspaper-${controls}-${label}`, { body: await page.screenshot(), contentType: "image/png" });
  };
  await setLocale("English");
  await expectEnglishOwner("en-editorial");
  await setLocale("日本語");
  await expect(blocks).toHaveCount(historyCount);
  await expectArticle();
  await expectJapaneseOwner();
  await expect(input).toHaveValue("LOOK");
  expect(await inputLineId(frame)).toBe(readingInput);
  await readToEnd("ja-return-editorial");
  await setLocale("English");
  await expectEnglishOwner("en-return-editorial");
  await setLocale("日本語");
  await expectArticle();
  await input.fill("");

  for (const [command, place] of [
    ["SW", "センター通りとケネディ通り"],
    ["S", "メイン通りとケネディ通り"],
    ["SW", "ケネディ公園"],
  ] as const) {
    await sendTurn(command);
    await expect(page.locator(".location-block strong")).toHaveText(place);
  }
  const deactivation = await sendTurn("RECORD OFF");
  await expect(blocks.nth(deactivation.previousCount + 1)).toHaveText("記録機能を停止しました。");
  await expect(status).toContainText(/Location:\s*Kennedy Park/i);
  await expect(status).not.toContainText(/\(recording\)/i);
  await input.click();
  await expect(input).toBeFocused();
  await attach(`newspaper-${controls}-turns`, {
    body: JSON.stringify({ activation, read, statusBeforeRead, statusAfterRead, deactivation, statusAfterStop: await status.innerText() }), contentType: "application/json",
  });
};
