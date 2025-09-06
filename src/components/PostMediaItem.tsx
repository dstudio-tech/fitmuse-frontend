"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { PostItemProps } from "@/data/props";
import VideoWithLightbox from "./VideoWithLightbox";
import CanvasImageWithGlightbox from "./CanvasImageWithGlightbox";
import "./postMediaItem.css";
import {
  BackendUrlContext,
  CollectionsContext,
  UserContext,
} from "./SessionProvider";

export default function PostMediaItem({ item }: { item: PostItemProps }) {
  const backendUrl = useContext(BackendUrlContext);
  const { user, jwt } = useContext(UserContext);
  const { collections, setCollections } = useContext(CollectionsContext);

  const checkExistingCollection = (itemId: number) => {
    return (
      collections?.some((each: PostItemProps) => each?.id === itemId) ?? false
    );
  };

  const getTargetCollectionItem = (itemId: number) => {
    return user?.collections?.find(
      (collection) => collection?.post_item?.id === itemId
    );
  };

  const handleAddToCollections = async (itemId: number) => {
    if (!jwt) {
      toast("Join us by signing in to save this to your collection.");
      return;
    }

    if (
      user?.access === "free" &&
      collections?.length &&
      collections?.length > 9
    ) {
      toast(
        "You've reached the 10-Media limit on the Free plan! Upgrade now to add more media to your collection."
      );
      return;
    }

    const email = user?.email;

    if (!checkExistingCollection(item?.id)) {
      setCollections([...collections!, item]);
      try {
        await fetch(`${backendUrl}/api/collections`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: {
              email: email,
              post_item: {
                id: itemId,
              },
              user: {
                id: user.id,
              },
            },
          }),
        });
        toast("Nice pick! It's now in your collection.");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast("This media is already in your collections.");
    }
  };

  const handleRemoveFromCollections = async (itemId: number) => {
    if (!jwt) {
      toast("Join us by signing in to remove this from your collection.");
      return;
    }
    if (collections)
      setCollections(
        collections?.filter((e: PostItemProps) => e?.id !== itemId)
      );
    try {
      await fetch("/api/collection", {
        method: "DELETE",
        body: JSON.stringify({
          documentId: getTargetCollectionItem(itemId)?.documentId,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {item.type === "image" ? (
        <div key={item.id} className="col-4 col-lg-2 col-md-3 col-sm-4">
          <div className="position-relative">
            <CanvasImageWithGlightbox
              mediaUrl={item?.cover?.url}
              className="img-fluid demo"
              documentId={item?.documentId}
            />

            {/* Bottom overlay bar */}
            <div className="bottom-bar d-flex align-items-center justify-content-between px-1 py-1">
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
                <span className="fw-semibold small">{item?.model?.name}</span>
              </Link>

              {/* Like / Heart */}
              <a
                className="btn btn-sm btn-like p-0"
                onClick={
                  checkExistingCollection(item?.id)
                    ? () => handleRemoveFromCollections(item?.id)
                    : () => handleAddToCollections(item?.id)
                }
              >
                {checkExistingCollection(item?.id) ? (
                  <i className="bi bi-heart-fill"></i>
                ) : (
                  <i className="bi bi-heart"></i>
                )}
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
            <div className="bottom-bar d-flex align-items-center justify-content-between px-1 py-1">
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
                <span className="fw-semibold small">{item?.model?.name}</span>
              </a>

              {/* Like / Heart */}
              <a
                className="btn btn-sm btn-like p-0"
                onClick={
                  checkExistingCollection(item?.id)
                    ? () => handleRemoveFromCollections(item?.id)
                    : () => handleAddToCollections(item?.id)
                }
              >
                {checkExistingCollection(item?.id) ? (
                  <i className="bi bi-heart-fill"></i>
                ) : (
                  <i className="bi bi-heart"></i>
                )}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
