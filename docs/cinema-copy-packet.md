# 2041年の映画館の本文と購入／入場操作の copy packet

## 承認対象と開始根拠

本書は F2 / [#109](https://github.com/5gmt/mind-forever-voyaging/issues/109) の copy 承認候補である。
F1 / #108 は [PR #114 の独立 Sol 成功採択](https://github.com/5gmt/mind-forever-voyaging/pull/114#pullrequestreview-5802952413)と merge `22945dc75b1fbc45b8d9b5e72248870e7dda495f` により完了し、[F2 開始通知](https://github.com/5gmt/mind-forever-voyaging/issues/109#issuecomment-6689238846)で開始条件が解除された。
本書の提出だけでは copy approval にならず、独立した Chat モード Sol の承認と merge を待つ。
F3 / #110 はその両方が完了するまで blocked とする。

正本は [候補Aの成功 fixture](../tests/fixtures/parchment-cinema-recording-a-observed.json)（blob `e1fbcdb8a77656553e83985526e8868613837161`）、[F1 台帳](cinema-recording-a-evidence.md)、[候補Aの設計](cinema-recording-a-design.md)と[映画計画](plans/2041-cinema-fieldwork.md)である。
2 fresh sessions の各96実送信、別 fresh 券なし probe の13実送信、156 UI samples を消費する。
旧 `parchment-cinema-runtime-failure.json` は容量不足の保存証拠として残し、成功本文や未観測値の補完には使わない。
照合 base は、CI保守 #115 / #116 を含む最新 default branch `3cde316b2038dafbc8c3699efd76310ccb13b58a` である。

承認単位は、新規の成功本文8 leaf、券なし拒否1 leaf、既承認7 leaf の再利用、役割別の地名と固有名、限定 BUY TICKET / IN の英日 UI copy、適用条件と fallback の一式である。
本 F2 は本書、計画、`PROJECT_STATUS.md` の文書3件だけを変更する。
Production catalog、UI code、fixture、tests、canonical / QA story、historical source、dependencies、CI設定、deployment は変更しない。

## 採択経路と観測位置

`S1/S2:i:l` は両 session の `observations[i].presentation.lines[l]`、`P:i:l` は独立した `noTicketProbe.observations[i].presentation.lines[l]` を指す。
`A{n}` は各 session の `surfaceAudit[n]` で、sample は `locale` と `mode` で特定する。
Index と line は0始まりである。
H / D / N / R / U は本書内の照合 ID で、実装用の新しい identity engine を指定するものではない。

採択された先行81送信は、裁判所の12–18番目だけを `SW NW RECORD LOOK RECORD OFF SE NE` にした候補Aである。
映画の追加15送信は次のとおりで、録画窓と訪問順を変更しない。

```text
NE N NE E NW
BUY TICKET
RECORD → IN → RECORD OFF → LOOK
SE W SW S SW
```

| Observation | 観測時 room identity | Actual command S1 / S2 | 対応 leaf |
| --- | --- | --- | --- |
| 80 | `MAIN-AND-KENNEDY` | `NE` / `ne` | R1 |
| 81 | `CENTRE-AND-KENNEDY` | `N` / `north` | R2 |
| 82 | `BODANSKI-SQUARE` | `NE` / `ne` | R3 / R4 |
| 83 | `MUSEUM-ENTRANCE` | `E` / `east` | H1 / D1 |
| 84 | `CINEMA` | `NW` / `nw` | H2 / D2 |
| 85 | `CINEMA` | `BUY TICKET` / `BUY TICKET` | D3。非録画の購入。 |
| 86 | `CINEMA` | `RECORD` / `record` | R6。録画開始。 |
| 87 | `CINEMA` | `IN` / `IN` | D4 / H3 / D5。鑑賞前後とも recording。 |
| 88 | `CINEMA` | `RECORD OFF` / `record off` | R7。明示停止。 |
| 89 | `CINEMA` | `LOOK` / `look` | H2 / D2。ロビーの通常入力。 |
| 90 | `MUSEUM-ENTRANCE` | `SE` / `se` | H1 のみ。初訪問本文を足さない。 |
| 91 | `BODANSKI-SQUARE` | `W` / `west` | R3 / R4 |
| 92 | `CENTRE-AND-KENNEDY` | `SW` / `sw` | R2 |
| 93 | `MAIN-AND-KENNEDY` | `S` / `south` | R1 |
| 94 | `KENNEDY-PARK` | `SW` / `sw` | R5。非録画、通常 line input。 |
| P:11 | `CINEMA` | `IN` | N1。未購入の別 fresh probe、非録画。 |

S1 は通常 form、S2 の往路は Guided map の編集可能 draft と明示 Sendを使い、`east` だけは companion exit の直接送信だった。
S2 の RECORD / OFF / LOOK は quick action、帰路は日本語 Actions compass の1押下1送信である。
F1 時点では BUY TICKET / IN の支援はなく、両 session とも通常 form から送信した。
後述の新しい購入／入場 UI copy を、実測済み UI の記述と混同しない。

## 新規 exact leaf の英日対応

H1–H3 は `kind: title`、D1–D5 と N1 は `kind: prose` の候補とする。
H3 は原作の run が `Style_normal` でも、本文内の見出しという role を持つ。
原文の行と空行は保ち、日本語の文が増えても別 leaf へ分割しない。

| ID / kind / evidence | Exact canonical English leaf | Japanese candidate |
| --- | --- | --- |
| H1; title; S1/S2:83:1,90:1 | `Museum Entrance` | `博物館入口` |
| H2; title; S1/S2:84:1,89:1 | `Cinema` | `映画館` |
| H3; title; S1/S2:87:3 | `Movie Theatre` | `上映室` |
| D1; prose; S1/S2:83:2 | `Standing on the south side of Bodanski Boulevard is the Railroad Museum. The street runs east toward the park and west toward the square. North of here is a car lot and to the northwest is a huge cinema complex.` | `ボダンスキー大通りの南側に、鉄道博物館が建っている。通りは東へは公園のほうに、西へは広場のほうに続いている。北には駐車場があり、北西には巨大な複合映画館がある。` |
| D2; prose; S1/S2:84:2,89:2 | `The Downtown Cinema Quad is a modern, four-theatre movie complex with all the latest holographic and personalized stereo technology. A marquee above the ticket "window" announces the current features. A hallway leads in to the theatres, and there are exits north and east to car lots, and southeast to the street.` | `ダウンタウン・シネマ・クアッドは、上映室が4つある近代的な複合映画館だ。最新のホログラフィー技術と、一人ひとりに合わせたステレオ音響を備えている。券売「窓口」の上の看板には、現在の上映作品が掲げられている。廊下は奥の上映室へ続き、北と東には駐車場へ、南東には通りへ出る出口がある。` |
| D3; prose; S1/S2:85:1 | `You insert your card into the ticket seller. A readout flashes "NEW BALANCE: $554" and a ticket pops out into your hands.` | `券売機にカードを差し込む。表示部に「NEW BALANCE: $554」の文字が光り、入場券が手元へ飛び出してくる。` |
| D4; prose; S1/S2:87:1 | `The usher takes your ticket and you step into the darkened theatre and find an empty seat.` | `案内係が入場券を受け取る。暗い上映室に足を踏み入れ、空席を見つける。` |
| D5; prose; S1/S2:87:4 | `You begin watching "Upbeat Patrol II," which is funny and fast-moving like the prequel, but seems to lack some of the originality and freshness. The soundtrack, locations, and special effects are all top notch. After about fifteen minutes, you decide you've seen enough, and head out to the lobby.` | `『アップビート・パトロールII』を見始める。前作と同じく笑えてテンポもよいが、独創性や新鮮さはいくらか欠けているように思える。サウンドトラック、ロケ地、特殊効果はいずれも一流だ。15分ほど見たところで、もう十分だと思い、ロビーへ戻る。` |
| N1; prose; P:11:1 | `You don't have a ticket.` | `入場券を持っていない。` |

### 意味と構造の確認

D1 は博物館が大通りの南側、通りが公園のある東と広場のある西へ延び、北に駐車場、北西に映画館がある位置関係を保つ。
「公園のほう」を、隣接する公園へ一手で移動できるという新しい出口に変えない。
本文中の「鉄道博物館」「ボダンスキー大通り」は D1 内の表記で、map `railroad` や別の展示館、通り全体の翻訳承認へ広げない。

D2 は4つの上映室からなる建物、最新のホログラフィー、一人ひとりに合わせたステレオ音響、券売「窓口」の上の看板、奥の上映室へ続く廊下、北／東の駐車場と南東の通りを保つ。
看板を電光式と断定したり、看板の具体的な上映一覧を追加したりしない。
D3 の readout は既承認の新聞購入応答と同じく、引用内の `NEW BALANCE: $554` を原文のまま残す。
翻訳対象は金額を含むこの exact leaf 一つであり、`$569` や購入価格 `$15` を本文に加えず、未知額を許す pattern にしない。
D4 は券を受け取る案内係、暗い上映室、空席を見つける動作を保ち、券を所持しているという wrapper の推定文へ置き換えない。

D5 は前作と同じ笑いとテンポのよさ、独創性と新鮮さへの控えめな不満、サウンドトラックとロケ地と特殊効果の高評価を併存させる。
`seems` と `some` の程度を残し、映画全体がつまらないという断定や、前作を見たという未記載の経験を足さない。
映画名の `II`、約15分で十分だと判断してロビーへ戻る内容を保持する。
15分はこの leaf の原文にもある値であり、別の raw clock を補完した表示ではない。
N1 は F1 の自然な未購入 IN の拒否だけから承認候補にし、source 由来の合成拒否ではない。

| Turn | 保持する行順 |
| --- | --- |
| 83 | echo → H1 → D1 → blank → optional leaf（S1だけ）→ blank → input |
| 84 / 89 | echo → H2 → D2 → blank → input |
| 85 | echo → D3 → blank → input |
| 87 | echo → D4 → blank → H3 → D5 → blank → input |
| 90 | echo → H1 → blank → input |
| P:11 | echo → N1 → blank → input |

Optional が出ていない S2:83 に空の optional paragraph を作らず、return の H1 に D1 を補わない。
Echo、prompt、input run、raw `GridWindow` の mode / date / time / `Location:` はこの翻訳表の対象外である。
本文の `Movie Theatre` を現在地や map の新 room にせず、観測時の `CINEMA` scope を維持する。

## 既承認 leaf と qualifier の再利用

表の日本語は現行 `app/localization.ts` と既承認 packet の値を再利用する。
先行六課題、裁判所の録画窓、九課題の並び、録画開始／停止の日本語を再承認や変更する作業ではない。

| ID / evidence | Exact canonical English leaf | 既承認 Japanese |
| --- | --- | --- |
| R1; S1/S2:80:1,93:1 | `Main & Kennedy` | `メイン通りとケネディ通り` |
| R2; S1/S2:81:1,92:1 | `Centre & Kennedy` | `センター通りとケネディ通り` |
| R3; S1/S2:82:1,91:1 | `Bodanski Square` | `ボダンスキー広場` |
| R4; S1/S2:82:2,91:2 | `There is a newspaper dispenser chained to a lamp post on the corner.` | `角の街灯には新聞販売機が鎖でつながれている。` |
| R5; S1/S2:94:1 | `Kennedy Park` | `ケネディ公園` |
| R6; S1/S2:86:1 | `Record feature activated.` | `記録機能を起動しました。` |
| R7; S1/S2:88:1 | `Record feature deactivated.` | `記録機能を停止しました。` |

[新聞 packet](newspaper-copy-packet.md)と[初期 Simulation UI packet](initial-simulation-ui-copy-packet.md)、現行 catalog を再利用する。
R3 / R4 の復路 `W/west` は本文が同じでも新しい観測 qualifier であり、現在の catalog ですでに扱えるとは称さない。
F3 はこの新しい qualifier を明示的に接続する。

| 対象 | 採択する command qualifier（大文字化後） | 実測 S2 alias |
| --- | --- | --- |
| H1 | `E` / `EAST` / `SE` | `east`, `se` |
| H2 / D2 | `NW` / `LOOK` | `nw`, `look` |
| H3 / D4 / D5 / N1 | `IN` | `IN`（両 full sessions と probe） |
| D1 | `E` / `EAST` | `east` |
| D3 | `BUY TICKET` | `BUY TICKET` |
| R1 | `NE` / `S` / `SOUTH` | `ne`, `south` |
| R2 | `N` / `NORTH` / `SW` | `north`, `sw` |
| R3 / R4 | `NE` / `W` / `WEST` | `ne`, `west` |
| R5 | `SW` | `sw` |
| R6 / R7 | `RECORD` / `RECORD OFF` | `record`, `record off` |

大文字小文字の正規化と、`E` / `EAST`、`W` / `WEST` 等の有限 alias の対応を区別する。
`ENTER THEATRE`、`ENTER CINEMA`、`GO IN`、`BUY A TICKET`、`READ TICKET`、`OUT` や日本語 parser input を新たな応答 qualifier として承認しない。
新しい UI の表示語 `Enter theatre` は canonical `IN` を作る label で、同名 command を追加するものではない。

## 場所と固有名と UI identity

| Role / identity | English / observed value | Japanese candidate / reuse | 適用範囲 |
| --- | --- | --- | --- |
| Room `MUSEUM-ENTRANCE` | `Museum Entrance` | `博物館入口`（H1） | 初回2041年の exact heading、current-place、drawer header、compass / context の出口先、route nextPlace。同じ place lookup を使い、別の地名辞書を増やさない。 |
| Room `CINEMA` | `Cinema` | `映画館`（H2） | 同じ既存 place surfaces。Raw `Location: Cinema` や world metadata を rename しない。 |
| 本文内見出し | `Movie Theatre` | `上映室`（H3） | CINEMA 内の IN 応答の title。一時的に別 room が観測されたとは扱わない。 |
| 建物固有名 | `Downtown Cinema Quad` | `ダウンタウン・シネマ・クアッド`（D2内） | D2 に限る。Room 名や map label の置換ではない。 |
| 映画名 | `Upbeat Patrol II` | `アップビート・パトロールII`（D5内） | D5 に限る。別年の映画や未観測の上映案内を追加しない。 |
| 限定操作の対象 `TICKET` | 現行の言及後の対象名は `ticket`。新規 target label は U4。 | `入場券` | 初回 CINEMA の購入操作だけ。所持品全体、別施設の券、Read / Take の翻訳へ広げない。 |
| Map `movie`、target `CINEMA`、assignment index 7 | Visible `CINEMA`、accessible の基礎は `Cinema` | `映画館` | Hotspot、route destination、checklist destination。H2 と同じ表記でも map identity は別。 |
| Map `movie` の accessible name | `Cinema, fieldwork destination` / `Cinema, fieldwork destination, current location` | `映画館、調査目的地` / `映画館、調査目的地、現在地` | 現行 suffix を再利用。現在地と選択先を混同せず、visible label に suffix を足さない。 |
| Map `railroad`、target `MUSEUM-ENTRANCE` | `RAILROAD MUSEUM` / `Railroad Museum` | English fallback を保持 | D1 内の「鉄道博物館」や H1 をこの map identity へ自動流用しない。 |
| 課題 index 7（九課題の8番目） | UI `Go to a movie`、原作 brief `   Going to a movie` | `映画を見に行くこと`（既承認） | Checklist / current task と原作 list item。先頭空白の構造を保ち、映画名や正式評価へ置き換えない。 |
| Identity rail と隣接未承認地名 | PRISM / Simulation / 2041 / Rockvil、Skycar Lot 等 | 既存 copy / English fallback | 新しい地名の追加を rail 全体や未採択の駐車場の翻訳承認にしない。 |

Room / map の新しい日本語は初回2041年の既存 fieldwork presentation 境界に接続する。
操作の CINEMA 限定条件を、往路の route nextPlace に「博物館入口」を表示できない条件へ広げない。
逆に、地名の lookup 登録だけを理由に別年や RESTORE 不明時の新規翻訳を有効にしない。

## 限定購入／入場 UI の提案

以下の U1–U8 は F3 で実装する新しい英日 copy の承認候補であり、実測済みの UI ではない。
F1 の A5（購入前）、A6（購入後）、A8（鑑賞直後）で、main / companion の current label、accessible name、lang と draft を照合した。
購入前には `movie theatre Examine`、`ticket seller Examine`、`marquee Read` があるが、専用 BUY TICKET / IN はない。
鑑賞直後には generic `ticket` の Examine / Take / Buy が現れるが、その表示だけを「入場前から使える専用購入操作」と呼ばない。

両配置は既存 SceneActions の main command deck と companion context の slot を使い、同じ copy、eligible 条件、draft / send / disabled の経路に接続する。
Classic に新しい操作 section や checklist を追加しない。
Ticket が言及済みの対象一覧にない場面でも出す限定操作なので、section を「この場面で言及された語」の抽出結果と説明しない。

| ID / role | Proposed English | Japanese candidate | Visible / accessible / canonical command |
| --- | --- | --- | --- |
| U1; 両 mode の section landmark | `Cinema visit` | `映画館での体験` | Section の accessible name。Main / companion で共通。 |
| U2; 両 mode の visible heading | `Ticket purchase and theatre entry` | `入場券の購入と上映室への入場` | 購入済みや入場成功を示す見出しにしない。 |
| U3; Guided instruction | `Choose an action to draft a command you can edit before sending.` | `操作を選ぶと英語のコマンドを入力欄に用意します。編集してから送信できます。` | 押下だけでは送信しない。 |
| U4; Guided 購入 target / action hint | `Ticket` / `Buy` | `入場券` / `購入する` | Button の accessible name は `Ticket Buy` / `入場券 購入する`。Editable draft は `BUY TICKET`。 |
| U5; Guided 入場 target / action hint | `Theatre` / `Enter` | `上映室` / `入る` | Accessible name は `Theatre Enter` / `上映室 入る`。Editable draft は `IN`。架空の room / exit を作らない。 |
| U6; Actions instruction | `Choose an action to send its command once.` | `操作を選ぶと、そのコマンドを1回送信します。` | Main / companion とも1押下1送信。 |
| U7; Actions 購入 button | `Buy ticket` | `入場券を購入する` | Visible / accessible name を同じ文言にし、`BUY TICKET` を1回送信。 |
| U8; Actions 入場 button | `Enter theatre` | `上映室に入る` | Visible / accessible name を同じ文言にし、`IN` を1回送信。 |

U4 / U5 の対象名と action hint の間は、現行 Guided と同じ空白を持つ accessible name とする。
最終 DOM での名前、visible copy との一致、lang、focus は F3 の aria snapshot と実ブラウザで確認する。
この構成は copy と既存 slot の契約であり、新 renderer、汎用取引 engine、全 scene の shell 変更を要求しない。

### 表示と送信の条件

| 条件 | Main / companion の新規操作の挙動 |
| --- | --- |
| 初回2041年の採択範囲 | 既存 `initial2041Presentation` 相当の既知な初回 simulation / fieldwork、非 QA、raw room `CINEMA`、line input だけを対象にする。EN / JA で可用性を変えない。 |
| Guided で押下 | `BUY TICKET` または `IN` を English input に下書きする。編集可能で、明示 submit 前に原作へ送らない。 |
| Actions で押下 | 選んだ1 command だけを1回送る。連打中の busy も既存の accepts-input 判定で送信しない。 |
| Busy / input を受け付けない状態 | 既存機構で無効化し、draft 作成や送信をしない。 |
| Char input / 入力種別不明 | 新しい2操作を出さない。Character menu の代わりに line command を送らない。 |
| 未購入、購入応答が未確認 | 券の所持を wrapper の履歴だけで推定して IN を拒否しない。原作への試行を保ち、原作の拒否を表示する。 |
| 録画が off | 新規操作の可用性条件にしない。既存 reminder / quick Record を使い、自動で RECORD を挿入しない。 |
| 対象外の年 / phase、別室、QA、再入場、RESTORE 後の不明状態 | 新しい支援は出さず、未承認の本文と UI copy は既存 English fallback。通常の canonical form の扱いを狭めない。 |

購入と入場は別操作で、自動購入、購入後の自動 IN、自動録画、自動移動をしない。
Button を表示した事実、押下した事実、原作の購入成功、鑑賞、録画成立、補助7/9を別の事実として扱う。
D3 の成功本文があっても、未実行の鑑賞や録画まで成立した表示にしない。
既存 GLOBAL / LOCAL-GLOBALS guard を緩めたり、一般 Enter / Take / Read を代用にしたりしない。

## 共通 UI と fallback の境界

地図と経路の共通文言は [初期 Simulation UI packet](initial-simulation-ui-copy-packet.md)と現行 helpers を再利用する。
`Route to` / `目的地への経路`、`Draft next step` / `次の移動を入力欄へ`、`Take next step` / `次の移動を実行`、`Clear` / `解除`、current-location suffix を新しく訳し直さない。
Quick Record / Stop recording / Look の既承認「録画開始」「録画停止」「見る」、reminder の「録画は停止中」「録画を開始」、九課題と補助進捗の動的表示を再利用する。
{steps}、{count}、現在地、selected destination、recording、year は実観測と既存 state に従い、固定値を埋めない。
Translated UI text は `lang=ja`、unknown / untranslated leaf と English draft / canonical command は `lang=en` とし、raw GridWindow を翻訳しない。

本文は exact leaf と上記の有限 qualifier、観測時 room、初回2041年 scope を合わせる。
同じ英文でも別室、別年、Part II、再入場、QA、RESTORE 不明では新規訳を当てず、canonical English を保持する。
正しく記録された既存の日本語履歴はその観測時 scope を保持し、移動後の current room で再判定して書き換えない。
翻訳の成立を recording mode に依存させず、非録画で同じ適用範囲の exact leaf が出ても、それを録画加点に使わない。
非録画の自然経路や回復境界の追加検証は F3 が担当し、F1 の録画成功 session と合成しない。

| English fallback / 対象外 | 根拠と扱い |
| --- | --- |
| `WARNING: Record buffer is now half-full.` | 成功 fixture の両 session index33 / BUY MEAL で観測。既承認の扱いを維持し、今回の翻訳には追加しない。 |
| `WARNING: Record buffer full. Auto-deactivation of record feature.` | 旧失敗証拠の停止理由。F1成功の根拠や新規 copy に流用しない。 |
| `A man with a shaved head asks your views on some obscure religious point, then wanders off into the crowds.` | S1:83:4 の optional。原文を保持。 |
| `A skycopter drones by far overhead and disappears into the distance.` | S2:80:3 の optional。原文を保持。 |
| 未知の購入残高、資金不足、二重購入や繰返しの未採択応答 | D3 の `$554` exact leaf 以外を一般化しない。未観測の文を source だけから翻訳承認しない。 |
| READ TICKET の印字と乱数、marquee の読取り、ticket seller / movie theatre の未実行の Examine / Smell、他の映画館 | 本文での言及や existing UI label の観測を、その操作応答の観測と扱わない。 |
| 先行区間の時刻依存 crowd、その他の割込み | 既存に承認された exact leaf 以外は原文のまま。映画 packet の語彙へ自動追加しない。 |

## 検証と独立レビューへの引継ぎ

Local で新規9 leaf と再利用7 leaf の全16原文を45実位置へ照合し、各 room と有限 command alias、再利用する7つの日本語が現行 catalog と一致することを確認した。
相対ファイルリンク30件、canonical checksum、`git diff --check` は成功した。
英日対応の意味、cardinal directions、金額、固有名と role、UI の実測／提案の区別、対象外 fallback を実装者が点検した。
既存の `node --test tests/ci/*.test.mjs` は8件すべて成功し、予定する文書3パスが Full 分類になることも確認した。
本 F2 では local の lint / tsc / build、`npm test` のアプリ unit suite、full E2E、新しい runtime capture、手動証拠保存や ZIP 監査は未実施である。
未実装の日本語表示を既存 F1 のブラウザ成功と混同しない。

#115 / #116 の [CI運用](ci-operation.md)では、copy packet は文書だけでも Full 分類である。
Allowlist や workflow を変更せず、最終 head の49 unit、62 browser の3群と常時 CI policy / `ci-gate` の結果を PR の checks で確認する。
通常 PR / push は artifact を保存しないため、artifact と expiry は「通常実行のため対象なし」と記録し、古い #114 artifact を本 PR の証拠に代用しない。
F3 の Work 最終 ZIP 監査は、容量と監査時期を確認した明示的な手動 Full 証拠実行に残す。

本書の作成と原文照合は Codex、copy approval は独立した Chat モード Sol が担当する。
新規9 leaf、既承認7 leaf の再利用、役割別の表記、U1–U8 と表示／送信条件が Sol に承認され merge されるまで、F3 の catalog / UI 統合を開始しない。
Head / base、review 後の差分、未解決事項、current-head CI は提出 PR を正本とし、自己参照 SHA だけの追加 commit を作らない。
