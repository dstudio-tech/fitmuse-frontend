import React, { Suspense } from "react";
import type { Metadata } from "next";
import Main from "./Main";
import Preloader from "@/components/Preloader";
import "./privacyPolicyPage.css";

export const metadata: Metadata = {
  title: "FitMuse Privacy Policy - Data Protection, Security & User Rights",
  description:
    "Review the official FitMuse Privacy Policy. Understand how we collect, use, and safeguard your personal data — including Google Sign-In information, cookies, payment details, and membership records. Compliant with the Australian Privacy Act, GDPR, and global privacy standards. Available in English, 日本語, 한국어, Tiếng Việt, and Bahasa Indonesia.",
  keywords: [
    // Core English
    "FitMuse privacy policy",
    "FitMuse data protection",
    "FitMuse user rights",
    "FitMuse Google Sign-In",
    "fitness website privacy",
    "premium content privacy",
    "FitMuse account security",
    "FitMuse cookies policy",
    "Australian Privacy Act compliance",
    "fitness app data privacy",
    "user data protection FitMuse",
    "privacy rights fitness platform",
    "FitMuse GDPR compliance",
    "fitness membership privacy",
    "FitMuse legal information",
    "personal data handling",
    "data security policy",
    "fitness platform safety",

    // Japanese (日本語)
    "FitMuse プライバシーポリシー",
    "データ保護",
    "ユーザーの権利",
    "Google サインイン",
    "クッキーポリシー",
    "アカウントセキュリティ",
    "オーストラリア プライバシー法",
    "GDPR コンプライアンス",

    // Korean (한국어)
    "FitMuse 개인정보 보호정책",
    "데이터 보호",
    "사용자 권리",
    "Google 로그인",
    "쿠키 정책",
    "계정 보안",
    "호주 개인정보 보호법",
    "GDPR 준수",

    // Vietnamese (Tiếng Việt)
    "chính sách quyền riêng tư FitMuse",
    "bảo vệ dữ liệu",
    "quyền người dùng",
    "đăng nhập Google",
    "chính sách cookie",
    "bảo mật tài khoản",
    "tuân thủ luật quyền riêng tư của Úc",
    "tuân thủ GDPR",

    // Indonesian (Bahasa Indonesia)
    "kebijakan privasi FitMuse",
    "perlindungan data",
    "hak pengguna",
    "Google Sign-In",
    "kebijakan cookie",
    "keamanan akun",
    "kepatuhan Undang-Undang Privasi Australia",
    "kepatuhan GDPR",
  ],

  openGraph: {
    title: "FitMuse - Privacy Policy | Data Security & User Protection",
    description:
      "Learn how FitMuse protects your data — from Google Sign-In to payment privacy. Fully compliant with Australian Privacy Act and GDPR standards. Multilingual: English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia.",
    url: "https://www.fitmuse.club/privacy-policy",
    siteName: "FitMuse",
    images: [
      {
        url: "https://www.fitmuse.club/fitmuse-preview.jpg",
        width: 1200,
        height: 630,
        alt: "FitMuse Privacy Policy - Data Protection & User Rights",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ja_JP", "ko_KR", "vi_VN", "id_ID"],
    type: "article",
  },

  twitter: {
    card: "summary_large_image",
    title: "FitMuse Privacy Policy - Data Protection & Security Standards",
    description:
      "Understand how FitMuse collects, uses, and protects your personal data under the Australian Privacy Act and GDPR. Transparency you can trust.",
    images: ["https://www.fitmuse.club/fitmuse-preview.jpg"],
  },

  metadataBase: new URL("https://www.fitmuse.club"),
};

export default function PrivacyPolicyPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
