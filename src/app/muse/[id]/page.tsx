import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getModelItemDetailsData } from "@/actions/actions";
import Preloader from "@/components/Preloader";
import Main from "./Main";
import "./modelProfilePage.css";

// metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const model = await getModelItemDetailsData(id);

  // Use avatar URL if available, otherwise fall back
  const previewImage =
    model?.avatar?.url || "https://www.fitmuse.club/fitmuse-preview.jpg";

  return {
    title: `FitMuse - ${model?.name} (${model?.role || "Fitness Muse"})`,
    description:
      model?.brief ||
      `Discover ${model?.name}, one of FitMuse's captivating muses — where beauty meets strength.`,
    keywords: model?.tags?.map((tag: { name: string }) => tag?.name) || [
      "FitMuse",
      "fitness muse",
      "fitness model",
      "workout inspiration",
      "fitness beauty",
    ],
    openGraph: {
      title: `FitMuse Muse - ${model?.name} | Beauty, Strength & Allure`,
      description:
        model?.brief ||
        `Explore exclusive photos and galleries of ${model?.name} — FitMuse's global fitness inspiration.`,
      url: `https://www.fitmuse.club/muse/${id}`,
      siteName: "FitMuse",
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 630,
          alt: `${model?.name} - FitMuse Muse`,
        },
      ],
      locale: "en_US",
      alternateLocale: ["ja_JP", "ko_KR", "vi_VN", "id_ID"],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `FitMuse - ${model?.name} (${model?.role || "Muse"})`,
      description:
        model?.brief ||
        `See exclusive galleries and videos of ${model?.name}, a stunning FitMuse muse.`,
      images: [previewImage],
    },
    metadataBase: new URL("https://www.fitmuse.club"),
  };
}

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
