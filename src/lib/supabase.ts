import { createClient } from "@supabase/supabase-js";
import { Booking } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function persistBooking(booking: Booking): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase.from("bookings").insert({
    id: booking.id,
    room_id: booking.roomId,
    guest_name: booking.guestName,
    check_in: booking.checkIn,
    check_out: booking.checkOut
  });

  if (error) throw new Error(error.message);
}
