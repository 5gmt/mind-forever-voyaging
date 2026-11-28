# 2041 Transit Fieldwork Implementation Plan

> **For agentic workers:** 担当Issueを一単位ずつ実行する。利用可能な環境では `superpowers:executing-plans` を使用できる。
> **Execution:** Codex CloudがT1–T3を実装する。独立したChatモードSolが計画PRと通常PRをレビューし、計画PR / T1 / T2をmergeする。T3はSol通常レビュー後、Astra / ChatGPT Workがmilestone全体を受け入れてmergeする。追加のagent階層は要求しない。

**Goal:** 同じ初回2041年canonical sessionで先行八課題を保持し、公共交通に実乗車して録画し、降車後Kennedy Parkの通常入力へ戻れる日本語体験を提供する。
**Architecture:** 既存2a+2bとexact observed-leaf catalogを使う。同名の駅・車両についてだけ、新しいraw turnと直前の確実な観測を使う限定adapterを追加し、観測時scopeをhistoryに保存する。運行時計や車両位置を独自にシミュレートしない。
**Tech Stack:** Next.js / React / TypeScript、Release 79 / Parchment、bridge-v3、Node test runner、Playwright / Chromium。
**Spec:** 本書の「選定」「候補経路と採択gate」「観測と操作の契約」「受入境界」。[憲章](../../PROJECT_CHARTER.md)、[AGENTS.md](../../AGENTS.md)、[CI運用](../ci-operation.md)を保持する。
**Status:** #131 は失敗証拠と Work の設計判断を収録してマージ済み。[交通候補Aの再実測](../transit-runtime-evidence.md#候補-a-の実測)で111入力を保持した新規2セッションが、録画中のJunction到着・降車、明示OFF、公園帰着まで完走した。別probesと看板構造の実測を提出し、独立Solの成功採択と最終Fullを待つ。T2とT3は保留。
**Baseline:** Homeの[PR #126](https://github.com/5gmt/mind-forever-voyaging/pull/126)、merge `76f2c438e69a81d13dfba6c8fa2ab42b5598f4b9`。実行時には最新target branch `codex/modern-amfv` を含める。
**Execution root:** [#29](https://github.com/5gmt/mind-forever-voyaging/issues/29)。2026-11-28 JSTのownerによる次期milestone設計・タスク作成依頼に基づく。

## Global Constraints

- Canonical `public/amfv-r79-s851122.z4` のSHA-256は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`。Historical `source/`、QA story、production dependencies、deploymentを変更しない。
- Release 79が唯一のgame state / parser authority。Raw English観測、English command、unknown English fallback、2aのhost/window ownership、2bのper-leaf fallback、履歴・回復・accessibilityを保持する。
- 新規copy / 操作 / 観測adapterは初回2041年の採択経路だけ。再入場、Part II、後続年、QA、RESTORE後の不明状態を含めない。
- Homeの111 line submissions（起動charは別）、先行八課題の順序・録画窓、成功 / 失敗fixture、既存84 browser testsの経路・assertion・添付を保持する。複数sessionの課題合成、saveからの再開、VM操作で自然完走を代用しない。
- 補助9/9はwrapperによる観測の推定。原作の正式評価、内部flag、残容量、帰還許可を証明しない。全項目完了から自動ABORT・帰還・buffer消去・次phase移行を起こさない。
- 汎用交通シミュレータ、全駅・全路線対応、全map翻訳、汎用command builder、新renderer、日本語parser、自動待機・乗降は追加しない。`app/world-data.ts` を手編集せず、条件付きexitを静的な移動成功にしない。
- 各PRが本計画と `PROJECT_STATUS.md` を同期する。T3実装者が受入記録とroll-upを同じPRで用意する。Draft、独立レビュー、behind=0、mergeability、最新head/baseのCI readinessをmerge gateとする。

## 選定と残す作業

[Home最終受入](https://github.com/5gmt/mind-forever-voyaging/pull/126#pullrequestreview-6091596637)で、Courthouse → Newspaper → Restaurant → City Hall → Power Station → Church → Cinema → Home → Kennedy Parkまでの同一sessionを受け入れた。補助8/9で未完なのは公共交通である。

| 候補 | 判断 |
| --- | --- |
| 公共交通の乗車録画 | 今回。九課題の最後の体験を追加する。駅へ歩いたことと、車内で移動を録画したことを区別する。 |
| Simulation帰還と正式評価 | 次期候補。九課題を行った後の原作の実評価、Communicationsへの復帰、録画bufferの扱い、再入場を別途capture / 設計する。今回の9/9から成功を推測しない。 |
| Homeの別室・家族会話、他路線、後続年 | 今回の一駅乗車と切り離す。 |
| CIコメント起動・証拠重複除去等 | 独立した保守候補。今回は新しい長時間sessionの群分配だけT3に含め、起動権限や保存方式を同時に再設計しない。#44も別件。 |

## Review Focus

| 条件 | 期待する結果と担当 |
| --- | --- |
| 八課題後の容量と時刻差 | T1で2 fresh full sessionsを実測し、警告と全送信を保存。Full / auto-deactivationなら採択を止める。T3の6自然正例と非録画負例で先行八課題を保持する。 |
| 同名のTube Station / Tubecar、古い駅看板 | T1でraw sign / 車両 / command / input IDを対応付ける。T3のidentity / history回帰は他駅・他車両・旧turnを混ぜても誤確定しない。 |
| 2分停車と通常WAITの10分進行 | T1で短時間waitと即時降車の契約を採択。T3で発車後に古い「停車中」操作を残さず、missed train / 車間降車拒否を原作どおり表示する。 |
| 駅での発車観測、後付け録画、同一turn再配信 | T3の自然駅のみ負例とcontrolled recording回帰で、未乗車・非録画・重複・欠落status/inputを達成にしない。 |
| 9/9と正しい履歴・読み上げ | T3で帰着後も観測時scopeを保持。JA/EN、live statusのlang、390pxのdrawer最下段、reading / focusを確認し、正式評価やphase変更を合成しない。 |

## 候補経路と採択gate

先行経路は[Home実測](../home-runtime-evidence.md)と [acceptHomeMilestone](../../tests/e2e/home-acceptance.ts)の111送信を継承する。映画候補Aの裁判所現地録画を含め、既存録画窓を変更しない。

| 段階 | Candidate command / 条件 | 意味 |
| --- | --- | --- |
| 1–111 | Homeの採択済みprefix | 八課題後、公園へ非録画・通常入力で帰着。 |
| 地上移動・入駅 | `SW / W / DOWN` | Elm & Park → Elm & University → TUBE-AT-UNIVERSITY。DOWNは現行generated mapにない条件付きexit。 |
| 車両待ち | 必要な回数だけ `WAIT FOR 1 MINUTE` | 新しいraw出力でBrown車両の到着・停車を確認する。上限40送信。駅では録画しない。 |
| 非録画で乗車・発車確認 | `IN`、必要な回数だけ `WAIT FOR 1 MINUTE` | Brown車内への実乗車と新しい発車文を確認。INのturnに発車した場合もその観測を使う。 |
| 発車後の非録画待機 | `WAIT FOR 1 MINUTE`を別々に2回 | 発車を生じさせた入力は含めない。各turnの所在・通常入力・未到着を確認する。 |
| 録画開始 | `RECORD` | 成功応答と車内のrecording status、通常入力を確認。同turnに到着していたら停止する。 |
| 一駅移動の終わり | `WAIT FOR 1 MINUTE`を1回 | 新しい録画中のJunction到着・Skybus Terminal看板・開扉を要求。到着しなければ追加待機で救済しない。車内待機の診断上限8には非録画中の全待機も含む。 |
| 降車・明示停止 | `OUT / RECORD OFF` | 停車中に先に降車し、駅で明示OFF成功を確認する。車内でOFFして停車時間を消費する順序にはしない。 |
| 地上へ・帰着 | `UP / SE / SW` | Skybus Terminal → Main & Kennedy → Kennedy Park。非録画・通常入力で終える。 |

これは **111 + 10 + 待機回数** の候補で、固定の総送信数をまだ合否条件にしない。上限は無限待機を防ぐcapture / testの診断境界であり、production UIが自動待機する契約ではない。T1が実際の全commands、待機数、開始・到着時刻、途中の割込み、input遷移を保存し、Solが有限の観測条件と許容待機数を採択する。上限の増加、乗り過ごして別駅へ行く復旧経路の追加は無断で行わない。

上表は[Workの設計判断](../transit-recording-window-decision.md)による交通候補A。旧`IN / RECORD`は到着時に満杯となった失敗経路として保存する。先行分86分＋交通3分＝89分という見込みはraw時刻とsourceからの計算で、残容量や成功の実測ではない。録画開始からOUT / OFFまで追加のcanonical commandを挟まない。絶対時刻や内部timerで到着・開扉を推測しない。

選択理由とsource上の根拠:

- [source/rockvil.zil](../../source/rockvil.zil)の `TUBES-ENTER-F` はElm & UniversityからTUBE-AT-UNIVERSITYへ入る。Brownlineの `BROWN-TABLE` はAirport / Bodanski / Junction / University。終点Universityからの次駅をJunctionに限定でき、乗車駅でRed / Brownの二者選択を避けられる。
- `I-BROWN-TUBE` は2041年に走行4・停車2のqueueを使い、車内で録画中の発車または到着時に原作のrecording table index 8を設定する。駅で見える発車文だけでは同じ条件を満たさない。このsource事実を内部flagの実測と呼ばない。
- [source/verbs.zil](../../source/verbs.zil)の `V-WAIT` は引数なしで10、`V-WAIT-FOR` は数値待機を受け取る。`WAIT FOR 1 MINUTE` の実受理・進行・途中割込みはT1で確認する。既存「待つ」ボタンのcommandを全体で置換しない。
- `BROWN-TUBECAR-EXIT-F` は停車中だけ降車できる。`Tubecar` / `Tube Station` は複数roomの共通headingで、`READ SIGN`だけでは車内の停車を証明しない。到着・開扉・statusの組合せを観測する。
- [source/misc.zil](../../source/misc.zil)の容量上限90とhalf-full / auto-deactivationを保持する。初期時刻には乱数があるため、決め打ちの時計や隠れた運行timerで操作を進めない。

T1は本番buildで2つの独立fresh canonical sessionをprefixから最後まで採取する。1件はcanonical form、もう1件は現行UIとformの併用とし、未実装の支援を仮実装して成功させない。短い別fresh probeで「駅にいて録画しただけ」「車両がいない時のIN」「走行中のOUT拒否」を採取する。Probeは必要に応じ複数sessionに分け、成功full sessionの送信へ混ぜない。

先行八課題、実乗車、録画中の車内到着、降車、明示OFF、帰着が両full sessionで成立して初めて成功経路を採択する。失敗は別fixture / partialへ保存する。Full、録画不成立、通常入力未復帰、看板と実所在の矛盾、新しいprojectionが必要な出力があればWorkへ設計判断を戻す。先行順序・録画窓変更、帰還・buffer消去、別路線、路線の独自推測で救済しない。失敗evidence-only PRのmergeはT1完了やT2/T3開始を意味しない。

## 観測と操作の契約

### 駅・車両の限定観測

今回、曖昧なTube headingへの `detectRoom` のrecentText推測に代えて、**初回2041年の採択三roomだけ**を扱う観測adapterを設計範囲に含める。対象は `TUBE-AT-UNIVERSITY` / `BROWN-TUBECAR` / `TUBE-JUNCTION`。地上のunique room検出を再設計しない。

- 入力は既存bridge-v3のstable turn、raw status、実command、直前に確実だったroom。入力promptとcommand echoのIDで新しいturnを識別し、rolling transcriptから再構成しない。
- T1のexact station signと同turnのstatusを照合する。既知University駅からのINと実Tubecar出力でBrown車内を認識し、実際の到着・開扉で停止を、発車文で走行を観測する。期待するcommand、地図の目的地、経過時間だけで遷移しない。
- 車内の看板で示された駅と、プレイヤーが駅ホームへ降りたことを分離する。OUTの新しい出力 / status / 看板によって降車を確認する。古い看板、他車両、途中の未知入力・矛盾・欠落報告では必要な識別をunknownに戻す。
- 状態はそのcanonical session内の観測補助に限る。時刻・運行位置・扉・inventoryを先回りして更新しない。RESTORE / restart / 新sessionの既存reset境界を共有し、QA報告を取り込まない。
- Historyの `transit2041?: string` scopeには当時確定したroomを保存する。後の駅、locale、再入場から古い本文のscopeを推測し直さない。曖昧なTube statusはgeneric heuristicへ戻して推測せず、English / 支援なしで安全に縮退する。

### 本文・map・操作

- T2はraw英語leaf、駅看板の行・indentation、車内描写、発車 / 到着 / 開扉 / 拒否、短時間wait、録画ON/OFF、地上経路の未承認部分を台帳化する。未観測の時刻・家族・都市noiseはEnglish fallback。必要なstructured projectionが既存2bで表せなければ翻訳を先行しない。
- 課題index 4「何らかの公共交通機関に乗ること」、map `transit`、Skybus Terminalの建物、各Tube駅、Brown車両を別identityとする。
- 初回2041年のmap `transit` は **地上のElm & University（乗車駅入口）** を目的地とする限定adapterで示す。ラベル・marker位置・route destinationを一致させ、既存地図に根拠のある位置を使う。その他のphase / unknown scopeは既存Skybus Terminalを維持する。map到着を乗車や録画達成にしない。PackageOverlayの未接続interactive mapをproductionへ接続しない。
- 地上routeだけ既存navigatorを使い、DOWN / IN / OUT / UPは採択場所に限る明示操作にする。新しい専用支援は入駅、1分待機、観測したBrown車両への乗車、車内の停車確認後の降車、Junctionから地上へ戻る操作に限定する。録画ON/OFFは既存操作を再利用する。Main / companionの条件をそろえる。
- Guidedは編集可能なEnglish draftと明示submit、Actionsは1押下1送信。Classicには支援を追加しない。Busy / char input / unknown room / stale停車証拠では専用操作を出さない。全英語入力経路は保持し、原作の拒否を隠さない。
- 新しいturnで発車・矛盾を観測したら乗降支援を失効させる。UIを開いたままlocaleを切り替えてもcommand送信や運行の進行を起こさない。汎用方向UIの対象路線で誤った静的exitを提示しないよう、同じ観測境界を適用する。

### 補助実績

`FIELD_RECORDING_RULES` の交通項目だけをsession-scoped観測へ置換する。既存八課題の検出は再設計しない。

T3の交通達成条件は、実Brown車内でのRECORD成功 → 同じ録画窓で新たに観測したJunction到着・看板・開扉（直前と到着後に録画が継続）→ 録画中の実降車 → 明示RECORD OFF成功、とする。発車はRECORDより前でもよい。Sourceの最低条件より保守的な、今回の一駅体験の補助指標である。駅の発車文、乗車headingだけ、録画開始だけ、古い到着に後からRECORDを添えたもの、RECORDと同turnの到着は達成にしない。

Full / auto-deactivation、途中OFF、missing status / 不安定input、未知の乗換・車両・駅でpendingを破棄する。Half-full warningは保存し、それだけで既存達成を消さない。完了済みの交通推定は同一session内で保持するが、既存RESTORE / restart / 新session境界で破棄する。画面の9/9、最終項目や全項目完了文言は引き続き補助推定と明示する。

## 受入境界

1. Classic / Guided / Actions × 1440×900 / 390×844の6自然正例を、各fresh canonical sessionの111送信prefixから乗車・録画・降車・公園帰着まで実行する。各回の実decoder回答、direction alias、wait回数、全request / input ID / raw status / warningを保存する。
2. 先行八課題のruntime出力と録画窓を保持する。Assistedの帰着は補助9/9、Classicは同じraw体験を確認しchecklistを追加しない。帰着時はSimulation Mode、非録画、通常line inputで、正式評価や次phaseへ進んでいない。
3. 自然非録画負例は同じ111 prefix後に公共交通だけRECORD / OFFなしで実乗車し、補助8/9を保つ。別freshの短い駅のみ録画負例は、車両の発車を駅から見ても交通未達成。Controlled報告は自然runtime証拠と分ける。
4. Controlled identity / history、controls / timing、recordingの3群で、同名他駅 / Red、旧看板、遅延 / 重複turn、status/input欠落、発車による停車guard失効、後付け録画、容量警告、rolling window、RESTORE不明 / 新session、再入場 / 後続年 / QAを固定する。
5. 駅・車内・降車後・帰着の採択leafとcurrent place、identity rail、live statusのtext / lang、accessible nameをJA → EN → JAで確認する。Unknown Englishを`lang=ja`に誤継承せず、canonical GridWindowを翻訳・補完しない。
6. 車内の通常入力と帰着でreading preference、文字サイズ・行間・follow / manual scroll、最後の行とinput、companion / drawer前後のfocus、390pxのmap / brief切替と九項目目までのscrollを検証する。最終settled stateの同一checkpointでJSON / PNG / accessibilityを採り、再調整前後を混ぜない。390pxで原作が出力しない時計は未観測のままにする。

## タスクと成果物

| Task | Issue | 開始条件 | 完了・引継ぎ |
| --- | --- | --- | --- |
| T1 実測と乗降契約採択 | [T1 #127](https://github.com/5gmt/mind-forever-voyaging/issues/127) | 再試行はPR #131の失敗証拠・Work判断のreview / merge後 | 候補Aの2 full sessions・別probes・操作/identity台帳をSolが採択しmerge。 |
| T2 本文・交通UI copy approval | [T2 #128](https://github.com/5gmt/mind-forever-voyaging/issues/128) | T1成功採択 / merge | exact leafと全surfaceの英日packetをSolが承認しmerge。 |
| T3 統合とmilestone受入 | [T3 #129](https://github.com/5gmt/mind-forever-voyaging/issues/129) | T1 / T2完了 | Sol通常レビュー、最終Full、Work全体受入・全ZIP監査、merge・#29報告・close。 |

### T1: runtimeと限定観測の契約

初回フォーム試行は131送信目で停止した。先行111送信、実乗車、録画開始、Junction 到着と開扉までは [失敗 fixture](../../tests/fixtures/parchment-transit-runtime-failure.json) に残した。到着後の録画継続を満たさないため、第二試行、別 probes、降車・帰着、成功 fixture と成功回帰は保留した。

[交通候補A](../transit-recording-window-decision.md) のフォームと現行UI併用が各136入力で完走した。発車確認後の2回、録画後の1回を、それぞれ別の入力として観測した。旧失敗fixtureは保持した。採取側で旧地図ラベルを待って止まった最初の試行も別fixtureに保存した。Localized hostではカタログの試験値で看板の行順と字下げを確認した。合否条件・操作契約の採択はSolのレビューを待つ。

**Files:** Create `scripts/capture-transit-runtime.mjs`, `tests/fixtures/parchment-transit-runtime-observed.json`, `docs/transit-runtime-evidence.md`。旧試行の失敗は `tests/fixtures/parchment-transit-runtime-failure.json` に保持し、候補Aの途中記録は別ファイルに保存する。Modify `tests/rendered-html.test.mjs`、本計画、`PROJECT_STATUS.md`。
**Consumes:** Homeの採択fixture / capture手順と本書の候補。**Produces:** 2以上の `sessions` と別 `probes`、全submittedCommands、stable bridge lines/runs/status/input、実UI method、roomの根拠、録画窓、時刻とwait回数、成功/失敗区分。既存fixture形式を再利用し、交通特有のidentity evidenceを文書化する。

- [x] Captureに `--base-url URL --output PATH --failure-output PATH`、fresh output root、起動 / input同期、partial保存を設ける。
- [x] 交通候補Aの発車観測、非録画wait 2回、RECORD、到着wait 1回と停止条件へcaptureを更新する。
- [x] 本番buildで2 full sessionsと別probesを採取する。待機ループは上限とraw条件を持ち、未到着のまま「成功」として次へ進めない。
- [x] Unit `retains two complete transit sessions after the accepted home prefix` を実fixtureで固定する。111 prefix、実command/input対応、停車と車内到着の別、録画ON/OFF、return、容量、負例をassertする。待機回数は実測した契約に従い、決め打ち総数のために観測を削らない。
- [x] `node --test --test-name-pattern='transit sessions' tests/rendered-html.test.mjs`、適用checks、checksumを実行。必須/可変leaf、3 roomの同定根拠、DOWN/IN/OUT/UPの既存UI不足、copy候補、未検証境界を台帳へ残す。
- [x] 失敗の実測と停止後の入力を `retains the transit capacity failure after the accepted home prefix` に固定し、[失敗実測](../transit-runtime-evidence.md) に記録する。
- [ ] 独立Solが成功経路・有限待機・観測/操作契約を採択する。境界変更が必要ならWorkへ戻す。最新head/baseのFull / readinessを経てmergeし、T2を解除する。

### T2: 本文・駅・乗降支援copy

**Files:** Create `docs/transit-copy-packet.md`。Modify本計画と `PROJECT_STATUS.md`。
**Consumes:** 採択済みT1のexact leaf / observation ID / command / raw status。**Produces:** 原文、日本語、必須/optional/fallback、command / room / phase scope、visible label / accessible name / lang、map到着先と動的値の対応表。

- [ ] 3 roomの本文・駅看板・移動イベント・拒否、Skybus地上出口、短時間wait、録画表示を原文に照合する。同文でもcommand / 観測時roomの境界を明示する。
- [ ] T1成功採択後、発車確認後の2回の1分待機と録画開始を静的な英日案内へ含める。普通のWAITと区別し、自動待機・カウントダウン・残容量推定を追加しない。
- [ ] 課題文とmap `transit`、駅と車両、入口到着と実乗車を区別する。専用5操作、main / companion、navigator / compass、live status、drawerの最終9/9説明まで監査する。既存共通copyは再利用し、変更が必要なら影響を明記する。
- [ ] `git diff --check`、fixtureと全引用の対応、リンクを確認し、独立Solのcopy approval、Full / readinessを経てmergeする。Packetは実行入力としてFull分類を維持する。

### T3: 観測・presentation・操作・受入

**Files:** Create `app/transit-observation.ts`, `app/transit-recording.ts`, `tests/e2e/transit-acceptance.ts`, `tests/e2e/transit-fieldwork.spec.ts`, `tests/e2e/transit-narrow.spec.ts`, `docs/transit-fieldwork-acceptance.md`。Modify `app/localization.ts`, `app/story-presentation.ts`, `app/presentation-history.ts`, `app/PrismEdition.tsx`, `app/StoryTools.tsx`, `tests/rendered-html.test.mjs`, `tests/e2e/home-acceptance.ts`、本計画 / status。CI変更は次節に限定する。
**Consumes:** 採択T1 / 承認T2、既存 `BridgePresentation`、Home helperの全prefix。**Produces:** 初回2041年の限定観測 / copy / 操作、`transit2041?: string` history scope、補助交通実績、自然6正例・2負例・controlled3件と証拠索引。

- [ ] Unitで `transit observation rejects ambiguous or stale station evidence`、`transit recording requires a new onboard arrival and explicit stop`、`transit copy stays within the adopted first-2041 scope` を先に追加し、未実装の対象caseが失敗することを確認する。
- [ ] `createTransitObservationState()` / `observeTransit(previous, observation)` を `app/transit-observation.ts` に実装する。Inputは `{ eligible, priorRoomId, statusLocation, hasStatus, acceptsInput, presentation: BridgePresentation | null }`。Outputは観測済み `roomId?`, `atStation?`, `doorsOpen?`, `seenTurns` を持つsession stateとし、具体的なliteral unionと保持/失効表をT1台帳から定義する。未知をfalseの確信へ変えず、旅客位置・到着駅・ドアの確実性を区別する。
- [ ] `createTransitRecordingState()` / `observeTransitRecording(previous, observation)` を `app/transit-recording.ts` に実装する。既存Homeと同様のeligible / raw recording / status / stable presentationに、検証済み交通観測を渡す。成功開始、車内到着、実降車、OFFのpendingをsession内だけ保持し、上記補助実績契約とresetを満たす。
- [ ] Approved catalog `part1.simulation.transit.*`、観測時scope、限定room lookup、map入口adapter、専用操作と交通index 4を接続する。Main / companion / direction surfacesのguardをそろえ、共有static worldや他課題の判定を変更しない。
- [ ] `acceptTransitMilestone(page, controls, testInfo, recordTransit = true)` を作る。`acceptHomeMilestone(..., true)` は既存assertion / 添付の完了後に元contextを返す最小変更だけ行い、`frame / presentation / canonical / input / blocks / send / locale / snapshot / rawTrace` を再利用する。自然sessionを途中で分割しない。
- [ ] Desktop specに3正例・非録画全経路・短い駅のみ負例・controlled3件、narrow specに3正例を実装する。既存84件を保持し **少なくとも95 browser cases** とする。別probeやunitでcoveredの境界を、理由なく全長経路へ重複展開しない。
- [ ] 同一checkpointのreading / focus / locale / live status / drawerをJSON / PNG / accessibilityとして添付し、受入条件と実ファイルの索引を作る。Controlled証拠のprovenanceを自然runtimeと分ける。
- [ ] 短いunit / controlled、影響する自然経路、lint / tsc / `npm test` / checksum、CI制御 / partitionの順で検証する。失敗・再実行・環境制約・実測時間を受入記録へ残す。
- [ ] Sol通常レビュー後、最終head/baseのFullで全検証と証拠保存を兼ねる。Workへ受入対応表と全ZIPを渡し、merge後Fast、#29報告、T3 closeまで行う。最終CI / merge SHAはPRのレビュー記録を正本にし、自己参照の文書commitでFullを無効にしない。

## CIとレビュー負荷

現baselineは **55 unit /84 browser /15 CI制御**。H3最終Full [46000628519](https://github.com/5gmt/mind-forever-voyaging/actions/runs/46000628519)の7群は全成功。Browser時間はchurch 15.6分 / power 11.2分 / remaining 16.4分 / cinema-desktop 14.6分 / cinema-narrow 8.7分 / home-desktop 22.0分 / home-narrow 12.1分。全7 ZIPは991,929,960 bytesでWork監査済み。この実測は将来の時間やアカウント空き容量を保証しない。

- 計画PRは説明文書のみのDocs分類でFast。T1 fixtureとT2 packetはFull分類。開発者の一律ローカルFullは要求せず、Solが修正確定後のhead/baseで手動Fullを起動する。
- T3では111送信を越す新規自然経路をremaining / home群へ積み増さず、`transit-desktop` / `transit-narrow` を追加して **9群** とする。既存7群の所有specを変えない。群追加はwall-clock対策であり、runner-minutesやusage削減と呼ばない。
- `scripts/ci-e2e.mjs`、`.github/workflows/ci.yml`、`tests/ci/policy.test.mjs` / `readiness.test.mjs` を同期する。`transit-fieldwork.spec.ts` → transit-desktop、`transit-narrow.spec.ts` → transit-narrow。未知specはremaining、全件列挙による欠落/重複拒否、1 worker / retry 0 / 各35分、開始・終了head/base guardを保持する。
- Readinessは同一run / attemptの9群すべてを要求し、新群欠落・失敗・skip、過去7群だけの成功を拒否する。AGENTS / CI運用 / status / 本計画 / 受入記録の現行群数をT3で同期する。今の計画PRでは実運用を7群のまま記述する。
- 最終Fullは `save_evidence=true`。起動前に容量と1日以内の監査予定を確認する。旧保護artifactを無断削除せず、容量不足なら別の明示的保守で解決する。成功後に証拠のためだけの重複Fullをしない。
- Workが同一成功run / attemptの **全9 ZIP** のbytes / digest / CRC、`ci-provenance.json` のhead / base / runId / runAttempt / group、索引と添付実体を独立監査する。通常Fullは保存なし。既に監査済みの不変artifactを理由なく再取得しない。
- T3の各群 / 全体時間、artifact容量を実測して記録する。35分超過見込みは事前に配分を再検討し、timeout延長、retry、assertion・添付省略で隠さない。証拠の重複除去やコメント起動は別保守のままにする。

実saved-game RESTORE、実screen reader音声、原作の正式九課題評価と帰還、全路線、後続年の自然完走、本番配備は今回の受入対象外と明記する。T1の成功採択とT2承認の範囲内の修正はSolで完結させ、採択経路・canonical authority・history/recovery/accessibility・observation/rendering境界・完成条件を変える場合だけWorkへ戻す。
