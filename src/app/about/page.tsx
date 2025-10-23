import React, { Suspense } from "react";
import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Main from "./Main";

export const metadata: Metadata = {
  title: "About FitMuse - Where Beauty, Strength & Allure Unite",
  description:
    "Learn the story behind FitMuse — where fitness meets allure. Discover our vision to merge beauty, strength, and sensuality through captivating workout shorts, premium galleries, and exclusive fitness inspirations. Available in English, 日本語, 한국어, Tiếng Việt, and Bahasa Indonesia.",
  keywords: [
    // Core English
    "About FitMuse",
    "FitMuse vision",
    "FitMuse mission",
    "alluring fitness muses",
    "seductive fitness content",
    "sensual workout experience",
    "exclusive fitness galleries",
    "premium fitness videos",
    "provocative fitness inspiration",
    "beauty and strength in fitness",
    "fitness allure",
    "magnetic fitness models",
    "irresistible gym muses",
    "captivating workout shorts",
    "adult fitness entertainment",
    "fitness and seduction",
    "brand philosophy FitMuse",
    "luxury fitness brand",
    "global fitness allure",

    // Japanese (日本語)
    "FitMuse について",
    "ブランド ビジョン",
    "美しさと強さ",
    "魅惑的なフィットネス",
    "セクシーなワークアウト",
    "プレミアム ギャラリー",
    "独占コンテンツ",
    "フィットネスの魅力",

    // Korean (한국어)
    "FitMuse 소개",
    "브랜드 비전",
    "아름다움과 힘",
    "매혹적인 피트니스",
    "섹시한 운동",
    "프리미엄 갤러리",
    "독점 콘텐츠",
    "피트니스 매력",

    // Vietnamese (Tiếng Việt)
    "giới thiệu FitMuse",
    "tầm nhìn thương hiệu",
    "vẻ đẹp và sức mạnh",
    "thể hình quyến rũ",
    "trải nghiệm gợi cảm",
    "bộ sưu tập độc quyền",
    "thương hiệu thể hình cao cấp",
    "sức hút thể hình",

    // Indonesian (Bahasa Indonesia)
    "tentang FitMuse",
    "visi merek",
    "kecantikan dan kekuatan",
    "fitnes memikat",
    "pengalaman sensual",
    "galeri eksklusif",
    "merek kebugaran premium",
    "daya tarik fitnes",
  ],

  openGraph: {
    title: "About FitMuse - Our Story of Beauty, Strength & Allure",
    description:
      "Discover the FitMuse story — uniting fitness, fashion, and seduction. Explore how our global brand redefines allure through premium content and empowering aesthetics. Multilingual access: English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia.",
    url: "https://www.fitmuse.club/about",
    siteName: "FitMuse",
    images: [
      {
        url: "https://www.fitmuse.club/fitmuse-preview.jpg",
        width: 1200,
        height: 630,
        alt: "About FitMuse - Fitness Meets Allure",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ja_JP", "ko_KR", "vi_VN", "id_ID"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About FitMuse - The Vision of Fitness & Allure",
    description:
      "Explore the FitMuse vision — a world where beauty, strength, and sensuality redefine fitness inspiration. Learn more about our mission.",
    images: ["https://www.fitmuse.club/fitmuse-preview.jpg"],
  },

  metadataBase: new URL("https://www.fitmuse.club"),
};

export default function AboutPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
