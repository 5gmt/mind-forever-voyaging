# Issue #64 — 2041年 新聞調査 日本語 copy packet

## 決定と provenance

Issue #62 が 2026-09-29 に二つの独立した fresh Chromium context で採取した canonical Release 79 の runtime fixture、`tests/fixtures/parchment-newspaper-runtime-observed.json` を、story leaf、順序、command context、stable / dynamic / optional 境界の唯一の根拠とする。N1 の終了案 **A（同一 session の裁判所 → 新聞）** を採用し、既存 Courthouse 往復に続く `INVENTORY` → `RECORD` → `NE` → `N` → `NE` → `BUY NEWSPAPER` → `READ NEWSPAPER` → `SW` → `S` → `SW` → `RECORD OFF` を対象経路とする。

両 session で、wallet の所持、新聞の購入、録画中の四段落の読書、Kennedy Park への帰着、録画停止、ordinary line input の復帰まで成立した。記事は既存 ordinary-turn projector で表現可能であり、専用 renderer は必要ない。historical ZIL、generated world data、既存 UI、片方の session だけに現れる prose から story copy を補っていない。

この文書は copy approval のみを行う。production catalog、place lookup、component、projector、fixture、canonical story artifact は変更しない。共有地名対応表と lookup の実装は Issue #66、地図と経路 UI での再利用は Issue #67 に委ねる。

## Exact route / context qualifier

| Route order | Canonical command context | Stable presentation boundary | Context decision |
| ---: | --- | --- | --- |
| 0 | `INVENTORY`; Kennedy Park、非 recording | `You are carrying:`、key、wallet | 購入前提の観測。inventory copy の新規承認対象にはしない。 |
| 1 | `RECORD`; Kennedy Park | recording 起動応答 | Issue #49 の既承認 copy を再利用する。 |
| 2 | `NE`; Kennedy Park → Main & Kennedy、recording 中 | heading、三つの description paragraph | 往路の初回到着だけ description が現れる。 |
| 3 | `N`; Main & Kennedy → Centre & Kennedy、recording 中 | heading、intersection description | 往路の初回到着だけ description が現れる。 |
| 4 | `NE`; Centre & Kennedy → Bodanski Square、recording 中 | heading、plaza description、dispenser、buffer warning | warning も両 session で同一だが canonical system state のため原文を保持する。 |
| 5 | `BUY NEWSPAPER`; Bodanski Square、recording 中 | card 使用、残高、新聞取得 | `$599` は観測済みの canonical value のまま一つの exact leaf 内で保持する。 |
| 6 | `READ NEWSPAPER`; Bodanski Square、recording 中 | 四つの記事段落 | 段落順と段落間の blank line を維持し、省略・要約しない。読書により10分経過するが時刻は raw status にのみ現れる。 |
| 7 | `SW` → `S` → `SW`; recording 中 | Centre & Kennedy → Main & Kennedy → Kennedy Park の heading のみ | 帰路では往路の description を補わない。 |
| 8 | `RECORD OFF`; Kennedy Park | recording 停止応答、ordinary line input 復帰 | Issue #49 の既承認 copy を再利用する。 |

Command echo、空行、active line-input の `>` は copy leaf に含めない。

## Exact English story leaf → Japanese copy table

