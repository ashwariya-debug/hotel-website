import { Booking, Room, SeasonalShot, Testimonial } from "@/lib/types";

export const rooms: Room[] = [
  {
    id: "deodar-suite",
    name: "Deodar Suite",
    subtitle: "Old pine beams, river hush, sunrise at your balcony.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    price: 6200,
    maxGuests: 3
  },
  {
    id: "valley-verandah",
    name: "Valley Verandah",
    subtitle: "Soft quilts and cloud-shadow afternoons over Pipalkoti.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    price: 5100,
    maxGuests: 2
  },
  {
    id: "snowline-attic",
    name: "Snowline Attic",
    subtitle: "A warm loft for winter tea, books, and mountain silence.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    price: 6800,
    maxGuests: 4
  }
];

export const seasonalShots: SeasonalShot[] = [
  {
    id: "spring",
    season: "Spring",
    caption: "Rhododendron red along the road bends.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "monsoon",
    season: "Monsoon",
    caption: "Misty ridges, slate roofs, and deep green valleys.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "autumn",
    season: "Autumn",
    caption: "Amber evenings with clear Himalayan horizons.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "winter",
    season: "Winter",
    caption: "First snow and woodsmoke over quiet mornings.",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "We came for one night. Stayed for four. Time moved slowly here.",
    guest: "Aditi & Rohan, Delhi"
  },
  {
    id: "t2",
    quote: "The mountain light in the mornings felt like an old photograph.",
    guest: "Maya, Bengaluru"
  },
  {
    id: "t3",
    quote: "Warm food, quiet rooms, and the gentlest people.",
    guest: "The Negi Family"
  }
];

export const blockedDatesByRoom: Record<string, string[]> = {
  "deodar-suite": ["2026-03-08", "2026-03-09", "2026-03-18"],
  "valley-verandah": ["2026-03-10", "2026-03-11", "2026-03-25"],
  "snowline-attic": ["2026-03-12", "2026-03-13", "2026-03-26"]
};

export const seededBookings: Booking[] = [
  {
    id: "b-1001",
    roomId: "deodar-suite",
    guestName: "Seed Guest",
    checkIn: "2026-03-20",
    checkOut: "2026-03-23"
  }
];
