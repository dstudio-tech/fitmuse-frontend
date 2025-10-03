import type { MetadataRoute } from "next";

const BASE = "https://www.fitmuse.club";

const routes = [
  "/", // Home
  "/about",
  "/muse",
  "/gallery",
  "/pricing",
  "/contact",
  "/terms-and-conditions",
  "/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
  }));
}
