# Progress Log

Running, chronological log of sessions in this repo. Lab-level technical detail lives
in each lab's own README — this is the narrative thread across sessions, kept mainly
so a fresh session (or a future me) can catch up fast.

## 2026-08-17 — Repo setup

Wrote `instructions.md`: the working agreement for how Claude assists — 80% hands-on
/ 20% AI help, a Demo pass (Claude builds, explains) / Rebuild pass (user builds,
Claude hints) structure per lab, a hint escalation ladder, and an end-of-lab README
Q&A (up to 10 questions, one at a time, sourcing the README from the user's own
words, graded honestly). Merged in the useful parts of a separately-drafted
`CloudLab.md` (the demo-then-rebuild idea, a lighter in-demo quiz) and removed the
original file once its content was folded in.

Added the **Independent runs (`run-2`, `run-3`, ...)** process: a stricter, less-
assisted repeat of a lab done later, graded as a whole from a submitted evidence
checklist + self-answered questions rather than a live Q&A.

## 2026-08-17 — Career planning

Discussed job-market timeline. Landed on a concrete milestone: finish labs 01-06,
then start the first resume-facing full-stack + AWS portfolio project — not wait for
all 10 labs or the later Terraform re-implementation phase. Rough month-by-month plan
saved to memory (`milestone_first_resume_project`).

## 2026-08-17 to 08-20 — Lab 01: VPC Basics

- **Demo pass** (CLI): built VPC, two subnets, IGW, custom route table with the
  public-subnet association — with explanation at each step.
- **Rebuild pass** (console): user rebuilt it independently, hit a real bug (route
  table association silently not saving), diagnosed it themselves once pointed at the
  evidence.
- **README Q&A**: graded B. Core concept (route table = what makes a subnet public,
  not the subnet itself) landed solid; some resource-ownership details (which object
  holds which setting) were shaky.
- CIDR math surfaced as a real gap during this lab — first dedicated drilling session
  happened here (the 32-bit/prefix formula, octet locking, VPC peering CIDR-overlap
  trap).

## 2026-08-20 to 08-23 — Lab 01 run-2 + CIDR deep-dive

- Independent `run-2` evidence-based rebuild. Hit a real CIDR sizing mistake (VPC
  built as `/24` instead of `/16`), self-diagnosed via the actual error message, and
  rebuilt clean rather than patching around it — good instinct, even though the
  written self-assessment (`run-2/README.md`) still showed one CIDR misconception
  (`/16` "subnets" not actually being distinct blocks) that had already been
  corrected once before.
- Multiple follow-up CIDR drilling sessions: locked-octet math, overlap detection
  (including the `/23`-spans-two-`/24`s trap and the calculator-decimal-remainder
  trap — `20 ÷ 8 = 2.5` does not mean "remainder 5"). Reference notes captured in
  `01-vpc-basics/run-2/mathCIDR.md`.
- Scheduled a CIDR "pop quiz" as a one-time cloud routine; ended up running it live
  in-session instead. 3/3 correct.

## 2026-08-22 to 08-23 — Billing incident

Found a leftover EC2 instance + RDS database from an earlier, unrelated exploration
project, running unnoticed for 11 days, $100+ in charges. Root cause: an AWS Budget
alert was correctly configured and *did* fire (July 22) — the gap was follow-through,
not tooling. Cleaned up the leftover EC2/RDS/S3. Documented in the main README's new
**Incidents** section (deliberately accurate, not flattering — it's meant to double
as real interview material) and added a **Cost safety** process to `instructions.md`:
mandatory end-of-session billable-resource check, proactively offered by Claude, on
any lab touching EC2/RDS/NAT Gateway.

## 2026-08-30 to 08-31 — Lab 02: EC2 in a Public Subnet

- **Demo pass** (CLI): security group (new concept — instance-level, stateful,
  scoped to a `/32` source), EC2 launch into the existing `run02x-publicSubnet`,
  SSH connectivity verified both directions, torn down and verified clean.
