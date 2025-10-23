// import Icons
import "bootstrap-icons/font/bootstrap-icons.css";
// import bootstrap
import "bootstrap/dist/css/bootstrap.css";
// import glightbox
import "glightbox/dist/css/glightbox.css";
// import aos css
import "aos/dist/aos.css";
// import react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import SessionProvider from "@/components/SessionProvider";
import ImportBS5JS from "@/components/ImportBS5JS";
import Header from "@/sections/Header";
import Preloader from "@/components/Preloader";
import ScrollUpBtn from "@/components/ScrollUpBtn";
import Footer from "@/sections/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitMuse - Where Beauty Meets Strength | Premium Fitness & Allure",
  description:
    "Discover FitMuse, the global hub where beauty meets strength. Explore irresistible workout shorts, captivating fitness muses, exclusive videos, and premium galleries that inspire confidence and sensuality. Available in English, 日本語, 한국어, Tiếng Việt, and Bahasa Indonesia.",
  keywords: [
    // Core Brand & Concept
    "FitMuse",
    "fitness muses",
    "fitness models",
    "workout inspiration",
    "fit girls",
    "fitness allure",
    "beauty and strength",
    "premium fitness content",
    "exclusive fitness videos",
    "fitness photography",
    // Descriptive & Emotional
    "sexy workout",
    "seductive gym muses",
    "sensual fitness",
    "alluring gym models",
    "irresistible fitness allure",
    "intimate workout style",
    "captivating fitness videos",
    "glamorous gym looks",
    "elite fitness experience",
    "strong and beautiful",
    // Regional language keywords
    "フィットネスモデル", // Japanese: fitness model
    "ジム美女", // Japanese: gym beauty
    "운동 미녀", // Korean: fitness beauty
    "피트니스 여신", // Korean: fitness goddess
    "cô gái thể hình quyến rũ", // Vietnamese: alluring fitness girl
    "nữ thần phòng gym", // Vietnamese: gym goddess
    "wanita fitnes cantik", // Indonesian: beautiful fitness woman
    "model kebugaran", // Indonesian: fitness model
    "video fitnes premium",
    "galeri kebugaran eksklusif",
    // Lifestyle & Discovery
    "fitness lifestyle",
    "premium fitness galleries",
    "exclusive content platform",
    "global fitness community",
    "strength and allure",
    "body confidence",
    "female empowerment",
    "fitness passion",
  ],
  openGraph: {
    title: "FitMuse - Global Fitness Allure | Explore, Inspire, Captivate",
    description:
      "Experience FitMuse, the world's most alluring fitness destination. Browse exclusive workout videos, glamorous fitness portfolios, and premium galleries celebrating strength, sensuality, and style. Available worldwide – English, 日本語, 한국어, Tiếng Việt, Bahasa Indonesia.",
    url: "https://www.fitmuse.club",
    siteName: "FitMuse",
    images: [
      {
        url: "https://www.fitmuse.club/fitmuse-preview.jpg",
        width: 1200,
        height: 630,
        alt: "FitMuse - Global Fitness Allure and Premium Fitness Inspiration",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ja_JP", "ko_KR", "vi_VN", "id_ID"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitMuse - Beauty, Strength & Global Fitness Allure",
    description:
      "Watch exclusive fitness muses and captivating gym models. Explore premium workout videos, alluring galleries, and global fitness inspiration — FitMuse connects strength with sensuality.",
    images: ["https://www.fitmuse.club/fitmuse-preview.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://www.fitmuse.club"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  return (
    <Suspense fallback={<Preloader />}>
      <html lang="en" suppressHydrationWarning>
        <ImportBS5JS />
        <SessionProvider jwt={jwt} backendUrl={process.env.BACKEND_URL!}>
          <body className="index-page">
            <Header />
            <ToastContainer />
            {children}
            <Footer />
            <ScrollUpBtn />
          </body>
        </SessionProvider>
      </html>
    </Suspense>
  );
}
