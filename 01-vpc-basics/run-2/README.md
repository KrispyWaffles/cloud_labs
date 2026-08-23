# VPC Basics — Run 2 (independent rep)

Second, more independent pass at this lab. Built alone, minimal real-time help — see
`instructions.md` at the repo root for the rules of this kind of run. Screenshots go
in `run-2/images/`. Fill in your answers directly below, then tell Claude it's ready
for review.

## Evidence checklist

Capture a screenshot for each of these once the build is done:

- ![VPC details](/01-vpc-basics/run-2/images/run02x-vpc.png) VPC detail showing the VPC ID and IPv4 CIDR block
- ![Subnet details](/01-vpc-basics/run-2/images/run02x-subnets.png) Subnet list showing both subnets, their CIDR blocks, and their AZ
- ![VPC details](/01-vpc-basics/run-2/images/run02x-IGWattached.png) Internet Gateway showing state = Attached and which VPC it's attached to
- ![VPC details](/01-vpc-basics/run-2/images/run02x-route_subnet.png) Route table's **Routes** tab showing the `0.0.0.0/0` route pointing at the IGW
- ![VPC details](/01-vpc-basics/run-2/images/run02x-associations.png) Route table's **Subnet associations** tab showing the public subnet under
      "Explicit subnet associations" and the private subnet under "without explicit
      associations"

## Self-answered questions

Answer these yourself, in your own words, before submitting for review.

1. What CIDR did you use for the VPC this run, and how many total addresses does that
   give you?

  ## I used CIDR 10.0.0.0/16 this gives me 65,536 - 32-16 = 16 2^16 = 65,536 addresses

2. What CIDR blocks did you use for the two subnets, and how do you know both are
   valid subsets of the VPC's CIDR?

  ## I use 10.0.5.0/24 (public) and 10.0.6.0/24 for (private). They're within the /16 addresses. I found out from an error when using /24 as the CIDR

3. What specifically makes one subnet "public" and the other "private"? Name the exact
   resource and setting responsible — not just "one has internet access."

   ## The subnet explicit associations with the route table. I set the run02x-publicSubnet with the explicit associations and the other one without, which makes that one private. 

4. Say you attach the Internet Gateway to the VPC but never touch any route table.
   Would either subnet have internet access at that point? Why or why not?

   ## They would both be private subnets. The route table is the key to connecting to the internet and which subnet connects to the internet

5. Why is it safer to create a separate route table for the public subnet instead of
   adding the internet route directly to the VPC's main route table?

   ## Both subnets would have access to the internet, which I belive is a security risk being that the private subnet connects with important resources like data bases, VMs, storage etc

6. Run 1 hit a bug where a subnet association silently didn't save. If you suspected
   that had happened again, what's the first thing you'd check to confirm it?

   ## I ran into an error where I used a /24 as my CIDR and it didn't work using these IPS. I create a new VPC with /16 and it worked. 


7. If you wanted to add a third subnet in a different Availability Zone, what CIDR
   could you use that wouldn't overlap with the first two — and why doesn't it
   overlap?

   ## I'm thinking I can still use the /16 with different IP's so 10.0.7.0/16 and 10.0.8.0/16. I'm thinking there available addresses from the 65,536 so that shouldn't be an issue. 

## Your answers

_(write here)_
