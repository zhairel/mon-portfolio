import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const cursorContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const container = cursorContainerRef.current;
    if (!dot || !ring || !container) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        container.style.opacity = '1';
      }

      // Fast hardware-accelerated dot move
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const onMouseLeave = () => {
      isVisible = false;
      container.style.opacity = '0';
    };

    // Smooth lerp for outer follower ring
    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(updateRing);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor') || '';
        ring.className = 'fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center transition-all duration-200 w-14 h-14 bg-cyan-500/90 text-[#070A12] backdrop-blur-sm border-0 font-mono font-bold text-[9px] tracking-widest';
        ring.innerHTML = `<span class="uppercase">${text}</span>`;
        dot.style.opacity = '0.3';
      } else {
        const clickable = (e.target as HTMLElement).closest('button, a, input, textarea, [role="button"]');
        if (clickable) {
          ring.className = 'fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center transition-all duration-200 w-9 h-9 border border-cyan-400/80 bg-cyan-400/15 backdrop-blur-xs';
          ring.innerHTML = '';
          dot.style.opacity = '0.6';
        } else {
          ring.className = 'fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center transition-all duration-200 w-6 h-6 border border-cyan-400/40 bg-transparent';
          ring.innerHTML = '';
          dot.style.opacity = '1';
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    rafId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return null;

  return (
    <div
      ref={cursorContainerRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-200"
    >
      {/* Precision Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Outer Follower Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-cyan-400/40 pointer-events-none flex items-center justify-center"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};
