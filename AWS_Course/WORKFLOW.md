# SAA-C03 Study Workflow (Udemy: Stéphane Maarek + hands-on labs)

The working agreement for course sessions. Claude reads this file, and the revisit list in
`log.md`, at the start of a course session. Adapted from `transcript-workflow-template.md`
(the CLF-C02 original, kept untouched as reference).

**Version 3, 2026-10-20.** Moves from Skillsoft Percipio to **Stéphane Maarek's Ultimate AWS
Certified Solutions Architect Associate (SAA-C03) course on Udemy**. The Percipio work already
done (block `M01-B01`) is preserved in `log.md` and is not re-done. Git safety rules live in
`instructions.md` ("Commit and push safety") and apply here; this file doesn't duplicate them.

---

## 0. Context and targets

| Item | Value |
|---|---|
| Exam | AWS Certified Solutions Architect - Associate (SAA-C03) |
| Exam date | **2026-11-20**, unless the learner reports a change |
| Course | Udemy: Stéphane Maarek, Ultimate AWS Certified Solutions Architect Associate SAA-C03 |
| Background | Passed Cloud Practitioner. JavaScript / full-stack. Use it to connect unfamiliar infrastructure to familiar applications, without building applications |
| Exam guide | `AWS_Course/AWS_SAA_guide/` (local, not committed) |
| Pace | 1.5 to 2 blocks per day is a flexible preference, not a minimum. Sustainable progress and understanding come first |

Goals: understand AWS, prepare for SAA, and produce honest evidence of hands-on work in
GitHub. Not goals: a dashboard, a second course, or growing this into a workflow project.

**Why the process looks like this:** lab 03 (NAT gateway) was completed without understanding
it. Pasting a transcript, finishing a demo, or following supplied steps is **not** evidence of
understanding. Explanation, prediction, and independent recall are.

## 1. Organize the current section only

The learner provides screenshots of an **expanded Udemy section** showing video titles and
durations. Claude organizes **only that section**.

- **Blocks of 3 to 4 related videos** (2 to 4 when topic boundaries make more sense).
- **Keep a concept and its hands-on demo together** where practical.
- **Preserve course order.** Never invent missing titles, durations, or lesson content.
- Plan from the screenshot; learn from the **transcripts**, not the titles.
- If text is unreadable, **ask for a cropped screenshot**.
- **Identifiers:** Udemy blocks are `S##-B##` (Udemy section number, block number), for
  example `S03-B02`. Existing Percipio identifiers (`M01-B01`) stay as they are. A Udemy
  section number is **not** an exam domain; exam objectives (Domain 1 to 4, Tasks 1.1 to 4.4)
  are mapped separately, only where the exam guide supports it (section 9). "Not mapped" is a
  valid entry.
- **Administrative videos** (introductions, downloads, account setup) don't each get checks,
  quizzes, or labs. Do the necessary setup efficiently and move on.
- Record the plan in `log.md` under **Course plans**. Don't re-plan a section without a
  concrete reason.

## 2. After every instructional video

The learner watches one video, then pastes its transcript. Claude **identifies it** from the
supplied title and the plan, says in one short line which video it received and what's next, and
runs **exactly two questions, one at a time**, waiting for each answer. The whole check takes
about two minutes.

1. *"Without looking at the transcript or notes, what did you learn? Explain it in 1 to 3
   sentences."*
2. *"What problem does [service or feature from this video] solve?"* (one targeted purpose
   question)

Then:
- **Brief, specific feedback.** If the learner struggles, offer **one small hint** and let them
  **retry** before explaining.
- **Flag persistent confusion** for the block review and continue.
- **No third question.** No full summary after each transcript. No application question yet.
- A pasted transcript is **not** evidence of understanding. Only the learner's own answers are.
- **Raw transcripts are never saved to the repo.** Keep original summaries, notes, scores,
  and exercise evidence. Don't introduce persistent transcript storage without discussing it.
- Administrative videos: acknowledge and continue, with no check.

If an instructional video's identity is genuinely unclear, ask one focused question.

## 3. End of block

When the learner confirms the videos and quick checks are done, Claude runs, **one stage at a
time** (not the whole session in one response):

### 3.1 Combined summary (about 5 minutes, never more than 10)

Plain language, short paragraphs, expanded acronyms, no repetition across videos. It covers:
1. **The problem** the concepts solve and why they exist.
2. **How the concepts connect.**
3. **One concrete example** (a JavaScript application example when it helps).
4. **Exam distinctions** that matter, framed by requirements (cost, availability, security,
   performance, operational effort). No keyword tricks, and don't frame the exam as deceptive.
5. **A 3-to-5-point recap.**

Label supplemental explanation separately from course content, and verify consequential
technical uncertainty against official AWS documentation, or say what's uncertain.

### 3.2 Five scenario questions, one at a time

