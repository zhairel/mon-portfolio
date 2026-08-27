import React from 'react';
import { Icons } from './icons/Icons';
import { ProjectItem } from '../types/portfolio';
import { SpotlightCard } from './SpotlightCard';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenCaseStudy: (project: ProjectItem) => void;
  onPreviewImage: (src: string, title: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
  onPreviewImage
}) => {
  return (
    <SpotlightCard
      className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col gap-6 transition-all hover:border-cyan-500/40 relative group"
      spotlightColor="rgba(0, 229, 255, 0.08)"
      enableTilt={false}
    >
      
      {/* Top Bar: Category Pill, Role, Flagship indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="badge badge-cyan font-mono text-xs font-semibold shadow-sm">
            {project.category}
          </span>
          {project.featured && (
            <span className="badge badge-emerald font-mono text-xs shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-pulse" />
              Flagship System
            </span>
          )}
        </div>

        <div className="text-xs font-mono font-medium text-muted">
          Role: <span className="text-primary font-semibold">{project.role}</span>
        </div>
      </div>

      {/* Title & Tagline */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-primary font-heading tracking-tight mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-secondary">
          {project.tagline}
        </p>
      </div>

      {/* Browser / Device Mockup Container */}
      <div className="rounded-xl border overflow-hidden bg-slate-950/90 shadow-xl transition-all group-hover:border-cyan-500/30" style={{ borderColor: 'var(--border-subtle)' }}>
        
        {/* Mockup Header Bar */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">
              https://amis.edu.ph/system/{project.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-400 font-semibold border border-cyan-500/20">
              {project.mockupPlaceholder.badgeText}
            </span>
          </div>
        </div>

        {/* Mockup Body: Either Real Screenshot or Interactive Architecture Snippet */}
        {project.mockupImage ? (
          <div
            onClick={() => onPreviewImage(project.mockupImage!, project.title)}
            className="relative cursor-pointer group/img bg-slate-900 max-h-72 overflow-hidden flex items-center justify-center p-2"
          >
            <img
              src={project.mockupImage}
              alt={project.title}
              className="w-full h-auto object-cover rounded shadow group-hover/img:scale-[1.03] transition-transform duration-500"
              onError={(e) => {
                // Fallback to code architecture snippet if image file not loaded
                const parent = (e.target as HTMLElement).parentElement;
                if (parent && project.mockupPlaceholder.previewCode) {
                  parent.innerHTML = `<pre class="p-4 text-xs font-mono text-cyan-300 overflow-x-auto w-full text-left">${project.mockupPlaceholder.previewCode}</pre>`;
                }
              }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-mono backdrop-blur-xs">
              <Icons.ZoomIn size={16} />
              <span>Click to enlarge screenshot</span>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-5 text-left font-mono text-xs bg-[#050811] text-slate-300">
            <div className="text-slate-500 text-[11px] mb-2">// System Controller &amp; Security Implementation</div>
            <pre className="overflow-x-auto text-cyan-300/90 leading-relaxed font-mono">
              {project.mockupPlaceholder.previewCode}
            </pre>
          </div>
        )}
      </div>

      {/* Problem & Solution Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border text-left transition-colors hover:border-rose-400/30" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 mb-1.5 uppercase tracking-wider">
            <Icons.Info size={14} />
            <span>The Operational Problem</span>
          </div>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="p-4 rounded-xl border text-left transition-colors hover:border-emerald-400/30" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-1.5 uppercase tracking-wider">
            <Icons.CheckCircle2 size={14} />
            <span>Engineering Solution</span>
          </div>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Major Features Grid */}
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-muted font-bold mb-3 text-left">
          Core Production Features:
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
          {project.majorFeatures.slice(0, 6).map((feat, fIdx) => (
            <li key={fIdx} className="text-xs sm:text-sm text-secondary flex items-start gap-2">
              <Icons.Check size={14} className="text-cyan-400 mt-1 flex-shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies Used Badges */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded text-xs font-mono transition-transform hover:-translate-y-0.5 cursor-default shadow-xs"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* System Impact Callout */}
      <div className="p-3.5 rounded-xl border flex items-start gap-3 text-left" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-subtle)' }}>
        <Icons.Sparkles size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-secondary">
          <strong className="text-primary">System Impact: </strong>
          {project.systemImpact}
        </div>
      </div>

      {/* Bottom Action Buttons: Case Study, Demo, GitHub */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={() => onOpenCaseStudy(project)}
          className="btn-primary flex-1 sm:flex-none relative overflow-hidden group shadow-md hover:shadow-cyan-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Icons.FileText size={16} />
          <span>View Full Case Study</span>
        </button>

        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex-1 sm:flex-none hover:scale-105 transition-transform"
          >
            <Icons.ExternalLink size={16} />
            <span>Live Demo</span>
          </a>
        ) : (
          <button
            disabled
            className="btn-secondary flex-1 sm:flex-none btn-disabled"
            title="Internal School Platform — Restricted Access"
          >
            <Icons.Lock size={15} />
            <span>Internal Production Demo</span>
          </button>
        )}

        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex-1 sm:flex-none hover:scale-105 transition-transform"
          >
            <Icons.Github size={16} />
            <span>Source Code</span>
          </a>
        ) : (
          <button
            disabled
            className="btn-outline flex-1 sm:flex-none btn-disabled"
            title="Proprietary institutional codebase"
          >
            <Icons.Github size={15} className="opacity-40" />
            <span>Private Repository</span>
          </button>
        )}
      </div>

    </SpotlightCard>
  );
};
