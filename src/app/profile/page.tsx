import Preloader from "@/components/Preloader";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import Main from "./Main";
import "./profilePage.css";

export const metadata: Metadata = {
  title: "FitMuse User Profile - Your Personal Fitness Journey",
  description:
    "Manage your FitMuse profile, explore your favorite muses, unlock exclusive galleries, and keep track of your premium membership. Your personal hub for beauty, strength, and allure.",
  keywords: [
    "FitMuse user profile",
    "my FitMuse account",
    "fitness membership dashboard",
    "premium fitness content profile",
    "manage FitMuse subscription",
    "personal fitness journey",
    "exclusive fitness content access",
    "user fitness hub",
    "alluring fitness favorites",
    "track fitness muses",
    "seductive fitness galleries",
    "FitMuse account settings",
    "adult fitness membership profile",
    "premium content management",
    "personal FitMuse space",
  ],
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
