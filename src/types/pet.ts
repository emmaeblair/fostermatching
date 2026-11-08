export type Species = 'dog' | 'cat';
export type EnergyLevel = 'Low' | 'Mid' | 'High';

export interface PetPrompt {
  question: string;
  answer: string;
}

export interface CompatibilityTraits {
  goodWithCats: boolean | null;
  goodWithDogs: boolean | null;
  goodWithKids: boolean | null;
  apartmentFriendly: boolean | null;
  energyLevel: EnergyLevel;
}

export interface DecodedNote {
  badgeText: string;
  type: 'green_flag' | 'good_to_know';
}

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  size: 'Small' | 'Medium' | 'Large';
  weightLbs?: number;
  distanceMiles: number;
  photos: string[];
  vibeTag: string;
  prompts: PetPrompt[];
  compatibility: CompatibilityTraits;
  decodedNotes: DecodedNote[];
  shelter: {
    name: string;
    city: string;
    state: string;
    applicationUrl: string;
  };
  matchScore?: number;
}
