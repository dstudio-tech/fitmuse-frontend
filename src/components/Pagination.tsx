"use client";
import React from "react";
import _ from "lodash";
import "./pagination.css";

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: {
  pageCount: number | undefined;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  if (pageCount! <= 1) return null;

  const pages = _.range(1, pageCount! + 1);

  // sliding window size
  const windowSize = 5;

  // calculate start and end of the window
  let start = currentPage - Math.floor(windowSize / 2);
  if (start < 1) start = 1;

  let end = start + windowSize - 1;
  if (pageCount && end > pageCount) {
    end = pageCount;
    start = Math.max(1, end - windowSize + 1);
  }

  const visiblePages = pages.slice(start - 1, end);

  return (
    <section id="pagination-2" className="pagination-2 section">
      <div className="container">
        <div className="d-flex justify-content-center py-2">
          <ul>
            <li
              className={`page-item ${
                currentPage === 1 ? "disabled" : undefined
              }`}
            >
              <a
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
              >
                <i className="bi bi-chevron-left"></i>
              </a>
            </li>

            {visiblePages.map((page) => (
              <li key={page}>
                <a
                  className={`${currentPage === page ? "active" : undefined}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === pageCount ? "disabled" : undefined
              }`}
            >
              <a
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
              >
                <i className="bi bi-chevron-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
