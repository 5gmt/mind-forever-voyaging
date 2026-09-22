# Issue #48 — 9-item brief / security prompt narrow projections

This implementation is grounded only in the two fresh-browser, canonical Release 79 observations committed by Issue #47. It adds two specialized projections, not a general `GridWindow`, list, or active-input renderer.

## Accepted identities

### Recording-assignment packet

The packet is recognized only on bridge-v3 ordinary line input after the canonical `WAIT` echo. Its identity is the exact observed introduction, the exact nine assignment leaves in canonical order, and the exact real-time explanation immediately after them. The projector preserves every surrounding observed prose and blank-line block, but replaces those nine source lines with one semantic unordered-list block. It deliberately reads the raw leaf before whitespace cleanup establishes the boundary; indentation is not asked to survive as presentation data.

If an item is missing, reordered, changed, or added before the exact closing leaf, the specialized projection returns no result. The ordinary leaf projector also declines assignment-like packets, so history falls back to the original-English canonical turn instead of partially translating or flattening an unknown packet.

### Active-input security prompt

The prompt is recognized only as the two-line bridge-v3 `ENTER SIMULATION MODE` observation in which the terminal line owns one empty Parchment `textarea`. Identity is the exact canonical shell plus a canonical decoder color and inner number from Release 79's finite tables. Run count, wrapping newlines, layout values, geometry, and computed style are ignored.

The story block stores the static shell separately from `{ color, innerNumber }`. It has no field for the derived outer answer. The host's existing active-prompt presentation and command form continue to represent and submit canonical line input. Classic therefore exposes no computed answer; assisted modes may still show and send the answer only through the existing command-deck decoder.

An unknown color, inner number, shell, command, input owner, extra line, or completed input fails closed. Security-like turns are excluded from the ordinary leaf projector, leaving the original-English canonical surface rather than a partial localization.

## Preserved boundaries

- Detection continues to consume raw canonical English bridge output; neither projection uses localized text as state.
- The canonical interpreter, parser commands, line-input ownership, history identity, locale recovery, and `RESTORE` behavior are unchanged.
- The localized host remains the sole accessible story surface while active; Parchment's canonical buffer is restored on fallback. No duplicate input, `GridWindow` bridge, geometry identity, computed-style mirroring, or outer-answer story output was introduced.
- Japanese copy and complete Simulation Mode browser integration remain follow-up work.
