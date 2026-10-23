# Issue #78 follow-up: recording windows and meal controls

**M1 採択時の状態:** A案は [Sol の独立採択レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/84#pullrequestreview-5614358178)と #84 merge `8d5fea7ff9d5909a65e55a4122bfc7805b0e581c` により採択済み。#78 / M1 完了、M2 #79 の [copy packet](../restaurant-copy-packet.md) は review 待ち。M3 #80 は M2 copy approval / merge まで blocked。限定 meal UI の設計範囲は承認済みだが未実装。

**M3 integration 時の更新:** [M2 #85 の独立 copy 承認](https://github.com/5gmt/mind-forever-voyaging/pull/85#pullrequestreview-5615116876)と merge `7a0568f76001909cfd39a1bbdbcb61fd1f6dd28a` で M2 / #79 も完了した。M3 の開始 gate は解除済みで、production 統合と6経路の検証・受入待ち状態は [M3 受入記録](../restaurant-fieldwork-acceptance.md)を参照。本書の下記 UI 監査と未実施項目は M1 / 設計提出時点の記録として保持し、現在の production 完成・独立受入の証拠と混同しない。

承認元は [2026-10-21 の Astra の設計判断](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6316815976)。Yasuo の設計判断依頼に基づき、PR #83 reviewed head `0c222bb5fdb61d15c19b622d32436daeec8987c9` の具体案と同コメントの補足が承認された。[PR #83 のレビュー](https://github.com/5gmt/mind-forever-voyaging/pull/83#pullrequestreview-5600151543)に従い、この文書同期を Sol の通常レビュー・merge へ戻す。この範囲の反映に Astra の再承認は不要。

## 確定した現況

[PR #82](https://github.com/5gmt/mind-forever-voyaging/pull/82) は [Sol の独立レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/82#pullrequestreview-5599103425) 後、2026-10-21 JST に evidence-only として merge された。Reviewed head は `bb1066fb3f4f25acbff6b354c6b04b3e513a622a`、merge は `f45d268282a40d63bf88e1eaf95b01c96961eeea`。判断の正本は [#78 の merge 後コメント](https://github.com/5gmt/mind-forever-voyaging/issues/78#issuecomment-6315058171)。

実測・fixture・回帰テスト・14日 retention は #82 で受け入れ済み。その時点では成功経路は未採択、M2/M3 は blocked だった。後続 #84 で別 fixture の A案を採択した。旧実測を作り直して失敗を消したり、#82 merge 自体を録画成立の承認と解釈したりしない。

PR #82 で残った課題は次の二点。A案の実測・成功経路採択は #84 で完了し、UI の copy / 実装・受入は M2/M3 が担う。

1. 既存の録画区間を保つと、食事前または22分の食事応答で buffer が満杯になる。A案の2 session では食事後も録画継続し、明示停止に成功し、独立レビューで採択された。
2. 実際の Roy's Pagoda では Guided / Action menus に meal の操作が現れない。承認された限定 surface の copy は M2、実装・受入は M3 が担う。

## 根拠の区別

| 種別 | 根拠 | 分かること / 限界 |
| --- | --- | --- |
| Runtime observed | `tests/fixtures/parchment-restaurant-runtime-observed.json`、`docs/restaurant-runtime-evidence.md` | 3 fresh session、22分の食事、$30 / $569、travel / meal-only の full warning、通常入力への帰着。録画完遂・内部課題 flag・正式評価は未観測。 |
| Historical source | `source/misc.zil` の `INCREMENT-TIME`（654、759–792行付近） | `RECORDING` 中の `.X` を buffer SIZE に加算し、45超の半量警告、90超の自動停止を扱う。これは source の仕組みであり、canonical Release 79 の内部容量を読み出した結果ではない。 |
| Historical source | `source/rockvil.zil` の `MEAL-F`（3617–3641行付近） | Roy's Pagoda の BUY は22分を設定し、RECORDING 条件下で recording-table を更新する分岐を持つ。Source 上の flag 更新を実測済みの正式達成と称さない。 |
| Historical source | `source/verbs.zil` の `V-RECORD-ON` / `V-RECORD-OFF`（1539–1577行付近） | 録画開始・停止は canonical command として提供される。通常の OFF では buffer を消去しない。 |
| Current implementation | `app/PrismEdition.tsx` の `belongsToSourceRoom` / `contextualObjects` / `sceneActionObjects` | `GLOBAL-OBJECTS` の一般対象を部屋の候補に自動公開しない。`MEAL` はこの可用性判定を通らず、来店文にも food / meal の直接言及がない。日本語 copy を追加するだけでは解決しない。 |

Source / code は上記 merge commit で照合した。`source/`、story binary、production code を変更していない。以下の比較・計算と、新規 fixture に保存した A案の実測を区別する。計算値を実測容量へ読み替えない。

## 録画区間の比較

| 候補 | 変更点 | 評価 |
| --- | --- | --- |
| **A: 新聞だけ現地録画へ変更（2 session 実測・採択済み）** | 初回 recording loop と Courthouse は全 command を維持。Newspaper の徒歩・購入・全記事・帰着も維持し、RECORD / RECORD OFF の位置だけを購入・読書の前後へ移す。Restaurant は現地録画、明示停止後に公園へ戻る。 | #83 merge 後に2 session で成立を確認し、#84 の独立採択レビュー・merge で採択済み。 |
| B: 先行録画を保ち、meal 応答時の auto-deactivation を許容 | PR #82 の meal-only を使い、食事開始時の recording と meal response を完了境界にする。 | 不採用。22分の録画継続を確認できず、完了条件の変更になる。Source flag や補助 checklist を正式達成の代用にしない。 |
| C: 停止を継続 | 経路・録画前提・UI を変更せず、M2 / M3 を開始しない。 | 比較時の保留案。A の追加実測が失敗した場合も #78 を完了扱いにせず、設計判断へ戻す。 |

A でも別 session の食事、順序変更、徒歩区間の省略、buffer 消去、save/restore、VM/state 編集は用いない。既存の成功済み Courthouse / Newspaper milestone の fixture・受入経路・回帰テストと、#82 の失敗 fixture は保持する。Restaurant milestone 用の連続経路を追加する判断であり、以前の受入条件を遡って変更しない。

### A の具体的な追加実測列（方針承認済み・2 session 実測済み）

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

### #83 merge 後の実測と採択条件

- 新たな独立 fresh canonical session を2回以上実行し、元の失敗 fixture を保持したまま別の候補証拠を保存する。開始時刻、全実送信列、送信元・次 input ID、turn ID、行・空行・heading・status、各警告の出現 turn を記録する。
- Courthouse の LOOK、Newspaper の購入・四段落の READ、Restaurant の BUY MEAL の前後で recording status と canonical 応答を照合する。半量警告は許容し、録画区間変更で移動した警告の出力位置も保存する。Full / auto-deactivation は成功に数えない。
- 食事前後が recording、22分の食事と支払・残高の実応答（既存観測は $30 / $569）、続く明示 RECORD OFF の成功、非 recording で Kennedy Park の通常 line input に復帰することを確認する。Full warning、早期停止、入力同期の破綻があれば不採択として記録する。
- この完了境界は原作の九課題達成・帰還評価を保証しない。Formal evaluation、Interface Mode の容量照会、再入場への scope 拡張を自動追加しない。
- Sol が新しい証拠と採択判断を独立レビューする。設計承認だけでも、追加実測が成功しただけでも M2 / M3 を開始しない。採択が承認され merge された時点で plan / status を更新する。
- M1 は限定 meal UI の要求・guard・command を確定するが、M3 で行う UI 実装の完成を採択条件にしない。未実装 UI を M1 の前提にして依存関係を循環させない。

## Meal UI の限定設計（設計範囲承認済み・未実装）

汎用 `GLOBAL-OBJECTS` の guard を緩める方法は採らない。次の範囲が承認済みで、具体的な copy は M2、production 実装は M2 の copy 承認・merge 後の M3 に置く。

| 項目 | 承認された境界 |
| --- | --- |
| Identity | Map assignment `meal` / target room `ROYS-PAGODA` / scene object `MEAL` を区別する。Room heading は raw English `Roy's Pagoda` から既存の room lookup で解決する。 |
| Scope / guards | 既存 `initial2041Presentation` が成立する fresh 初回2041年、Simulation Mode、解決済み `ROYS-PAGODA`、line input のみに限定。QA、後続年、再入場・RESTORE 後の不明状態、未知 room には公開しない。Input が受け付けられない間は操作を無効化する。 |
| Action | M1 で実測済みの **`BUY MEAL`** 一つに限定。Metadata の command noun `food` から作る `buy food` は runtime で同値確認していないため、勝手に代用しない。Take / Eat / 他レストランの action を追加しない。 |
| Guided | 既存の draft 経路を再利用し、`BUY MEAL` を編集可能な input へ入れる。自動送信しない。 |
| Action menus / Classic | Action menus は明示的な Buy 操作一回につき `BUY MEAL` を一回、既存 send 経路で送る。Classic に新設候補を追加しない。購入・録画を自動開始しない。録画中の食事は M3 の accepted route が明示的に RECORD を送って確認する。 |
| Copy / accessibility | 対象・action と、それを囲む visible / accessible な説明を M2 の packet へ含める。来店文は meal / food に言及していないため、既存の`Words mentioned here` / `この場面で言及された語`、`Actions for things mentioned here` / `この場面で言及された対象へのアクション`という説明を新規 meal 候補へそのまま適用しない。この限定 surface に即した説明を承認し、無関係な SceneActions 全体の説明・guard を一括変更しない。未承認 copy は English fallback。既存 locale/history/input-focus/accessibility owner を維持する。 |
| Locale / busy | EN / JA で同じ可用性とし、input を受け付けない busy 中は無効化する。 |

M1 追加実測ではこの UI の要求・guard・command をレビューし、M3 の実装前に実 UI が完成したと称さない。M3 は Classic / Guided / Action menus × 2 viewport の全経路、EN / JA で同じ可用性、Guided の編集可能 draft / Action menus の一回の明示送信、busy 無効化、scope 外に新設候補がないこと・既存 English fallback を確認する。

## 決定状態と再開点

| 決定 | 担当 / 現在の状態 |
| --- | --- |
| A の録画区間と、full / auto-deactivation を認めない食事前後の境界を追加実測する | 上記の Astra の設計判断で **承認済み**。#83 merge 後に2 session で実測済み。 |
| 限定 meal UI を M2 copy / M3 実装の設計範囲とする | **承認済み**。具体的 copy の承認・実装・受入は未実施。 |
| 新しい候補を成功経路として採択する | #84 の Sol 独立レビュー・merge で **採択完了**。#78 完了、M2 は copy review 待ち。M3 は M2 merge まで blocked。 |

再開順序は **#83 の文書同期・Sol の通常レビュー・merge → A案の2 fresh session以上の追加実測 → Sol の経路採択レビュー・merge → M2 の copy 承認・merge → M3 の実装・受入**。#83 merge 後は承認された追加実測を開始できる。更なる経路・完了条件・保証の変更が必要な場合だけ、設計判断へ戻す。M3 の全体受入は従来通り Astra が担当する。
