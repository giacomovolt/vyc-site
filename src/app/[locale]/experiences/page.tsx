import Link from "next/link";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: "it" | "en" }>;
}) {
  const { locale } = await params;

  const t = {
    it: {
      eyebrow: "A bordo",
      title: "Esperienze",
      intro:
        "Un charter non è solo una rotta: è un ritmo nuovo. Giornate leggere, curate, che scorrono tra mare calmo, baie protette e serate luminose in rada.",
      note:
        "Ogni esperienza può essere modulata su meteo e desideri, mantenendo sempre un’impronta rilassata e “premium”.",
      cta: "Parliamo del tuo charter",
      cards: [
        {
          title: "Relax",
          desc:
            "Baie riparate, acqua trasparente e la libertà di rallentare. Nuotate senza fretta, sole sul fly, un drink al tramonto e musica bassa in sottofondo. Con Solal il lusso è semplice: spazio, comfort e tempo per staccare davvero.",
        },
        {
          title: "Romantic",
          desc:
            "Cene in rada con luci soffuse, un calice sotto le stelle e il mare che diventa silenzio. Rientrare in suite, svegliarsi con vista acqua e iniziare la giornata con un tuffo “solo vostro”. Ideale per anniversari, fughe di coppia e momenti da ricordare.",
        },
        {
          title: "Family",
          desc:
            "Tempo di qualità, senza orari rigidi: un bagno tutti insieme, un pranzo easy in pozzetto, poi una passeggiata in una città di pietra o un angolo di natura. L’Adriatico è perfetto per alternare mare, cultura e relax con un ritmo piacevole per grandi e piccoli.",
        },
        {
          title: "Active",
          desc:
            "Se vuoi muoverti, Solal diventa la base perfetta: snorkeling, giochi d’acqua e piccole esplorazioni tra calette e canali. E per chi ama la pesca, possiamo scegliere spot e orari migliori per un’uscita divertente e concreta, sempre senza stress.",
        },
      ],
    },
    en: {
      eyebrow: "Onboard",
      title: "Experiences",
      intro:
        "A charter is more than a route: it’s a new rhythm. Light, curated days flowing between calm seas, sheltered bays and golden evenings at anchor.",
      note:
        "Everything can be tailored to weather and preferences, always keeping a relaxed, premium feel.",
      cta: "Plan your charter",
      cards: [
        {
          title: "Relax",
          desc:
            "Sheltered bays, clear water, and the freedom to slow down. Unhurried swims, sun on the flybridge, a sunset drink and soft music in the background. With Solal, luxury is simple: space, comfort, and time to truly switch off.",
        },
        {
          title: "Romantic",
          desc:
            "Dinner at anchor with warm lights, a glass under the stars, and the sea turning into silence. Back to your suite, wake up facing the water, and start the day with a private swim. Perfect for anniversaries, couple escapes and memorable moments.",
        },
        {
          title: "Family",
          desc:
            "Quality time without rigid schedules: a swim together, an easy lunch on deck, then a stroll in a stone town or a stop in nature. The Adriatic is ideal to blend sea, culture and relaxation at a pace everyone enjoys.",
        },
        {
          title: "Active",
          desc:
            "If you want to move, Solal becomes your perfect base: snorkeling, water games and small explorations through coves and channels. And for fishing lovers, we can pick the best spots and times for a fun, rewarding session—always stress-free.",
        },
      ],
    },
  }[locale];

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-14 text-white">
        <div className="text-xs uppercase tracking-widest text-slate-400">
          {t.eyebrow}
        </div>

        <h1 className="mt-2 text-4xl font-semibold">{t.title}</h1>

        <p className="mt-5 max-w-3xl text-slate-300">{t.intro}</p>
        <p className="mt-4 max-w-3xl text-white/80">{t.note}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-base font-semibold">{c.title}</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-300">
                {c.desc}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 hover:bg-slate-100"
          >
            {t.cta}
          </Link>
        </div>
      </div>

      {/* ✅ WhatsApp floating button (identico alla Home) */}
      <WhatsAppFloatingButton locale={locale} />
    </>
  );
}
