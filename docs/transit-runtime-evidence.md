# 2041年の公共交通で録画が自動停止した実測

[T1 #127](https://github.com/5gmt/mind-forever-voyaging/issues/127) の最初のフォーム試行で、Home の111送信を保持したまま University 駅から Brownline に乗車した。
車内で録画を開始し、Junction の看板と開扉を観測した131送信目で、原作が録画バッファ満杯を警告して録画を自動停止した。
同じ入力の直前は録画中で、到着後のステータスは非録画の `Tubecar` だった。
この時点で [計画の停止条件](plans/2041-transit-fieldwork.md#候補経路と採択gate) に従って採取を止め、経路と録画容量の設計判断を Astra / ChatGPT Work に戻す。
明示 OFF、降車、地上への復帰、公園帰着、UI併用の完走試行、別セッションの三つの拒否確認は未実施である。
この失敗証拠のマージで T2 #128 と T3 #129 の開始条件は解除されない。

**設計判断追記（2026-11-28 JST）:** Workは[交通候補A（発車後録画）](transit-recording-window-decision.md)を次の再試行候補として承認した。本文とfixtureは旧経路の失敗記録を保持する。ここに示す採取コマンドもまだ旧経路を実行するため、新候補の再試行には後続T1 PRでcaptureの更新が必要。候補Aの成功は未実測であり、T1完了とは扱わない。

## 採取と再現

[計画 PR #130](https://github.com/5gmt/mind-forever-voyaging/pull/130) を含む `codex/modern-amfv` の `c960cb0cb3b72ba8ff0ce072eb3123efb28956e7` から本番静的書き出しを作った。
実行 ID `7ec4427c-6dc8-45cd-aad5-b722881ba0b3` は2026年11月28日08:09:37–08:10:02 JST、Chromium `151.0.7922.34`、1440×900の独立した新規コンテキストで採取した。
Release 79 の実ファイルと HTTP 配信の SHA-256 はどちらも `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` だった。

[失敗 fixture](../tests/fixtures/parchment-transit-runtime-failure.json) の `sessions[0]` に、131件の line submission と bridge-v3 観測、起動文字を含む132件の bridge command を保持した。
`submissions` はコマンド、実送信方法、入力 ID、echo の行と runs、次の入力 ID を持つ。
`observations` は echo から新しい入力までの raw lines、runs、layout、入力種別、bridge が報告したステータス `bridgeStatusText` と、同じ入力 ID の status window の `textContent` および解析値を持つ。
後者の原作表記にはブラウザーの大文字化がかからない。
Decoder の質問と数値 `48` は別々の実送信で、質問の入力行を続く数値 echo と同じ `line-72` で対応付けた。
起動文字は `startup` に分けた。

`harnessAttempts` には本試行の前に採取側で止まった2件も保存した。
最初は bridge の表示用大文字表記を原作表記として解釈し、1送信目で失敗した。
次は Home の2件で共通だったロマンス小説の描写を必須としたため、105送信目で止まった。
[Home 実測](home-runtime-evidence.md) では小説は室内本文から独立した描写であり、今回も採取はするが再現を要求しない。
両修正とも採取側の照合に限定した。

```bash
bash scripts/bootstrap-npm.sh # npm が古い場合
npm ci
npx playwright install chromium
npm run build
python3 -m http.server 3100 --bind 127.0.0.1 --directory out

# 別端末。出力先は未使用のパスを指定する。
node scripts/capture-transit-runtime.mjs \
  --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-transit-runtime-observed.json \
  --failure-output /tmp/parchment-transit-runtime-failure.json
```

[採取スクリプト](../scripts/capture-transit-runtime.mjs) は実行ごとに一時ディレクトリを作り、次の送信前に `parchment-transit-runtime.partial.json` を更新する。
今回のように full 試行が停止条件に達した場合は、最後の報告と途中経過を failure 出力に保存して exit 1 で終了する。
同名の既存成果物は上書きしない。

## 入力と録画状態

原作日付は `5/7/2041` だった。
各番号は1始まりで、fixture の `observations` では番号から1を引く。
送信1–111を [採択済み Home fixture](../tests/fixtures/parchment-home-runtime-observed.json) と照合し、全コマンド、場所、録画窓と八課題の必須本文を確認した。
35送信目 `BUY MEAL` の Roy's Pagoda で2:00pmに half-full が出た。
映画は先行録画窓の中で15分間進み、居間は録画中の `LOOK` と明示 OFF を経て、111送信目で非録画の Kennedy Park に帰着した。

| 送信 | 実コマンド | Echo / 次の入力 ID | 原作時刻と結果 |
| --- | --- | --- | --- |
| 111 | `NE` | `line-481` / `line-484` | 7:16pm、Kennedy Park、非録画 |
| 112 | `SW` | `line-484` / `line-487` | 7:21pm、Elm & Park、非録画 |
| 113 | `W` | `line-487` / `line-490` | 7:26pm、Elm & University、非録画 |
| 114 | `DOWN` | `line-490` / `line-498` | 7:27pm、University ホーム、非録画 |
| 115–124 | `WAIT FOR 1 MINUTE` 10回 | `line-498` → `line-528` | 7:28–7:37pm、ホーム、非録画 |
| 125 | `WAIT FOR 1 MINUTE` | `line-528` / `line-533` | 7:38pm、Brown 車両がホームに到着。行先表示が University から Airport に変わり開扉 |
| 126 | `IN` | `line-533` / `line-537` | 7:39pm、車内に移動。扉は開いており非録画 |
| 127 | `RECORD` | `line-537` / `line-542` | 7:40pm、録画開始。同じ入力で閉扉と発車 |
| 128–130 | `WAIT FOR 1 MINUTE` 3回 | `line-542` → `line-551` | 7:41–7:43pm、車内で録画継続 |
| 131 | `WAIT FOR 1 MINUTE` | `line-551` / `line-561` | 7:44pm、車内から Junction 到着と開扉を観測。満杯警告と自動停止の後に新しい通常入力が出た |

全15回の `WAIT FOR 1 MINUTE` に `Time passes...` が出て、原作時計は各回1分進んだ。
ホーム11回、車内4回はこの試行の値で、40回と8回は採取時の停止上限である。
非録画のホーム到着と、録画開始と同じ入力で車内から得た発車は、現在地と本文で区別できる。
Historical source では University は Brownline の終点で、2041年の停車と走行は2分と4分で設定される。
内部の `RECORDING-TABLE`、残容量、正式な課題評価は未観測である。 [Brownline のソース](../source/rockvil.zil) [録画容量のソース](../source/misc.zil)

## 場所の識別と原文

| 観測対象 | 同じ入力で得た根拠 |
| --- | --- |
| `TUBE-AT-UNIVERSITY` | Elm & University で `DOWN`。114送信目の raw status は `Tube Station`。茶色の看板を示すホーム描写、`Elm Street and University Avenue`、`(Rockvil U)`、`(Brown Tubeline Terminus)` が続く |
| `BROWN-TUBECAR` | 125送信目に University ホームで Brown 車両の開扉を観測し、次の `IN` で raw status が `Tubecar` に変わった。126送信目は `This is a typical tubecar, clean and free of graffiti. The doors of the car are open.`。127送信目の発車文も車両を `brown tubecar` と明示 |
| `TUBE-JUNCTION` | 131送信目の車内描写は `The tubecar glides into a station, and you can make out a sign reading:`、`Skybus Terminal`、`(Transfer Between Brown and Red)`、`The car comes to a stop and the doors slide open.` の順。看板が示す到着駅を同定できる。旅客の status は `Tubecar` のままで、Junction ホームの所在は未観測 |

看板の位置は114送信目の `presentation.lines[3..5]`、131送信目の `lines[4..5]` にある。
University の各行は2、12、5個、Junction の各行は10、2個の先頭空白を持つ。
行と空白、到着前後の空行、満杯警告は raw fixture に残る。
車両の到着文は125送信目、通常待機文は115–125と128–131送信目、録画開始と反転発車の文は127送信目にある。
満杯警告は131送信目の `line-559` である。
可変の decoder、原作日時、本文の人物描写、空行を送信ごとに保持した。
例えば105送信目には、ロマンス小説と居間を片付ける Jill の文が出た。
交通区間にはこの試行で別の都市ノイズは出なかった。

既存 2a の canonical buffer と bridge-v3 の行データは、看板の字下げを含む原文を保存する。
既存 2b の ordinary projector は、承認済みの別 leaf を加えた制御テストで、各看板行の順序、対応する source line、空行を保持した。
一方、2b の通常の未翻訳文は前後空白を正規化するので、localized host で看板の字下げをそのまま描画できることは未確認である。
既存の leaf 形式で字下げを表せるかは、経路の再設計と採択後に確認する。
今回の制御テストに Transit の訳文は含めていない。 [2a の bridge](../public/player-bridge.js) [2b の projector](../app/story-presentation.ts)

## 操作と失効条件

| 表示や操作 | 実測と保留事項 |
| --- | --- |
| 現在地と identity rail | Classic の地上入口、University ホーム、録画開始直後の車内で snapshot を保存。場所表示は `Elm & University` / `Tube Station` / `Tubecar`。Identity rail は PRISM、Simulation、2041、Release 79。各 snapshot の前後で入力 ID は同じ |
| 入駅、乗車、降車、地上への復帰 | `DOWN` と `IN` はフォームで送信した。Classic の監査で compass、専用 scene action、quick actions は表示されなかった。 `OUT` と `UP` は停止後のため未送信 |
| 待機と録画 | `WAIT FOR 1 MINUTE` と `RECORD` はフォームで送信。現行コードの汎用 `Wait` は `wait` を送る。Assisted の既存 `Record` / `Stop recording` はコード上で確認した。今回の交通区間ではクリックしていない |
| 地図と課題 | 現行コードの `transit` は `SKYBUS-TERMINAL` を指す。課題 index 4 の既存ラベルは `Ride public transportation` / `何らかの公共交通機関に乗ること`。候補の乗車入口 Elm & University、Junction の看板、各ホーム、車内は別の対象 |
| 後続の限定観測 | 初回2041年の同一セッションで、直前の確定した所在、新しい echo / 入力 ID、raw status、同じ入力の開扉文を組み合わせる。発車、前回の入力 ID の再配信、矛盾、欠落や不安定な report、未知の移動、再起動や RESTORE で古い乗降根拠を失効させる。131送信目の開扉は降車候補の証拠だが、同じ入力の自動停止で録画成功の条件は失われる |

現行 UI の併用試行、停車中の実降車、三つの別 fresh probe、companion 側の交通操作は停止条件の後に残った。
この台帳の待機回数、操作および識別の条件は独立 Sol の採択を経ていない。 [地図の定義](../app/StoryTools.tsx) [通常操作](../app/PrismEdition.tsx)

## 検証と引き継ぎ

回帰 `retains the transit capacity failure after the accepted home prefix` は、111入力、先行の必須本文と録画窓、各入力の ID 連鎖、乗車、満杯警告、停止後の通常入力を保持する。
`npm run lint`、`npx tsc --noEmit`、`npm test`（56件）、CI 制御テスト（15件）、canonical SHA-256、`git diff --check` が通った。
fixture を含むため CI 分類は Full である。
独立 Sol がレビュー済みの head / base で手動 Full と readiness を扱う。
ローカルの全ブラウザー群は実行していない。
