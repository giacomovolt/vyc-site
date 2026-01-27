"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

type Locale = "it" | "en";

function toLocale(x: unknown): Locale {
  return x === "en" ? "en" : "it";
}

export default function ContactPage() {
  const params = useParams<{ locale?: string }>();
  const locale = toLocale(params?.locale);

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  const t = {
    it: {
      eyebrow: "Contatti",
      title: "Richiedi disponibilità",
      intro:
        "Raccontaci la tua idea di charter: rispondiamo rapidamente con disponibilità e una proposta costruita su misura, in modo semplice e chiaro.",
      name: "Nome e cognome",
      email: "Email",
      phone: "Telefono (WhatsApp)",
      dates: "Date (anche indicative)",
      guests: "Numero di ospiti",
      message: "Messaggio",
      sending: "Invio in corso...",
      send: "Invia richiesta",
      sent: "Messaggio inviato. Ti risponderemo a breve.",
      privacy:
        "Inviando la richiesta, acconsenti ad essere contattato da VYC in merito a questa richiesta.",
      missingEndpoint:
        "Endpoint del form mancante. Imposta NEXT_PUBLIC_FORMSPREE_ENDPOINT.",
      sendError: "Errore invio. Riprova o contattaci via email/WhatsApp.",
      networkError: "Errore di rete. Riprova.",
      directTitle: "Contatto diretto",
      quick:
        "Preferisci un contatto rapido? Scrivici su WhatsApp: rispondiamo appena possibile.",
    },
    en: {
      eyebrow: "Contact",
      title: "Request availability",
      intro:
        "Tell us your charter idea: we’ll reply quickly with availability and a tailored proposal—clear, simple and personal.",
      name: "Full name",
      email: "Email",
      phone: "Phone (WhatsApp)",
      dates: "Dates (approx.)",
      guests: "Number of guests",
      message: "Message",
      sending: "Sending...",
      send: "Send request",
      sent: "Message sent. We’ll reply shortly.",
      privacy:
        "By sending, you agree to be contacted by VYC regarding this request.",
      missingEndpoint:
        "Form endpoint missing. Please set NEXT_PUBLIC_FORMSPREE_ENDPOINT.",
      sendError: "Send error. Please try again or contact us by email/WhatsApp.",
      networkError: "Network error. Please try again.",
      directTitle: "Direct contact",
      quick:
        "Prefer a quick chat? Message us on WhatsApp—we’ll reply as soon as possible.",
    },
  }[locale];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) {
      alert(t.missingEndpoint);
      return;
    }

    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSent(true);
        form.reset();
      } else {
        alert(t.sendError);
      }
    } catch {
      alert(t.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-14 text-white">
        <div className="text-xs uppercase tracking-widest text-slate-400">
          {t.eyebrow}
        </div>
        <h1 className="mt-2 text-4xl font-semibold">{t.title}</h1>
        <p className="mt-5 max-w-3xl text-slate-300">{t.intro}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="grid gap-4">
              <input
                name="name"
                required
                placeholder={t.name}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
              />
              <input
                name="email"
                type="email"
                required
                placeholder={t.email}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
              />
              <input
                name="phone"
                placeholder={t.phone}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
              />
              <input
                name="dates"
                placeholder={t.dates}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
              />

              <input
                name="guests"
                placeholder={t.guests}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
              />

              <textarea
                name="message"
                placeholder={t.message}
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 hover:bg-slate-100 disabled:opacity-60"
              >
                {loading ? t.sending : t.send}
              </button>

              {sent ? (
                <div className="text-sm text-green-300">{t.sent}</div>
              ) : null}

              <div className="text-xs text-slate-500">{t.privacy}</div>
            </div>
          </form>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-base font-semibold text-white">
              {t.directTitle}
            </div>
            <div className="mt-3 text-sm text-slate-300">
              Email:{" "}
              <a className="hover:text-white" href="mailto:vycdoo@gmail.com">
                vycdoo@gmail.com
              </a>
            </div>

            <div className="mt-6 text-sm text-slate-400">{t.quick}</div>
          </div>
        </div>
      </div>

      {/* ✅ WhatsApp floating button (identico alla Home) */}
      <WhatsAppFloatingButton locale={locale} />
    </>
  );
}
