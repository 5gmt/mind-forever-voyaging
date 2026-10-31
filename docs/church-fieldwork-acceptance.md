# 2041 Church Fieldwork Acceptance

## 提出範囲とレビューの状態

本変更は [C3 #104](https://github.com/5gmt/mind-forever-voyaging/issues/104) の実装と検証をまとめる。
初回2041年の先行五課題に続き、聖ミカエル教会で長老との会話を録画し、ケネディ公園の通常入力へ戻る区間を日本語化した。
Sol の通常レビュー、Astra / ChatGPT Work の全体受入、merge、#29 完了報告、Issue close は提出時点では未実施である。

開始 base は C2 merge `e11634762c35b518377a87fbbdd6a10717ea57a6`。
C1 の [独立採択](https://github.com/5gmt/mind-forever-voyaging/pull/105#pullrequestreview-5721119301)と merge `91d5b6fdb16515500dc5af901636e321751053d1`、C2 の [独立 copy approval](https://github.com/5gmt/mind-forever-voyaging/pull/106#pullrequestreview-5721974351)と merge を確認し、[#104 の開始条件解除](https://github.com/5gmt/mind-forever-voyaging/issues/104#issuecomment-6541097000)を根拠として実装した。
最終 head / base、current-head CI、artifact の実期限、review 後の差分は提出 PR の本文と review を正本とする。
SHA 自己参照のためだけの commit は追加しない。

## Copy と観測の境界

[承認 packet](church-copy-packet.md)の新規11 leaf と再利用4 leaf を、[C1 fixture](../tests/fixtures/parchment-church-runtime-observed.json)の exact command alias と room identity に対応させた。
新規の地名4件、地図の教会名、人物名、Talk と説明文を統合し、既存のルート draft 文から助詞前の空白を除いた。
送信 command は引き続き English であり、Guided は編集可能な draft、Actions は明示した1押下の送信を使う。

本文の教会 scope は各行を初めて観測した時点の解決済み room と初回2041年の条件から保存する。
現在地の変更、後続年の同文、locale 往復、長い末尾だけの report で、正しく観測した日本語履歴を再分類しない。
未承認の文、別室、未知 room、後続年の新しい同文は原文と `lang=en` を保持する。
Heading、段落、空行、optional output の境界は既存 projector のまま保つ。

人物 state は [教会一人物の helper](../app/church-elder.ts) に限定した。
その visit の raw 在室文と stable echo ID、`ST-MICHAELS`、初回2041年、完全な line-input report がそろった場合に main と companion の Talk を表示する。
通常の busy 中は既存の在室証拠を保持してボタンを無効にし、欠けた report では在室を失効させる。
在室文の消費済み ID と会話成立を session 内で保持し、古い scene cache、rolling history、LOOK、再訪、locale 切替で復活させない。
時刻退場 `The church official wanders off.` は現在不在として扱い、会話済みとは扱わない。
RESTORE、fresh opening、QA 切替では限定 state を reset し、復元内容を推測しない。

Canonical binary、historical source、QA story、既存 fixture、production dependency、配備設定は変更しない。
汎用 actor engine と GLOBAL / LOCAL-GLOBALS guard の緩和は含めない。

## 受入条件と保存証拠

証拠は共通 [attachEvidence](../tests/e2e/evidence-attachments.ts) で `testInfo.outputPath` に実ファイルを作り、path で添付する。
以下の名前には実行時の hash suffix が付く。

| 受入条件 | 検証箇所 | 保存する証拠 |
| --- | --- | --- |
| Exact copy と観測時 scope | unit の packet 全15行照合、履歴 scope、未承認 command / variant / room / year | `tests/rendered-html.test.mjs`、C1 fixture、承認 packet |
| 在室と退場、入力欠損 | 一人物 helper の unit、controlled `history` / `input-scope` | `church-controlled-*.json`、PNG、accessibility TXT |
| 6自然経路と English input chain | `acceptChurchMilestone` の81送信、raw status、各 current input → echo → next input | `church-runtime-observations.json`、`church-return.png`、先行五課題の全添付 |
| 実 assisted controls と両 Talk | 地図、route、compass、quick actions、Guided draft 編集と明示 Send、main / companion の在室と退場 | `church-talk-controls*`、`church-main-actor-*`、`church-companion-actor-*` |
| 補助推定6/9と先行五課題 | 教会到着、会話後、公園帰着の checklist | `church-arrival-off-*`、`church-conversation-inference-*`、`church-return-map-*` |
| 非録画の自然負例と後付け録画 | 別 fresh79送信で5/9を保持、controlled `recording` で見出し / 在室 / 古い会話を除外 | 負例の `church-runtime-observations.json`、`church-controlled-recording*` |
| 長い本文末尾、390px drawer、focus | 会話の最終行、drawer の最終項目、入力、現地と帰着の EN / JA 往復 | `church-*-reading.json`、`church-*-recovery-*`、`*-drawer-bottom.json`、PNG / accessibility TXT |
| 既存52 browser tests | City Hall、Power Station、Restaurant、新聞、Simulation 等の全回帰を保持 | full suite と current-head CI artifact |

Controlled probes は wrapper に渡す report を差し替え、VM は実際の起動状態に置く。
合成した教会報告、別年、時刻退場、RESTORE 不明、長い履歴、再入場、Part II、QA を自然な route capture と区別する。
後付け録画の positive control には累積する RECORD と会話の raw history を与え、既存の録画窓判定を実際に通す。
City Hall の既存 controlled tests と Cinema 等の English fallback を維持する。

## 自然経路の記録

6経路は Classic / Guided / Actions と1440×900 /390×844の組合せで、毎回 fresh canonical context から開始する。
既存 `acceptPowerStationMilestone` の全67送信、録画窓、assertion、添付を保持し、戻り値だけを追加した。
残る未送信 LOOK draft を消して、採択した次の14送信へ進む。

```text
NE E E N W
RECORD
CHURCH ELDER, HELLO
RECORD OFF
LOOK
E S W W SW
```

起動 character input は line 送信と分け、numeric decoder answer は毎回の実出力から解く。
前の input ID が新しい echo の ID となり、次の input ID に変わる連鎖を全81送信で確認する。
到着は非録画、RECORD 後と会話応答時は録画中、明示 OFF 後と公園帰着は非録画である。
Desktop の会話による時計差は8分を確認し、390pxで原作が出さない時計と日付は未観測とする。
Half-full warning は保持し、full / auto-deactivation を成功扱いしない。

| Mode / viewport | UTC 開始–終了（2026-10-31） | line 送信 | 最終 input ID | 補助表示 |
| --- | --- | ---: | --- | --- |
| classic / 1440×900 | 09:05:30–09:07:14 | 81 | `line-359` | 表示なし |
| guided / 1440×900 | 09:07:14–09:10:04 | 81 | `line-357` | 6/9 |
| actions / 1440×900 | 09:10:04–09:12:46 | 81 | `line-363` | 6/9 |
| classic / 390×844 | 09:12:47–09:14:02 | 81 | `line-352` | 表示なし |
| guided / 390×844 | 09:14:02–09:16:14 | 81 | `line-350` | 6/9 |
| actions / 390×844 | 09:16:14–09:18:22 | 81 | `line-364` | 6/9 |
| actions / 非録画負例 / 1440×900 | 09:18:22–09:21:03 | 79 | `line-355` | 5/9 |

7 sessions とも half-full warning は1回で、full / auto-deactivation はなく、公園の非録画 line input に戻った。
保存した自然経路 JSON 7件、controlled JSON / PNG / TXT 各3件、390px drawer の末尾到達 JSON 8件の local 実体と内容を照合した。
Desktop の Guided の Talk、390px Classic の長い会話末尾、390px Guided の drawer 最下部は保存 PNG を目視でも確認した。

別 fresh Actions / desktop session では教会の RECORD / OFF を省いた79送信を行う。
先行五課題は同じ録画窓を使い、非録画の教会会話、LOOK、帰着後も補助推定5/9を保持する。
Positive の6/9を含め、補助 checklist は wrapper の推定であり、原作の正式評価や内部 flag を観測した結果ではない。

## 検証結果と再実行

| 検証 | 結果と正本 |
| --- | --- |
| `npm run lint` / `npx tsc --noEmit` | 最終 production 差分で成功。 |
| `npm test` | production build と47/47 unit が成功。既存40件に7件を追加。 |
| 対象 `church-fieldwork.spec.ts` | 10/10成功、16.8分、1 worker、retry / skipなし。 |
| 全 browser suite | 既存52件と追加10件の全62件を保持。最終 head の `npm run test:e2e` は CI で実行し、成否と実時間を提出 PR に記録する。Local の全62件実行は重複させていない。 |
| checksum / diff | 規定 SHA-256 を維持し、`git diff --check` 成功。保護対象の変更なし。 |
| CI ZIP の実体監査 | Local の実ファイル照合と分け、passing current-head artifact の内容確認を必須 gate とする。提出時の取得可否、artifact size / expiry、監査結果は PR を正本とする。 |

CI の browser job 上限を35分から50分へ変更した。
直前の C2 [CI run 41177903626](https://github.com/5gmt/mind-forever-voyaging/actions/runs/41177903626) の実測は、既存52件の step 26分36秒、job 28分14秒だった。
教会の追加10件は local で16.8分かかり、別々に計測した両者の合計は約45分である。
この合計は C3 の full suite 実測ではなく、必要な予算の見積もりである。
追加の7 fresh sessions と3 controlled testsを保持して実行するため、5分刻みで余裕を確保できる50分を選び、current-head CI の実時間を PR に残す。
起動失敗や assertion failure を timeout で成功扱いせず、1 worker、retryなし、全62件、14日保持を維持する。
テスト分割、並列化、削除は行わない。

RED は新規 unit の未登録 copy、観測時 scope、人物 helper、完全な入力 report の欠如と、controlled browser で日本語在室文が出ない状態を確認した。
実装後の最初の controlled `recording` positive は、合成した累積 text に先行 RECORD がないため0/9となった。
Harness の raw history を修正し、録画の production rule は変更していない。
最初の自然経路は、日本語見出しの `lang` を親から継承する既存仕様に対して直接属性を要求して失敗した。
最も近い `lang` の実効値を確認する assertion に直した。
次の10件実行は既存の新聞ルート文の空白を期待する1件が失敗し、修正を入れるため1件を中断した（4成功、4未実行）。
承認された空白除去に合わせて既存 assertion の文字列だけを更新した。
これらの harness の失敗を production 不具合や成功した全体実行として記録しない。
実装側の read-only reviewer は、原文の部分一致と入力 report の構造検証不足を指摘した。
両方を再現する RED を追加し、raw 行の完全一致、入力 classes、末尾 prompt、別々の echo / next-input ID を検証する最小修正後、全47 unit が GREEN になった。
同 reviewer の限定再点検でも両指摘の解消を確認した。
次の自然経路では Guided / Actions の在室後の Talk 不在を再現した。
Canonical status の表示上の大文字地名に対する比較が厳しすぎたため、大文字の status を使う controlled RED を追加し、部屋の完全一致を保った大小文字の正規化を入れた。
この途中実行は4成功、2失敗、1中断、3未実行であり、最終の全件結果とは区別する。

## 残るレビューと未検証事項

実装側点検は独立した Chat モード Sol の通常レビューを代替しない。
Sol のレビュー後、同じ最終 head の base、変更差分、未解決指摘、受入条件と証拠の対応、CI、artifact の実期限を Work に渡す。
Work が全体受入と merge、#29 報告、#104 close を担当する。
通常レビューだけで milestone 完了とは扱わない。

| 項目 | 提出時点 |
| --- | --- |
| Sol 通常レビュー回数と差し戻し | 未実施。提出 PR の review を正本とする。 |
| Work 全体受入と merge | 未実施。Sol レビュー後の最終 head で行う。 |
| 引継ぎから受入までの経過時間 | 未確定。実時刻から記録し、推計しない。 |

実 saved-game RESTORE、実 screen reader 音声、原作正式評価、後続年や再入場の自然な完走、本番配備は未検証である。
対象外の timed events や First Methodist 等の本文は新規翻訳しない。
未計測の usage 削減量は主張しない。
