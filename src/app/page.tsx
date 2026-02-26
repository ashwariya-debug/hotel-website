import Image from "next/image";
import { BookingPanel } from "@/components/booking-panel";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { rooms, seasonalShots, testimonials } from "@/data/mock-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-mist pb-20">
      <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1464822759844-d150baec0494?auto=format&fit=crop&w=2000&q=80"
          alt="Pipalkoti mountains at dawn"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine/80 via-pine/30 to-transparent" />

        <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-6 pb-14 text-white md:px-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amberwood">Hotel Indra Lok · Pipalkoti</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">
            A quiet old mountain stay,
            <br />
            where mornings feel remembered.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/90 md:text-lg">
            Warm rooms. River wind. Cedar evenings.
          </p>
          <a
            href="#booking"
            className="mt-8 w-fit rounded-full border border-white/40 bg-white/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm transition hover:bg-white/20"
          >
            Book your stay
          </a>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-6 md:px-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-4xl font-semibold">Rooms</h2>
          <p className="text-sm text-stone">Few keys. Thoughtful corners.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {rooms.map((room) => (
            <article key={room.id} className="overflow-hidden rounded-2xl border border-pine/10 bg-white shadow-soft">
              <div className="relative h-56">
                <Image src={room.image} alt={room.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-semibold">{room.name}</h3>
                <p className="mt-2 text-sm text-stone">{room.subtitle}</p>
                <p className="mt-3 text-sm font-medium text-pine">From ₹{room.price} / night</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-6 md:px-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-4xl font-semibold">Pipalkoti through the seasons</h2>
          <p className="text-sm text-stone">Light changes. Calm remains.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {seasonalShots.map((shot) => (
            <figure key={shot.id} className="group relative h-64 overflow-hidden rounded-2xl">
              <Image
                src={shot.image}
                alt={`${shot.season} in Pipalkoti`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                <p className="text-lg font-semibold">{shot.season}</p>
                <p className="text-xs text-white/80">{shot.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-6 md:px-10">
        <div className="rounded-3xl bg-pine px-6 py-10 text-white md:px-10">
          <h2 className="text-4xl font-semibold">What guests remember</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className="rounded-2xl border border-white/20 bg-white/5 p-5 text-sm">
                <p>“{testimonial.quote}”</p>
                <footer className="mt-4 text-xs uppercase tracking-widest text-white/70">{testimonial.guest}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-6 md:px-10">
        <BookingPanel />
      </section>

      <ChatbotWidget />
    </main>
  );
}
