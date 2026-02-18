import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Croatia Luxury Yacht Charter | Solal Yacht – VYC Fleet",
  description:
    "Luxury yacht charter along the Croatian coast. Private crew, tailored itineraries and elegant atmosphere aboard Solal. Discover VYC Fleet.",
  metadataBase: new URL("https://vycfleet.com"),

  openGraph: {
    title: "VYC Fleet – Luxury Yacht Charter Croatia",
    description:
      "Exclusive yacht charter in Croatia aboard Solal. Relaxed cruising, private crew and curated Adriatic itineraries.",
    url: "https://vycfleet.com",
    siteName: "VYC Fleet",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
