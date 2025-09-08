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
  const [meta, setMeta] = useState<MetaDataProps>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

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
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[isActive][$eq]=true&filters[type][$ne]=ads&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=views:desc`
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
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[access][$ne]=ultimate&filters[isActive][$eq]=true&filters[isPremiumAds][$eq]=false&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=views:desc`
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
            `${backendUrl}/api/articles?populate[model][populate][0]=avatar&populate=cover&filters[access][$eq]=free&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isActive][$eq]=true&sort[0]=views:desc`
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
  }, [user, currentPage, pageSize, backendUrl, jwt]);

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <section id="muse-gallery" className="muse-gallery-section section">
      <div className="container" data-aos="fade-up">
        <div className="g-4" data-aos="fade-up" data-aos-delay="300">
          <div className="row g-3 mt-3">
            {posts && posts.length > 0 ? (
              posts?.map((post) => <PostMediaItem key={post.id} item={post} />)
            ) : (
              <Preloader />
            )}
          </div>
          <div className="row mt-5">
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
