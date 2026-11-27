# 2041年の自宅訪問の受入記録

H3 は、採択済みの同じ初回2041年セッションで七課題を録画した後、建物入口から自宅の居間を訪ね、録画を停止して Kennedy Park に戻る日本語表示を統合した。
観測時の部屋を各履歴項目に保持し、原文と command が承認済みの組に一致するときに訳を表示する。
地図は建物入口を目的地とし、開扉の操作はその場の扉に対応する。
補助実績は、居間での `RECORD` 成功、新しい録画中の `LOOK` と必須本文、居間での `RECORD OFF` 成功を確認してから更新する。 [Home 計画](plans/2041-home-fieldwork.md) [H2 承認](https://github.com/5gmt/mind-forever-voyaging/pull/125#pullrequestreview-6086347389)

## 経路と証拠の対応

| 受入条件 | 観測方法 | Playwright の保存ファイル |
| --- | --- | --- |
| 先行七課題と96送信の維持 | 映画候補Aの全 assertion と添付を同じ新規セッションで実行する。数値 decoder と移動 alias を正規化し、すべての入力 ID、echo、次入力を照合する。 | 既存の `cinema-runtime-observations.json` など。Home 終了までの連続記録は `home-runtime-observations.json`。 |
| 地図到着と二つの扉 | 建物入口の hotspot と到着名、補助7/9、建物扉と住居扉の visible label / accessible name、Guided draft、Actions 1回送信を照合する。 | `home-entrance-map.png`、`home-entrance-map-accessibility.txt`、`home-{building,apartment}-{en,ja}-{main,companion}-accessibility.txt`。 |
| 居間の録画、明示停止、非録画の公園帰着 | 必須本文を伴う新しい LOOK と raw recording 前後、通常入力、補助8/9、未達の公共交通を確認する。Classic は補助欄のないフォームで完走する。 | `home-runtime-observations.json`、`home-return-brief.png`、`home-return-brief-accessibility.txt`。 |
| 非録画と入口・廊下だけの録画 | 別の Actions 109送信で7/9。短い別セッションでは二つの閉扉拒否を実測し、入口・廊下で録画を停止した後に居間を LOOK しても補助実績が増えないことを確認する。 | `home-runtime-observations.json`（`recordHome=false`）、`home-entry-hall-only.{json,png}`、`home-entry-hall-only-accessibility.txt`。閉扉の採択済み証拠は [H1実測](home-runtime-evidence.md) の別 probe。 |
| 履歴・送信ガード・録画の境界 | 観測時 room、別年、rolling history、言語切替、RESTORE不明、新規開始、QA、busy、char、欠落入力 / status、古いLOOK、見出しだけを制御した bridge report で確認する。 | `home-controlled-{history,guards,recording}.{json,png}` と `-accessibility.txt`。制御した報告は自然経路の採取と区別する。 |
| 居間と公園での読書 | EN → JA → EN → JA で読書サイズと行高を測定し、追従位置と手動位置、companion と drawer の前後、再読後の最終行、焦点、単一の読み上げ元を照合する。 | `home-{living-room,return}-reading.json` と `home-{living-room,return}-reading-{1..4}.png`、同名の `-accessibility.txt`。JSON の checkpoint、再調整後の screenshot 前後の測定、lifecycle を対応させる。 |

本体の地図と付属資料の地図表示は同じ Home 入口の文言を参照できる。
通常の付属資料は原作の静的な画像として開き、経路操作は既存の navigator で行う。
Actions で地図から次の移動を実行した場合も、地図を閉じた後はランチャーにフォーカスが戻る。

## 提出時のローカル検証

H2 マージ `3e190091f10a00b5532d63f597f34ffb32233b0d` を含む最新 `codex/modern-amfv` を比較 base とした。
提出 head と Fast CI の run は PR の commit と checks に記録する。
Canonical Release 79 の SHA-256 は、リポジトリ、本番 export、ローカル配信の3箇所で `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` に一致した。
`npm test` の本番 build と unit 55件、`npm run lint`、`tsc --noEmit`、CI 制御テスト15件、workflow lint、全84件の重複・欠落のない配分を確認した。 [H3 開始記録](https://github.com/5gmt/mind-forever-voyaging/issues/122#issuecomment-7216393905)

初回のブラウザー検証では、原作ステータス欄の英語もストーリー本文の読み上げ重複判定に含めていた。
本文に判定を限定し、ステータス欄を含むフレーム全体の accessibility 証拠は引き続き採取した。
次の本番 export 検証では、390px の Actions で先行する発電所経路の地図を閉じたあと、遅延した入力欄フォーカスがランチャーへのフォーカス復帰を上書きした。
地図内の移動実行から入力欄へのフォーカス予約を外し、Home へ向かう地図操作にもフォーカスの assertion を加えた。

ローカルで配信した本番 export に対して、Chromium 151.0.7922.34 で Home の11件を確認した。
Classic と Guided の4件は地図の Actions フォーカス修正前の成功記録を採用した。
Actions の2正例、2負例、controlled 3件は修正後に実行し、7件が6.6分で通過した。
ローカルでは trace を無効にして、各テスト所定の JSON、PNG、accessibility ファイルを保存した。

| 画面幅・高さ | Classic 111送信 | Guided 111送信 | Actions 111送信 |
| --- | ---: | ---: | ---: |
| 1440×900 | 116.4秒 | 200.6秒 | 230.3秒 |
| 390×844 | 106.6秒 | 174.0秒 | 149.5秒 |

6正例のすべてで録画停止後に公園へ帰着し、補助欄のある4経路で8/9と公共交通の未達を確認した。
非録画の Actions は109送信・228.2秒で7/9だった。
入口・廊下の短い負例は開始キーと20送信で、二つの閉扉拒否と居間での加点なしを確認した。
Controlled の history、guards、recording はそれぞれ14、24、23報告を保存した。
実ファイルを開き、7長経路の送信数と最終状態、居間と帰着時の計56読書 checkpoint、短い負例と controlled 3件の添付を照合した。
ローカル成功ケースの保存量は合計約339 MB（圧縮前）だった。

## 最終 CI と独立監査

手動 Full は通常レビューの修正を反映した最終 head/base で一度実行する。
`save_evidence=true` にする前に容量と1日以内の監査予定を確認する。
`ci-gate` と readiness は開始時・終了時の head/base と同一 run/attempt の全7群の成功を照合する。
実 run、attempt、群別時間と ZIP の失効時刻は最終 PR の受入記録に追記する。 [CI 運用](ci-operation.md)

| 群 | 件数 | Work が取得する ZIP 名 |
| --- | ---: | --- |
| `church` | 10 | `playwright-church-<runId>-<runAttempt>` |
| `power` | 9 | `playwright-power-<runId>-<runAttempt>` |
| `remaining` | 44 | `playwright-remaining-<runId>-<runAttempt>` |
| `cinema-desktop` | 7 | `playwright-cinema-desktop-<runId>-<runAttempt>` |
| `cinema-narrow` | 3 | `playwright-cinema-narrow-<runId>-<runAttempt>` |
| `home-desktop` | 8 | `playwright-home-desktop-<runId>-<runAttempt>` |
| `home-narrow` | 3 | `playwright-home-narrow-<runId>-<runAttempt>` |

各 ZIP の `ci-provenance.json` にある commit、base、run ID、attempt、group をレビュー対象と照合する。
Home の実ファイルは上の対応表を使い、既存5群は従来の証拠索引と照合する。
Full と全7 ZIPの監査、独立 Sol の通常レビューおよび Work の全体受入は提出後のゲートである。 [既存の映画受入記録](cinema-fieldwork-acceptance.md)

実 saved-game RESTORE、実スクリーンリーダー音声、原作の正式九課題評価、他室と家族との会話、公共交通、後続年の自然経路、本番配備は未検証とする。
390px では原作に時計や日付が出力されないため、その値を補完しない。
