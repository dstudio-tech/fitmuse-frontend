"use client";
import React, { useContext, useEffect, useState } from "react";
import { BackendUrlContext, UserContext } from "@/components/SessionProvider";
import { MetaDataProps, PostItemProps } from "@/data/props";
import Pagination from "@/components/Pagination";
import PostMediaItem from "@/components/PostMediaItem";
import Preloader from "@/components/Preloader";
import "./museGallery.css";

export default function MuseGallery() {
  const { user, jwt } = useContext(UserContext);
  const backendUrl = useContext(BackendUrlContext);
  const [posts, setPosts] = useState<PostItemProps[]>();
  const [filter, setFilter] = useState("createdAt");
  const [meta, setMeta] = useState<MetaDataProps>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18;

  useEffect(() => {
    // access post media based on user access level
    const getPostItemsByAccess = async (
      access: string = "free",
      page: number,
      pageSize: number
    ) => {
      if (jwt && access === "ultimate") {
        try {
          const response = await fetch(
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[isActive][$eq]=true&filters[type][$ne]=ads&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=${filter}:desc`
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
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[access][$ne]=ultimate&filters[isActive][$eq]=true&filters[isPremiumAds][$eq]=false&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=${filter}:desc`
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
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[access][$eq]=free&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isActive][$eq]=true&sort[0]=${filter}:desc`
          );
          const data = await response.json();
          setPosts(data.data);
          setMeta(data.meta);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    getPostItemsByAccess(user?.access || "free", currentPage, pageSize);
  }, [user, currentPage, pageSize, backendUrl, jwt, filter]);

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <section id="muse-gallery" className="muse-gallery-section section">
      <div className="container" data-aos="fade-up">
        <div className="g-4">
          <div className="row" data-aos="fade-up" data-aos-delay="200">
            <div className="gallery filter-wrapper">
              <form className="filter-form">
                <div className="col-12 col-lg-3 form-group">
                  <div className="input-group filter-input-group">
                    <span className="input-group-text">
                      <i className="bi bi-collection"></i>
                    </span>
                    <select
                      name="filter"
                      className="form-control filter-select"
                      value={filter}
                      onChange={handleFilterChange}
                      aria-label="Order gallery by"
                    >
                      <option value="createdAt">Most Recent</option>
                      <option value="views">Most Views</option>
                      <option value="isPremiumAds">Premium Gallery</option>
                      <option value="isUltimateAds">Ultimate Gallery</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row g-3 mt-3" data-aos="fade-up" data-aos-delay="300">
            {posts && posts.length > 0 ? (
              posts?.map((post) => <PostMediaItem key={post.id} item={post} />)
            ) : (
              <Preloader />
            )}
          </div>
          <div className="row mt-5" data-aos="fade-up" data-aos-delay="400">
            <div className="col-lg-12 d-flex justify-content-center">
              {posts && posts.length > 0 && (
                <Pagination
                  pageCount={meta?.pagination?.pageCount}
                  currentPage={currentPage}
                  onPageChange={handleOnPageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
