import React from "react";
import Link from "next/link";
import { fetchPageData } from "@/actions/actions";
import { AboutPageFeatureItemProps } from "@/data/props";
import InitAOS from "@/components/InitAOS";
import PageTitle from "@/components/PageTitle";
import FeatureItem from "./components/FeatureItem";
import "./aboutPage.css";

export default async function Main() {
  const pageData = await fetchPageData("about");
  return (
    <>
      <InitAOS />
      <main className="main">
        <PageTitle page="about" />
        <section id="about" className="about section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row align-items-center justify-content-between g-lg-5">
              <div
                className="col-lg-6"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="image-wrapper">
                  <img
                    src={pageData?.coverImage?.url}
                    className="img-fluid rounded"
                    alt="About Us Image"
                  />
                </div>
              </div>

              <div
                className="col-lg-6"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="content">
                  <h2 className="mb-4">{pageData?.title}</h2>
                  <h5 className="mb-4">{pageData?.subtitle}</h5>
                  <p>{pageData?.description}</p>
                  <div
                    className="features-list mt-5"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="row g-4">
                      {pageData?.highlights?.map(
                        (item: AboutPageFeatureItemProps) => (
                          <FeatureItem key={item?.id} item={item} />
                        )
                      )}
                    </div>
                  </div>
                  <div className="mt-5" data-aos="fade-up" data-aos-delay="400">
                    <Link
                      href={pageData?.btnOne?.link}
                      className="btn btn-primary me-3"
                    >
                      {pageData?.btnOne?.name}
                    </Link>
                    <Link
                      href={pageData?.btnTwo?.link}
                      className="btn btn-outline-primary"
                    >
                      {pageData?.btnTwo?.name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
