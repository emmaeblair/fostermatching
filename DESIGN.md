---
name: AdoptionMatch
description: Dating-style discovery for adoptable rescue companions in an Electric Retro Pop aesthetic with a Sunbaked Terracotta ground
colors:
  primary: "#EA9B85"
  primary-dark: "#D6816A"
  secondary: "#F8BC27"
  secondary-dark: "#D69B10"
  accent-cobalt: "#2752D6"
  surface-custard: "#FFF8EB"
  neutral-bg: "#EA9B85"
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

# Design System: Electric Retro Pop (Sunbaked Terracotta Edition)

## Visual Language

The design system pairs **Sunbaked Terracotta** (`#EA9B85`) with **Custard Paper** (`#FFF8EB`) surfaces, **Electric Cobalt** (`#2752D6`) action anchors, **Sun Yellow** (`#F8BC27`) match badges, and **Deep Cocoa** (`#1D130E`) ink. It creates a warm, optimistic 70s poster warmth that feels approachable, soothing, and distinct from sterile classified boards.

## Color System

### Tonal Ramp
- **Sunbaked Terracotta Ground** (`#EA9B85`): The signature warm, sun-drenched clay canvas. Provides comfortable, long-session viewing with 6.7:1 WCAG contrast against Deep Cocoa text.
- **Custard Paper** (`#FFF8EB` / `#F5E8D0`): Warm, pillowy, tactile paper squircle cards that hold photography and information.
- **Electric Cobalt** (`#2752D6` / `#1A3DB5`): High-energy anchor buttons driving decisive actions (*"Save & Match"*, *"Apply on Shelter Site ↗"*).
- **Sun Yellow** (`#F8BC27` / `#D69B10`): Celebratory match stamps, story indicators, and logo emblems.
- **Deep Dark Cocoa** (`#1D130E`): High-contrast ink for all typography, outlines, and structural borders.
- **Matcha Mint** (`#107E54` / `#D7F3E3`): Application submission badges and positive compatibility confirmations.

### Named Rules
**The Cobalt Anchor Rule.** Warm terracotta and custard surfaces are anchored by solid Electric Cobalt (`#2752D6`) pill buttons for primary positive actions.

**The Compassion Over Alarm Rule.** Behavioral considerations, specific quirks, and shelter warnings must always be rendered in warm honey/sun tones (`#F8BC27`/25) with soft cocoa text, never alarmist red badges.

**The No Micro-Text Rule.** All labels, tags, and timestamps have a strict floor at `12px` (`text-xs`) with heavy weight (700/800) to ensure crystal clarity.

## Typography

- **Display Face**: **Plus Jakarta Sans** (800 Weight) with tight letter-spacing (`-0.03em`), conveying energetic, friendly poster confidence.
- **Body & Prompts**: **Plus Jakarta Sans** (600/700 Weight) for warm, highly readable foster bios and shelter translations.

## Shapes & Radii

- **Hero Squircle Geometry**: Cards and major dashboard panels use generous `32px` corner radii (`rounded-[32px]`).
- **Prompt Containers**: Secondary nested containers use `22px` corner radii (`rounded-[22px]`).
- **Pill Controls**: All buttons, badges, status chips, and avatar trays use fully rounded pill geometry (`rounded-full`).
