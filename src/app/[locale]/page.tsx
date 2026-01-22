import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "it" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-white">
      <h1 className="text-4xl font-semibold">VYC – Vega Yacht Charter</h1>
      <p className="mt-4 text-slate-300">
        {locale === "it"
          ? "Struttura IT/EN attiva. Ora inseriamo il sito completo."
          : "IT/EN structure is working. Next we’ll add the full website."}
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href={`/${locale}/contact`}
          className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950"
        >
          {locale === "it" ? "Richiedi disponibilità" : "Request availability"}
        </Link>
      </div>
    </div>
  );
}
