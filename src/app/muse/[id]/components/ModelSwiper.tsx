"use client";
import React from "react";
import { GalleryModelItemProps, ModelCoverSlideProps } from "@/data/props";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, EffectCreative } from "swiper/modules";
import { useBlobUrl } from "@/hooks/useBlobUrl";

// Child component so the hook runs at the top level (not inside a callback)
const SlideImage: React.FC<{ url: string; alt?: string }> = ({ url, alt }) => {
  const blobUrl = useBlobUrl(url); // ✅ hook usage is valid here
  if (!blobUrl) return null; // or a skeleton/placeholder if you prefer
  return (
    <img
      src={blobUrl}
      alt={alt ?? "Model Cover Image"}
      className="img-fluid"
      loading="lazy"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default function ModelSwiper({
  model,
}: {
  model: GalleryModelItemProps;
}) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        effect="creative"
        creativeEffect={{
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] },
        }}
        modules={[Autoplay, Navigation, EffectCreative]}
        loop
        className="portfolio-details-slider"
      >
        {(model?.coverSlides ?? []).map(
          (item: ModelCoverSlideProps, index: number) => (
            <SwiperSlide key={item?.url ?? index}>
              {item?.url ? (
                <SlideImage url={item.url} alt="Model Cover Image" />
              ) : null}
            </SwiperSlide>
          )
        )}
      </Swiper>

      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </>
  );
}
