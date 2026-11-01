# MVP Scope & Feature Prioritization

Use this document to track the Minimum Viable Product (MVP) scope, user stories, and AI learning opportunities.

---

## 1. Build Phases (Mapped to User Flow Diagram)

See the live [Adoption Matching Flow (FigJam Board)](https://www.figma.com/board/3GOceavJzsTEZ0KbApZ9Vi/Adoption-Matching-Flow?node-id=0-1&p=f&t=tQKNhGEsvuvZ4aXt-0) and the exported snapshots in [`design/mockups/`](../design/mockups/) for the visual maps of these phases:

- **Phase V1 (Blue — Core Discovery Slice)**:
  - `general user, no login` → `matching page` (swipe left/right on available pets) → `specific pet profile` (with outbound link to rescue application).
  - *Why first*: Delivers immediate adopter value and tests the core swipe/card UX + rescue API integration with zero auth overhead.
- **Phase V2 (Pink — Saved Matches & Summary Dashboard)**:
  - `Action: Save Profile`, `see all matched pets`, and `home page - summary` (dogs applied for, recent matches, alerts if a match is no longer available).
  - *Engineering note*: Can use browser `localStorage` initially in V2 before full account auth is added in V5, or pull Login earlier if backend persistence is preferred.
- **Phase V3 (Green — Onboarding & Match Prompts)**:
  - `Invite to start matching first` routing step connecting onboarding to the matching feed or summary dashboard.
- **Phase V4 (Purple — Lifestyle Preference Quiz)**:
  - `optional quiz to set preferences` and `quiz page` to compute lifestyle match scores (e.g., Home Presence score, Energy level).
- **Phase V5 (Coral — Auth & Account Settings)**:
  - `User Login or Sign Up` (triggered lazily when an unauthenticated user tries to save a profile, or for returning users) and `settings`.

---

## 2. Feature Prioritization (MoSCoW Method)

### Must Have (Core MVP)
*The smallest possible product that proves the "dating-style pet discovery" concept.*
- [ ] **Rescue API Integration**: Fetch adoptable **cats and dogs** from a public API (e.g., Petfinder / RescueGroups), strictly filtered to `available` status and location radius.
- [ ] **Dual Discovery Entry (Lifestyle Quiz OR Manual Filters)**:
  - **Path A — Lifestyle Match Quiz**: Answer a few quick questions and let the app configure filters/ranking for you.
  - **Path B — Manual Filters**: Skip straight to standard filters (Species, Age, Size, Distance, plus optional AI-extracted tags) so users always have full control and never worry about missing a pet due to an AI misread.
  - **Transparent Filter Pills**: Even after taking the quiz, show the active filters at the top of the feed so the user can toggle any filter off with one tap.
- [ ] **Dating-Style Discovery Feed**: Card-based UI to scroll/swipe through available pets with photos, key vitals, and scannable personality traits.
- [ ] **Smart / AI Matching & Bio Enhancement** (see [`matching-logic.md`](./matching-logic.md)):
  - Parse raw API description text to extract base-level traits (e.g., Home Presence need, Energy level) and generate Hinge-style summary prompts.
  - Score/rank pets deterministically based on how well their extracted traits fit the adopter's quiz profile.
- [ ] **Saved Favorites List**: Keep track of liked pets in one place.
- [ ] **Direct Application Handoff**: Clear outbound button linking directly to the rescue's official adoption page/application URL.

### Should Have (Fast Follow)
*High-value enhancements once the core feed works.*
- [ ] **"Why We Matched" Breakdown**: Show 2–3 bullet points explaining why a pet scored high for the user (e.g., *"Matches your quiet apartment preference"*).
- [ ] **Dealbreaker Warnings**: Highlight potential yellow flags extracted from the bio (e.g., *"Bio mentions: Needs a fenced yard"*).
- [ ] **Comparison View**: Side-by-side look at top saved pets.

### Could Have (Future Polish)
*Fun additions to explore later.*
- [ ] **"Daily Top Pick"**: Highlight one standout match per day.
- [ ] **Shareable Pet Cards**: Easily text a card to a partner or roommate ("What do you think of Barnaby?").

### Won't Have (Explicitly Out of Scope)
*Crucial boundaries to keep the project focused.*
- **No Shelter/Rescue Accounts**: Shelters do not log in or manage listings here.
- **No Foster Coordination**: Strictly for permanent adoption discovery.
- **No In-App Applications or Messaging**: We always link out to the rescue's official application URL.
- **No Unavailable Pets**: Pending/adopted animals are excluded from the discovery feed.
- **No Other Species (v1)**: Strictly cats and dogs first.

---

## 3. AI Learning Opportunities in This Project

Since you want to use this project to learn AI/LLM integration alongside UI and PM, here are natural places where AI adds real product value over Petfinder:

1. **Unstructured Bio → Structured Dating Card & "Shelter-Speak Decoder" (Structured Outputs / Extraction)**:
   - *Input*: A messy 300-word shelter paragraph from the API full of polite rescue euphemisms.
   - *AI Output*: JSON containing:
     - `energy_level` (1–5) & `vibe_tags` (`["Velcro dog", "Treat motivated", "Couch potato"]`)
     - `what_this_actually_means` (Decoding shelter-speak for first-time adopters: e.g., translating *"prefers to be the only baby"* → *"Needs to be the only pet in the home"*, or *"working on her confidence"* → *"Needs a quiet neighborhood and patient decompression time"*)
     - `things_to_consider` (Surfacing practical day-to-day factors novices overlook, like grooming, separation anxiety hints, or leash reactivity)
     - 2 cute first-person dating prompts derived strictly from facts in the bio.
2. **Semantic Search & Lifestyle Matching (Embeddings / RAG)**:
   - Let an adopter type a natural-language vibe: *"Looking for a goofy medium dog who likes weekend hikes but will chill while I code during the week"* and match against pet bio embeddings.
3. **Match Explanation Generator**:
   - Generate a 1-sentence personalized pitch on the card: *"92% Match: Barnaby is house-trained, loves quiet apartments, and gets along with cats."*

---

## 4. Core User Stories

Format: *As an Adopter, I want to [action] so that [outcome/value].*

1. **Setup**: As an *Adopter*, I want to set my location, species preference (cat/dog), and lifestyle vibe in under a minute so that I only see relevant, available pets near me.
2. **Discovery**: As an *Adopter*, I want to browse available pets as visual dating-style cards with AI-extracted highlights rather than walls of text so that finding compatible pets is fun and fast.
3. **Evaluation**: As an *Adopter*, I want to see *why* a pet matched with me (and any dealbreakers buried in their bio) so that I don't waste time falling for a pet that doesn't fit my home.
4. **Action**: As an *Adopter*, I want to save my favorite matches and click straight through to the shelter's application link when I'm ready to apply.
