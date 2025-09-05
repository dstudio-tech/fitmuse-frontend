import React from "react";
import { SectionTitleProps } from "@/data/props";

export default function SectionTitle({
  sectionTitleData,
}: {
  sectionTitleData: SectionTitleProps;
}) {
  return (
    <div className="container section-title" data-aos="fade-up">
      <h2>{sectionTitleData?.title}</h2>
      <div>
        <span>{sectionTitleData?.leadWords}</span>{" "}
        <span className="description-title">
          {sectionTitleData?.descriptionTitle}
        </span>
      </div>
    </div>
  );
}
