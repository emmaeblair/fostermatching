"use client";

import { useState, useEffect, useCallback } from "react";
import { Pet } from "@/types/pet";
import { ChevronLeft, ChevronRight, Heart, X, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

interface PetCardProps {
  pet: Pet;
  isApplied?: boolean;
  onPass: () => void;
  onSave: () => void;
  onViewProfile?: () => void;
}

export function PetCard({ pet, isApplied, onPass, onSave, onViewProfile }: PetCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);

  // Reset to first photo whenever a new pet card loads
  useEffect(() => {
    setPhotoIndex(0);
  }, [pet.id]);

  const nextPhoto = useCallback(() => {
    setPhotoIndex((prev) => (prev + 1) % pet.photos.length);
  }, [pet.photos.length]);

  const prevPhoto = useCallback(() => {
    setPhotoIndex((prev) => (prev - 1 + pet.photos.length) % pet.photos.length);
  }, [pet.photos.length]);

  // Arrow keys cycle through photos on desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPhoto();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPhoto, prevPhoto]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-3.5 select-none animate-fade-in">
      {/* Main Hero Card (Clean White Surface with Biscuit Warmth) */}
      <div 
        onClick={onViewProfile}
        className="group relative bg-white rounded-[32px] p-4 shadow-xl border border-cocoa/15 text-cocoa flex flex-col gap-3.5 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:border-sunset/40"
      >
        {/* Photo Container */}
        <div className="relative h-80 rounded-[24px] overflow-hidden bg-cocoa shadow-inner">
          <img
            src={pet.photos[photoIndex]}
            alt={`${pet.name} photo ${photoIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />

          {/* Top Story Progress Bars */}
          <div className="absolute top-3 left-3.5 right-3.5 flex gap-1.5 z-10">
            {pet.photos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-all duration-200 ${
                  idx === photoIndex ? "bg-white shadow-sm" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Top Floating Applied Badge */}
          {isApplied && (
            <div className="absolute top-7 right-3.5 z-10 pointer-events-none">
              <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-candy text-white shadow-md flex items-center gap-1.5 border border-white/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Applied</span>
              </span>
            </div>
          )}

          {/* Match Score Floating Badge (Golden Mango) */}
          {pet.matchScore && (
            <div className="absolute bottom-3 left-3.5 bg-mango text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/40 z-10">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>{pet.matchScore}% Match</span>
            </div>
          )}

          {/* Tap Chevron Arrows */}
          {pet.photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Pet Name - Breed, Age & Location Stats */}
        <div className="px-1 pt-0.5 space-y-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-cocoa leading-snug">
              {pet.name} <span className="text-lg sm:text-xl font-bold text-cocoa/75">— {pet.breed}</span>
            </h2>
            <span className="text-sm font-extrabold text-cocoa-muted shrink-0">
              {pet.age}
            </span>
          </div>

          <p className="text-sm font-bold text-cocoa-muted flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-sunset shrink-0" />
            <span>{pet.distanceMiles} mi away ({pet.shelter.city}, {pet.shelter.state})</span>
          </p>
        </div>

        {/* Nested Prompt Block (Buttercup Accent Surface) */}
        {pet.prompts.length > 0 && (
          <div className="bg-mango/25 rounded-[22px] p-4 text-cocoa border border-mango/40 shadow-xs space-y-1">
            <span className="text-xs uppercase tracking-wider font-extrabold text-sunset-dark block">
              {pet.prompts[0].question}
            </span>
            <p className="text-xs font-bold leading-relaxed text-pretty text-cocoa/90">
              &ldquo;{pet.prompts[0].answer}&rdquo;
            </p>
          </div>
        )}

        {/* Decoded Badges */}
        <div className="flex flex-wrap gap-1.5 px-0.5">
          {pet.decodedNotes.map((note, idx) => (
            <span
              key={idx}
              className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-xs ${
                note.type === "green_flag"
                  ? "bg-slate-100 text-cocoa border border-slate-200"
                  : "bg-lilac text-cocoa border border-periwinkle/30"
              }`}
            >
              {note.badgeText}
            </span>
          ))}
        </div>
      </div>

      {/* Action Controls: Clean White Pass + Tangerine Spark CTA */}
      <div className="flex items-center gap-3 pt-0.5">
        <button
          type="button"
          onClick={onPass}
          className="flex-1 py-3.5 px-4 rounded-full bg-white hover:bg-slate-50 text-xs font-extrabold text-cocoa border border-cocoa/20 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4 text-cocoa-muted" />
          <span>Not My Fit</span>
        </button>

        <button
          type="button"
          onClick={onSave}
          className="flex-1 py-3.5 px-5 rounded-full bg-candy hover:bg-candy-dark text-xs font-extrabold text-white shadow-xl shadow-candy/25 transition-all active:scale-95 flex items-center justify-center gap-2 group"
        >
          <Heart className="w-4 h-4 text-white fill-white group-hover:scale-115 transition-transform" />
          <span>Save & Match</span>
        </button>
      </div>
    </div>
  );
}
