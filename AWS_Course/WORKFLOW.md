# SAA-C03 Study Workflow (Skillsoft Percipio + hands-on labs)

The working agreement for the SAA-C03 course sessions. Claude reads this file, and the
revisit list in `log.md`, at the start of a course session. Adapted from
`transcript-workflow-template.md` (the CLF-C02 original, kept untouched as reference).

**Version 2, 2026-10-15.** Replaces the 2026-10-14 version, which assumed AWS Skill
Builder and one 5-question quiz per pasted section. The course is **Skillsoft
Percipio**; work is now planned per module and run per *block* of videos.

---

## 0. Context and targets

| Item | Value |
|---|---|
| Exam | AWS Certified Solutions Architect - Associate (SAA-C03) |
| Exam date | **2026-11-20** (keep unless the learner explicitly changes it) |
| Course | Skillsoft Percipio, SAA-C03 certification path |
| Listed course duration | 21 courses = 30 h 25 min, plus 3 other items = 2 h 10 min (32 h 35 min total). **Listed video time, not total study time.** |
| Background | Passed Cloud Practitioner. JavaScript / full-stack experience. Use it to explain a concept when it helps; don't introduce application development. |
| First-pass target (provisional) | Finish the course around **Nov 7 to 10**, leaving time for mixed practice and weak-area review |
| Exam guide | `AWS_Course/AWS_SAA_guide/` |

Goals: understand concepts and make sound architecture decisions; prepare for
scenario-based questions; apply concepts hands-on; build honest, explainable evidence in
the repo.

**Why the process looks like this:** lab 03 (NAT gateway) was completed successfully
without understanding the configuration. Purpose, worked examples and gradually reduced
help come before questions the learner hasn't been prepared to answer. A completed
configuration is not evidence of understanding.

## 1. Principles

- **Understand, then apply.** Purpose and a small worked example before steps and before
  questions.
- **Bounded.** One module planned at a time, one exercise per block, no automatic
  restarts. Missing a concept never means redoing the whole block or lab.
- **Honest evidence.** Assisted work is valid progress but is never labelled independent
  mastery. Generated instructions are not completion evidence.
- **Practical.** Learn, apply, explain, verify, document, continue.
- **Nothing is logged without confirmation**, and nothing is recorded as done that wasn't.

## 2. Plan each module once

At the start of a module the learner provides a screenshot or list of its videos. Claude
plans **that module only**.

1. **Account for every video.** Each one lands in exactly one block.
2. **Group into coherent study blocks.**
   - Default: three substantive videos.
   - Two or four when topic boundaries or complexity justify it.
   - Short introductions and wrap-ups join an adjacent block and don't count as
     substantive videos.
   - Keep course order unless there's a clear prerequisite reason to suggest otherwise
     (and say why).
3. **Give each block**: a stable ID (`M03-B02` = module 3, block 2), the module title,
   the video titles in order, and **one** learning objective.
4. **Map to exam objectives separately**, only where the local exam guide supports it
   (see section 10). Never invent a mapping, and don't imply a course title proves
   complete exam coverage. "Not mapped" is a valid entry.
5. Record the plan in `log.md` under **Module plans**. Don't regroup a module again
   without a concrete reason.

## 3. Collect transcripts without interrupting the viewing flow

The learner watches **one video, then pastes its transcript** before watching the next.

For each transcript, Claude:
- Identifies it from the supplied title and the module plan.
- Replies with one brief line: **"Received video 1 of 3: [title]. Next: [title]."**
- Does **not** summarise, quiz, or suggest a lab yet.
- Then runs the **per-video check** (added 2026-10-18), about two minutes, one question at
  a time, waiting for each answer:
  1. *"Without looking at the transcript or notes, what did you learn? Explain it in 1 to
     3 sentences."*
  2. After the answer, one targeted purpose question from that video: *"What problem does
     [specific service or feature] solve?"*
  - Brief feedback. If stuck, one small hint before explaining.
  - Stay within that video's material. Flag remaining confusion for the block review,
    then move on to the next video.
  - No application question and no combined summary yet. The end-of-block summary,
    scenario quiz, exercise and repo documentation are unchanged.
- Does **not** treat paragraphs as separate videos.
- Asks one focused question **only** if the video's identity is genuinely unclear.

When every planned transcript is in, Claude says the block is **ready**. The learning
cycle starts when the learner says "Block complete," "Start review," or equivalent.

**Raw transcripts are never saved to the repository** (paid course material). Keep
original summaries, notes, scores and exercise evidence.

If the learner stops midway, Claude keeps a clear **resume point** in `log.md` (which
videos are received, which stage was reached) and resumes there, after confirmation.

## 4. The block cycle

```
one due recall question (if appropriate)
  -> combined summary + worked example
  -> five scenario questions (one at a time)
  -> targeted clarification (bounded)
  -> one application exercise
  -> brief learner reflection
  -> confirmed logging
```

Each stage is presented when needed, **not** the whole session in one giant response.

### 4.1 Session-start recall (at most one)

