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

## Finding the exact range for any prefix

Works for any prefix, not just clean `/8`, `/16`, `/24` boundaries — the full chain,
in order:

1. **Full octets locked** = prefix ÷ 8 (whole-number part).
2. **Remainder** = prefix mod 8 → bits locked in the *next* (partially-locked) octet.
   - **Calculator trap:** if the division gives a decimal (e.g. `20 ÷ 8 = 2.5`), the
     digits after the decimal point are *not* the remainder. Multiply the decimal
     part by 8 instead: `0.5 × 8 = 4`. (`2.5` does not mean "remainder 5.")
3. **Free bits in that octet** = `8 − remainder`.
4. **Step size** = `2^(free bits in that octet)` — valid starting values in that
   octet are multiples of the step size.
5. **Binary check**: write the given octet value in binary, split into locked/free
   bits, confirm the free bits ranging from all-`0` to all-`1` land on the expected
   numbers.
6. **Range** = given start through `(start + step − 1)` for that octet, then `.0`
   through `.255` for every fully-free octet after it.
   - **Common mistake:** the top of the range is `start + step − 1`, *not*
     `start + step` — counting `n` values from a starting point lands on
     `start + (n − 1)`.

**Sanity check, every time:** total free bits (`32 − prefix`) should equal (free bits
in the partially-locked octet) + (`8 ×` number of fully-free octets after it). If it
doesn't match, one of the earlier steps is wrong — go back and find it before trusting
the answer.

**Worked example, `172.16.50.128/25`:**
- `25 ÷ 8 = 3` remainder `1` → 3 full octets locked, 1 bit locked in the 4th octet.
- Free bits in 4th octet = `8 − 1 = 7` → step size `2^7 = 128`.
- `128` in binary has the 1 locked bit set to `1`; free bits `0000000`–`1111111` →
  range `128`–`255`.
- Sanity check: `32 − 25 = 7` = `7 + (8 × 0)` ✓ (nothing after the 4th octet).
- Range: **`172.16.50.128` – `172.16.50.255`**.

## Overlap: always check the actual range, not the slash number

Two blocks overlap if their **address ranges intersect** — never judge it by how
similar or different the prefix numbers look. Once you have both ranges (using the
method above), just line them up:

```
/26:   .64 ──── .127
/25:                .128 ──────────────── .255      → no overlap (adjacent, not shared)

/26:                          .192 ──────── .255
/25:        .128 ────────────────────────── .255     → overlap (fully contained)
```

Same prefix sizes, same base network (`10.20.30.x`) — only the starting octet moved,
and that alone flipped it from separate to fully contained. Overlap is entirely about
where the ranges land, never about how similar the prefix numbers look.

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
