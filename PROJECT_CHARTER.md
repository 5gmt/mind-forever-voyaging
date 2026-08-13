# AMFV 日本語化プロジェクト憲章

> 状態: Active  
> 基準日: 2026-08-13  
> 対象: 人間のメンテナー、コントリビューター、コーディングエージェント

## 1. この文書の役割

この憲章は、`A Mind Forever Voyaging — Modern Unabridged Edition` に日本語体験を加える際の目的、変更不能な境界、設計判断の優先順位を定める。

文書の役割は次のように分担する。

- [`README.md`](README.md) は、現在の製品、遊び方、開発・配備手順を説明する。
- [`AGENTS.md`](AGENTS.md) は、実装者が個々の変更で守る作業規則と検証項目を定める。
- Issue と Pull Request は、具体的な課題、設計比較、実装差分、検証結果を記録する。
- この憲章は、それらを判断するための上位原則を定める。

個別の Issue、Pull Request、実験的な配備都合は、暗黙のうちにこの憲章を上書きしない。方針を変える必要がある場合は、憲章そのものを明示的に改訂する。

## 2. 使命

本プロジェクトの使命は、Steve Meretzky による 1985 年のインタラクティブ・ノベルを、作品とゲーム挙動を保存したまま、日本語話者が現代のブラウザで継続的に体験できるようにすることである。

これは原作の翻案、再制作、簡略版の作成ではない。目指すのは次の両立である。

1. Release 79 が実行する物語、パーサー、状態遷移、失敗や曖昧さを保存する。
2. UI、物語表示、入力支援を段階的に日本語化し、理解と操作の摩擦を減らす。

「日本語として読みやすいこと」と「原作として正しいこと」が衝突する場合、原作の完全性を守ったうえで、日本語表示を安全に縮退させる。

## 3. 変更不能な基盤

### 3.1 Canonical story

