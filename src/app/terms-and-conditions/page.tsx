import React, { Suspense } from "react";
import type { Metadata } from "next";
import Main from "./Main";
import Preloader from "@/components/Preloader";
import "./termsAndConditionsPage.css";

export const metadata: Metadata = {
  title: "FitMuse Terms and Conditions - Membership & Usage Policy",
  description:
    "Read the official FitMuse Terms and Conditions. Learn about membership rules, subscription policies, content usage, age restrictions, and your rights as a user of our premium fitness platform.",
  keywords: [
    "FitMuse terms and conditions",
    "FitMuse terms of service",
    "FitMuse membership policy",
    "FitMuse user agreement",
    "fitness subscription terms",
    "premium content usage rules",
    "adult fitness platform policies",
    "FitMuse age restriction",
    "FitMuse membership agreement",
    "billing and subscription terms",
    "fitness content rights",
    "legal fitness platform policies",
    "FitMuse guidelines",
    "user responsibilities FitMuse",
    "FitMuse legal information",
  ],
};

export default function TermsAndConditionsPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
