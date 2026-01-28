import Link from "next/link";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: "it" | "en" }>;
}) {
  const { locale } = await params;

  const t = {
    it: {
      eyebrow: "FAQ",
      title: "Domande frequenti",
      intro:
        "Qui trovi le risposte rapide alle domande più comuni. Se ti serve un’indicazione su date, itinerario o organizzazione, scrivici: ti rispondiamo velocemente.",
      cta: "Contattaci",
      items: [
        {
          q: "Come posso ricevere un preventivo per il charter?",
          a: "Puoi contattarci tramite il form o via WhatsApp indicando periodo, durata indicativa e numero di ospiti. In base alle date scelte e alla disponibilità, ti prepariamo un’offerta personalizzata, costruita sulle tue esigenze e sul tipo di esperienza che stai cercando.",
        },
        {
          q: "L’esperienza è adatta anche a chi non ha esperienza nautica?",
          a: "Sì. Non è richiesta alcuna competenza nautica. La gestione della navigazione e della vita a bordo è interamente a carico della crew, che si occupa di ogni aspetto operativo. Gli ospiti possono semplicemente rilassarsi e vivere il mare in totale tranquillità.",
        },
        {
          q: "Cibo e carburante sono inclusi nel prezzo?",
          a: "No. Cibo, bevande e carburante non sono inclusi nel prezzo del charter. Questo permette di mantenere flessibilità e trasparenza, adattando i consumi e le scelte alimentari alle preferenze degli ospiti e all’itinerario effettivo.",
        },
        {
          q: "L’itinerario è fisso o personalizzabile?",
          a: "L’itinerario è personalizzabile. Prima della partenza definiamo insieme una rotta indicativa, che può includere città, baie e aree naturali. Durante il charter, il percorso può essere adattato in base alle condizioni meteo e ai desideri degli ospiti.",
        },
        {
          q: "Quante persone possono soggiornare a bordo?",
          a: "Solal può ospitare fino a 8 persone in quattro cabine, offrendo spazi confortevoli sia all’interno che all’esterno. La configurazione è adatta a famiglie, coppie o piccoli gruppi che desiderano condividere l’esperienza senza rinunciare al comfort.",
        },
        {
          q: "Qual è il periodo migliore per navigare in Adriatico?",
          a: "Il periodo ideale va dalla tarda primavera all’inizio dell’autunno. I mesi estivi offrono condizioni meteo stabili e mare generalmente calmo, mentre giugno e settembre sono particolarmente apprezzati per un’esperienza più tranquilla e rilassata.",
        },
      ],
    },
    en: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      intro:
        "Here are quick answers to the most common questions. If you need guidance on dates, itinerary or onboard planning, message us—we reply quickly.",
      cta: "Contact us",
      items: [
        {
          q: "How can I receive a charter quote?",
          a: "You can contact us via the form or WhatsApp with your preferred period, approximate duration, and number of guests. Based on your dates and availability, we’ll prepare a tailored offer built around your needs and the type of experience you’re looking for.",
        },
        {
          q: "Is it suitable for guests with no boating experience?",
          a: "Yes. No boating experience is required. Navigation and onboard operations are fully handled by the crew, who takes care of all practical aspects. Guests can simply relax and enjoy the sea with complete peace of mind.",
        },
        {
          q: "Are food and fuel included in the price?",
          a: "No. Food, beverages and fuel are not included in the charter price. This keeps things flexible and transparent, allowing choices and consumption to match guest preferences and the actual itinerary.",
        },
        {
          q: "Is the itinerary fixed or customizable?",
          a: "The itinerary is customizable. Before departure we define an indicative route together, which can include towns, bays and natural areas. During the charter, the route can be adjusted based on weather conditions and guest preferences.",
        },
        {
          q: "How many guests can stay onboard?",
          a: "Solal can host up to 8 guests across four cabins, with comfortable indoor and outdoor areas. The layout works well for families, couples or small groups who want to share the experience without giving up comfort.",
        },
        {
          q: "What’s the best season to cruise the Adriatic?",
          a: "The ideal season runs from late spring to early autumn. Summer months usually offer stable conditions and generally calm seas, while June and September are often preferred for a quieter, more relaxed experience.",
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

        <div className="mt-10 grid gap-4">
          {t.items.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-base font-semibold">{item.q}</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-300">
                {item.a}
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
