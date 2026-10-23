# Issue #79 — 2041年レストラン調査 日本語 copy packet

## 状態・根拠・承認単位

**M2 は [#85 の Sol 独立 copy review](https://github.com/5gmt/mind-forever-voyaging/pull/85#pullrequestreview-5615116876)で本文 R1–R7 と限定 meal UI の英日 copy を承認し、`7a0568f76001909cfd39a1bbdbcb61fd1f6dd28a` へ merge 済み。#79 完了、[#80 の開始 gate](https://github.com/5gmt/mind-forever-voyaging/issues/80#issuecomment-6342202848)は解除された。以下の候補表・現行 UI の記述は M2 提出時点の記録。M3 の実装・受入は [受入文書](restaurant-fieldwork-acceptance.md)で管理する。**

M1 #78 は [PR #84 の独立採択レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/84#pullrequestreview-5614358178)と merge `8d5fea7ff9d5909a65e55a4122bfc7805b0e581c` で完了した。[M2 開始判断](https://github.com/5gmt/mind-forever-voyaging/issues/79#issuecomment-6341140821)に従い、採択済み A案の `tests/fixtures/parchment-restaurant-recording-a-observed.json` を story の唯一の根拠とする。以下の `S1/S2:index:line` は各 session の `observations[index].presentation.lines[line]`、index / line は0始まりである。

UI の現況は同 base の `app/PrismEdition.tsx`、`app/StoryTools.tsx`、`app/localization.ts` と、旧 fixture `parchment-restaurant-runtime-observed.json` の `sessions[2].surfaceAudit`（48 sample）で照合する。旧 fixture は現行 UI 監査の根拠であり、採択経路・新規 story copy の代用にしない。[Astra の限定 meal UI 設計](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6316815976)と [設計同期](plans/2041-restaurant-followup-decision.md)を維持する。

本文・必要な地名・地図 / 課題 label・限定対象操作・その visible / accessible な周囲の説明を一つの承認単位とする。本 PR は文書のみ。Catalog、component、guard、fixture、source、canonical story、tests を変更しない。

## 採択経路と context qualifier

初回 entry / recording loop、Courthouse、新聞の購入・四段落の読書は既存 copy を再利用する。新聞は現地 `RECORD → BUY NEWSPAPER → READ NEWSPAPER → RECORD OFF` の後に旧徒歩順で公園へ戻る。以下が追加 restaurant 区間である。既存 Courthouse / Newspaper milestone の受入経路や fixture は遡って変更しない。

| Observation index | Command / 原作状態 | M2 の対象 |
| --- | --- | --- |
| 28 | `SW`; Kennedy Park → Elm & Park、非 recording | 既承認 heading のみ。初訪問描写や crowd variant を再訪問へ補わない。 |
| 29 | `W`; Elm & University、非 recording | R1 heading、R2 初訪問描写。 |
| 30 | `W`; Elm Underpass、非 recording | R3 heading、R4 初訪問描写。 |
| 31 | `S`; Roy's Pagoda、非 recording | R5 heading、R6 来店描写。 |
| 32 | `RECORD`; Roy's Pagoda、recording | 既承認起動応答。Half-full は原文を保持する。 |
| 33 | `BUY MEAL`; Roy's Pagoda、22分経過後も recording | R7 の食事・fortune・支払・残高を含む一段落。 |
| 34 | `RECORD OFF`; Roy's Pagoda、非 recording | 既承認停止応答。 |
| 35–38 | `N E E NE`; Elm Underpass → Elm & University → Elm & Park → Kennedy Park、非 recording | R3 / R1 と既承認の heading だけ。初訪問描写を再表示しない。 |

適用範囲は採択済みの fresh 初回2041年・Simulation Mode のこの経路。State detection は raw English、command は canonical English のままとする。Command echo、空行、heading / prose の境界、終端 `>`、current input identity は翻訳文字列へ埋め込まない。

## 新規 exact story leaf → Japanese 候補

両 session の同じ index / line で全文一致する7 leaf。M3 は command / role qualifier を維持し、部分一致や source からの補完で対象を広げない。

| ID / evidence / qualifier | Exact canonical English leaf | Japanese copy candidate |
| --- | --- | --- |
| R1; S1/S2:29:1,36:1; `W` 初訪問 / `E` 帰路の heading | `Elm & University` | `エルム通りとユニバーシティ大通り` |
| R2; S1/S2:29:2; `W` 初訪問 prose | `University Avenue forks off to the northwest, meandering into the campus which spans the north side of Elm Street here. A tall apartment complex is on the south side of the street. The top of some steps indicate an entrance to the Tubes.` | `ユニバーシティ大通りが北西へ枝分かれし、このあたりではエルム通りの北側に広がるキャンパスの中へ、曲がりくねって延びている。通りの南側には高層の集合住宅がある。階段の上端が、地下交通網チューブへの入口の目印になっている。` |
| R3; S1/S2:30:1,35:1; `W` 初訪問 / `N` 帰路の heading | `Elm Underpass` | `エルム通りの高架下` |
| R4; S1/S2:30:2; `W` 初訪問 prose | `Elm Street passes under an elevated roadway, a relic of the last century's interstate highway system. A Chinese restaurant fills the space under the highway to the south, and a bar is nestled under the roadway north of here. Elm leads eastward, to downtown, and westward toward the suburbs.` | `エルム通りは、前世紀の州間高速道路網の名残である高架道路の下をくぐっている。南側の高速道路の下の空間を中華料理店が占め、ここから北の高架下にはバーがこぢんまりと収まっている。エルム通りは東へ行くとダウンタウンへ、西へ行くと郊外へ続いている。` |
| R5; S1/S2:31:1; `S` 来店 heading | `Roy's Pagoda` | `ロイズ・パゴダ` |
| R6; S1/S2:31:2; `S` 来店 prose | `This is a small Chinese restaurant, crowded with students. There is an exit to the north.` | `ここは学生で混み合う小さな中華料理店だ。北に出口がある。` |
| R7; S1/S2:33:1; `BUY MEAL` 食事 / 支払 prose | `You order a bowl of Hot and Sour soup and some assorted appetizers. The food arrives promptly, steaming hot, delicately spiced, delicious. Afterward, your check arrives with a typical fortune cookie and a plate of lychee nuts. The fortune reads: "Prosperity does not equal happiness." You pay with your credit card. After a moment, the waiter returns your card, informing you that your account has been debited for $30 and that your new balance is $569.` | `酸辣湯を一杯と、前菜を何品か注文する。料理はすぐに運ばれてくる。湯気が立つほど熱く、香辛料が繊細に利いていて、おいしい。食後には勘定書きが、よくあるフォーチュンクッキーと、ライチの実をのせた皿とともに届く。おみくじには「繁栄は幸福と同じではない。」とある。クレジットカードで支払う。少しして、ウェイターがカードを返し、口座から$30が引き落とされ、新しい残高は$569になったと告げる。` |

### 文体・意味・値

- Room / story は既存 [新聞 packet](newspaper-copy-packet.md)と同じ常体、wrapper UI は既存 [初期 Simulation UI packet](initial-simulation-ui-copy-packet.md)の用語・丁寧体に揃える。
- R2 は北西への分岐、曲がりくねる道、エルム通りの北の campus、南の集合住宅、階段と Tubes の入口の関係を保つ。`University Avenue` は「ユニバーシティ大通り」、`Tubes` は既承認の「地下交通網チューブ」を再利用する。
- R4 の `relic` は道路が廃止されたという断定にしない。高架道路・前世紀の州間道路網・南の中華料理店・北のバー・東の downtown・西の suburbs を省略しない。`Elm Underpass` は通りが高架道路の下を通る場所として「エルム通りの高架下」とする。
- `Roy's Pagoda` は店の固有名「ロイズ・パゴダ」。地図の一般課題 label「レストラン」、場面対象「食事」と置き換えない。
- R7 は注文、料理の到着と熱さ・香辛料・味、食後の勘定書き・cookie・lychee、fortune、credit card、waiter がカードを返して支払結果を告げる順序を保つ。`Hot and Sour soup` は料理名「酸辣湯」。`Prosperity does not equal happiness.` は「繁栄は幸福と同じではない。」とし、「繁栄すれば不幸になる」などの因果を加えない。
- `$30` / `$569` は実測された exact leaf 内の値をそのまま保持し、円換算やテンプレート化、別残高の補完をしない。22分は raw status の前後差であり、R7 本文へ新しい一文や UI timer を追加しない。別の値を返す leaf はこの承認の対象外として English fallback。

## 既承認 copy の再利用と構造

| Exact English | 再利用する Japanese | 根拠 / 構造 |
| --- | --- | --- |
| `Elm & Park` | `エルム通りとパーク通り` | S1/S2:28:1,37:1。既存 Courthouse / 新聞 packet、heading only。 |
| `Kennedy Park` | `ケネディ公園` | S1/S2:38:1。既存初回 Simulation / 新聞 packet、heading only。 |
| `Record feature activated.` | `記録機能を起動しました。` | S1/S2:32:1。既承認 recording response。 |
| `Record feature deactivated.` | `記録機能を停止しました。` | S1/S2:34:1。既承認 recording response。 |

Index 29 / 30 / 31 は echo → heading → prose → blank → terminal input。Index 32 は echo → activated → blank → half-full warning → blank → input。Index 33 は echo → R7 一段落 → blank → input。Index 34 は echo → deactivated → blank → input。帰路35–38は echo → heading → blank → input。同じ heading が別 turn に現れても history / command identity を潰さず、空行を翻訳文へ折り込まない。初回 prefix、Courthouse、新聞四段落の既承認文面を再承認・書換えする作業ではない。

## Room / map / assignment / scene identity

Raw `GridWindow` の mode / date / time / `Location:` は English のまま。以下の room copy は既存 shared lookup に M3 が追加し、story heading、wrapper currentPlace、drawer header、compass / context exit target、route nextPlace が再利用する。重複した別の地名辞書を作らない。

| Role / identity | Exact English / current value | Japanese candidate / reuse | 表示・適用先 |
| --- | --- | --- | --- |
| Room `ELM-AND-UNIVERSITY` | `Elm & University` | `エルム通りとユニバーシティ大通り`（R1） | 対応する exact room heading / raw status で解決した既存 place surface。 |
| Room `ELM-UNDERPASS` | `Elm Underpass` | `エルム通りの高架下`（R3） | 同上。 |
| Room `ROYS-PAGODA` | `Roy's Pagoda` | `ロイズ・パゴダ`（R5） | 同上。map assignment label には流用しない。 |
| Map / route destination `meal`, target `ROYS-PAGODA`, assignment index 0 | `Restaurant` | `レストラン` | Hotspot の visible label、route destination、compass の destination、checklist の destination 小見出し。Room 名ではない。 |
| Hotspot accessible name | `Restaurant, fieldwork destination` / `Restaurant, fieldwork destination, current location` | `レストラン、調査目的地` / `レストラン、調査目的地、現在地` | 既存 suffix の組合せを再利用。現在地 suffix は動的。Visible label には suffix を付けない。 |
| Assignment 0 / checklist / current task | `Eat a meal in a restaurant` | `レストランで食事をすること`（既承認） | 九課題の順序・役割を維持。店名へ置き換えず、正式な達成評価とは呼ばない。 |
| 新設限定 scene target `MEAL` | 現行 metadata は `food` / command noun `food`。現地 UI には候補なし。 | 提案 label `Meal` → `食事` | 後述の限定操作だけ。Metadata 全体の rename、汎用 food 対象の公開ではない。 |
| 既存 scene target `RESTAURANT-OBJECT` | Elm Underpass の `restaurant` / `Examine` | English fallback を保持 | MEAL や map `Restaurant` と別 identity。採択経路で未実行の Examine response を追加承認しない。 |

現コードは checklist destination の一部を `span lang="en"` で表示している。これは現況であって承認後の完成状態ではない。M3 は限定範囲の `meal` label を既存 map lookup と同じ copy に接続し、翻訳済み label の `lang` を表示言語に合わせる。Unknown label の English fallback を保持する。

## 限定 meal UI — 現況と M3 へ渡す copy 候補

**この節の新しい English / Japanese は、未実装 surface の copy 提案であり runtime-observed UI と称さない。** 現地の来店本文 R6 に meal / food の言及はなく、M1 UI 監査でも対象操作はない。現コードの `belongsToSourceRoom` は汎用 GLOBAL-OBJECTS を公開せず、`sceneActionObjects` の追加例外は新聞だけである。

承認済み条件は、既存 `initial2041Presentation`（Simulation Mode、初期 fieldwork、2041年、初回 simulation state active、非 QA）、raw English から解決した `ROYS-PAGODA`、line input の組合せ。Guided / Action menus に **`BUY MEAL` 一つ**を出し、input を受け付けない busy 中は無効化する。可用性を EN / JA で変えない。録画状態や補助 checklist の推定を新しい可用性条件にせず、自動録画・自動購入はしない。Classic、QA、後続年、再入場、RESTORE 不明状態、未知 room に新設候補を出さず、既存 UI の fallback を維持する。

| 限定 surface の role | Proposed English | Japanese candidate | 挙動 / accessible name |
| --- | --- | --- | --- |
| Guided / Action menus の section landmark | `Meal at Roy's Pagoda` | `ロイズ・パゴダでの食事` | section の accessible name。実在する現在地と操作を示す。 |
| 同 section の visible heading | `Order a meal` | `食事を注文する` | 両 mode 共通の見出し。 |
| Guided の visible instruction | `Choose the meal to draft an order you can edit before sending.` | `食事を選ぶと、注文のコマンドを下書きします。編集してから送信できます。` | 編集可能 draft。押下だけでは送信しない。 |
| Guided / Action menus の target label | `Meal` | `食事` | 限定 MEAL 候補の visible object name。 |
| Guided の action hint | `Order` | `注文する` | 現行の object + hint 構造を使う場合、button の accessible name は visible label 由来の `Meal Order` / `食事 注文する`。英語 draft は `BUY MEAL`。 |
| Action menus の visible instruction | `Choose Order meal to send the command once.` | `「食事を注文する」を押すと、コマンドを1回送信します。` | 明示的な操作で1回送信することを説明。 |
| Action menus の action button | `Order meal` | `食事を注文する` | Visible / accessible name を一致させ、押下一回につき `BUY MEAL` 一回。 |

`Order` は食事を注文するという観測済み response に基づく表示用語であり、`ORDER` command の追加ではない。`buy food`、`ORDER MEAL`、Take / Eat / Examine を代用・追加しない。Guided の draft を送信すれば同じ `BUY MEAL` となる。食事を一回送信したことと原作側の成功・録画成立・課題達成を別に扱い、未観測の応答は English fallback とする。

### 周囲の visible / accessible 説明

現行 SceneActions の `Words mentioned here` / `この場面で言及された語`、`Actions for things mentioned here` / `この場面で言及された対象へのアクション` を新規 meal 候補へそのまま適用しない。`Worth trying` / `試してみる`、`In this scene` / `この場面で`、`Choose one to draft a command` / `選ぶとコマンドを下書きします`、`Actions written into the original story` / `原作に用意されたアクション` を含め、**限定 meal surface を囲む全説明**を上表の役割ごとに承認する。部屋本文で言及された語を抽出した結果とは説明しない。

この承認は限定 surface にだけ適用する。無関係な SceneActions、root の introduction / mode 説明、generic guard を一括変更する許可ではない。新 renderer や広い GLOBAL-OBJECTS 公開は追加せず、既存の draft / send / disabled / focus 経路を使う。具体的な component 接続は M3 が担い、本 packet は copy の役割と挙動を定める。

## 共通 UI copy・動的値・fallback

- Map / route の共通文言は [初期 Simulation UI packet](initial-simulation-ui-copy-packet.md)を再利用する。`Route to` → `目的地への経路`、実接続中 navigator の `You have arrived.` → `目的地に到着しました。`、`Draft next step` / `Take next step` → `次の移動を入力欄へ` / `次の移動を実行`、`Clear` → `解除`。Destination / nextPlace だけを上の役割別 lookup に通す。未接続の package-map branch を対象に加えない。
- `{steps}`、`{count}`、year、current / selected / arrived、現在地、recording は既存の動的値。九課題、地図共通操作、録画ボタン、drawer の header / tabs / close、compass / context の共通説明は既承認 copy を使う。歩数・推定カウント・日付・時刻を固定例から生成しない。
- `WARNING: Record buffer is now half-full.` は S1/S2:32:3 に移った canonical system notification として English を保持する。Full / auto-deactivation / not-active を含む旧失敗 record を削除・翻訳承認せず、成功へ読み替えない。
- Session 1 の READ 末尾の `The sun, beating down warmly on you, has reached its midday apex.`、crowd variant、その他 optional interrupt は新規 copy に含めない。新聞の四段落・空行の後の追加出力も落とさず English fallback。未観測営業時間・低残高・別料理・別年・再注文の別残高・正式評価などの branch を historical source から補わない。
- 採用経路外の `University Heights`、`Rockvil University`、`Ezzi's Bar` などの出口名、未承認 object / action / room label は English のまま。Map label `Restaurant` の承認を同名の一般 scene object へ広げない。
- `SW W W S RECORD BUY MEAL RECORD OFF N E E NE`、既存移動ボタンの full direction command、command echo、raw transcript / status、security 値は canonical English。日本語 parser input に変えず、原作 state / save / parser を唯一の権威とする。
- Option 2a+2b、history / recovery、locale 往復、English subtree の `lang`、canonical と localized output の読み上げ非重複を保持する。M3 は Classic / Guided / Action menus × 2 viewport、入力・focus、EN/JA 同可用性、busy 無効化、scope 外の新設候補なしを受け入れる。

## 検証・承認と handoff

Packet 作成は Codex Cloud。上の新規7 leaf と再利用4 leaf を両 session の exact text・command・位置・行順・空行に照合し、UI identity / source copy と現行表示条件を別に監査する。日本語は #85 の独立 review で意味・表現・story / UI とも承認済み。Guided の対象名＋動詞の accessible name は、M3 の browser aria snapshot で確認する留意事項を引き継ぐ。

本 M2 の完成条件は **Sol が本 packet の本文と UI copy を承認し、M2 PR を merge すること**。その時点で #79 を完了し M3 #80 を開始可能とする。Review 前にチェック欄や status を copy 承認済みにせず、M3 の production 実装・6経路受入・Astra 全体受入を今回完了と称さない。検証結果、current-head CI / artifact の head 一致と実期限、未解決 finding は PR の引き渡しに記録する。文書のみのため、実施していないローカル npm / browser suite や新規 runtime capture を実施済みとは記録しない。
