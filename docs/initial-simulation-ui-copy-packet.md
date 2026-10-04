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
| 初期 phase の Simulation 利用可能表示 | `Simulation Mode available` | `Simulation Mode が利用できます` | section `aria-label` も同文 | U2 / review 待ち |
| 同上 | `Begin the requested observations` | `依頼された観察を始める` | — | U2 / review 待ち |
| 同上 | `Perelman’s field brief is saved beside the story.` | `ペレルマンの調査要項は物語の横に保存されています。` | — | U2 / review 待ち |
| 同上 CTA | `Enter Simulation Mode` | `Simulation Mode に入る` | `enter simulation mode` | U2 / review 待ち |
| security challenge、Assisted / Action menus のみ | `Security decoder` | `セキュリティ・デコーダー` | section `aria-label="Security code decoder"` → `セキュリティコード・デコーダー` | U2 / review 待ち |
| 同上 | `{COLOR} · {INNER}` | 値は canonical uppercase English / digits のまま | raw English から算出した表示値 | U2 / dynamic |
| 同上 | `Turn the wheel to align the color and inner number, or submit the matching outer number.` | `ホイールを回して色と内側の数字を合わせるか、対応する外側の数字を送信します。` | — | U2 / review 待ち |
| 同上 button | `Submit code {ANSWER}` | `コード {ANSWER} を送信` | command は digits `{ANSWER}` のみ | U2 / review 待ち |
| Simulation quick actions | `Look` / `Record` / `Stop recording` / `Inventory` / `Wait` / `Abort` | `見る` / `録画開始` / `録画停止` / `持ち物` / `待つ` / `中止` | `look` / `record` / `record off` / `inventory` / `wait` / `abort` | U2 / review 待ち |
| 到達済み mode の追加 quick action | `Communications` / `Library` / `Interface` / `Sleep` | `通信` / `ライブラリ` / `インターフェース` / `スリープ` | `enter communications mode` / `enter library mode` / `enter interface mode` / `enter sleep mode` | U2 / review 待ち |
| companion tab、assisted のみ | `Explore` | `探索` | tab の accessible name は visible text | U2 / review 待ち |
| guide、Simulation Mode | `Rockvil` | `ロックヴィル` | — | U2 / review 待ち |
| 同上 | `Walk the city, speak to people, read what they read, and use RECORD when an experience matters.` | `街を歩き、人々と話し、彼らが読むものを読み、重要な体験では RECORD を使います。` | `RECORD` は command 名として英語を維持 | U2 / review 待ち |

実コード上、初期 phase の CTA は `simulationInvitationSeen && mode === "Communications Mode" && phase !== "witness" && phase !== "lockdown"`、Assisted / Action menus、ordinary line input、security/year/yes-no prompt なしで表示される。`simulationEntered` を条件にせず、同じ component は comparative / epilogue phase で別 copy を表示する。今回承認するのは表の初期 phase copy だけで、comparative、epilogue、再入場の copy は English のまま残す。この境界のために production 側の表示条件を変更してはならない。

`{ANSWER}` は assisted control だけが表示・送信する。decoder の実表示条件は Assisted / Action menus、challenge 検出済み、ordinary line input である。この表示中は year selector、launcher、movement compass、CTA が抑制される。Classic、story 本文、raw transcript、課題一覧へ答えを追加しない。色、inner number、answer は challenge ごとの動的値であり、固定例を production copy にしない。

追加 quick action は `knownModes` のうち現在の mode と `Simulation Mode` を除き、同じ command がまだない mode ごとに動的に加わる。初回経路で既知の `Communications` を含め、ボタン表示だけを U2 の対象とする。各 mode の画面全体はこの承認に含めず、unknown / 新規 mode label は English fallback とする。

## U2 — 初期 fieldwork launcher / recording reminder

実コード上、launcher section は security/year selector なし、Assisted / Action menus、ordinary line input、`Simulation Mode`、`simulationEntered`、かつ「移動 option なし、または Action menus で初期 fieldwork の未完了課題地点」のとき表示される。launcher button 自体は移動 option がないときだけ表示され、`initialFieldworkActive` なら `Fieldwork`、そうでなければ後続の `Navigation` branch を使う。reminder だけが Action menus、`initialFieldworkActive`、現在地に未完了課題ありを必須とする。`initialFieldworkActive` は `simulationEntered && !partTwo` であり、初回と再入場を識別する値ではない。