- Multiple-choice or multiple-response, **state how many to select**.
- **Plausible alternatives** and meaningful architectural trade-offs. No obvious definitions
  and no trick wording.
- Only **current or previously covered** concepts. Don't bring in unfamiliar services.
- Enough information for a defensible answer. Vary answer positions naturally.
- **No answers or hints before the first attempt** unless the learner asks.
- Ask for a **brief reason** with each answer, and let the learner say "guessing" or "not sure".
- After each answer: right or wrong, the **decisive requirement**, why the correct option fits,
  and why the main alternatives do not. Brief when the reasoning was sound; fuller on a miss,
  a guess, or a misconception. Analogies only when helpful.
- **First-attempt score** is kept separate from hints and retries. Multiple-response is
  all-or-nothing, with partial selections explained. Fix or replace a flawed question; never
  penalize the learner for it.
- **4/5 is a block-review checkpoint**, not proof of mastery or exam readiness.

### 3.3 Bounded remediation

- Minor errors, main concept understood: record and continue.
- A foundational concept missed: one targeted explanation, then **one fresh check**.
- Still unclear: record the exact gap and a specific next action.
- If a gap prevents safe or meaningful practice, simplify or defer the exercise.

Never restart the whole block, repeat the section, or rebuild a whole lab automatically.

## 4. One practical application per block

Every block includes one useful practical application.

- A **relevant Udemy hands-on lesson satisfies this.** Don't create a duplicate lab.
- Otherwise add **one focused 10 to 15 minute exercise** with a single learning objective.
- **Prefer extending an existing lab** (`01` to `10`) over creating a new project. New
  exercises, when unavoidable, go in the next numbered folder in the repo root (`11-...`),
  never under `AWS_Course/`.
- **Conceptual material:** use a diagram, a configuration inspection, or a troubleshooting
  exercise when deployment adds little value. Label it accurately (nothing implied as deployed).
- Use JavaScript application examples where helpful, without unnecessary app development.

**Sequence:** explain -> demonstrate -> **learner predicts** -> **learner acts** -> verify
from evidence -> **learner explains** -> clean up.

- Give enough explanation before testing an unfamiliar concept. Reduce help gradually.
  **Never mark independent mastery when the learner followed supplied steps.**
- Stay within the block. Briefly explain an essential prerequisite; defer unrelated topics and
  larger integrations (listed under **Later in the course** in `log.md`).
- **AWS permissions, cost checks, cleanup, and billable-resource verification are unchanged**
  (`instructions.md`, "Cost safety"). The learner operates AWS; Claude does not provision or
  delete resources without the required authorization. State costs and prerequisites first.
  Anything touching EC2, RDS, or a NAT gateway ends with the all-region sweep.

## 5. Recall, pacing, and progress

- **Next session begins with a short independent recall check** from the previous session,
  including one relevant weak area from the revisit list when appropriate. This is at most a
  few questions, before any notes are shown.
- The **NAT gateway** item stays on the revisit list and **never blocks unrelated coursework**.
- **Measure actual time for the first two Udemy blocks**, including checks, quiz, and exercise.
  Use that, plus real progress and practice results, to review pacing. Don't assume finishing
  the course equals readiness.
- **Resume points:** when a session ends mid-block, record partial progress and the exact
  next action in `log.md`. Resume there; don't restart the block.
- **Four separate statuses**, recorded per block and never merged:

| Status | Meaning |
|---|---|
| **Watched** | The videos were watched and the per-video checks done |
| **Practiced** | The exercise or hands-on lesson was done, with or without help |
| **Verified** | The result was confirmed from real evidence (CLI output, console, test) |
| **Independently explained** | The learner explained why it works, unaided, including at a later recall |

- **Logging approval:** ask **once, consolidated**, at the end of a block or session, after the
  study notes. One request covers the block result, exercise status, revisit changes, time, and resume point.
  Don't ask repeatedly. Nothing is written without a yes.
- **Revisit statuses** are unchanged (Open, Reviewing, Solid; Solid needs two clean recalls on
  different days with no hints). Never claim later-day understanding unless it happened.

## 6. Exercise documentation and commits

Each completed block exercise produces a meaningful record, and a Git commit **when files
changed**. The learner provides their own explanation; **Claude never fabricates a reflection
or a result.**

