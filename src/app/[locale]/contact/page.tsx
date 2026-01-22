"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) {
      alert("Form endpoint missing. Please set NEXT_PUBLIC_FORMSPREE_ENDPOINT.");
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
        alert("Send error. Please try again or contact us by email.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 text-white">
      <div className="text-xs uppercase tracking-widest text-slate-400">Contact</div>
      <h1 className="mt-2 text-4xl font-semibold">Request availability</h1>
      <p className="mt-5 max-w-3xl text-slate-300">
        Send your request and we’ll reply quickly with availability and a tailored quote.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <div className="grid gap-4">
            <input
              name="name"
              required
              placeholder="Full name"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
            />
            <input
              name="phone"
              placeholder="Phone (WhatsApp)"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
            />
            <input
              name="dates"
              placeholder="Dates (approx.)"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="guests"
                placeholder="Number of guests"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
              />
              <select
                name="experience"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none focus:border-white/25"
                defaultValue=""
              >
                <option value="" disabled>
                  Experience type
                </option>
                <option value="Relax" className="bg-slate-950">Relax</option>
                <option value="Romantic" className="bg-slate-950">Romantic</option>
                <option value="Family" className="bg-slate-950">Family</option>
                <option value="Fishing" className="bg-slate-950">Fishing</option>
                <option value="Other" className="bg-slate-950">Other</option>
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/25"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 hover:bg-slate-100 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send request"}
            </button>

            {sent ? (
              <div className="text-sm text-green-300">
                Message sent. We’ll reply shortly.
              </div>
            ) : null}

            <div className="text-xs text-slate-500">
              By sending, you agree to be contacted by VYC regarding this request.
            </div>
          </div>
        </form>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-base font-semibold text-white">Direct contact</div>
          <div className="mt-3 text-sm text-slate-300">
            Email: <a className="hover:text-white" href="mailto:vycdoo@gmail.com">vycdoo@gmail.com</a>
          </div>
          <div className="mt-6 text-sm text-slate-400">
            WhatsApp button will be added as soon as you provide the number.
          </div>
        </div>
      </div>
    </div>
  );
}
