"use client";
import { useEffect, useRef, useState } from "react";

// ✅ Keep what you need strongly typed (the API you call)
type LightboxAPI = {
  open: () => void;
  destroy: () => void;
};
type GlightboxCtor = (opts: any) => LightboxAPI;
let Glightbox: GlightboxCtor | null = null;

interface VideoLightboxProps {
  videoUrl: string; // signed S3 video URL (fetched via your API)
  className?: string;
  documentId: string;
}

export default function VideoWithLightbox({
  videoUrl,
  className,
  documentId,
}: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // We keep the Blob in memory, not the URL
  const videoBlobRef = useRef<Blob | null>(null);

  // Short-lived preview URL (revoked as soon as <video> buffers it)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Track ephemeral lightbox URL so we can revoke on cleanup
  const lightboxUrlRef = useRef<string | null>(null);
  const lightboxRef = useRef<LightboxAPI | null>(null);

  useEffect(() => {
    // Dynamically import Glightbox only on client
    import("glightbox").then((module) => {
      Glightbox = module.default as unknown as GlightboxCtor;
    });
  }, []);

  // Step 1: Fetch signed media -> store Blob; create a preview URL that we revoke ASAP
  useEffect(() => {
    let cancelled = false;

    const fetchSignedMedia = async () => {
      try {
        // Your protected proxy endpoint
        const res = await fetch(
          `/api/get-signed-media?mediaPath=${encodeURIComponent(videoUrl)}`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch signed media");

        const blob = await res.blob();
        if (cancelled) return;

        videoBlobRef.current = blob;

        // Create a preview URL for the <video> tag only
        const localUrl = URL.createObjectURL(blob);
        setPreviewUrl(localUrl);
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

      // Cleanup lightbox URL if somehow still around
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

  // Revoke the preview URL right after the video buffers enough to play
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !previewUrl) return;

    const onLoaded = () => {
      // Give the media element a tick to finish resolving the blob,
      // then revoke so copy-paste of the URL becomes useless.
      queueMicrotask(() => {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch {}
      });
    };

    el.addEventListener("loadeddata", onLoaded, { once: true });
    return () => {
      el.removeEventListener("loadeddata", onLoaded);
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

  // Step 2: Init Glightbox with an *ephemeral* URL per click, revoke immediately after open
  const handleClick = async () => {
    if (!Glightbox || !videoBlobRef.current) return;

    // Create a fresh URL only for lightbox playback
    const tempUrl = URL.createObjectURL(videoBlobRef.current);
    lightboxUrlRef.current = tempUrl;

    const lb = Glightbox({
      elements: [
        {
          href: tempUrl,
          type: "video",
          source: "local",
        },
      ],
      autoplayVideos: true,
      openEffect: "zoom",
      closeEffect: "zoom",
      onOpen: () => {
        // Kick the video + revoke URL shortly after the lightbox attaches the source
        setTimeout(() => {
          const videoEl = document.querySelector(
            ".gslide-video video"
          ) as HTMLVideoElement | null;

          if (videoEl) {
            videoEl.muted = false;
            void videoEl.play().catch(() => {});
          }

          // Revoke the lightbox URL shortly after it’s been consumed
          if (lightboxUrlRef.current) {
            try {
              URL.revokeObjectURL(lightboxUrlRef.current);
            } catch {}
            lightboxUrlRef.current = null;
          }
        }, 250);
      },
      onClose: () => {
        // Double-safety: revoke again on close in case open failed early
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

    // update media views
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
          controls={false} // no controls in preview mode
          onClick={handleClick}
          onContextMenu={(e) => e.preventDefault()} // disable right-click
          onDragStart={(e) => e.preventDefault()} // disable drag
        />
      ) : null}
    </>
  );
}
