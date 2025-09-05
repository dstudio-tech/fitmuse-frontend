import React, { Suspense } from "react";
import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Main from "./Main";

export const metadata: Metadata = {
  title: "FitMuse Gallery - Alluring Fitness Muses & Seductive Collections",
  description:
    "Explore the FitMuse Gallery: captivating gym muses, seductive photo collections, and premium visuals designed to inspire, allure, and fascinate. Unlock the full experience and discover beauty in motion.",
  keywords: [
    "FitMuse Gallery",
    "alluring fitness gallery",
    "seductive gym muses",
    "captivating fitness photos",
    "premium fitness visuals",
    "provocative workout galleries",
    "exclusive fitness content",
    "irresistible gym models",
    "sensual fitness collections",
    "magnetic fitness allure",
    "stunning fitness photography",
    "adult fitness galleries",
    "workout muses collection",
    "premium gym inspiration",
    "fitness beauty showcase",
  ],
};

export default function GalleryPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
