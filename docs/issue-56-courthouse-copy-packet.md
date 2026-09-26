# Issue #56 — 2041 Courthouse 往復 日本語 copy packet

## 決定と provenance

Issue #55 が 2026-09-26 に二つの独立した fresh Chromium context で採取した canonical Release 79 の runtime fixture、`tests/fixtures/parchment-courthouse-runtime-observed.json` を、英語 leaf、順序、context、stable / optional 境界の唯一の根拠とする。以下は、その fixture に共通して存在する `RECORD` → `SW` → `NW` → `LOOK` → `SE` → `NE` → `RECORD OFF` のうち、Kennedy Park から Elm & Park を経て Courthouse を訪れ、同じ経路で帰着する範囲の complete copy packet である。historical ZIL、generated world data、片方の session だけに現れた prose から文言を補っていない。

この文書は copy approval だけを行う。production catalog、projector、component、browser test、runtime fixture、canonical story artifact は変更しない。Issue #55 が確認した ordinary-turn structure と per-leaf English fallback を維持し、production integration は Issue #57 に委ねる。

## Exact route / context qualifier

| Route order | Canonical command context | Stable presentation boundary | Context decision |
| ---: | --- | --- | --- |
| 1 | `SW`, Kennedy Park → Elm & Park、recording 中 | heading、intersection description | 往路の到着時だけ description が現れる。optional city noise は別 leaf として除外する。 |
| 2 | `NW`, Elm & Park → Courthouse、recording 中 | heading、building description、court-session observation | 初回到着。building と session は別 prose leaf とする。 |
| 3 | `LOOK`, Courthouse、recording 中 | heading、building description、court-session observation | 明示的な再観察。`NW` と exact leaf / semantic context が同じため copy を共有する。 |
| 4 | `SE`, Courthouse → Elm & Park、recording 中 | heading のみ | 帰路では description を補わない。 |
| 5 | `NE`, Elm & Park → Kennedy Park、recording 中 | heading のみ | 帰路では既承認の park description を補わない。 |

開始時の `RECORD` と帰着後の `RECORD OFF` は経路境界の確認に使われた。その response は Issue #49 で承認済みの exact leaf / copy を下表に再掲し、本 packet で別の copy identity は作らない。

## Exact English leaf → Japanese copy table

下表の command は context qualifier であり、翻訳対象ではない。command echo、空行、active line-input の `>` は copy leaf に含めない。

| Context / presentation role | Exact canonical English leaf | Approved Japanese copy |
| --- | --- | --- |
| `RECORD`; route-boundary response (Issue #49 copy reused) | `Record feature activated.` | `記録機能を起動しました。` |
| `SW`; arrival heading | `Elm & Park` | `エルム通りとパーク通り` |
| `SW`; intersection description | `This is the intersection of the north-south Park Street and the east-west Elm Street. A park entrance is on the northeast corner, and large, old-fashioned edifices occupy the other three corners of the intersection. The sidewalks and street are crowded with people.` | `ここは南北に走るパーク通りと東西に走るエルム通りの交差点だ。北東の角には公園の入口があり、残る三つの角には古風な大建築が建っている。歩道も車道も人で混み合っている。` |
| `NW`; arrival heading | `Courthouse` | `裁判所` |
| `NW`; building description | `The courthouse is of the same vintage as the other governmental buildings in the area, dating from around 1990 or so. An exit leads southeast.` | `この裁判所は周辺のほかの官庁舎と同じ年代の建物で、1990年頃に建てられたものだ。出口は南東へ通じている。` |
| `NW`; court-session observation | `The court is in session. A woman is being tried for petty theft.` | `法廷は開廷中だ。女性が軽窃盗の罪で裁判にかけられている。` |
| `LOOK`; replayed heading | `Courthouse` | `裁判所` |
| `LOOK`; replayed building description | `The courthouse is of the same vintage as the other governmental buildings in the area, dating from around 1990 or so. An exit leads southeast.` | `この裁判所は周辺のほかの官庁舎と同じ年代の建物で、1990年頃に建てられたものだ。出口は南東へ通じている。` |
| `LOOK`; replayed court-session observation | `The court is in session. A woman is being tried for petty theft.` | `法廷は開廷中だ。女性が軽窃盗の罪で裁判にかけられている。` |
| `SE`; return heading only | `Elm & Park` | `エルム通りとパーク通り` |
| `NE`; return heading only | `Kennedy Park` | `ケネディ公園` |
| `RECORD OFF`; route-boundary response (Issue #49 copy reused) | `Record feature deactivated.` | `記録機能を停止しました。` |

## Terminology and copy decisions

- **Street heading:** `Elm & Park` は二本の street の交差地点を指す heading と判断し、「エルム通りとパーク通り」とする。description でも `Elm Street` / `Park Street` をそれぞれ「エルム通り」/「パーク通り」とし、heading と prose の固有名を一致させる。
- **Place headings:** `Courthouse` は「裁判所」、`Kennedy Park` は Issue #49 の承認済み表記「ケネディ公園」とする。heading は descriptive prose とは別 leaf のまま扱う。
- **Narrative register:** Issue #49 の room description と同じ常体を維持する。方角は「北東」「南東」、`governmental buildings` は建物自体を指す自然な表現として「官庁舎」とする。
- **Court terminology:** `The court is in session.` は assignment の `Attending a court in session` に対する既承認表現「開廷中の裁判」と整合する「法廷は開廷中だ」とする。`petty theft` は行為の描写へ広げず、罪名を示す「軽窃盗の罪」とする。
- **Shared copy identity:** Courthouse の三つの stable leaves は `NW` と explicit `LOOK` で exact English と意味上の context が一致するため共有できる。`Elm & Park` と `Kennedy Park` の heading も往路・帰路または既承認 packet と同じ場所 identity を表すため共有できる。一方、帰路に未表示の description を挿入しない。

## Dynamic / optional canonical-English boundaries

- `RECORD`、`SW`、`NW`、`LOOK`、`SE`、`NE`、`RECORD OFF`、それらの command echo、parser へ送る入力は canonical English のままとする。
- Simulation の month / day / time、recording を含む mode、location などの canonical status value は本 story-copy table の対象外とし、翻訳 identity に使用しない。
- Session 2 の `SW` だけで観測された `You are startled as a taxi horn blares nearby.` は optional city-noise leaf である。本 packet では承認せず、canonical English のまま表示する。
- 空行、heading / prose の block boundary、末尾の active line-input `>` は presentation structure であり、翻訳文字列へ埋め込まない。
- Exact identity が一致しない leaf、未観測 leaf、未承認 leaf は、その leaf 単位で original English に安全に fallback する。前後の承認済み leaf が一致していても、近似一致、部分一致、room 全体の一括翻訳は行わない。

## Deferred / unobserved branches

- Taxi horn を含む optional / random city-noise と、その未観測 variant。
- Elm & Park や Courthouse からの別方向、別 route、別 room、および map / navigation guidance。
- Courthouse 以外の recording assignment、assignment completion、timed simulation event、later year、Simulation Mode への再入場や review。
- `RECORD` / `RECORD OFF` の別 context、Courthouse scene の非 recording context、今回の fixture にない court event。
- Dynamic status の localization、source にだけ存在する prose、unknown leaf、日本語 parser input。

## Integration handoff

本 packet の exact copy を production catalog に実装し、Classic / assisted の complete fresh-session route を browser で検証し、player-facing Courthouse coverage と milestone の最終 roll-up を `PROJECT_STATUS.md` に反映する責任者は **Issue #57** とする。本 copy-only change では implemented coverage、production behavior、fixture、roadmap の完了状態を変更しない。
