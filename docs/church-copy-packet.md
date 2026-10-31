# 2041年の教会の本文と人物操作の copy packet

## 承認対象と開始根拠

本書は C2 / [#103](https://github.com/5gmt/mind-forever-voyaging/issues/103) の承認済み copy packet である。
C1 / #102 は [PR #105 の独立採択レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/105#pullrequestreview-5721119301)と merge `91d5b6fdb16515500dc5af901636e321751053d1` で完了し、[C2 開始 gate](https://github.com/5gmt/mind-forever-voyaging/issues/103#issuecomment-6538795912)が解除された。
[PR #106 の独立 Sol copy approval](https://github.com/5gmt/mind-forever-voyaging/pull/106#pullrequestreview-5721974351)と merge `e11634762c35b518377a87fbbdd6a10717ea57a6` が完了し、[C3 / #104 の開始条件](https://github.com/5gmt/mind-forever-voyaging/issues/104#issuecomment-6541097000)は解除済みである。

本文の正本は [C1 成功 fixture](../tests/fixtures/parchment-church-runtime-observed.json)（blob `145f2b42130a1d82cb19692e5c0be8b68da6f59a`）である。
2 fresh canonical sessions、各81 line submissions、132 UI samples を使い、[失敗 fixture](../tests/fixtures/parchment-church-runtime-harness-failure.json)から成功本文を補完しない。
[C1 evidence](church-runtime-evidence.md)の提出時の判断と、上記の独立採択を区別する。
照合 base は `91d5b6fdb16515500dc5af901636e321751053d1` である。

承認対象は新規本文11 leaf、既承認本文4 leaf の再利用、4つの新規 room 表示、map `church`、actor `CHURCH-OFFICIAL` の名前と Talk、共通 UI copy、および表示条件である。
本 C2 は本書、教会計画、`PROJECT_STATUS.md` と、指定された C1 evidence の誤記訂正だけを変更する。
Production code、runtime fixture、tests、canonical binary、historical source、依存関係は変更しない。

### C1 evidence の訂正

両 session の `observations[32].command` と `warnings[].command` は `RECORD` である。
半量警告の発生地点 Roy’s Pagoda、index32、原文 `WARNING: Record buffer is now half-full.` は正しく、発生 command を `BUY MEAL` とした記述だけを `RECORD` に訂正した。
この訂正は原文の訳や録画区間を変えるものではない。
警告そのものは未承認の English fallback として保持する。

## 採択経路と command qualifier

`S1/S2:i:l` は両 session の `observations[i].presentation.lines[l]` を指す。
後続の `i:l` にも S1/S2 が掛かる。
`A{n}` は `surfaceAudit[n]`、sample は `locale` と `mode` で特定する。
H / D / P / T / R / O は本書だけの照合 ID で、新たな identity engine を定義しない。

先行67送信と全録画窓を保持し、公園から次の14送信を追加した経路を対象とする。
起動 character input は81 line submissions と別に扱い、decoder answer は各 session の実回答を維持する。

```text
NE E E N W
RECORD → CHURCH ELDER, HELLO → RECORD OFF → LOOK
E S W W SW
```

| Observation | 観測時 room identity | actual command S1 / S2 | 対応 leaf |
| --- | --- | --- | --- |
| 66 | `MAIN-AND-KENNEDY` | `NE` / `ne` | R1 |
| 67 | `MAIN-AND-RIVER` | `E` / `east` | H1 / D1 / D2 |
| 68 | `MAIN-AND-CHURCH` | `E` / `east` | H2 / D3 |
| 69 | `CHURCH-ENTRANCE` | `N` / `north` | H3 / D4 |
| 70 | `ST-MICHAELS` | `W` / `west` | H4 / D5 / P1 |
| 71 | `ST-MICHAELS` | `RECORD` / `record` | R3 |
| 72 | `ST-MICHAELS` | `CHURCH ELDER, HELLO` / `church elder, hello` | T1 |
| 73 | `ST-MICHAELS` | `RECORD OFF` / `record off` | R4 |
| 74 | `ST-MICHAELS` | `LOOK` / `look` | H4 / D5 |
| 75 | `CHURCH-ENTRANCE` | `E` / `east` | H3 |
| 76 | `MAIN-AND-CHURCH` | `S` / `south` | H2 |
| 77 | `MAIN-AND-RIVER` | `W` / `west` | H1 |
| 78 | `MAIN-AND-KENNEDY` | `W` / `west` | R1 |
| 79 | `KENNEDY-PARK` | `SW` / `sw` | R2 |

S1 は全経路を command form から送信した。
S2 の往路は Guided map の draft と明示 Send を使い、index67の `east` だけは Guided companion exit の直接送信である。
現地の Talk は Guided main の draft と明示 Send、RECORD / OFF / LOOK は Guided quick actions、復路は日本語 Actions compass の各1押下である。
Main と companion の Guided Talk draft は A5/A6 の監査でも `church elder, hello` と確認し、監査中は送信せず消去した。

C3 は上表の実測 alias だけを、既存の大文字小文字の正規化と有限の command qualifier に接続する。
`E/EAST`、`W/WEST`、`N/NORTH`、`S/SOUTH` の区別を大文字化だけで解決したことにしない。
`OUT/out` は現地の既存出口候補として表示されたが、本文の新しい応答 qualifier としては承認しない。
`IN`、`GO WEST`、`ENTER CHURCH`、`CHURCH OFFICIAL, HELLO`、別の挨拶や人物 alias も追加しない。
R1 の復路 `W/west` は既存の同じ日本語でも今回の qualifier として別に照合する。

## 新規本文11 leaf

H1–H4 は `kind: title`、D1–D5、P1、T1 は `kind: prose` の候補とする。
Raw heading は `Style_normal` であり、見た目から heading を推定せず、この exact leaf の role で指定する。

| ID / kind / 0始まりの観測位置 | Exact canonical English leaf | Japanese candidate / reuse |
| --- | --- | --- |
| H1; `title`; S1/S2:67:1,77:1 | `Main & River` | `メイン通りとリバー通り` |
| H2; `title`; S1/S2:68:1,76:1 | `Main & Church` | `メイン通りとチャーチ通り` |
| H3; `title`; S1/S2:69:1,75:1 | `Church Entrance` | `教会入口` |
| H4; `title`; S1/S2:70:1,74:1 | `St. Michael's` | `聖ミカエル教会` |
| D1; `prose`; S1/S2:67:2 | `This is a typical four-way intersection between Main and River Streets. An entranceway through the massive walls of Heiman Village fills the southeast corner of the street, and a health care facility occupies the northeast corner.` | `ここは、メイン通りとリバー通りが交差する、よくある四つ角だ。南東の角にはハイマン・ヴィレッジの巨大な壁を通り抜ける入口があり、北東の角には医療施設がある。` |
| D2; `prose`; S1/S2:67:4 | `To the southwest is 80 River Street, a brand new plastalloy and glass office building, with many floors still unoccupied according to the billboard over the entrance. The fourth corner, the northwest, is the site of Perez Towers, a luxury apartment building. The sidewalks and street are crowded with people.` | `南西にはリバー通り80番地の、プラスタロイとガラスで造られた真新しいオフィスビルがある。入口の上に掲げられた看板によると、まだ多くの階が空いている。残る北西の角には、高級アパートのペレス・タワーズが建っている。通りと歩道は人で混み合っている。` |
| D3; `prose`; S1/S2:68:2 | `You are at the corner of bustling Main Street and quiet Church Street. There is construction in progress on the northwestern and southwestern corners. A conventional apartment building occupies the southeast corner, and an entrance to Midland Cemetery forms the fourth corner. Some greenery is visible down Church Street to the south.` | `にぎやかなメイン通りと静かなチャーチ通りの角にいる。北西と南西の角では建設工事が進んでいる。南東の角には普通のアパートがあり、残る角にはミッドランド墓地への入口がある。チャーチ通りの南のほうには、緑が見える。` |
| D4; `prose`; S1/S2:69:2 | `You are on Church Street, just east of a large, opulent church displaying the architecture of the twentieth century. The street continues north and south, and construction sites lie to the northwest and southwest. The main entrance to Midland Cemetery is east of here.` | `ここはチャーチ通りで、20世紀様式の大きく豪華な教会のすぐ東にあたる。通りは北と南へ続き、北西と南西には建設現場がある。ミッドランド墓地の正門はここから東にある。` |
| D5; `prose`; S1/S2:70:2,74:2 | `This is a large church with an obviously wealthy congregation. Although this building is over a century old, it is not the original St. Michael's, but is built on the site of the even older original church. The way out is to the east.` | `ここは大きな教会で、信徒たちが裕福であることは一目でわかる。この建物も建ってから100年を超えているが、聖ミカエル教会の最初の建物ではない。さらに古い元の教会があった場所に建てられている。出口は東にある。` |
| P1; `prose`; S1/S2:70:4 | `You suddenly notice a church elder, pacing around at the other end of the building.` | `ふと、建物の向こうの端で教会の長老が行ったり来たりしているのに気づく。` |
| T1; `prose`; S1/S2:72:1 | `You have a brief chat with the church elder, who smiles and comments on how happy he is about the recent increase in church attendance, which he attributes to an improving national moral climate. Suddenly he glances at his watch, mumbles a polite parting message, and hurries away.` | `教会の長老と短い会話を交わす。長老は笑みを浮かべ、最近は礼拝への出席者が増えたことをとても喜んでいると話し、その増加は国全体の道徳的な風潮がよくなっているためだという。突然、時計にちらりと目をやり、丁寧な別れの言葉をぼそぼそと口にすると、足早に去っていく。` |

### 意味と固有名の範囲

D1/D2 は Main & River の二つの段落である。
南東の Heiman Village の壁を抜ける入口、北東の医療施設、南西のリバー通り80番地、北西の Perez Towers を入れ替えない。
空き階は入口上の看板による情報であり、建物全体が無人だとはしない。
`plastalloy` は「プラスタロイ」として素材名を保ち、未記載の成分や性能を補わない。
「ハイマン・ヴィレッジ」は既承認の[発電所 packet](power-station-copy-packet.md)の表記を再利用する。
本文中の住所、ペレス・タワーズ、ミッドランド墓地は、この paragraph の翻訳だけであり、別の room、map、object の翻訳承認へ広げない。

D3 は Main Street のにぎわいと Church Street の静けさを区別する。
建設現場は北西と南西、アパートは南東で、残る角には墓地の入口がある。
南に見える緑は Church Street の先の描写として残す。
D4 では現在地が Church Street、豪華な教会がすぐ西、墓地の正門が東、建設現場が北西と南西である。
20世紀は建築様式の年代であり、建物が20世紀に建ったと断定する新しい情報にしない。

D5 は現在の建物自体も100年を超えていることと、それより古い最初の教会が同じ場所にあったことを両方保つ。
古い建物が今も隣にある、現在の建物が最初の教会である、といった関係へ変えない。
`wealthy congregation` は信徒の裕福さとして残し、建物の豪華さだけへ置き換えたり、在室する信徒集団を追加したりしない。
Room の訳「聖ミカエル教会」は固有名の候補であり、宗派を特定するものではない。

P1 の人物名は raw `church elder` の具体性を保つ「教会の長老」とする。
既承認 assignment の広い表現「教会関係者」と同じ identity にまとめず、「牧師」とも推定しない。
出現は長老に気づいたという描写であり、ドアから入って来たという新しい動作を足さない。
T1 の礼拝出席増加と国全体の道徳的な風潮の因果関係は長老の見解に帰属させ、語り手の事実認定に変えない。
笑顔、時計への視線、丁寧ながらぼそぼそした別れ、足早の退場までを同じ leaf に保持する。
2051年の別会話、宗教的寛容に関する別の主張、原作の正式評価を混ぜない。

## 再利用する本文4 leaf

| ID / kind / 0始まりの観測位置 | Exact canonical English leaf | Japanese candidate / reuse |
| --- | --- | --- |
| R1; `title`; S1/S2:66:1,78:1 | `Main & Kennedy` | `メイン通りとケネディ通り` |
| R2; `title`; S1/S2:79:1 | `Kennedy Park` | `ケネディ公園` |
| R3; `prose`; S1/S2:71:1 | `Record feature activated.` | `記録機能を起動しました。` |
| R4; `prose`; S1/S2:73:1 | `Record feature deactivated.` | `記録機能を停止しました。` |

[新聞 packet](newspaper-copy-packet.md)、[初期 Simulation UI packet](initial-simulation-ui-copy-packet.md)、[市役所 packet](city-hall-copy-packet.md)と現行 catalog の既承認 copy を使う。
先行五課題、原作 brief、既存の録画区間を再承認したり変更したりする作業ではない。
本文の「記録機能」と UI の「録画開始 / 録画停止」は既存の役割ごとの訳を保つ。

## 行構造と動的値

| Observation | echo と input の間の安定した構造 |
| --- | --- |
| 66 / 78 / 79 | R1 / R1 / R2 → blank。78はその後に O3 → blank。 |
| 67 | H1 → D1 → blank → D2 → blank。二段落を結合しない。 |
| 68 | H2 → D3 → blank → O1（S1）または O4（S2）→ blank。 |
| 69 | H3 → D4 → blank。 |
| 70 | H4 → D5 → blank → P1 → blank。 |
| 71 / 72 / 73 | R3 / T1 / R4 → blank。 |
| 74 | H4 → D5 → blank。在室文を足さない。 |
| 75 | H3 → blank。S1だけ O2 → blank が続く。 |
| 76 / 77 | H2 / H1 → blank。初訪問の説明を足さない。 |

各 turn は元の echo と終端 input を保持し、blank を `spacer` として source line に対応させる。
日本語の文数と raw leaf の数を混同せず、D1 と D2、D5 と P1、T1 の境界を保つ。

Raw status の日付、時刻、line ID、decoder prompt と実回答、capture timestamp は動的値であり、固定の日本語本文へ埋め込まない。
会話の8分は S1の `4:12pm → 4:20pm`、S2の `4:49pm → 4:57pm` の差であり、T1 に「8分」を追加しない。
到着70は非録画、71/72は録画中、73以降は非録画である。
翻訳の可用性を録画中だけに限定せず、初回2041年の解決済み観測時 room、上表の command と exact leaf の一致で判断する。
C3 の非録画負例で同じ exact leaf が出た場合も、補助 checklist の加算条件とは分離する。
未知の非録画応答をこの規則で新規承認するものではない。
390pxで出ない時計、残容量の数値、内部録画 flag を合成しない。

## Room と map と actor と assignment の台帳

| Role / identity | 現行 English | Japanese candidate / reuse | 表示先と条件 |
| --- | --- | --- | --- |
| Room `MAIN-AND-RIVER` | `Main & River` | `メイン通りとリバー通り`（H1） | 現在地、context heading、drawer の現在地、route nextPlace、compass と exits の移動先。初回2041年の exact room。 |
| Room `MAIN-AND-CHURCH` | `Main & Church` | `メイン通りとチャーチ通り`（H2） | 同上。 |
| Room `CHURCH-ENTRANCE` | `Church Entrance` | `教会入口`（H3） | 入口の room。建物内と統合しない。 |
| Room `ST-MICHAELS` | `St. Michael's` | `聖ミカエル教会`（H4） | 建物内の room。同じ訳でも map と identity を統合しない。 |
| Map `church`; target `ST-MICHAELS` | `St. Michael's Church` | `聖ミカエル教会` | hotspot、route destination、checklist destination の小見出し。 |
| Map hotspot accessible name | `St. Michael's Church` / `St. Michael's Church, current location` | `聖ミカエル教会` / `聖ミカエル教会、現在地` | C1 の実測名。現地だけ suffix を付ける。`fieldwork destination` は現行 church に出ておらず、訳だけを理由に追加しない。 |
| 再利用 Room `MAIN-AND-KENNEDY` | `Main & Kennedy` | `メイン通りとケネディ通り`（R1） | 初回2041年の既存 lookup。 |
| 再利用 Room `KENNEDY-PARK` | `Kennedy Park` | `ケネディ公園`（R2） | 公園帰着と既存表示。 |
| Actor `CHURCH-OFFICIAL` | `church elder` | `教会の長老` | 在室を新しい raw 証拠で確認した ST-MICHAELS の main / companion。command noun は `church elder`。 |
| Action `talk` on `CHURCH-OFFICIAL` | `Talk` | `話す`（既存動詞の表記） | この actor との組合せだけを追加候補にする。 |
| Guided button visible / accessible name | visible `church elder` + `TALK`、accessible `church elder Talk` | visible `教会の長老` + `話す`、accessible `教会の長老 話す` | CSS の大文字表示と基の `Talk` を区別。実際の空白と読み順は C3 の aria snapshot で確認。 |
| Actions button visible / accessible name | visible `TALK`、accessible `Talk` | `話す` | 対象見出し「教会の長老」と関連付ける。 |
| Assignment index6（九課題の7番目） | `Talk to a church official` | `教会関係者と話すこと`（既承認） | checklist と current task。actor 名へ自動流用しない。 |
| 原作 brief の list item（S1/S2:4:12） | `   Talking to a church official` | `教会関係者と話すこと`（既承認） | leading spaces を含む list の構造を保つ。上の UI English とは別 leaf。 |
| Identity rail | `PRISM`、`Simulation`、`Rockvil`、`2041` 等 | 既存辞書と既存 fallback のまま | 名称や year は観測値を使い、未承認の rail 全体を新規翻訳しない。 |

A0は公園出発前、A1–A3は往路、A4は入口、A5は非録画在室、A6はRECORD後、A7は会話退場後、A8はOFF後、A9はLOOK後、A10は公園帰着である。
各 session に EN / JA と3 modes の sample がある。
新規地名と actor 周囲は JA sample でも English `lang=en` であり、上の候補が C1 ですでに表示されたとは扱わない。
Room の日本語は既存 place lookup、map は map lookup、actor と Talk は限定 scene helpers の責務に接続する候補である。
Raw `Location:`、world metadata、parser vocabulary を rename しない。
Generated 一般名 `Vacant Lot` を2041年の実表示名として採用しない。

## 人物操作の説明と lang

以下の6行は既承認の scene UI 辞書の再利用であり、教会の main / companion では C1 時点に English で出ていた copy である。

| Role / exact English | Japanese reuse |
| --- | --- |
| Guided region `Words mentioned here` | `この場面で言及された語` |
| Guided heading `Worth trying` | `試してみる` |
| Guided instruction `Choose one to draft a command` | `選ぶとコマンドを下書きします` |
| Actions region `Actions for things mentioned here` | `この場面で言及された対象へのアクション` |
| Actions heading `In this scene` | `この場面で` |
| Actions instruction `Actions written into the original story` | `原作に用意されたアクション` |

次の2行は Talk のための提案であり、教会で runtime-observed な説明文ではない。
既存の City Hall 型の actor control 内で使い、main / companion に同じ役割と表示条件を適用する。

| Role | Proposed English | Japanese candidate / reuse | Command と条件 |
| --- | --- | --- | --- |
| Guided Talk help | `Draft a command to talk to the church elder. You can edit it before sending.` | `教会の長老と話すコマンドを下書きします。編集してから送信できます。` | `church elder, hello` の editable draft。明示 Send までは未送信。 |
| Actions Talk help | `Choose Talk to send the command once.` | `「話す」を押すと、コマンドを1回送信します。`（既存文型） | 明示1押下で `church elder, hello` を1回送る。C1 の Actions Talk は表示監査のみで、実送信とは区別。 |

EN / JA の対象と canonical command を一致させ、翻訳済みの actor と action、承認された説明は `lang=ja`、未承認の English leaf は `lang=en` を保持する。
Actor が不在なら、その Talk と専用 help も出さない。
共通 region の訳を使うことを、建物 `CHURCH-OBJECT` の名前 `church`、`Examine`、`examine church` や他の人物操作の新規承認と取り違えない。
これらは A4 や退場後に見える既存の English fallback のままとする。
未承認 leaf を含む subtree 全体を日本語扱いにしない。

## 共通操作と動的な UI copy

[初期 Simulation UI packet](initial-simulation-ui-copy-packet.md)、[発電所 packet](power-station-copy-packet.md)と現行 `app/localization.ts` の既承認 copy を再利用する。
Visible label と accessible name が同じ button は下表で兼ね、異なる組合せは別に示す。

| Role / English | Japanese reuse / candidate | canonical command と契約 |
| --- | --- | --- |
| Quick action `Look` | `見る` | `look`。S2:74で直接1送信。 |
| Quick action `Record` / `Stop recording` | `録画開始` / `録画停止` | `record` / `record off`。S2:71/73で直接1送信。 |
| Reminder `Start recording` / drawer `Start RECORD` | `録画を開始` / `RECORD を開始` | `record`。C1では表示監査のみ。自動録画を導入しない。 |
| `Recording now` / `Recording is off` | `録画中` / `録画は停止中` | raw status の recording state で切り替える。 |
| `Start RECORD before you complete this experience.` | `体験を完了する前に RECORD を開始してください。` | Actions の現在課題の非録画 reminder。 |
| `Complete the experience; the brief will check itself.` | `体験を完了すると、要項のチェックが自動で更新されます。` | 原作の正式評価ではなく、wrapper の補助 checklist。 |
| `● RECORDING` | `● RECORDING` のまま | 残容量や正式評価へ変えない。 |
| `Route to` / `You have arrived.` | `目的地への経路` / `目的地に到着しました。` | destination は map lookup。nextPlace は room lookup。 |
| `Draft next step` / `Take next step` / `Clear` | `次の移動を入力欄へ` / `次の移動を実行` / `解除` | Guided map は draft、Actions map は直接送信の既存契約。C1は Guided map の実送信を確認。 |
| `You are at` / `Available directions` / `Exits from this location` / `Next` | `現在地` / `移動できる方角` / `現在地からの出口` / `次` | 共通 compass / companion の見出しと accessible name。 |
| `Map & routes` | `地図と経路` | button の accessible name に既存 compact progress が続く。 |
| `Route toward {destination}; next {command}` | `聖ミカエル教会への経路、次は {command}` | 新規 destination の組合せ候補。command は English alias をそのまま残す。 |
| Route step | 既存の `あと{steps}ステップ` / `残り{steps}ステップ` と次の command / place | `{nextPlace}` のみ room lookup。公園5歩→入口1歩→現地到着を固定文にしない。 |
| `Route to {destination}: edit this step or press Send.` | `聖ミカエル教会 への経路：この手順を編集するか、送信を押してください。` | 既存 draft notice の文型。表示先だけ map lookup。draft は English。 |
| Compass / companion exits | 方向 `E` / `OUT` 等と候補の room label | Guided でも直接送信。S2:67の companion `east`、75–79の Actions compass を実測。Guided compass は既存コード契約。 |
| `SEND` | `送信` | 明示 submit。draft だけでは送らない。 |
| `↑ recalls your previous commands.` | `↑ で以前のコマンドを呼び出せます。` | English command input と編集を保持。 |
| `{count}/9 recorded` / `{count} of 9 recorded` | `{count}/9 録画` / `9件中{count}件を録画` | A0–A6は補助5/9、A7以降は補助6/9。原作内部の正式達成とは別。 |
| `Plot route for {assignment}` | `教会関係者と話すことへの経路を表示` | assignment index6の既承認ラベルを使う。 |

上表の新規組合せの日本語は初回2041年の採択範囲だけに適用する。
locale 切替で command、可用性、recording state を変えず、Classic に assisted controls を追加しない。
Header、tabs、close、year、current、selected、arrived は既存 copy と動的表示を維持する。

## C3 に渡す人物と履歴の境界

| 条件 | Copy と操作の契約 |
| --- | --- |
| 翻訳の範囲 | 非QA、初回 Simulation active、2041年、解決済みの観測時 room と上表の exact leaf / alias。現在地で過去の turn を再分類しない。 |
| 在室 | その visit に得た新しい P1 の raw English 在室証拠と ST-MICHAELS の line input を要求する。見出し、一般名 official、配置 metadata、壁時計、古い history だけで Talk を出さない。 |
| 会話後 | T1 の成立と退場を観測したら、その session の会話済み状態を維持して両 Talk を消す。OFF、LOOK、再訪、locale切替、rolling history で復活させない。 |
| 時刻退場 | 未観測の source-only `The church official wanders off.` は本書で翻訳しない。C3は「現在不在」として在室根拠を失効し、会話済みとは混同しない。時計や出現条件をVMの代わりにしない。 |
| 他室へ移動 | visit の在室根拠を失効させる。新しい正当な在室証拠がない間は Talk を出さない。 |
| 不明状態 | 未知 room、欠損 report、RESTORE後の不明状態、新 session の reset では在室を推測しない。初回 Simulation state の既存契約も保持する。 |
| Busy / input kind | busy は送信不可、char input はこの限定 line-input 支援を非表示。main / companion の両方に適用する。 |
| 非録画 | 在室の Talk 自体は録画中だけに限定しない。非録画会話を補助達成に数えず、後からRECORDしただけで過去のT1を拾わない。 |
| History | 観測時 scope を保持し、人物不在や別室になっても正しく翻訳された会話履歴を失わない。20,000文字の rolling window と source-line の履歴照合を維持する。 |
| 対象外 | First Methodist、他の教会、2051年以降、再入場、Part II、QAの同文に新規日本語や限定人物支援を広げない。 |
| Rendering / a11y | 既存2a+2b、per-leaf fallback、単一 accessibility owner、focusとreading設定を保持する。 |

現在の教会は汎用 actor guard であり、C3 が限定在室 state と翻訳の観測時 scope を必要な範囲で補う。
C2 が翻訳のために GLOBAL-OBJECTS / LOCAL-GLOBALS の guard を緩めることは承認しない。
この表は C3 の実装契約であり、C1 の132 samplesで負例すべてを検証したという主張ではない。
C3 は6 fresh routes、非録画負例、時刻退場、他室、long history、recovery、390px の実装と受入を担当する。

## 未承認 output と English fallback

| ID / 観測位置 / actual command / room | Exact optional English leaf | 処理 |
| --- | --- | --- |
| O1; S1:68:4; `E`; `MAIN-AND-CHURCH` | `You are startled as a taxi horn blares nearby.` | 原文と `lang=en`、元の位置と空行を保持。 |
| O2; S1:75:3; `E`; `CHURCH-ENTRANCE` | `Across the street, two policemen are frisking a youth. As you watch, they usher the youth into a waiting car and fly off.` | 原文と `lang=en`、元の位置と空行を保持。 |
| O3; S1:78:3; `W`; `MAIN-AND-KENNEDY` | `The ground shakes as a huge truck rumbles down the street.` | 原文と `lang=en`、元の位置と空行を保持。 |
| O4; S2:68:4; `east`; `MAIN-AND-CHURCH` | `A skycopter drones by far overhead and disappears into the distance.` | 原文と `lang=en`、元の位置と空行を保持。 |

Optional leaf だけを未承認として扱い、同じ turn の H / D / R の日本語や既存履歴を巻き戻さない。
半量警告（S1/S2:32:3、`RECORD`）、旧失敗 fixture の full / auto-deactivation、未知の応答も原文を保持し、成功や正式評価へ読み替えない。
Source-only の時刻退場、2051年の会話、後年の教会描写、未監査の建物応答を source から追加翻訳しない。

## 検証と独立承認への handoff

新規11 leaf の32箇所、再利用4 leaf の10箇所、optional4箇所を合わせた46箇所を、両 session の exact text / line / room / actual command と照合した。
UI は132 samplesと現行 catalog で、観測した英語、既承認の日本語、今回の新規候補、未送信の監査と実送信を分けて点検した。
既承認辞書の英日22組と route draft の文型も現行 helpers に照合し、relative links と警告の訂正を確認した。
Local の `npm ci`（npm 11.17.0）、`npm run lint`、`npx tsc --noEmit`、`npm test`（production build と40/40 unit tests）、`git diff --check` は成功した。
Canonical SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` と一致する。

本 C2 は文書のみであり、新規 runtime capture と local E2E は実施しない。
C1 の採択時 CI は40 unit / 52 browser成功であるが、それを C2 head の検証結果や新規日本語の実ブラウザ成功としない。
Current-head CI、artifactの実体と実保持期限、head / base、review後の差分、未解決事項は提出 PR を正本とする。
本書の作成と補助点検は実装側の作業であり、指定された独立 copy approval と区別する。
別コンテキストの補助レビューでも未解決の指摘はなかった。
Sol の独立 copy approval と merge までは、本文、role別UI、適用条件を候補として保持し、C3 を開始しない。
