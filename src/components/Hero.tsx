import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icons } from './icons/Icons';
import { ProfileData } from '../types/portfolio';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  profile: ProfileData;
}

const rolesList = [
  "Software Engineer",
  "Full-Stack Developer",
  "Web Application Developer",
  "Systems Developer",
  "IT Staff",
  "IT Support Specialist",
  "Systems Administrator",
  "Technical Support Specialist",
  "Database Developer",
  "Automation Developer"
];

const GLYPHS = "!<>-_\\/[]{}—=+*^?#_01";

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const portraitContainerRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const bgGlowRef = useRef<HTMLDivElement | null>(null);

  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Modern Text Scramble Decryption State
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(rolesList[0]);
  const animationFrameRef = useRef<number | null>(null);
  const displayedTextRef = useRef(rolesList[0]);

  displayedTextRef.current = displayedText;

  const scrambleTo = (targetText: string) => {
    let frame = 0;
    const totalFrames = 18;
    const fromText = displayedTextRef.current;
    const maxLen = Math.max(fromText.length, targetText.length);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const update = () => {
      let output = '';
      const progress = (frame / totalFrames) * maxLen;

      for (let i = 0; i < maxLen; i++) {
        const targetChar = targetText[i] || '';
        if (i < progress) {
          output += targetChar;
        } else {
          output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayedText(output);

      if (frame < totalFrames) {
        frame++;
        animationFrameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayedText(targetText);
      }
    };

    update();
  };

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRoleIndex((prev) => {
        const nextIndex = (prev + 1) % rolesList.length;
        scrambleTo(rolesList[nextIndex]);
        return nextIndex;
      });
    }, 2800);

    return () => {
      clearInterval(roleTimer);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // GSAP 2-Column Hero Entrance & Subtle Parallax
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Left Content Entrance
      tl.fromTo(
        leftContentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, delay: 0.1, clearProps: 'transform,opacity' }
      )
      // Right Portrait Entrance (Slide from Right, Scale, Blur to Sharp)
      .fromTo(
        portraitContainerRef.current,
        { x: 50, opacity: 0, scale: 0.96, filter: 'blur(6px)' },
        { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9, clearProps: 'transform,opacity,filter' },
        '-=0.6'
      );

      // Subtle Parallax on Right Portrait while scrolling through Hero
      if (containerRef.current && portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: 25,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const githubLink = profile.socialLinks.find(s => s.name === 'GitHub')?.url || 'https://github.com/zhairel';

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-14 flex flex-col justify-between overflow-hidden tech-grid-bg text-primary"
    >
      {/* Subtle Ambient Background Glow */}
      <div
        ref={bgGlowRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50 z-0"
      >
        <div className="w-[650px] h-[650px] rounded-full bg-cyan-500/10 blur-[140px] -left-20 top-20" />
        <div className="w-[550px] h-[550px] rounded-full bg-purple-500/10 blur-[150px] right-10 bottom-20" />
      </div>

      {/* Developer Telemetry Coordinates */}
      <div className="hidden lg:flex items-center justify-between container-custom text-[11px] font-mono text-muted uppercase tracking-widest pt-2 relative z-10 select-none opacity-70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse" />
          <span>POSITION: DAVAO CITY [8.2280° N, 125.6885° E]</span>
        </div>
        <div className="flex items-center gap-3">
          <span>LATENCY: 0MS</span>
          <span className="opacity-30">/</span>
          <span>STATUS: ONLINE</span>
          <span className="opacity-30">/</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">AMIS CORE ENG</span>
        </div>
      </div>

      {/* 2-COLUMN HERO MAIN STAGE */}
      <div className="container-custom relative z-10 my-auto py-8 lg:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN: 58% Main Information */}
          <div ref={leftContentRef} className="lg:col-span-7 flex flex-col text-left space-y-6">
            
            {/* Status & Availability Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Key Availability Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse" />
                <span>OPEN TO PART-TIME · NIGHT SHIFT · REMOTE</span>
              </div>

              {/* Core Role Title Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider text-secondary glass-panel shadow-sm">
                <span className="text-cyan-600 dark:text-cyan-400">SOFTWARE ENGINEER</span>
                <span className="opacity-30">·</span>
                <span className="text-primary font-bold">FULL-STACK DEVELOPER</span>
              </div>
            </div>

            {/* Large Name (2 Balanced Lines) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black font-heading tracking-tight uppercase select-none text-primary leading-[0.95] py-1">
              <div>MON <span className="animated-gradient-text">ZHAIREL</span></div>
              <div className="text-secondary hover:text-primary transition-colors cursor-pointer" data-cursor="LINGASA">
                LINGASA
              </div>
            </h1>

            {/* Modern Cyberpunk Terminal Scramble Role Ticker */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-cyan-500 live-pulse" />
                <span>ROLE {String(currentRoleIndex + 1).padStart(2, '0')} / {String(rolesList.length).padStart(2, '0')}</span>
              </div>

              <div className="flex items-center font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-primary min-h-[38px]">
                <span className="font-mono text-cyan-500 mr-2 text-lg font-bold">&gt;</span>
                <span className="tracking-tight text-primary">
                  {displayedText}
                </span>
                <span className="inline-block w-2.5 h-6 bg-cyan-500 ml-2 animate-pulse" />
              </div>
            </div>
            
            {/* Short Professional Narrative */}
            <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed max-w-xl">
              I design, develop, and maintain practical web-based systems that improve organizational efficiency, automate workflows, and deliver dependable user experiences.
            </p>

            {/* Mobile Portrait (Stacked naturally before tech stack & CTAs) */}
            <div className="lg:hidden w-full flex justify-center py-2">
              <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-subtle bg-gradient-to-b from-slate-900/60 to-slate-950/80">
                <img
                  src="/assets/profile.png"
                  alt="Mon Zhairel Lingasa"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>
            </div>

            {/* Core Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 pt-1 max-w-xl">
              {profile.primaryTechStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold text-secondary hover:border-cyan-500/40 transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action CTAs & Direct Contact Channels */}
            <div className="pt-2 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton strength={20}>
                  <button
                    onClick={() => scrollTo('projects')}
                    className="btn-primary py-3.5 px-6 text-sm font-bold tracking-wide group shadow-xl hover:shadow-cyan-500/20"
                    data-cursor="EXPLORE"
                  >
                    <span>View My Projects</span>
                    <Icons.ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </MagneticButton>

                <MagneticButton strength={20}>
                  <a
                    href={profile.resumeUrl}
                    download
                    className="btn-secondary py-3.5 px-5 text-sm font-bold tracking-wide"
                    data-cursor="RESUME"
                  >
                    <Icons.Download size={17} />
                    <span>CV</span>
                  </a>
                </MagneticButton>

                <MagneticButton strength={20}>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="btn-outline py-3.5 px-5 text-sm font-bold tracking-wide"
                    data-cursor="CONTACT"
                  >
                    <Icons.Mail size={17} />
                    <span>Contact</span>
                  </button>
                </MagneticButton>
              </div>

              {/* Direct Channels */}
              <div className="flex items-center flex-wrap gap-3 pt-1">
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-secondary hover:text-primary transition-all hover:scale-110"
                  style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}
                  data-cursor="OPEN"
                  title="GitHub Profile"
                >
                  <Icons.Github size={18} />
                </a>

                <button
                  onClick={copyPhone}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: copiedPhone ? 'var(--accent-emerald)' : 'var(--border-subtle)',
                    color: copiedPhone ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                  }}
                  data-cursor="COPY"
                  title="Click to copy phone number"
                >
                  {copiedPhone ? <Icons.Check size={14} className="text-emerald-500" /> : <Icons.Phone size={14} />}
                  <span>{copiedPhone ? 'Phone Copied!' : profile.phone}</span>
                </button>

                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: copied ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                    color: copied ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  }}
                  data-cursor="COPY"
                  title="Click to copy email"
                >
                  {copied ? <Icons.Check size={14} className="text-cyan-500" /> : <Icons.Mail size={14} />}
                  <span>{copied ? 'Copied!' : profile.email}</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 42% LARGE PROFILE PORTRAIT */}
          <div ref={portraitContainerRef} className="hidden lg:flex col-span-5 justify-center items-end relative select-none">
            
            {/* Subtle Ambient Rim Glow Behind Portrait */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[380px] h-[480px] rounded-full bg-cyan-500/15 blur-[110px]" />
              <div className="w-[300px] h-[400px] rounded-full bg-purple-500/15 blur-[120px] translate-x-8 translate-y-8" />
            </div>

            {/* Large Professional Portrait Frame */}
            <div
              ref={portraitRef}
              className="relative w-full max-w-[420px] xl:max-w-[480px] flex items-end justify-center will-change-transform"
            >
              <img
                src="/assets/profile.png"
                alt="Mon Zhairel B. Lingasa - Software Engineer"
                className="w-full h-auto max-h-[620px] object-contain object-bottom select-none pointer-events-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                }}
                loading="eager"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="container-custom flex items-center justify-between text-xs font-mono text-muted relative z-10 pt-4 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <span>SCROLL TO EXPLORE ARCHITECTURE</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 animate-bounce">
          <span>↓</span>
          <span>DISCOVER WORK</span>
        </div>
      </div>
    </section>
  );
};
