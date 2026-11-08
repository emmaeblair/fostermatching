"use client";

import { useState, useEffect, useCallback } from "react";
import { Pet } from "@/types/pet";
import { ChevronLeft, ChevronRight, Heart, X, MapPin, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";

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
      {/* Main Elevated Hero Card */}
      <div 
        onClick={onViewProfile}
        className="group relative bg-white rounded-[32px] p-3.5 shadow-xl shadow-indigo-950/5 border border-slate-200/80 flex flex-col gap-3.5 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-slate-300"
      >
        {/* Photo Container */}
        <div className="relative h-80 rounded-[26px] overflow-hidden bg-slate-900 shadow-inner">
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

          {/* Top Badges (Vibe Tag & Applied Tag) */}
          <div className="absolute top-7 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
            <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-white/95 text-jet backdrop-blur-md shadow-md border border-white/40">
              {pet.vibeTag}
            </span>

            {isApplied && (
              <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-emerald-600 text-white shadow-md flex items-center gap-1.5 border border-white/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Applied</span>
              </span>
            )}
          </div>

          {/* Match Score Floating Badge */}
          {pet.matchScore && (
            <div className="absolute bottom-3 left-3.5 bg-marigold text-jet font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/30 z-10">
              <Sparkles className="w-3.5 h-3.5 fill-jet" />
              <span>{pet.matchScore}% Lifestyle Match</span>
            </div>
          )}

          {/* Quick "Tap to open profile" indicator on desktop hover */}
          <div className="absolute bottom-3 right-3.5 bg-black/50 text-white font-extrabold text-xs px-3 py-1.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-10">
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>

          {/* Chevron Navigation Arrows */}
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

        {/* Pet Name, Age & Location Stats */}
        <div className="px-1.5 pt-0.5 flex items-baseline justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-jet text-balance">
              {pet.name}, <span className="text-xl font-bold text-slate-500">{pet.age}</span>
            </h2>
            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-marigold-dark shrink-0" />
              <span>{pet.breed} • {pet.distanceMiles} mi away ({pet.shelter.city})</span>
            </p>
          </div>

          <span className="text-xs font-bold text-slate-400 group-hover:text-jet transition-colors flex items-center gap-0.5">
            Details ↗
          </span>
        </div>

        {/* Custard Color-Block Prompt Container */}
        {pet.prompts.length > 0 && (
          <div className="bg-custard rounded-[22px] p-4 text-jet border border-custard-dark/40 shadow-sm space-y-1">
            <span className="text-xs uppercase tracking-wider font-extrabold text-marigold-dark block">
              {pet.prompts[0].question}
            </span>
            <p className="text-xs font-bold leading-relaxed text-pretty text-jet/90">
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
                  ? "bg-slate-100 text-jet border border-slate-200/60"
                  : "bg-marigold/15 text-marigold-dark border border-marigold/30"
              }`}
            >
              {note.badgeText}
            </span>
          ))}
        </div>
      </div>

      {/* Action Controls: Soft White Pass + Solid Jet-Black Anchor */}
      <div className="flex items-center gap-3 pt-0.5">
        <button
          type="button"
          onClick={onPass}
          className="flex-1 py-3.5 px-4 rounded-full bg-white hover:bg-slate-100 text-xs font-extrabold text-slate-700 border border-slate-200/90 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4 text-slate-400" />
          <span>Not My Fit</span>
        </button>

        <button
          type="button"
          onClick={onSave}
          className="flex-1 py-3.5 px-5 rounded-full bg-jet hover:bg-black text-xs font-extrabold text-white shadow-xl shadow-jet/10 transition-all active:scale-95 flex items-center justify-center gap-2 group"
        >
          <Heart className="w-4 h-4 text-marigold fill-marigold group-hover:scale-115 transition-transform" />
          <span>Save & Match</span>
        </button>
      </div>
    </div>
  );
}
