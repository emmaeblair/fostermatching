"use client";

import { Pet, Species } from "@/types/pet";
import { PetCard } from "@/components/PetCard";
import { 
  Sparkles, 
  MapPin, 
  SlidersHorizontal, 
  Heart, 
  ExternalLink, 
  RotateCcw, 
  HelpCircle,
  Keyboard
} from "lucide-react";

interface DesktopFlowProps {
  activePet?: Pet;
  isDeckEmpty: boolean;
  savedPets: Pet[];
  selectedSpecies: Species | "all";
  onSelectSpecies: (species: Species | "all") => void;
  onPass: () => void;
  onSave: () => void;
  onRestart: () => void;
  toastMessage: string | null;
}

export function DesktopFlow({
  activePet,
  isDeckEmpty,
  savedPets,
  selectedSpecies,
  onSelectSpecies,
  onPass,
  onSave,
  onRestart,
  toastMessage,
}: DesktopFlowProps) {
  return (
    <div className="min-h-screen bg-[#F4F6FB] px-8 py-8 flex flex-col justify-between max-w-6xl mx-auto">
      {/* Top Desktop Navigation */}
      <header className="flex items-center justify-between pb-6 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-periwinkle flex items-center justify-center text-lg shadow-sm">
            🐾
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-jet">
              AdoptionMatch
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Dating-style discovery for rescue companions
            </p>
          </div>
        </div>

        {/* Center: Species Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-full shadow-sm border border-slate-200/80">
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

        {/* Right Context Badge */}
        <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full bg-white text-jet shadow-sm border border-slate-200/80">
          <MapPin className="w-4 h-4 text-marigold-dark" />
          <span>Seattle, WA • Within 25 mi</span>
        </div>
      </header>

      {/* Floating Compassionate Toast */}
      <div className="h-8 flex items-center justify-center my-1">
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
                onPass={onPass}
                onSave={onSave}
                onViewProfile={() => window.open(activePet.shelter.applicationUrl, "_blank")}
              />

              {/* Keyboard Navigation Tip for Desktop Users */}
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mt-1">
                <Keyboard className="w-3.5 h-3.5 text-slate-400" />
                <span className="flex items-center gap-1">
                  Use <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-700 shadow-sm">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-700 shadow-sm">→</kbd> keys to flip through photos
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full bg-white rounded-[28px] p-8 text-center shadow-lg border border-slate-100 space-y-4">
              <div className="w-16 h-16 rounded-full bg-custard mx-auto flex items-center justify-center text-3xl">
                🎉
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-jet">Deck Completed!</h2>
                <p className="text-xs text-slate-500 font-medium">
                  You reviewed all available pets in this category. You have {savedPets.length} companions saved in your pack!
                </p>
              </div>
              <button
                type="button"
                onClick={onRestart}
                className="py-3 px-5 rounded-full bg-jet text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 mx-auto hover:bg-black transition-all"
              >
                <RotateCcw className="w-4 h-4 text-marigold" />
                <span>Review Deck Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column (7 Cols): Rich Persistent Dashboard Panels */}
        <div className="col-span-7 space-y-5">
          
          {/* Panel 1: Your Saved Pack Shelf */}
          <div className="bg-white rounded-[26px] p-5 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-marigold fill-marigold" />
                <h2 className="font-extrabold text-sm text-jet">
                  Your Saved Pack ({savedPets.length})
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">
                Ready to apply when you are
              </span>
            </div>

            {savedPets.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
                {savedPets.map((pet) => (
                  <div
                    key={pet.id}
                    className="p-2.5 rounded-2xl bg-custard/50 border border-custard-dark/40 flex items-center justify-between gap-2.5 hover:bg-custard transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={pet.photos[0]}
                        alt={pet.name}
                        className="w-11 h-11 rounded-xl object-cover shrink-0 shadow-sm"
                      />
                      <div className="min-w-0">
                        <h3 className="font-extrabold text-xs text-jet truncate">
                          {pet.name}
                        </h3>
                        <p className="text-[10px] text-slate-500 font-medium truncate">
                          {pet.breed}
                        </p>
                        <span className="text-[10px] font-bold text-marigold-dark">
                          ★ {pet.matchScore}% Match
                        </span>
                      </div>
                    </div>

                    <a
                      href={pet.shelter.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-xl bg-jet text-white text-[10px] font-extrabold shrink-0 hover:bg-black transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 space-y-1">
                <p className="text-xs font-semibold">Your pack is currently empty</p>
                <p className="text-[11px]">Swipe right or click Save to shortlist companions here!</p>
              </div>
            )}
          </div>

          {/* Panel 2: Quick Search Filters */}
          <div className="bg-white rounded-[26px] p-5 shadow-sm border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-600" />
                <h2 className="font-extrabold text-sm text-jet">Search Filters</h2>
              </div>
              <span className="text-[11px] font-bold text-marigold-dark">Reset</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Distance</span>
                <span className="font-extrabold text-jet">Within 25 miles</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Living Space</span>
                <span className="font-extrabold text-jet">Apartment OK</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Energy Vibe</span>
                <span className="font-extrabold text-jet">Low to Medium</span>
              </div>
            </div>
          </div>

          {/* Panel 3: Domain Expertise Moat ("Shelter-Speak Decoder") */}
          <div className="bg-periwinkle-light/40 rounded-[26px] p-4 border border-periwinkle/30 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 text-periwinkle-dark shadow-sm">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-xs text-jet">
                Shelter-Speak Decoder: &ldquo;Needs patient decompression&rdquo;
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Rescues use this for dogs who are shy in shelters. Remember the <strong>3-3-3 rule</strong>: 3 days to decompress, 3 weeks to learn your routine, and 3 months to feel fully at home!
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="pt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>Rescue inventory sourced from public rescue syndication (RescueGroups.org v5 format)</span>
        <span className="font-bold text-jet">AdoptionMatch MVP</span>
      </footer>
    </div>
  );
}
