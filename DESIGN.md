---
name: AdoptionMatch
description: Dating-style discovery for adoptable rescue companions
colors:
  primary: "#93B1FF"
  primary-dark: "#7089D6"
  secondary: "#FFAA33"
  secondary-dark: "#D98818"
  surface-custard: "#FFF7E8"
  neutral-bg: "#F4F6FB"
  neutral-jet: "#141416"
  neutral-white: "#FFFFFF"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "28px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.neutral-jet}"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.neutral-white}"
    textColor: "{colors.neutral-jet}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
  card-hero:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.2xl}"
    padding: "12px"
  prompt-container:
    backgroundColor: "{colors.surface-custard}"
    textColor: "{colors.neutral-jet}"
    rounded: "{rounded.xl}"
    padding: "12px"
---

# Design System: AdoptionMatch

## Overview

**Creative North Star: "The Dopamine Dog Park"**

AdoptionMatch replaces clinical, intimidating shelter directories with a bold, joyful, and highly tactile dating-app experience. Rooted in modern "Dopamine UI" aesthetics, the visual world uses confident surface color-blocking—Sky Periwinkle, Sunny Marigold, and Custard Cream—anchored by solid Jet-Black pill controls so the interface feels energetic and delightful without slipping into childishness.

The design system prioritizes emotional connection and human warmth. Rather than treating rescue pets like cold inventory items, cards present authentic photos alongside conversational prompts and decoded lifestyle requirements. The layout explicitly rejects sterile "shelter blue", harsh danger-red error banners, and clinical classified-ad grids.

**Key Characteristics:**
- **Vibrant Surface Color-Blocking**: Containers and cards carry rich background hues rather than plain white boxes with tiny colored text.
- **The Jet-Black Anchor**: High-energy pastels are grounded by deep Jet-Black pill buttons (`#141416`) for instant hierarchy and polish.
- **Pillowy Squircle Geometry**: Generous corner radii (`rounded-[28px]`) create organic, touchable containers that invite interaction.
- **Compassionate Non-Judgmental Signaling**: Warm amber/marigold tones replace alarming danger-reds for behavioral notes.

## Colors

The palette balances joyful pastel color blocks with deep, grounding ink tones to maintain WCAG AA contrast across every surface.

### Primary
- **Sky Periwinkle** (`#93B1FF` / dark: `#7089D6`): The hero card surface color. Inviting, friendly, and refreshing, it gives the central pet deck immediate visual presence.

### Secondary
- **Sunny Marigold** (`#FFAA33` / dark: `#D98818`): The celebration accent. Used for match percentage badges, star ratings, and subtle highlight borders.

### Tertiary
- **Custard Cream** (`#FFF7E8` / dark: `#F5E9CE`): The conversational prompt container surface. Warm and paper-like, it provides a cozy background for first-person bio text.

### Neutral
- **Jet Ink** (`#141416`): The primary text and CTA anchor color. Used on primary buttons (`Save & Match`) and headlines to guarantee high visual weight and legibility.
- **Ice Canvas** (`#F4F6FB`): The global application background. A very soft, tinted off-white that keeps the eye focused on the colorful cards.
- **Pure White** (`#FFFFFF`): Used for secondary action buttons, photo navigation chips, and inner container cards.

### Named Rules
**The Black Anchor Rule.** High-energy pastels (Sky Periwinkle, Custard Cream, and Marigold) must always be grounded by solid Jet-Black (`#141416`) pill buttons. The black anchor prevents playful color-blocking from looking like a toy and gives the UI a sleek, intentional finish.

**The Compassion Over Alarm Rule.** Behavioral nuances and shelter requirements (e.g., "Needs to be only dog", "Needs fenced yard") must be styled in warm amber or soft marigold tones, never alarmist hospital red. We inform the adopter without stigmatizing the animal.

## Typography

