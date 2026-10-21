# Course Log: what to revisit, and how I'm scoring

The single tracking file for the SAA-C03 course. The Percipio-era history (block M01-B01) is
preserved below; from 2026-10-20 the course is Stéphane Maarek's Udemy course. The **revisit list
comes first on purpose**: it's the part that matters most. Updated only after I confirm
at the end of a block or session, in one consolidated request (see `WORKFLOW.md`, section 5). Nothing here is written
silently, and nothing is recorded as done that wasn't.

## How the revisit list works

| Status | Meaning |
|---|---|
| **Open** | Missed in a quiz, Q&A or session, and not yet recalled correctly. |
| **Reviewing** | Got it right once after being missed, or right with a hint. Needs one more clean recall on a different day. |
| **Solid** | Recalled correctly **twice, on different days, without hints.** Stays listed so repeat misses can be spotted. |

- A repeat miss on a Solid item sends it back to **Open** and bumps the miss count.
- Every item has a **next action** (a recall question, a lab, a re-read), never just
  "study more".
- Sorted by priority: Open first, then Reviewing, then Solid.
- Don't mark an item as demonstrated on a later day unless it actually was. A hint, a
  retry, or an assisted answer counts as Reviewing at best.
- An old item never blocks unrelated coursework; it's raised as at most one recall
  question at the start of a study session.

## Areas to revisit

| # | Area | What went wrong | First flagged | Misses | Status | Next action |
|---|---|---|---|---|---|---|
| 1 | NAT gateway: path of an outgoing request, and why it sits in the public subnet | Couldn't trace the `curl` hop by hop; said the NAT is in the public subnet "so the private subnet can connect to it" | Lab 03 Q&A, 2026-10-14 | 3 | Open | Recall question; then Rebuild pass on lab 03 |
| 2 | Inbound vs outbound traffic are different problems | Thought `curl` was verifying SSH; SSH was inbound, `curl` was outbound | Lab 03 Q&A, 2026-10-14 | 1 | Open | Recall: which pieces handle inbound vs outbound? |
| 3 | The `local` route | Called `10.0.0.0/16` "the public route table" instead of the VPC-internal route | Lab 03 Q&A, 2026-10-14 | 1 | Reviewing | Recall: what does `local` do and why can't you remove it? |
| 4 | Most specific route wins (longest prefix match) | "Not sure" when two rules matched; got it after the post-office example | Concept session, 2026-10-14 | 1 | Reviewing | New prediction with a different destination address |
| 5 | Smaller prefix number = bigger block | Guessed `0.0.0.0/0` was the smaller block | Concept session, 2026-10-14 | 1 | Open | Recall: free bits for `/0`, `/16`, `/24`, `/32` |
| 6 | CIDR range top: `start + step - 1` | Repeated off-by-one on the top of a range | Lab 02 CIDR drills, 2026-08-31 | 2+ | Reviewing | One range problem with a non-octet-aligned prefix |
| 7 | CIDR calculator trap (`20 / 8 = 2.5` is not remainder 5) | Read the decimal digits as the remainder | CIDR drills, 2026-08-23 | 1 | Reviewing | Passed the 3/3 pop quiz; one more clean recall |
| 8 | CIDR: subnets must be distinct blocks inside the VPC range | `/16` "subnets" treated as if distinct when they weren't. 2026-10-19: picked a non-overlapping `10.0.7.0/24` correctly, but couldn't say why CIDRs can't overlap across AZs | Lab 01 run-2, 2026-08-23 | 2 | Reviewing | Explain why subnet CIDRs can't overlap even in different AZs (one shared VPC address space). Also revisit the deferred CIDR check for `10.0.7.0/24` (inside `10.0.0.0/16`, no overlap) |
| 9 | Resource ownership: which AWS object holds which setting | Shaky on which resource a setting lives on (e.g. subnet vs route table vs association). 2026-10-19: also said route tables and the IGW would go down with an AZ; they are VPC-level, not AZ-level | Lab 01 Q&A, 2026-08-20 | 2 | Open | Recall: where does each setting live in the public-subnet build? |
| 10 | Choosing a Region: edge locations are not a Region property; latency comes from distance to the Region | Picked "more edge locations" as a Region factor and missed distance to users (M01-B01 Q2) | M01-B01, 2026-10-18 | 1 | Open | Recall: name the factors for choosing a Region, and where edge locations fit |
| 11 | Shared responsibility depends on the service (EC2 guest OS is yours; managed services are not) | Said AWS patches the EC2 OS (video check, then M01-B01 Q3). Got the Lambda follow-up right after an explanation | M01-B01, 2026-10-18 | 2 | Reviewing | Fresh case on a different day (e.g. RDS vs EC2 vs S3) with no hints |
| 12 | Match redundancy to the failure domain (N+1 = server, multi-AZ = AZ, multi-Region = Region) | Chose a same-AZ extra instance to survive an AZ outage (M01-B01 Q4) | M01-B01, 2026-10-18 | 1 | Open | Recall: which design survives a server, an AZ, a Region failing? |
| 13 | High availability vs fault tolerance | Blurred the two in the video check; then got M01-B01 Q1 right on first attempt | M01-B01, 2026-10-18 | 1 | Reviewing | Recall 2026-10-19: definitions right, cost needed a prompt. One more clean recall including cost |

