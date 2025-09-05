"use client";
import { useEffect, useRef, useState } from "react";
import Glightbox from "glightbox";

interface ProtectedImageProps {
  mediaUrl: string; // real S3 URL
  alt?: string;
  className?: string;
}

export default function ProtectedImage({
  mediaUrl,
  alt,
  className,
}: ProtectedImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    let revoked = false;

    const loadBlob = async () => {
      try {
        const res = await fetch(
          `/api/get-signed-media?mediaPath=${encodeURIComponent(mediaUrl)}`
        );
        if (!res.ok) throw new Error("Failed to fetch media");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        if (!revoked) {
          setObjectUrl(url);

          // Set href for Glightbox if wrapped in <a>
          imgRef.current?.closest("a")?.setAttribute("href", url);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadBlob();

    return () => {
      revoked = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [mediaUrl]);

  return (
    <img
      ref={imgRef}
      src={objectUrl || undefined}
      alt={alt}
      className={className}
    />
  );
}
