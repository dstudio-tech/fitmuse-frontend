"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { PricingItemProps } from "@/data/props";
import { UserContext } from "@/components/SessionProvider";

export default function PaymentLink({
  item,
  isYearly,
}: {
  item: PricingItemProps;
  isYearly: boolean;
}) {
  const { jwt } = useContext(UserContext);
  const paymentLink = isYearly
    ? item?.yearlyPaymentLink?.link
    : item?.monthlyPaymentLink?.link;

  const paymentName = isYearly
    ? item?.yearlyPaymentLink?.name
    : item?.monthlyPaymentLink?.name;

  const handleClickBtn = (paymentLink: string) => {
    if (paymentLink) {
      localStorage.setItem("stripePaymentLink", paymentLink);
    } else {
      return;
    }
  };
  return (
    <>
      {jwt ? (
        <Link
          href="/profile"
          className="btn-plan"
          onClick={() => handleClickBtn(paymentLink)}
        >
          {paymentName} <i className="bi bi-arrow-right"></i>
        </Link>
      ) : (
        <a
          data-bs-toggle="modal"
          data-bs-target="#signInModal"
          className="btn-plan"
        >
          {paymentName}
        </a>
      )}
    </>
  );
}
