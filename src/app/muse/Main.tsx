import React from "react";
import InitAOS from "@/components/InitAOS";
import PageTitle from "@/components/PageTitle";
import Gallery from "@/sections/Gallery";

export default function Main() {
  return (
    <>
      <InitAOS />
      <main className="main">
        <PageTitle page="muse-page" />
        <Gallery pageSize={18} showSectionTitle={false} />
      </main>
    </>
  );
}