The record contains:
- **Goal** and block identifier.
- **What was configured or changed.**
- **Sanitized verification evidence** (crop screenshots; no account ID, IPs, keys).
- **What the learner understood, in their own words** (about 3 to 5 minutes; Claude may ask
  questions, flag inaccuracies, and suggest corrections, but doesn't write it).
- **Guided or independent.**
- **Cleanup status** and unresolved questions.

`LAB.md` (Claude's instructions) and the lab's `README.md` (the learner's account) stay separate.
Use clear commit messages, for example `lab: complete S03-B02 IAM permissions exercise`. No
empty commits, no artificial activity, and no unrelated changes in the commit.

**Before committing and before every push, follow `instructions.md`, "Commit and push
safety"**: specific files only, staged-diff review, screenshot review, secret scan, outgoing
range check, and a report. The local pre-push hook supplements these checks. If a check can't
run or finds something, stop and explain.

## 6.5 Study notes (the final step of the block review)

After the reflection and before the logging request, Claude writes **one set of study notes
for the block**, for the learner to paste into a Google Doc and use for reference and review.

- **Simple formatting:** one-level bullets (a bold lead word, then the point), numbered recall
  prompts, no tables, no code fences, no nested lists. Acronyms expanded on first use.
- **Organized the same way every time:** the big idea; key terms; the main concept sections for
  this block; comparisons as short bullets; decision rules (requirements lead to choices, not
  keyword tricks); mistakes to watch for (the learner's own misses from this block); and 3 to 4
  recall prompts. Not a flashcard system.
- **Detailed but simple:** solid detail, short sentences, one concrete example.
- **Original wording only.** Never paste transcript text. Label supplemental content as such.
  Include the learner's own verified observations (for example, what their console showed).
- **Two outputs per block:** `AWS_Course/notes/<block id>.md` (the source copy) and the running
  Word document `AWS_Course/notes/SAA-C03-Study-Notes.docx`, which is rebuilt from all the block
  `.md` files with `node scripts/build_notes_docx.js` (needs the `docx` npm package). Each block
  becomes one Heading 1 section, in course order. The notes are also shown in chat.
- **The `.md` files are the source of truth.** Rebuilding overwrites the `.docx`, so the learner's
  own additions go in the `.md` (or are sent to Claude), not directly into the Word file. The
  `.docx` is generated, so it is git-ignored; the `.md` files and the script are committed.
- **Word format:** Arial 12 pt body, bold headings (Heading 1 at 16 pt, Heading 2 at 14 pt), real
  bullets and numbered lists, Letter size, page numbers in the footer.
- A Google Docs-ready `.html` is no longer produced by default; Claude makes one only if asked.
- Notes files are committed only after the safety checks, and only when the learner says so.

## 7. Scope control

- Stay within the current block and concepts already covered. When a later topic appears,
  name its likely lesson if known, give the minimum explanation, add the rest to **Later in the
  course**, and continue.
- A missing prerequisite gets a short explanation (about two minutes). If it needs more, name
  the dependency and simplify the activity.
- Not added by default: extra services, frameworks, full applications, flashcards, duplicate
  summaries, unrelated projects, or larger integration labs.

## 8. Section close and exam preparation

- At the end of a Udemy section, review missed and guessed concepts and add fresh mixed
  questions only where needed. Include delayed recall.
- Larger integration labs belong at natural milestones, use concepts already practiced, and get
  their own bounded session. They are not automatic.
- **Before the exam:** assess coverage against the exam guide and use broader practice
  assessments (for example, practice exams). Video completion, repository activity, or a few
  generated questions are not exam readiness.

## 9. Exam objective reference

Source: `AWS_Course/AWS_SAA_guide/solutions-architect-associate-03.pdf` (task titles from its
table of contents; weights from its content-domain list). Map a block to a task only where the
guide's knowledge and skills lists support it.

| Domain (weight of scored content) | Tasks |
|---|---|
| **1. Design Secure Architectures** (30%) | 1.1 Design secure access to AWS resources<br>1.2 Design secure workloads and applications<br>1.3 Determine appropriate data security controls |
| **2. Design Resilient Architectures** (26%) | 2.1 Design scalable and loosely coupled architectures<br>2.2 Design highly available and/or fault-tolerant architectures |
| **3. Design High-Performing Architectures** (24%) | 3.1 Determine high-performing and/or scalable storage solutions<br>3.2 Design high-performing and elastic compute solutions<br>3.3 Determine high-performing database solutions<br>3.4 Determine high-performing and/or scalable network architectures<br>3.5 Determine high-performing data ingestion and transformation solutions |
| **4. Design Cost-Optimized Architectures** (20%) | 4.1 Design cost-optimized storage solutions<br>4.2 Design cost-optimized compute solutions<br>4.3 Design cost-optimized database solutions<br>4.4 Design cost-optimized network architectures |

## 10. What this workflow does not change

- The CLF-C02 template, existing scores and revisit items, progress history, lab folders and
  numbering, and the learner's lab `README.md` files.
- AWS access rules: Claude doesn't run AWS actions on the learner's behalf, destructive cleanup
  stays with the learner, and the cost-safety sweep stays mandatory.
- The repo teaching loop in `instructions.md` (purpose first, predict before acting, hint
  ladder, gradual fade, delayed recall).
