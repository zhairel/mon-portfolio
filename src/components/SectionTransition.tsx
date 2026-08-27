import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTransitionProps {
  words: string[];
  subtitle?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  words = ["DESIGN.", "DEVELOP.", "DEPLOY."],
  subtitle = "Engineering systems with purpose, precision, and performance."
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !textRef.current) return;

      const lines = textRef.current.querySelectorAll('.transition-word');

      gsap.fromTo(
        lines,
        {
          opacity: 0.15,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 sm:py-48 relative overflow-hidden flex items-center justify-center text-center tech-grid-bg border-y"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="container-custom relative z-10">
        <div ref={textRef} className="flex flex-col items-center justify-center gap-2 sm:gap-4">
          <div className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 mb-2 font-semibold">
            // Core Engineering Lifecycle
          </div>

          {words.map((word, idx) => (
            <div
              key={idx}
              className="transition-word text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-heading tracking-tight select-none"
              style={{
                color: idx === 1 ? 'var(--accent-cyan)' : 'var(--text-primary)',
                textShadow: idx === 1 ? '0 0 40px rgba(0, 229, 255, 0.25)' : 'none',
              }}
            >
              {word}
            </div>
          ))}

          {subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-secondary max-w-xl mt-6 font-mono font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
