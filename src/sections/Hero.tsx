"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { ReactTyped } from "react-typed";
import { handleScrollTo } from "@/utils/utils";
import { BackendUrlContext } from "@/components/SessionProvider";
import { HeroSectionDataProps } from "@/data/props";
import Preloader from "@/components/Preloader";
import InitPopover from "@/components/InitPopover";
import "./hero.css";

// Setup Glightbox
// What one slide looks like (enough for video)
interface GLightboxElement {
  href: string;
  type: "video" | "inline" | "image";
  source?: "local" | "youtube" | "vimeo";
}

// Options we actually use
interface GlightboxOptions {
  elements: GLightboxElement[];
  skin?: "clean" | string;
  autoplayVideos?: boolean;
  openEffect?: "zoom" | "fade" | "none";
  closeEffect?: "zoom" | "fade" | "none";
  onOpen?: () => void;
  onClose?: () => void;
}

// Keep your return API
type LightboxAPI = { open: () => void; destroy: () => void };

// Make the ctor accept our options (we’ll assign to it after dynamic import)
type GlightboxCtor = (opts: GlightboxOptions) => LightboxAPI;

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
    import("glightbox").then((m) => {
      Glightbox = (m.default ?? m) as unknown as GlightboxCtor;
    });
  }, []);

  const handleVideoClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // if a user clicks before useEffect import finishes
    if (!Glightbox) {
      const m = await import("glightbox");
      Glightbox = (m.default ?? m) as unknown as GlightboxCtor;
    }
    if (!Glightbox) return;

    const lb = Glightbox({
      elements: [
        {
          href: hero?.videoBtn?.link ?? "",
          type: "video",
          source: "local", // "youtube" | "vimeo" if needed
        },
      ],
      skin: "clean",
      autoplayVideos: true,
      openEffect: "zoom",
      closeEffect: "zoom",
      onOpen: () => {
        // Tag only the live instance after DOM exists
        requestAnimationFrame(() => {
          document
            .querySelector(".glightbox-container")
            ?.setAttribute("data-fm-portrait", "true");
        });
      },
      onClose: () => {
        document
          .querySelector(".glightbox-container")
          ?.removeAttribute("data-fm-portrait");
      },
    });

    lb.open();
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
                    href="#"
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
