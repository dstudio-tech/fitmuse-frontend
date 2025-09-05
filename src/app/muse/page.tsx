import React, { Suspense } from "react";
import type { Metadata } from "next";
import Main from "./Main";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "FitMuse Muses - Alluring Fitness Inspirations",
  description:
    "Meet the FitMuse muses: alluring fitness icons who embody beauty, strength, and seduction. Explore their captivating portfolios, seductive galleries, and exclusive content crafted to inspire and fascinate.",
  keywords: [
    "FitMuse Muses",
    "alluring fitness muses",
    "seductive gym muses",
    "fitness inspirations",
    "captivating fitness icons",
    "provocative fitness models",
    "irresistible workout muses",
    "exclusive fitness content",
    "sensual fitness allure",
    "magnetic gym personalities",
    "premium fitness portfolios",
    "adult fitness muses",
    "fitness beauty inspirations",
    "stunning gym models",
    "FitMuse icons",
  ],
};

export default function MusesPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
