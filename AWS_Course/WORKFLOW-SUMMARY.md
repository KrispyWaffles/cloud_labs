# SAA-C03 Study Workflow: Full Summary

A plain-language, end-to-end description of the course workflow. The operating rules
Claude follows are in `WORKFLOW.md` (the source of truth); this document explains the
whole system in one place.

**Version 2, 2026-10-15.** Supersedes the 2026-10-14 summary. What changed and why is in
section 10.

---

## 1. What this is

You're preparing for the **AWS Certified Solutions Architect - Associate (SAA-C03)** exam
on **2026-11-20**, using your employer's **Skillsoft Percipio** course (the SAA-C03
certification path), the labs in this repo, and the local exam guide.

The course is planned **one module at a time**. Each module's videos are grouped into
small **study blocks**. For each block you watch the videos, paste each transcript, then
run a short learning cycle: summary with a worked example, five scenario questions, a
bounded clarification, **one** application exercise, a brief reflection, and a confirmed
log entry. `AWS_Course/log.md` tracks everything you need to revisit.

## 2. Why it's built this way

- Lab 03 (NAT gateway) was completed successfully, but you couldn't explain the
  configuration afterwards. Following steps isn't understanding.
- So: purpose and a worked example come **before** questions, help is reduced gradually,
  and "assisted" is never recorded as "independent."
- The listed course time (30 h 25 min of courses plus 2 h 10 min of other items, 32 h
  35 min total) is video time only. Summaries, quizzes and exercises come on top.

## 3. Files and where they live

| File / folder | Role |
|---|---|
| `AWS_Course/WORKFLOW.md` | The rules (source of truth) |
| `AWS_Course/WORKFLOW-SUMMARY.md` | This document |
| `AWS_Course/log.md` | The tracker: revisit list, module plans, block results, per-question detail, exercises, later-in-course list, resume point, parked items, exam pacing, metrics |
| `AWS_Course/transcript-workflow-template.md` | Original CLF-C02 template, untouched |
| `AWS_Course/AWS_SAA_guide/` | The two exam-guide PDFs |
| `instructions.md` (repo root) | Repo-wide rules, with pointers to the workflow, `log.md`, and the exam date |
| `NN-topic/LAB.md` (repo root) | Claude's instructions and explanations for an exercise |
| `NN-topic/README.md` (repo root) | **Your own** account. Claude doesn't write or rewrite it |

Labs always live in the repo root as numbered folders (`01` to `10` exist; new ones start
at `11`), never under `AWS_Course/`.

## 4. The flow

```
 Module start:  you share the video list  ->  Claude plans the module ONCE
                                               (blocks, IDs, objectives, exam mapping)
      |
      v
 Per block:  watch video -> paste transcript -> "Received video 1 of 3: [title].
             Next: [title]."   (repeat; no summary or quiz yet)
      |
      v   "Block complete" / "Start review"
 [one due recall question, at the start of a session, if appropriate]
      |
      v
 Combined summary + worked example  (~5 min read)
      |
      v
 Five scenario questions, one at a time   (answer + brief reason)
      |
      v
 Targeted clarification  (bounded)
      |
      v
 One application exercise  (10 to 15 min, one observable result)
      |
      v
 Your reflection  (3 to 5 min, in your own words)
      |
      v
 "Log this block's results?"  -> only on yes
```

## 5. Step by step

### 5.1 Plan the module once

You provide a screenshot or list of the module's videos. Claude:
- Accounts for **every** video, each in exactly one block.
- Groups them into blocks: default **three** substantive videos, **two or four** when
  topic boundaries or complexity justify it. Short intros and wrap-ups join an adjacent
  block and don't count as substantive.
- Keeps course order unless there's a clear prerequisite reason (and says why).
- Gives each block a stable ID (e.g. `M03-B02`), the module title, the video titles, and
  **one** learning objective.
- Maps blocks to exam objectives **separately**, only where the local exam guide
  supports it. Never invents a mapping, and doesn't imply a course title proves complete
  coverage.
- Plans only the **current** module, and doesn't regroup without a concrete reason.

The plan is saved in `log.md` under **Module plans**.

### 5.2 Collect transcripts (no interruptions)

You watch one video, then paste its transcript before the next video.

- Claude identifies it from your title and the module plan, then replies with one line:
  **"Received video 1 of 3: [title]. Next: [title]."**
