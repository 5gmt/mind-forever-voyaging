# AMFV 日本語化プロジェクト状況

> 種別: Living roadmap / project status  
> 最終確認日: 2026-09-26

## この文書の責任範囲

この文書は、日本語化プロジェクトの現在の実装、完了した milestone、未解決課題、次の作業順を記録する。Issue や Pull Request の進行に合わせて通常の project maintenance として更新する。

これは不変条件や実装者向け規則を定める文書ではない。この文書だけで「現在どこまで進み、次に何を判断するか」を理解できることを目指す。

## 現在の到達点

日本語化は、canonical Release 79 を変更しない presentation-only localization として、opening、最初の line-input tableau、直後の `LOOK`、最初の `PEOF` Dr. Perelman office scene、同室での deterministic inspection packet、初回 Simulation Mode 移行、Kennedy Park での最初の recording loop、2041 Courthouse への recording 往復まで到達している。

現在到達済みの opening、Communications Mode、最初の PEOF を取り囲む wrapper UI についても、承認済みの範囲を日本語化している。これには core header、reading/play settings、introduction overlay、companion shell、PEOF SceneActions、original-package overlay、identity rail、shared story shell、visible label、accessible name が含まれる。

| 層 | 現在の日本語 coverage | 意図的に未対応の境界 |
| --- | --- | --- |
| Story presentation | opening、initial tableau、`LOOK`、PEOF arrival、7-command inspection packet、4回の `WAIT` と simulation-ready brief、security prompt、Kennedy Park entry / `LOOK`、最初の recording loop、Elm & Park 経由の 2041 Courthouse recording 往復 | Courthouse 以外の fieldwork、assignment completion、後続の Simulation story output |
| Wrapper UI | core header、reading/play settings、introduction、opening / Communications / PEOF companion、PEOF SceneActions、package overlay、identity rail、shared shell | 初期 Simulation の操作と assisted security decoder の copy、later mode / later phase 固有 UI の日本語化、fieldwork、QA/debug |
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
- [PR #58](https://github.com/5gmt/mind-forever-voyaging/pull/58) / [Issue #55](https://github.com/5gmt/mind-forever-voyaging/issues/55): 2041 Courthouse recording round trip を二つの fresh canonical Chromium session で capture し、stable route、optional city noise、status/input boundary、および既存 ordinary-turn structure で表現可能なことを runtime evidence として確定
- [Issue #56](https://github.com/5gmt/mind-forever-voyaging/issues/56): 2041 Courthouse 往復の exact observed leaves と wrapper-owned place name に対する日本語 copy packet を監査、承認
- [Issue #57](https://github.com/5gmt/mind-forever-voyaging/issues/57): approved copy を既存 ordinary-turn catalog と exact `currentPlace` presentation に統合し、Classic / Guided の complete fresh-session route と canonical-English fallback を browser regression で検証して、2041 Courthouse milestone を完了

## 現在の frontier

[Issue #29](https://github.com/5gmt/mind-forever-voyaging/issues/29) が選定した **Simulation Mode への初回移行と最初の recording loop** milestone は、Issues #47–#50 で runtime evidence、narrow projections、copy approval、browser integration を完了した。

実装済み境界は、fresh canonical session の PEOF から `WAIT` × 4、simulation-ready brief、`ENTER SIMULATION MODE`、security challenge 正答、Kennedy Park entry / `LOOK`、`RECORD` → `WAIT` → `RECORD OFF` を経て通常の line input が戻るところまでである。Dynamic security color / inner number と simulation date/time は canonical のまま保持し、computed outer answer は既存 assisted command deck だけが扱う。

**2041 Courthouse recording round trip** milestone は Issues #55–#57 で完了した。Kennedy Park から Elm & Park、Courthouse へ recording 中に移動し、explicit `LOOK` の後に帰着する stable leaves は既存 ordinary-turn catalog で日本語表示される。Optional city noise、raw GridWindow status、commands、dynamic date/time は canonical English のまま保持し、wrapper-owned `currentPlace` だけを exact accepted room identity で日本語化する。

Courthouse の完了結果は [Issue #29 に報告済み](https://github.com/5gmt/mind-forever-voyaging/issues/29#issuecomment-5859926210)である。
次の候補は **2041年の新聞購入と読書、および初期 fieldwork UI** とし、[固定分析と実行計画](./docs/plans/2041-newspaper-fieldwork.md)に六つの作業単位を記録した。
[Issue #62](https://github.com/5gmt/mind-forever-voyaging/issues/62) の N1 runtime capture は [PR #69](https://github.com/5gmt/mind-forever-voyaging/pull/69) でレビューとマージを完了した。異なる日時の二つの fresh canonical session で Courthouse 往復に続く新聞購入・四段落の読書・帰着・録画停止・入力復帰を観測し、終了案 A（同一 session の裁判所 → 新聞）を採用した。記事は既存 ordinary-turn projector で表現可能で、専用 renderer は不要である。
N2 [#64](https://github.com/5gmt/mind-forever-voyaging/issues/64) は [PR #70](https://github.com/5gmt/mind-forever-voyaging/pull/70) で新聞本文、共有地名、地図固有名の copy review を完了した。U1 [#63](https://github.com/5gmt/mind-forever-voyaging/issues/63) は [PR #72](https://github.com/5gmt/mind-forever-voyaging/pull/72) で初期 Simulation UI packet の U2 / U3 copy review を完了した。U2 [#65](https://github.com/5gmt/mind-forever-voyaging/issues/65) は、入場 CTA、assisted decoder、基本操作、初期 fieldwork launcher、drawer 共通 UI、九課題と補助推定 copy を日本語表示へ統合した。Parser command と dynamic security 値は canonical English のままで、地図内の経路・対象操作は U3 の担当として未実装である。作業票は N1 [#62](https://github.com/5gmt/mind-forever-voyaging/issues/62)、N2 [#64](https://github.com/5gmt/mind-forever-voyaging/issues/64)、N3 [#66](https://github.com/5gmt/mind-forever-voyaging/issues/66)、U1 [#63](https://github.com/5gmt/mind-forever-voyaging/issues/63)、U2 [#65](https://github.com/5gmt/mind-forever-voyaging/issues/65)、U3 [#67](https://github.com/5gmt/mind-forever-voyaging/issues/67) として作成済みである。採用する gameplay milestone の経路と U3 の受入単位は、同一 fresh session の Courthouse → Newspaper とする。
地名の正本は N2、共有対応表の追加は N3、地図での再利用と最終統合は U3 が担う。

## 基本的な作業順

1. U1 [#63](https://github.com/5gmt/mind-forever-voyaging/issues/63) の現行 UI copy、実表示条件、地名 surface の監査と、U2 / U3 対象の承認は完了した。
2. 承認済み N2 と、U1 の地名 surface 監査の review 承認後、N3 [#66](https://github.com/5gmt/mind-forever-voyaging/issues/66) で観測済み新聞本文、room name、地図固有名に必要な共有 lookup / adapter を統合する。U1 の U2 部分承認後、U2 [#65](https://github.com/5gmt/mind-forever-voyaging/issues/65) で基本操作と課題一覧を統合する。
3. U3 [#67](https://github.com/5gmt/mind-forever-voyaging/issues/67) が N3 と U2 のマージを待ち、地図と対象操作、同一 fresh session の Courthouse → Newspaper 全体の受入、milestone の最終集約を行う。

新聞本文と採用経路の map / route UI は今回の計画候補に移したが、まだ実装済み coverage には含めない。
引き続き deferred とする境界は、security wrong-answer / failure、PEOF の別 timing、採用経路以外の fieldwork と map / route UI、recording assignment completion、timed simulation events、later years / re-entry / review、other Communications outlets である。
General GridWindow renderer、geometry-derived identity、runtime machine translation、日本語 parser input も引き続き対象外とする。

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
