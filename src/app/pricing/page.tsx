import React, { Suspense } from "react";
import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Main from "./Main";
import "./pricingPage.css";

export const metadata: Metadata = {
  title: "FitMuse Pricing - Unlock Premium Fitness Allure",
  description:
    "Choose your FitMuse plan and unlock full access to alluring muses, seductive galleries, and exclusive videos. Explore flexible monthly and yearly memberships designed for true connoisseurs of beauty and strength.",
  keywords: [
    "FitMuse pricing",
    "FitMuse membership",
    "FitMuse plans",
    "premium fitness subscription",
    "alluring fitness membership",
    "seductive workout access",
    "exclusive fitness content pricing",
    "fitness subscription options",
    "provocative fitness plans",
    "yearly fitness membership",
    "monthly fitness subscription",
    "adult fitness platform pricing",
    "premium fitness allure",
    "unlock FitMuse",
    "fitness connoisseur membership",
  ],
};

export default function PricingPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
