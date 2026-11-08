---
name: AdoptionMatch
description: Dating-style discovery for adoptable rescue companions in a Candy Sunset retro brand aesthetic
colors:
  primary-biscuit: "#F7E7CD"
  accent-sunset: "#FF5701"
  cta-candy: "#FE76BA"
  star-mango: "#FA9630"
  badge-lilac: "#F7B0E1"
  ink-cocoa: "#241107"
  surface-white: "#FFFFFF"
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
    backgroundColor: "{colors.cta-candy}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.full}"
    padding: "14px 22px"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-cocoa}"
    rounded: "{rounded.full}"
    padding: "14px 20px"
  card-hero:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.2xl}"
    padding: "16px"
  prompt-container:
    backgroundColor: "{colors.primary-biscuit}"
---

# Design System: Candy Sunset Edition

## Visual Language

The design system is built around the authentic **Candy Sunset** retro brand palette:
- **Warm Biscuit Ground** (`#F7E7CD`): A soft, gentle pastry-cream canvas that creates inviting warmth and provides >9.5:1 contrast against Espresso Cocoa text.
- **Tangerine Sunset** (`#FF5701`): Energetic brand pop for the paw logo emblem, active species tabs, location markers, and category highlights.
- **Candy Bubblegum Pink** (`#FE76BA`): The signature "spark" action color! Drives key decision moments (*"Save & Match"*, *"Apply on Shelter Site"*, and applied badges).
- **Golden Mango** (`#FA9630`): Celebratory lifestyle match score stars (`★ 94% Match`) and milestone moments.
- **Soft Lilac** (`#F7B0E1`): Gentle accent badge containers for quirks, decompression notes, and tips.
- **Deep Espresso Cocoa** (`#241107`): Crisp, ultra-readable ink meeting WCAG AAA standard across all surfaces.

## Named Rules

**The Candy Spark CTA Rule.** Primary matchmaking and outbound application actions are anchored by Candy Bubblegum Pink (`#FE76BA`) with crisp white text.

**The Compassion Over Alarm Rule.** Quirks, decompression needs, and behavioral notes are framed in warm lilac or mango tones, never harsh alarmist reds.

**The No Micro-Text Rule.** Strict floor at `12px` (`text-xs`) with heavy weight (700/800) for crystal clarity.

## Typography

- **Display Face**: **Plus Jakarta Sans** (800 Weight) with tight letter-spacing (`-0.03em`).
- **Body & Prompts**: **Plus Jakarta Sans** (600/700 Weight) for warm, highly readable foster bios and shelter translations.

## Shapes & Radii

- **Hero Squircle Geometry**: Cards and dashboard panels use generous `32px` corner radii (`rounded-[32px]`).
- **Prompt Containers**: Secondary nested containers use `22px` corner radii (`rounded-[22px]`).
- **Pill Controls**: All buttons, badges, status chips, and avatar trays use fully rounded pill geometry (`rounded-full`).
