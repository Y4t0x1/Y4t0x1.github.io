---
title: "PicoCTF Elliptic Vault — Nonce Leakage in ECDSA Signatures"
date: 2026-04-02 11:15:00 +0300
category: "Cryptography"
tags:
  - crypto
  - ecdsa
  - lattice-attack
  - python
  - math
  - ctf
difficulty: easy
platform: "picoCTF"
summary: "Recovering the private key of an elliptic curve digital signature scheme when the top 8 bits of the ephemeral random nonce k are known to be zero."
---

## 1. Challenge Overview

We are given a remote oracle service that signs messages using the standard `secp256k1` elliptic curve. 

Upon requesting signatures, the server produces:
$$(r_i, s_i) = \text{ECDSA\_Sign}(d, m_i, k_i)$$

Looking closely at the server source code reveals a subtle flaw in the PRNG generating the ephemeral nonce $k$:

```python
def generate_nonce():
    # Only 248 bits of entropy generated!
    return random.getrandbits(248)
```

Because the curve order $q$ is 256 bits, the top 8 bits of each nonce $k_i$ are guaranteed to be zero:
$$0 \le k_i < 2^{248}$$

---

## 2. Mathematical Foundation: The Hidden Linear Problem

The ECDSA signature equation modulo $q$ is:

$$s_i \equiv k_i^{-1} (h_i + r_i \cdot d) \pmod{q}$$

Multiplying both sides by $s_i^{-1} k_i$:

$$k_i \equiv s_i^{-1} h_i + s_i^{-1} r_i d \pmod{q}$$

Let:
- $t_i = s_i^{-1} r_i \pmod{q}$
- $u_i = s_i^{-1} h_i \pmod{q}$

Then:
$$k_i \equiv t_i d + u_i \pmod{q}$$

Because each $k_i$ is small ($|k_i| < 2^{248}$), this forms a standard **Hidden Linear Problem (HLP)** which reduces to the **Shortest Vector Problem (SVP)** in a lattice.

---

## 3. Lattice Construction (Babai / LLL)

We construct a matrix basis with $m = 6$ signatures:

```text
[ q    0    0    0    ...  0   0 ]
[ 0    q    0    0    ...  0   0 ]
[ ...                          ]
[ t_1  t_2  t_3  t_4  ... 2^8  0 ]
[ u_1  u_2  u_3  u_4  ...  0  2^248 ]
```

Applying the **Lenstra–Lenstra–Lovász (LLL)** lattice reduction algorithm in SageMath computes a short vector containing our private key $d$.

---

## 4. Exploit Script (SageMath)

```python
from sage.all import *

# Curve order for secp256k1
q = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

# Collect 6 samples from challenge netcat
signatures = [
    # (r, s, hash_m)
    (0x4a12..., 0x8b31..., 0x9f1a...),
    (0x310c..., 0x117e..., 0x66c0...),
    (0x7ef4..., 0x2289..., 0x48bb...),
    (0x56a1..., 0x9923..., 0x10ae...),
    (0x9a44..., 0x7782..., 0x5cd1...),
    (0x28f1..., 0x3344..., 0x7719...)
]

m = len(signatures)
B = Matrix(QQ, m + 2, m + 2)

for i in range(m):
    B[i, i] = q
    ti = (inverse_mod(signatures[i][1], q) * signatures[i][0]) % q
    ui = (inverse_mod(signatures[i][1], q) * signatures[i][2]) % q
    B[m, i] = ti
    B[m + 1, i] = ui

B[m, m] = 2^8
B[m + 1, m + 1] = 2^248

L = B.LLL()

for row in L:
    potential_d = abs(row[m]) // 2^8
    if potential_d > 0:
        print(f"[+] Private Key Discovered: {hex(potential_d)}")
```

---

## 5. Capturing the Flag

Signing the challenge admin token `admin=true` with the recovered private key:

```text
$ nc elliptic.picoctf.net 54321
Submit signature for 'admin=true': <r_val> <s_val>
[+] Signature Verified!
picoCTF{n0nc3_b14s_l4tt1c3_r3duct10n_ftw_7a9c}
```
