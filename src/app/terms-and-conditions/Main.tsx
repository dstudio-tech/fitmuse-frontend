import React from "react";
import { fetchPageData } from "@/actions/actions";
import InitAOS from "@/components/InitAOS";
import PageTitle from "@/components/PageTitle";

export default async function Main() {
  const pageData = await fetchPageData("terms-and-conditions-page");
  return (
    <>
      <InitAOS />
      <main className="main">
        <PageTitle page="terms-and-conditions-page" />
        <section
          id="terms-and-conditions"
          className="terms-and-conditions section"
        >
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-10">
                <p className="text-light">
                  Last updated:{" "}
                  {new Date(pageData?.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                {pageData?.listItems.map(
                  (item: { id: number; title: string; content: string }) => (
                    <div key={item.id} className="mb-4 list-item">
                      <h4>{item.title}</h4>
                      <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
