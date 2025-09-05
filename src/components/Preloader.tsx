"use client";
import React, { useContext, useEffect } from "react";
import { handleCloseMobileMenu } from "@/utils/utils";
import { MobileMenuContext } from "./SessionProvider";
import "./preloader.css";

export default function Preloader() {
  const { setMobileMenu } = useContext(MobileMenuContext);
  useEffect(() => {
    setMobileMenu(false);
    handleCloseMobileMenu();
  }, []);
  return (
    <div id="preloader">
      <img src="/assets/img/logo.png" alt="" />
    </div>
  );
}