- **No summary, quiz or lab yet**, and paragraphs are not treated as separate videos.
- **Per-video check (added 2026-10-18), about 2 minutes:** Claude asks (1) "Without
  looking at the transcript or notes, what did you learn? Explain it in 1 to 3
  sentences," then, after your answer, (2) one targeted purpose question such as "What
  problem does [specific service or feature] solve?" One question at a time, brief
  feedback, one small hint if you're stuck. It stays within that video, flags leftover
  confusion for the block review, and adds no application question or summary.
- Claude asks a question **only** if the video's identity is genuinely unclear.
- When all transcripts are in, Claude says the block is **ready**. You start the review
  with "Block complete," "Start review," or similar.
- **Raw transcripts are never saved** to the repo. Summaries, notes, scores and exercise
  evidence are.

### 5.3 Session-start recall (at most one)

At the start of a **study session** (not each transcript, not each block), Claude asks
**one** delayed-recall question, before showing notes. It picks the revisit item most
relevant to what you're about to study. If you can't answer, Claude explains the gap
briefly, keeps it on the list, and moves on. **Old items never block unrelated
coursework.**

### 5.4 Combined summary and worked example

One summary per block, about **five minutes** of reading (ten is the cap, not the
target):

1. The problem these concepts solve
2. The main ideas and how they connect
3. One short worked example showing the reasoning
4. Important comparisons or exam distinctions
5. A 3-to-5-point recap

Plain language, acronyms expanded on first use, repetition removed. A diagram or table
only if it clarifies. Explains how requirements drive decisions (cost, availability,
security, performance, operational effort). Transcript content and supplemental
explanation are kept distinct, and consequential technical uncertainty is checked against
official AWS documentation, or flagged.

### 5.5 Five scenario questions

One at a time; no answers or hints before your first attempt unless you ask.

- Realistic scenarios needing application, comparison or troubleshooting, with plausible
  wrong options and enough information for a defensible answer.
- Single-answer and multiple-response where suitable, with **how many to select
  stated**. Positions vary naturally.
- Stays within the current block and concepts already covered.
- You give your answer **and a brief reason**. "Guessing" and "not sure" are fine.

**Feedback after each response:** correct or not, the **decisive requirement**, why the
tempting alternatives fail. Brief when your reasoning was sound; expanded only on a miss,
a guess, or a misconception. Analogies only when helpful.

**Scoring:** first-attempt score is kept separate from hints and retries.
Multiple-response is all-or-nothing, with partial selections explained. Flawed or
ambiguous questions are fixed or replaced, not held against you. **4/5 is a local review
threshold, not proof of mastery or exam readiness.**

### 5.6 Bounded remediation

| Situation | What happens |
|---|---|
| Understood the main concept, minor errors | Record them and continue |
| Missed a foundational concept | One targeted explanation, then one fresh check |
| Still unclear | Record the exact gap with a specific next action |
| The gap blocks safe or meaningful practice | Simplify or defer the exercise |

Never an automatic quiz restart, module repeat, or full lab rebuild.

### 5.7 One application exercise per block

Chosen in this order: (1) reuse part of an existing lab, (2) extend an existing lab by one
small taught capability, (3) create a new exercise only if none fits.

- About **10 to 15 minutes** including setup and cleanup, one clear objective, **one
  observable result**.
- Conceptual blocks get an architecture or troubleshooting exercise, **labelled
  accurately** (nothing implied as deployed).
- If setup would dominate, shrink it or use a design exercise. Never force an expensive
  deployment.

**Teaching sequence:** explain purpose and expected behaviour -> demonstrate the
reasoning with a small example -> **you predict** -> **you perform** -> verify from actual
evidence -> **you explain why** -> verify cleanup.

**Rules:** you operate AWS (Claude configures nothing in your account). Costs and
prerequisites are stated before any resource is created. Anything touching EC2, RDS or a
NAT gateway ends with the all-region billable-resource sweep. Destructive cleanup stays
with you. Larger integration labs come only at natural module milestones, use concepts
already practised, and get their own session.

### 5.8 Your reflection (3 to 5 minutes)

