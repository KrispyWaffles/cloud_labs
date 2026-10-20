# Transcript → Lesson Breakdown Workflow Template

> The exact, locked-in format Claude follows every time a CLF-C02 video transcript is
> pasted. Canonical copy of this lives in `study-notes.md`'s "YOUR ROLE" section — this
> file is a standalone, shareable copy of the same template.

---

## Step 1 — Lesson Summary (posted immediately, same message)

```markdown
## LESSON TITLE & NUMBER
L## — Topic Name, Section Name (e.g. "Cloud Technology & Services")

## CORE CONCEPT
One sentence. What is this lesson actually about?

## KEY POINTS
- 5 bullet points max. Only exam-relevant facts. No tables, no explanations.
- Spell out every acronym in full on first use, e.g. "NACL (Network Access Control List)".

## EXAM GOTCHAS
- 3 bullet points max. Tricky stuff AWS likes to test. One line each.

## FLASHCARDS
1. Q: ... A: ...
2. Q: ... A: ...
3. Q: ... A: ...
4. Q: ... A: ...
5. Q: ... A: ...
```

Then a horizontal rule (`---`), then the line `Quiz — 5 questions, one at a time.`, then
Q1 immediately — no pause between the summary and the first question.

## Step 2 — Quiz (one question at a time)

```markdown
**Q1.** Question text here?

A) Option
B) Option
C) Option
D) Option
```

Wait for the answer, then respond with exactly one of:
- `Correct — X) [answer text].` + one sentence of reinforcement/context.
- `Not quite — the answer is **X) [answer text]**.` + one sentence explaining why,
  contrasting with the wrong pick if useful.

Never reveal the answer before a response is given. Repeat for Q2–Q5.

**Answer-position rule:** distribute the correct answer across A/B/C/D — don't cluster it
on A.

## Step 3 — Score & Tracking

```markdown
## SCORE: X/5 — XX% [✅ Pass | ⚠️ Needs Review]
```
(✅ Pass at 80%+, ⚠️ Needs Review under 80%)

If anything was missed, name the specific concept in one line (tie it to an existing weak
spot if it's a repeat miss, otherwise flag it as new). Then end with:

```
Log this as L## and update the running metrics?
```

**Do not write to the tracking files until the user says yes.** If several lessons stack
up unconfirmed, ask about all of them together rather than repeating the question per-lesson.

## On Confirmation — Update BOTH Files

- `study-notes.md` — lesson score row, running metrics, weak spots if missed. Stays
  summary-only by design.
- `quiz_history.md` — the full per-question detail (question, answer given, correct
  answer, ❌/✅), in the same table format as its existing entries, under the current
  course section. Also bump its own Running Metrics table at the bottom to match.

Never update one file and skip the other.

---

## Rules

- No long paragraphs
- No repeated information
- No "Things to Remember" sections that repeat what's above
- Total reading time before the quiz = under 3 minutes
- If score is under 80% → flag weak spots immediately
- Track ALL scores in the running log
- Spell out acronyms in full in all study material (summaries, flashcards, glossaries,
  weak-spot notes) — exception: quiz questions/answers stay exam-terse
- Vary the correct answer's position across A/B/C/D — don't default to A repeatedly
- Confirm before logging a score/lesson to the tracking files — never write silently
