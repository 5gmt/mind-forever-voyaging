# Cinema 候補Aの連続経路の実測

## F1 の提出判断

候補Aは、2つの独立 fresh canonical session で先行六課題から映画鑑賞録画と Kennedy Park 帰着まで、各96 line submissionsを完走した。
裁判所は現地の RECORD / LOOK / RECORD OFF だけを録画し、映画の15分鑑賞前後で raw recording status が維持された。
Full / auto-deactivation はなく、明示 OFF、映画後 LOOK、公園の非録画の通常 line input を確認した。
成功経路と操作契約を、独立した Chat モード Sol の採択候補として提出する。
**独立成功採択と merge までは F1 #108 を完了とせず、F2 #109 / F3 #110 の開始条件を解除しない。**

再開根拠は [Work の設計判断](https://github.com/5gmt/mind-forever-voyaging/pull/112#issuecomment-6680461163)、[PR #113 の独立 Sol review](https://github.com/5gmt/mind-forever-voyaging/pull/113#pullrequestreview-5800692845)と merge `f527d07084e0055d13d35dd64148fa00e57c866e` である。
この commit を最新 default branch と照合して base にした。
[候補Aの設計](cinema-recording-a-design.md)が許可した12–18番目の7送信だけを置換し、既存 milestone の採択経路と録画窓、[旧容量不足の証拠](cinema-runtime-evidence.md)、既存 fixture / regression は変更していない。

## 成果物と再現

| 成果物 | 内容 |
| --- | --- |
| [capture](../scripts/capture-cinema-runtime.mjs) | 明示 `--candidate-a` で裁判所の現地録画を選び、専用出力先を使う。Flag なしは旧候補を維持する。 |
| [成功採択候補 fixture](../tests/fixtures/parchment-cinema-recording-a-observed.json) | `candidateA=true` は capture の選択肢を示す。`outcome=adoption-pending`。2 sessions と別 fresh `noTicketProbe` の実測を保存し、VM の内部 flag とは扱わない。 |
| [regression](../tests/rendered-html.test.mjs) | `retains two complete cinema candidate A sessions with on-site courthouse recording`。Prefix 全体の7送信置換、非 RECORD 順、六課題の本文と録画、全入力対応、映画、明示 OFF、帰着、UI、形状と fallback を検査する。旧失敗回帰も維持する。 |
| [採択済み先行経路](church-runtime-evidence.md) | 81送信の比較元。裁判所の7送信以外の全順序と録画状態を保持する。 |

Production static export をローカル preview の `http://127.0.0.1:3101` で実行した。
両 session は1440×900の新しい browser context を使い、保存データを引き継いでいない。
Session 1 は2026-11-06 22:37:09–22:39:23 JST、session 2 は22:39:23–22:41:56 JSTに採取した。
別 fresh 券なし probe は22:41:57–22:42:00 JSTに採取した。
候補Aの途中失敗や harness failure はなかった。

```bash
bash scripts/bootstrap-npm.sh # npm が古い場合
npm ci
npx playwright install chromium
npm run build
python3 -m http.server 3100 --bind 127.0.0.1 --directory out
# 別 terminal
node scripts/capture-cinema-runtime.mjs --candidate-a \
  --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-cinema-recording-a-observed.json \
  --failure-output /tmp/parchment-cinema-recording-a-failure.json
```

今回も上記と同じ command を preview port 3101 に向けて実行し、生成された全 fixture をそのまま保存した。
2つの成功候補は一回の capture 実行で採取し、別の session の課題や本文を合成していない。
途中経過は `.partial`、失敗時は別 failure 出力へ保存し、不完全な採取を成功 fixture にしない。

各 full session は96 line submissions / 95 combined observations / 97 parent-to-player requestsである。
起動空白1文字を `startup.inputKind=char` として分離した。
Decoder は実質問、実回答（session 1 は `96`、session 2 は `41`）、input run 上の数値 echo、次 input を保存した。
質問と回答をまとめた `observations[5]` があるため、observations は submissions より1件少ない。
数値回答の独立した echo 行を合成せず、全実送信で current input ID → 新 echo → distinct next input ID を連鎖させている。
Session 1 は数値回答を含め通常フォーム、session 2 は既存 decoder button を使った。

## 先行81送信と録画の保持

| 実送信番号 / observations index | 候補Aの command | raw location / recording |
| --- | --- | --- |
| 12 / 10 | `SW` | Elm & Park、非録画 |
| 13 / 11 | `NW` | Courthouse、非録画 |
| 14 / 12 | `RECORD` | Courthouse、録画中 |
| 15 / 13 | `LOOK` | Courthouse、録画中。裁判本文を出力。 |
| 16 / 14 | `RECORD OFF` | Courthouse、非録画。明示停止応答。 |
| 17 / 15 | `SE` | Elm & Park、非録画 |
| 18 / 16 | `NE` | Kennedy Park、非録画 |

1–11番目と19–81番目は既存教会 fixture と一致する。
実 decoder answer と既存 direction alias の正規化を除き、81件全体を上記の明示置換と照合し、全非 RECORD command の順序も一致させた。
裁判所の LOOK は両 session とも exact leaf `The court is in session. A woman is being tried for petty theft.` を録画中に出した。

| 録画対象 | observations index | 確認した成立と停止 |
| --- | --- | --- |
| Courthouse | 12–14 | 上記の LOOK 本文と前後の recording status、明示 OFF。 |
| Newspaper | 21–24 | 購入の残高 $599、記事全文の四段落を録画中に保持し、明示 OFF。 |
| Restaurant | 32–34 | Hot and Sour soup、支払 $30、残高 $569、食事全文を録画中に保持し、明示 OFF。 |
| City Hall | 42–44 | Government official との実会話と退場を録画中に保持し、明示 OFF。 |
| Power Station | 56–58 | 施設内 LOOK の本文を録画中に保持し、明示 OFF。 |
| Church | 71–73 | Church elder との実会話と退場を録画中に保持し、明示 OFF。 |

最初の Kennedy Park の RECORD / WAIT / OFF も維持した。
候補Aの裁判所だけに expected location / recording status の明示置換を適用し、prefix 全体の assertion は削除していない。
各課題の必須本文は既採択2 sessionに共通する exact leaf と照合し、全記事 READ や会話を位置情報だけで成功扱いしていない。

半量警告は両 session とも `observations[33]` の `BUY MEAL` に出た。
Session 1 は1:33pm、session 2 は12:57pm、location は Roy's Pagoda、recording 中で、exact leaf は `WARNING: Record buffer is now half-full.` である。
旧候補の `observations[32] / RECORD` から位置が移った実値を保存した。
84分という設計上の見積りを、VM内部の SIZE や実測残量と呼ばない。

## 映画鑑賞と帰着

| 実送信番号 / index | command | 観測 |
| --- | --- | --- |
| 82–86 / 80–84 | `NE N NE E NW` | Main & Kennedy → Centre & Kennedy → Bodanski Square → Museum Entrance → Cinema、非録画。 |
| 87 / 85 | `BUY TICKET` | 原作の購入成功応答。$569 から `NEW BALANCE: $554`、ticket を受領。 |
| 88 / 86 | `RECORD` | `Record feature activated.`、Cinema、録画中。 |
| 89 / 87 | `IN` | 映画本文とロビーへ戻る文、Cinema、引き続き録画中。 |
| 90 / 88 | `RECORD OFF` | `Record feature deactivated.`、Cinema、非録画。 |
| 91 / 89 | `LOOK` | Cinema の見出しと Downtown Cinema Quad のロビー本文、通常入力。 |
| 92–96 / 90–94 | `SE W SW S SW` | Museum Entrance → Bodanski Square → Centre & Kennedy → Main & Kennedy → Kennedy Park、非録画の通常入力。 |

| session | 原作の日付 | RECORD 後 | IN 後 | 明示 OFF 後 | LOOK 後 | 公園帰着 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 6/2/2041 | 5:16pm | 5:31pm | 5:32pm | 5:33pm | 5:58pm |
| 2 | 5/16/2041 | 4:40pm | 4:55pm | 4:56pm | 4:57pm | 5:22pm |

いずれも IN の経過は15分で、その前後とも raw mode は `Simulation Mode (recording)`。
Full / auto-deactivation / not-currently-active の警告は全経路にない。
成功根拠はこの連続した raw evidence と明示 OFF、通常入力であり、補助7/9や source 上の課題 flag のみから推論していない。

## Leaf と構造の台帳

以下は候補Aの2 sessionsで実際に一致した必須 English leaf であり、翻訳承認ではない。
Index は `observations`、line は `presentation.lines` を指す。

| index | exact English leaf | identity / 分類 |
| --- | --- | --- |
| 83 | Museum Entrance | 新規地名。Map の Railroad Museum とは別の表示箇所。 |
| 83 | Standing on the south side of Bodanski Boulevard is the Railroad Museum. The street runs east toward the park and west toward the square. North of here is a car lot and to the northwest is a huge cinema complex. | 必須の場所本文。展示館全体の承認を意味しない。 |
| 84 / 89 | Cinema | Raw 現在地 CINEMA と場所見出し。 |
| 84 / 89 | The Downtown Cinema Quad is a modern, four-theatre movie complex with all the latest holographic and personalized stereo technology. A marquee above the ticket "window" announces the current features. A hallway leads in to the theatres, and there are exits north and east to car lots, and southeast to the street. | 到着 / LOOK の必須本文。Downtown Cinema Quad は建物名。 |
| 85 | You insert your card into the ticket seller. A readout flashes "NEW BALANCE: $554" and a ticket pops out into your hands. | 観測した exact 金額と購入成功。未知額に regex で一般化しない。 |
| 86 / 88 | Record feature activated. / Record feature deactivated. | 既存録画 leaf の再利用。別々の turn にある。 |
| 87 / line 1 | The usher takes your ticket and you step into the darkened theatre and find an empty seat. | 入場本文。 |
| 87 / line 3 | Movie Theatre | 一ターン内の本文見出し。Raw run は `Style_normal`、現在地は CINEMA のまま。 |
| 87 / line 4 | You begin watching "Upbeat Patrol II," which is funny and fast-moving like the prequel, but seems to lack some of the originality and freshness. The soundtrack, locations, and special effects are all top notch. After about fifteen minutes, you decide you've seen enough, and head out to the lobby. | 映画名、続編の評と15分でロビーへ戻る本文。 |
| 90 / 91 / 92 / 93 / 94 | Museum Entrance / Bodanski Square / Centre & Kennedy / Main & Kennedy / Kennedy Park | 非録画の帰路見出し。Bodanski Square の dispenser leaf は往路と同じ既存文。 |

映画 turn は echo、入場文、空行、Movie Theatre、映画評、空行、通常 prompt の7行である。
旧失敗 turn の full warning がないことも含め、各行と run、blank boundary を raw のまま保存した。
既存 English fallback が全非空 leaf を保持し、controlled approved anchor を追加した構造 probe でも ordinary projector の source-line と spacer 順を保持する。
この anchor は runtime 出力や新規日本語翻訳ではない。
新 projector、架空の theatre room / IN map exit は作成していない。

Dynamic は decoder の質問と回答、raw status の日付と時計、line ID、style 順序、capture timestamp、購入残高の可変値である。
時計や残高は観測した値に限り、未出力値や内部残量を補完しない。
映画区間で増えた optional leaf は次の2件を session と index 付きで保存した。

| session / index / location | exact optional leaf |
| --- | --- |
| 1 / 83 / Museum Entrance | A man with a shaved head asks your views on some obscure religious point, then wanders off into the crowds. |
| 2 / 80 / Main & Kennedy | A skycopter drones by far overhead and disappears into the distance. |

先行区間の optional interrupt と時刻依存の crowd 本文も各 presentation に保持し、旧 fixture の prose や警告位置に置き換えない。
Optional を必須の翻訳対象に自動追加せず、English fallback を維持する。
`READ TICKET` の乱数と整形、marquee の読取り、資金不足、再入場は未採取である。

## UI surface と送信契約の台帳

13 checkpoints × EN / JA × Classic / Guided / Actions × 2 sessionsの156 UI samplesを保存した。
`surfaceAudit` は location、identity rail、compass、main / companion SceneActions、recording reminder、command help、map の visible、accessible snapshot、lang と button disabled を持つ。
Guided の main / companion draft は実際に作り、送信せず消去して input ID 不変を確認した。

| Surface / identity | 観測した visible / accessible copy と条件 | 送信契約 / 実操作 |
| --- | --- | --- |
| Museum Entrance | Current place / context / compass は `Museum Entrance`、JA でも地名は `lang=en`。Map `railroad` は visible `RAILROAD MUSEUM` / accessible `Railroad Museum`、現地で `, current location`。 | 往路 E と復路 SE。Railroad Museum 内の観測ではない。 |
| Cinema / map `movie` | Current place は `Cinema`、JA でも `lang=en`。Map は visible `CINEMA`、accessible `Cinema, fieldwork destination`、現地で `, current location`。 | Map 選択は未送信。Compass の exits は N / E / SE、IN はない。 |
| Identity rail | PRISM / Simulation / 2041 / Rockvil、Release 79 の既存表示。 | 各 locale の実 leaf と継承 lang を保存。本文の Movie Theatre で現在地を変えない。 |
| 映画と券の identity | Movie Theatre は本文見出し、Downtown Cinema Quad は建物名、Upbeat Patrol II は映画名、TICKET は対象物。 | Current place や課題 index 7 と混同しない。 |
| 課題 index 7 | 実表示は `Go to a movie` / `映画を見に行くこと`。原作の `Going to a movie` に対応する既存承認ラベル。 | 鑑賞前6/9、鑑賞後と公園で補助7/9。正式評価の代用ではない。 |
| Guided route | `DRAFT NEXT STEP` / `次の移動を入力欄へ`。Editable English draft。 | Session 2 の `ne`, `north`, `ne`, `nw` を draft 後に明示 Send。Museum Entrance への `east` は Guided companion exit の1押下1送信。 |
| RECORD / OFF / LOOK | `Record` / `Stop recording` / `Look` と既存日本語 label。 | Session 2 で `record`, `record off`, `look` を quick action から1押下1送信。 |
| Recording reminder | Actions の購入前後に `Recording is off` / `Start recording`、JA は `録画は停止中` / `録画を開始`。課題名と RECORD を促す本文も保存。Guided では非表示。 | Reminder 自体の録画開始は未クリック。Quick Record を実操作したことと区別する。 |
| BUY TICKET / IN | 購入前の main / companion に専用 Buy / IN はない。`movie theatre Examine`、`ticket seller Examine`、`marquee Read` は入場の alias ではない。 | 両 session とも通常フォームで `BUY TICKET` / `IN`。支援不足を仮実装しない。 |
| 鑑賞直後の TICKET | Guided は `ticket Examine` → `examine ticket` の draft。Actions は ticket の `Examine` / `Take` / `Buy` が現れ、LOOK 後に元の seller / marquee の表示へ戻る。Main / companion で確認。 | いずれも表示 / 未送信 draft の監査。追加購入、Take、Read は実行しない。 |
| 帰路と公園 | Session 2 は JA Actions compass の `se`, `west`, `sw`, `south`, `sw`。公園名は既存訳 `ケネディ公園`。 | 全5送信と新 echo を確認。監査の選択先 Cinema が route preview に残る状態も保存し、それを現在地や追加の移動と扱わない。 |
| Guard | 既存 LOCAL-GLOBALS Enter / Leave 抑制と line input の送信可否を保持。 | 本 capture は通常 line input の観測。Busy / char / 他 phase の新 guard 実装や generalization は行わない。 |
| Classic | SceneActions / 補助 checklist を表示しない。 | Session 1 は数値回答と映画区間を含め通常 English form で送信。 |

新たな本文や操作 copy の承認、日本語 catalog への追加は F2 / F3 に残す。
F1 の desktop 2 sessions を、F3 の6 mode / viewport 完走、390px reading checkpoints、saved PNG / accessibility の全体監査として扱わない。

## 券なし probe と旧候補の保持

今回は #112 の probe を転記せず、同じ capture 実行で別 fresh `noTicketProbe` を再採取した。
13実送信 / 12観測 / 14 bridge requestsで、最初の simulation 入場までの7送信、最短往路5送信、券なし IN のみである。
Exact refusal は `You don't have a ticket.`、raw location は Cinema、非録画の通常 line input が保たれ、鑑賞本文は出ていない。
成功経路の先行六課題や96送信には含めない。

Flag なしの旧候補も `--session-ids 1` と別の work 出力先で再実行した。
旧 `RECORD SW NW LOOK SE NE RECORD OFF` を保持し、89実送信目の IN で full / auto-deactivation と非録画への遷移を再現した。
この local 確認は候補Aの失敗ではなく、default が旧候補のままであることの確認である。
既存 #112 の全 failure fixture / evidence / regression はそのまま残し、今回の追加成功候補や CI と混同しない。

## 検証と未検証の範囲

Local は既存 lockfile と npm 11.17.0 で `npm ci --offline --cache /workspace/.onboarding-cache/npm`、production build、lint、TypeScript、unit suiteを実行した。
新しい実測 regression は欠落 fixture で RED、採取した2 sessions と別 probeで GREEN。
旧失敗 regression も GREENで、unit suite は49件、failure / skipなし。
Full E2E は最終 head の CI を根拠とし、local full の重複実行は行わない。
CI の状態、head / base、artifact と実期限、review 後差分は PR 本文と checks を正本とする。

Canonical SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`。
Production code、canonical / QA story、historical source、以前の capture / fixture、dependencies、deployment、workflow は変更していない。
実 saved-game RESTORE、実 screen reader 音声、原作正式評価、VM内部の buffer 値、再入場 / 後続年、本番配備は未検証である。
実装者の証拠照合を独立 Sol の成功採択や、F3 の Work 最終 ZIP 監査として数えない。
