# Issue #78 — restaurant recording candidate A

## 判断と状態

**A案は [Sol の独立採択レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/84#pullrequestreview-5614358178)と #84 merge `8d5fea7ff9d5909a65e55a4122bfc7805b0e581c` により restaurant milestone 用の成功経路として採択済み。#78 / M1 は完了、M2 #79 を開始可能。M3 #80 は M2 copy approval / merge まで blocked。** 以下はその採択根拠となった2 fresh session の実測記録である。

設計の正本は [Astra の判断](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6316815976)。[PR #83 の通常レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/83#pullrequestreview-5613806742)と [merge 後の開始判断](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6340253840)を確認し、merge `bdc6f84e3de34b59d8477edcc5657d87f55b7362` から実行した。

旧 [3 session の失敗記録](restaurant-runtime-evidence.md)と fixture、成功済み Courthouse / Newspaper の fixture・受入経路・回帰テストは保持する。この候補は restaurant milestone 用の連続経路の追加であり、旧 milestone の受入条件を遡って変更しない。

## 証拠と再現

- 新規 fixture: `tests/fixtures/parchment-restaurant-recording-a-observed.json`。
- Capture: `scripts/capture-restaurant-runtime.mjs --candidate-a`。既存の flag なし実行は、旧 travel / meal / meal と旧新聞録画区間を保つ。A の既定出力も旧 fixture と別のパスとする。
- 2つの独立 Chromium browser context、各1440×900。各 context は fresh 起動から既存 prefix を実行し、save / restore、VM/state 編集、buffer 消去、別 session の食事による代用は行わない。
- 各 session は39観測、numeric answer を含む40実送信。`submittedCommands` に実値、`securityPrompt` に回答前の canonical snapshot、`inputOwnership` に実回答と numeric input ID を保存する。起動時 character prompt は従来通り保存範囲外。
- `presentation` に raw English の行・空行・run・heading・終端 input、`statusText` に raw GridWindow、`status` にその解析値を保存。`turnId` は canonical の送信元 input / echo 行 ID と同じ anchor であり、VM 内部の turn counter ではない。`submittedInputId` → `nextInputId` を全観測で連鎖照合する。ID は各 context 内の identity として扱う。
- `warnings` は警告の実出力を `turnId`・command・status と対応付ける索引。原文は当該 `presentation.lines` にも保持する。

```bash
# committed lockfile と engine 条件を満たす npm / Chromium を使用
npm ci
npx playwright install chromium
npm run dev -- --hostname 127.0.0.1 --port 3100
# 別 terminal。旧 fixture を出力先にしない。
node scripts/capture-restaurant-runtime.mjs --candidate-a \
  --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-restaurant-recording-a-observed.json
```

| Session | 開始 UTC / JST（2026-10-22） | 終了 UTC | 原作日付 | 最初の Simulation 入場時刻 |
| --- | --- | --- | --- | --- |
| 1 | `12:09:15.090Z` / 21:09:15 | `12:09:29.701Z` | `5/24/2041` | `11:04am` |
| 2 | `12:09:29.715Z` / 21:09:29 | `12:09:40.493Z` | `2/7/2041` | `11:48am` |

## 全経路と録画区間

```text
PEOF → WAIT ×4 → ENTER SIMULATION MODE → <observed numeric answer>
→ LOOK → RECORD → WAIT → RECORD OFF

RECORD → SW → NW → LOOK → SE → NE → RECORD OFF

INVENTORY → NE → N → NE → RECORD → BUY NEWSPAPER → READ NEWSPAPER
→ RECORD OFF → SW → S → SW

SW → W → W → S → RECORD → BUY MEAL → RECORD OFF → N → E → E → NE
```

初回 loop / Courthouse は旧列と同一。新聞も往復11 command の件数と RECORD controls 以外の順序を保ち、購入と四段落の読書を省略しない。変更したのは Bodanski Square での購入前・読書後への録画開始・停止の移動だけである。新聞の帰路とレストランへの往復は非録画、食事全区間を現地で録画し、明示停止後に公園へ戻る。

| 観測（index は0始まり） | Session 1 | Session 2 | 確認内容 |
| --- | --- | --- | --- |
| Courthouse LOOK / 13 | `line-105 → line-111`, 11:29am | `line-107 → line-113`, 12:13pm | NW 到着・LOOK・SE 帰路の前後とも recording。 |
| 新聞購入 / 22 | `line-145 → line-148`, 11:58am | `line-147 → line-150`, 12:42pm | Bodanski Square、recording、残高 $599。 |
| 全記事 READ / 23 | `line-148 → line-159`, 12:08pm | `line-150 → line-159`, 12:52pm | 四段落と空行が既存 observed article と一致し、recording を維持。 |
| 新聞 RECORD OFF / 24 | `line-159 → line-162`, 12:09pm | `line-159 → line-162`, 12:53pm | Bodanski Square で停止成功、その後に旧徒歩順で公園へ帰着。 |
| 現地 RECORD / 32 | `line-186 → line-191`, 12:45pm | `line-186 → line-191`, 1:29pm | Roy's Pagoda、recording、half-full 警告。 |
| BUY MEAL / 33 | `line-191 → line-194`, 1:07pm | `line-191 → line-194`, 1:51pm | 22分経過後も recording。$30 支払、new balance $569。 |
| 明示 RECORD OFF / 34 | `line-194 → line-197`, 1:08pm | `line-194 → line-197`, 1:52pm | `Record feature deactivated.`、mode は非 recording。 |
| Kennedy Park / 38 | `line-206 → line-209`, 1:28pm | `line-206 → line-209`, 2:12pm | 帰路4 command すべて非 recording、通常 line input が復帰。 |

食事本文は旧 fixture の実測 leaf と一致する。両 session とも full warning、auto-deactivation、not-active エラー、harness failure はない。原作の応答と current status を根拠とし、補助 checklist や内部課題 flag を録画成立・正式評価の代用にしない。

## 警告と optional output

両 session で警告は次の一つ。Index 32、Roy's Pagoda の RECORD、送信元 `line-186` に出現する。

```text
WARNING: Record buffer is now half-full.
```

旧経路では新聞への移動中に現れた半量警告が、A案では食事直前へ移った。Half-full は保存して許容する。Full / auto-deactivation を許容する B案への変更はしていない。Source-based 見積り98→68は試行の根拠のままであり、今回も buffer 数値残量や内部 SIZE を観測していない。

Session 1 の READ 後には、四段落と空行に続いて次の原作出力が現れた。省略・移動・翻訳せず保持する。

> The sun, beating down warmly on you, has reached its midday apex.

時刻・日付・security 値・line ID と、Elm & Park の crowd variant は可変である。Optional output を成功条件に加えず、未承認 leaf は canonical English fallback とする。新規 regression は記事四段落の完全性・順序・空行を固定し、その後の optional output を保持して fallback を確認する。初回の候補テストは「READ の応答は記事だけ」という過度な仮定で失敗したため、承認済みの optional-output 境界に合わせた。Fixture を削ってテストへ合わせていない。

## UI・projection と限界

Production UI は変更しておらず、前回の48 sample の現行操作面監査を保持する。今回の capture は既存 command input と送信、assisted security decoder を使う。Meal UI の完成・実送信を証明する実測ではない。初回2041年・Simulation Mode・解決済み ROYS-PAGODA・line input に限定する BUY MEAL、Guided draft / Action menus 明示1回送信、EN/JA 同可用性、busy 無効化、scope 外の新設候補なしという設計範囲は承認済み。M2 が周囲の visible / accessible な説明を含む copy、M3 が実装と6経路受入を担う。

全39観測 × 2 session は既存 `reconcilePresentationHistory` で representable。新規 renderer、VM telemetry、source からの prose 補完、Japanese parser は追加していない。Canonical SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`。

成功経路の独立採択レビュー・merge は完了。未実施は M2 copy approval、M3 の UI 実装・3 modes × 2 viewports の全体受入、正式な九課題評価、後続年・再入場、実保存データ RESTORE、音声 screen reader、本番配備。M1 に M3 の UI 完成を要求しない。M2 の候補は [restaurant copy packet](restaurant-copy-packet.md) に記録する。

Local checks は `npm run lint`、`npx tsc --noEmit`、`npm test`（30/30）、`npm run test:e2e`（26/26、6.4分）、canonical SHA-256、`git diff --check` が通過した。26件の E2E は従来の受入・回帰 suite であり、A案を3 modes × 2 viewports で受け入れた証拠ではない。A案の実測は上記2 desktop context として別に扱う。

Current-head CI / artifact の実期限は採択 PR に記録する。新規 fixture の存在を要求する regression の RED を確認してから実測し、採取後に GREEN を確認した。
