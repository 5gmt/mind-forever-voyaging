# M3 / #80 — Restaurant milestone integration and acceptance

## 状態と review gate

実装担当は Codex Cloud。M1 は [#84 の Sol 採択レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/84#pullrequestreview-5614358178)、M2 は [#85 の独立 copy 承認](https://github.com/5gmt/mind-forever-voyaging/pull/85#pullrequestreview-5615116876)と merge `7a0568f76001909cfd39a1bbdbcb61fd1f6dd28a` で完了した。

本書は M3 実装・検証の集約であり、独立した受入承認ではない。**Sol の通常 PR review → 指摘修正 → 同じ最終 head に対する Astra の6経路全体受入 → Astra が最終 merge** の順序を守る。実装者は自己点検を独立 review と数えず、merge しない。#80 は最終 merge まで open。

Base は上記 #85 merge。現 head / base、current-head CI、artifact URL・有効期限、review 差分は PR 本文に記録する。SHA の自己参照更新だけの commit を繰り返さず、PR の reviewed head と CI artifact metadata を正本とする。Plan / PROJECT_STATUS は本 PR の coverage と受入待ちを記し、最終 merge を milestone 完了とする roll-up を準備する。

## 実装と証拠の対応

| 条件 | 実装 / 根拠 / 検証 |
| --- | --- |
| 採択 A案、承認済み copy のみ | [M1 実測](restaurant-recording-a-evidence.md)、別 fixture `parchment-restaurant-recording-a-observed.json`、[M2 copy](restaurant-copy-packet.md) R1–R7。`app/localization.ts` の exact leaf + command qualifier。地名は shared place lookup を story / wrapper / route で再利用。 |
| 異なる役割の identity | Room `ROYS-PAGODA` → ロイズ・パゴダ、map `meal` / assignment 0 → レストラン、限定 scene `MEAL` → 食事。既存 restaurant object / 未知出口名は English。Checklist destination も shared map lookup と lang を使用。 |
| 限定操作と説明 | `SceneActions` 内の限定分岐が既存 initial2041 / resolved room / line input を使用。Guided は `BUY MEAL` の編集可能 draft、Action menus は明示押下一回一送信。独立した section 名・見出し・説明で meal の本文未言及と整合。`.scene-meal` の限定 CSS により narrow でも英日の説明文を隠さず、読み上げ対象にも含める。GLOBAL-OBJECTS guard / source metadata は変更しない。 |
| 同一 fresh session の連続経路 | `restaurant-fieldwork.spec.ts` / `restaurant-acceptance.ts` の6件。初回 PEOF / security / recording loop、Courthouse の録画往復、新聞の全徒歩・購入・四段落 READ、Restaurant の食事録画、明示停止、非録画の公園通常入力。 |
| 原作出力と推定の分離 | 各実送信で前後の canonical input ID と当該 echo / output / raw status を保存。食事前後 recording、$30 / $569 の全文、明示 OFF 成功を全6経路で照合。22分の status 差は desktop の3経路で検証する。390px の原作 status は mode / location だけで時計・日付を出さず、その3経路の経過時刻は未観測と明示する。訪問だけでは meal checklist 未完了、食事後の3/9は補助的推定として別に検証する。内部 flag / 残容量 / 正式九課題評価は主張しない。 |
| 実 UI と可視性 | Assisted の map destination / route、compass、context exits、newspaper / meal 操作。Drawer arrival / checklist、英日ラベル、Guided draft の編集・未送信・focus、Actions の当該 turn 一回送信。Classic は支援非表示。 |
| 本文・履歴・recovery | Paragraph / blank / terminal input の順、長い履歴、食事末尾の clipping-ancestor 内可視性と wheel、wrapper input の viewport / focus。EN→JA→EN 往復で input ID / draft / canonical transcript / Japanese history を保持。 |
| Accessibility | 各 locale の iframe aria snapshot、canonical / localized owner の排他性、原文警告の `lang=en`、日本語 surface の `lang=ja`。Guided の accessible name `食事 注文する` は visible 対象名＋動詞の構造と aria snapshot で検証する。音声読み上げは未実施。 |
| Scope と fallback | `restaurant-scope.ts` は実経路の後の controlled bridge probe。busy、character input、unknown room、2051、RESTORE unknown、re-entry、QA、rolling initial history を分離して検証する。VM の実出力 / 実保存データ RESTORE の証拠とは数えない。Unit は wrong balance / command、half-full / full warning の English fallback を保持。 |
| 起動順序の回帰 | `player-startup.spec.ts` が wrapper hydration を実際の初期 char-input transcript 到着後まで遅延させ、起動待ちで止まる RED を再現。受信 listener 登録直後に既存 `request-state` を一度送る限定修正で GREEN。新 bridge API / observer / VM 状態変更はない。 |
| 既存 regression | Courthouse / Newspaper の旧成功 fixture と従来26 E2E を保持。新聞 helper は opt-in `on-site` 時だけ A案、既定 `travel` 経路は不変。#82 の3失敗 fixture / capacity failure も保持し、承認された同じ meal leaf の訳だけを新 coverage に更新。 |

## 再現・artifact の読み方

`npm run test:e2e -- tests/e2e/restaurant-fieldwork.spec.ts` は、Classic / Guided / Action menus × desktop 1440×900 / narrow 390×844 を fresh browser context で実行する。省略形の canonical 移動列は M1 と同じで、既存 compass / route が使う NORTH / WEST / SOUTH / EAST も English のまま実送信し、exact leaf qualifier と照合する。

新聞の現地録画は `INVENTORY NE N NE RECORD BUY NEWSPAPER READ NEWSPAPER RECORD OFF SW S SW`。追加区間は `SW W W S RECORD BUY MEAL RECORD OFF N E E NE`。Locale 往復・draft・drawer 操作は VM に余分な command を送らない。録画 half-full は Roy's の RECORD turn に現れ、English のまま保持する。Full / 自動停止は成功条件に数えない。

| 経路 | Playwright test title prefix | 保存する証跡 |
| --- | --- | --- |
| Classic / 1440×900 | `classic records … (desktop)` | 下記共通 artifact |
| Guided / 1440×900 | `guided records … (desktop)` | 共通＋meal UI aria snapshot / drawer |
| Action menus / 1440×900 | `actions records … (desktop)` | 共通＋meal UI aria snapshot / drawer＋controlled scope probes |
| Classic / 390×844 | `classic records … (narrow)` | 下記共通 artifact |
| Guided / 390×844 | `guided records … (narrow)` | 共通＋meal UI aria snapshot / drawer |
| Action menus / 390×844 | `actions records … (narrow)` | 共通＋meal UI aria snapshot / drawer |

各 test-results directory の `restaurant-turns.json` は prefix / Courthouse / restaurant の command・input ID・raw output・status と、新聞の全 turn、食事前後 status を含む。`restaurant-meal-status.json` は時計の可用性、desktop の22分差、narrow の時計未出力を区別する。`restaurant-meal.png` / `restaurant-return.png`、`restaurant-scroll.json`、英日 owner の `restaurant-*-accessibility.txt` が共通証拠。新聞四段落の screenshot / scroll / accessibility / turns も同じテストに添付する。Passing attachment は CI の14日 artifact に入り、失敗時は screenshot / trace とともに job が失敗する。

## 検証結果と制限

2026-10-23 JST のローカル最終確認:

- `npm run lint`: PASS。
- `npx tsc --noEmit`: PASS。
- `npm test`: Next static export build と31 unit tests が PASS。
- `npm run test:e2e`: **33/33 PASS（12.9m、retry 0。CI follow-up 後の全実行）**。既存26件＋起動順序1件＋restaurant 6件。
- Canonical checksum 一致、story / source / 既存 fixture / dependencies / workflow は未変更。`git diff --check` と相対 Markdown link 34件も通過。

| 経路 / viewport | 原作 DATE / 食事 TIME | Meal input → 応答後 input | 公園 input | Story scroll top → end |
| --- | --- | --- | --- | --- |
| Classic / 1440×900 | `5/24/2041` / `12:25PM → 12:47PM`（22分） | `line-191 → line-194` | `line-211` | 3914 → 4558 |
| Guided / 1440×900 | `1/14/2041` / `1:50PM → 2:12PM`（22分） | `line-191 → line-194` | `line-209` | 4324 → 4711 |
| Action menus / 1440×900 | `5/20/2041` / `12:19PM → 12:41PM`（22分） | `line-193 → line-196` | `line-213` | 4364 → 4753 |
| Classic / 390×844 | 原作が時計・日付を出力せず、時刻は未観測 | `line-192 → line-195` | `line-212` | 6786 → 7379 |
| Guided / 390×844 | 原作が時計・日付を出力せず、時刻は未観測 | `line-188 → line-191` | `line-206` | 7258 → 7550 |
| Action menus / 390×844 | 原作が時計・日付を出力せず、時刻は未観測 | `line-192 → line-195` | `line-210` | 7269 → 7565 |

各経路で実送信40回（可変 security answer を含む）の全 input ID chain が連続し、省略形へ正規化した command 列が採択 M1 と一致した。全6件とも食事前後 recording、明示 OFF 成功、公園では非 recording / ordinary line input、half-full は Roy’s RECORD で1回、full / 自動停止なし。食事の最終文字は clipping ancestor を含む viewport 内で可読、input の viewport / 編集 / focus、英日 history と accessibility owner を検証した。

6件の meal screenshot と英日 aria / scroll / status 記録、狭幅 Guided / Action menus の return screenshot を実装者が確認した。Guided の accessible name は `食事 注文する` で、限定説明も両 mode の narrow accessibility snapshot に含まれる。帰着画像は現在地・raw status・入力フォーカスの証拠であり、本文は既存の reading-position recovery を維持して過去履歴を表示する場合がある。本文末尾の可読性は meal / newspaper の専用 screenshot と scroll JSON で示す。初回ローカル実行の Classic desktop には未承認の city interrupt（shaved-head man）が現れ、Japanese 隣接 leaf とともに原文 English のまま保持された。

Current-head CI / artifact URL・14日 retention の実期限は PR 本文へ追記する。ローカル画像確認を CI ZIP 全体の手動精査と称さない。Sol 通常 review と Astra 全体受入・最終 merge は未実施。

検証途中の失敗と修正:

- Unit RED は未実装の shared place label、browser RED は Roy’s 到着後の meal section 不在。実装後に当該 coverage を検証する。
- Controlled 2051 probe で現在地だけが初回条件なしに翻訳されることを検出し、既存 `navigationLocale` に合わせた。既存の未知 / re-entry / RESTORE fallback を保持する通常修正。
- Full suite の起動待ち失敗を2回観測。通信は player / bridge / z4 が200、iframe に原作 char prompt があり、wrapper が INITIALIZING のままだった。初期通知が wrapper hydration より早い状態を専用の実ブラウザ test で再現し、既存 `request-state` の一度の再取得で復帰を確認した。起動順序の回帰テストを追加し、retry / timeout / assertion を緩めていない。元の2回の全タイミングが同一原因だったとまでは断定しない。
- Narrow 画像と aria snapshot で既存 generic CSS が meal の説明文を隠すことを発見。可視性 assertion の RED を確認し、`.scene-meal` の限定 override を追加。無関係な SceneActions の compact 表示は変えない。Context panel を開いた狭幅の帰路は、panel に覆われる header toggle ではなく panel 自身の Close を使う。
- 新規 clock harness は大文字 AM/PM と正午のまたぎ、narrow で時計を出さない canonical status を誤って仮定した。Raw status を保存し、desktop の時刻差を正規化、narrow は時計未観測として明示的に検証する。22分という観測を narrow に転記しない。

CI follow-up（初回 head `394cdab`）:

- [初回 CI 39925823372](https://github.com/5gmt/mind-forever-voyaging/actions/runs/39925823372) は verify success / browser 27 passed・6 failed。新規5件は VM input ID 更新を待った直後に、React がまだ前の prompt を表示している時点で challenge を読み、match が null になった。現在の exact challenge が表示される assertion を同期条件へ追加した。
- 既存 Guided narrow の first newspaper paragraph viewport assertion も再発。`scrollIntoView` は所有 surface 以外の祖先も動かし得て、bridge は outer BufferWindow を0へ戻す。開始位置を `.story-presentation-scroll` だけの相対座標で設定し、outer scrollTop=0 を追加検証する。段落の viewport・wheel 進行・末尾の実文字・input / focus assertion は維持し、retry / timeout を緩めない。
- 失敗 artifact は [12489378048](https://github.com/5gmt/mind-forever-voyaging/actions/runs/39925823372/artifacts/12489378048)（2026-11-06 17:43:03 JST まで）。CI ZIP は取得用参照を発行できたが、ローカル download は403で未展開。CI failure image / trace を目視済みとは称さず、job log、既存 DOM ownership、ローカル browser 記録で計測手順を確認した。
- この follow-up は test helper の同期と計測だけで、production implementation / canonical story / source を変更しない。Follow-up 後のローカル full33 は全件通過し、6経路の実測表も更新した。最新 head の CI / artifact は PR の引き渡し欄を正本とする。
- [2回目 CI 39929137710](https://github.com/5gmt/mind-forever-voyaging/actions/runs/39929137710)（head `6853d9f`）は verify success / browser 30 passed・3 failed。Security prompt 同期は解消。一方、旧 / 新 Actions narrow の新聞先頭 viewport と Actions desktop の meal wheel で位置が0へ戻る失敗が残った。所有 surface だけの開始位置指定では解消しておらず、root cause は未確定。DOM identity・hidden / mode・scroll geometry の読み取り専用 lifecycle 記録を追加し、失敗時の job log から切り分ける。現時点ではスクロール問題を修正済みとは扱わない。

**Astra 受入上の留意:** 390px でも食事本文・支払・録画継続/停止・帰着/input は確認対象だが、原作が出力しない時刻はその session で検証不能。22分の根拠は採択 M1 の2 session と本 M3 の3 desktop session。時計表示を補う新 renderer / VM telemetry は追加しない。

原作 Release 79 / Parchment が story / state / parser / save の唯一の権威で、raw English 観測、English command、2a+2b、history / recovery、accessibility 排他性を維持する。Canonical SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`、`source/` と story artifact を変更しない。

対象外・未検証: 原作内部の九課題 flag / 正式評価、未承認営業時間・低残高・再注文 variant、他 fieldwork、後続年・再入場の日本語化、実保存データ RESTORE、実 screen reader 音声、本番配備との一致。Controlled bridge probe と canonical fresh-session runtime の証拠を混同しない。次 milestone は本 PR で自動選択しない。

最終 merge 後の #29 報告は Astra が担当し、最終 reviewed head / merge commit、CI / artifact・期限、本受入 link、対象外、Sol / Astra の独立 review と trial の振り返りを記録する。#80 完了はこの受入と merge・報告に依存する。
