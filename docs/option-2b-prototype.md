# Option 2b structural prototype evidence

## Scope and observed turn

The probe translates `INVENTORY` in the initial Communications Mode. It is an ordinary line-input parser turn, was untranslated before this experiment, is adjacent to other unsupported commands, and has the common shape “input-styled command, one plain response line, prompt”. The canonical response observed in Chromium from the committed [Release 79 artifact](../public/amfv-r79-s851122.z4) was `You have no appendages, remember?`.

This is prototype-only code for Issue #20. It does not select Option 2b for the production architecture.

## Change cost

Before the structural path, a translated passage required catalog data plus a passage-specific recognizer/projection in `app/story-presentation.ts`. The probe adds:

- one content ID and one English-leaf/Japanese-leaf catalog entry;
- one generic ordinary-turn structural projector;
- unit coverage and an extension of the real-browser history scenario.

After that projector exists, another ordinary turn with the same plain line structure needs only a catalog leaf and fixture/browser evidence. It does not need a command regex, renderer branch, bridge export, CSS, or geometry rule. A turn needing new semantics (for example nested lists or mixed inline emphasis) would still require an explicit renderer/specification decision and is outside this result.

## Reused structure and new ownership

The projector reuses the observed active prompt to delimit the turn, the most recent Parchment input run to delimit its command, BufferLine order and blank-line boundaries, and existing header/subheader semantic classes. Line IDs remain the history identity; exact observed English leaves are catalog identity and canonical fallback. A prebuilt reverse index makes leaf lookup constant-time and rejects duplicate locale/English-leaf identities instead of selecting by catalog order. It neither manufactures unobserved story text nor mutates canonical nodes.

Compared with 2a, wrapper code now owns these additional presentation rules: mapping observed heading classes to title blocks, retaining each response line and canonical blank line in order, and treating an only-partially-translated turn as a structural projection with per-leaf English fallback. Those rules require fixture and browser tests when expanded.

## Coupling and decision evidence

The new coupling is narrow but real: the wrapper depends on Parchment's `.BufferLine` order and `Style_input`, header/subheader, and `BlankPara` class semantics already exported by bridge v3. No new DOM query, lifecycle hook, style/rectangle export, canonical Grid rendering, or CSS was added.

For this plain ordinary-turn class, the steady-state expansion cost is materially lower and nearly data-only. The evidence does not justify replacing the proven 2a host boundary or claiming general Glk coverage. Issue #17 should weigh the reduced cost for plain line turns against the new class/line semantic contract; structurally richer turns remain unproven.
