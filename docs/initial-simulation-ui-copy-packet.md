# Issue #63 — 初期 Simulation fieldwork UI copy packet

## 根拠、承認単位、境界

この packet は `app/PrismEdition.tsx` と `app/StoryTools.tsx` の 2026-10-04 時点の実コードを、初回2041年の表示条件ごとに監査した copy-only 成果物である。production code、runtime fixture、canonical artifact は変更しない。英語欄は UI の exact source copy、command 欄は Release 79 へ送る exact English を表す。日本語は表示だけに使い、state detection と parser command には使わない。

承認を二つに分ける。

- **U2 packet（独立承認可能）:** 入場 CTA、assisted decoder、基本操作、初期案内、九課題、drawer の共通 header / tabs / 課題行。新聞固有の地図 copy を含まず、[Issue #63 の review](https://github.com/5gmt/mind-forever-voyaging/issues/63) と本 packet を含む PR の 5gmt review を承認記録とする。review 完了前は「承認候補」であり production-ready とは扱わない。
- **U3 packet:** 地図の共通操作、採用経路の identity、対象物と action。本 packet は N1 の採用案 A と、review 済みの [N2 copy packet](newspaper-copy-packet.md) に照合済みであり、同じ PR review を最終 copy gate とする。

既承認の九課題訳は [Issue #49 packet](issue-49-first-simulation-copy-packet.md)、新聞本文・共有地名は [N2 packet](newspaper-copy-packet.md)、採用経路は [runtime evidence](newspaper-runtime-evidence.md) を根拠に再利用する。checklist は raw transcript の観測から wrapper が推定する補助表示であり、Release 79 の正式な課題評価そのものとは表現しない。

## U2 — 入場、decoder、基本操作

| Surface / 表示条件 | Exact English / dynamic value | Approved Japanese candidate | English command / accessibility | Owner / status |
| --- | --- | --- | --- | --- |
| Simulation 利用可能、未入場、assisted | `Simulation Mode available` | `Simulation Mode が利用できます` | section `aria-label` も同文 | U2 / review 待ち |
| 同上 | `Begin the requested observations` | `依頼された観察を始める` | — | U2 / review 待ち |
| 同上 | `Perelman’s field brief is saved beside the story.` | `ペレルマンの調査要項は物語の横に保存されています。` | — | U2 / review 待ち |
| 同上 CTA | `Enter Simulation Mode` | `Simulation Mode に入る` | `enter simulation mode` | U2 / review 待ち |
| security challenge、Assisted / Action menus のみ | `Security decoder` | `セキュリティ・デコーダー` | section `aria-label="Security code decoder"` → `セキュリティコード・デコーダー` | U2 / review 待ち |
| 同上 | `{COLOR} · {INNER}` | 値は canonical uppercase English / digits のまま | raw English から算出した表示値 | U2 / dynamic |
| 同上 | `Turn the wheel to align the color and inner number, or submit the matching outer number.` | `ホイールを回して色と内側の数字を合わせるか、対応する外側の数字を送信します。` | — | U2 / review 待ち |
| 同上 button | `Submit code {ANSWER}` | `コード {ANSWER} を送信` | command は digits `{ANSWER}` のみ | U2 / review 待ち |
| Simulation quick actions | `Look` / `Record` / `Stop recording` / `Inventory` / `Wait` / `Abort` | `見る` / `録画開始` / `録画停止` / `持ち物` / `待つ` / `中止` | `look` / `record` / `record off` / `inventory` / `wait` / `abort` | U2 / review 待ち |
| companion tab、assisted のみ | `Explore` | `探索` | tab の accessible name は visible text | U2 / review 待ち |
| guide、Simulation Mode | `Rockvil` | `ロックヴィル` | — | U2 / review 待ち |
| 同上 | `Walk the city, speak to people, read what they read, and use RECORD when an experience matters.` | `街を歩き、人々と話し、彼らが読むものを読み、重要な体験では RECORD を使います。` | `RECORD` は command 名として英語を維持 | U2 / review 待ち |

`{ANSWER}` は assisted control だけが表示・送信する。Classic、story 本文、raw transcript、課題一覧へ答えを追加しない。色、inner number、answer は challenge ごとの動的値であり、固定例を production copy にしない。

## U2 — 初期 fieldwork launcher / recording reminder

表示条件は `Simulation Mode`、初回入場済み、Part II 前、assisted、ordinary line input である。移動 option がない場合は launcher、action menus で未完了課題の地点にいる場合は reminder が出る。recording と進捗は raw English transcript / status から派生する。

| Exact English / dynamic value | Approved Japanese candidate | English command / accessibility |
| --- | --- | --- |
| `Fieldwork` / `Navigation` | `現地調査` / `ナビゲーション` | launcher の小見出し |
| `Map & recording brief` / `Rockvil map` | `地図と録画要項` / `ロックヴィル地図` | launcher `aria-label`: `ロックヴィル地図と現地調査要項` / `ロックヴィル地図` |
| `{count} of 9 recorded` | `9件中{count}件を録画` | `count` は 0–9 の動的推定値 |
| `Choose a destination` | `目的地を選ぶ` | — |
| `Open` | `開く` | drawer を開くだけで parser command は送らない |
| `Recording now` / `Recording is off` | `録画中` / `録画は停止中` | status 由来 |
| `{assignment}` | 下記九課題訳 | 現在地に対応する動的課題 |
| `Complete the experience; the brief will check itself.` | `体験を完了すると、要項のチェックが自動で更新されます。` | wrapper の補助推定であり正式評価とは呼ばない |
| `Start RECORD before you complete this experience.` | `体験を完了する前に RECORD を開始してください。` | — |
| `● RECORDING` | `● RECORDING` | canonical operation indicator を維持 |
| `Start recording` | `録画を開始` | `record` |

## U2 — drawer 共通 header / tabs / checklist

| Surface | Exact English / dynamic value | Approved Japanese candidate | English command / accessible name |
| --- | --- | --- | --- |
| initial header kicker | `Perelman’s fieldwork console` | `ペレルマンの現地調査コンソール` | — |
| initial title | `Map & recording brief` | `地図と録画要項` | dialog はこの title を `aria-labelledby` で参照 |
| later-map kicker/title | `Rockvil navigation` / `Rockvil map` | `ロックヴィル・ナビゲーション` / `ロックヴィル地図` | 初期2041年外でも共通 UI として使用可 |
| header location | `{currentRoomName} · {year}` | `{現在地} · {年}` | current room lookup。unknown は English fallback |
| no room | `Choose a destination on the original map.` | `オリジナル地図で目的地を選んでください。` | — |
| status | `{count} / 9 recorded` | `9件中{count}件を録画` | 動的推定値 |
| status button | `Start RECORD` | `RECORD を開始` | `record` |
| close | visible `×` | visible `×` | `Close map and fieldwork brief` → `地図と現地調査要項を閉じる` |
| tabs landmark | `Fieldwork views` | `現地調査の表示` | `role=tablist` |
| map tab | `Map & route` | `地図と経路` | selected state は `aria-selected` |
| brief tab | `Brief {count}/9` | `要項 {count}/9` | 同上 |
| checklist landmark | `Fieldwork checklist` | `現地調査チェックリスト` | section `aria-label` |
| checklist heading | `Perelman’s brief` | `ペレルマンの調査要項` | — |
| checklist progress | `{count} of 9 recorded` | `9件中{count}件を録画` | 動的推定値 |
| checklist note | `RECORD must be active during the experience. Checks follow the same Release 79 triggers as the game.` | `体験中は RECORD を有効にしてください。チェックは Release 79 と同じ反応を手がかりにする補助的な推定です。` | wrapper の表示と原作の正式評価を区別する |
| current destination suffix | ` · you are here` | ` · 現在地` | 課題 destination label に付加 |
| row action | `Show on map` / `Route plotted` | `地図で表示` / `経路を表示中` | `Plot route for {assignment}` → `{assignment}への経路を表示` |

九課題は canonical order を変えず、Issue #49 の承認済み本文用語を UI の命令形へ変えず再利用する。

1. `Eat a meal in a restaurant` → `レストランで食事をすること`
2. `Talk to a government official` → `政府職員と話すこと`
3. `Visit a power-generating facility` → `発電施設を訪れること`
4. `Read a newspaper` → `新聞を読むこと`
5. `Ride public transportation` → `何らかの公共交通機関に乗ること`
6. `Attend a court in session` → `開廷中の裁判を傍聴すること`
7. `Talk to a church official` → `教会関係者と話すこと`
8. `Go to a movie` → `映画を見に行くこと`
9. `Visit your home or living quarters` → `自分の家、または居住区を訪れること`

## U3 — 共通 map / route copy

U3 は初回2041年の採用経路に限定する。地図画像そのものの文字は翻訳せず、hotspot、navigator、route card、context exit を presentation layer で日本語化する。

| Surface / condition | Exact English | Approved Japanese candidate | Command / dynamic rule |
| --- | --- | --- | --- |
| navigator landmark | `Navigate Rockvil using the original map` | `オリジナル地図でロックヴィルを移動` | `aria-label` |
| heading | `Rockvil street map` / `Choose a destination` | `ロックヴィル街路地図` / `目的地を選ぶ` | — |
| heading note | `The marked fieldwork stops come from Perelman’s brief.` | `印の付いた調査地点はペレルマンの要項に基づきます。` | — |
| image alt | `Original 1985 street map of downtown Rockvil` | `1985年版オリジナルのロックヴィル中心街地図` | archival image identity を維持 |
| hotspot landmark | `Map destinations` | `地図の目的地` | group `aria-label` |
| hotspot suffixes | `, fieldwork destination` / `, current location` | `、調査目的地` / `、現在地` | visible label には付加しない |
| route | `Route to` | `目的地への経路` | destination label は動的 |
| arrived | `You have arrived.` | `目的地に到着しました。` | — |
| route steps | `{steps} step(s) · next {COMMAND} toward {nextPlace}` | `あと{steps}ステップ · 次は {COMMAND}（{nextPlace}方面）` | command は uppercase English、place は shared lookup |
| no start | `Move to a named street to begin this route.` | `名前のある通りへ移動すると経路案内を開始できます。` | — |
| step button | `Draft next step` / `Take next step` | `次の移動を入力欄へ` / `次の移動を実行` | Guided は draft、Action menus は exact English direction command を送信 |
| clear | `Clear` | `解除` | route state のみ変更 |
| empty | `Select any dot on the map. Fieldwork destinations use the square markers.` | `地図上の点を選んでください。調査目的地は四角い印です。` | — |
| compact button | `Map & routes` / `Change route` | `地図と経路` / `経路を変更` | progress `{count}/9 recorded` → `{count}/9 録画` |
| context help | `Choose an exit, or use the map for street names and landmarks.` | `出口を選ぶか、地図で通り名とランドマークを確認します。` | exit button sends its English command |
| context fallback | `The current description names these directions.` | `現在の描写に次の方角があります。` | parsed English directions |
| context empty | `Look again for exits, doors, vehicles, and paths.` | `もう一度見て、出口、扉、乗り物、道を探してください。` | — |
| context CTA | `Open map & route planner` | `地図と経路案内を開く` | UI only |
| described exit | `Go {direction}` | `{direction}へ進む` | exact English direction command |
| empty exits | `No compass exit is named in this passage.` | `この文章には方角で示された出口がありません。` | — |

Simulation 中に package overlay の interactive map を開いた場合は同じ landmark identity と route state を使うが、別の表示枝を持つため次も U3 が統合する。

| Package-map surface | Exact English | Approved Japanese candidate | Dynamic rule |
| --- | --- | --- | --- |
| instruction | `Choose a destination on the original map to plot a walking route. Square markers correspond to Perelman’s field brief.` | `オリジナル地図で目的地を選ぶと徒歩経路を表示します。四角い印はペレルマンの調査要項に対応します。` | — |
| hotspot landmark | `Rockvil landmarks` | `ロックヴィルのランドマーク` | `aria-label` |
| route heading | `Route` | `経路` | destination label は動的 |
| arrived | `You have reached the destination.` | `目的地に到着しました。` | — |
| route steps | `{steps} step(s) away. Next: {COMMAND} toward {nextPlace}.` | `あと{steps}ステップです。次は {COMMAND}（{nextPlace}方面）。` | command は uppercase English |
| route button | `Use next step` | `次の移動を実行` | exact English direction command を送信 |
| no route | `No reliable walking route starts from the current location. Move to a named street and try again.` | `現在地から始まる確実な徒歩経路がありません。名前のある通りへ移動して、もう一度試してください。` | — |

## U3 — 採用経路の identity、対象物、action

同じ target ID でも UI identity は置換しない。N3 が所有する room lookup と、U3 が所有する landmark / assignment label は別 catalog とする。

| Role | Exact English | Japanese | Identity / command |
| --- | --- | --- | --- |
| room | `Kennedy Park` | `ケネディ公園` | `KENNEDY-PARK` |
| room | `Elm & Park` | `エルム通りとパーク通り` | `ELM-AND-PARK` |
| destination + room | `Courthouse` | `裁判所` | `COURTHOUSE`; assignment 6番 |
| room | `Main & Kennedy` | `メイン通りとケネディ通り` | `MAIN-AND-KENNEDY` |
| landmark | `InfoTech Building` | `インフォテック・ビル` | 同じ target でも `Main & Kennedy` ではない |
| room | `Centre & Kennedy` | `センター通りとケネディ通り` | `CENTRE-AND-KENNEDY` |
| room | `Bodanski Square` | `ボダンスキー広場` | `BODANSKI-SQUARE` |
| landmark | `North Central Station` | `ノース・セントラル駅` | 同じ target でも広場名ではない |
| assignment destination | `Newspaper` | `新聞` | 同じ target でも駅名・広場名ではない |
| scene object | `newspaper dispenser` | `新聞販売機` | 選択肢が出る場合の object label |
| scene object | `newspaper` | `新聞` | acquired object |
| action | `Buy` | `買う` | `buy newspaper`（noun/verb は English） |
| action | `Read` | `読む` | `read newspaper`（noun/verb は English） |

汎用 `SceneActions` は world data から対象物と action を動的に生成する。U3 は採用経路で実際に必要な上記 object/action と、既存 catalog の共通 shell（`Words mentioned here` → `この場面で言及された語`、`Worth trying` → `試してみる`、`Actions for things mentioned here` → `この場面で言及された対象へのアクション`、`In this scene` → `この場面で`）だけを再利用し、全 object、全 verb、全地図 landmark の翻訳へ広げない。

## 表示条件と非対象

- 初回 fieldwork は `simulationEntered && !partTwo` の間だけ。後続年、Part II、再入場の copy は承認しない。
- Classic は parser input と canonical story を中心に保ち、computed security answer、map/action/checklist の assisted control を本文へ移植しない。
- Guided / Action menus の label を日本語化しても、draft / send する command は英語のままにする。
- `{count}`、recording、current assignment、current room、year、steps、next command/place、current/selected/arrived は動的値。unknown place/action は original English に安全に fallback する。
- checklist の check は recorded raw transcript に対する wrapper の補助推定であり、九課題の正式な達成、提出、帰還、評価を保証しない。
- Notes、比較画面、Library / Interface、QA/debug、後続年、全地図、地図画像内文字、全 SceneActions、新行動、新聞以外の未観測本文は対象外。

## 担当、handoff、検証

- **packet 作成:** ChatGPT。実コードの表示枝、N1 runtime evidence、Issue #49 と N2 の既承認用語を照合した。
- **copy review / approval owner:** 5gmt。[Issue #63](https://github.com/5gmt/mind-forever-voyaging/issues/63) と本 packet を含む PR の review を承認記録とする。U2 は新聞固有 copy と独立して review できる。
- **U2 handoff:** [Issue #65](https://github.com/5gmt/mind-forever-voyaging/issues/65) は U2 表だけを production catalog と対象 E2E へ統合する。
- **N2 / N3 handoff:** 地名 surface audit は [N2 packet](newspaper-copy-packet.md) の role table と一致する。room lookup の追加は [Issue #66](https://github.com/5gmt/mind-forever-voyaging/issues/66) が所有する。
- **U3 handoff:** [Issue #67](https://github.com/5gmt/mind-forever-voyaging/issues/67) は U3 表を N3 / U2 の後に統合し、同一 fresh session の Courthouse → Newspaper を browser acceptance 単位にする。
- **この change の検証:** source surface と表を項目ごとに静的照合する。copy-only のため未実施の runtime / browser test を実施済みとは記録しない。
