"use client";
import React, { useContext, useEffect, useState } from "react";
import { BackendUrlContext } from "@/components/SessionProvider";
import {
  GalleryFilterItemProps,
  GalleryModelItemProps,
  GallerySectionDataProps,
  MetaDataProps,
  SectionTitleProps,
} from "@/data/props";
import SectionTitle from "@/components/SectionTitle";
import GalleryModelItem from "@/components/GalleryModelItem";
import Preloader from "@/components/Preloader";
import Pagination from "@/components/Pagination";
import "./gallery.css";
import MediaItemLoader from "@/components/MediaItemLoader";

export default function Gallery({
  pageSize = 12,
  showSectionTitle = true,
}: {
  pageSize?: number;
  showSectionTitle?: boolean;
}) {
  const backendUrl = useContext(BackendUrlContext);

  const [gallerySectionData, setGallerySectionData] =
    useState<GallerySectionDataProps>();
  const [sectionTitle, setSectionTitle] = useState<SectionTitleProps>();
  const [filters, setFilters] = useState<GalleryFilterItemProps[]>([]);
  const [items, setItems] = useState<GalleryModelItemProps[]>([]);
  const [meta, setMeta] = useState<MetaDataProps>();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStyle, setCurrentStyle] = useState<string | undefined>("");

  const fetchGallerySectionData = () => {
    fetch(
      `${backendUrl}/api/gallery-section?populate[galleryFilter][populate][0]=style&populate=sectionTitle`
    )
      .then((res) => res.json())
      .then((data) => {
        setGallerySectionData(data.data);
        setSectionTitle(data.data.sectionTitle);
        setFilters(data.data.galleryFilter);
      })
      .catch((e) => console.log(e.message));
  };

  const fetchGalleryModelData = (
    style?: string,
    page?: number,
    pageSize?: number
  ) => {
    const query = `api/authors?populate[style]=true&populate[avatar]=true&populate[thumbnail]=true${
      style ? `&filters[style][slug][$eq]=${style}` : ""
    }&populate[postItems][filters][type][$ne]=ads&populate[postItems][sort][0]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`;
    fetch(`${backendUrl}/${query}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
        setMeta(data.meta);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchGallerySectionData();
  }, []);

  useEffect(() => {
    fetchGalleryModelData(undefined, currentPage, pageSize);
  }, []);

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
    fetchGalleryModelData(currentStyle, page, pageSize);
  };

  const handleFilterAcive = (id: number) => {
    const updatedFilter: GalleryFilterItemProps[] = filters?.map((filter) => {
      filter.active = false;
      if (filter.id === id) {
        filter.active = true;
      }
      return filter;
    });

    setFilters(updatedFilter);
  };

  const handleFilterChange = (id: number, style?: string) => {
    handleFilterAcive(id);
    setCurrentPage(1);
    style ? setCurrentStyle(style) : setCurrentStyle(undefined);
    fetchGalleryModelData(style, 1, pageSize);
  };

  return (
    <>
      {gallerySectionData ? (
        <section id="portfolio" className="portfolio section">
          {showSectionTitle && (
            <SectionTitle sectionTitleData={sectionTitle!} />
          )}

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <ul
              className="portfolio-filters"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {filters &&
                filters.map((item) => (
                  <li
                    key={item?.id}
                    data-filter={item?.style ? item?.style.slug : "*"}
                    className={item?.active ? "filter-active" : ""}
                    onClick={() =>
                      handleFilterChange(item?.id, item?.style?.slug)
                    }
                  >
                    <i
                      className={
                        item?.style ? item?.style.icon : "bi bi-grid-3x3"
                      }
                    ></i>{" "}
                    {item?.style ? item?.style.name : "All"}
                  </li>
                ))}
            </ul>

            <div className="row g-4" data-aos="fade-up" data-aos-delay="300">
              {items && items.length > 0 ? (
                items?.map((item) => (
                  <GalleryModelItem key={item.id} model={item} />
                ))
              ) : (
                <MediaItemLoader />
              )}
            </div>
            <div className="row mt-5">
              <div className="col-lg-12 d-flex justify-content-center">
                {items && items.length > 0 && (
                  <Pagination
                    pageCount={meta?.pagination?.pageCount}
                    currentPage={currentPage}
                    onPageChange={handleOnPageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Preloader />
      )}
    </>
  );
}
