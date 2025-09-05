import React, { Suspense } from "react";
import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Main from "./Main";

export const metadata: Metadata = {
  title: "About FitMuse - Beauty, Strength & Allure",
  description:
    "Discover the vision behind FitMuse. We combine fitness, beauty, and seduction to create captivating workout shorts, alluring galleries, and exclusive premium content. Learn more about our mission to transform fitness into fascination.",
  keywords: [
    "About FitMuse",
    "FitMuse vision",
    "alluring fitness muses",
    "seductive fitness content",
    "sensual workout experience",
    "exclusive fitness galleries",
    "premium fitness videos",
    "provocative fitness inspiration",
    "beauty and strength in fitness",
    "fitness allure",
    "magnetic fitness models",
    "irresistible gym muses",
    "captivating workout shorts",
    "adult fitness entertainment",
    "fitness and seduction",
  ],
};

export default function AboutPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
