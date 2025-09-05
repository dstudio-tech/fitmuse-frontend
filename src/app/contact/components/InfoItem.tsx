import React from "react";
import { ContactInfoItemProps } from "@/data/props";

export default function InfoItem({
  item,
  index,
}: {
  item: ContactInfoItemProps;
  index: number;
}) {
  return (
    <div
      className="info-item"
      data-aos="zoom-in"
      data-aos-delay={`${index + 2}00`}
    >
      <div className="info-icon">
        <i className={item?.icon}></i>
      </div>
      <div className="info-content">
        <h5>{item?.name}</h5>
        <p>{item?.details}</p>
      </div>
    </div>
  );
}
