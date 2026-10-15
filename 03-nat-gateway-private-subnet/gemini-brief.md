# Lab 03 brief: NAT Gateway for a private subnet (for Gemini)

## Who I am and what I want from you
I'm a self-taught learner doing hands-on AWS labs to build cloud fundamentals. I
finished this lab once with a lot of hand-holding and did not understand it well.
I want to understand it and rebuild it myself.

Please do two things:
1. **A video-ready explainer** (a narrated script plus a storyboard of simple diagrams,
   about 5 to 8 minutes) that teaches the lab's ideas in the order listed under
   "Concepts" below.
2. **A step-by-step guided demo.** I build everything myself in the AWS Console. You
   give me ONE step at a time with the exact settings, wait for me to say "done" or
   paste a screenshot or error, then give the next step. Do not skip ahead. Explain the
   "why" in one or two sentences before each step.

Rules for you:
- You cannot see my AWS account. Ask me to paste screenshots or error text when
  something looks wrong, and troubleshoot from that.
- Never ask me for access keys, passwords, MFA codes or my account ID.
- Keep replies short. One step per reply.
- After every 3 or 4 steps, ask me ONE short question about what I just built and
  wait for my answer before continuing.
- This lab costs money while it runs (see "Cost safety"). Remind me before I create the
  NAT gateway and make sure we finish with the teardown in the same sitting.

## The goal
Let an instance in a **private subnet** (no public IP, not reachable from the internet)
make **outbound** requests to the internet, using a **NAT gateway**. Prove it by
running `curl https://checkip.amazonaws.com` on the private instance and seeing it
print the NAT gateway's Elastic IP.

Region: us-east-1 (N. Virginia). Always check the region selector in the console.

## Architecture
```
                 internet
                    |
             Internet Gateway (IGW)
                    |
  VPC 10.0.0.0/16   |
  +-----------------+-----------------------------------------+
  |  PUBLIC subnet 10.0.5.0/24      PRIVATE subnet 10.0.6.0/24 |
  |  route table:                   route table:               |
  |   10.0.0.0/16 -> local           10.0.0.0/16 -> local      |
  |   0.0.0.0/0   -> IGW             0.0.0.0/0   -> NAT gateway|
  |                                                            |
  |  [bastion EC2]  [NAT gateway]    [private EC2]             |
  |   public IP      Elastic IP       no public IP             |
  +------------------------------------------------------------+
```
Outbound path of the curl request:
private instance -> private route table (0.0.0.0/0) -> NAT gateway (in the public
subnet) -> public route table (0.0.0.0/0) -> IGW -> internet. The reply returns the
same way. The internet only ever sees the NAT gateway's Elastic IP.