| Context / presentation role | Exact canonical English leaf | Approved Japanese copy |
| --- | --- | --- |
| `RECORD`; route-boundary response（Issue #49 copy reused） | `Record feature activated.` | `記録機能を起動しました。` |
| 往路 `NE`; arrival heading | `Main & Kennedy` | `メイン通りとケネディ通り` |
| 往路 `NE`; downtown description | `This is the heart of the downtown area, flanked by classical glass-and-steel skyscrapers. The skybus terminal is on the northwest corner. To the southwest is an entrance to Kennedy Park.` | `ここはダウンタウンの中心部で、クラシカルなガラスと鋼鉄の超高層ビルが両側にそびえている。北西の角にはスカイバス・ターミナルがある。南西にはケネディ公園の入口がある。` |
| 往路 `NE`; InfoTech Building description | `The skyscraper on the northeast corner is one of Rockvil's most famous landmarks, the InfoTech Building. This 130-story office tower is the tallest building in the city and the sixth tallest in the world.` | `北東の角にある超高層ビルは、ロックヴィルで最も有名なランドマークの一つ、インフォテック・ビルだ。この130階建てのオフィスタワーは市内で最も高く、世界でも6番目の高さを誇る。` |
| 往路 `NE`; Silicorp / streets description | `The high-rise building on the southeast corner is the Silicorp Building, a tall office tower. From this intersection, Main Street runs east and west, and Kennedy Street can take you north or south.` | `南東の角にある高層建築は、背の高いオフィスタワー、シリコープ・ビルだ。この交差点から、メイン通りは東西へ、ケネディ通りは南北へ延びている。` |
| 往路 `N`; arrival heading | `Centre & Kennedy` | `センター通りとケネディ通り` |
| 往路 `N`; intersection description | `At this intersection, Centre Street cuts across Kennedy Street from northeast to southwest. A tall hotel has entrances to the east and southeast. The austere facade of Huang Hall rises to the west. Kennedy Street continues north and south.` | `この交差点では、センター通りが北東から南西へケネディ通りを横切っている。東と南東には高層ホテルの入口がある。西にはホアン・ホールの質素な正面がそびえている。ケネディ通りは南北へ続いている。` |
| 往路 `NE`; arrival heading | `Bodanski Square` | `ボダンスキー広場` |
| 往路 `NE`; plaza description | `This is a large plaza formed by the intersection of Bodanski Boulevard from the east, Centre Street from the southwest, and River Street from the north and south. There is a car lot on the western side of the square. On the northeastern corner is a restaurant, and the old train station can be entered to the southeast. A covered stairway leads down to the Tubes.` | `ここは、東から延びるボダンスキー大通り、南西から延びるセンター通り、そして南北に走るリバー通りが交わってできた大きな広場だ。広場の西側には駐車場がある。北東の角にはレストランがあり、南東からは古い鉄道駅に入れる。屋根付きの階段が地下交通網チューブへ通じている。` |
| 往路 `NE`; newspaper-dispenser description | `There is a newspaper dispenser chained to a lamp post on the corner.` | `角の街灯には新聞販売機が鎖でつながれている。` |
| `BUY NEWSPAPER`; purchase response | `You insert your card into the newspaper dispenser. A readout flashes "NEW BALANCE: $599" and a newspaper pops out into your hands.` | `新聞販売機にカードを差し込む。表示に「NEW BALANCE: $599」と点滅し、新聞が一部、手元へ飛び出してくる。` |
| `READ NEWSPAPER`; paragraph 1 — economy | `The headline story in the news section is about the Index of Leading Economic Indicators, which are up a stunning 9.7% over last month, yet another indication of the economy's robust performance. Related stories discuss the unemployment rate, which is at the lowest level in almost thirty years, and commercial and housing construction, which are at an all-time high.` | `ニュース欄のトップ記事は景気先行指数を取り上げている。前月比で驚異の9.7%上昇し、経済の力強い成長をまたしても裏づけたという。関連記事では、失業率が約30年ぶりの低水準にあることや、商業施設と住宅の建設が史上最高水準に達していることが報じられている。` |
| `READ NEWSPAPER`; paragraph 2 — Ryder / BSF | `Another major story covers President Ryder's speech for the Distinguished Lecturer Series of the Border Security Force Academy. In his address, the President called the '40s a "decade of new hope," and attributed much of that new hope to the work of the BSF, sending a signal to the entire world that the USNA "won't be pushed around by the biggest dictatorship or the smallest band of terrorist murderers."` | `別の主要記事は、国境警備隊アカデミーの著名講師シリーズで行われたライダー大統領の講演を伝えている。演説で大統領は40年代を「新たな希望の10年」と呼び、その希望の多くはBSFの働きによるものだと述べた。さらに大統領は、USNAが「最大の独裁国家にも、テロリストの殺人集団の最小の一派にも、言いなりにはならない」という姿勢を全世界に示した。` |
| `READ NEWSPAPER`; paragraph 3 — crime report | `On one of the inside pages, an in-depth report on crime reveals that, although the overall crime rate has dropped only 4% over the last decade, public perception is that crime has fallen much further. The report attributes this perception to three points: Violent crime has decreased much faster than other types of crime, and is down by 15% from ten years ago. Crime in the schools, which has always gotten the most publicity, has dropped by 40%. Most importantly, offenders are getting harsher sentences, as opposed to the old days of getting off on technicalities, low bail, and easy parole.` | `中面の一つには犯罪に関する詳細な報告があり、過去10年間で犯罪率全体はわずか4%しか低下していないにもかかわらず、世間では犯罪がそれ以上に大幅に減ったと受け止められていることを明らかにしている。報告は、この認識を三つの点に帰している。暴力犯罪はほかの種類の犯罪よりはるかに速く減少し、10年前より15%低下した。常に最も大きく報道されてきた学校内犯罪は40%減少した。そして何より、かつてのように法手続き上の不備や低額の保釈金、容易な仮釈放によって放免されるのとは対照的に、犯罪者にはより厳しい刑が科されている。` |
| `READ NEWSPAPER`; paragraph 4 — other stories / editorial | `Other stories in the news section deal with the construction of a new InfoTech orbiting factory, deregulation of the medicinal drug industry, the war in Turkey, and plans for a lunar mining operation. An editorial calls for lowering draft board requirements in order to ease prison overcrowding.` | `ニュース欄のほかの記事では、インフォテックの新たな軌道工場の建設、医薬品産業の規制緩和、トルコでの戦争、月面採掘事業の計画が取り上げられている。社説は、刑務所の過密を緩和するため、徴兵委員会の要件を緩和するよう求めている。` |
| 帰路 `SW`; heading only | `Centre & Kennedy` | `センター通りとケネディ通り` |
| 帰路 `S`; heading only | `Main & Kennedy` | `メイン通りとケネディ通り` |
| 帰路 `SW`; heading only（Issue #49 copy reused） | `Kennedy Park` | `ケネディ公園` |
| `RECORD OFF`; route-boundary response（Issue #49 copy reused） | `Record feature deactivated.` | `記録機能を停止しました。` |

