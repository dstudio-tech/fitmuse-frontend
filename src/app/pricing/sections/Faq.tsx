"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaqItemProps } from "@/data/props";
import FaqItem from "../components/FaqItem";

export default function Faq({ faqs }: { faqs: FaqItemProps[] }) {
  const [faqItems, setFaqItems] = useState(faqs);

  const handleToggleFaqActive = (id: number) => {
    setFaqItems(
      faqItems.map((item) => {
        item.active = false;
        if (item.id === id) item.active = true;
        return item;
      })
    );
  };

  return (
    <section id="faq" className="faq section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-between">
          <div className="col-lg-8" data-aos="fade-right" data-aos-delay="200">
            <div className="faq-list">
              {faqItems?.map((faq) => (
                <FaqItem
                  key={faq.id}
                  item={faq}
                  toggleActive={handleToggleFaqActive}
                />
              ))}
            </div>
          </div>

          <div className="col-lg-4" data-aos="fade-left" data-aos-delay="200">
            <div className="faq-card">
              <i className="bi bi-chat-dots-fill"></i>
              <h3>Can&apos;t find answer to your question?</h3>
              <p>
                Don&apos;t worry — our team is always just a message away. At
                FitMuse, we believe every moment of curiosity deserves
                attention, and every question should lead you closer to the
                experience you truly desire. Reach out to us anytime, and
                we&apos;ll provide the clarity, guidance, and personal touch you
                need — so nothing stands between you and the muses waiting to
                captivate your world.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
