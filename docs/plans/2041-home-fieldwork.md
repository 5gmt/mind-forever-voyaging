# 2041 Home Fieldwork Implementation Plan

> **For agentic workers:** 担当Issueを一単位ずつ実行する。利用可能な環境では `superpowers:executing-plans` を使用できる。
> **Execution:** Codex CloudがH1–H3を実装する。独立したChatモードSolが計画PRと通常PRをレビューし、計画PR / H1 / H2をmergeする。H3はSol通常レビュー後、Astra / ChatGPT Workがmilestone全体を受け入れてmergeする。タスクごとの追加agent階層は要求しない。

**Goal:** 同じ初回2041年canonical sessionで先行七課題を保持し、自宅の居間を訪れて室内の様子を録画し、Kennedy Parkの通常入力へ戻れる日本語体験を提供する。
**Architecture:** 既存2a+2b、exact observed-leaf catalog、観測時room scope、地名lookup、限定操作を使う。扉を開けるcommandはcanonical parserに任せ、住居内での新しい録画観測だけを補助checklistの根拠とする。
**Tech Stack:** Next.js / React / TypeScript、Release 79 / Parchment、bridge-v3、Node test runner、Playwright / Chromium。
**Spec:** 本書の「選定」「採択経路」「受入境界」。[PROJECT_CHARTER.md](../../PROJECT_CHARTER.md)、[AGENTS.md](../../AGENTS.md)、[CI運用](../ci-operation.md)を保持する。
**Status:** 計画は[PR #123](https://github.com/5gmt/mind-forever-voyaging/pull/123)でマージ済み。H1の[111送信の完走2件と別の閉扉probe](../home-runtime-evidence.md)は[独立Solが採択](https://github.com/5gmt/mind-forever-voyaging/pull/124#pullrequestreview-6084630653)し、[PR #124](https://github.com/5gmt/mind-forever-voyaging/pull/124)をマージした。H2は[英日copy packet](../home-copy-packet.md)の独立Sol承認とマージを待つ。H3はH2のマージ後に開始する。
**Baseline:** 映画PR #118とCI保守PR #119を含むdefault branch `codex/modern-amfv`、merge `505e226bbe818a1dd4a4b1f15b199a3f5a76ae9c`。実行時には最新target branchを含める。
**Execution root:** [#29](https://github.com/5gmt/mind-forever-voyaging/issues/29)。2026-11-27 JSTのownerによる次期milestone設計・タスク作成依頼に基づく。

## Global Constraints

- Canonical `public/amfv-r79-s851122.z4` のSHA-256は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`。Historical `source/`、QA story、production dependencies、deploymentを変更しない。
- Release 79 / Parchmentがparser、game state、save/restoreの唯一の権威。Raw English観測、English command、unknown English fallback、2aのhost/window ownership、2bのper-leaf fallback、履歴・回復・accessibilityを保持する。
- Homeの新規copy / 操作は初回2041年の採択範囲だけ。再入場、Part II、後続年、QA、RESTORE後の不明状態へ広げない。正しく観測した日本語履歴は帰着やlocale変更で失わない。
- 既存の成功・失敗fixture、73 browser testsの経路・assertion・添付、先行七課題と録画窓を保持する。新経路は映画候補Aの96送信を明示的に継承し、過去milestone helperの既定経路を変更しない。
- 補助8/9はwrapperによる観測の推定であり、原作の正式評価、内部flag、録画残量、鍵所持や開錠成功の証明ではない。
- 全体の状態機械、inventory engine、汎用二対象command builder、新renderer、日本語parser、自動開錠・録画・移動を追加しない。生成物 `app/world-data.ts` を手編集せず、generic object guardを緩めない。
- 各PRが計画と `PROJECT_STATUS.md` を同期する。H3実装者が受入記録とroll-upを同じPRに用意する。Draft、独立レビュー、behind=0、mergeability、最新head/baseのCI readinessをmerge gateとする。

## Review Focus

| 条件 | 期待する結果と担当 |
| --- | --- |
| 七課題後の録画容量 | H1で2 fresh full sessionsを実測。Full / auto-deactivationがあれば採択せず、先行録画窓を黙って短縮しない。H3で6自然経路を再現する。 |
| 建物入口、廊下、居間、同名の扉 | H1で二つの扉と移動条件を区別。H2でmap到着と課題達成を区別するcopyを承認。H3で入口のみ録画の負例を検証する。 |
| 訪問後のRECORD、古い見出し、rolling history | H3で最新の完了turnと録画状態に限定し、非録画LOOKを後から加点しない。成功後は帰着・長い履歴でも補助実績を保持し、RESTORE等では安全に破棄する。 |
| Jillの時刻依存、別room / phaseの同文 | H1で実出力を分類し、H2は観測済みleafだけ承認。H3は観測時scopeを保持し、未観測の台詞や別時代の居間を推測翻訳しない。 |
| 390pxと開閉後の読書証拠 | H3でreadingの最終状態と実測JSON / PNG / accessibility / lifecycleを一致させる。Drawer最下段の自宅課題、閉じた後のfocusも確認する。 |

## 選定

映画の次は **自宅の居間を訪ねて録画する** milestoneを選ぶ。Sourceと現在の地図では公園から建物入口まで片道3手で、鍵による二つの開扉と短い室内録画に限定できる。
次の比較は計画時のcode、map、historical sourceに基づく。採択された経路の根拠は[H1のruntime実測](../home-runtime-evidence.md)である。

| 候補 | プレイヤーに加わる体験と判断 | 扱い |
| --- | --- | --- |
| 自宅 | 都市の施設に続きPerryの生活空間を読む。二つの扉、室内録画、家族の可変出力を確認する。 | 今回。居間に限定し、会話や家事は広げない。 |
| 公共交通 | 実乗車、発車、到着、降車。複数の `Tube Station` / `Tubecar`、運行時刻、停車と走行、既存map `transit` のSkybus Terminalとの対応が必要。 | 自宅の次候補。駅への到着だけを乗車と扱わない。 |
| Simulation帰還・正式評価 | 九課題の正式評価、録画buffer消去、再入場。 | 公共交通も含めた別設計。補助8/9から完了を推測しない。 |
| CIの追加最適化 | Artifact重複削減、条件付きmerge gateの強制等。 | ゲーム内進行とは別件。今回はHome追加に必要な群分配だけH3に含める。 |

## 採択経路

[映画候補Aの実測](../cinema-recording-a-evidence.md)と [cinema acceptance helper](../../tests/e2e/cinema-acceptance.ts)を先行経路の正本とする。裁判所は現地録画で、他の既存録画窓は維持する。

| 実送信番号 | Command | 意味 |
| --- | --- | --- |
| 1–96 | 映画候補Aの既採択経路 | 七課題を実際に行い、Kennedy Parkへ非録画で帰着。起動char、実decoder回答、direction aliasを区別して照合する。 |
| 97–99 | `SW / S / W` | Elm & Park → Southway & Park → Parkview Apartments。建物入口までで、居間ではない。 |
| 100–103 | `OPEN DOOR WITH KEY / IN / OPEN DOOR WITH KEY / N` | 建物扉を開き廊下へ入り、住居扉を開きLiving Roomへ入る。録画はまだ開始しない。 |
| 104–106 | `RECORD / LOOK / RECORD OFF` | 室内の新しいLOOK本文と前後のrecordingを観測し、明示停止する。 |
| 107–111 | `S / E / E / N / NE` | 廊下 → 建物入口 → Southway & Park → Elm & Park → Kennedy Park。非録画・通常入力で終える。 |

追加15、計111 line submissionsを本番ビルドの新規セッション2件で実測し、[PR #124](https://github.com/5gmt/mind-forever-voyaging/pull/124)で採択した。Map操作とdraft編集は送信数に含めない。
[source/prism.zil](../../source/prism.zil)の初回2041年初期化はKEYをPLAYERへ置き、[source/apartment.zil](../../source/apartment.zil)の `PARKVIEW-DOOR-F` / `APARTMENT-DOOR-F` は鍵を伴うOPENで扉を開く。両者は同じ名の別objectであり、引数なしのgeneric Openと同一視しない。
同sourceの `INNER-LOBBY-ENTER-F` は実際には廊下へ移動する。説明中のinner lobbyやelevatorを架空のroomや追加移動にしない。
`LIVING-ROOM-F` は入室時にJillの時刻依存状態を設定する。家族が同じ場所・同じ動作であることを成功条件にしない。必須室内本文、観測済み可変文、未観測のEnglish fallbackを分ける。
[source/misc.zil](../../source/misc.zil)のrecording処理は住居内部を判定する。入口や廊下は含まれない。このsource条件は内部flagを読み出した実測の代用にはしない。

H1は本番buildの独立fresh canonical sessionを2回以上、先行七課題から最後まで採取する。最低1回はcanonical form、もう1回は現行UIとformの併用とし、不足する支援を仮実装して成功させない。
別freshの短いlocked-door probeでは `SW / S / W / IN / OPEN DOOR WITH KEY / IN / N` を候補とし、建物扉と住居扉が閉じている時の拒否、所在と通常入力の保持を観測する。主経路のprefixや送信数には混ぜない。

両full sessionの七課題、鍵による開扉、実入室、録画中LOOK、明示OFF、公園帰着が成立して初めてSolが経路を採択できる。
Full / auto-deactivation、開扉失敗、必要本文欠落、通常入力未復帰は停止証拠として保存する。Half-full warningは消さず保存する。原作の未出力の時刻や内部残量を合成しない。
追加WAIT、呼び鈴 / KNOCKへの変更、別室訪問、先行順序 / 録画窓変更、帰還 / buffer消去、projectionや観測境界の変更が必要ならWorkへ設計判断を戻す。Input同期・locatorの修正はcanonical経路を変えない範囲でSolが扱う。
失敗evidence-only PRのmergeだけではH1完了にもH2 / H3開始にもならない。

## UI / copy契約

- 新規地名はSouthway & Park、Parkview Apartments、Hall Near Your Apartment、Living Room。既存Elm & Park / Kennedy Parkを再利用する。採択経路にないKitchen / Bedroom / Bathroomの翻訳承認を含めない。
- Map `home`、課題index 8「自分の家、または居住区を訪れること」、建物名、room heading / current place / identity rail、二つのdoorとKEYを別identityとして台帳化する。課題文は既承認copyを再利用する。
- Map `home.targetId` は既存の `PARKVIEW-APARTMENTS` のまま。到着地点が建物入口だと分かるvisible / accessible copyをH2で承認する。経路到着を室内録画の達成と同一視しない。室内へはプレイヤーの明示操作で進む。
- 新規支援は `PARKVIEW-APARTMENTS` / `PARKVIEW-HALL` の **`OPEN DOOR WITH KEY`** に限定する。初回2041年・確実なraw現在地・安定したline inputでのみ表示し、main / companionの条件をそろえる。鍵所持や扉の状態を独自に保持・保証しない。原作の拒否をそのまま表示する。
- `IN` / `N` と帰路の方向は既存移動UIを使う。条件付きexitを無条件の成功扱いにせず、command送信後の実所在を待つ。
- Guidedは編集可能なEnglish draft → 明示submit。Actionsは1押下1送信。Busy / char / missing inputや不明roomでは送信しない。Classicへ支援・checklistを追加しない。
- 「The door opens.」等の共通leafはcommandと観測時roomで限定する。未知の台詞、警告、状態、別年の同文はEnglish fallback。Jill / Mitchellの会話支援、呼び鈴、家具の検査、家事、鍵の管理は対象外。

## 受入境界

1. Classic / Guided / Actions ×1440×900 /390×844の6 fresh sessionsで、七課題とHome全経路を同じsessionで完走する。Assistedは地図・移動・鍵開扉・録画の実UI、Classicはcanonical formを使う。全input ID → echo → distinct next input ID、録画状態、観測時roomを照合する。
2. Assistedの補助実績は七課題を保持した8/9。公共交通は未達。別fresh Actions /desktopでは先行七課題を録画し、HomeのRECORD / OFFだけ省く候補109送信で7/9を保つ。Classicにchecklistはない。
3. 入口・廊下だけを録画し、停止後に居間へ入りLOOKする短い別fresh probeで、自宅を加点しない。二つの閉扉拒否はH1の出所付き観測を再利用できるが、操作境界に変更があれば再採取する。
4. 新しい補助自宅実績は録画中の居間の完了LOOKとそのraw本文に基づく。単なる同名見出し、古い非録画LOOK、map到着、後からのRECORDだけで加点しない。完成した実績は帰着・locale・rolling historyで消さず、RESTORE、新規session、QA等の境界では既存session管理と整合させる。
5. 居間と公園帰着でEN → JA → EN → JA、文字サイズ・行間・follow / manual scroll、readingの最後の行、input非重複と操作focusを確認する。Companion / drawer操作の前後と再読後の最終状態を保存し、再調整前の測定と後のPNGを混ぜない。390pxで未出力の時計は未観測のままとする。
6. 観測時roomを各history entryに固定する。移動後のraw roomや後のlocaleで古い本文のscopeを再判定しない。既存七課題の日本語履歴、未知文のEnglish fallback、二重読み上げ防止を保持する。

## タスクと成果物

| Task | Issue | 開始条件 | 完了・次への引継ぎ |
| --- | --- | --- | --- |
| H1 実測と経路採択 | [#120](https://github.com/5gmt/mind-forever-voyaging/issues/120) | 計画PRのSol review / merge | 成功した2 full sessionsと別probe、raw fixture、操作 / leaf台帳をSolが採択・merge。 |
| H2 copy approval | [#121](https://github.com/5gmt/mind-forever-voyaging/issues/121) | H1成功採択 / merge | H1に根拠を持つ英日copy packetをSolが承認・merge。 |
| H3 統合とmilestone受入 | [#122](https://github.com/5gmt/mind-forever-voyaging/issues/122) | H1 / H2完了 | Sol通常レビュー、最終手動Full、Workの全体受入・証拠監査、merge、#29報告・close。 |

### H1: runtimeと操作契約

**Files:** Create `scripts/capture-home-runtime.mjs`, `tests/fixtures/parchment-home-runtime-observed.json`, `docs/home-runtime-evidence.md`。失敗した場合は別の `tests/fixtures/parchment-home-runtime-failure.json`。Modify `tests/rendered-html.test.mjs`、本計画、`PROJECT_STATUS.md`。
**Consumes:** 映画候補Aの既存fixtureとcapture手順。**Produces:** `sessions`（2以上）と別 `lockedDoorProbe`、全submissions、raw bridge lines/runs / status / input、実UI method / alias、room identity、warnings、成功 / 失敗の区別とsource照合表。既存fixtureと同じ形を優先し、採取に伴う追加metadataは文書化する。

- [x] Captureを作り、`--base-url URL --output PATH --failure-output PATH` を受け付ける。起動はlive windowportとrequest-stateへ同期し、途中状態を別partialへ保存する。出力rootは実行ごとに新規にする。
- [x] Production buildで2 full sessionsと別probeを採取する。Canonicalを操作し、VM変更・save復元・複数sessionの課題合成はしない。失敗を消して成功fixtureへ混ぜない。
- [x] Unit test `retains two complete home sessions after the adopted cinema route` を追加する。111送信候補、prefix96、全input対応、開扉と居間LOOK、録画継続 / OFF、帰着、locked probeの拒否を実fixtureで検証する。Runtimeで候補と異なる場合は成功assertionを弱めず停止する。
- [x] `node --test --test-name-pattern='home sessions' tests/rendered-html.test.mjs` と適用checksを実行する。[実測記録](../home-runtime-evidence.md)に実時刻、家族の可変文、出力形状、現行UI、未検証範囲を残す。
- [x] 独立Solが成功経路と操作契約を採択し、[最終head/baseの手動Fullとreadiness](https://github.com/5gmt/mind-forever-voyaging/pull/124#issuecomment-7214632929)を確認してマージした。

### H2: 本文・地名・限定開扉copy

**Files:** Create `docs/home-copy-packet.md`。Modify本計画と `PROJECT_STATUS.md`。
**Consumes:** 採択済みH1のexact leaf / session / observation位置と操作台帳。**Produces:** 原文、日本語、identity、command / room / phase scope、必須 / optional / fallback、visible label / accessible nameの対応表。Runtime contentとwrapper-owned copyを区別する。

- [x] [英日copy packet](../home-copy-packet.md)に、室内の必須描写、観測済みの家族の可変文、閉扉拒否、経路と地名を収録した。地図は建物入口を示し、鍵操作は場所に応じた扉に対応する。
- [x] H1のraw fixtureと全引用を照合した。鍵操作の実送信は `OPEN DOOR WITH KEY`。現行の `open door` とは別の操作として扱う。
- [x] `git diff --check`、リンクと引用の対応を確認し、独立Solにcopy approvalを求める。
- [ ] 独立Solのcopy approval後、レビューアが修正確定後のhead/baseで手動Fullを起動し、readinessを確認してマージする。`*copy-packet.md` を含むため分類はFull。

### H3: presentation・操作・補助実績と受入

**Files:** Modify `app/localization.ts`, `app/story-presentation.ts`, `app/presentation-history.ts`, `app/PrismEdition.tsx`, `app/StoryTools.tsx`, `tests/rendered-html.test.mjs`。Create `app/home-recording.ts`, `tests/e2e/home-acceptance.ts`, `tests/e2e/home-fieldwork.spec.ts`, `tests/e2e/home-narrow.spec.ts`, `docs/home-fieldwork-acceptance.md`。CI関連変更は次節に限定する。
**Consumes:** H1 fixtureとH2 packet、`acceptCinemaMilestone(page, controls, testInfo, true)` の既採択prefix。**Produces:** 初回2041年Home copy / key action、観測時 `home2041?: string` scope、補助住居録画、6自然正例・2自然負例・境界回帰と証拠索引。

- [ ] 新scopeとapproved catalogのunit回帰を先に追加し、未実装の対象caseが失敗することを確認する。Homeのroom / commandを持たない共通leafと別phaseはEnglishのままにする。
- [ ] `home2041?: string` を既存のpresentation / history scope経路に追加し、観測時のraw roomを一度だけ保存する。`part1.simulation.home.*` のcatalog identityと対応room表を限定的に接続する。
- [ ] `HomeRecordingState = { complete: boolean; recording: boolean; seenTurns: string[] }`、`createHomeRecordingState(): HomeRecordingState`、`observeHomeRecording(previous, observation): HomeRecordingState` を `app/home-recording.ts` に実装する。Observationは既存cinemaと同形の `{ eligible, roomId?, hasStatus, recording, acceptsInput, presentation }`。新しい安定line-input turnの居間LOOKとH1で特定した本文、前後のraw recording、full / auto-deactivation等の録画失敗がないことを条件にする。Half-full warningは保持し、録画停止と混同しない。完了はsession内で保持し、parser flagとは扱わない。
- [ ] Unit回帰で居間の正常録画、入口 / 廊下、非録画 / 後付け録画、見出しだけ、異room / year、重複turn、warning、missing status / input、rolling window、RESTORE / 新sessionを検証する。補助課題index 8をこの観測へ接続し、他課題の推定は再設計しない。RECORDだけで達成しないことを明示する。
- [ ] Room-qualifiedなkey actionとcopyをmain / companionへ接続する。両doorを名前で合成せずID / roomで区別し、既存の引数なしOpenを鍵操作として誤表示しない。Guided draftとActions単発送信、busy / char / unknown / Classicの境界をテストする。
- [ ] `acceptHomeMilestone(page, controls, testInfo, recordHome = true)` を追加し、既存cinema helperを明示的に呼ぶ。現在の `acceptCinemaMilestone` は返り値がないため、全assertionと添付の完了後にその `prior` contextを返す最小変更を行う。Homeは `frame / presentation / canonical / input / blocks / send / locale / snapshot / rawTrace` を再利用する。6正例は各111送信候補、非録画負例は109送信候補。既存helperの既定経路 / assertion / 添付を変更しない。入口のみ録画の短い別fresh probeも追加する。
- [ ] `home-fieldwork.spec.ts` にdesktopの3正例、非録画・入口のみ録画の2負例、controlled `history / guards / recording` の3回帰を置く。`home-narrow.spec.ts` に390pxの3正例を置く。Baseline 73件を保持し、少なくとも合計84 browser casesになる。各自然sessionを途中で分割しない。
- [ ] 受入境界のreading / focus / locale / drawerを同一checkpointのJSON / PNG / accessibilityとして添付する。Controlled JSONを必ずファイルへ残し、自然runtime証拠と混同しない。
- [ ] 短いunit / controlled → 影響する自然経路の順で検証し、lint / tsc / unit / checksum / CI制御 / partitionを確認する。修正確定後の手動Fullで全件検証と証拠保存を兼ねる。
- [ ] 受入記録に実counts、群別時間、head / base / run / attempt / artifact path・expiry、失敗・再実行・未実施、受入条件と証拠の対応を記録する。Sol通常レビュー後、Workの監査を受けてmergeし、#29へ完了報告してH3をcloseする。

## CIとレビューの費用を制御する

PR #119の運用を継承する。自動はFast、Full-scope PRは修正とレビューが固まったhead/baseでレビューアが手動Fullを一度実行する。開発者は短い回帰・対象経路を優先し、一律ローカルFullを提出条件にしない。計画PRは説明文書のみでDocs分類となるためFastで足りる。H1のfixtureとH2 copy packetはFull分類を維持する。

H1着手時のbaselineは52 unit /73 browser /15 CI制御テスト、5群（church 10 / power 9 / remaining 44 / cinema-desktop 7 / cinema-narrow 3）。H1でunit回帰を1件追加した。#119の手動Fullではremainingとcinema-desktopのbrowser stepがそれぞれ17.3分・17.5分だった。新たな111送信の自然経路をremainingへ集中させない。

**H3で `home-desktop` / `home-narrow` の2群を追加し、計7群にすることを本計画の承認対象とする。** 既存5群の所有specは変更しない。群追加は長い自然sessionを丸ごと割り当てるためで、test削減やrunner-minutes削減の主張ではない。

- `scripts/ci-e2e.mjs` の `groups` と `groupForFile`、`.github/workflows/ci.yml` のmatrix、`tests/ci/policy.test.mjs` / `tests/ci/readiness.test.mjs` を同じPRで同期する。`home-fieldwork.spec.ts` → `home-desktop`、`home-narrow.spec.ts` → `home-narrow`。未知specはremaining、列挙による欠落 / 重複拒否を維持する。
- Readinessが新7群すべてを同じrun / attemptで要求し、Home欠落・失敗・skipや過去5群だけの成功を拒否する回帰を追加する。開始 / 終了head-base guard、各35分、各1 worker、retry 0、Fastのみ自動の条件は保持する。
- `AGENTS.md`、`docs/ci-operation.md`、`PROJECT_STATUS.md`、本計画、Home受入記録の現行群数と監査対象を7群へ同期する。過去の「#118は5 ZIP監査済み」という史実は書き換えない。この計画PRでは実CI matrixはまだ5群のまま。
- H3最終Fullは `save_evidence=true`。容量と1日以内の監査予定を事前確認し、同一成功run / attemptの **全7 ZIP** のcommit / base / runId / runAttempt / group、証拠索引と実ファイルをWorkが独立監査する。通常Fullは保存なし。既存の保護artifactを無断で削除しない。
- 保存時provenanceのbaseを実体で確認する機会をH3に含める。#119で未確認だったDocs-only Fastは[計画PRの実run](https://github.com/5gmt/mind-forever-voyaging/actions/runs/45940995335)で確認済み。確認のためだけに別Fullを重複起動しない。
- 35分を超える見込みや保存容量不足が分かったら、対象実測を添えて配分 / 保存方法をレビューする。Timeout延長・retry・テスト省略・添付削減で隠さない。

実装者はlocal証拠ファイルを照合し、Solは通常PRを独立レビューする。WorkはH3だけmilestone全体と最終ZIPを受け入れる。Head/base変更時は影響範囲を再検証し、同一headの確認済み証拠を理由なく再監査しない。最終review / merge / closeの記録はPRとIssueを正本とし、SHA自己参照のためだけの追加commitは要求しない。

実saved-game RESTORE、実screen reader音声、原作の正式九課題評価、公共交通、別室 / 家族との会話、後続年の自然完走、本番配備は、実施していなければ未検証と明記する。[#44](https://github.com/5gmt/mind-forever-voyaging/issues/44)のprovenance規約整備は別件として維持する。
