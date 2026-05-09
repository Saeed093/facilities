export interface Facility {
  id: string;
  name: string;
  timing: string;
  capacity: number;
  status: "Open" | "Available" | "Class Based" | "Under Maintenance";
  description: string;
  rules: string[];
}

export const facilities: Facility[] = [
  {
    id: "gym",
    name: "Gym",
    timing: "6 AM – 11 PM",
    capacity: 80,
    status: "Open",
    description:
      "Fully equipped modern gymnasium with cardio machines, free weights, and strength training equipment. Professional trainers available during peak hours.",
    rules: [
      "Proper gym attire and sports shoes required.",
      "Wipe equipment after use.",
      "Return weights to the rack.",
      "No food or glass bottles inside the gym.",
    ],
  },
  {
    id: "swimming-pool",
    name: "Swimming Pool",
    timing: "7 AM – 10 PM",
    capacity: 40,
    status: "Open",
    description:
      "Olympic-standard swimming pool with separate lanes for casual and competitive swimmers. Temperature controlled water throughout the year.",
    rules: [
      "Swimming cap is required.",
      "Shower before entering the pool.",
      "Children must be accompanied by guardian.",
      "Booking is required before entry.",
    ],
  },
  {
    id: "tennis-court",
    name: "Tennis Court",
    timing: "6 AM – 10 PM",
    capacity: 4,
    status: "Available",
    description:
      "Professional-grade tennis courts with floodlights for evening play. Equipment rental available at the reception.",
    rules: [
      "Proper tennis shoes required on court.",
      "Maximum 4 players per court.",
      "Booking required in advance.",
      "30-minute warm-up included in booking slot.",
    ],
  },
  {
    id: "badminton-court",
    name: "Badminton Court",
    timing: "8 AM – 10 PM",
    capacity: 8,
    status: "Available",
    description:
      "Indoor badminton courts with wooden flooring and proper lighting. Rackets and shuttlecocks available for rent.",
    rules: [
      "Non-marking shoes required.",
      "Maximum 4 players per court.",
      "Advance booking recommended.",
      "Equipment must be returned after play.",
    ],
  },
  {
    id: "fitness-studio",
    name: "Fitness Studio",
    timing: "7 AM – 9 PM",
    capacity: 25,
    status: "Class Based",
    description:
      "Dedicated studio for group fitness classes including yoga, aerobics, Zumba, and HIIT. Classes run on a fixed schedule.",
    rules: [
      "Arrive 5 minutes before class starts.",
      "Bring your own yoga mat for yoga classes.",
      "No entry after class has started.",
      "Class schedule available at reception.",
    ],
  },
];
