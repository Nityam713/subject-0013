# Content — master map

Single source of truth for Subject-0013 writing. The live site reads from `frontend/js/data/`; this tree is for canon, drafts, and generation.

---

## Folder tree

```
content/
├── README.md                          # master map + AI reading order
├── bible/                             # unchanging foundation
│   ├── 0013-character-bible.md
│   ├── world-mechanics.md
│   ├── writing-rules.md
│   └── conflict-and-stakes.md
├── characters/                        # people, tiered by narrative weight
│   ├── README.md
│   ├── tier-1/
│   ├── tier-2/
│   └── tier-3/
├── novel/                             # main journal track
│   ├── arc-overview.md
│   ├── phases/
│   └── entries/
├── short-stories/                     # standalone pieces
│   ├── README.md                      # track rules, voice guide, lifecycle
│   ├── published/
│   ├── revised/
│   │   └── README.md                  # AI revision rules — read before revising any story
│   └── raw/
│       └── README.md                  # what raw is, how to file, revision brief format
├── templates/                         # schemas and forms
│   └── short-story-template.md        # full encounter structure template
└── _index/                            # cross-reference
    ├── character-appearances.md
    ├── theme-tracker.md
    └── continuity-log.md
```

---

## AI reading order

1. `bible/0013-character-bible.md` — always first; contains concept, themes, character
2. `bible/writing-rules.md` — voice, forbidden moves, failure modes
3. `bible/world-mechanics.md` — narrative ontology, institution, meta-layer
4. `bible/conflict-and-stakes.md` — active conflicts, what each character stands to lose
5. `characters/README.md` — tiers + filing rules
6. Relevant `characters/tier-*/` files for whoever appears
7. `novel/arc-overview.md` — full shape of the narrative before writing any chapter
8. Current `novel/phases/` file for the phase being written
9. `_index/continuity-log.md` before contradicting established facts
10. `short-stories/README.md` — before writing or editing any short story
11. `short-stories/raw/README.md` — before filing a raw draft
12. `short-stories/revised/README.md` — before revising any story
13. `templates/short-story-template.md` — before drafting a new short story

When templates return, read them after bible and before changing `frontend/js/data` shapes.

---

## Tracks

| Track | Lives in | Notes |
|-------|-----------|--------|
| Novel (journal) | `novel/` | 0013's voice, arc in `phases/`, chapters in `entries/` |
| Short stories | `short-stories/` | POV of subjects 0013 observes; lifecycle: `raw/` → `revised/` → `published/` |

These tracks share `bible/` and `_index/`; in-universe they do not reference each other unless you decide otherwise.