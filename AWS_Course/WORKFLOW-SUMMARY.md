# SAA-C03 Study Workflow: Summary

A plain-language description of the course workflow. The operating rules Claude follows are in
`WORKFLOW.md` (the source of truth); Git safety rules are in `instructions.md` ("Commit and
push safety").

**Version 3, 2026-10-20.** Moves from Skillsoft Percipio to **Stéphane Maarek's Ultimate AWS
Certified Solutions Architect Associate (SAA-C03) course on Udemy.** The Percipio work already
done is preserved, not redone.

---

## 1. What this is

You're preparing for the **SAA-C03** exam on **2026-11-20** (unless you report a change) using
the Udemy course, the labs in this repo, and the local exam guide. The aim is understanding,
sustainable progress, and honest evidence of hands-on work on GitHub. Your JavaScript and
full-stack background is a bridge to unfamiliar infrastructure ideas, not a reason to build apps.

Not goals: a dashboard, a second course, or turning this into a workflow project.

## 2. Why it's built this way

Lab 03 (NAT gateway) was finished without understanding it. A pasted transcript, a finished
demo, or followed steps is not evidence of understanding. Your own explanations, predictions,
and independent recall are.

## 3. Files

| File | Role |
|---|---|
| `AWS_Course/WORKFLOW.md` | The rules (source of truth) |
| `AWS_Course/WORKFLOW-SUMMARY.md` | This document |
| `AWS_Course/log.md` | Tracker: revisit list, course plans, block results, per-question detail, exercises, later-in-course list, resume point, parked items, exam pacing, metrics |
| `AWS_Course/transcript-workflow-template.md` | Original CLF-C02 template, untouched |
| `instructions.md` | Repo-wide rules, including Commit and push safety and Cost safety |
| `scripts/pre-push` | Reviewable copy of the local pre-push hook |
| `NN-topic/LAB.md` and `README.md` | Claude's instructions vs. **your own** account. Claude doesn't write your README |

Labs live in the repo root as numbered folders (`01` to `10` exist, new ones from `11`), never
under `AWS_Course/`. Raw course transcripts are never stored in the repo.

## 4. The flow

```
 Section start:  you share the expanded Udemy screenshot
                 -> Claude organizes ONLY that section into blocks of 3 to 4 related videos
      |
      v
 Each instructional video:  watch -> paste transcript -> exactly two questions:
        1. What did you learn? (1 to 3 sentences, no notes)
        2. What problem does [feature from this video] solve?
      (brief feedback; one hint and a retry if stuck; flag confusion; no third question)
      |
      v   you confirm the block's videos and checks are done
 Combined summary (about 5 min read, never over 10)
      |
      v
 Five scenario questions, one at a time (answer + brief reason; mark guesses)
      |
      v
 Bounded remediation (never restart the block)
      |
      v
 One practical application (a relevant Udemy hands-on lesson can count)
      |
      v
 Your explanation in your own words -> documented
      |
      v
 Study notes: block .md saved, running Word doc rebuilt (AWS_Course/notes/)
      |
      v
 One consolidated logging request, then commit after the safety checks  ->  next session starts with a short recall check
```

## 5. Step by step

### 5.1 Organize the current section
- **Blocks of 3 to 4 related videos** (2 to 4 when topic boundaries justify it). A concept and its
  hands-on demo stay together where practical. Course order is preserved. Titles, durations,
  and content are never invented. Unreadable screenshot text gets a request for a cropped one.
- **Ids:** `S##-B##` (Udemy section number, block number), such as `S03-B02`. Existing
  Percipio ids (`M01-B01`) stay. A Udemy section is not an exam domain; exam objectives are
  mapped separately and only where the exam guide supports it.
- **Administrative videos** (intro, downloads, account setup) get no checks, quizzes, or labs.

### 5.2 After each instructional video
Exactly two questions, one at a time, about two minutes in total. Brief, specific feedback. If
you struggle: one small hint, then you retry, then an explanation. Persistent confusion is
flagged for the block review. No third question, no summary yet, and the transcript is never
treated as proof that you understood.

### 5.3 End of block
- **Summary:** purpose, how the concepts connect, one concrete example (JavaScript where it
  helps), exam distinctions framed by requirements, and a 3-to-5-point recap. Supplemental
  explanation is labelled, and uncertain technical points are checked against AWS docs or
  flagged.
- **Five scenario questions:** multiple-choice or multiple-response with plausible
  alternatives and real trade-offs, only current or earlier concepts, no trick wording, how
  many to select stated, a brief reason from you, guesses marked. Feedback names the decisive
  requirement and why the main alternatives fail. First-attempt scoring is separate from hints
  and retries; multiple-response is all-or-nothing. **4/5 is a review checkpoint, not proof of
  readiness.**
- **Remediation:** minor errors recorded; a foundational miss gets one targeted explanation and
  one fresh check; an unclear one gets an exact gap and a next action. No full restarts.

### 5.4 One practical application per block
A relevant Udemy hands-on lesson satisfies it. Otherwise one focused 10 to 15 minute exercise,
preferably extending an existing lab. Conceptual material gets a diagram, configuration
inspection, or troubleshooting exercise, labelled accurately. Sequence: **explain, demonstrate,
you predict, you act, verify from evidence, you explain, clean up.** Guided work is never marked
independent. AWS permissions, cost checks, cleanup, and the all-region billable-resource sweep
are unchanged.

### 5.5 Recall, pacing, progress
- Each session starts with a short independent recall check on the last session, including one
  relevant weak area. **The NAT gateway item stays on the revisit list and blocks nothing.**
- 1.5 to 2 blocks a day is a flexible preference. **Time for the first two Udemy blocks is
  measured in full** (videos, checks, quiz, exercise) to re-estimate pacing.
- Four statuses stay separate: **Watched, Practiced, Verified, Independently explained.**
- When a session ends mid-block, an exact **resume point** is saved. Logging is **one
  consolidated request** per block or session, and nothing is written without a yes.

### 5.6 Documentation and commits
Each completed exercise gets a record: goal and block id, what you configured, sanitized
evidence, what you understood in your own words, guided or independent, cleanup status, and
open questions. Claude doesn't fabricate your reflection or results. When files changed, a
commit like `lab: complete S03-B02 IAM permissions exercise`, with no empty commits, no
artificial activity, and no unrelated changes.

### 5.7 Study notes
The last step of every block review. Claude writes one set of notes in original wording (the big
idea, key terms, the main concepts, short comparison bullets, decision rules, mistakes to watch
for from your own misses, and 3 to 4 recall prompts) and saves it as
`AWS_Course/notes/<block id>.md`. It then rebuilds the running Word document,
`AWS_Course/notes/SAA-C03-Study-Notes.docx`, from all the block notes: Arial 12 pt, bold headings
in two larger sizes, real bullets, one section per block in course order. The `.md` files are the
source of truth, so add your own notes there (or tell Claude); rebuilding overwrites the Word file.
The `.docx` is generated and git-ignored; the `.md` files and `scripts/build_notes_docx.js` are
committed, only after the safety checks and only when you say so. Transcript text is never copied
into the notes.

## 6. Git protections

Full procedure in `instructions.md` ("Commit and push safety"). In short:
- **Before a commit:** status and untracked review, ignore-rule check, tracked-but-ignored
  check, content review for secrets and personal data, screenshots inspected by eye (or left
  out), **specific files staged** (never `git add .`), staged diff reviewed, secret scan on the
  staged content, commit of reviewed files only.
- **Before a push:** confirm branch and destination, establish the outgoing range, review
  every outgoing commit, scan **every outgoing commit** (the whole history on a first push),
  confirm nothing changed after scanning, report, and ask for approval.
- **Local pre-push hook** (`scripts/pre-push`, installed in `.git/hooks`): blocks on a missing
  or unsupported scanner, scanner errors or findings, non-fast-forward pushes, deletions, tags,
  sensitive-looking file names, and images/PDFs you haven't reviewed. It supplements manual
  review; `--no-verify` skips it, and it isn't installed on other computers automatically.
- **If something sensitive is found:** stop, report the file and type without reproducing it,
  sanitize it, explain that history still holds it, rotate or revoke any exposed credential
  first, and get approval before any destructive history repair.

## 7. What changed from the Percipio version

| Before | Now |
|---|---|
| Percipio modules planned from a video list | Only the current **Udemy section** is organized, in blocks of 3 to 4 videos |
| Block ids `M##-B##` | `S##-B##` for Udemy, existing Percipio ids kept |
| Acknowledgement plus a two-question check | Same two questions; administrative videos get no check |
| Three evidence levels | Four statuses: Watched, Practiced, Verified, Independently explained |
| Exercise per block, Claude often proposed one | A Udemy hands-on lesson can satisfy it, with no duplicate lab |
| Nov 7 to 10 first-pass target | Re-estimated after the first two Udemy blocks |
| Screenshots hygiene rules | Full pre-commit and pre-push procedure, plus a local hook |

**Kept:** the CLF-C02 template, the 13 revisit items and their statuses, M01-B01 results, lab
folders and numbering, your lab READMEs, AWS access and cost rules, and the rule that raw
transcripts stay out of the repo.

## 8. Current state (2026-10-20)

- Workflow files updated. Nothing from this migration is committed or pushed.
- **No Udemy section is planned yet.** The next step is the first section's expanded screenshot.
- **Scanner not installed.** gitleaks is missing, so the pre-push hook blocks every push until
  it's installed (`brew install gitleaks`). The hook's blocking logic was tested with a stub;
  no real secret scan has run.
