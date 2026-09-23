# AMFV 日本語化プロジェクト状況

> 種別: Living roadmap / project status  
> 最終確認日: 2026-09-22

## この文書の責任範囲

この文書は、日本語化プロジェクトの現在の実装、完了した milestone、未解決課題、次の作業順を記録する。Issue や Pull Request の進行に合わせて通常の project maintenance として更新する。

これは不変条件や実装者向け規則を定める文書ではない。この文書だけで「現在どこまで進み、次に何を判断するか」を理解できることを目指す。

## 現在の到達点

日本語化は、canonical Release 79 を変更しない presentation-only localization として、opening、最初の line-input tableau、直後の `LOOK`、最初の `PEOF` Dr. Perelman office scene、同室での deterministic inspection packet、初回 Simulation Mode 移行と Kennedy Park での最初の `RECORD` → `WAIT` → `RECORD OFF` loop まで到達している。

現在到達済みの opening、Communications Mode、最初の PEOF を取り囲む wrapper UI についても、承認済みの範囲を日本語化している。これには core header、reading/play settings、introduction overlay、companion shell、PEOF SceneActions、original-package overlay、identity rail、shared story shell、visible label、accessible name が含まれる。

| 層 | 現在の日本語 coverage | 意図的に未対応の境界 |
| --- | --- | --- |
| Story presentation | opening、initial tableau、`LOOK`、PEOF arrival、7-command inspection packet、4回の `WAIT` と simulation-ready brief、security prompt、Kennedy Park entry / `LOOK`、最初の recording loop | Kennedy Park からの移動、assignment completion、後続の Simulation story output |
| Wrapper UI | core header、reading/play settings、introduction、opening / Communications / PEOF companion、PEOF SceneActions、package overlay、identity rail、shared shell、既存 assisted security decoder | later mode / later phase 固有 UI の日本語化、fieldwork、QA/debug |
| Input and actions | Guided / Action-menu の日本語表示、canonical command に解決される支援操作 | 日本語 parser input |
| Fallback | 対応済み leaf / surface の日本語表示と EN → JA → EN recovery | 未観測または未承認の内容は canonical English |

現在の実装は Parchment の raw English transcript、status、input state、表示行を観測し、wrapper 側で状態認識と presentation history の照合を行い、対応済み部分を semantic blocks として日本語表示する。入力と assisted controls は canonical English command を Parchment へ送る。

PR #19 / Issue #18 で Option 2a の host-reuse prototype を実装し、localized presentation は canonical iframe 内の live `BufferWindow` に別 DOM surface として配置されるようになった。canonical `GridWindow` と `.BufferWindowInner` は Parchment-owned のまま保持し、outer wrapper で Buffer/Grid rectangle を個別に mirror する責務は localized body path から外れた。

2a は browser/correctness gate を通過した。Parchment が `BufferWindow` 配下の child や `.BufferWindowInner` を差し替える lifecycle も、persistent host の再接続、fail-closed visual mode、accessibility ownership refresh、canonical scroll の semantic restoration として明示・テスト済みである。

PR #21 / Issue #20 では、runtime-observed の `BufferLine` 順序、input run、blank-line boundary、既存 semantic class を再利用する Option 2b を `INVENTORY` turn で検証した。plain ordinary line-input turn では、exact observed English leaf の catalog entry と fixture/browser evidence を追加する nearly data-only な expansion が可能になった。

最終方針は、Option 2a の host/window boundary を維持し、plain ordinary turn に Option 2b の observed structure を利用する **2a+2b boundary** である。opening、initial tableau、`LOOK` や structurally richer な turn は specialized projection を優先する。ordinary-turn catalog の現在の identity は exact English leaf であり、同じ English leaf に文脈依存の異なる訳が必要な場合は、より狭い identity または specialized path が必要になる。責任分界、fallback、scroll recovery、deferred alternatives の詳細は [localization presentation boundary](./docs/localization-boundary.md) に記録している。

Issue #13 で、Chromium Playwright acceptance を GitHub Actions の独立した `browser-e2e` job に組み込んだ。通常の `verify` が成功した後だけ browser setup を行い、`npm run test:e2e` を実行する。Playwright failure traces/screenshots は短期 Actions artifact として保持し、browser-only presentation regression も PR 上で可視かつ失敗可能な CI gate になっている。

## 完了した milestone

