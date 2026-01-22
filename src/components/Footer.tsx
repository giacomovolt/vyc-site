export default function Footer({ locale }: { locale: "it" | "en" }) {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        {locale === "it"
          ? "© VYC – Tutti i diritti riservati"
          : "© VYC – All rights reserved"}
      </div>
    </footer>
  );
}
