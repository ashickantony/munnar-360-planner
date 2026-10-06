"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";
import type { Experience, Package, Site } from "@/lib/schemas";
import { whatsappLink } from "@/lib/content";
import { answerTripQuestion } from "@/lib/trip-helper";

type Message = {
  id: number;
  role: "assistant" | "visitor";
  text: string;
  packageSlug?: string;
  experienceSlug?: string;
};

const welcomeMessage: Message = {
  id: 0,
  role: "assistant",
  text: "Hi! I’m the Munnar trip helper. Ask about our routes, listed prices, package inclusions, or how many days to plan. Availability and final quotes are confirmed by our team.",
};

export function ContactWidgets({
  site,
  packages,
  experiences,
}: {
  site: Site;
  packages: Package[];
  experiences: Experience[];
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;

    const reply = answerTripQuestion(question, packages, experiences);
    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "visitor", text: question },
      { id: nextId.current++, role: "assistant", ...reply },
    ]);
    setInput("");
  }

  function askSuggestion(question: string) {
    const reply = answerTripQuestion(question, packages, experiences);
    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "visitor", text: question },
      { id: nextId.current++, role: "assistant", ...reply },
    ]);
  }

  const quickQuestions = [
    "Show me Munnar tea trips",
    "Tell me about houseboats",
    "I have 4 days",
  ];

  return (
    <div className="fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 pointer-events-none">
      <div className="section-shell flex items-end justify-end gap-3">
        <section
          id="trip-helper-panel"
          aria-labelledby="trip-helper-title"
          className={`${open ? "flex" : "hidden"} pointer-events-auto fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 max-h-[min(70dvh,36rem)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-moss/15 bg-cream shadow-2xl sm:right-8`}
        >
            <header className="flex items-center justify-between gap-3 bg-deep-forest px-4 py-3 text-cream">
              <div>
                <h2 id="trip-helper-title" className="font-display text-lg uppercase tracking-wide">
                  Trip planning helper
                </h2>
                <p className="font-body text-xs text-mist/75">
                  Free · uses the site’s trip details
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close trip helper"
                className="rounded-full p-2 text-cream hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div
              aria-live="polite"
              className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  ref={
                    message.id === messages[messages.length - 1]?.id
                      ? latestMessageRef
                      : undefined
                  }
                  className={`max-w-[90%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === "visitor"
                      ? "ml-auto bg-moss text-cream"
                      : "bg-mist text-deep-forest"
                  }`}
                >
                  <p>{message.text}</p>
                  {message.packageSlug && (
                    <Link
                      href={`/packages/${message.packageSlug}`}
                      onClick={() => setOpen(false)}
                      className="mt-2 inline-flex min-h-10 items-center font-medium text-moss underline decoration-gold underline-offset-4"
                    >
                      View package details
                    </Link>
                  )}
                  {message.experienceSlug && (
                    <Link
                      href={`/experiences/${message.experienceSlug}`}
                      onClick={() => setOpen(false)}
                      className="mt-1 inline-flex min-h-10 items-center font-medium text-moss underline decoration-gold underline-offset-4"
                    >
                      View experience
                    </Link>
                  )}
                </div>
              ))}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => askSuggestion(question)}
                      className="min-h-10 rounded-full border border-moss/20 px-3 py-1.5 text-left text-xs text-moss hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-xs leading-relaxed text-deep-forest/60">
                This helper uses only listed site content. It doesn’t check live
                availability or send your messages to an AI service.
              </p>
            </div>

            <form onSubmit={submitQuestion} className="flex gap-2 border-t border-moss/10 p-3">
              <label htmlFor="trip-helper-input" className="sr-only">
                Ask about Kerala trips
              </label>
              <input
                ref={inputRef}
                id="trip-helper-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={500}
                placeholder="Ask about trips or prices…"
                className="min-w-0 flex-1 rounded-lg border border-moss/20 bg-white px-3 py-2 text-sm text-deep-forest placeholder:text-deep-forest/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send question"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-deep-forest hover:brightness-105 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
        </section>

        <a
          href={whatsappLink(
            site.whatsapp,
            "Hi Munnar 360°! I have a question about planning a Kerala trip."
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Munnar 360 on WhatsApp"
          className="pointer-events-auto inline-flex min-h-12 items-center gap-2 rounded-full bg-[#16865a] px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#116e49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="hidden min-[360px]:inline">WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close trip planning helper" : "Open trip planning helper"}
          aria-expanded={open}
          aria-controls="trip-helper-panel"
          className="pointer-events-auto inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-deep-forest shadow-lg transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
        >
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
