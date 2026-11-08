"use client";

import { Pet } from "@/types/pet";

interface SessionTrayProps {
  savedPets: Pet[];
  isApplied?: (petId: string) => boolean;
  onSelectPet?: (pet: Pet) => void;
}

export function SessionTray({ savedPets, isApplied, onSelectPet }: SessionTrayProps) {
  if (savedPets.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto pt-3 border-t border-cocoa/15 flex items-center justify-between text-xs font-bold text-cocoa/80">
        <span>No saved pets yet</span>
        <span>Click Save & Match ♥</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto pt-3 border-t border-cocoa/15 flex items-center justify-between text-cocoa">
      <div className="flex items-center gap-2">
        <span className="text-xs font-extrabold uppercase tracking-wider">
          Saved Pack ({savedPets.length}):
        </span>

        {/* Stacked Avatar Bubbles */}
        <div className="flex -space-x-2 overflow-hidden items-center py-1">
          {savedPets.map((pet) => {
            const hasApplied = isApplied ? isApplied(pet.id) : false;
            return (
              <button
                key={pet.id}
                type="button"
                onClick={() => onSelectPet?.(pet)}
                className="relative group transition-transform hover:scale-110 hover:z-10 focus:outline-none"
                title={`${pet.name}${hasApplied ? " (Applied)" : ""}`}
              >
                <img
                  src={pet.photos[0]}
                  alt={pet.name}
                  className={`inline-block w-8 h-8 rounded-full ring-2 object-cover shadow-sm ${
                    hasApplied ? "ring-candy" : "ring-white"
                  }`}
                />
                {hasApplied && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-candy rounded-full border border-white shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <span className="text-xs font-bold text-cocoa/80">
        Tap avatar to view
      </span>
    </div>
  );
}
