"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Pet, Species } from "@/types/pet";
import { MOCK_PETS } from "@/data/mock-pets";
import { 
  Sparkles, 
  Heart, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  MapPin, 
  ExternalLink,
  Flame,
  Star,
  FastForward
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

type DropPhase = "waiting" | "falling" | "popped";

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [spotlightPhotoIndex, setSpotlightPhotoIndex] = useState(0);
  
  // Staged drop animation states
  const [petPhases, setPetPhases] = useState<Record<string, DropPhase>>({});
  const [showRestOfScreen, setShowRestOfScreen] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Filter and sort mock pets by matchScore descending to get top surprise matches
  const surprisePets = useMemo(() => {
    return MOCK_PETS
      .filter((pet) => (selectedSpecies === "all" ? true : pet.species === selectedSpecies))
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }, [selectedSpecies]);

  // Ensure selectedIndex is always within bounds
  const activeSpotlightPet = surprisePets[selectedIndex] || surprisePets[0];

  // Reset photo index when switching spotlight pet
  useEffect(() => {
    setSpotlightPhotoIndex(0);
  }, [activeSpotlightPet?.id]);

  // Clean up all scheduled timers
  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  // Choreograph the falling dog & cat objects and their pop reveals
  const runDropSequence = useCallback(() => {
    clearTimers();
    setIsSkipped(false);
    setShowRestOfScreen(false);

    // Initialize all pets in waiting phase
    const initialPhases: Record<string, DropPhase> = {};
    surprisePets.forEach((p) => {
      initialPhases[p.id] = "waiting";
    });
    setPetPhases(initialPhases);

    surprisePets.forEach((pet, index) => {
      // Slower, graceful staggered cadence so the user can enjoy each pet's drop and bounce
      const dropDelay = 220 + index * 460;
      // The pet drops from offscreen, hits the bottom ground, bounces up into spot, then pops open!
      const popDelay = dropDelay + 1180;

      const dropTimer = setTimeout(() => {
        setPetPhases((prev) => ({ ...prev, [pet.id]: "falling" }));
      }, dropDelay);

      const popTimer = setTimeout(() => {
        setPetPhases((prev) => ({ ...prev, [pet.id]: "popped" }));
      }, popDelay);

      timersRef.current.push(dropTimer, popTimer);
    });

    // When the last pet finishes bouncing and pops, reveal the rest of the screen
    const totalDuration = 220 + (surprisePets.length - 1) * 460 + 1180 + 380;
    const finalTimer = setTimeout(() => {
      setShowRestOfScreen(true);
    }, totalDuration);

    timersRef.current.push(finalTimer);
  }, [surprisePets, clearTimers]);

  // Run sequence on initial mount and when dropCycle or surprisePets list changes
  useEffect(() => {
    runDropSequence();
    return () => clearTimers();
  }, [runDropSequence, clearTimers, dropCycle]);

  // Skip animation to instantly see full screen
  const handleSkipAnimation = useCallback(() => {
    clearTimers();
    setIsSkipped(true);
    const poppedAll: Record<string, DropPhase> = {};
    surprisePets.forEach((p) => {
      poppedAll[p.id] = "popped";
    });
    setPetPhases(poppedAll);
    setShowRestOfScreen(true);
  }, [clearTimers, surprisePets]);

  // Re-trigger drop animation
  const handleRerollDrop = useCallback(() => {
    setDropCycle((prev) => prev + 1);
    setSelectedIndex(0);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + surprisePets.length) % surprisePets.length);
  }, [surprisePets.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % surprisePets.length);
  }, [surprisePets.length]);

  // Keyboard navigation for clicking through daily surprise matches
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
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
  }, [handleNext, handlePrev]);

  if (!activeSpotlightPet) {
    return null;
  }

  const isCurrentSaved = isSaved(activeSpotlightPet.id);

  return (
    <div className="min-h-screen bg-biscuit text-cocoa selection:bg-candy selection:text-white px-4 sm:px-8 py-6 max-w-6xl mx-auto flex flex-col gap-6 overflow-x-hidden">
      
      {/* Top Header Marquee */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cocoa/15">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-candy text-white shadow-xs flex items-center gap-1.5 border border-white/40">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>LIVE PET OBJECT DROP</span>
            </span>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-mango text-white shadow-xs flex items-center gap-1.5 border border-white/40">
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>TOP COMPATIBILITY PICKS</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-cocoa">
            Meet Today&rsquo;s Sparks!
          </h1>
          <p className="text-xs sm:text-sm font-bold text-cocoa/80 max-w-xl">
            Watch today&rsquo;s highest-rated companion objects bounce in from off-screen, pop open into their profiles, and unlock your morning deck!
          </p>
        </div>

        {/* Top Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Re-drop Button */}
          <button
            type="button"
            onClick={handleRerollDrop}
            className="px-4 py-2.5 rounded-full bg-mango hover:bg-mango-dark text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition-transform active:scale-95 border border-white/30"
            title="Drop the surprise pet objects again"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Drop Again</span>
          </button>

          {!showRestOfScreen && !isSkipped && (
            <button
              type="button"
              onClick={handleSkipAnimation}
              className="px-3.5 py-2.5 rounded-full bg-white hover:bg-biscuit text-cocoa text-xs font-extrabold shadow-sm flex items-center gap-1.5 border border-cocoa/15"
              title="Skip drop animation"
            >
              <FastForward className="w-3.5 h-3.5 text-candy" />
              <span>Skip Drop</span>
            </button>
          )}

          {/* Go to Core Deck Button */}
          <button
            type="button"
            onClick={onEnterDeck}
            className="px-5 py-2.5 rounded-full bg-candy hover:bg-candy-dark text-white text-xs font-extrabold shadow-lg shadow-candy/25 flex items-center gap-2 transition-transform active:scale-95 border border-white/30"
          >
            <span>Discovery Deck</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Species Filter Tabs & Drop Statistics */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/85 p-2.5 rounded-[22px] border border-cocoa/15 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-extrabold text-cocoa px-2">Drop Filter:</span>
          <button
            type="button"
            onClick={() => onSelectSpecies("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
              selectedSpecies === "all"
                ? "bg-candy text-white shadow-xs"
                : "text-cocoa hover:text-candy"
            }`}
          >
            All Pets ({MOCK_PETS.length})
          </button>
          <button
            type="button"
            onClick={() => onSelectSpecies("dog")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
              selectedSpecies === "dog"
                ? "bg-candy text-white shadow-xs"
                : "text-cocoa hover:text-candy"
            }`}
          >
            🐶 Dogs Only
          </button>
          <button
            type="button"
            onClick={() => onSelectSpecies("cat")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
              selectedSpecies === "cat"
                ? "bg-candy text-white shadow-xs"
                : "text-cocoa hover:text-candy"
            }`}
          >
            🐱 Cats Only
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-extrabold text-cocoa px-2">
          <Flame className="w-4 h-4 text-mango fill-mango" />
          <span>
            {showRestOfScreen 
              ? "All 5 sparks landed & popped! Tap any below to view details." 
              : "Incoming pet objects bouncing from sky to row..."}
          </span>
        </div>
      </div>

      {/* Physical Drop Stage: The Landing Target Row */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-cocoa/75">
            Incoming Drop Zone ({surprisePets.length} top matches):
          </span>
          <span className="text-xs font-bold text-candy">
            {showRestOfScreen ? "Click or use ← → arrow keys" : "Dropping in, hitting bottom & bouncing into spot..."}
          </span>
        </div>

        {/* Dropping Pets Grid / Shelf with plenty of vertical overshoot clearance */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 pt-2 pb-10 relative min-h-[260px]">
          {surprisePets.map((pet, idx) => {
            const phase = petPhases[pet.id] || "waiting";
            const isSelected = idx === selectedIndex && showRestOfScreen;
            const petSaved = isSaved(pet.id);
            const petApplied = isApplied(pet.id);
            const isDog = pet.species === "dog";

            return (
              <div 
                key={`${pet.id}-${dropCycle}`} 
                className="relative flex flex-col items-center justify-end min-h-[220px]"
              >
                
                {/* Landing Target Pad on the row slot */}
                <div className="absolute bottom-2 w-full h-44 rounded-[26px] border-2 border-dashed border-candy/30 bg-white/30 -z-10 flex flex-col items-center justify-center gap-1.5">
                  {phase === "waiting" && (
                    <>
                      <span className="text-xl opacity-35">{isDog ? "🐶" : "🐱"}</span>
                      <span className="text-xs font-extrabold text-cocoa/40 animate-pulse">
                        Target #{idx + 1}
                      </span>
                    </>
                  )}
                </div>

                {/* Ground Impact Base Line under each column */}
                <div className="absolute -bottom-6 w-20 h-2 rounded-full bg-cocoa/15 blur-[0.5px] -z-10 pointer-events-none" />

                {/* PHASE 1 & 2: Falling, hitting bottom floor & bouncing UP to spot (Before Pop) */}
                {phase === "falling" && (
                  <div className="animate-physical-drop w-full flex flex-col items-center select-none py-2 z-20">
                    {/* Dog Object: Mango Gold bouncing capsule with floppy puppy ears */}
                    {isDog ? (
                      <div className="relative flex flex-col items-center">
                        {/* Floppy Dog Ears */}
                        <div className="absolute -top-3.5 -left-2.5 w-5 h-9 bg-amber-800 rounded-full rotate-[-28deg] shadow-md border-2 border-white" />
                        <div className="absolute -top-3.5 -right-2.5 w-5 h-9 bg-amber-800 rounded-full rotate-[28deg] shadow-md border-2 border-white" />

                        {/* Dog Capsule Body */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-amber-300 via-mango to-amber-600 border-4 border-white shadow-2xl flex flex-col items-center justify-center text-center p-1.5">
                          <span className="text-3xl drop-shadow">🐶</span>
                          <span className="text-xs font-extrabold text-white bg-amber-900/90 px-2.5 py-0.5 rounded-full mt-0.5 shadow-xs">
                            Top Dog
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Cat Object: Bubblegum Candy Pink bouncing capsule with pointy kitty ears */
                      <div className="relative flex flex-col items-center">
                        {/* Pointy Kitty Ears */}
                        <div className="absolute -top-3 left-0.5 w-5 h-6 bg-pink-700 rotate-45 rounded-sm shadow-md border-2 border-white" />
                        <div className="absolute -top-3 right-0.5 w-5 h-6 bg-pink-700 rotate-45 rounded-sm shadow-md border-2 border-white" />

                        {/* Cat Capsule Body */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-pink-300 via-candy to-pink-600 border-4 border-white shadow-2xl flex flex-col items-center justify-center text-center p-1.5">
                          <span className="text-3xl drop-shadow">🐱</span>
                          <span className="text-xs font-extrabold text-white bg-pink-950/90 px-2.5 py-0.5 rounded-full mt-0.5 shadow-xs">
                            Top Cat
                          </span>
                        </div>
                      </div>
                    )}
                    <span className="text-xs font-extrabold text-cocoa mt-2.5 bg-white/80 px-2.5 py-0.5 rounded-full shadow-xs border border-cocoa/10">
                      Bouncing {pet.name}...
                    </span>
                  </div>
                )}

                {/* PHASE 3: Popped into Full Pet Profile Card */}
                {phase === "popped" && (
                  <div
                    onClick={() => {
                      if (showRestOfScreen) {
                        setSelectedIndex(idx);
                      }
                    }}
                    className={`animate-pop-bloom w-full cursor-pointer group relative p-3 rounded-[26px] transition-all duration-200 border-2 flex flex-col items-center text-center gap-2 select-none ${
                      isSelected
                        ? "bg-white border-mango shadow-xl ring-4 ring-mango/30 scale-102"
                        : "bg-white/90 border-candy/30 hover:border-candy hover:bg-white hover:scale-101 shadow-md"
                    }`}
                  >
                    {/* Starburst Particles upon popping */}
                    <div className="absolute -top-3 -right-2 pointer-events-none text-mango animate-star-burst">
                      ✦ ✨
                    </div>

                    {/* Match Score Badge (Golden Mango) */}
                    <div className="w-full flex items-center justify-between pointer-events-none">
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-mango text-white shadow-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        <span>{pet.matchScore}%</span>
                      </span>

                      {/* Saved or Applied Indicator Icon */}
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

                    {/* Avatar Photo Bubble */}
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform">
                      <img
                        src={pet.photos[0]}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-mango rounded-full" />
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

                    {/* Active Indicator Arrow */}
                    {isSelected && (
                      <div className="w-2.5 h-2.5 bg-mango rotate-45 -mb-2 shadow-sm" />
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </section>

      {/* PHASE 4: The Rest of the Screen Loads Gracefully After All Pets Pop */}
      {showRestOfScreen ? (
        <div className="animate-reveal-up space-y-6">
          
          {/* Spotlight Showcase of the Selected Daily Pet */}
          <section className="bg-white rounded-[32px] p-5 sm:p-7 shadow-2xl border-2 border-candy/30 text-cocoa space-y-5 animate-spark-pop">
            
            {/* Spotlight Navigation Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-cocoa/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-mango text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
                  ✦
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-cocoa">
                    Today&rsquo;s Spark Spotlight: {activeSpotlightPet.name}
                  </h2>
                  <p className="text-xs font-bold text-cocoa-muted">
                    Match #{selectedIndex + 1} of {surprisePets.length} • {activeSpotlightPet.breed} • {activeSpotlightPet.shelter.city}, {activeSpotlightPet.shelter.state}
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
                  {selectedIndex + 1} / {surprisePets.length}
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

                {/* Why This Companion Matches Today (Highlighted Box) */}
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
      ) : (
        /* While objects are dropping & popping, show friendly animated status bar */
        <div className="py-8 text-center space-y-2 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-cocoa font-extrabold text-xs shadow-md border border-cocoa/15">
            <span className="w-2 h-2 rounded-full bg-mango animate-ping" />
            <span>Dropping surprise pet capsules from sky to row...</span>
          </div>
          <p className="text-xs font-bold text-cocoa-muted">
            The full companion spotlight will pop open as soon as they land!
          </p>
        </div>
      )}

    </div>
  );
}
