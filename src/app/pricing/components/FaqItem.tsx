"use client";
import React from "react";
import { FaqItemProps } from "@/data/props";

export default function FaqItem({
  item,
  toggleActive,
}: {
  item: FaqItemProps;
  toggleActive: (id: number) => void;
}) {
  return (
    <div className={`faq-item ${item?.active ? "faq-active" : ""}`}>
      <h3 onClick={() => toggleActive(item?.id)}>{item?.question}</h3>
      <div className="faq-content">
        <p>{item?.answer}</p>
      </div>
      <i
        onClick={() => toggleActive(item?.id)}
        className="bi bi-plus faq-toggle"
      ></i>
    </div>
  );
}
