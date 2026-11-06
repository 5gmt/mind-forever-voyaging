# 2041 Cinema の容量不足の実測

## F1 の停止判断

F1 / [#108](https://github.com/5gmt/mind-forever-voyaging/issues/108) の候補96送信は、2つの fresh canonical session で89送信目の `IN` に到達した時点で停止した。
いずれも原作が `WARNING: Record buffer full. Auto-deactivation of record feature.` を出し、録画前の `Simulation Mode (recording)` が鑑賞後には `Simulation Mode` になった。
購入、15分鑑賞、Cinema の通常 line input への復帰は観測したが、全編録画の成功、明示 OFF、公園帰着は確認していない。
成功 fixture は作成せず、失敗証拠を提出する。

開始条件は、[計画 PR #111](https://github.com/5gmt/mind-forever-voyaging/pull/111) の独立 Sol 採択と merge `586b98c6a6f86b6fe3c3d9efc8868c0249b3d20b` によって解除済みである。
同じ commit が今回の base であり、2026-11-06 に最新 default branch と一致することを確認した。
先行81送信と録画窓を変えずに容量不足を観測したため、[計画の停止条件](plans/2041-cinema-fieldwork.md#f1-の採択と停止条件)に従い、経路設計を Astra / ChatGPT Work に戻す。
この evidence-only PR の merge では F1 の成功採択や F2 / F3 の開始条件を解除しない。

## 証拠と再現

| 成果物 | 内容 |
| --- | --- |
| [capture](../scripts/capture-cinema-runtime.mjs) | 先行81送信を既存教会 fixture と照合し、候補映画区間を実行する。失敗 context は最初の失敗 turn で止め、別の fresh context と券なし probe は独立に採取する。 |
| [failure fixture](../tests/fixtures/parchment-cinema-runtime-failure.json) | `sessions[0]` は canonical form、`sessions[1]` は現行 UI 併用。各89 line submissions / 88 combined observations / startup character input / 90 parent-to-player requests。`noTicketProbe` は別 context の13送信。`harnessAttempts` は最初の入力フォーム失敗。 |
| [regression](../tests/rendered-html.test.mjs) | `retains cinema capacity failures after the complete 81-command church prefix`。先行課題、録画窓、全 input chain、購入、15分、容量不足と自動停止、構造保持、UI 台帳、券なし拒否を固定する。 |
| [先行経路](church-runtime-evidence.md) | 教会までの81送信、六課題と全録画窓の採択証拠。既存 capture / fixture を変更していない。 |

両試行とも1440×900の production static export を使った。
Session 1 は2026-11-06 15:06:10–15:07:36 JST、session 2 は15:09:17–15:10:42 JSTに実施した。
原作の時計は開始時点が異なり、映画の録画開始から鑑賞後までの差は両方とも15分だった。
起動時の空白1文字を `startup.inputKind=char` として line submissions から分離した。
実 decoder answer は `submissions[6]` に保存し、質問 input、数値 echo、次 input を実 ID で連鎖させた。
`observations[5]` は decoder 交換をまとめた presentation であり、架空の独立した数値 echo 行を追加していない。

```bash
bash scripts/bootstrap-npm.sh # npm が古い場合
npm ci
npx playwright install chromium
npm run build
python3 -m http.server 3100 --bind 127.0.0.1 --directory out
# 別 terminal。現経路では容量不足のため exit 1、failure-output に保存する。
node scripts/capture-cinema-runtime.mjs \
  --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-cinema-runtime-observed.json \
  --failure-output /tmp/parchment-cinema-runtime-failure.json
```

デフォルトは2 fresh attempts と別 fresh probeを実行する。
今回の保存証拠は、最初の canonical 試行で停止を確認した後、`--session-ids 2` で assisted 試行と probe を採取して結合したもの。
1回目の失敗 turn は `submit` 内で止まったため、最後の `IN` には後処理の `roomId` / `submissionMethod` が付いていない。
同 turn の raw status / echo / input は残り、現在地は `Cinema` と確認できる。
修正後の capture は失敗 turn の操作方法と照合した room identity を付け、UI を監査してから停止する。
`--session-ids` の単独実行は成功採択用 fixture を出力せず、途中証拠として exit 1 にする。

最初の harness attempt は、Guided の security decoder が通常フォームを隠す状態で `#command-input` への入力を試みたため timeout した。
`harnessAttempts[0]` の `submittedCommands` は試行した数値回答を含む7件だが、実送信は6 line commandsで、数値は原作に到達していない。
`submissions` と `bridgeCommands` がこの差を示す。
Session 1 は decoder の実回答を読み取った後に Classic に切り替え、通常フォームで送った。
Session 2 と別 probe は既存 decoder button を使った。
この harness 修正は canonical 経路や録画窓を変えていない。

## 停止点の対応

| 実送信番号 / observations index | canonical command | raw location / recording | 観測結果 |
| --- | --- | --- | --- |
| 1–81 / 0–79 | 教会までの既採択列 | 既存 fixture と全地点、録画窓が一致 | 六課題を保持。Decoder answer と時計は実値。 |
| 82–86 / 80–84 | `NE N NE E NW` | Main & Kennedy → Centre & Kennedy → Bodanski Square → Museum Entrance → Cinema、非録画 | 往路を実測。 |
| 87 / 85 | `BUY TICKET` | Cinema、非録画 | `NEW BALANCE: $554` と ticket の排出。先行 meal の残高 $569 との差は $15。 |
| 88 / 86 | `RECORD` | Cinema、録画中 | `Record feature activated.` |
| 89 / 87 | `IN` | Cinema、録画停止 | 映画本文と full / auto-deactivation。Session 1 は3:34pm→3:49pm、session 2 は5:10pm→5:25pm。通常 line input が新 ID で復帰。 |
| 90–96 | `RECORD OFF LOOK SE W SW S SW` | 未実行 | 停止条件に従い送信しない。明示 OFF や公園帰着の証拠を合成しない。 |

両試行で先行 meal の録画開始時に `WARNING: Record buffer is now half-full.` があり、映画 `IN` で full warning が加わった。
原作の内部残量や部分録画の長さは観測していない。
Session 2 の停止後 UI は補助 `7/9 recorded` を表示したが、同じ turn の raw status と full warning が録画の自動停止を示すため、成功根拠には使わない。
Wrapper の推定表示を原作の正式評価とも呼ばない。

別 fresh `noTicketProbe` は、最初の simulation 入場までの7送信に最短往路5送信と未購入 `IN` を加えた13送信である。
最後の exact leaf は `You don't have a ticket.`。
現在地 `Cinema`、非録画、通常 line input が保たれ、鑑賞本文は出ていない。
成功経路や先行六課題の証拠とは混ぜていない。

## Leaf と構造の台帳

以下の index は各 session の `observations` を指す。
2つの試行に共通する必須 leaf を記録し、copy approval とは区別する。

| index | exact English leaf / identity | 分類 |
| --- | --- | --- |
| 83 | Museum Entrance | 新規地名。Railroad Museum 全体の翻訳承認ではない。 |
| 83 | Standing on the south side of Bodanski Boulevard is the Railroad Museum. The street runs east toward the park and west toward the square. North of here is a car lot and to the northwest is a huge cinema complex. | 観測必須本文。 |
| 84 | Cinema | Raw 現在地と部屋名。CINEMA に対応。 |
| 84 | The Downtown Cinema Quad is a modern, four-theatre movie complex with all the latest holographic and personalized stereo technology. A marquee above the ticket "window" announces the current features. A hallway leads in to the theatres, and there are exits north and east to car lots, and southeast to the street. | 観測必須本文。建物名 Downtown Cinema Quad を現在地名と分ける。 |
| 85 | You insert your card into the ticket seller. A readout flashes "NEW BALANCE: $554" and a ticket pops out into your hands. | 観測した exact 金額。未知の残高に一般化しない。 |
| 86 | Record feature activated. | 既存録画 leaf の再利用。 |
| 87 / line 1 | The usher takes your ticket and you step into the darkened theatre and find an empty seat. | 観測必須本文。 |
| 87 / line 3 | Movie Theatre | 一ターン内の本文見出し。別の world room ではない。Raw run は `Style_normal`。 |
| 87 / line 4 | You begin watching "Upbeat Patrol II," which is funny and fast-moving like the prequel, but seems to lack some of the originality and freshness. The soundtrack, locations, and special effects are all top notch. After about fifteen minutes, you decide you've seen enough, and head out to the lobby. | 映画名と映画評、15分でロビーへ戻る本文。録画成功の証明ではない。 |
| 87 / line 6 | WARNING: Record buffer full. Auto-deactivation of record feature. | 失敗の必須 leaf。削除、成功 fixture への流用をしない。 |
| probe 最終 turn | You don't have a ticket. | 別 fresh session の自然な拒否。 |

映画 turn の行順は、command echo、入場文、空行、Movie Theatre、映画評、空行、full warning、空行、prompt である。
既存 English fallback が全非空 leaf を保持することと、controlled approved anchor を追加した構造 probe が既存 ordinary projector の source-line、spacer 順を保持することを確認した。
構造 probe は runtime 出力や日本語 copy 正例とは扱わない。
`Movie Theatre` を見出しとして意味付ける場合は将来の copy 判断に残し、今回 renderer や catalog を追加しない。

Dynamic は decoder の質問と回答、raw clock / date、line ID、style 順序、capture timestamp、残高である。
Session 1 の `observations[40]` には Rockvil Centre 本文の末尾 `The street is bustling with lunchtime crowds.` が出た。
過去の church fixture の `The sidewalks and street are crowded with people.` と異なるが、原作の時刻依存の crowd 出力（`source/verbs.zil` の `CROWD-DESC`）に対応し、先行 command や録画窓の変更ではない。
この exact variant と English fallback を保持する。
映画区間の optional interrupt は session 2 / observations[80] / Main & Kennedy の `A car alarm shrieks momentarily, then trails off into merciful silence.` だった。
この原文を optional leaf として保存し、翻訳承認へ自動追加しない。
先行区間の optional interrupt は各 presentation にそのまま保存している。
`READ TICKET` の乱数と整形、marquee、資金不足、映画後の `LOOK` は未採取である。

## UI surface と送信契約の台帳

`surfaceAudit` は input ID を変えずに EN / JA × Classic / Guided / Actions を監査した48＋54 samplesである。
Visible、accessible snapshot、明示 lang と text leaf の継承 lang、button disabled、main / companion の Guided draft を保存した。
監査で作った draft は消去し、送信していない。

| Surface / identity | 観測した visible / accessible copy と条件 | 操作と未実施 |
| --- | --- | --- |
| Museum Entrance | Current place と compass / context の同名地名。JA でも English fallback、`lang=en`。 | 往路 `E`。復路は停止により未実行。 |
| map `railroad` | Visible `RAILROAD MUSEUM`、accessible `Railroad Museum`。Museum Entrance の目的地。 | 映画以外の展示や入館を承認しない。 |
| Cinema / CINEMA | Current place と context は `Cinema`。本文見出し Movie Theatre の後も同じ地点。JA でも `lang=en`。 | Map / compass の exits は N / E / SE。IN exit は出ない。 |
| map `movie` | Visible `CINEMA`、accessible `Cinema, fieldwork destination`。現地では `, current location` が付く。 | EN / JA とも地名は英語。選択は未送信。 |
| identity rail | PRISM / Simulation / 2041 / Rockvil と release 79 の既存表示。 | 各 sample の visible / accessible / lang を保存。新規翻訳承認を加えない。 |
| Movie Theatre / Downtown Cinema Quad / Upbeat Patrol II | それぞれ本文見出し、建物名、映画名。Raw English leaf。 | CINEMA の現在地や index 7 の課題名と別 identity。 |
| assignment index 7 | `Go to a movie` / `映画を観ること` の既承認ラベル。 | 停止後7/9は補助推定。成功条件を満たさない。 |
| Guided map route | `DRAFT NEXT STEP` / `次の移動を入力欄へ`。Editable English draft。 | Session 2 の `ne`, `north`, `ne`, `nw` を draft 後に明示 Send。選択と編集自体は未送信。 |
| Guided companion exit | Bodanski Square の `E` / Museum Entrance / `east`。 | Session 2 で `east` を1押下1送信。 |
| RECORD / OFF / LOOK | 既存 `Record` / `Stop recording` / `Look`、`録画開始` / `録画停止` / `見る`。 | Session 2 の `record` を quick action で実送信。映画後 OFF / LOOK は未送信。 |
| BUY TICKET | 入場前の main / companion に専用 Buy はない。券売人は `ticket seller Examine`。 | 両 session ともフォームで `BUY TICKET`。新規支援を仮実装しない。 |
| IN | Main / companion / compass に入場操作がない。`movie theatre Examine` は IN の別名ではない。 | 両 session ともフォームで `IN`。 |
| TICKET と停止後 Actions | 消費後の本文を観測した UI に `ticket` と `Examine` / `Take` / `Buy` が現れる。Guided draft は `examine ticket`。 | Actions の Buy は表示のみ。再購入、Take、Read を送信していない。事前の専用購入支援とは区別する。 |
| Generic guard | LOCAL-GLOBALS の Enter / Leave を抑える既存 `actionsFor` と、current line input に対する disabled を保持する。 | 実 capture は通常 line input。Busy / char / 他 phase の新規 guard 実装は範囲外。 |
| Classic | SceneActions と補助 checklist を表示しない。通常 English form。 | Session 1 の数値回答と89送信を実フォームで実行。監査後も映画区間はフォームを使用。 |

Main と companion の Guided draft は同じ command を作り、input ID を保持した。
Actions の未知操作を試したり、guard を緩めて購入 / 入場を通したりしていない。
Recording reminder の不在も空配列で保存し、存在したように補完していない。
Actions compass の復路操作は停止により未実施である。

## 検証と引継ぎ

Local は npm 11.17.0 と既存 lockfile を使った `npm ci`、production build、lint、TypeScript、fixture regression、unit suite、canonical checksum、diff を確認する。
最初の通常 sandbox では proxy 接続と Node test subprocess が遮断されたため、許可済みの追加 network access を使った。
npm は環境の準備済み11.17.0を利用し、`npm ci --offline --cache /workspace/.onboarding-cache/npm` が成功した。
Full E2E は最終 head の CI を根拠とし、local での重複 full run は行わない。
各 command の確定結果と CI / artifact / head / base は PR 本文で更新する。

Production code、canonical binary、historical source、非 canonical QA、既存 capture / fixture、dependencies、deployment、CI設定は変更しない。
Canonical SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`。
今回の回帰は停止証拠と fallback の保護であり、96送信の成功試験ではない。
実 saved-game RESTORE、実 screen reader 音声、原作正式評価、内部残量、後続年、本番配備は検証していない。

独立 Chat モード Sol は証拠、操作契約と停止判断をレビューする。
Canonical path を変更する判断は Astra / ChatGPT Work に戻し、F2 / F3 は引き続き blocked とする。
失敗採取後の実装者による照合は独立採択に数えない。
