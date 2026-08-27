import React from 'react';
import { Icons } from './icons/Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 border-t text-secondary" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <div className="font-heading font-extrabold text-lg text-primary">
              Mon Zhairel B. Lingasa
            </div>
            <div className="text-xs font-mono text-muted mt-0.5">
              Software Engineer | Full-Stack Developer · Davao City, Philippines
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/zhairel"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:text-primary hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)'
              }}
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Icons.Github size={18} />
            </a>

            <a
              href="mailto:mon.lingasa@gmail.com"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:text-primary hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)'
              }}
              title="Direct Email"
              aria-label="Email Mon Zhairel"
            >
              <Icons.Mail size={18} />
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:text-primary hover:scale-105 cursor-pointer ml-2"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)'
              }}
              title="Back to top"
              aria-label="Back to top"
            >
              <Icons.ArrowUpRight size={18} className="-rotate-45" />
            </button>
          </div>

        </div>

        {/* Copyright Notice */}
        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs text-muted" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            &copy; {new Date().getFullYear()} Mon Zhairel B. Lingasa. All rights reserved.
          </div>
          <div className="font-mono text-[11px] mt-2 sm:mt-0">
            Engineered with React · TypeScript · Tailwind CSS · GSAP
          </div>
        </div>
      </div>
    </footer>
  );
};
