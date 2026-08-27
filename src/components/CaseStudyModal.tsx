import React, { useState } from 'react';
import { Icons } from './icons/Icons';
import { ProjectItem } from '../types/portfolio';
import { ImageViewerModal } from './ImageViewerModal';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; caption?: string } | null>(null);

  if (!isOpen || !project) return null;

  const { caseStudy } = project;

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="modal-content text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div
            className="sticky top-0 z-20 px-6 sm:px-8 py-5 border-b flex items-center justify-between"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-cyan font-mono text-[11px] uppercase tracking-wider">
                  Case Study
                </span>
                <span className="text-xs font-mono text-muted">
                  {project.category}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-primary font-heading tracking-tight">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer border"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
              aria-label="Close Case Study"
            >
              <Icons.X size={20} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 space-y-12 divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
            
            {/* 1. Project Overview & Quick Meta Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <div>
                  <div className="text-[11px] font-mono uppercase text-muted font-bold">My Role</div>
                  <div className="text-xs sm:text-sm font-semibold text-primary mt-0.5">{project.role}</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-muted font-bold">Institution</div>
                  <div className="text-xs sm:text-sm font-semibold text-primary mt-0.5">Al Munawwara Islamic School</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-muted font-bold">Core Stack</div>
                  <div className="text-xs sm:text-sm font-semibold text-primary mt-0.5">{project.technologies.slice(0, 3).join(', ')}</div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-primary font-heading mb-2 flex items-center gap-2">
                  <span className="text-cyan-500">01.</span> Project Overview
                </h3>
                <p className="text-sm sm:text-base text-secondary leading-relaxed">
                  {caseStudy.projectOverview}
                </p>
              </div>
            </div>

            {/* 2. The Problem */}
            <div className="pt-8 space-y-3">
              <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2">
                <span className="text-cyan-500">02.</span> The Operational Problem
              </h3>
              <ul className="space-y-2.5">
                {caseStudy.theProblem.map((prob, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Requirements */}
            <div className="pt-8 space-y-3">
              <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2">
                <span className="text-cyan-500">03.</span> System &amp; Institutional Requirements
              </h3>
              <ul className="space-y-2.5">
                {caseStudy.requirements.map((req, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4 & 5. My Role & Solution */}
            <div className="pt-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2 mb-2">
                  <span className="text-cyan-500">04.</span> Engineering Role &amp; Ownership
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  {caseStudy.myRole}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2 mb-2">
                  <span className="text-cyan-500">05.</span> Architectural Solution
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* 6. System Architecture (Visual Breakdown) */}
            <div className="pt-8 space-y-4">
              <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2">
                <span className="text-cyan-500">06.</span> System Architecture
              </h3>
              <p className="text-xs sm:text-sm text-secondary">
                {caseStudy.systemArchitecture.summary}
              </p>

              {/* Multi-Tier Architecture Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div className="p-4 rounded-xl border glass-panel">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary mb-2">
                    <Icons.Code size={15} className="text-cyan-400" />
                    <span>Presentation Layer (Frontend)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-secondary">
                    {caseStudy.systemArchitecture.tiers.frontend.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="opacity-50">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border glass-panel">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary mb-2">
                    <Icons.Server size={15} className="text-purple-400" />
                    <span>Application Core (Backend)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-secondary">
                    {caseStudy.systemArchitecture.tiers.backend.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="opacity-50">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border glass-panel">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary mb-2">
                    <Icons.Database size={15} className="text-emerald-400" />
                    <span>Data &amp; Persistence Layer</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-secondary">
                    {caseStudy.systemArchitecture.tiers.database.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="opacity-50">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border glass-panel">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary mb-2">
                    <Icons.Shield size={15} className="text-amber-400" />
                    <span>Infrastructure &amp; Security</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-secondary">
                    {caseStudy.systemArchitecture.tiers.infrastructure.concat(caseStudy.systemArchitecture.tiers.security).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="opacity-50">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. Major Features */}
            <div className="pt-8 space-y-4">
              <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2">
                <span className="text-cyan-500">07.</span> Major System Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.majorFeatures.map((feature, idx) => (
                  <div key={idx} className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-subtle)' }}>
                    <h4 className="text-sm font-bold text-primary font-heading mb-1.5">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-secondary leading-relaxed mb-2.5">
                      {feature.description}
                    </p>
                    {feature.bullets && (
                      <ul className="space-y-1 text-[11px] text-muted">
                        {feature.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-center gap-1.5">
                            <Icons.Check size={12} className="text-emerald-500 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Technologies Used (Categorized) */}
            <div className="pt-8 space-y-4">
              <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2">
                <span className="text-cyan-500">08.</span> Technologies Used
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.technologiesUsed.map((group, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg border glass-panel">
                    <div className="text-xs font-mono font-bold text-primary mb-2">
                      {group.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-mono" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 9 & 10. Challenges & Solutions Implemented */}
            <div className="pt-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2 mb-3">
                  <span className="text-cyan-500">09.</span> Engineering Challenges Encountered
                </h3>
                <ul className="space-y-2">
                  {caseStudy.challenges.map((ch, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2 mb-3">
                  <span className="text-cyan-500">10.</span> Solutions Implemented
                </h3>
                <ul className="space-y-2">
                  {caseStudy.solutionsImplemented.map((sol, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 11. Security Considerations */}
            <div className="pt-8 space-y-3">
              <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2">
                <span className="text-cyan-500">11.</span> Security &amp; Data Integrity Controls
              </h3>
              <ul className="space-y-2">
                {caseStudy.securityConsiderations.map((sec, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                    <Icons.Lock size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 12. Screenshots / UI Previews */}
            {caseStudy.screenshots && caseStudy.screenshots.length > 0 && (
              <div className="pt-8 space-y-4">
                <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2">
                  <span className="text-cyan-500">12.</span> Production UI Previews &amp; Mockups
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.screenshots.map((screen, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage({ src: screen.src, title: screen.title, caption: screen.caption })}
                      className="group cursor-pointer rounded-xl border overflow-hidden transition-all hover:border-cyan-500/50"
                      style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-subtle)' }}
                    >
                      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
                        <span className="text-xs font-bold text-primary font-heading">{screen.title}</span>
                        <Icons.ZoomIn size={14} className="text-muted group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <div className="p-3 bg-black/40 flex items-center justify-center min-h-[160px]">
                        <img
                          src={screen.src}
                          alt={screen.title}
                          className="max-h-40 w-auto object-contain rounded shadow"
                          onError={(e) => {
                            // Fallback container
                            const parent = (e.target as HTMLElement).parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="p-6 text-center text-xs font-mono text-slate-400 flex flex-col items-center gap-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span>Screenshot placeholder: ${screen.title}</span></div>`;
                            }
                          }}
                        />
                      </div>
                      <div className="p-3 text-[11px] text-muted">
                        {screen.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 13. Results / Impact */}
            <div className="pt-8 space-y-3">
              <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2">
                <span className="text-cyan-500">13.</span> Operational Results &amp; Real Impact
              </h3>
              <ul className="space-y-2">
                {caseStudy.resultsImpact.map((res, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                    <Icons.CheckCircle2 size={15} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 14. Future Improvements */}
            <div className="pt-8 space-y-3 pb-4">
              <h3 className="text-base font-bold text-primary font-heading flex items-center gap-2">
                <span className="text-cyan-500">14.</span> Future Roadmap &amp; Improvements
              </h3>
              <ul className="space-y-2">
                {caseStudy.futureImprovements.map((fut, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>{fut}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Modal Footer */}
          <div
            className="sticky bottom-0 z-20 px-6 sm:px-8 py-4 border-t flex items-center justify-between"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="text-xs text-muted font-mono hidden sm:block">
              Mon Zhairel B. Lingasa · Case Study
            </div>
            <div className="flex items-center gap-3 ml-auto">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2 px-4 text-xs"
                >
                  <Icons.ExternalLink size={14} />
                  <span>Launch Live Demo</span>
                </a>
              ) : (
                <button disabled className="btn-secondary py-2 px-4 text-xs btn-disabled">
                  <span>Demo Restricted (Internal System)</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="btn-outline py-2 px-4 text-xs"
              >
                <span>Close</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Image Zoom Viewer */}
      {selectedImage && (
        <ImageViewerModal
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          imageSrc={selectedImage.src}
          imageTitle={selectedImage.title}
          imageCaption={selectedImage.caption}
        />
      )}
    </>
  );
};
