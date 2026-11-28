# AMFV 日本語化プロジェクト状況

> 種別: Living roadmap / project status  
> 最終確認日: 2026-11-01

## この文書の責任範囲

この文書は、日本語化プロジェクトの現在の実装、完了した milestone、未解決課題、次の作業順を記録する。Issue や Pull Request の進行に合わせて通常の project maintenance として更新する。

これは不変条件や実装者向け規則を定める文書ではない。この文書だけで「現在どこまで進み、次に何を判断するか」を理解できることを目指す。

## 現在の到達点

日本語化は、canonical Release 79 を変更しない presentation-only localization として、opening、最初の line-input tableau、直後の `LOOK`、最初の `PEOF` Dr. Perelman office scene、同室の deterministic inspection、初回 Simulation Mode 移行、Kennedy Park の録画開始、Courthouse、新聞購入と読書、Roy’s Pagoda の食事、City Hall の会話録画、発電所の録画見学、聖ミカエル教会の長老との会話録画、映画の鑑賞録画、自宅の居間録画と公園帰着まで到達した。
[PR #107](https://github.com/5gmt/mind-forever-voyaging/pull/107) を merge `06e6633ff2a3572959955d320ef1e9d8477a5de4` で統合し、同じ fresh session の六課題を Classic / Guided / Actions × desktop / narrow の6経路で受け入れた。
[教会受入記録](./docs/church-fieldwork-acceptance.md)、[Sol差分レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/107#pullrequestreview-5726523333)、[Work全体受入](https://github.com/5gmt/mind-forever-voyaging/pull/107#pullrequestreview-5726308616)、[#29完了報告](https://github.com/5gmt/mind-forever-voyaging/issues/29#issuecomment-6553674912)に証拠と限界を記録している。
Reading checkpoint の P2 は修正と新ZIPの独立監査を完了し、C1–C3はすべてclose済みである。
補助checklistの6/9はwrapper推定であり、原作の正式評価ではない。
PR #118では、先行六課題に続く映画館の購入、鑑賞録画、明示 OFF / LOOK、公園帰着の日本語本文と限定操作を追加した。
独立Sol通常レビュー後、[Work/Astra最終受入](https://github.com/5gmt/mind-forever-voyaging/pull/118#pullrequestreview-5815595635)と全5 ZIPの監査を完了し、merge `7e32503146a9e7454c573f6ee236448663601b8f` で統合済みである。これは既存レビュー記録の反映であり、今回のCI保守による再監査ではない。
[映画館の統合検証](./docs/cinema-fieldwork-acceptance.md)に証拠と検証状況を集約し、補助7/9を原作の正式評価と区別する。
[PR #126](https://github.com/5gmt/mind-forever-voyaging/pull/126)では同じsessionに自宅の鍵操作、居間の録画中LOOK、明示OFF、公園帰着を追加した。[独立Solレビュー](https://github.com/5gmt/mind-forever-voyaging/pull/126#pullrequestreview-6088099756)、[Work最終受入と全7 ZIP監査](https://github.com/5gmt/mind-forever-voyaging/pull/126#pullrequestreview-6091596637)を経て、merge `76f2c438e69a81d13dfba6c8fa2ab42b5598f4b9` で統合済み。H1–H3は完了し、補助8/9の残りは公共交通である。正式九課題評価は未受入。

現在到達済みの opening、Communications Mode、最初の PEOF を取り囲む wrapper UI についても、承認済みの範囲を日本語化している。これには core header、reading/play settings、introduction overlay、companion shell、PEOF SceneActions、original-package overlay、identity rail、shared story shell、visible label、accessible name が含まれる。

| 層 | 現在の日本語 coverage | 意図的に未対応の境界 |
| --- | --- | --- |
| Story presentation | opening、initial tableau、`LOOK`、PEOF arrival、7-command inspection packet、4回の `WAIT` と simulation-ready brief、security prompt、Kennedy Park entry / `LOOK`、最初の recording loop、Elm & Park 経由の 2041 Courthouse recording 往復、Main & Kennedy / Centre & Kennedy / Bodanski Square 経由の新聞購入・四段落の読書・帰着、Elm & University / Elm Underpass / Roy’s Pagoda の来店・食事・支払・公園帰着、Rockvil Centre / City Hall の到着・政府職員との会話・退場・LOOK・帰着、Elm & River / Southway & River / Bend / Wicker & River 経由の発電所到着・録画中 LOOK・明示 OFF・帰着、Main & River / Main & Church / Church Entrance 経由の聖ミカエル教会到着、長老との会話録画、退場後 LOOK、公園帰着、Museum Entrance / Cinema の購入と15分鑑賞と帰着、Southway & Park / Parkview Apartments / Hall Near Your Apartment / Living Room の開扉・居間LOOK録画・明示OFF・帰着（PR #126受入済み） | 他 fieldwork、正式 assignment completion、後続の Simulation story output |
| Wrapper UI | core header、reading/play settings、introduction、opening / Communications / PEOF companion、PEOF SceneActions、package overlay、identity rail、shared shell、初回2041年の Simulation 入場 CTA / assisted security decoder / 基本操作 / fieldwork launcher・drawer・九課題、地図の共通操作・採用経路・新聞対象操作、初回2041年 Roy’s Pagoda 限定 meal の英日 draft / 一回送信、初回2041年 City Hall の在室が確認された政府職員に限る英日 Talk・説明・draft / 一回送信、発電所往復7地点と map `power` の英日表示、教会経路4地点と map `church`、現在の在室証拠がある長老に限る main / companion の Talk と説明、初回2041年 CINEMA の入場券購入と上映室への入場、自宅経路の地名・入口map・二つの扉に限定した鍵操作・session内の居間録画推定とlive statusの言語境界（PR #126受入済み） | later mode / later phase 固有 UI、未承認の地名・対象・動詞、QA/debug |
| Input and actions | Guided / Action-menu の日本語表示、canonical command に解決される支援操作 | 日本語 parser input |
| Fallback | 対応済み leaf / surface の日本語表示と EN → JA → EN recovery | 未観測または未承認の内容は canonical English |

現在の実装は Parchment の raw English transcript、status、input state、表示行を観測し、wrapper 側で状態認識と presentation history の照合を行い、対応済み部分を semantic blocks として日本語表示する。入力と assisted controls は canonical English command を Parchment へ送る。

PR #19 / Issue #18 で Option 2a の host-reuse prototype を実装し、localized presentation は canonical iframe 内の live `BufferWindow` に別 DOM surface として配置されるようになった。canonical `GridWindow` と `.BufferWindowInner` は Parchment-owned のまま保持し、outer wrapper で Buffer/Grid rectangle を個別に mirror する責務は localized body path から外れた。

2a は browser/correctness gate を通過した。Parchment が `BufferWindow` 配下の child や `.BufferWindowInner` を差し替える lifecycle も、persistent host の再接続、fail-closed visual mode、accessibility ownership refresh、canonical scroll の semantic restoration として明示・テスト済みである。

PR #21 / Issue #20 では、runtime-observed の `BufferLine` 順序、input run、blank-line boundary、既存 semantic class を再利用する Option 2b を `INVENTORY` turn で検証した。plain ordinary line-input turn では、exact observed English leaf の catalog entry と fixture/browser evidence を追加する nearly data-only な expansion が可能になった。

最終方針は、Option 2a の host/window boundary を維持し、plain ordinary turn に Option 2b の observed structure を利用する **2a+2b boundary** である。opening、initial tableau、`LOOK` や structurally richer な turn は specialized projection を優先する。ordinary-turn catalog の現在の identity は exact English leaf であり、同じ English leaf に文脈依存の異なる訳が必要な場合は、より狭い identity または specialized path が必要になる。責任分界、fallback、scroll recovery、deferred alternatives の詳細は [localization presentation boundary](./docs/localization-boundary.md) に記録している。

Issue #13 で導入した Chromium Playwright acceptance は、レビューアが最終head /baseを指定した手動Fullで `verify` 成功後に7群を実行する。
PR更新とmerge後のpushは `CI fast` の短い検証を行い、Fullが必要な変更の受入は最新head /baseの `ci-gate` と全群成功を別途照合する。
説明文書は原則軽量、機械が読むcopy packet等はFullとする。監査証拠は最終Fullと同時に指定して1日保存する。

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

- [PR #118](https://github.com/5gmt/mind-forever-voyaging/pull/118) / [Issue #110](https://github.com/5gmt/mind-forever-voyaging/issues/110): 映画候補Aの先行六課題から入場券購入・15分鑑賞録画・明示OFF / LOOK・公園帰着まで、6自然正例と非録画負例を受入。F1–F3を完了し、補助7/9を正式評価と区別した。[Work最終受入と全5 ZIP監査](https://github.com/5gmt/mind-forever-voyaging/pull/118#pullrequestreview-5815595635)、[#29完了報告](https://github.com/5gmt/mind-forever-voyaging/issues/29#issuecomment-6714598772)を正本とする。

- [PR #119](https://github.com/5gmt/mind-forever-voyaging/pull/119): 説明文書の軽量分類、自動Fast / reviewer起動Full、最新head/baseのreadinessを導入。手動Fullの全5群とmerge後Fastを確認し、CI保守を完了。[最終受入](https://github.com/5gmt/mind-forever-voyaging/pull/119#pullrequestreview-5999340151)と[完了記録](https://github.com/5gmt/mind-forever-voyaging/pull/119#issuecomment-7056484992)を参照。

- [PR #126](https://github.com/5gmt/mind-forever-voyaging/pull/126) / [Issue #122](https://github.com/5gmt/mind-forever-voyaging/issues/122): 同一初回2041年sessionの先行七課題から自宅の鍵操作・居間録画・明示OFF・公園帰着まで、6自然正例と2自然負例、境界回帰を受入。H1–H3完了。[Work最終受入](https://github.com/5gmt/mind-forever-voyaging/pull/126#pullrequestreview-6091596637)と[#29完了報告](https://github.com/5gmt/mind-forever-voyaging/issues/29#issuecomment-7224587039)を正本とする。

## 現在の frontier

同じ初回2041年sessionのCourthouse → Newspaper → Restaurant → City Hall → Power Station → Church → Cinema → Home → Kennedy Parkまでが日本語の受入済み範囲で、補助8/9。映画候補Aの96送信とHomeの15送信、計111 line submissionsを保持する。
[Home実測](./docs/home-runtime-evidence.md)、[承認copy](./docs/home-copy-packet.md)、[受入記録](./docs/home-fieldwork-acceptance.md)、[最終レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/126#pullrequestreview-6091596637)に証拠と限界を集約している。
映画の[旧経路の容量不足](./docs/cinema-runtime-evidence.md)と[候補Aの成功実測](./docs/cinema-recording-a-evidence.md)も保持する。

次のmilestoneは **公共交通に実乗車して録画し、降車後Kennedy Parkへ戻る** こと。[Transit計画 PR #130](https://github.com/5gmt/mind-forever-voyaging/pull/130) は独立Solの採択後にマージ済み。[Transit計画](./docs/plans/2041-transit-fieldwork.md)
T1 の最初のフォーム試行で、Home の111入力を保持し、Elm & University から Brownline に乗車して録画した。Skybus Terminal 側の Junction 到着と同じ入力で録画バッファが満杯になり、自動停止した。[失敗実測](./docs/transit-runtime-evidence.md)
Workが承認した[交通候補A（発車後録画）](./docs/transit-recording-window-decision.md)は、111入力と先行録画窓を保持した新規2件で完走した。発車後に非録画で1分待機を2回送り、録画中のJunction到着と実降車、明示OFF、Kennedy Parkの通常入力を観測した。別probesと看板の制御試験を含め、T1の成功採択は独立Solのレビュー待ち。[候補Aの実測](./docs/transit-runtime-evidence.md#候補-a-の実測)
公共交通の日本語copyと補助9/9は未実装・未受入。原作の正式評価とSimulationからの帰還は別の後続milestone候補とする。

## 基本的な作業順

1. [PR #131](https://github.com/5gmt/mind-forever-voyaging/pull/131) の失敗証拠とWork判断はSolの文書差分レビューと[7群Full](https://github.com/5gmt/mind-forever-voyaging/actions/runs/46138318495)を経てマージ済み。[T1 #127](https://github.com/5gmt/mind-forever-voyaging/issues/127) の候補Aは別PRで2件の完走、別probes、看板構造を提出し、Solによる成功採択と最終Full・readinessを待つ。
2. [T2 #128](https://github.com/5gmt/mind-forever-voyaging/issues/128): T1採択後、本文・駅/車両・map入口・専用操作・最終補助9/9表示の英日copy packetをSolが承認する。
3. [T3 #129](https://github.com/5gmt/mind-forever-voyaging/issues/129): T1/T2後、限定観測adapter、presentation、操作と交通の補助実績を統合。Sol通常レビュー、最終Full、Work全体受入と全ZIP監査、merge・#29報告まで行う。

Codex Cloud実装、通常PRは独立Chat Sol、最終統合だけWorkの分担を継続する。
現CIは7群。T3で長い自然経路用にtransit-desktop / transit-narrowを追加し9群とする計画で、現時点では追加していない。
既存84 browser cases、先行八課題と録画窓、成功/失敗fixtureを保持する。容量不足、先行経路変更、別路線、新projectionが必要ならWorkへ設計判断を戻す。
正式九課題評価と帰還、別室 / 家族との会話、再入場 / 後続年、他Communications outletは後続候補。
Unknown output、optional interrupt、RESTORE後の不明状態のEnglish fallbackを保持し、実saved-game RESTORE、実screen reader音声、本番配備、390pxで原作が出力しない時計を検証済みと扱わない。[#44](https://github.com/5gmt/mind-forever-voyaging/issues/44)は独立して扱う。

## 現在の開発・配備状況

- Source of truth は GitHub repository の default branch `codex/modern-amfv` である。
- Current delivery baseline は Next.js static export と Netlify である。
- [PR #3](https://github.com/5gmt/mind-forever-voyaging/pull/3) の ChatGPT Sites adapter は、owner-only preview のための draft experiment であり、現在の baseline には含まれない。
- Repository は Node.js/npm の version boundary、committed lockfile、`npm ci`、7-day `min-release-age` を採用している。
- CIは説明文書 /Verify /Fullの必要性を分類する。新しい説明Markdownは原則軽量とし、copy packetと `docs/test-inputs/**` を実行入力として管理する。自動 `CI fast` は短い検証だけを行い、レビューアが最終head /baseの手動Fullを起動する。merge後の自動Fullと提出前の一律ローカルFullは廃止する。`ci-fast-gate` の成功とFull受入を区別し、`scripts/ci-readiness.mjs` で現行head /baseと全jobを確認する。
- #114 merge後の49 unit /62 browser testsを維持し、映画F3で3 unit /10 browserの回帰を追加した。さらに[CI保守の修正依頼](https://github.com/5gmt/mind-forever-voyaging/pull/118#issuecomment-6707223666)に対応し、共有Restaurant helperの描画遅延回帰1件を追加した。H1でunit回帰を1件、H3でunit回帰を2件とbrowserテストを11件追加し、アプリの検証対象は55 unit /84 browserとなった。T1 の失敗と完走の fixture 回帰を加え、現在は57 unit /84 browser。CI制御テストは分類、起動条件、参照先と受入判定を継続的に検証する。Browserはchurch 10件 /power 9件 /remaining 44件 /cinema-desktop 7件 /cinema-narrow 3件 /home-desktop 8件 /home-narrow 3件で、各1 worker、retryなし、job上限は各35分。新規specはremainingに入り、実際のPlaywright一覧照合で欠落と重複を検出する。既存73件の経路、assertion、添付を保持する。
- 通常のPR /pushは成功時も失敗時もartifactを保存しない。独立受入は最終head /baseの手動Full実行で `save_evidence=true` を指定し、同一run /attemptの7 ZIPを1日以内に監査する。各ZIPのhead /base /run /attempt /groupと受入記録の証拠パスを照合する。[CI運用](./docs/ci-operation.md)に分類基準と実行手順を記録した。
- [PR #119の最終手動Full](https://github.com/5gmt/mind-forever-voyaging/actions/runs/44807419513)は52 unit /73 browser /15 CI制御テストが全成功。Merge後の[Fast](https://github.com/5gmt/mind-forever-voyaging/actions/runs/44816683069)は約2分22秒で成功、artifact 0件、Fullの重複起動なし。条件付きFullは運用上のmerge gateであり、branch protectionの強制は追加していない。
- H3の[最終Full](https://github.com/5gmt/mind-forever-voyaging/actions/runs/46000628519)は55 unit /84 browser /15 CI制御テストが全成功、全7 ZIP（991,929,960 bytes）を監査済み。Merge後の[Fast](https://github.com/5gmt/mind-forever-voyaging/actions/runs/46042700136)も成功し、artifactは0件、Fullの重複起動なし。これは既存受入結果の反映であり、この計画変更での再実行・再監査ではない。
- #119で未実施だったDocs-only FastはHome計画PRの[実run](https://github.com/5gmt/mind-forever-voyaging/actions/runs/45940995335)で確認済み。保存時provenanceのbaseもH3の[全7 ZIP独立監査](https://github.com/5gmt/mind-forever-voyaging/pull/126#pullrequestreview-6091596637)で確認済み。
- [PR #107最終CI](https://github.com/5gmt/mind-forever-voyaging/actions/runs/41267285902)は全件成功し、browser step38分21秒 /job39分50秒だった。初回full runのjob45分15秒を根拠として旧35分上限を50分に変更した。
- Workが監査した[artifact #13068194532](https://github.com/5gmt/mind-forever-voyaging/actions/runs/41267285902/artifacts/13068194532)は397,434,042 bytes /3,592 entries。2026-11-07の整理に先立ち、ZIPをActions外へ退避し、元のdigestとの一致とCRCを確認した。
- 2026-11-07のCI保守で、映画実装とは別に実行分類と3群分散を導入した。自然経路、assertion、添付の生成、canonical artifactは保持する。[CI保守 PR #115](https://github.com/5gmt/mind-forever-voyaging/pull/115)は全49 unit /62 browser成功と独立差分レビュー後にmerge済み。CI全体は直前の49分3秒から18分7秒となった。レビュー済みの旧artifact 36件を削除し、PR #114の証拠1件 /396,203,446 bytesを保持している。実測値と未検証事項は[CI運用](./docs/ci-operation.md)に記録した。

## 更新の契機

次の場合にこの文書を更新する。

- implemented player-facing coverage が追加、削除された
- milestone が完了、置換、または取り下げられた
- frontier となる Issue、作業順、依存関係が変わった
- current implementation、CI、dependency policy、delivery baseline の説明が実態と合わなくなった

更新責任と review timing は `AGENTS.md` の `Project status maintenance` に従う。個別 task の acceptance criteria、設計比較、検証ログはこの文書へ複製せず、その Issue、Pull Request、design note に残す。
