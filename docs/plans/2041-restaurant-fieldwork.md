# 2041 Restaurant Fieldwork Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL（利用可能な環境）: `superpowers:executing-plans` を使い、担当 Issue を一単位ずつ実行する。本計画の Codex Cloud / Sol / Astra の分担を優先し、追加の subagent review を既定で重ねない。

**Goal:** 初回2041年の同一 fresh canonical session で、既存の Courthouse → Newspaper に続いて Roy’s Pagoda で食事を録画し、Kennedy Park に帰着して通常入力へ戻る日本語体験を追加する。
**Architecture:** 既存の 2a+2b presentation、exact observed-leaf catalog、共有 room / map lookup、初期 fieldwork UI を再利用する。M1 が runtime と操作面を確定し、M2 が本文と必要な UI copy を一括承認し、M3 が統合と milestone 全体受入を担う。
**Tech Stack:** Next.js / React / TypeScript、canonical Release 79 / Parchment、Node.js tests、Playwright / Chromium、GitHub Actions。
**Spec:** 本書「採択した設計」。2026-10-09 JST に Yasuo が会話で方針とタスク化を承認。実測による経路採択は M1 の review gate に残す。
**Follow-up design:** [2026-10-21 の Astra の設計判断](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6316815976)で、A案の追加実測と限定 meal UI の設計範囲を承認。#83 merge 後に [2 fresh session で A案の成立を実測](../restaurant-recording-a-evidence.md)。成功経路の独立採択レビュー・merge 待ち、M2 / M3 は blocked。
**Baseline:** PR #77 merge `60fa28811504ad86cbc0389374f8770a5c9b709d`。実装開始時には最新 default branch を使用する。
**Execution root:** [#29](https://github.com/5gmt/mind-forever-voyaging/issues/29)。

## Global Constraints

- `public/amfv-r79-s851122.z4` の SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` を維持し、`source/` は変更しない。
- Release 79 / Parchment が parser、story、state、save/restore の唯一の権威である。状態認識は raw English、送信 command は canonical English を使う。
- Option 2a の host / window ownership、Option 2b の per-leaf fallback、history identity、recovery、accessibility exclusivity を保持する。
- 未観測・未承認 leaf、optional city noise、対象外 phase / year / re-entry、RESTORE 後の不明状態は canonical English へ安全に退避する。既存の日本語履歴を不必要に失わない。
- 本計画に production dependency、deployment、原作マップ描き直し、経路探索の再設計、general renderer、VM telemetry、runtime machine translation、日本語 parser、自動プレイを含めない。
- CI と branch / review の既存 merge gate は緩めない。`PROJECT_STATUS.md` と本書の実行状態は各担当 PR が更新し、最終 roll-up は M3 の実装担当が用意する。

## Review Focus

| 条件 | 期待する挙動 / 検証の担当 |
| --- | --- |
| 先行2課題後の recording 容量、所持金、経過時刻 | M1 が実測し、M3 が採択した同一 session 経路を再現する。録画中の食事と原作応答を確認し、checklist の推定だけで成功扱いにしない。 |
| 移動 command の反復と長い履歴 | M1 の capture と M3 の E2E は現在の input / turn ID を照合し、古い echo や rolling transcript を完了根拠にしない。 |
| 未知の地名・meal response、optional interrupt、再入場 / RESTORE | M2 が承認範囲を区切り、M3 が English fallback と既存日本語履歴の保持を検証する。 |
| 部屋・地図課題・対象物で異なる identity と実際の UI guard | M1 が現行表示を監査、M2 が役割別 copy を承認、M3 が既存 lookup を再利用する。未確定な対象は推測して操作候補にしない。 |
| narrow 表示、locale 往復、drawer 開閉 | M3 が本文末尾・地図・操作・入力への到達、focus 復帰、English subtree の `lang`、読み上げ対象の非重複を実ブラウザで確認する。 |

## 採択した設計

プレイヤーにとっての完了点は、既存の二つの調査に続き、レストランでの食事を録画して公園へ戻り、次の英語 command を入力できることである。
本文だけでなく、採用経路の地名、地図・経路案内、必要な対象操作、visible label / accessible name を含む。
既承認の九課題名と共通操作 copy は再利用する。
補助 checklist は推定であり、原作側の正式な九課題達成・帰還評価は今回の完了条件ではない。

以下の候補比較は計画時点の historical source と当時の UI に基づくもの。後に PR #82 で runtime capture を行い、実測証拠のみを受け入れて merge した。成功経路は採択していない。承認された A案の追加実測列と限定 meal UI の設計範囲は [follow-up decision packet](2041-restaurant-followup-decision.md) に記録する。

A案は初回 recording loop と Courthouse を維持し、Newspaper の徒歩・購入・四段落の読書・帰着をすべて残す。Bodanski Square で購入前に RECORD、読書後・帰路前に RECORD OFF とし、Restaurant は Roy's Pagoda で RECORD → BUY MEAL → RECORD OFF、非 recording で公園へ戻る。**Restaurant milestone 用の連続経路を追加**する判断であり、既存 Courthouse / Newspaper の成功 fixture・受入経路・回帰テストは保持する。過去の milestone の受入条件を遡って変えず、#82 の失敗 fixture も上書きしない。Source に基づく録画時間の見積り98→68は、実測容量や成功の証明ではない。

限定 meal UI は既存の初回2041年判定、Simulation Mode、raw English から解決した `ROYS-PAGODA`、line input を条件に、観測済み `BUY MEAL` 一つを提供する設計とする。Guided は編集可能な draft、Action menus は明示押下一回につき一回送信、Classic には追加しない。EN / JA で同じ可用性とし、busy 中は無効化する。QA、後続年、再入場、RESTORE 不明状態、未知 room には新設候補を出さず、既存 fallback を保持する。自動購入・自動録画、汎用 GLOBAL-OBJECTS guard の緩和、新 renderer は追加しない。具体的 copy は M2、実装・受入は M3 が担う。
レストランは既存 `meal` map target と短い徒歩経路を使える見込みがある。
公共交通は時刻・到着・発車と複数の同名 Tube Station、自宅は家族・時間帯、帰還評価は録画内容と phase 分岐が増えるため、今回の候補から外す。
この選択だけで未観測 prose や完了結果を承認しない。

| source / 現行実装で分かること | M1 で確定すること |
| --- | --- |
| Kennedy Park → Elm & Park → Elm & University → Elm Underpass → Roy’s Pagoda の接続。候補 command は往路 `SW W W S`、現地 `BUY MEAL`、復路 `N E E NE`。 | 実際に成立する command 列、必要な前提・録画区間、返る本文・status・input、帰着後の入力復帰。 |
| `MEAL-F` の Roy’s Pagoda 分岐は時間経過・支払・録画中の課題記録を持つ。2041年には後続年の営業時間 guard が適用されない。 | 原作の所持金・支払額・残高、経過時間、録画状態・警告、食事が録画中に成立すること。source の数値を観測値に転記しない。 |
| `V-RECORD-ON` には buffer capacity の制約がある。 | 先行経路後の実際の制約。必要な行動だけを録画する候補も検証し、全移動を録画するとは決めない。 |
| `ROCKVIL_LANDMARKS` に `meal` / `ROYS-PAGODA` があり、SceneActions に既存の action 生成がある。 | 各 mode の実表示、meal 対象の発見、command の draft / 即時送信、必要な表示面と不足。generic action の存在を到達可能な UI の証拠にしない。 |

根拠は `source/rockvil.zil` の関連 room / `ROYS-PAGODA-ENTER-F` / `MEAL-F`、`source/verbs.zil` の `V-RECORD-ON`、`app/StoryTools.tsx` の map / SceneActions である。
既存経路の実測は [newspaper runtime evidence](../newspaper-runtime-evidence.md)、既存全体受入は [Issue #67 acceptance](../issue-67-fieldwork-acceptance.md) を参照する。
今回追加する story copy の根拠は M1 の新規 fixture に限定する。

M1 は少なくとも二つの独立した fresh canonical session で、既存 Courthouse → Newspaper に続く候補を検証する。
継続に失敗した場合も失敗を記録し、別 session の食事だけで連続経路の成功を代用しない。
原作の状態を書き換えて録画容量や残高を回避しない。
Canonical output から直接確認できない容量の残量や内部課題 flag は、未観測と明記し、推定値を runtime fact にしない。

追加実測では全実送信列、current input / turn ID、status、警告の出現 turn を保存する。Courthouse LOOK、新聞購入・全記事 READ、食事の前後の canonical recording、食事22分と支払の実応答、食事後の recording 継続、明示 RECORD OFF の成功、非 recording で公園の通常入力へ復帰することを確認する。Half-full 警告は許容して、録画区間変更によって移動した出力位置も保持する。Full / auto-deactivation は成功に数えない。M1 の採択に M3 の未実装 meal UI の完成を要求せず、UI の要求・guard・command と現行操作面の監査を渡す。

同一 session での録画が成立しない、必要な UI が既存境界で安全に提供できない、または richer projection が必要なら、M1 の事実を保存して M2 / M3 を止める。
Astra が設計を再評価し、採用経路・完了条件・保証を変える場合は Yasuo の判断を記録してから本書と Issue を更新する。
専用 renderer や短縮経路を暗黙に追加しない。

## レビューと merge の分担

| 担当 | 責任 |
| --- | --- |
| Codex Cloud | M1–M3 の実装・自己点検・検証・指摘修正。各 PR の evidence packet と docs / status 更新、M3 の最終集約を用意する。 |
| Chat モードの Sol | 実装とは独立した session で、通常 PR の要件、diff、runtime / browser evidence、current-head CI をレビューする。問題がなければ M1 / M2 と本計画 PR を merge する。M3 は通常レビューを完了し Astra へ渡す。 |
| Astra（ChatGPT Work の milestone review 担当） | 計画と例外設計、M3 の milestone 全体受入。Sol の通常レビューと全体受入の両方が成立した最終 head を確認して M3 を merge する。 |
| Yasuo | 採用経路、完了条件、scope、architecture / guarantee の重要な変更を判断する。 |

この分担は今回の milestone で試行し、締めで review 回数・差し戻し・待ち時間を振り返る。
モデル名は役割の指定であり、実行 provenance は harness が実際に示す値を記録する。
GitHub の同一アカウントを共有していても、自己レビューを独立レビューと数えない。
GitHub が self-approval を許さない場合は、COMMENT review に承認 / 要修正、reviewed head、review 担当を明示する。

Astra への途中 escalation は、canonical authority、history / recovery / accessibility の保証、observation / renderer 境界、採用経路、完了条件を変更する判断に限定する。
既存保証を保持する通常の修正は Sol が review を完結させる。
再レビューは前回の reviewed head と新 head の差分、未解決 finding、影響する証拠を中心に行い、base 更新や波及リスクがある場合だけ対象を広げる。
エラーで別 PR が作られたときは置換元、未解決指摘、引き継いだ証拠を新 PR に記録する。

PR の引き渡しには次をまとめる。

- head SHA / base SHA、対象 Issue、前回 review からの変更、未解決 finding。
- acceptance criterion と実装 / テスト / 観測への対応表。
- 実行した command と結果、current-head CI URL、artifact URL・期限、必要な fixture / screenshot / turn / input ID。
- 未実施・失敗・flaky / 環境制約を区別した説明。過去 head の成功を現 head の成功に代用しない。
- 本書と `PROJECT_STATUS.md` の更新、保たれる保証、対象外の明示。

M1 が `.github/workflows/ci.yml` の acceptance artifact retention を 3日から **14日** に延ばし、実際の run の期限を確認する。
必要な fixture と採択根拠は repository に残し、短期 artifact だけを durable な根拠にしない。
#44 の provenance conventions は独立の作業として維持する。

## 作業一覧と現在の状態

| ID / Issue | 実装担当 | 通常レビュー | 依存関係 / 状態 |
| --- | --- | --- | --- |
| M1 / [#78](https://github.com/5gmt/mind-forever-voyaging/issues/78) | Codex Cloud | Chat モード Sol | 旧3 session の証拠は #82 で merge 済み。#83 merge 後、設計承認済み A案が2 fresh session で成立。成功経路の独立採択レビュー・merge 待ち。#78 は open。 |
| M2 / [#79](https://github.com/5gmt/mind-forever-voyaging/issues/79) | Codex Cloud | Chat モード Sol | M1 の実測・経路採択の review / merge を待つ。copy 未承認。 |
| M3 / [#80](https://github.com/5gmt/mind-forever-voyaging/issues/80) | Codex Cloud | Chat モード Sol、その後 Astra が全体受入 | M1 / M2 の merge を待つ。production 未実装。 |

再開 gate は **#83 の同期・通常レビュー・merge → M1 の2 fresh session以上の追加実測 → Sol の採択レビュー・merge → M2 の copy 承認・merge → M3**。この文書同期に Astra の再承認は不要。A案でも成立しない、または更なる経路・完了条件・保証の変更が必要な場合だけ設計判断へ戻す。

### M1: Runtime — capture the 2041 restaurant fieldwork route

**Files:** 新規 `scripts/capture-restaurant-runtime.mjs`、`tests/fixtures/parchment-restaurant-runtime-observed.json`、`docs/restaurant-runtime-evidence.md`。更新 `.github/workflows/ci.yml`、`tests/rendered-html.test.mjs`、`AGENTS.md` の retention 説明（必要箇所）、本書、`PROJECT_STATUS.md`。
**A follow-up files:** `scripts/capture-restaurant-runtime.mjs` の opt-in `--candidate-a`、別 fixture `tests/fixtures/parchment-restaurant-recording-a-observed.json`、`docs/restaurant-recording-a-evidence.md`、追加 regression と decision / plan / status の同期。旧 fixture と旧受入テストは保持する。
**Interfaces:** 既存 `scripts/capture-newspaper-runtime.mjs` と canonical bridge-v3 の観測形式を参照する。成果物は session / path / command ごとの exact English presentation、status、current input / turn identity、stable / dynamic / optional 分類、実操作 surface 台帳、経路採択判断。独自の production API は追加しない。

**CI follow-up:** 初回 M1 CI で既存 newspaper narrow acceptance の scroll 計測が失敗したため、`tests/e2e/newspaper-acceptance.ts` の hover を基準位置の設定前へ移す。既存の末尾可読性・wheel・focus assertion と production code を保持する限定的な harness 修正とする。

- [x] 現行 capture の同期方法と初回状態を確認し、fresh session、先行二経路、追加経路を再現する capture script を作る。各 command で現在の input ID と新しい echo / line-input を待つ。
- [x] 二つ以上の独立 session を実行し、開始日時や観測された変動を記録する。body の行順・空行・heading、status、input kind、支払・残高・時刻、recording 応答・警告を fixture に保存する。起動 character prompt は保存範囲外であることを記録した。
- [x] 食事を録画できる最小限の区間を調査する。先行経路を黙って変えず、候補と採用案を区別する。正常経路と harness failure / canonical failure の分類を残す。
- [x] Classic / Guided / Action menus の現行操作面を監査し、map target、room / map identity、対象・action、visible / accessible copy、動的値、guard、送信 command を evidence 文書に一覧化する。
- [x] 採取した fixture に基づく regression を追加し、command 列、current-turn identity、原文保持、既存 ordinary-turn projector での表現可否を固定する。未知出力を翻訳済みとして埋めない。
- [x] CI retention を14日に変更した。既存 Actions の SHA pin、`if: always()`、失敗時の job failure と upload 条件を保持。Current-head CI artifact の実際の有効期限は PR の引き渡し記録で確認する。
- [x] `npm run lint`、`npx tsc --noEmit`、`npm test`（29件）、`npm run test:e2e`（26件）、canonical checksum、`git diff --check` を実行。runtime evidence と採択 / 停止判断、本書と status を同じ PR に含める。
- [x] #83 の文書同期・Sol の通常レビュー・merge 後、承認された A案を2 fresh sessionで実行し、全送信列・input / turn ID・raw status・警告 turn を別候補 fixture に追加した。既存の成功・失敗 fixture と回帰テストは保持する。食事前後の録画継続・明示停止・非録画の公園通常入力を両 session で確認。
- [ ] 食事後の recording、明示停止、非 recording の公園通常入力までを確認し、Sol の独立した経路採択レビュー・merge を受ける。未実装 meal UI の完成をこの採択条件にしない。

**Done:** Sol が runtime・UI 要求と現行操作面の監査・既存 projection の適合性・採択経路を確認し、採択 PR を merge したこと。M3 の meal UI 実装完了は要求しない。失敗記録だけの merge は M2 / M3 を unblock しない。更なる経路や保証の変更が必要な場合は設計判断への link を必要とする。

### M2: Copy — approve restaurant story and controls together

**Files:** 新規 `docs/restaurant-copy-packet.md`。更新 本書、`PROJECT_STATUS.md`。
**Interfaces:** M1 の fixture と実操作 surface 台帳、既承認の `docs/newspaper-copy-packet.md` / `docs/initial-simulation-ui-copy-packet.md` を消費する。exact English leaf → Japanese、context qualifier、room / map / scene identity、表示条件、動的値、canonical command の表を M3 へ渡す。

- [ ] M1 の採択経路で実際に観測した stable story leaves と新規地名を抽出し、既承認 copy と重複・衝突を照合する。
- [ ] 来店・食事・支払・帰着の本文、地図課題 label、room name、対象名・action、visible / accessible name を一つの packet に記録する。既存 `Restaurant` 課題名と Roy’s Pagoda の room / map identity を混同しない。
- [ ] 限定 meal 操作を囲む visible / accessible な説明も監査・承認する。来店文に meal / food の言及がないため、既存の`Words mentioned here` / `この場面で言及された語`、`Actions for things mentioned here` / `この場面で言及された対象へのアクション`をそのまま新設候補へ適用しない。限定 surface の実態に即した copy とし、無関係な SceneActions の説明・guard を一括変更しない。
- [ ] 値の保持方針、optional / unknown English fallback、未観測失敗枝、後続 phase / year の非対象を明示する。表示範囲に合わせて既存 guard を変えない。
- [ ] Fixture の文字列・行順・blank-line boundary と表を照合し、source-only prose を追加していないこと、翻訳が意味関係や失敗を変えないことを確認する。
- [ ] `git diff --check` と applicable CI を確認し、本書と status を更新して Sol の copy review に出す。文書だけの変更ではローカル E2E を実施したと記載しない。

**Done:** Sol が本文と UI copy の両方を承認し M2 を merge したこと。production catalog / guard / fixture は変更しない。

### M3: Integrate and accept the restaurant fieldwork milestone

**Files:** 更新 `app/localization.ts`、必要な `app/PrismEdition.tsx` / `app/StoryTools.tsx`、`tests/rendered-html.test.mjs`。新規 `tests/e2e/restaurant-fieldwork.spec.ts`、`tests/e2e/restaurant-acceptance.ts`、`docs/restaurant-fieldwork-acceptance.md`。更新 本書、`PROJECT_STATUS.md`。
**Interfaces:** M1 fixture / 採択 command 列と M2 approved copy を消費する。既存 `localizeSimulationPlace`、`localizeSimulationMapLabel`、`localizeSceneObjectName`、`localizeSceneActionLabel` と ordinary-turn catalog を再利用し、room / map / assignment の lookup を重複させない。

- [ ] 採択 fixture と approved copy に対し、原文の忠実な projection、共有 lookup と English fallback を検証する unit regression を先に追加し、追加 coverage が未実装で失敗することを確認する。
- [ ] Approved leaves / role-specific labels を既存 catalog へ追加し、必要な操作面へ接続する。観測に基づく狭い対象保持が必要なら採択した scope 内に限定し、未知対象を推測で公開しない。
- [ ] current turn の meal response、recording の原作出力、支払・時刻と補助 checklist の推定を別々に検証する。同じ command の過去 echo、訪問だけ、成功語の部分一致を録画完了の代用にしない。
- [ ] Classic / Guided / Action menus × 1440×900 / 390×844 の6経路を、各 fresh canonical session の Courthouse → Newspaper → Restaurant → Kennedy Park / 録画停止・入力復帰として E2E にする。M1 の採択した録画区間を使う。
- [ ] Guided / Action menus では map / route / exits / compass と対象操作を実 UI から使い、English draft または既存即時送信、可視 / accessible copy、食事本文、drawer / 本文の scroll、入力・focus 復帰を確認する。Classic に assisted answer / controls を出さない。
- [ ] 限定 meal UI の EN / JA で同じ可用性、Guided の編集可能 draft、Action menus の明示押下一回につき `BUY MEAL` 一回送信、busy 中の無効化を検証する。Classic、QA、後続年、再入場、RESTORE 不明状態、未知 room では新設候補なし、既存 fallback を確認する。M2 承認の周囲の visible / accessible 説明も照合する。
- [ ] EN → JA → EN、長い履歴、unknown leaf / place、再入場・RESTORE 不明状態の regression を保持し、`lang` と accessibility owner の非重複を確認する。未実施の実保存データ RESTORE、音声 screen reader、本番配備を検証済みと称さない。
- [ ] 適用する full checks / canonical checksum を実行し、current-head CI と6経路の screenshots、turn / input / status・scroll・accessibility 記録を acceptance 文書へ対応付ける。
- [ ] Codex が実装済み coverage、受入待ち状態、merge を完了点とする最終 roll-up を本書と status に準備し、Sol の通常レビューを受ける。
- [ ] Sol の指摘修正後、Astra が同じ最終 head の全体受入を確認する。指摘による追加 commit は担当 reviewer が該当証拠を再確認し、latest base・behind=0・mergeable・current-head checks を満たして Astra が merge する。
- [ ] Merge 後に完了結果、reviewed head / merge commit、CI / artifact、受入 link と対象外を #29 に報告し、M3 Issue を閉じる。次の milestone を自動選択しない。

**Done:** Sol の通常レビューと Astra の6経路の全体受入が承認され、M3 が merge され、#29 に結果が記録されたこと。

## 変更・進行の記録

- 2026-10-09 JST: Yasuo がレストラン milestone と review 分担を承認。計画書と M1–M3 を作成。計画 PR は独立レビュー待ち。新規 runtime 観測、copy approval、production integration、14日 retention の適用は未実施。
- 2026-10-21 JST: #81 の merge `43b00db08fc5c2726095875b21dd381b42b0b682` を確認し M1 を実行。[Runtime evidence](../restaurant-runtime-evidence.md) と3 fresh session の fixture、UI 台帳、regression、CI retention 14日設定を追加。Travel 録画は食事前、meal-only は食事応答で buffer full / auto-deactivation。現地の食事対象操作も表示されない。採用経路なし、M2 / M3 は停止継続。Sol の独立レビューと Astra / Yasuo の設計判断へ渡し、完了条件を実装側で変更しない。
- 2026-10-21 JST（merge 後）: [PR #82 の独立レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/82#pullrequestreview-5599103425) は evidence-only として受け入れ、`f45d268282a40d63bf88e1eaf95b01c96961eeea` へ merge。[#78 のコメント](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6315058171)に従い #78 は open、M2/M3 は blocked を維持する。[再開判断用資料](2041-restaurant-followup-decision.md)を追加し、録画前提・限定 meal UI の具体案を未承認の候補として整理。追加 runtime や production 変更には着手していない。
- 2026-10-22 JST: [2026-10-21 の Astra の設計判断](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6316815976)と [#83 レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/83#pullrequestreview-5600151543)を反映。A案の追加実測方針・限定 meal UI の設計範囲は承認済み、追加実測前。既存成功経路と失敗記録の保持、限定 surface の説明監査、M1 に UI 完成を要求しない再開 gate を明記。#83 の Sol 通常レビュー・merge 待ち、#78 open・経路未採択・M2/M3 blocked を維持する。
- 2026-10-22 JST（#83 merge 後）: `bdc6f84e3de34b59d8477edcc5657d87f55b7362` から A案を2 fresh context で実測。両方で食事22分の前後が recording、明示停止成功、非録画で公園の通常入力まで成立。Half-full は Roy's RECORD turn に移動し、full / 自動停止はない。正午の optional output も保持した。[候補の実測記録](../restaurant-recording-a-evidence.md)と別 fixture、regression を追加し、成功経路の Sol 独立採択レビューへ渡す。#78 open・M2/M3 blocked を維持する。
