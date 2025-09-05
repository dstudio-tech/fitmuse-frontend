"use client";
import { useContext } from "react";
import { BackendUrlContext } from "./SessionProvider";
import { toast } from "react-toastify";
import "./signInBtn.css";

interface GoogleSignInBtnProps {
  disabled?: boolean;
}

export default function GoogleSignInBtn({
  disabled = false,
}: GoogleSignInBtnProps) {
  const backendUrl = useContext(BackendUrlContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault(); // Prevent navigation if disabled
      toast("Please agree to the Terms and Conditions first!");
    }
  };

  return (
    <a
      href={disabled ? "#" : `${backendUrl}/api/connect/google`}
      className="btn btn-social btn-google w-100"
      onClick={handleClick}
      style={{
        opacity: disabled ? 0.6 : 1, // grey out visually
        pointerEvents: "auto", // allow click even if "disabled"
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      aria-disabled={disabled}
    >
      <i className="bi bi-google"></i> Sign in with Google
    </a>
  );
}
