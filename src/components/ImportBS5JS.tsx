"use client";
import { useEffect } from "react";

export default function ImportBS5JS() {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return null;
}
