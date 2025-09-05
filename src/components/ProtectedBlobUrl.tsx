"use client";
import { useEffect, useState } from "react";

export const useBlobUrl = (url?: string | null) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    let objectUrl: string;

    const convertToBlob = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const blob = await response.blob();

        objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
      } catch (err) {
        console.error("Blob conversion failed:", err);
      }
    };

    convertToBlob();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url]);

  return blobUrl;
};
