# Design Inspiration Guide

This document curates visual, structural, and interaction patterns from leading consumer apps, mapped directly to our pet adoption matching experience.

---

## 1. Core Reference Products & What to Borrow

| Product | What We're Borrowing | UX / Visual Pattern | How We Adapt It for Rescue Pets |
| :--- | :--- | :--- | :--- |
| **Hinge** | Editorial typography, prompt cards, warm tones | Conversational Prompts & Framed Layout | Transforms dry shelter bios into first-person quirks (*"The way to win me over is..."*). |
| **Bumble / Tinder** | Card stack physics, tactile gestures | Full-width Card Deck + Floating Action Buttons | Swiping Left (*"Not a perfect match"*) and Right (*"Interested"*), plus desktop-friendly button controls. |
| **Instagram Stories** | Multi-photo progressive taps | Top progress bars (`— — —`) | Lets adopters tap left/right on a pet's photo to see action shots, nap photos, and goofy angles. |
| **Airbnb** | Scannable amenity chips, trust badges | Structured Vitals Grid & Host Card | Replaces the "Host" with the Shelter/Foster coordinator card, and amenities with pet compatibility badges. |
| **Duolingo / Candy Crush** | Session reward feedback | Pop-in avatar bubble shelf | When an adopter swipes right, the pet's circle pops into the bottom tray with a bouncy animation. |

---

## 2. Card Layout Archetypes (Which one to sketch?)

### Archetype A: Cozy Editorial (Hinge-Style) — *Recommended*
- **Visual Weight**: 50% Photo / 50% Personality & Badges.
- **Card Framing**: Soft off-white framed card on warm oat canvas.
- **Why it fits pet adoption**: Pet adoption is rarely a superficial 1-second swipe decision. People need to see *vibe* and *compatibility* (energy, barking, cat safety) right next to the photo.
- **Typography**: Expressive serif headers (`Fraunces` or `Recoleta`) + friendly clean sans body.

### Archetype B: Full-Bleed Story (Tinder/IG Style)
- **Visual Weight**: 90% Photo / 10% Gradient text overlay.
- **Card Framing**: Edge-to-edge photography with white text floating on top.
- **Why it works**: High emotional impact; great if shelter photos are professional quality.
- **Risk**: Shelter API photos are often taken in kennel lighting or low resolution, which can look grainy when blown up full-bleed.

### Archetype C: Modern Quick-Scan (Hybrid Specs Card)
- **Visual Weight**: 40% Photo / 60% Structured Spec Grid (2x2 tags).
- **Why it works**: Hyper-practical for renters with breed/weight limits, families with toddlers, or households with resident cats.

---

## 3. Typography Pairing Ideas

For modern lifestyle apps, pairing a **warm serif** with a **clean sans-serif** creates an approachable, editorial look:

1. **Option 1 (Warm & Storybook - Hinge Vibe)**:
   - *Headlines & Pet Names*: **Fraunces** or **Recoleta** (friendly, slightly rounded serif).
   - *Body, Badges & UI*: **Plus Jakarta Sans** or **Inter** (crisp, modern legibility).
2. **Option 2 (Fresh & Playful - Bumble / Airbnb Vibe)**:
   - *Headlines & Pet Names*: **Outfit** or **Plus Jakarta Sans (Bold)** (geometric, optimistic).
   - *Body & Badges*: **DM Sans** (clean, compact).

---

## 4. Micro-Interactions & Delight Ideas for Wireframes

1. **The Session Tray Pop**:
   - Swiping right shouldn't just vanish the card—it should animate into the bottom tray like dropping a treat into a jar.
2. **"Not My Fit" Heart-Safe Microcopy**:
   - Left-swipe doesn't say "Reject" or "Dislike"; it says *"Not a match"* or *"Hope you find your home!"*.
3. **Decoded "Good to Know" Pill**:
   - When a bio mentions a quirk (e.g. timid with men or needs slow introductions), present it as a soft honey-amber chip (`⚡ Slow intro needed`) rather than a scary warning badge.
