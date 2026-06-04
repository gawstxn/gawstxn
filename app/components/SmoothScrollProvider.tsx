"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 4), // quartic ease-out
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    // Start stopped — LoadingScreen is still visible
    lenis.stop();

    let raf: number;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Intercept all anchor-link clicks and route through Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0 });
    };
    document.addEventListener("click", handleAnchorClick);

    // Unlock Lenis the moment loading screen begins its exit slide
    const onLoaded = () => lenis.start();
    window.addEventListener("portfolio:loaded", onLoaded);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("portfolio:loaded", onLoaded);
    };
  }, []);

  return null;
}
