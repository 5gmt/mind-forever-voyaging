# Localization presentation boundary

## Decision

The production localization architecture combines the two boundaries evaluated
in Issues #17, #18, and #20:

- **Option 2a remains the host boundary.** The localized reading surface is a
  separate host inside Parchment's live `BufferWindow`.
- **Option 2b is the ordinary-turn structure boundary.** Plain line-input turns
  may be projected from the observed `BufferLine` order, input runs, blank-line
  boundaries, and existing header/subheader classes.

This decision is based on the real-browser lifecycle, layout, scrolling, focus,
and accessibility evidence from PR #19 and on the runtime-observed `INVENTORY`
turn evaluated in [the Option 2b prototype](./option-2b-prototype.md) in PR #21.
It does not claim that every Glk layout can use the ordinary-turn projector.

## Runtime and observation authority

The canonical Release 79 interpreter remains authoritative for game state,
parser behavior, transcript, status, and input state. State recognition and
history derivation operate on the raw English output observed from that
interpreter. Localized text is presentation output only: it is never returned
to state detection, and parser commands sent to Parchment remain English.

The wrapper does not manufacture story output or mutate canonical story nodes.
If it cannot safely recognize or translate observed output, that output remains
available as the original observed English. A partially translated structural
turn similarly falls back to English independently for each untranslated leaf.

## Window, chrome, and lifecycle ownership

Parchment owns the `GridWindow`, the `BufferWindow`, `.BufferWindowInner`, the
window chrome, canonical input, and replacement of canonical window children.
The wrapper does not mirror Buffer/Grid rectangles, reproduce the canonical
Grid renderer, or take ownership of Parchment's DOM lifecycle.

The wrapper owns its localized host inside the live `BufferWindow`, the semantic
Japanese projection rendered there, Japanese typography, and scrolling of that
localized reading surface. When Parchment replaces `.BufferWindowInner` or its
children, the wrapper reconnects its persistent host from the observed
lifecycle report, refreshes accessibility ownership, and fails closed to the
canonical surface if a safe localized host is not available.

## Projection priority and ordinary-turn reuse

Specialized projections have priority. The opening, initial tableau, `LOOK`, and
any future output with passage-specific semantics are recognized and projected
before the generic ordinary-turn path is considered.

The generic path is limited to plain ordinary line-input turns. It uses the
active prompt to delimit the current turn, the most recent Parchment input run
to delimit the command, and observed `BufferLine` order and blank lines to retain
the response structure. It may map already exported header/subheader classes to
the corresponding semantic presentation blocks. It activates only when the
turn is safely delimited and at least one response leaf has a translation.
Structurally richer output, including semantics that cannot be preserved by
these rules, requires a specialized projection and explicit fixture/browser
evidence rather than an implicit extension of the generic renderer.

## History, scrolling, and recovery

Observed line IDs remain the presentation-history identity. Canonical timeline
boundaries such as `RESTORE` invalidate display entries from the previous
timeline; localized history must not make those entries appear current.

Japanese mode owns the localized surface's reading position. When localized
presentation is unavailable or the canonical surface must be restored, recovery
uses the observed semantic/line relationship to restore the corresponding
canonical scroll position instead of treating two independent pixel offsets as
equivalent. The interpreter and canonical surface remain usable throughout the
fallback.

## Observed-leaf catalog identity and limitation

For the ordinary-turn path, catalog identity is currently the exact English
leaf observed at runtime. The same leaf is also the canonical per-leaf fallback;
catalog order is never used to resolve duplicate meanings. A reverse index
rejects duplicate locale/English-leaf identities rather than selecting one
arbitrarily.

This identity cannot represent two context-dependent Japanese translations for
identical English leaves. When that case is observed, the translation must use
a narrower identity containing the required turn, passage, or line context, or
the output must take a specialized projection path. Broad translation expansion
must not work around the ambiguity by relying on catalog order.

## Rejected and deferred alternatives

- **Option 1 remains an isolation/control baseline, not the selected design.**
  Returning to an outer, independently laid-out localized surface would give up
  the chrome and window reuse already shown viable by Option 2a without current
  correctness evidence requiring that tradeoff.
- **Option 3 remains an escape hatch.** A semantic clone of the `GridWindow`
  renderer would add substantially more ownership and coupling. It should be
  reconsidered only if the simpler host boundary fails against concrete browser
  evidence.
- **General Option 2b projection is deferred.** One representative plain turn
  demonstrates materially lower, nearly data-only expansion cost for that turn
  class. It does not establish safe projection rules for richer turns or general
  Glk output.

## Consequences and preserved guarantees

New plain-turn translations can usually be catalog additions once their runtime
shape and browser behavior are evidenced. New semantics still require a narrow
recognizer/projection decision and corresponding tests. Changes to translation
coverage, observation contracts, history/recovery behavior, and window/layout
ownership remain separate reviewable concerns when practical.

The decision preserves the canonical story artifact, canonical runtime
authority, raw-English observation, English parser commands, per-leaf English
fallback, canonical input usability, and the established accessibility and
reading-preference behavior.
