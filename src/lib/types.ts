export type Room = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  price: number;
  maxGuests: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  guest: string;
};

export type SeasonalShot = {
  id: string;
  season: string;
  caption: string;
  image: string;
};

export type Booking = {
  id: string;
  roomId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
};
