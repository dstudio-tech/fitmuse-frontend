import React, { Suspense } from "react";
import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Main from "./Main";

export const metadata: Metadata = {
  title: "Contact FitMuse - Get in Touch",
  description:
    "Have questions or need support? Contact FitMuse for membership inquiries, partnership opportunities, or assistance with your account. We're here to help you explore our alluring fitness world.",
  keywords: [
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
  ],
};

export default function ContactPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
