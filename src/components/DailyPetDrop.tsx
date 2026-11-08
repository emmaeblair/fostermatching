"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Pet, Species } from "@/types/pet";
import { MOCK_PETS } from "@/data/mock-pets";
import { DogPawShape } from "@/components/DogPawShape";
import { 
  Heart, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  MapPin, 
  ExternalLink,
  Star,
  Sparkles,
  LayoutGrid
} from "lucide-react";

interface DailyPetDropProps {
  savedPets: Pet[];
  onToggleSave: (pet: Pet) => void;
  isSaved: (petId: string) => boolean;
  isApplied: (petId: string) => boolean;
  onViewProfile: (pet: Pet) => void;
  onEnterDeck: () => void;
  selectedSpecies: Species | "all";
  onSelectSpecies: (species: Species | "all") => void;
}

type DropStage = "marbles_falling" | "marbles_settled" | "organized_row" | "profile_revealed";

// Organic floor scatter layout for marbles
const MARBLE_SCATTER = [
  { left: "12%", bottom: "24px", rot: "-16deg" },
  { left: "30%", bottom: "42px", rot: "14deg" },
  { left: "48%", bottom: "18px", rot: "-8deg" },
  { left: "67%", bottom: "36px", rot: "20deg" },
  { left: "84%", bottom: "22px", rot: "-12deg" },
];

