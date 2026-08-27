import React, { useRef, useState } from 'react';
import { Icons } from './icons/Icons';
import { ProfileData } from '../types/portfolio';

interface DeveloperIdBadgeProps {
  profile: ProfileData;
}

export const DeveloperIdBadge: React.FC<DeveloperIdBadgeProps> = ({ profile }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.6,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative flex flex-col items-center select-none perspective-[1200px]">
      
      {/* Top Lanyard Strap & Metallic Security Clip */}
      <div className="flex flex-col items-center pointer-events-none z-20">
        <div className="w-8 h-12 bg-gradient-to-b from-cyan-600/40 via-cyan-500/20 to-transparent border-x border-cyan-500/30 rounded-t-sm shadow-sm" />
        <div className="w-12 h-4 rounded-full bg-gradient-to-r from-slate-700 via-slate-500 to-slate-800 border border-slate-400/50 shadow-md -mt-2 flex items-center justify-center">
          <div className="w-5 h-1.5 rounded-full bg-slate-900" />
        </div>
      </div>

      {/* 3D Interactive ID Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="w-full max-w-[340px] sm:max-w-[370px] rounded-3xl p-6 glass-panel border border-cyan-500/40 shadow-2xl relative cursor-pointer overflow-hidden backdrop-blur-xl group -mt-2"
      >
        
        {/* Holographic Sheen & Glare Layer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0, 229, 255, 0.35) 0%, rgba(168, 85, 247, 0.15) 35%, transparent 70%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Laser Scanline Sweep Animation */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl opacity-30">
          <div className="w-full h-24 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent -translate-y-full animate-[scanline_4s_ease-in-out_infinite]" />
        </div>

        {/* Lanyard Hole Slot */}
        <div className="w-16 h-2.5 rounded-full bg-slate-900/90 border border-slate-700 mx-auto mb-4 shadow-inner" />

        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-black text-xs">
              MZ
            </div>
            <div>
              <div className="text-[11px] font-mono font-extrabold tracking-wider text-primary">
                AL MUNAWWARA
              </div>
              <div className="text-[9px] font-mono text-muted">
                ENGINEERING IDENTITY
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-pulse" />
            <span>VERIFIED ENG</span>
          </div>
        </div>

        {/* Portrait & Security Microchip Grid */}
        <div className="mt-5 grid grid-cols-12 gap-4 items-center">
          
          {/* Portrait Photo Container with Tech Frame */}
          <div className="col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-lg aspect-square bg-slate-900 group-hover:border-cyan-400 transition-colors">
              <img
                src="/assets/profile.png"
                alt="Mon Zhairel Lingasa"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
              {/* Subtle Grid Watermark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[8px] font-mono text-cyan-300 font-bold">
                <span>ENG-0824</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
            </div>
          </div>

          {/* Golden Security Microchip & Telemetry */}
          <div className="col-span-6 space-y-3 text-left">
            {/* Golden Smartcard Microchip SVG */}
            <div className="w-11 h-9 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-200/80 p-1 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="w-full h-px bg-amber-800/40" />
              <div className="w-full h-px bg-amber-800/40" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-amber-800/40" />
            </div>

            <div className="space-y-1 text-[10px] font-mono">
              <div className="text-muted">CLEARANCE:</div>
              <div className="font-bold text-cyan-600 dark:text-cyan-400">LEVEL 4 // SYS-ADMIN</div>
            </div>

            <div className="space-y-1 text-[10px] font-mono">
              <div className="text-muted">LOCATION:</div>
              <div className="font-bold text-primary">DAVAO CITY, PH</div>
            </div>
          </div>

        </div>

        {/* Identity Details */}
        <div className="mt-4 pt-3 border-t border-subtle text-left space-y-1">
          <div className="text-xs font-mono font-bold text-muted uppercase tracking-widest">
            OFFICIAL IDENTITY:
          </div>
          <div className="text-xl font-extrabold text-primary font-heading tracking-tight">
            MON ZHAIREL LINGASA
          </div>
          <div className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
            <Icons.Code size={13} />
            <span>SOFTWARE ENGINEER @ AMIS</span>
          </div>
        </div>

        {/* Security Barcode & QR Stamp Bar */}
        <div className="mt-4 pt-3 border-t border-subtle flex items-center justify-between">
          <div className="flex flex-col text-left">
            {/* Realistic Barcode Graphic */}
            <div className="flex items-center gap-0.5 h-6">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 1, 2].map((w, i) => (
                <span
                  key={i}
                  className="bg-primary/80 h-full inline-block"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-muted tracking-widest mt-0.5">
              ID: 2024-MZL-0824
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              download
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
              title="Download Verified CV"
            >
              <Icons.Download size={12} />
              <span>CV.PDF</span>
            </a>
          </div>
        </div>

        {/* Subtle Hint */}
        <div className="text-[9px] font-mono text-muted/60 mt-2 text-center">
          [ INTERACTIVE 3D IDENTITY BADGE ]
        </div>

      </div>

    </div>
  );
};
