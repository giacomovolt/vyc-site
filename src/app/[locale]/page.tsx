import Link from "next/link";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import Image from "next/image";
import Gallery from "@/components/Gallery";

function toLocale(x: unknown): "it" | "en" {
  return x === "en" ? "en" : "it";
}

export default async function Home({ params }: { params: any }) {
  const resolved = await Promise.resolve(params);
  const locale = toLocale(resolved?.locale);

  const t = {
    it: {
      brand: "VYC • Vega Yacht Charter",
      headline: "Solal, il tuo tempo sul mare.",
      sub:
        "Un charter curato e rilassante lungo la costa croata: baie protette, acqua cristallina e serate luminose in rada. Raccontaci le tue date — pensiamo noi al resto.",
      cta: "Richiedi disponibilità",
      wa: "WhatsApp",
      waText:
        "Ciao%20VYC!%20Vorrei%20info%20e%20disponibilit%C3%A0%20per%20Solal.%20%F0%9F%9A%A4%20Grazie!",
    },
    en: {
      brand: "VYC • Vega Yacht Charter",
      headline: "Solal, your time at sea.",
      sub:
        "A curated, relaxed charter along the Croatian coast: sheltered bays, crystal water, and golden evenings at anchor. Share your dates—we’ll take care of the rest.",
      cta: "Request availability",
      wa: "WhatsApp",
      waText:
        "Hi%20VYC!%20I%27d%20like%20info%20and%20availability%20for%20Solal.%20%F0%9F%9A%A4%20Thank%20you!",
    },
  }[locale];

  return (
    <>
      <div className="relative min-h-[70vh] overflow-hidden">
        <Image
          src="/images/copertina.JPG"
          alt="VYC - Solal"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 text-white">
          <div className="text-sm font-medium tracking-wide text-white/90">
            {t.brand}
          </div>

          <h1 className="mt-3 text-4xl font-semibold">{t.headline}</h1>

          <p className="mt-5 max-w-2xl text-slate-200">{t.sub}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 hover:bg-slate-100"
            >
              {t.cta}
            </Link>

            <a
              href={`https://wa.me/385993334450?text=${t.waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-500 px-5 py-3 text-sm font-medium text-white hover:opacity-95"
            >
              {t.wa}
            </a>
          </div>
        </div>
      </div>

      <Gallery locale={locale} />

      <WhatsAppFloatingButton locale={locale} />
    </>
  );
}
