import Link from "next/link";

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: "it" | "en" }>;
}) {
  const { locale } = await params;

  const title = locale === "it" ? "Destinazioni in Adriatico" : "Adriatic destinations";
  const intro =
    locale === "it"
      ? "Tra città storiche, baie riservate e acque calme, l’Adriatico è perfetto per un charter elegante e rilassante. Possiamo seguire rotte consigliate o creare un itinerario su misura."
      : "From historic towns to secluded bays, the Adriatic is perfect for a refined, relaxing charter. Choose a suggested route or request a custom itinerary.";

  const items = locale === "it"
    ? ["Rovinj", "Brijuni / Brioni", "Novigrad", "Poreč / Parenzo"]
    : ["Rovinj", "Brijuni Islands", "Novigrad", "Poreč"];

  const cta = locale === "it" ? "Richiedi un itinerario" : "Request an itinerary";

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 text-white">
      <div className="text-xs uppercase tracking-widest text-slate-400">
        {locale === "it" ? "Itinerari" : "Itineraries"}
      </div>
      <h1 className="mt-2 text-4xl font-semibold">{title}</h1>
      <p className="mt-5 max-w-3xl text-slate-300">{intro}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {items.map((x) => (
          <div key={x} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-base font-semibold">{x}</div>
            <div className="mt-2 text-sm text-slate-300">
              {locale === "it" ? "Descrizione breve + foto (domani)." : "Short description + photo (tomorrow)."}
            </div>
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
