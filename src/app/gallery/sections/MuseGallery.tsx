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
  const [pageSize, setPageSize] = useState("12");

  useEffect(() => {
    // access post media based on user access level
    const getPostItemsByAccess = async (
      access: string = "free",
      page: number,
      pageSize: string
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

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <section id="muse-gallery" className="muse-gallery-section section">
      <div className="container" data-aos="fade-up">
        <div className="g-4">
          <div className="row" data-aos="fade-up" data-aos-delay="200">
            <div className="gallery filter-wrapper">
              <form className="filter-form">
                <div className="row g-2 d-flex justify-content-between">
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
                  <div className="col-12 col-lg-2 form-group">
                    <div className="input-group filter-input-group">
                      <select
                        name="pageSize"
                        className="form-control filter-select"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        aria-label="Items perpage"
                      >
                        <option value="6">Unveil 6 / page</option>
                        <option value="12">Unveil 12 / page</option>
                        <option value="18">Unveil 18 / page</option>
                        <option value="24">Unveil 24 / page</option>
                      </select>
                      <span className="input-group-text">
                        <i className="bi bi-grid-3x3-gap"></i>
                      </span>
                    </div>
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
