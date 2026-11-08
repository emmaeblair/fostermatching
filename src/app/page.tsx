"use client";

import { useState } from "react";
import { MOCK_PETS } from "@/data/mock-pets";
import { Pet } from "@/types/pet";
import { PetCard } from "@/components/PetCard";
import { SessionTray } from "@/components/SessionTray";
import { Sparkles, RotateCcw } from "lucide-react";

export default function MatchingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedPets, setSavedPets] = useState<Pet[]>([]);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const activePet = MOCK_PETS[currentIndex];
  const isDeckEmpty = currentIndex >= MOCK_PETS.length;

  const showToast = (message: string) => {
    setFeedbackToast(message);
    setTimeout(() => setFeedbackToast(null), 2000);
  };

  const handlePass = () => {
    showToast("Not a perfect match! Hope they find a home 💛");
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSave = () => {
    if (activePet && !savedPets.some((p) => p.id === activePet.id)) {
      setSavedPets((prev) => [...prev, activePet]);
      showToast(`Saved ${activePet.name} to your pack! 🎉`);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
  };

  return (
    <main className="min-h-screen px-4 py-5 flex flex-col justify-between max-w-md mx-auto">
      {/* Top App Header */}
      <header className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-periwinkle flex items-center justify-center text-sm shadow-sm">
            🐾
          </div>
          <h1 className="font-bold text-base tracking-tight text-jet">
            AdoptionMatch
          </h1>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-jet shadow-sm border border-slate-100">
          📍 Seattle • Cats & Dogs
        </span>
      </header>

      {/* Floating Compassionate Feedback Toast */}
      <div className="h-6 flex items-center justify-center">
        {feedbackToast && (
          <div className="text-xs font-extrabold px-3 py-1 rounded-full bg-jet text-white shadow-md animate-fade-in">
            {feedbackToast}
          </div>
        )}
      </div>

      {/* Main Deck Container */}
      <div className="flex-1 flex flex-col justify-center my-auto">
        {!isDeckEmpty ? (
          <PetCard
            pet={activePet}
            onPass={handlePass}
            onSave={handleSave}
            onViewProfile={() => {
              window.open(activePet.shelter.applicationUrl, "_blank");
            }}
          />
        ) : (
          <div className="bg-white rounded-[28px] p-6 text-center shadow-lg border border-slate-100 space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-custard mx-auto flex items-center justify-center text-3xl">
              🎉
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-jet">You&apos;ve seen all pets nearby!</h2>
              <p className="text-xs text-slate-500 font-medium">
                You saved {savedPets.length} companions to your pack. Check back soon as rescues add new available animals.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRestart}
              className="py-3 px-5 rounded-full bg-jet text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 mx-auto hover:bg-black transition-all"
            >
              <RotateCcw className="w-4 h-4 text-marigold" />
              <span>Review Deck Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Session Tray (Saved Bubbles) */}
      <footer className="pt-4">
        <SessionTray
          savedPets={savedPets}
          onViewSaved={() => {
            if (savedPets.length > 0) {
              alert(`Your saved pets: ${savedPets.map((p) => p.name).join(", ")}`);
            }
          }}
        />
      </footer>
    </main>
  );
}
