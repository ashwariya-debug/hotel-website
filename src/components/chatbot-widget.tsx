"use client";

import { MessageCircle, SendHorizonal, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type BotMessage = { sender: "bot" | "user"; text: string };

const faqMap: Record<string, string> = {
  checkin: "Check-in is from 1 PM. Early check-in is possible when rooms are ready.",
  checkout: "Checkout is at 11 AM. Slow mornings can be requested.",
  food: "Yes, home-style Garhwali meals and chai are available.",
  booking: "Use the booking panel above and we confirm instantly on this MVP.",
  location: "Hotel Indra Lok is in Pipalkoti on the Badrinath route, Uttarakhand."
};

function getBotReply(input: string): string {
  const normalized = input.toLowerCase();
  const match = Object.keys(faqMap).find((key) => normalized.includes(key));
  if (match) return faqMap[match];
  if (normalized.includes("hello") || normalized.includes("hi")) {
    return "Namaste ✨ Ask me about booking, check-in, food, or location.";
  }
  return "I can help with booking basics and stay FAQs. Try asking about check-in, food, or booking.";
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<BotMessage[]>([
    { sender: "bot", text: "Namaste. I am your Indra Lok helper. How may I help?" }
  ]);

  const title = useMemo(() => (open ? "Close helper" : "Chat for help"), [open]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;

    const userMessage = { sender: "user" as const, text: query.trim() };
    const botMessage = { sender: "bot" as const, text: getBotReply(query) };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setQuery("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="mb-3 w-[320px] rounded-2xl border border-pine/20 bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-pine/10 px-4 py-3">
            <p className="font-semibold">Indra Lok concierge</p>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
          <div className="h-72 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  message.sender === "user"
                    ? "ml-auto bg-pine text-white"
                    : "bg-mist text-pine"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-pine/10 p-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ask about booking, food..."
              className="flex-1 rounded-xl border border-pine/20 px-3 py-2 text-sm outline-none ring-amberwood focus:ring"
            />
            <button className="rounded-xl bg-amberwood px-3 text-pine" type="submit" aria-label="Send">
              <SendHorizonal size={16} />
            </button>
          </form>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-pine px-4 py-3 text-sm text-white shadow-soft"
        aria-label={title}
      >
        <MessageCircle size={18} /> {title}
      </button>
    </div>
  );
}
