import Link from "next/link";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import YachtMiniGallery from "@/components/YachtMiniGallery";

export default async function YachtPage({
  params,
}: {
  params: Promise<{ locale: "it" | "en" }>;
}) {
  const { locale } = await params;

  const title = "Solal";

  const tagline =
    locale === "it"
      ? "Sanlorenzo 82 (Refit 2025) — un classico italiano senza tempo, dove eleganza, spazio e performance si incontrano per una crociera davvero esclusiva."
      : "Sanlorenzo 82 (Refit 2025) — a timeless Italian classic where elegance, space and performance come together for a truly exclusive cruise.";

  const intro =
    locale === "it"
      ? "Solal è la nostra proposta per vivere l’Adriatico con comfort, privacy e servizio premium."
      : "Solal is our way to experience the Adriatic with comfort, privacy and premium service.";

  const highlights =
    locale === "it"
      ? [
          "Refit 2025: atmosfera rinnovata e cura dei dettagli",
          "4 cabine per 8 ospiti: layout ideale per famiglie e gruppi",
          "Zone esterne ampie per relax, pranzo e aperitivi al tramonto",
          "Interni caldi e confortevoli, perfetti anche per crociere multi-day",
          "Navigazione fluida: crociera veloce tra baie e isole dell’Adriatico",
          "Esperienza su misura: itinerari flessibili e ritmo personalizzato",
        ]
      : [
          "2025 refit: refreshed ambience and attention to detail",
          "4 cabins for up to 8 guests: ideal layout for families and groups",
          "Generous outdoor areas for lounging, dining and sunset aperitifs",
          "Warm, comfortable interiors—perfect for multi-day cruising",
          "Smooth navigation: quick hops between Adriatic bays and islands",
          "Tailor-made experience: flexible itineraries and your preferred pace",
        ];

  const cta = locale === "it" ? "Richiedi disponibilità" : "Request availability";

  // ✅ Mantengo ESATTAMENTE le tue etichette e valori
  const specs = [
    {
      label: locale === "it" ? "Ospiti" : "Guests",
      value: locale === "it" ? "Fino a 8" : "Up to 8",
    },
    { label: locale === "it" ? "Cabine" : "Cabins", value: "4" },
    {
      label: locale === "it" ? "Letti" : "Arrangements",
      value: locale === "it" ? "2 matr, 4 sing" : "2 Double, 4 Single",
    },
    { label: locale === "it" ? "Lunghezza" : "Length", value: "23.99 m (82’)" },
    { label: locale === "it" ? "Baglio" : "Beam", value: "6.30 m (20’8”)" },
    { label: locale === "it" ? "Pescaggio" : "Draft", value: "1.79 m (5’10”)" },
    { label: locale === "it" ? "Anno / Refit" : "Year / Refit", value: "2000 / 2025" },
    { label: locale === "it" ? "Cantiere" : "Builder", value: "Sanlorenzo" },
    {
      label: locale === "it" ? "Motori" : "Engines",
      value: "2 × 1350 hp",
    },
    {
      label: locale === "it" ? "Velocità di crociera" : "Cruising speed",
      value: locale === "it" ? "18 nodi" : "18 knots",
    },
    {
      label: locale === "it" ? "Velocità massima" : "Max speed",
      value: locale === "it" ? "24 nodi" : "24 knots",
    },
    {
      label: locale === "it" ? "Consumo" : "Fuel consumption",
      value: "~350 L/h",
    },
  ];

  const note =
    locale === "it"
      ? "Nota: i consumi possono variare in base a condizioni meteo-marine, carico e velocità."
      : "Note: fuel consumption may vary depending on sea conditions, load and speed.";

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-14 text-white">
        <div className="text-xs uppercase tracking-widest text-slate-400">Yacht</div>

        <h1 className="mt-2 text-4xl font-semibold">{title}</h1>

        <p className="mt-4 max-w-4xl text-lg font-medium text-white/90">
          {tagline}
        </p>

        <p className="mt-4 max-w-3xl text-slate-300">{intro}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {/* Highlights */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-base font-semibold">Highlights</div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
              {highlights.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          {/* Dati tecnici */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-base font-semibold">
              {locale === "it" ? "Dati tecnici" : "Technical data"}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {specs.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                >
                  <div className="text-xs uppercase tracking-wide text-slate-400">
                    {row.label}
                  </div>
                  <div className="text-sm font-medium text-white">{row.value}</div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-slate-400">{note}</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-base font-semibold">Gallery</div>
          <div className="mt-2 text-sm text-slate-300">
            {locale === "it"
              ? "Una selezione di scatti per entrare nell’atmosfera di Solal."
              : "A curated selection to feel Solal’s vibe."}
          </div>

          <YachtMiniGallery locale={locale} />
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 hover:bg-slate-100"
          >
            {cta}
          </Link>
        </div>
      </div>

      {/* stesso identico bottone WhatsApp della Home */}
      <WhatsAppFloatingButton locale={locale} />
    </>
  );
}
