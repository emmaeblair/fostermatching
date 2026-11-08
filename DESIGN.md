---
name: AdoptionMatch
description: Dating-style discovery for adoptable rescue companions in an Electric Retro Pop aesthetic
colors:
  primary: "#DF4E30"
  primary-dark: "#C03A1F"
  secondary: "#F8BC27"
  secondary-dark: "#D69B10"
  accent-cobalt: "#2752D6"
  surface-custard: "#FFF8EB"
  neutral-bg: "#DF4E30"
  neutral-cocoa: "#1D130E"
  neutral-white: "#FFFFFF"
typography:
  display:
    fontFamily: "var(--font-plus-jakarta), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body:
    fontFamily: "var(--font-plus-jakarta), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
  label:
    fontFamily: "var(--font-plus-jakarta), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.03em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "22px"
  2xl: "32px"
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
    backgroundColor: "{colors.accent-cobalt}"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.full}"
    padding: "14px 22px"
  button-secondary:
    backgroundColor: "{colors.surface-custard}"
    textColor: "{colors.neutral-cocoa}"
    rounded: "{rounded.full}"
    padding: "14px 20px"
  card-hero:
    backgroundColor: "{colors.surface-custard}"
    rounded: "{rounded.2xl}"
    padding: "16px"
  prompt-container:
    backgroundColor: "{colors.neutral-white}"
---

# Design System: Electric Retro Pop

## Visual Language

The design system is grounded in **Electric Retro Pop**—a warm, high-dopamine visual world inspired by 70s poster warmth, vibrant risograph printing, and tactile bookshop craft. It replaces the sterile "shelter blue" and generic dating-app pastels with bold Tomato Coral fields (`#DF4E30`), warm Custard Paper surfaces (`#FFF8EB`), punchy Electric Cobalt CTAs (`#2752D6`), and Sun Yellow match badges (`#F8BC27`).

## Color System

### Tonal Ramp
- **Tomato Coral Ground** (`#DF4E30`): The signature warm, optimistic canvas of the application.
- **Custard Paper** (`#FFF8EB` / `#F5E8D0`): Warm, pillowy, tactile paper cards that hold photography and information.
- **Electric Cobalt** (`#2752D6` / `#1A3DB5`): High-energy anchor buttons that drive decisive user action (*"Save & Match"*, *"Apply on Shelter Site ↗"*).
- **Sun Yellow** (`#F8BC27` / `#D69B10`): Celebratory match percentage stamps, glowing badges, and brand emblems.
- **Deep Dark Cocoa** (`#1D130E`): High-contrast ink for all text, headings, and outlines.
- **Matcha Mint** (`#107E54` / `#D7F3E3`): Celebratory confirmations and applied application tags.

### Named Rules
**The Cobalt Anchor Rule.** Bright, optimistic coral and custard surfaces are anchored by solid Electric Cobalt (`#2752D6`) pill buttons for the primary positive actions.

**The Compassion Over Alarm Rule.** Behavioral considerations, specific quirks, and shelter warnings must always be rendered in warm honey/sun tones (`#F8BC27`/25) with soft cocoa text, never alarmist red badges.

**The No Micro-Text Rule.** All labels, tags, and timestamps have a strict floor at `12px` (`text-xs`) with heavy weight (700/800) to ensure crystal clarity.

## Typography

- **Display Face**: **Plus Jakarta Sans** (800 Weight) with tight letter-spacing (`-0.03em`), conveying energetic, friendly poster confidence.
- **Body & Prompts**: **Plus Jakarta Sans** (600/700 Weight) for warm, highly readable foster bios and shelter translations.

## Shapes & Radii

- **Hero Squircle Geometry**: Cards and major dashboard panels use generous `32px` corner radii (`rounded-[32px]`).
- **Prompt Containers**: Secondary nested containers use `22px` corner radii (`rounded-[22px]`).
- **Pill Controls**: All buttons, badges, status chips, and avatar trays use fully rounded pill geometry (`rounded-full`).

## Components

### Buttons
- **Primary Anchor (`button-primary`)**:
  - **Shape:** Full pill (`rounded-full`, height ~46px).
  - **Color:** Electric Cobalt (`#2752D6`), text Pure White (`#FFFFFF`).
  - **States:** Hover shifts to `#1A3DB5`; active state depresses (`active:scale-95`).
- **Secondary Pass (`button-secondary`)**:
  - **Shape:** Full pill (`rounded-full`).
  - **Color:** Custard Paper (`#FFF8EB`), text Dark Cocoa (`#1D130E`), subtle border (`border-cocoa/20`).
- **Photo Navigation Chevrons**:
  - **Shape:** Circular (`w-9 h-9 rounded-full`).
  - **Color:** Translucent black backdrop (`bg-black/45` with `backdrop-blur-md`), white chevron icon.

### Cards / Containers
- **PetCard (Hero)**:
  - **Corner Style:** `rounded-[32px]`.
  - **Background:** Custard Paper (`#FFF8EB`) with subtle outline (`border-cocoa/15`) and shadow (`shadow-2xl`).
  - **Padding:** `16px` all around.
- **PromptContainer (Nested)**:
  - **Corner Style:** `rounded-[22px]`.
  - **Background:** Crisp White (`#FFFFFF`) with subtle cocoa border.
