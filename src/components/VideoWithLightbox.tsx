"use client";
import { useEffect, useRef, useState } from "react";
import Preloader from "./Preloader";

type LightboxAPI = { open: () => void; destroy: () => void };
interface GlightboxOptions {
  elements: Array<{ href: string; type: string; source: string }>;
  autoplayVideos?: boolean;
  openEffect?: string;
  closeEffect?: string;
  onOpen?: () => void;
  onClose?: () => void;
}
type GlightboxCtor = (opts: GlightboxOptions) => LightboxAPI;
let Glightbox: GlightboxCtor | null = null;

interface VideoLightboxProps {
  videoUrl: string; // signed S3 video URL (via your API)
  className?: string;
  documentId: string;
}

export default function VideoWithLightbox({
  videoUrl,
  className,
  documentId,
}: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keep the Blob in memory; derive short-lived URLs from it
  const videoBlobRef = useRef<Blob | null>(null);

  // Preview URL for the inline <video>
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Lightbox lifetimes
  const lightboxUrlRef = useRef<string | null>(null);
  const lightboxRef = useRef<LightboxAPI | null>(null);

  useEffect(() => {
    import("glightbox").then((module) => {
      Glightbox = module.default as unknown as GlightboxCtor;
    });
  }, []);

  // Fetch protected media -> store Blob -> create preview URL
  useEffect(() => {
    let cancelled = false;

    const fetchSignedMedia = async () => {
      try {
        const res = await fetch(
          `/api/get-signed-media?mediaPath=${encodeURIComponent(videoUrl)}`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch signed media");
        const blob = await res.blob();
        if (cancelled) return;

        videoBlobRef.current = blob;

        // Create preview URL (we'll revoke on unmount or when preview ends)
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      } catch (err) {
        console.error("Error fetching video blob:", err);
      }
    };

    fetchSignedMedia();

    return () => {
      cancelled = true;

      // Cleanup preview URL
      if (previewUrl) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch {}
      }

      // Cleanup lightbox URL
      if (lightboxUrlRef.current) {
        try {
          URL.revokeObjectURL(lightboxUrlRef.current);
        } catch {}
        lightboxUrlRef.current = null;
      }

      // Destroy lightbox if open
      if (lightboxRef.current) {
        try {
          lightboxRef.current.destroy();
        } catch {}
        lightboxRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  // Revoke preview URL only when the preview video finishes or unmounts
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !previewUrl) return;

    const onEnded = () => {
      // User watched the preview loop to the end; safe to revoke
      try {
        URL.revokeObjectURL(previewUrl);
      } catch {}
      setPreviewUrl(null);
    };

    // Some browsers fire 'emptied' when source is detached
    const onEmptied = () => {
      try {
        URL.revokeObjectURL(previewUrl);
      } catch {}
      setPreviewUrl(null);
    };

    el.addEventListener("ended", onEnded);
    el.addEventListener("emptied", onEmptied);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("emptied", onEmptied);
    };
  }, [previewUrl]);

  const incrementPostViews = async (documentId: string) => {
    try {
      const res = await fetch("/api/post-media/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId }),
      });
      if (!res.ok) throw new Error(`Failed to update views: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("❌ Error updating views:", error);
      return null;
    }
  };

  const handleClick = async () => {
    if (!Glightbox || !videoBlobRef.current) return;

    // Create a fresh URL for the lightbox; keep it alive for the session
    const tempUrl = URL.createObjectURL(videoBlobRef.current);
    lightboxUrlRef.current = tempUrl;

    const lb = Glightbox({
      elements: [{ href: tempUrl, type: "video", source: "local" }],
      autoplayVideos: true,
      openEffect: "zoom",
      closeEffect: "zoom",
      onOpen: () => {
        // Start playback when lightbox DOM is ready
        setTimeout(() => {
          const videoEl = document.querySelector(
            ".gslide-video video"
          ) as HTMLVideoElement | null;

          if (videoEl) {
            // Ensure it can play with sound
            videoEl.muted = false;
            void videoEl.play().catch(() => {});

            // Revoke if user watches to the end inside lightbox
            const onEnded = () => {
              if (lightboxUrlRef.current) {
                try {
                  URL.revokeObjectURL(lightboxUrlRef.current);
                } catch {}
                lightboxUrlRef.current = null;
              }
              videoEl.removeEventListener("ended", onEnded);
            };
            videoEl.addEventListener("ended", onEnded, { once: true });
          }
        }, 200);
      },
      onClose: () => {
        // Revoke on close (covers seek/loop/partial watch cases)
        if (lightboxUrlRef.current) {
          try {
            URL.revokeObjectURL(lightboxUrlRef.current);
          } catch {}
          lightboxUrlRef.current = null;
        }
      },
    });

    lightboxRef.current = lb;
    lb.open();

    await incrementPostViews(documentId);
  };

  return (
    <>
      {previewUrl ? (
        <video
          ref={videoRef}
          src={previewUrl}
          className={`cursor-pointer ${className ?? ""}`}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          onClick={handleClick}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      ) : (
        <Preloader />
      )}
    </>
  );
}
