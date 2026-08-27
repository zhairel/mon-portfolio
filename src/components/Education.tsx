import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icons } from './icons/Icons';
import { EducationItem, LearningTopic } from '../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface EducationProps {
  education: EducationItem[];
  learningTopics: LearningTopic[];
}

export const Education: React.FC<EducationProps> = ({ education, learningTopics }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const blocks = containerRef.current.querySelectorAll('.edu-editorial-block');

      blocks.forEach((block) => {
        const year = block.querySelector('.edu-year');
        const title = block.querySelector('.edu-title');
        const school = block.querySelector('.edu-school');
        const badge = block.querySelector('.edu-badge');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            end: 'bottom 50%',
            toggleActions: 'play reverse play reverse',
          },
        });

        tl.fromTo(year, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
          .fromTo(title, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
          .fromTo(school, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3')
          .fromTo(badge, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, '-=0.2');
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={containerRef}
      className="py-32 relative tech-grid-bg border-t"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <Icons.GraduationCap size={13} />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary font-heading">
            Education &amp; Graduate Studies
          </h2>
        </div>

        {/* Large Editorial Education Displays */}
        <div className="space-y-16 max-w-4xl mx-auto text-left">
          
          {/* Master of IT (Ongoing) */}
          <div className="edu-editorial-block p-8 sm:p-12 rounded-3xl glass-panel border border-emerald-500/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5 font-mono text-8xl font-black text-primary">
              MIT
            </div>

            <div className="edu-year text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse" />
              <span>2026 — PRESENT</span>
            </div>

            <h3 className="edu-title text-3xl sm:text-5xl font-extrabold text-primary font-heading tracking-tight leading-tight mb-3">
              Master of Information Technology
            </h3>

            <div className="edu-school text-base sm:text-xl text-secondary font-medium mb-6 flex flex-wrap items-center gap-3">
              <span className="text-primary font-semibold">University of Southeastern Philippines (USeP)</span>
              <span className="opacity-40">·</span>
              <span className="text-muted text-sm font-normal">Davao City, Philippines</span>
            </div>

            <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-2xl mb-8">
              Advanced graduate studies concentrating on enterprise software engineering, scalable database architectures, cloud computing paradigms, and technology project leadership.
            </p>

            <div className="edu-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40">
              <Icons.Check size={14} />
              <span>ACTIVE ENROLLMENT / ONGOING DEGREE</span>
            </div>
          </div>

          {/* BS Computer Science (Completed) */}
          <div className="edu-editorial-block p-8 sm:p-12 rounded-3xl glass-panel border border-subtle relative overflow-hidden group">
            <div className="edu-year text-xs font-mono font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <Icons.Calendar size={13} />
              <span>GRADUATED: AUGUST 2024</span>
            </div>

            <h3 className="edu-title text-2xl sm:text-4xl font-extrabold text-primary font-heading tracking-tight leading-tight mb-3">
              Bachelor of Science in Computer Science
            </h3>

            <div className="edu-school text-base sm:text-lg text-secondary font-medium mb-6 flex flex-wrap items-center gap-3">
              <span className="text-primary font-semibold">University of Mindanao — Tagum College</span>
              <span className="opacity-40">·</span>
              <span className="text-muted text-sm font-normal">Tagum City, Philippines</span>
            </div>

            <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-2xl mb-6">
              Comprehensive foundational education in computer science, algorithms, relational database theory, full-stack web platforms, and software engineering methodologies.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
