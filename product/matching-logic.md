# Base-Level Matching & Ranking Model (v1)

To keep the MVP grounded and reliable, we separate **AI Extraction** from **Match Scoring**:
1. **AI / Parser Layer**: Reads the messy shelter bio + API fields and assigns simple, base-level trait buckets (`Low`, `Mid`, `High`, or `Unknown`).
2. **Deterministic Ranking Layer (Business Logic)**: Compares the **Adopter's Quiz Profile** against the **Pet's Trait Profile** to calculate a transparent compatibility rank.

---

## 1. Core Matching Dimensions (Start Small)

Instead of trying to model 50 nuances on day one, v1 can start with **4 base dimensions**:

| Dimension | Adopter Score (from Quiz) | Pet Requirement (from API + Bio) | Example Mismatch Logic |
| :--- | :--- | :--- | :--- |
| **1. Home Presence / Alone-Time** | **Low** (Away 8+ hrs)<br>**Mid** (WFH, but active social life out of the house)<br>**High** (Homebody / rarely leaves pet alone) | **Low Need** (Independent)<br>**Mid Need** (Standard)<br>**High Need** (Separation anxiety / velcro pet / puppy) | Adopter with **Mid** Home Score ranks lower for a dog with **High** separation anxiety. |
| **2. Energy & Activity** | **Low** (Strolls & couch hangs)<br>**Mid** (Daily brisk walks + weekend play)<br>**High** (Runner / hiker / dog sports) | **Low** (Couch potato / senior)<br>**Mid** (Moderate daily exercise)<br>**High** (Working breed / high drive) | High-energy dog + Low-energy human = penalized in ranking. |
| **3. Living Space / Environment** | **Apartment / Shared Walls**<br>**Townhouse / Small Yard**<br>**House with Fenced Yard** | **Apartment-OK** (Quiet, adaptable)<br>**Needs Yard / Low Traffic** (Vocal or needs room to run) | Dog flagged as "needs fenced yard" or "vocal/barks" ranks lower for Apartment adopters. |
| **4. Household Compatibility** | Has **Cats**? Has **Dogs**? Has **Kids**? | **Yes / No / Unknown** (combined from API booleans + bio text) | Hard or strong-soft filter if adopter has a cat and bio says *"no cats / high prey drive"*. |

---

## 2. Why "AI Extracts → Business Logic Ranks" Works Best

Asking an LLM to directly "score this dog for this user from 1 to 100" is slow, expensive, and unpredictable. Instead:
- **Step 1 (Ingest Time)**: When we fetch a pet from the Petfinder API, we parse their bio **once** into simple base scores (e.g., `alone_time_need: "High"`, `energy: "Mid"`, `yard_required: false`, `confidence: "explicit"` vs `"inferred"`).
- **Step 2 (Query Time)**: When an adopter takes the quiz, their answers map to the exact same scale (e.g., WFH + goes out a lot socially = `home_presence: "Mid"`).
- **Step 3 (Fast Math)**: Pure business logic compares the two profiles and sorts the feed—starting everyone at 100 points and subtracting points for friction (or adding bonus points for exact matches).

---

## 3. Handling "Unknowns" Gracefully

Shelter bios don't always mention every trait (e.g., a bio might say nothing about how the dog does home alone).
- If a pet's trait is **`Unknown`**, we **do not penalize them as a mismatch**.
- Instead, we treat `Unknown` as neutral in the ranking score and surface a helpful prompt on their card: *"Ask the rescue: How does Barnaby do when left home alone for a few hours?"*
