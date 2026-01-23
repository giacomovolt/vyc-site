import Link from "next/link";

function toLocale(x: unknown): "it" | "en" {
  return x === "en" ? "en" : "it";
}

export default async function Home({ params }: { params: any }) {
  const resolved = await Promise.resolve(params);
  const locale = toLocale(resolved?.locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-white">
      <h1 className="text-4xl font-semibold">VYC – Vega Yacht Charter</h1>
      <p className="mt-4 text-slate-300">
        {locale === "it"
          ? "Benvenuto. Richiedi disponibilità e preventivo."
          : "Welcome. Request availability and a tailored quote."}
      </p>

      <div className="mt-8">
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
