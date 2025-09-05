"use client";
import { useEffect } from "react";
import Glightbox from "glightbox";

interface InitGlightBoxProps {
  section: string;
}

export default function InitGlightBox({ section }: InitGlightBoxProps) {
  useEffect(() => {
    const lightbox = Glightbox({
      selector: `.${section}`,
    });

    // Prevent right-click when slide changes
    lightbox.on("slide_changed", () => {
      const currentSlideImg = document.querySelector(".gslide.current img");
      if (currentSlideImg) {
        currentSlideImg.addEventListener("contextmenu", (e) =>
          e.preventDefault()
        );
      }
    });
  }, []);

  return null;
}
