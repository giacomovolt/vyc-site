import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function toLocale(x: unknown): "it" | "en" {
  return x === "en" ? "en" : "it";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  // params può essere un oggetto o una Promise (Next 16 può comportarsi in modo diverso tra dev/prod)
  const resolved = await Promise.resolve(params);
  const locale = toLocale(resolved?.locale);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