## Meaning, tone, and terminology decisions

- **記事の関係:** 第1段落の headline と related stories、第2段落の another major story、第3段落の inside-page report と三つの根拠、第4段落の other stories と editorial の関係を維持した。四段落を見出し一覧へ要約したり、政治的・社会的な因果を弱めたりしない。
- **数値と引用:** `9.7%`、約30年、130階、世界6位、`4%`、`15%`、`40%`、`$599` を保持する。Ryder の二つの引用は直接話法のままとし、`'40s` は simulation context 上の2040年代を表す「40年代」とする。
- **政治組織:** `Border Security Force` / `BSF` は「国境警備隊」/ `BSF`、`USNA` は原文の略称を保持する。`draft board` は徴兵の適否を扱う機関として「徴兵委員会」とし、徴兵要件そのものへ意味を狭めない。
- **社会的語り口:** 犯罪統計と世間の認識の差、厳罰化をその認識の理由とする記事の論調を、訳者の評価を加えず保持する。`offenders` はこの文脈では「犯罪者」、`getting off` は無罪認定ではなく処罰を免れる含意の「放免される」とする。
- **街路と施設:** heading の `&` は交差点として「〜通りと〜通り」とする。`Street` は「通り」、`Boulevard` は「大通り」、`Square` は場所 identity として「広場」。`Tubes` は固有の交通体系であることを残すため「地下交通網チューブ」とする。
- **企業・建物:** `InfoTech` は「インフォテック」、`Silicorp` は「シリコープ」、`Huang Hall` は「ホアン・ホール」とする。同じ固有名が記事と場所 description に現れる場合は同じ表記を使う。
- **販売機表示:** `NEW BALANCE: $599` は機械が表示する canonical English と数値を引用内で保持する。`$599` を円換算したり、購入前残高や価格を補ったりしない。
- **文体:** room description と記事の地の文は既存 packet と同じ常体とする。原文の報道調、引用、批判的含意を説明文へ置き換えない。

