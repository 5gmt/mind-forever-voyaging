# Issue #49 — 初回 Simulation Mode / Kennedy Park 日本語 copy packet

## 決定と根拠

Issue #47 が 2026-09-21 に二つの fresh Chromium context で採取した canonical Release 79 の runtime fixture を、英語 leaf、順序、grouping、dynamic field の唯一の根拠とする。以下は、その fixture に存在する必須経路 `WAIT` × 4 → `ENTER SIMULATION MODE` → decoder 正答 → `LOOK` → `RECORD` → `WAIT` → `RECORD OFF` の complete copy packet である。historical source から文言を補っていない。

この文書は copy approval だけを行う。production catalog、component、projector、test、canonical story artifact は変更しない。実装時の exact catalog identity と fallback は Issue #47 の raw English leaf、および Issue #48 で承認した narrow projection identity に従う。

## 表記方針

- `PRISM` は固有名として英字を維持し、`Plan` は「プラン」、`Simulation Mode` は「シミュレーション・モード」とする。
- 人名は「パールマン」「アリソン・プライス」「ジョン・F・ケネディ」、地名は「ケネディ公園」とする。
- Narrative prose は常体、人物の発話は人物に合う自然な口語とする。ellipsis は日本語 copy でも `……` として経過感を残す。
- Recording assignment は、九つすべてを「〜すること」で統一した一つの list とする。英語 leaf にある先頭 3 spaces は raw identity の一部だが、日本語 presentation では Issue #48 の semantic list が字下げを表現するため、item text には含めない。
- Heading は本文とは別 block の「ケネディ公園」とする。同じ heading / prose は初回 entry と明示的な `LOOK` replay の両方に使用する。
- 下表の command は context qualifier であり、翻訳対象ではない。command echo と parser に送る入力は canonical English のままとする。

## Exact English leaf → Japanese translation table

空行と active line-input の `>` は構造であり、copy leaf ではない。`Time passes...` は複数 turn で同一の exact leaf / translation を共有するが、必須経路の coverage を明確にするため各 context を列挙する。

| Context / presentation role | Exact canonical English leaf | Approved Japanese copy |
| --- | --- | --- |
| 1st PEOF `WAIT`; prose | `Time passes...` | `時間が過ぎていく……` |
| 2nd PEOF `WAIT`; prose | `Time passes...` | `時間が過ぎていく……` |
| 2nd PEOF `WAIT`; secretary interrupt prose | `Alyson Price, Perelman's secretary, pops her head in the doorway. "Hey Doc! Need me for anything else tonight?" Perelman, grinning, responds, "Not unless you've decided to dump that unfairly handsome husband of yours." She looks exasperated at what is obviously an old joke and shakes a fist at him in a mock threat. "Really, though, I'll be fine," says Perelman. "Scram." She disappears from sight, shouting from the next room, "Good night, Doc. Don't stay too late!"` | `パールマンの秘書、アリソン・プライスが戸口からひょいと顔をのぞかせる。「ねえ博士！　今夜、ほかに何か用はある？」パールマンはにやりとして答える。「その不釣り合いな色男の亭主を捨てる決心でもしてくれたなら別だがね」明らかに聞き飽きた冗談に、彼女はうんざりした顔で、脅すふりをして拳を振る。「まあ本当に、私は大丈夫だから」とパールマン。「とっとと帰れ」彼女は姿を消し、隣の部屋から声を張り上げる。「おやすみ、博士。あんまり遅くまで残らないでね！」` |
| 3rd PEOF `WAIT`; prose | `Time passes...` | `時間が過ぎていく……` |
| 4th PEOF `WAIT`; prose | `Time passes...` | `時間が過ぎていく……` |
| 4th PEOF `WAIT`; staff arrival / Perelman leaves | `A PRISM Project staff member dashes in and hands Perelman a note before leaving. Glancing at the note, Perelman walks to a point beyond your field of vision. A moment later, you hear a click, as of a switch being turned.` | `PRISMプロジェクトのスタッフが駆け込んできて、パールマンにメモを手渡すと立ち去る。メモに目を通したパールマンは、あなたの視界の外へ歩いていく。しばらくして、スイッチを入れたようなカチッという音が聞こえる。` |
| 4th PEOF `WAIT`; private-line brief introduction prose, immediately before the assignment group | `A message begins coming over the message line: "Perelman to PRISM. The programming team has finished entering the parameters for the Plan. This is it: you can enter Simulation Mode at any time. The Social Science group has come up with a list of things to record:` | `通信回線からメッセージが流れ始める。「パールマンからPRISMへ。プログラミング・チームがプランのパラメーター入力を完了した。いよいよだ――いつでもシミュレーション・モードに入れる。社会科学グループが記録すべき項目のリストをまとめた。` |
| 4th PEOF `WAIT`; private-line real-time explanation prose, immediately after the assignment group | `By the way, since the Simulation Controller will be doing so much data-crunching on the fly, it appears the simulation will run in real time -- a minute there will approximately equal a minute here. Well, good luck!"` | `なお、シミュレーション・コントローラーが進行中に大量のデータ処理を行うため、シミュレーションはリアルタイムで進むようだ――向こうでの1分が、こちらでの約1分に相当する。それでは、健闘を祈る！」` |
| 4th PEOF `WAIT`; Perelman returns prose | `A moment later, Perelman walks back into your field of vision.` | `しばらくして、パールマンがあなたの視界に戻ってくる。` |
| `ENTER SIMULATION MODE`; active-input security prompt shell | `Simulation Mode is a Class One Security mode. For access, enter the Security Code corresponding to:` + **`{CANONICAL_COLOR}`** + **`{CANONICAL_INNER_NUMBER}`** | `シミュレーション・モードはクラス1セキュリティ・モードです。アクセスするには、次に対応するセキュリティ・コードを入力してください：` + **`{CANONICAL_COLOR}`** + **`{CANONICAL_INNER_NUMBER}`** |
| Correct security answer; prose | `This simulation is based 10 years hence.` | `このシミュレーションの時代設定は、10年後です。` |
| Correct security answer; heading | `Kennedy Park` | `ケネディ公園` |
| Correct security answer; initial room-description prose | `This is a small, downtown park with gates leading northeast, southeast, and southwest. There is a sprawling, free-form waterpool surrounding a statue of John F. Kennedy in the center of the park.` | `ここは市街地にある小さな公園で、北東、南東、南西へ通じる門がある。公園の中央では、ジョン・F・ケネディ像を取り囲むように、自由な形の大きな水盤が広がっている。` |
| `LOOK`; replayed heading | `Kennedy Park` | `ケネディ公園` |
| `LOOK`; replayed room-description prose | `This is a small, downtown park with gates leading northeast, southeast, and southwest. There is a sprawling, free-form waterpool surrounding a statue of John F. Kennedy in the center of the park.` | `ここは市街地にある小さな公園で、北東、南東、南西へ通じる門がある。公園の中央では、ジョン・F・ケネディ像を取り囲むように、自由な形の大きな水盤が広がっている。` |
| `RECORD`; prose | `Record feature activated.` | `記録機能を起動しました。` |
| Recording-loop `WAIT`; prose | `Time passes...` | `時間が過ぎていく……` |
| `RECORD OFF`; prose | `Record feature deactivated.` | `記録機能を停止しました。` |

