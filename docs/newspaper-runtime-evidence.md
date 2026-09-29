# Issue #62 — 2041 newspaper fieldwork runtime evidence

2026-09-29 に canonical Release 79 を二つの独立した fresh Chromium context で実行した。各 session は初回 Simulation entry までを最初から進め、既存 Courthouse 録画往復を完了して Kennedy Park で録画を停止した後、持ち物を確認し、新聞の録画往復を同じ session で完了した。したがって終了案は **A（裁判所 → 新聞）** を推奨する。

採用経路は、Courthouse の `RECORD → SW → NW → LOOK → SE → NE → RECORD OFF` に続けて、`INVENTORY → RECORD → NE → N → NE → BUY NEWSPAPER → READ NEWSPAPER → SW → S → SW → RECORD OFF` とする。両 session とも新聞を購入し、録画中に記事の四段落を読み、Kennedy Park へ帰着して録画を停止し、ordinary line input を回復した。

## Fixture と再現方法

- Fixture: `tests/fixtures/parchment-newspaper-runtime-observed.json`
- Capture script: `scripts/capture-newspaper-runtime.mjs`
- Canonical artifact: `public/amfv-r79-s851122.z4`
- Capture viewport: 1440 × 900
- Capture boundary: Courthouse 録画開始の command echo から新聞往復後の `RECORD OFF` と新しい ordinary line input まで
- Retained evidence: bridge-v3 の line / run / class / blank-line structure、terminal line、active input ownership、各 turn 後の GridWindow mode / time / location / date

```bash
# 初回だけ
npx playwright install chromium
npx playwright install-deps chromium

# terminal 1（production export でも npm run dev でもよい）
npm run dev -- --hostname 127.0.0.1 --port 3100

# terminal 2
node scripts/capture-newspaper-runtime.mjs \
  --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-newspaper-runtime-observed.json
```

Script は assisted decoder が表示した numeric answer を canonical English input として送る。各 command の送信前に canonical active-input line ID を記録し、その同じ line が今回の command echo へ変わり、さらに別 ID の canonical line input が返るまで待つ。このため、履歴中の古い `RECORD`、方向 command、または wrapper input の早すぎる再有効化を turn 完了と誤認しない。Fixture に historical source 由来の prose は補っていない。

## 前提、時刻、購入

| 項目 | Session 1 | Session 2 | 判定 |
| --- | --- | --- | --- |
| Courthouse 開始 | `3/10/2041 12:27pm` | `2/4/2041 9:50am` | 日付と絶対時刻は dynamic |
| 新聞出発前の持ち物 | `a key`, `a wallet` | 同一 | fresh entry の stable prerequisite |
| 新聞録画開始 | Kennedy Park、`12:51pm` | Kennedy Park、`10:14am` | 地点と mode は stable |
| 購入 | wallet の card を挿入し `NEW BALANCE: $599` | 同一 | 購入成功と残高は stable observed leaf |
| 読書 | Bodanski Square、recording、10分経過 | 同一 | 全記事段落が同一 |
| 最終停止 | Kennedy Park、`1:33pm` | Kennedy Park、`10:56am` | `Simulation Mode` と line input を回復 |

購入前に `INVENTORY` で wallet を観測した。Card は独立した inventory leaf ではなく、購入応答が wallet の card 使用を canonical に述べる。価格や初期残高を source から推測せず、観測済みの購入後残高だけを保持する。

## Stable / dynamic / optional matrix

| Boundary | Stable output / state | Dynamic or optional output |
| --- | --- | --- |
| Main & Kennedy arrival | heading と三つの description paragraph、recording | 絶対日時 |
| Centre & Kennedy arrival | heading と intersection description | truck noise（両 retained session で出現したが route identity には含めない） |
| Bodanski Square arrival | heading、plaza description、newspaper dispenser、half-full warning | 絶対日時 |
| `BUY NEWSPAPER` | card、`NEW BALANCE: $599`、新聞取得 | なしを観測 |
| `READ NEWSPAPER` | 経済、Ryder / BSF、犯罪、その他記事と editorial の四段落、および段落間 blank line | Session 2 の skycopter noise |
| return | Centre & Kennedy → Main & Kennedy → Kennedy Park headings | Session 1 の宗教について尋ねる通行人 noise |
| final `RECORD OFF` | deactivation、non-recording mode、terminal ordinary line input | 絶対日時 |

Optional city noise は独立した prose leaf / blank-line pair で、経路成功の条件にも記事 identity にも含めない。未観測 variant は引き続き canonical-English fallback 対象とする。

## 記事構造と ordinary-turn 適合性

`READ NEWSPAPER` は command echo、四つの `Style_normal_par` prose leaf、それぞれを分ける blank paragraph、任意の city-noise leaf、terminal `>` line input から成る。記事は長いが、各段落は既存の bridge-v3 line/run と blank-line boundary で損失なく表現される。全 capture turn は `reconcilePresentationHistory` で representable であり、active input は terminal line を所有する。

したがって既存 ordinary-turn projector で扱える。記事専用 renderer、汎用 renderer、VM telemetry、または paragraph splitting の変更は不要であり、N3 に未承認の表示改修を持ち込まない。

## 試行と失敗分類

保持した二 session では canonical route failure はなかった。事前 probe では、outer wrapper input の再有効化だけを待ったため次 command を早く送り、また履歴中の古い同名 command echo を新 turn と誤認する同期失敗が起きた。これは canonical な時刻、持ち物、乱数、経路の失敗ではない。Script を current input line ID と次の input line ID の境界待ちへ修正してから、二つの fresh session を連続して成功させた。

好都合な optional prose が出るまで再試行しておらず、retained sessions は truck、skycopter、通行人、および Courthouse 手前の別形を含む。これらを失敗扱いせず fixture にそのまま保存した。

## A〜D の判断と後続差分

- **A を採用:** 裁判所 → 新聞の全経路が、異なる日付・時刻の二 fresh session で成立し、前提、購入、全記事、帰着、停止、入力復帰を観測できた。
- **B は不採用:** 別 session に縮小する必要を示す不安定性がない。同一 session の受入を維持できる。
- **C は不採用:** 順序依存の失敗も、新聞 → 裁判所へ逆転する source/runtime 根拠もない。
- **D は不採用:** 新聞単独の再現性調査や広い状態管理改修を必要とせず、既存の fresh entry と wallet で成立した。

N2 は本 fixture の exact stable leaves と Main & Kennedy、Centre & Kennedy、Bodanski Square の地名を copy packet の正本にできる。N3 は既存 ordinary-turn catalog と共有地名 lookup だけを拡張し、専用表示を追加しない。U3 は同一 fresh session の Courthouse → Newspaper を最終受入単位とし、optional noise と未知 leaf の English fallback を保持する。

## 保持する境界

この change は runtime fixture、capture script、static regression、観測文書、実行計画と frontier status のみを変更する。Production catalog、日本語 copy、renderer、map / route UI、parser behavior、assignment completion は変更しない。Release 79 と Parchment を parser/state authority とし、raw status と command は English のまま、未承認 output は original English へ fallback する。Canonical story artifact と `source/` は変更しない。
