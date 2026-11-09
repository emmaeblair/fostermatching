"use client";

import { useState } from "react";
import { Pet, Species } from "@/types/pet";
import { LifestyleFilterState } from "@/hooks/usePetDeck";
import { PetCard } from "@/components/PetCard";
import { 
  Sparkles, 
  MapPin, 
  Heart, 
  ExternalLink, 
  RotateCcw, 
  HelpCircle, 
  Keyboard, 
  ChevronRight, 
  Filter 
} from "lucide-react";

const SHELTER_SPEAK_TIPS = [
  {
    term: "Needs patient decompression",
    meaning: "The 3-3-3 Rule: 3 days to stop feeling overwhelmed, 3 weeks to settle into your home routine, and 3 months to realize they are truly safe and home forever.",
    tag: "Essential Rule"
  },
  {
    term: "Velcro companion / Super shadow",
    meaning: "Decoded: Wants to be in whatever room you are in. Will curl under your desk while you work and follow you to the kitchen. Zero personal space, maximum love!",
    tag: "Remote Work Favorite"
  },
  {
    term: "High prey drive / Squirrel enthusiast",
    meaning: "Decoded: Chases anything that scurries! Keep them securely leashed on neighborhood walks and avoid homes with resident cats or free-roaming bunnies.",
    tag: "Safety First"
  },
  {
    term: "Lots of enthusiasm / Big energy",
    meaning: "Decoded: Needs an outlet for their joy! Perfect for runners, hikers, or families with a backyard for daily fetch sessions.",
    tag: "Active Lifestyle"
  }
];

interface DesktopFlowProps {
  activePet?: Pet;
  isDeckEmpty: boolean;
  savedPets: Pet[];
  selectedSpecies: Species | "all";
  onSelectSpecies: (species: Species | "all") => void;
  lifestyleFilters: LifestyleFilterState;
  onToggleLifestyleFilter: (key: keyof LifestyleFilterState) => void;
  onResetFilters: () => void;
  totalCount: number;
  currentIndex: number;
  onPass: () => void;
  onSave: () => void;
  onRestart: () => void;
  toastMessage: string | null;
  onViewProfile: (pet: Pet) => void;
  isApplied: (petId: string) => boolean;
  onOpenDrop?: () => void;
  onOutboundApply?: (pet: Pet) => void;
}