## Shared place-name source of truth

この表を採用経路に新しく必要な地名訳の正本とする。Canonical room ID は wrapper の world-data identity、exact English room label は N1 fixture の heading / raw status で照合する。Raw Parchment `GridWindow` の `Location:` は canonical English のまま保持し、N3 が追加する wrapper-owned `currentPlace` lookup と story heading だけが exact identity に対して訳語を再利用する。

| Canonical room ID | Exact English label | Presentation role | Approved Japanese | Evidence / handoff |
| --- | --- | --- | --- | --- |
| `MAIN-AND-KENNEDY` | `Main & Kennedy` | story heading、wrapper `currentPlace`、route の room identity | `メイン通りとケネディ通り` | N1 の往路・帰路・status。N3 が lookup を追加し U3 が route に再利用する。 |
| `CENTRE-AND-KENNEDY` | `Centre & Kennedy` | story heading、wrapper `currentPlace`、route の room identity | `センター通りとケネディ通り` | N1 の往路・帰路・status。N3 が lookup を追加し U3 が route に再利用する。 |
| `BODANSKI-SQUARE` | `Bodanski Square` | story heading、wrapper `currentPlace`、route の room identity | `ボダンスキー広場` | N1 の到着・購入・読書・status。N3 が lookup を追加する。 |
| `KENNEDY-PARK` | `Kennedy Park` | story heading、wrapper `currentPlace`、route の room identity | `ケネディ公園` | Issue #49 の既承認 copy を再利用する。 |
| `ELM-AND-PARK` | `Elm & Park` | story heading、wrapper `currentPlace`、Courthouse route identity | `エルム通りとパーク通り` | Issue #56 の既承認 copy を再利用する。 |
| `COURTHOUSE` | `Courthouse` | story heading、wrapper `currentPlace`、fieldwork destination | `裁判所` | Issue #56 の既承認 copy を再利用する。 |

Exact room identity が一致しない値は original English に fallback する。近似一致、部分一致、同じ target ID を持つ別 label を room name と同義にはしない。

### U1 surface audit handoff: room name と異なる map / assignment label

Issue #63 の対象コードを照合すると、同じ canonical room を指す UI label が複数ある。以下は story runtime evidence ではなく、`app/StoryTools.tsx` の `ROCKVIL_LANDMARKS` に存在する UI identity の監査結果である。N2 の地名表と混同せず、U1 / U3 が役割別 copy と accessible-name suffix を最終承認するための入力とする。

| UI identity | Exact existing English label | Target ID | Role decision / approved proper-name copy |
| --- | --- | --- | --- |
| `north-central` | `North Central Station` | `BODANSKI-SQUARE` | 地図 landmark。room heading `Bodanski Square` とは別 identity。「ノース・セントラル駅」。 |
| `newspaper` | `Newspaper` | `BODANSKI-SQUARE` | fieldwork assignment / destination label。駅名や広場名ではない。「新聞」。Issue #49 の assignment `Reading a newspaper`（「新聞を読むこと」）と整合させる。 |
| `infotech` | `InfoTech Building` | `MAIN-AND-KENNEDY` | 地図 landmark。room heading `Main & Kennedy` とは別 identity。「インフォテック・ビル」。 |
| `kennedy` | `Kennedy Park` | `KENNEDY-PARK` | landmark と room label が一致。「ケネディ公園」を再利用する。 |
| `court` | `Courthouse` | `COURTHOUSE` | fieldwork destination と room label が一致。「裁判所」を再利用する。 |