*Seeded 2026-10-14 from `PROGRESS.md` and lab Q&A results. Edit anything that doesn't
match my own sense of where I'm stuck.*

## Course plans

### Udemy: Stéphane Maarek, Ultimate AWS Certified Solutions Architect Associate (SAA-C03)

Active course from 2026-10-20. Only the **current section** is planned, from the expanded
screenshot I supply, in blocks of 3 to 4 related videos with ids `S##-B##` (Udemy section
number, block number). A Udemy section number is not an exam domain; exam objectives are
mapped separately where the exam guide supports it (`WORKFLOW.md`, section 9).

| Block | Udemy section | Videos (in order, with durations) | Learning objective | Exam objective(s) | Status |
|---|---|---|---|---|---|
| *(none yet. Share the first section's expanded screenshot.)* | | | | | |

### Percipio (previous course, history preserved)

Planned once per module from the video list I supplied. Every video belongs to exactly one
block. Exam mapping is separate and only where the local exam guide supports it.

**Track 1: Design Secure Architectures** (Percipio syllabus). Each Percipio course is one
module: M01 Architecture & the Well-Architected Framework (planned below), M02 Securing
Access to Resources, M03 Securing Workloads and Applications, M04 Data Security Controls
(M02 to M04 not planned yet; plan each when its video list is shared). Each course ends
with Percipio's own **Take Test** and a **Reflection** item. Those are module-close items,
not blocks.

**M01: AWS Solutions Architect Associate (SAA-C03): Architecture & the Well-Architected
Framework** (listed 1 h 9 s; 6 substantive videos plus a 55 s overview and a 55 s
summary). Plan proposed 2026-10-15; in use from 2026-10-18 (proceeded without changes).

| Block | Module | Videos (in order) | Learning objective | Exam objective(s) | Status |
|---|---|---|---|---|---|
| M01-B01 | M01 | 1. Course Overview (55s, intro)<br>2. AWS Global Infrastructure Essentials (10m 50s)<br>3. High Availability and Fault Tolerance Foundations (10m 38s)<br>4. Shared Responsibility and Security Baselines (9m 22s) | Explain where AWS workloads run (Regions, Availability Zones, edge), how redundancy and failover keep them available, and who is responsible for which security controls | Task 1.1 (AWS global infrastructure; shared responsibility model). Task 2.2 (global infrastructure; HA and fault-tolerant designs). Foundations only; later courses go deeper | Complete, logged 2026-10-19 |
| M01-B02 | M01 | 5. Well-Architected Framework Fundamentals (10m 5s)<br>6. Documenting a Workload with the AWS Well-Architected Tool (9m 23s)<br>7. Turning Requirements into Architecture Decisions (8m 1s)<br>8. Course Summary (55s, wrap-up) | Use the Well-Architected pillars to evaluate a design, document a workload, and turn business requirements into design constraints without locking in implementation too early | No single task. The exam guide frames the exam as based on the Well-Architected Framework and on meeting business requirements (introduction), but I'm not mapping it to a task | Not started. Superseded by the Udemy course on 2026-10-20; not abandoned as a topic, since the Well-Architected material can be covered when Udemy reaches it |

## Block results

One row per logged block. First-attempt score only; hints and retries are noted
separately.

| Block | Date | First-attempt score | Missed / guessed / assisted concepts (revisit #) | Watched | Practiced | Verified | Independently explained | Time (approx.) | Next review action |
|---|---|---|---|---|---|---|---|---|---|
| M01-B01 | 2026-10-18 to 2026-10-19 | 2/5 (single 2/3, multi 0/2) | Region choice vs edge locations (#10), shared responsibility by service (#11, assisted fresh check right), redundancy vs failure domain (#12), HA vs FT (#13, Q1 right) | Yes | Yes (guided; inspected AZs, created and deleted one subnet in `run02x-vpc`) | Yes (CLI check, cleanup, all-region sweep) | No (explained with assistance; revisit later) | Not recorded | Recall: why subnet CIDRs can't overlap across AZs; recall: match redundancy to failure domain. Then M01-B02 |

A score of 4/5 is a local review threshold, not proof of mastery or exam readiness.

## Per-question detail

One block per logged block, added when it's logged:

```
### S##-B## (Udemy) or M##-B## (Percipio) block title (YYYY-MM-DD)
| Q | Type | Topic | My answer + reason | Correct answer | First attempt | Notes |
|---|---|---|---|---|---|---|
| 1 | single / multi (pick N) | ... | ... | ... | right / wrong / partial / guessed | hint used? |
```

### M01-B01 Where AWS runs, how it stays up, who secures what (2026-10-18 to 2026-10-19)
First-attempt score **2/5** (single-answer 2/3, multi-select 0/2). Block logged 2026-10-19.

| Q | Type | Topic | My answer + reason | Correct answer | First attempt | Notes |
|---|---|---|---|---|---|---|
| 1 | single | HA vs fault tolerance (no interruption allowed) | B: automatic redirect, budget approved | B | right | Reasoning sound |
| 2 | multi (pick 3) | Choosing a Region | B, E, F: wanted faster responses via edge locations | B, D, E | wrong (2 of 3 right; picked F, missed D) | Mixed up edge locations with Region latency (revisit #10) |
| 3 | single | Shared responsibility, EC2 vs RDS | C: "AWS is responsible for core service stuff" | D | wrong | EC2 guest OS is the customer's (revisit #11) |
| 4 | multi (pick 2) | Surviving the loss of an AZ | B, C: health checks and an extra instance | B, E | wrong (1 of 2 right; picked same-AZ N+1, missed multi-AZ) | Redundancy not matched to failure domain (revisit #12) |
| 5 | single | Key separation with KMS | A: separate roles for key policy and data access | A | right | Reasoning sound |

Clarification check (not scored): Lambda, who owns what. Answered C correctly after the Q3
explanation, with "serverless handles everything" as the reason (slightly too strong: code,
IAM and data access stay with the customer).

Pattern worth watching: in Q2, Q3 and Q4 I picked options that sound like good practice
without checking them against the decisive requirement in the scenario.

Per-video checks (all four done): overview recalled well (missed HA/FT distinctions and
the Shared Responsibility Model); Outposts needed a hint (answered on-premises correctly);
HA vs FT wording blurred; KMS answered correctly. Flags carried to review: Outposts
management-link detail, data residency, IAM roles with temporary credentials.

Correction noted *(supplemental, standard AWS behavior)*: a subnet lives in one AZ; a VPC
spans several.

## Exercises and evidence

Four separate statuses (`WORKFLOW.md`, section 5): Watched, Practiced, Verified, Independently explained. Never merge them, and never record guided work as independent.

| Block | Exercise | Type (Udemy lesson / lab reuse / extension / new / design) | Where (folder) | Practiced | Verified | Independently explained | Guided or independent | Cleanup | Unresolved |
|---|---|---|---|---|---|---|---|---|---|
| M01-B01 | Find the single point of failure in `run02x-vpc`: read each subnet's AZ, predict the impact of an AZ outage, create `m01-subnet-1b` (`10.0.7.0/24`, us-east-1b), explain why a subnet is one AZ, delete it | Extension of lab 01 plus a design discussion | `01-vpc-basics/` (my reflection is pending; to be pasted by me into that README) | Yes | Yes (CLI check of the subnet) | No | Guided | Done; all-region sweep clean 2026-10-19 | Why subnet CIDRs can't overlap across AZs (revisit #8) |

## Later in the course

Topics that came up before their lesson. Explained only to the minimum needed, then
parked here.

| Topic | Came up in | Question | Expected lesson |
|---|---|---|---|
| *(none yet)* | | | |

## Resume point

Where to pick up if a block was interrupted.

| Block | Videos received | Stage reached | Next action |
|---|---|---|---|
| *(none in progress)* | | | |

## Parked / unresolved

- **2026-10-14, Domain 1 review transcript (5 videos pasted as one block).** Received
  under the earlier Skill Builder assumption and **not summarised, quizzed or logged**.
  The raw text was not saved. If it belongs to the Percipio course, it will be handled
  when its module is planned. Otherwise it can be dropped. Nothing depends on it.

## Exam pacing

| Item | Value |
|---|---|
| Exam date | 2026-11-20 |
| Percipio listed duration (previous course) | 32 h 35 min (21 courses = 30 h 25 min, plus 3 other items = 2 h 10 min). Listed video time, not total study time |
| Udemy course duration | Not yet known; comes from the section screenshots |
| Pace preference | 1.5 to 2 blocks per day, flexible, not a minimum |
| First-pass finish | Re-estimate after the first two Udemy blocks. The earlier Nov 7 to 10 target was set for the Percipio course length and no longer stands |
| Days from 2026-10-15 to Nov 7 / Nov 10 / Nov 20 | 23 / 26 / 36 |
| Observed time per block | Percipio M01-B01: not recorded. **Udemy: measure the first two blocks in full** (videos, checks, quiz, exercise) |
| Estimated remaining workload | *(not yet known)* |
| Gap to first-pass target | *(not yet known)* |
| Module-end Percipio test scores | *(none yet)* |

## Running metrics

| Metric | Value |
|---|---|
| Percipio modules completed | 0 |
| Udemy blocks completed | 0 |
| Blocks completed | 1 |
| Questions answered (first attempt) | 5 |
| Overall first-attempt accuracy | 2/5 (40%) |
| Single-answer accuracy | 2/3 (67%) |
| Multi-select accuracy | 0/2 (0%) |
| Blocks under 4/5 | 1 (M01-B01) |
| Open revisit items | 6 |
| Reviewing | 7 |
| Solid | 0 |
