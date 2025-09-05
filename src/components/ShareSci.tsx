import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { SocialShareProps } from "@/data/props";
import "./shareSci.css";

export default function ShareSci({
  title,
  text,
  currentUrl: url,
}: SocialShareProps) {
  type Platform = "facebook" | "twitter" | "whatsapp";

  const shareLinks = {
    facebook: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: (text: string, url: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
    whatsapp: (text: string, url: string) =>
      `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
  };

  const handleShare = async (platform: Platform) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch (err) {
        console.error("Native share failed, falling back:", err);
      }
    }

    // Fallback to web link if Web Share API is not supported or user cancels
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = shareLinks.facebook(url);
        break;
      case "twitter":
        shareUrl = shareLinks.twitter(text, url);
        break;
      case "whatsapp":
        shareUrl = shareLinks.whatsapp(text, url);
        break;
    }
    window.open(shareUrl, "_blank");
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast(
        "✨ Link copied! Invite others to step inside your world of muses. 💫"
      );
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <div className="social-links">
      <a
        onClick={() => handleShare("twitter")}
        rel="noopener noreferrer"
        className="twitter"
      >
        <i className="bi bi-twitter-x"></i>
      </a>
      <a
        onClick={() => handleShare("facebook")}
        rel="noopener noreferrer"
        className="facebook"
      >
        <i className="bi bi-facebook"></i>
      </a>
      <a
        onClick={() => handleShare("whatsapp")}
        rel="noopener noreferrer"
        className="whatapp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
      <Link href="#" onClick={copyUrl} className="copy-link" title="Copy Link">
        <i className="bi bi-link-45deg"></i>
      </Link>
    </div>
  );
}