**Body & System Font:** System Sans-Serif (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`)

**Character:** Clean, crisp, and neutral. The typography steps back to let pet photography, conversational quotes, and bold surface colors lead the visual hierarchy.

### Hierarchy
- **Display / Pet Name** (Bold, `1.25rem` / `20px`, line-height `1.2`): Used for the pet's name and age at the top of the card.
- **Headline / Section Header** (Extra Bold, `1rem` / `16px`, line-height `1.3`): Used for dashboard panel titles ("Your Saved Pack", "Search Filters").
- **Title / Prompt Question** (Extra Bold, `0.6875rem` / `11px`, letter-spacing `0.05em`, uppercase): Used for prompt category headers ("THE WAY TO WIN ME OVER...").
- **Body / Prompt Answer** (Medium to Bold, `0.75rem` / `12px` to `0.875rem` / `14px`, line-height `1.4`): Used for first-person bio answers and shelter descriptions.
- **Label / Badges** (Bold to Extra Bold, `0.625rem` / `10px` to `0.6875rem` / `11px`, line-height `1.2`): Used for decoded trait pills and distance tags.

### Named Rules
**The Scannable Vitals Rule.** Core pet vitals (name, age, breed, distance) must be legible within 1.5 seconds. They must never be obscured by photo gradients or low-contrast text.

## Layout

The application utilizes a responsive dual-flow spatial model:
- **Desktop Dashboard (`lg: 1024px+`)**: Max width `1152px` (`max-w-6xl`) with a 12-column grid. The matching card deck occupies 5 columns on the left, while the persistent saved pack, search filter cards, and foster education callouts occupy 7 columns on the right.
- **Mobile Feed (`< 1024px`)**: Max width `384px` (`max-w-sm`) centered column. Pure single-task focus: top header, centered card deck, and bottom sticky session tray.

Spacing follows an 8pt rhythmic grid (`8px`, `12px`, `16px`, `24px`, `32px`).

## Elevation & Depth

Tactile and grounded. The system relies on **tonal surface layering** rather than heavy drop shadows to communicate hierarchy.

### Shadow Vocabulary
- **Card Rest** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` / `shadow-lg`): Applied to the hero periwinkle pet card to float it gently off the ice canvas.
- **Pill Button Depth** (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)` / `shadow-md`): Gives the Jet-Black anchor button physical thickness and tactile clickability.
- **Subtle Surface** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)` / `shadow-xs`): Applied to badges and thumbnail cards inside dashboard panels.

### Named Rules
**The Tonal Surface Rule.** Depth is created first by contrasting rich color-blocked surfaces (Periwinkle card on Ice canvas; Custard box on Periwinkle card). Shadows exist only to lift interactive elements off the background, never to create borders.

## Shapes

- **Hero Squircle Geometry**: Cards and major dashboard panels use generous `28px` corner radii (`rounded-[28px]`).
- **Prompt Containers**: Secondary nested containers use `20px` corner radii (`rounded-[20px]`).
- **Pill Controls**: All buttons, badges, status chips, and avatar trays use fully rounded pill geometry (`rounded-full`).

## Components

### Buttons
- **Primary Anchor (`button-primary`)**:
  - **Shape:** Full pill (`rounded-full`, height ~44px).
  - **Color:** Jet-Black (`#141416`), text Pure White (`#FFFFFF`).
  - **States:** Hover shifts to `#000000`; active state depresses (`active:scale-95`).
- **Secondary Pass (`button-secondary`)**:
  - **Shape:** Full pill (`rounded-full`).
  - **Color:** Pure White (`#FFFFFF`), text Jet-Black (`#141416`), subtle slate shadow.
- **Photo Navigation Arrows**:
  - **Shape:** Circular (`w-8 h-8 rounded-full`).
  - **Color:** Translucent black backdrop (`bg-black/40` with `backdrop-blur-sm`), white chevron icon.

### Chips & Badges
- **Match Score Stamp**: Marigold background (`bg-marigold`), Jet-Black text, star icon, full pill shape.
- **Decoded Trait Pills**:
  - *Green Flags:* White surface (`bg-white/90`), Jet text.
  - *Good to Know / Consideration:* Muted marigold wash (`bg-marigold-light/30`), subtle amber border.

### Cards / Containers
- **PetCard (Hero)**:
  - **Corner Style:** `rounded-[28px]`.
  - **Background:** Sky Periwinkle (`#93B1FF`).
  - **Padding:** `12px` all around.
- **PromptContainer (Nested)**:
  - **Corner Style:** `rounded-[20px]`.
  - **Background:** Custard Cream (`#FFF7E8`).
  - **Padding:** `12px`.

### Signature Component: The Session Bubble Tray
- A horizontal shelf displaying saved pet avatars. Circular `32px` photo bubbles with a white border ring overlap slightly (`-space-x-2`), growing in real-time as adopters swipe right.

## Do's and Don'ts

### Do:
- **Do** anchor bright pastel surfaces with solid Jet-Black (`#141416`) pill buttons.
- **Do** use `‹` and `›` tap arrows and keyboard arrow keys for photo navigation to avoid gesture conflicts with card swiping.
- **Do** frame pet traits with conversational prompts ("The way to win me over...") rather than raw database labels.
- **Do** reset the photo carousel to index `0` whenever a new pet card mounts.
- **Do** present shelter caveats in warm amber tones rather than danger-red error badges.

### Don't:
- **Don't** use sterile "shelter blue" or clinical grey tables.
- **Don't** use sharp 90-degree corners on cards or buttons; maintain the squircle language (`rounded-[20px]` to `rounded-[28px]`).
- **Don't** trap users in a black-box algorithm; always keep active filter chips visible and editable.
- **Don't** use negative rejection labels ("No", "Reject", "Dislike") on pass buttons; use compassionate framing ("Not My Fit").
