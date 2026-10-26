# AMFV 日本語化プロジェクト状況

> 種別: Living roadmap / project status  
> 最終確認日: 2026-09-26

## この文書の責任範囲

この文書は、日本語化プロジェクトの現在の実装、完了した milestone、未解決課題、次の作業順を記録する。Issue や Pull Request の進行に合わせて通常の project maintenance として更新する。

これは不変条件や実装者向け規則を定める文書ではない。この文書だけで「現在どこまで進み、次に何を判断するか」を理解できることを目指す。

## 現在の到達点

日本語化は、canonical Release 79 を変更しない presentation-only localization として、opening、最初の line-input tableau、直後の `LOOK`、最初の `PEOF` Dr. Perelman office scene、同室での deterministic inspection packet、初回 Simulation Mode 移行、Kennedy Park での最初の recording loop、2041 Courthouse への recording 往復、続く新聞購入・四段落の読書、Roy’s Pagoda での食事録画と公園帰着まで到達している。G3 の統合 head では、続く City Hall の政府職員との会話録画・退場後 LOOK・公園帰着の本文と限定 UI を追加し、[市役所受入記録](./docs/city-hall-fieldwork-acceptance.md)に検証と完了 gate をまとめる。[PR #86](https://github.com/5gmt/mind-forever-voyaging/pull/86) を merge `284eb5dcfb9e900e8d98a6a34e5a5ad2d058ce3c` で統合し、同じ fresh session の3課題を Classic / Guided / Action menus × desktop / narrow の6経路で受け入れた。[#29 の完了報告](https://github.com/5gmt/mind-forever-voyaging/issues/29#issuecomment-6382354177)と[受入記録](./docs/restaurant-fieldwork-acceptance.md)に証拠と制限を残している。

現在到達済みの opening、Communications Mode、最初の PEOF を取り囲む wrapper UI についても、承認済みの範囲を日本語化している。これには core header、reading/play settings、introduction overlay、companion shell、PEOF SceneActions、original-package overlay、identity rail、shared story shell、visible label、accessible name が含まれる。

| 層 | 現在の日本語 coverage | 意図的に未対応の境界 |
| --- | --- | --- |
| Story presentation | opening、initial tableau、`LOOK`、PEOF arrival、7-command inspection packet、4回の `WAIT` と simulation-ready brief、security prompt、Kennedy Park entry / `LOOK`、最初の recording loop、Elm & Park 経由の 2041 Courthouse recording 往復、Main & Kennedy / Centre & Kennedy / Bodanski Square 経由の新聞購入・四段落の読書・帰着、Elm & University / Elm Underpass / Roy’s Pagoda の来店・食事・支払・公園帰着、Rockvil Centre / City Hall の到着・政府職員との会話・退場・LOOK・帰着 | 他 fieldwork、正式 assignment completion、後続の Simulation story output |
| Wrapper UI | core header、reading/play settings、introduction、opening / Communications / PEOF companion、PEOF SceneActions、package overlay、identity rail、shared shell、初回2041年の Simulation 入場 CTA / assisted security decoder / 基本操作 / fieldwork launcher・drawer・九課題、地図の共通操作・採用経路・新聞対象操作、初回2041年 Roy’s Pagoda 限定 meal の英日 draft / 一回送信、初回2041年 City Hall の在室が確認された政府職員に限る英日 Talk・説明・draft / 一回送信 | later mode / later phase 固有 UI、未承認の地名・対象・動詞、QA/debug |
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
- [PR #77](https://github.com/5gmt/mind-forever-voyaging/pull/77) / [Issue #67](https://github.com/5gmt/mind-forever-voyaging/issues/67): 新聞本文と初期 fieldwork UI の六作業を統合し、同一 fresh session の Courthouse → Newspaper を3 interaction modes × 2 viewports で受け入れ、N1–N3 / U1–U3 の milestone を完了

- [PR #86](https://github.com/5gmt/mind-forever-voyaging/pull/86) / [Issue #80](https://github.com/5gmt/mind-forever-voyaging/issues/80): 同一初回2041年 session の Courthouse → Newspaper → Restaurant → Kennedy Park を6経路で受け入れ、限定 meal UI と本文・地図を統合。M1–M3 / レストラン milestone を完了。

## 現在の frontier

初回 Simulation / recording loop、Courthouse、Newspaper と初期 fieldwork UI、Restaurant は完了した。
[レストラン計画](./docs/plans/2041-restaurant-fieldwork.md)、[A案の実測](./docs/restaurant-recording-a-evidence.md)、[受入記録](./docs/restaurant-fieldwork-acceptance.md)が直前 milestone の根拠である。
旧候補の録画容量不足は [#82 の失敗証拠](./docs/restaurant-runtime-evidence.md)として保持し、採択した A案および従来の成功 fixture / 回帰とは区別する。
#86 の最終 head `defce753268d344cec6ae2753b94a820c27933f8` に対する [Work の最終 gate](https://github.com/5gmt/mind-forever-voyaging/pull/86#pullrequestreview-5637647137)と [CI](https://github.com/5gmt/mind-forever-voyaging/actions/runs/40059801256)を経て merge 済み。最終検証は31 unit / 34 browser tests、M1–M3 の Issues #78–#80 は完了している。
既存 lifecycle の起動同期と測定ウィンドウ分離も #86 で回帰検証し、2a+2b、canonical authority、history / recovery / accessibility の保証を維持した。

City Hall milestone の統合範囲は、同じ初回2041年 session の既存3課題に続く **政府職員との会話録画と Kennedy Park への帰着** である。
[市役所計画](./docs/plans/2041-city-hall-fieldwork.md)に採択経路、人物の在室と退場、受入境界、タスクセットをまとめている。
計画 PR [#90](https://github.com/5gmt/mind-forever-voyaging/pull/90) に続き、G1 は [#91 の独立採択レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/91#pullrequestreview-5646050774)と merge `7d1291177ee6a690ffdfb0e33b39f2a27c8e310d` で完了した。
先行40送信を保持した2 fresh session の成功と84 UI sample が経路の採択根拠である。
G2 は [#92 の独立 copy approval](https://github.com/5gmt/mind-forever-voyaging/pull/92#pullrequestreview-5646941509)と merge `c0b790184ee4e0f36fcda9a628ed4c237d1da987` で完了し、[G3 開始 gate](https://github.com/5gmt/mind-forever-voyaging/issues/89#issuecomment-6407364036)も解除された。
G3 は承認済みの本文・room / map / actor / Talk と説明を統合する。
初回2041年・解決済み City Hall・raw English の在室根拠・line input を条件とし、退場後の古い cache / 長い履歴から Talk を復活させない局所 guard を追加した。
新しい本文の表示条件は観測時の history entry に保持し、対象外の英語 fallback と過去の有効な日本語を維持する。
6本の full fresh route、非録画会話の負例、controlled boundary probes、reading / recovery / accessibility の根拠と限界は[市役所受入記録](./docs/city-hall-fieldwork-acceptance.md)にまとめる。
Milestone の完了条件は Sol 通常レビュー、Astra / Work の全体受入と merge、#29 報告、#89 close であり、その実行結果と最終 head / CI は提出 PR・review・Issue を正本とする。
本書は実装 coverage の roll-up を記録し、未実施の merge / close を先に完了扱いしない。

## 基本的な作業順

1. 市役所計画 PR #90 は Sol review / merge 済み。通常レビューは Sol、milestone 締めは Astra / ChatGPT Work という分担を継続する。
2. G1 [#87](https://github.com/5gmt/mind-forever-voyaging/issues/87): #91 で採択と merge 済み。成功経路、原文と現行 UI、未確認の境界を G2 / G3 へ引き継ぐ。
3. G2 [#88](https://github.com/5gmt/mind-forever-voyaging/issues/88): #92 の独立 copy approval / merge で完了。本文、役割別の UI、周囲の説明と guard を G3 へ引き継ぐ。
4. G3 [#89](https://github.com/5gmt/mind-forever-voyaging/issues/89): catalog / UI と在室・退場の局所 guard、先行3課題付きの6経路と境界回帰を統合。実装者の status / plan / 受入記録をもとに、Sol 通常レビュー後に Work が milestone 全体を受け入れ・merge し、#29 報告と Issue close を行う。

G1–G3 の依存関係と完了条件の正本は市役所計画と各 Issue とする。新経路が成立しない場合は設計判断へ戻り、先行経路や完了条件を暗黙に変更しない。
原作側の正式な九課題達成・帰還評価、再入場・後続年の日本語化、他 fieldwork と Communications outlet、未承認地名・対象操作、security wrong-answer / failure、PEOF の別 timing、対象経路外の timed events は引き続き対象外である。
General GridWindow renderer、geometry-derived identity、runtime machine translation、日本語 parser input も対象外とする。
原作 recording と補助 checklist の推定を区別し、unknown output、optional interrupt、RESTORE 後の不明状態の English fallback を保持する。
[#44](https://github.com/5gmt/mind-forever-voyaging/issues/44) の provenance conventions は独立して扱う。

## 現在の開発・配備状況

- Source of truth は GitHub repository の default branch `codex/modern-amfv` である。
- Current delivery baseline は Next.js static export と Netlify である。
- [PR #3](https://github.com/5gmt/mind-forever-voyaging/pull/3) の ChatGPT Sites adapter は、owner-only preview のための draft experiment であり、現在の baseline には含まれない。
- Repository は Node.js/npm の version boundary、committed lockfile、`npm ci`、7-day `min-release-age` を採用している。
- CI は canonical story checksum、lint、TypeScript、build/unit path を `verify` で検証し、その成功後に Chromium Playwright acceptance を `browser-e2e` で検証する。City Hall 統合 head では既存34件に新規9件を加え、browser job 上限を35分とする。#82 の merge により、default branch は Playwright failure artifacts と成功時の受入 screenshot / accessibility 記録を14日間保持する。#82 reviewed-head run の実期限もレビュー記録で確認済み。

## 更新の契機

次の場合にこの文書を更新する。

- implemented player-facing coverage が追加、削除された
- milestone が完了、置換、または取り下げられた
- frontier となる Issue、作業順、依存関係が変わった
- current implementation、CI、dependency policy、delivery baseline の説明が実態と合わなくなった

更新責任と review timing は `AGENTS.md` の `Project status maintenance` に従う。個別 task の acceptance criteria、設計比較、検証ログはこの文書へ複製せず、その Issue、Pull Request、design note に残す。
