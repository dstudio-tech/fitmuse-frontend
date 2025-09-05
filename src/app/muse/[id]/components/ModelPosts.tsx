"use client";
import React from "react";
import Link from "next/link";
import CanvasImageWithGlightbox from "@/components/CanvasImageWithGlightbox";
import { PostItemProps } from "@/data/props";
import VideoWithLightbox from "@/components/VideoWithLightbox";
import Preloader from "@/components/Preloader";
import "./modelPosts.css";

export default function ModelPosts({ items }: { items: PostItemProps[] }) {
  return (
    <>
      <div className="row g-2 mt-3">
        {items && items.length > 0 ? (
          items.map((item: PostItemProps) =>
            item.type === "image" ? (
              <div key={item.id} className="col-4 col-lg-2 col-md-3 col-sm-4">
                <div className="position-relative">
                  <CanvasImageWithGlightbox
                    mediaUrl={item?.cover?.url}
                    className="img-fluid demo rounded"
                    documentId={item?.documentId}
                  />

                  {/* Bottom overlay bar */}
                  <div className="bottom-bar d-flex align-items-center justify-content-between px-2 py-2">
                    {/* Avatar + Name */}

                    <Link
                      href={`/muse/${item?.model?.documentId}`}
                      className="d-flex align-items-center text-decoration-none text-white"
                    >
                      <img
                        className="img-fluid rounded-4 avatar-img"
                        src={item?.model?.avatar?.url}
                        alt="Model Avatar"
                        referrerPolicy="no-referrer"
                      />
                      <span className="fw-semibold small">
                        {item?.model?.name}
                      </span>
                    </Link>

                    {/* Like / Heart */}
                    <a className="btn btn-sm btn-like p-0">
                      <i className="bi bi-heart"></i>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div key={item.id} className="col-4 col-lg-2 col-md-3 col-sm-4">
                <div className="position-relative">
                  <VideoWithLightbox
                    videoUrl={item?.cover?.url}
                    className="demo glightbox"
                    documentId={item?.documentId}
                  />

                  {/* Bottom overlay bar */}
                  <div className="bottom-bar d-flex align-items-center justify-content-between px-2 py-2">
                    {/* Avatar + Name */}

                    <a
                      href={`/muse/${item?.model?.documentId}`}
                      className="d-flex align-items-center text-decoration-none text-white"
                    >
                      <img
                        className="img-fluid rounded-4 avatar-img"
                        src={item?.model?.avatar?.url}
                        alt="Model Avatar"
                        referrerPolicy="no-referrer"
                      />
                      <span className="fw-semibold small">
                        {item?.model?.name}
                      </span>
                    </a>

                    {/* Like / Heart */}
                    <a className="btn btn-sm btn-like p-0">
                      <i className="bi bi-heart"></i>
                    </a>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <Preloader />
        )}
      </div>
    </>
  );
}
