# 2041年の公共交通の実測

## 候補 A の実測

[Work が承認した候補 A](transit-recording-window-decision.md) を、PR #131 を含む `codex/modern-amfv` の `8ae775ffc5a7029e710a4777465e494d4bffb971` の本番静的書き出しで実行した。
フォームと既存 UI 併用の独立した新規コンテキスト2件で、Home の111入力と先行録画窓を保持した。
各回で Brownline に非録画で乗り、車内の発車を確認した後に、1分待機を2回続けて送信した。
録画開始時には車内で未到着だった。
直後の1分待機で Junction の看板、開扉、録画継続を確認し、`OUT / RECORD OFF / UP / SE / SW` で非録画の Kennedy Park の通常入力まで戻った。
成功経路と操作の採択は独立 Sol のレビューを待つ。 [T1 #127](https://github.com/5gmt/mind-forever-voyaging/issues/127)

### 採取と再現

[成功候補の fixture](../tests/fixtures/parchment-transit-runtime-observed.json) は `outcome=adoption-pending` である。
`sessions` に2件の全入力と bridge-v3 の raw lines、runs、入力 ID、原作時刻を持つ。
`probes` には別の新規コンテキストで行ったホーム上の録画と乗降の拒否を記録した。
`bridgeStatusText` は bridge の表示表記を、`statusText` は同じ入力 ID の `.GridLine` の内容を保存する。
後者には status window 内に埋め込まれた CSS 宣言を含めない。
新規採取の前後で [旧経路の失敗 fixture](../tests/fixtures/parchment-transit-runtime-failure.json) の Git blob は `69312ee35e75edcc1ff3c7a4350c89cc3fe9dcb7` のままだった。

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
  --failure-output /tmp/parchment-transit-runtime-candidate-a-failure.json
```

フォーム試行は Classic で decoder の実数値もフォームから送った。
併用試行は decoder button、既存の Home 地図からの Guided draft と明示 Send、既存録画ボタンと通常フォームを使う。
採取側は別入力の到着や満杯を補正せず、途中出力を新しい失敗ファイルに保存する。

実行 ID は `562a36c5-163f-468a-8ee4-e6ec92f9bec7`、採取時刻は 2026年11月28日22:58:49–23:00:00 JST、Chromium `151.0.7922.34`、1440×900だった。
フォームの decoder は `25`、UI 併用は `12` を送った。
同日22:56の最初の採取ではフォームが完走した後、併用が96入力で旧 Home 地図ラベルの locator を待って止まった。
原作の入力は Kennedy Park で利用可能だった。
現行ラベル `Parkview Apartments entrance, fieldwork destination` で探すよう修正し、両経路を新規コンテキストで最初から採取した。 [採取側の途中記録](../tests/fixtures/parchment-transit-runtime-candidate-a-failure.json)

### 経路と録画窓

以下の番号は送信の1始まりで、`observations` の添字は番号から1を引く。
各セルに原作の時刻と、必要な箇所では echo ID → 次の input ID を示す。
原作日付はフォーム `1/26/2041`、併用 `3/17/2041`。
原作時計の絶対値を制御には使わず、各待機の実進行、入力 ID と本文を照合した。

| 送信 | 実コマンドと観測 | フォーム | UI 併用 |
| --- | --- | --- | --- |
| 111 | `NE` で Home 区間終了。非録画の Kennedy Park | 5:34pm | 5:50pm |
| 112–113 | `SW / W`。Elm & Park → Elm & University | 5:39–5:44pm | 5:55–6:00pm |
| 114 | `DOWN`。University ホームの看板 | 5:45pm、`line-482 → line-490` | 6:01pm、`line-488 → line-496` |
| 115–125 | ホームで `WAIT FOR 1 MINUTE` 11回。最後に Brown 車両が到着、行先表示を University から Airport に切り替え、開扉 | 5:46–5:56pm、到着後 `line-525` | 6:02–6:12pm、到着後 `line-531` |
| 126 | `IN`。開扉中の車内に非録画で乗車 | 5:57pm、`line-525 → line-529` | 6:13pm、`line-531 → line-535` |
| 127 | `WAIT FOR 1 MINUTE`。車内から閉扉と反転発車を確認 | 5:58pm、`line-529 → line-534` | 6:14pm、`line-535 → line-540` |
| 128–129 | 発車の次の入力から、非録画の1分待機を別々に2回。車内で未到着 | 5:59–6:00pm | 6:15–6:16pm |
| 130 | `RECORD` / `record`。車内で録画開始。到着文と開扉文はまだ出ていない | 6:01pm、`line-540 → line-543` | 6:17pm、`line-546 → line-549` |
| 131 | `WAIT FOR 1 MINUTE`。車内で Junction 到着、看板と開扉。録画継続 | 6:02pm、`line-543 → line-551` | 6:18pm、`line-549 → line-557` |
| 132 | `OUT`。録画したまま Junction ホームへ実降車 | 6:03pm、`line-551 → line-559` | 6:19pm、`line-557 → line-565` |
| 133 | `RECORD OFF` / `record off`。ホームで明示停止 | 6:04pm、`line-559 → line-564` | 6:20pm、`line-565 → line-570` |
| 134–136 | `UP / SE / SW`。Skybus Terminal → Main & Kennedy → Kennedy Park。非録画、通常入力 | 6:09–6:19pm、最終 `line-574` | 6:25–6:35pm、最終 `line-580` |

各待機で `Time passes...` と1分の時刻進行を確認した。
両試行の車内待機は、発車まで1回、発車後に非録画で2回、録画後に1回だった。
今回の136入力と待機数は実測値であり、成功判定は新しい raw 応答を必要とする。
`IN` と同じ入力で実発車した場合も設計上は起点として扱うが、今回は観測していない。
予定前の到着、録画開始と同じ入力の到着、録画後の1分待機で新しい到着が出ない場合は停止する。
駅40回と車内8回の上限を守り、収まらない場合は追加の待機や別の録画時機で続行しない。

両件とも35送信目の `BUY MEAL` で half-full が出た。
フォームは12:18pm、併用は12:34pmだった。
録画開始から `OUT` まで録画中のステータスが続き、満杯または自動停止の警告は出なかった。
事前の89分相当は時計と historical source による計算値である。
内部残容量、原作の `RECORDING-TABLE` の値、正式な九課題評価は未測定である。 [録画窓を決めた根拠](transit-recording-window-decision.md)

### 同じ入力で確認した駅と車両

| 場所と役割 | Raw の同定根拠と leaf の位置 |
| --- | --- |
| University ホーム `TUBE-AT-UNIVERSITY` | Elm & University からの実 `DOWN`、status `Tube Station`、ホームと茶色の看板を述べる114入力の行2、行3–5の `Elm Street and University Avenue`、`(Rockvil U)`、`(Brown Tubeline Terminus)` |
| Brown 車内 `BROWN-TUBECAR` | University に到着した開扉中の車両を125入力で観測。次の `IN` と status `Tubecar`、126入力の開扉中の車内描写。127入力の発車文にも `brown tubecar` がある |
| 車内から見た Junction | 車内のまま、131入力の行3–6に到着文、`Skybus Terminal`、`(Transfer Between Brown and Red)`、開扉文。status は `Tubecar` で録画中 |
| Junction ホーム `TUBE-JUNCTION` | 直前の開扉中の入力へ `OUT`。132入力で status `Tube Station`、中央ホームの描写と行3–4の同じ看板。134入力の `UP` で新しく地上の `Skybus Terminal` を観測 |

行番号は各 `presentation.lines` の0始まりである。
看板の字下げと空行は raw 行と runs に残している。
125入力の Brown 車両の到着文、127入力の出発文、131入力の車内到着と開扉、132入力のホーム本文、134入力の地上ターミナル本文を別 leaf として扱う。
`Record feature activated.` と `Record feature deactivated.` は共通の録画応答である。
待機の応答は同じ `Time passes...` でも、ホーム、非録画の車内、録画中の車内で状態が異なる。
現行の英語原文を fixture に保持し、訳文の承認は T2 に残す。
可変の原作日時、decoder、先行区間の Jill などの描写もそのまま保存した。

### 別セッションの拒否とホーム録画

2件とも fresh context で初回2041年に入る7入力から開始し、各18入力だった。
成功経路の先行111入力および録画窓には混ぜていない。

| Probe | 原作時刻、入力 ID、観測 |
| --- | --- |
| 車両不在の `IN` | `station-only` の11入力、12:37pm、`line-95 → line-98`。 `There's no train here at the moment.`、非録画の `Tube Station` |
| ホーム上の録画と発車 | 同じ probe の12入力、12:38pmにホームで録画を開始。17入力、12:43pm、`line-115 → line-120` で Brown の発車文をホームから観測。18入力で明示 OFF。終始 `Tube Station` で、車内到着はない |
| 走行中の `OUT` | `in-transit-exit` の17入力で非録画の実発車。18入力、10:52am、`line-121 → line-124`。 `You can't leave the tubecar between stations!` が出て、非録画の `Tubecar` に留まる |

同じ Brown 発車文はホームと車内の両方で現れる。
観測時の所在は直前の確定した所在と当該入力の status で判断する。
どの拒否の直後にも新しい通常入力が出た。

### 看板の字下げの制御試験

通常ビルドで採取した bridge-v3 は University の3行で先頭空白を2、12、5個、Junction の2行で10、2個保持した。
実走とは別の作業コピーで、既存の `OBSERVED_STORY_CATALOG.ja` に試験値7件だけを追加して本番ビルドを作った。
各項目の `canonicalCommand` と `canonicalLeaf` に下表の入力と原文の `trim()` を使い、`translation.text` には空白の個数分の U+00A0 と「構造確認」、原文を設定した。
同じフォーム経路を終えてから日本語に切り替え、実際の iframe 内 localized host の既存 `p.story-presentation-prose` を調べた。
各段落の先頭と、最初の非空白文字を指定した DOM Range の左端との差を測り、直前の command block、前後の本文、継承 `lang=ja` と入力 ID を照合した。
制御試験の実行 ID は `4496d223-8430-490f-b2e6-2da257c4e997` で、同日22:59:00–22:59:30 JSTだった。

| 入力 | 看板の原文 | 先頭空白数 | 字下げ CSS px |
| --- | --- | --- | --- |
| `DOWN` | Elm Street and University Avenue | 2 | 8.5 |
| `DOWN` | (Rockvil U) | 12 | 51 |
| `DOWN` | (Brown Tubeline Terminus) | 5 | 21.25 |
| `WAIT FOR 1 MINUTE` | Skybus Terminal | 10 | 42.5 |
| `WAIT FOR 1 MINUTE` | (Transfer Between Brown and Red) | 2 | 8.5 |
| `OUT` | Skybus Terminal | 10 | 42.5 |
| `OUT` | (Transfer Between Brown and Red) | 2 | 8.5 |

既存 2b は1行を1段落として出力し、カタログの `translation.text` の U+00A0 を保持した。
開扉文は到着看板の後、中央ホームの本文は降車後の看板の前に残った。
この構造に新しい block kind、renderer、CSS は不要だった。
未翻訳の一般 fallback では空白が正規化されるため、上の結果は字下げを持つ既知の看板行を既存カタログで扱える範囲に限る。
試験値は翻訳の承認や対応範囲の決定に使わず、2件の自然実測 fixture には含めていない。 [既存 projector](../app/story-presentation.ts)

### 現行 UI と操作の判定

| 表示と操作 | 実測と後続で使う条件 |
| --- | --- |
| Home の Guided draft | 併用で現行の建物入口マーカーを選び、`sw` の draft を作ってから Send。地図と draft の操作中は `line-416` のまま |
| Transit 地図 | Elm & University で `Transit, fieldwork destination` を選ぶと、`4 steps · next EAST toward Elm & Park`。現行の目的地は地上の `SKYBUS-TERMINAL`。地図選択は入力を進めず、乗車駅の証拠には使わない |
| ホームと車内の表示 | Main と companion に `Tube Station` / `Tubecar`、identity rail に PRISM / 2041 / Release 79。University では汎用の NW / SE、降車後は NE / NW / SE / SW、車内では出口なしを表示した。これらの汎用表示から開扉や条件付き移動を確定できない |
| 入駅、待機、乗降、地上出口 | `DOWN`、`WAIT FOR 1 MINUTE`、`IN`、`OUT`、`UP` は実フォームで送信した。監査箇所の main / companion にその専用操作は現れなかった。汎用の `Wait` は別コマンド `wait` を送る |
| 録画と補助表示 | UI 併用の `Record` と `Stop recording` が `record` / `record off` を各1回送った。地上入口で補助表示は `8/9 recorded`、降車・停止後と公園で `9/9 recorded`。採取の合否はこの表示と独立に raw の本文と状態で判定した |
| 初回2041年の観測と失効 | 同じセッションで直前の確定した所在と fresh な echo、status、新しい入力 ID を必要とする。開扉中の乗降候補は観測直後の入力でだけ有効とし、発車、送信後の状態未確認、矛盾・欠落、不安定入力、未知の駅や車両、再起動 / RESTORE で失効させる |

`surfaceAudit` は地上入口、University、録画開始後の車内、車内到着、Junction での OFF、公園の各時点で前後の入力 ID と accessibility snapshot を保持する。
既存の地図と課題 index 4、新しい看板の各行、2つのホーム、車両、地上のターミナルを別の対象として扱う。
補助表示の内部判定、支援の日本語化、新規操作は T2 / T3 の範囲である。 [地図の定義](../app/StoryTools.tsx) [既存操作](../app/PrismEdition.tsx)

### 検証とレビュー

`retains two complete transit sessions after the accepted home prefix` は先行111入力、録画窓、実送信と raw の対応、待機、同定、降車・明示 OFF、帰着と別 probes を実 fixture で検証する。
旧経路の停止回帰も保持した。
対象回帰2件、`npm run lint`、`npx tsc --noEmit`、`npm test`（57件）、CI 制御テスト（15件）、canonical SHA-256 と差分チェックを実行した。
fixture を含むため CI 分類は Full である。
独立 Sol の採択と、最終 head / base の手動 Full・readiness を経てマージする。
ローカルの全ブラウザー群は実行していない。

## 旧経路で録画が自動停止した実測

[T1 #127](https://github.com/5gmt/mind-forever-voyaging/issues/127) の最初のフォーム試行で、Home の111送信を保持したまま University 駅から Brownline に乗車した。
車内で録画を開始し、Junction の看板と開扉を観測した131送信目で、原作が録画バッファ満杯を警告して録画を自動停止した。
同じ入力の直前は録画中で、到着後のステータスは非録画の `Tubecar` だった。
この時点で [計画の停止条件](plans/2041-transit-fieldwork.md#候補経路と採択gate) に従って採取を止め、経路と録画容量の設計判断を Astra / ChatGPT Work に戻す。
明示 OFF、降車、地上への復帰、公園帰着、UI併用の完走試行、別セッションの三つの拒否確認は未実施である。
この失敗証拠のマージで T2 #128 と T3 #129 の開始条件は解除されない。

**設計判断追記（2026-11-28 JST）:** Workは[交通候補A（発車後録画）](transit-recording-window-decision.md)を次の再試行候補として承認した。本文とfixtureは旧経路の失敗記録を保持する。ここに示す採取コマンドもまだ旧経路を実行するため、新候補の再試行には後続T1 PRでcaptureの更新が必要。候補Aの成功は未実測であり、T1完了とは扱わない。

### 採取と再現

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

次のコマンドは PR #131 のマージ時点を別の作業コピーに checkout して実行する。

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

[#131 時点の採取スクリプト](https://github.com/5gmt/mind-forever-voyaging/blob/8ae775ffc5a7029e710a4777465e494d4bffb971/scripts/capture-transit-runtime.mjs) は実行ごとに一時ディレクトリを作り、次の送信前に `parchment-transit-runtime.partial.json` を更新する。
旧試行で full セッションが停止条件に達した場合は、最後の報告と途中経過を failure 出力に保存して exit 1 で終了する。
同名の既存成果物は上書きしない。

### 入力と録画状態

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

### 場所の識別と原文

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

### 操作と失効条件

| 表示や操作 | 実測と保留事項 |
| --- | --- |
| 現在地と identity rail | Classic の地上入口、University ホーム、録画開始直後の車内で snapshot を保存。場所表示は `Elm & University` / `Tube Station` / `Tubecar`。Identity rail は PRISM、Simulation、2041、Release 79。各 snapshot の前後で入力 ID は同じ |
| 入駅、乗車、降車、地上への復帰 | `DOWN` と `IN` はフォームで送信した。Classic の監査で compass、専用 scene action、quick actions は表示されなかった。 `OUT` と `UP` は停止後のため未送信 |
| 待機と録画 | `WAIT FOR 1 MINUTE` と `RECORD` はフォームで送信。現行コードの汎用 `Wait` は `wait` を送る。Assisted の既存 `Record` / `Stop recording` はコード上で確認した。今回の交通区間ではクリックしていない |
| 地図と課題 | 現行コードの `transit` は `SKYBUS-TERMINAL` を指す。課題 index 4 の既存ラベルは `Ride public transportation` / `何らかの公共交通機関に乗ること`。候補の乗車入口 Elm & University、Junction の看板、各ホーム、車内は別の対象 |
| 後続の限定観測 | 初回2041年の同一セッションで、直前の確定した所在、新しい echo / 入力 ID、raw status、同じ入力の開扉文を組み合わせる。発車、前回の入力 ID の再配信、矛盾、欠落や不安定な report、未知の移動、再起動や RESTORE で古い乗降根拠を失効させる。131送信目の開扉は降車候補の証拠だが、同じ入力の自動停止で録画成功の条件は失われる |

現行 UI の併用試行、停車中の実降車、三つの別 fresh probe、companion 側の交通操作は停止条件の後に残った。
この台帳の待機回数、操作および識別の条件は独立 Sol の採択を経ていない。 [地図の定義](../app/StoryTools.tsx) [通常操作](../app/PrismEdition.tsx)

### 検証と引き継ぎ

回帰 `retains the transit capacity failure after the accepted home prefix` は、111入力、先行の必須本文と録画窓、各入力の ID 連鎖、乗車、満杯警告、停止後の通常入力を保持する。
`npm run lint`、`npx tsc --noEmit`、`npm test`（56件）、CI 制御テスト（15件）、canonical SHA-256、`git diff --check` が通った。
fixture を含むため CI 分類は Full である。
独立 Sol がレビュー済みの head / base で手動 Full と readiness を扱う。
ローカルの全ブラウザー群は実行していない。
