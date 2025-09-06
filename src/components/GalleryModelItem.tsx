"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { GalleryModelItemProps } from "@/data/props";
import {
  BackendUrlContext,
  FavouritesContext,
  UserContext,
} from "./SessionProvider";
// ✅ Keep what you need strongly typed (the API you call)
type LightboxAPI = { open: () => void; destroy: () => void };
// ✅ Make ctor accept unknown so it's assignment-compatible with the lib
type GlightboxCtor = (opts: unknown) => LightboxAPI;
let Glightbox: GlightboxCtor | null = null;

import "./galleryModelItem.css";
import MediaItemLoader from "./MediaItemLoader";

export default function GalleryModelItem({
  model,
  page,
}: {
  model: GalleryModelItemProps;
  page?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const backendUrl = useContext(BackendUrlContext);
  const { user, jwt } = useContext(UserContext);
  const { favourites, setFavourites } = useContext(FavouritesContext);

  const checkExistingFavourites = (modelId: number) => {
    return (
      favourites?.some((each: GalleryModelItemProps) => each?.id === modelId) ??
      false
    );
  };

  const getTargetFavouritesItem = (modelId: number) => {
    return user?.favourites?.find(
      (favourite) => favourite?.model?.id === modelId
    );
  };

  const handleAddToFavourites = async (modelId: number) => {
    if (!jwt) {
      toast("Join us by signing in to save this muse to your favourite.");
      return;
    }

    if (
      user?.access === "free" &&
      favourites?.length &&
      favourites?.length > 4
    ) {
      toast(
        "You've reached the 5-Muse limit on the Free plan! Upgrade now to add more Muses to your favourite."
      );
      return;
    }

    const email = user?.email;

    if (!checkExistingFavourites(model?.id)) {
      setFavourites([...favourites!, model]);
      try {
        await fetch(`${backendUrl}/api/favourites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: {
              email: email,
              model: {
                id: modelId,
              },
              user: {
                id: user.id,
              },
            },
          }),
        });

        toast("Nice pick! It's now in your favourite.");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast("This Muse is already in your favourite.");
    }
  };

  const handleRemoveFromFavourites = async (modelId: number) => {
    if (!jwt) {
      toast("Join us by signing in to remove this from your favourite.");
      return;
    }
    if (favourites)
      setFavourites(
        favourites?.filter((e: GalleryModelItemProps) => e?.id !== modelId)
      );
    try {
      await fetch("/api/favourite", {
        method: "DELETE",
        body: JSON.stringify({
          documentId: getTargetFavouritesItem(modelId)?.documentId,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Dynamically import Glightbox only on client
    import("glightbox").then((module) => {
      Glightbox = module.default as unknown as GlightboxCtor;
    });
  }, []);

  // Load image as blob and draw on canvas
  useEffect(() => {
    let revoked = false;

    const loadImage = async () => {
      try {
        const res = await fetch(
          `/api/get-signed-media?mediaPath=${encodeURIComponent(
            model.thumbnail.url
          )}`
        );
        if (!res.ok) throw new Error("Failed to fetch media");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (revoked) return;
        setBlobUrl(url);

        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = url;
      } catch (err) {
        console.error("Canvas load error", err);
      }
    };

    loadImage();

    return () => {
      revoked = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [model.thumbnail.url]);

  // Handle Glightbox click
  const handleClick = () => {
    if (!blobUrl) return;

    // @ts-expect-error Glightbox type definitions don't match actual API, safe to ignore
    const lightbox = Glightbox({
      elements: [
        {
          href: blobUrl,
          type: "image",
          title: model.name,
          description: model.hook,
        },
      ],
      onOpen: () => {
        // Wait a tick to ensure DOM is ready
        setTimeout(() => {
          const imgs = document.querySelectorAll(".gslide img");
          imgs.forEach((img) => {
            const image = img as HTMLImageElement;
            image.oncontextmenu = (e) => e.preventDefault(); // disable right click
            image.ondragstart = (e) => e.preventDefault(); // disable drag
          });
        }, 0);
      },
    });

    lightbox.open();
  };

  return (
    <div
      className={`col-6 ${
        page === "/profile" ? "col-xl-3" : "col-xl-2"
      } col-lg-3 col-md-4 portfolio-item isotope-item`}
    >
      {model.thumbnail.url ? (
        <article className="portfolio-entry">
          <figure className="entry-image">
            {blobUrl && (
              <canvas
                ref={canvasRef}
                className="img-fluid hero-gallery-img"
                onClick={handleClick}
                onContextMenu={(e) => e.preventDefault()} // disable right click
                style={{ cursor: "pointer" }}
                aria-label={`${model.name} Image`}
              />
            )}
            <div className="entry-overlay">
              <div className="overlay-content">
                <div className="entry-meta">{model?.name}</div>
                <h3 className="entry-title">{model?.role}</h3>
                <div className="entry-links">
                  {blobUrl && (
                    <a
                      type="button"
                      className="glightbox-trigger"
                      onClick={handleClick}
                      aria-label="Expand Image"
                    >
                      <i className="bi bi-arrows-angle-expand"></i>
                    </a>
                  )}
                  <a
                    onClick={
                      checkExistingFavourites(model?.id)
                        ? () => handleRemoveFromFavourites(model?.id)
                        : () => handleAddToFavourites(model?.id)
                    }
                  >
                    {checkExistingFavourites(model?.id) ? (
                      <i className="bi bi-heart-fill"></i>
                    ) : (
                      <i className="bi bi-heart"></i>
                    )}
                  </a>
                  <Link href={`/muse/${model?.documentId}`}>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </figure>
        </article>
      ) : (
        <MediaItemLoader />
      )}
    </div>
  );
}
