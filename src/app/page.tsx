"use client";

import { useState } from "react";
import { usePetDeck } from "@/hooks/usePetDeck";
import { DesktopFlow } from "@/components/desktop/DesktopFlow";
import { MobileFlow } from "@/components/mobile/MobileFlow";
import { PetProfileModal } from "@/components/PetProfileModal";
import { DailyPetDrop } from "@/components/DailyPetDrop";

export default function MatchingPage() {
  const deck = usePetDeck();
  const [activeTab, setActiveTab] = useState<"drop" | "deck">("drop");

  return (
    <>
      {activeTab === "drop" ? (
        <DailyPetDrop
          savedPets={deck.savedPets}
          onToggleSave={deck.toggleSavePet}
          isSaved={deck.isSaved}
          isApplied={deck.isApplied}
          onViewProfile={deck.openProfile}
          onEnterDeck={() => setActiveTab("deck")}
          selectedSpecies={deck.selectedSpecies}
          onSelectSpecies={deck.setSelectedSpecies}
        />
      ) : (
        <>
          {/* Desktop Experience (Shows on lg: 1024px+ screens) */}
          <div className="hidden lg:block">
            <DesktopFlow
              activePet={deck.activePet}
              isDeckEmpty={deck.isDeckEmpty}
              savedPets={deck.savedPets}
              selectedSpecies={deck.selectedSpecies}
              onSelectSpecies={deck.setSelectedSpecies}
              lifestyleFilters={deck.lifestyleFilters}
              onToggleLifestyleFilter={deck.toggleLifestyleFilter}
              onResetFilters={deck.resetAllFilters}
              totalCount={deck.totalCount}
              currentIndex={deck.currentIndex}
              onPass={deck.handlePass}
              onSave={deck.handleSave}
              onRestart={deck.handleRestart}
              toastMessage={deck.toastMessage}
              onViewProfile={deck.openProfile}
              isApplied={deck.isApplied}
              onOpenDrop={() => setActiveTab("drop")}
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
              onViewProfile={deck.openProfile}
              isApplied={deck.isApplied}
              onOpenDrop={() => setActiveTab("drop")}
            />
          </div>
        </>
      )}

      {/* Specific Pet Profile / Detail View Modal */}
      {deck.inspectingPet && (
        <PetProfileModal
          pet={deck.inspectingPet}
          isApplied={deck.isApplied(deck.inspectingPet.id)}
          isSaved={deck.isSaved(deck.inspectingPet.id)}
          onToggleApplied={() => deck.toggleApplied(deck.inspectingPet!.id)}
          onToggleSave={() => deck.toggleSavePet(deck.inspectingPet!)}
          onClose={deck.closeProfile}
        />
      )}
    </>
  );
}
