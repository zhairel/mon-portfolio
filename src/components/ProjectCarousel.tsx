import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './icons/Icons';
import { ProjectItem } from '../types/portfolio';

interface ProjectCarouselProps {
  project: ProjectItem;
  onEnlargeImage: (image: { src: string; title: string; caption?: string }) => void;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  project,
  onEnlargeImage
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Collect all available images for this project
  const images = project.caseStudy.screenshots && project.caseStudy.screenshots.length > 0
    ? project.caseStudy.screenshots
    : project.mockupImage
      ? [{ title: project.title, caption: project.tagline, src: project.mockupImage }]
      : [];

  // Reset to first slide whenever the project changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [project.id]);

  // Auto-play timer
  useEffect(() => {
    if (images.length <= 1 || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, isHovered, currentIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className="p-6 text-left font-mono text-xs bg-[#050811] text-slate-300 min-h-[380px] flex flex-col justify-between">
        <div>
          <div className="text-slate-500 text-xs mb-3">// Production Architecture &amp; Service Layer</div>
          <pre className="overflow-x-auto text-cyan-300 leading-relaxed font-mono">
            {project.mockupPlaceholder.previewCode || `// ${project.title}\nclass ${project.shortTitle.replace(/[^a-zA-Z0-9]/g, '')}Service {\n  // System operational\n}`}
          </pre>
        </div>
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-muted">
          <span>✓ MySQL / MariaDB Normalized Schema</span>
          <span>✓ RBAC Guard Enforced</span>
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      className="relative w-full h-[400px] sm:h-[430px] bg-slate-950 overflow-hidden flex flex-col justify-between group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Active Slide Image */}
      <div
        onClick={() => onEnlargeImage({ src: currentImage.src, title: currentImage.title, caption: currentImage.caption })}
        className="relative w-full h-full flex items-center justify-center p-3 cursor-pointer"
        title="Click to enlarge screenshot"
      >
        <img
          key={currentImage.src}
          src={currentImage.src}
          alt={currentImage.title}
          className="w-full h-full object-contain rounded-xl shadow-2xl transition-all duration-500 animate-fadeIn"
          onError={(e) => {
            const parent = (e.target as HTMLElement).parentElement;
            if (parent && project.mockupPlaceholder.previewCode) {
              parent.innerHTML = `<pre class="p-6 text-xs font-mono text-cyan-300 overflow-x-auto w-full text-left">${project.mockupPlaceholder.previewCode}</pre>`;
            }
          }}
        />

        {/* Hover Enlarge Cue */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-mono backdrop-blur-[2px] pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/20 flex items-center gap-2 shadow-xl">
            <Icons.ZoomIn size={15} className="text-cyan-400" />
            <span>Click to enlarge view</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrow Controls (Visible on hover or when multiple images exist) */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 cursor-pointer z-10"
            aria-label="Previous image"
          >
            <Icons.ChevronRight size={18} className="rotate-180" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 cursor-pointer z-10"
            aria-label="Next image"
          >
            <Icons.ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Bottom Floating Sleek Caption & Dots HUD */}
      <div className="absolute bottom-3 left-3 right-3 py-2 px-3.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 flex items-center justify-between gap-3 text-left transition-transform duration-300">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 flex-shrink-0">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="text-xs font-semibold text-slate-200 truncate">
            {currentImage.title}
          </span>
        </div>

        {/* Carousel Pagination Dots */}
        {images.length > 1 && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => handleDotClick(e, idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer border-0 p-0 ${
                  currentIndex === idx
                    ? 'w-6 bg-cyan-400'
                    : 'w-2 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Jump to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
