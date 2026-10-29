# AMFV 日本語化プロジェクト状況

> 種別: Living roadmap / project status  
> 最終確認日: 2026-09-26

## この文書の責任範囲

この文書は、日本語化プロジェクトの現在の実装、完了した milestone、未解決課題、次の作業順を記録する。Issue や Pull Request の進行に合わせて通常の project maintenance として更新する。

これは不変条件や実装者向け規則を定める文書ではない。この文書だけで「現在どこまで進み、次に何を判断するか」を理解できることを目指す。

## 現在の到達点

日本語化は、canonical Release 79 を変更しない presentation-only localization として、opening、最初の line-input tableau、直後の `LOOK`、最初の `PEOF` Dr. Perelman office scene、同室の deterministic inspection、初回 Simulation Mode 移行、Kennedy Park の録画開始、Courthouse、新聞購入と四段落の読書、Roy’s Pagoda の食事、City Hall の政府職員との会話録画と公園帰着まで到達した。
[PR #93](https://github.com/5gmt/mind-forever-voyaging/pull/93) を merge `967036d818583806e88d4d77f541e41af56b3d9f` で統合し、同じ fresh session の四課題を Classic / Guided / Actions × desktop / narrow の6経路で受け入れた。
[市役所受入記録](./docs/city-hall-fieldwork-acceptance.md)と [#29 完了報告](https://github.com/5gmt/mind-forever-voyaging/issues/29#issuecomment-6411200960)に証拠と限界を記録している。

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

- [PR #93](https://github.com/5gmt/mind-forever-voyaging/pull/93) / [Issue #89](https://github.com/5gmt/mind-forever-voyaging/issues/89): 同一初回2041年 session の先行三課題に City Hall の会話録画、退場後 LOOK、公園帰着を追加。6経路と非録画負例、限定 actor guard、観測時 room scope を受け入れ、G1–G3 / 市役所 milestone を完了。

## 現在の frontier

初回 Simulation / recording loop、Courthouse、Newspaper と初期 fieldwork UI、Restaurant、City Hall は完了した。
City Hall の [計画](./docs/plans/2041-city-hall-fieldwork.md)、[実測](./docs/city-hall-runtime-evidence.md)、[受入記録](./docs/city-hall-fieldwork-acceptance.md)が直前 milestone の根拠である。
G1 #87 / PR #91、G2 #88 / PR #92、G3 #89 / PR #93 は独立レビューと各 merge gate を経て完了した。
#93 の最終 head `2571595cda8abbb2e32b4194c7aa7e7fd07d05aa` に対する [Sol 通常レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/93#pullrequestreview-5647913588)と [Work 全体受入](https://github.com/5gmt/mind-forever-voyaging/pull/93#pullrequestreview-5648983599)、[CI](https://github.com/5gmt/mind-forever-voyaging/actions/runs/40272195826)を確認し、merge、#29 完了報告、#89 close まで実施した。
検証実績は35 unit / 43 browser tests。
原作の録画中会話と補助推定4/9を区別し、390pxで出力されない時計、実 saved-game RESTORE、実 screen reader 音声を検証済みとは扱わない。

次の到達点は、同じ初回2041年 session の四課題に続く **発電所の見学録画と Kennedy Park への帰着** とする。
[発電所計画](./docs/plans/2041-power-station-fieldwork.md)に候補経路、録画容量の実測 gate、copy の範囲と P1–P3 をまとめる。
[計画 PR #97](https://github.com/5gmt/mind-forever-voyaging/pull/97) は独立 Sol review 後に merge `901945a3aee98cfec3a4bea816ebdf11760ba247` で採択済み。
P1 [#94](https://github.com/5gmt/mind-forever-voyaging/issues/94) は2 fresh canonical sessionsで先行50送信を保持した計67送信を完走し、[実測証拠と操作面の台帳](./docs/power-station-runtime-evidence.md)を提出した。
[PR #98 の独立 Sol 採択](https://github.com/5gmt/mind-forever-voyaging/pull/98#pullrequestreview-5677684770)、同一 head の CI / artifact の確認を経て、merge `df1b5c5295f67cae556d1ffd85b589b917a4f657` で成功経路と操作契約を採択済みである。
P2 [#95](https://github.com/5gmt/mind-forever-voyaging/issues/95) の [copy packet](./docs/power-station-copy-packet.md)は、[PR #99 の独立 Sol copy review](https://github.com/5gmt/mind-forever-voyaging/pull/99#pullrequestreview-5691442332)と merge `f4a489ee2484c7f1656ce6bfac3a9c0221b3119e` で承認済みである。
P3 [#96](https://github.com/5gmt/mind-forever-voyaging/issues/96) では承認済み14 leaf、7地点と map `power` の日本語を既存の catalog と観測時 room scope に統合した。
先行四課題に続く発電所の録画見学・明示 OFF・公園帰着の6経路、別 session の入口録画 / 施設内非録画の負例、history / recovery / locale / accessibility の証拠を[発電所受入記録](./docs/power-station-fieldwork-acceptance.md)へ集約している。
この実装は提出 branch 上の追加 coverage であり、最新 default branch の受入済み coverage は City Hall までである。
Sol 通常レビューと Work 全体受入・merge は未実施で、発電所 milestone と原作の正式な課題達成を完了済みと扱わない。

## 基本的な作業順

1. 発電所の計画 PR #97 は独立した Chat モード Sol のレビューと merge を完了。P1 の開始 gate は解除済み。
2. P1 [#94](https://github.com/5gmt/mind-forever-voyaging/issues/94): 先行50送信を保持した67送信を2 fresh sessionsで実測済み。PR #98 の独立採択と merge を完了。成功経路を根拠に P2 開始条件を解除済み。
3. P2 [#95](https://github.com/5gmt/mind-forever-voyaging/issues/95): P1 の原文と surface 台帳に基づく copy packet を PR #99 で独立 copy approval・merge 済み。P3 の開始条件を解除済み。
4. P3 [#96](https://github.com/5gmt/mind-forever-voyaging/issues/96): 承認 copy と受入回帰を統合し、実装者が status / plan / acceptance を同じ PR に集約。Sol 通常レビュー後、Work が同一最終 head の全体受入と merge、#29 報告、Issue close を行う。これらの独立 gate は未了。

P1–P3 の依存関係と完了条件の正本は発電所計画と各 Issue とする。
新経路が成立しない場合は設計判断へ戻り、先行経路、録画区間、完了条件を暗黙に変更しない。
[レストラン A案](./docs/restaurant-recording-a-evidence.md)、[#82 の容量不足の証拠](./docs/restaurant-runtime-evidence.md)、従来の成功 fixture と回帰を保持する。
原作側の正式な九課題達成と帰還評価、教会、自宅、映画、公共交通、再入場と後続年、他 Communications outlet、未承認の地名や対象操作は今回の翻訳範囲に含めない。
Security wrong-answer / failure、PEOF の別 timing、対象経路外の timed events、general GridWindow renderer、geometry-derived identity、runtime machine translation、日本語 parser input も対象外とする。
原作 recording と補助 checklist の推定を区別し、unknown output、optional interrupt、RESTORE 後の不明状態の English fallback を保持する。
[#44](https://github.com/5gmt/mind-forever-voyaging/issues/44) の provenance conventions は独立して扱う。

## 現在の開発・配備状況

- Source of truth は GitHub repository の default branch `codex/modern-amfv` である。
- Current delivery baseline は Next.js static export と Netlify である。
- [PR #3](https://github.com/5gmt/mind-forever-voyaging/pull/3) の ChatGPT Sites adapter は、owner-only preview のための draft experiment であり、現在の baseline には含まれない。
- Repository は Node.js/npm の version boundary、committed lockfile、`npm ci`、7-day `min-release-age` を採用している。
- CI は canonical story checksum、lint、TypeScript、build/unit path を `verify` で検証し、その成功後に Chromium Playwright acceptance を `browser-e2e` で検証する。現在の default branch は36 unit / 43 browser testsを持ち、browser job 上限は35分である。#82 の merge により、default branch は Playwright failure artifacts と成功時の受入 screenshot / accessibility 記録を14日間保持する。#82 reviewed-head run の実期限もレビュー記録で確認済み。
- P3 / #96 の提出 branch は39 unit / 52 browser testsを持つ。検証結果と current-head CI は[発電所受入記録](./docs/power-station-fieldwork-acceptance.md)と提出 PR に記録し、default branch の受入実績とは区別する。

## 更新の契機

次の場合にこの文書を更新する。

- implemented player-facing coverage が追加、削除された
- milestone が完了、置換、または取り下げられた
- frontier となる Issue、作業順、依存関係が変わった
- current implementation、CI、dependency policy、delivery baseline の説明が実態と合わなくなった

更新責任と review timing は `AGENTS.md` の `Project status maintenance` に従う。個別 task の acceptance criteria、設計比較、検証ログはこの文書へ複製せず、その Issue、Pull Request、design note に残す。
