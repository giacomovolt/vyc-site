import Link from "next/link";

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: "it" | "en" }>;
}) {
  const { locale } = await params;

  const title = locale === "it" ? "Esperienze a bordo" : "Onboard experiences";
  const intro =
    locale === "it"
      ? "Ogni charter può essere modellato sul tuo stile: relax totale, momenti romantici, esperienze in famiglia o giornate più dinamiche."
      : "Every charter can be shaped around your style: pure relaxation, romantic moments, family cruising or more dynamic days.";

  const cards =
    locale === "it"
      ? [
          ["Relax & baie", "Navigazione lenta, tuffi, sole e aperitivo in rada."],
          ["Romantic escape", "Tramonto, atmosfera e privacy."],
          ["Family charter", "Comfort e ritmi adatti a tutti."],
          ["Fishing experience", "Un’esperienza dedicata a chi ama il mare in modo attivo."],
        ]
      : [
          ["Relax & bays", "Slow cruising, swimming, sun and sunset drinks at anchor."],
          ["Romantic escape", "Sunset, privacy and a refined atmosphere."],
          ["Family charter", "Comfort and a pace that works for everyone."],
          ["Fishing experience", "A dedicated experience for guests who enjoy an active day at sea."],
        ];

  const cta = locale === "it" ? "Richiedi disponibilità" : "Request availability";

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 text-white">
      <div className="text-xs uppercase tracking-widest text-slate-400">
        {locale === "it" ? "Su misura" : "Tailored"}
      </div>
      <h1 className="mt-2 text-4xl font-semibold">{title}</h1>
      <p className="mt-5 max-w-3xl text-slate-300">{intro}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {cards.map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-base font-semibold">{t}</div>
            <div className="mt-2 text-sm text-slate-300">{d}</div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href={`/${locale}/contact`}
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 hover:bg-slate-100"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
