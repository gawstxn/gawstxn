"use client";

import { useEffect } from "react";

export default function LoadingScreen() {
  useEffect(() => {
    // Dispatch loaded event to unlock scroll (Lenis) and animate hero section
    const t = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("portfolio:loaded"));
    }, 50);
    return () => clearTimeout(t);
  }, []);

  return null;
}

