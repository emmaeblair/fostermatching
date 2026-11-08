"use client";

import { useState, useEffect, useCallback } from "react";
import { Pet } from "@/types/pet";
import { ChevronLeft, ChevronRight, Heart, X, MapPin, Sparkles } from "lucide-react";

interface PetCardProps {
  pet: Pet;
  onPass: () => void;
  onSave: () => void;
  onViewProfile?: () => void;
}

export function PetCard({ pet, onPass, onSave, onViewProfile }: PetCardProps) {
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
    <div className="w-full max-w-sm mx-auto flex flex-col gap-3 select-none">
      {/* Main Periwinkle Hero Card */}
      <div 
        onClick={onViewProfile}
        className="bg-periwinkle rounded-[28px] p-3 shadow-lg flex flex-col gap-3 cursor-pointer transition-all hover:shadow-xl"
      >
        {/* Photo Carousel Area */}
        <div className="relative h-72 rounded-[22px] overflow-hidden bg-periwinkle-dark flex items-center justify-center">
          {/* Active Photo */}
          <img
            src={pet.photos[photoIndex]}
            alt={`${pet.name} photo ${photoIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Story Progress Bars at Top */}
          <div className="absolute top-2.5 left-3 right-3 flex gap-1.5 z-10">
            {pet.photos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all ${
                  idx === photoIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Match Score Star Badge */}
          {pet.matchScore && (
            <div className="absolute bottom-2.5 left-2.5 bg-marigold text-jet font-extrabold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{pet.matchScore}% Match</span>
            </div>
          )}

          {/* Tap Arrows to cycle photos without gesture clashes */}
          {pet.photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Pet Name, Age & Quick Tag */}
        <div className="flex items-baseline justify-between px-1">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-jet text-balance">
              {pet.name}, <span className="font-semibold text-lg">{pet.age}</span>
            </h2>
            <p className="text-xs font-semibold text-jet/80 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{pet.breed} • {pet.distanceMiles} mi away</span>
            </p>
          </div>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-custard text-marigold-dark shadow-sm">
            {pet.vibeTag}
          </span>
        </div>

        {/* Hinge-style Prompt Container (Custard Color Block) */}
        {pet.prompts.length > 0 && (
          <div className="bg-custard rounded-[20px] p-3.5 text-jet shadow-sm">
            <span className="text-xs uppercase tracking-wider font-extrabold text-marigold-dark block mb-1">
              {pet.prompts[0].question}
            </span>
            <p className="text-xs font-bold leading-relaxed text-pretty">
              &ldquo;{pet.prompts[0].answer}&rdquo;
            </p>
          </div>
        )}

        {/* Decoded Badges */}
        <div className="flex flex-wrap gap-1.5 px-0.5">
          {pet.decodedNotes.map((note, idx) => (
            <span
              key={idx}
              className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
                note.type === "green_flag"
                  ? "bg-white/90 text-jet"
                  : "bg-marigold-light/30 text-jet border border-marigold/30"
              }`}
            >
              {note.badgeText}
            </span>
          ))}
        </div>
      </div>

      {/* Action Controls: White Pass + Jet-Black Anchor Like */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={onPass}
          className="flex-1 py-3 px-4 rounded-full bg-white hover:bg-slate-50 text-xs font-extrabold text-jet shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <X className="w-4 h-4 text-slate-500" />
          <span>Not My Fit</span>
        </button>

        <button
          type="button"
          onClick={onSave}
          className="flex-1 py-3 px-4 rounded-full bg-jet hover:bg-black text-xs font-extrabold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Heart className="w-4 h-4 text-marigold fill-marigold" />
          <span>Save & Match</span>
        </button>
      </div>
    </div>
  );
}
