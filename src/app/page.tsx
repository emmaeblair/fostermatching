"use client";

import { usePetDeck } from "@/hooks/usePetDeck";
import { DesktopFlow } from "@/components/desktop/DesktopFlow";
import { MobileFlow } from "@/components/mobile/MobileFlow";

export default function MatchingPage() {
  const deck = usePetDeck();

  return (
    <>
      {/* Desktop Experience (Shows on lg: 1024px+ screens) */}
      <div className="hidden lg:block">
        <DesktopFlow
          activePet={deck.activePet}
          isDeckEmpty={deck.isDeckEmpty}
          savedPets={deck.savedPets}
          selectedSpecies={deck.selectedSpecies}
          onSelectSpecies={deck.setSelectedSpecies}
          onPass={deck.handlePass}
          onSave={deck.handleSave}
          onRestart={deck.handleRestart}
          toastMessage={deck.toastMessage}
        />
      </div>

      {/* Mobile Experience (Shows on smaller screens) */}
      <div className="block lg:hidden">
        <MobileFlow
          activePet={deck.activePet}
          isDeckEmpty={deck.isDeckEmpty}
          savedPets={deck.savedPets}
          selectedSpecies={deck.selectedSpecies}
          onSelectSpecies={deck.setSelectedSpecies}
          onPass={deck.handlePass}
          onSave={deck.handleSave}
          onRestart={deck.handleRestart}
          toastMessage={deck.toastMessage}
        />
      </div>
    </>
  );
}
