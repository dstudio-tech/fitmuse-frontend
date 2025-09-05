import React from "react";
import { PricingItemProps } from "@/data/props";
import PricingItem from "../components/PricingItem";
import Preloader from "@/components/Preloader";

export default function Pricing({ cards }: { cards: PricingItemProps[] }) {
  return (
    <section id="pricing" className="pricing section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {cards && cards.length > 0 ? (
            cards.map((card, index) => (
              <PricingItem key={card.id} item={card} index={index} />
            ))
          ) : (
            <Preloader />
          )}
        </div>
      </div>
    </section>
  );
}
