# Issue #55 — 2041 Courthouse recording runtime evidence

2026-09-26 に canonical Release 79 を二つの独立した fresh Chromium context で実行し、既に承認された初回 Simulation Mode prefix の後に `RECORD` → `SW` → `NW` → `LOOK` → `SE` → `NE` → `RECORD OFF` を観測した。両 session とも Kennedy Park で recording を開始し、Elm & Park を経て Courthouse の開廷 scene を recording 中に観測してから、同じ経路で Kennedy Park に戻り、通常の line input を回復した。

## Fixture と再現方法

- Fixture: `tests/fixtures/parchment-courthouse-runtime-observed.json`
- Canonical artifact: `public/amfv-r79-s851122.z4`
- Capture viewport: 1440 × 900
- Capture boundary: 二回目の `RECORD` command echo から、帰着後の `RECORD OFF` に続く ordinary line input まで
- Retained evidence: bridge-v3 の line / run / class / blank-line structure、terminal line、active input ownership、各 turn 後の GridWindow mode / time / location / date

Exact regeneration commands は次のとおり。script は canonical player を含む application を起動し、二つの fresh browser context を直列に作る。security challenge、Simulation date/time、optional noise、bridge line ID は再生成ごとに変わり得るため、committed sample との byte-for-byte diff ではなく repository regression で stable identity を検証する。

```bash
# 初回だけ
npx playwright install chromium
npx playwright install-deps chromium

# terminal 1
npm run dev -- --hostname 127.0.0.1 --port 3100

# terminal 2（server が ready になった後）
node scripts/capture-courthouse-runtime.mjs \
  --base-url http://127.0.0.1:3100 \
  --output /tmp/parchment-courthouse-runtime-observed.json
```

Capture script は assisted decoder が観測した numeric answer を canonical English input として Parchment に送る。fixture に historical ZIL 由来の prose は補っていない。

## Stable / dynamic matrix

| Boundary | Fresh session 1 | Fresh session 2 | Identity treatment |
| --- | --- | --- | --- |
| Initial captured status | `Kennedy Park`, `4/19/2041 10:44am`, recording | `Kennedy Park`, `2/17/2041 10:19am`, recording | location / mode は stable、month/day/time は dynamic |
| `SW` | `Elm & Park` heading + full intersection description | 同じ stable leaves + taxi horn interrupt | taxi horn は optional city-noise leaf |
| `NW` | `Courthouse` heading + building description + petty-theft court scene | 同一 | stable |
| explicit `LOOK` | arrival と同じ Courthouse leaves | 同一 | stable |
| `SE` | `Elm & Park` heading only | 同一 | stable return behavior |
| `NE` | `Kennedy Park` heading only | 同一 | stable return behavior |
| final `RECORD OFF` | deactivation response、`Simulation Mode`、ordinary `>` line input | 同一 | stable recovery boundary |

両 session の移動は canonical clock を `SW` / `NW` / `SE` / `NE` ごとに5分進め、`LOOK` と `RECORD OFF` は1分進めた。これは committed sample の status evidence として保持するが、copy identity は絶対時刻に依存させない。

Session 2 の `SW` だけに `You are startled as a taxi horn blares nearby.` が現れた。これは Elm & Park の stable description と別の prose leaf / blank-line pair であり、route identity に含めない。未観測の street/city-noise variants も同様に canonical-English fallback 対象とする。

## Structural conclusion

すべての新規 turn は、command echo、0個以上の title/prose/blank leaves、末尾 blank、独立した ordinary `>` line input という既存 ordinary-turn shape で表現できた。Courthouse arrival と explicit `LOOK` も同じ shape であり、active input は常に terminal line を所有する。新しい structural projection は不要である。

現時点では本 route の日本語 copy と catalog identity を追加しないため、production presentation は未承認 leaves と optional noise を canonical English のまま安全に表示する。後続の copy approval / integration は、geometry や historical source ではなく、本 fixture の exact stable leaves と command boundary を使用できる。

## Scope boundary

この change は runtime fixture、capture script、evidence note、static regression、および frontier status のみを追加する。production catalog、日本語 copy、renderer、map / route UI、parser behavior、assignment completion behaviorは変更しない。canonical story artifact と `source/` は変更しない。
