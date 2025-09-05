"use client";
import React, { useEffect } from "react";
// import { Popover } from "bootstrap";
import "./initPopover.css";

export default function InitPopover() {
  useEffect(() => {
    async function loadBootstrap() {
      const bootstrap = await import("bootstrap");
      const Popover = bootstrap.Popover;

      // Function to initialize a popover with optional responsive placement
      const initPopover = (el: Element) => {
        // Dispose existing popover if any
        const existing = Popover.getInstance(el);
        if (existing) existing.dispose();

        // Determine placement dynamically (top for mobile, bottom otherwise)
        const placement = window.innerWidth < 576 ? "bottom" : "right";

        new Popover(el, {
          trigger: "focus",
          delay: { show: 100, hide: 200 },
          placement,
        });
      };

      // Initialize all popovers
      const popoverTriggerList = Array.from(
        document.querySelectorAll('[data-bs-toggle="popover"]')
      );
      popoverTriggerList.forEach((el) => initPopover(el));

      // Re-initialize on window resize
      const handleResize = () => {
        popoverTriggerList.forEach((el) => initPopover(el));
      };
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        popoverTriggerList.forEach((el) => {
          const popover = Popover.getInstance(el);
          if (popover) popover.dispose();
        });
      };
    }

    loadBootstrap();
  }, []);

  // useEffect(() => {
  //   async function loadBootstrap() {
  //     const bootstrap = await import("bootstrap");
  //     const popoverTriggerList = Array.from(
  //       document.querySelectorAll('[data-bs-toggle="popover"]')
  //     );
  //     popoverTriggerList.forEach((popoverTriggerEl) => {
  //       new bootstrap.Popover(popoverTriggerEl, {
  //         trigger: "focus",
  //         delay: { show: 100, hide: 200 },
  //       });
  //     });
  //   }
  //   loadBootstrap();
  // }, []);

  return (
    <a
      data-bs-toggle="popover"
      // data-bs-placement="auto"
      data-bs-content="☞ Use browser translate ☞ 用瀏覽器翻譯 ☞ ブラウザ翻訳 ☞ 브라우저 번역"
      style={{ cursor: "pointer" }}
      tabIndex={0} // make it focusable
    >
      <i className="bi bi-translate" />
    </a>
  );
}
