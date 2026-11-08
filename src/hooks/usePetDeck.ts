"use client";

import { useState, useCallback } from "react";
import { MOCK_PETS } from "@/data/mock-pets";
import { Pet, Species } from "@/types/pet";

export interface LifestyleFilterState {
  apartmentOnly: boolean;
  catFriendlyOnly: boolean;
  dogFriendlyOnly: boolean;
}

export function usePetDeck() {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | "all">("all");
  const [lifestyleFilters, setLifestyleFilters] = useState<LifestyleFilterState>({
    apartmentOnly: false,
    catFriendlyOnly: false,
    dogFriendlyOnly: false,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedPets, setSavedPets] = useState<Pet[]>([]);
  const [appliedPetIds, setAppliedPetIds] = useState<string[]>([]);
  const [inspectingPet, setInspectingPet] = useState<Pet | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter available pets based on selected species & lifestyle toggles
  const filteredPets = MOCK_PETS.filter((pet) => {
    if (selectedSpecies !== "all" && pet.species !== selectedSpecies) {
      return false;
    }
    if (lifestyleFilters.apartmentOnly && !pet.compatibility.apartmentFriendly) {
      return false;
    }
    if (lifestyleFilters.catFriendlyOnly && pet.compatibility.goodWithCats !== true) {
      return false;
    }
    if (lifestyleFilters.dogFriendlyOnly && pet.compatibility.goodWithDogs !== true) {
      return false;
    }
    return true;
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

  const toggleSavePet = useCallback((pet: Pet) => {
    setSavedPets((prev) => {
      const exists = prev.some((p) => p.id === pet.id);
      if (exists) {
        showToast(`Removed ${pet.name} from your pack.`);
        return prev.filter((p) => p.id !== pet.id);
      } else {
        showToast(`Saved ${pet.name} to your pack! 🐾`);
        return [...prev, pet];
      }
    });
  }, [showToast]);

  const isSaved = useCallback((petId: string) => {
    return savedPets.some((p) => p.id === petId);
  }, [savedPets]);

  const toggleApplied = useCallback((petId: string) => {
    setAppliedPetIds((prev) => {
      const isAlreadyApplied = prev.includes(petId);
      const targetPet = MOCK_PETS.find((p) => p.id === petId);
      const petName = targetPet ? targetPet.name : "this pet";

      if (isAlreadyApplied) {
        showToast(`Unmarked application for ${petName}`);
        return prev.filter((id) => id !== petId);
      } else {
        showToast(`Marked as applied for ${petName}! Best of luck! 💌`);
        return [...prev, petId];
      }
    });
  }, [showToast]);

  const isApplied = useCallback((petId: string) => {
    return appliedPetIds.includes(petId);
  }, [appliedPetIds]);

  const toggleLifestyleFilter = useCallback((key: keyof LifestyleFilterState) => {
    setLifestyleFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setCurrentIndex(0);
  }, []);

  const resetAllFilters = useCallback(() => {
    setSelectedSpecies("all");
    setLifestyleFilters({
      apartmentOnly: false,
      catFriendlyOnly: false,
      dogFriendlyOnly: false,
    });
    setCurrentIndex(0);
  }, []);

  const openProfile = useCallback((pet: Pet) => {
    setInspectingPet(pet);
  }, []);

  const closeProfile = useCallback(() => {
    setInspectingPet(null);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  return {
    selectedSpecies,
    setSelectedSpecies: (species: Species | "all") => {
      setSelectedSpecies(species);
      setCurrentIndex(0); // Reset index on filter change
    },
    lifestyleFilters,
    toggleLifestyleFilter,
    resetAllFilters,
    activePet,
    isDeckEmpty,
    savedPets,
    appliedPetIds,
    inspectingPet,
    toastMessage,
    totalCount: filteredPets.length,
    currentIndex,
    isSaved,
    isApplied,
    toggleSavePet,
    toggleApplied,
    openProfile,
    closeProfile,
    handlePass,
    handleSave,
    handleRestart,
  };
}
