# Issue #78 — 2041 restaurant runtime evidence

## 判断と引き渡し

**採用経路なし。M2 #79 / M3 #80 は引き続き停止する。** 同一 fresh canonical session の Courthouse → Newspaper を変更せず、Roy’s Pagoda で食事・支払を行い Kennedy Park の通常 line input まで戻れた。しかし、公園から録画すると食事前に buffer が満杯になり、食事直前から録画しても食事応答の末尾で自動停止する。さらに現行 Guided / Action menus に食事対象の操作が現れない。

食事直前の `Simulation Mode (recording)` は観測済みである。食事の全時間が録画されたこと、内部の課題 flag、録画の正式な帰還評価は未観測であり、成功として採択しない。この失敗に基づき、録画区間と必要な対象操作の扱いを設計判断へ戻した。

**2026-10-21 JST の merge 後状態:** [PR #82](https://github.com/5gmt/mind-forever-voyaging/pull/82) は [Sol の独立レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/82#pullrequestreview-5599103425) 後、evidence-only として `f45d268282a40d63bf88e1eaf95b01c96961eeea` へ merge 済み。[#78 の判断](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6315058171)に従い、失敗記録の merge は経路採択や後続の unblock を意味しない。

**現在の再開判断:** [Astra の設計判断](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6316815976)で、[A案の追加実測方針と限定 meal UI の設計範囲](plans/2041-restaurant-followup-decision.md)は承認済み。追加実測前であり、以下の3 session の失敗はそのまま保持する。#83 の文書同期・Sol の通常レビュー・merge 後に、別の候補 fixture を2 fresh session以上で採取する。既存 Courthouse / Newspaper の成功 fixture・受入経路・回帰テストも保持し、restaurant milestone 用の連続経路を追加する。Half-full 警告と移動した出力 turn を保存し、full / auto-deactivation は成功に数えない。食事前後の recording、明示停止の成功、非 recording の公園通常入力までを Sol が採択レビュー・merge するまでは、#78 open・経路未採択・M2/M3 blocked を維持する。M1 採択に M3 の meal UI 実装完了は要求しない。

## 保存した証拠と再現

- `tests/fixtures/parchment-restaurant-runtime-observed.json`: 最終 script による3独立 Chromium context。`startedAt` / `finishedAt` は UTC、viewport は各1440×900。2026-10-21 JST に採取。
- `scripts/capture-restaurant-runtime.mjs`: fresh 起動、既存 prefix と両先行経路、録画区間2候補、帰着までを再現。Session 3 は English / 日本語 × Classic / Guided / Action menus の実操作 surface を8地点で監査する。
- `tests/rendered-html.test.mjs`: command 順序、current input identity、status、22分の食事、$30 / $569、警告、入力復帰、English fallback、操作面の不足を固定する。
- 原作は `public/amfv-r79-s851122.z4`、SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`。`source/`、story、production catalog / renderer は変更していない。

```bash
# package.json の engine 条件を満たす npm で実行
npm ci
npx playwright install chromium
npm run dev -- --hostname 127.0.0.1 --port 3100
# 別 terminal
node scripts/capture-restaurant-runtime.mjs \
  --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-restaurant-runtime-observed.json
```

各 command の送信前に canonical input line ID を取得し、その同じ ID に今回の echo が現れ、別 ID の line input が戻るまで待つ。切り出しも文字列検索ではなく送信元 ID を使う。`submittedInputId` / `nextInputId` と全 line / run / class / layout、terminal line、active input を保存した。同名 `W`、`RECORD`、`RECORD OFF` の過去 echo を採らない。Security prompt の numeric line ID を別途取得し、numeric answer 後の新しい input まで同期する。

`submittedCommands` が numeric answer を含む実送信列である。`commands` / `observations` は security challenge と answer 後の scene を一つの観測にまとめ、途中の `securityPrompt` も別保存する。全保存 turn の終端 input は `line` である。起動時の character prompt は wrapper の Begin 操作で通過し、その character-input snapshot は本 fixture の保存範囲外。新しい character-input branch は観測していない。

## 全 command と録画区間

全 session の共通先行列は次の通り。数字の answer は fixture に実値を保存し、source から生成していない。

```text
PEOF → WAIT ×4 → ENTER SIMULATION MODE → <observed numeric answer>
LOOK → RECORD → WAIT → RECORD OFF
RECORD → SW → NW → LOOK → SE → NE → RECORD OFF
INVENTORY → RECORD → NE → N → NE → BUY NEWSPAPER → READ NEWSPAPER
→ SW → S → SW → RECORD OFF
```

| Session / 候補 | 先行列に続く全 command | 観測結果 |
| --- | --- | --- |
| 1 / travel | `RECORD SW W W S BUY MEAL N E E NE RECORD OFF` | Elm Underpass 到着（2回目の `W`）で buffer full、自動停止。食事は録画停止後。公園の停止要求は not currently active。 |
| 2 / meal | `SW W W S RECORD BUY MEAL RECORD OFF N E E NE` | 現地で録画開始、食事応答と同時に buffer full。停止要求は not currently active。公園へ通常入力で帰着。 |
| 3 / meal + UI audit | Session 2 と同一 | 同じ警告・支払・帰着を再現。UI 設定変更、地図選択、Guided の draft は story command を送らない。 |

全 session で先行裁判所・新聞の往復と停止を完了した。`INVENTORY` は key / wallet を示し、新聞購入後残高は $599。食事応答は credit card で $30 支払い、new balance $569 と述べる。食事 command 前後の status は22分差。食事前後とも地点は `Roy's Pagoda` である。初期残高・内部容量残量は逆算して観測値にしない。

| Session | 開始 UTC（同日 JST） | 原作日付 | 新聞後停止 → 食事 → 最終入力 |
| --- | --- | --- | --- |
| 1 | `2026-10-21T08:38:43.524Z`（17:38:43） | `4/12/2041` | `1:52pm → 2:35pm → 2:56pm` |
| 2 | `2026-10-21T08:38:52.986Z`（17:38:52） | `5/22/2041` | `1:05pm → 1:48pm → 2:09pm` |
| 3 | `2026-10-21T08:39:02.478Z`（17:39:02） | `6/17/2041` | `11:50am → 12:33pm → 12:54pm` |

Meal-only の exact response leaf は次の通り。その後に blank line、warning、blank line、terminal `>` が続く。Travel 候補の同じ食事 leaf に warning は付かず、それより前の移動 turn に付く。

> You order a bowl of Hot and Sour soup and some assorted appetizers. The food arrives promptly, steaming hot, delicately spiced, delicious. Afterward, your check arrives with a typical fortune cookie and a plate of lychee nuts. The fortune reads: "Prosperity does not equal happiness." You pay with your credit card. After a moment, the waiter returns your card, informing you that your account has been debited for $30 and that your new balance is $569.

```text
WARNING: Record buffer full. Auto-deactivation of record feature.
ERROR: Record feature not currently active.
```

最初の行は auto-deactivation のある turn、次の行は後続 `RECORD OFF` の応答であり、同じ turn の連続出力ではない。

## 実操作 surface 台帳

正本は `sessions[2].surfaceAudit` の48 sample（8地点 × 2 locale × 3 mode）。各 sample の `aria` は実 DOM の Playwright accessibility snapshot、`visible` は表示状態、`guidedDraft` は実際にボタンを押した input 値である。`observationIndex` で canonical status / input ID と対応する。Audio screen reader 検証、narrow viewport の受入、Action menus での全経路送信は M1 の検証に含めない。

| Surface / identity | 実表示・accessible copy / 動的値 | Guard / command と監査結果 |
| --- | --- | --- |
| Map assignment `meal` / target `ROYS-PAGODA` / assignment 0 | Visible `Restaurant`。Accessible `Restaurant, fieldwork destination`、現地で `, current location` が加わる。日本語 locale でも未承認 map label は English。 | Assisted の map drawer に表示。Restaurant と原作 room heading `Roy's Pagoda` は別 identity。Classic では compact map / compass / scene actions を出さない。 |
| 課題名 | `Eat a meal in a restaurant` / `レストランで食事をすること`。Route button は `Plot route for …` / `…への経路を表示`。`Show on map` / `地図で表示` 等は既承認 copy を再利用。 | Checklist の meal 行が対象。推定カウントは2/9から食事後3/9へ変わるが、原作の正式評価ではない。 |
| Map / route | `Route to Restaurant`、歩数、next command、next place、`You have reached the destination.`。日本語でも未承認地名は English。 | `walkingRoute` は current room / year 2041 を使用。Elm & Park→`west`、Elm & University→`west`、Elm Underpass→`south` の Guided draft を実押下。帰着公園からは `sw`。到着時 step button は消える。 |
| Guided route step | `Draft next step` / `次の移動を入力欄へ`。Draft は `west` / `south` / `sw` の canonical English。 | `useMapRouteStep` は draft を作り drawer を閉じる。監査で draft 値を保存後クリアし、未送信を維持。 |
| Action menus route step | `Take next step` / `次の移動を実行`。`Clear` / `解除`。 | Assisted・line input 受付中。既存 handler は English next command を即時送信。本 capture の移動本体は外側 command input を使用し、この即時送信の全経路受入は行っていない。 |
| Compass / context exits | `Available directions` / `移動できる方角`、`Current scene` / `現在の場面`、方角・対象地名・`Next` / `次`。Context の exit-list は小文字 command も表示する。 | Assisted、Simulation、line input、room exits がある場合。UI は `SW/W/W/S`（full direction の `west/south` 等も使用）と帰路 `N/E/E/NE` を English command として送る。全出口・accessible name は sample の compass / context に保存。 |
| Room headings / shared lookup | `Kennedy Park` / `ケネディ公園`、`Elm & Park` / `エルム通りとパーク通り` は既承認。`Elm & University`、`Elm Underpass`、`Roy's Pagoda` は English fallback。 | Raw English status から room を特定する。新規 heading / route destination の Japanese copy は M1 で作らない。 |
| SceneActions | Elm & Park は `park Examine`、Elm Underpass は `restaurant Examine`。現地 Roy's Pagoda は来店・録画開始・食事後・停止要求後とも**対象なし**。 | Guided は語を draft、Action menus は action を送信する既存機構。`MEAL` / name `food` / command noun `food` の generic `Buy` → `buy food` は source-derived metadata にあるが、実際の到達可能な meal UI ではない。手入力 `BUY MEAL` と区別する。 |
| Recording controls | `Record` / `録画開始`、`Stop recording` / `録画停止`、drawer の `Start RECORD` / `RECORD を開始`、`● RECORDING`。 | Current raw status / input に従う。Auto-deactivation 後の表示と canonical warning を保持。Checklist の3/9だけを録画成立の根拠にしない。 |

`app/StoryTools.tsx` の action generator と `app/PrismEdition.tsx` の contextual object guard を照合した。`MEAL` は `GLOBAL-OBJECTS` にあり、room/passage の可用性・語の言及・候補の絞り込みを通っていない。Generic BUY handler の存在だけで利用可能な action と称さず、guard を緩めたり未観測対象を公開したりしていない。

承認された限定 UI は、既存の初回2041年判定・Simulation Mode・解決済み `ROYS-PAGODA`・line input にのみ `BUY MEAL` を提供する設計で、現行 UI の観測結果ではない。来店文に meal / food の言及がないため、既存の「この場面で言及された語 / 対象」という説明の下にそのまま候補を追加しない。M2 が対象・action 名と限定 surface を囲む visible / accessible な説明を承認し、無関係な説明や汎用 guard を一括変更しない。M3 が EN / JA の同じ可用性、Guided draft / Action menus 一回の明示送信、busy 無効化、scope 外の新設候補なし・既存 fallback を検証する。Copy・実装・受入は未実施。

## Stable / dynamic / optional / unknown と projection

| 分類 | 保持する内容 |
| --- | --- |
| Stable observed | 往復の地名順、初訪問の heading / description、食事1段落と fortune、$599→$569 / $30、食事22分、録画起動・警告・not-active 応答、帰着後 line input。初訪問と再訪問の省略形を混同しない。 |
| Dynamic observed | 各 session の開始UTC、simulation date / time、security color / inner / numeric answer、input / line ID、checklist count と route 歩数。固定値に翻訳しない。 |
| Optional | City noise や crowd variant は出現した場合のみ fixture の当該 turn を根拠にする。成功条件に加えず未承認なら English fallback。今回の新規 restaurant 区間には追加 city-noise interrupt を観測していない。 |
| Unknown | Buffer の数値残量、22分のうち録画された時間、内部 recording-table flag、正式評価、別年・営業時間・低残高の失敗枝、character-input の別枝、RESTORE・再入場。Source の定数・分岐を観測値へ転記しない。 |

全保存 turn は既存 `reconcilePresentationHistory` で representable。新規食事 leaf の Japanese catalog entry は存在せず、現行 projector は canonical English response（warning を含む）へ退避する。Fixture には line / blank / heading run の境界を損失なく保存した。新規 leaf の semantic structure は既存 ordinary-turn の line/run/blank と同じで、general renderer や VM telemetry を要する根拠はない。これは新規日本語表示の受入や copy approval を意味しない。

## 試行・失敗と限界

初回 probe（2026-10-21T08:32:28.647Z 開始の3番目の context）は、現地で drawer header の button が `Start RECORD` と Close の2個になり、close locator の strict-mode violation で中断した。送信列は共通先行列と `SW W W S`（numeric answer は `62`）。これは harness failure であり canonical failure ではない。Close を `.fieldwork-close` に限定し再実行した。後続の同期修正は security の numeric input ID と route DOM の表示待ちを追加し、open Explore panel の監査も加えたもの。最終 fixture の3 context はいずれも harness failure なし。

初回の npm bootstrap は home cache が書けず失敗したため、workspace 配下の cache / prefix で成功させた。初回 lint は repository 内に置いた Chromium 配布物まで走査したため失敗し、ブラウザ・npm の scratch assets を repository 外の `/workspace/work/issue78/` へ移した。Capture 書き込み途中に走った初回 npm test は不完全 fixture で失敗した。最終検証は完成 fixture で再実行し通過した。これらを canonical route failure と数えない。

初回 head `1c0100989c32c4b6f48c77b17ffe090babe02059` の [CI 39572145503](https://github.com/5gmt/mind-forever-voyaging/actions/runs/39572145503) は verify 成功、browser-e2e は24/26だった。既存 newspaper の narrow Guided / Action menus が `newspaper-acceptance.ts:171` の scroll 比較で失敗した（開始5512/5476、12回の wheel 後2160）。旧 helper は開始位置の計測後に `hover()` を実行していた。Playwright の pointer 準備は iframe/要素を scrollIntoView するため、hover を記事の位置決め・基準値計測の前へ移した。Wheel 増加、clipping を含む本文末尾、iframe/input の viewport、focus の全 assertion を保持し、retry や成功条件の緩和は加えていない。Production scroll code は変更しない。

その失敗 run でも `if: always()` により [artifact 12332657993](https://github.com/5gmt/mind-forever-voyaging/actions/runs/39572145503/artifacts/12332657993) を保存できた。`created_at=2026-10-21T08:53:48Z`、`expires_at=2026-11-04T08:53:46Z`（11月4日17:53:46 JST）を API で確認し、設定14日と実期限が一致する。旧 head の失敗を current-head の成功として扱わず、最終 CI 結果は PR 本文へ別途記録する。

本 fixture は独立3セッションの証拠で、好都合な prose や食事単独の別 session で連続経路を代用していない。先行経路の短縮、save/restore、原作 state の編集、buffer 消去、production UI の変更は行っていない。

## 検証と CI

Fixture regression は保存前に `restaurant runtime evidence must be captured` で RED、保存後に GREEN を確認した。最終 local checks は `npm run lint`、`npx tsc --noEmit`、`npm test`（29/29）、`npm run test:e2e`（26/26、4.7分）、canonical SHA-256、`git diff --check` が通過。Current-head CI URL・artifact URL・実際の14日期限は PR の引き渡し記録にまとめる。`.github/workflows/ci.yml` の `retention-days: 14` と `AGENTS.md` / status を同期し、Actions の full SHA pin、`if: always()`、upload path / if-no-files-found、先行 job と失敗伝播は保持する。

Sol の evidence-only レビューと、Astra の A案・限定 UI の再開設計判断は完了した。追加実測、M1 の成功経路採択、M2 copy / M3 6経路受入、実保存データの RESTORE、音声読み上げ、本番配備は完了扱いにしない。