- **Guided console walkthrough**: same build repeated in the AWS Console instead of
  CLI, step by step, torn down and verified again afterward.
- **Independent Rebuild pass**: not done yet — planned for the next session.
- More CIDR practice woven in between (range-finding for non-octet-aligned prefixes
  like `/19`, `/20`, `/21`, `/18` — the "budget table" method: locked bits per octet,
  free bits, step size, binary, range, plus a sanity-check cross-total). Solid by the
  end of the session; the specific recurring error was an off-by-one on the top of a
  range (`start + step`, not `start + step − 1`).

## 2026-10-05 to 10-06 — Lab 03 start, console lockout, working-mode change

- Start-of-session sweep found a leftover `lab03-nat` NAT Gateway + Elastic IP from an
  earlier attempt, running ~4 days (~$4). Deleted the NAT, then released the EIP
  (first release attempt failed with "cannot be released with association IDs" —
  the NAT was still in `deleting`; retry after it reached `deleted` worked). Lesson:
  deleting a NAT Gateway does not release its EIP.
- Began a Claude-run Demo pass (route table, EIP, NAT gateway built via CLI), then
  stopped it: console sign-in started failing on a cross-device passkey prompt
  (`images/error.png`). Got in via a different MFA method. Logged as an incident in
  the main README — the point is to keep more than one independent MFA method.
- Working-mode change: for lab 03, the user builds everything in the console;
  Claude only gives step-by-step directions, one step at a time, and configures
  nothing. Destructive cleanup stays with the user.

## 2026-10-06 to 10-14 — Lab 03 build, Q&A, and a change of approach

- **Lab 03 build** (user-driven in the console, Claude giving one step at a time):
  private route table, EIP, NAT gateway (Zonal, public subnet), `0.0.0.0/0 -> NAT`
  route, private subnet association, stale blackhole route removed from the main
  table, two security groups (private group sources SSH from the bastion's group),
  bastion + private instance. Proof: `curl` from the private instance printed the
  NAT's Elastic IP. Hit and fixed: console defaulted to Regional NAT mode (switched to
  Zonal), VPC field wrong on the security group form, wrong SG on the private instance.
  Torn down in order (instances, NAT, wait for deleted, EIP). Multi-region sweep clean
  (EC2, NAT, EIP, volumes, load balancers, RDS all zero).
- **README Q&A: stopped early, provisional D+.** Could not trace the `curl` path, called
  the `local` route "the public route table", and said the NAT is in the public subnet
  so the private subnet can connect to it. The build worked; the understanding didn't
  stick. Lab 03 README is intentionally still blank rather than written from guesses.
- **Change of approach:** folded a "understand before steps" teaching loop into
  `instructions.md` (purpose, worked example, prediction, hints, gradual fade, delayed
  recall) and made AWS Skill Builder (SAA-C03) the main path. Domain 1 task 1.2 names
  NAT gateways, route tables, security groups and public/private subnets explicitly.
- **Concept session (route tables):** reading `10.0.0.0/16` as a range, the `local`
  route, and "most specific route wins" via a post-office analogy. Got the delivered vs
  dropped prediction right and the specific-route-wins answer right after a hint.
  Still shaky: smaller prefix number means a *bigger* block (guessed backwards once).
- Artifacts: `01-vpc-basics/run-2/mathCIDR.pdf` (reader-friendly CIDR reference),
  `03-nat-gateway-private-subnet/gemini-brief.md` (tutor/video brief), and a NotebookLM
  explainer-video prompt for the CIDR PDF.

## Next up

1. Start the next session with delayed recall: explain what makes a subnet public,
   before seeing any notes.
2. One concept: what a NAT gateway does to the source address of an outgoing request,
   then why it lives in the public subnet.
3. Then redo lab 03 as a Rebuild pass and run the README Q&A properly.
4. Lab 02 independent Rebuild README Q&A is still open. Per the career milestone:
   labs 03-06, then the first portfolio project.
