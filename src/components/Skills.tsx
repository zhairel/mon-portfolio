import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icons } from './icons/Icons';
import { SkillCategory } from '../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  categories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ categories }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);
  const row3Ref = useRef<HTMLDivElement | null>(null);

  const row1 = [
    { name: "LARAVEL", highlight: true },
    { name: "PHP 8", highlight: true },
    { name: "REST APIs", highlight: true },
    { name: "MYSQL", highlight: true },
    { name: "MARIADB", highlight: false },
    { name: "POSTGRESQL", highlight: false },
    { name: "NODE.JS", highlight: false },
    { name: "LARAVEL", highlight: true },
    { name: "PHP 8", highlight: true },
    { name: "REST APIs", highlight: true },
    { name: "MYSQL", highlight: true },
  ];

  const row2 = [
    { name: "TYPESCRIPT", highlight: true },
    { name: "JAVASCRIPT", highlight: true },
    { name: "REACT", highlight: true },
    { name: "VUE.JS", highlight: false },
    { name: "ANGULAR", highlight: false },
    { name: "FLUTTER", highlight: true },
    { name: "HTML5 / CSS3", highlight: false },
    { name: "TYPESCRIPT", highlight: true },
    { name: "JAVASCRIPT", highlight: true },
    { name: "REACT", highlight: true },
  ];

  const row3 = [
    { name: "LINUX UBUNTU", highlight: true },
    { name: "APACHE SERVER", highlight: true },
    { name: "CPANEL / WHM", highlight: true },
    { name: "CLOUDFLARE WAF", highlight: true },
    { name: "MICROSOFT GRAPH API", highlight: true },
    { name: "MICROSOFT ENTRA", highlight: true },
    { name: "GIT / GITHUB", highlight: false },
    { name: "LINUX UBUNTU", highlight: true },
    { name: "APACHE SERVER", highlight: true },
    { name: "CLOUDFLARE WAF", highlight: true },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const isMobile = window.innerWidth < 768;
    const shiftPercent = isMobile ? 8 : 16;

    const ctx = gsap.context(() => {
      // 1. Subtle heading reveal on scroll entrance
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Row 1: Moves slowly left on vertical scroll
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          xPercent: -shiftPercent,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 3. Row 2: Moves slowly right on vertical scroll
      if (row2Ref.current) {
        gsap.fromTo(
          row2Ref.current,
          { xPercent: -shiftPercent },
          {
            xPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // 4. Row 3: Moves slowly left on vertical scroll
      if (row3Ref.current) {
        gsap.to(row3Ref.current, {
          xPercent: -shiftPercent,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-32 relative overflow-hidden tech-dot-bg border-t"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div ref={headingRef} className="container-custom relative z-10 mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-3">
          <Icons.Cpu size={13} />
          <span>Core Competencies</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary font-heading">
          Technologies I Work With
        </h2>
        <p className="text-secondary text-base sm:text-lg mt-3 max-w-2xl">
          Scroll-synchronized technology streams representing backend architecture, client-side engineering, and production infrastructure.
        </p>
      </div>

      {/* Scroll-Driven Row 1 (Moves Left) */}
      <div className="py-2.5 overflow-hidden whitespace-nowrap select-none">
        <div ref={row1Ref} className="inline-flex items-center gap-6 text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight will-change-transform">
          {row1.map((item, idx) => (
            <span
              key={idx}
              className={`px-4 py-2 rounded-2xl border ${
                item.highlight
                  ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
                  : 'text-secondary bg-card border-subtle'
              }`}
            >
              {item.name} <span className="opacity-30 text-2xl mx-2">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll-Driven Row 2 (Moves Right) */}
      <div className="py-2.5 overflow-hidden whitespace-nowrap select-none my-2">
        <div ref={row2Ref} className="inline-flex items-center gap-6 text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight will-change-transform">
          {row2.map((item, idx) => (
            <span
              key={idx}
              className={`px-4 py-2 rounded-2xl border ${
                item.highlight
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30'
                  : 'text-secondary bg-card border-subtle'
              }`}
            >
              {item.name} <span className="opacity-30 text-2xl mx-2">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll-Driven Row 3 (Moves Left) */}
      <div className="py-2.5 overflow-hidden whitespace-nowrap select-none">
        <div ref={row3Ref} className="inline-flex items-center gap-6 text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight will-change-transform">
          {row3.map((item, idx) => (
            <span
              key={idx}
              className={`px-4 py-2 rounded-2xl border ${
                item.highlight
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  : 'text-secondary bg-card border-subtle'
              }`}
            >
              {item.name} <span className="opacity-30 text-2xl mx-2">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Categorized Summary Grid Below Stream */}
      <div className="container-custom mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl glass-panel border border-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                    // {cat.name}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
                </div>
                <p className="text-xs text-muted leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-subtle">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono ${
                      s.highlight
                        ? 'text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 font-semibold'
                        : 'text-secondary bg-tertiary border border-subtle'
                    }`}
                    title={s.context}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