今回承認するのは初期2041年の `Fieldwork` branch と reminder である。後続の `Navigation` / `Rockvil map` branch と再入場は既存 English を維持する。実装で launcher の現在の表示条件を狭めない。recording と進捗は raw English transcript / status から派生する。

| Exact English / dynamic value | Approved Japanese candidate | English command / accessibility |
| --- | --- | --- |
| `Fieldwork` | `現地調査` | launcher の小見出し。`Navigation` は今回 English 維持 |
| `Map & recording brief` | `地図と録画要項` | launcher `aria-label`: `Rockvil map and fieldwork brief` → `ロックヴィル地図と現地調査要項`。後続 `Rockvil map` は今回 English 維持 |
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
| later-map kicker/title | `Rockvil navigation` / `Rockvil map` | English 維持 | 後続年 / Part II / 再入場は今回の承認対象外 |
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

### U3 — movement compass

実表示条件は security/year selector なし、Assisted / Action menus、ordinary line input、`Simulation Mode`、移動 option ありである。yes/no prompt はこの branch 自体の明示的な抑制条件ではない。方位 button は Guided でも draft ではなく `sendCommand(exit.command)` を直ちに実行するため、drawer の `Draft next step` と同じ規則に変更しない。

| Surface | Exact English / dynamic value | Approved Japanese candidate | Command / ownership |
| --- | --- | --- | --- |
| compass landmark | `Available directions` | `移動できる方角` | section `aria-label`; U3 |
| location prefix | `You are at` | `現在地` | U3 |
| missing room | `Current scene` | `現在の場面` | unknown room の fallback; U3 |
| current room / exit target | `{currentRoomName}` / `{exit.target}` | N3 の共有地名 lookup。unknown は English | room identity / year name は N3、表示は U3 |
| route prefix / destination | `Route to` / `{destination.label}` | `目的地への経路` / 承認済み destination label | 固有名 lookup / adapter は N3、表示は U3 |
| remaining | `{steps} step(s) remaining` | `残り{steps}ステップ` | 動的値; U3 |
| route fallback | `Reach a named street to continue` | `名前のある通りへ進むと案内を続けられます` | U3 |
| clear route | visible `×` | visible `×` | `Clear current route` → `現在の経路を解除`; UI state only; U3 |
| map button | `Change route` / `Map & routes` | `経路を変更` / `地図と経路` | drawer を開く。parser command なし; U3 |
| progress | `{count}/9 recorded` | `{count}/9 録画` | 初期 fieldwork のみ; 補助推定値; U3 |
| compass-grid route name | `Route toward {destination}; next {command}` | `{destination}への経路、次は {command}` | dynamic `aria-label`; command は English; U3 |
| compass-grid fallback | `Exits from this location` | `現在地からの出口` | `aria-label`; U3 |
| direction button | `{direction}` / `{exit.target}` | 方位略号は English / 行き先は N3 lookup | Guided / Action menus とも exact `exit.command` を即時送信 |
| next marker | `Next` | `次` | route の次の出口だけ; U3 |

`PackageOverlay` には `interactiveMap` branch が存在するが、現行の唯一の呼び出しは prop を渡さず既定値 `false` であり、この branch は production UI に未接続である。以下は将来接続する場合の監査記録であって、Issue #67 の必須統合範囲や現行 drawer 地図の表示 copy ではない。

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

同じ target ID でも UI identity は置換しない。room name と、room name とは異なる地図固有名の訳語・共有 lookup / adapter は N3 が一元管理する。U3 はそれを再利用し、別の地名辞書を作らない。`Newspaper` のような課題 label、地図の共通 UI 文言、対象物と動詞は U1 の正本を U3 が実装する。

