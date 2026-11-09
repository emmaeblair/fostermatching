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
              onOutboundApply={deck.recordOutboundApplyClick}
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
          onOutboundApply={deck.recordOutboundApplyClick}
          pendingApplyConfirmationPet={deck.pendingApplyConfirmationPet}
          onConfirmApplied={deck.confirmApplicationSubmitted}
          onDismissAppliedPrompt={deck.dismissApplicationConfirmation}
        />
      )}

      {/* Floating Prompt when returning from shelter site if modal was closed */}
      {deck.pendingApplyConfirmationPet && !deck.inspectingPet && (
        <aside
          role="dialog"
          aria-label="Application status confirmation"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md pointer-events-auto animate-fade-in"
        >
          <div className="bg-white/95 backdrop-blur-md border-2 border-candy/40 shadow-2xl rounded-[24px] p-4 text-cocoa space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">💌</span>
              <div className="flex-1">
                <h4 className="font-extrabold text-xs sm:text-sm text-cocoa">
                  Welcome back! Did you submit an application on the shelter site for {deck.pendingApplyConfirmationPet.name}?
                </h4>
                <p className="text-xs font-semibold text-cocoa-muted mt-0.5">
                  If yes, we&rsquo;ll mark both applied and saved in your pack. If no, you can decide whenever you&rsquo;re ready!
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={deck.dismissApplicationConfirmation}
                className="px-4 py-2 rounded-full bg-white hover:bg-biscuit/40 text-cocoa border border-cocoa/20 text-xs font-extrabold transition-all active:scale-95"
              >
                No, just browsing
              </button>
              <button
                type="button"
                onClick={() => deck.confirmApplicationSubmitted(deck.pendingApplyConfirmationPet!)}
                className="px-4 py-2 rounded-full bg-candy hover:bg-candy-dark text-white text-xs font-extrabold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>Yes, I Applied! 💌</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
