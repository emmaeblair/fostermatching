"use client";

import { useState, useEffect, useCallback } from "react";
import { Pet } from "@/types/pet";
import { 
  X, 
  Heart, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  Share2, 
  ShieldCheck, 
  Activity, 
  Home, 
  Users, 
  Info,
  Check,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface PetProfileModalProps {
  pet: Pet;
  isApplied: boolean;
  isSaved: boolean;
  onToggleApplied: () => void;
  onToggleSave: () => void;
  onClose: () => void;
}

export function PetProfileModal({
  pet,
  isApplied,
  isSaved,
  onToggleApplied,
  onToggleSave,
  onClose,
}: PetProfileModalProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  const nextPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev + 1) % pet.photos.length);
  }, [pet.photos.length]);

  const prevPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev - 1 + pet.photos.length) % pet.photos.length);
  }, [pet.photos.length]);

  // Keyboard navigation: Escape closes modal, Left/Right arrows cycle photos
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPhoto();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextPhoto();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPhoto, prevPhoto, onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleShare = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 bg-jet/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${pet.name}'s profile`}
    >
      <div 
        className="w-full sm:max-w-2xl bg-white text-jet rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-h-[92vh] sm:max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">
              {pet.species === "dog" ? "🐶" : "🐱"}
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-extrabold tracking-tight text-jet truncate">
                {pet.name}&rsquo;s Full Profile
              </h2>
              <p className="text-xs font-semibold text-slate-500 truncate">
                {pet.shelter.name} • {pet.shelter.city}, {pet.shelter.state}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-jet flex items-center justify-center transition-colors"
            aria-label="Close profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 space-y-6">
          
          {/* Hero Gallery Section */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-84 rounded-[26px] overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={pet.photos[selectedPhotoIndex] || pet.photos[0]}
                alt={`${pet.name} photo`}
                className="w-full h-full object-cover"
              />

              {/* Match Score Badge */}
              {pet.matchScore && (
                <div className="absolute top-3 left-3 bg-marigold text-jet font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>{pet.matchScore}% Lifestyle Match</span>
                </div>
              )}

              {/* Applied Status Overlay Pill */}
              {isApplied && (
                <div className="absolute top-3 right-3 bg-jet text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-marigold" />
                  <span>Application Submitted</span>
                </div>
              )}

              {/* Bottom Photo Count */}
              <div className="absolute bottom-3 right-3 bg-jet/70 text-white font-bold text-xs px-3 py-1 rounded-full backdrop-blur-sm z-10">
                Photo {selectedPhotoIndex + 1} of {pet.photos.length}
              </div>

              {/* Tap Arrows to cycle photos directly */}
              {pet.photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevPhoto();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all z-10"
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
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all z-10"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Row */}
            {pet.photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {pet.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedPhotoIndex === idx
                        ? "border-jet scale-105 shadow-sm"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`${pet.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Pet Header Stats */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
            <div>
              <h1 className="text-2xl font-extrabold text-jet tracking-tight">
                {pet.name}, <span className="text-xl font-bold text-slate-600">{pet.age}</span>
              </h1>
              <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-marigold-dark shrink-0" />
                <span>{pet.breed} • {pet.gender} • {pet.size} ({pet.weightLbs || 25} lbs) • {pet.distanceMiles} mi away</span>
              </p>
            </div>
            <span className="text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-custard text-marigold-dark border border-custard-dark/40 shadow-sm">
              {pet.vibeTag}
            </span>
          </div>

          {/* Primary Action Sequence */}
          <div className="p-4 rounded-[24px] bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              {/* Outbound Link Button */}
              <a
                href={pet.shelter.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-full bg-jet text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-black transition-all shadow-md active:scale-95"
              >
                <span>Apply on Shelter Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Mark as Applied Toggle */}
              <button
                type="button"
                onClick={onToggleApplied}
                className={`py-3 px-4 rounded-full text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isApplied
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                    : "bg-white text-jet border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {isApplied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Applied to Shelter</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-slate-400" />
                    <span>Mark as Applied</span>
                  </>
                )}
              </button>

              {/* Save & Match Toggle */}
              <button
                type="button"
                onClick={onToggleSave}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shrink-0 border ${
                  isSaved
                    ? "bg-custard border-marigold/40 text-marigold-dark shadow-sm"
                    : "bg-white border-slate-200 text-slate-400 hover:text-jet hover:bg-slate-100"
                }`}
                aria-label={isSaved ? "Saved to pack" : "Save to pack"}
                title={isSaved ? "In your pack" : "Add to pack"}
              >
                <Heart className={`w-5 h-5 ${isSaved ? "fill-marigold text-marigold" : ""}`} />
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-jet flex items-center justify-center transition-all shrink-0 hover:bg-slate-100"
                aria-label="Share pet profile"
                title="Copy share link"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {copiedShare && (
              <p className="text-xs font-bold text-center text-emerald-700 animate-fade-in">
                ✓ Link copied to clipboard! Share it with family or roommates.
              </p>
            )}
          </div>

          {/* Shelter-Speak Decoder: Lifestyle Compatibility Matrix */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-jet flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-periwinkle-dark" />
              <span>Lifestyle Compatibility Matrix</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Dogs */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🐕</span>
                  <div>
                    <h4 className="font-bold text-xs text-jet">Other Dogs</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {pet.compatibility.goodWithDogs === true
                        ? "Playful & social with dogs"
                        : pet.compatibility.goodWithDogs === false
                        ? "Best as sole dog in home"
                        : "Unknown / slow introduction needed"}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  pet.compatibility.goodWithDogs === true
                    ? "bg-emerald-100 text-emerald-800"
                    : pet.compatibility.goodWithDogs === false
                    ? "bg-marigold/20 text-marigold-dark border border-marigold/30"
                    : "bg-slate-200 text-slate-700"
                }`}>
                  {pet.compatibility.goodWithDogs === true ? "Friendly" : pet.compatibility.goodWithDogs === false ? "Solo Dog" : "Unknown"}
                </span>
              </div>

              {/* Cats */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🐈</span>
                  <div>
                    <h4 className="font-bold text-xs text-jet">Cats</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {pet.compatibility.goodWithCats === true
                        ? "Safe around respectful cats"
                        : pet.compatibility.goodWithCats === false
                        ? "High prey drive / no cats"
                        : "Untested with felines"}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  pet.compatibility.goodWithCats === true
                    ? "bg-emerald-100 text-emerald-800"
                    : pet.compatibility.goodWithCats === false
                    ? "bg-marigold/20 text-marigold-dark border border-marigold/30"
                    : "bg-slate-200 text-slate-700"
                }`}>
                  {pet.compatibility.goodWithCats === true ? "Cat Safe" : pet.compatibility.goodWithCats === false ? "No Cats" : "Untested"}
                </span>
              </div>

              {/* Kids */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-slate-600" />
                  <div>
                    <h4 className="font-bold text-xs text-jet">Children</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {pet.compatibility.goodWithKids === true
                        ? "Gentle & patient with kids"
                        : "Prefers adult/teen home"}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  pet.compatibility.goodWithKids === true
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-marigold/20 text-marigold-dark border border-marigold/30"
                }`}>
                  {pet.compatibility.goodWithKids === true ? "Kid Friendly" : "Teens+"}
                </span>
              </div>

              {/* Living Space */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-slate-600" />
                  <div>
                    <h4 className="font-bold text-xs text-jet">Living Space</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {pet.compatibility.apartmentFriendly
                        ? "Thrives in apartment or condo"
                        : "Fenced yard strongly recommended"}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  pet.compatibility.apartmentFriendly
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-marigold/20 text-marigold-dark border border-marigold/30"
                }`}>
                  {pet.compatibility.apartmentFriendly ? "Apartment OK" : "Yard Needed"}
                </span>
              </div>
            </div>

            {/* Energy Level Bar */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-marigold-dark" />
                <div>
                  <h4 className="font-bold text-xs text-jet">Energy Level: {pet.compatibility.energyLevel}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {pet.compatibility.energyLevel === "Low"
                      ? "Couch potato: needs 20–30 mins of daily walks"
                      : pet.compatibility.energyLevel === "Mid"
                      ? "Moderate: enjoys daily play sessions & neighborhood walks"
                      : "High stamina: needs 60+ mins of vigorous daily exercise"}
                  </p>
                </div>
              </div>

              <div className="flex gap-1.5 shrink-0">
                <div className={`w-6 h-2 rounded-full ${pet.compatibility.energyLevel ? "bg-marigold" : "bg-slate-200"}`} />
                <div className={`w-6 h-2 rounded-full ${pet.compatibility.energyLevel === "Mid" || pet.compatibility.energyLevel === "High" ? "bg-marigold" : "bg-slate-200"}`} />
                <div className={`w-6 h-2 rounded-full ${pet.compatibility.energyLevel === "High" ? "bg-marigold" : "bg-slate-200"}`} />
              </div>
            </div>
          </div>

          {/* Real Talk from Foster Parent (Custard Block) */}
          {pet.fosterQuote && (
            <div className="p-4 rounded-[24px] bg-custard border border-custard-dark/40 space-y-1.5 shadow-sm">
              <h3 className="font-extrabold text-xs text-marigold-dark uppercase tracking-wider flex items-center gap-1.5">
                <span>💬 Real Talk from Foster Parent</span>
              </h3>
              <p className="text-xs font-semibold text-jet leading-relaxed text-pretty">
                &ldquo;{pet.fosterQuote}&rdquo;
              </p>
            </div>
          )}

          {/* About / Shelter Bio */}
          {pet.bio && (
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">
                About {pet.name}
              </h3>
              <p className="text-xs font-medium text-slate-700 leading-relaxed text-pretty">
                {pet.bio}
              </p>
            </div>
          )}

          {/* Health & Medical Vitals Strip */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-sm text-jet flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Health & Medical Records</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-jet flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Spayed / Neutered
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-jet flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Vaccinations Up to Date
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-jet flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Microchipped
              </span>
              {pet.health?.specialNeeds && (
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-marigold/20 text-marigold-dark border border-marigold/30">
                  {pet.health.specialNeeds}
                </span>
              )}
            </div>
          </div>

          {/* Shelter Transparency Footer Note */}
          <div className="p-3.5 rounded-2xl bg-periwinkle-light/40 border border-periwinkle/30 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-periwinkle-dark shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              AdoptionMatch is an independent discovery platform. Official screening, meet-and-greets, and adoption fees are managed directly by <strong>{pet.shelter.name}</strong> ({pet.shelter.city}, {pet.shelter.state}).
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
