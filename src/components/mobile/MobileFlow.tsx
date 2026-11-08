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
}: MobileFlowProps) {
  return (
    <main className="min-h-screen px-4 py-5 flex flex-col justify-between max-w-sm mx-auto">
      {/* Top Mobile Bar */}
      <header className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-periwinkle flex items-center justify-center text-sm shadow-sm">
            🐾
          </div>
          <h1 className="font-bold text-base tracking-tight text-jet">
            AdoptionMatch
          </h1>
        </div>

        {/* Mini Species Toggle */}
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-full border border-slate-200 text-xs font-bold">
          <button
            onClick={() => onSelectSpecies("all")}
            className={`px-2.5 py-1 rounded-full ${
              selectedSpecies === "all" ? "bg-jet text-white" : "text-slate-500"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onSelectSpecies("dog")}
            className={`px-2.5 py-1 rounded-full ${
              selectedSpecies === "dog" ? "bg-jet text-white" : "text-slate-500"
            }`}
          >
            🐶
          </button>
          <button
            onClick={() => onSelectSpecies("cat")}
            className={`px-2.5 py-1 rounded-full ${
              selectedSpecies === "cat" ? "bg-jet text-white" : "text-slate-500"
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
      <div className="flex-1 flex flex-col justify-center my-auto">
        {!isDeckEmpty && activePet ? (
          <PetCard
            pet={activePet}
            onPass={onPass}
            onSave={onSave}
            onViewProfile={() => window.open(activePet.shelter.applicationUrl, "_blank")}
          />
        ) : (
          <div className="bg-white rounded-[28px] p-6 text-center shadow-lg border border-slate-100 space-y-4 my-auto">
            <div className="w-14 h-14 rounded-full bg-custard mx-auto flex items-center justify-center text-2xl">
              🎉
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-jet">Deck Completed!</h2>
              <p className="text-xs text-slate-500 font-medium">
                You saved {savedPets.length} companions.
              </p>
            </div>
            <button
              type="button"
              onClick={onRestart}
              className="py-2.5 px-4 rounded-full bg-jet text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 mx-auto hover:bg-black transition-all"
            >
              <RotateCcw className="w-4 h-4 text-marigold" />
              <span>Review Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Session Tray */}
      <footer className="pt-3">
        <SessionTray savedPets={savedPets} />
      </footer>
    </main>
  );
}
