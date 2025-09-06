"use client";

import { useEffect, useRef, useState } from "react";
import Preloader from "./Preloader";

/* ----------------- Glightbox typings ----------------- */
type LightboxAPI = { open: () => void; destroy: () => void };
interface GlightboxOptions {
  elements: Array<{ content: string; type: "inline" }>;
  autoplayVideos?: boolean;
  openEffect?: "zoom" | "fade" | "none";
  closeEffect?: "zoom" | "fade" | "none";
  onOpen?: () => void;
  onClose?: () => void;
}
type GlightboxCtor = (opts: GlightboxOptions) => LightboxAPI;
let Glightbox: GlightboxCtor | null = null;

/* ----------------- Props ----------------- */
interface VideoLightboxProps {
  videoUrl: string;
  className?: string;
  documentId: string;
  watermarkText?: string;
}

/* ----------------- Watermark (bottom-center) ----------------- */
function drawWatermark(
  ctx: CanvasRenderingContext2D,
  cw: number,
  ch: number,
  text: string
) {
  const margin = Math.round(Math.min(cw, ch) * 0.02);
  const padX = 10;
  const padY = 8;

  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.font = `bold ${Math.max(
    14,
    Math.round(ch * 0.022)
  )}px system-ui,-apple-system, Segoe UI, Roboto, Arial`;
  ctx.textBaseline = "bottom";

  const m = ctx.measureText(text);
  const boxW = m.width + padX * 2;
  const boxH = Math.max(Math.round(ch * 0.04), 28);
  const x = Math.round((cw - boxW) / 2);
  const y = ch - boxH - margin;

  // background rounded rect
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  const r = 10;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + boxW, y, x + boxW, y + boxH, r);
  ctx.arcTo(x + boxW, y + boxH, x, y + boxH, r);
  ctx.arcTo(x, y + boxH, x, y, r);
  ctx.arcTo(x, y, x + boxW, y, r);
  ctx.closePath();
  ctx.fill();

  // text
  ctx.fillStyle = "#fff";
  ctx.fillText(text, x + padX, y + boxH - padY);
  ctx.restore();
}

