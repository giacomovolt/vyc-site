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
        "Un charter curato e rilassante lungo la costa croata. Baie protette, acqua cristallina e serate in rada. Raccontaci le tue date: pensiamo noi al resto.",
      cta: "Richiedi disponibilità",
      wa: "WhatsApp",
      waText:
        "Ciao%20VYC!%20Vorrei%20info%20e%20disponibilit%C3%A0%20per%20Solal.%20Grazie!",
    },
    en: {
      brand: "VYC • Vega Yacht Charter",
      headline: "Solal, your time at sea.",
      sub:
        "A relaxed, curated charter along the Croatian coast. Sheltered bays, clear water and calm evenings at anchor. Share your dates and we’ll take care of the rest.",
      cta: "Request availability",
      wa: "WhatsApp",
      waText:
        "Hi%20VYC!%20I’d%20like%20info%20and%20availability%20for%20Solal.%20Thank%20you!",
    },
  }[locale];

  return (
    <>
      {/* HERO */}
      <div className="relative min-h-[72vh] sm:min-h-[70vh] overflow-hidden">
        <Image
          src="/images/copertina.JPG"
          alt="VYC - Solal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* contenuto */}
        <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-24 sm:py-16 text-white">
          <div className="text-xs sm:text-sm tracking-wide text-white/90">
            {t.brand}
          </div>

          <h1 className="mt-3 text-3xl leading-tight sm:text-4xl font-semibold">
            {t.headline}
          </h1>

          <p className="mt-4 max-w-[34ch] sm:max-w-2xl text-slate-200">
            {t.sub}
          </p>

          {/* CTA – mobile colonna, desktop invariato */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="w-full sm:w-auto text-center rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 hover:bg-slate-100"
            >
              {t.cta}
            </Link>

            <a
              href={`https://wa.me/385993334450?text=${t.waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center rounded-full bg-green-500 px-5 py-3 text-sm font-medium text-white hover:opacity-95"
            >
              {t.wa}
            </a>
          </div>
        </div>

        {/* gradient di uscita – SOLO MOBILE */}
        <div className="pointer-events-none absolute bottom-0 h-24 w-full bg-gradient-to-t from-slate-950 to-transparent sm:hidden" />
      </div>

      {/* GALLERY */}
      <Gallery locale={locale} />

      {/* WHATSAPP FLOATING */}
      <WhatsAppFloatingButton locale={locale} />
    </>
  );
}
