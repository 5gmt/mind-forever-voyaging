# 2041年 City Hall の本文と人物操作の copy packet

## 承認対象と開始根拠

本書は G2 / [#88](https://github.com/5gmt/mind-forever-voyaging/issues/88) の copy 承認候補である。
G1 / #87 は [PR #91 の独立採択レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/91#pullrequestreview-5646050774)と merge `7d1291177ee6a690ffdfb0e33b39f2a27c8e310d` によって完了し、[G2 開始 gate](https://github.com/5gmt/mind-forever-voyaging/issues/88#issuecomment-6405180186)が解除された。
本文と UI の日本語は本書の提出だけでは承認済みにならず、独立した Chat モード Sol の copy approval と merge を待つ。
G3 / #89 はその両方が完了するまで blocked とする。

本文の正本は [G1 fixture](../tests/fixtures/parchment-city-hall-runtime-observed.json)（blob `9ab8d25f78fd69ed13d36486a64a762d81ed77a7`）である。
2 fresh canonical sessions、各50 line submissions、計84 UI samples を採択済みの範囲として使う。
[G1 evidence](city-hall-runtime-evidence.md)の「提出時点」の記述は G1 提出時の記録であり、採択と merge の正本は上記レビューと開始通知である。
現行コードと copy の照合基準は G1 merge と同じ最新 base `7d1291177ee6a690ffdfb0e33b39f2a27c8e310d` とする。

承認単位は、新規本文6 leaf、既承認本文の再利用、2つの room 名、map `official`、既承認 assignment、actor `GOVERNMENT-OFFICIAL`、Talk と周囲の visible / accessible copy、およびそれらの適用条件を合わせた一式である。
本 G2 は文書のみで、production catalog、component、guard、fixture、canonical binary、historical source、tests を変更しない。

## 経路と観測位置

以下の `S1/S2:i:l` は各 session の `observations[i].presentation.lines[l]` を指し、index と line は0始まりである。
`A{n}` は同 session の `surfaceAudit[n]`、sample は `locale` と `mode` で特定する。

採択済み restaurant A の先行40送信と録画区間を維持し、次の10送信だけを追加した経路を対象とする。

```text
NE → W → W → RECORD → GOVERNMENT OFFICIAL, HELLO → RECORD OFF
→ LOOK → E → E → SW
```

| Observation | Actual command / raw 状態 | 本 packet の対象 |
| --- | --- | --- |
| 39 | `NE`; Kennedy Park → Main & Kennedy、非録画 | 既承認 heading だけを再利用。 |
| 40 | `W`; Rockvil Centre、非録画 | C1 heading、C2 広場の描写。 |
| 41 | `W`; City Hall、非録画、職員在室 | C3 heading、C4 建物、C5 職員の在室。 |
| 42 | `RECORD`; City Hall、録画中 | 既承認起動応答。在室時の Talk が残ることも G1 で実測。 |
| 43 | S1 `GOVERNMENT OFFICIAL, HELLO`、S2 `government official, hello`; 会話前後とも録画中 | C6 会話と退場。S2 は Action menus の明示1クリックによる実送信。 |
| 44 | `RECORD OFF`; City Hall、非録画 | 既承認停止応答。 |
| 45 | `LOOK`; City Hall、非録画、職員の在室文なし | C3 と C4 のみ。C5 を補わない。 |
| 46–48 | `E E SW`; Rockvil Centre → Main & Kennedy → Kennedy Park、非録画 | C1 と既承認 heading のみ。公園で通常 line input に戻る。 |

raw status の date / time / mode / location と command echo は翻訳しない。
State detection は raw English、送信 command は canonical English のままとし、input / turn ID と終端 `>` を copy に埋め込まない。
同じ移動 command の反復も current input → 新 echo → next input の対応を維持する。

## 新規 exact leaf の英日対応

両 session の下記位置で一致する6 leaf に限る。
見出しと prose の役割を保ち、C2 の末尾に含まれる観測済みの昼食時の人出も一つの exact leaf の一部として扱う。

| ID / evidence / command qualifier | Exact canonical English leaf | Japanese candidate |
| --- | --- | --- |
| C1; S1/S2:40:1,46:1; `W` 往路 / `E` 帰路 heading | `Rockvil Centre` | `ロックヴィル中央広場` |
| C2; S1/S2:40:2; `W` 初訪問 prose | `The name of this plaza tells it all. The well-maintained portico of City Hall stretches along the west side of the plaza, and Dunbar's lies on the southeast corner. Park Street leads north and south. Main Street and Centre Street both begin here, leading eastward and northeastward, respectively. The street is bustling with lunchtime crowds.` | `この広場は、その名のとおり街の中心だ。市役所の手入れが行き届いた柱廊が広場の西側に延び、南東の角にはダンバーズがある。パーク通りは北と南へ延びている。メイン通りとセンター通りはいずれもここを起点とし、それぞれ東と北東へ延びている。通りは昼食時の人々でにぎわっている。` |
| C3; S1/S2:41:1,45:1; `W` 到着 / `LOOK` heading | `City Hall` | `市役所` |
| C4; S1/S2:41:2,45:2; `W` 到着 / `LOOK` prose | `The city's seat of government is an old concrete-slab building dating back to the late twentieth century. The only exit is east.` | `市政の拠点となっているのは、20世紀末に建てられた古いコンクリート板造りの建物だ。出口は東に一つだけある。` |
| C5; S1/S2:41:3; `W` 到着時の在室 prose | `A government official is sitting on a bench in the center of the lobby, eating a snack.` | `政府職員が一人、ロビー中央のベンチに腰掛け、軽食を食べている。` |
| C6; S1/S2:43:1; `GOVERNMENT OFFICIAL, HELLO` / `government official, hello` 会話と退場の prose | `You have a brief chat with the government official, who cheerily comments on how well things in the city are running, and how rewarding his job has been lately. Suddenly he glances at his watch, mumbles a polite parting message, and hurries away.` | `政府職員と短い会話を交わす。職員は、市の物事が順調に進んでいることや、最近は自分の仕事に大いにやりがいを感じていることを、上機嫌で話す。突然、時計にちらりと目をやり、丁寧な別れの言葉をぼそぼそと口にすると、足早に去っていく。` |

### 意味と行構造

C1 は原文が plaza と説明する固有地点として「ロックヴィル中央広場」とする。
C2 は西側の市役所の柱廊、南東の Dunbar’s、Park Street の南北、Main / Centre Street の起点と東 / 北東の対応、昼食時の人出を保つ。
「ダンバーズ」という本文中の表記は同名 room / map / scene object の翻訳承認に広げない。

C4 は建物の古さ、20世紀末という年代、concrete-slab、東に限られる出口を保つ。
C5 はロビー中央のベンチに座って軽食を取る職員であり、source の初期配置だけで常時在室と説明しない。
C6 の市の様子と仕事への肯定的な評価は職員自身の発言に帰属させ、語り手による事実認定や正式な課題評価へ変えない。
時計への視線、丁寧ながら口ごもる別れ、足早の退場まで同じ prose leaf に残す。

41は echo → C3 → C4 → C5 → blank → input、43は echo → C6 → blank → input、45は echo → C3 → C4 → blank → input である。
40は echo → C1 → C2 → blank → input、46は echo → C1 → blank → input となる。
日本語の文を増減して原作の空行や leaf 境界を変えず、再訪問や LOOK に初訪問の prose / 在室文を足さない。

C6 に「8分」や録画成立の説明を追加しない。
8分は S1 の `1:04pm → 1:12pm`、S2 の `12:38pm → 12:46pm` という raw GridWindow の差であり、原作本文中の語ではない。
source の `BRIEF-CHAT` の定数、runtime の時刻差、recording mode、内部録画 flag、補助 checklist を別の証拠として扱う。
原作が出力しない残容量や narrow viewport の時計を合成しない。

## 既承認本文と command qualifier の再利用

| ID / evidence / qualifier | Exact canonical English leaf | 既承認 Japanese |
| --- | --- | --- |
| R1; S1/S2:39:1,47:1; `NE` 往路 / `E` 帰路 heading | `Main & Kennedy` | `メイン通りとケネディ通り` |
| R2; S1/S2:48:1; `SW` 帰着 heading | `Kennedy Park` | `ケネディ公園` |
| R3; S1/S2:42:1; `RECORD` | `Record feature activated.` | `記録機能を起動しました。` |
| R4; S1/S2:44:1; `RECORD OFF` | `Record feature deactivated.` | `記録機能を停止しました。` |

[新聞 packet](newspaper-copy-packet.md)、[初期 Simulation UI packet](initial-simulation-ui-copy-packet.md)、[restaurant packet](restaurant-copy-packet.md)と現行 catalog の既承認 copy を再利用する。
先行3課題の本文、新聞の四段落、初回 recording loop とその録画窓を再承認、改変する作業ではない。
R1 の帰路 `E` は今回観測した新しい command-qualified context であり、日本語が既存だからといってすでにその qualifier まで catalog にあるとは扱わない。

G3 は actual command の大文字小文字を既存方式で正規化し、C1/C2/C3/C4/C5 の往路 `W` に既存 UI alias `west`、C1/R1 の帰路 `E` に `east` を対応させる。
公園への `NE` / `SW` は実送信でも UI draft でも同じ短縮形である。
UI 監査では公園の route draft `ne`、広場の route draft `west` と、City Hall の context exit `east` / `out` が表示された。
`out` は出口操作の現況であり、今回の canonical 経路で実送信した `E` の代わりに新しい `OUT` story context を承認するものではない。
`GO WEST`、`ENTER CITY HALL`、`TELL OFFICIAL`、`GOVT OFFICIAL, HELLO` や他の会話 alias は追加しない。
full direction alias を使う G3 の実経路はそこで再現し、G1 の短縮 command の成功と混同しない。

## Room と map と assignment と actor の対応

以下は役割別の copy 候補であり、同じ日本語になる行も identity を統合しない。
room 表示は既存 `localizeSimulationPlace`、map / route destination は `localizeSimulationMapLabel`、人物と動詞は既存 scene label helpers に G3 が接続する。
raw `Location:` や world metadata、command noun の rename は含めない。

| Role / identity | Exact current English | Japanese candidate / reuse | 表示先と条件 |
| --- | --- | --- | --- |
| Room `ROCKVIL-CENTRE` | `Rockvil Centre` | `ロックヴィル中央広場`（C1） | exact room heading、current-place、drawer header、compass / context の出口先、route nextPlace。 |
| Room `CITY-HALL` | `City Hall` | `市役所`（C3） | 同じ place lookup を共有。map identity への自動流用はしない。 |
| Map `official`; target `CITY-HALL`; assignment index 1 | `City Hall` | `市役所` | hotspot の visible label、route destination、checklist の destination 小見出し。人物名ではない。 |
| Map hotspot accessible name | `City Hall, fieldwork destination` / `City Hall, fieldwork destination, current location` | `市役所、調査目的地` / `市役所、調査目的地、現在地` | 既承認 suffix の組合せを使用。current location は現在地から導く動的値。 |
| Assignment index 1（九課題の2番目） | `Talk to a government official` | `政府職員と話すこと`（既承認） | checklist と current task。map / actor label や正式達成表示へ置き換えない。 |
| 原作の assignment brief の同項目 | `   Talking to a government official` | `政府職員と話すこと`（既承認 list item） | leading spaces は原作 list の構造として保持。UI checklist の English と区別する。 |
| Actor `GOVERNMENT-OFFICIAL` | `government official` | `政府職員` | 在室が確定した City Hall の対象見出しと Guided button の対象名。command noun は `government official` のまま。 |
| Action `talk` on `GOVERNMENT-OFFICIAL` | `Talk` | `話す`（既存動詞の表記を再利用） | 今回の対象との組合せだけを新規承認候補にする。 |
| Guided button accessible name | `government official Talk` | `政府職員 話す` | 対象名と action hint を使う現行構造。空白を含む名前の実出力は G3 の aria snapshot で確認する。 |
| Action menus button visible / accessible name | `Talk` | `話す` | actor 見出し `government official` / `政府職員` と併せて表示。明示1押下で1送信。 |

G1 の `A0` は公園、`A1` は広場、`A2` は在室、`A3` は録画開始後、`A4` は会話後、`A5` は OFF 後、`A6` は LOOK 後である。
各 session と各 locale / mode の sample に現在地、map / route、SceneActions、quick actions、help の現況がある。
在室を伝える本文 C5、actor metadata、map `official`、assignment が同じ人物 identity を直接証明し合うとは扱わない。
人物の可用性は下記の raw 在室 / 退場の根拠から判断する。

## 人物操作の周囲の copy

現況では City Hall の SceneActions は JA locale でも `lang="en"` で、`government official` と `Talk`、下記の共通説明は English で表示される。
G1 の A2 / A3 の sample で確認できる。
下表の共通 copy は既承認の scene UI 辞書から再利用する候補であり、City Hall で日本語表示済みだったという主張ではない。

| Role / current English | Japanese candidate / reuse | 適用先 |
| --- | --- | --- |
| Guided landmark: `Words mentioned here` | `この場面で言及された語` | 在室時に提供する既存 SceneActions。main / companion で同じ適用条件。 |
| Guided heading: `Worth trying` | `試してみる` | 既存 heading。 |
| Guided instruction: `Choose one to draft a command` | `選ぶとコマンドを下書きします` | 既存 section の説明。下書きだけで送信しない。 |
| Actions landmark: `Actions for things mentioned here` | `この場面で言及された対象へのアクション` | 既存 section の accessible name。 |
| Actions heading: `In this scene` | `この場面で` | 既存 heading。 |
| Actions instruction: `Actions written into the original story` | `原作に用意されたアクション` | 既存 section の説明。未承認動詞の日本語化には広げない。 |

次の2行だけは、職員の Talk に付随する新しい説明文の提案であり、runtime-observed UI ではない。
既存の section / actor control の中で使い、別の会話 engine や汎用 NPC UI は作らない。

| Role | Proposed English | Japanese candidate | 契約 |
| --- | --- | --- | --- |
| Guided の Talk 補助説明 | `Draft a command to talk to the government official. You can edit it before sending.` | `政府職員と話すコマンドを下書きします。編集してから送信できます。` | 対象の Talk と共に表示。編集可能な draft の説明。 |
| Action menus の Talk 補助説明 | `Choose Talk to send the command once.` | `「話す」を押すと、コマンドを1回送信します。` | 対象の Talk と共に表示。自動会話や二重送信としない。 |

共通 section の説明と Talk 専用の説明を別の role として扱い、他の object の操作まで Talk と説明しない。
各説明の visible / accessible な関連付け、narrow での可読性、英語 subtree の `lang` は G3 の実ブラウザ受入で確認する。

C5 に bench / snack が現れ、A2/A3 の UI には `bench Examine`、`snack Examine`、`Sit beside`、`Sit` も現れる。
これは現在の UI 表示の観測であり、実送信と応答の採択ではない。
それらの対象名、動詞、command alias と response の新規翻訳は本承認に含めず、既存の English fallback を保持する。
未監査の `govt` alias、church official など別の人物、別室の `official`、他の actor verb へも適用を広げない。

## 共通操作と動的な表示

地図と録画の共通 copy は [初期 Simulation UI packet](initial-simulation-ui-copy-packet.md)と現行 catalog を再利用する。
下表の括弧内は意味を示す注記であり、追加の本文ではない。

| Role / English | Japanese reuse | canonical command / 動的条件 |
| --- | --- | --- |
| Quick action `Record` / `Stop recording` | `録画開始` / `録画停止` | `record` / `record off`。現在の recording state で切替。 |
| Recording indication `● RECORDING` | `● RECORDING` のまま | 生の status に基づく表示。時計や残量へ変換しない。 |
| `Route to` / `You have arrived.` | `目的地への経路` / `目的地に到着しました。` | destination は map lookup、nextPlace は place lookup。 |
| `Draft next step` / `Take next step` / `Clear` | `次の移動を入力欄へ` / `次の移動を実行` / `解除` | Guided は draft、Actions は明示1送信。 |
| Route step / direction | 既存の歩数文と方角表記を維持 | 公園は3歩で次は NE、広場は1歩で次は W、到着後は arrived。固定値にしない。 |
| City Hall の出口 E / OUT の行き先 | `ロックヴィル中央広場` | 原文 / UI command `east` / `out` はそのまま。物理的な出口を二つに増やさない。 |
| Command help `↑ recalls your previous commands.` | `↑ で以前のコマンドを呼び出せます。` | G1 の JA sample にもある既承認 help。入力自体は英語。 |

九課題の順番、header / tabs / close、compass / context の共通説明、`{steps}` / `{count}` / year / current / selected / arrived は既存の動的表示を使う。
録画前後の3/9 → 4/9は補助 checklist の推定であり、正式な原作 assignment flag や帰還評価の観測値ではない。
City Hall という場所に着いただけで「政府職員と話すこと」を完了扱いにしない。

## G3 へ渡す適用条件

| 条件 | 採択する copy と人物操作の契約 |
| --- | --- |
| 初回2041年の範囲 | 既存の初回 Simulation active state、Simulation Mode、2041年、非 QA、raw English から解決済み City Hall という条件を保つ。map / place は採択経路の既存 lookup を使う。 |
| 在室 | C5 のような現在の raw 在室根拠を要求する。LOCAL-GLOBALS 起点の metadata、dynamic location、地名、古い history だけで Talk を公開しない。 |
| Guided | 押下で編集可能な `government official, hello` を draft し、明示 submit までは送信しない。日本語の command を生成しない。 |
| Action menus | 明示1押下につき canonical command を1回送る。実際の current input と新 echo で照合する。 |
| Recording | Talk の可用性を録画中だけに限定しない。録画は別の明示操作で行い、非録画の会話を補助 checklist の新規達成としない。 |
| Busy / input kind | 入力不可中は無効、line input 以外ではこの限定人物操作を出さない。main と companion の両方で確認する。 |
| 退場直後と LOOK 後 | C6 の退場を受けて Talk を消す。OFF、locale 往復、drawer、非録画 LOOK で再出現させない。 |
| 長い履歴と cache | `sceneText` / `sceneCacheRef` に残る C5 と、末尾18行の `recentText` から退場文が脱落する場合を扱う。古い到着文から在室を復活させない。 |
| 不明状態 | unknown room / phase、RESTORE、新 session で不確かな在室を引き継がない。在室を確定できない場合は支援を出さず canonical input に戻す。 |
| 対象外 | 後続年、再入場、Part II、QA に本 packet の新規日本語と限定修正を広げない。既存の対象外英語 UI 全体の削除や generic guard の緩和は承認しない。 |
| EN / JA | 同じ対象と canonical command、同じ可用性を使う。locale 切替を新しい在室根拠にしない。 |
| Classic | assisted action を追加しない。command form と既存の表示保証を維持する。 |
| Reading / a11y | 2a+2b、history / recovery、単一 accessibility owner、English subtree の `lang`、入力と focus 復帰を保持。390px で原作が出さない時計を補わない。 |

退場直後、OFF 後、LOOK 後に Talk がないことと、locale / drawer 切替は G1 の自然な経路で実測済みである。
長い履歴の脱落や RESTORE などの不明状態を同じ実測済み範囲へ含めない。
main の command area の char 分岐と異なり、companion の汎用 SceneActions は現状では `lineInput` 自体を guard に使わない。
これは G1 採択レビューが G3 へ残した修正事項で、G2 で解決済みと扱わない。
G3 は必要な局所修正と failing regression を先に用意し、両表示面で正常操作と負例を確認する。

## English fallback と未承認の境界

- C1–C6 と再利用表の exact leaf / qualifier 以外は canonical English を保持する。C2 と似た prefix でも、別の crowd 文や optional interrupt を部分一致で翻訳しない。
- C2 に実際に含まれる昼食時の人出は上表の全文として承認候補に含む。一方、別に挿入される city noise、別日の人出、未観測 optional output は追加承認しない。
- 営業時間の境界、閉館、職員不在、会話不成立、別会話、後続年の発言、再入場や他の official の prose を source から補わない。
- `WARNING: Record buffer is now half-full.` は先行レストランの S1/S2:32:3 の system notification として English を保持する。full / auto-deactivation や旧容量不足を成功へ読み替えず、既存失敗 fixture も保持する。
- 原作 source の営業時間 guard、会話の8分、録画容量の見積りは source evidence であり、runtime の成功時刻や実残量として表示しない。残容量の数値、正式な課題評価は未観測である。
- 本文中の Park / Main / Centre Street や Dunbar’s の表記を、別の未承認 room / map identity / actor / action の一括翻訳へ流用しない。
- Raw English の state detection、canonical command、既存 save/restore、未承認 English fallback と正しい日本語履歴を保つ。新 renderer、VM telemetry、state 書換え、日本語 parser は導入しない。

## 検証と承認の handoff

G2 は文書3ファイルだけの変更で、上記6新規 leaf と4再利用 leaf の28箇所について exact text / command / position / 行構造を両 session と照合済みである。
UI は G1 の84 sample と現行 `app/localization.ts` / `app/StoryTools.tsx` / `app/PrismEdition.tsx` を使い、既承認の再利用、新しい日本語候補、新規 English 説明文の提案を区別する。
ローカルではリンクと `git diff --check`、`npm run lint`、`npx tsc --noEmit`、`npm test`（production build と32/32 unit tests）が成功した。
Canonical SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` と一致する。
別コンテキストでの実装側点検にも未解決の指摘はないが、下記の指定された独立承認とは区別する。
本 G2 では local E2E と新しい runtime capture を実行せず、G1 の実測を今回の再実行成功とは呼ばない。

本書作成と実装側の点検は Codex Cloud が担当する。
Sol の独立 copy approval / merge までは本書を承認候補として保持し、G3 を開始しない。
承認時は C1–C6、再利用 context、role 別の UI、Talk 専用説明、guard と fallback を一式で判定する。
Current-head CI、head / base、artifact と14日保持の実期限、未解決事項は提出 PR を正本とし、自身の最終 SHA を文書へ埋めるだけの追加 commit は要求しない。
