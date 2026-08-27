import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icons } from './icons/Icons';
import { ProjectItem } from '../types/portfolio';
import { CaseStudyModal } from './CaseStudyModal';
import { ImageViewerModal } from './ImageViewerModal';
import { ProjectCarousel } from './ProjectCarousel';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  projects: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [imageModal, setImageModal] = useState<{ src: string; title: string; caption?: string } | null>(null);

  // Desktop Pinned Scroll-Driven GSAP Master Timeline
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    if (prefersReducedMotion || isMobile || !containerRef.current || !pinSectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const totalProjects = projects.length;
      if (totalProjects <= 1) return;

      const slidesLeft = pinSectionRef.current?.querySelectorAll('.desktop-slide-left');
      const slidesRight = pinSectionRef.current?.querySelectorAll('.desktop-slide-right');
      const bgNumbers = pinSectionRef.current?.querySelectorAll('.desktop-bg-number');

      if (!slidesLeft || !slidesRight || slidesLeft.length === 0) return;

      // Set initial states: Slide 0 visible, Slides 1..N hidden to the right
      slidesLeft.forEach((el, i) => {
        if (i === 0) {
          gsap.set(el, { x: 0, opacity: 1, filter: 'blur(0px)', scale: 1, pointerEvents: 'auto' });
        } else {
          gsap.set(el, { x: 40, opacity: 0, filter: 'blur(6px)', scale: 0.97, pointerEvents: 'none' });
        }
      });

      slidesRight.forEach((el, i) => {
        if (i === 0) {
          gsap.set(el, { x: 0, opacity: 1, filter: 'blur(0px)', scale: 1, pointerEvents: 'auto' });
        } else {
          gsap.set(el, { x: 50, opacity: 0, filter: 'blur(6px)', scale: 0.97, pointerEvents: 'none' });
        }
      });

      if (bgNumbers) {
        bgNumbers.forEach((el, i) => {
          if (i === 0) {
            gsap.set(el, { y: 0, opacity: 1 });
          } else {
            gsap.set(el, { y: 40, opacity: 0 });
          }
        });
      }

      // Build the Master Timeline
      const masterTl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
      });

      // For each project transition (0 -> 1, 1 -> 2, ..., N-2 -> N-1)
      for (let i = 0; i < totalProjects - 1; i++) {
        const outgoingLeft = slidesLeft[i];
        const outgoingRight = slidesRight[i];
        const outgoingBg = bgNumbers ? bgNumbers[i] : null;

        const incomingLeft = slidesLeft[i + 1];
        const incomingRight = slidesRight[i + 1];
        const incomingBg = bgNumbers ? bgNumbers[i + 1] : null;

        const transitionPosition = i * 2; // Step marker in timeline

        // 1. Current Project Outgoing (move left, fade out, subtle blur, scale 1 -> 0.97)
        masterTl.to(
          outgoingLeft,
          {
            x: -35,
            opacity: 0,
            filter: 'blur(6px)',
            scale: 0.97,
            duration: 0.65,
            pointerEvents: 'none',
          },
          transitionPosition
        );

        masterTl.to(
          outgoingRight,
          {
            x: -30,
            opacity: 0,
            filter: 'blur(6px)',
            scale: 0.97,
            duration: 0.65,
            pointerEvents: 'none',
          },
          transitionPosition + 0.08
        );

        if (outgoingBg) {
          masterTl.to(
            outgoingBg,
            {
              y: -40,
              opacity: 0,
              duration: 0.55,
            },
            transitionPosition
          );
        }

        // 2. Next Project Incoming (enter from right, opacity 0 -> 1, blur -> sharp, scale 0.97 -> 1)
        masterTl.to(
          incomingLeft,
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 0.65,
            pointerEvents: 'auto',
          },
          transitionPosition + 0.45
        );

        masterTl.to(
          incomingRight,
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 0.65,
            pointerEvents: 'auto',
          },
          transitionPosition + 0.53
        );

        if (incomingBg) {
          masterTl.to(
            incomingBg,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
            },
            transitionPosition + 0.48
          );
        }
      }

      // Add a small dwell buffer at the end so Project 06 stays visible before unpinning
      masterTl.to({}, { duration: 0.5 });

      // Create Pinned ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalProjects * 900}`,
        pin: pinSectionRef.current,
        scrub: 0.5,
        snap: {
          snapTo: 1 / (totalProjects - 1),
          duration: 0.38,
          ease: 'power2.inOut',
        },
        animation: masterTl,
        onUpdate: (self) => {
          const rawIdx = Math.round(self.progress * (totalProjects - 1));
          const boundedIdx = Math.max(0, Math.min(totalProjects - 1, rawIdx));
          setActiveProjectIndex(boundedIdx);

          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });

      scrollTriggerInstanceRef.current = st;
    }, containerRef);

    return () => ctx.revert();
  }, [projects.length]);

  // Jump smoothly to a specific project index on dot click
  const jumpToProject = (targetIndex: number) => {
    setActiveProjectIndex(targetIndex);
    const st = scrollTriggerInstanceRef.current;
    if (st) {
      const scrollDistance = st.end - st.start;
      const targetScroll = st.start + (targetIndex / (projects.length - 1)) * scrollDistance;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  // Mobile scroll-in reveals
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.mobile-project-card');
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative border-t border-subtle">
      
      {/* DESKTOP PINNED STORYTELLING SHOWCASE (Hidden on Mobile) */}
      <div
        ref={pinSectionRef}
        className="hidden lg:flex h-screen w-full flex-col justify-between py-8 px-6 xl:px-12 tech-grid-bg relative overflow-hidden select-none"
      >
        {/* Background Ambient Glow */}
        <div
          className="ambient-glow-cyan w-[600px] h-[600px] top-1/4 right-1/4 opacity-25 pointer-events-none transition-all duration-700"
        />

        {/* Huge Decorative Project Numbers Layer Behind Content */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[30rem] h-[30rem] flex items-center justify-center pointer-events-none z-0">
          {projects.map((_, idx) => (
            <div
              key={idx}
              className="desktop-bg-number absolute inset-0 flex items-center justify-center text-[22rem] font-black font-heading text-primary/[0.035] leading-none select-none will-change-transform"
            >
              0{idx + 1}
            </div>
          ))}
        </div>

        {/* Top Progress Bar & Counter Header */}
        <div className="container-custom relative z-20 w-full pt-2">
          <div className="flex flex-col gap-3 pb-4 border-b border-subtle">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="badge badge-cyan font-mono text-xs font-semibold uppercase tracking-wider shadow-xs">
                  <Icons.Layers size={13} />
                  <span>Featured Systems Showcase</span>
                </div>
                <span className="text-xs font-mono text-muted">
                  // System 0{activeProjectIndex + 1} of 0{projects.length}
                </span>
              </div>

              {/* Six Interactive Project Step Indicators */}
              <div className="flex items-center gap-2">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => jumpToProject(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer border-0 ${
                      activeProjectIndex === idx
                        ? 'w-10 bg-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.7)]'
                        : 'w-3 bg-tertiary hover:bg-slate-500'
                    }`}
                    aria-label={`Jump to project 0${idx + 1}: ${p.title}`}
                    title={`System 0${idx + 1}: ${p.title}`}
                  />
                ))}
              </div>
            </div>

            {/* Continuous Scroll-Driven Progress Bar */}
            <div className="w-full h-1 bg-tertiary rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500 origin-left transition-transform duration-100 ease-linear"
                style={{ transform: `scaleX(${(activeProjectIndex + 1) / projects.length})` }}
              />
            </div>
          </div>
        </div>

        {/* Main Pinned Projects Stage (Absolute-Stacked Slides) */}
        <div className="container-custom relative z-10 w-full my-auto flex-1 flex items-center">
          <div className="relative w-full h-[540px] xl:h-[580px]">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="absolute inset-0 grid grid-cols-12 gap-8 xl:gap-12 items-center"
              >
                
                {/* Left Column: Project Details Panel */}
                <div className="desktop-slide-left col-span-5 flex flex-col text-left space-y-4 xl:space-y-5 will-change-transform">
                  
                  {/* Category & Flagship Badges */}
                  <div className="flex items-center gap-2.5">
                    <span className="badge badge-purple font-mono text-xs font-bold shadow-xs">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="badge badge-emerald font-mono text-xs shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-pulse" />
                        Flagship System
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-primary font-heading tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-secondary text-xs sm:text-sm mt-1.5 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Operational Problem & Engineering Solution Cards */}
                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-2xl border border-subtle bg-card project-card-interactive shadow-xs">
                      <div className="text-[11px] font-mono font-bold text-rose-500 dark:text-rose-400 mb-1 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span>Operational Problem:</span>
                      </div>
                      <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl border border-subtle bg-card project-card-interactive shadow-xs">
                      <div className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Engineering Solution:</span>
                      </div>
                      <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Core Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="project-tech-pill px-2.5 py-1 rounded-lg text-[11px] font-mono text-secondary bg-tertiary border border-subtle cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action CTAs */}
                  <div className="flex items-center gap-3 pt-2">
                    <MagneticButton strength={20}>
                      <button
                        onClick={() => setSelectedCaseStudy(project)}
                        className="btn-primary py-2.5 px-4 xl:py-3 xl:px-5 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/20"
                        data-cursor="CASE STUDY"
                      >
                        <Icons.FileText size={14} />
                        <span>View Case Study</span>
                      </button>
                    </MagneticButton>

                    {project.demoUrl ? (
                      <MagneticButton strength={20}>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary py-2.5 px-4 xl:py-3 xl:px-4 text-xs font-bold uppercase tracking-wider"
                          data-cursor="LIVE"
                        >
                          <Icons.ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      </MagneticButton>
                    ) : (
                      <button
                        disabled
                        className="btn-secondary py-2.5 px-3.5 xl:py-3 xl:px-4 text-xs btn-disabled cursor-not-allowed opacity-60"
                        title="Institutional platform with restricted access"
                      >
                        <Icons.Lock size={13} />
                        <span>Internal Demo</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* Right Column: Screenshot Mockup Window */}
                <div className="desktop-slide-right col-span-7 will-change-transform">
                  <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-slate-950/90 shadow-2xl transition-all duration-500 hover:border-cyan-500/40">
                    {/* Browser Mockup Header Bar */}
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="text-[11px] font-mono text-slate-400 ml-2">
                          https://amis.edu.ph/system/{project.id}
                        </span>
                      </div>
                      <div className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 font-semibold border border-cyan-500/20">
                        {project.mockupPlaceholder.badgeText}
                      </div>
                    </div>

                    {/* Sleek Non-Messy In-Window Screenshot Carousel */}
                    <ProjectCarousel
                      project={project}
                      onEnlargeImage={(img) => setImageModal(img)}
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pinned Footer Info */}
        <div className="container-custom relative z-20 w-full flex items-center justify-between text-[11px] font-mono text-muted pt-2 border-t border-subtle select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 live-pulse" />
            <span>SCROLL TO ADVANCE PROJECTS [01 → 06]</span>
          </div>
          <div className="flex items-center gap-3">
            <span>SNAP SCROLL ACTIVE</span>
            <span className="opacity-30">/</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">AL MUNAWWARA ISLAMIC SCHOOL</span>
          </div>
        </div>

      </div>

      {/* MOBILE / TABLET VERTICALLY STACKED PROJECT SHOWCASE (No Overflow) */}
      <div className="lg:hidden py-20 tech-grid-bg">
        <div className="container-custom space-y-12">
          
          <div className="text-left space-y-3">
            <div className="badge badge-cyan font-mono text-xs font-semibold uppercase">
              <Icons.Layers size={13} />
              <span>Featured Systems</span>
            </div>
            <h2 className="text-3xl font-extrabold text-primary font-heading">
              Production Web Applications
            </h2>
            <p className="text-secondary text-sm">
              Real-world institutional platforms developed and maintained for Al Munawwara Islamic School.
            </p>
          </div>

          <div className="space-y-10">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="mobile-project-card glass-panel p-5 sm:p-6 rounded-2xl space-y-5 text-left border project-card-interactive"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-500">
                    // PROJECT 0{idx + 1} OF 0{projects.length}
                  </span>
                  <span className="badge badge-purple font-mono text-[11px]">
                    {proj.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-primary font-heading">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-secondary mt-1">
                    {proj.tagline}
                  </p>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
                  <ProjectCarousel
                    project={proj}
                    onEnlargeImage={(img) => setImageModal(img)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl border border-subtle bg-card text-xs text-secondary leading-relaxed">
                    <span className="text-rose-500 font-mono font-bold block mb-0.5">Problem:</span>
                    {proj.problem}
                  </div>
                  <div className="p-3 rounded-xl border border-subtle bg-card text-xs text-secondary leading-relaxed">
                    <span className="text-emerald-500 font-mono font-bold block mb-0.5">Solution:</span>
                    {proj.solution}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.slice(0, 5).map((t) => (
                    <span key={t} className="project-tech-pill px-2 py-0.5 rounded text-[11px] font-mono bg-tertiary border border-subtle">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => setSelectedCaseStudy(proj)}
                    className="btn-primary py-2.5 px-4 text-xs font-bold flex-1 shadow-md"
                  >
                    <Icons.FileText size={14} />
                    <span>Case Study</span>
                  </button>

                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary py-2.5 px-4 text-xs font-bold"
                    >
                      <Icons.ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Structured 14-Section Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Screenshot Zoom Modal */}
      {imageModal && (
        <ImageViewerModal
          isOpen={true}
          onClose={() => setImageModal(null)}
          imageSrc={imageModal.src}
          imageTitle={imageModal.title}
          imageCaption={imageModal.caption}
        />
      )}
    </section>
  );
};
