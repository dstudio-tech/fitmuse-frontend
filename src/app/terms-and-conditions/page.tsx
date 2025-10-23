import React, { Suspense } from "react";
import type { Metadata } from "next";
import Main from "./Main";
import Preloader from "@/components/Preloader";
import "./termsAndConditionsPage.css";

export const metadata: Metadata = {
  title: "FitMuse Terms & Conditions - Membership, Policy & User Agreement",
  description:
    "Review the official FitMuse Terms & Conditions. Understand membership rules, subscription policies, content rights, age restrictions, and your responsibilities as a valued user of our premium fitness and allure platform. Available in English, 日本語, 한국어, Tiếng Việt, and Bahasa Indonesia.",
  keywords: [
    // Core English
    "FitMuse terms and conditions",
    "FitMuse terms of service",
    "FitMuse membership policy",
    "FitMuse user agreement",
    "fitness subscription terms",
    "premium content usage rules",
    "adult fitness platform policies",
    "FitMuse age restriction",
    "FitMuse membership agreement",
    "billing and subscription terms",
    "fitness content rights",
    "legal fitness platform policies",
    "FitMuse guidelines",
    "user responsibilities FitMuse",
    "FitMuse legal information",
    "FitMuse refund policy",
    "FitMuse account rules",

    // Japanese (日本語)
    "FitMuse 利用規約",
    "メンバーシップ ポリシー",
    "利用者契約",
    "サブスクリプション規約",
    "年齢制限",
    "コンテンツ使用ルール",
    "法的情報",

    // Korean (한국어)
    "FitMuse 이용약관",
    "멤버십 정책",
    "이용자 계약",
    "구독 약관",
    "연령 제한",
    "콘텐츠 이용 규정",
    "법적 정보",

    // Vietnamese (Tiếng Việt)
    "điều khoản FitMuse",
    "chính sách hội viên",
    "thỏa thuận người dùng",
    "điều khoản đăng ký",
    "giới hạn độ tuổi",
    "quy tắc sử dụng nội dung",
    "thông tin pháp lý",

    // Indonesian (Bahasa Indonesia)
    "syarat dan ketentuan FitMuse",
    "kebijakan keanggotaan",
    "perjanjian pengguna",
    "ketentuan langganan",
    "batasan usia",
    "aturan penggunaan konten",
    "informasi hukum",
  ],

  openGraph: {
    title: "FitMuse - Terms & Conditions | Official Membership Policy",
    description:
      "Read FitMuse's official Terms & Conditions covering membership, subscriptions, and content usage. Learn your rights and responsibilities. Multilingual support: English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia.",
    url: "https://www.fitmuse.club/terms-and-conditions",
    siteName: "FitMuse",
    images: [
      {
        url: "https://www.fitmuse.club/fitmuse-preview.jpg",
        width: 1200,
        height: 630,
        alt: "FitMuse Terms and Conditions - Membership & Usage Policy",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ja_JP", "ko_KR", "vi_VN", "id_ID"],
    type: "article",
  },

  twitter: {
    card: "summary_large_image",
    title: "FitMuse Terms & Conditions - Legal Policy & Membership Rules",
    description:
      "Review FitMuse Terms of Service and membership rules. Understand your rights, responsibilities, and content usage policies as a FitMuse user.",
    images: ["https://www.fitmuse.club/fitmuse-preview.jpg"],
  },

  metadataBase: new URL("https://www.fitmuse.club"),
};

export default function TermsAndConditionsPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
