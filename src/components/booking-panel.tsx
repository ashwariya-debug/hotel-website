"use client";

import { FormEvent, useMemo, useState } from "react";
import { format } from "date-fns";
import { blockedDatesByRoom, rooms, seededBookings } from "@/data/mock-data";
import { bookingConflicts, getDateRange, isDateWindowValid } from "@/lib/booking";
import { persistBooking } from "@/lib/supabase";
import { Booking } from "@/lib/types";

const storageKey = "indra-lok-bookings";

function readStoredBookings(): Booking[] {
  if (typeof window === "undefined") return seededBookings;
  const existing = window.localStorage.getItem(storageKey);
  if (!existing) return seededBookings;

  try {
    return JSON.parse(existing) as Booking[];
  } catch {
    return seededBookings;
  }
}

export function BookingPanel() {
  const [guestName, setGuestName] = useState("");
  const [roomId, setRoomId] = useState(rooms[0].id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookings, setBookings] = useState<Booking[]>(readStoredBookings());
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const occupiedDates = useMemo(() => {
    const fromBlocked = blockedDatesByRoom[roomId] ?? [];
    const fromBookings = bookings
      .filter((booking) => booking.roomId === roomId)
      .flatMap((booking) => getDateRange(booking.checkIn, booking.checkOut));

    return Array.from(new Set([...fromBlocked, ...fromBookings])).sort();
  }, [roomId, bookings]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!guestName || !checkIn || !checkOut) {
      setMessage("Please fill every field before booking.");
      return;
    }

    if (!isDateWindowValid(checkIn, checkOut)) {
      setMessage("Checkout should be after check-in.");
      return;
    }

    if (bookingConflicts(roomId, checkIn, checkOut, blockedDatesByRoom[roomId] ?? [], bookings)) {
      setMessage("Those dates are occupied. Please choose another window.");
      return;
    }

    const booking: Booking = {
      id: crypto.randomUUID(),
      roomId,
      guestName,
      checkIn,
      checkOut
    };

    setLoading(true);
    try {
      await persistBooking(booking);
      const nextBookings = [...bookings, booking];
      setBookings(nextBookings);
      window.localStorage.setItem(storageKey, JSON.stringify(nextBookings));
      setMessage(
        `Booked ✨ ${rooms.find((room) => room.id === roomId)?.name} for ${guestName} from ${format(
          new Date(checkIn),
          "dd MMM"
        )} to ${format(new Date(checkOut), "dd MMM")}.`
      );
      setGuestName("");
      setCheckIn("");
      setCheckOut("");
    } catch {
      setMessage("Booking saved locally, but Supabase sync failed. Check your environment variables.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="texture rounded-3xl border border-amberwood/30 bg-white/70 p-6 shadow-soft md:p-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-semibold">Reserve your mountain stay</h2>
          <p className="mt-1 text-sm text-stone">Quietly simple. Instantly confirmed.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-stone">
          Name
          <input
            required
            className="mt-1 w-full rounded-xl border border-amberwood/30 bg-white px-3 py-2 text-pine outline-none ring-amberwood focus:ring"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Guest name"
          />
        </label>

        <label className="text-sm text-stone">
          Room
          <select
            className="mt-1 w-full rounded-xl border border-amberwood/30 bg-white px-3 py-2 text-pine outline-none ring-amberwood focus:ring"
            value={roomId}
            onChange={(event) => setRoomId(event.target.value)}
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} · ₹{room.price}/night
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-stone">
          Check-in
          <input
            required
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            className="mt-1 w-full rounded-xl border border-amberwood/30 bg-white px-3 py-2 text-pine outline-none ring-amberwood focus:ring"
          />
        </label>

        <label className="text-sm text-stone">
          Check-out
          <input
            required
            type="date"
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="mt-1 w-full rounded-xl border border-amberwood/30 bg-white px-3 py-2 text-pine outline-none ring-amberwood focus:ring"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-pine px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-pine/90 disabled:opacity-60"
        >
          {loading ? "Booking..." : "Confirm booking"}
        </button>

        <div className="rounded-xl border border-pine/10 bg-mist px-4 py-3 text-sm text-stone">
          <p className="font-semibold text-pine">Occupied / blocked dates</p>
          <p className="mt-1 text-xs">
            {occupiedDates.length ? occupiedDates.join(", ") : "No blocked dates right now"}
          </p>
        </div>
      </form>

      {message ? <p className="mt-4 text-sm text-pine">{message}</p> : null}
    </section>
  );
}
