# Color Theory & UI Design Notes (Developer Edition)

A practical guide to applying color theory and visual hierarchy to our pet adoption matching app.

---

## 1. Think in HSL, Not Hex (`#FF5733`)

As a software developer, Hex codes look like arbitrary magic numbers. **HSL (Hue, Saturation, Lightness)** turns color into a logical coordinate system:
- **Hue (`0°–360°`)**: The base color on the color wheel (`0°` Red, `25°` Terracotta/Orange, `45°` Warm Gold, `140°` Sage Green, `210°` Blue).
- **Saturation (`0%–100%`)**: How intense/vivid vs. muted/grayish the color is.
  - *Pro Tip*: Pure `100%` saturation looks like 1990s MS Paint. Dropping saturation to `60%–85%` (or `15%–30%` for backgrounds) immediately looks modern and editorial.
- **Lightness (`0%–100%`)**: `0%` is black, `50%` is pure color, `100%` is white.
  - *Pro Tip*: To create hover states, borders, or badge backgrounds from a single brand color, **keep the Hue the same** and just adjust Saturation and Lightness!

---

## 2. The 60–30–10 Rule (Visual Balance)

Why do some apps look calm and cohesive while others look chaotic? They follow a strict surface budget:

| Share | Role | Where It Goes in Our App | Color Strategy |
| :--- | :--- | :--- | :--- |
| **60%** | **Primary Background / Canvas** | App background, page margins | Warm off-white / cream / oat (e.g., `hsl(36, 33%, 97%)`) instead of harsh `#FFFFFF` white. |
| **30%** | **Secondary Surfaces & Structure** | Pet profile cards, prompt boxes, filter bar, muted text | Crisp white card surfaces + soft warm gray/sand prompt containers (`hsl(34, 25%, 92%)`). |
| **10%** | **Primary Accent (Action)** | "Like / Save" CTA button, Match % badge, active filter pill | High-contrast expressive brand color (e.g., Terracotta Coral `hsl(16, 75%, 52%)`). |

---

## 3. Color Psychology: Breaking Away from "Shelter Blue"

- **The Problem with Traditional Rescue Sites**: Most shelter websites use clinical medical blues, harsh purples, or urgent "warning" reds. Subconsciously, it feels like a hospital or a classifieds board.
- **Dating & Lifestyle App Vibes**:
  - **Warm Creams & Terracotta / Peach**: Evokes warmth, home, living rooms, and approachability (Hinge / Airbnb vibe).
  - **Sage Green / Forest Accents**: Evokes outdoor walks, parks, health, and calm compatibility.
  - **Warm Charcoal (`hsl(24, 15%, 18%)`) instead of Pure Black (`#000000`)**: Tinting your text color with the same warm hue as your background makes the whole screen feel unified.

---

## 4. Semantic Colors for "Shelter-Speak Decoding"

Because our app translates rescue bios for first-time adopters, **semantic colors** do heavy UX lifting—telling the user how to feel about a trait without scaring them off:

1. **Positive Match / Green Flag (`Sage / Emerald`)**:
   - *Use for*: `"92% Match"`, `"Apartment Friendly"`, `"Cat Friendly"`.
   - *Tip*: Use a soft pastel background (`L: 92%`) with dark green text (`L: 24%`) for effortless readability.
2. **"Good to Know" / Nuance (`Warm Amber / Honey`)**:
   - *Use for*: Decoded shelter-speak like *"Needs a fenced yard"* or *"Shy with strangers at first"*.
   - *Why Amber instead of Red?*: Red triggers "error / danger / bad dog." Warm amber communicates *"pay attention and consider your lifestyle"* without stigmatizing the animal.
3. **Unknown / Ask the Rescue (`Cool Slate / Warm Stone`)**:
   - *Use for*: Traits not mentioned in the Petfinder bio (e.g., *"Alone-time: Ask rescue"*).

---

## 5. Candidate Palettes to Explore

| Palette Name | 60% Canvas | 30% Card / Secondary | 10% Primary Accent | Vibe |
| :--- | :--- | :--- | :--- | :--- |
| **A. Cozy Editorial (Hinge-style)** | Warm Oat `#FAF7F2` | Sand Prompt `#F2ECE1` | Terracotta `#D95D39` + Sage `#4A7C59` | Warm, homey, trustworthy, modern |
| **B. Sunny Park Walk (Bumble-style)** | Soft Ivory `#FFFDF9` | Warm Mist `#F4F1EA` | Marigold/Coral `#F26430` + Teal `#2A6F6B` | Energetic, upbeat, playful |
| **C. Gentle Companion** | Alabaster `#F8F7FA` | Soft Lavender-Gray `#EDEAF4` | Plum Berry `#7C4D79` + Mint `#3B7A67` | Calm, boutique, gentle |
