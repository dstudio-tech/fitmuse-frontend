import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/admin/", "/draft/"] },
    ],
    sitemap: "https://www.fitmuse.club/sitemap.xml",
  };
}
