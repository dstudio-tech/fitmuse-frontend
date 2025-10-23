import Preloader from "@/components/Preloader";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import Main from "./Main";
import "./profilePage.css";

export const metadata: Metadata = {
  title: "FitMuse Profile - Your Personal Hub for Beauty, Strength & Allure",
  description:
    "Access and manage your FitMuse profile — explore your favorite muses, unlock exclusive galleries, and track your premium membership. Your private space to celebrate fitness, elegance, and allure. Available in English, 日本語, 한국어, Tiếng Việt, and Bahasa Indonesia.",
  keywords: [
    // Core English
    "FitMuse user profile",
    "my FitMuse account",
    "fitness membership dashboard",
    "premium fitness content profile",
    "manage FitMuse subscription",
    "personal fitness journey",
    "exclusive fitness content access",
    "user fitness hub",
    "alluring fitness favorites",
    "track fitness muses",
    "seductive fitness galleries",
    "FitMuse account settings",
    "adult fitness membership profile",
    "premium content management",
    "personal FitMuse space",
    "fitness portfolio",
    "subscription management",
    "member dashboard",

    // Japanese (日本語)
    "FitMuse プロフィール",
    "マイアカウント",
    "フィットネス メンバーシップ",
    "独占コンテンツ",
    "個人ページ",
    "ジム美女",
    "フィットネス ギャラリー",

    // Korean (한국어)
    "FitMuse 프로필",
    "내 계정",
    "피트니스 멤버십",
    "독점 콘텐츠",
    "개인 피트니스 공간",
    "체육관 미녀",
    "갤러리 관리",

    // Vietnamese (Tiếng Việt)
    "hồ sơ FitMuse",
    "tài khoản của tôi",
    "hội viên thể hình",
    "nội dung độc quyền",
    "trang cá nhân thể hình",
    "nàng thơ phòng gym",
    "bộ sưu tập quyến rũ",

    // Indonesian (Bahasa Indonesia)
    "profil FitMuse",
    "akun saya",
    "keanggotaan kebugaran",
    "konten eksklusif",
    "ruang pribadi kebugaran",
    "wanita gym cantik",
    "galeri kebugaran",
  ],

  openGraph: {
    title: "FitMuse Profile - Manage Your Fitness Allure & Membership",
    description:
      "Customize your FitMuse experience — manage your account, access premium content, and connect with your favorite muses. Multilingual support: English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia.",
    url: "https://www.fitmuse.club/profile",
    siteName: "FitMuse",
    images: [
      {
        url: "https://www.fitmuse.club/fitmuse-preview.jpg",
        width: 1200,
        height: 630,
        alt: "FitMuse Profile - Personal Fitness Hub",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ja_JP", "ko_KR", "vi_VN", "id_ID"],
    type: "profile",
  },

  twitter: {
    card: "summary_large_image",
    title: "FitMuse Profile - Your Personal Fitness Hub",
    description:
      "Manage your FitMuse account, explore exclusive galleries, and follow your favorite muses. Celebrate beauty, strength, and allure — all in one place.",
    images: ["https://www.fitmuse.club/fitmuse-preview.jpg"],
  },

  metadataBase: new URL("https://www.fitmuse.club"),
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
