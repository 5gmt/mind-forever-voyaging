# AMFV 日本語化プロジェクト状況

> 種別: Living roadmap / project status  
> 最終確認日: 2026-11-01

## この文書の責任範囲

この文書は、日本語化プロジェクトの現在の実装、完了した milestone、未解決課題、次の作業順を記録する。Issue や Pull Request の進行に合わせて通常の project maintenance として更新する。

これは不変条件や実装者向け規則を定める文書ではない。この文書だけで「現在どこまで進み、次に何を判断するか」を理解できることを目指す。

## 現在の到達点

日本語化は、canonical Release 79 を変更しない presentation-only localization として、opening、最初の line-input tableau、直後の `LOOK`、最初の `PEOF` Dr. Perelman office scene、同室の deterministic inspection、初回 Simulation Mode 移行、Kennedy Park の録画開始、Courthouse、新聞購入と読書、Roy’s Pagoda の食事、City Hall の会話録画、発電所の録画見学、聖ミカエル教会の長老との会話録画と公園帰着まで到達した。
[PR #107](https://github.com/5gmt/mind-forever-voyaging/pull/107) を merge `06e6633ff2a3572959955d320ef1e9d8477a5de4` で統合し、同じ fresh session の六課題を Classic / Guided / Actions × desktop / narrow の6経路で受け入れた。
[教会受入記録](./docs/church-fieldwork-acceptance.md)、[Sol差分レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/107#pullrequestreview-5726523333)、[Work全体受入](https://github.com/5gmt/mind-forever-voyaging/pull/107#pullrequestreview-5726308616)、[#29完了報告](https://github.com/5gmt/mind-forever-voyaging/issues/29#issuecomment-6553674912)に証拠と限界を記録している。
Reading checkpoint の P2 は修正と新ZIPの独立監査を完了し、C1–C3はすべてclose済みである。
補助checklistの6/9はwrapper推定であり、原作の正式評価ではない。

現在到達済みの opening、Communications Mode、最初の PEOF を取り囲む wrapper UI についても、承認済みの範囲を日本語化している。これには core header、reading/play settings、introduction overlay、companion shell、PEOF SceneActions、original-package overlay、identity rail、shared story shell、visible label、accessible name が含まれる。

| 層 | 現在の日本語 coverage | 意図的に未対応の境界 |
| --- | --- | --- |
| Story presentation | opening、initial tableau、`LOOK`、PEOF arrival、7-command inspection packet、4回の `WAIT` と simulation-ready brief、security prompt、Kennedy Park entry / `LOOK`、最初の recording loop、Elm & Park 経由の 2041 Courthouse recording 往復、Main & Kennedy / Centre & Kennedy / Bodanski Square 経由の新聞購入・四段落の読書・帰着、Elm & University / Elm Underpass / Roy’s Pagoda の来店・食事・支払・公園帰着、Rockvil Centre / City Hall の到着・政府職員との会話・退場・LOOK・帰着、Elm & River / Southway & River / Bend / Wicker & River 経由の発電所到着・録画中 LOOK・明示 OFF・帰着、Main & River / Main & Church / Church Entrance 経由の聖ミカエル教会到着、長老との会話録画、退場後 LOOK、公園帰着 | 他 fieldwork、正式 assignment completion、後続の Simulation story output |
| Wrapper UI | core header、reading/play settings、introduction、opening / Communications / PEOF companion、PEOF SceneActions、package overlay、identity rail、shared shell、初回2041年の Simulation 入場 CTA / assisted security decoder / 基本操作 / fieldwork launcher・drawer・九課題、地図の共通操作・採用経路・新聞対象操作、初回2041年 Roy’s Pagoda 限定 meal の英日 draft / 一回送信、初回2041年 City Hall の在室が確認された政府職員に限る英日 Talk・説明・draft / 一回送信、発電所往復7地点と map `power` の英日表示、教会経路4地点と map `church`、現在の在室証拠がある長老に限る main / companion の Talk と説明 | later mode / later phase 固有 UI、未承認の地名・対象・動詞、QA/debug |
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

- [PR #100](https://github.com/5gmt/mind-forever-voyaging/pull/100) / [Issue #96](https://github.com/5gmt/mind-forever-voyaging/issues/96): 同一初回2041年 session の先行四課題に発電所の録画見学と公園帰着を追加。6経路と入口録画・施設内非録画の負例、観測時 room scope、履歴・添付実体を受け入れ、P1–P3 / 発電所 milestone を完了。

- [PR #107](https://github.com/5gmt/mind-forever-voyaging/pull/107) / [Issue #104](https://github.com/5gmt/mind-forever-voyaging/issues/104): 先行五課題に教会の会話録画と公園帰着を追加。6自然経路、非録画負例、限定人物guard、観測時room scopeを受け入れ、C1–C3 / 教会milestoneを完了。Reading証拠の不一致は修正後の実測 / PNG / accessibility と新CI ZIPで再受入した。

## 現在の frontier

初回 Simulation / recording loopから教会までの六課題は完了した。
C1 #102 / PR #105、C2 #103 / PR #106、C3 #104 / PR #107は独立レビューと各merge gateを通過した。
最終head `9e09e4f125f473b23d32c7d84730445e882464cd` のCIは47 unit /62 browser成功、retry /skipなし。
Workはpassing ZIPの実体、自然7session、reading56checkpoint、controlled証拠を確認し、merge、#29報告、#104closeを完了した。
390pxで未出力の時計、実saved-game RESTORE、実screen reader音声、原作の正式評価は検証済みとは扱わない。

次の milestone は、同じ初回2041年sessionの六課題に続く **映画館での入場券購入、鑑賞録画、公園帰着** である。
[映画計画](./docs/plans/2041-cinema-fieldwork.md)に候補96送信、録画容量と一ターン内の見出し / 現在地の実測gate、限定操作、F1–F3をまとめる。
[計画 PR #111](https://github.com/5gmt/mind-forever-voyaging/pull/111) は独立 Sol review を経て merge 済み。
F1 #108 の2 fresh attempts は先行81送信を保持したが、89送信目の映画 `IN` で原作の record buffer full / auto-deactivation を観測して停止した。
[失敗実測](./docs/cinema-runtime-evidence.md) に証拠と別 fresh 券なし probe を保存した。
#112 は失敗証拠として merge 済みで、96送信の成功採択は未了である。
Work は [裁判所を現地録画する候補A](./docs/cinema-recording-a-design.md)を追加実測方針として選定した。
候補Aは12–18番目の RECORD / OFF の位置だけを変更し、先行六課題と全96送信を維持する。
[設計同期 PR #113](https://github.com/5gmt/mind-forever-voyaging/pull/113) は独立 Sol review を経て merge `f527d07084e0055d13d35dd64148fa00e57c866e` 済み。
[候補Aの実測](./docs/cinema-recording-a-evidence.md)では2 fresh sessionsで全96送信、六課題の成立と録画、映画15分の録画継続、明示 OFF / LOOK、公園帰着を確認した。
成功採択候補を提出する段階であり、F1 の独立 Sol 採択 / merge は未了である。
F2 / F3 は引き続き blocked。映画の日本語 coverage は追加していない。

## 基本的な作業順

1. 映画計画 PR #111、失敗証拠 PR #112、候補Aの設計同期 PR #113 は独立 Sol review / merge 済み。
2. [F1 #108](https://github.com/5gmt/mind-forever-voyaging/issues/108): 候補Aの2 fresh sessions の成功採択候補と操作契約を、独立 Sol がレビュー / merge する。旧経路 / 証拠 / 回帰は保持し、成功採択までは後続 gate を解除しない。
3. [F2 #109](https://github.com/5gmt/mind-forever-voyaging/issues/109): F1の採択fixtureから本文、地名、購入 / 入場操作のcopyを承認してmergeする。
4. [F3 #110](https://github.com/5gmt/mind-forever-voyaging/issues/110): 日本語統合と6自然経路、非録画負例、境界回帰を実装する。Sol通常レビュー後、Workが最終headの全体受入とZIP監査、merge、#29報告、Issue closeを行う。

F1–F3の依存関係と停止条件の正本は映画計画と各Issueとする。
候補Aが成立しない場合は設計判断に戻り、許可した裁判所区間以外の先行経路、録画窓、完了条件を暗黙に変更しない。
[レストランA案](./docs/restaurant-recording-a-evidence.md)、[#82の容量不足の証拠](./docs/restaurant-runtime-evidence.md)、教会のharness failureを含む既存fixtureと回帰を保持する。
自宅、公共交通、原作の正式な九課題評価と帰還、再入場 / 後続年、他Communications outletは後続候補である。
映画券の印字 /乱数、marquee、未承認の検査操作、対象経路外のtimed events、新renderer、日本語parser、runtime machine translationは今回の範囲に含めない。
Unknown output、optional interrupt、RESTORE後の不明状態のEnglish fallbackを保持する。
[#44](https://github.com/5gmt/mind-forever-voyaging/issues/44)は独立して扱う。

## 現在の開発・配備状況

- Source of truth は GitHub repository の default branch `codex/modern-amfv` である。
- Current delivery baseline は Next.js static export と Netlify である。
- [PR #3](https://github.com/5gmt/mind-forever-voyaging/pull/3) の ChatGPT Sites adapter は、owner-only preview のための draft experiment であり、現在の baseline には含まれない。
- Repository は Node.js/npm の version boundary、committed lockfile、`npm ci`、7-day `min-release-age` を採用している。
- CIはcanonical checksum、lint、TypeScript、build /unitを `verify` で検証し、その成功後にChromiumの `browser-e2e` を実行する。
- 候補Aの新しい実測回帰を含む suite は49 unit /62 browser testsである。[#112のSolレビュー](https://github.com/5gmt/mind-forever-voyaging/pull/112#pullrequestreview-5797200087)は[当該headのCI](https://github.com/5gmt/mind-forever-voyaging/actions/runs/42173732949)成功を確認している。Browser job上限50分、1 worker、retryなし、成功時の受入証拠と失敗artifactを14日保持する。
- [PR #107最終CI](https://github.com/5gmt/mind-forever-voyaging/actions/runs/41267285902)は全件成功し、browser step38分21秒 /job39分50秒だった。初回full runのjob45分15秒を根拠として旧35分上限を50分に変更した。
- Workが監査した[artifact #13068194532](https://github.com/5gmt/mind-forever-voyaging/actions/runs/41267285902/artifacts/13068194532)は397,434,042 bytes /3,592 entries、実期限2026-11-15 12:39:22 JST。CRCとSHA-256を確認済み。
- 映画計画時点でCIは変更しない。F3は全体実測を記録し、必要最小限のtimeout調整を同じPRでレビューする。CI分割 /並列化 /test削除 /retry追加は別設計判断とする。

## 更新の契機

次の場合にこの文書を更新する。

- implemented player-facing coverage が追加、削除された
- milestone が完了、置換、または取り下げられた
- frontier となる Issue、作業順、依存関係が変わった
- current implementation、CI、dependency policy、delivery baseline の説明が実態と合わなくなった

更新責任と review timing は `AGENTS.md` の `Project status maintenance` に従う。個別 task の acceptance criteria、設計比較、検証ログはこの文書へ複製せず、その Issue、Pull Request、design note に残す。
