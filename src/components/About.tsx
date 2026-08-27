import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icons } from './icons/Icons';
import { ProfileData } from '../types/portfolio';
import { DeveloperIdBadge } from './DeveloperIdBadge';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  profile: ProfileData;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingColRef = useRef<HTMLDivElement | null>(null);
  const storyListRef = useRef<HTMLDivElement | null>(null);

  const storyItems = [
    {
      num: "01",
      tag: "SOFTWARE ENGINEERING",
      title: "Production Application Architecture",
      text: "I am a Software Engineer at Al Munawwara Islamic School (AMIS), where I design, develop, deploy, and maintain web-based systems used for school operations daily."
    },
    {
      num: "02",
      tag: "FULL-STACK DEVELOPMENT",
      title: "Robust Full-Stack Execution",
      text: "My core work spans full-stack software development, relational database design with MySQL/MariaDB, automated PDF generation, and responsive client-side experiences."
    },
    {
      num: "03",
      tag: "SYSTEM INTEGRATIONS",
      title: "Enterprise Identity & APIs",
      text: "I integrate Microsoft 365, Microsoft Entra, and Microsoft Graph services into school portals to streamline single sign-on (SSO), directory synchronization, and communications."
    },
    {
      num: "04",
      tag: "INFRASTRUCTURE & DEPLOYMENT",
      title: "Reliability, Backups & Security",
      text: "I manage Linux server environments, Apache virtual hosts, cPanel deployments, Cloudflare security layers, and automated disaster-recovery backup pipelines."
    },
    {
      num: "05",
      tag: "REAL-WORLD IMPACT",
      title: "Solving Practical Operational Challenges",
      text: "Before becoming a Software Engineer, I worked as an IT Staff / Full-Stack Laravel Developer at AMIS. I am also pursuing a Master of Information Technology at USeP."
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !storyListRef.current) return;

      const items = storyListRef.current.querySelectorAll('.story-item');

      items.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0.2,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              end: 'bottom 45%',
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
      id="about"
      ref={containerRef}
      className="py-32 relative tech-dot-bg border-t"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="container-custom relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Pinned Storytelling Headline & 3D Animated Developer ID Badge */}
          <div
            ref={headingColRef}
            className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 text-left flex flex-col items-center lg:items-start"
          >
            <div className="space-y-4 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                <Icons.Activity size={13} className="live-pulse" />
                <span>Story &amp; Background</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary font-heading tracking-tight leading-[1.1]">
                I build systems that solve real problems.
              </h2>

              <p className="text-secondary text-sm sm:text-base leading-relaxed">
                Software engineering isn't just about writing code — it's about solving organizational bottlenecks, simplifying workflows, and delivering dependable software for administrators, teachers, parents, and students.
              </p>

              <div className="pt-3 border-t border-subtle grid grid-cols-2 gap-4 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-primary">6+</div>
                  <div className="text-xs font-mono text-muted uppercase">Production Systems</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-cyan-600 dark:text-cyan-400">MIT</div>
                  <div className="text-xs font-mono text-muted uppercase">USeP (Ongoing)</div>
                </div>
              </div>
            </div>

            {/* 3D Holographic Developer Identity Card */}
            <div className="w-full flex justify-center lg:justify-start pt-2">
              <DeveloperIdBadge profile={profile} />
            </div>
          </div>

          {/* Right Column: Sequential Narrative Paragraphs */}
          <div ref={storyListRef} className="lg:col-span-7 space-y-8 text-left">
            {storyItems.map((item, idx) => (
              <div
                key={idx}
                className="story-item p-6 sm:p-8 rounded-2xl glass-panel transition-all hover:border-cyan-500/40 relative group"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 tracking-wider">
                    // {item.num} · {item.tag}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-colors" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-primary font-heading mb-3">
                  {item.title}
                </h3>

                <p className="text-secondary text-sm sm:text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
