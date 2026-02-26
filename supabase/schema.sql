create table if not exists bookings (
  id text primary key,
  room_id text not null,
  guest_name text not null,
  check_in date not null,
  check_out date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
