# CIDR Math Reference

Built from the run-2 CIDR drill (see `run-2/README.md` for the mistakes that led here).

## The core formula

An IPv4 address is 32 bits. The prefix number (`/16`, `/24`, etc.) is how many of
those bits are **locked** as the network/identity part — the rest are free.

- **Free bits = 32 − prefix**
- **Addresses = 2^(free bits)**

| CIDR | Free bits | Addresses |
|---|---|---|
| /8  | 24 | 16,777,216 |
| /16 | 16 | 65,536 |
| /23 | 9  | 512 |
| /24 | 8  | 256 |
| /28 | 4  | 16 |
| /32 | 0  | 1 |

## Octet locking

- `/16` locks the first **two** octets → `10.0.X.X`
- `/24` locks the first **three** octets → `10.0.X.Y`

**Locked octets are numbers you *choose*, not a fixed default.** Inside a
`10.0.0.0/16` VPC, a subnet can use *any* third octet (`10.0.5.0/24`, `10.0.7.0/24`,
`10.0.8.0/24`...) as long as it's (1) inside the VPC's own locked range, and (2) not
already claimed by another subnet in that VPC. Nothing about `0` specifically is
special — it's only "correct" when nothing else already occupies it.

## Overlap: always check the actual range, not the slash number

Two blocks overlap if their **address ranges intersect** — never judge it by how
similar or different the prefix numbers look.

**The `/23` trap:** a `/23` spans **two consecutive `/24` blocks** (an even/odd pair).
`10.0.4.0/23` = `10.0.4.0/24` + `10.0.5.0/24` combined (`10.0.4.0`–`10.0.5.255`). So
`10.0.5.0/24` isn't next to it — it's *entirely inside it*. Same pattern as a `/8`
fully containing every `/16` that starts with the same first octet.

## Two different problems, two different octets

- **Fitting a subnet inside an existing VPC, distinct from sibling subnets:** keep the
  VPC's locked octets identical, choose a free *next* octet.
  (`10.0.0.0/16` VPC → subnets vary the **third** octet: `10.0.5.0/24`, `10.0.7.0/24`.)
- **Making two separate VPCs non-overlapping (e.g. before peering):** change one of
  the VPC's *own* locked octets. Changing prefix length alone does **not** fix this —
  `10.0.0.0/16` → `10.0.0.0/8` makes the overlap *worse* (superset, not disjoint).
  (`10.0.0.0/16` → `10.1.0.0/16` — change the **second** octet.)