## Starting state (already existing from labs 01 and 02)
- A VPC `run02x-vpc` (10.0.0.0/16) with an Internet Gateway attached
- `run02x-publicSubnet` (10.0.5.0/24), associated with `run02x-RT` (0.0.0.0/0 -> IGW)
- `run02x-privateSubnet` (10.0.6.0/24), no explicit route table association (it uses the
  VPC's main route table)
- An EC2 key pair named `lab02-key`, with the `.pem` file on my laptop

(If you are starting from nothing, a VPC with these two subnets and an IGW comes first.)

## Build steps (all in the AWS Console)
1. **Route table for the private subnet.** VPC > Route tables > Create. Name
   `lab03-private-RT`, VPC `run02x-vpc`. It starts with only the `local` route.
2. **Elastic IP.** VPC > Elastic IPs > Allocate. Amazon's pool, us-east-1, tag
   Name = `lab03-nat-eip`.
3. **NAT gateway.** VPC > NAT gateways > Create.
   - Name `lab03-nat`.
   - **Availability mode: choose Zonal, NOT Regional.** (The console now defaults to
     Regional, which has no subnet field and wants one EIP per AZ. That isn't what this
     lab teaches.)
   - VPC `run02x-vpc`, subnet `run02x-publicSubnet` (the PUBLIC one), connectivity type
     Public, and the EIP from step 2.
   - Wait for state **Available**. Billing starts now.
4. **Route.** `lab03-private-RT` > Routes > Edit routes > **Add route** (a new row; do
   not edit the existing `local` row). Destination `0.0.0.0/0`, target NAT Gateway ->
   `lab03-nat`. Save. Both routes should show Active.
5. **Associate.** `lab03-private-RT` > Subnet associations > Edit > tick
   `run02x-privateSubnet` only. Save.
6. **Clean the main route table.** If the VPC's main route table has a `0.0.0.0/0` route
   whose status is Blackhole (pointing at a deleted NAT gateway), remove it.
7. **Security groups** (create `lab03-bastion-sg` first). For both, make sure the VPC
   field says `run02x-vpc`, and type a real description (the grey text is only a
   placeholder).
   - `lab03-bastion-sg`: inbound SSH 22, source My IP. Outbound default.
   - `lab03-private-sg`: inbound SSH 22, source = the security group `lab03-bastion-sg`
     (Custom, then pick the group; do not type an IP). Outbound default (all traffic).
     If the source list doesn't show `lab03-bastion-sg`, the VPC field is wrong.
8. **Bastion instance.** EC2 > Launch. Name `lab03-bastion`, Amazon Linux 2023,
   t2.micro or t3.micro, key pair `lab02-key`. Network: VPC `run02x-vpc`, subnet
   `run02x-publicSubnet`, auto-assign public IP **Enable**, security group
   `lab03-bastion-sg`.
9. **Private instance.** Name `lab03-private`, same AMI, type and key. Network: subnet
   `run02x-privateSubnet`, auto-assign public IP **Disable**, security group
   `lab03-private-sg`. (Easy mistake: leaving the bastion's security group selected. If
   so, fix it with Actions > Security > Change security groups.)
10. **Test.** On my laptop:
    ```
    chmod 400 ~/.ssh/lab02-key.pem
    ssh-add ~/.ssh/lab02-key.pem
    ssh -A ec2-user@<bastion public IP>
    ssh ec2-user@<private instance private IP>      # run this from inside the bastion
    curl -s https://checkip.amazonaws.com           # run this on the private instance
    ```
    Success: curl prints the NAT gateway's Elastic IP, not the bastion's IP and not a
    10.0.x.x address. `-A` forwards my key through the bastion so the private key never
    gets copied onto it.

## Teardown (order matters)
1. Terminate both EC2 instances. Wait for **Terminated**.
2. Delete the NAT gateway. **Wait until the state is Deleted, not Deleting.**
3. Release the Elastic IP. Releasing too early fails with "cannot be released with
   association IDs". The NAT gateway does NOT release its EIP when deleted, and an
   unattached EIP still bills.
4. Disassociate and delete `lab03-private-RT`.
5. Delete `lab03-private-sg` first, then `lab03-bastion-sg` (the private group's rule
   references the bastion group, so the bastion group can't be deleted first).

Final check (CloudShell, read-only). Every number should be 0:
```bash
for r in $(aws ec2 describe-regions --query 'Regions[].RegionName' --output text); do
  i=$(aws ec2 describe-instances --region $r --filters Name=instance-state-name,Values=pending,running,stopping,stopped --query 'length(Reservations[].Instances[])' --output text)
  n=$(aws ec2 describe-nat-gateways --region $r --filter Name=state,Values=pending,available,deleting --query 'length(NatGateways)' --output text)
  e=$(aws ec2 describe-addresses --region $r --query 'length(Addresses)' --output text)
  v=$(aws ec2 describe-volumes --region $r --query 'length(Volumes)' --output text)
  l=$(aws elbv2 describe-load-balancers --region $r --query 'length(LoadBalancers)' --output text)
  d=$(aws rds describe-db-instances --region $r --query 'length(DBInstances)' --output text)
  echo "$r ec2=$i nat=$n eip=$e vol=$v lb=$l rds=$d"
done
```

## Cost safety
A NAT gateway costs roughly $0.045 per hour while it exists, plus data. An idle
Elastic IP and running EC2 instances also bill. I once lost over $100 to forgotten
resources, so: finish the lab and the teardown in one sitting, and always run the
sweep above before I stop.

## Concepts to teach (in this order)
1. **Route tables and the `local` route.** Every route table has `local` (VPC-internal
   traffic stays inside the VPC). The most specific matching route wins: 10.x traffic
   matches `10.0.0.0/16`, everything else falls through to `0.0.0.0/0`.
2. **What makes a subnet public.** Its route table has `0.0.0.0/0 -> IGW`. The subnet
   itself isn't special; the route table is.
3. **Inbound vs. outbound are different problems.** SSH into the private instance was
   inbound (security groups plus a hop through the bastion). The curl was outbound
   (route table plus NAT gateway).
4. **What a NAT gateway does.** It swaps the source address of outgoing requests
   (10.0.6.x, not routable on the internet) for its own public Elastic IP, and keeps a
   translation table so replies get back to the right private instance. A fixed EIP
   also keeps the address stable for allowlisting.
5. **Why the NAT gateway sits in the public subnet.** It needs its own route to the
   internet (`0.0.0.0/0 -> IGW`), which only a public subnet's route table has. The
   private subnet reaches the NAT gateway through a route, wherever the NAT sits.
6. **Trace the curl hop by hop** (see the architecture section).
7. **Security groups.** Stateful, instance-level. The private group allows SSH only from
   the bastion's group (a security-group reference, not an IP). My bastion group allows
   SSH only from my own IP as a /32.
8. **Cost and teardown ordering,** including the EIP trap.

## Video request
Make the explainer around ONE running example: a request leaving the private instance
and its reply coming back. Use simple labelled diagrams (boxes and arrows) and animate
the packet's path and the source-address swap. Keep it beginner friendly, avoid jargon
without defining it, and end with a 3-question self-check. If you can't render video
directly, give me a scene-by-scene storyboard with narration text and diagram
descriptions I can feed to a video tool.
