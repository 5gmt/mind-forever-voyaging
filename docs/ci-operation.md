# CIの実行と証拠保存

CIは変更内容に応じて必要な検証を選ぶ。
最初の `changes` はworkflow構文とCI制御を検査し、PRではmerge-baseからheadまで、pushではbeforeからafterまでの差分を判定する。
削除と改名前後のパスも判定し、差分を取得できなければFullを選ぶ。

| Scope | 対象 | 実行する検証 |
| --- | --- | --- |
| Docs | `scripts/ci-scope.mjs` に列挙した、実行時に読み込まれない説明文書だけ | workflow検査、CI制御テスト |
| Verify | captureスクリプト、`tests/rendered-html.test.mjs`、上記文書の組合せ | Docsに加え、checksum、lint、型検査、build、unit、browser一覧照合 |
| Full | アプリ、共有fixture、copy packet、依存関係、CI実行ロジック、未分類パス | Verifyに加え、全browser tests |

新しい文書も、allowlistに追加するまではFullになる。
文書をコードから読み込む変更を加えた場合は、その文書をallowlistから外す。
`.github/workflows/**` を一律に軽量扱いにはしない。
説明文書だけのworkflowも起動し、最後の `ci-gate` が必要なjobの成功と意図したskipを確認する。
Branch protectionに必須チェックを設定する場合は、個々のmatrix名ではなく `ci-gate` を使う。

## ブラウザー検証の分配

完全検証は `verify` の成功後、独立した3 runnerで実行する。
各runnerの `workers: 1`、`fullyParallel: false`、`retries: 0` は従来どおりである。
同じ自然セッションの途中を分割したり、既存assertionを省略したりしない。

| 群 | 内容 | 導入時の件数 | CI #203での所要時間の合計 |
| --- | --- | ---: | ---: |
| church | `church-fieldwork.spec.ts` | 10 | 約18.8分 |
| power | `power-station-fieldwork.spec.ts` | 9 | 約11.7分 |
| remaining | その他すべて。新規specも含む | 43 | 約16.2分 |

時間は分散前のログから求めた参考値であり、新構成の実測値ではない。
全62件と各群のテストIDを照合し、欠落と重複があれば `verify` を失敗させる。
ブラウザーjobの上限は各35分で、matrixの `fail-fast` は無効にして他群の診断結果も得る。

```sh
node --test tests/ci/*.test.mjs
bash scripts/lint-workflows.sh
node scripts/ci-e2e.mjs --check
node scripts/ci-e2e.mjs church
# power / remaining も同じ形式。従来の npm run test:e2e は全件を実行する。
```

## 受入証拠が必要な実行

通常のPRとpushは、成功時も失敗時もartifactをアップロードしない。
テストは引き続きPNG、accessibility、JSON、失敗traceを生成するが、runner終了後は取得できない。
まずjobログで失敗を調べ、ファイルが必要な場合は対象headで証拠実行を行う。
通常のCI成功だけでは、マイルストーンの独立ZIP監査を満たさない。

1. 保存容量を確認し、監査担当者が1日以内に確認できる時点を選ぶ。他リポジトリとPackagesも同じartifact枠を使う。
2. GitHub Actionsの `CI` → `Run workflow` で対象ブランチを選ぶ。初回導入PRの検証はPRイベントで行い、手動起動の利用はworkflowがdefault branchに入ってからとする。
3. `save_evidence` を有効にする。手動実行は変更分類にかかわらずFullになる。
4. 同一run /attemptの `playwright-church-*`、`playwright-power-*`、`playwright-remaining-*` をすべて取得する。
5. 各ZIPの `ci-provenance.json` のcommitをレビュー対象headと照合し、全群の成功、件数、実体を確認する。
6. 実際のexpiryを引継ぎに記録する。期限内に監査できなければ先に退避するか、対象headで再実行する。

保存期間は1日で、証拠実行が失敗した場合も生成済みファイルを保存する。
同じrunの群を別々のattemptから寄せ集めず、再実行した場合は必要な全群がそろうattemptを用いる。
大きなblob reportやHTML reportを通常CIで追加保存しない。
Branchを更新しても、手動証拠実行は通常のPR /pushとは別のconcurrency groupを使う。

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
