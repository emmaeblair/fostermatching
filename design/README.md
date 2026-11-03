# Design & Inspiration

This directory stores visual inspiration, UX patterns, and mockups for the rescue animal matching app.

## Directory Structure

- [`inspiration/dopamine-color-block-guide.md`](./inspiration/dopamine-color-block-guide.md) — Joyful Color-Block (Dopamine UI) design guide inspired by your reference screenshots: color blocking, squircle geometry, and jet-black pill buttons.
- [`inspiration/pop-art-style-guide.md`](./inspiration/pop-art-style-guide.md) — Pop Art UI style guide (archived exploration).
- [`inspiration/playful-styling-directions.md`](./inspiration/playful-styling-directions.md) — 3 distinctive "non-generic" playful styling directions (Sticker Pop, Polaroid Scrapbook, Chunky Toybox) using the Nude/Lake/Salmon palette.
- [`inspiration/coolors-palettes-review.md`](./inspiration/coolors-palettes-review.md) — 60-30-10 implementation review of the 5 Coolors candidate palettes.
- [`inspiration/inspiration-guide.md`](./inspiration/inspiration-guide.md) — Visual inspiration guide: 3 card layout archetypes, app analogies (Hinge, Airbnb, Stories), typography pairings, and micro-interactions.
- [`color-theory-and-palette.md`](./color-theory-and-palette.md) — Developer-friendly guide to HSL color theory, the 60-30-10 rule, semantic badge colors, and candidate palettes.
- `inspiration/` — Screenshots, links, color palettes, typography, and notes from apps we like (e.g., Hinge, Bumble, Tinder, Petfinder, Good Pup).
- `mockups/` — Wireframes, sketches, and UI mockups for key screens.

---

## Core Concept & Mechanics Ideas

### 1. Dating-Style Animal Profiles (AI-Enhanced from API Data)
Instead of forcing users to read walls of raw shelter text from Petfinder, we can transform API listings into scannable, personality-driven cards:
- **AI-Extracted Prompts** (Hinge-style, generated strictly from facts in the shelter bio):
  - *"The way to win me over is..."* → "Cheese cubes and slow chin scratches."
  - *"My ideal Sunday..."* → "A 2-mile sniff walk followed by a 6-hour couch nap."
  - *"Green flags I look for..."* → "Fenced yard, no loud toddlers, patient with shy dogs."
- **Quick Vitals & Extracted Badges**:
  - Cat/Dog friendly, Kid friendly, Apartment friendly, Energy level (Couch Potato to Marathoner), Special needs.

### 2. Matching & Discovery Flows
- **Dual Entry Mode (Quiz vs. Manual Filters)**:
  - Users can choose **"Help Me Find My Match" (Quiz)** for guided lifestyle matching OR **"Browse & Filter Myself"** for classic control.
  - Quiz results translate into visible, editable filter chips at the top of the feed so the AI is never a black box.
- **Swipe / Card Feed**: Browse strictly **available** cats and dogs with photos, AI-extracted personality prompts, and a compatibility score.
- **Save & Direct Apply Handoff**: Save favorite pets to a shortlist and click straight out to the rescue's official adoption application link when ready.

---

## Mockups & User Flows

- **Live FigJam Board**: [Adoption Matching Flow (FigJam)](https://www.figma.com/board/3GOceavJzsTEZ0KbApZ9Vi/Adoption-Matching-Flow?node-id=0-1&p=f&t=tQKNhGEsvuvZ4aXt-0)
- [`mockups/v1-flow-iteration-2.png`](./mockups/v1-flow-iteration-2.png) — **V1 Flow — Iteration 2**: Added swipe-left microcopy (*"not a perfect match"*), swipe-right celebration animation into a bottom session tray of avatar bubbles, return navigation from `specific pet profile`, and product notes on login timing + "swipe up for neutral/skip" signal for future recommendation algorithms.
- [`mockups/v1-flow-iteration-1.png`](./mockups/v1-flow-iteration-1.png) — **V1 Flow — Iteration 1**: Initial granular flow for Build Phase 1 (`general user, no login` welcome prompt → `matching page` swipe cards → `specific pet profile` details).
- [`mockups/user-flow-vision-v2.png`](./mockups/user-flow-vision-v2.png) — **Full Flow Vision — Iteration 2**: Refactored V1 around the core value loop (`general user, no login` → `matching page` → `specific pet profile`) and introduced lazy registration (`Action: Save Profile` triggers `User Login or Sign Up` only when an unauthenticated user tries to save a pet).
- [`mockups/user-flow-vision.png`](./mockups/user-flow-vision.png) — **Full Flow Vision — Iteration 1**: Initial flow starting with an upfront login wall and dashboard summary.

---

## Inspiration Log

Add links, notes, or image references below as you gather them:

| Reference / App | What We Like | Category (UI / UX / Branding) | Asset / Link |
| :--- | :--- | :--- | :--- |
| *Example: Hinge* | Prompt cards mixed between photos; warm editorial feel | UX / Profile Layout | `inspiration/` |
| | | | |

## Visual Direction Notes

- **Colors**: *(e.g., warm, approachable tones rather than sterile clinical shelter blues)*
- **Typography**: *(e.g., friendly serif headers + clean sans-serif body)*
- **Vibe**: Playful, warm, trustworthy, modern.
