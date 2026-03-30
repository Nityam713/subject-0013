# Legacy: site observation feed template

Use for **Recent Observations** / `js/data/observations.js` style snippets.

---

# Whynot Observation Template

Use this for short-form entries in **Recent Observations**. Keep each note brief, factual, and clinical.

```txt
id: obs-2026-03-27-01
date: "2026-03-27"
time: "22:14"                         # optional
severity: "Nominal"                   # Nominal | Elevated | Critical
tag: "Learning"                       # Career | Health | Learning | Money | Relationships
status: "Open"                        # Open | Logged | Resolved
note: "Subject delayed execution by 3 hours due to over-analysis."
signal: "Latency spike in decision loop."   # optional short technical cue
linkedCaseSlug: "leaving-stable-role"       # optional
```

## Usage Guidelines

- Keep `note` to one sentence (preferred max: ~110 chars).
- Use severity consistently:
  - `Nominal`: expected variance
  - `Elevated`: measurable drift
  - `Critical`: immediate intervention needed
- Add `linkedCaseSlug` when this observation should point to a full post.
- If no exact time is needed, skip `time` and keep only `date`.

## Quick Example

```txt
id: obs-2026-03-27-02
date: "2026-03-27"
severity: "Elevated"
tag: "Career"
status: "Logged"
note: "Commit quality dropped after context switching beyond 4 tasks."
signal: "Cognitive fragmentation detected."
linkedCaseSlug: "leaving-stable-role"
```
