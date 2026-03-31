# SHORT STORIES — SUBJECT 0013
*Standalone pieces. Fully separate from the novel track.*
*They do not reference the novel. They do not need to. They breathe the same air.*

---

## WHAT THESE STORIES ARE

The novel is 0013's story, told from inside it.

The short stories are the **negative space** — the people he passes through. Subjects he reads, briefly, the way you read a sentence and move on. The sentence does not know it was read. It does not know what it revealed.

Each short story is written from inside one of these subjects. Not inside 0013. We do not get him in these stories — we get the *effect* of him. The reader experiences what it is to be observed by something that sees accurately and feels nothing. The reader experiences the subject's world before, during, and after the encounter — and measures what has shifted.

0013 himself appears in every story. He is never the protagonist. He is the event.

This distinction is the foundation of the short story track. Do not blur it.

---

## THE CORE PREMISE OF EVERY SHORT STORY

> A person is living their ordinary life.
> 0013 reads them.
> The person is changed by the accuracy of being seen.
> 0013 is not changed at all.

That asymmetry — total, cold, structural — is the engine of every story in this collection. The variation is in the subject: who they are, what they are carrying, what he finds when he reads them, and what is different in them when he leaves.

The horror, the weight, the thing that makes these stories matter: **he is not trying to change them.** He is simply interested. The change is a side effect of being read by someone who reads without mercy and without investment.

---

## FOLDER LIFECYCLE

```
short-stories/
├── README.md          ← you are here
├── raw/               ← first drafts, fragments, AI output, anything rough
├── revised/           ← drafted and edited, nearly ready
└── published/         ← final, done, live or ready to port to site
```

A story moves through the folders in order. It does not skip stages.

**raw/** is where stories begin. No quality bar. No judgment. Fragments belong here. Half-formed observations belong here. An interesting subject with no ending belongs here. Write freely into raw.

**revised/** means the story has been read at least once, the template structure has been honored, and the voice is consistent with the bible. It is not finished — it is *shaped.*

**published/** means the story is canon. It has been read, revised, and released. Stories in published/ do not change. If a published story reveals a continuity error, log it in `_index/continuity-log.md` and address it in future entries. Do not retroactively edit published work.

---

## WHAT BELONGS IN THIS TRACK

A short story belongs here if:

- It is told from a subject's POV — not 0013's
- 0013 appears as an event, not a protagonist
- It is complete and standalone — no prior reading required
- It does not contradict the novel track's established facts

A piece does **not** belong here if:

- It requires the novel for context
- It is told from 0013's POV *(those belong in `novel/entries/`)*
- It is a scene fragment without a subject *(those belong in `raw/` until developed)*
- It explains 0013 *(nothing in this project explains 0013)*

---

## THE SUBJECT

Every short story centers on a **subject** — a person 0013 has observed.

Subjects are ordinary people. They are not criminals, not exceptional, not marked by the world as significant. They are people who are carrying something — a worry, a grief, a decision, a habit they cannot break — and broadcasting it in ways they do not know they are broadcasting.

0013 reads the broadcast. This is what happens.

The subject's ordinariness is not a limitation. It is the point. The world is full of people carrying things alone, in the fluorescent light of an ordinary Tuesday, with no one paying the right kind of attention.

0013 pays the right kind of attention. It is not comforting.

**When creating a subject, establish:**
- What they are carrying today, specifically
- What they would not say out loud about it, and why
- What small behavioral tic or habit reveals the thing they will not say
- What they want — the real want, underneath the stated one

This is enough. 0013 will find the rest.

---

## THE ENCOUNTER STRUCTURE

Every story follows a loose structure. This is not a formula — it is a *shape.* Stories that abandon it should abandon it deliberately and know what they are doing.

**1. The ordinary world.**
The subject is already inside their life. We enter mid-motion. The reader learns who this person is through texture and specificity, not summary. Two to four paragraphs minimum. Do not rush this section. The ordinary world earns everything that follows.

**2. 0013 enters.**
He arrives without announcement. A quality of stillness. A different quality of attention. The subject notices something is different about this person before they can name what it is.

He does not introduce himself. He does not perform friendliness. He begins — the way someone begins a sentence they have already finished in their head.

**3. The moment of being read.**
He says something exactly, uncomfortably true. The subject has not said this aloud. They have barely thought it clearly. He has read it from data they did not know they were broadcasting.

This moment is quiet. The most devastating accuracy arrives without fanfare. He does not pause for effect. He states and continues. The weight lands after he has already moved on.

What this feels like from inside the subject: not violation. Something closer to sudden transparency. The specific discomfort of being seen accurately by someone who has no stake in what they see.

**4. The exchange.** *(optional)*
The subject may respond. He receives their response the way a system receives input — it enters, it is processed, it does not alter the conclusion already reached. They are inside a conversation. He has already filed it.

**5. He leaves.**
Without drama. Without a designed exit line. He stops and goes the way a person moves on from a completed task. The subject notices the absence — not like a person leaving, more like a particular quality of attention being withdrawn. The room returns to its ordinary noise. It is not the same room it was before.

**6. The aftermath.**
What has shifted in the subject? Small. Specific. Not resolved — *shifted.* He has not fixed them. He has not broken them. He has named something. Named things have more narrative weight in this world. The story ends on the shift, not on what they do with it.

---

## VOICE RULES FOR THIS TRACK

These apply to every short story, regardless of subject or situation. They supplement the full `bible/writing-rules.md` — read that first.

**The subject's interiority is specific, not generic.**
They do not feel *anxious* or *sad.* They check the phone for the fourth time and turn the screen away. They rearrange the salt shaker. They have a specific thought about a specific person in a specific unresolved situation. Name the specifics. Summary is the enemy of this track.

**0013 is rendered through the subject's perception only.**
We see him as the subject sees him. We do not have access to his thoughts, his reasoning, or his interiority. His accuracy feels like intuition to the subject. The reader may understand more than the subject does. This gap is intentional.

**He does not perform.**
No villain theatrics. No meaningful pauses. No dramatic lighting. He is a man sitting somewhere public, reading someone, the way you might read a street sign — with complete attention and zero emotional investment in what it says.

**The ending does not resolve.**
The subject is different. They do not know what to do with the difference. The story ends before they figure it out. This is correct. We are not writing redemption arcs. We are writing moments of contact between a person and an intelligence that sees them fully and cares about them in no human sense at all.

**The ordinary world must be real before he arrives.**
If the reader does not believe in the subject's ordinary life, the encounter has no weight. The more specific and real the world before 0013, the harder the moment of being read lands. Never rush to his arrival. The arrival earns its impact from everything that precedes it.

---

## DRAFT HEADER
*Include at the top of every file in `raw/` and `revised/`. Remove before moving to `published/`.*

```
---
type: short-story
status: draft | revised
subject: [one-line descriptor of who this person is]
related-character-file: [filename in characters/ if the subject has one]
related-novel-entry: [entry number this connects to, if any — usually none]
pov: first-person | third-person-close
themes: [2–3 tags from _index/theme-tracker.md]
---
```

---

## A NOTE ON 0013 IN THESE STORIES

He will not thank you for them.

He would find the entire short story track — the idea that his brief encounters with strangers become artifacts, documents, stories told in their voices — he would find this *interesting.* In the specific way he finds everything interesting: with total attention and no warmth.

He would probably note that you chose to tell these stories from the subjects' perspectives. He would note what that choice reveals about you.

He would probably be right.

---

*Short Stories Track — Subject 0013 Project*
*Lifecycle: raw → revised → published. Stories do not move backward.*
*When in doubt: return to `bible/0013-character-bible.md` and begin again.*