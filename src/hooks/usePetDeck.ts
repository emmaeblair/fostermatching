"use client";

import { useState, useEffect, useCallback } from "react";
import { MOCK_PETS } from "@/data/mock-pets";
import { Pet, Species } from "@/types/pet";

export function usePetDeck() {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | "all">("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedPets, setSavedPets] = useState<Pet[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter available pets based on selected species
  const filteredPets = MOCK_PETS.filter((pet) => {
    if (selectedSpecies === "all") return true;
    return pet.species === selectedSpecies;
  });

  const activePet = filteredPets[currentIndex];
  const isDeckEmpty = currentIndex >= filteredPets.length;

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => setToastMessage(null), 2400);
    return () => clearTimeout(timer);
  }, []);

  const handlePass = useCallback(() => {
    showToast("Not a perfect match! Hope they find their human 💛");
    setCurrentIndex((prev) => prev + 1);
  }, [showToast]);

  const handleSave = useCallback(() => {
    if (activePet && !savedPets.some((p) => p.id === activePet.id)) {
      setSavedPets((prev) => [...prev, activePet]);
      showToast(`Added ${activePet.name} to your saved pack! 🎉`);
    }
    setCurrentIndex((prev) => prev + 1);
  }, [activePet, savedPets, showToast]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  // Keyboard shortcuts for Desktop users: ArrowLeft (Pass) and ArrowRight (Match)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePass();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePass, handleSave]);

  return {
    selectedSpecies,
    setSelectedSpecies: (species: Species | "all") => {
      setSelectedSpecies(species);
      setCurrentIndex(0); // Reset index on filter change
    },
    activePet,
    isDeckEmpty,
    savedPets,
    toastMessage,
    handlePass,
    handleSave,
    handleRestart,
  };
}
