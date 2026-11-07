# 2041年の映画館の統合検証

## 対象と承認根拠

F3 / [#110](https://github.com/5gmt/mind-forever-voyaging/issues/110) の実装者による検証記録である。
独立した Sol の通常レビューと Work/Astra の最終受入は、この記録の提出後に行う。
Milestone の完了、merge、Issue close はその受入記録を正本とする。

開始 base は `0ae47106ea4182d4df1db350742205c4988f725d`（PR #117 merge）である。
F1 は [PR #114 の独立 Sol 採択](https://github.com/5gmt/mind-forever-voyaging/pull/114#pullrequestreview-5802952413)、F2 は [PR #117 の独立 Sol copy 承認](https://github.com/5gmt/mind-forever-voyaging/pull/117#pullrequestreview-5810087796)を根拠とする。
[Copy packet](cinema-copy-packet.md) の H1–H3、D1–D5、N1、再利用 R1–R7、操作 U1–U8 を実装する。
原文は候補Aの fixture（blob `e1fbcdb8a77656553e83985526e8868613837161`）に固定し、旧失敗 fixture と既存回帰を保持する。

## 実装の境界

本文は既存の ordinary projector と観測時 room scope を使う。
`Movie Theatre` は IN の応答内の見出しで、raw 現在地は `CINEMA` のままである。
新規 leaf と新しい方向 alias は初回2041年の観測に限定し、履歴にはその scope を保存する。
未知金額、未承認文、別室、別年、再入場、Part II、QA、RESTORE 後の不明状態は英語へ fallback する。

購入と入場は、初回2041年、raw CINEMA、明示された line input のときだけ表示する。
Main と companion は同じ SceneActions を使い、busy 時には操作を無効にする。
Guided は編集可能な `BUY TICKET` / `IN` の draft と明示 Send、Actions は1押下1コマンドである。
券の所持や残高を管理せず、未購入でも IN の拒否を原作へ委ねる。
Classic に新しい操作や checklist はない。

映画の補助チェックは、新しい IN の完結した応答、案内文、見出し、採択された鑑賞本文、その前後の raw recording を照合する。
購入、ロビー LOOK、見出しだけ、非録画鑑賞、後付け RECORD は加点しない。
この推定を VM 内部 flag、録画残量、原作の正式評価と呼ばない。

## 証拠とテストの対応

自然経路の入口は `tests/e2e/cinema-fieldwork.spec.ts`、実装は `cinema-acceptance.ts` の `acceptCinemaMilestone` である。
各 test の出力ディレクトリを `T` と書く。
JSON、PNG、accessibility TXT は `T/<name>.<extension>` に保存してから path 添付する。
Playwright の `attachments/` 内に複製されたファイルは同じ添付の実体である。

| 受入条件 | 検査とファイル（各 T 内） |
| --- | --- |
| 候補Aの先行81件、六課題、裁判所 LOOK の録画 | `restaurant-turns.json`、`city-hall-runtime-observations.json`、`power-station-runtime-observations.json`、`church-runtime-observations.json`。`routeCandidate` と実コマンド列、各 helper の fixture 比較を保持。 |
| 六自然経路の96送信、別 fresh 負例の94送信 | `cinema-runtime-observations.json` の `trace.requests`、`trace.inputs`、`cinemaTurns`。起動 space は別記し、decoder answer の input run も照合。 |
| 非録画購入、鑑賞前後の recording、15分、明示 OFF / LOOK / 公園帰着 | 同 JSON の raw status と各 input→echo→next input。390px の未出力時計は `null` と limitation を保存。 |
| 実 UI、英日 visible / accessible copy、main / companion、draft の無送信 | `cinema-<stage>-<language>-main-accessibility.txt`、`...-companion-accessibility.txt`、同 JSON の `audits` と actual requests。購入は main、入場は companion も操作。 |
| 先行六課題と補助7/9、映画非録画の6/9、Classic 無支援 | `cinema-<stage>-brief.png`、`...-brief-accessibility.txt`、`...-drawer-bottom.json`、runtime JSON。チェック各項目を assertion。 |
| 地図の movie、raw CINEMA、現在地、架空の IN exit を作らない | `cinema-<stage>-route.png`、`...-route-accessibility.txt`、runtime JSON。地図は `映画館、調査目的地、現在地` を照合。 |
| 鑑賞後と帰着後の本文末尾、focus、input viewport、単一 owner | `cinema-movie-reading.json`、`cinema-return-reading.json`。各4 checkpoint の `beforeScreenshot` と `afterScreenshot` の一致を assertion。 |
| 同じ時点の reading / PNG / accessibility / lifecycle | `cinema-{movie,return}-recovery-{1,2,3,4}.png` と同名 `-accessibility.txt`、reading JSON の同じ checkpoint ID。Panel 監査前後と読み直した最終状態を分離。 |
| 最終帰着 PNG の時点一致 | `cinema-return.png` は `cinema-return-recovery-4.png` の検証済み Buffer と同じものを保存。 |
| 別室／別年、rolling history、locale 往復、RESTORE、Part II、再入場、fresh | controlled `history` と unit の `projects approved cinema leaves...`、`keeps newly approved cinema return aliases...`。 |
| busy、char、不明／欠落 input、欠落 status、他室／年、Classic、QA、未知金額／資金不足 | controlled `input-scope`。資金不足は `source/globals.zil` の VENDING から作った合成 leaf で、自然観測とは区別。 |
| 券なし、購入だけ、ロビー見出し、非録画、後付け RECORD、録画停止 | controlled `recording` と unit の `counts only the current complete cinema turn...`。拒否の原文は F1 の独立 fresh probe。 |

Controlled の3件は `cinema-controlled-{history,input-scope,recording}.json`、同名 PNG、同名 `-accessibility.txt` を保存する。
Parchment 自体の状態や出力を変更せず、wrapper への報告だけを置換している。
自然経路の完走や実 saved-game RESTORE の証拠には数えない。

## 検証結果

ローカルの自然7 session と controlled 3件を実行し、実装者が保存ファイルを照合した。
自然経路はすべて fresh canonical Release 79 で、RESTORE や VM 編集を使っていない。
起動 space は line 送信数に含めず、各表の T は `test-results/` 以下の実ディレクトリを示す。

| Controls | Viewport | 映画録画 | Line送信 | 鑑賞時刻差 | T |
| --- | --- | --- | ---: | --- | --- |
| classic | 1440×900 | あり | 96 | 15分 | `cinema-fieldwork-classic-r-70d2d-e-cinema-fieldwork-desktop--chromium` |
| guided | 1440×900 | あり | 96 | 15分 | `cinema-fieldwork-guided-re-454a3-e-cinema-fieldwork-desktop--chromium` |
| actions | 1440×900 | あり | 96 | 15分 | `cinema-fieldwork-actions-r-3e4f5-e-cinema-fieldwork-desktop--chromium` |
| classic | 390×844 | あり | 96 | 未出力（null） | `cinema-fieldwork-classic-r-17b82-te-cinema-fieldwork-narrow--chromium` |
| guided | 390×844 | あり | 96 | 未出力（null） | `cinema-fieldwork-guided-re-3a473-te-cinema-fieldwork-narrow--chromium` |
| actions | 390×844 | あり | 96 | 未出力（null） | `cinema-fieldwork-actions-r-fbd8d-te-cinema-fieldwork-narrow--chromium` |
| actions | 1440×900 | なし | 94 | 15分 | `cinema-fieldwork-unrecorde-eccd7-rves-the-previous-six-tasks-chromium` |

自然経路の各 T 直下は JSON 164件、PNG 433件、TXT 694件、合計149,151,235 bytesである。
これは先行課題の添付を含み、Playwright の `attachments/` の複製を含まない。
全 JSON を parse し、PNG の形式、TXT の非空、各 reading の実測値と対応ファイルを照合した。
全56 checkpoint の撮影前後一致、input の focus / viewport、本文末尾、単一 owner、panel transition の終了を検査した。
7件すべてで最終帰着 PNG と checkpoint 4 の PNG の SHA-256 が一致する。
代表する desktop /390px の本文と操作画面も目視確認した。

Controlled は `guards cinema history/input-scope/recording with controlled observations` の3件で、各 output directory に前掲の JSON / PNG / TXT を保存する。
QA の支援ガードは、Classic から Actions に戻して操作が存在することを先に確認してから QA を開く。
録画容量の full / auto-deactivation は自然7 session のいずれにもない。
各 session の half-full は候補Aの BUY MEAL 応答に1回だけあり、原文のまま残した。

最終のローカル `npm run lint`、`npx tsc --noEmit`、`npm test`（build と52 unit）、CI制御8件、checksum、`git diff --check` は成功した。
Canonical SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` を保持する。
同じ head の full CI、各 job / browser step 時間、artifact 情報は本PRの検証欄を正本とする。
CI は全72 browser（church 10 /power 9 /remaining 53）を一度ずつ列挙する。
Full E2E の最終判定は current-head CI を使い、ローカルの対象別検証だけで全72件の成功とはしない。

### RED と修正後の再実行

- 未登録本文、current-turn 録画判定、不明入力での新操作、追加方向 alias の scope を RED で確認し、最小修正後の unit / controlled GREEN を得た。
- 候補Aの half-full は RECORD から BUY MEAL へ移る。映画用経路だけ、警告と行数の期待を採択 fixture に合わせた。既定経路の assertion と録画窓は保持する。
- 最初の自然実行では、CSS適用後の `innerText` を raw status と比較したため停止した。既存 helper と同じ `textContent` に修正した。
- 映画名の引用符が accessibility YAML 内で escape されるため、単一 owner の比較時だけ引用符を復元した。保存 TXT は原文の snapshot のままにした。
- Guided の表示監査は既存の未送信 draft を復元する。監査で `LOOK` を消してしまう経路は手動停止し、完了済みの証拠を保存して対象だけ再実行した。
- 発電所 helper の旧 Cinema English 期待を承認済み日本語へ更新した。390px の要項タブでは地図が非表示なので、従来と同じ DOM 属性照合を使って言語検査を保持した。
- 390px Guided の companion は入力欄を覆う。実際の閉じる操作を使ってから draft を編集し、明示 Send する手順へ直した。Pointer 遮断を trace で確認して手動停止し、この2経路を再実行した。
- 390px の実画面で映画館の説明文が非表示になる CSS を確認した。既存 meal と同じ mobile 表示を cinema に適用し、両 pane で説明文の可視性を assertion に加えた。寸法が変わる2経路を再実行した。
- 環境接続の切替後に旧 runner の継続を見落とし、重複起動は既存 port により停止した。競合時の不完全な保存ファイルは採用せず、runner の終了と保存先を確認して390pxの2件を再実行した。
- 上記の失敗と手動停止を経て、ローカルは Classic desktop 1件、残りの成功7件、390px assisted の再実行2件で計10件を確認した。テストの自動 retry は0で、最終 CI は全件を再実行する。

## CI #212 の時間上限と再検証

[CI #212](https://github.com/5gmt/mind-forever-voyaging/actions/runs/42348240196) は head `346a901acea43b6460220befb09a3c658572aa1d` の verify（52 unit）、power（9 browser）、church（10 browser）が成功した。
Remaining は映画館10件を含む52/53件が成功し、最後の既存レストラン Actions /390px の途中で35分の job 上限に達した。
テスト失敗はなく、ci-gate は cancellation を正しく拒否した。
映画館10件は約21分4秒、remaining job は35分12秒で、起動待ちや harness failure による停止とは区別する。

Issue の許容範囲に従い、remaining の上限だけを40分に延ばす。
Church / power の35分、分配、全72件、1 worker、retry 0、既存 assertion / 添付、通常 artifact 保存なしの方針は維持する。
この時間上限変更では Application とテスト内容を変更していない。
最終 head の full CI は PR の検証欄を正本とする。

## CI #213 で検出した共有 helper の描画待ち

[CI #213](https://github.com/5gmt/mind-forever-voyaging/actions/runs/42351101727)（head `26fbbdd436e6de64b36f58397fc706f38d55d9a1`）では verify 52件、power 9件、church 10件が成功した。
Remaining は51件成功、2件失敗で、時間上限には達していない。
映画館 Actions /390px は裁判所 LOOK の位置に直前の RECORD 本文があり、市役所 Classic /390px は新聞 helper の INVENTORY の位置に直前の RECORD OFF echo があった。

共有 Restaurant helper は原作側の次 input ID と input の enabled だけを待っていた。
Input は送信中も編集できるため、日本語表示の反映完了を示さず、次の block 数の取得や helper 間の引継ぎが描画に先行した。
現在のコマンドの日本語表示上の echo を待ってから return する assertion を1つ追加した。
既存の input / echo / next input、本文、録画窓、添付の検査は保持し、固定 sleep と test retry は追加していない。

作者の scratch browser で stable transcript の wrapper 到達だけを400ms遅らせ、同じ裁判所の誤った段落位置を RED として再現した。
修正後は同じ遅延条件の Restaurant 全経路が GREEN（1.1分）となった。
VM 出力や状態は編集していない。
この遅延条件は、自然7 session とは別の回帰証拠として扱う。
失敗した2つの自然経路の個別回帰は成功した（映画館 Actions /390px 3.7分、市役所 Classic /390px 39.5秒）。
修正 head の full CI の結果は PR 検証欄に記録する。

## 独立レビューと証拠保存

Sol 通常レビューと Work/Astra 最終受入は未了である。
通常の PR / push CI は artifact を保存しない。
F3 の明示証拠実行と独立 ZIP 監査は、Sol 通常レビュー後の最終 head で行う未了項目である。
Work の ZIP 監査には、レビュー対象の最終 head で `save_evidence=true` の Full CI を明示実行し、同一 run / attempt の3群すべてを使用する。
[CI 運用](ci-operation.md)に従い、容量と1日以内の監査予定を確認してから保存する。
各 `ci-provenance.json` の head と実 expiry を確認し、過去の #114 / #117 CI を F3 の代わりにしない。

レビュー回数、差し戻し理由、引継ぎから最終受入までの経過時間は、実際のレビュー後に PR / Issue で追記する。
実装者の自己点検や実装チーム内の差分レビューを独立 Sol / Work レビューとして数えない。

実 saved-game RESTORE、screen reader 音声、原作の正式 assignment 評価、後続年の自然完走、本番配備は未検証である。
390px の時計、VM の録画残量を補完していない。
