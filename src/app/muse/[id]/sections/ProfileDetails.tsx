"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  BackendUrlContext,
  FavouritesContext,
  UserContext,
} from "@/components/SessionProvider";
import {
  GalleryModelItemProps,
  MetaDataProps,
  PostItemProps,
} from "@/data/props";
import ModelSwiper from "../components/ModelSwiper";
import Pagination from "@/components/Pagination";
import Preloader from "@/components/Preloader";
import PostMediaItem from "@/components/PostMediaItem";
import ShareSci from "@/components/ShareSci";
import "./profileDetails.css";
import { toast } from "react-toastify";

export default function ProfileDetails({
  id,
  model,
}: {
  id: string;
  model: GalleryModelItemProps;
}) {
  const { user, jwt } = useContext(UserContext);
  const backendUrl = useContext(BackendUrlContext);
  const [currentUrl, setCurrentUrl] = useState("");
  const [posts, setPosts] = useState<PostItemProps[]>();
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const [meta, setMeta] = useState<MetaDataProps>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    // access post media based on user access level
    const getPostItemsByModel = async (
      id: string,
      access: string = "free",
      page: number,
      pageSize: number
    ) => {
      if (jwt && access === "ultimate") {
        try {
          const response = await fetch(
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[model][documentId][$eq]=${id}&filters[isActive][$eq]=true&filters[type][$ne]=ads&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=publishedAt:desc`
          );
          const data = await response.json();
          setPosts(data.data);
          setMeta(data.meta);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      } else if (jwt && access === "premium") {
        try {
          const response = await fetch(
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[access][$ne]=ultimate&filters[isActive][$eq]=true&filters[isPremiumAds][$eq]=false&filters[model][documentId][$eq]=${id}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isActive][$eq]=true&sort[0]=publishedAt:desc`
          );
          const data = await response.json();
          setPosts(data.data);
          setMeta(data.meta);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      } else {
        try {
          const response = await fetch(
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[access][$eq]=free&filters[model][documentId][$eq]=${id}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isActive][$eq]=true&sort[0]=publishedAt:desc`
          );
          const data = await response.json();
          setPosts(data.data);
          setMeta(data.meta);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    getPostItemsByModel(id, user?.access || "free", currentPage, pageSize);
  }, [id, user, currentPage, pageSize]);

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
  };

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
    <section id="portfolio-details" className="portfolio-details section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-7" data-aos="fade-right">
            <div className="portfolio-details-media mb-3">
              <div className="main-image">
                <div
                  className="portfolio-details-slider swiper init-swiper"
                  data-aos="zoom-in"
                >
                  <ModelSwiper model={model} />
                </div>
              </div>

              <div
                className="thumbnail-grid"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="row g-3 mt-3">
                  {posts && posts.length > 0 ? (
                    posts?.map((post) => (
                      <PostMediaItem key={post.id} item={post} />
                    ))
                  ) : (
                    <Preloader />
                  )}
                </div>
              </div>
            </div>

            {posts && posts.length > 0 && (
              <Pagination
                pageCount={meta?.pagination?.pageCount}
                currentPage={currentPage}
                onPageChange={handleOnPageChange}
              />
            )}
          </div>

          <div className="col-lg-5" data-aos="fade-left">
            <div className="portfolio-details-content">
              <div className="project-meta">
                <div className="badge-wrapper d-flex justify-content-center justify-content-lg-start">
                  <span className="project-badge">{model?.style.name}</span>
                </div>
                <div className="date-client d-flex justify-content-center justify-content-lg-start">
                  <div className="meta-item">
                    <i className="bi bi-calendar-check"></i>
                    <span>
                      DOB:{" "}
                      {model?.dob
                        ? new Date(model?.dob).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : "N/A"}
                    </span>
                  </div>
                  <div className="meta-item">
                    <i className="bi bi-moon-stars-fill"></i>
                    <span>{model?.role}</span>
                  </div>
                </div>
              </div>

              <div className="row intro">
                <div className="col-lg-3 d-flex justify-content-center justify-content-lg-start">
                  <div className="model-image ">
                    <img
                      src={model?.avatar?.url}
                      alt="Model Avatar"
                      className="img-fluid rounded-4"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="col-lg-2 d-flex justify-content-center mt-4">
                  <a
                    className="like"
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
                </div>
                <div className="col-lg-7">
                  <h2 className="project-title">{model?.name}</h2>
                  <div className="project-website">
                    <i className="bi bi-link-45deg"></i>
                    <a href={model?.youtube} target="_blank">
                      {model?.youtube?.substring(0, 20)}
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-overview mt-2">
                <p className="lead">{model?.brief}</p>
              </div>
              <div
                className="project-features"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h3>
                  <i className="bi bi-stars"></i> Temptation Spots
                </h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <ul className="feature-list">
                      <li>
                        <i className="bi bi-check2-circle"></i> Irresistible
                        Allure
                      </li>
                      <li>
                        <i className="bi bi-check2-circle"></i> Seduction in
                        Motion
                      </li>
                      <li>
                        <i className="bi bi-check2-circle"></i> Sculpted
                        Elegance
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="feature-list">
                      <li>
                        <i className="bi bi-check2-circle"></i> Magnetic
                        Confidence
                      </li>
                      <li>
                        <i className="bi bi-check2-circle"></i> Premium Gallery
                      </li>
                      <li>
                        <i className="bi bi-check2-circle"></i> Exclusive Access
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="tech-stack-badges"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {model?.tags?.map((tag) => (
                  <span key={tag?.id}>{tag?.name}</span>
                ))}
              </div>

              <div
                className="cta-buttons"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {user?.access !== "ultimate" && (
                  <Link href="/pricing" className="btn-view-project">
                    Unveil Hidden Gallery
                  </Link>
                )}
                <Link href="/muse" className="btn-next-project">
                  Unveil More Muses <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
              <div
                className="share-section mt-5"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h3>
                  <i className="bi bi-share-fill"></i> Share Muse
                </h3>
                <ShareSci
                  title={`FitMuse (${model?.name} - ${model?.role})`}
                  currentUrl={currentUrl}
                  text={model?.brief}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