- `public/amfv-r79-s851122.z4` は唯一の canonical story artifact である。
- SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` でなければならない。
- 通常のアプリケーション、wrapper、localization、accessibility、testing、documentation の変更で、このファイルを変更してはならない。
- `source/` 以下の歴史的 ZIL は、原作を理解し、source-grounded な支援情報を抽出するための資料である。明示的な historical-source task でない限り変更しない。
- 非 canonical な QA/debug story は別の検証用成果物として扱い、日本語化の都合で変更しない。

### 3.2 実行時の権威

Parchment 上で動く Release 79 を、以下の唯一の権威とする。

- parser input の受理と解釈
- game state と story phase
- room、mode、year、status
- prose、parser response、prompt、command echo
- save、restore、restart、undo を含む状態遷移

React wrapper は第二のゲームエンジンになってはならない。wrapper は canonical interpreter が観測可能な形で出力した事実を読み、表示や支援へ投影する。ゲーム状態を独自に進めたり、観測されていない原作文を補ったり、成功したと仮定したりしない。

## 4. プレイヤーへの約束

### 4.1 日本語優先、原文への安全な退避

- 日本語 locale では、対応済みの UI と story output を日本語で提示する。
- 翻訳が存在しない、認識に失敗した、または presentation layer が回復できない場合は、観測済みの canonical English を表示する。
- 未対応出力を捏造、要約、省略してはならない。
- 後続ターンが英語へ fallback しても、すでに提示した日本語の履歴を不必要に英語へ巻き戻さない。
- locale の切り替え、RESTORE、RESTART、重複した bridge update は、定義済みで決定論的な履歴挙動を持たなければならない。
- canonical player へ安全に戻れる経路を常に残す。

### 4.2 原作由来の操作

Guided controls、Action menus、地図、場面支援は、historical ZIL、canonical output、canonical parser vocabulary に根拠を持つ場合だけ表示する。

支援操作は普通の English parser command を Parchment に送信し、その結果を待つ。場所、対象、利用可能な行動を確実に判定できない場合は、推測するより支援を出さない。

### 4.3 Accessibility と読書設定

日本語 presentation は代替表示であって、accessibility tree、keyboard operation、focus、reading preferences を劣化させる理由にはならない。

- 同じ story content を同時に二重に読み上げさせない。
- 非表示の canonical iframe と表示中の presentation の `aria-hidden`、`inert`、focus ownership を明示する。
- high contrast、font scale、reading mode、reduced motion を canonical view と localized view の双方で維持する。
- DOM semantics と読み順を、見た目の pixel parity より優先する。

## 5. アーキテクチャ境界

基本的なデータの向きは次のとおりとする。

`canonical Release 79 / Parchment`
→ `raw English transcript・status・input state`
→ `narrow bridge observation`
→ `state recognition・history reconciliation`
→ `localized presentation`
→ `player`

入力支援は逆向きに、canonical English command として Parchment へ戻す。

この境界から、以下の規則を導く。

1. State detection は必ず raw English transcript と status を使う。日本語訳を状態判定へ戻さない。
2. Bridge は観測層であり、game-state API ではない。必要な semantic identity、line/run structure、input readiness、window semantics を狭く公開する。
3. Presentation history は観測された canonical turns と source identities に対応付ける。再描画や同じ observation を新しい game turn と誤認しない。
4. Localization catalog は安定した ID と対応済み leaf を持ち、各 leaf は観測済み English へ個別に fallback できるようにする。
5. Presentation は heading、prose、quote、command、prompt、list、spacer、status など、原作表示の意味構造を保持する。
6. Layout fidelity のために arbitrary computed styles を際限なく bridge へ追加しない。まず canonical Parchment chrome、window geometry、scroll ownership を再利用できないか検討する。
7. Parchment と並行する汎用 Glk renderer や layout engine を作る場合は、より小さな再利用境界が成立しないことを実ブラウザの証拠を伴って示さなければならない。

## 6. 設計判断の優先順位

判断が衝突した場合は、原則として次の順序を優先する。

1. **Canonical integrity** — Release 79 と historical source を変更しない。
2. **Observed truth** — canonical runtime または historical source から確認できる事実だけを使う。
3. **Single authority** — parser と game state の権威を Parchment から移さない。
4. **Semantic fidelity** — prose の区切り、status、prompt、command echo、history の意味を失わない。
5. **Safe recovery** — 未対応や認識失敗でも、原文を失わずプレイを継続できる。
6. **Accessibility** — 視覚的再現のために読み上げ、focus、入力可能性を犠牲にしない。
7. **Real-browser evidence** — DOM fixture だけでなく、実際の Parchment → bridge → React loop で確認する。
8. **Localization coverage** — 上記の基盤を壊さない範囲で翻訳範囲を広げる。
9. **Reviewability and supply-chain restraint** — 小さな差分と少ない依存関係を保つ。

したがって、翻訳範囲の拡大より履歴と fallback の正しさを、個別 CSS の pixel matching より一貫した window/scroll model を、便利そうな推測より支援を出さない判断を優先する。

## 7. 非目標

現段階では、以下を目的としない。

- Release 79 の `.z4` や historical ZIL を日本語版として書き換えること
- Z-machine parser または game state machine を React 側へ移植すること
- runtime machine translation を canonical translation path にすること
- 観測されていない canonical prose、status、turn を合成すること
- wrapper を汎用 Parchment/Glk renderer にすること
- 日本語化を一度に全編へ広げ、fallback をなくすこと
- pixel-perfect な複製のために無制限の computed-style bridge を作ること
- preview の便宜だけを理由に production dependency や application architecture を増やすこと
- 原作に根拠のない攻略、自動進行、行動候補を追加すること

日本語入力は将来の対象だが、日本語 parser を新設することを意味しない。採用する場合は、日本語の意図を限定的かつ検証可能な canonical English command へ変換する adapter として設計する。

## 8. 現在地（2026-08-13）

この節は進捗を把握するためのスナップショットであり、恒久的な要件ではない。詳細と検証証拠は各 Pull Request と Issue を正本とする。

### 完了した基盤

- [PR #1](https://github.com/5gmt/mind-forever-voyaging/pull/1) で、canonical game を変更しない toggleable な日本語 UI/story PoC を導入した。
- [PR #2](https://github.com/5gmt/mind-forever-voyaging/pull/2) で、canonical checksum、agent guardrails、基本 CI を導入した。
- [PR #5](https://github.com/5gmt/mind-forever-voyaging/pull/5) で、Parchment の structured observation に基づく opening presentation を導入した。
- [PR #6](https://github.com/5gmt/mind-forever-voyaging/pull/6) で、最初の line-input tableau と `LOOK` まで presentation-only localization を拡張した。
- [PR #7](https://github.com/5gmt/mind-forever-voyaging/pull/7) で、Playwright/Chromium の real-browser harness を導入した。
- [PR #11](https://github.com/5gmt/mind-forever-voyaging/pull/11) で、localized history、bridge v3 identity、unsupported turn fallback、RESTORE recovery を導入した。
- [PR #12](https://github.com/5gmt/mind-forever-voyaging/pull/12) で、semantic blocks、opening enrichment、canonical status の保持を導入した。
- [PR #15](https://github.com/5gmt/mind-forever-voyaging/pull/15) で、npm の 7-day release-age cooldown、fail-closed な npm version boundary、共通 bootstrap を導入した。

### 開いている設計・品質課題

- [Issue #14](https://github.com/5gmt/mind-forever-voyaging/issues/14): localized presentation が Parchment の window chrome と scrolling をどこまで再利用し、どの要素が viewport を所有するかを決める。
- [Issue #13](https://github.com/5gmt/mind-forever-voyaging/issues/13): 現在ローカルで実行している Playwright presentation acceptance を GitHub Actions の正式な検証へ組み込む。

[PR #3](https://github.com/5gmt/mind-forever-voyaging/pull/3) の ChatGPT Sites adapter は、owner-only preview のための draft experiment であり、現在の canonical application architecture や日本語化の前提ではない。採用する場合は、依存関係、保守対象、既存の static export との重複を改めて評価する。

## 9. 戦略的な進行順序

既知の課題に対する基本線は次のとおりとする。

1. Issue #14 で chrome と scroll/viewport ownership の一貫したモデルを決める。
2. Issue #13 で Playwright acceptance を CI の可視かつ失敗可能な gate にする。
3. 確立した presentation/history/window model の上で、story translation coverage を段階的に広げる。
4. 十分な canonical command corpus と曖昧性処理を設計した後、日本語入力 adapter を追加する。

緊急の回帰修正や canonical integrity の問題はこの順序より優先する。順序を変える場合は、依存関係と失う保証を Issue または Pull Request に明記する。

## 10. 品質と供給網

### 10.1 Verification

変更種別に応じて、少なくとも以下を確認する。

- canonical story SHA-256
- `npm run lint`
- `npx tsc --noEmit`
- `npm test`
- localization、wrapper、bridge、layout 変更では `npm run test:e2e`
- layout、status、scroll、focus に関わる変更では real-browser での手動 fidelity 確認

Fixture/unit tests は recognizer と reconciliation の決定論を検証する。Playwright は canonical interpreter を含む統合経路を検証する。手動確認は geometry、scroll、chrome、reading experience を検証する。いずれか一つで他を代用しない。

Issue #13 が完了するまで、GitHub Actions が green であることだけでは Playwright acceptance の通過を意味しない。

### 10.2 Dependency policy

- Node.js と npm の要件、bootstrap 手順は `README.md` と `package.json` を正本とする。
- 通常の再現可能な導入には committed lockfile と `npm ci` を使う。
- npm dependency resolution では 7-day `min-release-age` を維持する。
- production dependency は、明示的な必要性、代替案、bundle/runtime/maintenance impact を説明できる場合だけ追加する。
- cooldown や version boundary の例外は暗黙に設けず、理由と期限を Pull Request に記録する。

## 11. 配備とソースの所有

- GitHub repository と default branch `codex/modern-amfv` を source of truth とする。
- 現在の static export と Netlify delivery は配備方法であり、story/runtime architecture の権威ではない。
- ChatGPT Sites を含む別の配備先は、交換可能な preview または delivery layer として扱う。
- 配備先の制約を理由に canonical story、state authority、localization boundary を変えない。
- 配備 adapter が別の framework、lockfile、dependency graph、generated source を必要とする場合は、preview の価値に対して継続的な保守コストを明示する。
- agent-owned environment だけに存在する変更を正本にせず、再現に必要な source と設定を GitHub 上でレビュー可能にする。

## 12. 変更の進め方

- 通常の feature/maintenance work は task-specific branch と draft Pull Request で行う。
- 差分は小さく保ち、翻訳拡大、bridge protocol、history semantics、window architecture、deployment adaptation を可能な限り別々にレビューする。
- 実装は runtime-observed fixture、source evidence、real-browser evidence のいずれに基づくかを明記する。
- 認識できない状態、安全に fallback できない状態、canonical player を操作できない状態を、成功として扱わない。
- 戦略変更はこの憲章を、実務上のガードレール変更は `AGENTS.md` を、利用・開発手順の変更は `README.md` を同じ Pull Request で更新する。
- 一時的な妥協は、何を保証しないかと、解消を追跡する Issue を記録する。

## 13. 成功の定義

このプロジェクトの成功は、翻訳率や screenshot の一致率だけでは測らない。

成功している状態とは、次の条件が同時に成り立つ状態である。

- 日本語話者が、対応範囲の拡大を実感しながら原作を継続してプレイできる。
- canonical Release 79 の story、parser、state transition が保存されている。
- 未対応出力や presentation failure が、過去の日本語履歴や canonical English を失わせない。
- 支援 UI が原作に根拠を持ち、不確実なときは推測しない。
- keyboard、screen reader、reading preferences を含む access が、localized view でも保たれる。
- contributor が source of truth と responsibility boundary を説明できる。
- build、test、preview、deployment が repository から再現できる。

## 14. 憲章の改訂

この憲章は固定された完成宣言ではない。ただし、個別実装の都合で自然消滅させてはならない。

改訂する Pull Request は、少なくとも次を説明する。

1. 変更する原則
2. 変更が必要になった証拠
3. canonical integrity、fallback、accessibility、testing への影響
4. 既存実装と未完了 Issue の扱い
5. 必要な migration または verification

「現在地」の更新だけで規範部分を変更する必要はない。規範部分を変更する場合は、タイトルと Pull Request 本文で方針変更であることを明示する。
