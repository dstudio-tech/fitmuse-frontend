import React, { Suspense } from "react";
import type { Metadata } from "next";
import Main from "./Main";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "FitMuse Muses - Alluring Fitness Inspirations | Global Gallery",
  description:
    "Meet the FitMuse muses—icons of beauty and strength. Explore captivating portfolios, seductive galleries, and exclusive content that inspires and fascinates. Available in English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia.",
  keywords: [
    // Core (EN)
    "FitMuse Muses",
    "alluring fitness muses",
    "seductive gym muses",
    "fitness inspirations",
    "captivating fitness icons",
    "provocative fitness models",
    "irresistible workout muses",
    "exclusive fitness content",
    "sensual fitness allure",
    "magnetic gym personalities",
    "premium fitness portfolios",
    "fitness beauty inspirations",
    "stunning gym models",
    "FitMuse icons",

    // Japanese (日本語)
    "フィットネス ミューズ",
    "魅惑的なジム美女",
    "美しさと強さ",
    "セクシーなフィットネス",
    "独占コンテンツ",
    "ポートフォリオ",
    "ギャラリー",

    // Korean (한국어)
    "피트니스 뮤즈",
    "매혹적인 체육관 미녀",
    "아름다움과 힘",
    "섹시한 피트니스",
    "독점 컨텐츠",
    "포트폴리오",
    "갤러리",

    // Vietnamese (Tiếng Việt)
    "Nàng thơ thể hình",
    "người mẫu phòng gym quyến rũ",
    "vẻ đẹp và sức mạnh",
    "fitness gợi cảm",
    "nội dung độc quyền",
    "hồ sơ cá nhân",
    "bộ sưu tập",

    // Indonesian (Bahasa Indonesia)
    "muse kebugaran",
    "wanita gym memikat",
    "kecantikan dan kekuatan",
    "fitnes seksi",
    "konten eksklusif",
    "portofolio",
    "galeri",
  ],

  // Good for hreflang / international SEO
  alternates: {
    canonical: "https://www.fitmuse.club/muse",
    languages: {
      "en-US": "/muse",
      "ja-JP": "/ja/muse",
      "ko-KR": "/ko/muse",
      "vi-VN": "/vi/muse",
      "id-ID": "/id/muse",
    },
  },

  // Rich previews with locale hints
  openGraph: {
    title: "FitMuse Muses - Global Fitness Allure & Inspirations",
    description:
      "Discover FitMuse muses worldwide. Browse exclusive portfolios and galleries celebrating beauty, strength, and allure. English / 日本語 / 한국어 / Tiếng Việt / Bahasa Indonesia.",
    url: "https://www.fitmuse.club/muse",
    siteName: "FitMuse",
    images: [
      {
        url: "https://www.fitmuse.club/fitmuse-preview.jpg",
        width: 1200,
        height: 630,
        alt: "FitMuse Muses - Global Fitness Allure",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ja_JP", "ko_KR", "vi_VN", "id_ID"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FitMuse Muses - Beauty, Strength, Allure",
    description:
      "Explore captivating fitness muses and exclusive galleries. Multilingual access: English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia.",
    images: ["https://www.fitmuse.club/fitmuse-preview.jpg"],
  },

  metadataBase: new URL("https://www.fitmuse.club"),
};

export default function MusesPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
