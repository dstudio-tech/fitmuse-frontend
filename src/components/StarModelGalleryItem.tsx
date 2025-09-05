"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { GalleryModelItemProps } from "@/data/props";
import { useSignedMedia } from "@/hooks/useSignedMedia";
import "./starModelGalleryItem.css";
import { toast } from "react-toastify";
import {
  BackendUrlContext,
  FavouritesContext,
  UserContext,
} from "./SessionProvider";

export default function StarModelGalleryItem({
  item: model,
}: {
  item: GalleryModelItemProps;
}) {
  const protectedThumbnail = useSignedMedia(model?.thumbnail?.url);
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

  return (
    <div className="team-member">
      <div className="member-image">
        {protectedThumbnail && (
          <img
            src={protectedThumbnail}
            className="img-fluid"
            alt=""
            loading="lazy"
          />
        )}
        <div className="member-social">
          <Link target="_blank" href="#">
            <i className="bi bi-youtube"></i>
          </Link>
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
      <div className="member-content">
        <h3>{model?.name}</h3>
        <span>{model?.role}</span>
      </div>
    </div>
  );
}
