"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function useSmoothScroll() {
  useEffect(() => {
    let isScrolling = false;
    
    const smoothScroll = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      isScrolling = true;
      
      const delta = e.deltaY;
      const currentScroll = window.pageYOffset;
      const targetScroll = Math.max(0, currentScroll + delta * 0.8);
      
      gsap.to(window, {
        scrollTo: { y: targetScroll, autoKill: false },
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          isScrolling = false;
        }
      });
    };

    window.addEventListener('wheel', smoothScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', smoothScroll);
    };
  }, []);
}