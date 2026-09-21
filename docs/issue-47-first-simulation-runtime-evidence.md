# Issue #47 — 初回 Simulation Mode runtime evidence

2026-09-21 に canonical Release 79 を二つの独立した fresh Chromium context で実行し、`PEOF` → `WAIT` × 4 → `ENTER SIMULATION MODE` → decoder 正答 → `LOOK` → `RECORD` → `WAIT` → `RECORD OFF` を観測した。コミットした fixture は bridge-v3 の `lines`、`runs`、`activeInput` と GridWindow status を保存する。story text はすべて runtime で観測した canonical English であり、historical ZIL から補完していない。

## Fixture と再現方法

- Fixture: `tests/fixtures/parchment-first-simulation-runtime-observed.json`
- Canonical artifact: `public/amfv-r79-s851122.z4`
- Capture viewport: Playwright project `chromium` の 1440 × 900 desktop viewport
- Fresh context ごとの入力: opening character prompt を完了後、`PEOF`、`WAIT` × 4、`ENTER SIMULATION MODE`、既存 assisted decoder が導出した numeric answer、`LOOK`、`RECORD`、`WAIT`、`RECORD OFF`
- Verification: `npm run test:e2e`、`npm test`、`sha256sum public/amfv-r79-s851122.z4`

Capture は repository の production projector を変更せず、一時的な Playwright harness から live `AMFVPresentationBridge.extract` を各 turn 後に呼び出した。fixture の各 observation は最後の command echo から active input までを sanitized slice として保持する。security 正答後だけは Parchment が同じ security prompt leaf に numeric input を追記してから scene を出力するため、`ENTER SIMULATION MODE` echo から Kennedy Park の line input までを保持し、`inputOwnership` に送信値を明記した。

## Stable English identity

- 4 回の `WAIT` は fresh route 固有の順序である。1 回目と 3 回目は `Time passes...`、2 回目には Alyson Price の退勤 scene、4 回目には staff member、Perelman の一時退場、private-line message、Perelman の復帰が現れた。
- Private-line message は Plan parameters 完了、Simulation Mode 利用可能、recording assignments 導入、real-time 説明の順であった。
- Assignment boundary は private-line message の introduction と real-time explanation の間にある一つの連続 run で、`Eating a meal in a restaurant` から `Visiting your own home or living quarters` まで正確に 9 leaves だった。leading spaces は fixture に保持している。
- Security shell は `Simulation Mode is a Class One Security mode...` で始まり、challenge と active line input は同じ bridge line を所有した。narrow viewport による改行と run wrapping は identity にしない。
- 正答後の stable leaves は `This simulation is based 10 years hence.`、`Kennedy Park` heading、park description だった。
- Recording loop の stable responses は `Record feature activated.`、`Time passes...`、`Record feature deactivated.` だった。

## Dynamic fields と status/input transition

| Field | Fresh session 1 | Fresh session 2 | Identity treatment |
| --- | --- | --- | --- |
| Security challenge | `RED 64` | `ORANGE 49` | color と inner number は dynamic |
| Derived canonical answer | `51` | `43` | story copy ではなく player input |
| Initial simulation date | `4/10/2041` | `4/27/2041` | month/day は dynamic、year 2041 は first-simulation boundary |
| Initial simulation time | `11:06am` | `11:15am` | dynamic |

`ENTER SIMULATION MODE` 後は `Simulation Mode / (undefined)` となり、security prompt line が line input を所有した。正答後は `Simulation Mode / Kennedy Park` と ordinary line input に移った。`RECORD` で mode は `Simulation Mode (recording)`、`RECORD OFF` で `Simulation Mode` に戻り、最後の bridge leaf は独立した `>` ordinary line input だった。

## Scope boundary

この evidence は runtime-observed fixture と regression test のみを追加する。日本語 copy、catalog、production projector、security 誤答、Kennedy Park からの移動、recording event、canonical story artifact は変更しない。後続の narrow list/security projection と copy approval は、geometry ではなく本 fixture の stable leaves、dynamic fields、list/input ownership を使用する。
