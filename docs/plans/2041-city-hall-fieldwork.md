# 2041 City Hall Fieldwork Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL（利用可能な環境）: `superpowers:executing-plans` を使い、担当 Issue を一単位ずつ実行する。
> **Execution:** Codex Cloud が G1–G3 を実装し、Chat モードの Sol が独立した通常レビューを行う。計画 PR / G1 / G2 は Sol、G3 の milestone 全体受入と merge は Astra / ChatGPT Work が担当する。既存の実行方法を継続し、タスクごとの追加 agent 階層は要求しない。

**Goal:** 同じ初回2041年 canonical session の Courthouse → Newspaper → Restaurant に続き、市役所で政府職員との会話を録画し、Kennedy Park の通常入力へ戻れる日本語体験を提供する。
**Architecture:** 既存の 2a+2b presentation、exact observed-leaf catalog、room / map lookup、SceneActions を拡張する。状態と対象の在室根拠は canonical raw English から得る。録画中の会話・退場・明示停止・帰着を実測してから copy と実装を承認する。
**Tech Stack:** Next.js / React / TypeScript、canonical Release 79 / Parchment、既存 bridge-v3、Node test runner、Playwright / Chromium。
**Spec:** 本書の「設計判断」と「受入境界」。[PROJECT_CHARTER.md](../../PROJECT_CHARTER.md) と [AGENTS.md](../../AGENTS.md) の保証を保持する。
**Status:** 完了。計画 PR #90、G1 #87 / PR #91、G2 #88 / PR #92 に続き、G3 #89 / [PR #93](https://github.com/5gmt/mind-forever-voyaging/pull/93) を merge `967036d818583806e88d4d77f541e41af56b3d9f` で統合した。最終 head `2571595cda8abbb2e32b4194c7aa7e7fd07d05aa` に対する [Sol 通常レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/93#pullrequestreview-5647913588)と [Work 全体受入](https://github.com/5gmt/mind-forever-voyaging/pull/93#pullrequestreview-5648983599)、[CI 35 unit / 43 browser 成功](https://github.com/5gmt/mind-forever-voyaging/actions/runs/40272195826)、[#29 完了報告](https://github.com/5gmt/mind-forever-voyaging/issues/29#issuecomment-6411200960)、#89 close を確認済み。実測と限界は[市役所受入記録](../city-hall-fieldwork-acceptance.md)に保持する。次の計画は[発電所](./2041-power-station-fieldwork.md)を参照する。
**Baseline:** PR #86 merge `284eb5dcfb9e900e8d98a6a34e5a5ad2d058ce3c`。実行時には最新 `codex/modern-amfv` を取り込む。
**Execution root:** [#29](https://github.com/5gmt/mind-forever-voyaging/issues/29)。

## Global Constraints

- `public/amfv-r79-s851122.z4` の SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` を維持し、historical `source/` は変更しない。
- Release 79 / Parchment を parser・state・save/restore の唯一の権威とする。状態認識は raw English、送信 command は canonical English、翻訳は presentation に限定する。
- 2a の host / window ownership、2b の per-leaf fallback、history / recovery / accessibility、live `#windowport` の観測、既存 `request-state` による起動同期を保持する。
- 対象は初回2041年。後続年・再入場・Part II・QA・RESTORE 後の不明状態へ新規日本語 UI や限定 action を広げない。unknown output と未承認 leaf は English fallback とし、既存の正しい日本語履歴は保持する。
- 原作の正式な課題達成と補助 checklist の推定を区別する。推定4/9だけを成功根拠にしない。
- 新 renderer、VM telemetry / state 書き換え、汎用 NPC engine、汎用 GLOBAL-OBJECTS / LOCAL-GLOBALS guard の緩和、日本語 parser、自動会話・録画、deployment / production dependency 変更は含めない。
- 既存成功・失敗 fixture と回帰を保持する。#86 の31 unit / 34 browser tests は baseline の実績であり、今回の実行結果ではない。新規6経路は既存経路を置換しない。
- 各 PR が本書と `PROJECT_STATUS.md` を同期し、G3 実装者が最終受入記録と roll-up を用意する。独立レビュー、最新 base、current-head CI、mergeability の gate は維持する。

## Review Focus

| 条件 | 期待する結果と検証担当 |
| --- | --- |
| 先行3課題後の容量・市役所の営業時間・会話中の録画 | G1 が同一 fresh session を2回以上実測し、G3 が6経路で再現する。full / auto-deactivation を成功扱いにしない。 |
| 職員退場後に残る room cache、古い transcript、locale / drawer 切替 | G1 が退場と非録画 `LOOK` を採取。G3 は在室時だけ Talk を提供し、退場後・履歴窓の脱落後・不明状態で再出現させない。 |
| 反復する移動 command と長い履歴 | G1 / G3 は現在の input / turn ID と新しい echo を照合する。古い同名 echo や rolling transcript だけを完了根拠にしない。 |
| room、map、課題、人物の identity と未知・optional output | G1 の surface 台帳を G2 が役割別に承認し、G3 が既存 lookup を使う。未承認対象・別室の `official` を会話相手にしない。 |
| narrow、読み上げ、locale 往復、focus と入力 | G3 が末尾・地図・操作・入力への到達、非重複の accessibility owner と `lang` を実ブラウザで確認する。390px で原作が出さない時計を合成しない。 |

## 設計判断

### 選定と代替案

2026-10-24 JST の次 milestone 策定・タスク作成依頼を受け、市役所での政府職員との会話録画を次の候補に選ぶ。
既存の3課題に短い徒歩圏内の会話体験を加えられ、本文・地図・人物操作を一つの完結した経路としてレビューできる。
この選定は historical source と現行コードに基づく計画であり、新しい経路の runtime 成功や copy 承認を意味しない。

| 候補 | 利点 | 今回の判断 |
| --- | --- | --- |
| 市役所の政府職員との会話 | 既存の Main & Kennedy から Rockvil Centre / City Hall の2地点を追加。会話と人物退場を含む小さな体験単位になる。 | 採用候補。録画容量・営業時間・人物の可用性を G1 の gate にする。 |
| 教会関係者との会話 | 別の会話課題を増やせる。 | 経路が長く、同一人物の教会間移動、出現時刻、一度の会話による状態変化を伴うため後続候補に残す。 |
| Simulation 帰還と録画評価 | 調査の成果を original evaluation につなげられる。 | 未達課題の組合せ、mode / phase、再入場・録画 buffer の reset を横断する。今回は新たな1課題の成立を先に確認する。 |

公共交通、発電所、自宅、映画も今回は扱わない。
次の milestone は本件の締めで再選定し、残り全課題の同一 session 完了を約束しない。

### 候補経路と実測 gate

先行区間は [restaurant A案](../restaurant-recording-a-evidence.md) と [#86 受入](../restaurant-fieldwork-acceptance.md) の経路をそのまま使う。
初回 recording loop、Courthouse の録画往復、Newspaper の購入前 RECORD / 全記事 READ 後 RECORD OFF、Roy’s Pagoda の RECORD → BUY MEAL → RECORD OFF、各公園帰着を保持する。
新経路だけを fresh session で実行して、先行3課題からの継続成功に代用しない。

| 区間 | 候補 command / 観測 |
| --- | --- |
| 既存40 line commands | `scripts/capture-restaurant-runtime.mjs --candidate-a` の prefix / Courthouse / Newspaper / Restaurant。観測した decoder answer の1送信を含む。起動 character prompt は別に記録する。 |
| 公園から市役所 | `NE` → `W` → `W`。Kennedy Park → Main & Kennedy → Rockvil Centre → City Hall。既存 planner の同経路も確認する。 |
| 会話の録画 | 職員の在室出力を確認 → `RECORD` → `GOVERNMENT OFFICIAL, HELLO` → `RECORD OFF`。現行 SceneActions の Talk が組み立てる command を候補とする。 |
| 退場の確認と帰着 | 非録画の `LOOK` → `E` → `E` → `SW`。City Hall で職員がいないことと、公園で recording が停止し通常 line input に戻ることを確認する。 |

追加10送信、合計50 line commands が計画時の列である。
UI が送信する `west` / `east` 等の既存 alias と実際の大文字小文字も G1 で記録し、G2 / G3 の command qualifier へ渡す。
録画は会話の現地区間だけとし、徒歩と退場後 `LOOK` は非録画にする。

Source は City Hall の入場時刻 guard、2041年の職員配置、`BRIEF-CHAT` の8分・職員の移動、録画中の会話による記録を示している。
既存 A案の録画時間見積り68に短い会話区間を加える余地があるが、数値は source estimate であり残容量の観測値ではない。
Source 上の時刻・容量・内部 flag を runtime fact に転記しない。
主要根拠は `source/rockvil.zil` の `CITY-HALL-ENTER-F` / `GOVERNMENT-OFFICIAL-F` / `BRIEF-CHAT`、`source/prism.zil` の初期配置、`source/misc.zil` の recording accumulation / full warning である。

G1 は2回以上の独立した fresh canonical session で全経路を実行し、先行録画、会話の成立と退場、会話前後の recording、明示停止、帰着・通常入力を確認する。
時刻は原作 status に出る viewport で比較し、出ない viewport は未観測と記録する。
Half-full warning は位置を含め保存する。Full / auto-deactivation、閉館、人物不在、command 不成立、UI 到達不能は原因別に記録する。
経路が成立しない場合は失敗 fixture を保存し、evidence-only PR として扱えるが G2 / G3 は unblock しない。
先行経路・録画区間・成功条件の変更や新たな observation boundary が必要なら Work に設計判断を戻し、重要な変更は Yasuo の判断を記録する。

### 人物操作の境界

`GOVERNMENT-OFFICIAL` の生成済み metadata は `LOCAL-GLOBALS` 起点、dynamic location は `CITY-HALL`、command noun は `government official` である。
現行実装には `belongsToSourceRoom`、`actorAppearsPresent`、`actorHasDeparted`、Guided / Action menus の Talk がある。
G1 はこれらが実際の到着・録画操作・会話後・LOOK 後にどう表示されるかを監査し、既存の動作で成立する部分を再利用する。
Source 上の配置や古い到着文だけで在室を確定しない。

G3 で認める追加・修正は、採択した初回2041年・解決済み City Hall・raw English で在室が裏づけられた職員と観測済み Talk の範囲に限る。
Guided は編集可能な draft を作り、明示 submit まで送信しない。Action menus は1回の明示押下に1送信、busy 中は無効、line input 以外では新規操作を出さない。Classic には assisted action を追加しない。
EN / JA で command と可用性は同じにする。既存の対象外英語 UI を一括削除・変更せず、新規日本語化と本 milestone の限定した修正だけを適用する。
職員が退場したら、古い scene cache / transcript から Talk を復活させない。locale / drawer 切替や長い履歴でも保持し、RESTORE・新 session・判定不能では不確かな在室状態を引き継がない。
このために局所的な観測履歴が必要なら、現行 bridge の raw observations を使い、G1 の再現証拠に対応する最小の修正を G3 で行う。汎用 actor engine や VM state mirror は作らない。
在室が確定できなければ支援を出さず canonical input へ戻す。正常な採択経路で Guided / Action menus から会話できない場合は未完了とする。

## 受入境界

- Classic / Guided / Action menus × desktop 1440×900 / narrow 390×844 の6本を、それぞれ fresh context・同じ先行3課題付きで完走する。
- 必須本文は採択経路で観測された新規 leaf と既存 leaf の再利用。市街・市役所到着、職員の在室、会話内容・退場、退場後 LOOK、録画応答・警告・帰着を対象とする。未観測 failure / optional noise / 別会話を架空の fixture や翻訳で埋めない。
- UI は room / current-place / route、`official` map identity、課題の既承認文言、人物 `GOVERNMENT-OFFICIAL` / Talk、必要な surrounding help と visible / accessible copy。City Hall と map identity `official` と課題と人物名を別の台帳行として扱う。
- Guided / Action menus は実際の route・会話・録画 controls を使う。draft を作っただけ、raw command だけの成功、static rendered HTML だけで assisted acceptance を代用しない。
- 会話を RECORD OFF で行う別の負例では、新しい government assignment の推定を付けない。正常録画後の4/9は補助推定として照合し、正式評価や内部 flag は主張しない。
- 退場直後・LOOK 後・locale 往復・drawer 開閉・長い履歴、未知 room、busy / char input、再入場 / 後続 phase / QA / RESTORE 不明、新 session の境界を regression で確認する。自然な canonical 経路と controlled wrapper probes は証拠上区別し、後者で VM 状態を書き換えない。
- 6経路の原文と訳、status / input identity、末尾可読性、地図・操作へのスクロール、focus 復帰、English subtree の `lang`、単一 accessibility owner、EN → JA → EN recovery を実ブラウザで記録する。

## タスクセット

| ID / Issue | 成果物 | 依存関係 / 完了 gate |
| --- | --- | --- |
| G1 / [#87](https://github.com/5gmt/mind-forever-voyaging/issues/87) | 連続経路の runtime fixture、人物と操作面の監査、採択判断 | 計画 PR の独立レビュー・merge 後。Sol が成功経路・UI 契約を採択して merge。 |
| G2 / [#88](https://github.com/5gmt/mind-forever-voyaging/issues/88) | story・地名・地図・人物操作の一括 copy packet | G1 採択・merge 後。Sol が翻訳と UI 境界を独立承認して merge。 |
| G3 / [#89](https://github.com/5gmt/mind-forever-voyaging/issues/89) | 既存 catalog / UI への統合、6経路・境界 regression、最終受入記録 | G1 / G2 merge 後。Sol 通常レビュー、その後 Work の milestone 全体受入・merge。 |

### G1: Runtime — capture City Hall after the three accepted fieldwork tasks

**Files:** 新規 `scripts/capture-city-hall-runtime.mjs`、`tests/fixtures/parchment-city-hall-runtime-observed.json`、`docs/city-hall-runtime-evidence.md`。更新 `tests/rendered-html.test.mjs`、本書、`PROJECT_STATUS.md`。
**Interfaces:** `scripts/capture-restaurant-runtime.mjs --candidate-a` と bridge-v3 の観測形式を参照し、既存の採択40送信を保持する。成果物は session / actual command / input ID / resulting presentation / raw status の対応、stable / dynamic / optional leaf、採用 alias、各 locale・mode の surface 台帳、成功または停止判断。既存 script / fixture を置換しない。

- [x] 最新 base と適用規則を確認し、候補50送信の capture を実装する。起動 character input と line input を区別し、各送信では現在の input ID に対する新 echo と次の input を待つ。
- [x] 2回以上の fresh session で全経路を採取し、先行3課題・会話前後 recording・明示 OFF・退場後 LOOK・公園帰着を照合する。8分の source 値と実際の status 差、残容量の不明を混同しない。
- [x] Classic / Guided / Action menus と EN / JA の現行 room / map / route / recording / Talk surface を、在室前・在室中・会話後・LOOK 後に監査する。command、draft / 即時送信、accessible name、help、guard と不足を台帳化する。未実装の日本語 copy や G3 の修正完了は G1 の条件にしない。
- [x] exact leaf / command qualifier / input identity / 行構造を fixture regression で固定する。既存 ordinary projector が処理できることと English fallback を確認し、失敗なら事実と不足を残す。
- [x] applicable checks と canonical checksum を実行し、PR に結果・source/runtime/UI の区別・current-head CI・採択判断を記録する。本書と status を同時に同期する。
- [x] Sol の独立レビューで連続経路と人物操作の契約を採択し merge する。失敗記録のみの merge では G1 完了・G2 着手にしない。

### G2: Copy — approve City Hall story and required controls

**Files:** 新規 `docs/city-hall-copy-packet.md`。更新 本書、`PROJECT_STATUS.md`。
**Interfaces:** G1 fixture / surface 台帳を入力とし、exact English leaf・command qualifier・観測位置 → Japanese、再利用 leaf、room / map / assignment / actor / action identity、visible / accessible name、動的値、表示条件、canonical command を G3 に渡す。

- [x] G1 の新規観測 leaf と必要な surface を抽出し、既承認の新聞・初期 Simulation・restaurant copy との再利用を示す。
- [x] 市役所・広場・職員の在室・会話と退場・LOOK を文脈ごとに承認候補へまとめる。話者と評価対象の関係、職員の退場、時刻や録画状態を原文どおり保持する。
- [x] City Hall / Rockvil Centre の room、map `official`、既承認課題、人物、Talk、周囲の help を別行に整理し、visible / accessible copy と guard を揃える。未監査の actor verbs / aliases は翻訳承認しない。
- [x] 未観測 failure、city noise、対象外 phase / year / room の English fallback、source-only 値と runtime 値の違いを明示する。
- [x] `git diff --check`、fixture との exact text / command / link 照合と applicable CI を確認する。文書のみで未実行の local E2E はそのまま未実行と記録し、current-head CI / artifact は提出 PR を正本にする。
- [x] Sol の独立 copy approval / merge を受け、G3 の開始 gate を解除する。提出だけで承認済みにしない。

### G3: Integration — deliver and accept the complete City Hall route

**Files:** 更新 `app/localization.ts`、必要箇所の `app/PrismEdition.tsx` / `app/StoryTools.tsx` / `app/presentation-history.ts` / `app/globals.css`、`tests/rendered-html.test.mjs`、本書、`PROJECT_STATUS.md`。新規 `tests/e2e/city-hall-fieldwork.spec.ts`、`tests/e2e/city-hall-acceptance.ts`、`docs/city-hall-fieldwork-acceptance.md`。既存 `tests/e2e/restaurant-acceptance.ts` / reading observations は保証を保って再利用する。
**Interfaces:** G2 の exact leaf / command-qualified entry と identity 別 lookup を既存 catalog に加える。既存 `localizeSimulationPlace` / `localizeSimulationMapLabel` / scene label helpers を使う。Actor 可用性の変更は G1 の在室・退場観測を消費し、既存 SceneActions の draft / sendCommand 契約を保つ。新しい production observation API は追加しない。

- [x] G1 の現行 UI の不足に対応する failing regression を先に再現し、RED の根拠を記録する。既存挙動が満たす部分には同じ実装を写すだけのテストや追加 state を作らない。
- [x] 承認済み story / room / map / actor / action copy を統合する。必要なら在室・退場の局所修正を行い、会話後の cache と長い履歴から Talk が復活しないことを GREEN で確認する。
- [x] 6本の full fresh-session browser route を追加する。actual command / echo / current input、会話前後の recording、退場・LOOK、明示停止・帰着を記録する。Guided の編集可能 draft・submit、Actions の一回送信、Classic の非表示を実操作で確認する。
- [x] 非録画会話の checklist 負例と、受入境界に挙げた locale / actor 不在 / room / phase / input / history / recovery の regression を追加する。実測と controlled probes を分け、既存の全回帰を保持する。
- [x] 6経路で reading / a11y / scroll / focus を確認し、screenshots と JSON observations を passing artifact に保存する。Narrow の未出力時刻を含む限界を明記する。
- [x] full verification を実行し、受入条件→fixture / test / screenshot / current-head CI の対応表を作る。本書・status・受入記録を最終実装 PR に揃え、Sol の通常レビューを受ける。
- [x] Work へ reviewed head / base、差分、未解決指摘、6経路の evidence、CI / artifact と期限、未観測事項を渡す。Work の全体受入と merge、#29 報告、G3 close で milestone を完了する。

## 検証とレビューの運用

G1 / G3 は必要に応じ `bash scripts/bootstrap-npm.sh`、続いて `npm ci`、`npm run lint`、`npx tsc --noEmit`、`npm test`、`npm run test:e2e`、`sha256sum public/amfv-r79-s851122.z4`、`git diff --check` を行う。
G1 の capture は production build / preview を起動し、`node scripts/capture-city-hall-runtime.mjs --base-url http://127.0.0.1:3100 --output /tmp/parchment-city-hall-runtime-observed.json` で2 fresh session 以上を保存する設計とする。
G3 の対象確認は `npx playwright test tests/e2e/city-hall-fieldwork.spec.ts`。対象成功は full suite の代用にしない。
失敗・flaky・環境で未実行の確認は区別し、既知の failure を無条件に除外しない。既存31 / 34という過去結果を今回の成功として転記しない。

通常レビューは独立した Chat モード Sol が担当し、計画 PR / G1 / G2 は merge gate を満たせば Sol が merge する。
G3 は Sol 通常レビューの後、Work が milestone 全体を受け入れて merge する。すべての PR に Work review を重ねない。
再レビューは前の reviewed head からの差分と影響する証拠に集中し、具体的な波及・base 変更があるときに広げる。
同一 GitHub account の self-approval 制限には reviewed SHA・判断・provenance を持つ COMMENT review を使う。実行モデルは harness の事実を記録する。
別 PR に修正が分かれた場合は置換元・未解決指摘・引き継ぐ証拠を明記する。

最終実装者は、受入時に使える status / plan / acceptance の roll-up を G3 PR に含める。
Merge 前は未実施の merge / close を完了扱いせず、merge 後にも固定の「受入待ち」を残さない表現にする。最終 reviewed SHA / CI / merge / close は PR review・Issue・#29 の実行記録を正本とし、文書へ自身の最終 SHA を埋めるためだけの追加 commit を要求しない。
Work が内容のある文書修正を行った場合は、その差分を独立 review に戻す。通常の実装者の責務を締め担当へ移さない。
Artifact retention は既存14日を維持し、実際の期限を handoff に書く。採択根拠と必要 fixture は repository に残す。
締めでは review 回数・差し戻し理由・待ち時間を簡潔に記録する。計測していない usage 削減を成果として主張しない。
[#44](https://github.com/5gmt/mind-forever-voyaging/issues/44) の provenance conventions は独立して扱う。
