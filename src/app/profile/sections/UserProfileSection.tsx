"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import required swiper modules
import { Autoplay } from "swiper/modules";
import {
  CollectionsContext,
  FavouritesContext,
  UserContext,
} from "@/components/SessionProvider";
import PostMediaItem from "@/components/PostMediaItem";
import StarModelGalleryItem from "@/components/StarModelGalleryItem";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/utils";
import { PostItemProps, UserProfilePageDataProps } from "@/data/props";
import CancellationModal from "@/components/CancellationModal";

export default function UserProfileSection({
  pageData,
}: {
  pageData: UserProfilePageDataProps;
}) {
  const router = useRouter();
  const { user, jwt } = useContext(UserContext);
  const { collections } = useContext(CollectionsContext);
  const { favourites } = useContext(FavouritesContext);
  const [items, setItems] = useState<PostItemProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const pageCount = collections && Math.ceil(collections?.length / pageSize);

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (collections) {
      setItems(paginate(collections, currentPage, pageSize));
    }
  }, [collections, currentPage]);

  useEffect(() => {
    if (!jwt) {
      toast(
        "Unlock the temptation — your exclusive access begins with signin."
      );
      router.push("/");
    }
  }, [jwt, router]);

  useEffect(() => {
    const stripePaymentLink = localStorage.getItem("stripePaymentLink");
    if (jwt && user && stripePaymentLink) {
      localStorage.removeItem("stripePaymentLink");
      router.push(
        stripePaymentLink +
          `?locked_prefilled_email=${user.email}&client_reference_id=${user.id}`
      );
    }
  }, [user, jwt, router]);

  // Need to trigger to modal to double confirm cancellation
  const cancelSubscription = async (
    subscriptionId: string | null | undefined,
    userId: number
  ) => {
    if (!jwt) return;
    try {
      const res = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId, userId }),
      });
      if (!res.ok) {
        toast.error("Failed to cancel subscription");
      } else {
        toast(
          "Your subscription will be cancelled, but great news, you'll still get to enjoy your service until the end of your current period!"
        );
        // wait 2s so user sees toast before reload
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      return await res.json();
    } catch (error) {
      console.error("Cancel subscription error:", error);
      toast.error("Server Error: Failed to cancel subscription");
    }
  };

  return (
    <>
      <section id="service-details" className="service-details section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-5">
            <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
              <div className="service-hero">
                {user?.access === "free" ? (
                  <img
                    src={pageData?.freePlanCoverImg?.url}
                    alt="freePlanCoverImg"
                    className="img-fluid user-profile-cover-img"
                  />
                ) : user?.access === "premium" ? (
                  <img
                    src={pageData?.premiumPlanCoverImg?.url}
                    alt="premiumPlanCoverImg"
                    className="img-fluid"
                  />
                ) : (
                  <img
                    src={pageData?.ultimatePlanCoverImg?.url}
                    alt="ultimatePlanCoverImg"
                    className="img-fluid"
                  />
                )}
                <div className="service-badge">
                  <span>
                    {user?.access === "free"
                      ? "Free Plan"
                      : user?.sale?.service?.name}
                  </span>
                </div>
              </div>

              <div className="service-content">
                <div className="service-gallery" data-aos="fade-up">
                  <h4>Your Favourite Muses ({favourites?.length})</h4>
                  <div className="model-slider">
                    {favourites && favourites?.length > 0 ? (
                      <Swiper
                        slidesPerView={2}
                        speed={700}
                        autoplay={{
                          delay: 5000,
                          disableOnInteraction: false,
                        }}
                        spaceBetween={10}
                        breakpoints={{
                          "576": {
                            slidesPerView: 2,
                            spaceBetween: 10,
                          },
                          "992": {
                            slidesPerView: 3,
                            spaceBetween: 20,
                          },
                          "1200": {
                            slidesPerView: 4,
                            spaceBetween: 20,
                          },
                        }}
                        modules={[Autoplay]}
                        loop={true}
                        className="swiper init-swiper"
                      >
                        {favourites?.map((model) => (
                          <SwiperSlide key={model.id}>
                            <StarModelGalleryItem item={model} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div>
                        <Link href="/muse" className="btn-view-project">
                          Discover More Muses
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="service-gallery" data-aos="fade-up">
                  <h4>Your Media Collection ({collections?.length})</h4>
                  <div className="row gy-3">
                    {items && items?.length > 0 ? (
                      items?.map((item) => {
                        if (item) {
                          return (
                            <PostMediaItem key={item?.documentId} item={item} />
                          );
                        }
                      })
                    ) : (
                      <div>
                        <Link href="/gallery" className="btn-view-project">
                          Explore the Galleries
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      <Pagination
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onPageChange={handleOnPageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="400">
              <div className="service-sidebar">
                <div className="service-menu">
                  <h4>Your Subscription Plan</h4>
                  <div className="menu-list">
                    <Link href="/pricing" className="menu-item active">
                      <i className="bi bi-arrow-right"></i>
                      <span>
                        {user?.access === "free"
                          ? "Free Plan"
                          : user?.sale?.service?.name}
                      </span>
                    </Link>
                  </div>
                  <p className="mt-3">
                    {user?.access === "free"
                      ? "Access to a rotating selection of free muses, add up to 10 posts to your Liked Collection, no access to premium and ultimate galleries & videos."
                      : user?.sale?.service?.description}
                  </p>
                </div>
                <div className="service-info">
                  <h4>Plan Details</h4>
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-label">Start Date:</span>
                      <span className="info-value">
                        {user?.sale?.startDate
                          ? new Date(user.sale.startDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )
                          : new Date(user?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">End Date:</span>
                      <span className="info-value">
                        {user?.sale?.endDate
                          ? new Date(user.sale.endDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )
                          : "Permanent"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Upgrade:</span>
                      {user?.access !== "ultimate" ? (
                        <Link href="/pricing" className="menu-item active">
                          <i className="bi bi-arrow-right"></i>
                          <span>Upgrade your plan</span>
                        </Link>
                      ) : (
                        <span className="text-danger">
                          You&apos;ve unlocked the Peak Plan
                        </span>
                      )}
                    </div>
                    <div className="info-item">
                      <span className="info-label">Cancel:</span>
                      {user?.access !== "free" ? (
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#cancellationModal"
                          className="menu-item"
                        >
                          <i className="bi bi-arrow-right text-secondary"></i>
                          <span className="text-secondary">
                            Cancel your plan
                          </span>
                        </a>
                      ) : (
                        <span className="text-danger">
                          No Subscription Found
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-content">
                    {user?.access === "ultimate" ? (
                      <>
                        <h4>Enjoy the Full Experience</h4>
                        <p>
                          You&apos;re on the Ultimate Plan — with full access to
                          premium galleries, exclusive videos, and unlimited
                          favorites. Thank you for being one of our top members!
                          If you ever have any questions or need assistance, our
                          team is just a message away.
                        </p>
                      </>
                    ) : (
                      <>
                        <h4>Unlock the Full Experience</h4>
                        <p>
                          Upgrade your account to access all premium galleries,
                          exclusive videos, and unlimited favorites. If
                          you&apos;re still undecided, our team is here to guide
                          you — ensuring you get the most from FitMuse.
                        </p>
                      </>
                    )}
                    <div className="contact-info">
                      <div className="contact-item">
                        <i className="bi bi-envelope"></i>
                        <span>info@example.com</span>
                      </div>
                      <div className="contact-item">
                        <i className="bi bi-youtube"></i>
                        <a
                          href="https://www.youtube.com/yourchannel"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Visit Our Channel</span>
                        </a>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      {user?.access !== "ultimate" && (
                        <Link href="/pricing" className="btn btn-primary">
                          Upgrade Now
                        </Link>
                      )}
                      <Link href="/contact" className="btn btn-primary">
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CancellationModal
        subscriptionId={user?.sale?.stripeSubscriptionId}
        userId={user.id}
        cancelSubscription={cancelSubscription}
      />
    </>
  );
}
