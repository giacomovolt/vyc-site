"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Locale = "it" | "en";

type LightboxItem = {
  src: string;
  sectionTitle: string;
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
    swipeHint:
      locale === "it" ? "Scorri per cambiare foto" : "Swipe to change photo",
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

  const flat: LightboxItem[] = useMemo(() => {
    const items: LightboxItem[] = [];
    for (const img of exterior)
      items.push({ src: `${base}${img}`, sectionTitle: t.exterior });
    for (const img of interior)
      items.push({ src: `${base}${img}`, sectionTitle: t.interior });
    for (const img of mood)
      items.push({ src: `${base}${img}`, sectionTitle: t.mood });
    items.push({ src: `${base}${layout}`, sectionTitle: t.layout });
    for (const img of toys)
      items.push({ src: `${base}${img}`, sectionTitle: t.toys });
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Animation state
  const [shownIndex, setShownIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const animTimer = useRef<number | null>(null);

  // Controls: keep simple (less repaint)
  const [showControls, setShowControls] = useState(true);

  // Swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchMoved = useRef(false);

  // Preload debounce
  const preloadTimer = useRef<number | null>(null);

  function openAt(src: string) {
    const i = flat.findIndex((x) => x.src === src);
    const nextIdx = i >= 0 ? i : 0;
    setIndex(nextIdx);
    setShownIndex(nextIdx);
    setOpen(true);
    setShowControls(true);
    setIsFading(false);
  }

  function close() {
    setOpen(false);
  }

  function prev() {
    setIndex((i) => (i - 1 + flat.length) % flat.length);
    setShowControls(true);
  }

  function next() {
    setIndex((i) => (i + 1) % flat.length);
    setShowControls(true);
  }

  const currentMeta = flat[index];
  const shown = flat[shownIndex];

  // Smooth transition on index change
  useEffect(() => {
    if (!open) return;
    if (shownIndex === index) return;

    setIsFading(true);

    if (animTimer.current) window.clearTimeout(animTimer.current);
    animTimer.current = window.setTimeout(() => {
      setShownIndex(index);
      requestAnimationFrame(() => setIsFading(false));
    }, 120);

    return () => {
      if (animTimer.current) window.clearTimeout(animTimer.current);
      animTimer.current = null;
    };
  }, [index, open, shownIndex]);

  // ✅ smarter preload (debounced)
  useEffect(() => {
    if (!open || flat.length === 0) return;

    if (preloadTimer.current) window.clearTimeout(preloadTimer.current);
    preloadTimer.current = window.setTimeout(() => {
      const nextIndex = (index + 1) % flat.length;
      const prevIndex = (index - 1 + flat.length) % flat.length;

      const imgNext = new Image();
      imgNext.decoding = "async";
      imgNext.src = flat[nextIndex].src;

      const imgPrev = new Image();
      imgPrev.decoding = "async";
      imgPrev.src = flat[prevIndex].src;
    }, 140);

    return () => {
      if (preloadTimer.current) window.clearTimeout(preloadTimer.current);
      preloadTimer.current = null;
    };
  }, [open, index, flat]);

  // ESC / keyboard arrows
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

  // lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const Thumb = ({ img, alt }: { img: string; alt: string }) => {
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
          decoding="async"
          fetchPriority="low"
        />
      </button>
    );
  };

  // Swipe handlers
  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length !== 1) return;
    touchMoved.current = false;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (touchStartX.current == null || touchStartY.current == null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;

    if (Math.abs(dy) > Math.abs(dx)) return;
    if (Math.abs(dx) > 6) touchMoved.current = true;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null || touchStartY.current == null) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const dx = endX - touchStartX.current;
    const dy = endY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45) {
      if (dx < 0) next();
      else prev();
      return;
    }

    if (!touchMoved.current) setShowControls((s) => !s);
  }

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold text-white">{t.title}</h2>
        <p className="mt-2 text-slate-300">{t.subtitle}</p>

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-white">{t.exterior}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {exterior.map((img) => (
              <Thumb key={img} img={img} alt={`Solal ${img}`} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white">{t.interior}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {interior.map((img) => (
              <Thumb key={img} img={img} alt={`Solal ${img}`} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white">{t.mood}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {mood.map((img) => (
              <Thumb key={img} img={img} alt={`Solal ${img}`} />
            ))}
          </div>
        </div>

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
                decoding="async"
                fetchPriority="low"
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

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" aria-modal="true" role="dialog">
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={close}
            aria-label={t.close}
          />

          <div className="relative z-[81] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
            <div
              className={`flex h-14 items-center justify-between gap-3 px-4 transition-opacity duration-150 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-white">
                  {currentMeta?.sectionTitle}
                </div>
                <div className="text-xs text-slate-300">
                  {index + 1} / {flat.length}
                </div>
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

            <div className="relative bg-black px-2 pb-2">
              <div
                className="flex h-[72vh] w-full items-center justify-center overflow-hidden rounded-xl"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onClick={() => setShowControls((s) => !s)}
              >
                <img
                  src={shown?.src}
                  alt={currentMeta?.sectionTitle ?? "Solal"}
                  className={[
                    "max-h-full max-w-full select-none object-contain",
                    "transition-all duration-250 ease-out will-change-transform will-change-opacity",
                    isFading ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100",
                  ].join(" ")}
                  draggable={false}
                  decoding="async"
                />
              </div>

              <button
                type="button"
                onClick={prev}
                className={`absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white hover:bg-white/10 md:block transition-opacity duration-150 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
                aria-label={t.prev}
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className={`absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white hover:bg-white/10 md:block transition-opacity duration-150 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
                aria-label={t.next}
              >
                →
              </button>

              <div
                className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-slate-200 md:hidden transition-opacity duration-150 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                {t.swipeHint}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
