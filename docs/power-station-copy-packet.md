# 2041年 Power Station の本文と経路の copy packet

## 承認対象と開始根拠

本書は P2 / [#95](https://github.com/5gmt/mind-forever-voyaging/issues/95) の copy 承認候補である。
P1 / #94 は [PR #98 の独立採択レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/98#pullrequestreview-5677684770)と merge `df1b5c5295f67cae556d1ffd85b589b917a4f657` で完了し、[P2 開始 gate](https://github.com/5gmt/mind-forever-voyaging/issues/95#issuecomment-6460562489)が解除された。
本文と UI の日本語は提出だけでは承認済みとせず、独立した Chat モード Sol の copy approval と merge を待つ。
P3 / #96 はその両方が完了するまで blocked とする。

本文の正本は [P1 fixture](../tests/fixtures/parchment-power-station-runtime-observed.json)（blob `c0566b0f74f8864eefa3ec62ecb3cdcfc061b07e`）である。
2 fresh canonical sessions、各67 line submissions、144 UI samples を採択済みの範囲として使う。
[P1 evidence](power-station-runtime-evidence.md)の「提出判断」は提出時点の記録であり、採択の正本は上記レビューと開始通知である。
本文と現行 UI の照合基準は最新 base `df1b5c5295f67cae556d1ffd85b589b917a4f657` とする。

承認単位は、新規本文14 leaf（7地点の見出しと説明）、既承認本文3 leaf の再利用、7つの room、map `power`、既承認 assignment index 2、共通操作と visible / accessible copy、およびそれらの表示条件である。
本 P2 は copy packet と plan / status の文書3ファイルだけを変更する。
production catalog、components、runtime fixture、tests、canonical binary、historical source は変更しない。
新しい SceneActions、object verbs、操作説明の創作も含めない。

## 採択経路と観測位置

`S1/S2:i:l` は両 session の `observations[i].presentation.lines[l]` を指し、index と line は0始まりである。
同じ cell の後続の `i:l` にも S1/S2 が掛かる。
`A{n}` は同 session の `surfaceAudit[n]`、sample は `locale` と `mode` で特定する。
H / D / R / O は本書内の照合用 ID で、production の新しい identity engine を定義するものではない。

先行四課題の50送信と録画区間を変えず、公園から次の17送信を追加した経路を対象とする。

```text
SE → E → S → S → SE → SE → S
→ RECORD → LOOK → RECORD OFF
→ N → NW → NW → N → N → W → NW
```

S1 は大文字の短縮 command を command form から送信した。
S2 の往路は Guided map の draft と明示 Send、施設内の3操作は Guided quick actions、復路は日本語 Actions compass の明示1押下である。
大文字小文字だけでなく、下表にある full direction alias も actual command として観測している。

| ID | 観測時 room / 原文の現在地 | 見出しの actual command（S1 / S2） | 説明の actual command（S1 / S2） |
| --- | --- | --- | --- |
| H1 / D1 | `ELM-AND-KENNEDY` / `Elm & Kennedy` | 49: `SE` / `se`; 64: `W` / `west` | 49: `SE` / `se` |
| H2 / D2 | `ELM-AND-RIVER` / `Elm & River` | 50: `E` / `east`; 63: `N` / `north` | 50: `E` / `east` |
| H3 / D3 | `SOUTHWAY-AND-RIVER` / `Southway & River` | 51: `S` / `south`; 62: `N` / `north` | 51: `S` / `south` |
| H4 / D4 | `BEND` / `Bend` | 52: `S` / `south`; 61: `NW` / `nw` | 52: `S` / `south` |
| H5 / D5 | `WICKER-AND-RIVER` / `Wicker & River` | 53: `SE` / `se`; 60: `NW` / `nw` | 53: `SE` / `se` |
| H6 / D6 | `POWER-STATION-ENTRANCE` / `Power Station Entrance` | 54: `SE` / `se`; 59: `N` / `north` | 54: `SE` / `se` |
| H7 / D7 | `POWER-STATION` / `Power Station` | 55: `S` / `south`; 57: `LOOK` / `look` | 55: `S` / `south`; 57: `LOOK` / `look` |

R1 は S1/S2:65:1、公園への `NW` / `nw` 帰着である。
R2 は S1/S2:56:1 の `RECORD` / `record`、R3 は S1/S2:58:1 の `RECORD OFF` / `record off` である。
施設内の到着55は非録画、56と57は録画中、58から公園帰着65までは非録画である。
heading や本文の翻訳条件を録画中だけにせず、補助課題の推定条件と分離する。

## 新規本文14 leaf

H1–H7 はすべて `kind: title`、D1–D7 は `kind: prose` の候補とする。
raw 地名行は `Style_normal` であり、見た目の bold や行頭の文字列だけから heading と推測しない。
採択済み exact leaf の role として title を指定し、source line、順番、段落、空行を保持する。

| ID / kind / 観測位置 | Exact canonical English leaf | Japanese candidate |
| --- | --- | --- |
| H1; `kind: title`; S1/S2:49:1,64:1 | `Elm & Kennedy` | `エルム通りとケネディ通り` |
| D1; `kind: prose`; S1/S2:49:2 | `This is an intersection with streets heading in the four cardinal directions. There is a park entrance on the northwest corner and a hospital on the southwest corner. To the southeast lies a shopping mall, and a large, old building with an impressive facade can be entered to the northeast.` | `ここは、東西南北の四方向に通りが延びる交差点だ。北西の角には公園の入口、南西の角には病院がある。南東にはショッピングモールがあり、北東には見事な正面構えの大きな古い建物があって、中へ入れる。` |
| H2; `kind: title`; S1/S2:50:1,63:1 | `Elm & River` | `エルム通りとリバー通り` |
| D2; `kind: prose`; S1/S2:50:2 | `Elm Street begins here and crosses the downtown area to the west. Along the eastern side of River Street stands the vast Heiman Village building. You can enter Rockvil Mall to the southwest, or the old Stock Exchange building to the northwest. An entrance to a Tube station graces one corner of the intersection.` | `エルム通りはここを起点に、西へ延びて中心街を横切っている。リバー通りの東側には、巨大なハイマン・ヴィレッジの建物が建っている。南西にはロックヴィルモール、北西には古い証券取引所の建物があり、どちらにも入れる。交差点の一角には、地下交通網チューブの駅への入口がある。` |
| H3; `kind: title`; S1/S2:51:1,62:1 | `Southway & River` | `サウスウェイ通りとリバー通り` |
| D3; `kind: prose`; S1/S2:51:2 | `Here at River Street, Southway ends its long trip from the western suburbs. South of here, the street bends toward the river. To the southwest are some brick houses, and a car lot occupies the northwest corner. All along the east side of the street is a huge construction site.` | `西の郊外から長く延びてきたサウスウェイ通りは、ここリバー通りで終わっている。ここから南では、リバー通りが川のほうへ曲がっている。南西にはれんが造りの住宅が何軒かあり、北西の角には駐車場がある。通りの東側一帯は、広大な建設現場になっている。` |
| H4; `kind: title`; S1/S2:52:1,61:1 | `Bend` | `曲がり角` |
| D4; `kind: prose`; S1/S2:52:2 | `River Street curves here, heading downtown to the north and under an old railroad bridge to the southeast. To the northeast is an opening in a tall fence. A row of stores round the curve on the other side of the street: a laundromat to the west, a pharmacy to the southwest, and a hardware store to the south.` | `ここでリバー通りは曲がり、北へ行けば中心街へ、南東へ行けば古い鉄道橋の下へ通じている。北東には、高いフェンスの切れ目がある。通りの反対側では、曲がり角に沿って店が並んでいる。西にはコインランドリー、南西には薬局、南には金物店がある。` |
| H5; `kind: title`; S1/S2:53:1,60:1 | `Wicker & River` | `ウィッカー通りとリバー通り` |
| D5; `kind: prose`; S1/S2:53:2 | `You have crossed the proverbial railroad tracks. The optimism and economic recovery don't seem to have spilled over into this run-down section of Rockvil, near the river. Wicker Drive, which runs northeast to southwest, cuts perpendicularly across River Street here. To the northwest, River dips under an unused rail bridge. There are factories on the northern and eastern corners. To the west is a dingy warehouse, and south of here are some dilapidated apartments. The smell of stale urine wafts from a stairway leading down to a gloomy Tube station.` | `いわゆる「線路の向こう側」にやって来た。楽観的な空気や景気回復の恩恵は、川に近いロックヴィルのこの荒れた一角までは及んでいないようだ。北東から南西へ延びるウィッカー通りが、ここでリバー通りと直角に交わっている。北西では、リバー通りが使われていない鉄道橋の下へ潜っている。北と東の角には工場がある。西には薄汚れた倉庫があり、南には老朽化したアパートがある。薄暗い地下交通網チューブの駅へ下る階段から、すえた尿の臭いが漂ってくる。` |
| H6; `kind: title`; S1/S2:54:1,59:1 | `Power Station Entrance` | `発電所入口` |
| D6; `kind: prose`; S1/S2:54:2 | `You are on River Street at the entrance of a utility station which lies to the south. The street continues southeast towards the River Street Bridge. Northeast of here is the entrance to a huge factory complex, and tenements line the street to the west and southwest.` | `ここはリバー通りにある発電所の入口で、施設は南にある。通りは南東のリバー通り橋へ向かって延びている。北東には巨大な工場群への入口があり、通りの西と南西には集合住宅が並んでいる。` |
| H7; `kind: title`; S1/S2:55:1,57:1 | `Power Station` | `発電所` |
| D7; `kind: prose`; S1/S2:55:2,57:2 | `This is the central power station for all of Rockvil. Power is generated here by fusion reactors, and is received here from distant generators via a huge array of microwave receivers. The main entrance is on the north side of the plant.` | `ここはロックヴィル全域に電力を供給する中央発電所だ。ここでは核融合炉で発電し、遠方の発電機からも、巨大なマイクロ波受信装置群を通じて電力を受けている。施設の正面入口は北側にある。` |

### 意味と地理関係

D1 は東西南北へ延びる通り、公園の入口が北西、病院が南西、モールが南東、入れる古い建物が北東という関係を保つ。
D2 はエルム通りの起点と西向き、リバー通りの東側の大きな建物、南西のモール、北西の旧証券取引所、角の Tube 駅入口を保つ。
本文中の Heiman Village / Rockvil Mall / Stock Exchange の表記を、別の room / map identity の翻訳承認へ広げない。

D3 では西の郊外から来た Southway が River Street で終わり、南で川へ曲がる通りをリバー通りとして訳す。
南西のれんが住宅、北西の car lot、東側一帯の建設現場を入れ替えない。
`car lot` は既承認の[新聞 packet](newspaper-copy-packet.md)と同じ「駐車場」を使い、`Street` は「通り」、`Drive` も今回の本文では「通り」とする。
H4 の「曲がり角」は exact room `BEND` に限り、一般名詞 Bend の一括翻訳や別地点への適用には使わない。

D4 は北が中心街、南東が古い鉄道橋の下、北東がフェンスの開口部、西がコインランドリー、南西が薬局、南が金物店という関係を保つ。
D5 の `railroad tracks` の表現と景気回復が及ばない様子を残し、`don't seem` の不確実性を断定へ変えない。
北東から南西へ延びる Wicker Drive と River Street の直交、北西の使われていない鉄道橋、北と東の工場、西の倉庫、南のアパート、下り階段と尿の臭いを残す。
`River dips` は川そのものの流路ではなくリバー通りの描写として訳す。
`Tube(s)` は[restaurant packet](restaurant-copy-packet.md)などと同じ「地下交通網チューブ」を再利用する。

D6 は現在地が River Street 上の入口、施設が南、橋へ続く通りが南東、工場群の入口が北東、集合住宅が西と南西という関係である。
H6 / D6 を施設内の H7 / D7 へ統合しない。
D7 は核融合炉による現地発電と、遠方の発電機からマイクロ波受信装置群を介する受電を両方残す。
核分裂、石炭、発電容量、後続年の設備、原作の課題達成や録画 flag を追加しない。
正面入口は北側で、復路の `N` / `north` は入口 room へ戻る操作である。

### 行構造と再利用

通常の初回到着49–55と LOOK 57は echo → H → D → blank → input の順である。
復路59–64と公園65は基本的に echo → heading → blank → input となる。
optional O1 / O2 / O3 のある turn は後述の追加行を残す。
初回描写を復路の heading-only turn に補ったり、LOOK の説明を短縮したりしない。
日本語の文数が変わっても、一つの prose leaf を別の leaf や追加の空行へ分割しない。

| ID / kind / 観測位置 / actual command | Exact canonical English leaf | 既承認 Japanese |
| --- | --- | --- |
| R1; title; S1/S2:65:1; `NW` / `nw` | `Kennedy Park` | `ケネディ公園` |
| R2; prose; S1/S2:56:1; `RECORD` / `record` | `Record feature activated.` | `記録機能を起動しました。` |
| R3; prose; S1/S2:58:1; `RECORD OFF` / `record off` | `Record feature deactivated.` | `記録機能を停止しました。` |

これらは既存 catalog と[初期 Simulation UI packet](initial-simulation-ui-copy-packet.md)の copy をそのまま再利用する。
本文の「記録機能」と UI の「録画開始 / 録画停止」を本 P2 で統一し直さない。
先行50送信の本文、四課題の copy、録画窓を再承認したり変更したりする作業ではない。

## Room、map、assignment、object の identity

同じ日本語になる行も別の identity のまま扱う。
room は既存 `localizeSimulationPlace`、map / route destination は `localizeSimulationMapLabel` に P3 が接続する。
raw `Location:`、`WORLD_ROOMS` の English name、command noun を rename しない。

| Role / identity | Exact English | Japanese candidate / reuse | 表示先と条件 |
| --- | --- | --- | --- |
| Room `ELM-AND-KENNEDY` | `Elm & Kennedy` | `エルム通りとケネディ通り`（H1） | current place、heading、drawer header、compass / context の行き先、route nextPlace。 |
| Room `ELM-AND-RIVER` | `Elm & River` | `エルム通りとリバー通り`（H2） | 同じ place lookup を共有。 |
| Room `SOUTHWAY-AND-RIVER` | `Southway & River` | `サウスウェイ通りとリバー通り`（H3） | 同じ place lookup を共有。 |
| Room `BEND` | `Bend` | `曲がり角`（H4） | exact room としてのみ扱う。 |
| Room `WICKER-AND-RIVER` | `Wicker & River` | `ウィッカー通りとリバー通り`（H5） | 同じ place lookup を共有。 |
| Room `POWER-STATION-ENTRANCE` | `Power Station Entrance` | `発電所入口`（H6） | 施設への接近地点。施設内 current location に読み替えない。 |
| Room `POWER-STATION` | `Power Station` | `発電所`（H7） | 施設内の地点。入口の partial string match で解決しない。 |
| Map `power`; target `POWER-STATION` | `Power Station` | `発電所` | hotspot、route destination、checklist の目的地小見出し。visible English が `POWER STATION` になる CSS と copy identity は区別する。 |
| Map accessible name（目的地） | `Power Station, fieldwork destination` | `発電所、調査目的地` | `fieldworkSuffix` を再利用。選択だけでは送信しない。 |
| Map accessible name（現地） | `Power Station, fieldwork destination, current location` | `発電所、調査目的地、現在地` | 施設内だけ `currentSuffix` を追加。入口、route の選択状態、録画中というだけでは付けない。 |
| Assignment index 2（九課題の3番目） | `Visit a power-generating facility` | `発電施設を訪れること`（既承認） | checklist と current task。room / map label と同じ identity にしない。 |
| 原作 assignment brief の項目（S1/S2:4:8） | `   Visiting a power-generating facility` | `発電施設を訪れること`（既承認） | leading spaces を持つ原作 list item。UI の命令形とは別の raw leaf。 |
| Object `POWER-STATION-OBJECT` | `power station` | 新規承認しない | room / map の「発電所」を SceneActions の対象名や parser noun に流用しない。 |
| 帰着の Room `KENNEDY-PARK` | `Kennedy Park` | `ケネディ公園`（既承認 R1） | 既存 lookup と履歴を保持。 |

P1 の A0 は公園、A1–A5 は往路の新規5地点、A6 は入口、A7 は施設内非録画、A8 は RECORD 後、A9 は LOOK 後、A10 は OFF 後、A11 は公園帰着である。
各 session に EN / JA と3 modes の sample がある。
地名と map `power` は JA sample でも英語で `lang=en` だった。
上表の新しい日本語は候補であり、P1 ですでに表示できたという主張ではない。
課題 index 2、共通操作、既承認地名の日本語は P1 でも表示されている。

## 共通 UI copy の再利用と入力契約

以下は[初期 Simulation UI packet](initial-simulation-ui-copy-packet.md)、[新聞 packet](newspaper-copy-packet.md)、現行 `app/localization.ts` の既承認 copy を再利用する。
新しい command や UI 部品は提案しない。

| Role / existing English | Japanese reuse | canonical command / 可用性と動的値 |
| --- | --- | --- |
| Quick action `Look` | `見る` | `look`。Guided / Actions とも直接送信。施設内の D7 を再観測する必須操作。 |
| Quick action `Record` / `Stop recording` | `録画開始` / `録画停止` | `record` / `record off`。録画状態に応じて表示。明示1押下で1送信。 |
| Reminder `Start recording` | `録画を開始` | `record`。Actions の現地 reminder。P1 では表示を採取し、押下はしていない。 |
| Drawer `Start RECORD` | `RECORD を開始` | `record`。既存 control の可用性を維持。 |
| `Recording now` / `Recording is off` | `録画中` / `録画は停止中` | raw status 由来の recording state。 |
| `Start RECORD before you complete this experience.` | `体験を完了する前に RECORD を開始してください。` | 既存 reminder の説明。自動録画を導入しない。 |
| `Complete the experience; the brief will check itself.` | `体験を完了すると、要項のチェックが自動で更新されます。` | wrapper の補助 checklist の説明。原作内部 flag を意味しない。 |
| `● RECORDING` | `● RECORDING` のまま | raw English status に基づく既存 indicator。残容量や正式評価を追加しない。 |
| `Route to` / `You have arrived.` | `目的地への経路` / `目的地に到着しました。` | destination は map lookup、nextPlace は room lookup。施設内で到着、入口では残り1歩。 |
| `Draft next step` / `Take next step` / `Clear` | `次の移動を入力欄へ` / `次の移動を実行` / `解除` | map route の Guided は draft、Actions は直接送信。CSS による大文字表示を新しい English copy と数えない。 |
| `You are at` / `Available directions` / `Exits from this location` / `Next` | `現在地` / `移動できる方角` / `現在地からの出口` / `次` | 既存 compass の見出しと accessible name。方向 `N` / `SE` 等は既存表記。 |
| Compass の route accessible name | `発電所への経路、次は {command}` | 既存 English `Route toward {destination}; next {command}` の組合せ。destination だけ map lookup、command は実際の English alias。 |
| Route step display | 既存 `あと{steps}ステップ` / `残り{steps}ステップ` の文型 | `{steps}` / `{command}` / `{nextPlace}` は観測された room と route から導く。7→1→到着を固定文にしない。 |
| Guided route draft notice `Route to {destination}: edit this step or press Send.` | `{destination} への経路：この手順を編集するか、送信を押してください。` | 既存 `routeDrafted`。`destinationId=power` から map label を表示し、draft は English のまま。 |
| Explicit submit `SEND` | `送信` | 編集可能な draft を送信する既存 command form。draft の生成だけでは送信しない。 |
| Command help `↑ recalls your previous commands.` | `↑ で以前のコマンドを呼び出せます。` | English input と編集可能な draft を維持。 |
| Compact / full progress | `{count}/9 録画` / `9件中{count}件を録画` | 既存 EN `{count}/9 recorded` / `{count} of 9 recorded` の再利用。 |

S2 の往路 `se east south south se se south` は、map route で draft を作ってから Send した実測である。
施設内 `record` / `look` / `record off` は Guided quick actions の明示1押下、復路 `north nw nw north north west nw` は日本語 Actions compass の各1押下である。
map route の Actions button の直接送信は既存 code 契約として区別し、P1 で実押下したと書かない。
**compass と companion exits は Guided でも直接送信する現行契約を維持する。**
Guided map route の draft 規則をすべての移動 control へ一括適用しない。
locale を切り替えても actual command と可用性を変えず、Classic に assisted control を追加しない。

heading / prose の qualifier には表の短縮形と実測 full alias を明示的に対応させる。
既存の大文字小文字の正規化だけでは `E` と `east`、`S` と `south`、`N` と `north`、`W` と `west` は同じ index にならないため、P3 は採択済みの有限の組合せを既存 catalog に接続する。
`OUT` / `out` と入口の `IN` / `in` は現地の出口候補にある既存操作だが、採択17送信の応答 context として追加承認しない。
`GO SOUTH`、`ENTER POWER STATION`、`LEAVE POWER STATION` 等も source から補わない。

## 表示条件と P3 への引継ぎ

| 条件 | Copy と操作の契約 |
| --- | --- |
| 初回2041年 | 既存の first-entry active state、Simulation Mode、2041年、非 QA、raw English から解決済みの room とする。新しい state engine を作らない。 |
| Story leaf | H / D / R の exact English、上記 command qualifier、観測時 room を対応させる。本文の prefix や現在地名の substring だけで翻訳しない。 |
| 過去の履歴 | locale 往復や現在地変更後も、観測時に確定した room / year / phase の scope を保持する。現在の room で過去の entry を再分類しない。 |
| Place / map UI | 初回2041年の既存 navigation scope 内で、上表の exact room / map identity にだけ適用する。destination と nextPlace と current place を区別する。 |
| Language | 承認後の新規 Japanese text と accessible name は `lang=ja`。未承認本文、地名、対象名、動詞は original English と `lang=en`。raw status と canonical command は英語のまま。 |
| Recording / progress | 到着55は非録画、56 / 57は録画中、58以降は非録画。P1 の4/9→5/9は wrapper の補助推定であり、正式評価や内部 flag の実測と呼ばない。 |
| 入口と非録画 | 入口だけの録画、施設内の非録画 LOOK、過去の非録画 heading を新規課題の推定達成に使わない。本文の翻訳可否と記録の推定を分ける。 |
| Busy / input kind | 入力不可中に送信せず、char input で新しい line-input 支援を出さない。既存 main / companion の guard と可用性を保持し、P1 の静的確認を自然な busy / char 実測と扱わない。 |
| SceneActions | 入口と施設内の Guided / Actions は P1 で空だった。`POWER-STATION-OBJECT` や他の対象へ新しい Enter / Leave / Examine を追加せず、generic GLOBAL-OBJECTS / LOCAL-GLOBALS guard を緩めない。 |
| 不明状態と対象外 | unknown room / year / phase、再入場、後続年、Part II、QA、RESTORE 後の不明状態、新 session の不明な履歴に新規日本語を持ち込まない。canonical input と English fallback へ戻す。 |
| 既存保証 | 2a+2b、raw-English state detection、canonical English input、save/restore、history / recovery、正しい日本語履歴、単一 accessibility owner、focus と reading preferences を保持する。 |

共通 UI の current / selected / arrived、year、歩数、方角、録画状態、count は動的値であり、本 packet は画面に固定の時刻や残量を追加しない。
P3 は先行四課題を含む6 fresh routes、入口だけの録画と施設内非録画 LOOK の負例、locale 往復、履歴と recovery、390px、accessibility を検証する。
Power Station の旧 English fallback 正例を日本語の正例へ更新するときも、未承認 map `movie` / `Cinema` の English label と `lang=en` の保証を残す。
P1 の controlled shape probe は既存 projector の構造確認であり、新しい日本語が自然な経路で出た証拠へ読み替えない。
controlled probe の JSON ファイル保存改善も P3 の承認済み計画に残し、P2 の文書で解決済みとしない。

## Dynamic、optional、未承認の English fallback

security の色、inner number と回答、raw status の日付と時刻、行 ID、style 順序、capture timestamp は dynamic のまま保持する。
新規 H / D leaf には埋め込み時計はなかった。
原作が390pxで出さない時計、数値残容量、正式な九課題達成や帰還評価を補わない。

| ID / runtime position / actual command / room | Exact optional English leaf | 取扱い |
| --- | --- | --- |
| O1; S1:52:4; `S`; `BEND` | `A car alarm shrieks momentarily, then trails off into merciful silence.` | 新規訳を承認せず `lang=en`。 |
| O2; S2:52:4; `south`; `BEND` | `A stranger bumps against you, mumbles an apology, and is swallowed by the crowds.` | 同じく English fallback。 |
| O3; S2:64:3; `west`; `ELM-AND-KENNEDY` | `The ground shakes as a huge truck rumbles down the street.` | 同じく English fallback。 |

O1 / O2 は D4 → blank → optional → blank、O3 は H1 → blank → optional → blank の順を保つ。
optional leaf だけを翻訳対象から外し、同じ turn の承認済み H / D / R を巻き戻したり、割り込み自体を捨てたりしない。
先行レストランの半量警告 `WARNING: Record buffer is now half-full.`（S1/S2:32:3）も英語を保持する。
旧失敗 fixture の full / auto-deactivation、録画が active でない応答を成功へ読み替えない。

本文が似ていても、未観測の描写変種、別年の石炭発電、別の地理関係、未監査の object responses、timed events を source から補完しない。
D2 / D4 / D6 に出る未承認施設名を、別の room や map の一括翻訳に流用しない。
公園などで見える既存 `waterpool` / `statue` / `park` とその動詞も、本 packet による新規承認の対象外である。
単一の subtree 全体を `lang=ja` として未承認の English leaf まで日本語扱いにしない。

## 検証と独立承認への handoff

新規14 leaf の44箇所、既承認3 leaf の6箇所、optional 3 leaf を合わせた53箇所について、両 session の exact text / command / source-line / room と照合した。
空行と終端 input は原文の行構造のまま扱い、追加本文を source から補っていない。
UI は P1 の144 sample と現行 helpers を使い、map の目的地と current-location suffix、既承認 EN / JA copy の再利用を照合した。
照合中に submit label の大文字小文字を検出し、現行辞書どおり `SEND` と記載した。

Local では `npm ci`（npm 11.17.0）、`npm run lint`、`npx tsc --noEmit`、`npm test`（production build と36/36 unit tests）、relative link 照合、`git diff --check` が成功した。
Canonical SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` と一致する。
本 P2 では local E2E と新しい runtime capture を実行していない。
新しい日本語は production 未実装であり、P1 の E2E や current-head CI の結果を今回の日本語表示の実ブラウザ成功と混同しない。

本書の作成と実装側の点検は Codex Cloud が担当する。
別コンテキストでの内部点検にも未解決の指摘はないが、指定された独立 copy approval とは区別する。
Sol の独立 copy approval / merge までは H1–H7、D1–D7、再利用 R1–R3、role 別 UI、適用条件と fallback を候補として保持し、P3 を開始しない。
Current-head CI、head / base、artifact と14日保持の実期限、review 後の差分、未解決事項は提出 PR を正本とする。
P1 の CI / artifact は採択済み入力の provenance であり、今回の current-head 検証の代用にしない。
