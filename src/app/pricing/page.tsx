import React, { Suspense } from "react";
import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Main from "./Main";
import "./pricingPage.css";

export const metadata: Metadata = {
  title: "FitMuse Pricing - Unlock Premium Fitness Allure | Membership Plans",
  description:
    "Explore FitMuse membership plans and unlock premium access to alluring muses, seductive galleries, and exclusive fitness videos. Choose flexible monthly or yearly subscriptions — available in English, 日本語, 한국어, Tiếng Việt, and Bahasa Indonesia.",
  keywords: [
    // Core English
    "FitMuse pricing",
    "FitMuse membership",
    "FitMuse plans",
    "premium fitness subscription",
    "alluring fitness membership",
    "exclusive fitness content",
    "seductive workout access",
    "fitness subscription options",
    "provocative fitness plans",
    "monthly fitness membership",
    "yearly fitness subscription",
    "adult fitness platform pricing",
    "premium fitness allure",
    "unlock FitMuse",
    "fitness connoisseur membership",

    // Japanese (日本語)
    "FitMuse 料金",
    "フィットネス メンバーシップ",
    "プレミアム会員",
    "独占フィットネスコンテンツ",
    "ジム美女動画",
    "年間サブスクリプション",
    "月額メンバーシップ",

    // Korean (한국어)
    "FitMuse 가격",
    "피트니스 멤버십",
    "프리미엄 구독",
    "독점 피트니스 영상",
    "헬스 미녀 콘텐츠",
    "월간 구독",
    "연간 구독",

    // Vietnamese (Tiếng Việt)
    "Giá FitMuse",
    "thành viên FitMuse",
    "gói hội viên thể hình",
    "nội dung thể hình độc quyền",
    "video phòng gym quyến rũ",
    "gói đăng ký hàng tháng",
    "gói đăng ký hàng năm",

    // Indonesian (Bahasa Indonesia)
    "harga FitMuse",
    "keanggotaan FitMuse",
    "langganan premium",
    "konten kebugaran eksklusif",
    "video fitnes menarik",
    "langganan bulanan",
    "langganan tahunan",
  ],

  openGraph: {
    title: "FitMuse Pricing - Choose Your Premium Membership",
    description:
      "Select your FitMuse membership and experience global fitness allure. Enjoy full access to exclusive galleries, premium videos, and seductive muses. Available worldwide – English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia.",
    url: "https://www.fitmuse.club/pricing",
    siteName: "FitMuse",
    images: [
      {
        url: "https://www.fitmuse.club/fitmuse-preview.jpg",
        width: 1200,
        height: 630,
        alt: "FitMuse Pricing - Premium Fitness Membership Plans",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ja_JP", "ko_KR", "vi_VN", "id_ID"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FitMuse Pricing - Premium Fitness Membership",
    description:
      "Join FitMuse today and unlock premium fitness allure. Flexible monthly & yearly plans. English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia supported.",
    images: ["https://www.fitmuse.club/fitmuse-preview.jpg"],
  },

  alternates: {
    canonical: "https://www.fitmuse.club/pricing",
    languages: {
      "en-US": "/pricing",
      "ja-JP": "/ja/pricing",
      "ko-KR": "/ko/pricing",
      "vi-VN": "/vi/pricing",
      "id-ID": "/id/pricing",
    },
  },

  metadataBase: new URL("https://www.fitmuse.club"),
};

export default function PricingPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
