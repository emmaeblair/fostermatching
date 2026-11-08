# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Everyday pet seekers (first-time adopters, apartment dwellers, and households with resident pets or kids) looking to adopt a rescue cat or dog that genuinely fits their living space, work schedule, and daily energy level.

## Product Purpose

Transform raw, intimidating shelter database listings into a fun, warm, dating-app style discovery experience. AdoptionMatch pairs personality prompts with decoded behavioral realities to help adopters find high-compatibility companions and apply directly through the rescue's official application.

## Positioning

The "Shelter-Speak Decoder" and lifestyle compatibility engine. Unlike static directories (like Petfinder or classified boards) that reduce animals to breed/age checkboxes and walls of text, AdoptionMatch translates polite shelter euphemisms into plain English expectations and matches on actual daily routine fit (alone-time tolerance, energy level, living space).

## Operating Context

Responsive web application optimized for two distinct environments:
- **Mobile Web**: Single-card thumb-driven browsing with swipe gestures, photo tap controls, and a bottom session tray.
- **Desktop Web**: A rich 2-column split dashboard pairing the card deck with a persistent saved pack, active search sliders, and foster education tips.

## Capabilities and Constraints

- **Single-Sided Aggregator**: Built strictly for adopters. Shelters do not log in or manage profiles; the app links out directly to the shelter's official application URL.
- **Rescue Data Architecture**: Built around RescueGroups.org API v5 schema, with an offline mock adapter (`src/data/mock-pets.ts`) for rapid development and testing.
- **Scope Boundary**: Available rescue cats and dogs only (no breeders, no unavailable pets).
- **User Agency**: Users can take a lifestyle quiz for personalized match ranking or use manual filter controls—the matching logic is never a black box.
- **Compassionate Microcopy**: Replaces negative rejection mechanics ("No", "Reject") with compassionate compatibility framing ("Not my fit", "Hope they find their human").

## Brand Commitments

- **Name**: AdoptionMatch
- **Voice**: Warm, compassionate, witty, grounded, and non-judgmental.
- **Visual World**: Joyful Color-Block ("Dopamine UI") featuring Periwinkle Blue (`#93B1FF`), Custard Cream (`#FFF7E8`), Sunny Marigold (`#FFAA33`), and grounding Jet-Black (`#141416`) pill buttons.

## Evidence on Hand

- First-hand foster parenting and rescue volunteering experience guiding the "Shelter-Speak" translations.
- Verified RescueGroups.org API v5 REST data contracts and field specifications (`product/api-landscape.md`).
- Multi-photo mock pet records with realistic bio text and prompt answers (`src/data/mock-pets.ts`).

## Product Principles

1. **Lifestyle Over Looks**: Celebrate cute photos, but prioritize daily routine compatibility (home presence, exercise need, space requirements) so adoptions stick.
2. **Compassionate Transparency**: Translate shelter bios honestly into plain English without making animals seem "defective" or broken.
3. **User Agency Over Black Boxes**: Recommendations act as a helpful guide; adopters always have full visibility and control over active filters.
4. **Zero Friction Handoff**: Connect high-intent adopters directly to the rescue's official application without adding middleman paperwork.

## Accessibility & Inclusion

- Keyboard navigability for desktop browsing (arrow keys for photo galleries, clear button targets).
- WCAG AA color contrast: deep Jet-Black text against light Custard and Periwinkle surfaces.
- Multi-modal status communication: badges use distinct icons and plain-English text in addition to color coding.
