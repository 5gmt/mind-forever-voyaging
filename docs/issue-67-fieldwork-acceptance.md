# U3 / Issue #67 — 2041 fieldwork 統合受入記録

実装担当: Codex（ChatGPT）。指名された全体受入レビュー担当: ChatGPT Work / unknown。
採用案は N1 の A、同一 fresh canonical session の **Courthouse → Newspaper** である。
Base は N3 / PR #74 と U2 / PR #76 を含む `bb51710d4dde6b182a560b77b0880f1ca83c0f5f`。
この文書は実装側の証拠・制限と、2026-10-08 JST の指名レビュー担当による受入結果を記録する。
全体受入は承認済みであり、milestone の完了点は PR #77 のマージとする。

## 提供範囲

- 初回2041年の drawer 地図、経路表示、次の一歩、方位、context 出口を U1 の承認済み copy で表示する。
- Room name は N3 の `localizeSimulationPlace`、map identity は `localizeSimulationMapLabel` を再利用する。
  `Newspaper` / `North Central Station` / `Bodanski Square`、`InfoTech Building` / `Main & Kennedy` は別の意味を保つ。
- 新聞と新聞販売機の対象名、新聞の Buy / Read、および採用経路の SceneActions 共通 shell を表示する。
  未承認の対象・動詞は英語。未知の地図ボタンは accessible name の suffix も含め `lang=en` とする。
- Guided の地図と SceneActions は編集可能な English draft を作る。Action menus と方位 / context 出口は既存 English command を送る。
- U2 の drawer header / tabs / checklist / `simulationAssignment` / `recordedProgress` / `plotAssignmentLabel` を維持する。
  未接続の PackageOverlay interactive-map branch、地図画像、経路探索、原作・parser・状態認識は変更しない。

## 実ブラウザでの検証契約と証拠

`tests/e2e/first-simulation-localization.spec.ts` の六つの独立した fresh session が、Classic / Guided / Action menus を
1440×900 と 390×844 の Chromium でそれぞれ実行する。QA checkpoint を経路の代用には使わない。

| 対象 | 検証と保存する証拠 |
| --- | --- |
| 連続プレイ単位 | PEOF → WAIT × 4 → 入場・security 正答 → Kennedy Park → Courthouse 往復 → 新聞購入・録画中の読書 → Kennedy Park → RECORD OFF |
| 地図 / 出口 | Assisted は地図 hotspot と次の一歩、context の NW 出口、新聞経路の N 方位ボタンを実際にクリック。Guided draft は未送信の command count と編集・focus を確認 |
| 地名の役割 | 到着時に「新聞、調査目的地、現在地」「ノース・セントラル駅、現在地」と header「ボダンスキー広場」を同時確認。保存画像は `navigation-*-arrival.png`。context 出口は実操作と E2E assertion で確認し、body attachment の `context-exits-*` は現行 CI artifact に PNG として残っていない |
| 対象操作 | Guided は「新聞 / 読む」から draft を作り、購入時は `buy newspaper` に編集。Action menus は「買う」「読む」をクリック。Classic は parser 入力 |
| 原作状態 | 今回の command block と新しい canonical input-line ID で各新聞 turn を同期。購入 response、記事、読書前後の raw recording status、帰着と停止を独立確認。`newspaper-*-turns.json` |
| 補助進捗 | 購入後 `1/9 録画`、読書後 `2/9 録画` を確認する。これらの推定だけで本文や正式な原作達成を判定しない |
| 記事 | 承認 copy を production catalog から独立した四段落全文で照合し、今回の READ turn の順序と空行も検証する |
| 読書 | wheel で末尾の社説まで読み、Range と全 clipping ancestor を照合して最終行が見えることを確認。入力全体の可視性・編集・focus、scroll の start / end / height を記録 |
| Locale / history | 未送信の LOOK と同一 input-line ID を保持した EN → JA → EN、履歴 block count、raw transcript、canonical / localized accessibility owner の切替を確認 |
| 読み上げ | Japanese / English accessibility snapshot で記事四段落がそれぞれ一回だけ現れ、非表示側の本文が含まれないことを確認。実際の screen reader 音声試験とは区別する |
| Fallback / recovery | 未知地点・経路不明・未承認 leaf、真の再入場 / RESTORE 不明状態、QA 往復と履歴窓、既存の presentation-history / RESTORE-safe fallback 回帰を維持 |

各 test の `newspaper-*-ja-editorial.png`、`*-en-editorial.png`、`*-ja-return-editorial.png`、`*-en-return-editorial.png`、
`*-scroll.json`、`*-accessibility.txt` と turn JSON は `test-results/` に保存する。
GitHub CI は passing attachments も `playwright-test-results` artifact に保存する（3日間）。最新 head と artifact のリンクは PR 本文に記録する。

## 回帰の RED / GREEN と限定修正

1. 日本語 navigator / accessible name を期待するブラウザ検証が、変更前の English navigator を検出した。
   新聞 SceneActions の unit regression も `en !== ja` で RED を確認した。
2. 独立した code review で、経路 draft 後の locale 切替に翻訳済み destination が残ることを検出した。
   ブラウザでも `Route to 新聞:` を再現した。Notice state には canonical label と map identity を保存し、表示時に訳す。
3. 未承認 hotspot の `aria-label` が child の English language を上書きしていた。
   `City Hall, fieldwork destination` / `lang=en` の browser assertion を RED にし、ボタンと名前全体を English fallback に修正した。
