"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SERVICES } from "@/lib/business";

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<Status>("idle");
  // On success the form is replaced by a confirmation message; move focus to it
  // so screen-reader and keyboard users are told the submission worked (the
  // aria-live region also announces it for users who didn't have focus here).
  const successRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields; humans don't.
    if ((data.get("company") as string)?.length) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="rounded-md bg-brand-lime-soft text-brand-forest p-4 font-display text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest/40"
      >
        Thanks — we’ll be in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-display text-brand-forest mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-md border border-brand-olive/40 bg-white px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block font-display text-brand-forest mb-1">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          className="w-full rounded-md border border-brand-olive/40 bg-white px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-display text-brand-forest mb-1">
          Email (optional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-md border border-brand-olive/40 bg-white px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="service" className="block font-display text-brand-forest mb-1">
          Service
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className="w-full rounded-md border border-brand-olive/40 bg-white px-3 py-2"
        >
          <option value="" disabled>
            Choose a service…
          </option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-display text-brand-forest mb-1">
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-md border border-brand-olive/40 bg-white px-3 py-2"
        />
      </div>

      {/* Honeypot. Hidden from real users; bots fill anything labeled "company". */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-brand-forest text-white px-5 py-3 font-display disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send my request"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-red-700">
          Sorry — we couldn’t send your message. Please call 586-909-0027 instead.
        </p>
      )}
    </form>
  );
}
