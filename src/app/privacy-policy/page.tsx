import React, { Suspense } from "react";
import type { Metadata } from "next";
import Main from "./Main";
import Preloader from "@/components/Preloader";
import "./privacyPolicyPage.css";

export const metadata: Metadata = {
  title: "FitMuse Privacy Policy - Data Protection & User Rights",
  description:
    "Read the official FitMuse Privacy Policy. Learn how we collect, use, and protect your personal data, including Google Sign-In information, cookies, payment details, and your rights under the Australian Privacy Act and global privacy laws.",
  keywords: [
    "FitMuse privacy policy",
    "FitMuse data protection",
    "FitMuse user rights",
    "FitMuse Google Sign-In",
    "fitness website privacy",
    "premium content privacy",
    "FitMuse account security",
    "FitMuse cookies policy",
    "Australian Privacy Act compliance",
    "fitness app data privacy",
    "user data protection FitMuse",
    "privacy rights fitness platform",
    "FitMuse GDPR compliance",
    "fitness membership privacy",
    "FitMuse legal information",
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
