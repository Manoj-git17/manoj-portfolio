import React, { useState, useEffect, useCallback } from 'react';
import { X, Menu } from 'lucide-react';
import { MAGAZINE_THEME } from '../theme/tokens';

interface StickyNavProps {
  onOpenResume: () => void;
  onOpenRecruiter: () => void;
}

export const StickyNav: React.FC<StickyNavProps> = ({ onOpenResume, onOpenRecruiter }) => {
  const [activeSection, setActiveSection] = useState<string>('subject');
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navItems = [
    { id: 'subject', label: '01. SUBJECT', href: '#subject' },
    { id: 'case-files', label: '02. CASES', href: '#case-files' },
    { id: 'live-proof', label: '03. PROOF', href: '#live-proof' },
    { id: 'toolkit', label: '04. TOOLKIT', href: '#toolkit' },
    { id: 'record', label: '05. RECORD', href: '#record' },
    { id: 'hire-me', label: '06. HIRE ME', href: '#hire-me' },
  ];

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Close mobile menu on scroll
      if (isMobileOpen) closeMobile();

      const sections = ['subject', 'case-files', 'live-proof', 'toolkit', 'record', 'hire-me'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileOpen, closeMobile]);

  // Close on Escape
  useEffect(() => {
    if (!isMobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobileOpen, closeMobile]);

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const scrollTo = (href: string) => {
    closeMobile();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      {/* ── Sticky Navigation Bar ── */}
      <header className="fixed top-3 left-3 right-3 lg:right-auto sm:top-5 sm:left-5 z-50 select-none">
        <div className="flex flex-col items-start gap-1">
          <div
            className={`w-full lg:w-auto flex items-center justify-between lg:justify-start gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-xl ${
              isScrolled
                ? 'bg-[#0E0E0E]/95 text-[#F2EFE6] border-[#FFD60A]/30 shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
                : 'bg-[#0E0E0E]/90 text-[#F2EFE6] border-[#F2EFE6]/20 shadow-[0_8px_24px_rgba(0,0,0,0.4)]'
            }`}
          >
            {/* Mobile: Logo "MANOJ." on the left */}
            <a
              href="#subject"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#subject');
              }}
              className="lg:hidden flex items-center font-display text-lg tracking-wider text-[#FFD60A] min-h-[44px] px-1"
            >
              MANOJ<span className="text-[#F2EFE6]">.</span>
            </a>

            {/* Desktop: Issue Badge VOL. 01 */}
            <span className="hidden lg:inline-block font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase bg-[#FFD60A] text-[#0E0E0E] px-2.5 py-0.5 rounded-full shadow-sm">
              {MAGAZINE_THEME.editorial.volume}
            </span>

            <span className="hidden lg:inline font-mono text-[11px] text-[#F2EFE6]/40">/</span>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-2 text-[11.5px] font-mono tracking-wider" aria-label="Site sections">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.href)}
                    className={`transition-all duration-200 cursor-pointer uppercase px-2.5 py-1 rounded-full min-h-[36px] ${
                      isActive
                        ? 'bg-[#FFD60A]/15 text-[#FFD60A] font-bold border border-[#FFD60A]/40 shadow-sm'
                        : 'text-[#F2EFE6]/75 hover:text-[#FFFFFF] hover:bg-[#F2EFE6]/10'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop For Recruiters */}
            <button
              onClick={onOpenRecruiter}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-bold tracking-wider text-[#0E0E0E] bg-[#FFD60A] hover:bg-[#ffe043] transition-all rounded-full uppercase cursor-pointer shadow-sm hover:scale-105 min-h-[36px]"
              title="Open 30-Second Recruiter Brief (Press ?)"
            >
              <span>FOR RECRUITERS</span>
              <kbd className="hidden sm:inline-block px-1 bg-[#0E0E0E]/20 text-[#0E0E0E] rounded text-[9px] font-mono">
                ?
              </kbd>
            </button>

            {/* Desktop CV */}
            <button
              onClick={onOpenResume}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium tracking-wider text-[#0E0E0E] bg-[#F2EFE6] hover:bg-[#FFD60A] transition-colors rounded-full uppercase cursor-pointer min-h-[36px]"
            >
              <span>CV</span>
              <span className="text-[9px]">↗</span>
            </button>

            {/* Mobile Hamburger on the right */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-[#F2EFE6] hover:text-[#FFD60A] transition-colors p-2"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-fullscreen-menu"
            >
              {isMobileOpen
                ? <X className="w-6 h-6 text-[#FFD60A]" />
                : <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-Screen Mobile Menu ── */}
      {isMobileOpen && (
        <div
          id="mobile-fullscreen-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="lg:hidden fixed inset-0 z-40 bg-[#0E0E0E]/98 backdrop-blur-2xl flex flex-col"
          style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {/* Close button top-right */}
          <div className="flex items-center justify-between px-5 pt-4 pb-6">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase bg-[#FFD60A] text-[#0E0E0E] px-3 py-1 rounded-full">
              {MAGAZINE_THEME.editorial.volume}
            </span>
            <button
              onClick={closeMobile}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#F2EFE6] hover:text-[#FFD60A] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center px-5 gap-1" aria-label="Mobile site sections">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href)}
                  className={`text-left font-mono text-[clamp(20px,5vw,28px)] font-bold tracking-wider uppercase py-4 px-4 rounded-2xl transition-all min-h-[64px] flex items-center justify-between ${
                    isActive
                      ? 'bg-[#FFD60A] text-[#0E0E0E]'
                      : 'text-[#F2EFE6]/80 hover:text-[#FFD60A] hover:bg-[#F2EFE6]/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-[14px] opacity-60">●</span>}
                </button>
              );
            })}
          </nav>

          {/* Bottom action buttons */}
          <div className="px-5 pb-6 flex flex-col gap-3">
            <button
              onClick={() => { closeMobile(); onOpenRecruiter(); }}
              className="w-full min-h-[52px] flex items-center justify-center gap-2 bg-[#FFD60A] text-[#0E0E0E] font-mono text-[13px] font-bold tracking-wider uppercase rounded-2xl transition-all active:scale-[0.98]"
            >
              FOR RECRUITERS
              <kbd className="px-1.5 py-0.5 bg-[#0E0E0E]/15 rounded text-[10px]">?</kbd>
            </button>
            <button
              onClick={() => { closeMobile(); onOpenResume(); }}
              className="w-full min-h-[52px] flex items-center justify-center gap-2 bg-[#F2EFE6]/10 border border-[#F2EFE6]/20 text-[#F2EFE6] font-mono text-[13px] font-bold tracking-wider uppercase rounded-2xl transition-all active:scale-[0.98] hover:border-[#FFD60A]/40"
            >
              ACADEMIC CV ↗
            </button>
          </div>
        </div>
      )}
    </>
  );
};
