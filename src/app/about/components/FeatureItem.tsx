import React from "react";
import { AboutPageFeatureItemProps } from "@/data/props";

export default function FeatureItem({
  item,
}: {
  item: AboutPageFeatureItemProps;
}) {
  return (
    <div className="col-md-6">
      <div className="feature-item">
        <i className={item?.icon}></i>
        <h5>{item?.name}</h5>
        <p>{item?.brief}</p>
      </div>
    </div>
  );
}
