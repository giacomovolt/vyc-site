"use client";

import React, { useEffect, useMemo, useState } from "react";

type Locale = "it" | "en";

type LightboxItem = {
  src: string;
  label: string;
};

export default function Gallery({ locale }: { locale: Locale }) {
  const base = "/images/gallery/";

  const t = {
    title: "Gallery",
    subtitle:
      locale === "it"
        ? "Scopri Solal: esterni, interni e atmosfera a bordo."
        : "Discover Solal: exteriors, interiors and onboard vibes.",
    exterior: locale === "it" ? "Esterni" : "Exterior",
    interior: locale === "it" ? "Interni" : "Interior",
    mood: locale === "it" ? "Atmosfera" : "Lifestyle",
    layout: "Layout",
    toys: "Toys",
    brochure: locale === "it" ? "Brochure (PDF)" : "Brochure (PDF)",
    close: locale === "it" ? "Chiudi" : "Close",
    prev: locale === "it" ? "Precedente" : "Previous",
    next: locale === "it" ? "Successiva" : "Next",
  };

  const exterior = [
    "exterior1.jpg",
    "exterior2.JPEG",
    "exterior3.jpg",
    "exterior4.JPG",
    "exterior5.JPG",
    "exterior6.JPG",
    "exterior7.JPG",
    "exterior8.JPEG",
    "exterior9.JPG",
    "exterior10.JPG",
    "exterior11.JPEG",
  ];

  const interior = [
    "interior1.JPEG",
    "interior2.JPEG",
    "interior3.JPEG",
    "interior4.JPEG",
    "interior5.jpg",
    "interior6.jpg",
    "interior7.jpg",
    "interior8.JPG",
    "interior9.JPG",
    "interior10.JPG",
    "interior11.JPG",
    "interior12.JPG",
  ];

  const mood = [
    "mood1.jpg",
    "mood2.jpg",
    "mood3.JPEG",
    "mood4.jpg",
    "mood5.jpg",
    "mood6.JPEG",
    "mood7.JPEG",
  ];

  const layout = "Layout-San-Lorenzo-82.jpg";
  const toys = ["toy1.JPG", "toy2.JPG"];
  const brochurePdf = "solal-brochure.pdf";

  // Costruiamo una lista piatta per la navigazione del lightbox
  const flat: LightboxItem[] = useMemo(() => {
    const items: LightboxItem[] = [];

    for (const img of exterior) {
      items.push({ src: `${base}${img}`, label: `${t.exterior} • ${img}` });
    }
    for (const img of interior) {
      items.push({ src: `${base}${img}`, label: `${t.interior} • ${img}` });
    }
    for (const img of mood) {
      items.push({ src: `${base}${img}`, label: `${t.mood} • ${img}` });
    }
    // layout e toys dentro la stessa navigazione
    items.push({ src: `${base}${layout}`, label: `${t.layout} • ${layout}` });
    for (const img of toys) {
      items.push({ src: `${base}${img}`, label: `${t.toys} • ${img}` });
    }

    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function openAt(src: string) {
    const i = flat.findIndex((x) => x.src === src);
    setIndex(i >= 0 ? i : 0);
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  function prev() {
    setIndex((i) => (i - 1 + flat.length) % flat.length);
  }

  function next() {
    setIndex((i) => (i + 1) % flat.length);
  }

  // ESC / frecce
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, flat.length]);

  // blocca scroll sotto al lightbox
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Thumbnail helper (evita ripetizioni)
  const Thumb = ({
    img,
    alt,
  }: {
    img: string;
    alt: string;
  }) => {
    const src = `${base}${img}`;
    return (
      <button
        type="button"
        onClick={() => openAt(src)}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
        aria-label={`Open ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </button>
    );
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold text-white">{t.title}</h2>
        <p className="mt-2 text-slate-300">{t.subtitle}</p>

        {/* EXTERIOR */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-white">{t.exterior}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {exterior.map((img) => (
              <Thumb key={img} img={img} alt={`Solal ${img}`} />
            ))}
          </div>
        </div>

        {/* INTERIOR */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white">{t.interior}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {interior.map((img) => (
              <Thumb key={img} img={img} alt={`Solal ${img}`} />
            ))}
          </div>
        </div>

        {/* MOOD */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white">{t.mood}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {mood.map((img) => (
              <Thumb key={img} img={img} alt={`Solal ${img}`} />
            ))}
          </div>
        </div>

        {/* LAYOUT + TOYS */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">{t.layout}</h3>

            <button
              type="button"
              onClick={() => openAt(`${base}${layout}`)}
              className="mt-4 block w-full overflow-hidden rounded-xl"
              aria-label="Open layout"
            >
              <img
                src={`${base}${layout}`}
                alt="Solal layout"
                className="w-full object-cover"
                loading="lazy"
              />
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">{t.toys}</h3>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {toys.map((img) => (
                <Thumb key={img} img={img} alt={`Solal ${img}`} />
              ))}
            </div>

            <a
              href={`${base}${encodeURIComponent(brochurePdf)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              {t.brochure}
            </a>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          {/* overlay click fuori */}
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={close}
            aria-label={t.close}
          />

          <div className="relative z-[81] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
            {/* top bar */}
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="truncate text-sm text-slate-200">
                {flat[index]?.label}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                  aria-label={t.prev}
                  title={t.prev}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                  aria-label={t.next}
                  title={t.next}
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                  aria-label={t.close}
                  title={t.close}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* image */}
            <div className="relative w-full bg-black">
              <img
                src={flat[index]?.src}
                alt={flat[index]?.label ?? "Solal"}
                className="max-h-[80vh] w-full object-contain"
              />

              {/* big side arrows (desktop) */}
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white hover:bg-white/10 md:block"
                aria-label={t.prev}
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white hover:bg-white/10 md:block"
                aria-label={t.next}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
