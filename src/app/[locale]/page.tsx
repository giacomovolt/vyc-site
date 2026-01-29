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
      headline: "Solal, your connection to the sea.",
      sub:
        "Un charter curato e rilassante lungo la costa croata. Baie protette, acqua cristallina e serate in rada. Dicci quando vorresti partire, al resto pensiamo noi.",
      cta: "Richiedi disponibilità",
      wa: "WhatsApp",
      waText:
        "Ciao%20VYC!%20Vorrei%20info%20e%20disponibilit%C3%A0%20per%20Solal.%20Grazie!",
    },
    en: {
      brand: "VYC • Vega Yacht Charter",
      headline: "Solal, your connection to the sea.",
      sub:
        "A relaxed, curated charter along the Croatian coast. Sheltered bays, clear water and calm evenings at anchor. Tell when you want to set sail and we’ll take care of the rest.",
      cta: "Request availability",
      wa: "WhatsApp",
      waText:
        "Hi%20VYC!%20I’d%20like%20info%20and%20availability%20for%20Solal.%20Thank%20you!",
    },
  }[locale];

  return (
    <>
      <div className="relative min-h-[76vh] sm:min-h-[70vh] overflow-hidden">
        <Image
          src="/images/copertina.JPG"
          alt="VYC - Solal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_62%] sm:object-center"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-16 sm:py-16 text-white">
          {/* Language toggle */}
          <div className="absolute right-4 top-4 z-10">
            <div className="inline-flex overflow-hidden rounded-full border border-white/15 bg-black/25 backdrop-blur-sm">
              <Link
                href="/it"
                className={`px-3 py-1.5 text-xs font-medium transition ${
                  locale === "it"
                    ? "bg-white text-slate-950"
                    : "text-white/85 hover:text-white"
                }`}
              >
                IT
              </Link>
              <Link
                href="/en"
                className={`px-3 py-1.5 text-xs font-medium transition ${
                  locale === "en"
                    ? "bg-white text-slate-950"
                    : "text-white/85 hover:text-white"
                }`}
              >
                EN
              </Link>
            </div>
          </div>

          <div className="flex min-h-[62vh] flex-col sm:min-h-0">
            <div>
              <div className="text-xs sm:text-sm tracking-wide text-white/90">
                {t.brand}
              </div>

              <h1 className="mt-2 text-3xl leading-tight sm:mt-3 sm:text-4xl font-semibold">
                {t.headline}
              </h1>

              <p className="mt-4 max-w-[34ch] sm:max-w-2xl text-slate-200">
                {t.sub}
              </p>
            </div>

            <div className="mt-auto pt-10 sm:mt-8 sm:pt-0">
              <div className="flex flex-col gap-3 sm:flex-row">
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
          </div>
        </div>

        {/* gradient bottom */}
        <div className="pointer-events-none absolute bottom-0 h-28 sm:h-36 w-full bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <Gallery locale={locale} />

      <WhatsAppFloatingButton locale={locale} />
    </>
  );
}
