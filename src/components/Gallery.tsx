import React from "react";

type Locale = "it" | "en";

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
    brochure: "Brochure (PDF)",
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

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-semibold text-white">{t.title}</h2>
      <p className="mt-2 text-slate-300">{t.subtitle}</p>

      {/* EXTERIOR */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-white">{t.exterior}</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {exterior.map((img) => (
            <a
              key={img}
              href={`${base}${img}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={`${base}${img}`}
                alt={`Solal ${img}`}
                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>

      {/* INTERIOR */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-white">{t.interior}</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {interior.map((img) => (
            <a
              key={img}
              href={`${base}${img}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={`${base}${img}`}
                alt={`Solal ${img}`}
                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>

      {/* MOOD */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-white">{t.mood}</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {mood.map((img) => (
            <a
              key={img}
              href={`${base}${img}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={`${base}${img}`}
                alt={`Solal ${img}`}
                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>

      {/* LAYOUT + TOYS */}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold text-white">{t.layout}</h3>
          <a
            href={`${base}${layout}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block overflow-hidden rounded-xl"
          >
            <img
              src={`${base}${layout}`}
              alt="Solal layout"
              className="w-full object-cover"
              loading="lazy"
            />
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold text-white">{t.toys}</h3>

          <div className="mt-4 grid grid-cols-2 gap-4">
            {toys.map((img) => (
              <a
                key={img}
                href={`${base}${img}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl"
              >
                <img
                  src={`${base}${img}`}
                  alt={`Solal ${img}`}
                  className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </a>
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
  );
}
