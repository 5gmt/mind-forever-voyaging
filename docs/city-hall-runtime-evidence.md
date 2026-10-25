# 2041 City Hall の連続経路の実測

## 提出時点の判断

G1 / [#87](https://github.com/5gmt/mind-forever-voyaging/issues/87) の実装証拠として、先行3課題を含む2つの独立 fresh canonical session を保存する。
経路と人物操作の契約は独立した Chat モード Sol による採択候補であり、採択レビューと merge までは G1 完了にも G2 / G3 の開始許可にもしない。
新しい日本語 copy、production UI の修正、6経路の全体受入は後続の範囲である。

開始根拠は [計画 PR #90](https://github.com/5gmt/mind-forever-voyaging/pull/90) の merge `86999d7ae28d1f11d86c83adf99db3bfeee6ac1f` と [G1 開始通知](https://github.com/5gmt/mind-forever-voyaging/issues/87#issuecomment-6396230364)。
実測対象の production コードもこの base と同一で、canonical Release 79 と historical source は変更していない。

## 証拠の読み方と再現

- [capture script](../scripts/capture-city-hall-runtime.mjs)：既存 restaurant A の40送信に市役所10送信を加える。
- [runtime fixture](../tests/fixtures/parchment-city-hall-runtime-observed.json)：2 context の原文、status、入力 identity、操作面の accessibility snapshot。
- [regression](../tests/rendered-html.test.mjs)：`retains two fresh City Hall continuations with current input identities and safe projection`。
- [採択済み先行経路](restaurant-recording-a-evidence.md)と[既存の容量不足](restaurant-runtime-evidence.md)は別 fixture のまま保持する。

```bash
# package.json の engine 条件を満たす npm と committed lockfile を使う
bash scripts/bootstrap-npm.sh  # npm が古い場合
npm ci
npx playwright install chromium-headless-shell
npm run build
# static export を production preview として配信する
python3 -m http.server 3100 --bind 127.0.0.1 --directory out
# 別 terminal
node scripts/capture-city-hall-runtime.mjs \
  --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-city-hall-runtime-observed.json
```

各 context は1440×900で、save / restore、VM state 操作、録画容量の消去を行わない。
`startup` は起動 character input に対する空白1文字の入力前後を保存し、50件の line submission と区別する。
`submissions` は実際の command、送信元 input ID、新 echo、次の input ID を50件保存する。
通常送信の原文と raw status は同じ input ID を持つ `observations` に対応し、security の2送信は `submissions` にも個別の presentation / status を持つ。
`bridgeCommands` は player 内で受け取った parent-to-player command request の観測列で、startup を含む51件である。
既存 bridge の keydown 通知と送信後通知は同じ line command を二度報告するため、通知件数を送信件数に数えない。

`observations` は各49件で、decoder の質問と回答を一つの presentation としても保存している。
numeric answer は質問行末の input に入力されるため、独立した `>NUMBER` 行を捏造しない。
`securityPrompt` は回答前、`inputOwnership` は runtime で得た数値とその input ID、`submissions[6].echo` は実回答の `Style_input` run を保存する。
`turnId` は VM 内部 counter ではなく、当該 current input から新 echo になった canonical 行の ID である。
同じ `W` や `E` の古い echo を検索して完了扱いにせず、送信元 ID と新しい input を全送信で連鎖照合する。

`presentation` は live `#windowport` の bridge-v3 原文行、空行、runs、layout と終端 input を保持する。
`statusText` は同じ live window tree の raw GridWindow で、`status` はその文字列から抽出した値である。
source から本文、時刻、残容量や内部 flag を補完しない。
採取途中に harness error が起きた場合も partial observation を保存し、`harnessFailure` と非ゼロ終了を返す。

## 経路と録画の観測

```text
PEOF → WAIT ×4 → ENTER SIMULATION MODE → <observed decoder answer>
→ LOOK → RECORD → WAIT → RECORD OFF
→ RECORD → SW → NW → LOOK → SE → NE → RECORD OFF
→ INVENTORY → NE → N → NE → RECORD → BUY NEWSPAPER → READ NEWSPAPER
→ RECORD OFF → SW → S → SW
→ SW → W → W → S → RECORD → BUY MEAL → RECORD OFF → N → E → E → NE
→ NE → W → W → RECORD → GOVERNMENT OFFICIAL, HELLO → RECORD OFF
→ LOOK → E → E → SW
```

Session 1 は市役所でも通常の command form を使う。
Session 2 の会話だけは Action menus の可視 `Talk` を一度押し、実送信の小文字 `government official, hello` を保存する。
大文字小文字以外は上記候補と同じで、先行40送信と全録画区間は採択済み A と一致する。
UI 監査中の Guided draft は明示 submit せず消去するため、追加の canonical command は発生しない。

| Session | 開始 UTC / JST | 終了 UTC | 原作日付 / Simulation 入場時刻 |
| --- | --- | --- | --- |
| 1 | `2026-10-25T22:00:30.714Z` / `2026-10-26T07:00:30.714000+09:00` | `2026-10-25T22:01:52.864Z` | `3/6/2041` / `10:24am` |
| 2 | `2026-10-25T22:01:52.918Z` / `2026-10-26T07:01:52.918000+09:00` | `2026-10-25T22:03:30.558Z` | `4/21/2041` / `9:58am` |

| 観測 index / command | Session 1: input → next / status 時刻 | Session 2: input → next / status 時刻 |
| --- | --- | --- |
| 13 / `LOOK` | `line-105 → line-111` / `10:49am` | `line-105 → line-111` / `10:23am` |
| 23 / `READ NEWSPAPER` | `line-148 → line-157` / `11:28am` | `line-152 → line-161` / `11:02am` |
| 32 / `RECORD` | `line-186 → line-191` / `12:05pm` | `line-190 → line-195` / `11:39am` |
| 33 / `BUY MEAL` | `line-191 → line-194` / `12:27pm` | `line-195 → line-198` / `12:01pm` |
| 34 / `RECORD OFF` | `line-194 → line-197` / `12:28pm` | `line-198 → line-201` / `12:02pm` |
| 38 / `NE` | `line-206 → line-209` / `12:48pm` | `line-212 → line-215` / `12:22pm` |
| 41 / `W` | `line-216 → line-221` / `1:03pm` | `line-222 → line-227` / `12:37pm` |
| 42 / `RECORD` | `line-221 → line-224` / `1:04pm` | `line-227 → line-230` / `12:38pm` |
| 43 / `GOVERNMENT OFFICIAL, HELLO` | `line-224 → line-227` / `1:12pm` | `line-230 → line-233` / `12:46pm` |
| 44 / `RECORD OFF` | `line-227 → line-230` / `1:13pm` | `line-233 → line-236` / `12:47pm` |
| 45 / `LOOK` | `line-230 → line-234` / `1:14pm` | `line-236 → line-240` / `12:48pm` |
| 48 / `SW` | `line-240 → line-243` / `1:29pm` | `line-246 → line-249` / `1:03pm` |

原作 status では会話直前の RECORD から会話後まで8分進み、両端とも `Simulation Mode (recording)` だった。
この8分は実際の GridWindow の差であり、source の `BRIEF-CHAT` の定数を観測値へ転記したものではない。
会話には職員の発言と `hurries away` が同じ leaf に出力され、直後の RECORD OFF が成功する。
その後の LOOK には City Hall の説明だけがあり、職員の在室文はない。
帰路の3送信も非録画で、Kennedy Park に通常 line input が復帰した。

先行課題は Courthouse の録画中 LOOK、Bodanski Square の録画中購入と4段落の READ、Roy’s Pagoda の録画中 BUY MEAL と明示停止を確認した。
警告は両 session とも observation index 32 の Roy’s Pagoda の RECORD に出た `WARNING: Record buffer is now half-full.` の一つで、原文と input ID を `warnings` にも索引化している。
市役所では full / auto-deactivation、録画開始失敗、閉館、職員不在、会話不成立を観測しなかった。
これらの negative outcome が一般に起きないという保証にはせず、未観測の failure leaf は English fallback のままとする。
旧容量不足の実測 fixture も削除しない。
原作は buffer の数値残量を表示しないため残量は不明で、source 上の容量見積りや内部 recording flag の値は本書の実測値に含めない。

## 新規 leaf と projection

| 観測位置（0始まり） | command qualifier | 原文の境界と扱い |
| --- | --- | --- |
| 40 | `W` | `Rockvil Centre`、広場説明、空行。帰路46では地名と空行のみ。 |
| 41 | `W` | `City Hall`、建物説明、職員の在室文、空行。 |
| 42 | `RECORD` | `Record feature activated.` と空行。既承認 leaf を再利用。 |
| 43 | `GOVERNMENT OFFICIAL, HELLO` / `government official, hello` | 会話と退場は一つの prose leaf、その後に空行。 |
| 44 | `RECORD OFF` | `Record feature deactivated.` と空行。既承認 leaf を再利用。 |
| 45 | `LOOK` | `City Hall`、建物説明、空行。職員の文を足さない。 |

新規の広場、建物、職員、会話の exact English は fixture と regression の literal で固定する。
ordinary projector は未承認の市役所 turn を `null` とし、既存 history reconciliation は representable な command と canonical English prose として保持する。
新規本文の順序と改行を保った English fallback、既承認の録画応答の日本語 prose と spacer を回帰で確認する。
入力 identity、status の時刻と日付、decoder challenge、他の場所の optional noise は session ごとの観測として扱う。
採取していない別会話や failure を source prose から fixture 化しない。

## 現行 UI の監査台帳

`surfaceAudit` は各 session の7時点（公園、入場前の広場、在室時、録画開始後、会話後、明示 OFF 後、LOOK 後）に対する Classic / Guided / Action menus × EN / JA、計84 sample を持つ。
各 sample は現在地、compass、SceneActions、quick actions、録画 reminder、command help、companion、地図と route の visible / accessible 表示を保存する。
locale、mode、drawer の切替と Guided draft の前後で canonical input ID が変わらないことを照合した。
Classic でも既存 companion を開いて監査するが、新規の assisted control は追加しない。

| identity / surface | EN と JA での実表示 | command と操作契約 / 引継ぎ |
| --- | --- | --- |
| room `ROCKVIL-CENTRE` | `Rockvil Centre`。JA でも英語。 | current-place、compass の移動先、route を G2 で別用途として確認する。 |
| room `CITY-HALL` | `City Hall`。JA でも英語。 | raw room 解決と表示用 copy を分離し、既存 place lookup を使う。 |
| map `official` | `City Hall`。accessible name は `City Hall, fieldwork destination`、在室場所では `, current location` が付く。JA でも英語。 | クリックは目的地の選択。人物名や会話 command の identity に流用しない。 |
| assignment 1 | EN `Talk to a government official`、JA `政府職員と話すこと`。 | 既承認課題名を再利用。会話録画後の4/9は補助推定で、正式評価の代用にしない。 |
| actor `GOVERNMENT-OFFICIAL` | `government official`。JA でも英語、SceneActions の `lang` も `en`。 | raw 在室根拠がある City Hall の対象。別室の `official` を拾わない。 |
| Guided Talk | accessible name `government official Talk`。JA でも英語。`Worth trying` / `Choose one to draft a command`。 | 押下で編集可能な `government official, hello`。input ID は不変、送信は別操作。 |
| Action menus Talk | actor 見出しの下に `Talk`。JA でも英語。 | Session 2 で可視ボタンの明示1押下から実送信と新 echo を確認。companion 側にも DOM が残り、CSS の可視判定が true の sample があるが、閉じた panel は aria snapshot が空になるため操作可能な Talk と区別する。 |
| Classic | assisted SceneActions、compact map と compass は非表示。 | canonical command form を使用。 |
| recording | quick actions は EN `Record` / `Stop recording`、JA `録画開始` / `録画停止`。録画中表示は `● RECORDING`。 | `record` / `record off` を送信する既存 control。G1 の区間操作自体は command form で実行。 |
| route | 公園では3歩で次は NE、広場では1歩で次は W、市役所では到着表示。 | Guided route draft は実測 `ne` / `west`。Action menus の next-step は即時送信する既存契約で、監査では押さない。 |
| exits | City Hall の E / OUT は `Rockvil Centre`。JA でも移動先は英語。 | 既存 compass / context は `east` / `out`、経路は `east` / `west` / `sw` 等の既存 alias。採取の徒歩 command は大文字の短縮形。 |
| surrounding help | 新規 actor 部分は英語のまま、共通地図と録画 help は既承認の EN / JA を維持。 | G2 は visible copy と accessible name、draft / send の説明を一緒に承認する。未監査 actor verbs 全体を承認しない。 |

在室時と RECORD 後だけ、Guided / Action menus の accessibility snapshot に Talk が各1件現れた。
会話直後、OFF 後、LOOK 後には両 locale と全 mode で Talk がない。
locale 往復と drawer 開閉のたびにこの結果を記録した。
busy / char-input の guard、長い履歴が脱落した後の再表示、RESTORE、新 session や他 phase の境界は、この自然な50送信だけでは検証していない。
これらは下記のコード確認と区別し、G3 の regression と実ブラウザ受入へ渡す。

## 人物操作のコード根拠と G3 の契約

`belongsToSourceRoom` は source room の globals、初期配置、LOCAL-GLOBALS の dynamic location を辿る。
生成 metadata の `GOVERNMENT-OFFICIAL` は LOCAL-GLOBALS 起点で、dynamic location は CITY-HALL、command noun は `government official` である。
この絞り込みだけで在室を決めず、`actorAppearsPresent` が raw passage の在室文を要求し、`actorHasDeparted` が recent raw transcript の退場を除外する。
会話 leaf は名指しの最初の文に続く次の文に退場があるため、現在の検出でも即時に Talk が消える。

ただし `sceneText` と `sceneCacheRef` は到着時の説明を保持し、`recentText` は bridge の末尾18行に限られる。
LOOK までは古い在室文が establishing passage に残るため、退場文が recent window から消えたときに在室根拠へ戻るリスクがある。
今回の非録画 LOOK は実際に在室文のない説明で cache を更新するが、それだけで LOOK 前の長い履歴に対する安全性を証明したことにはならない。
G3 は会話直後の退場を raw observation と結びつけ、古い cache、locale 往復、drawer、履歴窓の脱落から Talk を復活させない regression を用意する。
必要な修正は初回2041年の解決済み City Hall と今回の observed actor に限定し、generic GLOBAL-OBJECTS / LOCAL-GLOBALS guard を緩めない。

コード上、SceneActions は Classic で返さず、Guided は draftCommand、Action menus は sendCommand を使い、`disabled={!acceptsInput}` で busy を無効化する。
main の command area は char input 時に SceneActions を描画しないが、companion の `.map-section` は別の分岐で同じ SceneActions を描画する。
汎用 SceneActions 自身は `lineInput` を guard に使っておらず、この prop は現状では restaurant 専用操作の条件にだけ使われる。
したがって companion を含めた char-input 除外は本採取では未保証で、G3 は両表示面を対象に regression と必要な限定修正を用意する。
この静的確認を busy / char の実測と混同せず、G3 は在室時の操作成功、退場後の非表示、unknown room / phase / RESTORE / fresh session での失効も検証する。
原作内の非録画会話に対する checklist 負例も G3 の範囲である。

## 検証と未確認範囲

- `npm ci`（npm 11.17.0、committed lockfile）：成功。
- `npm run lint`、`npx tsc --noEmit`：成功。
- `npm test`（production build と全32 unit tests）：32/32成功。
- 対象 fixture regression：missing fixture の RED を確認し、実測後に GREEN。親から player への送信列と行 identity の照合も成功。
- `npm run test:e2e`：最初の full run は32成功、2失敗（15.2分）。失敗名は narrow の Guided / Action menus の restaurant route で、食事説明文の visible assertion。
- この環境に残っていた開発用 CSS cache には `.scene-meal` のルールが0件で、現在の source と production build は3件だった。古い `.next/dev` と `.next/cache` を退避した cold start では開発用 CSS も3件へ戻った。production code の修正で回避せず失敗した2経路を再実行し、2/2成功（2.0分）を確認した。最初の full run と限定再実行は分けて記録し、current-head CI の full-suite 結果は PR を正本とする。
- `sha256sum public/amfv-r79-s851122.z4`：`14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`。
- `git diff --check`：成功。production code、historical source、dependency、既存 fixture と E2E は変更なし。

最初の lint は repository 内の scratch に配置した browser 配布物まで走査して失敗したため、scratch を repository 外の `/workspace/work/` に移し、通常の `npm run lint` を再実行して成功した。
既存の検証失敗を除外する設定変更やテストの skip は加えていない。

G1 の2 desktop context と84 surface sample は、新しい6経路の受入に代用しない。
390px の時計、音声 screen reader、実保存データの RESTORE、再入場、後続年、正式な九課題評価、本番配備は未確認である。
source で確認した営業時間 guard と8分の会話処理、runtime の成功、wrapper の4/9推定をそれぞれ別の証拠として扱う。
2a+2b、English fallback、canonical English commands と既存 recovery / accessibility のコードは変更していない。

current-head CI、artifact の head 対応と14日保持の実期限、head/base SHA、独立レビューの採択判断は提出 PR を正本とする。
独立レビューはこの実装セッションの自己点検で代替せず、G1 の採択と merge は Sol に委ねる。
