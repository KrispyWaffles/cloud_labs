# cloud_labs

Ten progressive, hands-on AWS labs — deliberate practice on cloud networking and
infrastructure fundamentals before layering on Infrastructure as Code (Terraform) and
container orchestration (Kubernetes) elsewhere.

## Why this repo exists

Two earlier exploration projects (a Terraform-provisioned AWS app, a containerized app
on Kubernetes) surfaced a gap: the fundamentals — VPCs, subnets, routing, security
groups vs. NACLs, load balancing — weren't solid enough to build on with real
confidence. This repo closes that gap directly: each lab is hand-built in the AWS
console/CLI first, broken and fixed on purpose where useful, and documented in plain
language before any of it gets abstracted into Terraform.

This is not a portfolio-polish project. It's reps. The value is in the progression and
the documented "what broke and why" in each lab's README, not in any single lab looking
impressive on its own.

## Labs

| # | Lab | Builds on |
|---|-----|-----------|
| [01](01-vpc-basics/) | VPC Basics | — |
| [02](02-ec2-public-subnet/) | EC2 in a Public Subnet | 01 |
| [03](03-nat-gateway-private-subnet/) | NAT Gateway for a Private Subnet | 01, 02 |
| [04](04-security-groups-vs-nacls/) | Security Groups vs. NACLs | 02, 03 |
| [05](05-load-balancer-autoscaling/) | Load Balancer + Auto Scaling | 02, 04 |
| [06](06-rds-private-tier/) | RDS in a Private Tier | 03, 05 |
| [07](07-vpc-peering/) | VPC Peering | 01 |
| [08](08-iam-least-privilege/) | IAM Least Privilege | 02 |
| [09](09-s3-cloudfront-static-site/) | S3 + CloudFront Static Site | — |
| [10](10-vpc-endpoints-privatelink/) | VPC Endpoints / PrivateLink | 03, 09 |

Each lab folder has its own README covering: what was built, the steps taken, what
broke (if anything) and why, and what it taught.

## Incidents

**2026-08-22 — leftover billable infrastructure from an earlier project.** While
working through lab 01's second independent rebuild, a routine check of the AWS
billing dashboard turned up a live EC2 instance and RDS database that had been
running continuously for 11 days — leftovers from one of the earlier exploration
projects mentioned above (the Terraform-provisioned app), forgotten and never torn
down after that project wrapped. Total damage: over $100 in charges for
infrastructure that wasn't part of any active learning.

The account did have a budget alert configured to catch exactly this ($1 threshold,
notify on any spend over $0.01, sent to an address I do actively check) — and it
worked. It fired on July 22. I saw it and didn't stay on top of it. The alert did its
job; the follow-through didn't.

What changed as a result:
- Identified and terminated the leftover EC2 instance and RDS database, and cleaned
  up the empty S3 buckets tied to the same project.
- Added a mandatory end-of-session check to the lab workflow: verify nothing billable
  is still running before closing out any session that touched EC2, RDS, or NAT
  Gateway resources. This doesn't depend on remembering to check an alert — it's a
  scripted step at the end of every session that touches billable infrastructure.

Costly lesson, but a real one: tutorials don't usually make you find and kill an
actual cost leak under time pressure. This is documented here because it happened,
not because it's flattering — deliberate practice includes the mistakes, not just the
clean labs.

## Exit check

Can I draw and build a VPC with public/private subnets from memory, and explain it to
someone else? If yes across all 10 labs, the fundamentals are solid enough to move on.

## What's next

Re-implement labs 01, 02, 03, 05, and 06 (VPC, EC2, NAT Gateway, Load Balancer/Auto
Scaling, RDS) in Terraform — same infrastructure, built on understanding this time
instead of copy-pasted HCL.
