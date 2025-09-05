import InitAOS from "@/components/InitAOS";
import PageTitle from "@/components/PageTitle";
import React from "react";
import MuseGallery from "./sections/MuseGallery";

export default function Main() {
  return (
    <>
      <InitAOS />
      <main className="main">
        <PageTitle page="gallery-page" />
        <MuseGallery />
      </main>
    </>
  );
}
