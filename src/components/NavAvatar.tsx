"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserContext } from "@/components/SessionProvider";
import "./navAvatar.css";

export default function NavAvatar() {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const { user } = useContext(UserContext);
  const logout = async () => {
    const response = await fetch("/api/logout");
    if (response.ok) {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    setActive(pathname === "/profile");
  }, [pathname]);

  return (
    <div className={`nav-list-profile dropdown pe-3`}>
      <Link
        href="#"
        className="nav-link nav-profile d-flex align-items-center pe-0"
        data-bs-toggle="dropdown"
      >
        {user && user?.image ? (
          <img src={user.image.url} alt="" className="rounded-circle" />
        ) : (
          <img
            src="/assets/img/user-avatar.png"
            alt="user avatar"
            className="rounded-circle"
          />
        )}
        <span
          className={`d-none d-md-block dropdown-toggle ps-2 ${
            active && "active"
          }`}
        >
          {user?.username}
        </span>
      </Link>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>{user?.username}</h6>
          <span>{user?.email}</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link
            className="dropdown-item d-flex align-items-center"
            href="/profile"
          >
            <i className="bi bi-person"></i>
            <span>My Profile</span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <Link
            className="dropdown-item d-flex align-items-center"
            href="/contact"
          >
            <i className="bi bi-question-circle"></i>
            <span>Need Help?</span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <Link
            className="dropdown-item d-flex align-items-center"
            href="#"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
