import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icons } from './icons/Icons';
import { CertificationItem } from '../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface CertificationsProps {
  certifications: CertificationItem[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const rows = containerRef.current.querySelectorAll('.cert-row');

      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          {
            x: i % 2 === 0 ? -40 : 40,
            opacity: 0.2,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'bottom 50%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="py-24 relative tech-dot-bg border-t"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="container-custom relative z-10 max-w-4xl text-left">
        
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 mb-3">
            <Icons.Award size={13} />
            <span>National Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary font-heading">
            Verified Certifications
          </h2>
        </div>

        <div className="space-y-4">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="cert-row p-6 sm:p-8 rounded-2xl glass-panel border border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-cyan-500/40 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-500/10 text-purple-400 border border-purple-500/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icons.Award size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary font-heading group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-secondary font-medium mt-0.5">
                    {cert.issuer}
                  </div>
                  <p className="text-xs text-muted mt-2 max-w-xl">
                    {cert.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <span className="badge badge-emerald font-mono text-[11px]">
                  <Icons.Check size={12} />
                  <span>Verified NC II</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
