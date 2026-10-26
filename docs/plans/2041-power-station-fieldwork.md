# 2041 Power Station Fieldwork Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL（利用可能な環境）: `superpowers:executing-plans` を使い、担当 Issue を一単位ずつ実行する。
> **Execution:** Codex Cloud が P1–P3 を実装する。独立した Chat モードの Sol が計画 PR と通常 PR をレビューし、計画 PR / P1 / P2 を merge する。P3 は Sol 通常レビュー後、Astra / ChatGPT Work が milestone 全体を受け入れて merge する。タスクごとの追加 agent 階層は要求しない。

**Goal:** 同じ初回2041年 canonical session の Courthouse → Newspaper → Restaurant → City Hall に続き、発電所を録画して見学し、Kennedy Park の通常入力へ戻れる日本語体験を提供する。
**Architecture:** 既存の 2a+2b presentation、exact observed-leaf catalog、観測時の room scope、room / map lookup と録画操作を拡張する。先行四課題を保持した実測で経路を採択してから、本文と必要な UI の copy を承認し、統合する。
**Tech Stack:** Next.js / React / TypeScript、canonical Release 79 / Parchment、既存 bridge-v3、Node test runner、Playwright / Chromium。
**Spec:** 本書の「選定と設計判断」「受入境界」。[PROJECT_CHARTER.md](../../PROJECT_CHARTER.md) と [AGENTS.md](../../AGENTS.md) の保証を保持する。
**Status:** 計画提案。計画 PR の独立 Sol review / merge が P1 の開始 gate。新経路の runtime 成功と翻訳は未承認。
**Baseline:** City Hall の PR #93 merge `967036d818583806e88d4d77f541e41af56b3d9f`。実行時には最新 `codex/modern-amfv` を含める。
**Execution root:** [#29](https://github.com/5gmt/mind-forever-voyaging/issues/29)。今回の milestone 選定とタスク化は2026-10-26 JST の依頼に基づく。

## Global Constraints

- `public/amfv-r79-s851122.z4` の SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` を維持し、historical `source/` は変更しない。
- Release 79 / Parchment を parser、game state、save/restore の唯一の権威とする。状態認識は raw English、送信 command は canonical English、翻訳は presentation に限定する。
- 2a の host / window ownership、2b の per-leaf fallback、history / recovery / accessibility、live `#windowport` の観測と `request-state` による起動同期を保持する。
- 新規翻訳は初回2041年の採択経路に限定する。未知 room、再入場、Part II、後続年、QA、RESTORE 後の不明状態へ拡大しない。未観測または未承認の leaf は原文と `lang=en` を保持し、既存の正しい日本語履歴を保持する。
- 原作の録画出力と補助 checklist を区別する。推定5/9、source 上の内部 flag や容量を、原作の正式評価または観測済み残量と呼ばない。
- 新 renderer、VM telemetry / state 書き換え、汎用 actor engine、GLOBAL-OBJECTS / LOCAL-GLOBALS guard の緩和、日本語 parser、自動録画や移動、production dependency、deployment 変更は含めない。
- 先行50 line commands と録画区間、既存の成功と失敗の fixture、既存43 browser tests の保証を保持する。35 unit / 43 browser は基準 commit の実績であり、今回の検証結果ではない。
- 各 PR が plan と `PROJECT_STATUS.md` を同期する。P3 実装者が最終受入記録と milestone roll-up を同じ PR に用意する。独立レビュー、behind=0、mergeability、current-head CI を merge gate とする。

## Review Focus

| 条件 | 期待する結果と担当 |
| --- | --- |
| 四課題後の録画容量と往復の成立 | P1 が2 fresh sessions 以上で全区間を実測し、P3 が6経路で再現する。full / auto-deactivation、意図しない mode 変更は成功にしない。 |
| 発電所入口と施設内、非録画の見学 | P1 が両地点の raw status と録画区間を採取する。P3 は入口だけの録画と施設内の非録画 LOOK で新たな発電所課題を加算しない。 |
| 反復する移動と長い履歴 | P1 / P3 は各送信の current input ID、新 echo、次 input を照合する。過去の heading を新たな録画の証拠にせず、先行四課題の有効な推定を保持する。 |
| 観測時 room、年、locale と未承認の文 | P2 が identity と適用条件を分け、P3 が観測時の条件を保存する。現在地変更で既存の日本語を失わず、別年や未知 room の同文を新規翻訳しない。 |
| 390px の地図、入力、本文、英語 subtree | P3 が現地と帰着時の scroll / focus / EN → JA → EN / accessibility owner を確認する。未出力の時計は合成せず、未承認地名の英語 fallback テストも残す。 |

## 選定と設計判断

### 候補の比較

次の到達点は発電所とする。
四課題に都市インフラの観察を加え、既存の地図、移動、録画、LOOK で一つの往復を構成できる。
以下は current code と historical source に基づく計画上の比較であり、新しい候補経路を実行して成功を確認した比較ではない。
成功経路の採択権限は P1 の実測と独立レビューに残す。

| 候補 | プレイヤーに加わる体験 | 今回の判断 |
| --- | --- | --- |
| 発電所の見学と録画 | 都市インフラを読み、公園へ戻る第五の調査体験。新しい人物操作を要しない。 | 採用候補。片道7手の新しい地名と四課題後の録画容量を P1 で確認する。 |
| 教会関係者との会話 | 別の会話課題。現行地図の St. Michael's は公園から5手。 | 後続候補。同一 actor の教会間移動、8時から20時の出現条件、会話後の退場と再訪を扱う必要がある。 |
| Simulation 帰還と評価 | 原作が不足課題を示す区間に進める。 | 後続候補。`I-FIRST-SIMULATION-RESULT` の録画 buffer 消去、不足数による分岐、再入場と phase の境界を別途設計する。 |

自宅、映画、公共交通、残る九課題全体の完了はこの計画に含めない。
先行 milestone の締めで指摘した補助 probe の添付保存は P3 に含め、独立した保守 milestone や追加 PR を作らない。
通常 PR は Sol、締めは Work の分担を継続する。

### 候補経路と録画区間

先行区間は [City Hall 実測](../city-hall-runtime-evidence.md) と [受入記録](../city-hall-fieldwork-acceptance.md) の50 line commandsをそのまま使う。
`scripts/capture-city-hall-runtime.mjs` の prefix / Courthouse / Newspaper / Restaurant / City Hall の順序、各録画区間、各公園帰着を保持する。
50件には実際に観測した decoder answer の1送信を含め、起動 character input は別に記録する。

| 区間 | 候補 command と room identity |
| --- | --- |
| 往路（非録画） | `SE` → `E` → `S` → `S` → `SE` → `SE` → `S` |
| 往路の地点 | `KENNEDY-PARK` → `ELM-AND-KENNEDY` → `ELM-AND-RIVER` → `SOUTHWAY-AND-RIVER` → `BEND` → `WICKER-AND-RIVER` → `POWER-STATION-ENTRANCE` → `POWER-STATION` |
| 現地の録画 | 施設内への到着と recording off を確認 → `RECORD` → `LOOK` → `RECORD OFF` |
| 復路（非録画） | `N` → `NW` → `NW` → `N` → `N` → `W` → `NW`。同じ地点を逆順に通り、Kennedy Park の通常 line input で終える。 |

計画時の追加は17送信、合計67 line commandsである。
現行 `walkingRoute` と `WORLD_ROOMS` の順序から得た列で、runtime での採択済み経路ではない。
Assisted controls が送る `east` / `south` / `north` / `west` などの alias と実際の大文字小文字は P1 で採取し、copy と catalog の command qualifier に渡す。
地図操作や locale 切替は parser へ送信しない。

発電所の原文は `source/rockvil.zil` の `POWER-STATION-F`、出入口は `POWER-STATION` / `POWER-STATION-ENTRANCE`、録画の場所条件と容量警告は `source/misc.zil` の録画処理に根拠がある。
Source では recording が有効な facility 内の turn が課題対象となり、入口は別室である。
`LOOK` は現地本文を録画中に観測し直すために行う。
Source の90という容量閾値や内部 table index 4を runtime の残量または正式達成の証拠に転記しない。

P1 は2回以上の独立した fresh canonical session で四課題を含む全経路を実測する。
各地点、会話済みの先行経路、現地録画、明示 OFF、帰着を確認する。
Half-full warning は発生位置と原文を保存する。
Full / auto-deactivation、移動不成立、施設本文が録画できない場合、通常入力へ戻れない場合は失敗として保存する。
街路の optional output は消さず、未承認のままでも経路の成立を妨げない限り English fallback の対象として分類する。

失敗 evidence-only の PR は merge できるが、P1 採択完了または P2 / P3 の開始にはしない。
先行50送信の変更、buffer 消去や帰還の挿入、録画区間の変更、新 observation boundary が必要なら Work に設計判断を戻す。
重要な到達点変更は Yasuo の判断を記録する。

### UI と翻訳の責任範囲

必須 UI は採択経路の current place、identity rail、地図 `power`、route / compass / exits、課題ラベル、recording controls と現地 LOOK である。
`POWER-STATION`、`POWER-STATION-ENTRANCE`、map identity `power`、既承認の課題 index 2「発電施設を訪れること」は別の台帳行にする。
残りの経路上の room は既存 lookup を再利用し、未登録の exact identity だけを追加する。

P1 は現地に表示される `POWER-STATION-OBJECT` 等の SceneActions も監査するが、今回の必須操作は既存の LOOK と移動で成立させる。
新たな Enter / Leave ボタン、object verb、actor の支援は追加しない。
採択経路で使用しない object / action は既存の英語 fallback を保持し、その subtree の `lang` を誤って日本語にしない。
追加の object 操作が必須と判明した場合は、P1 採択前に scope を見直す。

Guided は移動候補を編集可能な English draft にし、明示 submit で送る。
Actions は移動の明示押下1回に1送信とする。
既存の録画と LOOK の直接送信規則は変えず、P1 の surface 台帳に記録する。
Busy 中は送信せず、char input で新しい line-input 支援を出さず、Classic に assisted controls を追加しない。
EN / JA で command と可用性を揃える。

新しい exact leaf は初回2041年かつその leaf に対応する解決済み room で観測された場合だけ日本語化する。
City Hall が導入した観測時 scope の扱いを参考に、既存 `reconcilePresentationHistory` / `projectPresentationHistory` の責務内で必要最小限の範囲を追加する。
現在地から過去の履歴を再分類せず、room の取り違えと未知状態は英語へ退避させる。
City Hall の人物 guard を発電所のために変更せず、catalog 拡張を理由に汎用 context engine を新設しない。

## 受入境界

- Classic / Guided / Actions × 1440×900 / 390×844 の6 fresh sessionsで、先行四課題を含む採択経路を完走する。新規6経路は既存43 browser testsを置換しない。
- 必須本文は新しい地点への到着、現地の録画中 LOOK、明示 OFF、復路と公園帰着の観測済み leaf。経路上の反復描写や optional noise を落とさず、未承認内容は原文で表示する。
- Assisted の往復は実際の地図、route、compass controls を使い、録画と LOOK も実 UI から操作する。Raw command だけの成功や draft の生成だけで代用しない。
- 施設内到着時は非録画、RECORD 後と LOOK 後は録画中、明示 OFF 後と帰着時は非録画であることを raw status で確認する。先行四課題と新しい課題の補助推定5/9は Guided / Actions の実表示で照合するが、正式達成の代用にしない。Classic に checklist を追加しない。
- 別の Actions / 1440×900 の fresh canonical session で先行四課題を実施し、入口だけの録画と、施設内の非録画 LOOK を順に行って帰着する。新たな発電所課題を加算せず、先行四課題の推定4/9を保持する。Negative route は正常な録画経路と混ぜない。
- Current input / new echo / next input、actual sent command、raw status、末尾の可読性、地図と入力への到達、focus、EN → JA → EN、`lang`、単一 accessibility owner を保存する。390pxで出力されない時刻は未観測とする。
- 未知 room、同じ原文の後続年、再入場、Part II、QA、RESTORE 後の不明状態、新 session、long history と過去の非録画 heading に対する境界を regression で確認する。Controlled wrapper reports と自然な canonical session は分け、VM を書き換えない。
- 既存 `first-simulation-localization.spec.ts` の Power Station 英語 fallback 期待は、P2 承認後に日本語の正例へ更新する。同時に未承認 map identity `movie` / `Cinema` の English label と `lang=en` を検証し、fallback の保証を削除しない。

## タスクセット

| ID | 成果物 | 依存関係と完了 gate |
| --- | --- | --- |
| P1 | 四課題後の runtime fixture、操作面の台帳、発電所往復の採択 | 計画 PR merge 後。Sol が実測をレビューして成功経路を採択し merge。 |
| P2 | 本文、地名、地図と必要な操作の copy packet | P1 採択と merge 後。Sol が copy を独立承認して merge。 |
| P3 | 日本語統合、6経路と負例、境界回帰、最終受入記録 | P1 / P2 merge 後。Sol 通常レビュー → Work 全体受入と merge → #29 報告と Issue close。 |

### P1: Capture and adopt the Power Station route after four fieldwork tasks

**Files:** 新規 `scripts/capture-power-station-runtime.mjs`、`tests/fixtures/parchment-power-station-runtime-observed.json`、`docs/power-station-runtime-evidence.md`。更新 `tests/rendered-html.test.mjs`、本書、`PROJECT_STATUS.md`。
**Interfaces:** `scripts/capture-city-hall-runtime.mjs` の `prefixPath` / `courthousePath` / `newspaperPath` / `restaurantPath` / `cityHallPath` と bridge-v3 observation の形式を参照する。成果物は `sessions`、actual command、送信元 input ID、新 echo、次 input ID、status、行構造の対応、stable / dynamic / optional の分類、alias、surface 台帳、採択または停止判断。既存 capture / fixture を置換しない。

- [ ] 現行規則と最新 base を確認し、候補67送信の capture を用意する。Production code は変更せず、失敗途中の観測も保存する。
- [ ] 2 fresh sessions以上で先行四課題から発電所、公園帰着まで採取する。起動 character input と numeric decoder answer の特殊な echo を保持し、反復する移動は current input identity で待つ。
- [ ] 現地到着、RECORD、LOOK、OFF、帰着の raw status と施設本文を照合する。容量警告と optional interrupt を分類し、経路不成立なら採択を止める。
- [ ] EN / JA と3 interaction modesで room / map / route / compass / recording / LOOK、現地の既存 SceneActions を監査する。Visible / accessible name、`lang`、送信元、draft / 直接送信、guard、不足を台帳化する。未実装の日本語を P1 の完了条件にしない。
- [ ] `tests/rendered-html.test.mjs` に fixture の67送信、先行50件の順序、施設内と入口の区別、current input chain、警告、既存 ordinary projection での構造保持を固定する regression を追加し実行する。Fixture 内に欠落があれば翻訳に進まない。
- [ ] Applicable checks、checksum、diff check を実行する。Evidence と status / plan を揃え、source / runtime / UI の区別と未確認範囲を提出する。
- [ ] Sol が連続経路と操作契約を採択し merge。失敗記録だけの merge では P2 を開始しない。

### P2: Approve Power Station story and navigation copy

**Files:** 新規 `docs/power-station-copy-packet.md`。更新 本書、`PROJECT_STATUS.md`。
**Interfaces:** P1 の fixture / aliases / surface 台帳を消費し、exact English leaf と観測 command / room → Japanese、再利用 leaf、room / map / assignment identity、visible / accessible name、動的値、適用条件、canonical command を P3 に渡す。

- [ ] 採択した往復の新規 leaf と再利用 leaf を一覧にし、原文の heading、段落、空行、動的な時刻や city noise を区別する。
- [ ] 発電方式と地理関係を原文どおり訳し、2041年に観測していない後続年の石炭発電描写を混ぜない。Source-only prose は承認しない。
- [ ] 7地点の room identity、map `power`、既承認課題 index 2、route / exits / recording / LOOK を別行で整理する。既存日本語を再利用し、未使用の SceneActions と unknown output の英語境界を明記する。
- [ ] 観測した command alias、初回2041年と観測時 room、visible / accessible name、`lang` の対応を承認候補にする。推定5/9を正式評価と書かない。
- [ ] `git diff --check` と fixture の exact text / command / relative link の照合を行う。Local 未実施の E2E を CI 実行と混同せず、PR の current-head checks を提示する。
- [ ] Sol の copy approval と merge 後に P3 の開始 gate を解除する。

### P3: Integrate and accept the complete Power Station fieldwork route

**Files:** 更新 `app/localization.ts`、必要箇所の `app/PrismEdition.tsx` / `app/presentation-history.ts` / `app/StoryTools.tsx`、`tests/rendered-html.test.mjs`、`tests/e2e/first-simulation-localization.spec.ts`、本書、`PROJECT_STATUS.md`。新規 `tests/e2e/power-station-fieldwork.spec.ts`、`tests/e2e/power-station-acceptance.ts`、`docs/power-station-fieldwork-acceptance.md`。既存 `tests/e2e/city-hall-acceptance.ts` と reading / navigation helper は必要最小限の変更で再利用する。
**Interfaces:** P2 の catalog entry と identity 別 copy を既存 `localizeSimulationPlace(locale, canonicalPlace)` / `localizeSimulationMapLabel(locale, identity, canonicalLabel)` に接続する。既存 `acceptCityHallMilestone(page: Page, controls: "classic" | "guided" | "actions", testInfo: TestInfo, recordConversation = true)` を既定の true で呼び、先行四課題の検証を再利用する。現状は戻り値がないため、同 helper が既に使う `frame` / `presentation` / `canonical` / `input` / `status` / `blocks` / `send` / `locale` / `attach` を返す最小変更を認める。戻り値を利用しない既存 caller と全 assertion を維持し、終了時に残る未送信の LOOK draft は次の操作前に input から消す。

- [ ] P1 の不足に対応する catalog / room scope / UI の regression を追加して RED を確認する。既存挙動で足りる箇所に余分な state や汎用化を追加しない。
- [ ] 承認済み本文と地名を統合し、観測時 scope と fallback を GREEN で確認する。履歴 scope の最小変更が必要なら City Hall と以前の全回帰も維持する。
- [ ] 新規6 fresh routesを実装し、先行50＋採択追加区間の順序と current input chain を保存する。Assisted の実 controls、録画中の現地本文、明示 OFF、公園通常入力を確認する。
- [ ] 別の自然な負例で入口だけの録画と施設内の非録画 LOOK を検証する。観測時 room / year、re-entry、QA、RESTORE 不明、新 session、long history と過去の非録画 heading は適切な unit / controlled browser regression で固定する。
- [ ] Power Station の旧 fallback assertion を正例へ更新し、Cinema の English fallback assertion を追加する。未知地名と対象外 phase の既存保証を残す。
- [ ] 6経路の reading / scroll / focus / locale / a11y を保存する。PNG、JSON、accessibility snapshot と controlled probe の JSON はすべて `testInfo.outputPath` 等へファイル保存し、その path を添付する。Body-only 添付だけにせず、passing artifact ZIP 内に存在することを確認する。City Hall の既存2 controlled probesも同じ保存 helper へ接続し、判定内容は変えない。
- [ ] Full verification を行い、CI の browser job 上限35分に対する実行時間を記録する。超過する場合は原因を分け、単なる timeout 増加なら実測根拠を同じ PR に記録して Sol と最終 Work review に渡す。CI 分割や並列化は別の設計判断とする。テスト削除や retry 追加で成功扱いにしない。
- [ ] 受入条件→fixture / test / screenshot / CI の対応表、6経路の実測、失敗と再実行、既知の限界を受入記録へまとめる。Status / plan の roll-up を同じ PR に含め、Sol 通常レビューを受ける。
- [ ] Work へ head / base、review 後差分、未解決指摘、current-head CI / artifact / expiry を渡す。Work の全体受入と merge、#29 完了報告、P3 close で milestone を完了する。

## 検証とレビューの運用

P1 / P3 は必要に応じ `bash scripts/bootstrap-npm.sh`、続いて `npm ci`、`npm run lint`、`npx tsc --noEmit`、`npm test`、full `npm run test:e2e`、checksum、`git diff --check` を実行する。
P1 の capture は production build / preview に対し `node scripts/capture-power-station-runtime.mjs --base-url http://127.0.0.1:3100 --output /tmp/parchment-power-station-runtime-observed.json` で実施する。
P3 の対象確認は `npx playwright test tests/e2e/power-station-fieldwork.spec.ts` とし、対象成功を full suite の代用にしない。
P2 と計画 PR は文書の照合と diff check を行い、local の未実施項目と current-head CI を区別する。

Routine review は実装と独立した Chat モード Sol が担当する。
P3 だけは通常レビューの後に Work の全体受入を行う。
再レビューは reviewed head からの差分と影響する証拠を確認し、base 変更や具体的な波及がある場合に範囲を広げる。
同一 GitHub account による self-approval 制限がある場合は、reviewed SHA、判断、provenance を COMMENT review に記録する。

最終実装者が status / plan / acceptance を集約し、未実施の merge / close を先に完了扱いしない。
最終 SHA、CI、merge、close は PR review / Issue / #29 を正本とする。
自身の最終 SHA を文書へ埋めるためだけの追加 commit は要求しない。
Artifact retention は14日を維持し、実際の期限を handoff に記載する。
採択根拠となる raw fixture は repository に残し、期限のある artifact だけに依存しない。
締めではレビュー回数、差し戻し理由、引継ぎから受入までの経過時間を記録し、未計測の usage 削減量を主張しない。
[#44](https://github.com/5gmt/mind-forever-voyaging/issues/44) の provenance conventions は別件として継続する。
