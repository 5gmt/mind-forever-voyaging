# Issue #78 follow-up: recording windows and meal controls

**状態:** 設計判断用の提案。未承認・未実測。採用経路や完了条件を変更する決定ではない。

## 確定した現況

[PR #82](https://github.com/5gmt/mind-forever-voyaging/pull/82) は [Sol の独立レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/82#pullrequestreview-5599103425) 後、2026-10-21 JST に evidence-only として merge された。Reviewed head は `bb1066fb3f4f25acbff6b354c6b04b3e513a622a`、merge は `f45d268282a40d63bf88e1eaf95b01c96961eeea`。判断の正本は [#78 の merge 後コメント](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6315058171)。

実測・fixture・回帰テスト・14日 retention は受け入れ済み。成功経路は未採択であり、#78 は open、M2 #79 / M3 #80 は blocked のままである。旧実測を作り直して失敗を消したり、マージを録画成立の承認と解釈したりしない。

残課題は次の二点で、PR #82 へのコード修正要求ではない。

1. 既存の録画区間を保つと、食事前または22分の食事応答で buffer が満杯になる。録画区間と完了境界の再評価が必要。
2. 実際の Roy's Pagoda では Guided / Action menus に meal の操作が現れない。限定した対象・action・guard の設計判断が必要。

## 根拠の区別

| 種別 | 根拠 | 分かること / 限界 |
| --- | --- | --- |
| Runtime observed | `tests/fixtures/parchment-restaurant-runtime-observed.json`、`docs/restaurant-runtime-evidence.md` | 3 fresh session、22分の食事、$30 / $569、travel / meal-only の full warning、通常入力への帰着。録画完遂・内部課題 flag・正式評価は未観測。 |
| Historical source | `source/misc.zil` の `INCREMENT-TIME`（654、759–792行付近） | `RECORDING` 中の `.X` を buffer SIZE に加算し、45超の半量警告、90超の自動停止を扱う。これは source の仕組みであり、canonical Release 79 の内部容量を読み出した結果ではない。 |
| Historical source | `source/rockvil.zil` の `MEAL-F`（3617–3641行付近） | Roy's Pagoda の BUY は22分を設定し、RECORDING 条件下で recording-table を更新する分岐を持つ。Source 上の flag 更新を実測済みの正式達成と称さない。 |
| Historical source | `source/verbs.zil` の `V-RECORD-ON` / `V-RECORD-OFF`（1539–1577行付近） | 録画開始・停止は canonical command として提供される。通常の OFF では buffer を消去しない。 |
| Current implementation | `app/PrismEdition.tsx` の `belongsToSourceRoom` / `contextualObjects` / `sceneActionObjects` | `GLOBAL-OBJECTS` の一般対象を部屋の候補に自動公開しない。`MEAL` はこの可用性判定を通らず、来店文にも food / meal の直接言及がない。日本語 copy を追加するだけでは解決しない。 |

Source / code は上記 merge commit で照合した。`source/`、story binary、production code を変更していない。以下の候補を canonical runtime で実行したとは記録しない。

## 録画区間の比較

| 候補 | 変更点 | 評価 |
| --- | --- | --- |
| **A: 新聞だけ現地録画へ変更（推奨する追加実測案）** | 初回 recording loop と Courthouse は全 command を維持。Newspaper の徒歩・購入・全記事・帰着も維持し、RECORD / RECORD OFF の位置だけを購入・読書の前後へ移す。Restaurant は現地録画、明示停止後に公園へ戻る。 | 全食事区間の録画という期待を維持し、既存経路への変更を絞れる。先行経路の録画前提を変えるため、実行前に Astra の設計レビューと Yasuo の承認が必要。 |
| B: 先行録画を保ち、meal 応答時の auto-deactivation を許容 | PR #82 の meal-only を使い、食事開始時の recording と meal response を完了境界にする。 | 22分の録画継続を確認できず、完了条件の変更になる。Source flag や補助 checklist を正式達成の代用にできないため、採用を推奨しない。 |
| C: 現在の停止を継続 | 経路・録画前提・UI を変更せず、M2 / M3 を開始しない。 | 既承認境界を維持する現状。A が承認されない場合も #78 を完了扱いにしない。 |

A でも別 session の食事、順序変更、徒歩区間の省略、buffer 消去、save/restore、VM/state 編集は用いない。既存の成功済み Courthouse / Newspaper milestone の fixture と受入経路も上書きしない。

### A の具体的な追加実測列（未承認・未実行）

```text
初回 entry / recording loop: PR #82 の prefix をそのまま維持
PEOF → WAIT ×4 → ENTER SIMULATION MODE → <observed numeric answer>
→ LOOK → RECORD → WAIT → RECORD OFF

Courthouse: PR #82 と同一
RECORD → SW → NW → LOOK → SE → NE → RECORD OFF

Newspaper: 徒歩・購入・四段落の読書を維持し、録画 command の位置だけを変更
INVENTORY → NE → N → NE → RECORD → BUY NEWSPAPER → READ NEWSPAPER
→ RECORD OFF → SW → S → SW

Restaurant: 現地で食事全区間を録画する候補
SW → W → W → S → RECORD → BUY MEAL → RECORD OFF → N → E → E → NE
```

先行 newspaper 往復の command 数と徒歩・購入・読書の順序は変わらない。RECORD / RECORD OFF の時刻と地点は変わるため、既存 fixture の代用ではなく、新たな candidate fixture として保存する。

| 区間 | PR #82 の status 差分に基づく録画時間候補 | A の見積り |
| --- | --- | --- |
| 初回 loop | RECORD 1 + WAIT 10 | 11 |
| Courthouse | RECORD 1 + 徒歩20 + LOOK 1 | 22 |
| Newspaper | 既存は RECORD 1 + 徒歩30 + BUY 1 + READ 10 = 42 | RECORD 1 + BUY 1 + READ 10 = 12 |
| Restaurant meal-only | RECORD 1 + BUY MEAL 22 | 23 |
| 合計 | 既存区間では `11 + 22 + 42 + 23 = 98` | `11 + 22 + 12 + 23 = 68` |

**この表は buffer の実測値ではない。** Source の加算規則と観測済み status の分差から、A を試す理由を説明した計算である。実際の残量・成功・余裕を保証しない。半量警告はあり得るため、追加実測では警告を含む exact output を保存する。原作 SIZE や内部 flag を wrapper に取り込まない。

### 承認後の実測と採択条件

- 新たな独立 fresh canonical session を2回以上実行し、元の失敗 fixture を保持したまま別の候補証拠を保存する。開始時刻、全実送信列、送信元・次 input ID、行・空行・heading・status を記録する。
- Courthouse の LOOK、Newspaper の購入・四段落の READ、Restaurant の BUY MEAL の前後で recording status と canonical 応答を照合する。半量警告と full / auto-deactivation を分ける。
- 食事前後が recording、22分の食事と $30 / $569、続く RECORD OFF の成功、Kennedy Park の通常 line input を確認する。Full warning、早期停止、入力同期の破綻があれば不採択として記録する。
- この完了境界は原作の九課題達成・帰還評価を保証しない。Formal evaluation、Interface Mode の容量照会、再入場への scope 拡張を自動追加しない。
- Sol が新しい証拠と採択判断を独立レビューする。設計承認だけでも、追加実測が成功しただけでも M2 / M3 を開始しない。採択が承認され merge された時点で plan / status を更新する。

## Meal UI の限定案（未承認・未実装）

汎用 `GLOBAL-OBJECTS` の guard を緩める方法は採らない。M1 では次の限定案をレビュー用に確定し、production 実装は M2 の copy 承認後の M3 に置く。

| 項目 | 提案する境界 |
| --- | --- |
| Identity | Map assignment `meal` / target room `ROYS-PAGODA` / scene object `MEAL` を区別する。Room heading は raw English `Roy's Pagoda` から既存の room lookup で解決する。 |
| Scope / guards | 既存 `initial2041Presentation` が成立する fresh 初回2041年、Simulation Mode、解決済み `ROYS-PAGODA`、line input のみに限定。QA、後続年、再入場・RESTORE 後の不明状態、未知 room には公開しない。Input が受け付けられない間は操作を無効化する。 |
| Action | M1 で実測済みの **`BUY MEAL`** 一つに限定。Metadata の command noun `food` から作る `buy food` は runtime で同値確認していないため、勝手に代用しない。Take / Eat / 他レストランの action を追加しない。 |
| Guided | 既存の draft 経路を再利用し、`BUY MEAL` を編集可能な input へ入れる。自動送信しない。 |
| Action menus | 明示的な Buy 操作を既存 send 経路で送る。録画を自動開始しない。録画中の食事は M3 の accepted route が明示的に RECORD を送って確認する。 |
| Copy / accessibility | 対象・action の visible / accessible copy は M2 の packet へ含める。未承認段階では English fallback。既存 locale/history/input-focus/accessibility owner を維持する。 |

承認後の M1 追加実測ではこの UI の要求・guard・command を採択対象としてレビューし、M3 の実装前に実 UI が完成したと称さない。M3 は Classic / Guided / Action menus × 2 viewport の全経路、draft / 即時送信、scope 外の非表示・English fallback を確認する。

## 必要な決定と再開点

| 決定 | 担当 / 現在の状態 |
| --- | --- |
| A の新しい録画区間と、full / auto-deactivation を認めない食事前後の完了境界を追加実測してよいか | Astra の設計レビュー + Yasuo の承認 **未記録**。一般的な作業継続の依頼を、この具体案の承認に読み替えない。 |
| 上記の限定 meal UI 案を、M2 copy / M3 実装の境界として採用してよいか | Astra / Yasuo の設計判断 **未記録**。現在の guard や rendering を変更しない。 |
| 新しい候補を採択できるか | 上記の承認後に追加実測し、Sol が独立レビュー。**未実測・未採択**。 |

本書の merge は候補Aの実行許可・UI実装許可・経路採択・M2/M3の unblock を意味しない。承認は該当 PR / Issue の具体案と reviewed SHA に結び付けて記録し、その後に実装者が実行計画と status を同期する。
