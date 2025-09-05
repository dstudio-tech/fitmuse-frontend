"use client";
import React, { useContext, useEffect, useState } from "react";
import { BackendUrlContext, UserContext } from "@/components/SessionProvider";
import { usePathname } from "next/navigation";
import { HeaderDataProps, NavDataProps } from "@/data/props";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import "./header.css";
import NavAvatar from "@/components/NavAvatar";
import SignInModal from "@/components/SignInModal";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const { jwt } = useContext(UserContext);
  const backendUrlContext = useContext(BackendUrlContext);
  const [header, setHeader] = useState<HeaderDataProps>();
  const [navs, setNavs] = useState<NavDataProps[]>([]);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(window.scrollY);
      });
    };
  }, [scroll]);

  const fetchData = () => {
    fetch(`${backendUrlContext}/api/header?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setHeader(data.data);
        setNavs(data.data.nav);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setNavActive = () => {
    setNavs(
      navs.map((nav) => {
        nav.active = false;
        if (nav.link === pathname) nav.active = true;
        return nav;
      })
    );
  };

  useEffect(() => {
    setNavActive();
  }, [pathname]);

  return (
    <>
      {header ? (
        <header
          id="header"
          className={`header d-flex align-items-center fixed-top ${
            scroll > 100 ? "scrolled" : ""
          }`}
        >
          <div className="container position-relative d-flex align-items-center justify-content-between">
            <Link
              href="/"
              className="logo d-flex align-items-center me-auto me-xl-0"
              replace
            >
              <img src={header?.logo?.url} alt="Logo" />
              <h1 className="sitename">FitMuse</h1>
            </Link>
            <Nav navsData={navs} setNavs={setNavs} />
            {!jwt ? (
              <Link
                href="#"
                className="btn-getstarted"
                data-bs-toggle="modal"
                data-bs-target="#signInModal"
              >
                {header?.signInBtn?.name}
              </Link>
            ) : (
              <NavAvatar />
            )}
          </div>
        </header>
      ) : (
        <Preloader />
      )}
      <SignInModal />
    </>
  );
}