/* ----------------- Utilities ----------------- */
function ensureGlightboxDarkCSS() {
  const id = "glb-dark-overrides";
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
.glightbox-container, .goverlay { background: rgba(0,0,0,0.96) !important; }
.gslide, .gslide-media, .gslide-inline { background: transparent !important; }
.glightbox-clean .ginner { padding: 0 !important; }
.gslide-inline .gslide-media { padding: 0 !important; }
.gslide-description, .gdesc-inner { display: none !important; }
.glightbox-container .ginner, .gslide, .gslide-media {width:fit-content !important; height: auto !important;}
`;
  document.head.appendChild(style);
}

/** Remove any <video> tags Glightbox/theme might inject */
function removeDomVideosIn(root: Element | Document) {
  const videos = root.querySelectorAll("video");
  videos.forEach((el) => {
    const v = el as HTMLVideoElement;
    try {
      v.pause();
    } catch {}
    v.remove();
  });
}

/** rAF loop helper with cancel */
function startRafLoop(fn: () => void) {
  let id = 0;
  const loop = () => {
    id = requestAnimationFrame(loop);
    fn();
  };
  id = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(id);
}

/* ----------------- Component ----------------- */
export default function VideoWithLightbox({
  videoUrl,
  className,
  documentId,
  watermarkText = "fitmuse",
}: VideoLightboxProps) {
  // Visible preview canvas; decoding uses an off-DOM <video>
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null); // off-DOM
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Blob & lightbox
  const videoBlobRef = useRef<Blob | null>(null);
  const lightboxRef = useRef<LightboxAPI | null>(null);
  const lightboxUrlRef = useRef<string | null>(null);
  const lightboxCleanupRef = useRef<(() => void) | null>(null);

  const [inlineCanvasId] = useState(
    () => `cv-${Math.random().toString(36).slice(2)}`
  );
  const [inlineBoxId] = useState(
    () => `box-${Math.random().toString(36).slice(2)}`
  );

  // Load Glightbox on client
  useEffect(() => {
    (async () => {
      const m = await import("glightbox");
      Glightbox = m.default as unknown as GlightboxCtor;
    })();
  }, []);

  // Fetch signed media → Blob in memory → preview URL
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/get-signed-media?mediaPath=${encodeURIComponent(videoUrl)}`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch signed media");
        const blob = await res.blob();
        if (cancelled) return;
        videoBlobRef.current = blob;
        setPreviewUrl(URL.createObjectURL(blob));
      } catch (e) {
        console.error("Error fetching video blob:", e);
      }
    })();

    return () => {
      cancelled = true;
      if (previewUrl) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch {}
      }
      if (lightboxUrlRef.current) {
        try {
          URL.revokeObjectURL(lightboxUrlRef.current);
        } catch {}
        lightboxUrlRef.current = null;
      }
      if (lightboxRef.current) {
        try {
          lightboxRef.current.destroy();
        } catch {}
        lightboxRef.current = null;
      }
      if (previewVideoRef.current) {
        try {
          previewVideoRef.current.pause();
          previewVideoRef.current.src = "";
          previewVideoRef.current.load();
        } catch {}
        previewVideoRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  // Preview painter — native backing store, CSS scales
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas || !previewUrl) return;

    if (!previewVideoRef.current) {
      const v = document.createElement("video");
      v.playsInline = true;
      v.muted = true;
      v.loop = true;
      v.preload = "auto";
      previewVideoRef.current = v;
    }
    const video = previewVideoRef.current;

    const ctx = canvas.getContext("2d");
    let stop: (() => void) | null = null;

    const layoutToNative = () => {
      const w = video.videoWidth || 0;
      const h = video.videoHeight || 0;
      if (w && h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
      }
    };

    const draw = () => {
      if (!ctx || video.readyState < 2) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch {}
      drawWatermark(ctx, canvas.width, canvas.height, watermarkText);
    };

    const start = async () => {
      try {
        video.src = previewUrl;
      } catch {}
      const onMeta = () => {
        layoutToNative();
        stop = startRafLoop(draw);
        void video.play().catch(() => {});
      };
      if (video.readyState >= 1) onMeta();
      else video.addEventListener("loadedmetadata", onMeta, { once: true });
    };

    start();

    return () => {
      if (stop) stop();
      try {
        video.pause();
      } catch {}
    };
  }, [previewUrl, watermarkText]);

  // Views
  const incrementPostViews = async (id: string) => {
    try {
      const res = await fetch("/api/post-media/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: id }),
      });
      if (!res.ok) throw new Error(`Failed to update views: ${res.statusText}`);
      return await res.json();
    } catch (e) {
      console.error("❌ Error updating views:", e);
      return null;
    }
  };

  // Open Glightbox — inline canvas only; native backing store; watermark each frame
  const handleClick = async () => {
    if (!Glightbox || !videoBlobRef.current) return;

    ensureGlightboxDarkCSS();

    const tempUrl = URL.createObjectURL(videoBlobRef.current);
    lightboxUrlRef.current = tempUrl;

    const lightboxVideo = document.createElement("video");
    lightboxVideo.playsInline = true;
    lightboxVideo.muted = false;
    lightboxVideo.preload = "auto";

    const html = `
      <div style="position:relative;margin:0 auto;display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
        <div id="${inlineBoxId}"
             style="
               aspect-ratio: 9 / 16;
               width: min(92vw, calc(92vh * 9 / 16));
               max-height: 92vh;
               position: relative;
               background: #000;
               border-radius: 8px;
               overflow: hidden;
               display:flex;align-items:center;justify-content:center;">
          <canvas id="${inlineCanvasId}"
                  style="position:absolute; inset:0; width:100%; height:100%;
                         background:#000; border-radius:8px;"></canvas>
        </div>
      </div>
    `;

    const lb = Glightbox({
      elements: [{ content: html, type: "inline" }],
      autoplayVideos: false,
      openEffect: "zoom",
      closeEffect: "zoom",
      onOpen: () => {
        setTimeout(() => {
          // Safety: remove any DOM <video> Glightbox might insert
          const slideRoot =
            (document.querySelector(
              ".glightbox-container .gslide"
            ) as Element) ||
            (document.querySelector(".glightbox-container") as Element) ||
            document;
          removeDomVideosIn(slideRoot);

          const box = document.getElementById(
            inlineBoxId
          ) as HTMLDivElement | null;
          const c = document.getElementById(
            inlineCanvasId
          ) as HTMLCanvasElement | null;
          if (!box || !c) return;

          const ctx = c.getContext("2d");
          if (!ctx) return;

          // Set canvas backing store to **native** size when we know it
          const layoutToNative = () => {
            const w = lightboxVideo.videoWidth || 0;
            const h = lightboxVideo.videoHeight || 0;
            if (w && h) {
              c.width = w;
              c.height = h;
              // CSS scales to fill the portrait box
              c.style.width = "100%";
              c.style.height = "100%";
            }
          };

          let stop: (() => void) | null = null;

          const draw = () => {
            if (lightboxVideo.readyState < 2) return;
            ctx.clearRect(0, 0, c.width, c.height);
            try {
              ctx.drawImage(lightboxVideo, 0, 0, c.width, c.height);
            } catch {}
            drawWatermark(ctx, c.width, c.height, watermarkText);
          };

          const start = async () => {
            try {
              lightboxVideo.src = tempUrl;
            } catch {}
            const onMeta = () => {
              layoutToNative();
              stop = startRafLoop(draw);
              void lightboxVideo.play().catch(() => {});
            };
            if (lightboxVideo.readyState >= 1) onMeta();
            else
              lightboxVideo.addEventListener("loadedmetadata", onMeta, {
                once: true,
              });
          };

          start();

          const cleanup = () => {
            if (stop) stop();
            try {
              lightboxVideo.pause();
              lightboxVideo.src = "";
              lightboxVideo.load();
            } catch {}
          };

          const onEnded = () => {
            if (lightboxUrlRef.current) {
              try {
                URL.revokeObjectURL(lightboxUrlRef.current);
              } catch {}
              lightboxUrlRef.current = null;
            }
            lightboxVideo.removeEventListener("ended", onEnded);
          };
          lightboxVideo.addEventListener("ended", onEnded);

          // store cleanup (typed, no `any`)
          lightboxCleanupRef.current = cleanup;
        }, 80);
      },
      onClose: () => {
        if (lightboxUrlRef.current) {
          try {
            URL.revokeObjectURL(lightboxUrlRef.current);
          } catch {}
          lightboxUrlRef.current = null;
        }
        const fn = lightboxCleanupRef.current;
        if (fn) {
          try {
            fn();
          } finally {
            lightboxCleanupRef.current = null;
          }
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
        <div
          className={`relative ${className ?? ""}`}
          style={{ width: "100%", maxWidth: 360 }}
        >
          {/* 9:16 preview frame with rounded corners */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "177.7778%", // 9:16
              borderRadius: 8,
              overflow: "hidden",
              background: "#000",
            }}
            className="cursor-pointer"
            onClick={handleClick}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          >
            {/* Visible canvas ONLY (no <video> in DOM) */}
            <canvas
              ref={previewCanvasRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                background: "#000",
                borderRadius: 8,
              }}
            />
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
}
