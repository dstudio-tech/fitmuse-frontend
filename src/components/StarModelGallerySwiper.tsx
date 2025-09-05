import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required swiper modules
import { Autoplay, Navigation } from "swiper/modules";
import { GalleryModelItemProps } from "@/data/props";
import StarModelGalleryItem from "./StarModelGalleryItem";
import Preloader from "./Preloader";

export default function StarModelGallerySwiper({
  models,
}: {
  models: GalleryModelItemProps[];
}) {
  return (
    <Swiper
      slidesPerView={1}
      speed={700}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      spaceBetween={30}
      navigation={{
        nextEl: ".team-next",
        prevEl: ".team-prev",
      }}
      breakpoints={{
        "576": {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        "992": {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        "1200": {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      modules={[Autoplay, Navigation]}
      loop={true}
      className="team-slider swiper init-swiper"
    >
      {models && models.length > 0 ? (
        models?.map((slide) => (
          <SwiperSlide key={slide.documentId}>
            <StarModelGalleryItem item={slide} />
          </SwiperSlide>
        ))
      ) : (
        <Preloader />
      )}
    </Swiper>
  );
}
