# CIの実行と証拠保存

## 変更分類と実行時期

`CI fast`（`ci-fast.yml`）はPR更新とtarget branchへのpushで自動実行する。
`CI`（`ci.yml`）はレビューアが最終head /baseを指定して起動するFull専用であり、PR更新やmergeだけでは起動しない。
最初の `changes` はworkflow構文とCI制御を検査し、PRではmerge-baseからheadまで、pushではbeforeからafterまでの全差分を判定する。
削除と改名前後のパスも判定し、差分が取得できない場合はFullを要求する。

| Scope | 対象 | 自動CI | merge前のFull |
| --- | --- | --- | --- |
| Docs | `docs/**/*.md` と既知のroot文書。下記の実行入力を除く | workflow検査、CI制御テスト | 原則不要 |
| Verify | captureスクリプト、`tests/rendered-html.test.mjs`、説明文書の組合せ | Docsに加えchecksum、lint、型、build、unit、browser一覧照合 | 原則不要 |
| Full | アプリ、fixture、copy packet、依存関係、CIロジック、未分類パス | Verifyと同じ短い検証 | レビューアが手動実行 |

実行入力の例外は `docs/**/*copy-packet.md` と `docs/test-inputs/**` で管理し、説明文書のファイル名を一件ずつ登録しない。
Markdown以外の資料と、文書領域外の未知ファイルはFullのままである。
文書をコードから読み始める変更では、同じPRで実行入力の場所か分類を更新する。
CI制御テストは、現在unit /E2Eが直接読む文書がFullに分類されることも検査する。
これは全ての動的依存を解析する仕組みではなく、新しい読み込み機構はレビュー対象になる。

## 開発者とレビューアの分担

開発者はlint /型 /unitと、短い回帰・影響する既存経路を確認してDraft PRを提出する。
通常の提出前にローカルFull E2Eを一律には要求しない。広範囲の変更や未解決の失敗がある場合は必要に応じて実行する。
レビューアは差分と対象検証を確認し、修正が落ち着いた最終headでFullを起動する。
マイルストーンのZIP監査が必要なら、そのFullで証拠も保存し、通常Fullと証拠用Fullを重ねない。
手動起動はwrite権限のある担当者が行う運用であり、共有GitHub資格情報の間に技術的な役割分離を追加するものではない。

`ci-fast-gate` の成功は短い検証の成功を表す。
Full対象ではsummaryに **FULL CI REQUIRED** を表示し、Full成功やmerge承認とは扱わない。
GitHubのチェック一覧が緑でも、レビューアは次の受入確認を行う。

```sh
# matching repository checkout、Node >=22.13。必要ならread権限のGH_TOKENを使用。
node scripts/ci-readiness.mjs --pr NUMBER
# Docs /VerifyでもレビューアがFullを要求する場合
node scripts/ci-readiness.mjs --pr NUMBER --full
```

このコマンドはGitHub APIと全PR差分を使い、最新head /base、baseの包含、最新実行・attempt、全jobの期待結果を確認する。
Full未実行、古いhead /base、失敗 /cancel /skip、欠落 /重複 /別attemptの混在は `ready: false` またはエラーで非zero終了する。
最新実行が失敗している場合に古い成功へ戻らない。
検査後にPRを再取得し、途中でhead /baseが変わった場合も拒否する。
チェックとmergeの間に更新があれば再確認し、mergeには確認したhead SHAを指定する。
CLIが使えないレビュー環境では、同じhead /baseの全差分分類、対応workflow /event /run名、最新run /attemptの全job、最新base包含とmergeabilityをAPIで照合する。
この結果はCIだけの判定であり、独立レビューと必要なZIP監査は別途完了させる。

本変更はbranch protectionの設定を変更しない。
`ci-fast-gate` を全PRの必須チェックにできるが、それだけではFullを強制できない。
`ci-gate` を無条件の必須チェックにすると、Docs /VerifyにもFullが必要になる。
現行運用ではレビューアが上記の条件付き受入確認を担当する。

## 最終Fullの起動

1. PRの最新head SHAとtarget branchの最新base SHAを確認し、headがbaseを含むことを確認する。
2. Actionsの `CI` → `Run workflow` でPRのbranchを選び、40桁の `head_sha` /`base_sha` を入力する。
3. 証拠が必要なときは容量と監査日程を確認して `save_evidence=true` を指定する。通常はfalse。
4. `Full CI <head> / <base>` というrun名、全5群と `ci-gate` の成功を確認し、受入確認コマンドを実行する。

```sh
gh workflow run ci.yml --ref PR_BRANCH \
  -f head_sha=HEAD_SHA -f base_sha=BASE_SHA -F save_evidence=false
```

Fullは開始時と終了時にcheckout、PR branchの現行head、target branchの現行base、baseの包含を照合する。
選択branchを間違えた場合や、実行中にhead /baseが進んだ場合は受入成功にならない。
Full中は証拠に関係するcommitを追加せず、結果の追記はPR本文・レビューコメントで行う。
更新が必要ならそのheadを再レビューしてFullを起動する。
同一branchの手動実行は古い手動実行をcancelする。通常CIと手動Fullは互いをcancelしない。
ForkのPRはfast検証まで行えるが、手動Fullはbase repository内のレビュー用branchへ取り込んでから行う。

