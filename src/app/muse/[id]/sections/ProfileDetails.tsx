"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { BackendUrlContext, UserContext } from "@/components/SessionProvider";
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
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[model][documentId][$eq]=${id}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isActive][$eq]=true&sort[0]=publishedAt:desc`
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
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[access][$ne]=ultimate&filters[model][documentId][$eq]=${id}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isActive][$eq]=true&sort[0]=publishedAt:desc`
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

              <div className="row">
                <div className="col-lg-4 d-flex justify-content-center justify-content-lg-start">
                  <div className="model-image ">
                    <img
                      src={model?.avatar?.url}
                      alt="Model Avatar"
                      className="img-fluid rounded-4"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="col-lg-8">
                  <h2 className="project-title">{model?.name}</h2>
                  <div className="project-website">
                    <i className="bi bi-link-45deg"></i>
                    <a href="#" target="_blank">
                      {model?.youtube}
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
