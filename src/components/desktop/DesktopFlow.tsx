"use client";

import { useState } from "react";
import { Pet, Species } from "@/types/pet";
import { LifestyleFilterState } from "@/hooks/usePetDeck";
import { PetCard } from "@/components/PetCard";
import { 
  Sparkles, 
  MapPin, 
  SlidersHorizontal, 
  Heart, 
  ExternalLink, 
  RotateCcw, 
  HelpCircle,
  Keyboard,
  CheckCircle2,
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
    <div className="min-h-screen bg-[#F5F7FD] px-8 py-7 flex flex-col justify-between max-w-6xl mx-auto">
      {/* Top Desktop Navigation */}
      <header className="flex items-center justify-between pb-5 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-periwinkle flex items-center justify-center text-xl shadow-sm border border-periwinkle-dark/20">
            🐾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl tracking-tight text-jet">
                AdoptionMatch
              </h1>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-marigold/20 text-marigold-dark border border-marigold/30">
                Rescue Discovery
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              Lifestyle-compatibility discovery with shelter-speak translation
            </p>
          </div>
        </div>

        {/* Center: Species Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full shadow-sm border border-slate-200/90">
          <button
            onClick={() => onSelectSpecies("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
              selectedSpecies === "all"
                ? "bg-jet text-white shadow-sm"
                : "text-slate-600 hover:text-jet"
            }`}
          >
            All Companions
          </button>
          <button
            onClick={() => onSelectSpecies("dog")}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
              selectedSpecies === "dog"
                ? "bg-jet text-white shadow-sm"
                : "text-slate-600 hover:text-jet"
            }`}
          >
            🐶 Dogs Only
          </button>
          <button
            onClick={() => onSelectSpecies("cat")}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
              selectedSpecies === "cat"
                ? "bg-jet text-white shadow-sm"
                : "text-slate-600 hover:text-jet"
            }`}
          >
            🐱 Cats Only
          </button>
        </div>

        {/* Right Location Badge */}
        <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full bg-white text-jet shadow-sm border border-slate-200/80">
          <MapPin className="w-4 h-4 text-marigold-dark" />
          <span>Seattle, WA • 25 mi</span>
        </div>
      </header>

      {/* Floating Compassionate Toast */}
      <div className="h-7 flex items-center justify-center my-1">
        {toastMessage && (
          <div className="text-xs font-extrabold px-4 py-1.5 rounded-full bg-jet text-white shadow-md animate-fade-in flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-marigold" />
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

              {/* Keyboard Navigation Tip for Desktop Users */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-0.5">
                <Keyboard className="w-3.5 h-3.5 text-slate-400" />
                <span className="flex items-center gap-1">
                  Use <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-700 shadow-xs">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-700 shadow-xs">→</kbd> for photos • click card for full profile
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full bg-white rounded-[32px] p-8 text-center shadow-lg border border-slate-200/90 space-y-4 my-auto">
              <div className="w-16 h-16 rounded-full bg-custard mx-auto flex items-center justify-center text-3xl">
                🎉
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-extrabold text-jet">Deck Completed!</h2>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  You reviewed all available pets matching your current filters. You have <strong>{savedPets.length} companions</strong> saved in your pack!
                </p>
              </div>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onRestart}
                  className="py-3 px-5 rounded-full bg-jet text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 hover:bg-black transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-marigold" />
                  <span>Review Deck Again</span>
                </button>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={onResetFilters}
                    className="py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-jet text-xs font-extrabold transition-all"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (7 Cols): The Pack & Lifestyle Command Center */}
        <div className="col-span-7 space-y-5">
          
          {/* Panel 1: Interactive Lifestyle Filter Chips */}
          <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <h2 className="font-extrabold text-sm text-jet">
                  Lifestyle Compatibility Filters
                </h2>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="text-xs font-extrabold text-marigold-dark hover:underline"
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
                    ? "bg-jet text-white border-jet shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-jet"
                }`}
              >
                <span>🏢 Apartment Friendly</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleLifestyleFilter("catFriendlyOnly")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 border ${
                  lifestyleFilters.catFriendlyOnly
                    ? "bg-jet text-white border-jet shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-jet"
                }`}
              >
                <span>🐱 Safe with Cats</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleLifestyleFilter("dogFriendlyOnly")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 border ${
                  lifestyleFilters.dogFriendlyOnly
                    ? "bg-jet text-white border-jet shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-jet"
                }`}
              >
                <span>🐶 Friendly with Dogs</span>
              </button>
            </div>
          </div>

          {/* Panel 2: Your Saved Pack Shelf (Hero Shortlist) */}
          <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-200/80 space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-marigold fill-marigold" />
                <h2 className="font-extrabold text-sm text-jet">
                  Your Saved Pack ({savedPets.length})
                </h2>
                {appliedCount > 0 && (
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {appliedCount} Applied
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-slate-400">
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
                      className="p-3 rounded-2xl bg-custard/40 border border-custard-dark/40 flex items-center justify-between gap-2.5 hover:bg-custard transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={pet.photos[0]}
                          alt={pet.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-xs text-jet truncate">
                              {pet.name}
                            </h3>
                            {hasApplied && (
                              <span className="bg-emerald-600 text-white text-xs font-extrabold px-1.5 py-0.2 rounded-full shrink-0">
                                Applied
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium truncate">
                            {pet.breed}
                          </p>
                          <span className="text-xs font-bold text-marigold-dark">
                            ★ {pet.matchScore}% Match
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={pet.shelter.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1 shadow-sm ${
                            hasApplied
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "bg-jet hover:bg-black text-white"
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
              <div className="py-7 text-center text-slate-400 space-y-1">
                <p className="text-xs font-semibold">Your pack is currently empty</p>
                <p className="text-xs">Click <strong>Save & Match</strong> on the left to shortlist companions here!</p>
              </div>
            )}
          </div>

          {/* Panel 3: Interactive Shelter-Speak Decoder Carousel */}
          <div className="bg-periwinkle-light/40 rounded-[28px] p-5 border border-periwinkle/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-periwinkle-dark shadow-xs">
                  <HelpCircle className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-extrabold text-xs text-jet">
                  Shelter-Speak Decoder: &ldquo;{currentTip.term}&rdquo;
                </h3>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white text-periwinkle-dark border border-periwinkle/30">
                {currentTip.tag}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
              {currentTip.meaning}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-400">
                Tip {tipIndex + 1} of {SHELTER_SPEAK_TIPS.length}
              </span>
              <button
                type="button"
                onClick={() => setTipIndex((prev) => (prev + 1) % SHELTER_SPEAK_TIPS.length)}
                className="text-xs font-extrabold text-jet hover:text-periwinkle-dark flex items-center gap-1 transition-colors"
              >
                <span>Next Decoder Tip</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="pt-5 border-t border-slate-200/70 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>Rescue inventory sourced from public rescue syndication (RescueGroups.org v5 format)</span>
        <span className="font-bold text-jet">AdoptionMatch • Elevated Dopamine Pop</span>
      </footer>
    </div>
  );
}
