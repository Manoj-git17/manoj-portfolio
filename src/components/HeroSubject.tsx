import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, FileText, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, TOTAL_PROJECTS_COUNT } from '../data/portfolioData';
import { MAGAZINE_THEME } from '../theme/tokens';

interface HeroSubjectProps {
  onOpenResume?: () => void;
}

export const HeroSubject: React.FC<HeroSubjectProps> = ({ onOpenResume }) => {
  const heroRef = useRef<HTMLElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const torchEl = torchRef.current;
    if (!heroEl || !torchEl) return;

    // Disable torch tracking on touch / mobile / prefers-reduced-motion
    const isTouchOrReduced =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchOrReduced) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let isInside = false;

    const renderTorch = () => {
      if (torchEl) {
        if (isInside) {
          torchEl.style.opacity = '1';
          torchEl.style.background = `radial-gradient(circle 380px at ${targetX}px ${targetY}px, rgba(255, 214, 10, 0.16), rgba(229, 50, 27, 0.04) 55%, transparent 80%)`;
        } else {
          torchEl.style.opacity = '0.7';
          torchEl.style.background = `radial-gradient(circle 420px at 70% 40%, rgba(255, 214, 10, 0.12), transparent 75%)`;
        }
      }
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      isInside = true;
      if (!rafId) {
        rafId = requestAnimationFrame(renderTorch);
      }
    };

    const handleMouseLeave = () => {
      isInside = false;
      if (!rafId) {
        rafId = requestAnimationFrame(renderTorch);
      }
    };

    heroEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    heroEl.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToCaseFiles = () => {
    document.querySelector('#case-files')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="subject"
      ref={heroRef}
      className="relative min-h-[100svh] bg-transparent text-[#F2EFE6] overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-24 flex flex-col justify-between selection:bg-[#FFD60A] selection:text-[#0E0E0E]"
    >
      {/* Dynamic Cursor Torch Spotlight - Direct GPU/DOM driven, ZERO React state re-renders */}
      <div
        ref={torchRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-10 hidden sm:block will-change-[background,opacity]"
        style={{
          background: `radial-gradient(circle 420px at 70% 40%, rgba(255, 214, 10, 0.12), transparent 75%)`,
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Subtle Noise / Editorial Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] z-0"
        style={{
          backgroundImage: `linear-gradient(#F2EFE6 1px, transparent 1px), linear-gradient(90deg, #F2EFE6 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* GIANT OUTLINED BACKGROUND NAME */}
      <div className="pointer-events-none absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 w-full text-center overflow-hidden z-0 select-none opacity-20 sm:opacity-25">
        <span className="font-display uppercase text-[26vw] sm:text-[24vw] leading-none tracking-tighter text-stroke-light-bold block whitespace-nowrap">
          {PORTFOLIO_DATA.personal.name}
        </span>
      </div>

      {/* Top Editorial Issue Ribbon */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F2EFE6]/15 pb-3 font-mono text-[11px] sm:text-[12px] tracking-widest text-[#F2EFE6]/70 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5321B]"></span>
            <span>{MAGAZINE_THEME.editorial.classification}</span>
          </div>

          {/* Torch Guidance Prompt */}
          <div className="hidden md:flex items-center gap-2 text-[#FFD60A] text-[10.5px]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#FFD60A]" />
            <span>MOVE THE TORCH, FIND THE SUBJECT</span>
          </div>

          <div className="flex items-center gap-3">
            <span>{MAGAZINE_THEME.editorial.est}</span>
            <span className="text-[#FFD60A]">●</span>
            <span>STATUS: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Editorial Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heavy Editorial Typography & Details */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7">
          {/* Status Chips Bar: Pulsing Open to Work + Location & Primary Tag */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Pulsing Open To Work Chip with Location */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181A] border border-[#FFD60A]/40 text-[#F2EFE6] font-mono text-xs tracking-wider uppercase shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD60A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD60A]"></span>
              </span>
              <span className="text-[#FFD60A] font-bold">OPEN TO WORK</span>
              <span className="text-[#F2EFE6]/30">·</span>
              <span className="text-[#F2EFE6]/80">{PORTFOLIO_DATA.personal.location}</span>
            </div>

            <a
              href="#toolkit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD60A] text-[#0E0E0E] font-mono text-[11px] font-bold tracking-wider uppercase transition-transform hover:scale-105"
            >
              <span>{MAGAZINE_THEME.editorial.primarySkillTag}</span>
            </a>
          </div>

          {/* Huge Heavy Name */}
          <div className="space-y-1">
            <span className="font-mono text-[12px] sm:text-[13px] tracking-[0.25em] uppercase text-[#F2EFE6]/60 block">
              SUBJECT DOSSIER · VOL. 01
            </span>
            <h1 className="font-display uppercase text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.88] text-[#F2EFE6] text-balance">
              {PORTFOLIO_DATA.personal.name}
              <span className="text-[#FFD60A]">.</span>
            </h1>
          </div>

          {/* 10-Second Recruiter Line: Seeking Role + Availability */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#161616] border-l-4 border-[#FFD60A] border-y border-r border-[#F2EFE6]/10 font-mono text-xs sm:text-sm text-[#F2EFE6] leading-relaxed">
            <span className="text-[#FFD60A] font-bold">SEEKING:</span>{' '}
            <span className="text-white font-semibold">{PORTFOLIO_DATA.personal.targetRole}</span>{' '}
            <span className="text-[#F2EFE6]/40">·</span>{' '}
            <span className="text-[#FFD60A] font-medium">{PORTFOLIO_DATA.personal.internshipAvailability}</span>
          </div>

          {/* Tagline & Subline */}
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-serif italic text-[#FFD60A]">
              <span>&ldquo;{MAGAZINE_THEME.editorial.tagline}&rdquo;</span>
            </div>

            <p className="text-xs sm:text-sm text-[#F2EFE6]/70 leading-relaxed font-sans">
              Specializing in full-stack architecture, relational data warehousing, automated ETL pipelines, and high-performance intelligent interfaces.
            </p>
          </div>

          {/* Key Stats Bar with Red Hand-Drawn Circled Highlight */}
          <div className="pt-1 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-[#F2EFE6]/15">
            {/* Circled Key Stat */}
            <div className="relative inline-flex flex-col items-start pr-3">
              <div className="relative flex items-center justify-center">
                <span className="font-display text-4xl sm:text-5xl text-[#F2EFE6] tracking-tight relative z-0">
                  38+
                </span>

                {/* Hand-Drawn SVG Red Circle Centered on 38+ */}
                <svg
                  className="absolute -inset-x-4 -inset-y-2.5 w-[calc(100%+32px)] h-[calc(100%+20px)] pointer-events-none z-10"
                  viewBox="0 0 120 70"
                  fill="none"
                >
                  <path
                    d="M 22,35 C 20,16 48,10 75,12 C 102,14 112,26 110,42 C 107,58 84,65 52,64 C 24,62 12,50 14,34 C 16,18 52,8 88,14"
                    stroke="#E5321B"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.95"
                  />
                </svg>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#FFD60A] mt-1 font-bold">
                Automated Tests Passed
              </span>
            </div>

            {/* Stat 2: Dynamically derived from projects count */}
            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl text-[#F2EFE6] tracking-tight">
                {`0${TOTAL_PROJECTS_COUNT}`}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#F2EFE6]/60 mt-1">
                Engineering Systems
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl text-[#F2EFE6] tracking-tight">
                2029
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#F2EFE6]/60 mt-1">
                B.Tech AI &amp; DS
              </span>
            </div>
          </div>

          {/* TWO BUTTONS ONLY: "View case files" & "Download resume" */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={scrollToCaseFiles}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-[13px] font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_8px_30px_rgba(255,214,10,0.3)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View case files</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222222] text-[#F2EFE6] border-2 border-[#F2EFE6]/30 hover:border-[#FFD60A] font-mono text-[13px] font-bold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#FFD60A]" />
              <span>Download resume</span>
            </button>
          </div>
        </div>

        {/* Right Column: Open Space for Full-Viewport 3D Layered Portrait & Depth Planes */}
        <div
          className="lg:col-span-5 hidden lg:flex flex-col justify-end items-end relative w-full min-h-[480px] aspect-[56/62] pointer-events-none select-none"
          style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden', willChange: 'transform' }}
        >
          {/* Subtle Editorial Viewport Badge */}
          <div className="bg-[#0E0E0E]/70 backdrop-blur-md px-4 py-2 rounded-full border border-[#FFD60A]/30 font-mono text-[10.5px] uppercase tracking-widest text-[#FFD60A] flex items-center gap-2 shadow-lg mb-6 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[#FFD60A] animate-ping" />
            <span>3D CINEMATIC VIEWPORT // HOVER TO GLITCH</span>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Ticker Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10 pt-4 border-t border-[#F2EFE6]/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#F2EFE6]/50">
        <div className="flex items-center gap-2">
          <span className="text-[#FFD60A]">CHAPTER 01</span>
          <span>//</span>
          <span>SUBJECT PROFILE</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{PORTFOLIO_DATA.personal.location.toUpperCase()}</span>
          <span>•</span>
          <span>DATA SYSTEMS &amp; AI</span>
          <span>•</span>
          <span>REACT 19 / FASTAPI / POSTGRES</span>
        </div>
      </div>
    </section>
  );
};
