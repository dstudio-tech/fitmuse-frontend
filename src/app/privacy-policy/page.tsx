import React, { Suspense } from "react";
import Main from "./Main";
import Preloader from "@/components/Preloader";
import "./privacyPolicyPage.css";

export default function PrivacyPolicyPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <Main />
    </Suspense>
  );
}
