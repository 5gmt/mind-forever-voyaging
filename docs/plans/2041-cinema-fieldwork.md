# 2041 Cinema Fieldwork Implementation Plan

> **For agentic workers:** 担当 Issue を一単位ずつ実行する。利用可能な環境では `superpowers:executing-plans` を使用できる。
> **Execution:** Codex Cloud が F1–F3 を実装する。独立した Chat モード Sol が計画 PR と通常 PR をレビューし、計画 PR / F1 / F2 を merge する。F3 は Sol 通常レビュー後、Astra / ChatGPT Work が milestone 全体を受け入れて merge する。タスクごとの追加 agent 階層は要求しない。

**Goal:** 同じ初回2041年 canonical session で、先行六課題に続いて映画館の入場券を購入し、鑑賞を録画して Kennedy Park の通常入力へ戻れる日本語体験を提供する。
**Architecture:** 既存 2a+2b presentation、exact observed-leaf catalog、観測時 room scope、地名 lookup と限定 SceneActions を使う。先に映画の一ターン内の出力構造と録画容量を実測し、copy approval 後に本文と購入 / 入場操作を統合する。
**Tech Stack:** Next.js / React / TypeScript、canonical Release 79 / Parchment、bridge-v3、Node test runner、Playwright / Chromium。
**Spec:** 本書の「選定と設計判断」「受入境界」。[PROJECT_CHARTER.md](../../PROJECT_CHARTER.md) と [AGENTS.md](../../AGENTS.md) の保証を保持する。
**Status:** F1 は PR #114 の独立 Sol 成功採択と merge により完了。F2 は [PR #117 の独立 copy 承認](https://github.com/5gmt/mind-forever-voyaging/pull/117#pullrequestreview-5810087796)と merge `0ae47106ea4182d4df1db350742205c4988f725d` により完了し、F3 は開始可能となった。本変更で F3 の日本語統合と受入テストを実装する。[統合検証](../cinema-fieldwork-acceptance.md)に証拠を集約し、Sol 通常レビューと Work/Astra の最終受入は未了として区別する。旧失敗証拠と既存回帰、CI保守 #115 / #116 の運用を保持する。
**Baseline:** 教会 [PR #107](https://github.com/5gmt/mind-forever-voyaging/pull/107) の merge `06e6633ff2a3572959955d320ef1e9d8477a5de4`。実行時には最新 `codex/modern-amfv` を含める。
**Execution root:** [#29](https://github.com/5gmt/mind-forever-voyaging/issues/29)。2026-11-01 JST の owner の次期 milestone 設計 / タスク作成依頼に対する提案。

## Global Constraints

- Canonical `public/amfv-r79-s851122.z4` の SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` を維持する。Historical `source/`、非 canonical QA story、production dependencies、deployment は変更しない。
- Release 79 / Parchment が parser、game state、save/restore の唯一の権威である。状態認識は raw English、送信は canonical English、翻訳は presentation に限定する。
- 2a の host / window ownership、2b の per-leaf fallback、history / recovery / accessibility、live `#windowport` の観測と `request-state` による起動同期を保持する。
- 新規翻訳と購入 / 入場支援は、初回2041年の採択経路に限る。未知 room、再入場、Part II、後続年、QA、RESTORE 後の不明状態は English fallback とする。正しく観測した日本語履歴は保持する。
- 既存 milestone の成功 / 失敗 fixture、採択経路と録画窓、回帰を保持する。映画候補Aだけは先行81 line commandsの12–18番目を [設計判断](../cinema-recording-a-design.md)どおり裁判所の現地録画へ置換する。他の順序・録画窓を維持する。#112 merge後の baseline は48 unit /62 browserであり、新 head の成功を意味しない。
- 原作の録画と補助 checklist の推定を区別する。7/9 を原作の正式評価と呼ばず、内部 flag、所持品、残高、録画残量を VM から読んだ値や wrapper 独自の状態として扱わない。
- 新 renderer、汎用取引 engine、GLOBAL / LOCAL-GLOBALS guard の緩和、架空の room / exit、自動購入 / 録画 / 入場 / 移動、日本語 parser は含めない。
- 各 PR が plan と `PROJECT_STATUS.md` を同期する。F3 実装者が受入記録と roll-up を同じ PR に用意する。独立 review、behind=0、mergeability、current-head CI を merge gate とする。

## Review Focus

| 条件 | 期待する結果と担当 |
| --- | --- |
| 六課題後の15分鑑賞と録画容量 | F1 が2 fresh sessions以上で全経路を実測し、full / auto-deactivation と通常入力未復帰を成功扱いしない。F3 が6自然経路で再現する。 |
| 本文中の Movie Theatre と raw 現在地 | F1 が一ターン内の heading、段落、空行、echo、input と status を区別する。F3 は観測時 CINEMA scope を保ち、架空の部屋へ遷移しない。 |
| 券なし、購入失敗、ロビーだけの録画 | F1 が別 fresh probe で券なし入場を観測する。F3 は購入や見出しだけで映画を加点せず、原作の拒否を保持する。 |
| 非録画鑑賞と後付け録画、履歴の縮退 | F3 は自然な非録画負例で先行6/9を保持する。古い鑑賞を後から加点せず、locale / long history / RESTORE 不明の境界を固定する。 |
| 390px と保存証拠の時点ずれ | F3 は鑑賞後と帰着で実測 JSON、PNG、最新 accessibility、lifecycle を同一 checkpoint にそろえる。未出力の時刻を合成しない。 |

## 選定と設計判断

### 候補の比較

教会の次は、映画館での鑑賞録画を選ぶ。
新聞で採択した Bodanski Square までの道を再利用でき、追加の地理的範囲は Museum Entrance と Cinema に限定できる。
以下は現行 code / map と historical source に基づく比較であり、新しい候補の runtime 成功を観測した結果ではない。
成功経路は F1 の実測と独立レビューで採択する。

| 候補 | 得られる体験と追加判断 | 今回の扱い |
| --- | --- | --- |
| Cinema | 入場券購入と15分の映画鑑賞。一ターン内の見出し、購入応答、録画容量を確認する。 | 次期 milestone。新聞の移動と限定操作を再利用する。 |
| 自宅 | 家庭生活の観察。建物と住居の二つの扉、鍵 / 呼び鈴、Jill の時刻依存の行動、内部経路を確認する必要がある。 | 次候補。建物入口への到着を住居訪問と扱わない。 |
| 公共交通 | 乗車と移動の観察。既存 map の Transit は SKYBUS-TERMINAL だが、補助判定は tubecar 応答を参照する。発着、待機、乗降、目的地との対応を先に設計する必要がある。 | 別 milestone。表示名だけで交通経路を選ばない。 |
| Simulation 帰還と正式評価 | 不足課題評価、buffer 消去、再入場を扱う主筋の進行。 | 九課題の残りと別に設計する。今回の途中で帰還を挿入しない。 |

実装は既存 catalog と、Cinema 内に限定した購入 / 入場操作の組み合わせを採る。
Catalog だけでは Guided の語一覧や compass に出ない操作を通せず、汎用 inventory / payment / room engine は二つの command に対して範囲が広い。
限定操作は原作へ試行を渡すものであり、券の所持や購入成功を保証する UI にしない。
既存 SceneActions の配置と draft / send を使い、専用 helper の配置や型名は実装者に委ねる。

### 候補経路と原作上の注意

先行区間は [教会実測](../church-runtime-evidence.md) と [教会受入](../church-fieldwork-acceptance.md) の81 line commandsを基礎とする。
旧候補はこの全列を維持して容量不足になった。
次の候補Aでは12–18番目だけを `SW NW RECORD LOOK RECORD OFF SE NE` に置換し、Courthouse の LOOK を現地で録画する。
1–11番目と19–81番目は維持する。候補Aは PR #114 で採択済みであり、詳細と追加条件は [候補Aの設計判断](../cinema-recording-a-design.md)を正本とする。
`scripts/capture-church-runtime.mjs` と既存 milestone の全経路 / 録画窓は変更しない。
81件には実測 decoder answer を含み、起動 character input は別記する。

| 区間 | 候補 command と room identity |
| --- | --- |
| 往路（非録画） | `NE N NE E NW`。KENNEDY-PARK → MAIN-AND-KENNEDY → CENTRE-AND-KENNEDY → BODANSKI-SQUARE → MUSEUM-ENTRANCE → CINEMA。 |
| 購入（非録画） | `BUY TICKET`。原作の購入成功応答を確認する。 |
| 鑑賞 | `RECORD` → `IN` → `RECORD OFF` → `LOOK`。映画本文、録画中の応答、ロビーの通常入力、明示 OFF を確認する。 |
| 復路（非録画） | `SE W SW S SW`。Museum Entrance から同じ地点を戻り、公園の通常 line input で終える。 |

追加15送信、合計96 line commandsは計画時の候補である。
F1 は実際の UI alias と送信方法を台帳化し、short direction と英語全文 command を混同しない。
Map、locale、draft の編集は interpreter に送信しない。

`source/rockvil.zil` の `TICKET-F` / `THEATRE-ENTER-F` では、券は15ドルで購入し、所持していれば `IN` 一回で鑑賞し、15分経過する。
応答は案内文、空行、`Movie Theatre` 見出し、映画の評とロビーへ戻る文を含むが、routine は部屋を返さず、生成済み `WORLD_ROOMS` の CINEMA に `IN` exit もない。
本文見出しから新しい room を作ったり、map / compass に架空の exit を追加したりしない。
F1 は raw status が実際に CINEMA のままか、一ターン内の構造を既存 ordinary projector で保存できるかを確認する。

`source/globals.zil` の `VENDING` は残高を含む購入応答を出し、資金不足は別応答になる。
`READ TICKET` は乱数の券番号と整形を伴うため今回の経路に加えず、marquee、券売機の検査、他の映画館も対象外とする。
購入応答の残高は観測した exact leaf の照合に含め、未知額を汎用 regex で日本語化しない。
時刻、残高、録画の内部値から未観測の成功を推測しない。

録画中の鑑賞は source の table index 14 に対応するが、`source/misc.zil` の録画容量更新も同じ15分を消費する。
Source 上の flag と wrapper の7/9だけでは全編録画の成功を証明できない。
F1 は full / auto-deactivation の有無、鑑賞前後の raw recording status、次の input、明示 OFF を確認する。
前回の half-full warning を保存し、数値残量を捏造しない。

### F1 の採択と停止条件

2回以上の fresh canonical sessionで先行六課題から候補全経路を採取する。
少なくとも1 sessionは canonical form、もう1 sessionは現行 UI の利用可能な操作と canonical form を併用し、欠ける支援操作を明記する。
未知の UI を仮実装して capture を成功させない。
別 fresh session の短い probe で、最短往路を通って未購入の `IN` が拒否され、通常入力と現在地が保たれることを観測する。
これは成功経路の prefix / 送信数に混ぜず、自然な negative probe として保存する。

F1 が採択するのは、全96送信の成功、購入応答、15分鑑賞、録画継続、明示 OFF、帰着、必要な出力構造と操作台帳である。
購入失敗、full / auto-deactivation、途中停止、先行課題の欠落を成功扱いしない。
候補Aで明示した裁判所の RECORD / OFF 移動以外に、WAIT、再購入、追加の所持品操作、先行順序 / 録画窓の変更、帰還 / buffer 消去、新しい observation / projection が必要なら、失敗証拠を保存して Work に設計判断を戻す。
単なる current input 同期待ちや locator の修正は、canonical 経路を変えない範囲で Sol が扱える。
失敗 evidence-only PR の merge だけでは F1 採択完了や F2 / F3 開始にはならない。

### UI と copy の範囲

F1 は room heading、current place / identity rail、map `movie`、route / compass、録画 reminder、購入 / 入場の visible label と accessible name を別々の台帳行にする。
Museum Entrance は map `railroad` の目的地でもあるが、映画経路への地名追加を Railroad Museum 全体の翻訳承認と扱わない。
`Cinema`、本文内 `Movie Theatre`、`Downtown Cinema Quad`、`Upbeat Patrol II`、対象物 `TICKET`、課題 index 7「映画を見に行くこと」は別 identity として扱い、既承認の課題訳を再利用する。

新規支援は初回2041年 / CINEMA / line input の `BUY TICKET` と `IN` に限る。
Guided は編集可能な English draft と明示 submit、Actions は1押下1送信とし、busy / char input では送信しない。
Main と companion の両配置を確認する。
Classic に支援操作や checklist を追加しない。
対象外の年 / phase / room / QA / RESTORE 不明時には新規支援を出さず、既存の English fallback を保持する。
券なしでも原作に試行できることを保ち、wrapper が未購入を成功に変えたり、独自の所持品履歴で canonical command を拒絶したりしない。
`READ TICKET` や建物 Enter の generic guard を緩めず、実測に基づく限定操作として渡す。

## 受入境界

- Classic / Guided / Actions ×1440×900 /390×844の6 fresh sessionsで候補Aの先行81件と採択映画区間を完走する。裁判所は現地録画、他区間は既存録画窓を保持し、各 current input → 新 echo → 次 input を照合する。既存 milestone のテストは旧経路 / 録画窓 / assertion / 添付を維持する。
- Assisted modesは実際の地図、route、compass、録画、購入 / 入場を操作する。最終公園帰着時も先行六課題の表示を保持して補助7/9を確認する。Classic に checklist はない。
- 別 fresh Actions /desktop sessionで先行六課題は録画し、映画だけ RECORD / OFF を省く。候補94送信で購入 / 鑑賞 / LOOK / 帰着後も補助6/9を保持する。
- Controlled probesでは、券なし拒否、ロビー heading / LOOK、購入だけ、録画停止後の鑑賞、古い鑑賞の後から RECORD で映画を加算しない。必要な拒否原文は F1 の自然 probe を使用し、未観測の資金不足は source由来の合成 probe と明記して English fallback を確認する。
- 映画本文の観測時 CINEMA scope、同文の別室 / 別年、再入場 / Part II / QA / RESTORE 不明、fresh session、rolling history、EN→JA→ENを unit / controlled browser で固定する。履歴中の Movie Theatre を現在地として採用しない。
- 未承認 Cinema を利用した既存 fallback assertion を更新する場合は、初回 scope の新承認箇所だけ変更する。自宅 / 公共交通等の未承認 fallback と、対象外 phase の Cinema fallback を明示的に維持する。
- 鑑賞後と公園帰着で本文末尾、入力の viewport / focus、lang、単一 accessibility owner、390px drawer の地図 / brief と最下部到達を保存する。
- 全 JSON / PNG / accessibility TXT / controlled probes を実ファイルとして path 添付し、同じ head の passing CI ZIP の存在と内容を確認する。JSONだけ、body-only添付、artifact名の一覧だけでは監査完了にしない。

### 証拠保存とレビュー負担

#107 の P2 対応を新しい映画 checkpoint に引き継ぐ。
Companion / drawer の監査前後の観測と、通常の wheel scroll / focus で読み直した最終状態を分ける。
閉じた panel と transition 終了を待ち、撮影直前 / 直後に末尾矩形、clipping、scroll、input、panel状態を測定して一致を assertion にする。
最新 accessibility と PNG を同じ checkpoint ID / lifecycle に結び、boolean は実測値から保存する。
最終帰着 PNG は検証済み buffer を再利用する。
これは自動的なスクロール位置維持を保証する仕様ではない。

F3 の受入記録に「条件 → test → JSON / PNG / TXT の path」をまとめ、Sol / Work が証拠を探し直さずに済むようにする。
先行 milestone の assertion と添付は保持し、同じ head の確認済み ZIP をレビュー段階ごとに再取得することは要求しない。
実装者は local のファイル内容を照合し、Sol は通常の code / test / copy review と実測の整合を確認する。
Work は最終 head の手動証拠実行（`save_evidence=true`）で生成した、同一run /attemptの3群すべてのpassing ZIPを独立に監査する。
各ZIPの `ci-provenance.json` とレビュー対象headの一致を確認し、1日の保存期限内に監査または退避する。
他の担当が行った監査は担当者と記録を引用し、自分で行ったように書かない。
取得に失敗した場合は利用経路と未了項目を記録し、OpenAI 側転送ホストの許可リスト追加をタスクの既定条件にしない。

## タスクと依存関係

計画 PR #111、失敗証拠 PR #112、候補Aの設計同期 PR #113 は merge 済み。F1 の追加実測の独立成功採択 / merge → F2 の copy approval / merge → F3 の実装、Sol通常レビュー、Work全体受入 / mergeの順とする。
今回は本文と操作の identity が F1 の実測に依存するため、独立した先行翻訳タスクを作らない。
次の三タスクは別々に却下 / 採択できる単位である。

| Task | Issue | 完了と次の開始条件 |
| --- | --- | --- |
| F1 実測と経路採択 | [#108](https://github.com/5gmt/mind-forever-voyaging/issues/108) | 独立Solが成功経路を採択してmerge。F2開始。 |
| F2 copy承認 | [#109](https://github.com/5gmt/mind-forever-voyaging/issues/109) | 独立Solがcopy approvalしてmerge。F3開始。 |
| F3 統合と全体受入 | [#110](https://github.com/5gmt/mind-forever-voyaging/issues/110) | Sol通常レビュー後、Work受入 /merge、#29報告とclose。 |


### F1: 六課題後の映画鑑賞を実測して採択する

2026-11-06 の実測では、先行81送信を保持した2 fresh attempts が89送信目の `IN` で容量不足と自動停止になった。
[失敗 fixture](../../tests/fixtures/parchment-cinema-runtime-failure.json) に全入力対応、本文、時計、通常入力への復帰、別 fresh 券なし probe と先行 harness failure を保存した。
これは旧候補の停止証拠であり、この時点では以下の96送信の成功採択条件は未達だった。
明示 OFF / LOOK / 帰着へ進まず、Work に経路設計を戻した。
Work の候補Aは設計同期 PR #113 の独立 review / merge 後に追加実測し、2 fresh sessionsで全96送信と映画録画、明示 OFF / LOOK、公園帰着を確認した。
[候補Aの実測](../cinema-recording-a-evidence.md)は PR #114 で独立 Sol が成功採択 / merge し、上記の失敗証拠と区別して保持する。
F2 は PR #117 の独立承認 / merge を完了し、F3 の開始条件を満たした。

**Files:** 更新 `scripts/capture-cinema-runtime.mjs`（明示 `--candidate-a`）、`tests/rendered-html.test.mjs`、本書、`PROJECT_STATUS.md`。新規 `tests/fixtures/parchment-cinema-recording-a-observed.json`、`docs/cinema-recording-a-evidence.md`。失敗時は別 `tests/fixtures/parchment-cinema-recording-a-failure.json` に経過を残す。Flagなしの旧候補と #112 の failure fixture / evidence / regression、以前の capture / fixture を保持する。Production code は変更しない。
**Interfaces:** 既存教会 capture の81送信に候補Aの7送信置換を適用する。全送信、decoder交換、起動char、各 input ID / echo / next input、raw status、bridge-v3 presentation、地点照合、warnings、実 UI alias / 表示条件、stable / dynamic / optional leaf 台帳、別の券なし probe を F2 / F3 に渡す。新 fixture は既存形式に合わせ、成功 session と failure / probe を区別する。

- [x] 旧候補を最新 default branch と教会採択 fixture から定義し、#112 に失敗証拠を保存した。
- [x] 設計同期 PR の merge 後に候補Aを明示 flag と別出力先で追加する。
- [x] 2 fresh full sessionsを保存する。独立した券なし probe は #112 の元 SHA / fixture / session ID を明記して再利用できる。Input / 観測境界への影響があれば再採取する。起動 / harness 失敗と canonical 経路失敗を区別し、途中までの出力も残す。
- [x] `tests/rendered-html.test.mjs` に先行81件への明示的7送信置換、全送信数、裁判所 LOOK 本文と録画、room / input chain、鑑賞前後の録画、購入成功、full警告なし、明示OFF、帰着とprobe拒否を検査する regression を追加する。
- [x] 生の見出し / 段落 / 空行が既存 projector で表現できることを確認し、金額、映画名、時刻、UI不足、optional出力を台帳にする。
- [x] 検証を記録し、PR #114 で独立 Sol が成功採択 / merge した。F2 の copy承認が開始可能。

### F2: 観測済み映画本文と限定操作の copy を承認する

[Copy packet](../cinema-copy-packet.md) に成功本文8 leaf、別 fresh 券なし拒否1 leaf、既承認7 leaf の再利用、役割別の地名と限定 BUY TICKET / IN の英日 copy をまとめた。
原文の正本は候補Aの成功 fixture とし、新規 UI 案と実測 UI を区別する。
独立 Sol が PR #117 で copy を承認し、merge を完了した。
本 F3 はその承認済み packet を消費する。

**Files:** 新規 `docs/cinema-copy-packet.md`。更新本書、`PROJECT_STATUS.md`。Catalog / production code は変更しない。
**Interfaces:** F1 の採択 fixture / UI台帳を消費する。Exact English leaf、command alias、観測時 room、適用条件、再利用か新規か、EN / JA copy、fallback、visible / accessible name、送信 command の対応を F3 に渡す。

- [x] F1 の成功採択 / merge と採択 fixture を確認する。
- [x] 必須の本文、Museum Entrance / Cinema、映画名、購入 / 鑑賞操作の copy を作る。既存の地名、課題訳、録画、route文は再利用する。
- [x] `Movie Theatre` の本文内 identity と CINEMA の current placeを区別し、金額 / raw statusを創作しない。映画評の続編との比較と、15分で鑑賞を切り上げる内容を保持する。
- [x] 券なし拒否等を翻訳対象に含める場合は F1 の exact observed leaf に結び付ける。未観測の資金不足、券の印字、marqueeは承認しない。
- [x] 原文との照合、リンクとdiffを確認し、PR #117 で Sol の copy approval / merge を受けた。

### F3: 映画鑑賞を日本語化して全体受入する

**Files:** 更新 `app/localization.ts`、`app/PrismEdition.tsx`、`app/StoryTools.tsx`、操作説明の既存CSS、必要な観測時scopeの `app/presentation-history.ts`、`tests/rendered-html.test.mjs`。新規 `app/cinema-recording.ts` は映画の補助チェックだけを観測する。新規 `tests/e2e/cinema-acceptance.ts`、`tests/e2e/cinema-fieldwork.spec.ts`、`docs/cinema-fieldwork-acceptance.md`。必要な最小変更のみ `tests/e2e/restaurant-acceptance.ts`、`tests/e2e/city-hall-acceptance.ts`、`tests/e2e/power-station-acceptance.ts`、`tests/e2e/church-acceptance.ts`、既存 Cinema fallback を使う spec、`.github/workflows/ci.yml`。本書と `PROJECT_STATUS.md` を同期する。
**Interfaces:** F1 の観測契約と F2 の承認 copy を消費する。`acceptChurchMilestone(page: Page, controls: "classic" | "guided" | "actions", testInfo: TestInfo, recordConversation = true)` を先行81送信の入口として再利用する。Church → Power Station → City Hall → Restaurant に映画専用の現地録画選択を渡す最小拡張を許可し、既定の旧往復録画と負例フラグを維持する。各 prefix 比較と添付には経路選択を明記する。着手時点では戻り値がないため、既存 `frame` / `input` / `status` / `send` / `snapshot` / `rawTrace` / 最終input ID等を返す最小拡張を許可する。既存経路の assertion / 録画窓 / 添付を削らず、候補Aでも LOOK と全課題の成立を検証する。残る未送信 draft は送信せず消去する。`acceptCinemaMilestone(page: Page, controls: "classic" | "guided" | "actions", testInfo: TestInfo, recordMovie = true)` を新しい受入入口とする。

- [x] 未登録 copy、本文内見出し / 現在地、限定操作と非録画判定に対する RED を保存する。
- [x] 承認 catalog / 地名 / map と `BUY TICKET` / `IN` の限定操作を統合し、GREENを確認する。既存 generic guard は維持する。
- [x] 6自然経路と別fresh非録画負例を完走し、actual English commands、recording status、帰着、補助7/9または6/9を確認する。
- [x] Review Focus と受入境界の controlled / unit regressionを固定し、自然な canonical evidence と分けて保存する。
- [x] 同時点の reading / input / accessibility / PNG と390pxのdrawer証拠を保存し、local実体を照合する。
- [x] 全検証、CI所要時間、artifact情報、受入条件への対応を受入記録に集約する。実装時点で未了の独立 review / merge / close は先取りしない。
- [ ] Sol通常レビュー後、同じ最終 head の Work全体受入と ZIP監査、merge、#29報告、F3 closeで milestoneを完了する。

## 検証と引継ぎ

F1 / F3は必要に応じ `bash scripts/bootstrap-npm.sh`、続いて `npm ci`、`npm run lint`、`npx tsc --noEmit`、`npm test`、full `npm run test:e2e`、canonical checksum、`git diff --check` を実行する。
Full E2Eは最終 head の CI実行を根拠にでき、同じ head で成功済みならローカルで重複実行することを必須にしない。
対象確認は `npx playwright test tests/e2e/cinema-fieldwork.spec.ts` とし、対象成功をfull成功の代用にしない。
F1候補Aは production build / preview に対し `node scripts/capture-cinema-runtime.mjs --candidate-a --base-url http://127.0.0.1:3100 --output /tmp/parchment-cinema-recording-a-observed.json --failure-output /tmp/parchment-cinema-recording-a-failure.json` を実行する。旧 flag なし経路は保持する。
計画 PR / F2は文書、fixtureとの照合、リンク、diffを確認し、local未実施項目と current-head CIを区別する。

Baselineの #107最終CIは47 unit /62 browser、1 worker、retry / skipなし、browser step38分21秒 /job39分50秒、上限50分、artifact397,434,042 bytes /14日保持だった。
新規の長い経路で各群の現行上限に近づく場合は、正常な実行時間と起動待ち / failureを分けて測定する。
必要最小限のtimeout変更は、根拠と新上限をF3の同じPRでSol / Workに渡す。
映画計画とは別の2026-11-07 CI保守で、変更分類と3群分散、通常artifactの保存停止を導入した。
各群は1 worker、retryなしで、テストの内容と添付生成を維持する。
F3 の CI #212 は remaining が35分上限で52/53件成功時に打ち切られたため、remaining だけ40分にする。
Church / power は35分を維持し、分配、件数、retry、添付生成を変えない。
最新の実行方法は[CI運用](../ci-operation.md)を参照し、F3では全群の実測時間を記録する。
同じheadのfull suiteが成功し、artifactに必要な実体がそろうまで最終受入しない。

引継ぎにはhead / base、review後差分、未解決指摘、current-head CI / artifact /実expiry、受入条件と保存path、失敗 /再実行 /未実施を記す。
再レビューは差分と影響する証拠に絞り、具体的な波及やbase変更時に広げる。
Shared credentialsでformal approvalできない場合は、reviewed SHA、判断、provenanceをCOMMENT reviewへ残す。
最終SHA / merge / closeはPR review /Issue /#29を正本とし、SHA自己参照更新だけのcommitを要求しない。
締めでレビュー回数、差し戻し、引継ぎから受入までの経過時間を記録する。未計測のusage削減量は主張しない。

実saved-game RESTORE、実screen reader音声、原作正式評価、後続年 /再入場の自然完走、本番配備は、実施していなければ未検証と明記する。
[#44](https://github.com/5gmt/mind-forever-voyaging/issues/44)は別件のまま保持する。