- [PR #1](https://github.com/5gmt/mind-forever-voyaging/pull/1): canonical game を変更しない toggleable な日本語 UI/story PoC
- [PR #2](https://github.com/5gmt/mind-forever-voyaging/pull/2): canonical checksum、agent guardrails、基本 CI
- [PR #5](https://github.com/5gmt/mind-forever-voyaging/pull/5): Parchment の structured observation に基づく opening presentation
- [PR #6](https://github.com/5gmt/mind-forever-voyaging/pull/6): 最初の line-input tableau と `LOOK` までの localization
- [PR #7](https://github.com/5gmt/mind-forever-voyaging/pull/7): Playwright/Chromium real-browser harness
- [PR #11](https://github.com/5gmt/mind-forever-voyaging/pull/11): localized history、bridge v3 identity、unsupported turn fallback、RESTORE recovery
- [PR #12](https://github.com/5gmt/mind-forever-voyaging/pull/12): semantic blocks、opening enrichment、canonical status の保持
- [PR #15](https://github.com/5gmt/mind-forever-voyaging/pull/15): npm 7-day release-age cooldown、fail-closed version boundary、共通 bootstrap
- [PR #19](https://github.com/5gmt/mind-forever-voyaging/pull/19): Option 2a の canonical `BufferWindow` 内 localized host、Japanese scroll ownership、fail-closed lifecycle/accessibility handling
- [PR #21](https://github.com/5gmt/mind-forever-voyaging/pull/21): Option 2b の observed `BufferLine` / run structure を利用する plain ordinary-turn projection と runtime/browser evidence
- [PR #23](https://github.com/5gmt/mind-forever-voyaging/pull/23): Issues #22 / #17 / #14 の 2a+2b localization boundary 選定と durable decision record
- [Issue #13](https://github.com/5gmt/mind-forever-voyaging/issues/13): Chromium Playwright presentation-fidelity acceptance を独立した GitHub Actions `browser-e2e` gate として導入
- [Issue #24](https://github.com/5gmt/mind-forever-voyaging/issues/24): fresh Communications Mode の `PEOF` から Dr. Perelman office scene を exact observed-leaf catalog と既存 2a+2b path で日本語化
- [PR #28](https://github.com/5gmt/mind-forever-voyaging/pull/28) / [Issue #25](https://github.com/5gmt/mind-forever-voyaging/issues/25): header、reading/play settings、opening から最初の Communications Mode / PEOF までの wrapper-owned visible label と accessible name を EN / JA 化
- [PR #32](https://github.com/5gmt/mind-forever-voyaging/pull/32) / [Issue #30](https://github.com/5gmt/mind-forever-voyaging/issues/30): fresh PEOF baseline の deterministic inspection packet を command-qualified observed leaves と ordinary-turn projector で日本語化
- [PR #33](https://github.com/5gmt/mind-forever-voyaging/pull/33): Issue #29 の design phase を完了し、次の gameplay milestone を初回 Simulation Mode transition と最初の recording loop に選定して、4段階の execution plan を設計（Issue #29 自体は execution root として継続）
- [Issue #31](https://github.com/5gmt/mind-forever-voyaging/issues/31): 現在到達可能な四つの wrapper surface の英日 copy packet を監査、承認
- [PR #39](https://github.com/5gmt/mind-forever-voyaging/pull/39) / [Issue #34](https://github.com/5gmt/mind-forever-voyaging/issues/34): introduction overlay を日本語化
- [PR #40](https://github.com/5gmt/mind-forever-voyaging/pull/40) / [Issue #35](https://github.com/5gmt/mind-forever-voyaging/issues/35): opening、Communications、PEOF companion shell を日本語化
- [PR #41](https://github.com/5gmt/mind-forever-voyaging/pull/41) / [Issue #36](https://github.com/5gmt/mind-forever-voyaging/issues/36): PEOF-reachable SceneActions を日本語化し、canonical English command generation を保持
- [PR #42](https://github.com/5gmt/mind-forever-voyaging/pull/42) / [Issue #37](https://github.com/5gmt/mind-forever-voyaging/issues/37): original-package overlay を日本語化
- [Issue #38](https://github.com/5gmt/mind-forever-voyaging/issues/38): #31 が意図的に除外した identity rail と general story shell の英日 copy packet を監査、承認
- [PR #45](https://github.com/5gmt/mind-forever-voyaging/pull/45) / [Issue #43](https://github.com/5gmt/mind-forever-voyaging/issues/43): identity rail と shared story shell を日本語化し、最初の PEOF までの approved wrapper baseline を完成
- [PR #51](https://github.com/5gmt/mind-forever-voyaging/pull/51) / [Issue #47](https://github.com/5gmt/mind-forever-voyaging/issues/47): fresh PEOF から初回 Simulation Mode と `RECORD` → `WAIT` → `RECORD OFF` までを二つの real-browser session で capture し、9-item assignment boundary、security/date/time の dynamic fields、status/input transition を canonical English fixture として確定
- [PR #52](https://github.com/5gmt/mind-forever-voyaging/pull/52) / [Issue #48](https://github.com/5gmt/mind-forever-voyaging/issues/48): Issue #47 の runtime fixture に基づき、exact raw indentation / run identity を持つ 9-item semantic list と、rolling bridge payload の最新 turn から shell / canonical color / inner number だけを分離する active-input security prompt の narrow projection を実装
- [PR #53](https://github.com/5gmt/mind-forever-voyaging/pull/53) / [Issue #49](https://github.com/5gmt/mind-forever-voyaging/issues/49): 初回 Simulation Mode brief、security shell、Kennedy Park entry / `LOOK`、最初の recording loop の runtime-observed stable English leaves に対する日本語 copy packet を承認
- [PR #54](https://github.com/5gmt/mind-forever-voyaging/pull/54) / [Issue #50](https://github.com/5gmt/mind-forever-voyaging/issues/50): approved copy を typed catalog と二つの narrow projection に統合し、Classic / assisted の complete fresh-session route と fail-closed boundary を unit / Chromium regression coverage に追加して、初回 Simulation Mode milestone を完了

## 現在の frontier

[Issue #29](https://github.com/5gmt/mind-forever-voyaging/issues/29) が選定した **Simulation Mode への初回移行と最初の recording loop** milestone は、Issues #47–#50 で runtime evidence、narrow projections、copy approval、browser integration を完了した。

実装済み境界は、fresh canonical session の PEOF から `WAIT` × 4、simulation-ready brief、`ENTER SIMULATION MODE`、security challenge 正答、Kennedy Park entry / `LOOK`、`RECORD` → `WAIT` → `RECORD OFF` を経て通常の line input が戻るところまでである。Dynamic security color / inner number と simulation date/time は canonical のまま保持し、computed outer answer は既存 assisted command deck だけが扱う。

次の gameplay frontier は未選定である。Issue #29 を execution root として milestone result を確認し、次の bounded route を選定する。Issue #29 はこの integration 完了だけでは close しない。

## 基本的な作業順

1. Issue #29 に初回 Simulation Mode milestone の完了結果と残る deferred boundary を記録する。
2. Issue #29 で次の gameplay frontier と、その runtime evidence / projection / copy / integration の順序を選定する。
3. 選定後は canonical runtime observation を先行し、観測済み identity だけを presentation catalog へ拡張する。

現在も deferred とする境界は、security wrong-answer / failure、PEOF の別 timing、Kennedy Park からの移動、map / routes、recording assignment completion、timed simulation events、later years / re-entry / review、other Communications outlets である。General GridWindow renderer、geometry-derived identity、runtime machine translation、日本語 parser input も引き続き対象外とする。

## 現在の開発・配備状況

- Source of truth は GitHub repository の default branch `codex/modern-amfv` である。
- Current delivery baseline は Next.js static export と Netlify である。
- [PR #3](https://github.com/5gmt/mind-forever-voyaging/pull/3) の ChatGPT Sites adapter は、owner-only preview のための draft experiment であり、現在の baseline には含まれない。
- Repository は Node.js/npm の version boundary、committed lockfile、`npm ci`、7-day `min-release-age` を採用している。
- CI は canonical story checksum、lint、TypeScript、build/unit path を `verify` で検証し、その成功後に Chromium Playwright acceptance を `browser-e2e` で検証する。Playwright failure artifacts は短期 retention で保持する。

## 更新の契機

次の場合にこの文書を更新する。

- implemented player-facing coverage が追加、削除された
- milestone が完了、置換、または取り下げられた
- frontier となる Issue、作業順、依存関係が変わった
- current implementation、CI、dependency policy、delivery baseline の説明が実態と合わなくなった

更新責任と review timing は `AGENTS.md` の `Project status maintenance` に従う。個別 task の acceptance criteria、設計比較、検証ログはこの文書へ複製せず、その Issue、Pull Request、design note に残す。
