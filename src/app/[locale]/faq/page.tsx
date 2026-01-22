export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: "it" | "en" }>;
}) {
  const { locale } = await params;

  const faqs =
    locale === "it"
      ? [
          ["Quanto tempo prima devo prenotare?", "In alta stagione consigliamo di prenotare il prima possibile. In bassa stagione possiamo spesso confermare anche con breve preavviso."],
          ["Cosa succede in caso di maltempo?", "La sicurezza viene prima di tutto. In caso di condizioni non adatte alla navigazione, valuteremo insieme la soluzione migliore."],
          ["È possibile personalizzare l’itinerario?", "Sì. Possiamo seguire itinerari consigliati oppure costruire una rotta su misura."],
          ["I prezzi sono visibili sul sito?", "Preferiamo inviare un preventivo personalizzato in base a periodo, durata e servizi richiesti."],
          ["Come funziona il pagamento?", "Dopo conferma, viene richiesto un acconto per bloccare le date. Saldo secondo condizioni concordate prima dell’imbarco."],
        ]
      : [
          ["How far in advance should I book?", "For peak season we recommend booking as early as possible. In low season we can often confirm on shorter notice."],
          ["What happens in case of bad weather?", "Safety comes first. If conditions are not suitable for cruising, we’ll agree on the best solution together."],
          ["Can I customize the itinerary?", "Yes. Choose a suggested route or we can craft a fully custom itinerary."],
          ["Are prices shown on the website?", "We prefer sending a tailored quote based on season, duration and requested services."],
          ["How does payment work?", "After confirmation, a deposit secures the dates. The balance is due before embarkation under the agreed terms."],
        ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 text-white">
      <div className="text-xs uppercase tracking-widest text-slate-400">
        {locale === "it" ? "Domande frequenti" : "Frequently asked questions"}
      </div>
      <h1 className="mt-2 text-4xl font-semibold">FAQ</h1>

      <div className="mt-10 grid gap-4">
        {faqs.map(([q, a]) => (
          <div key={q} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-base font-semibold">{q}</div>
            <div className="mt-2 text-sm text-slate-300">{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
