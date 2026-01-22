import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "it" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: "it" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-slate-950">
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