| Role | Exact English | Japanese | Identity / command |
| --- | --- | --- | --- |
| room | `Kennedy Park` | `ケネディ公園` | `KENNEDY-PARK`; N3 lookup、U3 reuse |
| room | `Elm & Park` | `エルム通りとパーク通り` | `ELM-AND-PARK`; N3 lookup、U3 reuse |
| destination + room | `Courthouse` | `裁判所` | `COURTHOUSE`; N3 lookup、U3 reuse; assignment 6番 |
| room | `Main & Kennedy` | `メイン通りとケネディ通り` | `MAIN-AND-KENNEDY`; N3 lookup、U3 reuse |
| landmark proper name | `InfoTech Building` | `インフォテック・ビル` | N3 adapter、U3 reuse。同じ target でも `Main & Kennedy` ではない |
| room | `Centre & Kennedy` | `センター通りとケネディ通り` | `CENTRE-AND-KENNEDY`; N3 lookup、U3 reuse |
| room | `Bodanski Square` | `ボダンスキー広場` | `BODANSKI-SQUARE`; N3 lookup、U3 reuse |
| landmark proper name | `North Central Station` | `ノース・セントラル駅` | N3 adapter、U3 reuse。同じ target でも広場名ではない |
| assignment destination | `Newspaper` | `新聞` | U1 / U3。同じ target でも駅名・広場名ではない |
| scene object | `newspaper dispenser` | `新聞販売機` | 選択肢が出る場合の object label |
| scene object | `newspaper` | `新聞` | acquired object |
| action | `Buy` | `買う` | `buy newspaper`（noun/verb は English） |
| action | `Read` | `読む` | `read newspaper`（noun/verb は English） |

汎用 `SceneActions` は world data から対象物と action を動的に生成する。U3 は採用経路で実際に必要な上記 object/action と、既存 catalog の共通 shell（`Words mentioned here` → `この場面で言及された語`、`Worth trying` → `試してみる`、`Actions for things mentioned here` → `この場面で言及された対象へのアクション`、`In this scene` → `この場面で`）だけを再利用し、全 object、全 verb、全地図 landmark の翻訳へ広げない。

## 表示条件と非対象

- `initialFieldworkActive` の実装値は `simulationEntered && !partTwo` であり、初回と再入場を区別しない。今回の翻訳承認範囲は採用済みの初回2041年経路に限定し、後続年、Part II、再入場の copy は English のままにする。既存の表示条件を翻訳範囲に合わせて狭めない。
- Classic は parser input と canonical story を中心に保ち、computed security answer、map/action/checklist の assisted control を本文へ移植しない。
- Guided / Action menus の label を日本語化しても、draft / send する command は英語のままにする。
- `{count}`、recording、current assignment、current room、year、steps、next command/place、current/selected/arrived は動的値。unknown place/action は original English に安全に fallback する。
- checklist の check は recorded raw transcript に対する wrapper の補助推定であり、九課題の正式な達成、提出、帰還、評価を保証しない。
- Notes、比較画面、Library / Interface、QA/debug、後続年、全地図、地図画像内文字、全 SceneActions、新行動、新聞以外の未観測本文は対象外。

## 担当、handoff、検証

- **packet 作成:** ChatGPT。実コードの表示枝、N1 runtime evidence、Issue #49 と N2 の既承認用語を照合した。
- **copy review / approval owner:** 5gmt。[Issue #63](https://github.com/5gmt/mind-forever-voyaging/issues/63) と本 packet を含む PR の review を承認記録とする。U2 は新聞固有 copy と独立して review できる。
- **U2 handoff:** [Issue #65](https://github.com/5gmt/mind-forever-voyaging/issues/65) は U2 表だけを production catalog と対象 E2E へ統合する。
- **N2 / N3 handoff:** 地名 surface audit は [N2 packet](newspaper-copy-packet.md) の role table と一致する。room name と地図固有名に必要な共有 lookup / adapter の追加は、どちらも [Issue #66](https://github.com/5gmt/mind-forever-voyaging/issues/66) が一元的に所有する。
- **U3 handoff:** [Issue #67](https://github.com/5gmt/mind-forever-voyaging/issues/67) は U3 表を N3 / U2 の後に統合し、同一 fresh session の Courthouse → Newspaper を browser acceptance 単位にする。
- **この change の検証:** source surface と表を項目ごとに静的照合する。copy-only のため未実施の runtime / browser test を実施済みとは記録しない。
