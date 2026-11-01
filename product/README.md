# Product Management

This directory documents the product strategy, user research, problem framing, and MVP scoping for the pet adoption matching app.

## Directory Structure

- [`personas.md`](./personas.md) — Target adopter personas, empathy maps, and Jobs-to-be-Done (JTBD).
- [`mvp-scope.md`](./mvp-scope.md) — User stories, feature prioritization (MoSCoW), technical/API constraints, and AI opportunities.
- [`matching-logic.md`](./matching-logic.md) — Base-level v1 matching dimensions (e.g., Home Presence, Energy, Space) and how AI extraction feeds into deterministic ranking logic.

---

## 1. Product Vision & Core Strategy

- **Single-Sided Adopter Focus**: The app is built 100% for **adopters**. Shelters and rescues do not need to sign up, manage profiles, or reply to messages inside our app.
- **API-Powered Inventory**: Animal listings are pulled from established rescue APIs (e.g., Petfinder API, RescueGroups API), showing **only currently available cats and dogs**.
- **Smarter Discovery & AI Matching (with Full User Control)**: Acts as a modern, engaging visual layer on top of existing pet databases. Users can either **take the Lifestyle Quiz** to get personalized match rankings *or* **apply standard/manual filters** themselves (or tweak what the quiz selected)—so they never feel locked into a "black box" or worry about missing out if AI misinterprets a bio.
- **"Shelter-Speak" Decoder (Domain Expertise Moat)**: First-time adopters often don't know what questions to ask or how to read between the lines of rescue bios (e.g., *"wants to be the only royalty in the castle"* = needs a home with no other pets). Drawing on real rescue & foster experience, the app translates shelter euphemisms into clear, compassionate, practical expectations for daily life.
- **Zero-Friction Handoff**: When an adopter wants to apply for an animal, the app links them directly to the shelter's official adoption application URL.

---

## 2. Problem Statement

> **Current State:** Sites like Petfinder have huge databases of adoptable pets, but browsing them feels like scrolling through a 2005 classifieds directory. Important compatibility details (energy level, apartment suitability, personality quirks) are buried inside unstructured paragraphs of shelter bio text, and basic filters miss how a pet actually fits into someone's daily life.
>
> **Opportunity:** How might we transform raw rescue API data into a fun, dating-app style discovery experience that extracts the details that matter, matches adopters to available cats and dogs based on lifestyle, and sends high-intent adopters straight to the rescue's application page?

---

## 3. Value Proposition & Differentiation

| Dimension | Traditional Shelter Directories (Petfinder, etc.) | This App (Adoption Match) |
| :--- | :--- | :--- |
| **User Experience** | Clunky search directory & pagination | Dating-app style cards, swiping/scrolling, and personality highlights |
| **Data Presentation** | Raw, unstructured paragraphs written by busy staff | Structured traits, clear dealbreaker badges, and AI-summarized highlights |
| **Filtering & Matching** | Rigid database checkboxes (Breed, Age, Sex) | Lifestyle & vibe matching + smart filters extracted from bio text |
| **Adoption Action** | Buried external links or generic inquiry forms | Clear "Apply to Adopt" handoff linking directly to the rescue's application |

---

## 4. Core Assumptions & Risks to Test

- **API Data Quality Risk**: Public rescue APIs often have missing fields (e.g., `good_with_cats: null`), even when the written description says *"loves other kitties!"*
  - *Mitigation / AI Opportunity*: Use an LLM or NLP pipeline to parse raw description text into structured tags and fun dating-style prompts.
- **Third-Party API Availability**: Petfinder's public API has had access changes over time; we should evaluate Petfinder, RescueGroups.org API, or shelter feed alternatives early.
- **Stale Listings Risk**: Adopters get heartbroken falling in love with an already-adopted pet.
  - *Mitigation*: Strictly filter for `status = adoptable / available` and keep sync intervals fresh.
- **Emotional UX Risk**: Swiping "left" on a rescue animal can feel guilt-inducing if framed as "rejecting" them.
  - *Mitigation*: Frame passing gently (e.g., *"Next"* or *"Not my fit"*).

---

## 5. PM Learning & Decisions Log

Use this table to document product concepts you study and how they influenced a decision in this project:

| Date | PM Concept Studied | Key Takeaway | How We Applied It Here |
| :--- | :--- | :--- | :--- |
| 2026-10-31 | **Cold-Start Problem & Single-Sided MVP** | Two-sided marketplaces (getting both shelters *and* adopters to join) usually fail early because neither side shows up without the other. | Cut shelter-side onboarding completely. By aggregating existing APIs (Petfinder, etc.) and linking out to official applications, we deliver 100% of the adopter value on Day 1 with zero shelter friction. |
| 2026-10-31 | **Value-Add Aggregator Pattern** | When building on top of commodity data, your product moat is *curation, UX, and intelligence*. | Positioned the app as a smarter discovery & AI-matching layer over raw rescue listings rather than a competing database. |
| 2026-10-31 | **"Earned Secret" / Domain Expertise** | The best products encode insider knowledge that novices don't know they need. | First-time adopters don't know how to decode shelter bios or what lifestyle friction points actually matter. Used firsthand rescue/foster experience to surface hidden requirements and translate "shelter-speak" into plain English. |
| 2026-10-31 | **User Agency & AI Transparency (Anti-Black-Box UX)** | Users distrust AI when it silently hides options and causes fear of missing out (FOMO) due to potential AI misinterpretation. | Gave users two paths: **Guided Quiz Mode** (smart matching/ranking) OR **Manual Filter Mode** (standard controls), ensuring AI acts as a helpful co-pilot rather than a gatekeeper. |
| 2026-10-31 | **Hybrid AI + Deterministic Scoring** | Using LLMs to directly rank every user-pet pair is slow and unpredictable; using AI only to extract structured traits lets standard business logic handle the scoring reliably. | Scoped v1 matching to a few base-level dimensions (like a composite **Home Presence Score** vs. separation anxiety) where AI tags the bio once and deterministic code computes the rank. |
| 2026-11-01 | **Vertical Slice MVP & Lazy Registration** | Upfront login walls cause high drop-off before users experience the product's core value ("Time-to-Value"). Also, V1 must deliver a complete, usable core loop on its own. | Iterated the user flow (`design/mockups/user-flow-vision-v2.png`) so V1 (Blue) lets unauthenticated users immediately swipe pets and view profiles, only prompting for Login/Sign Up when they trigger `Action: Save Profile`. |
| 2026-11-01 | **Endowment Effect & Compassionate Microcopy** | Users are much more likely to create an account to *keep* something they already collected than to start from zero. Also, "rejecting" a rescue animal feels bad without careful UX copy. | Added `"not a perfect match"` microcopy on left-swipe, and a bottom session tray of saved pet avatar bubbles on right-swipe (`design/mockups/v1-flow-iteration-2.png`) before prompting for login. Also explored **Swipe Up (Neutral/Skip)** vs. **Swipe Left (Dislike)** to keep future recommendation signals clean. |
