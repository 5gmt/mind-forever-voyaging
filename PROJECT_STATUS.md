# AMFV 日本語化プロジェクト状況

> 種別: Living roadmap / project status  
> 最終確認日: 2026-08-22

## この文書の責任範囲

この文書は、日本語化プロジェクトの現在の実装、完了した milestone、未解決課題、次の作業順を記録する。Issue や Pull Request の進行に合わせて通常の project maintenance として更新する。

これは不変条件や実装者向け規則を定める文書ではない。この文書だけで「現在どこまで進み、次に何を判断するか」を理解できることを目指す。

## 現在の到達点

日本語化は、canonical Release 79 を変更しない presentation-only localization として、opening、最初の line-input tableau、直後の `LOOK` まで到達している。

現在の実装は Parchment の raw English transcript、status、input state、表示行を観測し、wrapper 側で状態認識と presentation history の照合を行い、対応済み部分を semantic blocks として日本語表示する。入力と assisted controls は canonical English command を Parchment へ送る。

PR #19 / Issue #18 で Option 2a の host-reuse prototype を実装し、localized presentation は canonical iframe 内の live `BufferWindow` に別 DOM surface として配置されるようになった。canonical `GridWindow` と `.BufferWindowInner` は Parchment-owned のまま保持し、outer wrapper で Buffer/Grid rectangle を個別に mirror する責務は localized body path から外れた。

2a は browser/correctness gate を通過した。Parchment が `BufferWindow` 配下の child や `.BufferWindowInner` を差し替える lifecycle も、persistent host の再接続、fail-closed visual mode、accessibility ownership refresh、canonical scroll の semantic restoration として明示・テスト済みである。

一方、translation expansion はまだ data-only ではない。`app/story-presentation.ts` は opening と initial tableau / `LOOK` に対する narrow recognizer/projection を持ち、ordinary new turn の翻訳追加には catalog だけでなく recognizer/projection 側の変更が必要になる。このコストを下げられるかを Issue #20 の Option 2b prototype で評価中である。

この実装構造は現在の説明であり、将来の必須アーキテクチャではない。最終 reuse boundary は Issue #17 で #20 の evidence をレビューした後に選定する。

## 完了した milestone

- [PR #1](https://github.com/5gmt/mind-forever-voyaging/pull/1): canonical game を変更しない toggleable な日本語 UI/story PoC
- [PR #2](https://github.com/5gmt/mind-forever-voyaging/pull/2): canonical checksum、agent guardrails、基本 CI
- [PR #5](https://github.com/5gmt/mind-forever-voyaging/pull/5): Parchment の structured observation に基づく opening presentation
- [PR #6](https://github.com/5gmt/mind-forever-voyaging/pull/6): 最初の line-input tableau と `LOOK` までの localization
- [PR #7](https://github.com/5gmt/mind-forever-voyaging/pull/7): Playwright/Chromium real-browser harness
- [PR #11](https://github.com/5gmt/mind-forever-voyaging/pull/11): localized history、bridge v3 identity、unsupported turn fallback、RESTORE recovery
- [PR #12](https://github.com/5gmt/mind-forever-voyaging/pull/12): semantic blocks、opening enrichment、canonical status の保持
- [PR #15](https://github.com/5gmt/mind-forever-voyaging/pull/15): npm 7-day release-age cooldown、fail-closed version boundary、共通 bootstrap
- [PR #19](https://github.com/5gmt/mind-forever-voyaging/pull/19): Option 2a — canonical `BufferWindow` 内 localized host、Japanese scroll ownership、fail-closed lifecycle/accessibility handling

## 現在の frontier

### [Issue #14: Reuse canonical Parchment window chrome for localized presentation](https://github.com/5gmt/mind-forever-voyaging/issues/14)

Localized presentation の window/chrome/scroll ownership 設計は Issue #17 の umbrella evaluation で進行中である。

- [Issue #18](https://github.com/5gmt/mind-forever-voyaging/issues/18): Option 2a は完了。canonical `BufferWindow` host reuse は viable と判断済み。
- [Issue #17](https://github.com/5gmt/mind-forever-voyaging/issues/17): 2a evidence を記録し、final reuse boundary を選ぶ umbrella decision issue。
- [Issue #20](https://github.com/5gmt/mind-forever-voyaging/issues/20): 現在の実行 task。observed canonical `BufferLine` / run structure を利用する Option 2b が ordinary translation expansion cost を実質的に下げるか、一つの representative turn で評価する。

Option 1 は isolation/control baseline として残るが、2a が hard correctness gate を通過したため現時点で fallback する根拠はない。Option 3（semantic GridWindow renderer）は simpler reuse boundary が concrete browser evidence で失敗した場合だけ再検討する escape hatch である。

### [Issue #13: Run Playwright presentation fidelity acceptance in CI](https://github.com/5gmt/mind-forever-voyaging/issues/13)

Playwright acceptance は repository に存在するが、現在の GitHub Actions `verify` job は canonical SHA、lint、type check、`npm test` までで、`npm run test:e2e` を実行していない。Browser-only regression はまだ CI の正式な gate ではない。

## 基本的な作業順

1. Issue #20 の Option 2b experiment を完了し、evidence を Issue #17 に戻す。
2. Issue #17 で 2a / 2b の reuse boundary を選定・文書化し、Issue #14 の architecture decision を完了する。
3. Issue #13 で Playwright acceptance を CI の可視かつ失敗可能な gate にする。
4. 確立した presentation/history/window/structure model の上で story translation coverage を段階的に広げる。
5. 十分な canonical command corpus と曖昧性処理を設計した後、日本語入力 adapter を検討する。

緊急の regression や canonical integrity の問題はこの順序より優先する。順序を変える場合は、その task の Issue または design note に依存関係と失う保証を記録する。

## 現在の開発・配備状況

- Source of truth は GitHub repository の default branch `codex/modern-amfv` である。
- Current delivery baseline は Next.js static export と Netlify である。
- [PR #3](https://github.com/5gmt/mind-forever-voyaging/pull/3) の ChatGPT Sites adapter は、owner-only preview のための draft experiment であり、現在の baseline には含まれない。
- Repository は Node.js/npm の version boundary、committed lockfile、`npm ci`、7-day `min-release-age` を採用している。
- CI は canonical story checksum、lint、TypeScript、build/unit path を検証する。E2E の CI 組み込みは Issue #13 で追跡している。

## 更新の契機

次の場合にこの文書を更新する。

- milestone が完了または取り下げられた
- frontier となる Issue が変わった
- 作業順または依存関係が変わった
- current implementation、CI、dependency policy、delivery baseline の説明が実態と合わなくなった

個別 task の acceptance criteria、設計比較、検証ログはこの文書へ複製せず、その Issue、Pull Request、design note に残す。
