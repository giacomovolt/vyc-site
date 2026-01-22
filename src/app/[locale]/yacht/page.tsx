import type { ReactNode } from "react";
import Link from "next/link";

export default async function YachtPage({
  params,
}: {
  params: Promise<{ locale: "it" | "en" }>;
}) {
  const { locale } = await params;

  const title = "Solal";
  const intro =
    locale === "it"
      ? "Solal è la nostra proposta per vivere l’Adriatico con comfort, privacy e servizio premium. Gallery e dettagli tecnici verranno inseriti con le vostre foto."
      : "Solal is our way to experience the Adriatic with comfort, privacy and premium service. Gallery and technical details will be added with your photos.";

  const highlights =
    locale === "it"
      ? [
          "Spazi esterni generosi per relax e convivialità",
          "Aree prendisole e zone ombreggiate",
          "Interni curati e confortevoli",
          "Esperienza su misura: day charter e multi-day",
        ]
      : [
          "Generous outdoor spaces for relaxation",
          "Sunbathing and shaded areas",
          "Refined, comfortable interiors",
          "Tailor-made experience: day & multi-day charters",
        ];

  const cta = locale === "it" ? "Richiedi disponibilità" : "Request availability";

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 text-white">
      <div className="text-xs uppercase tracking-widest text-slate-400">Yacht</div>
      <h1 className="mt-2 text-4xl font-semibold">{title}</h1>
      <p className="mt-5 max-w-3xl text-slate-300">{intro}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-base font-semibold">Highlights</div>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
            {highlights.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-base font-semibold">Gallery</div>
          <div className="mt-3 text-sm text-slate-300">
            {locale === "it"
              ? "Placeholder: domani integriamo le foto e creiamo una gallery elegante."
              : "Placeholder: tomorrow we’ll add your photos and build a premium gallery."}
          </div>
        </div>
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
