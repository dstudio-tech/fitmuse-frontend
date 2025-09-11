import React from "react";
import Link from "next/link";
import { fetchFooterData } from "@/actions/actions";
import {
  FooterLinkGroupProps,
  FooterLinkItemProps,
  SocialItemProps,
} from "@/data/props";
import "./footer.css";

export default async function Footer() {
  const footerData = await fetchFooterData();
  return (
    <footer id="footer" className="footer light-background">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-about">
              <Link href="/" className="logo d-flex align-items-center">
                {footerData?.logo && (
                  <img src={footerData?.logo.url} alt="NexusAi Logo" />
                )}
                <span className="sitename">{footerData?.brand}</span>
              </Link>
              <p>{footerData?.about}</p>
              <div className="social-links d-flex mt-4">
                {footerData?.socials?.map((item: SocialItemProps) => (
                  <a
                    target="_blank"
                    key={item?.id}
                    href={item?.sci?.link || "#"}
                  >
                    <i className={item?.sci?.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {footerData?.footerLinks?.map((item: FooterLinkGroupProps) => (
              <div key={item.id} className="col-lg-2 col-6 footer-links">
                <h4>{item.name}</h4>
                <ul>
                  {item?.links?.map((item: FooterLinkItemProps) => (
                    <li key={item?.id}>
                      <i className="bi bi-chevron-right"></i>{" "}
                      <Link href={item?.link}>{item?.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Contact Us</h4>
              <p>{footerData?.addressOne}</p>
              <p>{footerData?.addressTwo}</p>
              <p>{footerData?.addressThree}</p>
              <p className="mt-4">
                <strong>Website:</strong> <span>{footerData?.website}</span>
              </p>
              <p>
                <strong>Email:</strong> <span>{footerData?.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright text-center">
        <div className="container d-flex flex-column flex-lg-row justify-content-center align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div>
              © Copyright{" "}
              <strong>
                <span>{footerData?.copyright?.brand}</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Developed by{" "}
              <a target="_blank" href={footerData?.copyright?.link}>
                {footerData?.copyright?.creator}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