export function DailyPetDrop({
  savedPets,
  onToggleSave,
  isSaved,
  isApplied,
  onViewProfile,
  onEnterDeck,
  selectedSpecies,
  onSelectSpecies,
}: DailyPetDropProps) {
  const [dropCycle, setDropCycle] = useState(0);
  const [stage, setStage] = useState<DropStage>("marbles_falling");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [spotlightPhotoIndex, setSpotlightPhotoIndex] = useState(0);

  // Staggered drop timer tracking
  const [droppedCount, setDroppedCount] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Filter and sort mock pets by matchScore descending to get top surprise matches
  const surprisePets = useMemo(() => {
    return MOCK_PETS
      .filter((pet) => (selectedSpecies === "all" ? true : pet.species === selectedSpecies))
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 5); // Focus on top 5 surprise companions
  }, [selectedSpecies]);

  const activeSpotlightPet = selectedIndex !== null ? surprisePets[selectedIndex] : null;

  // Reset photo index when switching spotlight pet
  useEffect(() => {
    setSpotlightPhotoIndex(0);
  }, [activeSpotlightPet?.id]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  // Choreograph the slow marble drops onto the blank canvas floor
  const startMarbleDrop = useCallback(() => {
    clearTimers();
    setStage("marbles_falling");
    setDroppedCount(0);
    setSelectedIndex(null);

    // Each marble drops slowly one after another
    surprisePets.forEach((_, idx) => {
      const dropTimer = setTimeout(() => {
        setDroppedCount((prev) => Math.max(prev, idx + 1));
      }, 250 + idx * 520);
      timersRef.current.push(dropTimer);
    });

    // Once all 5 have dropped and rolled to a stop on the floor:
    const settledTime = 250 + (surprisePets.length - 1) * 520 + 1350;
    const settledTimer = setTimeout(() => {
      setStage("marbles_settled");
    }, settledTime);
    timersRef.current.push(settledTimer);
  }, [clearTimers, surprisePets]);

  useEffect(() => {
    startMarbleDrop();
    return () => clearTimers();
  }, [startMarbleDrop, clearTimers, dropCycle]);

  // Click handler to organize marbles into a clean horizontal row
  const handleOrganizeIntoRow = useCallback(() => {
    clearTimers();
    setDroppedCount(surprisePets.length);
    setStage("organized_row");
  }, [clearTimers, surprisePets.length]);

  // Click on a pet in the row to reveal their profile
  const handleSelectPet = useCallback((idx: number) => {
    setSelectedIndex(idx);
    setStage("profile_revealed");
  }, []);

  // Re-drop marbles
  const handleReroll = useCallback(() => {
    setDropCycle((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + surprisePets.length) % surprisePets.length);
  }, [selectedIndex, surprisePets.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % surprisePets.length);
  }, [selectedIndex, surprisePets.length]);

  // Arrow keys to navigate once a profile is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage !== "profile_revealed") return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, stage]);

  const isCurrentSaved = activeSpotlightPet ? isSaved(activeSpotlightPet.id) : false;

  return (
    <div className="min-h-screen bg-biscuit text-cocoa selection:bg-candy selection:text-white flex flex-col justify-between p-4 sm:p-8 max-w-6xl mx-auto transition-colors duration-500 relative">
      
      {/* Discreet Header / Controls (Only when organized or revealed) */}
      {(stage === "organized_row" || stage === "profile_revealed") ? (
        <header className="flex items-center justify-between pb-4 border-b border-cocoa/15 animate-reveal-up">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sunset text-white flex items-center justify-center text-sm shadow-xs font-bold">
              🐾
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-cocoa tracking-tight">
                AdoptionMatch
              </h1>
              <span className="text-xs font-extrabold text-candy-dark">
                {stage === "organized_row" 
                  ? "Lineup Organized • Tap any pet to reveal profile" 
                  : `Revealing: ${activeSpotlightPet?.name}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReroll}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-biscuit text-cocoa text-xs font-extrabold shadow-sm border border-cocoa/15 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-mango" />
              <span>Drop Marbles Again</span>
            </button>
            <button
              type="button"
              onClick={onEnterDeck}
              className="px-4 py-1.5 rounded-full bg-candy hover:bg-candy-dark text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span>Full Deck</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>
      ) : (
        /* Blank Canvas Top Whisper Indicator */
        <div className="h-6 flex items-center justify-between px-2 text-xs font-bold text-cocoa/30 select-none">
          <span>AdoptionMatch • Daily Marble Drop</span>
          <button
            type="button"
            onClick={handleOrganizeIntoRow}
            className="text-cocoa/50 hover:text-cocoa underline"
          >
            Skip to Organize
          </button>
        </div>
      )}

      {/* STAGE 1 & 2: Totally Blank Canvas with Marbles Falling to Floor */}
      {(stage === "marbles_falling" || stage === "marbles_settled") && (
        <div className="flex-1 flex flex-col justify-end items-center relative min-h-[500px] pb-12 select-none">
          
          {/* Subtle Ambient Instruction once settled */}
          {stage === "marbles_settled" && (
            <div className="absolute top-1/3 flex flex-col items-center gap-3 animate-reveal-up text-center z-30">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-candy text-white shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-white" />
                <span>ALL 5 MARBLES LANDED ON THE FLOOR</span>
              </span>
              <button
                type="button"
                onClick={handleOrganizeIntoRow}
                className="py-4 px-8 rounded-full bg-mango hover:bg-mango-dark text-white text-sm sm:text-base font-extrabold shadow-2xl flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 border-2 border-white ring-4 ring-mango/25"
              >
                <LayoutGrid className="w-5 h-5" />
                <span>Click to Organize in a Row</span>
              </button>
              <p className="text-xs font-bold text-cocoa/60">
                Or click on any pet marble below to line them up
              </p>
            </div>
          )}

          {/* The Floor Baseline Line */}
          <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-cocoa/10 border-b border-dashed border-cocoa/20" />

          {/* Scattered Falling/Settled Marbles on the Floor */}
          <div className="w-full relative h-40">
            {surprisePets.map((pet, idx) => {
              const hasDropped = idx < droppedCount;
              if (!hasDropped) return null;

              const isDog = pet.species === "dog";
              const scatter = MARBLE_SCATTER[idx] || MARBLE_SCATTER[0];

              return (
                <div
                  key={`${pet.id}-${dropCycle}`}
                  onClick={handleOrganizeIntoRow}
                  style={{
                    left: scatter.left,
                    bottom: scatter.bottom,
                    ["--rest-rot" as string]: scatter.rot,
                  }}
                  className="animate-marble-fall absolute cursor-pointer group flex flex-col items-center z-10 hover:scale-110 transition-transform duration-200"
                  title={`Click to organize: ${pet.name}`}
                >
                  {/* Ground Shadow under the marble */}
                  <div className="w-16 h-2 rounded-full bg-cocoa/20 blur-[1.5px] translate-y-2 pointer-events-none" />

                  {/* Dog: Exact Paw Print Shape; Cat: Rounded Kitty Capsule */}
                  {isDog ? (
                    <div className="relative filter drop-shadow-2xl flex flex-col items-center">
                      <DogPawShape className="w-22 h-22 sm:w-26 sm:h-26 text-mango filter drop-shadow-lg" />
                      <div className="absolute inset-0 flex items-center justify-center pt-5 pointer-events-none">
                        <span className="text-xs font-extrabold text-white bg-cocoa/85 px-2 py-0.5 rounded-full shadow-xs">
                          {pet.name}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-gradient-to-b from-pink-300 via-candy to-pink-600 border-4 border-white shadow-2xl flex flex-col items-center justify-center text-center p-2 relative">
                      {/* Pointy Kitty Ears */}
                      <div className="absolute -top-3 left-1 w-5 h-6 bg-pink-700 rotate-45 rounded-sm shadow-md border-2 border-white" />
                      <div className="absolute -top-3 right-1 w-5 h-6 bg-pink-700 rotate-45 rounded-sm shadow-md border-2 border-white" />
                      <span className="text-3xl drop-shadow">🐱</span>
                      <span className="text-xs font-extrabold text-white bg-pink-950/90 px-2 py-0.5 rounded-full mt-0.5 shadow-xs">
                        {pet.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* STAGE 3 & 4: Organized Horizontal Row (Nothing else shows until you click!) */}
      {(stage === "organized_row" || stage === "profile_revealed") && (
        <section className="space-y-6 my-auto py-4">
          
          {/* Subtle instruction above the row */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa/80">
              Today&rsquo;s Organized Pack (5 Companions):
            </span>
            <span className="text-xs font-extrabold text-candy-dark">
              {stage === "organized_row" 
                ? "👈 Click any companion to reveal their profile!" 
                : "✦ Companion revealed below"}
            </span>
          </div>

          {/* The Clean Centered Horizontal Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {surprisePets.map((pet, idx) => {
              const isSelected = selectedIndex === idx;
              const isDog = pet.species === "dog";
              const petSaved = isSaved(pet.id);
              const petApplied = isApplied(pet.id);

              return (
                <div
                  key={pet.id}
                  onClick={() => handleSelectPet(idx)}
                  className={`cursor-pointer group relative p-3 rounded-[28px] transition-all duration-300 border-2 flex flex-col items-center text-center gap-2 select-none ${
                    isSelected
                      ? "bg-white border-mango shadow-2xl ring-4 ring-mango/35 scale-105"
                      : "bg-white/80 border-candy/30 hover:border-candy hover:bg-white hover:scale-102 shadow-md"
                  }`}
                >
                  {/* Match Score Badge */}
                  <div className="w-full flex items-center justify-between pointer-events-none">
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-mango text-white shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      <span>{pet.matchScore}%</span>
                    </span>

                    {petApplied ? (
                      <span className="w-5 h-5 rounded-full bg-candy text-white flex items-center justify-center text-xs font-extrabold shadow-xs" title="Applied">
                        💌
                      </span>
                    ) : petSaved ? (
                      <span className="w-5 h-5 rounded-full bg-candy text-white flex items-center justify-center text-xs font-extrabold shadow-xs" title="Saved in Pack">
                        ♥
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-cocoa/40 group-hover:text-candy">
                        #{idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Icon or Paw Print */}
                  <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform flex items-center justify-center bg-biscuit/40">
                    {stage === "profile_revealed" ? (
                      /* When revealed, show the high-res photo! */
                      <img
                        src={pet.photos[0]}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    ) : isDog ? (
                      <DogPawShape className="w-14 h-14 text-mango" />
                    ) : (
                      <span className="text-3xl">🐱</span>
                    )}
                  </div>

                  {/* Name & Breed */}
                  <div className="w-full min-w-0">
                    <h3 className="font-extrabold text-sm text-cocoa truncate">
                      {pet.name}
                    </h3>
                    <p className="text-xs font-semibold text-cocoa-muted truncate">
                      {pet.breed}
                    </p>
                  </div>

                  {/* Vibe Tag Pill */}
                  <span className="w-full text-xs font-extrabold py-1 px-1.5 rounded-full bg-biscuit/70 text-cocoa truncate border border-cocoa/10">
                    {pet.vibeTag}
                  </span>

                  {/* Indicator to click */}
                  {isSelected ? (
                    <div className="w-2.5 h-2.5 bg-mango rotate-45 -mb-2 shadow-sm" />
                  ) : stage === "organized_row" ? (
                    <span className="text-xs font-bold text-candy underline">
                      Click to Reveal
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* ONLY REVEALED ONCE A PET IS CLICKED */}
          {stage === "profile_revealed" && activeSpotlightPet && (
            <div className="space-y-6 animate-reveal-up pt-2">
              
              {/* The Full Spotlight Companion Card */}
              <section className="bg-white rounded-[32px] p-5 sm:p-7 shadow-2xl border-2 border-candy/30 text-cocoa space-y-5">
                
                {/* Spotlight Navigation Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-cocoa/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-mango text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
                      ✦
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-cocoa">
                        Spark Profile: {activeSpotlightPet.name}
                      </h2>
                      <p className="text-xs font-bold text-cocoa-muted">
                        Match #{selectedIndex! + 1} of {surprisePets.length} • {activeSpotlightPet.breed} • {activeSpotlightPet.shelter.city}, {activeSpotlightPet.shelter.state}
                      </p>
                    </div>
                  </div>

                  {/* Stepper Navigation Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-9 h-9 rounded-full bg-biscuit/60 hover:bg-candy hover:text-white text-cocoa flex items-center justify-center transition-colors font-bold shadow-xs border border-cocoa/15"
                      aria-label="Previous surprise pet"
                      title="Previous pet (Left Arrow)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-extrabold px-2 text-cocoa">
                      {selectedIndex! + 1} / {surprisePets.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-9 h-9 rounded-full bg-biscuit/60 hover:bg-candy hover:text-white text-cocoa flex items-center justify-center transition-colors font-bold shadow-xs border border-cocoa/15"
                      aria-label="Next surprise pet"
                      title="Next pet (Right Arrow)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 2-Column Spotlight Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Photo Gallery with Carousel */}
                  <div className="md:col-span-5 flex flex-col gap-3">
                    <div className="relative h-72 sm:h-80 rounded-[24px] overflow-hidden bg-cocoa shadow-inner">
                      <img
                        src={activeSpotlightPet.photos[spotlightPhotoIndex] || activeSpotlightPet.photos[0]}
                        alt={`${activeSpotlightPet.name} photo`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
                      />

                      {/* Story indicators */}
                      {activeSpotlightPet.photos.length > 1 && (
                        <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
                          {activeSpotlightPet.photos.map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full ${
                                i === spotlightPhotoIndex ? "bg-white" : "bg-white/40"
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Top Match Pill */}
                      <div className="absolute top-6 left-3.5 bg-mango text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/40 z-10">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span>{activeSpotlightPet.matchScore}% Compatibility</span>
                      </div>

                      {/* Tap Photo Switcher */}
                      {activeSpotlightPet.photos.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSpotlightPhotoIndex((prev) => (prev - 1 + activeSpotlightPet.photos.length) % activeSpotlightPet.photos.length);
                            }}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-all z-10"
                            aria-label="Previous photo"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSpotlightPhotoIndex((prev) => (prev + 1) % activeSpotlightPet.photos.length);
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-all z-10"
                            aria-label="Next photo"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Photo Thumbnails */}
                    {activeSpotlightPet.photos.length > 1 && (
                      <div className="flex gap-2 justify-center">
                        {activeSpotlightPet.photos.map((photo, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setSpotlightPhotoIndex(pIdx)}
                            className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                              spotlightPhotoIndex === pIdx
                                ? "border-mango scale-105 shadow-sm"
                                : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={photo}
                              alt={`${activeSpotlightPet.name} thumbnail ${pIdx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Key Compatibility & Daily Prompt */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    
                    {/* Header info */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-extrabold text-cocoa tracking-tight">
                          {activeSpotlightPet.name}, <span className="text-xl font-bold text-cocoa-muted">{activeSpotlightPet.age}</span>
                        </h3>
                        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-candy/15 text-candy-dark border border-candy/30">
                          {activeSpotlightPet.vibeTag}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-cocoa-muted flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-sunset shrink-0" />
                        <span>{activeSpotlightPet.breed} • {activeSpotlightPet.gender} • {activeSpotlightPet.distanceMiles} mi away ({activeSpotlightPet.shelter.city})</span>
                      </p>
                    </div>

                    {/* Why This Companion Matches (Highlighted Box) */}
                    <div className="p-4 rounded-[22px] bg-mango/15 border border-mango/35 text-cocoa space-y-1.5 shadow-xs">
                      <span className="text-xs uppercase tracking-wider font-extrabold text-sunset block flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-mango fill-mango" />
                        <span>Why They Are Today&rsquo;s Match</span>
                      </span>
                      <p className="text-xs font-bold leading-relaxed text-pretty text-cocoa">
                        &ldquo;{activeSpotlightPet.fosterQuote || activeSpotlightPet.bio}&rdquo;
                      </p>
                    </div>

                    {/* Prompt Block */}
                    {activeSpotlightPet.prompts.length > 0 && (
                      <div className="p-4 rounded-[22px] bg-biscuit/45 border border-cocoa/10 text-cocoa space-y-1 shadow-xs">
                        <span className="text-xs uppercase tracking-wider font-extrabold text-candy-dark block">
                          {activeSpotlightPet.prompts[0].question}
                        </span>
                        <p className="text-xs font-bold leading-relaxed text-pretty text-cocoa/90">
                          &ldquo;{activeSpotlightPet.prompts[0].answer}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Compatibility Green Flags */}
                    <div className="flex flex-wrap gap-2">
                      {activeSpotlightPet.decodedNotes.map((note, nIdx) => (
                        <span
                          key={nIdx}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-xs ${
                            note.type === "green_flag"
                              ? "bg-biscuit/60 text-cocoa border border-cocoa/10"
                              : "bg-lilac/50 text-cocoa border border-lilac"
                          }`}
                        >
                          {note.badgeText}
                        </span>
                      ))}
                    </div>

                    {/* Spotlight Interactive Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      
                      {/* Save / Shortlist to Pack */}
                      <button
                        type="button"
                        onClick={() => onToggleSave(activeSpotlightPet)}
                        className={`flex-1 py-3.5 px-5 rounded-full text-xs font-extrabold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
                          isCurrentSaved
                            ? "bg-mango text-white shadow-mango/30 border border-white/40"
                            : "bg-candy hover:bg-candy-dark text-white shadow-candy/30 border border-white/40"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isCurrentSaved ? "fill-white text-white" : "text-white"}`} />
                        <span>{isCurrentSaved ? "Saved in Today's Pack ♥" : "Save to Today's Pack ♥"}</span>
                      </button>

                      {/* Full Lifestyle Decoder Modal Trigger */}
                      <button
                        type="button"
                        onClick={() => onViewProfile(activeSpotlightPet)}
                        className="py-3.5 px-5 rounded-full bg-white hover:bg-biscuit/50 text-cocoa text-xs font-extrabold border border-cocoa/20 shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        <span>Full Lifestyle Decoder</span>
                        <ExternalLink className="w-3.5 h-3.5 text-sunset" />
                      </button>
                    </div>

                  </div>

                </div>

              </section>

              {/* Bottom Bridge Banner Leading into Full Core Deck */}
              <footer className="bg-gradient-to-r from-candy/20 via-mango/20 to-candy/20 border-2 border-candy/40 rounded-[28px] p-6 text-center space-y-3 shadow-lg text-cocoa">
                <div className="flex justify-center items-center gap-2">
                  <span className="text-xl">🐾</span>
                  <h2 className="text-xl font-extrabold tracking-tight text-cocoa">
                    Ready to explore all available rescue companions?
                  </h2>
                  <span className="text-xl">🐾</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-cocoa/80 max-w-lg mx-auto">
                  The full discovery deck features 20+ dogs and cats, lifestyle filter chips, and shelter-speak translations.
                </p>
                <button
                  type="button"
                  onClick={onEnterDeck}
                  className="inline-flex items-center gap-2 py-3.5 px-7 rounded-full bg-candy hover:bg-candy-dark text-white text-xs sm:text-sm font-extrabold shadow-xl shadow-candy/30 transition-transform active:scale-95 border-2 border-white"
                >
                  <span>Dive into the Full Discovery Deck</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </footer>

            </div>
          )}

        </section>
      )}

    </div>
  );
}
