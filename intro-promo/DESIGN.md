# DESIGN.md — Utkarsh Solanki Portfolio Intro Promo

## Style Name
**The Main Event** — inspired by Paula Scher's Maximalist Type and Neville Brody's Deconstructed industrial energy.

## Style Prompt
A high-impact, wrestling-themed promo that feels like a pay-per-view title card. Deep blacks punctuated by championship gold. Everything slams, nothing floats. Text is the visual — enormous, full-bleed, impossible to ignore. Glitch artifacts and white flash cuts simulate a Titantron broadcast. The pace is relentless: 7 scenes in 12 seconds. The viewer should feel the bass drop even in silence.

## Colors

| Role | Hex | Usage |
|---|---|---|
| Background | `#0a0a0f` | All scene backgrounds |
| Championship Gold | `#d4af37` | Primary headlines, accent lines, badges |
| Crimson Red | `#ff1744` | Glitch overlays, label accents, danger beats |
| Off-White | `#f0ede0` | Secondary headlines on dark bg |
| Muted Gold | `rgba(212,175,55,0.4)` | Sublabels, secondary text |

## Typography

- **Display / Headlines:** `Bebas Neue` — ALL CAPS, 0.04–0.1em letter-spacing, 160–240px for hero beats
- **Labels / Sublabels:** `Bebas Neue` — 28–48px, 0.3–0.6em letter-spacing
- **Code background:** `Courier New` — 18px, used as decorative only (not readable content)

## Motion Rules

- **Energy:** HIGH — `expo.out`, `back.out(1.4–1.8)`, `power4.out`
- **Entrance:** slams from y+60 or scale 1.3→1. Never floats.
- **Transitions:** Glitch (primary, 0.15s) + Overexposure flash (accent, used at scene 3 and scene 7)
- **No exit animations** except final scene fade to black at 11.5s
- **No infinite repeats** — all ambient loops calculated from composition duration

## What NOT To Do

1. **No soft gradients on headline text** — `background-clip: text` gradients look weak at 200px. Use solid gold or sold white with `text-shadow` glow instead.
2. **No slow entrances** — nothing takes longer than 0.55s to animate in. This is a promo, not a product demo.
3. **No rounded corners** on badges or containers — the belt `clip-path` skew is intentional hard geometry.
4. **No purple or blue-gradient "dark techy" aesthetic** — this is gold/black/red. Period.
5. **No centered body text** — headlines center in Scene 3 and 7 (symmetric, intentional). All other text is left-anchored.