4. 実ブラウザで、既存の語句重複除外が `newspaper dispenser` と別対象の `newspaper` を一緒に除くため、購入・閲読 UI が出ないことを再現した。
   初回2041年の Bodanski Square の SceneActions だけに、言及済み販売機に対応する既存の NEWSPAPER target を保持する。汎用の語句抽出・状態認識・コマンド生成は変更しない。
5. 狭い画面では checklist は Brief tab にあるため、テストも tab を操作する。
   既存の narrow drawer header は status / RECORD button を非表示にするため、visible な録画 reminder から再開する。desktop では header の RECORD button を操作する。
   録画再開時は raw status の更新だけで次の LOOK に進まず、今回の RECORD / RECORD OFF response block の表示も待つ。projection が raw status に遅れる場合のテスト同期を修正した。
   原作の midday notice で RECORD turn の末尾に追加 prose が現れる場合は、必須の activation blocks と English fallback tail を別々に検証する。
6. 390px の Guided で Next.js の開発用 indicator が新聞ボタンを遮る browser failure を保存した。
   六経路のテストだけで framework の `nextjs-portal` を非表示にし、通常の actionable click を維持する。production の layout / config は変更しない。
7. narrow Action menus の English 記事は段落全体が読書窓より高くなるため、全段落が同時に入る `ratio=1` 判定を最終行の Range / clipping 判定へ置換した。
   記事四段落の全文と順序は別に照合し、wheel による読書、原作の後続 timed prose、入力復帰を保持する。

## 境界・未実施

- UI が送る既存 `NORTH` / `SOUTH` と、N3 が承認した exact `N` / `S` story identity は区別する。
  同じ地点でも未承認 command-qualified leaf は English fallback。UI と状態認識を理由に story catalog を広げない。
- RESTORE / 再入場の不明状態は bridge 報告注入による境界検証を含む。実 RESTORE の保存データ往復を新たに検証したとは書かない。
- 実際の screen reader 音声、Netlify 配備 commit と本番経路、九課題の正式達成、帰還・評価、再入場の日本語化、後続年は未検証・対象外。
- 開発途中に既存 opening harness の待機 timeout があった。成功した最新 head の全件結果とは分け、PR に実行結果を記録する。
- `public/amfv-r79-s851122.z4` の SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`。
  `source/`、QA story、raw GridWindow、2a / 2b と履歴・復元の責任分界を変更しない。

## 実装側の最終候補の確認

実装側の最終候補で `npm run test:e2e` は **26 / 26 成功、retry なし（5.4分）**。
六つの採用経路と既存の履歴・復元・QA・fallback 回帰を同じ実行で通した。
各 viewport / mode の画像を確認し、JA 記事の wheel scroll は desktop で180〜322px、narrow で720〜900px進み、すべて社説最終行が clipping 内に見えている。
`npm run lint`、`npx tsc --noEmit`、`npm test`（production build と28 unit tests）、canonical SHA-256 も成功した。
CI と適用 head の結果は PR 本文に記録する。

## 指名レビュー担当による全体受入

2026-10-08 JST、ChatGPT Work / unknown は実装 head `c25a40478a1db1daaa0c5cca1ea561ab94f0e73d` の
[全体受入を承認した](https://github.com/5gmt/mind-forever-voyaging/pull/77#pullrequestreview-5450363533)。
承認済み copy、初回2041年の適用条件、共有 room / map identity、English command と fallback 境界を照合し、独立したコードレビューでも blocking finding はなかった。

[CI run 37706998154](https://github.com/5gmt/mind-forever-voyaging/actions/runs/37706998154) の実ログで
checksum / lint / TypeScript / build・28 unit tests と、26 Chromium tests（retry なし、4.2分）の成功を確認した。
対象は実装 head と base `bb51710d4dde6b182a560b77b0880f1ca83c0f5f` の GitHub test merge である。
[受入 artifact](https://github.com/5gmt/mind-forever-voyaging/actions/runs/37706998154/artifacts/11520352073) の ZIP SHA-256 は
`51df2f619bd38fd34f6fca7a0279cc4eadec0f8312e461fcc3c93b13b036332b`。
保存期間は3日間であり、この run の期限は 2026-10-11 09:24 JST である。

六つの fresh session の turn / raw recording status、記事四段落と accessibility owner、wheel 後の社説最終行・入力の可視性を記録と保存画像で確認した。
JA 記事の scroll 移動量は Classic / Guided / Action menus の順で desktop が322 / 180 / 180px、narrow が720 / 898 / 900pxであり、すべて最終行が clipping 内に入った。
英日切替で input-line ID を保持し、各言語の accessibility snapshot には対象言語の四段落が一度ずつ現れ、非表示側の四段落は含まれなかった。
レビュー担当の確認は CI と保存証拠の検査であり、この環境での新たな全件ブラウザ実行や実 screen reader 音声試験とは区別する。

この PR 内で計画 B と `PROJECT_STATUS.md` に受入結果と完了時の frontier を集約する。
文書集約後の最新 head の CI、behind=0、mergeability は PR に記録して再確認する。
PR #77 のマージをもって N1〜N3・U1〜U3 の milestone を完了し、Issue #67 を完了、execution root #29 に採用案 A の結果と制限を報告する。
次の gameplay milestone の選定は #29 に戻し、未承認の範囲への実装着手をこの受入から導かない。
