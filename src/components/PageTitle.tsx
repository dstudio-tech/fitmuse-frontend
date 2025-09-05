import React from "react";
import Link from "next/link";
import { fetchPageTitleData } from "@/actions/actions";
import "./pageTitle.css";

export default async function PageTitle({ page }: { page: string }) {
  const pageTitle = await fetchPageTitleData(page);
  return (
    <div className="page-title light-background" data-aos="fade">
      <div className="container position-relative">
        <h1>{pageTitle?.name}</h1>
        <p>{pageTitle?.brief}</p>
        <nav className="breadcrumbs">
          <ol>
            <li>
              <Link href="/">
                {pageTitle?.prevPage.name === "Home" ? (
                  <i className="bi bi-house-door-fill"></i>
                ) : (
                  pageTitle?.prevPage.name
                )}
              </Link>
            </li>
            <li className="current">{pageTitle?.currentPage.name}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
