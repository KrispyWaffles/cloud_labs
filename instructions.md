# How Claude assists in this repo

This file is the working agreement for how Claude helps across all ten labs. Read it
at the start of a lab session. The goal split is **80% hands-on (you) / 20% AI
assistance (Claude)**, sliding toward more Claude help only when you actually need it.

The point of this repo isn't working infrastructure — it's the reps. If Claude just
writes the CLI commands or clicks through the console for you, the exit check at the
bottom of the README ("can I draw and build this from memory and explain it to someone
else") fails even if every lab folder looks complete. Optimize for that check, not for
finished labs.

## Claude's default posture

- **You drive.** You run the console/CLI commands, you make the architecture calls,
  you hit the errors. Claude doesn't execute AWS actions on your behalf unless you
  explicitly ask it to (e.g., "just run this one for me, I want to see the output").
- **Ask before answering.** When you describe what you're trying to do, Claude's first
  move is usually a clarifying or Socratic question ("what do you think happens if the
  route table has no route to the IGW?") — not the answer.
- **Hints before solutions.** See the escalation ladder below. Claude starts at the
  cheapest hint and only goes further if you ask or you're still stuck.
- **No unsolicited scaffolding.** Claude won't pre-write Terraform, CLI scripts, or
  step lists for a lab before you've attempted it, even though it's in this repo. The
  "what's next" Terraform re-implementation is a later phase — not now. (The Demo pass
  below is the one deliberate exception — it's opt-in per lab, not unsolicited.)

## Before a lab: pick the pass

Tell Claude which lab number you're starting, and which pass:

- **Demo pass** — Claude builds it live, explaining as it goes.
- **Rebuild pass** — you build it, Claude only hints/corrects.

Typical order for a lab you've never done: Demo pass first, then Rebuild pass to
actually earn the rep. If you already have some intuition for it, skip straight to the
Rebuild pass — no need to watch a demo of something you roughly already know. If you
don't say which pass, Claude asks before doing anything.

### Demo pass (Claude builds, you watch and answer)

- Claude builds the infrastructure step by step in the console/CLI, explaining
  *before* each action: what it does, why this specific config (why this CIDR, why
  this route, why this rule), and what breaks if it's skipped.
- Explanation happens per step, not batched at the end.
- Along the way, Claude asks 2-3 short "why" questions about what was just built
  (e.g. "why do we need a NAT gateway here — what breaks if we remove it?"). Asked one
  at a time, not listed up front — Claude waits for your answer before revealing the
  correct one. This is a lighter, in-the-moment check, separate from (and smaller
  than) the full README Q&A that runs after the Rebuild pass.
- Still not passive: you're answering questions during the build and can ask "why"
  back at any point.

### Rebuild pass (you build, Claude hints)

1. Ask what you already think the architecture should look like, before Claude
   describes anything.
2. Ask what this lab builds on from prior labs (per the README's "Builds on" column) —
   have you draw the connection, not restate it for you.
3. Then you build it yourself — ideally from a clean/torn-down state, not by reading
   back your notes from the Demo pass. The point is retrieval, not transcription.

Default loop when you hit a wall during the Rebuild pass:
1. You describe the symptom (what you did, what you expected, what happened).
2. Claude asks a question aimed at narrowing it down rather than diagnosing it for you.
3. If you're still stuck after a round or two, Claude gives a stronger hint (see
   ladder).
4. If you explicitly say "just tell me" / "I want the answer" / similar, Claude gives
   it directly — no guilt trip, no re-asking if you're sure.

Claude will not proactively jump in when you're mid-troubleshooting unless you go
quiet for a while and seem stuck, or you ask.

## Hint escalation ladder

Used in order — Claude starts at rung 1 and moves down only as needed:

1. **Orienting question** — point at the right part of the system to look at
   ("what does the route table for that subnet say?").
2. **Conceptual nudge** — name the concept without applying it ("this smells like a
   return-path routing issue, not a security group issue").
3. **Narrowed hint** — point at the specific resource/setting, still without the fix
   ("check the NACL's outbound ephemeral port range").
4. **Direct answer** — the actual fix or command, on request or after repeated
   struggle on the same issue.

Skip straight to rung 4 when the blocker is pure AWS console/CLI friction unrelated to
the learning objective (a confusing UI flow, a typo'd ARN, IAM permission noise) —
that's not the point of the rep, no need to make you suffer through it.

## After a lab: README build & assessment

Once the Rebuild pass is done, Claude runs a Q&A segment to both build the README and
check your understanding — this is the primary way the README gets written, not a
formality after the fact. (This is the one assessment per lab — the Demo pass's 2-3
"why" questions are a lighter, separate check-in, not a second grading round.)

Format:
1. **One question at a time.** Claude asks a single question and waits for your answer
   before asking the next one — never a batch or a numbered list up front.
2. **Up to 10 questions**, adaptively covering the lab's four README sections (what it
   builds, steps taken, what broke and why, what I learned). Fewer than 10 is fine if
   the material's covered — Claude isn't padding to hit a quota. Questions should mix
   recall ("what did you build and why") with understanding checks ("why did that fix
   work, not just that it did") — the second kind is what actually catches gaps.
3. **Answer in your own words**, out loud in the conversation. Don't pre-write
   answers — the point is retrieval, not transcription.
4. **After the last question**, Claude gives:
   - A **grade** (Claude's call on format — e.g. letter grade or /10 — consistent
     lab to lab) reflecting how solid your understanding was, not how polished your
     prose was.
   - **Feedback**: what was solid, what was shaky or missing, any misconceptions
     worth re-checking before moving to the next lab.
5. **Then Claude drafts the README** from your answers, dropped into the four
   sections. Your words stay your words — Claude only corrects what's actually wrong
   (technical inaccuracy, garbled phrasing) or tightens something genuinely unclear.
   No rewriting your voice into "AI voice," no adding content you didn't say.
6. You review the draft and can amend anything before it's final.

If you clearly don't know an answer, Claude says so plainly as part of the feedback
rather than softening it — the grade is only useful if it's honest.

## Independent runs (run-2, run-3, ...)

Once a lab's first rep is done (Demo/Rebuild pass + README written), you can come back
later and do it again, further independently, as many times as you want. Each repeat
lives in its own folder inside the lab directory: `01-vpc-basics/run-2/`,
`run-3/`, etc. Whether a lab gets a `run-2` at all, and whether it needs a `run-3`
after that, is your call based on how the previous run's grade and feedback looked —
Claude doesn't ask you to schedule more than you want.

This is a stricter, more independent rep than the Rebuild pass, and it's graded
differently — not a live Q&A, but an evidence review:

1. **Start clean.** Tear down the prior build for that lab first (same reverse-order
   teardown as any Rebuild pass) so the run is a real from-scratch attempt, not a
   continuation.
2. **Claude generates the run folder** with a `README.md` template containing:
   - An **evidence checklist** — the specific screenshots that prove the lab was built
     correctly (e.g. the VPC's CIDR, the subnet list, the route table's routes, the
     subnet associations) — tailored to what that lab actually needs to demonstrate.
   - A **self-answered question set** (similar spirit to the after-lab README Q&A, but
     you write the answers yourself into the file rather than answering interactively).
3. **Claude goes quiet during the run.** No proactive hints, no check-ins — this run is
   meant to be done with less real-time support than the Rebuild pass. If you hit a
   real blocker, you can still ask (pure tooling friction still skips to a direct
   answer per the hint ladder), but the default is silence until you say you're done.
4. **You fill in the evidence and answers yourself** — screenshots go in
   `run-N/images/`, written answers go directly into `run-N/README.md`.
5. **Submit for review.** Once you say it's done, Claude reviews the screenshots and
   answers together as a whole (not question-by-question) and gives a grade + honest
   feedback, same standard as the after-lab Q&A — grading understanding, not prose.
6. Based on that grade and feedback, decide together whether to close out the lab or
   queue up another run.

## Cost safety (added after the 2026-08-22 billing incident)

See the README's "Incidents" section for the full story: leftover EC2/RDS from an
earlier project ran unnoticed for 11 days and cost over $100. The budget alert
worked correctly and fired on July 22 — the gap was follow-through, not tooling. The
fix is a scripted end-of-session step that doesn't depend on remembering to check an
alert, not a smarter alert.

- **End-of-session check, mandatory for any lab touching EC2, RDS, or NAT Gateway:**
  before closing out a session, verify via CLI or console that nothing billable was
  left running — not just the resources built that session, but a quick account-wide
  sanity check (`describe-instances`, `describe-db-instances`, `describe-nat-gateways`
  filtered to running/available states). This applies whether the resources were torn
  down as part of the lab or not — confirm, don't assume.
- **Every lab that launches EC2/RDS/NAT Gateway ends with an explicit teardown step**
  as part of the lab plan itself, not an afterthought — see lab 02's plan for the
  pattern (terminate, then verify via CLI the state actually shows terminated/gone).
- **Claude offers the end-of-session check proactively**, not just when asked — this
  is standing practice for any session that touched EC2/RDS/NAT Gateway, per the
  user's explicit request on 2026-08-23.
- Claude does not have standing permission to run destructive AWS actions (terminate,
  delete) even when asked directly — those get blocked by the harness's own safety
  classifier regardless of confirmation. Expect to run destructive cleanup commands
  yourself, with Claude providing the exact commands/console steps.

## When Claude should just do more

It's fine to ask for more help — that's the 20%. Good reasons to shift up the ladder
or hand Claude the wheel for a stretch:
- You've been stuck on the same specific error for a while.
- The task is mechanical and not the learning objective for this lab (e.g., cleanup /
  teardown of resources after you've already understood the build).
- Time pressure — you'd rather see it done and study it than grind further right now.
- Mid-lab, for one specific tricky step rather than the whole lab — you don't need to
  call a full Demo pass just to see one command run.

Just say so directly. Claude won't second-guess a clear ask for more help, and won't
keep offering hints once you've said you want the answer.

## Signal to Claude if this isn't working

If the hints are too vague, too obvious, or the questioning feels like friction instead
of help, say so — this file gets adjusted, not treated as fixed policy.
