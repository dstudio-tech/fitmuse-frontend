import React, { Suspense } from "react";
import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Main from "./Main";

export const metadata: Metadata = {
  title: "Contact FitMuse - Support, Partnerships & Membership Assistance",
  description:
    "Reach out to FitMuse for membership assistance, collaboration opportunities, or account support. Our team is here to help you connect with the world of fitness, beauty, and allure. Available in English, 日本語, 한국어, Tiếng Việt, and Bahasa Indonesia.",
  keywords: [
    // Core English
    "Contact FitMuse",
    "FitMuse support",
    "FitMuse help center",
    "membership assistance",
    "FitMuse inquiries",
    "customer support fitness",
    "alluring fitness contact",
    "FitMuse partnerships",
    "fitness subscription help",
    "premium fitness content support",
    "contact gym muses",
    "FitMuse customer care",
    "adult fitness platform support",
    "FitMuse business inquiries",
    "brand collaborations FitMuse",
    "media contact FitMuse",
    "fitness brand partnership",
    "FitMuse feedback",

    // Japanese (日本語)
    "FitMuse お問い合わせ",
    "サポート",
    "メンバーシップ 問い合わせ",
    "パートナーシップ",
    "アカウント サポート",
    "フィットネス コンタクト",
    "ブランド コラボレーション",
    "カスタマーサービス",

    // Korean (한국어)
    "FitMuse 문의",
    "고객 지원",
    "회원 문의",
    "파트너십 제안",
    "계정 도움말",
    "피트니스 문의",
    "브랜드 협업",
    "고객센터",

    // Vietnamese (Tiếng Việt)
    "liên hệ FitMuse",
    "hỗ trợ khách hàng",
    "hỏi về hội viên",
    "hợp tác thương hiệu",
    "hỗ trợ tài khoản",
    "liên hệ phòng gym",
    "đối tác FitMuse",
    "trung tâm hỗ trợ",

    // Indonesian (Bahasa Indonesia)
    "hubungi FitMuse",
    "dukungan pelanggan",
    "pertanyaan keanggotaan",
    "kemitraan merek",
    "bantuan akun",
    "kontak kebugaran",
    "kerja sama FitMuse",
    "layanan pelanggan",
  ],

  openGraph: {
    title: "Contact FitMuse - We're Here to Help You Connect",
    description:
      "Get in touch with FitMuse for help, feedback, or partnerships. Our support team is ready to assist you with memberships, subscriptions, and collaborations. Multilingual support: English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia.",
    url: "https://www.fitmuse.club/contact",
    siteName: "FitMuse",
    images: [
      {
        url: "https://www.fitmuse.club/fitmuse-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Contact FitMuse - Support & Partnerships",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ja_JP", "ko_KR", "vi_VN", "id_ID"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact FitMuse - Membership & Partnership Support",
    description:
      "Need assistance or want to collaborate with FitMuse? Contact us for membership help, partnership inquiries, or technical support.",
    images: ["https://www.fitmuse.club/fitmuse-preview.jpg"],
  },

  metadataBase: new URL("https://www.fitmuse.club"),
};

export default function ContactPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
