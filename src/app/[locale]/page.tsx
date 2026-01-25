import Link from "next/link";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import Image from "next/image";
import Gallery from "@/components/gallery";

function toLocale(x: unknown): "it" | "en" {
  return x === "en" ? "en" : "it";
}

export default async function Home({ params }: { params: any }) {
  const resolved = await Promise.resolve(params);
  const locale = toLocale(resolved?.locale);

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
          <h1 className="text-4xl font-semibold">VYC • Vega Yacht Charter</h1>

          <p className="mt-4 text-slate-200">
            {locale === "it"
              ? "Benvenuto. Richiedi disponibilità e preventivo."
              : "Welcome. Request availability and a tailored quote."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950"
            >
              {locale === "it" ? "Richiedi disponibilità" : "Request availability"}
            </Link>

            <a
              href={`https://wa.me/385993334450?text=${
                locale === "it"
                  ? "Ciao%20VYC!%20Vorrei%20info%20e%20disponibilit%C3%A0%20per%20Solal%20%F0%9F%99%8F"
                  : "Hi%20VYC!%20I'd%20like%20info%20and%20availability%20for%20Solal%20%F0%9F%99%8F"
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-500 px-5 py-3 text-sm font-medium text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Gallery locale={locale} />

      <WhatsAppFloatingButton locale={locale} />
    </>
  );
}
