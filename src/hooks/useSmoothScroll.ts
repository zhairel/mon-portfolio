import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    try {
      const lenis = new Lenis({
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.2,
      });

      lenisRef.current = lenis;

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      const updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(updateTicker);
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch (e) {
      console.warn("Smooth scroll initialization fallback:", e);
    }
  }, []);

  const scrollTo = (target: string | HTMLElement, offset = 0) => {
    try {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset });
      } else {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (e) {
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return { lenis: lenisRef.current, scrollTo };
}
