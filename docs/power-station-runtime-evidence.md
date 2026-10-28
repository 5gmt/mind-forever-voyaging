# 2041 Power Station の連続経路の実測

## P1 の提出判断

P1 / [#94](https://github.com/5gmt/mind-forever-voyaging/issues/94) の証拠として、先行四課題を含む67送信を2つの独立した fresh canonical session で完走した。
施設内の非録画到着、録画中の LOOK、明示停止、公園の通常入力を確認し、計画の往復と操作契約を独立した Chat モード Sol の採択候補として提出する。
正式採択と merge までは P1 完了にも P2 / P3 の開始許可にもしない。

開始根拠は[計画 PR #97](https://github.com/5gmt/mind-forever-voyaging/pull/97) の merge `901945a3aee98cfec3a4bea816ebdf11760ba247` と [#94 の開始通知](https://github.com/5gmt/mind-forever-voyaging/issues/94#issuecomment-6459766993)である。
最新 default branch の同 commit を base とし、production code、canonical binary、historical source、既存 capture と fixture は変更していない。
新しい日本語 copy と6経路の全体受入は後続 Issue の範囲である。

## 証拠の対応と再現

| 成果物 | 内容 |
| --- | --- |
| [capture](../scripts/capture-power-station-runtime.mjs) | 既存 City Hall の五つの配列と録画区間を保持し、17送信を追加。失敗時も途中の観測、失敗時の live presentation、raw status を保存する。 |
| [fixture](../tests/fixtures/parchment-power-station-runtime-observed.json) | 2つの fresh browser contexts。各67 line submissions、66 combined observations、startup character input、68 parent-to-player requests、12監査地点×6組合せ。 |
| [regression](../tests/rendered-html.test.mjs) | `retains two fresh Power Station continuations after the accepted fifty submissions`。入力連鎖、先行50送信、施設と入口、録画窓、本文、警告、optional interrupt、行構造を照合。 |
| [先行証拠](city-hall-runtime-evidence.md) | 先行四課題の採択済み50送信。旧[容量不足](restaurant-runtime-evidence.md)と[restaurant A](restaurant-recording-a-evidence.md)も別 fixture のまま保持。 |

```bash
# package.json の Node/npm 条件と committed lockfile を使う
bash scripts/bootstrap-npm.sh  # npm が古い場合
npm ci
npx playwright install chromium-headless-shell
npm run build
python3 -m http.server 3100 --bind 127.0.0.1 --directory out
# 別 terminal
node scripts/capture-power-station-runtime.mjs \
  --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-power-station-runtime-observed.json
```

両 context は1440×900の static production export を使用した。
セーブの読み込み、VM state の変更、buffer 消去、帰還の挿入は行っていない。
`startup` は起動時の空白1文字を line submission と区別して保存する。
`submissions` は current input ID、その行から生じた新 echo、次 input ID を全67送信で連鎖させる。
`bridgeCommands` は iframe が受けた parent-to-player request だけを数え、keydown と送信後の二重通知を送信数に数えない。

security の質問と実測 decoder answer は `submissions[5]` と `[6]` に別々の input identity と原文を持つ。
`observations[5]` はその交換を一つの presentation としても保存するため、観測は各66件になる。
数値は質問行の末尾に echo され、独立した `>NUMBER` 行を合成しない。
`securityPrompt` と `inputOwnership` に回答前の prompt、実回答、numeric input ID を保存する。
以下の index は0始まりの `observations` を指す。

`presentation` は live `#windowport` を既存 bridge-v3 で読んだ行、run、空行、layout、終端 input である。
`statusText` は同じ live GridWindow の未加工 textContent（埋め込み style を含む）で、`status` はそこから抽出した値である。
room identity の照合は raw status と既存 world metadata に基づき、source の本文や内部 flag で観測を補完しない。

## 経路と録画状態

先行50送信には、起動後の PEOF、4回の WAIT、Simulation への入場と実 decoder answer、最初の recording loop、Courthouse、Newspaper、Restaurant、City Hall と各公園帰着を含む。
各 command 配列と全録画区間は `capture-city-hall-runtime.mjs` と一致し、回帰でも既存成功 fixture の先行50件に照合する。
新しい17送信は次のとおりである。

```text
Kennedy Park
→ SE → E → S → S → SE → SE → S
→ RECORD → LOOK → RECORD OFF
→ N → NW → NW → N → N → W → NW
→ Kennedy Park の通常 line input
```

Session 1 は全区間を canonical command form から大文字短縮形で送信した。
Session 2 の先行50件も同じ入力列で、新区間の往路は Guided map の editable draft を明示 Send し、現地の3操作は Guided quick actions、復路は日本語 Actions の compass を各1回押した。
実送信の往路は `se east south south se se south`、現地は `record look record off`、復路は `north nw nw north north west nw` だった。
EN と JA の監査は可用性と copy を記録し、locale 切替、地図選択、監査中の未送信 draft では input identity が変わらないことを確認した。

| Session | 開始 / 終了 UTC（JST は +09:00） | 原作日付 / 入場時刻 |
| --- | --- | --- |
| 1 | `2026-10-28T03:30:58.879Z` / `2026-10-28T03:32:29.431Z` | `5/21/2041` / `10:02am` |
| 2 | `2026-10-28T03:32:29.463Z` / `2026-10-28T03:34:01.490Z` | `1/26/2041` / `10:33am` |

| index / command / 地点 | Session 1 の input → next / raw status 時刻 | Session 2 の input → next / raw status 時刻 |
| --- | --- | --- |
| 54 / `SE` / Power Station Entrance | `line-267 → line-271` / `1:37pm` | `line-269 → line-273` / `2:08pm` |
| 55 / `S` / Power Station | `line-271 → line-275` / `1:42pm` | `line-273 → line-277` / `2:13pm` |
| 56 / `RECORD` / Power Station | `line-275 → line-278` / `1:43pm` | `line-277 → line-280` / `2:14pm` |
| 57 / `LOOK` / Power Station | `line-278 → line-282` / `1:44pm` | `line-280 → line-284` / `2:15pm` |
| 58 / `RECORD OFF` / Power Station | `line-282 → line-285` / `1:45pm` | `line-284 → line-287` / `2:16pm` |
| 65 / `NW` / Kennedy Park | `line-303 → line-306` / `2:20pm` | `line-307 → line-310` / `2:51pm` |

両 session で先行四課題の録画中 LOOK、新聞購入と四段落の READ、BUY MEAL、政府職員との会話を保持した。
半量警告はどちらも `observations[32]`、Roy's Pagoda の RECORD で1回だけ出た。
原文は `WARNING: Record buffer is now half-full.` であり、`warnings` に turn ID と status も索引化した。
発電所を含む全経路で full、auto-deactivation、録画開始失敗、移動不成立、mode 逸脱、通常入力への復帰不能を観測しなかった。
これを他の時刻や経路にも成功する保証とはせず、数値残量と原作の正式課題 flag は未観測のままとする。

## Stable、dynamic、optional の分類

ここで **stable** は今回の2 capture で同じ地点と操作に同じ原文を観測した leaf を指す。
再入場、後続年、別時刻での不変性や日本語 copy の承認を意味しない。
新しい7地点の初回到着は heading と説明の2 leaf、施設内の LOOK も同じ2 leaf、復路の基本出力は heading で、Session 2 の Elm & Kennedy に optional interrupt が加わった。
録画開始と停止、公園の heading は既存承認 leaf を再利用できる。
先行四課題の本文は既存 fixture と照合し、その copy の承認範囲を広げない。

| 初回 index / room identity | exact heading / 説明原文（両 session で一致） | 再観測と command qualifier |
| --- | --- | --- |
| 49 / `ELM-AND-KENNEDY` | **Elm & Kennedy**<br>This is an intersection with streets heading in the four cardinal directions. There is a park entrance on the northwest corner and a hospital on the southwest corner. To the southeast lies a shopping mall, and a large, old building with an impressive facade can be entered to the northeast. | `SE` / `se`。復路は heading を再利用。 |
| 50 / `ELM-AND-RIVER` | **Elm & River**<br>Elm Street begins here and crosses the downtown area to the west. Along the eastern side of River Street stands the vast Heiman Village building. You can enter Rockvil Mall to the southwest, or the old Stock Exchange building to the northwest. An entrance to a Tube station graces one corner of the intersection. | `E` / `east`。復路は heading を再利用。 |
| 51 / `SOUTHWAY-AND-RIVER` | **Southway & River**<br>Here at River Street, Southway ends its long trip from the western suburbs. South of here, the street bends toward the river. To the southwest are some brick houses, and a car lot occupies the northwest corner. All along the east side of the street is a huge construction site. | `S` / `south`。復路は heading を再利用。 |
| 52 / `BEND` | **Bend**<br>River Street curves here, heading downtown to the north and under an old railroad bridge to the southeast. To the northeast is an opening in a tall fence. A row of stores round the curve on the other side of the street: a laundromat to the west, a pharmacy to the southwest, and a hardware store to the south. | `S` / `south`。復路は heading を再利用。 |
| 53 / `WICKER-AND-RIVER` | **Wicker & River**<br>You have crossed the proverbial railroad tracks. The optimism and economic recovery don't seem to have spilled over into this run-down section of Rockvil, near the river. Wicker Drive, which runs northeast to southwest, cuts perpendicularly across River Street here. To the northwest, River dips under an unused rail bridge. There are factories on the northern and eastern corners. To the west is a dingy warehouse, and south of here are some dilapidated apartments. The smell of stale urine wafts from a stairway leading down to a gloomy Tube station. | `SE` / `se`。復路は heading を再利用。 |
| 54 / `POWER-STATION-ENTRANCE` | **Power Station Entrance**<br>You are on River Street at the entrance of a utility station which lies to the south. The street continues southeast towards the River Street Bridge. Northeast of here is the entrance to a huge factory complex, and tenements line the street to the west and southwest. | `SE` / `se`。復路は heading を再利用。 |
| 55 / `POWER-STATION` | **Power Station**<br>This is the central power station for all of Rockvil. Power is generated here by fusion reactors, and is received here from distant generators via a huge array of microwave receivers. The main entrance is on the north side of the plant. | `S` / `south`。復路は heading を再利用。`LOOK` / `look` でも同じ本文。 |

**dynamic** は security の色と inner number と実回答、status の日付と時刻、行 ID、style 順序、capture timestamp である。
両 session の日付と時刻は異なり、各 raw 値を fixture に残す。
本文の新規 stable leaf に埋め込み時刻はなかった。

**optional** は新規区間の次の3 leaf である。
各 session で異なる割り込みが出たため、いずれも未承認の英語として保持する。

| Session / index / 地点 | exact optional leaf |
| --- | --- |
| 1 / 52 / Bend | A car alarm shrieks momentarily, then trails off into merciful silence. |
| 2 / 52 / Bend | A stranger bumps against you, mumbles an apology, and is swallowed by the crowds. |
| 2 / 64 / Elm & Kennedy（復路） | The ground shakes as a huge truck rumbles down the street. |

説明または heading 後の空行、interrupt、次の空行をそのまま保存し、回帰でも全3件の session、発生地点、原文を固定する。
先行区間に出た街路の noise も全観測に残り、新たな翻訳承認に含めない。

新しい ordinary turns は通常 line input で、raw leaf と空行の形を既存境界で表現できる。
ただし新規 leaf はまだ catalog にないため、現在の English fallback は本文を一つの prose block にまとめる。
新しい地名行も raw の `Style_normal` であり、P2 は地名 leaf の `kind: title` を明示する必要がある。
回帰は未加工 turn の安全な fallback と、既承認 Kennedy Park leaf だけを追記した**controlled shape probe**を区別している。
後者は新規原文を一切変更せず、既存 ordinary projector による source-line 対応、leaf 順序、空行、未承認原文の保持を検証する。
この probe は自然な runtime 出力でも、新規翻訳の正例でもない。

## UI surface の台帳

両 session で、公園出発前、新規7地点への到着、RECORD 後、LOOK 後、明示 OFF 後、帰着時の計12地点を監査した。
各地点で EN / JA × Classic / Guided / Actions の6組合せ、合計144 sample を保存した。
`location`、`identity`、`compass`、`context`、`sceneActions`、`quickActions`、`recordingReminder`、`commandHelp`、`mapSurface` に visible 判定、accessible snapshot、明示 lang と各 text leaf の継承 lang、button の可用性を持つ。
CSS で閉じた companion に DOM が残る場合は、空の aria snapshot と操作可能な表示を区別する。

| Surface / identity | EN / JA の観測と accessible copy | 入力、guard、不足 |
| --- | --- | --- |
| `ELM-AND-KENNEDY` | `Elm & Kennedy`。current place、compass、map の next place は両 locale とも英語で `lang=en`。 | 往路 `SE` / `se`、帰路 `W` / `west`。新しい exact room lookup は P2/P3。 |
| `ELM-AND-RIVER` | `Elm & River`。同じ英語 fallback。 | 往路 `E` / `east`、帰路 `N` / `north`。 |
| `SOUTHWAY-AND-RIVER` | `Southway & River`。同じ英語 fallback。 | 往路 `S` / `south`、帰路 `N` / `north`。 |
| `BEND` | `Bend`。同じ英語 fallback。 | 往路 `S` / `south`、帰路 `NW` / `nw`。 |
| `WICKER-AND-RIVER` | `Wicker & River`。同じ英語 fallback。 | 往路 `SE` / `se`、帰路 `NW` / `nw`。 |
| `POWER-STATION-ENTRANCE` | `Power Station Entrance`。施設内と別の current place と出口候補。`lang=en`。 | 往路 `SE` / `se`、帰路 `N` / `north`。施設への compass は `S Power Station`、context は `N` 等の表示方向と別に actual alias を持つ。 |
| `POWER-STATION` | `Power Station`。JA でも英語、current place と context heading、compass の `lang=en`。 | 往路 `S` / `south`。復路 `N Power Station Entrance` / `north`。`OUT` / `out` も可視だが送信していない。 |
| map identity `power` | visible `POWER STATION`、accessible `Power Station, fieldwork destination`、施設内だけ `, current location` を追加。両 locale で `lang=en`。 | 選択は送信なし。7歩→入口1歩→施設内 Arrived / 到着の表示。room lookup と map lookup は別の P2 行にする。 |
| 課題 index 2 | EN `Visit a power-generating facility` に対応する既承認 JA `発電施設を訪れること`。 | Actions reminder は施設内の到着と RECORD 後に可視。入口では出ない。LOOK 後は補助推定5/9になり消える。この推定は原作の正式評価ではない。 |
| identity rail | PRISM、Simulation、2041 / ROCKVIL 等の既存 shell と各 language leaf を保存。 | 新しい place の日本語化で未承認の rail copy を翻訳承認しない。 |
| Guided map route | EN `DRAFT NEXT STEP`、JA `次の移動を入力欄へ`。実 draft は `se` / `east` / `south`。 | 編集可能な English draft のみ作り、明示 Send が必要。監査の draft は消去。Session 2 で往路7送信を実行。 |
| Actions map route | EN `TAKE NEXT STEP`、JA `次の移動を実行`。 | 押下から直接送信する既存コード契約。今回 route button の直接送信自体は実行せず、Actions compass の7送信を実測。 |
| compass / companion exits | 共通 label は既承認 EN / JA、新規の移動先だけ英語。`N` / `OUT` 等と context の `north` / `out` を記録。 | **現行 compass と companion exits は Guided でも直接送信する。** Guided map route の draft と異なる既存動作。P1 で変更せず、後続で Guided の移動を検証するときは map route draft を使う。 |
| RECORD / OFF / LOOK | quick actions は EN `Record` / `Stop recording` / `Look`、JA `録画開始` / `録画停止` / `見る`。JA subtree、録画中 indicator は `● RECORDING`。 | Guided でも直接 `record` / `record off` / `look`。Session 2 で各1押下と新 echo、次 input を照合。Actions reminder の `Start recording` / `録画を開始` も同じ `record` 契約だが押していない。 |
| `POWER-STATION-OBJECT` 等 | 入口と施設内では両 locale の Guided / Actions とも SceneActions は空。新たな Enter / Leave / object verb は不要。 | metadata 上の存在を表示済みと扱わない。公園の `waterpool` / `statue` / `park` 等は既存の英語 leaf と `lang=en` を保持し、Guided の未送信 draft だけ採取。 |
| Classic | assisted map、compass、quick actions、SceneActions は非表示。 | canonical command form のみで全67送信を実行可能。新しい assisted controls を追加しない。 |

facility の `POWER-STATION-OBJECT` は LOCAL-GLOBALS で、施設内の globals に含まれず、dynamic location もないため、`belongsToSourceRoom` が現地での提示根拠を返さない。
入口では globals に含まれるが、保証された verb は LEAVE / DISEMBARK に限られ、既存 SceneActions は LOCAL-GLOBALS の Enter / Leave を除外する。
空の現地 SceneActions はこの source metadata と code guard に整合する。
必須操作を成立させるために generic guard を緩める必要はなかった。

可用性の監査は通常入力待ちで行った。
コード上は map route、compass、exits、quick actions、reminder が `!acceptsInput` で disabled となり、map draft 自体も busy では戻る。
main の compass と新しい通常入力支援は line input の分岐に限る。
ただし companion の汎用 SceneActions と exits は main と同じ char-input guard を持たず、汎用 SceneActions の `lineInput` は限定 meal / official の条件にだけ使う。
今回の新規現地 SceneActions は空であるが、この静的確認を busy / char の自然な実測と混同せず、P3 は必要な共通入力境界と既存回帰を保持する。
EN / JA の差で canonical command と可用性を変える分岐は追加していない。

## 検証と引継ぎ

- `npm ci`：npm 11.17.0 と committed lockfile で成功。
- `npm run lint`、`npx tsc --noEmit`：成功。最初の lint は新規テストの未使用 callback 引数を指摘し、削除後に成功した。
- `npm test`：production build と全36 unit tests が成功。追加 regression は fixture 未作成の RED と capture 後の GREEN を確認した。
- 新規地名行の raw style は normal だった。最初の構造テストの title 仮定を実測に合わせ、原文行を変更しない controlled probe と P2 の heading-kind 責任を明示した。
- 最初の `npm run test:e2e` は City Hall の Guided / Actions narrow で食事説明文が hidden となった。6成功、2失敗、1中断、34未実行の時点で停止した。
- 配信中の dev CSS は `.scene-meal` が0件だったが、current source は3件だった。既存 `.next/dev` と `.next/cache` を退避した cold start では配信 CSS も3件（説明文の規則は2件）になった。既存[市役所実測](city-hall-runtime-evidence.md)にも記録されている cache の不整合であり、production code や test の回避修正は加えていない。
- cold start の `npm run test:e2e` は全43件が成功（16.1分）。最初の失敗 run と最終 full run を区別し、失敗した2経路もこの full run で成功した。
- canonical SHA-256：`14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`。
- `git diff --check`：成功。既存 fixture、E2E、production code、historical source、dependencies の差分なし。

施設内到着と録画中 LOOK の同じ本文、明示停止、帰着を成功根拠とし、source の容量90や内部 table index 4を runtime の残量や正式達成と呼ばない。
補助 checklist の5/9は観測した UI 推定である。
未観測の full / auto-deactivation leaf、他の時刻、再入場、後続年、Part II、QA、実 saved-game RESTORE、screen reader の音声、390px の時計と全体レイアウトは今回の2 capture では未確認である。
これらの境界と新しい6経路、入口だけの録画と施設内非録画 LOOK の負例は P3 に残す。

独立レビューへは、本書の経路表、原文表、surface 台帳、fixture の入力連鎖と warnings、回帰の controlled probe を対応づけて渡す。
現行 compass の直接送信を含む操作契約を明示し、先行50件や録画窓を変更しない候補として採択を求める。
head/base SHA、changes since review、current-head CI と artifact URL、その head 対応と14日保持の実期限、未解決の指摘は提出 PR を正本とする。
この実装セッションの自己点検は独立レビューを代替せず、P1 の採択と merge は指定された Chat モード Sol に委ねる。