## ブラウザー検証の分配

完全検証は `verify` の成功後、独立した5 runnerで実行する。
各runnerの `workers: 1`、`fullyParallel: false`、`retries: 0` は従来どおりである。
同じ自然セッションの途中を分割したり、既存assertionを省略したりしない。

| 群 | 内容 | 件数 | CI #214から再配置した時間の目安 |
| --- | --- | ---: | ---: |
| church | `church-fieldwork.spec.ts` | 10 | 約14分 |
| power | `power-station-fieldwork.spec.ts` | 9 | 約12分 |
| remaining | その他すべて。新規specと描画遅延回帰1件も含む | 44 | 既存43件は約13分。追加回帰は別途実測 |
| cinema-desktop | `cinema-fieldwork.spec.ts`。Desktop正例3件、非録画負例1件、controlled 3件 | 7 | 約14分 |
| cinema-narrow | `cinema-narrow.spec.ts`。390px正例3件 | 3 | 約8分 |

時間は分散前のログから求めた参考値であり、新構成の実測値ではない。
既存72件に描画遅延回帰1件を追加した全73件と各群のテストIDを照合し、欠落と重複があれば `verify` を失敗させる。
ブラウザーjobの上限は全群35分である。
Matrix の `fail-fast` は無効にして他群の診断結果も得る。
映画館の自然経路は96送信または94送信の全体を一群に所属させ、途中分割や保存状態からの再開をしない。
5群化後の件数、browser step /job /全体時間、retry /skip、通常artifact数の実測は [PR #118](https://github.com/5gmt/mind-forever-voyaging/pull/118) の最終head検証欄を正本とする。

```sh
node --test tests/ci/*.test.mjs
bash scripts/lint-workflows.sh
node scripts/ci-e2e.mjs --check
node scripts/ci-e2e.mjs church
# power / remaining / cinema-desktop / cinema-narrow も同じ形式。
# 従来の npm run test:e2e は全件を実行する。
```

## 受入証拠が必要な実行

通常のPR /pushではbrowserを実行せず、artifactも保存しない。
手動Fullでは従来のPNG、accessibility、JSON、失敗traceを生成する。
`save_evidence=false` の場合はrunner終了後に取得できないので、必要な監査証拠は起動時に指定する。

1. 保存容量を確認し、監査担当者が1日以内に確認できる時点を選ぶ。他リポジトリとPackagesもartifact枠を使う。
2. 上記の最終Fullを `save_evidence=true` で起動する。
3. 同一成功run /attemptの5群すべてを取得する。名前は `playwright-<group>-<runId>-<runAttempt>`。
4. 各ZIPの `ci-provenance.json` の `commit` /`base` /`runId` /`runAttempt` /`group` をレビュー対象とartifact名に照合する。
5. 受入記録の群別対応表からJSON /PNG /TXTとpath添付の実体を監査し、実expiryを記録する。期限内に監査できなければ先に退避する。

保存期間は1日で、証拠実行が失敗した場合も生成済みファイルを保存する。失敗runを受入証拠にはしない。
群を別々のattemptから寄せ集めない。必要な場合は全jobを再実行して同一attemptへそろえる。
証拠の重複除去と過去artifactの追加削除は、この実行条件変更には含めない。

## 導入の確認

既存 `ci.yml` の手動起動を維持し、自動イベントを新しい `ci-fast.yml` へ移す。
本変更のPRでもFastが実行され、workflow構文 /policy /分配とbuild /unitを検証する。
最終のCI保守レビュー後に、このPR branchで新しいhead /base入力を指定したFullを一度実行する。
merge前にはFastだけで完了とせず、全5群と最終guardを含む実行結果を確認する。
merge後は自動Fastだけを確認し、同じ変更でFullを再起動しない。
Docs単独のfast実行とFull未実行時の受入拒否も確認し、実測をPRに残す。
変更中の短い試行にFullを挟まない。

## 2026-11-07の既存artifact整理

観測時の保存量は37件、7,032,690,456 bytesだった。
`.github/artifact-cleanup-2026-11-07.json` はそのうち36件、6,636,487,010 bytesを削除対象として固定し、独立レビューを通過したPR #114の現行artifactを保護する。
この一覧以外のartifactや、新しい実行の証拠を自動選択しない。

PR #107最終受入のZIPはActions外へ退避済みである。
397,434,042 bytes、3,592 entries、SHA-256 `a7428659eb677c88fe67699d8f34dce29bd315e3bedba8c12bef24e3e8ee3ae9` をGitHubのdigestと照合し、ZIPのCRC検査も完了した。
退避は既存の独立監査を保存する作業であり、新たな受入監査を実施したとの主張ではない。

この一覧をdefault branchへ統合したpushで `Artifact maintenance` が実行される。
削除前に全対象のID、name、run ID、size、digestを照合し、不一致なら削除開始前に停止する。
削除済みまたは失効済みの対象は再削除しないため、同じ一覧での再実行が可能である。
PRでは削除しない。
手動実行はdefault branchだけを許可し、`apply=false` が既定のdry runになる。

```sh
node scripts/cleanup-actions-artifacts.mjs
# 削除を実行する場合のみ、Actions write権限のあるGH_TOKENと --apply を使う。
```

新規保存がなければ、整理後に残る対象リポジトリの保存量は396,203,446 bytesとなる。
これはアカウント全体の無料枠残量を保証する値ではない。
削除後も既に積算されたストレージ使用量は戻らず、GitHubの使用量表示にも更新待ちが生じる。
PR #114の証拠を引き続き残す必要がなくなれば別の明示的な整理対象にする。

## 導入時の実測結果

[PR #115](https://github.com/5gmt/mind-forever-voyaging/pull/115)を2026-11-07に統合した。
以下のCI全体時間は、最初のjob開始から最後のjob終了までである。
単発の比較であり、runner性能や負荷による変動を含む。

| 実行 | CI全体 | Browser job | 結果 |
| --- | ---: | --- | --- |
| [変更前](https://github.com/5gmt/mind-forever-voyaging/actions/runs/42248061774) | 49分3秒 | 47分35秒 | 49 unit /62 browser成功 |
| [変更後](https://github.com/5gmt/mind-forever-voyaging/actions/runs/42271260614) | 18分7秒 | church 16分33秒 /power 10分55秒 /remaining 12分39秒 | 49 unit /62 browser /8 CI制御テスト成功、ci-gate成功、artifact 0件 |

変更後の検証headは `e55b1ef2bbe22c4b4c98554ab1a146d17914ea03`、mergeは `bd42170cb7e6bc2ca7bceb7d707ea53d986effec` である。
[Artifact maintenance](https://github.com/5gmt/mind-forever-voyaging/actions/runs/42276424916)は36件、6,636,487,010 bytesを削除して成功した。
処理後のAPI一覧でも、保護したPR #114のartifact `13512501098` だけが残り、1件 /396,203,446 bytesであることを確認した。

アカウント全体の課金使用量やPackagesの保存量は未確認であり、この数値は当リポジトリのartifact実容量である。
次の証拠保存前には残した#114の証拠も必要に応じて退避、整理し、新しい5 ZIPを保存できる容量を確保する。
明示的な手動証拠保存の実アップロードとexpiryは、今回の導入検証では未実施である。

次の容量改善候補として、退避した#107 ZIPの3,592ファイルをSHA-256で比較すると、同一内容の余分なコピーが2,465件、圧縮後合計215,875,088 bytesあった。
これは理論的な重複量であり、削除済み容量や実装済みの圧縮効果ではない。
重複除去を行う場合は、監査が参照する元の証拠パスと内容の対応を維持する別の変更として検証する。

## 映画館 F3 の負荷再配分

[CI #212](https://github.com/5gmt/mind-forever-voyaging/actions/runs/42348240196) の head `346a901acea43b6460220befb09a3c658572aa1d` は verify、power 9件、church 10件が成功した。
Remaining は53件中52件が成功し、最後のレストラン Actions /390px の実行中に35分の job 上限で打ち切られた。
Job のログは06:45:11–07:20:23 UTCで、テスト失敗の記録はない。

追加した映画館10件はすべて成功し、browser 内の所要時間は06:46:27–07:07:30 UTCの約21分4秒だった。
この時点では remaining だけ40分へ延長した。
[CI #214](https://github.com/5gmt/mind-forever-voyaging/actions/runs/42353902587)は全72件成功したが、remainingはbrowser step 35.4分 /job 36分38秒、CI全体は約38分30秒だった。
完走の確認と待ち時間の改善を分け、[CI保守の設計方針](https://github.com/5gmt/mind-forever-voyaging/pull/118#issuecomment-6707223666)に従って本PRで5群へ再配分し、40分の例外を解消する。
上表の時間は旧ログからの概算であり、新構成の実測ではない。
再配分後は全体17～20分程度への復帰を目標とするが、runnerの変動を含むため固定の合否閾値にはしない。
各群1 worker、retry 0、ci-gate、既存経路とassertion、添付、通常artifact保存なし、手動保存1日の方針を保持する。
標準public runnerの計算料金を理由に5群化を避けず、他runとの同時実行競合と手動保存容量は別途確認する。
アカウント全体の課金状況や空き枠を確認済みとは扱わない。

## ローカル対象検証の順序と保存先

Cinemaのcontrolled 3件、`restaurant-projection.spec.ts` の描画遅延回帰を先に実行し、影響する既存経路と390px経路の成功後に最終headのFull CIへ進む。
描画遅延回帰はstable bridge報告のwrapper到達だけを400ms遅らせる検証であり、自然7sessionの証拠と区別する。
再接続後は既存session /processとport 3100の終了を確認し、実行ごとに新しい `--output` を指定する。
進行中の保存先の移動、改名、削除をしない。
検証ログ、失敗時の保存先、再実行理由も残す。
