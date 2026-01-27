import Link from "next/link";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: "it" | "en" }>;
}) {
  const { locale } = await params;

  const t = {
    it: {
      eyebrow: "Itinerari",
      title: "Destinazioni in Adriatico",
      intro:
        "Tra città storiche, baie riservate e acque calme, l’Adriatico è perfetto per un charter elegante e rilassante. Possiamo seguire rotte consigliate o creare un itinerario su misura.",
      croatiaLine:
        "La costa croata è un susseguirsi di isole, canali e ancoraggi protetti: con Solal ogni giornata è semplice, fluida, naturalmente “vivibile”.",
      sections: {
        istria: "Istria & Quarnero",
        dalmatia: "Dalmazia",
      },
      cta: "Richiedi un itinerario",
      cards: {
        rovinj: {
          title: "Rovinj",
          desc:
            "Elegante e fotogenica, tra vicoli in pietra e tramonti sul mare. Perfetta per una prima sera “slow” in porto o in rada poco distante.",
        },
        brijuni: {
          title: "Brijuni / Brioni",
          desc:
            "Un arcipelago discreto e verde: baie tranquille, natura curata, atmosfera rarefatta. Ideale per una giornata di relax assoluto.",
        },
        novigrad: {
          title: "Novigrad",
          desc:
            "Borgo raccolto e autentico: passeggiate sul lungomare, cucina di mare e un ritmo pacato che invita a restare.",
        },
        porec: {
          title: "Poreč / Parenzo",
          desc:
            "Storia e luce: un centro antico affacciato sull’acqua, perfetto per alternare cultura e tuffi in baie riparate.",
        },
        kornati: {
          title: "Arcipelago delle Incoronate (Kornati)",
          desc:
            "Paesaggi quasi lunari e ancoraggi spettacolari: la meta iconica per chi ama silenzio, cielo stellato e mare cristallino.",
        },
        split: {
          title: "Spalato (Split)",
          desc:
            "Energia e storia: il Palazzo di Diocleziano, ristoranti e passeggiate sul lungomare. Un’ottima tappa “city + sea”.",
        },
        trogir: {
          title: "Trogir",
          desc:
            "Un gioiello medievale sull’acqua: romantica, raccolta, perfetta per una sosta serale tra luci calde e piazze in pietra.",
        },
        dubrovnik: {
          title: "Dubrovnik",
          desc:
            "Imponente e scenografica: mura, mare profondo e panorami memorabili. Una chiusura di itinerario dal sapore iconico.",
        },
      },
      footnote:
        "Le rotte variano in base a meteo, preferenze e durata: ti aiutiamo a scegliere soste, rade e tempi di navigazione con un approccio rilassato e curato.",
    },
    en: {
      eyebrow: "Itineraries",
      title: "Adriatic destinations",
      intro:
        "From historic towns to secluded bays, the Adriatic is perfect for a refined, relaxing charter. Choose a suggested route or request a custom itinerary.",
      croatiaLine:
        "Croatia’s coastline is a chain of islands, channels and sheltered anchorages: with Solal, each day feels effortless, smooth, and truly liveable.",
      sections: {
        istria: "Istria & Kvarner",
        dalmatia: "Dalmatia",
      },
      cta: "Request an itinerary",
      cards: {
        rovinj: {
          title: "Rovinj",
          desc:
            "Elegant and photogenic, with stone alleys and sea-facing sunsets. Ideal for a slow first evening in port or a nearby calm anchorage.",
        },
        brijuni: {
          title: "Brijuni Islands",
          desc:
            "A discreet green archipelago: quiet bays, curated nature, a rarefied atmosphere. Perfect for a full day of pure relaxation.",
        },
        novigrad: {
          title: "Novigrad",
          desc:
            "Small, authentic and welcoming: waterfront strolls, great seafood, and a gentle pace that invites you to stay longer.",
        },
        porec: {
          title: "Poreč",
          desc:
            "History and light: an old town by the water, perfect to mix culture with swims in sheltered coves.",
        },
        kornati: {
          title: "Kornati Archipelago",
          desc:
            "Almost lunar landscapes and stunning anchorages: iconic for silence, starlit skies and crystal-clear water.",
        },
        split: {
          title: "Split",
          desc:
            "Energy and history: Diocletian’s Palace, great dining, and long promenades. A strong “city + sea” stop.",
        },
        trogir: {
          title: "Trogir",
          desc:
            "A medieval gem on the water: romantic and compact, perfect for an evening stop among warm lights and stone squares.",
        },
        dubrovnik: {
          title: "Dubrovnik",
          desc:
            "Dramatic and iconic: ancient walls, deep-blue sea and unforgettable views. A grand finale to a memorable route.",
        },
      },
      footnote:
        "Routes depend on weather, preferences and duration: we help you choose stops, anchorages and cruising times with a relaxed, curated approach.",
    },
  }[locale];

  const istriaItems = ["rovinj", "brijuni", "novigrad", "porec"] as const;
  const dalmatiaItems = ["kornati", "split", "trogir", "dubrovnik"] as const;

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-14 text-white">
        <div className="text-xs uppercase tracking-widest text-slate-400">
          {t.eyebrow}
        </div>

        <h1 className="mt-2 text-4xl font-semibold">{t.title}</h1>

        <p className="mt-5 max-w-3xl text-slate-300">{t.intro}</p>
        <p className="mt-4 max-w-3xl text-white/80">{t.croatiaLine}</p>

        {/* Istria */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-white">{t.sections.istria}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {istriaItems.map((key) => {
              const card = (t.cards as any)[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-base font-semibold">{card.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-300">
                    {card.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dalmatia */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-white">{t.sections.dalmatia}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {dalmatiaItems.map((key) => {
              const card = (t.cards as any)[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-base font-semibold">{card.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-300">
                    {card.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-10 max-w-4xl text-sm leading-relaxed text-white/70">
          {t.footnote}
        </p>

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
