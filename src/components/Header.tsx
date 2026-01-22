import Link from "next/link";

export default function Header({ locale }: { locale: "it" | "en" }) {
  return (
    <header className="border-b border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-xl font-semibold text-white">
          VYC
        </Link>

        <nav className="flex gap-4 text-sm text-slate-300">
          <Link href={`/${locale}/contact`} className="hover:text-white">
            {locale === "it" ? "Contatti" : "Contact"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
