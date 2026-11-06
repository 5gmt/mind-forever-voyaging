# Cinema F1 — 裁判所の現地録画による候補A

## 設計判断

2026-11-06、owner からの [PR #112](https://github.com/5gmt/mind-forever-voyaging/pull/112) の設計レビュー対応依頼に基づき、指名 ChatGPT Work reviewer は **裁判所の録画を現地の RECORD / LOOK / RECORD OFF に限定する候補Aを、F1 の追加実測方針として採用する**。
映画の成功経路を採択したという意味ではない。
設計同期 PR の独立 Sol review / merge 後、Codex Cloud が追加実測し、その成功証拠を Sol が独立採択 / merge するまで F2 #109 / F3 #110 は blocked のままとする。

同じ初回2041年 session、先行六課題、映画の購入・鑑賞録画、公園帰着という到達点は維持する。
変更許可は映画 milestone 用候補の裁判所録画区間に限る。
既存 milestone の採択経路や回帰を遡って変更せず、原作・観測・履歴・fallback・accessibility の保証を緩めない。

## 確認した証拠

対象は #112 head `0f761b4e1f6883d32f609c38dbaa2f7995198290`、merge `fdfef5a8b048f492e31ddfe0e9169c621d76bf2d`。
[Sol の独立レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/112#pullrequestreview-5797200087)は evidence-only の受入と経路不採択を区別している。
Work は failure fixture の全 Git blob `2754395731f9e88100bd4477917eaa2e7d063a99` を取得し、2 session の録画窓・raw status / 時刻・警告・本文と、全実送信の input → echo → next input を照合した。
2 session は各89実送信 / 88観測、独立の券なし probe は13実送信 / 12観測である。
起動 character input はこの line command 件数に含めない。

両 session で購入成功の残高は $554、映画の `IN` は15分を経過させる。
その応答に full / auto-deactivation warning があり、raw mode は recording から通常 Simulation Mode へ戻る。
90–96送信目の明示 OFF / LOOK / 帰着は未実施である。
補助7/9、映画本文、通常入力への復帰だけでは全鑑賞区間の録画を証明しない。
旧 [失敗実測](cinema-runtime-evidence.md)と fixture / regression はそのまま保持する。

本設計レビューは新経路の実行、production UI の検証、CI ZIP の独立監査ではない。
#112 の48 unit / 62 browser成功は Sol の記録を参照する。
F3 の最終 passing ZIP の Work 監査は引き続き別 gate である。

## 変更する7送信

実 decoder answer を含む全経路の **12–18番目**だけを次のようにする。

| 経路 | 12–18番目の実送信 |
| --- | --- |
| 旧候補・既存 milestone | `RECORD → SW → NW → LOOK → SE → NE → RECORD OFF` |
| 映画候補A | `SW → NW → RECORD → LOOK → RECORD OFF → SE → NE` |

Kennedy Park → Elm & Park → Courthouse は非録画で移動する。
Courthouse で録画を開始し、裁判の本文が出る `LOOK` を録画し、その場で明示停止する。
Elm & Park 経由の帰路は非録画とする。
場所だけを記録したことにせず、`The court is in session. A woman is being tried for petty theft.` の本文とその前後の raw recording status を必要とする。

1–11番目の入場・最初の recording loop、19–81番目の新聞から教会帰着まで、82–96番目の映画区間は維持する。
Decoder の可変値と既承認の direction alias を正規化した command 比較では、変更を上表に限定する。
非 RECORD command の全順序、訪問順、購入と全文の読書、食事、二つの会話、発電所 LOOK を省略しない。
Positive は96実送信、映画だけ RECORD / OFF を省く F3 の負例は94実送信のままである。

## 容量の見積りと選定理由

`source/misc.zil` の `INCREMENT-TIME` は recording 中の経過時間を buffer SIZE に加え、45超で半量、90超で full / 自動停止を出す。
`source/verbs.zil` では RECORD が recording を開始し、OFF は時間加算前に停止する。
これと2 session の raw 時計差を照合すると、次の加算見積りになる。
**内部 SIZE や残量を観測した値ではなく、次に試す候補を選ぶための見積りである。**

| 録画区間 | 旧候補の加算見積り（分） | 候補Aの加算見積り（分） |
| --- | ---: | ---: |
| 最初の RECORD / WAIT | 11 | 11 |
| Courthouse | 22 | 2 |
| 新聞購入・全記事 READ | 12 | 12 |
| 食事 | 23 | 23 |
| City Hall 会話 | 9 | 9 |
| Power Station LOOK | 2 | 2 |
| Church 会話 | 9 | 9 |
| Cinema RECORD / IN | 16 | 16 |
| 合計 | 104 | 84 |

旧裁判所区間の4移動は各5分であり、それを非録画にして20分を削減する。
帰路だけを非録画にする案では94分となり、同じ計算上90を超えるため採らない。
候補Aの84と90との差6を、実測済みの余裕や任意の追加 command の許可と扱わない。
最初の WAIT、各課題本文、映画の15分を短縮して合わせることもしない。

`source/rockvil.zil` の `COURTHOUSE-F` は LOOK で裁判本文を出し、`INCREMENT-TIME` は Courthouse で recording 中に課題を記録する。
旧2 session の LOOK でもその本文を確認できるため、現地録画を次候補とする根拠がある。
ただし候補Aでの成立は fresh capture で確認する。
同じ command 数でも裁判所への到着時刻や optional output は変わり得る。
旧 fixture の時刻・警告位置・出力を新 fixture に転記しない。
Half-full warning は食事など別の turn へ移る可能性があるので、実際の出現位置を保存する。

映画を先にするだけでは同じ録画量を減らせない。
帰還・buffer 消去・再入場や別 session の映画への置換は、同一初回 session という到達点と観測範囲を変えるため今回は採らない。
候補Aでも成立しなければ失敗証拠を残して再度 Work へ戻し、自動的に別案へ進まない。

## F1 の実行と採択条件

1. この判断を反映した計画 / status の文書 PR を Sol がレビューして merge する。#108 は open を維持する。
2. `scripts/capture-cinema-runtime.mjs` に明示的な `--candidate-a` を追加する。Flag なしの旧候補と旧 failure fixture / regression を保持し、候補Aの出力先を分ける。
3. 成功候補は `tests/fixtures/parchment-cinema-recording-a-observed.json`、失敗は `tests/fixtures/parchment-cinema-recording-a-failure.json`、判断根拠と台帳は `docs/cinema-recording-a-evidence.md` に保存する。既存証拠を上書きしない。
4. Production build / preview に対して2つ以上の独立 fresh canonical session を最初から完走する。少なくとも1回は canonical form、もう1回は現行 UI と form の併用とする。Save / RESTORE、VM 編集、buffer 消去、別 session の課題を合成する方法は使わない。
5. 全実送信、起動 char、decoder 交換、各 input / echo / next input、raw status、観測時 room、bridge-v3 の行・run・空行・prompt、warnings、実 UI alias / method を保存する。券なし probe は #112 の独立 fresh probe を元 SHA / fixture path / session ID 付きで再利用できる。新規 session の観測に混ぜず、採択証拠から参照する。Input / 観測境界に影響する変更がある場合は再採取する。
6. 先行81送信は上記の7送信置換との一致を検査する。旧81件すべてとの完全一致を要求したり、全 prefix assertion を削除したりしない。裁判所 LOOK、新聞購入・全記事 READ、食事、City Hall 会話、Power Station LOOK、Church 会話の成立と録画、各明示 OFF を raw evidence で確認する。
7. Cinema の購入成功、IN 前後の15分と recording、full / auto-deactivationなし、明示 OFF の成功、LOOK、公園での非録画・通常入力を確認する。Half-full は保存して許容する。内部 flag や補助7/9を代用にしない。
8. Unit regression、lint / tsc / unit、full E2E、checksum / diff、変更された警告位置と optional / dynamic leaf、既存 projector の表現可能性、UI不足を記録する。成功採択 / merge は実装とは独立した Sol が担当する。その後だけ F2 を開始する。

今回許可した裁判所の開始・停止移動以外に、WAIT / 再購入 / 所持品操作、訪問順・録画窓変更、新 projection が必要になったら停止する。
裁判所閉鎖、課題本文欠落、購入失敗、full / 自動停止、通常入力未復帰も停止証拠として保存する。
F1 に F3 の新 UI 完成を要求しない。

## F2 / F3 への引継ぎ

F2 は採択された候補Aの実測と、出所を明示した券なし probe から copy packet を作る。
旧 failure fixture は出力構造を比較する資料として残すが、成功採択の根拠と混同しない。
映画の identity、限定 BUY TICKET / IN、観測時 CINEMA、fallback の既定範囲は元計画どおりとする。

F3 の6 positive / 1 negative 自然経路は候補Aを明示的に選ぶ。
既存の Courthouse / Newspaper / Restaurant / City Hall / Power Station / Church テストは、旧経路・録画窓・assertion・添付を保つ。
共有 helper の既定値を変更して過去の受入を置き換えてはならない。

現在の helper 呼出しは Church → Power Station → City Hall → Restaurant で、裁判所 command 列は `tests/e2e/restaurant-acceptance.ts` にある。
この4 helper に映画専用の録画区間選択を渡す最小拡張を許可する。
既定は旧往復録画、映画だけ現地録画とし、既存の会話 / 施設 / 映画の負例フラグと区別する。
各 helper の旧 fixture prefix 比較は既定経路では維持し、候補Aでは明示的な7送信置換を含む採択 fixture と照合する。
候補名、全実送信と録画区間を添付へ保存し、旧経路名の証拠として誤表示しない。
裁判所の期待 recording mode を経路別に固定し、LOOK 本文・入力対応・先行課題・reading / accessibility 証拠を削らない。
API の具体名は実装者に委ね、汎用ルート engine や大規模 refactor は含めない。

独立 Sol の通常レビュー、最終 head の full CI、Work の全体受入と passing ZIP 監査は従来どおりである。
今回の文書変更は production coverage を追加せず、#108 の完了や F2 / F3 の開始を先取りしない。
