import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icons } from './icons/Icons';
import { ExperienceItem } from '../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceProps {
  experience: ExperienceItem[];
}

type FilterCategory = 'all' | 'software-engineering' | 'web-mobile' | 'it-support';

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineProgressRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredExperience = activeFilter === 'all'
    ? experience
    : experience.filter(item => item.category === activeFilter);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!timelineRef.current || !lineProgressRef.current) return;

      // Scroll-driven line progress fill
      gsap.fromTo(
        lineProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.3,
          },
        }
      );

      // Card reveals
      const cards = timelineRef.current.querySelectorAll('.timeline-role-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0.3,
            y: 30,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end: 'bottom 50%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-32 relative tech-grid-bg border-t"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <Icons.Briefcase size={13} />
            <span>Career Progression & Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary font-heading">
            Engineering Experience
          </h2>
          <p className="text-secondary text-base sm:text-lg mt-3 max-w-2xl">
            Hands-on software development, production Laravel platforms, web applications, and institutional IT operations.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {[
              { id: 'all', label: 'All Roles (7)' },
              { id: 'software-engineering', label: 'Software Engineering / AMIS' },
              { id: 'web-mobile', label: 'Web & Mobile Dev' },
              { id: 'it-support', label: 'IT Support & OJT' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as FilterCategory)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-cyan-600 text-white dark:bg-cyan-400 dark:text-slate-950 shadow-md scale-105'
                    : 'bg-tertiary text-secondary hover:text-primary hover:bg-card border border-subtle'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Timeline Container */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto text-left">
          
          {/* Background Timeline Rail */}
          <div
            className="absolute top-0 bottom-0 left-4 sm:left-8 w-0.5"
            style={{ backgroundColor: 'var(--border-strong)' }}
          />
          
          {/* Animated Glowing Fill Line */}
          <div
            ref={lineProgressRef}
            className="absolute top-0 bottom-0 left-4 sm:left-8 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-500 to-purple-500 origin-top shadow-[0_0_12px_rgba(2,132,199,0.5)]"
          />

          <div className="space-y-16 pl-10 sm:pl-20">
            {filteredExperience.map((item) => (
              <div key={item.id} className="relative">
                
                {/* Milestone Node */}
                <div
                  className={`absolute -left-[35px] sm:-left-[57px] top-6 w-5 h-5 rounded-full border-4 flex items-center justify-center transition-transform ${
                    item.isCurrent
                      ? 'bg-emerald-500 ring-4 ring-emerald-500/30'
                      : 'bg-slate-400 dark:bg-slate-700'
                  }`}
                  style={{
                    borderColor: 'var(--bg-primary)',
                  }}
                >
                  {item.isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  )}
                </div>

                {/* Role Card */}
                <div className="timeline-role-card glass-panel p-6 sm:p-8 rounded-2xl transition-all hover:border-cyan-500/50">
                  
                  {/* Role Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-4 border-b border-subtle">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-primary font-heading">
                          {item.role}
                        </h3>
                        {item.isCurrent && (
                          <span className="badge badge-emerald font-mono text-xs shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-pulse" />
                            CURRENT ROLE
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-secondary mt-1 flex items-center gap-2">
                        <Icons.Building size={16} className="text-cyan-400" />
                        <span>{item.company}</span>
                        <span className="opacity-40">·</span>
                        <span className="text-muted font-normal">{item.location}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-card border border-subtle text-primary">
                      <Icons.Calendar size={13} className="text-cyan-400" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-secondary leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-muted font-bold mb-3">
                      Key Highlights &amp; Responsibilities:
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {item.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                          <Icons.Check size={14} className="text-cyan-400 mt-1 flex-shrink-0" />
                          <span className="leading-snug">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-4 border-t border-subtle">
                    <div className="text-xs font-mono uppercase tracking-wider text-muted font-bold mb-2">
                      Core Stack &amp; Tools:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-xs font-mono text-secondary"
                          style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Animated Milestone Promotion Connector Callout */}
                {item.promotedToNext && (
                  <div className="my-8 flex items-center justify-center">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-mono font-extrabold bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 text-emerald-300 border border-emerald-400/40 shadow-lg hover:scale-105 transition-transform">
                      <Icons.Sparkles size={15} className="animate-spin" style={{ animationDuration: '6s' }} />
                      <span>{item.promotedToNext}</span>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
