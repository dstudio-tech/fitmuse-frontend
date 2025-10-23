import React, { Suspense } from "react";
import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Main from "./Main";

export const metadata: Metadata = {
  title:
    "FitMuse Gallery - Alluring Fitness Muses & Premium Visual Collections",
  description:
    "Step into the FitMuse Gallery — a world of captivating gym muses, seductive photo collections, and premium visuals celebrating beauty, strength, and allure. Discover inspiration in motion, available in English, 日本語, 한국어, Tiếng Việt, and Bahasa Indonesia.",
  keywords: [
    // Core English
    "FitMuse Gallery",
    "alluring fitness gallery",
    "seductive gym muses",
    "captivating fitness photos",
    "premium fitness visuals",
    "provocative workout galleries",
    "exclusive fitness content",
    "irresistible gym models",
    "sensual fitness collections",
    "magnetic fitness allure",
    "stunning fitness photography",
    "adult fitness galleries",
    "workout muses collection",
    "premium gym inspiration",
    "fitness beauty showcase",
    "fit girls gallery",
    "exclusive fitness portfolios",

    // Japanese (日本語)
    "フィットネス ギャラリー",
    "ジム美女",
    "魅惑的な写真コレクション",
    "プレミアム フィットネス ビジュアル",
    "独占ギャラリー",
    "美と強さの調和",
    "フィットミューズ コレクション",

    // Korean (한국어)
    "피트니스 갤러리",
    "체육관 미녀",
    "매혹적인 사진 컬렉션",
    "프리미엄 피트니스 비주얼",
    "독점 갤러리",
    "아름다움과 힘",
    "핏뮤즈 컬렉션",

    // Vietnamese (Tiếng Việt)
    "bộ sưu tập thể hình FitMuse",
    "phòng gym quyến rũ",
    "ảnh thể hình gợi cảm",
    "hình ảnh thể hình cao cấp",
    "bộ sưu tập độc quyền",
    "vẻ đẹp và sức mạnh",
    "nàng thơ thể hình",

    // Indonesian (Bahasa Indonesia)
    "galeri FitMuse",
    "wanita gym memikat",
    "koleksi foto kebugaran",
    "visual kebugaran premium",
    "galeri eksklusif",
    "kecantikan dan kekuatan",
    "koleksi FitMuse",
  ],

  openGraph: {
    title: "FitMuse Gallery - Global Fitness Allure & Seductive Visuals",
    description:
      "Explore the FitMuse Gallery — mesmerizing fitness muses, exclusive photos, and premium collections celebrating strength and sensuality. Available worldwide: English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia.",
    url: "https://www.fitmuse.club/gallery",
    siteName: "FitMuse",
    images: [
      {
        url: "https://www.fitmuse.club/fitmuse-preview.jpg",
        width: 1200,
        height: 630,
        alt: "FitMuse Gallery - Alluring Fitness Muses & Premium Visuals",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ja_JP", "ko_KR", "vi_VN", "id_ID"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FitMuse Gallery - Discover Alluring Fitness Muses",
    description:
      "Browse seductive fitness photo collections and premium gym visuals. FitMuse Gallery celebrates beauty, strength, and global allure.",
    images: ["https://www.fitmuse.club/fitmuse-preview.jpg"],
  },

  metadataBase: new URL("https://www.fitmuse.club"),
};

export default function GalleryPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
