# Issue #48 — 9-item brief / security prompt narrow projections

This implementation is grounded only in the two fresh-browser, canonical Release 79 observations committed by Issue #47. It adds two specialized projections, not a general `GridWindow`, list, or active-input renderer.

## Accepted identities

### Recording-assignment packet

The packet is recognized only when the latest command in a bridge-v3 rolling observation is the canonical `WAIT` echo. Its identity is the exact observed introduction, the exact nine assignment leaves in canonical order, their three leading spaces and single `Style_normal` span runs, and the exact real-time explanation immediately after them. The projector preserves every surrounding observed prose and blank-line block in that turn, but replaces those nine source lines with one semantic unordered-list block. Raw identity is established before display cleanup; indentation is then represented by the semantic list rather than copied into its item text.

If indentation or a run boundary changes, or an item is missing, reordered, changed, or added before the exact closing leaf, the specialized projection returns no result. The ordinary leaf projector also declines assignment-like packets, so history uses its existing canonical-English host fallback instead of partially translating or falsely presenting a semantic list. That fallback is English but intentionally normalized into the history pipeline's prose block; it does not restore the unflattened Parchment buffer.

### Active-input security prompt

The prompt is recognized only when the latest turn in a bridge-v3 rolling observation consists of `ENTER SIMULATION MODE` followed by a terminal line owning one empty Parchment `textarea`. Earlier retained turns are ignored. Identity is the exact canonical shell plus a canonical decoder color and inner number from Release 79's finite tables. Run count, wrapping newlines, layout values, geometry, and computed style are ignored.

The story block stores the static shell separately from `{ color, innerNumber }`. It has no field for the derived outer answer. The host's existing active-prompt presentation and command form continue to represent and submit canonical line input. Classic therefore exposes no computed answer; assisted modes may still show and send the answer only through the existing command-deck decoder.

An unknown color, inner number, shell, command, input owner, extra current-turn line, or completed input fails closed. Security-like turns are excluded from the ordinary leaf projector, leaving the existing normalized canonical-English history fallback rather than a partial localization.

## Preserved boundaries

- Detection continues to consume raw canonical English bridge output; neither projection uses localized text as state.
- The canonical interpreter, parser commands, line-input ownership, history identity, locale recovery, and `RESTORE` behavior are unchanged.
- The localized host remains the sole accessible story surface while active, including canonical-English history fallback. Parchment's canonical buffer is restored only for observations the history pipeline cannot represent. No duplicate input, `GridWindow` bridge, geometry identity, computed-style mirroring, or outer-answer story output was introduced.
- Japanese copy and complete Simulation Mode browser integration remain follow-up work.
