# 2041 Church Fieldwork Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL（利用可能な環境）: `superpowers:executing-plans` を使い、担当 Issue を一単位ずつ実行する。
> **Execution:** Codex Cloud が C1–C3 を実装する。独立した Chat モードの Sol が計画 PR と通常 PR をレビューし、計画 PR / C1 / C2 を merge する。C3 は Sol 通常レビュー後、Astra / ChatGPT Work が milestone 全体を受け入れて merge する。タスクごとの追加 agent 階層は要求しない。

**Goal:** 同じ初回2041年 canonical session の Courthouse → Newspaper → Restaurant → City Hall → Power Station に続き、St. Michael’s の教会関係者との会話を録画し、Kennedy Park の通常入力へ戻れる日本語体験を提供する。
**Architecture:** 既存の 2a+2b presentation、exact observed-leaf catalog、観測時 room scope、地名 lookup と SceneActions を拡張する。先行五課題を保持した runtime capture で経路・人物の出現・録画容量を確認し、copy approval 後に限定した会話支援を統合する。
**Tech Stack:** Next.js / React / TypeScript、canonical Release 79 / Parchment、既存 bridge-v3、Node test runner、Playwright / Chromium。
**Spec:** 本書の「選定と設計判断」「受入境界」。[PROJECT_CHARTER.md](../../PROJECT_CHARTER.md) と [AGENTS.md](../../AGENTS.md) の保証を保持する。
**Status:** [計画 PR #101](https://github.com/5gmt/mind-forever-voyaging/pull/101) と C1 #102 / C2 #103 / C3 #104 を提出。計画 PR の独立 Sol review / merge 待ち。教会の成功経路、runtime fixture、copy はまだ採択していない。
**Baseline:** Power Station の [PR #100](https://github.com/5gmt/mind-forever-voyaging/pull/100) merge `b1ce50995f4c44faa0dcd241177e5f0386a42868`。実行時には最新 `codex/modern-amfv` を含める。
**Execution root:** [#29](https://github.com/5gmt/mind-forever-voyaging/issues/29)。2026-10-29 JST の次期 milestone 選定・タスク作成依頼に対する提案。

## Global Constraints

- `public/amfv-r79-s851122.z4` の SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` を維持し、historical `source/` と非 canonical QA story は変更しない。
- Release 79 / Parchment を parser、game state、save/restore の唯一の権威とする。状態認識は raw English、送信 command は canonical English、翻訳は presentation に限定する。
- 2a の host / window ownership、2b の per-leaf fallback、history / recovery / accessibility、live `#windowport` の観測と `request-state` による起動同期を保持する。
- 新規翻訳と会話支援は初回2041年の採択経路に限定する。未知 room、再入場、Part II、後続年、QA、RESTORE 後の不明状態へ拡大しない。未観測・未承認の leaf は原文と `lang=en` を保持し、既存の正しい日本語履歴を保持する。
- 原作の録画出力と補助 checklist を区別する。推定6/9、source 上の内部 flag や容量を、原作の正式評価または観測済み残量と呼ばない。
- 先行67 line commands と録画区間、既存の成功・失敗 fixture と回帰を保持する。39 unit / 52 browser は PR #100 の受入実績であり、今回の検証結果ではない。
- 新 renderer、VM telemetry / state 書き換え、汎用 actor engine、GLOBAL-OBJECTS / LOCAL-GLOBALS guard の緩和、日本語 parser、自動録画・会話・移動、production dependency、deployment 変更は含めない。
- 各 PR が plan と `PROJECT_STATUS.md` を同期する。C3 実装者が最終受入記録と milestone roll-up を同じ PR に用意する。独立レビュー、behind=0、mergeability、current-head CI を merge gate とする。

## Review Focus

| 条件 | 期待する結果と担当 |
| --- | --- |
| 五課題後の時刻、人物出現、録画容量 | C1 が2 fresh sessions以上で自然な全経路を実測する。人物不在、full / auto-deactivation、会話不成立を成功扱いしない。C3 が6経路で再現する。 |
| 同じ人物の退場、再訪、別の教会 | C1 が会話・退場の raw leaf と操作不足を採取する。C3 は在室の新しい証拠に限って Talk を出し、会話後、時刻退場、他室、history 不明時に古い在室文で復活させない。 |
| 非録画の会話と過去の録画窓 | C3 は別 fresh session の非録画会話で教会課題を加算せず、先行五課題の推定5/9を保持する。過去の出現文や church heading だけでは達成扱いしない。 |
| 同文の別年、観測時 room、長い履歴 | C2 が identity / alias / scope を明記し、C3 は観測時 scope を保存する。移動や locale 切替で正しい履歴を失わず、別年・他室の同文を新規翻訳しない。 |
| 390px の本文・Talk・地図・入力と CI の余裕 | C3 が現地と帰着時の scroll / focus / EN → JA → EN / 単一 accessibility owner を確認する。全 suite の所要時間と artifact 実体を確認し、未出力の時計は合成しない。 |

## 選定と設計判断

### 候補の比較

次の到達点として、St. Michael’s の教会関係者との会話録画を提案する。
市役所で導入した人物支援を限定的に再利用でき、都市インフラの見学に続いて市民社会の受け止めを読む一つの往復になる。
これは現行 code / map と historical source に基づく計画判断であり、教会経路の runtime 成功を確認した判断ではない。
成功経路の採択は C1 の実測と独立レビューで行う。

| 候補 | 得られる体験と追加の判断 | 今回の判断 |
| --- | --- | --- |
| St. Michael’s の会話録画 | 公園から片道5手の経路と既存 Talk。出現時間・退場・別教会との同一 actor を扱う必要がある。 | 次期 milestone。C1 で時刻と容量を先に確認する。 |
| 自宅・映画・公共交通 | 残る生活観察。各施設の内部経路や時刻、乗車・上映等の境界を別途実測する必要がある。 | 後続候補。教会と一括して九課題全体を約束しない。 |
| Simulation 帰還と原作評価 | 原作が不足課題を評価する区間。録画 buffer 消去、評価分岐、再入場・phase 境界を伴う。 | 別 milestone。教会への途中で帰還を挿入しない。 |

実装方針は City Hall 型の限定 actor guard と既存 presentation history の最小拡張を選ぶ。
翻訳 catalog だけを増やす方法では、LOCAL-GLOBALS の人物を古い文から再表示する危険を解消できない。
全 actor を管理する engine の新設は今回の一人物・一室の受入に対して範囲が広いため採用しない。
State の配置や helper 名、限定 state の切り出し方は実装者に委ねるが、下記の観測契約と全既存回帰を保持する。

### 候補経路と録画区間

先行区間は [発電所実測](../power-station-runtime-evidence.md) と [受入記録](../power-station-fieldwork-acceptance.md) の67 line commandsをそのまま使う。
`scripts/capture-power-station-runtime.mjs` の prefix / Courthouse / Newspaper / Restaurant / City Hall / Power Station の順序、各録画区間、各公園帰着を保持する。
67件には観測した decoder answer の1送信を含み、起動 character input は別記する。

| 区間 | 候補 command と room identity |
| --- | --- |
| 往路（非録画） | `NE` → `E` → `E` → `N` → `W` |
| 往路の地点 | `KENNEDY-PARK` → `MAIN-AND-KENNEDY` → `MAIN-AND-RIVER` → `MAIN-AND-CHURCH` → `CHURCH-ENTRANCE` → `ST-MICHAELS` |
| 現地 | 到着・人物の在室・recording off を確認 → `RECORD` → `CHURCH ELDER, HELLO` → `RECORD OFF` → `LOOK`。会話による退場と、退場後 LOOK の通常入力を確認する。 |
| 復路（非録画） | `E` → `S` → `W` → `W` → `SW`。同じ地点を逆順に通り、公園の通常 line input で終える。 |

追加14送信、合計81 line commandsは計画時の候補である。
経路は `walkingRoute` と `WORLD_ROOMS` の exit 順序から、Talk は `SceneActions` の `${noun}, hello` と `CHURCH-OFFICIAL.commandNoun` から得た。
C1 は `east` / `north` / `west` 等の実 UI alias と `church elder, hello` の実際の大小文字も採取する。
地図操作と locale 切替は parser へ送信しない。
Generated data の一般名 `Vacant Lot` を2041年の表示名に採らず、runtime の `St. Michael's` / `Church Entrance` と room identity を照合する。

Source の `ST-MICHAELS-F` / `ELDER-MOVE` / `CHURCH-OFFICIAL-F` / `BRIEF-CHAT`（`source/rockvil.zil`）では、2041 / 2051年、`480 < STIME < 1200`、未会話等の条件で人物が現れる。
Source 上の時刻退場は `STIME > 1200` であり、出現・退場の境界値は同じ比較ではない。
会話は8分経過し、人物を退場させ、2041年の録画中なら table index 12 を設定する。
同一 `CHURCH-OFFICIAL` は `FIRST-METHODIST-CHURCH` にも使われる。
これらは実測を設計する手掛かりであり、source の時刻や flag を wrapper の権威にせず、runtime で未観測の原文を翻訳承認しない。

C1 は2回以上の fresh canonical sessionで先行五課題から全候補経路を採取する。
Desktop の raw status に時刻があれば保存し、人物出現と会話の直前・直後、録画 on/off、half-full warning、帰着を確認する。
人物不在、会話不成立、full / auto-deactivation、通常入力へ戻れない場合は失敗を保存し、成功経路として採択しない。
Optional city output は消さず、未承認 fallback と必須本文を区別する。
経路・録画窓の変更、WAIT 挿入、教会や先行課題順の変更、buffer 消去や帰還、新 observation boundary が必要なら Work に設計判断を戻す。
重要な到達点変更は Yasuo の判断を記録する。
失敗 evidence-only PR は merge できるが、それだけで C1 採択完了や C2 / C3 開始にはしない。

### 人物支援、UI、copy の責任範囲

必須 UI は current place / identity rail、地図 `church`、route / compass / exits、録画と LOOK、教会関係者の Talk、補助 checklist である。
`ST-MICHAELS` の room 名 `St. Michael's`、map `church` の `St. Michael's Church`、`CHURCH-ENTRANCE`、人物 `CHURCH-OFFICIAL`、既承認課題 index 6「教会関係者と話すこと」は別々の台帳行にする。
採択経路上の既存訳を再利用し、必要な exact room identity だけを追加する。
`CHURCH-OBJECT` の建物操作、First Methodist、墓地・建設現場、別の人物や動詞を新規支援の対象にしない。

Guided の Talk は編集可能な English draft を入力へ入れ、明示 submit で送る。
Actions の Talk は明示押下1回につき1送信とする。
Map route / compass / companion exits / RECORD / LOOK の既存 draft・直接送信の区別は C1 の台帳に記録し、Guided の全移動を一律 draft に変更しない。
Classic に assisted controls を追加せず、busy 中は送信せず、char input では新しい line-input 支援を出さない。
EN / JA で command と可用性を揃え、main と companion の両 SceneActions に同じ人物境界を適用する。

人物の可用性は、初回2041年・解決済み `ST-MICHAELS`・line input と、その visit で得た新しい raw 在室証拠の組合せで決める。
Room heading、一般名「official」、source の配置、壁時計、過去の在室文だけでは Talk を出さない。
会話成立の raw 応答を観測したら、その session の会話済み状態を保持し、LOOK、room 再訪、20,000文字の rolling window、locale 切替で人物を復活させない。
時刻による `The church official wanders off.` は「現在不在」として失効させ、会話済みと混同しない。新たな在室証拠がない間は出さない。
他室へ移動したら在室証拠を失効させる。未知 room、report 欠損、RESTORE、fresh session の reset と初回 Simulation state の関係は fail-closed とし、復元成功・元の在室を推測しない。
狭い画面で時刻が出ないことは既存の runtime 制約として記録し、可用性のために時計を合成しない。

本文は C1 で観測し C2 で承認した exact leaf / command alias と観測時 room / 初回2041年 scope を消費する。
`reconcilePresentationHistory` / `projectPresentationHistory` の既存責務内で必要な狭い scope を保存し、現在地で過去の文を再分類しない。
在室・退場 state と履歴の翻訳適用条件を混同せず、人物の退場後も正しく観測した会話の日本語を保持する。
First Methodist や後続年の同文、未承認 leaf は English fallback とする。
録画の補助推定には既存の会話応答の rule を使い、room 到着や出現だけで加算する新 rule は設けない。

## 受入境界

- Classic / Guided / Actions × 1440×900 / 390×844 の6 fresh sessionsで、先行五課題を含む採択経路を完走する。新規6経路は既存52 browser testsを置換しない。
- 必須本文は到着、人物の出現、録画中の会話と退場、明示 OFF、退場後 LOOK、復路と公園帰着の観測済み leaf。Optional noise は削除せず未承認なら英語のまま表示する。
- Assisted の往復は実際の地図 / route / compass controls を使い、録画・Talk・LOOK も実 UI で操作する。Guided の draft から submit まで、Actions の1回送信を raw input chain で確認する。
- 到着は recording off、RECORD 後と会話応答時は on、明示 OFF 後と帰着は off。Half-full warning を保存し、full / auto-deactivation は失敗にする。補助推定6/9と先行五課題保持を実 UI で照合し、Classic には checklist を追加しない。
- 別 Actions / 1440×900 の fresh canonical sessionで、同じ先行67件の後、教会で RECORD せずに会話・退場後 LOOK・帰着を行う（候補79 line commands）。教会を加算せず推定5/9を保持する。後から録画を開始しただけで過去の会話を拾わないことは controlled regression で確認する。
- Main / companion の人物操作について、到着時の在室、会話後・LOOK・再訪後の不在、busy / char input、別室・未知 room、First Methodist、時刻退場を検証する。時刻退場や別年等を controlled reports で検証した場合は自然な runtime capture と明確に分け、VM を書き換えない。
- Long history、同じ原文の後続年、再入場、Part II、QA、RESTORE 後の不明状態、新 session に対し、人物可用性と翻訳 scope の両方を regression で確認する。City Hall の既存人物 guard も維持する。
- Current input ID / new echo / next input、actual sent command、raw status、末尾の可読性、地図と入力への到達、focus、EN → JA → EN、`lang`、単一 accessibility owner を現地と帰着で保存する。会話の長い段落と390pxのdrawer最下部への到達も確認する。
- 既存テストの `church` に対する未翻訳期待があれば C2 承認範囲の正例へ更新し、未承認 `movie` / `Cinema` 等の English fallback と `lang=en` の検証を残す。

## タスクセット

| ID | 成果物 | 依存関係と完了 gate |
| --- | --- | --- |
| C1 / [#102](https://github.com/5gmt/mind-forever-voyaging/issues/102) | 五課題後の runtime fixture、操作面の台帳、教会往復の採択 | 計画 PR merge 後。Sol が実測をレビューして成功経路を採択し merge。 |
| C2 / [#103](https://github.com/5gmt/mind-forever-voyaging/issues/103) | 本文、地名、人物・Talk の copy packet | C1 採択と merge 後。Sol が copy を独立承認して merge。 |
| C3 / [#104](https://github.com/5gmt/mind-forever-voyaging/issues/104) | 日本語統合、限定 actor guard、6経路と負例、境界回帰、最終受入記録 | C1 / C2 merge 後。Sol 通常レビュー → Work 全体受入と merge → #29 報告と Issue close。 |

### C1: Capture and adopt the church route after five fieldwork tasks

**Files:** 新規 `scripts/capture-church-runtime.mjs`、`tests/fixtures/parchment-church-runtime-observed.json`、`docs/church-runtime-evidence.md`。更新 `tests/rendered-html.test.mjs`、本書、`PROJECT_STATUS.md`。
**Interfaces:** `scripts/capture-power-station-runtime.mjs` の67送信と bridge-v3 observation 形式を参照する。成果物は `sessions`、actual command、送信元 input ID、新 echo、次 input ID、status、行構造、stable / dynamic / optional 分類、実 UI alias、surface 台帳、採択または停止判断。Production code、既存 capture / fixture を変更しない。

- [ ] 最新 base と規則を確認し、候補81送信の capture を用意する。失敗途中も保存する。
- [ ] 2 fresh sessions以上で全経路を採取する。Decoder answer と起動 character input を分離し、反復する移動を current input identity で待つ。
- [ ] 時刻が出る status、在室、録画中会話、退場、明示 OFF、LOOK、公園帰着、容量警告を照合する。失敗・optional output・未観測を区別し、source の原文で runtime fixture を補わない。
- [ ] EN / JA と3 interaction modesで route / compass / exits / recording / LOOK / main・companion SceneActions を監査する。Visible / accessible name、`lang`、送信元、draft / 直接送信、人物の既存 guard と不足を台帳に残す。まだ実装していない日本語や guard の不足は C3 への明示 handoff とし、C1 の production 修正にしない。
- [ ] `tests/rendered-html.test.mjs` に fixture の全81送信候補と先行67件の順序、input chain、在室・会話・退場・録画窓、既存 ordinary projection の構造保持を固定する regression を追加し実行する。採択経路が変わる場合は先に設計判断を記録する。
- [ ] Applicable checks、checksum、diff check を行い、実測・source・UI の区別、未確認範囲、plan / status をそろえて PR を提出する。
- [ ] Sol が成功経路と操作契約を独立採択し merge。失敗 evidence-only の merge では C2 を開始しない。

### C2: Approve church story, navigation, and Talk copy

**Files:** 新規 `docs/church-copy-packet.md`。更新 本書、`PROJECT_STATUS.md`。
**Interfaces:** C1 の fixture / aliases / surface 台帳を消費し、exact English leaf と観測 command / room → Japanese、再利用 leaf、room / map / actor / assignment identity、visible / accessible name、動的値、適用条件、canonical command を C3 に渡す。

- [ ] 採択した経路の新規 leaf と再利用 leaf を整理し、heading、段落、空行、時刻と optional noise を区別する。Source-only prose は承認しない。
- [ ] 建物と原教会の関係、教会関係者が礼拝参加の増加を国の道徳的風潮と結びつける発言主体、会話後退場を保持する。2051年の宗教的寛容に関する別会話を混ぜない。
- [ ] 経路の room、map `church`、人物、課題 index 6、Talk / draft help / route / recording / LOOK の visible・accessible copy と `lang` を別行で承認候補にする。Command は English のまま、人物の不明・不在時に翻訳を理由として guard を広げない。
- [ ] Fixture の exact text / alias / link を照合して `git diff --check` を行い、local 未実施の E2E と current-head CI を区別して提出する。
- [ ] Sol の copy approval と merge 後に C3 の開始 gate を解除する。

### C3: Integrate church localization and accept the six-task route

**Files:** 更新 `app/localization.ts`、`app/PrismEdition.tsx`、`app/StoryTools.tsx`、`app/presentation-history.ts`、`tests/rendered-html.test.mjs`。新規 `tests/e2e/church-acceptance.ts`、`tests/e2e/church-fieldwork.spec.ts`、`docs/church-fieldwork-acceptance.md`。必要な最小変更のみ `tests/e2e/power-station-acceptance.ts` / `tests/e2e/first-simulation-localization.spec.ts` / `.github/workflows/ci.yml`。本書と `PROJECT_STATUS.md` を同期する。
**Interfaces:** C1 の観測契約と C2 の承認 copy を消費する。`acceptPowerStationMilestone(page: Page, controls: "classic" | "guided" | "actions", testInfo: TestInfo, recordFacility = true)` を先行67送信・全 assertion の入口として再利用する。現在は戻り値がないため、既存の `frame` / `input` / `status` / `send` / `snapshot` / `rawTrace` 等を返す最小拡張を許可する。先行 assertion、録画窓、添付を削らず、残る未送信 draft は送信せず消去する。新 helper `acceptChurchMilestone(page: Page, controls: "classic" | "guided" | "actions", testInfo: TestInfo, recordConversation = true)` が教会区間と帰着を検証する。

- [ ] C1 の不足に対応する catalog / scope / 人物 guard の regression を追加し RED を確認する。既存挙動で足りるところに余分な state や汎用化を追加しない。
- [ ] 承認本文・地名・人物・Talk を統合し、観測時 room scope と session 内人物境界を GREEN にする。City Hall と全既存回帰を維持する。
- [ ] 新規6 fresh routesで、先行67＋教会区間の順序と actual input chain、実 assisted controls、録画中の会話・退場、明示 OFF、LOOK、公園通常入力を保存する。
- [ ] 別 fresh session の非録画負例と推定5/9、controlled の後付け録画負例を検証する。Room 名・出現だけを加点しない。
- [ ] Main / companion の在室・会話後・時刻退場・再訪・別教会、busy / char、long history、RESTORE 不明、新 session、対象外 phase / year / QA を unit と controlled browser regression で固定する。自然な runtime 証拠と分けて記録する。
- [ ] 現地と帰着の reading / scroll / focus / locale / a11y を保存する。PNG、JSON、accessibility snapshot と controlled probe はすべて `testInfo.outputPath` 等に実ファイルとして保存して添付し、passing artifact ZIP 内の存在も確認する。
- [ ] Full verification と checksum / diff check を行い、全 suite の件数・retry / skip・browser job / step 所要時間・artifact size を記録する。CI 時間の扱いは下記運用に従う。
- [ ] 受入条件→fixture / test / screenshot / CI の対応、6経路と負例、失敗・再実行、既知の限界を受入記録へ集約し、status / plan の roll-up と共に Sol 通常レビューへ提出する。
- [ ] Work へ head / base、review 後差分、未解決指摘、current-head CI / artifact / expiry を渡す。Work の全体受入と merge、#29 報告、C3 close で milestone を完了する。

## 検証とレビューの運用

C1 / C3 は必要に応じ `bash scripts/bootstrap-npm.sh`、続いて `npm ci`、`npm run lint`、`npx tsc --noEmit`、`npm test`、full `npm run test:e2e`、checksum、`git diff --check` を実行する。
C1 capture は production build / preview に対して `node scripts/capture-church-runtime.mjs --base-url http://127.0.0.1:3100 --output /tmp/parchment-church-runtime-observed.json` で行う。
C3 の対象確認は `npx playwright test tests/e2e/church-fieldwork.spec.ts` とし、対象成功を full suite の代用にしない。
C2 と計画 PR は文書・fixture・リンクの照合と diff check を行い、local 未実施項目と current-head CI を区別する。

PR #100 の受入 run では52 browser tests、step 22分50秒 / job 23分35秒、job 上限35分だった。
C3 は新規経路を追加した全体の実測を記録する。
35分に収まらない場合、正当な新規経路の増加か起動待ち・失敗かを区別し、必要最小限の timeout 変更は根拠と新上限を同じ C3 PR で Sol / Work にレビューしてもらう。
計画時点で上限は変更しない。CI 分割・並列化・テスト削除・retry 追加による短縮はこの計画に含めず、別途判断する。

通常 PR は実装と独立した Chat モード Sol が担当し、C3 のみ Work が全体受入を行う。
再レビューは reviewed head からの差分と影響する証拠を確認し、base 変更や具体的な波及がある場合に広げる。
Shared account による self-approval 制限時は reviewed SHA・判断・provenance を COMMENT review に記録する。
最終実装者が status / plan / acceptance を集約し、未実施の merge / close を完了扱いしない。
最終 SHA、CI、merge、close の正本は PR review / Issue / #29 とし、自己参照の SHA 更新だけの commit は要求しない。
Artifact retention は14日を維持し、実際の期限を handoff に記載する。Raw fixture は repository に残す。
締めではレビュー回数、差し戻し理由、引継ぎから受入までの経過時間を記録し、未計測の usage 削減量を主張しない。
[#44](https://github.com/5gmt/mind-forever-voyaging/issues/44) の provenance conventions は別件として継続する。