`Newspaper`、`North Central Station`、`Bodanski Square` は同じ `BODANSKI-SQUARE` を target にしても相互に置換しない。U3 は landmark / fieldwork destination の exact identity を保ち、N3 の room-name lookup を label の意味変更に流用しない。Map hotspot の visible label と `"..., fieldwork destination"` / `"..., current location"` を含む accessible name、route card の destination label は U1 / U3 の UI copy 責任である。

## Dynamic / optional / intentional canonical-English boundaries

- `INVENTORY`、`RECORD`、`NE`、`N`、`BUY NEWSPAPER`、`READ NEWSPAPER`、`SW`、`S`、`RECORD OFF`、command echo、parser へ送る入力は canonical English のままとする。
- Simulation の date / time、recording を含む mode、raw `GridWindow` の `Location:` value は dynamic runtime state として canonical English を保持する。
- `WARNING: Record buffer is now half-full.` は両 session で観測されたが、recording buffer の canonical state notification であり、本 story copy packet では承認せず原文を保持する。
- `You are carrying:`、`   a key`、`   a wallet` は購入前提の観測に使うが、本 packet の経路本文として新規承認しない。Card を独立した inventory item として補わない。
- `$599` は両 session で一致した購入 response の一部としてのみ承認する。購入前残高、新聞の価格、別時点の残高を推測しない。将来 exact leaf が変われば original English へ fallback する。
- N1 の二 session では新聞経路上の optional city noise は現れなかった。既存 fixture で知られる taxi horn、truck、skycopter、通行人などを今回の leaf に追加せず、将来現れる variant は未承認の canonical English とする。
- 空行、heading / prose の block boundary、末尾の active line-input `>` は presentation structure であり、翻訳文字列へ埋め込まない。
- Exact identity が一致しない leaf、未観測の反応、未承認の variant は leaf 単位で original English に安全に fallback する。承認済みの前後関係や room identity を根拠に部分一致で翻訳しない。

## Deferred / unobserved branches

- Optional / random city-noise と、Main & Kennedy、Centre & Kennedy、Bodanski Square の別日時・別方向・別 route の description variant。
- Wallet がない、card を使えない、新聞購入済み、残高が異なる、販売機へ別 command を送るなどの購入反応。
- Recording 外での読書、再読、新聞を所持していない場合、別年代の記事、読書中の timed event、記事以外の新聞操作。
- 帰路では表示されない room description、保存 source にしかない本文、今回の fixture にない記事や editorial。
- 九課題全体の本文と正式な達成判定、帰還と評価、Simulation への再入場、後続年、other Communications outlet。
- Raw status の localization、汎用 renderer、日本語 parser input、VM telemetry、全地図 label の翻訳。

## Approval and integration handoff

- **実装 / copy 作成:** ChatGPT。N1 runtime fixture と既存 Issue #49 / #56 packet、対象 UI identity を照合した。
- **copy review / approval owner:** 5gmt。本 PR の review を、記事全四段落、数値、引用、地名、役割別 UI identity の承認記録とする。レビュー完了前に production-ready な「承認済み」とは扱わない。
- **N3 handoff:** Issue #66 は、この packet の exact story leaves と shared place-name table を production catalog / lookup へ統合する。専用 renderer を追加せず、unknown / optional English fallback を検証する。
- **U1 handoff:** Issue #63 は、上記 UI identity と役割の区別を UI copy packet に取り込み、visible / accessible copy を確定する。`Newspaper` を room / station label に置換しない。
- **U3 handoff:** Issue #67 は N3 と U1 の承認結果を再利用し、同一 fresh session の Courthouse → Newspaper を最終 browser acceptance 単位にする。

本 copy-only change は implemented player-facing coverage、production behavior、runtime evidence、frontier の採用経路を変更しない。したがって `PROJECT_STATUS.md` の実装済み coverage は更新せず、進行計画 B に担当、成果物、review gate、後続 handoff だけを記録する。
