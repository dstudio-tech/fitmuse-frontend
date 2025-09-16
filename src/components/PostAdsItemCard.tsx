"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PostItemProps } from "@/data/props";
import MediaItemLoader from "./MediaItemLoader";
import "./postAdsItemCard.css";

export default function PostAdsItemCard({ item }: { item: PostItemProps }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  useEffect(() => {
    let objectUrl: string | null = null;

    const loadImage = async () => {
      try {
        if (!item.cover?.url) return;

        // 1) First: try your signed media route
        const signedRes = await fetch(
          `/api/get-signed-media?mediaPath=${encodeURIComponent(
            item.cover.url
          )}`
        );

        let blob: Blob | null = null;

        if (signedRes.ok) {
          // If API proxies the file (image/* in response)
          blob = await signedRes.blob();
        } else {
          // 2) Fallback: fetch the image directly
          const directRes = await fetch(item.cover.url);
          if (!directRes.ok) throw new Error("Failed to fetch media");
          blob = await directRes.blob();
        }

        objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
      } catch (err) {
        console.error("PostAdsItemCard image load error:", err);
        setBlobUrl(null);
      }
    };

    loadImage();

    // cleanup
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [item.cover?.url]);

  return (
    <div className="col-4 col-lg-2 col-md-3 col-sm-4">
      <div className="position-relative">
        {blobUrl ? (
          <article className="fm-card">
            <div className="fm-media">
              <img src={blobUrl} alt="Ads Content" className="fm-img" />
            </div>

            <div className="fm-overlay">
              <div className="fm-overlay-content">
                {item?.model?.avatar?.url && (
                  <img
                    src={item?.model?.avatar?.url}
                    alt={item.model?.name || item.title}
                    className={`fm-avatar ${
                      item?.isPremiumAds ? "premium" : "ultimate"
                    }`}
                  />
                )}
                <Link
                  href={`/muse/${item?.model?.documentId}`}
                  className="fm-name"
                >
                  {item.model?.name || item.title}
                </Link>

                <Link
                  href="/pricing"
                  type="button"
                  className={`fm-btn ${
                    item?.isPremiumAds ? "premium" : "ultimate"
                  }`}
                >
                  {item?.isPremiumAds && "Premium"}
                  {item?.isUltimateAds && "Ultimate"}
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <MediaItemLoader />
        )}
      </div>
    </div>
  );
}
