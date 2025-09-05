import React from "react";
import InitAOS from "@/components/InitAOS";
import { fetchPageData, fetchSocialsData } from "@/actions/actions";
import { ContactInfoItemProps, SocialItemProps } from "@/data/props";
import PageTitle from "@/components/PageTitle";
import ContactForm from "./components/ContactForm";
import InfoItem from "./components/InfoItem";
import "./contactPage.css";

export default async function Main() {
  const pageData = await fetchPageData("contact-page");
  const socialsData = await fetchSocialsData();
  return (
    <>
      <InitAOS />
      <main className="main">
        <PageTitle page="contact-page" />
        <section id="contact" className="contact section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row">
              <div
                className="col-lg-6 mb-5"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="contact-info-section">
                  <div className="contact-info-grid">
                    {pageData?.infoCards.map(
                      (item: ContactInfoItemProps, index: number) => (
                        <InfoItem key={item.id} item={item} index={index} />
                      )
                    )}
                  </div>
                  <div
                    className="social-contact"
                    data-aos="fade-up"
                    data-aos-delay="450"
                  >
                    <h5>Follow Our Journey</h5>
                    <div className="social-icons">
                      {socialsData?.map((item: SocialItemProps) => (
                        <a
                          key={item?.sci?.id}
                          href={item?.sci?.link}
                          className="social-icon"
                        >
                          <i className={item?.sci?.icon}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-6"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <div className="contact-form-wrapper">
                  <div className="form-header">
                    <h3>Send Us Message</h3>
                    <p>
                      Our team is ready to help you get the most out of FitMuse.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
