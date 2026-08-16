# AMFV 日本語化プロジェクト憲章

> 状態: Active  
> 対象: 人間のメンテナー、コントリビューター、コーディングエージェント

## 1. この文書の責任範囲

この憲章は、`A Mind Forever Voyaging — Modern Unabridged Edition` に日本語体験を加える際、実装方式や開発体制が変わっても守る原則を定める。

現在の実装構造、milestone、Issue の優先順、verification command、dependency policy、deployment topology、branch/review workflow はこの憲章の対象外である。それらはプロジェクトの必要に応じて変更でき、ここで定める原則を変えない限り憲章改訂を必要としない。

この文書はプロジェクト文書の目次ではない。個別の作業文書を読まなくても、守るべき価値判断を単独で理解できることを目指す。個別の Issue、Pull Request、実装上の都合は、この憲章を暗黙に上書きしない。

## 2. 使命

本プロジェクトの使命は、Steve Meretzky による 1985 年のインタラクティブ・ノベルを、作品とゲーム挙動を保存したまま、日本語話者が継続的に体験できるようにすることである。

これは原作の翻案、再制作、簡略版の作成ではない。目指すのは次の両立である。

1. Release 79 が実行する物語、パーサー、状態遷移、失敗や曖昧さを保存する。
2. UI、物語表示、入力支援を日本語化し、理解と操作の摩擦を減らす。

「日本語として読みやすいこと」と「原作として正しいこと」が衝突する場合、原作の完全性を守ったうえで、日本語体験を安全に縮退させる。

## 3. 保存する原作と権威

### 3.1 Canonical story

- `public/amfv-r79-s851122.z4` は唯一の canonical story artifact である。
- SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` である。
- 通常の application、wrapper、localization、accessibility、testing、documentation の変更で canonical story を変更しない。
- `source/` 以下の historical ZIL は原作資料として保存する。日本語化や支援機能の都合で書き換えない。
- 非 canonical な QA/debug story は検証用成果物として分離し、canonical experience と混同しない。

### 3.2 Runtime authority

Canonical interpreter 上で動く Release 79 を、parser input の解釈、game state、story output、save/restore を含む状態遷移の唯一の権威とする。

日本語表示、支援 UI、派生状態、将来の入力 adapter は、canonical runtime の決定を観測または仲介できるが、置き換えてはならない。

## 4. 実装方式を問わず守る性質

どのアーキテクチャを採用しても、以下を満たさなければならない。

1. **Observed truth** — 日本語体験は、canonical runtime が実際に出力した事実または historical source で確認できる事実に基づく。
2. **Single authority** — 表示や支援のための派生状態を、第二の game state machine にしない。
3. **One-way localization** — 日本語訳を canonical state の判定根拠へ戻さない。
4. **No fabrication or loss** — 観測されていない prose、status、turn、成功状態を合成せず、canonical output を要約または黙って捨てない。
5. **Canonical actions** — 支援操作や localized input は、canonical parser が最終的に受理・解釈する入力へ解決する。
6. **Deterministic recovery** — locale change、再描画、save/restore、restart、undo、認識失敗によって、実際とは異なる localized state を提示し続けない。
7. **Replaceable implementation** — 現在の観測、照合、履歴、表示の各実装は交換可能であり、その交換だけを理由に憲章を変更しない。

## 5. プレイヤーへの約束

### 5.1 日本語優先、原文への安全な退避

- 対応済みの UI と story output は、日本語 experience では日本語で提示する。
- 翻訳が存在しない、状態を確実に認識できない、または presentation が回復できない場合は、観測済みの canonical English を提示する。
- 後続ターンが English fallback になっても、すでに提示した正しい日本語履歴を不必要に巻き戻さない。
- Canonical experience へ安全に戻れる経路を維持する。

### 5.2 Semantic fidelity と accessibility

- Prose の区切り、heading、status、prompt、command echo、history など、プレイに意味を持つ構造を保持する。
- 同じ story content を二重に読み上げさせず、keyboard、focus、screen reader、reading preference を localized experience でも維持する。
- 見た目の再現や翻訳範囲の拡大を、意味構造と accessibility より優先しない。

### 5.3 原作由来の支援

攻略、移動、行動候補、入力支援は、historical source、canonical output、canonical parser vocabulary に根拠を持つ場合だけ提供する。場所、対象、利用可能な行動を確実に判定できない場合は、推測するより支援を出さない。

## 6. 判断の優先順位

原則が衝突した場合は、次の順序で判断する。

1. **Canonical integrity** — 原作とその挙動を保存する。
2. **Observed truth** — 確認できる事実だけを使う。
3. **Single authority** — parser と game state の権威を移さない。
4. **Semantic fidelity** — 意味のある構造と履歴を失わない。
5. **Safe recovery** — 未対応や失敗でも canonical experience を失わない。
6. **Accessibility** — 表示方式によって access を後退させない。
7. **Localization coverage** — 上記を守れる範囲で日本語体験を広げる。
8. **Visual polish and convenience** — 見た目と利便性は保証を損なわない範囲で追求する。

## 7. 非目標

本プロジェクトは、次を目的としない。

- Release 79 の `.z4` や historical ZIL を日本語版として書き換えること
- Canonical parser または game state machine を別の層へ再実装すること
- Runtime machine translation を、検証済み翻訳と同等の canonical translation path にすること
- 観測されていない原作文、状態、成功を合成すること
- 原作に根拠のない攻略、自動進行、行動候補を追加すること
- 原作の意図的な曖昧さ、失敗、制約を、現代化の名目で取り除くこと

新しい renderer、telemetry、input method、deployment architecture そのものは禁止しない。ただし、それらは runtime authority を奪ったり、原作にない事実を作ったり、fallback と accessibility の保証を弱めたりしてはならない。

## 8. 成功の定義

成功は、翻訳率や screenshot の一致率だけでは測らない。次の条件が同時に成り立つことを目指す。

- 日本語話者が原作を継続してプレイできる。
- Canonical Release 79 の story、parser、state transition が保存されている。
- 未対応出力や presentation failure が、canonical English や正しい既存履歴を失わせない。
- 支援 UI が原作に根拠を持ち、不確実なときは推測しない。
- Accessibility と reading preference が localized experience でも保たれる。
- 実装を置き換えても、ここで定めた保証を説明し、検証できる。

## 9. 憲章の改訂

憲章改訂が必要なのは、ここで定めた使命、保存対象、runtime authority、プレイヤーへの保証、判断の優先順位そのものを変更するときである。

実装構造、milestone、Issue の順序、test command、dependency、deployment、開発フローの変更だけでは、憲章を改訂しない。

改訂する Pull Request は、変更する原則、変更が必要になった証拠、canonical integrity・fallback・accessibility への影響、既存 experience の移行方法を明示する。
