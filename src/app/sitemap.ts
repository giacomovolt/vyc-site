import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vycfleet.com";

  const routes = [
    "",
    "/it",
    "/en",
    "/it/yacht",
    "/en/yacht",
    "/it/destinations",
    "/en/destinations",
    "/it/experiences",
    "/en/experiences",
    "/it/faq",
    "/en/faq",
    "/it/contact",
    "/en/contact",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}
