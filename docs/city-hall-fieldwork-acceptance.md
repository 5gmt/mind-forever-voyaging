# G3 / #89 — City Hall integration and acceptance

## 実装範囲と完了 gate

G1 は [PR #91 の独立採択レビュー](https://github.com/5gmt/mind-forever-voyaging/pull/91#pullrequestreview-5646050774)と merge `7d1291177ee6a690ffdfb0e33b39f2a27c8e310d`、G2 は [PR #92 の独立 copy approval](https://github.com/5gmt/mind-forever-voyaging/pull/92#pullrequestreview-5646941509)と merge `c0b790184ee4e0f36fcda9a628ed4c237d1da987` で完了した。
G3 はこの G2 merge を base とし、[承認済み copy packet](city-hall-copy-packet.md)の C1–C6、R1–R4、役割別の地名・人物・操作と Talk 説明2組を既存 presentation / SceneActions へ統合する。

本書は Codex Cloud による実装と検証の記録である。
独立した Chat モード Sol の通常レビュー、続く Astra / ChatGPT Work の milestone 全体受入と merge、[#29](https://github.com/5gmt/mind-forever-voyaging/issues/29)への完了報告、[#89](https://github.com/5gmt/mind-forever-voyaging/issues/89) close を完了条件とする。
実装者の自己点検や内部 agent による点検は、指定された独立レビューの代わりにはならない。
最終 head / base、review 後の差分、未解決指摘、current-head CI、artifact URL と実期限は提出 PR に記録し、最終 reviewed SHA / merge / close は PR review・Issue・#29 の実行記録を正本とする。
自己参照 SHA の追記だけを目的とする文書 commit は要求しない。

## 条件と証拠の対応

| 受入条件 | 実装・根拠・検証 |
| --- | --- |
| 観測・承認された本文だけを日本語化 | `app/localization.ts` の exact leaf + command qualifier。G1 の [runtime fixture](../tests/fixtures/parchment-city-hall-runtime-observed.json) と [観測記録](city-hall-runtime-evidence.md)、G2 copy packet を入力とする。Unit test は C1–C6 / R1–R4、alias、行順、未知の本文・command の fallback を照合する。 |
| 初回2041年と解決済みの部屋 | 既存 host の raw mode / year / 初回 session / room 判定を、各 presentation history entry に保存する。新規 City Hall leaf は対応する `ROCKVIL-CENTRE` / `CITY-HALL` / `MAIN-AND-KENNEDY` にだけ適用する。未知・別 room / 後続 phase は English。過去の有効な日本語は locale や現在の phase が変わっても残す。Unit test が不一致 room・履歴・recovery・RESTORE 境界を検証する。 |
| 役割ごとの identity | Room `CITY-HALL` → 市役所、`ROCKVIL-CENTRE` → ロックヴィル中央広場、map `official` → 市役所、assignment 1 → 政府職員と話すこと、actor `GOVERNMENT-OFFICIAL` → 政府職員、`talk` → 話す。地図の accessible name と checklist destination の `lang` も実ブラウザで照合する。別の official、bench / snack、未承認の Sit beside は一括翻訳しない。 |
| 在室時だけの支援 | Raw の exact C5 と解決済み City Hall を在室根拠とし、既存 `actorHasDeparted` で退場を記録する。局所的な `unknown / present / departed` は同じ session の退場を保持し、古い scene cache / 18-line tail で再生成しない。新 session / RESTORE / wrapper reset では不明へ戻す。新しい bridge API、VM state mirror、汎用 NPC engine は追加しない。 |
| 入力と送信の契約 | Host と main / companion 共通 SceneActions の両方で初回2041年・City Hall・line input を限定する。Guided は編集可能 draft と明示 submit、Actions は明示1押下1送信、busy は両面で無効。Classic に支援操作を追加しない。6本の自然経路と controlled probes で英日を確認する。 |
| 同一 session の先行3課題と市役所 | `city-hall-fieldwork.spec.ts` の6件が既存 `acceptRestaurantMilestone` の40送信をそのまま実行し、続く10送信を追加する。Assisted の route / recording / Talk は実 controls を使う。既存34 browser tests は保持する。 |
| 現在の input と原作 recording | 各送信について parent→player の command、直前 input ID に付いた新 echo、次の input ID、raw presentation / status を保存する。会話前後 recording、退場、明示 OFF、非録画 LOOK、非録画の公園通常入力を確認する。Full / auto-deactivation は失敗にする。 |
| 推定と原作評価の区別 | 正常録画後の4/9は wrapper の補助推定。別の fresh canonical session では先行3課題後の会話を録画せず、3/9と政府職員課題未完了を確認する。原作の内部 flag、残容量、正式九課題評価は検証しない。 |
| Reading / recovery / accessibility | 全6経路で実 wheel と clipping ancestor 内の本文最終文字、map / controls / input の到達、draft と input ID / canonical transcript / history の保持を確認する。EN→JA→EN→JA の aria snapshot、`aria-hidden` / `inert`、単一 story owner、未翻訳 leaf の `lang=en`、focus を保存する。 |

## Fresh canonical routes と artifact の読み方

6件の test title は `{classic,guided,actions} completes the City Hall fieldwork after three recorded tasks ({desktop,narrow})`。
Viewport は1440×900と390×844で、各件は新しい browser context / canonical story から起動する。
起動 character input と50回の line submission を区別し、先行40送信は G1 の列と照合する。
Security decoder の実際の数値回答はその session のまま保存し、列の比較時だけ可変回答として扱う。
追加区間は `NE W W RECORD GOVERNMENT OFFICIAL, HELLO RECORD OFF LOOK E E SW`。
Assisted の `WEST / EAST` は比較時だけ `W / E` に正規化する。
Locale / drawer / draft 操作による追加送信は認めない。

| Passing attachment（各 test-results directory） | 内容 |
| --- | --- |
| `city-hall-runtime-observations.json` | 全実送信、起動以降の input / echo chain と raw status / presentation、市役所10 turn、会話前後 status、実測可能な時計、optional fallback、最終 input、補助推定の限界。 |
| `city-hall-map-entry.png` / `city-hall-map-entry-accessibility.txt` | Assisted の到着地図、現在地・目的地の accessible name、課題 identity。 |
| `city-hall-talk-controls.png` / `city-hall-talk-ui.txt` | Assisted の可視 Talk / 説明と操作面。Guided は編集済みの draft を明示 submit する前。 |
| `city-hall-assignment-inference.txt` | Assisted の正常録画後の政府職員課題推定。非録画負例では未完了。 |
| `city-hall-conversation-ja.png` / `city-hall-reading.json` | 会話末尾の可読性、wheel の進行、input 到達、locale recovery、既存 reading lifecycle の読取記録。 |
| `city-hall-recovery-{1,2,3,4}-accessibility.txt` | 英日 story owner の排他性。 |
| `city-hall-after-look.png` / `city-hall-return.png` | 退場後 LOOK と公園帰着。帰着時の本文は既存の reading-position recovery により過去履歴を表示する場合があり、本文末尾の証拠は会話画像と reading JSON に置く。 |

先行3課題の `restaurant-*` / newspaper の attachment も同じ directory に残す。
非録画会話は別 test `unrecorded government conversation does not infer the fourth assignment` で、48回の line submission と同じ形式の記録を保存する。
Passing screenshot / JSON / accessibility file と失敗時 trace / screenshot は、既存 Actions artifact `playwright-test-results` に14日間保持する。
CI artifact の実期限と head の対応は PR 本文を参照する。

## RED / GREEN と境界 probe

実装前の controlled browser regression は、退場文が recent tail から落ちた後の Talk 復活と、companion の char input 中の Talk 表示を再現した。
承認済み本文未登録と、不一致 room に対する新規日本語表示も unit test の RED で確認した。
最小の actor guard と entry ごとの表示条件を加え、同じ assertion を GREEN にする。
Talk 説明の可視性には専用 `.scene-official-help` のみを使い、未承認の既存 compact UI を一括変更しない。

`guards City Hall history with controlled raw observations` は、会話後の100回相当の WAIT tail、locale / drawer / LOOK、古い到着報告でも Talk が戻らないことを確認する。
`guards City Hall input-scope with controlled raw observations` は Guided / Actions × EN / JA の main / companion busy、char、unknown room と在室根拠の失効、別 official、2051、RESTORE 不明、Simulation abort / re-entry、Part II、新 session、QA を確認する。
これらは実 interpreter を起動したうえで wrapper へ送る raw bridge report を制御するテストであり、自然経路や実 save の RESTORE 成功を示すものではない。
VM の状態は書き換えず、provenance を attachment に明示する。

初回 desktop Actions の実測では録画開始自体は成功したが、テストが CSS により大文字になった GridWindow `innerText` を小文字の literal と比較して失敗した。
Raw status / trace で確認し、recording の比較を大文字小文字に依存しないものへ直した。
原作の状態・出力や成功条件は変更していない。

## 検証結果と未観測事項

2026-10-26 UTC のローカル Chromium 実測。各経路で50回の line submission と起動1回の計51 request、起動 character / 最初の line input を含む52 input observations を照合した。
全6件で会話前後 recording、明示 OFF、退場後 LOOK の C5 不在、非録画の公園通常入力を確認し、full / auto-deactivation はなかった。

| 経路 / viewport | 原作日付 / 会話前 → 後 | 会話 input → 次 input | 公園 input | Story scroll top → end |
| --- | --- | --- | --- | --- |
| Classic / 1440×900 | `5/21/2041` / `12:51PM → 12:59PM`（8分） | `line-228 → line-231` | `line-247` | 4834 → 5478 |
| Guided / 1440×900 | `5/4/2041` / `12:56PM → 1:04PM`（8分） | `line-228 → line-231` | `line-247` | 5244 → 5631 |
| Actions / 1440×900 | `3/11/2041` / `12:44PM → 12:52PM`（8分） | `line-226 → line-229` | `line-245` | 5196 → 5585 |
| Classic / 390×844 | 原作に時計・日付なし、経過時刻は未観測 | `line-227 → line-230` | `line-248` | 8086 → 8679 |
| Guided / 390×844 | 原作に時計・日付なし、経過時刻は未観測 | `line-223 → line-226` | `line-242` | 8388 → 8708 |
| Actions / 390×844 | 原作に時計・日付なし、経過時刻は未観測 | `line-221 → line-224` | `line-240` | 8292 → 8600 |

Classic / Guided narrow では C2 と異なる `The sidewalks and street are crowded with people.` で終わる広場段落が出たため、leaf 全体を English・`lang=en` で保存した。
他の4経路では承認済み C2 の訳を確認した。
全6件で C4 / C5 / C6 の日本語、末尾の実文字、英日 owner の排他性と入力の保持を確認した。
別の非録画 Actions session は起動を含む49 request / 50 input observations、会話前後とも非録画（原作時計2:26PM→2:34PM）、補助推定3/9・政府職員課題未完了、公園通常 input `line-239` への復帰を確認した。
実装者は desktop / narrow の会話画像、Guided desktop と Guided / Actions narrow の Talk controls 画像を目視した。
Controls の画像で本文が古い読書位置を示すことはあり、現在の会話末尾の証拠は専用 conversation 画像 / reading JSON に置く。
この目視を、CI ZIP 全件の手動確認や独立レビューとは称さない。

初回 full suite は新規9件を含む15 passed / 2 failed の時点で停止した（18.0m、残り25件は未実行、進行中1件は interrupted）。
失敗2件は既存 Actions desktop / narrow が City Hall を未翻訳の地図ラベルとして期待していたためで、trace / snapshot の実際の表示は承認済みの「市役所、調査目的地」だった。
期待値を日本語・`lang=ja` へ更新し、未承認 Power Station の English / `lang=en` assertion を追加して fallback の保証を維持する。
同じ旧 selector を使う unknown-room narrow drawer の操作先も、承認済みラベルへ更新する。
テスト件数・経路・fallback の assertion は削除せず、全43件を再実行する。

新規9件だけで13.2mかかったため、従来15分の browser job 上限では既存34件と併せた検証が収まらない。
CI の browser job 上限を35分へ変更し、serial worker / retry 0 / assertion failure の job 失敗 / artifact 14日間保持は維持する。
修正後の最終検証は `npm run lint`、`npx tsc --noEmit`、`npm test`（build + 35 unit）、full `npm run test:e2e`（43件、retry 0）、checksum、`git diff --check` を対象とし、結果は提出 PR の検証欄に記録する。
初回の中断結果と修正後の full suite / current-head CI の結果を区別する。
Current-head CI / artifact と実期限は提出 PR を正本とし、過去の G1 / G2 の成功件数を今回の結果として扱わない。

390px の原作 status は時計・日付を出力しないため、その session の経過時間は未観測である。
Desktop の status 差や source 上の8分を narrow の実測として転記しない。
広場 C2 は G2 が承認した exact `lunchtime crowds` variant にだけ適用する。
別の crowd suffix / city interrupt が出た場合は leaf 全体を原文 English・`lang=en` で残し、隣の承認済み heading と混在できる。
未観測 variant を合成して翻訳や fixture に加えない。

Canonical SHA-256 は `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d` を維持する。
Story binary / `source/` / QA binary / dependencies / bridge protocol / renderer は変更しない。
原作内部の正式 assignment 評価、実保存データ RESTORE、未承認会話・時刻・別年の翻訳、実 screen reader 音声、本番配備との一致は対象外・未検証である。

Sol 通常レビュー後の Work handoff には reviewed head / base、以後の差分、未解決指摘、上記6経路の証拠と制限、同 head の CI / artifact・期限を含める。
最終締めでは review 回数・差し戻し理由・待ち時間を実行記録に残し、未計測の usage 削減を主張しない。
