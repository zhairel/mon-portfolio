import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icons } from './icons/Icons';
import { ProfileData } from '../types/portfolio';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const line3Ref = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];

      gsap.fromTo(
        lines,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'center center',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject.';
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSubmitted(true);

      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoUrl;
    }, 800);
  };

  const githubLink = profile.socialLinks.find(s => s.name === 'GitHub')?.url || 'https://github.com/zhairel';

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-32 relative tech-grid-bg border-t overflow-hidden"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      {/* Background Ambient Glow */}
      <div className="ambient-glow-cyan w-[600px] h-[600px] -bottom-32 -left-32 opacity-40 pointer-events-none" />
      <div className="ambient-glow-purple w-[500px] h-[500px] -bottom-32 -right-32 opacity-30 pointer-events-none" />

      <div className="container-custom relative z-10 text-left">
        
        {/* Large Cinematic Heading with Masked Lines */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Icons.Mail size={13} />
            <span>Initiate Collaboration</span>
          </div>

          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold font-heading tracking-tight uppercase select-none text-primary leading-[0.92]">
            <div className="overflow-hidden py-1">
              <div ref={line1Ref} className="will-change-transform">
                LET'S BUILD
              </div>
            </div>
            <div className="overflow-hidden py-1">
              <div ref={line2Ref} className="text-cyan-600 dark:text-cyan-400 will-change-transform" style={{ textShadow: '0 0 45px rgba(2, 132, 199, 0.25)' }}>
                SOMETHING
              </div>
            </div>
            <div className="overflow-hidden py-1">
              <div ref={line3Ref} className="will-change-transform">
                GREAT.
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Action Trigger Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-xl text-secondary leading-relaxed max-w-xl">
              I'm open to software engineering opportunities, enterprise system development, collaborations, and discussions about scalable architecture.
            </p>

            {/* Direct Information Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl glass-panel border border-subtle flex flex-col justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 mb-1">
                  <Icons.Mail size={15} />
                  <span>EMAIL ADDRESS</span>
                </div>
                <div className="text-sm font-semibold text-primary mb-3">
                  {profile.email}
                </div>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
                >
                  {copiedEmail ? <Icons.Check size={13} /> : <Icons.Copy size={13} />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-subtle flex flex-col justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-1">
                  <Icons.Phone size={15} />
                  <span>PHONE / WHATSAPP</span>
                </div>
                <div className="text-sm font-semibold text-primary mb-3">
                  {profile.phone}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
                  >
                    <Icons.Phone size={13} />
                    <span>Call</span>
                  </a>
                  <button
                    onClick={copyPhone}
                    className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-all"
                  >
                    {copiedPhone ? <Icons.Check size={13} /> : <Icons.Copy size={13} />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MagneticButton strength={25}>
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-primary py-3.5 px-6 text-sm font-bold tracking-wide shadow-xl"
                  data-cursor="EMAIL"
                >
                  <Icons.Mail size={18} />
                  <span>Send Email</span>
                </a>
              </MagneticButton>

              <MagneticButton strength={25}>
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline py-3.5 px-5 text-sm font-bold tracking-wide"
                  data-cursor="GITHUB"
                >
                  <Icons.Github size={18} />
                  <span>GitHub</span>
                </a>
              </MagneticButton>

              <MagneticButton strength={25}>
                <a
                  href={profile.resumeUrl}
                  download
                  className="btn-secondary py-3.5 px-5 text-sm font-bold tracking-wide"
                  data-cursor="RESUME"
                >
                  <Icons.Download size={18} />
                  <span>Download CV</span>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Contact Message Form */}
          <div ref={formRef} className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-subtle">
              <h3 className="text-xl font-bold text-primary font-heading mb-2">
                Send Direct Message
              </h3>
              <p className="text-xs text-muted mb-6">
                Have an inquiry or project proposal? Send a dispatch directly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Icons.Check size={20} />
                  </div>
                  <div className="text-base font-bold text-primary font-heading">
                    Message Prepared
                  </div>
                  <p className="text-xs text-secondary">
                    Your native email client will launch with this message formatted. Or reach out directly via <strong>{profile.email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm border focus:outline-none transition-all"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          borderColor: errors.name ? '#f43f5e' : 'var(--border-strong)',
                          color: 'var(--text-primary)',
                        }}
                      />
                      {errors.name && <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.name}</p>}
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm border focus:outline-none transition-all"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          borderColor: errors.email ? '#f43f5e' : 'var(--border-strong)',
                          color: 'var(--text-primary)',
                        }}
                      />
                      {errors.email && <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm border focus:outline-none transition-all"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        borderColor: errors.subject ? '#f43f5e' : 'var(--border-strong)',
                        color: 'var(--text-primary)',
                      }}
                    />
                    {errors.subject && <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.subject}</p>}
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      placeholder="Your Message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm border focus:outline-none transition-all resize-y"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        borderColor: errors.message ? '#f43f5e' : 'var(--border-strong)',
                        color: 'var(--text-primary)',
                      }}
                    />
                    {errors.message && <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full py-3 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    {sending ? 'Preparing...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Editorial Signoff */}
        <div className="pt-10 border-t border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-muted">
          <div>
            <span className="text-primary font-bold">{profile.name}</span>
            <span className="opacity-40 mx-2">·</span>
            <span>{profile.title}</span>
            <span className="opacity-40 mx-2">·</span>
            <span>{profile.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>
        </div>

      </div>
    </section>
  );
};
