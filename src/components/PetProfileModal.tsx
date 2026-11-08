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
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in selection:bg-sun selection:text-cocoa"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${pet.name}'s profile`}
    >
      <div 
        className="w-full sm:max-w-2xl bg-custard text-cocoa rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-h-[92vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-cocoa/20 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-cocoa/20" />
        </div>

        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-cocoa/10 flex items-center justify-between shrink-0 bg-custard">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl">
              {pet.species === "dog" ? "🐶" : "🐱"}
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-extrabold tracking-tight text-cocoa truncate">
                {pet.name}&rsquo;s Full Profile & Lifestyle Decoder
              </h2>
              <p className="text-xs font-semibold text-cocoa-muted truncate">
                {pet.shelter.name} • {pet.shelter.city}, {pet.shelter.state}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-cocoa/10 hover:bg-cocoa/20 text-cocoa flex items-center justify-center transition-colors font-bold"
            aria-label="Close profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 space-y-6">
          
          {/* Hero Gallery Section */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-84 rounded-[26px] overflow-hidden bg-cocoa shadow-inner">
              <img
                src={pet.photos[selectedPhotoIndex] || pet.photos[0]}
                alt={`${pet.name} photo`}
                className="w-full h-full object-cover"
              />

              {/* Match Score Badge (Sun Yellow) */}
              {pet.matchScore && (
                <div className="absolute top-3 left-3 bg-sun text-cocoa font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/40">
                  <Sparkles className="w-4 h-4 fill-cocoa" />
                  <span>{pet.matchScore}% Lifestyle Match</span>
                </div>
              )}

              {/* Applied Status Overlay Pill */}
              {isApplied && (
                <div className="absolute top-3 right-3 bg-emerald-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/30 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Application Submitted</span>
                </div>
              )}

              {/* Bottom Photo Count */}
              <div className="absolute bottom-3 right-3 bg-cocoa/80 text-white font-bold text-xs px-3 py-1 rounded-full backdrop-blur-sm z-10">
                Photo {selectedPhotoIndex + 1} of {pet.photos.length}
              </div>

              {/* Tap Chevron Arrows */}
              {pet.photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevPhoto();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-all z-10"
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
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-all z-10"
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
                        ? "border-cobalt scale-105 shadow-sm"
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
              <h1 className="text-2xl font-extrabold text-cocoa tracking-tight">
                {pet.name}, <span className="text-xl font-bold text-cocoa-muted">{pet.age}</span>
              </h1>
              <p className="text-xs font-semibold text-cocoa-muted flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-coral shrink-0" />
                <span>{pet.breed} • {pet.gender} • {pet.size} ({pet.weightLbs || 25} lbs) • {pet.distanceMiles} mi away</span>
              </p>
            </div>
            <span className="text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-white text-cocoa border border-cocoa/15 shadow-sm">
              {pet.vibeTag}
            </span>
          </div>

          {/* Primary Action Sequence */}
          <div className="p-4 rounded-[24px] bg-white/70 border border-cocoa/15 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              {/* Outbound Link Button (Auto-Marks as Applied & Saved) */}
              <a
                href={pet.shelter.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (!isApplied) {
                    onToggleApplied();
                  }
                }}
                className="flex-1 py-3.5 px-5 rounded-full bg-cobalt text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-cobalt-dark transition-all shadow-md active:scale-95"
              >
                <span>Apply on Shelter Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Mark as Applied Toggle */}
              <button
                type="button"
                onClick={onToggleApplied}
                className={`py-3.5 px-4 rounded-full text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isApplied
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                    : "bg-white text-cocoa border border-cocoa/20 hover:bg-slate-50"
                }`}
              >
                {isApplied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Applied to Shelter</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-cocoa-muted" />
                    <span>Mark as Applied</span>
                  </>
                )}
              </button>

              {/* Save & Match Toggle */}
              <button
                type="button"
                onClick={onToggleSave}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0 border ${
                  isSaved
                    ? "bg-sun/30 border-sun text-cocoa shadow-sm"
                    : "bg-white border-cocoa/20 text-cocoa-muted hover:text-cocoa hover:bg-slate-50"
                }`}
                aria-label={isSaved ? "Saved to pack" : "Save to pack"}
                title={isSaved ? "In your pack" : "Add to pack"}
              >
                <Heart className={`w-5 h-5 ${isSaved ? "fill-coral text-coral" : ""}`} />
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="w-12 h-12 rounded-full bg-white border border-cocoa/20 text-cocoa hover:text-cobalt flex items-center justify-center transition-all shrink-0 hover:bg-slate-50"
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

          {/* Decoded Lifestyle Compatibility Matrix */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-cocoa flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-coral" />
              <span>Lifestyle Compatibility Decoder</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Dogs */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-cocoa/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🐕</span>
                  <div>
                    <h4 className="font-bold text-xs text-cocoa">Other Dogs</h4>
                    <p className="text-xs text-cocoa-muted font-medium">
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
                    ? "bg-emerald-100 text-emerald-900"
                    : pet.compatibility.goodWithDogs === false
                    ? "bg-sun/30 text-cocoa border border-sun"
                    : "bg-slate-200 text-slate-700"
                }`}>
                  {pet.compatibility.goodWithDogs === true ? "Friendly" : pet.compatibility.goodWithDogs === false ? "Solo Dog" : "Unknown"}
                </span>
              </div>

              {/* Cats */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-cocoa/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🐈</span>
                  <div>
                    <h4 className="font-bold text-xs text-cocoa">Cats</h4>
                    <p className="text-xs text-cocoa-muted font-medium">
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
                    ? "bg-emerald-100 text-emerald-900"
                    : pet.compatibility.goodWithCats === false
                    ? "bg-sun/30 text-cocoa border border-sun"
                    : "bg-slate-200 text-slate-700"
                }`}>
                  {pet.compatibility.goodWithCats === true ? "Cat Safe" : pet.compatibility.goodWithCats === false ? "No Cats" : "Untested"}
                </span>
              </div>

              {/* Kids */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-cocoa/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-cocoa" />
                  <div>
                    <h4 className="font-bold text-xs text-cocoa">Children</h4>
                    <p className="text-xs text-cocoa-muted font-medium">
                      {pet.compatibility.goodWithKids === true
                        ? "Gentle & patient with kids"
                        : "Prefers adult/teen home"}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  pet.compatibility.goodWithKids === true
                    ? "bg-emerald-100 text-emerald-900"
                    : "bg-sun/30 text-cocoa border border-sun"
                }`}>
                  {pet.compatibility.goodWithKids === true ? "Kid Friendly" : "Teens+"}
                </span>
              </div>

              {/* Living Space */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-cocoa/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-cocoa" />
                  <div>
                    <h4 className="font-bold text-xs text-cocoa">Living Space</h4>
                    <p className="text-xs text-cocoa-muted font-medium">
                      {pet.compatibility.apartmentFriendly
                        ? "Thrives in apartment or condo"
                        : "Fenced yard strongly recommended"}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  pet.compatibility.apartmentFriendly
                    ? "bg-emerald-100 text-emerald-900"
                    : "bg-sun/30 text-cocoa border border-sun"
                }`}>
                  {pet.compatibility.apartmentFriendly ? "Apartment OK" : "Yard Needed"}
                </span>
              </div>
            </div>

            {/* Energy Level Bar */}
            <div className="p-4 rounded-2xl bg-white/70 border border-cocoa/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-coral" />
                <div>
                  <h4 className="font-bold text-xs text-cocoa">Energy Level: {pet.compatibility.energyLevel}</h4>
                  <p className="text-xs text-cocoa-muted font-medium">
                    {pet.compatibility.energyLevel === "Low"
                      ? "Couch potato: needs 20–30 mins of daily walks"
                      : pet.compatibility.energyLevel === "Mid"
                      ? "Moderate: enjoys daily play sessions & neighborhood walks"
                      : "High stamina: needs 60+ mins of vigorous daily exercise"}
                  </p>
                </div>
              </div>

              <div className="flex gap-1.5 shrink-0">
                <div className={`w-6 h-2 rounded-full ${pet.compatibility.energyLevel ? "bg-sun" : "bg-cocoa/15"}`} />
                <div className={`w-6 h-2 rounded-full ${pet.compatibility.energyLevel === "Mid" || pet.compatibility.energyLevel === "High" ? "bg-sun" : "bg-cocoa/15"}`} />
                <div className={`w-6 h-2 rounded-full ${pet.compatibility.energyLevel === "High" ? "bg-sun" : "bg-cocoa/15"}`} />
              </div>
            </div>
          </div>

          {/* Real Talk from Foster Parent */}
          {pet.fosterQuote && (
            <div className="p-4 rounded-[24px] bg-sun/20 border border-sun/40 space-y-1.5 shadow-xs text-cocoa">
              <h3 className="font-extrabold text-xs text-coral uppercase tracking-wider flex items-center gap-1.5">
                <span>💬 Real Talk from Foster Parent</span>
              </h3>
              <p className="text-xs font-bold leading-relaxed text-pretty">
                &ldquo;{pet.fosterQuote}&rdquo;
              </p>
            </div>
          )}

          {/* About / Shelter Bio */}
          {pet.bio && (
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-xs text-cocoa-muted uppercase tracking-wider">
                About {pet.name}
              </h3>
              <p className="text-xs font-medium text-cocoa leading-relaxed text-pretty">
                {pet.bio}
              </p>
            </div>
          )}

          {/* Health & Medical Vitals Strip */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-sm text-cocoa flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Health & Medical Records</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white text-cocoa border border-cocoa/15 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Spayed / Neutered
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white text-cocoa border border-cocoa/15 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Vaccinations Up to Date
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white text-cocoa border border-cocoa/15 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Microchipped
              </span>
              {pet.health?.specialNeeds && (
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-sun/25 text-cocoa border border-sun/50">
                  {pet.health.specialNeeds}
                </span>
              )}
            </div>
          </div>

          {/* Shelter Transparency Footer Note */}
          <div className="p-3.5 rounded-2xl bg-white/70 border border-cocoa/15 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-coral shrink-0 mt-0.5" />
            <p className="text-xs text-cocoa-muted leading-relaxed font-medium">
              AdoptionMatch is an independent discovery platform. Official screening, meet-and-greets, and adoption fees are managed directly by <strong>{pet.shelter.name}</strong> ({pet.shelter.city}, {pet.shelter.state}).
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
