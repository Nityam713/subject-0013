# Content — master map

Single source of truth for Subject-0013 writing. The live site reads from `js/data/`; this tree is for canon, drafts, and generation.

---

## Folder tree

```
content/
├── README.md                          # master map + AI reading order
├── bible/                             # unchanging foundation
│   ├── 0013-character-bible.md
│   ├── world-mechanics.md
│   └── writing-rules.md
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
│   ├── README.md
│   ├── published/
│   ├── revised/
│   └── raw/
├── templates/                         # schemas + blank forms
│   ├── content-schema.md
│   ├── novel-entry-template.md
│   ├── short-story-template.md
│   └── character-file-template.md
└── _index/                            # cross-reference
    ├── character-appearances.md
    ├── theme-tracker.md
    └── continuity-log.md
```

---

## AI reading order

1. `bible/0013-character-bible.md` — always first  
2. `bible/writing-rules.md` — voice, forbidden moves  
3. `bible/world-mechanics.md` — narrative ontology  
4. `characters/README.md` — tiers + filing rules  
5. Relevant `characters/tier-*/` files for whoever appears  
6. `novel/arc-overview.md` + current `novel/phases/` file for journal chapters  
7. `_index/continuity-log.md` before contradicting established facts  
8. Matching file under `templates/` for the format being written  

---

## Tracks

| Track | Lives in | Notes |
|-------|-----------|--------|
| Novel (journal) | `novel/` | 0013’s voice, arc in `phases/`, chapters in `entries/` |
| Short stories | `short-stories/` | Other perspectives; lifecycle: `raw/` → `revised/` → `published/` |

These tracks share `bible/` and `_index/`; in-universe they do not reference each other unless you decide otherwise.
