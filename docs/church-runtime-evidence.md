# 2041 Church の連続経路の実測

## C1 の提出判断

C1 / [#102](https://github.com/5gmt/mind-forever-voyaging/issues/102) の候補81送信を、2つの独立した fresh canonical session で完走した。
先行67送信と全録画窓を保持し、St. Michael’s の人物在室、録画中の会話と退場、明示 OFF、退場後 LOOK、Kennedy Park の通常 line input を確認した。
成功経路と操作契約を独立した Chat モード Sol の採択候補として提出する。
独立採択と merge までは C1 完了とせず、C2 / C3 の開始 gate を解除しない。

開始根拠は [計画 PR #101](https://github.com/5gmt/mind-forever-voyaging/pull/101) の merge `ae73f1eeb14b8c7f88977876c8db569e8d20b71f` と [#102 の開始通知](https://github.com/5gmt/mind-forever-voyaging/issues/102#issuecomment-6500948606)である。
同 commit を base とし、production code、canonical binary、historical source、既存 capture / fixture は変更していない。
日本語 copy と限定 actor guard は C2 / C3 に渡す。

## 成果物と再現

| 成果物 | 内容 |
| --- | --- |
| [capture](../scripts/capture-church-runtime.mjs) | 先行67送信を保持し14送信を追加。Current input ID → 新 echo → 次 input ID を照合し、途中失敗も raw status / presentation とともに保存する。 |
| [fixture](../tests/fixtures/parchment-church-runtime-observed.json) | 2 fresh contexts、各81 line submissions / 80 combined observations / startup character input / 82 parent-to-player requests。11地点×6組合せ×2 sessions の132 UI samples。 |
| [regression](../tests/rendered-html.test.mjs) | `retains two fresh church routes after all 67 accepted submissions`。先行67件、全送信順、録画窓、input chain、在室・会話・退場、raw clock、ordinary projection の行構造を固定する。 |
| [初回停止の証拠](../tests/fixtures/parchment-church-runtime-harness-failure.json) | 在室検査の不一致で72送信時に停止した2 contexts と、Talk locator 不一致で73送信時に停止した再実行を保持する。再実行の完走1 context も併記。UI監査を除き canonical observations / input / echo / raw status / failure observation と元の error label を保存。 |
| [先行証拠](power-station-runtime-evidence.md) | 先行五課題の67送信と既存録画区間。既存の成功・容量不足 fixture はそのまま保持。 |

```bash
bash scripts/bootstrap-npm.sh # npm が古い場合
npm ci
npx playwright install chromium
npm run build
python3 -m http.server 3100 --bind 127.0.0.1 --directory out
# 別 terminal
node scripts/capture-church-runtime.mjs \
  --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-church-runtime-observed.json
```

両 context は1440×900の production static export を使用した。
起動の空白1文字は `startup.inputKind=char` に分離し、81 line commands に数えない。
実 decoder answer は `submissions[6]` に保存し、質問 input と数値 input を別々に連鎖させる。
`observations[5]` はその交換を一つの presentation としても保存するため、観測は80件になる。
数値の echo は実 prompt 行の末尾にあり、独立した echo 行を合成していない。
`bridgeCommands` は parent-to-player request だけを数える。
`statusText` は live GridWindow の未加工 textContent（埋め込み style を含む）、`presentation` は live `#windowport` の bridge-v3 抽出結果である。
`roomId` は exit と raw status による照合値で、VM telemetry ではない。
以下の index は0始まりの `observations` を指す。

## 全経路と録画窓

先行67件には PEOF、4回の WAIT、Simulation 入場と実 decoder answer、最初の録画、Courthouse、Newspaper、Restaurant、City Hall、Power Station と各公園帰着を含む。
Regression は既存 Power Station fixture と先行67送信および66観測の location / recording mode を照合する。
追加経路は `NE E E N W | RECORD / CHURCH ELDER, HELLO / RECORD OFF / LOOK | E S W W SW` で、WAIT・帰還・buffer消去・課題順変更は挿入していない。

| index | command 1 / actual UI alias 2 | room identity / raw location | time 1 / 2 | recording |
| --- | --- | --- | --- | --- |
| 66 | `NE` / `ne` | `MAIN-AND-KENNEDY` / Main & Kennedy | 3:51pm / 4:28pm | off |
| 67 | `E` / `east` | `MAIN-AND-RIVER` / Main & River | 3:56pm / 4:33pm | off |
| 68 | `E` / `east` | `MAIN-AND-CHURCH` / Main & Church | 4:01pm / 4:38pm | off |
| 69 | `N` / `north` | `CHURCH-ENTRANCE` / Church Entrance | 4:06pm / 4:43pm | off |
| 70 | `W` / `west` | `ST-MICHAELS` / St. Michael's | 4:11pm / 4:48pm | off |
| 71 | `RECORD` / `record` | `ST-MICHAELS` / St. Michael's | 4:12pm / 4:49pm | on |
| 72 | `CHURCH ELDER, HELLO` / `church elder, hello` | `ST-MICHAELS` / St. Michael's | 4:20pm / 4:57pm | on |
| 73 | `RECORD OFF` / `record off` | `ST-MICHAELS` / St. Michael's | 4:21pm / 4:58pm | off |
| 74 | `LOOK` / `look` | `ST-MICHAELS` / St. Michael's | 4:22pm / 4:59pm | off |
| 75 | `E` / `east` | `CHURCH-ENTRANCE` / Church Entrance | 4:27pm / 5:04pm | off |
| 76 | `S` / `south` | `MAIN-AND-CHURCH` / Main & Church | 4:32pm / 5:09pm | off |
| 77 | `W` / `west` | `MAIN-AND-RIVER` / Main & River | 4:37pm / 5:14pm | off |
| 78 | `W` / `west` | `MAIN-AND-KENNEDY` / Main & Kennedy | 4:42pm / 5:19pm | off |
| 79 | `SW` / `sw` | `KENNEDY-PARK` / Kennedy Park | 4:47pm / 5:24pm | off |

Session 1 は全81件を canonical command form から送信した。
Session 2 は先行67件も同じ form、教会往路は Guided map の draft → Send と Guided companion exit の直接送信、現地は Guided Talk draft → Send と quick actions、復路は日本語 Actions compass の直接送信である。
実際の送信方法は各 turn の `submissionMethod` に保存した。
全82 bridge requests は起動 character input と81 line submissions に一致し、draft / locale / map 選択の監査は input ID を進めていない。

Half-full warning は両 session の index32、Roy’s Pagoda の `BUY MEAL` で発生した。
原文は `WARNING: Record buffer is now half-full.` で、`warnings` に turn ID と raw status からの値も保存した。
全経路で full / auto-deactivation、人物不在、会話不成立、帰着失敗を観測していない。
数値残量、内部 flag、原作の正式課題評価は未観測であり、補助 checklist の6/9とは区別する。

## Stable / dynamic / optional leaves

Stable は今回の2 capture で同じ操作・地点に同じ原文を得た leaf を指す。
別年・再入場・別教会での適用や copy approval を意味しない。
新規区間で得た必須 leaf を下表に列挙する。
本文と空行は fixture の順序を保ち、Main & River の二段落も分離する。

| index / command 1 / command 2 | exact stable leaf |
| --- | --- |
| 66 / `NE` / `ne` | Main & Kennedy |
| 67 / `E` / `east` | Main & River |
| 67 / `E` / `east` | This is a typical four-way intersection between Main and River Streets. An entranceway through the massive walls of Heiman Village fills the southeast corner of the street, and a health care facility occupies the northeast corner. |
| 67 / `E` / `east` | To the southwest is 80 River Street, a brand new plastalloy and glass office building, with many floors still unoccupied according to the billboard over the entrance. The fourth corner, the northwest, is the site of Perez Towers, a luxury apartment building. The sidewalks and street are crowded with people. |
| 68 / `E` / `east` | Main & Church |
| 68 / `E` / `east` | You are at the corner of bustling Main Street and quiet Church Street. There is construction in progress on the northwestern and southwestern corners. A conventional apartment building occupies the southeast corner, and an entrance to Midland Cemetery forms the fourth corner. Some greenery is visible down Church Street to the south. |
| 69 / `N` / `north` | Church Entrance |
| 69 / `N` / `north` | You are on Church Street, just east of a large, opulent church displaying the architecture of the twentieth century. The street continues north and south, and construction sites lie to the northwest and southwest. The main entrance to Midland Cemetery is east of here. |
| 70 / `W` / `west` | St. Michael's |
| 70 / `W` / `west` | This is a large church with an obviously wealthy congregation. Although this building is over a century old, it is not the original St. Michael's, but is built on the site of the even older original church. The way out is to the east. |
| 70 / `W` / `west` | You suddenly notice a church elder, pacing around at the other end of the building. |
| 71 / `RECORD` / `record` | Record feature activated. |
| 72 / `CHURCH ELDER, HELLO` / `church elder, hello` | You have a brief chat with the church elder, who smiles and comments on how happy he is about the recent increase in church attendance, which he attributes to an improving national moral climate. Suddenly he glances at his watch, mumbles a polite parting message, and hurries away. |
| 73 / `RECORD OFF` / `record off` | Record feature deactivated. |
| 79 / `SW` / `sw` | Kennedy Park |

Dynamic は decoder の質問・実回答、raw status の時刻・日付、line ID、style 順序、capture timestamp である。
時計は desktop の実値だけを保存し、390pxで未出力になる時計を補完しない。
必須 leaf 内に可変時刻はなかった。

Optional output は次の session・発生地点・原文で保持した。
C2 の承認対象に自動追加せず、English fallback を維持する。

| session / index / location | exact optional leaf |
| --- | --- |
| 1 / 68 / Main & Church | You are startled as a taxi horn blares nearby. |
| 1 / 75 / Church Entrance | Across the street, two policemen are frisking a youth. As you watch, they usher the youth into a waiting car and fly off. |
| 1 / 78 / Main & Kennedy | The ground shakes as a huge truck rumbles down the street. |
| 2 / 68 / Main & Church | A skycopter drones by far overhead and disappears into the distance. |

Regression は未加工 turn の English fallback で全非空 leaf が残ることを確認する。
新規 copy がないため、既承認 Kennedy Park leaf を一つだけ追記した controlled shape probe で ordinary projector の source-line 対応、heading / paragraph / spacer の順序保持も確認する。
この probe は runtime 出力や翻訳正例ではない。
Raw heading の run は `Style_normal` であり、C2 は heading の意味を copy packet で明示する必要がある。

## UI surface の台帳

11地点は公園出発前、往路3地点、入口、非録画在室、RECORD 後、会話退場後、明示 OFF、退場後 LOOK、公園帰着である。
各地点で EN / JA × Classic / Guided / Actions を監査した。
`location` / `identity` / `compass` / `sceneActions` / `companionSceneActions` / `context` / `quickActions` / `recordingReminder` / `commandHelp` / `mapSurface` は visible、accessible snapshot、明示 lang と text leaf の継承 lang、button の disabled を保存する。
Main と companion の Guided draft を別々に採り、いずれも送信せず消去して input ID 不変を確認した。

| Surface / identity | visible / accessible name / lang | 操作と C2 / C3 handoff |
| --- | --- | --- |
| `MAIN-AND-KENNEDY` | 既承認の Main & Kennedy / メイン通りとケネディ通り。 | 出発直後と帰路で既存訳を再利用。 |
| `MAIN-AND-RIVER` | Main & River。未承認の current place / context / compass destination は JA でも英語 `lang=en`。 | 往路 `E` / `east`、復路 `W` / `west`。二段落の原文を保持。 |
| `MAIN-AND-CHURCH` | Main & Church、同じ English fallback。 | 往路 `E` / `east`、復路 `S` / `south`。 |
| `CHURCH-ENTRANCE` | Church Entrance、同じ English fallback。 | 往路 `N` / `north`、復路 `E` / `east`。建物内とは別 identity。 |
| `ST-MICHAELS` | St. Michael's、同じ English fallback。 | 往路 `W` / `west`。Generated一般名 Vacant Lot を2041年の実表示に採らない。 |
| map `church` | visible `ST. MICHAEL'S CHURCH`、accessible `St. Michael's Church`（現地だけ `, current location`）。`fieldwork destination` suffix は現状出ない。JA でも地名 leaf は `lang=en`。 | room lookup と別の copy 行。Map 選択は未送信。 |
| assignment index6 | EN Talk to a church official / JA 教会関係者と話すこと。 | 既承認課題ラベル。補助6/9は原作の正式評価ではない。 |
| identity rail | 既存 PRISM / Simulation / 2041 / ROCKVIL 等。 | 各 leaf の lang を保存。新しい copy 範囲を rail 全体へ広げない。 |
| Guided map route | DRAFT NEXT STEP / 次の移動を入力欄へ。 | English editable draft のみ。Session 2 の往路で明示 Send まで実測。 |
| Actions map route | TAKE NEXT STEP / 次の移動を実行。 | 直接送信の既存コード契約。今回この button の直接送信は未実行。 |
| compass / companion exits | 既承認の共通 label と英語の新規目的地、`E` / `east` 等。 | Guided でも直接送信。Session 2 で Guided companion の east と JA Actions compass の復路を実測。Guided compass 自体の送信は静的確認。 |
| RECORD / OFF / LOOK | Record / Stop recording / Look、録画開始 / 録画停止 / 見る。 | Guided でも直接 `record` / `record off` / `look`。Session 2 は各1押下。Reminder の開始 button は監査のみ。 |
| `CHURCH-OFFICIAL` | church elder、Talk、Worth trying / Words mentioned here 等は JA でも英語 `lang=en`。 | main / companion の在室時 Guided draft は `church elder, hello`。Actions の直接 Talk はコード確認のみ。限定 guard と日本語は C3。 |
| `CHURCH-OBJECT` | 入口等で church / Examine が現れる。 | 既存汎用操作の観測。新規支援や翻訳の対象に拡張しない。 |
| Classic | map launcher / compass / quick actions / SceneActions は非表示。 | canonical form のみ。assisted controls を追加しない。 |

### 人物 guard の現状と不足

現在の `belongsToSourceRoom` は LOCAL-GLOBALS の movesToCurrentRoom actor を候補にし、`contextualObjects` が名前の言及と present/departed の汎用正規表現で絞る。
City Hall には visit / initial2041 / line input に関する限定 state があるが、教会には同じ契約がない。
`SceneActions` の対象限定も GOVERNMENT-OFFICIAL 向けで、教会関係者に初回2041年 / ST-MICHAELS / line input を保証する追加 guard はない。
今回の自然経路では会話前の両 Talk と `church elder, hello` draft、会話後・OFF後・LOOK後の両 Talk 不在を確認した。
会話後は汎用の church / Examine が残り、人物と建物を区別できる。
これは以下の未検証条件まで保証する観測ではない。

C3 は教会で得た新しい在室証拠だけで main / companion の両 Talk を許可し、会話済み状態と一時的な不在を区別する必要がある。
古い sceneText / 20,000文字の rolling history / 再訪 / locale切替で人物を復活させず、他室、未知 room、欠損 report、RESTORE不明、再入場、後続年、Part II、QA を fail-closed にする。
Generic GLOBAL-OBJECTS / LOCAL-GLOBALS guard は緩和しない。
会話後も既存の正しい日本語履歴を保ち、翻訳の観測時 scope と現在の人物可用性を分離する。

時刻退場の `The church official wanders off.`、First Methodist の同 actor、再訪、long history、RESTORE、非録画会話、390pxは今回の自然経路で未観測である。
時刻退場の原文と `STIME > 1200`、出現条件の `480 < STIME < 1200`、BRIEF-CHAT の8分・録画時 table index12は source / 計画の設計根拠であり、本 fixture の実測 leaf / VM flag ではない。
WAIT を追加せず、これらの負例は C3 の controlled report / 別 fresh session に渡す。

Busy は既存 `!acceptsInput` の disabled を静的確認した。
Main の assisted controls は line-input 分岐にあるが、companion 汎用 SceneActions / exits と汎用 actor の lineInput 契約は同等ではない。
今回のUI監査は通常 line input 待ちで行ったため、busy / char の自然な操作結果を検証済みとしない。
C3 は main / companion の両方を同じ境界でテストする。

## 検証と停止・再実行の記録

- Node 24.19.0 / npm 11.17.0、bootstrap 後の `npm ci` 成功。dependency files は変更なし。
- baseline `npm test` は39/39成功。
- RED: 新規回帰は fixture 未作成を AssertionError として検出した。最初の sandbox 実行は子 process 制約による失敗で、権限付き実行で意図した RED を確認した。
- 初回 capture は2 contexts とも72送信、非録画の教会到着で停止。検査が church official を要求したが、実際は church elder の在室文だった。Raw partial output と誤った routeFailure ラベルを別 fixture に保存した。経路・録画窓・production は変えず、検査だけ実測 leaf に合わせて fresh contexts で再採取した。
- 再実行は Session 1 が81送信完走、Session 2 はTalk前に locator strict-mode error。閉じた companion の要素にも一致したため、main の `.command-deck` 配下へ限定して再採取した。修正途中の1実行は selector 見直しのため中断し、成功 fixture に数えない。
- 最初の fixture 回帰は、地図の accessible name に fieldwork destination suffix があると仮定して失敗。実測 name は現地で `St. Michael's Church, current location`、他地点で `St. Michael's Church` だったため、期待値と台帳を観測に合わせた。
- 最初の lint は scratch に置いた未完のテスト断片も走査して未定義名を指摘した。断片を非コード拡張子へ移し、再実行した。旧 `.next` の退避後にも生成コードを lint が走査したため、cache をリポジトリ外の `/workspace/work/church-102-stale-cache` へ移し、ソースを変えず再確認した。
- sandbox の proxy 接続、socket / child process 制約は権限付き実行で解消した。Proxy設定や network policy の変更は行っていない。
- 最初の full E2E は6 pass / 2 fail / 1 interrupted / 43未実行（10.9分）で中断した。失敗は既存 City Hall guided / actions narrow の、レストラン説明文 visible assertion。Production CSS には `.scene-meal .scene-actions-heading small { display: block; }` があり、当時の dev CSS ではその規則が欠けていた。390pxの controlled DOM probe でも production=block / dev=none を確認した。旧 `.next` と失敗 trace / screenshot を work/ に退避し、コードを変えず fresh dev cache で全52件を再実行した。
- Clean dev cache の再実行は43件成功後に管理 session が失われ、完了 summary がなくログ更新も停止した。Log / 成功 attachment を退避し、旧 server を停止して未完9件を同じ config / 1 worker で別途実行した。切り離した runner も環境側で停止したため、管理 session で接続を保持して実行した。ローカルで単一 run の52/52成功とは報告しない。
- 継続9件は9/9成功（9.9分）。既存52件の一覧と最初の43件・継続9件の成功名を照合し、重複0・未確認0を確認した。単一 run の完了と区別し、current-head CI の完走と artifact は独立レビューの gate に残す。

未検証は原作の正式課題評価、数値残量、実 saved-game RESTORE、実 screen reader 音声、新規日本語、C3の6自然経路と負例である。
独立 Chat モード Sol には head/base、実測と回帰、132 samples と guard handoff、current-head CI / artifactの保持期限、behind=0 / mergeability を確認して成功経路を採択するよう依頼する。
実装者の self-check と独立レビューを同一視せず、C2 の開始は成功採択と merge まで待つ。

## 補助レビューと軽微な改善提案

実装者とは別の補助レビュー用 agent が code / fixture を照合し、C1 の blocking findings はなかった。
このレビューでは capture と full suite を再実行しておらず、独立した Chat モード Sol の採択を代替しない。
次の2点は C1 の現行証拠を否定する問題ではないため、改善提案として残す。

- Capture の `canonicalSha256` は固定値であり、将来別の `--base-url` に対して実行する場合の配信 binary checksum を自動照合しない。今回の local artifact は checksum check と既存 unit で検証した。
- Ordinary projection の回帰は leaf text / sourceLines / spacer kind を固定するが、全 non-spacer block の kind は固定していない。新規 heading の意味づけは C2 copy と C3 統合で扱う。


## 最終ローカル検証

| Check | 結果 |
| --- | --- |
| `npm run lint` | 成功。退避 cache を除いた現行ソースを確認。 |
| `npx tsc --noEmit` | 成功。 |
| `npm test` | 最終 production build と40/40 unit tests成功。 |
| `npm run test:e2e -- --config work/playwright.full.config.ts` と未完9件の継続 | 43件成功＋9/9成功。全52名を一覧と照合し、重複・欠落なし。単一ローカル run の52/52完走は未確認。 |
| `sha256sum public/amfv-r79-s851122.z4` | `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` 一致。 |
| `git diff --check` | 成功。 |
| production / historical source / 既存 fixture | 変更なし。 |

一時 Playwright config は既存設定の baseURL / webServer port を3101、testDir / outputDir が既存と同じ repository 内の対象へ解決されるようにしたもので、Chromium・1 worker・全テスト内容・retry=0を維持した。
未完9件は Power Station の Guided / Actions narrow、入口録画・施設内非録画の負例、Restaurant の6経路である。
Current-head CI、artifact の実体と実保持期限、独立採択は提出 PR のレビュー時に確認する。
