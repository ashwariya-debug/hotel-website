import { eachDayOfInterval, formatISO, isAfter, isBefore, parseISO } from "date-fns";
import { Booking } from "@/lib/types";

export function getDateRange(start: string, end: string): string[] {
  const startDate = parseISO(start);
  const endDate = parseISO(end);

  return eachDayOfInterval({ start: startDate, end: endDate }).map((day) =>
    formatISO(day, { representation: "date" })
  );
}

export function isDateWindowValid(checkIn: string, checkOut: string) {
  const inDate = parseISO(checkIn);
  const outDate = parseISO(checkOut);
  return isBefore(inDate, outDate) && isAfter(inDate, new Date("2000-01-01"));
}

export function bookingConflicts(
  roomId: string,
  checkIn: string,
  checkOut: string,
  blockedDates: string[],
  bookings: Booking[]
): boolean {
  const desiredDates = getDateRange(checkIn, checkOut);
  const blocked = new Set(blockedDates);

  if (desiredDates.some((d) => blocked.has(d))) {
    return true;
  }

  return bookings
    .filter((booking) => booking.roomId === roomId)
    .some((booking) => {
      const bookedDates = new Set(getDateRange(booking.checkIn, booking.checkOut));
      return desiredDates.some((d) => bookedDates.has(d));
    });
}
