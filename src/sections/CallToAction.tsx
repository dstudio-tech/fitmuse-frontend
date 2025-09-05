import React from "react";
import Link from "next/link";
import { fetchCallToActionSectionData } from "@/actions/actions";
import "./callToAction.css";

export default async function CallToAction() {
  const sectionData = await fetchCallToActionSectionData();

  return (
    <section
      id="call-to-action"
      className="call-to-action section light-background"
    >
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="advertise-1 d-flex flex-column flex-lg-row gap-4 align-items-center position-relative">
          <div
            className="content-left flex-grow-1"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <span className="badge text-uppercase mb-2">
              {sectionData?.action}
            </span>
            <h2>{sectionData?.sectionTitle}</h2>
            <p className="my-4">{sectionData?.description}</p>

            <div className="features d-flex flex-wrap gap-3 mb-4">
              {sectionData?.featuredItemTags.map(
                (item: { id: number; name: string }) => (
                  <div key={item.id} className="feature-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>{item.name}</span>
                  </div>
                )
              )}
            </div>

            <div className="cta-buttons d-flex flex-wrap gap-3">
              <Link
                href={sectionData?.subscribeBtn?.link}
                className="btn btn-primary"
              >
                {sectionData?.subscribeBtn?.name}
              </Link>
              <Link
                href={sectionData?.viewMoreBtn?.link}
                className="btn btn-outline"
              >
                {sectionData?.viewMoreBtn?.name}
              </Link>
            </div>
          </div>

          <div
            className="content-right position-relative"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            {sectionData?.image?.url && (
              <img
                src={sectionData?.image.url}
                alt="Digital Platform"
                className="img-fluid rounded-4"
              />
            )}
            <div className="floating-card">
              <div className="card-icon">
                <i className={sectionData?.statsCard.icon}></i>
              </div>
              <div className="card-content">
                <span className="stats-number">
                  {sectionData?.statsCard.end}%
                </span>
                <span className="stats-text">
                  {sectionData?.statsCard.name}
                </span>
              </div>
            </div>
          </div>

          <div className="decoration">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
