# Adoption API Landscape & Data Strategy

This document tracks the technical evaluation of third-party pet adoption APIs and our data integration architecture.

---

## 1. The API Landscape (2025–2026 Evaluation)

| Provider | Status | Access Model | Developer Verdict |
| :--- | :--- | :--- | :--- |
| **RescueGroups.org API v5** | **Active & Modern** | Free REST API Key | **Primary Target**. Standards-compliant JSON:API v5, search by location/radius, species, and full photo/org relationships. |
| **Petfinder API** | **Decommissioned (Dec 2, 2025)** | Retired | **Deprecated**. Petfinder shut down programmatic REST API access in late 2025 in favor of a no-code iframe widget for shelters. |
| **Adopt-a-Pet API** | Restricted | Enterprise Partner Agreement | Requires formal non-profit commercial sponsorship contracts and manual design audit. |
| **Shelterluv / ShelterBuddy** | Single-Shelter Only | Shelter Admin Key | Scoped to individual shelters rather than a national aggregator. |

---

## 2. RescueGroups.org API v5 Specification

- **Protocol**: RESTful HTTP / JSON
- **Content-Type**: `application/vnd.api+json`
- **Auth Header**: `Authorization: YOUR_API_KEY`
- **Search Endpoint**: `POST https://api.rescuegroups.org/v5/public/animals/search/available`
- **Key Query Parameters**:
  - `include=pictures,orgs,locations,breeds`
  - Body Filters: `species` (Dog / Cat), `location` (Postal Code + Distance in miles).

---

## 3. Architecture Pattern: The Pet Data Adapter

To ensure our UI and matching logic are never coupled to a single vendor or blocked by rate limits, we use the **Repository / Adapter Pattern**:

```
[ Frontend UI / Swipe Card Feed ]
                │
                ▼
      [ PetService Interface ]
         ├── MockPetAdapter (Local JSON for fast dev & testing)
         └── RescueGroupsAdapter (Live HTTP client with API key)
```

### Benefits of Starting with Mock Data:
1. **Zero Blocker**: We can build and style the entire V1 swipe feed, photo tap arrows, and bottom tray immediately.
2. **Realistic Edge Cases**: We can craft mock animals representing key adoption scenarios:
   - *Barnaby*: Great in apartments, likes cats, needs to be only dog.
   - *Luna*: High energy, needs fenced yard, loves everyone.
   - *Cleo (Cat)*: Independent couch potato, litter-box trained.
3. **Seamless Switchover**: When ready, swapping `MockPetAdapter` for `RescueGroupsAdapter` is a 1-line environment variable change (`USE_MOCK_PETS=false`).
