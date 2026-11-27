# 2041年に居間を録画した実測

映画候補Aの96送信に自宅往復の15送信を加え、本番ビルドで111送信を2回完走した。
両セッションで七課題の本文と録画窓を保持し、建物扉と住居扉を順に鍵で開け、居間で録画中に新しい `LOOK` の本文を得た。
`RECORD OFF` を明示してから帰路を移動し、非録画の Kennedy Park で通常入力に戻った。
この経路と操作の採択は独立 Chat モード Sol のレビューとマージを待つ。 [H1 #120](https://github.com/5gmt/mind-forever-voyaging/issues/120) [Home計画](plans/2041-home-fieldwork.md)

## 再現と記録

計画 PR #123 のマージ `fbb73604e7e84ab3f3ca61db04f7f1075683cd68` を本番静的書き出しの基点とした。
Chromium `151.0.7922.34`、1440×900 で、各セッションを独立した新規ブラウザーコンテキストから開始した。
壁時計では2026年11月27日15:12:33–15:13:23 JSTに採取した。 [開始条件の確認](https://github.com/5gmt/mind-forever-voyaging/issues/120#issuecomment-7210364420)

```bash
bash scripts/bootstrap-npm.sh # npm が古い場合
npm ci
npx playwright install chromium
npm run build
python3 -m http.server 3100 --bind 127.0.0.1 --directory out
# 別ターミナル
node scripts/capture-home-runtime.mjs --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-home-runtime-observed.json \
  --failure-output /tmp/parchment-home-runtime-failure.json
```

[採取スクリプト](../scripts/capture-home-runtime.mjs)は実行ごとに新しい出力ルートを作り、進行中の `parchment-home-runtime.partial.json` をその中で更新する。
オプションで明示した公開先は新規ファイルに限り、異常終了時の記録は成功出力と別のファイルに保存する。
[成功候補の fixture](../tests/fixtures/parchment-home-runtime-observed.json) はポート3180で行った一回の実行から得た。
`outcome=adoption-pending`、実行 ID `965e57c5-d3ab-4494-9e81-6f9df7d011e9` である。

`submissions` は実送信ごとの方式、実 command、入力 ID、echo の行と runs、次の入力 ID を持つ。
`observations` は live windowport の元の行と runs、status window の原文、解析した mode、時計、場所、日付を持つ。
`roomId` はシミュレーションの raw status 名を既存の room データと照合した値である。
Living Room は初回2041年の `LIVING-ROOM` に対応し、同名のエピローグ用 ID は対象外とした。
`surfaceAudit` は場所表示、identity rail、compass、quick actions、main と companion の操作表示、地図を開いた場合の内容と前後の入力 ID を持つ。

起動時に live windowport の入力を確認し、既存 bridge の `request-state` で同期した。
起動の空白1文字は `startup` に分離し、各 line submission の echo と次の入力を起点 ID で連鎖させた。
Decoder はフォームで `62`、併用で `41`、閉扉 probe で `36` と、その場で表示された数値を送信した。
数値 echo は質問の行に付いた `Style_input` run として保存した。
そのため各完走は111 line submissions、110 observations、起動込み112 bridge requestsとなる。
閉扉 probe は14 line submissions、13 observations、起動込み15 requestsを持つ。

## 先行七課題

各セッションの送信1–96と場所、録画状態を [映画候補Aの実測](cinema-recording-a-evidence.md) に照合した。
比較時に実 decoder 回答を共通の位置として扱い、英語の方向の綴りと大文字小文字を正規化した。
Court、Newspaper、Restaurant、City Hall、Power Station、Church、Cinema について、録画中に得られた必須 English leaf を同じセッションで確認した。
新聞の四段落、食事と残高、二つの会話、裁判所と発電所の現地 LOOK、映画本文を含む。
映画ではチケット購入、15分間の鑑賞中の録画継続、明示停止、ロビーの LOOK、Kennedy Park への帰着を確認した。

両セッションとも35送信目の `BUY MEAL` で `WARNING: Record buffer is now half-full.` が一度出た。
フォームは12:50pm、併用は2:08pmで、ともに Roy's Pagoda で録画中だった。
経路全体で buffer full、自動停止、停止時の非作動メッセージは出なかった。
容量の内部値と作品内の正式評価は未測定である。

## 自宅往復の経路

時刻は原作 status の値で、フォームの原作日付は `6/2/2041`、UI 併用は `5/7/2041` だった。
番号は実送信の1始まりで、送信7以降の `observations` の0始まり index は番号から2を引く。

| 送信 | Command | 後の場所と room ID | フォーム | UI併用 |
| --- | --- | --- | --- | --- |
| 96 | `SW` | Kennedy Park `KENNEDY-PARK` | 5:15pm | 6:33pm |
| 97 | `SW` / `sw` | Elm & Park `ELM-AND-PARK` | 5:20pm | 6:38pm |
| 98 | `S` | Southway & Park `SOUTHWAY-AND-PARK` | 5:25pm | 6:43pm |
| 99 | `W` | Parkview Apartments `PARKVIEW-APARTMENTS` | 5:30pm | 6:48pm |
| 100 | `OPEN DOOR WITH KEY` | Parkview Apartments `PARKVIEW-APARTMENTS` | 5:31pm | 6:49pm |
| 101 | `IN` | Hall Near Your Apartment `PARKVIEW-HALL` | 5:36pm | 6:54pm |
| 102 | `OPEN DOOR WITH KEY` | Hall Near Your Apartment `PARKVIEW-HALL` | 5:37pm | 6:55pm |
| 103 | `N` | Living Room `LIVING-ROOM` | 5:38pm | 6:56pm |
| 104 | `RECORD` / `record` | Living Room。録画開始 | 5:39pm | 6:57pm |
| 105 | `LOOK` / `look` | Living Room。録画継続 | 5:40pm | 6:58pm |
| 106 | `RECORD OFF` / `record off` | Living Room。明示停止 | 5:41pm | 6:59pm |
| 107 | `S` | Hall Near Your Apartment `PARKVIEW-HALL` | 5:46pm | 7:04pm |
| 108 | `E` | Parkview Apartments `PARKVIEW-APARTMENTS` | 5:51pm | 7:09pm |
| 109 | `E` | Southway & Park `SOUTHWAY-AND-PARK` | 5:56pm | 7:14pm |
| 110 | `N` | Elm & Park `ELM-AND-PARK` | 6:01pm | 7:19pm |
| 111 | `NE` | Kennedy Park `KENNEDY-PARK` | 6:06pm | 7:24pm |

すべての自宅区間の送信後に新しい `>` line input を観測した。
`Simulation Mode (recording)` は104–105送信の直後に観測し、他の自宅区間は `Simulation Mode` だった。
103送信目の非録画の入室と105送信目の録画中の LOOK は、別々の echo、本文、次入力を持つ。

## 本文と識別情報

以下の line は各 turn の `presentation.lines` の0始まり index である。
`OPEN DOOR WITH KEY` の二つの応答は同じ英文なので、初回2041年と command、観測時 room の組み合わせで識別する。
二つの扉の ID と鍵の `KEY` は historical source と照合した。
初回2041年で鍵を渡す source の挙動に加え、両方の開扉と続く移動の成功を runtime で観測した。 [扉と居間の source](../source/apartment.zil) [初回シミュレーションの初期化](../source/prism.zil)

| 送信 / line | Exact raw leaf または参照 | 観測時の範囲 |
| --- | --- | --- |
| 97 / 1、110 / 1 | `Elm & Park` | 既存の地名。初回2041年の往復。 |
| 98 / 1、109 / 1 | `Southway & Park` | 新規地名。98 / 2 は交差点の本文と時刻で異なる混雑描写がまとまった一つの leaf。両方の exact 版を fixture に保存。 |
| 99 / 1、108 / 3 | `Parkview Apartments` | 建物名と建物入口の room heading。 |
| 99 / 2 | `You are in the vestibule of a typical high-rise city apartment building. A wide expanse of labelled buzzers and tiny mailboxes fills one wall. Glass doors lie closed to the west. Next to this inner door is a picturephone. The street lies to the east.` | `PARKVIEW-APARTMENTS` の初回到着本文。 |
| 100 / 1 | `The door opens.` | 建物扉 `PARKVIEW-DOOR`。`PARKVIEW-APARTMENTS` で応答。 |
| 101 / 1 | `You enter the inner lobby and take the elevator up to your floor.` | `IN` の移動本文。実際の到着先は `PARKVIEW-HALL`。 |
| 101 / 3、107 / 1 | `Hall Near Your Apartment` | 廊下の room heading。 |
| 101 / 4 | `You are standing in the hall at the door to your apartment, which lies closed to the north. The stairs and elevators to the street are off to the east.` | `PARKVIEW-HALL` の住居扉を開ける前の描写。 |
| 102 / 1 | `The door opens.` | 住居扉 `APARTMENT-DOOR`。`PARKVIEW-HALL` で応答。 |
| 103 / 1、105 / 1 | `Living Room` | `LIVING-ROOM` の見出し。 |
| 103 / 2、105 / 2 | `This is the large living area of your apartment, with a bedroom to the north and a kitchen to the east. The front door of the apartment, next to the couch on the south wall, is open. A huge window provides a panoramic view to the west.` | 両セッションの必須室内本文。 |
| 103 / 4、105 / 4 | `Jill's easel occupies a beautiful, well-lit spot near the window. Her current painting is on the easel. In one corner is the old word processor where you do your writing.` | 固定の室内本文。イーゼル、絵、ワープロは一つの raw leaf。 |
| 103 / 5、105 / 5 | `There is a romance novel here.` | 今回は両方で観測した物の描写。必須室内本文から独立。 |
| 104 / 1、106 / 1 | `Record feature activated.` / `Record feature deactivated.` | 既存の録画応答。居間での開始と明示停止。 |
| 108 / 1 | `You descend to the first floor and head for the lobby...` | 廊下から建物入口への `E` の移動本文。 |
| 111 / 1 | `Kennedy Park` | 既存の地名。非録画で帰着。 |

Inner lobby と elevator は移動本文に出る語で、この経路の raw status は廊下を示す。
Historical source の録画処理が対象とする住居内部には居間が含まれる。
採取の成立は、その内部フラグを参照せず、raw の室内本文と録画状態で検証した。 [移動の source](../source/apartment.zil) [録画処理](../source/misc.zil)

| セッション | 送信 / line | 観測した Jill の可変 leaf |
| --- | --- | --- |
| フォーム | 103 / 6、105 / 6 | `Jill is standing at the easel, working on her current painting.` |
| フォーム | 103 / 8 | `Jill looks up from her painting. "Hi, hon. Any news from your agent today?"` |
| UI併用 | 103 / 6、105 / 6 | `Jill is walking around, neatening and cleaning the living room.` |
| UI併用 | 103 / 7 | `Jill stops working for a moment and smiles at you. "Hi, hon. Any news from your agent today?"` |
| UI併用 | 105 / 8 | `Jill picks up a book and sits down on the couch to read it.` |

固定の本文は `Style_normal` の runs で、見出しも同じクラスだった。
`LOOK` の raw 先頭は command echo、見出し、室内描写、空行、家具の描写の順で、続く可変文と空行も fixture に残した。
既存の英語 fallback は本文を一つのブロックにまとめながら、各非空行の順序と原文を保持した。
日本語 ordinary projector は、fixture の複製に既承認の `Kennedy Park` を加えた検証で、元の行番号と `BlankLineSpace` の位置を保持した。
この追加行は projector の回帰テスト内にだけ存在し、翻訳の確認には後続の copy 承認が必要となる。

## 操作台帳

| 表示と操作 | 実測 |
| --- | --- |
| 通常フォーム | フォームの111送信すべてで使用。Decoder 問題の表示を確認後に Classic を選び数値を明示送信した。併用でも二つの鍵操作と `IN` / `N`、帰路にはフォームを使った。 |
| 既存 decoder button | 併用で実数値 `41` を一回送信。 |
| Guided map `home` | Kennedy Park で `Your apartment, fieldwork destination` を選択すると `Draft next step`。編集可能な `sw` を用意してから Send で一回送信した。Draft 前後の canonical 入力は同じ `line-422`。 |
| 地図到着 | 99送信目に `Your apartment, fieldwork destination, current location` と `You have arrived.` を表示。`home.targetId` は `PARKVIEW-APARTMENTS`。raw location は建物入口で、compass の既存補助表示は `7/9 recorded` だった。 |
| 現行の扉と移動表示 | 入口で `door Examine` と `IN Hall Near Your Apartment`、廊下で `door Open` と `N Living Room` を main と companion に観測した。`door Open` は generic draft。専用の `OPEN DOOR WITH KEY` はフォームで送信した。条件付き exit の成功は raw 応答と移動後の場所で確認した。 |
| 居間と公園 | `Living Room` および `Kennedy Park` の場所表示と、identity rail の PRISM、Simulation、2041、Release 79 を保存した。 |
| 既存の quick actions | 併用では `Record`、`Look`、`Stop recording` がそれぞれ `record`、`look`、`record off` の一回の送信になった。 |
| 課題 index 8 | 既承認ラベルは `Visit your home or living quarters` / `自分の家、または居住区を訪れること`。併用の現行補助表示は居間 LOOK 後と帰着で `8/9 recorded`。H1 の録画成立には raw の本文と状態を使用した。 |

表示の採取点は送信99、101、103、105、111の後に合わせた。
地図や companion の確認はどの点でも canonical 入力を進めなかった。
Classic では compass と main の場面操作が表示されなかった。
`Your apartment` の地図ラベルと課題名、建物入口、住居の居間、二つの扉を別々に参照できる。 [地図の定義](../app/StoryTools.tsx) [既承認の課題ラベル](../app/localization.ts)

## 別の新規セッションで確認した閉扉

原作日付は `4/17/2041` だった。
起動と初回2041年に入る7送信の後、`SW / S / W / IN / OPEN DOOR WITH KEY / IN / N` を送信した。

| 送信 / line | 結果 | Raw status |
| --- | --- | --- |
| 11 / 1 | `The door to the inner lobby is locked.` | 11:34am。Parkview Apartments に留まり、通常入力を再取得。 |
| 12 / 1 | `The door opens.` | 11:35am。Parkview Apartments に留まる。 |
| 13 / 1 | `You enter the inner lobby and take the elevator up to your floor.` | 11:40am。Hall Near Your Apartment へ移動。 |
| 14 / 1 | `The door is closed.` | 11:41am。Hall Near Your Apartment に留まり、通常入力を再取得。 |

Probe は全区間で非録画だった。二つの拒否の後にも新しい `>` line input が出た。

## 検証範囲

対象の回帰は、fixture 追加前に欠落で失敗し、実測を保存後に通過した。
`npm run lint`、`npx tsc --noEmit`、`npm test`（53件）、CI 制御テスト（15件）、`git diff --check` を実行した。
Canonical story の SHA-256 は作業ツリー、静的書き出し、採取時の HTTP 応答で `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` だった。
起動 locator、送信ボタンの大文字小文字、家具の raw leaf 境界を修正する前の採取はローカルの別失敗出力に保存した。
接続を意図的に失敗させた試験でも partial と failure を保存し、成功出力は作成されなかった。

本PRは fixture を含むためFull分類となる。
ローカル検証は production capture と unit を中心に行い、手動 Full と readiness は最終 head/base で独立レビューアが確認する。 [CI運用](ci-operation.md)

翻訳と production UI の追加、390pxでの読み上げや読書、実 saved-game RESTORE、別室と家族との会話、再入場と後続年、公共交通、原作の正式評価、本番配備は今回の採取範囲外である。
H2 と H3 は独立 Sol による H1 の成功採択とマージ後に開始する。
