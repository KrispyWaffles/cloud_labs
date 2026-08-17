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

## Exit check

Can I draw and build a VPC with public/private subnets from memory, and explain it to
someone else? If yes across all 10 labs, the fundamentals are solid enough to move on.

## What's next

Re-implement labs 01, 02, 03, 05, and 06 (VPC, EC2, NAT Gateway, Load Balancer/Auto
Scaling, RDS) in Terraform — same infrastructure, built on understanding this time
instead of copy-pasted HCL.
