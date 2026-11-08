"use client";

import { Pet, Species } from "@/types/pet";
import { PetCard } from "@/components/PetCard";
import { SessionTray } from "@/components/SessionTray";
import { RotateCcw } from "lucide-react";

interface MobileFlowProps {
  activePet?: Pet;
  isDeckEmpty: boolean;
  savedPets: Pet[];
  selectedSpecies: Species | "all";
  onSelectSpecies: (species: Species | "all") => void;
  onPass: () => void;
  onSave: () => void;
  onRestart: () => void;
  toastMessage: string | null;
  onViewProfile: (pet: Pet) => void;
  isApplied: (petId: string) => boolean;
}

export function MobileFlow({
  activePet,
  isDeckEmpty,
  savedPets,
  selectedSpecies,
  onSelectSpecies,
  onPass,
  onSave,
  onRestart,
  toastMessage,
  onViewProfile,
  isApplied,
}: MobileFlowProps) {
  return (
    <main className="min-h-screen px-4 py-4 flex flex-col justify-between max-w-sm mx-auto bg-terracotta selection:bg-sun selection:text-cocoa">
      {/* Top Mobile Bar */}
      <header className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sun text-cocoa flex items-center justify-center text-sm shadow-md border border-white/40 font-bold">
            🐾
          </div>
          <h1 className="font-extrabold text-base tracking-tight text-cocoa">
            AdoptionMatch
          </h1>
        </div>

        {/* Mini Species Toggle */}
        <div className="flex items-center gap-1 bg-custard p-0.5 rounded-full border border-cocoa/15 text-xs font-bold shadow-sm">
          <button
            onClick={() => onSelectSpecies("all")}
            className={`px-2.5 py-1 rounded-full transition-all ${
              selectedSpecies === "all" ? "bg-cobalt text-white shadow-xs" : "text-cocoa"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onSelectSpecies("dog")}
            className={`px-2.5 py-1 rounded-full transition-all ${
              selectedSpecies === "dog" ? "bg-cobalt text-white shadow-xs" : "text-cocoa"
            }`}
          >
            🐶
          </button>
          <button
            onClick={() => onSelectSpecies("cat")}
            className={`px-2.5 py-1 rounded-full transition-all ${
              selectedSpecies === "cat" ? "bg-cobalt text-white shadow-xs" : "text-cocoa"
            }`}
          >
            🐱
          </button>
        </div>
      </header>

      {/* Toast */}
      <div className="h-6 flex items-center justify-center">
        {toastMessage && (
          <div className="text-xs font-extrabold px-3.5 py-1 rounded-full bg-custard text-cocoa shadow-lg border border-cocoa/20 animate-fade-in">
            {toastMessage}
          </div>
        )}
      </div>

      {/* Main Deck Container */}
      <div className="flex-1 flex flex-col justify-center my-auto py-1">
        {!isDeckEmpty && activePet ? (
          <PetCard
            pet={activePet}
            isApplied={isApplied(activePet.id)}
            onPass={onPass}
            onSave={onSave}
            onViewProfile={() => onViewProfile(activePet)}
          />
        ) : (
          <div className="bg-custard rounded-[32px] p-6 text-center shadow-2xl border border-cocoa/20 space-y-4 my-auto text-cocoa">
            <div className="w-14 h-14 rounded-full bg-sun text-cocoa mx-auto flex items-center justify-center text-2xl shadow-sm">
              🎉
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold tracking-tight">Deck Completed!</h2>
              <p className="text-xs text-cocoa-muted font-medium leading-relaxed">
                You saved {savedPets.length} companions to your pack.
              </p>
            </div>
            <button
              type="button"
              onClick={onRestart}
              className="py-2.5 px-4 rounded-full bg-cobalt text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 mx-auto hover:bg-cobalt-dark transition-all"
            >
              <RotateCcw className="w-4 h-4 text-sun" />
              <span>Review Deck Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Session Tray */}
      <footer className="pt-2">
        <SessionTray 
          savedPets={savedPets} 
          isApplied={isApplied}
          onSelectPet={onViewProfile}
        />
      </footer>
    </main>
  );
}
