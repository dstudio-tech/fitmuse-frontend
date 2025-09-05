import { useEffect, useState } from "react";

export function useSignedMedia(mediaPath?: string) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!mediaPath) return;

    let cancelled = false;

    const fetchSignedMedia = async () => {
      try {
        const res = await fetch(
          `/api/get-signed-media?mediaPath=${encodeURIComponent(mediaPath)}`
        );
        if (!res.ok) throw new Error("Failed to fetch signed media");

        const blob = await res.blob();
        if (cancelled) return;

        const blobUrl = URL.createObjectURL(blob);
        setSrc(blobUrl);

        // Cleanup old blob URLs
        return () => {
          cancelled = true;
          URL.revokeObjectURL(blobUrl);
        };
      } catch (err) {
        console.error("Error fetching signed media:", err);
      }
    };

    fetchSignedMedia();

    return () => {
      cancelled = true;
    };
  }, [mediaPath]);

  return src;
}
