"use client";

import { Pet } from "@/types/pet";

interface SessionTrayProps {
  savedPets: Pet[];
  onViewSaved?: () => void;
}

export function SessionTray({ savedPets, onViewSaved }: SessionTrayProps) {
  if (savedPets.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>No saved pets yet</span>
        <span className="text-xs">Swipe right or click Save ♥</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto pt-3 border-t border-slate-200/60 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-jet">
          Saved ({savedPets.length}):
        </span>

        {/* Stacked Avatar Bubbles */}
        <div className="flex -space-x-2 overflow-hidden items-center py-1">
          {savedPets.map((pet) => (
            <img
              key={pet.id}
              src={pet.photos[0]}
              alt={pet.name}
              title={pet.name}
              className="inline-block w-8 h-8 rounded-full ring-2 ring-white object-cover shadow-sm transition-transform hover:scale-110"
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onViewSaved}
        className="text-xs font-extrabold text-jet underline hover:text-marigold-dark transition-colors"
      >
        View Pack →
      </button>
    </div>
  );
}
