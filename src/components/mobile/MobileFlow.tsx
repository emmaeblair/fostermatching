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
    <main className="min-h-screen px-4 py-4 flex flex-col justify-between max-w-sm mx-auto bg-[#F5F7FD]">
      {/* Top Mobile Bar */}
      <header className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-periwinkle flex items-center justify-center text-sm shadow-xs border border-periwinkle-dark/20">
            🐾
          </div>
          <h1 className="font-extrabold text-base tracking-tight text-jet">
            AdoptionMatch
          </h1>
        </div>

        {/* Mini Species Toggle */}
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-full border border-slate-200 text-xs font-bold shadow-xs">
          <button
            onClick={() => onSelectSpecies("all")}
            className={`px-2.5 py-1 rounded-full transition-all ${
              selectedSpecies === "all" ? "bg-jet text-white shadow-xs" : "text-slate-500"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onSelectSpecies("dog")}
            className={`px-2.5 py-1 rounded-full transition-all ${
              selectedSpecies === "dog" ? "bg-jet text-white shadow-xs" : "text-slate-500"
            }`}
          >
            🐶
          </button>
          <button
            onClick={() => onSelectSpecies("cat")}
            className={`px-2.5 py-1 rounded-full transition-all ${
              selectedSpecies === "cat" ? "bg-jet text-white shadow-xs" : "text-slate-500"
            }`}
          >
            🐱
          </button>
        </div>
      </header>

      {/* Toast */}
      <div className="h-6 flex items-center justify-center">
        {toastMessage && (
          <div className="text-xs font-extrabold px-3 py-1 rounded-full bg-jet text-white shadow-md animate-fade-in">
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
          <div className="bg-white rounded-[32px] p-6 text-center shadow-lg border border-slate-100 space-y-4 my-auto">
            <div className="w-14 h-14 rounded-full bg-custard mx-auto flex items-center justify-center text-2xl">
              🎉
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-jet">Deck Completed!</h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                You saved {savedPets.length} companions to your pack.
              </p>
            </div>
            <button
              type="button"
              onClick={onRestart}
              className="py-2.5 px-4 rounded-full bg-jet text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 mx-auto hover:bg-black transition-all"
            >
              <RotateCcw className="w-4 h-4 text-marigold" />
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
