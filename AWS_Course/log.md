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
| 10 | Choosing a Region: edge locations are not a Region property; latency comes from distance to the Region | Picked "more edge locations" as a Region factor and missed distance to users (M01-B01 Q2) | M01-B01, 2026-10-18 | 1 | Reviewing | Right on first attempt in S03-B01 Q5 (2026-10-21). One more clean recall on a different day: name the factors for choosing a Region, and where edge locations fit |
| 11 | Shared responsibility depends on the service (EC2 guest OS is yours; managed services are not) | Said AWS patches the EC2 OS (video check, then M01-B01 Q3). Got the Lambda follow-up right after an explanation | M01-B01, 2026-10-18 | 2 | Reviewing | Fresh case on a different day (e.g. RDS vs EC2 vs S3) with no hints |
| 12 | Match redundancy to the failure domain (N+1 = server, multi-AZ = AZ, multi-Region = Region) | Chose a same-AZ extra instance to survive an AZ outage (M01-B01 Q4) | M01-B01, 2026-10-18 | 1 | Reviewing | Right on first attempt in S03-B01 Q3 (2026-10-21). One more clean recall on a different day: which design survives a server, an AZ, a Region failing? |
| 13 | High availability vs fault tolerance | Blurred the two in the video check; then got M01-B01 Q1 right on first attempt | M01-B01, 2026-10-18 | 1 | Reviewing | Recall 2026-10-19: definitions right, cost needed a prompt. One more clean recall including cost |
| 14 | Which services are global vs regional (IAM and Route 53 global; EC2 and Lambda regional) | In the S03-B01 exercise predicted IAM regional and Lambda global; the console showed the opposite. Explained global vs regional scope correctly afterwards | S03-B01, 2026-10-21 | 2 | Open | Another recall on a different day with no notes. 2026-10-22 recall: 5 of 6 right; put CloudFront as regional while unsure (it is global) |
| 15 | Account alias: a friendly, unique sign-in URL in place of the 12-digit account ID (not a security control) | Answered the alias purpose question with a different idea (removing a compromised user), then learned the real purpose | S04-B01, 2026-10-22 | 1 | Reviewing | Recall 2026-10-26 was right (friendlier sign-in URL; account ID still shows after sign-in), with wording fixes. One more clean recall on a different day |
| 16 | IAM user and group access is long-term; temporary credentials come from roles | Described user and group access as temporary in the video check | S04-B01, 2026-10-22 | 1 | Open | Confirm at S04-B04 (roles): which identities get temporary credentials, and why |
| 17 | Policy structure: Version, Id, Statement (Sid, Effect, Principal, Action, Resource, Condition) | Could not list the policy parts in the video 1 recall and the video 4 gaps; can read a policy with wildcards | S04-B02, 2026-10-24 | 1 | Open | Recall on a different day: name the parts, and say which four matter for the exam |
| 18 | Inline policy vs a managed policy attached directly | Was unsure of the difference; chose the managed-policy-on-groups answer correctly in the quiz | S04-B02, 2026-10-26 | 1 | Reviewing | Recall on a different day: which is reusable, and which is deleted with its user |
| 19 | MFA device types and which are physical (virtual app, U2F security key, hardware key fob, GovCloud key fob) | Picked the virtual app for a question that required a physical device (S04-B02 Q5); the fresh check afterwards was right | S04-B02, 2026-10-26 | 1 | Reviewing | Recall on a different day: name the four types and say which are physical |
| 20 | A password policy cannot require MFA; MFA is a separate per-identity control | Wrote in the reflection that password policies can require two-factor authentication | S04-B02, 2026-10-26 | 1 | Open | Recall on a different day: what does a password policy control, and what does it not? |
| 21 | Reading the question's decisive requirement instead of answering the one I expected | Same pattern in Percipio M01-B01 (Q2 to Q4) and S04-B02 Q5 (answered for a different requirement than 'physical') | M01-B01, 2026-10-18 | 2 | Open | Before choosing, underline the word that decides it in the question. Track whether it recurs. S04-B03: no recurrence (5/5) |
| 22 | The recommended alternatives to long-lived keys (CloudShell, CLI with IAM Identity Center) exist to avoid stored keys | Answered the alternatives question backwards in the S04-B03 video 2 check, describing the benefit of long-lived keys | S04-B03, 2026-11-02 | 1 | Open | Recall on a different day: what problem do the alternatives solve, and why are long-lived keys the risk? |
| 23 | Authentication vs authorization (the access key authenticates; the policy authorizes) | Session recall 2026-11-02 was partial (said MFA is authentication and did not say that an access key handles it); then S04-B03 Q5 was right on first attempt | S04-B03, 2026-11-02 | 1 | Reviewing | One more clean recall on a different day: define each and say which an access key handles |

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
| S03-B01 | Section 3: Getting started with AWS (3 lectures, 13 min; sections 1 and 2 were intro and code/slides download, skipped as administrative) | 1. AWS Cloud Overview - Regions & AZ (8:01)<br>2. [Important] AWS Console UI Update (1:14, administrative: no check)<br>3. Tour of the AWS Console & Services in AWS (3:52, hands-on demo) | Explain what AWS Regions, Availability Zones and edge locations are and how to choose a Region; get oriented in the console and tell global services from regional ones | Task 1.1 and Task 2.2 (global infrastructure: Regions, Availability Zones). Foundations only; overlaps Percipio M01-B01 | Complete, logged 2026-10-21 |
| S04-B01 | Section 4: IAM & AWS CLI (20 lectures, 57 min; plus a section quiz) | 1. IAM Introduction: Users, Groups, Policies (3:22)<br>2. IAM Users & Groups Hands On (6:23, Udemy hands-on)<br>3. AWS Console Simultaneous Sign-in (1:48) | Explain what IAM users and groups are, why you create them instead of using root, and how to sign in as an IAM user | Task 1.1 (IAM users, groups, roles and policies; applying best practices to IAM and root users) | Complete, logged 2026-10-22 |
| S04-B02 | Section 4 | 4. IAM Policies (2:50)<br>5. IAM Policies Hands On (8:01, Udemy hands-on)<br>6. IAM MFA Overview (4:10)<br>7. IAM MFA Hands On (4:01, Udemy hands-on) | Explain how policies decide what an identity may do (least privilege) and how MFA proves who it is | Task 1.1 (policy-based authorization, least privilege, MFA on root and IAM users) | Complete, logged 2026-10-26 |
| S04-B03 | Section 4 | 8. AWS Access Keys, CLI and SDK (4:03)<br>12. AWS CLI Hands On (3:50, Udemy hands-on)<br>14. AWS CloudShell (3:53)<br>Setup videos 9 to 11 (Windows 1:45, Mac OS X 1:28, Linux 1:30) skipped as administrative; the 0:12 CloudShell Region Availability item is a short read | Explain how access keys, the CLI and SDKs let code and people call AWS, and when CloudShell is the easier option | Task 1.2 (application configuration and credentials security, from its knowledge list). Foundations only | Complete, logged 2026-11-03 |
| S04-B04 | Section 4 | 15. IAM Roles for AWS Services (1:39)<br>16. IAM Roles Hands On (2:05, Udemy hands-on)<br>17. IAM Security Tools (0:54)<br>18. IAM Security Tools Hands On (2:23, Udemy hands-on) | Explain why AWS services use roles instead of stored keys, and which IAM tools show who can do what | Task 1.1 (roles, role-based access, access visibility) | Planned |
| S04-B05 | Section 4 (section close) | 19. IAM Best Practices (1:29)<br>20. IAM Summary (1:05, wrap-up)<br>IAM & AWS CLI Quiz (Udemy section quiz) | Pull the IAM ideas together as a short best-practices checklist | Task 1.1 (security best practices). Practical to be decided: a read-only self-check of my own account against the checklist | Planned |

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
| S04-B03 (Udemy) | 2026-10-28 to 2026-11-03 | 5/5 (single 3/3, multi 2/2), no guesses | No quiz misses. Check gaps: purpose of access keys (partial), recommended alternatives answered backwards (#22), authentication vs authorization recall partial (#23) | Yes (3 of 3 videos; times 3:19, about 15 min with the hands-on, 3:50) | Yes (test user, key and named profile; access denied with exit 254; CloudShell watched; key rotation on the CLI user) | Yes (CLI checks after each step; old key deactivated then deleted; one Active key remains) | Not yet (explained in session; confirm at a later recall) | 90 to 120 min, learner's estimate, including the rotation practical and breaks | Recall #22, #23, #16 on different days. Notes in `AWS_Course/notes/S04-B03.md` |
| S04-B02 (Udemy) | 2026-10-23 to 2026-10-26 | 4/5 (single 2/3, multi 2/2); Q2 partly unsure | Q5: physical vs virtual MFA (#19, then right on a fresh check) and reading the stem (#21). Check gaps: policy parts (#17), inline vs direct (#18), password policy vs MFA (#20). Recall: account alias right (#15) | Yes (4 of 4 videos; times 3:56, about 18 min with the hands-on, 3:20, one untimed) | Yes (policies hands-on; MFA setup followed on my side; cleanup of the extra group and policy) | Yes (CLI: no leftover groups or policies, root MFA on, admin user's policy via group only) | Not yet (explained in session; confirm at a later recall) | 20 to 25 min, learner's estimate. Likely an underestimate: videos 1 to 3 alone were about 25 min | Recall #17 to #21 on different days. Notes in `AWS_Course/notes/S04-B02.md` |
| S04-B01 (Udemy) | 2026-10-21 to 2026-10-22 | 5/5 (single 3/3, multi 2/2), no guesses | No quiz misses. Check gaps: policies not mentioned, "temporary" access (#16), account alias purpose (#15). Session recall: global vs regional 5 of 6 (#14) | Yes (3 of 3 videos; video 1 timed about 3 min) | Yes (created a user and group, signed in; read-only check of group inheritance) | Yes (console and CLI agree: policy attached via the group, none direct) | Not yet (explained in session; confirm at a later recall) | About 20 to 25 min, learner's estimate, only video 1 timed | Recall #14, #15, #16 on different days. Notes in `AWS_Course/notes/S04-B01.md` |
| S03-B01 (Udemy) | 2026-10-20 to 2026-10-21 | 5/5 (single 3/3, multi 2/2), no guesses | No quiz misses. Prediction miss: IAM vs Lambda scope (#14). Check gaps: how to choose a Region (#10, then right in the quiz), edge vs Region (#10), regional resources per Region (right in Q2 and the exercise) | Yes (videos 1 and 3; video 2 skipped as administrative) | Yes (console tour: Global vs Region label for four services, switched Ohio and back) | Yes (learner's own observations of the console and VPC list) | Not yet (explained in session; confirm at a later recall) | About 30 to 40 min, estimated and not timed: videos about 8.5 min at 1.5x and 1.25x speed (calculated), review about 20 to 30 min (learner's estimate) | Recall #14 and #10 on a different day. Notes saved in `AWS_Course/notes/S03-B01.md` |
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

### S04-B03 Access keys, the CLI and SDK, and CloudShell (Udemy, 2026-10-28 to 2026-11-03)
First-attempt score **5/5** (single-answer 3/3, multi-select 2/2), no guesses marked. Logged 2026-11-03.

| Q | Type | Topic | My answer + reason | Correct answer | First attempt | Notes |
|---|---|---|---|---|---|---|
| 1 | single | Occasional commands with no stored secret | C: CloudShell uses the existing console login | C | right | Caught the deciding requirement |
| 2 | multi (pick 2) | Access key facts | B, D: the secret is shown once; ID is like a username, secret like a password | B, D | right | Added that the key ID stays visible; corrected "delete after authentication" to delete throwaway keys and rotate real ones |
| 3 | single | Code inside a Node.js application | A: the SDK, inside the app | A | right | Reasoning brief but sound |
| 4 | multi (pick 2) | Access denied while the key is Active | A, C: a policy was removed or the user left the group | A, C | right | Reasoning sound |
| 5 | single | Valid identity but a denied list command | B: authentication worked, authorization failed | B | right | Tied it to the hands-on; corrected "silent deny" to access denied, exit 254 |

Per-video checks: video 1 recalled the three ways in and that keys stay private; purpose of access keys partly answered (described what the CLI enables). Video 2 recalled the whole hands-on and cleanup; the recommended alternatives were answered backwards (#22). Video 3 recalled CloudShell, its files and its Region limit; the purpose (no keys needed) was answered well.

Session recall (authentication vs authorization): authorization right with a good example; authentication right but narrow; did not say an access key handles authentication (#23).

Practical, verified from the CLI at each step: test user, key and named profile created, then access denied with exit 254 after detaching the policy, then user, key and local profile removed. Key rotation on the CLI user as the admin IAM user: freed a slot, created the new key, tested it in a temporary profile, deactivated the old key (the default profile then failed with an invalid token error), swapped the profile names, deleted the old key. Old downloaded key files deleted. Screenshots reviewed: clean (no account ID, key IDs or secrets).

Learner reflection, in my own words (verbatim):
1. Understanding authorization vs authentication with how permissions/ group-permissions work and how if effects what a user can/can't do. How important authentication is best practices for security. Also different was to manage AWS through consolde, CLI and SDK. Also learn about Cloudshell which is access through the loggin in AWS consolde account.
2. Did several exercises with creating groups with permissions along with attaching policies to users and testing commands before and after removing user from the group or detaching the policy from the user. Learn about MFA options and how to set them up (Auth app, 2FA or key fob) Dabbled with Cloudshell a little AWS console access provides the use of Cloudshell. Also, did a much needed key rotation because it's best practice and I was doing something that was risky.
3. Ran test commands before and after removing user from group/detaching policy the resulted in accessDenied notfications. I had the original access key .csv on my maching for over several months which is a big security risk, especially if that file happened to be in a synced folder. During the key rotation I created new key, deactivated old key and ran a test before removing old key. We did a get-caller-identity command on the default to determine it was invalidToken and on the new key to verify it's active
4. Everything is making sense in terms of users having permissions based on being connected to a group or policy. I have better a better understanding with securing AWS accounts and best practices. Also a better understanding with users, groups, policies and permission.

### S04-B02 IAM policies and MFA (Udemy, 2026-10-23 to 2026-10-26)
First-attempt score **4/5** (single-answer 2/3, multi-select 2/2). Q2 was right but partly unsure (E). Logged 2026-10-26.

| Q | Type | Topic | My answer + reason | Correct answer | First attempt | Notes |
|---|---|---|---|---|---|---|
| 1 | single | Removing a user from their only group | C: permissions came from the group, so they leave with it; the user stays | C | right | Reasoning sound |
| 2 | multi (pick 2) | Reading a policy with s3:Get* and s3:List* | B, E: the wildcard covers actions starting with Get or List; E was a partly unsure pick | B, E | right (partly unsure) | Called it IAM read-only; it is S3 read access |
| 3 | single | One policy for 40 users, changeable in one place | D: one managed policy attached to groups is the most efficient | D | right | Reasoning sound |
| 4 | multi (pick 2) | Responding to a leaked password | A, C: reset the password first, then add MFA | A, C | right | Reasoning sound |
| 5 | single | A physical MFA option without one key per user | A: virtual MFA app, because it needs no extra object | B | wrong | Missed "physical" in the question (#19, #21) |

Fresh check after Q5 (not scored): "which is NOT a physical device" answered C (virtual MFA app) correctly, with sound reasoning.

Per-video checks: video 1 recalled inheritance across two groups, inline access, and part of the policy structure (could not list the parts); inline policy purpose answered well. Video 2 recalled the three ways a permission arrives and the visual builder; wildcard purpose answered correctly. Video 3 recalled password policy and MFA with the device types; "VPN keys" corrected to key fobs; policy-vs-MFA contrast answered correctly. Video 4 recalled the password policy settings and the root MFA steps; more than one MFA device answered well, with a plan to add a second method.

Session recall (account alias): right, with two wording corrections (#15).

Read-only verification (CLI): no `devs` group or `test-policy` left; only the `admin` group; the admin user's policy comes through the group with nothing direct or inline; root MFA enabled. No custom password policy is set.

Learner reflection, in my own words (verbatim):
1. gaining more understanding about policies, groups, security practices, with two-factor authentications, or multi-factor authentications, whether it be hardware, YubiKeys, key fobs, or authentication apps. So overall, just best practices for permissions and access securing accounts and minimizing security risks and following least privilege practices.
2. So for policies that open the door for certain permissions, I can create policies where I can assign them directly to users. Or I can create a group that has policies configured for the group that can grant access to users assigned to that group. For password policies, we have a lot of customization options as far as password length, characters, number of characters, special characters, numbers, etc. Rotating password or resetting passwords after a certain amount of days, and also not allowing the use of old passwords.
3. when removing a user from a group, their access was denied because the policies from the group gave the user access to those permissions. Also, when assigning only read-only access, we were not able to create a user group with the user account because the user account is only assigned read-only access. So we got a denied message in there. Also, with password policies requiring two-factor authentication and dynamic password requirements, is something that you can make mandatory for creating user accounts. It's best practices, so things are more secure if a user's credentials may be compromised.
4. permissions and policies and IAM management and security hopefully behave in a way with least privilege security in mind. Mitigating risks in case credentials are compromised. When practices are not followed and things are sloppy or messy, security can be compromised. Not removing old policies or unused groups, not making dynamic passwords mandatory for user accounts, as well as two-factor authentication or multi-factor authentication. removing one off users from inline policies. Or even direct policies. For minimum privilege practices to make sure things stay secured and there's no extended backdoor with old access that may have been forgotten or and not taken care of..

### S04-B01 IAM users, groups, and policies (Udemy, 2026-10-21 to 2026-10-22)
First-attempt score **5/5** (single-answer 3/3, multi-select 2/2), no guesses marked. Logged 2026-10-22.

| Q | Type | Topic | My answer + reason | Correct answer | First attempt | Notes |
|---|---|---|---|---|---|---|
| 1 | single | Add a new developer to an existing team | C: group assignment is best practice for efficiency and security | C | right | Reasoning sound |
| 2 | multi (pick 2) | Group rules | D, E: groups contain only users; a user can belong to several groups | D, E | right | Reasoning sound |
| 3 | single | Spotting root from the console header | A: only an account ID means root, which is not best practice | A | right | Slightly over-inferred that no user exists |
| 4 | multi (pick 2) | Least privilege for a contractor | B, D: only needed access; shut it down after two weeks | B, D | right | Reasoning sound |
| 5 | single | Two accounts open at once | D: multi-session support lets one browser hold different accounts | D | right | Reasoning sound |

Per-video checks: video 1 recall correct on users, groups, least privilege and root, but called access "temporary" and omitted policies and "groups contain only users" (#16); group purpose answered correctly. Video 2 recall described the create-user, create-group and inheritance steps; account alias purpose missed (#15). Video 3 recall correct on multi-session support; purpose connected to the private-window workaround.

Read-only verification (console report plus CLI): the user's policy is attached via the group, with nothing attached directly. Session recall (global vs regional): 5 of 6 right, CloudFront missed (#14).

Learner reflection, in my own words (verbatim):
1. Gain a better understanding with Users, Groups and how someone managing IAM would use best practices with permissions and provision access.
2. Created a user account from my root account. Create a group and set the permissions/access to AdminAccess. Added a user to the group and checked permissions that the user had after being assigned to the group.
3. Going in the user we seen that the policy was set to AdminAcess it was Attached via Group Admin. Meaning the AdminAccess permissions came from being assigned the the admin group. From IAM User groups and selecting admin then selecting permision we can see the policy in this group is AdminAccess, meaning users added to this group adopt the AdminAccess policy.
4. Just best practices for efficiency for granting access for new users without having to manage them individually and for security protection being able to remove users in case one is compromised.

### S03-B01 Getting started with AWS (Udemy, 2026-10-20 to 2026-10-21)
First-attempt score **5/5** (single-answer 3/3, multi-select 2/2), no guesses marked. Logged 2026-10-21.

| Q | Type | Topic | My answer + reason | Correct answer | First attempt | Notes |
|---|---|---|---|---|---|---|
| 1 | single | Region choice with a legal data-location requirement | C: to abide by data location compliance | C | right | Reasoning sound |
| 2 | multi (pick 2) | Global vs regional (EC2 and Route 53) | B, D: regional services are exclusive to their Region; global ones are present regardless | B, D | right | Reasoning sound |
| 3 | single | Multi-AZ for a data center failure | A: redundancy across AZs in the same Region | A | right | Revisit #12 right on first attempt |
| 4 | multi (pick 2) | A service missing in the Region | B, E: check the list; switch Regions if latency and compliance allow | B, E | right | Reasoning sound |
| 5 | single | Edge network vs Region choice | D: compliance first, then latency and service availability | D | right | Reasoning skipped the edge-network half; revisit #10 right on first attempt |

Per-video checks: video 1 recall centered on market share and company examples and missed how to choose a Region; AZ purpose answer good (cost trade-off carried from Percipio). Video 3 recall good; the global vs regional purpose answer blended in service availability and said EC2 was "automatically selected" (it was the Region the instructor chose). Flags carried to review: how to choose a Region, edge vs Region, regional resources only in their own Region.

Exercise prediction: Global = Route 53, Lambda; Region = IAM, EC2. Console result: Global = IAM, Route 53; Region = EC2, Lambda (revisit #14).

Learner reflection, in my own words (verbatim):
1. What services were available between Gloabal vs Regional settings
2. First selecting a region and selecting different services to see if something changes
3. Console reveal if a service was global or regional. We seen a regional example when we did the VPC test with the Ohio region selected showing none and swithing back to N. Virgina showing my VPC's
4. Everything can't be global. Compliance, lantency, costs are things that are important when designing a solution and choosing an appropriate location has to align with that.

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
| S04-B03 | Udemy hands-on (CLI with a test user's key, named profile, access denied), CloudShell watched, then key rotation on the CLI user as an admin IAM user (extension of the key lesson) | Udemy hands-on lesson plus a real-world extension | None (no files; study notes in `AWS_Course/notes/S04-B03.md`) | Yes | Yes (CLI at each step; only one Active key remains) | Not yet | Guided | Test user, key, profile and key files removed; old key deactivated then deleted; screenshots reviewed and clean | Why alternatives to long-lived keys exist (#22); authentication vs authorization (#23) |
| S04-B02 | Udemy hands-ons (policies and MFA), then read-only CLI verification of the cleanup (no leftover test group or policy, root MFA on) | Udemy hands-on lessons plus a read-only verification | None (no files; study notes in `AWS_Course/notes/S04-B02.md`) | Yes | Yes (CLI) | Not yet | Guided | The extra group and policy were deleted before verification; nothing new created | Policy parts and inline vs direct (#17, #18); a custom password policy is not set (optional) |
| S04-B01 | Udemy hands-on (create a user and group, sign in), then a predict-then-check on my own account: is the admin policy attached directly or via the group (read-only, $0) | Udemy hands-on lesson plus a read-only verification | None (no files; study notes in `AWS_Course/notes/S04-B01.md`) | Yes | Yes (console and CLI agree) | Not yet | Guided | Nothing to delete; the user and group are kept as my real admin setup. All-region billable sweep clean 2026-10-22 | Why a group edit affects every member; account alias purpose (#15) |
| S03-B01 | Console tour: predict then check Global vs Region label for IAM, EC2, Route 53, Lambda; switch to Ohio and compare the VPC list; switch back | Udemy hands-on lesson, extended with a predict-then-check task (read-only, $0) | None (no files; study notes in `AWS_Course/notes/S03-B01.md`) | Yes | Yes (my own observations) | Not yet | Guided | Nothing created; console switched back to N. Virginia | Whether a signed-out console returns to the last Region (AWS docs say yes unless IAM Identity Center is used); default Region setting still to do |
| M01-B01 | Find the single point of failure in `run02x-vpc`: read each subnet's AZ, predict the impact of an AZ outage, create `m01-subnet-1b` (`10.0.7.0/24`, us-east-1b), explain why a subnet is one AZ, delete it | Extension of lab 01 plus a design discussion | `01-vpc-basics/` (my reflection is pending; to be pasted by me into that README) | Yes | Yes (CLI check of the subnet) | No | Guided | Done; all-region sweep clean 2026-10-19 | Why subnet CIDRs can't overlap across AZs (revisit #8) |

## Later in the course

Topics that came up before their lesson. Explained only to the minimum needed, then
parked here.

| Topic | Came up in | Question | Expected lesson |
|---|---|---|---|
| Edge locations and Local Zones, and whether they matter when choosing a Region | S03-B01, my own question | Edge locations are not a Region-choice factor; Local Zones put a Region closer to big cities for latency. Details not yet taught | The instructor says edge locations come in the global section, around the middle of the course |
| Multi-account strategies (many accounts for test, production and so on) | S04-B01, multi-session support video | Multi-session support makes switching between accounts easy; how companies organize many accounts is not yet taught | Later in the course, not yet identified |
| IAM Identity Center and the CLI with temporary credentials | S04-B03, console key recommendations | The console recommends it instead of long-lived keys; not yet taught | Not yet identified (roles come first, in S04-B04) |
| Resource-based policies (such as S3 bucket policies) and explicit Deny overriding Allow | S04-B02, policy structure video | Identity-based policies omit Principal and resource-based ones include it; an explicit Deny wins. Mentioned as supplemental only | Likely the S3 section |

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

- **2026-10-21, to do for me:** set the console's default Region to N. Virginia (gear icon, user settings), so every sign-in starts where the repo labs live.

- **2026-10-22, to do for me:** review the CLI user's credentials (see the discussion in chat) and plan a least-privilege CLI identity for lab 08. (2026-11-03: the key was rotated, the inactive key and the old key files were deleted. Still open: the CLI user's console password, a least-privilege CLI identity in lab 08, and a second kind of MFA.) Add a second kind of MFA to my admin user and root so one lost device is not a lockout.

- **2026-10-26, optional:** set a custom password policy (raise the minimum length and require character types). Do not turn on expiration with administrator reset while one console admin exists, or I could lock myself out.

## Exam pacing

| Item | Value |
|---|---|
| Exam date | 2026-11-20 |
| Percipio listed duration (previous course) | 32 h 35 min (21 courses = 30 h 25 min, plus 3 other items = 2 h 10 min). Listed video time, not total study time |
| Udemy course duration | Not yet known; comes from the section screenshots |
| Pace preference | 1.5 to 2 blocks per day, flexible, not a minimum |
| First-pass finish | Re-estimate after the first two Udemy blocks. The earlier Nov 7 to 10 target was set for the Percipio course length and no longer stands |
| Days from 2026-10-15 to Nov 7 / Nov 10 / Nov 20 | 23 / 26 / 36 |
| Observed time per block | Percipio M01-B01: not recorded. **Udemy S03-B01: about 30 to 40 min, estimated and not timed** (videos about 8.5 min at 1.5x and 1.25x, review about 20 to 30 min). Time the next block with a phone timer to get a measured number |
| Udemy S04-B01 | About 20 to 25 min, learner's estimate, only video 1 timed. Listed video time is 11:33 plus checks, quiz, practical and reflection, so this is probably an underestimate |
| Udemy S04-B03 | 90 to 120 min, learner's estimate. Includes the rotation practical and breaks; listed video time is about 11 min |
| Udemy S04-B02 | 20 to 25 min, learner's estimate. Likely an underestimate: videos 1 to 3 alone were about 25 min (one video 18 min with the hands-on), plus the checks, quiz, practical and reflection |
| Udemy pace so far | Four blocks, all estimated and not fully timed (S03-B01 about 30 to 40 min, S04-B01 about 20 to 25 min, S04-B02 about 20 to 25 min, S04-B03 about 90 to 120 min with the rotation practical). The earlier ones are likely low, and S04-B03 includes an unplanned extension. Not enough to project the course. Needs the course's total video minutes and one properly timed block |
| Playback speed | 1.25x worked best for understanding; 1.5x was fine for material already familiar |
| Estimated remaining workload | *(not yet known)* |
| Gap to first-pass target | *(not yet known)* |
| Module-end Percipio test scores | *(none yet)* |

## Running metrics

| Metric | Value |
|---|---|
| Percipio modules completed | 0 |
| Udemy blocks completed | 4 |
| Blocks completed | 1 |
| Questions answered (first attempt) | 25 (Percipio 5, Udemy 20) |
| Overall first-attempt accuracy | 21/25 (84%); Udemy so far 19/20 |
| Single-answer accuracy | 13/15 (87%) |
| Multi-select accuracy | 8/10 (80%) |
| Blocks under 4/5 | 1 (M01-B01) |
| Open revisit items | 10 |
| Reviewing | 13 |
| Solid | 0 |
