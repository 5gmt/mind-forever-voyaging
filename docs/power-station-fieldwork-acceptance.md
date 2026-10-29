# 2041年 Power Station の受入記録

## 提出時点の状態

P3 / [#96](https://github.com/5gmt/mind-forever-voyaging/issues/96) の実装と検証を、Sol 通常レビューと Astra / ChatGPT Work の全体受入へ渡すための記録である。
本書の提出だけで独立レビュー、マイルストーン全体受入、merge、#29 報告、Issue close を完了としない。
最終 head / base、current-head CI と artifact、実際の保持期限、review 後の差分は提出 PR を正本とする。

開始根拠は P1 / [PR #98](https://github.com/5gmt/mind-forever-voyaging/pull/98) の採択と merge `df1b5c5295f67cae556d1ffd85b589b917a4f657`、P2 / [PR #99 の独立 copy review](https://github.com/5gmt/mind-forever-voyaging/pull/99#pullrequestreview-5691442332)と merge `f4a489ee2484c7f1656ce6bfac3a9c0221b3119e`、[#96 の開始通知](https://github.com/5gmt/mind-forever-voyaging/issues/96#issuecomment-6484489370)である。
実装の base は後者の merge と同じ最新 `codex/modern-amfv` とする。
原文の正本は [P1 fixture](../tests/fixtures/parchment-power-station-runtime-observed.json)、訳文と操作契約は[承認 copy packet](power-station-copy-packet.md)、計画は[発電所計画](plans/2041-power-station-fieldwork.md)である。

## 実装の範囲と保証

承認済み H1–H7 / D1–D7 の14 exact leaf を、実測した command と full direction alias ごとに既存 catalog へ追加した。
7地点の room 表示と map `power` を別の lookup に接続し、assignment index 2 と object `POWER-STATION-OBJECT` を統合していない。
raw `Style_normal` の地名行は承認どおり title とし、段落、空行、command echo、optional output の順番を保つ。
本文は核融合炉での発電とマイクロ波受信装置群による受電を保持し、後続年の石炭や未観測の prose を加えていない。

新規本文の初回2041年 scope は、既存 host が raw English から確定する first-entry / mode / year / room に限定した。
`powerStation2041` を既存 presentation history entry に保存し、表示時には14 leaf の対応 room と照合する。
現在地や locale の変更で過去の正しい日本語を再分類せず、未知 room、別年、再入場、Part II、QA、RESTORE 後の不明状態へ新しい翻訳を持ち込まない。
City Hall の観測時 scope と人物 guard は同じ条件を維持している。
新 session の opening input ID が前 session と同じでも、line-input 履歴があれば古い timeline を破棄する。
RED で再現した後に同 ID の照合順だけを修正し、起動中の重複 report による PART I の enrichment は既存回帰で保持した。
新しい renderer、汎用 context engine、VM telemetry、parser、actor / object 操作は追加していない。

原作 Release 79 / Parchment が parser と state の権威であり、送信と状態認識は English のままである。
canonical binary、historical source、QA story、production dependencies、deployment は変更していない。
2a+2b、per-leaf English fallback、history / recovery、単一 accessibility owner と reading preferences を保持する。

## 受入条件と証拠の対応

| 条件 | 実装 / テスト | 保存する証拠 |
| --- | --- | --- |
| 14 leaf、7 room、map の統合 | [unit regression](../tests/rendered-html.test.mjs) の `projects the approved Power Station packet only for its observed room and aliases` | P1 の53非空 response leaf と承認 packet の照合、title / prose / spacer / sourceLines、alias、object / Cinema fallback。 |
| 観測時 scope と履歴 | unit の `retains Power Station observation scope across locale, later rooms and recovery`、[controlled probes](../tests/e2e/power-station-acceptance.ts) | `power-station-controlled-history.json` / `power-station-controlled-scope.json`、対応 PNG と accessibility TXT。 |
| 6つの自然な67送信 | [新規 suite](../tests/e2e/power-station-fieldwork.spec.ts) の Classic / Guided / Actions × desktop / narrow | 各 `power-station-runtime-observations.json`。先行50送信、起動 character input、decoder answer、new echo と次 input ID、新17 turn を保存。 |
| 非録画到着、録画 LOOK、明示 OFF、公園通常入力 | 同じ6経路の raw status と current input chain | `powerTurns`、全67送信の `trace.inputs` / `trace.requests`、`power-station-return.png`。 |
| Assisted の actual controls | Guided map draft → 編集 →明示 Send、Actions map route と compass、RECORD / LOOK / OFF | actual English aliases、1操作1 request、draft 中の未送信、各 raw echo と input ID。 |
| 入口と施設内、map current suffix、課題 index 2 | 自然経路の入口 / 施設内 / 帰着の map 監査 | `power-station-entrance*`、`power-station-facility-off*`、`power-station-inference*`、`power-station-return-map*` の PNG / accessibility TXT。 |
| 補助推定5/9と負例4/9 | 別 fresh Actions / desktop session の入口だけ録画、施設内非録画 LOOK | 負例の `power-station-runtime-observations.json` と `power-station-negative-recorded-entrance*`。正常な6経路と混ぜない。 |
| 長い本文、scroll、入力と地図への到達 | 各自然経路の長い Wicker 描写と施設内 LOOK、現地と帰着後の locale 往復、最終入力 | `power-station-wicker-reading.json` / PNG、`power-station-reading.json` / `power-station-reading-ja.png`、`power-station-recovery-*`、`power-station-return-reading.json` と `power-station-return-recovery-*` TXT / PNG。 |
| English fallback を維持 | optional leaf と未観測変種、別 scope、map `movie` / `Cinema` | unit と controlled probes、既存 [first Simulation suite](../tests/e2e/first-simulation-localization.spec.ts) の新しい Power Station 正例と Cinema の `lang=en`。 |
| 既存43件を保持 | City Hall / Restaurant / Simulation など既存 suite の全 assertion を維持 | full E2E の結果、City Hall controlled 2件を含む JSON / PNG / TXT の実ファイル。 |
| CI artifact の保存 | [共通保存 helper](../tests/e2e/evidence-attachments.ts) が `testInfo.outputPath` へ write して path を添付 | Passing ZIP 内に Power Station と City Hall の controlled JSON が存在することを確認し、PR に実リンクと expiry を記録。 |

## 自然な経路と入力の記録

6経路は1440×900と390×844の各 viewport で、Classic、Guided、Actions をそれぞれ fresh context から実行する。
既存 `acceptCityHallMilestone` を既定の録画ありで呼び、先行四課題の50送信と全 assertion を再利用する。
同 helper が残す未送信 LOOK draft を消してから、採択された次の17送信へ進む。

```text
SE E S S SE SE S
RECORD LOOK RECORD OFF
N NW NW N N W NW
```

Guided の往路は実際の map route で editable English draft を作り、編集可能で送信前には input ID が変わらないことを確認して明示 submit する。
Actions の往路は map route の明示1押下で送り、復路は Assisted 両 mode とも現行契約どおり compass から直接送信する。
RECORD、LOOK、OFF も実 control を使い、Classic には assisted controls や checklist を追加しない。

`trace.requests` は iframe が受けた parent-to-player request で、起動の空白1文字と67 line submissions を区別する。
`trace.inputs` は既存 bridge の actual report で、起動 character input、通常入力、質問行に追記される numeric decoder answer、新 echo と次 input ID の連鎖を持つ。
`powerTurns.status` は追加17 turn の live GridWindow `textContent` を未加工で保存する。
`trace.inputs.status` は bridge が報告する表示上の English status（CSS による大文字化を含む）で、両者を source の値から補完しない。
同じ移動 command の過去 echo を成功の証拠へ使わず、すべて current input の行 ID から照合する。

Half-full warning と街路の optional output は元の行と空行を保持する。
full / auto-deactivation、意図しない mode、録画不成立、通常入力への復帰不能があればテストを失敗させる。
残容量の数値と原作内部の正式課題 flag は読み取らない。

実装中の自然な targeted run で得た記録を次に示す。
これは未完走の full run を成功扱いした表ではない。
最終 head の全52件、追加した帰還後の末尾確認、CI 実行時間と artifact は提出 PR の current-head check と添付を正本とする。

| Mode / viewport | UTC 開始–終了（2026-10-29） | line 送信 | 最終 input ID | 補助表示 |
| --- | --- | ---: | --- | --- |
| classic / 1440×900 | 01:20:38–01:21:57 | 67 | `line-306` | 表示なし |
| guided / 1440×900 | 00:51:54–00:53:58 | 67 | `line-304` | 5/9 |
| actions / 1440×900 | 00:53:58–00:55:44 | 67 | `line-304` | 5/9 |
| classic / 390×844 | 00:55:44–00:56:36 | 67 | `line-309` | 表示なし |
| guided / 390×844 | 00:56:36–00:58:02 | 67 | `line-305` | 5/9 |
| actions / 390×844 | 00:58:02–00:59:23 | 67 | `line-305` | 5/9 |
| actions / 1440×900 / 負例 | 01:05:26–01:07:38 | 68 | `line-310` | 4/9 |

7 session とも half-full warning は1回、full / auto-deactivation は0回で、公園の非録画 line input へ戻った。
Desktop は各 turn の時計と日付を raw status で確認し、390px は原作出力がないため未観測とする。


## 負例と controlled probes の区別

自然な負例は、先行四課題後に入口へ行き、RECORD → LOOK → OFF、施設へ非録画で移動して LOOK、公園へ戻る別 session である。
入口 LOOK の新しい応答 context は copy 承認対象外なので、その本文は English fallback として確認する。
施設内の承認済み非録画 LOOK は日本語にできるが、録画の補助推定を加算しない。
補助 checklist は全区間で4/9を保持し、先行四課題を失わない。
これは原作の正式な九課題評価を観測した結果ではない。

controlled probes は実 VM を起動時の状態に置いたまま wrapper report を差し替える検証であり、自然な route evidence と区別する。
既存 history の正しい日本語、未知 room と入口に現れた同文、2051年、長い末尾履歴、EN → JA → EN、RESTORE の不明状態、新 session、再入場、Part II、QA、busy と char-input の境界を検証する。
QA に切り替える前に本 probe の transcript interceptor を解除し、新しい active frame の report が実際に wrapper へ届くようにする。
100 turn の長い末尾だけを渡す probe は、最新 WAIT の日本語応答と公園表示への更新を確認してから、末尾に含まれない以前の日本語を照合する。
実 saved-game の RESTORE、VM state の書き換え、別年の自然なプレイ成功を主張しない。

## 検証結果と失敗の扱い

| 検証 | 結果 / 正本 |
| --- | --- |
| `npm ci` | committed lockfile、npm 11.17.0 で成功。Local Node 24.19.0、CI は既存 Node 22。 |
| `npm run lint` / `npx tsc --noEmit` | 成功。最終差分の再確認結果は提出 PR。 |
| `npm test` | production build と39/39 unit tests が成功。Baseline36件に packet / history / repeated-opening-ID の3件を追加。 |
| 自然な経路 | 上表の6 positive と別68送信 negative が成功。 |
| local full E2E の初回 | QA controlled probe で1失敗。39成功、1中断、11未実行の時点で中断。全体成功とは扱わない。 |
| 修正後の local recheck | controlled 2件と Classic / 390px の自然な67送信が3/3成功（1.4分）。最終差分の CI と区別する。 |
| 最終 head の full52 E2E | current-head CI の結果、browser job の35分上限に対する実測時間と artifact は提出 PR を正本とする。Retry、skip、並列化による回避を追加しない。 |
| checksum / diff | canonical SHA-256 は規定値のまま、`git diff --check` 成功。保護対象の変更なし。 |

新しい unit の RED は、未登録の room / copy と、同じ opening input ID を使う fresh session が旧 scoped timeline を残すことを再現した。
最小の catalog / scope 追加と照合順の修正後、既存の PART I enrichment を含む39件が GREEN になった。

新規 browser test の初期失敗では、存在しない host selector、CSS により大文字化された status の期待、未承認入口 LOOK の結合 fallback、command 前後の表示上の空白を修正した。
これらを production の不具合として扱わず、raw native status と既存 projector の仕様に合わせた。
初回には trace streaming / truncated ZIP のエラーもあり、その後の再実行で再発していない。

Local full run では、QA の実 opening を待って合成 report を送った後、debounce された実 startup report が上書きし、header が `Rockvil` へ戻る race を trace で確認した。
新しい active QA frame でも controlled transcript の経路を明示的に切り替え、ready / host lifecycle は通すよう修正した。
VM 出力は変えず、合成 report が受理された `Power Station` header と日本語不採用を照合する。
修正前の失敗を消さず、対象再検証と最終 CI を区別する。
帰着時の追加確認では、公園への再訪が heading だけを出すため、以前の施設 prose ではなく実際の最終応答である公園 heading を末尾の可視性の照合先にした。

Passing attachment の local 実ファイル保存は確認できる。
GitHub connector から artifact ZIP の取得参照を得られるが、その File Service URL を local へ転送する通信は proxy の403で拒否された。
このため CI ZIP 内のファイル実体確認は成功と主張せず、PR に取得参照・実 expiry と残る確認項目を記録する。
保持期間は既存の14日を維持する。


## レビューと残る受入 gate

本書の実装側点検は独立した Chat モード Sol の通常レビューや、Astra / ChatGPT Work のマイルストーン全体受入を代替しない。
実装側の read-only reviewer は、帰還後の locale / accessibility owner の確認不足と長い末尾 report の処理完了確認不足を指摘した。
両方をテストと保存証拠へ追加し、production scope の新たな不具合指摘はなかった。
通常レビュー後の同じ最終 head について、6経路と負例の証拠、current-head CI / artifact / expiry、未解決指摘、変更差分を Work へ渡す。
最終 merge、#29 roll-up、#96 close の実施時刻と判断は PR review / Issue / #29 に記録する。

| 項目 | 提出時点 |
| --- | --- |
| 実装と実装側点検 | 本 PR の変更と上記の検証結果を対象とする。 |
| Sol 通常レビュー回数と差し戻し | 未実施。PR の review を正本として追記する。 |
| Work 全体受入と merge | 未実施。通常レビュー後の同一最終 head で行う。 |
| 引継ぎから全体受入までの経過時間 | 未確定。引継ぎ / 受入の実時刻で記録し、推計しない。 |

実 screen reader の音声、実保存データの RESTORE、対象経路外の timed events、後続年と再入場の自然な完走、本番配備は未検証である。
390pxで原作が出力しない時計と日付は未観測とし、wide session や source の値で補わない。
未計測の usage 削減、未実施の独立承認、正式な原作課題達成を成功として記録しない。
