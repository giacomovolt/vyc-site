import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function toLocale(x: string): "it" | "en" {
  return x === "en" ? "en" : "it";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
