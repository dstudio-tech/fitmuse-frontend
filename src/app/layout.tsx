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
  title: "FitMuse - Where Beauty Meets Strength",
  description:
    "Step into a world where beauty, strength, and allure collide. Explore irresistible workout shorts, stunning portfolios, and exclusive galleries designed to inspire and captivate.",
  keywords: [
    "FitMuse",
    "fitness muses",
    "workout shorts",
    "fitness galleries",
    "premium fitness content",
    "alluring fitness",
    "exclusive fitness videos",
    "alluring gym muses",
    "seductive fitness",
    "sensual workout",
    "sexy gym shorts",
    "provocative fitness content",
    "exclusive fitness galleries",
    "premium fitness videos",
    "irresistible workout shorts",
    "intimate fitness allure",
    "captivating fitness models",
    "adult fitness entertainment",
    "glamorous gym content",
    "allure and strength",
    "fitness passion",
    "desire and discipline",
    "magnetic fitness appeal",
    "seductive portfolios",
    "fitness connoisseur experience",
  ],
  openGraph: {
    title: "FitMuse - Fitness Meets Allure",
    description:
      "At FitMuse, we transform fitness into fascination. Unlock irresistible workout shorts, breathtaking galleries, and exclusive content designed to captivate and inspire.",
    url: "https://www.fitmuse.club",
    siteName: "FitMuse",
    images: [
      {
        url: "https://www.fitmuse.club/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FitMuse - Fitness Meets Allure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitMuse - Where Beauty Meets Strength",
    description:
      "Watch irresistible workout shorts, explore stunning portfolios, and unlock exclusive galleries crafted to inspire and captivate.",
    images: ["https://www.fitmuse.club/og-image.jpg"],
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
