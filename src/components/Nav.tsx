import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { NavDataProps } from "@/data/props";
import { usePathname } from "next/navigation";
import { MobileMenuContext } from "./SessionProvider";
import "./nav.css";

export default function Nav({
  navsData,
  setNavs,
}: {
  navsData: NavDataProps[];
  setNavs: React.Dispatch<React.SetStateAction<NavDataProps[]>>;
}) {
  const { mobileMenu, setMobileMenu } = useContext(MobileMenuContext);
  const pathname = usePathname();

  const handleNavActive = (id: number) => {
    setNavs(
      navsData.map((nav) => {
        nav.active = false;
        if (nav.id === id) nav.active = true;
        return nav;
      })
    );
  };

  const setNavActive = () => {
    setNavs(
      navsData.map((nav) => {
        nav.active = false;
        if (pathname.includes(nav.link)) nav.active = true;
        return nav;
      })
    );
  };

  useEffect(() => {
    setNavActive();
  }, [pathname]);

  const handleToggleMenu = () => {
    setMobileMenu(!mobileMenu);
    const body: HTMLElement = document.querySelector("body")!;
    body.classList.toggle("mobile-nav-active");
  };

  return (
    <nav id="navmenu" className="navmenu">
      <ul>
        {navsData.map((nav) => (
          <li key={nav.id}>
            <Link
              href={nav.link}
              className={nav.active ? "active" : undefined}
              onClick={() => handleNavActive(nav.id)}
            >
              {nav.name === "Home" ? (
                <i className="bi bi-house-door-fill"></i>
              ) : (
                nav.name
              )}
            </Link>
          </li>
        ))}
      </ul>
      {mobileMenu ? (
        <i
          className="mobile-nav-toggle d-xl-none bi bi-x"
          onClick={handleToggleMenu}
        ></i>
      ) : (
        <i
          className="mobile-nav-toggle d-xl-none bi bi-list"
          onClick={handleToggleMenu}
        ></i>
      )}
    </nav>
  );
}
