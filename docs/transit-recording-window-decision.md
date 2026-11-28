# T1の再試行: 発車後に録画を始める

2026-11-28 JST、ownerから委任された設計判断として、Astra / ChatGPT Workは **交通候補A（発車後録画）を次のT1実測候補として承認する**。University → Brown車内 → Junctionの経路、Homeの111入力、先行八課題の録画窓、到着・降車・明示OFFという完了条件を保持し、交通区間の録画開始だけを遅らせる。

これは再試行の設計承認であり、成功経路の採択ではない。T1 #127は未完了、T2 #128とT3 #129は引き続き開始不可。実装担当Codex Cloudは、PR #131の失敗証拠と本判断がSolの差分レビュー、最終Full、readinessを経てmergeされた後、別のT1成功実測PRでこの候補を検証する。

## 確認した証拠と判断の根拠

[PR #131](https://github.com/5gmt/mind-forever-voyaging/pull/131) のhead `4a4a72b0ced6f615db93398f2ff4d3f23c2fc92e`、base `c960cb0cb3b72ba8ff0ce072eb3123efb28956e7` を対象とした。[失敗fixture](../tests/fixtures/parchment-transit-runtime-failure.json) のGit blobは `69312ee35e75edcc1ff3c7a4350c89cc3fe9dcb7`。Workは全fixtureを読み、Homeとの111コマンドの対応、131観測のinput ID連鎖、録画窓と原作時刻を独立に確認した。[Solの先行レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/131#pullrequestreview-6094216240)も失敗証拠のみを受け入れており、T1成功とは判定していない。

実測では、126入力目のINで車内に入り、127入力目のRECORDで録画開始と発車を観測した。4回の1分待機後、131入力目のJunction到着と同じturnで満杯警告・自動停止が起きた。降車と明示OFFは未実施である。詳細は[失敗実測記録](transit-runtime-evidence.md)に保持する。

次の表はrawの原作時刻とhistorical sourceの録画ON/OFF処理から復元した録画時間であり、VM内部の容量を読み出した値ではない。番号は失敗fixtureの1始まりのsubmission番号。

| 先行録画窓 | ON / OFFの入力番号 | 録画時間の計算値 |
| --- | --- | --- |
| Kennedy Park | 9 / 11 | 11分 |
| Courthouse | 14 / 16 | 2分 |
| Newspaper / Bodanski | 23 / 26 | 12分 |
| Restaurant | 34 / 36 | 23分 |
| City Hall | 44 / 46 | 9分 |
| Power Station | 58 / 60 | 2分 |
| Church | 73 / 75 | 9分 |
| Cinema | 88 / 90 | 16分 |
| Home | 104 / 106 | 2分 |
| 合計 | 111入力まで | **86分** |

- [misc.zil](../source/misc.zil)の`INCREMENT-TIME`は録画中の経過分を加算し、90を**超えた**ときに自動停止する。[verbs.zil](../source/verbs.zil)の`V-RECORD-ON`はそのturnの時間進行前に録画を有効化し、`V-RECORD-OFF`は時間進行前に無効化する。
- 失敗窓はRECORDの1分と待機4分で5分相当、計91分となり、観測した自動停止と整合する。到着まで収まっても、録画したままのOUTを除外して計算してはならない。
- 同じ進行が再現すれば、候補AはRECORD、到着待機、OUTの計3分相当で、先行分との合計は89分となる。`GOTO`はTube駅・車内への移動を地上移動の5分加算から除外する。UPは地上への移動だが、OFF後に行う。
- [rockvil.zil](../source/rockvil.zil)の`I-BROWN-TUBE`は、録画中の車内**到着または発車**でrecording table index 8を設定する。発車時の録画を必須にしない今回の候補はこのsourceと整合する。ただし内部flagや正式評価を実測したとは主張しない。

89分はこの失敗試行に基づく見込みで、余裕は計算上1分しかない。別sessionの成功、残容量表示、操作を追加してよい余裕を保証しない。既存八課題を短縮したり容量判定を緩めたりせず、自然runtimeで検証する。

## 次の実測で使う手順

1. 採択済みHomeの111 line submissions、先行八課題と全録画窓をそのまま実行する。駅への`SW / W / DOWN`と、Brown車両の実到着・開扉を待つ手順も保持する。
2. 非録画で`IN`を送り、UniversityからBrown車内への実乗車を確認する。**そのINの応答に発車が含まれれば、それを発車観測とする。** 含まれなければ、車内で`WAIT FOR 1 MINUTE`を一回ずつ送り、新しいraw turnのBrown発車文を待つ。ホームで以前見た発車文を流用しない。
3. 車内の発車を観測したturnの**後に**、非録画で`WAIT FOR 1 MINUTE`を**2回、別々に**送る。発車を生じさせた入力はこの2回に含めない。両turnで同じ確実な車内、非録画、新しい通常入力を確認し、まだ到着していないことを確認する。
4. `RECORD`を一回送る。成功応答と車内のrecording status、新しい通常入力を要求する。**このRECORDのturnで既に到着していたら候補不成立として止める。** 到着前の安定した録画観測を必ず一つ残す。
5. `WAIT FOR 1 MINUTE`を一回送る。この新しいturnでJunctionの到着文、Skybus Terminalの看板、開扉、録画継続、通常入力を確認する。この候補で予期した到着がなければ、追加待機や別駅への乗り越しで救済しない。
6. 追加のLOOK / READ / WAIT等を挟まず`OUT`。Junctionホームへの実降車、録画継続、通常入力を確認し、直ちに`RECORD OFF`を送って明示停止成功を確認する。続く`UP / SE / SW`でKennedy Parkの非録画・通常入力へ戻る。

これはcapture / testの有限なコマンド手順である。時計の絶対値、ブラウザーの待ち時間、隠れた運行timerや送信回数だけで、到着・開扉・現在地を確定しない。各送信のraw応答が条件を満たさなければ停止する。実測の19:40発車を別sessionへ固定しない。

駅待ち40送信、車内待ち8送信という既存の診断上限は増やさない。車内の上限には発車前の待機、発車後の2回、録画後の1回をすべて含める。各段階の待機数と全commands/input IDを別々に記録し、総送信数を固定の合格条件にしない。UI確認やsnapshotだけでcanonical commandを追加しない。

## 採択・実装の境界

- T1はcanonical formと現行UI＋formの**独立fresh full sessionを2件**成功させる。別freshの駅のみ録画、車両不在IN、走行中OUTのprobesも従来どおり必要。失敗履歴は書き換えず、新しい出力先でpartialと失敗を保存する。
- Full / auto-deactivation、予定前の到着、乗り過ごし、上限超過、未知/矛盾した所在、missing status/input、録画不成立があれば停止してWorkへ戻す。異なる録画時機や先行窓へ黙って変更して再実行しない。
- T2は、T1で成功採択された手順を静的な英日案内に含め、普通のWAITと1分待機を区別する。発車確認後に2回待って録画することを説明できるようにする。productionに自動待機、カウントダウン、予測した到着時刻、残容量推定を追加しない。
- T3は**発車がRECORDより前でもよい**。達成条件は成功した録画開始 → その後の新しい録画中の車内到着・開扉 → 録画中の実降車 → 明示OFFのまま。到着後の後付けRECORD、録画開始と同turnの到着、駅で見える発車だけを達成にしない。
- 看板の行順は既存projectorの制御テストで確認されているが、localized hostでの字下げ保持は未確認。T1は成功採択前に既存2bで必要な構造を保持できるか確認する。新projectionが必要ならT2へ進まずWorkに戻す。本判断はrenderer / history / recovery / accessibilityの境界変更を承認しない。

## 引き継ぎと検証

今回の文書変更は再実測を行っておらず、既存capture scriptもまだ早期RECORDのままである。そのまま成功再試行に使わず、次のT1実測PRで上記手順へ変更し検証する。失敗fixture、historical source、canonical artifact、production codeは変更しない。

PR #131は失敗証拠と設計判断を記録するPRとして、T1をcloseしない。Solの既存レビューは旧headに対するものなので、文書差分を独立確認した後、最終head/current baseで手動Full（既存7群、`save_evidence=false`）とreadinessを行う。まだFullが実行されていない段階で文書を同PRに追記し、別の設計PRと依存更新を増やさない。Full成功は既存回帰の検証であり、未実施の候補A成功やT1完了を証明しない。
