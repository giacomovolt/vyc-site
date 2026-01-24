"use client";

type Props = {
  locale: string;
};


export default function WhatsAppFloatingButton({ locale }: Props) {
  const isIt = locale !== "en";

  const message =
    locale === "it"
      ? "Ciao VYC! Vorrei info e disponibilità per Solal 🙏"
      : "Hi VYC! I'd like info and availability for Solal 🙏";

  const encodedMessage = encodeURIComponent(message);

  return (
    <a
      href={`https://wa.me/385993334450?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-green-600"
      aria-label="WhatsApp"
    >
      <span className="text-lg">💬</span>
      <span className="hidden sm:inline">
        {locale === "it" ? "Chatta su WhatsApp" : "Chat on WhatsApp"}
      </span>
    </a>
  );
}
