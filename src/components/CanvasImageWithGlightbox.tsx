"use client";
import { useEffect, useRef, useState } from "react";
import MediaItemLoader from "./MediaItemLoader";
// ✅ Keep what you need strongly typed (the API you call)
type LightboxAPI = { open: () => void; destroy: () => void };

// ✅ Make ctor accept unknown so it's assignment-compatible with the lib
type GlightboxCtor = (opts: unknown) => LightboxAPI;

let Glightbox: GlightboxCtor | null = null;
//let Glightbox: any; // will import dynamically on client

interface CanvasImageProps {
  mediaUrl: string; // real S3 URL
  alt?: string;
  className?: string;
  watermarkText?: string; // optional watermark
  documentId: string;
}

export default function CanvasImageWithGlightbox({
  mediaUrl,
  alt,
  className,
  watermarkText = "© fitmuse.club",
  documentId,
}: CanvasImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false); // 🔹 lazy loading trigger

  useEffect(() => {
    // Dynamically import Glightbox only on client
    import("glightbox").then((module) => {
      Glightbox = module.default as unknown as GlightboxCtor;
    });
  }, []);

  // 🔹 Setup IntersectionObserver for lazy loading
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // load only when visible
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 } // 10% visible = load
    );

    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return; // 🔹 do not load until visible

    let revoked = false;

    const loadImage = async () => {
      try {
        const res = await fetch(
          `/api/get-signed-media?mediaPath=${encodeURIComponent(mediaUrl)}`
        );
        if (!res.ok) throw new Error("Failed to fetch media");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        if (revoked) return;
        setBlobUrl(url);

        // Draw image on canvas
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;

          // Draw image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // === Add watermark ===
          ctx.font = `${Math.floor(canvas.width / 15)}px Arial`;
          ctx.fillStyle = "rgba(255,255,255,0.4)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);

          // Convert to Base64/data URL for Glightbox
          const base64Url = canvas.toDataURL("image/png");
          setDataUrl(base64Url);

          // Clean up
          URL.revokeObjectURL(img.src);
        };
        img.src = URL.createObjectURL(blob);
      } catch (err) {
        console.error("Canvas image error:", err);
      }
    };

    loadImage();

    return () => {
      revoked = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [isVisible, mediaUrl, watermarkText]);

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

  const handleClick = async () => {
    if (!dataUrl || !Glightbox) return;

    const lightbox = Glightbox({
      elements: [{ href: dataUrl, type: "image" }],
      onOpen: () => {
        setTimeout(() => {
          const imgs = document.querySelectorAll(".gslide img");
          imgs.forEach((img) => {
            const image = img as HTMLImageElement;
            image.oncontextmenu = (e) => e.preventDefault();
            image.ondragstart = (e) => e.preventDefault();
          });
        }, 0);
      },
    });
    lightbox.open();

    // update media views
    await incrementPostViews(documentId);
  };

  return (
    <>
      {mediaUrl ? (
        <canvas
          ref={canvasRef}
          className={className}
          aria-label={alt}
          onClick={handleClick}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <MediaItemLoader />
      )}
    </>
  );
}
