"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { ReactTyped } from "react-typed";
import { handleScrollTo } from "@/utils/utils";
import { BackendUrlContext } from "@/components/SessionProvider";
import { HeroSectionDataProps } from "@/data/props";
import Preloader from "@/components/Preloader";
import InitPopover from "@/components/InitPopover";
import "./hero.css";

// ✅ Keep what you need strongly typed (the API you call)
type LightboxAPI = { open: () => void; destroy: () => void };
// ✅ Make ctor accept unknown so it's assignment-compatible with the lib
type GlightboxCtor = (opts: unknown) => LightboxAPI;
let Glightbox: GlightboxCtor | null = null;

export default function Hero() {
  const [hero, setHero] = useState<HeroSectionDataProps>();
  const backendUrl = useContext(BackendUrlContext);
  const fetchData = () => {
    fetch(`${backendUrl}/api/hero-section?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setHero(data.data);
      })
      .catch((e) => console.log(e.message));
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Dynamically import Glightbox only on client
    import("glightbox").then((module) => {
      Glightbox = module.default as unknown as GlightboxCtor;
    });
  }, []);

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault(); // stop Link navigation
    if (!Glightbox) return;

    Glightbox({
      elements: [
        {
          href: hero?.videoBtn?.link,
          type: "video",
          source: "local", // or "youtube"/"vimeo" if external
        },
      ],
      autoplayVideos: true,
      openEffect: "zoom",
      closeEffect: "zoom",
    }).open();
  };
  return (
    <>
      {hero ? (
        <section id="hero" className="hero section">
          <div className="container">
            <div className="hero-wrapper">
              <div className="hero-main-content text-center">
                <h1
                  className="hero-title"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  {hero?.title}
                  <br />
                  <ReactTyped
                    strings={hero?.typedWords.map((word) => word.value)}
                    typeSpeed={100}
                    backSpeed={50}
                    backDelay={2000}
                    loop
                    className="typed"
                  />
                </h1>

                <p
                  className="hero-description"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  {hero?.description}
                </p>

                <div
                  className="hero-actions"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <a
                    className="action-btn primary"
                    onClick={() => handleScrollTo(hero?.guideBtn?.link)}
                  >
                    <span>{hero?.guideBtn?.name}</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>

                  <Link
                    href={hero?.videoBtn?.link || "#"}
                    onClick={handleVideoClick}
                    className="action-btn secondary"
                  >
                    <i className="bi bi-play-circle"></i>
                    <span>{hero?.videoBtn.name}</span>
                  </Link>
                  <div className="company-badge">
                    <InitPopover />
                  </div>
                </div>

                <div
                  className="hero-image-showcase"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <div className="image-wrapper">
                    <img
                      src={hero?.bgImage.url}
                      className="img-fluid"
                      alt="Strategic Overview"
                    />
                    <div
                      className="floating-card card-1"
                      data-aos="fade-right"
                      data-aos-delay="600"
                    >
                      <div className="card-content">
                        <div className="card-icon">
                          <i className={hero?.leftStats.icon}></i>
                        </div>
                        <div className="card-info">
                          <h4>
                            <CountUp
                              start={0}
                              duration={hero?.leftStats.duration}
                              end={hero?.leftStats.end}
                            />
                            +
                          </h4>
                          <p>{hero?.leftStats.name}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="floating-card card-2"
                      data-aos="fade-left"
                      data-aos-delay="700"
                    >
                      <div className="card-content">
                        <div className="card-icon">
                          <i className={hero?.rightStats.icon}></i>
                        </div>
                        <div className="card-info">
                          <h4>
                            <CountUp
                              start={0}
                              duration={hero?.rightStats.duration}
                              end={hero?.rightStats.end}
                            />
                            +
                          </h4>
                          <p>{hero?.rightStats.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