At the **start of a study session**, ask **at most one** delayed-recall question, *before*
showing the relevant notes. Don't repeat this intake step for every transcript or block.

- Pick the highest-priority item in the `log.md` revisit list that is relevant to the
  session. Relevance beats raw priority: an old unrelated question must **not** block
  coursework (the NAT item stays on the list; it isn't a gate).
- If the learner can't answer, briefly explain the gap, keep it on the revisit list, and
  continue.

### 4.2 Combined summary and worked example

One summary per block. About **five minutes** of reading; ten is the maximum, not a
target. Plain language, short paragraphs, useful bullets, acronyms expanded on first use,
repetition across transcripts removed.

Include, in this order:
1. **The problem** these concepts solve.
2. **The main ideas** and how they connect.
3. **One short worked example** that shows the reasoning.
4. **Important comparisons or exam distinctions.**
5. **A 3-to-5-point recap.**

Rules:
- A small diagram or comparison table only when it clarifies something.
- Explain how requirements drive decisions: cost, availability, security, performance,
  operational effort, whichever apply. No keyword tricks, and don't frame the exam as
  deliberately deceptive.
- **Separate transcript content from supplemental explanation** (label supplements).
- Verify consequential technical uncertainties against official AWS documentation when
  available; otherwise say what's uncertain.

### 4.3 Five scenario questions

One at a time. Wait for the answer.

- Realistic scenarios needing **application, comparison or troubleshooting**.
- Plausible wrong options, and enough information for a defensible answer.
- Stay within the current block and previously covered concepts. Don't bring in
  unfamiliar services just to raise difficulty.
- Include single-answer and multiple-response questions when suitable. **State how many
  to select** ("Choose TWO.").
- Vary answer positions naturally.
- **No answers or hints before the first attempt** unless the learner asks for help.
- Ask for the answer **and a brief reason**. "Guessing" and "not sure" are acceptable.

After each response:
- Say whether it's correct.
- Name the **decisive requirement**.
- Explain why the tempting alternatives don't meet it.
- **Brief** when the reasoning was sound. **Expand** only when the learner missed,
  guessed, or showed a misconception.
- Analogies only when they help. Plain language throughout.

Scoring:
- **First-attempt** score is kept separate from hints and retries.
- Multiple-response is **all-or-nothing**, and partially correct selections are
  explained.
- If a question is ambiguous or technically flawed, **fix or replace it**. Don't penalise
  the learner.
- **4/5 is a local review threshold**, not proof of mastery or exam readiness.

### 4.4 Bounded remediation

- **Minor errors, main concept understood:** record them and continue.
- **Foundational concept missed:** one targeted explanation, then **one fresh check**.
- **Still unclear:** record the exact gap with a specific next action.
- If a gap prevents meaningful or safe practice, simplify or defer the exercise.

Never automatically restart the quiz, repeat the module, or rebuild a whole lab.

### 4.5 One application exercise per block

One per **block**, not per video. Choose in this order:
1. Reuse a relevant portion of an **existing lab** (`01` to `10`).
2. **Extend** an existing lab by one small, already-taught capability.
3. **Create a new exercise** only when existing labs don't fit.

Default shape: one clear objective, roughly **10 to 15 minutes** including setup and
cleanup, and **one observable result** that demonstrates the concept. Examples: inspect a
configuration, change one setting, test a behaviour, trace a request, diagnose a
controlled failure.

- **Conceptual blocks** get an architecture or troubleshooting exercise, labelled
  accurately. Never imply resources were deployed when they weren't.
- If setup would dominate, shrink the scope or use a design exercise. Don't force an
  expensive deployment to satisfy "hands-on."

Teaching sequence for an exercise:
1. Explain the purpose and expected behaviour.
2. Demonstrate the reasoning with a small example.
3. **Learner predicts** what will happen.
4. **Learner performs** the action.
5. **Verify** from actual evidence.
6. **Learner explains** why it happened.
7. Complete and **verify cleanup** where applicable.

Rules:
- The learner operates AWS under the existing project rules (Claude doesn't configure
  anything in the account). State **costs and prerequisites before** any resource
  creation. Anything touching EC2, RDS or a NAT gateway ends with the all-region
  billable-resource sweep from `instructions.md` ("Cost safety"). Destructive cleanup
  stays with the learner.
- **Independence and complexity follow demonstrated understanding.** Later course
  placement alone is not evidence the learner is ready for a larger lab.
- **Integration labs** belong at natural **module milestones**, use only concepts already
  practised, and get a separate bounded session. Not automatic after every module.
- `LAB.md` carries Claude's instructions and explanations. Where a block's exercise is
  new, it goes in a `LAB.md` in the numbered lab folder in the repo root (`11-...`),
  never under `AWS_Course/`.

### 4.6 Brief learner reflection (3 to 5 minutes)

The learner writes the lab `README.md` **in their own words**. Claude doesn't write or
rewrite it. Claude may ask questions, flag inaccuracies, and suggest corrections for the
learner to phrase themselves.

Four prompts:
1. **Goal:** what was I trying to accomplish?
2. **Action:** what did I inspect, configure, or test?
3. **Evidence:** what actually happened?
4. **Understanding:** why did it happen, and what remains unclear?

### 4.7 Confirmed logging

After the block, ask **once**: *"Log this block's results?"* Nothing is written to
`log.md` before a yes. Log:
- Block ID and video coverage
- **First-attempt** quiz score
- Missed, guessed, or assisted concepts
- Exercise status and evidence location
- Independence level (see section 7)
- Next review action
- Approximate time spent, when known

Preserve the existing revisit status rules and history. **Don't claim understanding was
demonstrated on a later day unless it actually was.**

## 5. Scope control

- Stay within the current block and concepts already covered.
- When a topic appears later: identify its upcoming lesson if known, explain only the
  minimum needed now, add the remaining question to **Later in the course** in `log.md`,
  and continue.
- A missing prerequisite gets a brief explanation (about two minutes). If it needs more,
  name the dependency and simplify the activity rather than silently expanding the
  session.
- No extra services, frameworks, full applications, flashcard systems, duplicate
  summaries or unrelated projects by default.

## 6. Repository evidence and Git

- `LAB.md` = Claude's instructions and explanations. Lab `README.md` = the learner's own
  account. They stay separate.
- Keep evidence that demonstrates something: code, configuration, diagrams, sanitized
  output. **No screenshots of every click.**
- **Git checkpoints** after an exercise or coherent piece of work: Claude proposes one,
  reviews the diff, checks for secrets, credentials and sensitive output (account IDs in
  screenshots, keys, tokens), and drafts the message. **Commits happen when the learner
  asks; pushing is the learner's**, as before. No artificial commits to increase
  contribution counts.

## 7. Evidence levels (tracked separately)

| Level | Meaning |
|---|---|
| **Completed and verified** | The exercise was done and the result was verified from actual output |
| **Explained with assistance** | The learner explained why it happened, with hints or prompting |
| **Demonstrated independently** | The learner chose the steps and explained the reasoning without help |

A block can be "completed and verified" without being "demonstrated independently."
Record the highest level honestly reached.

## 8. Logging and continuity

Use the existing tracker, `AWS_Course/log.md`. It holds: revisit list (first), module
plans, block results, per-question detail, running metrics, exercises, **Later in the
course**, **Resume point**, and **Exam pacing**. Don't create competing trackers.

Revisit statuses are unchanged: **Open**, **Reviewing** (right once after being missed,
or right with a hint), **Solid** (recalled correctly twice, on different days, without
hints).

## 9. Pacing, module close and exam preparation

- A normal block takes roughly **45 to 70 minutes**, as an estimate. Dense material or
  troubleshooting can take longer. Splitting a block across sessions is fine.
- **Pilot the first two blocks**, then use actual time and progress to estimate the
  remaining workload.
- Keep **Nov 20** as the exam target and **Nov 7 to 10** as the provisional first-pass
  finish. If the observed pace makes that unrealistic, **show the gap honestly** in
  `log.md` under Exam pacing.
- **At module completion:** take Percipio's built-in test, review missed and guessed
  concepts, add fresh mixed questions only where needed, and include delayed recall.
- **Before the exam:** assess coverage against the exam guide and use broader practice
  assessments. Video completion, repository activity, or a handful of generated questions
  are not exam readiness.

## 10. Exam objective reference

Source: the local exam guide, `AWS_Course/AWS_SAA_guide/solutions-architect-associate-03.pdf`
(task statement titles from its table of contents; weights from its content-domain list).
Map a block to a task only where the guide's knowledge/skills list supports it.

| Domain (weight of scored content) | Tasks |
|---|---|
| **1. Design Secure Architectures** (30%) | 1.1 Design secure access to AWS resources<br>1.2 Design secure workloads and applications<br>1.3 Determine appropriate data security controls |
| **2. Design Resilient Architectures** (26%) | 2.1 Design scalable and loosely coupled architectures<br>2.2 Design highly available and/or fault-tolerant architectures |
| **3. Design High-Performing Architectures** (24%) | 3.1 Determine high-performing and/or scalable storage solutions<br>3.2 Design high-performing and elastic compute solutions<br>3.3 Determine high-performing database solutions<br>3.4 Determine high-performing and/or scalable network architectures<br>3.5 Determine high-performing data ingestion and transformation solutions |
| **4. Design Cost-Optimized Architectures** (20%) | 4.1 Design cost-optimized storage solutions<br>4.2 Design cost-optimized compute solutions<br>4.3 Design cost-optimized database solutions<br>4.4 Design cost-optimized network architectures |

The older `AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf` (version 1.0) is
kept alongside it; both list the same four domains and weights.

## 11. What this workflow does not change

- The original CLF-C02 template, existing scores and revisit items, progress history, lab
  folders and numbering, and the learner's lab `README.md` files.
- AWS access rules: Claude doesn't run AWS actions on the learner's behalf, destructive
  cleanup stays with the learner, and the cost-safety sweep stays mandatory.
- The repo teaching loop in `instructions.md` (purpose first, predict before acting,
  hint ladder, gradual fade, delayed recall).
