"use client";
import React, { useContext, useEffect, useState } from "react";
import StarModelGallerySwiper from "@/components/StarModelGallerySwiper";
import { BackendUrlContext } from "@/components/SessionProvider";
import { GalleryModelItemProps } from "@/data/props";
import "./starsGallery.css";

export default function StarsGallery() {
  const backendUrl = useContext(BackendUrlContext);
  const [models, setModels] = useState<GalleryModelItemProps[]>([]);

  const fetchItemsData = () => {
    fetch(
      `${backendUrl}/api/authors?populate[0]=style&populate[1]=avatar&populate[2]=thumbnail&filters[isStar][$eq]=true&sort[0]=publishedAt:desc`
    )
      .then((res) => res.json())
      .then((data) => {
        setModels(data.data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchItemsData();
  }, []);

  return (
    <section id="team" className="team section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="team-header" data-aos="fade-up" data-aos-delay="200">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2>The Elite Collection</h2>
              <p>
                Step into the world of ultimate allure. These handpicked muses
                are featured in our most premium, members-only content —
                offering videos and photos you won&apos;t find anywhere else.
                Access the ultimate experience today.
              </p>
            </div>
            <div className="col-lg-6 d-flex justify-content-lg-end">
              <div className="team-controls">
                <button className="team-control-btn team-prev">
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button className="team-control-btn team-next">
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="team-slider swiper init-swiper"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <StarModelGallerySwiper models={models} />
        </div>
      </div>
    </section>
  );
}
