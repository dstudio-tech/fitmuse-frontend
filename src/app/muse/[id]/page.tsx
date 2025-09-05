import React, { Suspense } from "react";
import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Main from "./Main";
import "./modelProfilePage.css";

// TODO: need to update this part with Muse detials by ID, keywords includes tags
export const metadata: Metadata = {
  title: "FitMuse Profile - Alluring Fitness Muse Spotlight",
  description:
    "Step inside the world of a FitMuse muse. Discover captivating portfolios, seductive galleries, and premium fitness content that showcase beauty, strength, and allure in every detail.",
  keywords: [
    "FitMuse profile",
    "fitness muse spotlight",
    "alluring gym muse",
    "seductive fitness model",
    "irresistible fitness portfolio",
    "exclusive fitness galleries",
    "captivating workout muse",
    "premium fitness content",
    "provocative fitness inspiration",
    "magnetic fitness allure",
    "sensual fitness showcase",
    "adult fitness muse",
    "stunning fitness beauty",
    "personal muse gallery",
    "FitMuse star profile",
  ],
};

export default async function ModelProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // id refer to model id, display model profile details
  return (
    <Suspense fallback={<Preloader />}>
      <Main id={id} />
    </Suspense>
  );
}
