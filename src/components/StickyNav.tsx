import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

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
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-3 left-3 sm:top-5 sm:left-5 z-50 select-none">
      <div className="flex flex-col items-start gap-1">
        {/* Main Sticky Header Capsule with rich blurred dark backdrop */}
        <div
          className={`flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-xl ${
            isScrolled
              ? 'bg-[#0E0E0E]/95 text-[#F2EFE6] border-[#FFD60A]/30 shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
              : 'bg-[#0E0E0E]/90 text-[#F2EFE6] border-[#F2EFE6]/20 shadow-[0_8px_24px_rgba(0,0,0,0.4)]'
          }`}
        >
          {/* Issue Badge */}
          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase bg-[#FFD60A] text-[#0E0E0E] px-2.5 py-0.5 rounded-full shadow-sm">
            {MAGAZINE_THEME.editorial.volume}
          </span>

          <span className="hidden md:inline font-mono text-[11px] text-[#F2EFE6]/40">/</span>

          {/* Desktop Nav Links with Active Section Highlighting */}
          <nav className="hidden lg:flex items-center gap-2 text-[11.5px] font-mono tracking-wider">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href)}
                  className={`transition-all duration-200 cursor-pointer uppercase px-2.5 py-1 rounded-full ${
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

          {/* For Recruiters Executive Summary Trigger */}
          <button
            onClick={onOpenRecruiter}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-bold tracking-wider text-[#0E0E0E] bg-[#FFD60A] hover:bg-[#ffe043] transition-all rounded-full uppercase cursor-pointer shadow-sm hover:scale-105"
            title="Open 30-Second Recruiter Brief (Press ?)"
          >
            <span>FOR RECRUITERS</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 bg-[#0E0E0E]/20 text-[#0E0E0E] rounded text-[9px] font-mono">
              ?
            </kbd>
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium tracking-wider text-[#0E0E0E] bg-[#F2EFE6] hover:bg-[#FFD60A] transition-colors rounded-full uppercase cursor-pointer"
          >
            <span>CV</span>
            <span className="text-[9px]">↗</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-1 text-[#F2EFE6] hover:text-[#FFD60A] font-mono text-[11px] tracking-wider uppercase flex items-center gap-1"
            aria-label="Toggle navigation"
            aria-expanded={isMobileOpen}
          >
            <span className="w-2 h-2 rounded-full bg-[#E5321B] animate-pulse"></span>
            <span>{isMobileOpen ? 'CLOSE' : 'INDEX'}</span>
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {isMobileOpen && (
          <div className="lg:hidden mt-2 p-3 w-56 rounded-2xl bg-[#0E0E0E]/95 text-[#F2EFE6] border border-[#F2EFE6]/20 backdrop-blur-xl shadow-2xl flex flex-col gap-2 font-mono text-xs tracking-wider animate-in fade-in zoom-in-95 duration-150">
            <div className="pb-1 border-b border-[#F2EFE6]/10 text-[10px] text-[#F2EFE6]/40 uppercase tracking-widest">
              Chapters Index
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                className={`text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#FFD60A] text-[#0E0E0E] font-bold'
                    : 'text-[#F2EFE6]/80 hover:bg-[#F2EFE6]/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileOpen(false);
                onOpenRecruiter();
              }}
              className="py-1.5 px-2 text-left bg-[#FFD60A] text-[#0E0E0E] font-bold rounded-lg flex items-center justify-between cursor-pointer"
            >
              <span>FOR RECRUITERS</span>
              <span className="text-[10px] bg-[#0E0E0E]/20 text-[#0E0E0E] px-1.5 py-0.5 rounded font-mono">?</span>
            </button>
            <button
              onClick={() => {
                setIsMobileOpen(false);
                onOpenResume();
              }}
              className="mt-1 py-1.5 px-2 text-left text-[#FFD60A] hover:bg-[#F2EFE6]/10 rounded-lg flex items-center justify-between cursor-pointer"
            >
              <span>ACADEMIC CV</span>
              <span>↗</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
