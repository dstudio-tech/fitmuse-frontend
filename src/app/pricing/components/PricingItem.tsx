"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PricingItemProps } from "@/data/props";
import PaymentLink from "./PaymentLink";

export default function PricingItem({
  item,
  index,
}: {
  item: PricingItemProps;
  index: number;
}) {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <div
      className="col-lg-4 col-md-6"
      data-aos="zoom-in"
      data-aos-delay={`${index + 1}00`}
    >
      <div className={`pricing-card ${item?.popular ? "popular" : undefined}`}>
        {item?.popular && <div className="popular-tag">Most Popular</div>}
        {isYearly && item?.name !== "Free Plan" && (
          <div className="discount-tag">{item?.discount}% OFF</div>
        )}
        <div className="plan-header">
          <div className="plan-icon">
            <Link href={item?.videoLink?.link || "#"}>
              {item?.name === "Free Plan" ? (
                <i className="bi-stars"></i>
              ) : item?.name === "Premium Plan" ? (
                <i className="bi-award"></i>
              ) : (
                <i className="bi-trophy"></i>
              )}
            </Link>
          </div>
          <h3>{item?.name}</h3>
          <p>{item?.description}</p>
        </div>
        <div className="d-flex justify-content-center align-items-center my-3">
          <span className="me-2 fw-semibold">Monthly</span>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchCheck"
              checked={isYearly}
              onChange={(e) => setIsYearly(e.target.checked)}
            />
          </div>
          <span className="ms-2 fw-semibold">Yearly</span>
        </div>
        <div className="plan-pricing">
          <div className="price">
            <span className="currency">A$</span>
            <span className="amount">
              {isYearly ? item?.yearlyPrice : item?.monthlyPrice}
            </span>
            <span className="period">/{isYearly ? "Year" : "Month"}</span>
          </div>
        </div>
        <div className="plan-features">
          <ul>
            {item?.pricingItem.map((item) => (
              <li key={item?.id}>
                {!item.included ? (
                  <i className="i bi-x-circle-fill"></i>
                ) : (
                  <i className="bi bi-check-circle-fill"></i>
                )}
                {item.brief}
              </li>
            ))}
          </ul>
        </div>
        <div className="plan-cta">
          <PaymentLink item={item} isYearly={isYearly} />
        </div>
      </div>
    </div>
  );
}
