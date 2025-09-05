"use client";
import { useEffect, useRef, useState } from "react";
// ✅ Keep what you need strongly typed (the API you call)
type LightboxAPI = { open: () => void; destroy: () => void };
// ✅ Make ctor accept unknown so it's assignment-compatible with the lib
type GlightboxCtor = (opts: unknown) => LightboxAPI;
let Glightbox: GlightboxCtor | null = null;

interface VideoLightboxProps {
  videoUrl: string; // signed S3 video URL
  className?: string;
  documentId: string;
}

export default function VideoWithLightbox({
  videoUrl,
  className,
  documentId,
}: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically import Glightbox only on client
    import("glightbox").then((module) => {
      Glightbox = module.default as unknown as GlightboxCtor;
    });
  }, []);

  // Step 1: Fetch signed media + convert to Blob
  useEffect(() => {
    let cancelled = false;

    const fetchSignedMedia = async () => {
      try {
        const res = await fetch(
          `/api/get-signed-media?mediaPath=${encodeURIComponent(videoUrl)}`
        );
        if (!res.ok) throw new Error("Failed to fetch signed media");

        const blob = await res.blob();
        if (cancelled) return;

        const blobUrl = URL.createObjectURL(blob);
        setVideoBlobUrl(blobUrl);
      } catch (err) {
        console.error("Error fetching video blob:", err);
      }
    };

    fetchSignedMedia();

    return () => {
      cancelled = true;
      if (videoBlobUrl) URL.revokeObjectURL(videoBlobUrl);
    };
  }, [videoUrl]);

  const incrementPostViews = async (documentId: string) => {
    try {
      const res = await fetch("/api/post-media/views", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update views: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("✅ Views updated:", data);
      return data;
    } catch (error) {
      console.error("❌ Error updating views:", error);
      return null;
    }
  };

  // Step 2: Init Glightbox on demand
  const handleClick = async () => {
    if (!Glightbox || !videoBlobUrl) return;

    const lightbox = Glightbox({
      elements: [
        {
          href: videoBlobUrl,
          type: "video",
          source: "local",
        },
      ],
      autoplayVideos: true,
      openEffect: "zoom",
      closeEffect: "zoom",
      onOpen: () => {
        setTimeout(() => {
          const videoEl = document.querySelector(
            ".gslide-video video"
          ) as HTMLVideoElement | null;

          if (videoEl) {
            videoEl.muted = false;
            videoEl.play().catch(() => {});
          }
        }, 200);
      },
    });

    lightbox.open();

    // update media views
    await incrementPostViews(documentId);
  };
  return (
    <>
      {videoBlobUrl ? (
        <video
          ref={videoRef}
          src={videoBlobUrl}
          className={`cursor-pointer ${className}`}
          autoPlay
          muted
          loop
          playsInline
          controls={false} // no controls in preview mode
          onClick={handleClick}
          onContextMenu={(e) => e.preventDefault()} // disable right-click
        />
      ) : null}
    </>
  );
}