You write the lab `README.md` in your own words, answering: **Goal, Action, Evidence,
Understanding** (what happened, why, and what's still unclear). Claude asks questions,
flags inaccuracies and suggests corrections, and you do the wording.

### 5.9 Confirmed logging

Claude asks **once**: "Log this block's results?" On yes, `log.md` gets:

- Block ID and video coverage
- First-attempt quiz score
- Missed, guessed or assisted concepts
- Exercise status and evidence location
- Independence level
- Next review action
- Approximate time spent, if known

Existing revisit rules and history are preserved. A concept is not marked as understood on
a later day unless it actually was.

## 6. Evidence levels (tracked separately)

| Level | Meaning |
|---|---|
| Completed and verified | Exercise done, result verified from real output |
| Explained with assistance | You explained why it happened, with hints or prompting |
| Demonstrated independently | You chose the steps and explained the reasoning unaided |

Assisted completion is valid progress, but it is never labelled independent mastery, and
generated instructions are never completion evidence.

## 7. Keeping scope under control

- Stay inside the current block and concepts already covered.
- When a later topic appears: name its upcoming lesson if known, explain only the minimum,
  put the rest on **Later in the course** in `log.md`, and continue.
- A missing prerequisite gets a ~2-minute explanation. If it needs more, name the
  dependency and simplify the activity rather than silently expanding the session.
- Not added by default: extra services, frameworks, full applications, flashcards,
  duplicate summaries, unrelated projects.

## 8. The revisit list

First section of `log.md`. Statuses are unchanged:

| Status | Meaning |
|---|---|
| Open | Missed and not yet recalled correctly |
| Reviewing | Right once after a miss, or right with a hint. Needs one more clean recall on a different day |
| Solid | Recalled correctly twice, on different days, without hints |

A repeat miss on a Solid item returns it to Open. Every item has a concrete next action.
The 9 items seeded on 2026-10-14 (NAT path, inbound vs outbound, the `local` route, most
specific route wins, prefix size vs block size, the CIDR off-by-one and calculator traps,
subnet distinctness, resource ownership) are preserved exactly as they were.

## 9. Pacing and exam preparation

- A normal block is roughly **45 to 70 minutes**, an estimate. Dense or troubleshooting
  material can take longer, and blocks can be split across sessions.
- **Pilot the first two blocks**, then estimate the rest from actual time and progress.
- **Exam: Nov 20, 2026.** Provisional first-pass finish **Nov 7 to 10**, leaving time for
  mixed practice and weak-area review. From 2026-10-15 that's 23 to 26 days to the
  first-pass target and 36 days to the exam. If the observed pace makes it unrealistic,
  the gap is shown honestly in `log.md` under **Exam pacing**.
- **At the end of each module:** Percipio's built-in test, review of missed and guessed
  concepts, fresh mixed questions only where needed, and delayed recall.
- **Before the exam:** check coverage against the exam guide and use broader practice
  assessments. Finished videos, repository activity, or a few generated questions are not
  evidence of readiness.

## 10. What changed from the 2026-10-14 version

| Before (2026-10-14) | Now |
|---|---|
| Course named as AWS Skill Builder | **Skillsoft Percipio** |
| Paste a section, get a summary and quiz right away | Plan the module once, then collect transcripts one video at a time with a one-line acknowledgement |
| One summary per pasted section, under 3 min | One combined summary per block, about 5 min (10 max), with a worked example |
| 5 questions; feedback always had a fixed 3-part layout | 5 questions; answer **plus reason**; feedback brief when sound, expanded on misses, guesses and misconceptions |
| Pass at 80% | 4/5 as a local review threshold, first attempt scored separately from hints |
| Quiz then a lab (any size) | Bounded remediation, then **one 10 to 15 minute exercise per block** |
| Recall question before every summary | At most one per **study session**, and old items can't block new work |
| Log a lesson | Log a **block** once, with independence level, evidence location, time, and next review action |
| (not tracked) | Later-in-course list, resume point, parked items, exam pacing, three evidence levels |
| Exam date not recorded | 2026-11-20, with a provisional Nov 7 to 10 first-pass target |

**Kept:** the original CLF-C02 template, all scores and the 9 seeded revisit items,
progress history, lab folders and numbering, the learner-written lab READMEs, the AWS
access and cost-safety rules, and the commit/push arrangement (commits when you ask;
pushing is yours).

**Reconciled:** the earlier "explain like to a 12-year-old" standard stays as a **plain
language** standard. It no longer forces an analogy and a three-part explanation on every
answer.

## 11. Current state (as of 2026-10-15)

- Workflow files updated and consistent (`WORKFLOW.md`, this summary, `log.md`,
  `instructions.md`, `PROGRESS.md`).
- **No module is planned yet.** The next step is for you to share the first Percipio
  module's video list (a screenshot or a list).
- **No block, score or exercise has been logged.** `log.md` still shows 0 blocks, and no
  AWS resources were created by this update.
- The Domain 1 review transcript pasted on 2026-10-14 is **parked** in `log.md`: not
  summarised, quizzed or logged, and the raw text was not saved.
- The nine revisit items are unchanged. The NAT item remains Open and doesn't block
  anything.
- Git: these changes are uncommitted, so review the diff first.
