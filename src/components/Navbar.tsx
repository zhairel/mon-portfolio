import React, { useState, useEffect } from 'react';
import { Icons } from './icons/Icons';
import { ThemeMode } from '../hooks/useTheme';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  resumeUrl: string;
  onNavigate: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, resumeUrl, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 140;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 backdrop-blur-xl border-b shadow-lg'
            : 'py-6 bg-transparent'
        }`}
        style={{
          backgroundColor: isScrolled ? 'var(--bg-glass)' : 'transparent',
          borderColor: isScrolled ? 'var(--border-subtle)' : 'transparent',
        }}
      >
        <div className="container-custom flex items-center justify-between">
          
          {/* Brand Mark */}
          <MagneticButton strength={20}>
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 text-left group bg-transparent border-0 cursor-pointer p-0"
              data-cursor="HOME"
              aria-label="Mon Zhairel Lingasa"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                MZ
              </div>
              <div className="hidden sm:block">
                <div className="font-heading font-extrabold text-sm tracking-tight text-primary flex items-center gap-2">
                  <span>Mon Zhairel</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-pulse" />
                </div>
                <div className="text-[10px] text-muted font-mono tracking-wider uppercase">
                  Software Engineer
                </div>
              </div>
            </button>
          </MagneticButton>

          {/* Desktop Navigation Pill */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full glass-panel border border-subtle shadow-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer border-0 bg-transparent ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/15 shadow-xs font-bold'
                      : 'text-secondary hover:text-primary hover:bg-tertiary'
                  }`}
                  data-cursor={item.label.toUpperCase()}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer border border-subtle bg-tertiary text-primary hover:border-cyan-400/40"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? <Icons.Sun size={16} /> : <Icons.Moon size={16} />}
            </button>

            {/* Quick CV Download */}
            <MagneticButton strength={20}>
              <a
                href={resumeUrl}
                download
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-primary border border-subtle bg-tertiary hover:border-cyan-400/40 transition-all shadow-xs"
                data-cursor="DOWNLOAD"
              >
                <Icons.Download size={13} />
                <span>Resume</span>
              </a>
            </MagneticButton>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer border border-subtle bg-tertiary text-primary"
              aria-label="Open Navigation Drawer"
            >
              <Icons.Menu size={18} />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between pb-4 border-b border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs">
              MZ
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-primary">Mon Zhairel</div>
              <div className="text-[10px] text-muted font-mono">Software Engineer</div>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent border-0 cursor-pointer text-primary"
            aria-label="Close menu"
          >
            <Icons.X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-1 py-6 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono font-bold transition-all text-left bg-transparent border-0 cursor-pointer ${
                  isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-secondary hover:text-primary'
                }`}
              >
                <span>{item.label}</span>
                <Icons.ChevronRight size={15} className="opacity-40" />
              </button>
            );
          })}
        </div>

        <div className="pt-4 border-t border-subtle flex flex-col gap-3">
          <a
            href={resumeUrl}
            download
            className="btn-primary w-full text-center py-3 text-xs font-mono font-bold uppercase tracking-wider"
          >
            <Icons.Download size={15} />
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </div>
    </>
  );
};
