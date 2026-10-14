import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }

      // Active section detection with balanced threshold
      const sections = ['about', 'expertise', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Expertise', href: '#expertise', id: 'expertise' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFFFF]/90 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.03)]'
          : 'bg-[#FFFFFF]/70 backdrop-blur-md border-b border-transparent'
      }`}
    >
      {/* Reading scroll progress indicator */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-[#0071E3] transition-all duration-150 ease-out z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between">
        {/* Wordmark with Apple blue accent dot */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-md py-1 pr-1"
          aria-label="Manoj - Return to top"
        >
          <span className="text-lg sm:text-xl md:text-[21px] font-semibold tracking-[-0.03em] text-[#1D1D1F] transition-opacity group-hover:opacity-80">
            {PORTFOLIO_DATA.personal.wordmark}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] mb-0.5 inline-block group-hover:scale-125 transition-transform" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-0.5 lg:space-x-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-2.5 lg:px-3.5 py-1.5 text-[13px] lg:text-[13.5px] font-medium tracking-tight rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-[#1D1D1F] bg-black/[0.04]'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.02]'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="h-3.5 w-[1px] bg-black/[0.1] mx-1.5 lg:mx-2" aria-hidden="true" />

          {/* Discreet Resume Action Button */}
          <button
            onClick={onOpenResume}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-[12.5px] lg:text-[13px] font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#EAEAEA] border border-black/[0.06] rounded-full transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#6E6E73]" />
            <span>Resume</span>
          </button>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center space-x-1.5">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-[12px] font-medium text-[#1D1D1F] bg-[#F5F5F7] border border-black/[0.06] rounded-full active:scale-95 transition-transform"
            aria-label="View Academic Resume"
          >
            <FileText className="w-3 h-3 text-[#6E6E73]" />
            <span>Resume</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#1D1D1F] rounded-lg hover:bg-black/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-b border-black/[0.08] bg-[#FFFFFF]/98 backdrop-blur-2xl px-5 sm:px-6 py-5 transition-all animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between min-h-[44px] px-3 py-2.5 text-[15px] font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'text-[#0071E3] bg-[#0071E3]/[0.06]'
                      : 'text-[#1D1D1F] hover:bg-black/[0.03]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-[12px] text-[#86868B] font-mono">↗</span>
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-black/[0.06]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full min-h-[44px] flex items-center justify-center space-x-2 py-3 px-4 bg-[#1D1D1F] text-white text-[14px] font-medium rounded-xl hover:bg-black active:scale-[0.99] transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Academic Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
