import { Pet } from "@/types/pet";

export const MOCK_PETS: Pet[] = [
  {
    id: "pet-1",
    name: "Barnaby",
    species: "dog",
    breed: "Terrier Mix",
    age: "2 yrs",
    gender: "Male",
    size: "Medium",
    weightLbs: 28,
    distanceMiles: 3.2,
    photos: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80"
    ],
    vibeTag: "Couch Hero 🛋️",
    matchScore: 92,
    prompts: [
      {
        question: "The way to win me over...",
        answer: "String cheese cubes & slow chin scratches while you write code."
      },
      {
        question: "My ideal Sunday...",
        answer: "A brisk 20-minute morning sniff walk, followed by snoring on your rug all afternoon."
      }
    ],
    compatibility: {
      goodWithCats: true,
      goodWithDogs: false,
      goodWithKids: true,
      apartmentFriendly: true,
      energyLevel: "Low"
    },
    decodedNotes: [
      { badgeText: "✓ Apartment Friendly", type: "green_flag" },
      { badgeText: "✓ Cat Friendly", type: "green_flag" },
      { badgeText: "⚡ Decoded: Needs to be only dog", type: "good_to_know" }
    ],
    shelter: {
      name: "Seattle Humane Society",
      city: "Bellevue",
      state: "WA",
      applicationUrl: "https://www.seattlehumane.org/adoption"
    }
  },
  {
    id: "pet-2",
    name: "Luna",
    species: "dog",
    breed: "Australian Shepherd Mix",
    age: "1 yr",
    gender: "Female",
    size: "Medium",
    weightLbs: 38,
    distanceMiles: 5.1,
    photos: [
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80"
    ],
    vibeTag: "Trail Explorer 🌲",
    matchScore: 84,
    prompts: [
      {
        question: "I'll brag about you if...",
        answer: "You take me on weekend mountain hikes and throw the tennis ball until your arm gets tired."
      }
    ],
    compatibility: {
      goodWithCats: false,
      goodWithDogs: true,
      goodWithKids: true,
      apartmentFriendly: false,
      energyLevel: "High"
    },
    decodedNotes: [
      { badgeText: "✓ Dog Friendly", type: "green_flag" },
      { badgeText: "✓ High Energy / Hiker", type: "green_flag" },
      { badgeText: "⚡ Decoded: Needs fenced yard", type: "good_to_know" }
    ],
    shelter: {
      name: "Northwest Dog Project",
      city: "Seattle",
      state: "WA",
      applicationUrl: "https://www.northwestdogproject.org"
    }
  },
  {
    id: "pet-3",
    name: "Mochi",
    species: "cat",
    breed: "Domestic Short Hair",
    age: "3 yrs",
    gender: "Female",
    size: "Small",
    weightLbs: 9,
    distanceMiles: 2.8,
    photos: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80"
    ],
    vibeTag: "Sunbeam Champion ☀️",
    matchScore: 89,
    prompts: [
      {
        question: "My superpower is...",
        answer: "Finding the single warmest patch of sunlight on your floor at any time of day."
      }
    ],
    compatibility: {
      goodWithCats: true,
      goodWithDogs: null,
      goodWithKids: true,
      apartmentFriendly: true,
      energyLevel: "Low"
    },
    decodedNotes: [
      { badgeText: "✓ Litterbox Champion", type: "green_flag" },
      { badgeText: "✓ Quiet / Low Noise", type: "green_flag" },
      { badgeText: "⚡ Dogs: Unknown (ask rescue)", type: "good_to_know" }
    ],
    shelter: {
      name: "Seattle Area Feline Rescue",
      city: "Shoreline",
      state: "WA",
      applicationUrl: "https://www.seattleareafelinerescue.org"
    }
  }
];
