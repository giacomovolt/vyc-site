import Link from "next/link";

function toLocale(x: string): "it" | "en" {
  return x === "en" ? "en" : "it";
}

export default function Header({ locale }: { locale: string }) {
  const l = toLocale(locale);

  return (
    <header className="border-b border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${l}`} className="text-xl font-semibold text-white">
          VYC
        </Link>

        <nav className="flex gap-4 text-sm text-slate-300">
          <Link href={`/${l}/yacht`} className="hover:text-white">
            Yacht
          </Link>
          <Link href={`/${l}/destinations`} className="hover:text-white">
            {l === "it" ? "Destinazioni" : "Destinations"}
          </Link>
          <Link href={`/${l}/experiences`} className="hover:text-white">
            {l === "it" ? "Esperienze" : "Experiences"}
          </Link>
          <Link href={`/${l}/faq`} className="hover:text-white">
            FAQ
          </Link>
          <Link href={`/${l}/contact`} className="hover:text-white">
            {l === "it" ? "Contatti" : "Contact"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
