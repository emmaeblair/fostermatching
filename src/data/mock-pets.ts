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
    bio: "Barnaby is a gentle, soulful terrier mix who spent several months in rural care before joining his foster home in Seattle. He is house-trained, knows 'sit' and 'paw', and loves quiet routines.",
    fosterQuote: "Barnaby is an absolute dream if you work from home. He curls into a donut by your desk and doesn't make a peep. On walks he will ignore squirrels, but he gets defensive if unknown dogs rush into his face—so he will thrive best as the sole prince of your castle!",
    health: {
      spayedNeutered: true,
      vaccinated: true,
      microchipped: true,
      specialNeeds: "None — fully healthy & active"
    },
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
    bio: "Luna is an energetic, whip-smart Aussie mix with boundless joy and a soft spot for agility games. She loves having a job to do and learns new tricks in minutes.",
    fosterQuote: "Luna will be your best friend if you love running, trail hiking, or agility training! She has great dog manners and plays gently with kids, but her herding instinct means she will try to herd cats, so a feline-free home with a secure yard is ideal.",
    health: {
      spayedNeutered: true,
      vaccinated: true,
      microchipped: true
    },
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
    bio: "Mochi was surrendered when her elderly owner moved into assisted living. She is calm, affectionate, and happiest when napping near her humans.",
    fosterQuote: "Mochi is the easiest roommate on earth. She loves feather wand toys in the evening and purrs loudly the second you scratch her cheek. She gets along beautifully with other gentle cats and respects your furniture.",
    health: {
      spayedNeutered: true,
      vaccinated: true,
      microchipped: true
    },
    shelter: {
      name: "Seattle Area Feline Rescue",
      city: "Shoreline",
      state: "WA",
      applicationUrl: "https://www.seattleareafelinerescue.org"
    }
  },
  {
    id: "pet-4",
    name: "Oliver",
    species: "dog",
    breed: "Golden Retriever Mix",
    age: "4 yrs",
    gender: "Male",
    size: "Large",
    weightLbs: 58,
    distanceMiles: 4.5,
    photos: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80"
    ],
    vibeTag: "Goofy Snuggler 🎾",
    matchScore: 95,
    prompts: [
      {
        question: "Don't hate me if I...",
        answer: "Lean my entire 58-pound body against your shins while you brew your morning coffee."
      }
    ],
    compatibility: {
      goodWithCats: true,
      goodWithDogs: true,
      goodWithKids: true,
      apartmentFriendly: false,
      energyLevel: "Mid"
    },
    decodedNotes: [
      { badgeText: "✓ Great with Kids & Dogs", type: "green_flag" },
      { badgeText: "✓ Leash Trained", type: "green_flag" },
      { badgeText: "⚡ Needs Yard for Zoomies", type: "good_to_know" }
    ],
    bio: "Oliver is the ultimate happy-go-lucky companion. He loves car rides, tennis balls, and resting his chin on your knee.",
    fosterQuote: "Oliver is pure golden sunshine. He greets everyone like a long-lost friend and loves kids. He does get occasional backyard zoomies, so a small yard or nearby park is ideal!",
    health: {
      spayedNeutered: true,
      vaccinated: true,
      microchipped: true
    },
    shelter: {
      name: "Homeward Pet Adoption",
      city: "Woodinville",
      state: "WA",
      applicationUrl: "https://www.homewardpet.org"
    }
  },
  {
    id: "pet-5",
    name: "Cleo",
    species: "cat",
    breed: "Calico Short Hair",
    age: "1 yr",
    gender: "Female",
    size: "Small",
    weightLbs: 7,
    distanceMiles: 1.9,
    photos: [
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"
    ],
    vibeTag: "Curious Explorer 🧶",
    matchScore: 91,
    prompts: [
      {
        question: "I'll know we click when...",
        answer: "You watch bird videos on YouTube with me and don't judge my chirping noises."
      }
    ],
    compatibility: {
      goodWithCats: true,
      goodWithDogs: true,
      goodWithKids: true,
      apartmentFriendly: true,
      energyLevel: "Mid"
    },
    decodedNotes: [
      { badgeText: "✓ Apartment Friendly", type: "green_flag" },
      { badgeText: "✓ Dog Friendly (Calm)", type: "green_flag" },
      { badgeText: "⚡ Chirpy & Talkative", type: "good_to_know" }
    ],
    bio: "Cleo is an inquisitive, spunky young calico who loves wand toys and greeting you at the front door.",
    fosterQuote: "Cleo has the biggest personality in a 7-pound body! She loves sleeping at the foot of your bed and will make soft chirping sounds when she wants her breakfast.",
    health: {
      spayedNeutered: true,
      vaccinated: true,
      microchipped: true
    },
    shelter: {
      name: "Seattle Humane Society",
      city: "Bellevue",
      state: "WA",
      applicationUrl: "https://www.seattlehumane.org/adoption"
    }
  }
];
