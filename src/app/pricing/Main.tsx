import React from "react";
import {
  fetchFaqData,
  fetchPricingData,
  fetchStatsSectionData,
} from "@/actions/actions";
import InitAOS from "@/components/InitAOS";
import PageTitle from "@/components/PageTitle";
import Pricing from "./sections/Pricing";
import Faq from "./sections/Faq";
import Stats from "./sections/Stats";

export default async function Main() {
  const pricingData = await fetchPricingData();
  const faqData = await fetchFaqData();
  const statsData = await fetchStatsSectionData();
  return (
    <>
      <InitAOS />
      <main className="main">
        <PageTitle page="pricing-page" />
        <Pricing cards={pricingData} />
        <Stats items={statsData} />
        <Faq faqs={faqData} />
      </main>
    </>
  );
}