export function DesktopFlow({
  activePet,
  isDeckEmpty,
  savedPets,
  selectedSpecies,
  onSelectSpecies,
  lifestyleFilters,
  onToggleLifestyleFilter,
  onResetFilters,
  totalCount,
  currentIndex,
  onPass,
  onSave,
  onRestart,
  toastMessage,
  onViewProfile,
  isApplied,
  onOpenDrop,
  onOutboundApply,
}: DesktopFlowProps) {
  const [tipIndex, setTipIndex] = useState(0);

  const appliedCount = savedPets.filter((p) => isApplied(p.id)).length;
  const currentTip = SHELTER_SPEAK_TIPS[tipIndex];

  const hasActiveFilters = 
    selectedSpecies !== "all" || 
    lifestyleFilters.apartmentOnly || 
    lifestyleFilters.catFriendlyOnly || 
    lifestyleFilters.dogFriendlyOnly;

  return (
    <div className="min-h-screen bg-biscuit px-8 py-7 flex flex-col justify-between max-w-6xl mx-auto selection:bg-candy selection:text-white">
      {/* Top Desktop Navigation */}
      <header className="flex items-center justify-between pb-5 border-b border-cocoa/15">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-sunset text-white flex items-center justify-center text-xl shadow-md border border-white/40">
            🐾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-2xl tracking-tight text-cocoa">
                AdoptionMatch
              </h1>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-candy text-white shadow-xs">
                Candy Sunset
              </span>
            </div>
            <p className="text-xs font-bold text-cocoa/80">
              Find the companion who fits the rhythm of your day.
            </p>
          </div>
        </div>

        {/* Center: Species Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-full shadow-md border border-cocoa/15">
          <button
            onClick={() => onSelectSpecies("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
              selectedSpecies === "all"
                ? "bg-sunset text-white shadow-sm"
                : "text-cocoa hover:text-sunset"
            }`}
          >
            All Pets
          </button>
          <button
            onClick={() => onSelectSpecies("dog")}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
              selectedSpecies === "dog"
                ? "bg-sunset text-white shadow-sm"
                : "text-cocoa hover:text-sunset"
            }`}
          >
            🐶 Dogs
          </button>
          <button
            onClick={() => onSelectSpecies("cat")}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
              selectedSpecies === "cat"
                ? "bg-sunset text-white shadow-sm"
                : "text-cocoa hover:text-sunset"
            }`}
          >
            🐱 Cats
          </button>
        </div>

        {/* Right Actions: Daily Drop & Location Badge */}
        <div className="flex items-center gap-2.5">
          {onOpenDrop && (
            <button
              type="button"
              onClick={onOpenDrop}
              className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-mango hover:bg-mango-dark text-white shadow-md transition-all flex items-center gap-1.5 border border-white/30 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>Daily Drop</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-xs font-extrabold px-4 py-1.5 rounded-full bg-white/90 text-cocoa shadow-md border border-cocoa/15">
            <MapPin className="w-4 h-4 text-sunset" />
            <span>Seattle, WA • 25 mi</span>
          </div>
        </div>
      </header>

      {/* Floating Toast */}
      <div className="h-7 flex items-center justify-center my-1">
        {toastMessage && (
          <div className="text-xs font-extrabold px-4 py-1.5 rounded-full bg-white text-cocoa shadow-lg animate-fade-in flex items-center gap-2 border border-cocoa/20">
            <Sparkles className="w-3.5 h-3.5 text-candy fill-candy" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Main 2-Column Desktop Grid */}
      <main className="grid grid-cols-12 gap-8 items-start my-auto py-2">
        
        {/* Left Column (5 Cols): The Card Deck & Keyboard Hints */}
        <div className="col-span-5 flex flex-col items-center">
          {!isDeckEmpty && activePet ? (
            <div className="w-full flex flex-col items-center gap-3">
              <PetCard
                pet={activePet}
                isApplied={isApplied(activePet.id)}
                onPass={onPass}
                onSave={onSave}
                onViewProfile={() => onViewProfile(activePet)}
              />

              {/* Keyboard Navigation Tip */}
              <div className="flex items-center gap-2 text-xs font-bold text-cocoa/85 mt-0.5">
                <Keyboard className="w-3.5 h-3.5 text-cocoa" />
                <span className="flex items-center gap-1">
                  Use <kbd className="px-1.5 py-0.5 rounded bg-white text-cocoa font-mono shadow-xs border border-cocoa/20">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white text-cocoa font-mono shadow-xs border border-cocoa/20">→</kbd> for photos • click card for full profile
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full bg-white rounded-[32px] p-8 text-center shadow-xl border border-cocoa/15 space-y-4 my-auto text-cocoa">
              <div className="w-16 h-16 rounded-full bg-mango text-white mx-auto flex items-center justify-center text-3xl shadow-sm">
                🎉
              </div>
              <div className="space-y-1.5">
                <h2 className="text-2xl font-extrabold tracking-tight">Deck Completed!</h2>
                <p className="text-xs font-semibold text-cocoa-muted leading-relaxed">
                  You reviewed all available pets matching your filters. You have <strong>{savedPets.length} companions</strong> saved in your pack!
                </p>
              </div>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onRestart}
                  className="py-3 px-5 rounded-full bg-candy text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 hover:bg-candy-dark transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                  <span>Review Deck Again</span>
                </button>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={onResetFilters}
                    className="py-3 px-4 rounded-full bg-biscuit/50 hover:bg-biscuit text-cocoa text-xs font-extrabold transition-all border border-cocoa/20"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (7 Cols): The Pack Command Center */}
        <div className="col-span-7 space-y-5">
          
          {/* Panel 1: Interactive Lifestyle Filter Chips */}
          <div className="bg-white/90 rounded-[28px] p-5 shadow-xl border border-cocoa/15 text-cocoa space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-cocoa" />
                <h2 className="font-extrabold text-sm tracking-tight">
                  Lifestyle Compatibility Filters
                </h2>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="text-xs font-extrabold text-sunset hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => onToggleLifestyleFilter("apartmentOnly")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 border ${
                  lifestyleFilters.apartmentOnly
                    ? "bg-sunset text-white border-sunset shadow-sm"
                    : "bg-biscuit/45 text-cocoa border-cocoa/15 hover:bg-biscuit"
                }`}
              >
                <span>🏢 Apartment Friendly</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleLifestyleFilter("catFriendlyOnly")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 border ${
                  lifestyleFilters.catFriendlyOnly
                    ? "bg-sunset text-white border-sunset shadow-sm"
                    : "bg-biscuit/45 text-cocoa border-cocoa/15 hover:bg-biscuit"
                }`}
              >
                <span>🐱 Safe with Cats</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleLifestyleFilter("dogFriendlyOnly")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 border ${
                  lifestyleFilters.dogFriendlyOnly
                    ? "bg-sunset text-white border-sunset shadow-sm"
                    : "bg-biscuit/45 text-cocoa border-cocoa/15 hover:bg-biscuit"
                }`}
              >
                <span>🐶 Friendly with Dogs</span>
              </button>
            </div>
          </div>

          {/* Panel 2: Your Saved Pack Shelf (Hero Shortlist) */}
          <div className="bg-white/90 rounded-[28px] p-5 shadow-xl border border-cocoa/15 text-cocoa space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-cocoa/10">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-candy fill-candy" />
                <h2 className="font-extrabold text-sm tracking-tight">
                  Your Saved Pack ({savedPets.length})
                </h2>
                {appliedCount > 0 && (
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-candy/20 text-sunset border border-candy/40">
                    {appliedCount} Applied 💌
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-cocoa-muted">
                Click any pet to view full decoder
              </span>
            </div>

            {savedPets.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                {savedPets.map((pet) => {
                  const hasApplied = isApplied(pet.id);
                  return (
                    <div
                      key={pet.id}
                      onClick={() => onViewProfile(pet)}
                      className="p-3 rounded-2xl bg-biscuit/35 border border-cocoa/10 flex items-center justify-between gap-2.5 hover:bg-biscuit/70 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={pet.photos[0]}
                          alt={pet.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-xs text-cocoa truncate">
                              {pet.name}
                            </h3>
                            {hasApplied && (
                              <span className="bg-candy text-white text-xs font-extrabold px-2 py-0.5 rounded-full shrink-0">
                                Applied
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-cocoa-muted font-medium truncate">
                            {pet.breed}
                          </p>
                          <span className="text-xs font-bold text-sunset">
                            ★ {pet.matchScore}% Match
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={pet.shelter.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!hasApplied) {
                              onOutboundApply?.(pet);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1 shadow-sm ${
                            hasApplied
                              ? "bg-candy hover:bg-candy-dark text-white"
                              : "bg-sunset hover:bg-sunset-dark text-white"
                          }`}
                        >
                          <span>{hasApplied ? "Applied" : "Apply"}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-7 text-center text-cocoa-muted space-y-1">
                <p className="text-xs font-semibold">Your pack is currently empty</p>
                <p className="text-xs">Click <strong>Save & Match</strong> on the left to shortlist companions here!</p>
              </div>
            )}
          </div>

          {/* Panel 3: Interactive Shelter-Speak Decoder Carousel */}
          <div className="bg-white/90 rounded-[28px] p-5 border border-cocoa/15 text-cocoa shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-mango flex items-center justify-center text-white shadow-xs">
                  <HelpCircle className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-extrabold text-xs text-sunset uppercase tracking-wider">
                  Shelter-Speak Decoder: &ldquo;{currentTip.term}&rdquo;
                </h3>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-lilac/50 text-cocoa border border-lilac">
                {currentTip.tag}
              </span>
            </div>

            <p className="text-xs text-cocoa-muted leading-relaxed font-medium pt-1">
              {currentTip.meaning}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-cocoa-muted">
                Tip {tipIndex + 1} of {SHELTER_SPEAK_TIPS.length}
              </span>
              <button
                type="button"
                onClick={() => setTipIndex((prev) => (prev + 1) % SHELTER_SPEAK_TIPS.length)}
                className="text-xs font-extrabold text-sunset hover:text-sunset-dark flex items-center gap-1 transition-colors"
              >
                <span>Next Decoder Tip</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="pt-5 border-t border-cocoa/15 flex items-center justify-between text-xs font-bold text-cocoa/80">
        <span>Rescue inventory sourced from public rescue syndication (RescueGroups.org v5 format)</span>
        <span className="font-extrabold text-cocoa">AdoptionMatch • Candy Sunset Edition</span>
      </footer>
    </div>
  );
}
