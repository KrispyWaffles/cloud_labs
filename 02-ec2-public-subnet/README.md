# EC2 in a Public Subnet

## What this lab builds

An EC2 instance launched into the public subnet from lab 01 (`run02x-vpc` →
`run02x-publicSubnet`), reachable via SSH from a single trusted IP and able to reach
the internet outbound. New concept versus lab 01: a **security group** — an
instance-level firewall, separate from the subnet-level route table mechanism that
controlled public/private in lab 01. The SSH rule is scoped to exactly one address
using a `/32` CIDR block (zero free bits, the smallest possible block) — a direct
callback to the CIDR math from lab 01's drilling.

## Steps taken

*(Demo pass and a guided console walkthrough are done below. The independent build —
Rebuild pass, unaided — is planned for the next session; final "What broke" and "What
I learned" get filled in from that pass, per the usual process.)*

**Demo pass (CLI), 2026-08-30:**
1. Verified the account was clean (no running EC2/RDS) before starting.
2. Created security group `lab02-ec2-sg` in `run02x-vpc` — inbound rule: SSH (22)
   from my own public IP as a `/32`.
3. Created SSH key pair `lab02-key`, saved the private key to `~/.ssh/` — outside the
   git repo, never committed (leaking a key into git history isn't a "delete and
   move on" mistake — it stays recoverable from history).
4. Launched a `t2.micro` into `run02x-publicSubnet` with an explicit public IP (the
   subnet's auto-assign setting was off, unlike what a fully "VPC and more" wizard
   would've defaulted to).
5. Verified both directions: SSH connected in successfully, and `curl` from inside
   confirmed outbound internet access.
6. Terminated the instance, deleted the security group, ran the full account-wide
   sweep to confirm nothing was left running.

**Guided console walkthrough, 2026-08-31:** repeated the same build in the AWS
Console instead of CLI, step by step.

![Security group config, "My IP" auto-fill matches the manual curl check from the night before](images/SGcheck.png)

- Created the same security group via the console's "My IP" auto-fill — it landed on
  the exact same IP as the manual `curl` check from the CLI pass, good confirmation
  the two methods agree.
- Launched via the console UI, reusing the existing `lab02-key` key pair.

![Instance summary — running, correct VPC/subnet, key pair attached](images/EC2live.png)

- Connected via SSH from the terminal and ran the same two verification checks.

![SSH connection succeeding, dropped into the Amazon Linux 2023 shell](images/shell.png)
![hostname and outbound curl check both passing](images/shellCheck.png)

- Torn down again afterward (terminate instance → delete security group), verified
  clean via CLI.

## What broke (and why)



## What I learned

