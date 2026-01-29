"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Locale = "it" | "en";

type FlatItem = {
  src: string;
  sectionTitle: string;
};

export default function YachtMiniGallery({ locale }: { locale: Locale }) {
  const baseGallery = "/images/gallery/";
  const coverSrc = "/images/copertina.JPG";

  // ✅ ordine: cover (prima) + selezione foto
  const flat: FlatItem[] = useMemo(
    () => [
      { src: coverSrc, sectionTitle: locale === "it" ? "Copertina" : "Cover" },

      { src: `${baseGallery}exterior3.jpg`, sectionTitle: locale === "it" ? "Esterni" : "Exterior" },
      { src: `${baseGallery}exterior4.JPG`, sectionTitle: locale === "it" ? "Esterni" : "Exterior" },
      { src: `${baseGallery}exterior9.JPG`, sectionTitle: locale === "it" ? "Esterni" : "Exterior" },
      { src: `${baseGallery}exterior10.JPG`, sectionTitle: locale === "it" ? "Esterni" : "Exterior" },

      { src: `${baseGallery}interior5.jpg`, sectionTitle: locale === "it" ? "Interni" : "Interior" },
      { src: `${baseGallery}interior6.jpg`, sectionTitle: locale === "it" ? "Interni" : "Interior" },
      { src: `${baseGallery}interior7.jpg`, sectionTitle: locale === "it" ? "Interni" : "Interior" },
      { src: `${baseGallery}interior8.JPG`, sectionTitle: locale === "it" ? "Interni" : "Interior" },
      { src: `${baseGallery}interior9.JPG`, sectionTitle: locale === "it" ? "Interni" : "Interior" },
      { src: `${baseGallery}interior10.JPG`, sectionTitle: locale === "it" ? "Interni" : "Interior" },

      { src: `${baseGallery}Layout-San-Lorenzo-82.jpg`, sectionTitle: "Layout" },
    ],
    [locale]
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // smooth transition
  const [shownIndex, setShownIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const animTimer = useRef<number | null>(null);

  const [showControls, setShowControls] = useState(true);

  // swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchMoved = useRef(false);

  function openAt(i: number) {
    setIndex(i);
    setShownIndex(i);
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

  // preload prev/next
  useEffect(() => {
    if (!open || flat.length === 0) return;

    const nextIndex = (index + 1) % flat.length;
    const prevIndex = (index - 1 + flat.length) % flat.length;

    const imgNext = new window.Image();
    imgNext.decoding = "async";
    imgNext.src = flat[nextIndex].src;

    const imgPrev = new window.Image();
    imgPrev.decoding = "async";
    imgPrev.src = flat[prevIndex].src;
  }, [open, index, flat]);

  // keyboard
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

  // lock scroll
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

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
      {/* ✅ griglia uniforme come prima */}
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {flat.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
            aria-label="Open photo"
          >
            {/* ✅ Wrapper fixed height identical to old <img className="h-40 w-full ..."> */}
            <div className="relative h-40 w-full">
              <Image
                src={item.src}
                alt={`Solal ${item.sectionTitle}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={45}
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" aria-modal="true" role="dialog">
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={close}
            aria-label={locale === "it" ? "Chiudi" : "Close"}
          />

          <div className="relative z-[81] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
            <div
              className={`flex h-14 items-center justify-between gap-3 px-4 transition-opacity duration-150 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-white">{currentMeta?.sectionTitle}</div>
                <div className="text-xs text-slate-300">
                  {index + 1} / {flat.length}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                  aria-label={locale === "it" ? "Precedente" : "Previous"}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                  aria-label={locale === "it" ? "Successiva" : "Next"}
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                  aria-label={locale === "it" ? "Chiudi" : "Close"}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="relative bg-black px-2 pb-2">
              {/* ✅ lightbox dimensione fissa */}
              <div
                className="flex h-[72vh] w-full items-center justify-center overflow-hidden rounded-xl"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onClick={() => setShowControls((s) => !s)}
              >
                {/* ✅ Lightbox stays <img> to keep your fade/scale EXACT */}
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
                aria-label={locale === "it" ? "Precedente" : "Previous"}
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className={`absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white hover:bg-white/10 md:block transition-opacity duration-150 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
                aria-label={locale === "it" ? "Successiva" : "Next"}
              >
                →
              </button>

              <div
                className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-slate-200 md:hidden transition-opacity duration-150 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                {locale === "it" ? "Scorri per cambiare foto" : "Swipe to change photo"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