## Recording assignments — one ordered semantic list

この九項目は private-line introduction と real-time explanation の間にある一つの ordered identity group である。presentation element は順序を示す番号付き手順ではないため、Issue #48 の決定どおり semantic unordered list とする一方、canonical order は必ず保持する。

| Canonical order | Exact canonical English leaf | Approved Japanese list-item copy |
| ---: | --- | --- |
| 1 | `   Eating a meal in a restaurant` | `レストランで食事をすること` |
| 2 | `   Talking to a government official` | `政府職員と話すこと` |
| 3 | `   Visiting a power-generating facility` | `発電施設を訪れること` |
| 4 | `   Reading a newspaper` | `新聞を読むこと` |
| 5 | `   Riding some form of public transportation` | `何らかの公共交通機関に乗ること` |
| 6 | `   Attending a court in session` | `開廷中の裁判を傍聴すること` |
| 7 | `   Talking to a church official` | `教会関係者と話すこと` |
| 8 | `   Going to a movie` | `映画を見に行くこと` |
| 9 | `   Visiting your own home or living quarters` | `自分の家、または居住区を訪れること` |

## Dynamic canonical fields と intentional English boundaries

- **`{CANONICAL_COLOR}`**: Release 79 が表示した security color。翻訳せず、canonical uppercase English のまま静的 shell の後に表示する。
- **`{CANONICAL_INNER_NUMBER}`**: Release 79 が表示した inner number。翻訳、変換、再計算をせず canonical digits のまま表示する。
- **`{CANONICAL_NUMERIC_INPUT}`**: player が decoder で求めて入力する numeric answer。copy leaf ではなく canonical line input である。日本語 story copy に含めない。特に computed outer answer を prompt、説明、注釈として表示しない。
- **`{CANONICAL_SIMULATION_MONTH_DAY}` / `{CANONICAL_SIMULATION_TIME}`**: GridWindow status の dynamic value。今回の story catalog と日本語 copy の対象外とし、canonical 表示を維持する。ほかの status value も同様である。
- `WAIT`、`ENTER SIMULATION MODE`、`LOOK`、`RECORD`、`RECORD OFF` とそれらの command echo、outlet code、parser syntax は canonical English のままにする。
- Active-input prompt の `>` と入力欄、blank paragraph、list / heading / prose block boundary は presentation structure であり、翻訳文字列へ埋め込まない。
- Exact identity が一致しない leaf、未観測 leaf、未承認 leaf は、その leaf 単位で original English に安全に fallback する。近似一致や部分翻訳は行わない。

## Deferred / unobserved branches

- Security code の誤答（1回目・2回目）、security failure、Communications Mode への fallback。
- PEOF での別時刻・追加 `WAIT`、Perelman または secretary の別の位置・会話・interrupt、PEOF 外での通知、後続 reminder。
- Kennedy Park からの移動、ほかの room、recording 中の事件、assignment completion、後続 simulation、status localization。
- Communications outlet、source にだけ存在する branch、unknown leaf、日本語 parser input。

## Integration handoff

この copy decision を production catalog、unit regression、Chromium E2E に統合し、対応する player-facing coverage と milestone 状態を `PROJECT_STATUS.md` に反映する責任者は、最終 integration の **Issue #50 / pull request** とする。本 copy-only change では roadmap も implemented coverage も変更しない。
