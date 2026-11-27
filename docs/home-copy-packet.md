# 2041年の自宅訪問の本文と鍵操作の copy packet

## 承認範囲

H1 の独立 Sol は、映画候補Aの96送信に自宅往復15送信を加えた経路を採択した。
PR #124 は Full CI `45969606988` の成功後、`5a9533920b9b543ffa015809fb2ba36d5520ee41` でマージされた。
本書は H2 [#121](https://github.com/5gmt/mind-forever-voyaging/issues/121) の英日文言の承認候補である。
独立 Sol の copy approval とマージ後に H3 が実装する。 [H1 採択レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/124#pullrequestreview-6084630653) [Full CI](https://github.com/5gmt/mind-forever-voyaging/actions/runs/45969606988) [H2 開始記録](https://github.com/5gmt/mind-forever-voyaging/issues/121#issuecomment-7214645528)

原文は [H1 の採択 fixture](../tests/fixtures/parchment-home-runtime-observed.json)（blob `4d492ec6c4072a27adb0bf94145703ed21dbe521`）を正本とする。
`S1` は `sessions[0]` の通常フォーム、`S2` は `sessions[1]` の現行 UI 併用、`P` は `lockedDoorProbe` を示す。
`S1:96:1` は `sessions[0].observations[96].presentation.lines[1].text` で、observation と line は0始まりとする。
`A99` のような表記は S2 の `surfaceAudit` を実送信番号の `afterSubmission` で参照する。 [実測記録](home-runtime-evidence.md) [Home 計画](plans/2041-home-fieldwork.md)

原文を照合した Release 79 の SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`。
採択経路の送信順と既存の録画窓は H1 の実測に従う。

## 初回2041年の原作本文

見出しは `title`、残りは `prose` として既存の ordinary projector で表示する。
表の scope は正規の Part I の初回2041年シミュレーションとし、観測時の room ID、command、原文一行の組で選ぶ。
新規本文の識別子は H3 の `part1.simulation.home.*` に対応し、履歴の観測時 scope は計画の `home2041` に従う。
Command は大文字小文字をそろえ、表にある既存の英語方向 alias を許容する。
H1 の `sw`、`record`、`look`、`record off` はそれぞれの大文字表記と同じ command として照合する。
長い方向 alias は既存の移動 UI が組み立てる英語を含む。 [既存の出口データ](../app/world-data.ts)

| 本文の識別子 | Fixture | Exact English | 日本語 | 観測時 room | Command | 扱い |
| --- | --- | --- | --- | --- | --- | --- |
| `southway-heading` | `S1:96:1`、`S2:96:1`、`P:7:1`、`S1:107:1`、`S2:107:1` | `Southway & Park` | `サウスウェイ通りとパーク通り` | `SOUTHWAY-AND-PARK` | `S` / `SOUTH` / `E` / `EAST` | 必須、見出し。往路と帰路。 |
| `building-heading` | `S1:97:1`、`S2:97:1`、`P:8:1`、`S1:106:3`、`S2:106:3` | `Parkview Apartments` | `パークビュー・アパート` | `PARKVIEW-APARTMENTS` | `W` / `WEST` / `E` / `EAST` | 必須、見出し。建物入口。 |
| `hall-heading` | `S1:99:3`、`S2:99:3`、`P:11:3`、`S1:105:1`、`S2:105:1` | `Hall Near Your Apartment` | `自宅前の廊下` | `PARKVIEW-HALL` | `IN` / `S` / `SOUTH` | 必須、見出し。入館と居間からの帰路。 |
| `living-room-heading` | `S1:101:1`、`S2:101:1`、`S1:103:1`、`S2:103:1` | `Living Room` | `居間` | `LIVING-ROOM` | `N` / `NORTH` / `LOOK` | 必須、見出し。入室と室内の再描写。 |
| `southway-busy` | `S1:96:2` | `Southway bends sharply at this intersection, leading east and southwest. Park Street begins here and heads north. There are new buildings on the northeast and western corners, and older-looking buildings to the northwest and southeast. A grocery store, its brightly lit window heaped with food, spans the southern side of the street. The sidewalks and street are crowded with people.` | `ここでサウスウェイ通りは大きく折れ、東と南西に延びている。パーク通りはこの交差点から北へ延びる。北東と西の角には新しい建物があり、北西と南東の角には古めかしい建物がある。通りの南側いっぱいに食料品店があり、明るく照らされたショーウィンドウには食べ物が山積みになっている。歩道も車道も人で混み合っている。` | `SOUTHWAY-AND-PARK` | `S` / `SOUTH` | 可変の本文。混雑している版。 |
| `southway-quiet` | `S2:96:2` | `Southway bends sharply at this intersection, leading east and southwest. Park Street begins here and heads north. There are new buildings on the northeast and western corners, and older-looking buildings to the northwest and southeast. A grocery store, its brightly lit window heaped with food, spans the southern side of the street. The midday crowds have almost completely dispersed; the street is much less busy now.` | `ここでサウスウェイ通りは大きく折れ、東と南西に延びている。パーク通りはこの交差点から北へ延びる。北東と西の角には新しい建物があり、北西と南東の角には古めかしい建物がある。通りの南側いっぱいに食料品店があり、明るく照らされたショーウィンドウには食べ物が山積みになっている。昼どきの人混みはほとんど散り、通りはずっと空いている。` | `SOUTHWAY-AND-PARK` | `S` / `SOUTH` | 可変の本文。人混みが引いた版。 |
| `southway-probe` | `P:7:2` | `Southway bends sharply at this intersection, leading east and southwest. Park Street begins here and heads north. There are new buildings on the northeast and western corners, and older-looking buildings to the northwest and southeast. A grocery store, its brightly lit window heaped with food, spans the southern side of the street.` | `ここでサウスウェイ通りは大きく折れ、東と南西に延びている。パーク通りはこの交差点から北へ延びる。北東と西の角には新しい建物があり、北西と南東の角には古めかしい建物がある。通りの南側いっぱいに食料品店があり、明るく照らされたショーウィンドウには食べ物が山積みになっている。` | `SOUTHWAY-AND-PARK` | `S` / `SOUTH` | 可変の本文。混雑の記述がない版。 |
| `vestibule` | `S1:97:2`、`S2:97:2`、`P:8:2` | `You are in the vestibule of a typical high-rise city apartment building. A wide expanse of labelled buzzers and tiny mailboxes fills one wall. Glass doors lie closed to the west. Next to this inner door is a picturephone. The street lies to the east.` | `よくある都市の高層アパートの風除室にいる。壁の一面には、名札の付いた呼び鈴と小さな郵便受けがずらりと並ぶ。西側のガラス扉は閉まっている。その扉のそばにはテレビ電話がある。東に出ると通りだ。` | `PARKVIEW-APARTMENTS` | `W` / `WEST` | 必須の本文。入口への初到着。 |
| `building-door-opens` | `S1:98:1`、`S2:98:1`、`P:10:1` | `The door opens.` | `扉が開く。` | `PARKVIEW-APARTMENTS` | `OPEN DOOR WITH KEY` | 必須の応答。建物扉 `PARKVIEW-DOOR`。 |
| `building-door-locked` | `P:9:1` | `The door to the inner lobby is locked.` | `内側のロビーへ通じる扉には鍵がかかっている。` | `PARKVIEW-APARTMENTS` | `IN` | 拒否時の本文。建物入口に留まる。 |
| `elevator-to-hall` | `S1:99:1`、`S2:99:1`、`P:11:1` | `You enter the inner lobby and take the elevator up to your floor.` | `内側のロビーに入り、エレベーターで自宅のある階へ上がる。` | `PARKVIEW-HALL` | `IN` | 必須の移動本文。到着先は廊下。 |
| `hall` | `S1:99:4`、`S2:99:4`、`P:11:4` | `You are standing in the hall at the door to your apartment, which lies closed to the north. The stairs and elevators to the street are off to the east.` | `自宅の扉の前の廊下にいる。扉は北にあり、閉まっている。通りへ下りる階段とエレベーターは東にある。` | `PARKVIEW-HALL` | `IN` | 必須の本文。住居扉を開ける前。 |
| `apartment-door-opens` | `S1:100:1`、`S2:100:1` | `The door opens.` | `扉が開く。` | `PARKVIEW-HALL` | `OPEN DOOR WITH KEY` | 必須の応答。住居扉 `APARTMENT-DOOR`。 |
| `apartment-door-closed` | `P:12:1` | `The door is closed.` | `扉は閉まっている。` | `PARKVIEW-HALL` | `N` / `NORTH` | 拒否時の本文。廊下に留まる。 |
| `living-room` | `S1:101:2`、`S2:101:2`、`S1:103:2`、`S2:103:2` | `This is the large living area of your apartment, with a bedroom to the north and a kitchen to the east. The front door of the apartment, next to the couch on the south wall, is open. A huge window provides a panoramic view to the west.` | `ここは自宅の広々とした居間だ。北に寝室、東に台所がある。南の壁際にはソファがあり、その隣の玄関扉は開いている。西には大きな窓があり、外の景色を一望できる。` | `LIVING-ROOM` | `N` / `NORTH` / `LOOK` | 必須の本文。玄関扉が開いている版。 |
| `easel-and-word-processor` | `S1:101:4`、`S2:101:4`、`S1:103:4`、`S2:103:4` | `Jill's easel occupies a beautiful, well-lit spot near the window. Her current painting is on the easel. In one corner is the old word processor where you do your writing.` | `窓辺の明るく気持ちのよい一角に、ジルのイーゼルが置かれている。いま描いている絵がそこに載っている。部屋の一角には、執筆に使っている古いワープロがある。` | `LIVING-ROOM` | `N` / `NORTH` / `LOOK` | 必須の本文。空行を挟んだ次の一行。 |
| `romance-novel` | `S1:101:5`、`S2:101:5`、`S1:103:5`、`S2:103:5` | `There is a romance novel here.` | `恋愛小説が一冊ある。` | `LIVING-ROOM` | `N` / `NORTH` / `LOOK` | 任意の物の描写。 |
| `jill-painting` | `S1:101:6`、`S1:103:6` | `Jill is standing at the easel, working on her current painting.` | `ジルがイーゼルの前に立ち、絵を描いている。` | `LIVING-ROOM` | `N` / `NORTH` / `LOOK` | 任意。17:38の入室と17:40のLOOK。 |
| `jill-painting-greeting` | `S1:101:8` | `Jill looks up from her painting. "Hi, hon. Any news from your agent today?"` | `ジルが描きかけの絵から顔を上げる。「ねえ、あなた。今日、エージェントから何か連絡はあった？」` | `LIVING-ROOM` | `N` / `NORTH` | 任意。17:38の入室。 |
| `jill-tidying` | `S2:101:6`、`S2:103:6` | `Jill is walking around, neatening and cleaning the living room.` | `ジルが居間を歩き回りながら、片づけや掃除をしている。` | `LIVING-ROOM` | `N` / `NORTH` / `LOOK` | 任意。18:56の入室と18:58のLOOK。 |
| `jill-tidying-greeting` | `S2:101:8` | `Jill stops working for a moment and smiles at you. "Hi, hon. Any news from your agent today?"` | `ジルが手を休めて、こちらにほほえむ。「ねえ、あなた。今日、エージェントから何か連絡はあった？」` | `LIVING-ROOM` | `N` / `NORTH` | 任意。18:56の入室。 |
| `jill-reading` | `S2:103:8` | `Jill picks up a book and sits down on the couch to read it.` | `ジルが本を手に取り、ソファに腰を下ろして読み始める。` | `LIVING-ROOM` | `LOOK` | 任意。18:58のLOOK。 |
| `back-to-vestibule` | `S1:106:1`、`S2:106:1` | `You descend to the first floor and head for the lobby...` | `1階に下り、ロビーへ向かう……` | `PARKVIEW-APARTMENTS` | `E` / `EAST` | 必須の移動本文。廊下から建物入口へ。 |

混雑の三つの版は、交差点の説明と混雑の記述を含めた一行単位で照合する。
帰路の `Southway & Park` には見出しだけが出た。
家族や物の任意の行は、表示された turn でだけ訳す。
Jill の描写が変わった時刻は観測値として記録し、翻訳の照合条件には原文と turn を使う。
S2 の入室時の挨拶は `S2:101:8` にある。H1 台帳でこの挨拶を指す line 7 は fixture では空行である。 [H1 fixture](../tests/fixtures/parchment-home-runtime-observed.json)

入室の `N` と録画中の `LOOK` はどちらも居間の見出しと二つの固定本文を出した。
居間見出し、居間の説明、空行、イーゼルとワープロを含む一行の順を保ち、任意の描写を出力どおり後に続ける。
`IN` で入館した turn では移動文、空行、廊下の見出し、廊下の本文の順を保つ。
内側のロビーとエレベーターは移動文の語で、該当 turn の到着先は `PARKVIEW-HALL` である。
廊下から `E` で下りたときも、移動文と次の見出しの間に空行を置く。
入力 echo、prompt、raw status や runs の順序は採取されたものを使う。

`The door opens.` は建物側と住居側で同じ日本語を使う。
建物側は `PARKVIEW-APARTMENTS`、住居側は `PARKVIEW-HALL` の `OPEN DOOR WITH KEY` に対応する別の本文 identity とし、観測時 room を照合して選ぶ。
拒否は建物では `IN` と `PARKVIEW-APARTMENTS`、住居では `N` と `PARKVIEW-HALL` の組で観測された。
既存 UI の `north` は表の `NORTH` に対応する。
観測時 room は履歴に固定し、後の移動や言語切替ではその room のまま再表示する。

鍵を指定しない `OPEN DOOR`、`UNLOCK`、別の部屋、後続年、再入場、QA、RESTORE 直後の不明な状態、未観測の本文には、既存の English fallback を使う。
既承認の訳は従来の適用範囲で使う。
家族との会話、呼び鈴、家事、家具検査、他室の地名や本文は今回の承認範囲外とする。

## 既承認の本文と英語で表示する出力

| 本文の識別子 | Fixture | Exact English | 日本語 | 観測時 room | Command | 扱い |
| --- | --- | --- | --- | --- | --- | --- |
| `elm-park-heading` | `S1:95:1`、`S2:95:1`、`P:6:1`、`S1:108:1`、`S2:108:1` | `Elm & Park` | `エルム通りとパーク通り` | `ELM-AND-PARK` | `SW` / `N` / `NORTH` | 初回2041年。必須、既承認の見出し。 |
| `elm-park-description` | `P:6:2` | `This is the intersection of the north-south Park Street and the east-west Elm Street. A park entrance is on the northeast corner, and large, old-fashioned edifices occupy the other three corners of the intersection. The sidewalks and street are crowded with people.` | `ここは南北に走るパーク通りと東西に走るエルム通りの交差点だ。北東の角には公園の入口があり、残る三つの角には古風な大建築が建っている。歩道も車道も人で混み合っている。` | `ELM-AND-PARK` | `SW` | 初回2041年。既承認の本文。閉扉probeの往路だけで出た。 |
| `kennedy-park-heading` | `S1:94:1`、`S2:94:1`、`S1:109:1`、`S2:109:1` | `Kennedy Park` | `ケネディ公園` | `KENNEDY-PARK` | `SW` / `NE` | 初回2041年。必須、既承認の見出し。映画と自宅からの帰着。 |
| `record-on` | `S1:102:1`、`S2:102:1` | `Record feature activated.` | `記録機能を起動しました。` | `LIVING-ROOM` | `RECORD` | 初回2041年。必須、既承認の開始応答。 |
| `record-off` | `S1:104:1`、`S2:104:1` | `Record feature deactivated.` | `記録機能を停止しました。` | `LIVING-ROOM` | `RECORD OFF` | 初回2041年。必須、既承認の停止応答。 |
| `brief-home` | `S1:4:14`、`S2:4:14` | `   Visiting your own home or living quarters` | `自分の家、または居住区を訪れること` | `OFFICE` | `WAIT` | Part I通信。既承認の課題文、リストの字下げを保持。 |
| `key-inventory` | `S1:17:2`、`S2:17:2` | `   a key` | 原文表示 | `KENNEDY-PARK` | `INVENTORY` | 初回2041年。英語 fallback。`KEY` の観測位置。 |
| `half-full` | `S1:33:3`、`S2:33:3` | `WARNING: Record buffer is now half-full.` | 原文表示 | `ROYS-PAGODA` | `BUY MEAL` | 初回2041年。英語 fallback。録画中の警告。 |
| `twilight` | `S2:94:3` | `Twilight casts its long shadows across the city as the sun disappears in the west.` | 原文表示 | `KENNEDY-PARK` | `SW` | 初回2041年。英語 fallback。映画から帰着時の可変文。 |

`OFFICE` は `Dr. Perelman's Office` の既存 ID。Brief の三つの先頭空白は fixture と既承認 catalog に含まれる。
Elm & Park と Kennedy Park は既存の表記を再利用する。
自宅から Elm & Park に戻る `N` / `NORTH` では見出しの既訳を使い、閉扉 probe で見た交差点本文は実際に出た `SW` の該当 turn でだけ使う。
録画の既承認応答は、居間での開始と明示停止にも使う。 [既承認の地名と課題](initial-simulation-ui-copy-packet.md) [既承認の交差点本文](issue-56-courthouse-copy-packet.md) [既承認の録画応答](cinema-copy-packet.md)

## UI が表示する地名と対象

| Identity | English | 日本語 | 表示先と根拠 |
| --- | --- | --- | --- |
| 交差点 `SOUTHWAY-AND-PARK` | `Southway & Park` | `サウスウェイ通りとパーク通り` | 本文の見出しと place lookup。S2 A99 の東側の出口先。 |
| 建物固有名 | `Parkview Apartments` | `パークビュー・アパート` | `building-heading` に現れる建物名。地図の目的地表示には入口を明記する。 |
| 建物入口 `PARKVIEW-APARTMENTS` | `Parkview Apartments` | `パークビュー・アパート` | 本文の見出しと current place。S2 A99 の場所。 |
| 廊下 `PARKVIEW-HALL` | `Hall Near Your Apartment` | `自宅前の廊下` | 本文の見出しと current place。S2 A101 の場所。 |
| 居間 `LIVING-ROOM` | `Living Room` | `居間` | 本文の見出しと current place。S2 A103・A105 の場所。 |
| 帰路の交差点と公園 | `Elm & Park` / `Kennedy Park` | `エルム通りとパーク通り` / `ケネディ公園` | 既承認の place lookup。S2 A111 の current place と route nextPlace。 |
| Identity rail | `PRISM` / `Simulation` / `2041` / `Rockvil` | 既存の表示規則を再利用 | S2 A99・A101・A103・A105・A111。時代とモードを示す。場所名は current place の lookup に従う。 |
| 課題 index 8 | `Visit your home or living quarters` | `自分の家、または居住区を訪れること` | 既承認のチェックリストと課題表示。原作 brief の本文 identity は `brief-home`。 |
| 建物扉 `PARKVIEW-DOOR` | `Building entrance door` | `建物入口の扉` | 新規の操作対象。S1/S2 の obs 98 と P:10:1。 |
| 住居扉 `APARTMENT-DOOR` | `Apartment door` | `住居の扉` | 新規の操作対象。S1/S2 の obs 100 と P:12:1。 |
| 鍵 `KEY` | `key` | `鍵` | 操作文言に使う語。`key-inventory` は原文表示のまま。 |

新規の place lookup は、本文の scope と同じ確実な初回2041年に適用する。
その範囲の current place、compass と companion の出口、drawer、route nextPlace は同じ訳を参照する。
出口先の名前を表示できることと、実際に移動できたことは別であり、後者は command 後の raw status で確認する。
扉と鍵の ID は historical source に照合し、本文は H1 の実測に従う。 [場所と地図の定義](../app/StoryTools.tsx) [扉の定義](../source/apartment.zil) [鍵の定義](../source/prism.zil)

## 地図の入口表示

`home.targetId` は `PARKVIEW-APARTMENTS`。課題との対応は index 8 のままとする。
S2 の `guidedDraft` では `Your apartment, fieldwork destination` を選び、`Draft next step` で `sw` の draft を作った。
S2 A99 では地図に `Your apartment, fieldwork destination, current location` と `You have arrived.` が表示され、raw status は建物入口だった。
下表の入口の表記と到着文は、確実な初回2041年に適用する新規候補である。

| 表示箇所 | English | 日本語 | 表示条件 |
| --- | --- | --- | --- |
| 地図 hotspot、選択中の目的地、課題から地図を開くときの目的地の表示 | `Parkview Apartments entrance` | `パークビュー・アパートの入口` | 初回2041年の `home`。課題本文は既承認ラベルを使う。 |
| Hotspot の accessible name | `Parkview Apartments entrance, fieldwork destination` | `パークビュー・アパートの入口、調査目的地` | `home` が現在地以外のとき。 |
| Hotspot の現在地つき accessible name | `Parkview Apartments entrance, fieldwork destination, current location` | `パークビュー・アパートの入口、調査目的地、現在地` | raw 現在地が `PARKVIEW-APARTMENTS` のとき。 |
| ルートの到着表示と読み上げ文言 | `You have arrived at the building entrance.` | `建物の入口に着きました。` | `home` の経路が建物入口に到着したとき。 |

A99 の補助表示は `7/9 recorded`、居間で録画した後の A105 と帰着後の A111 は `8/9 recorded` だった。
H3 は居間の新しい `LOOK` とその固定本文、前後の録画状態、安定した次の line input を根拠に補助実績を更新する。
地図の到着表示は案内する場所への到着を伝える。
補助表示の件数は wrapper の観測に基づく。原作の正式評価は H1 では測定していない。

## Main と companion の鍵操作

S2 A99 では両方に `door Examine`、A101 では両方に `door Open` が表示された。
`door Open` が作る command は既存の `open door` で、H1 の鍵による二つの開扉はどちらもフォームから `OPEN DOOR WITH KEY` を送信した。
以下は実測で確認した同じ command に結びつける新規 UI 文言の候補である。
建物扉用と住居扉用の操作を場所で選び、main の command deck と companion の Explore に共通の判定と文言を適用する。 [実測した操作](home-runtime-evidence.md) [既存の場面操作](../app/StoryTools.tsx)

| 要素 | English | 日本語 | Visible label と accessible name |
| --- | --- | --- | --- |
| 鍵操作の区画 | `Home doors` | `自宅への扉` | Main、companion 共通の区画名。 |
| Guided の説明 | `Choose an action to draft a command you can edit before sending.` | `操作を選ぶと英語のコマンドを入力欄に用意します。編集してから送信できます。` | Main、companion 共通の表示文。 |
| Actions の説明 | `Choose an action to send its command once.` | `操作を選ぶと、そのコマンドを1回送信します。` | Main、companion 共通の表示文。 |
| 建物入口のボタン | `Open the building entrance door with a key` | `建物入口の扉を鍵で開ける` | 両配置、両モードで visible label と accessible name は同じ。対象は `PARKVIEW-DOOR`。 |
| 廊下のボタン | `Open the apartment door with a key` | `住居の扉を鍵で開ける` | 両配置、両モードで visible label と accessible name は同じ。対象は `APARTMENT-DOOR`。 |

| モード | ボタン一回の操作と送信契約 |
| --- | --- |
| Guided | 英語の `OPEN DOOR WITH KEY` を編集できる draft として入力欄に用意する。ユーザーが明示的に Send を選んで送信する。 |
| Actions | 一回の押下で英語の `OPEN DOOR WITH KEY` を一回送信する。以降の移動や録画は別の操作で行う。 |
| Classic | 既存の英語フォームで操作する。 |

初回2041年で `PARKVIEW-APARTMENTS` または `PARKVIEW-HALL` を raw status から特定でき、安定した line input を受け付けるときに限り、対応する鍵操作を表示して操作を受け付ける。
不明な room、busy、char input、入力の欠落、送信中は draft も送信も行わない。
ボタン文言は送る操作を伝える。鍵の所持、開扉の成否、移動の可否は canonical parser の応答に従う。
建物の `IN`、住居の `N`、帰路の方向は既存の操作を使う。
未知の拒否や別の command の応答は英語で表示する。

## 承認と検証

独立 Sol は raw fixture、訳文、配置ごとの操作と読み上げ文言、適用条件を照合する。
`*copy-packet.md` を含むため CI の分類は Full となる。
修正確定後の head/base で、レビューアが手動 Full と readiness を確認する。 [CI運用](ci-operation.md)
