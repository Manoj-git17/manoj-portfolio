import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, FileText, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, TOTAL_PROJECTS_COUNT } from '../data/portfolioData';
import { MAGAZINE_THEME } from '../theme/tokens';

interface HeroSubjectProps {
  onOpenResume?: () => void;
}

// Auto light-sweep position (for mobile where no cursor exists)
function useAutoLightSweep(isMobile: boolean) {
  const [sweepX, setSweepX] = useState(50); // percentage 0-100
  const dirRef = useRef(1);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isMobile) return;
    let pos = 30;
    const tick = () => {
      pos += dirRef.current * 0.16;
      if (pos >= 80) dirRef.current = -1;
      if (pos <= 20) dirRef.current = 1;
      setSweepX(pos);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile]);

  return sweepX;
}

// Gyroscope tilt with safe fallback
function useGyroTilt(isMobile: boolean) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const beta = Math.max(-15, Math.min(15, (e.beta ?? 0) - 30));
      const gamma = Math.max(-15, Math.min(15, e.gamma ?? 0));
      setTilt({ x: gamma / 15, y: beta / 15 });
    };

    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    ) {
      // Permission can be requested on first tap
    } else if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [isMobile]);

  return tilt;
}

export const HeroSubject: React.FC<HeroSubjectProps> = ({ onOpenResume }) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollToCaseFiles = () => {
    document.querySelector('#case-files')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sweepX = useAutoLightSweep(isMobile);
  const tilt = useGyroTilt(isMobile);

  // ── MOBILE LAYOUT (≤ 768px) ──────────────────────────────────
  if (isMobile) {
    return (
      <section
        id="subject"
        className="relative bg-transparent text-[#F2EFE6] overflow-x-hidden selection:bg-[#FFD60A] selection:text-[#0E0E0E] flex flex-col justify-start"
        style={{
          minHeight: '100svh',
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 72px)',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 32px)',
          paddingLeft: 'max(20px, env(safe-area-inset-left, 20px))',
          paddingRight: 'max(20px, env(safe-area-inset-right, 20px))',
        }}
      >
        <h1 className="sr-only">
          {PORTFOLIO_DATA.personal.name} — {PORTFOLIO_DATA.personal.role}
        </h1>

        {/* ── BACKGROUND 4-5 FLOATING TECH TAGS (Subtle, safe background only) ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <span
            className="absolute top-[28%] left-[4%] font-mono text-[10px] text-[#FFD60A]/30 tracking-widest uppercase select-none animate-float-gentle"
            style={{ ['--sticker-rot' as any]: '-4deg' }}
          >
            REACT 19
          </span>
          <span
            className="absolute top-[28%] right-[4%] font-mono text-[10px] text-[#FFD60A]/30 tracking-widest uppercase select-none animate-float-gentle"
            style={{ ['--sticker-rot' as any]: '5deg', animationDelay: '1.2s' }}
          >
            FASTAPI
          </span>
          <span
            className="absolute top-[42%] left-[3%] font-mono text-[10px] text-[#FFD60A]/25 tracking-widest uppercase select-none animate-float-gentle"
            style={{ ['--sticker-rot' as any]: '3deg', animationDelay: '0.8s' }}
          >
            POSTGRESQL
          </span>
          <span
            className="absolute top-[42%] right-[3%] font-mono text-[10px] text-[#FFD60A]/25 tracking-widest uppercase select-none animate-float-gentle"
            style={{ ['--sticker-rot' as any]: '-3deg', animationDelay: '2s' }}
          >
            GEMINI 1.5
          </span>
          <span
            className="absolute top-[56%] left-[6%] font-mono text-[10px] text-[#FFD60A]/20 tracking-widest uppercase select-none animate-float-gentle"
            style={{ ['--sticker-rot' as any]: '2deg', animationDelay: '1.6s' }}
          >
            PYTHON ETL
          </span>
        </div>

        {/* ── 1. TAGS / EDITORIAL STATUS STRIP ── */}
        <div className="relative z-10 w-full mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#F2EFE6]/15 pb-2.5 font-mono text-[11px] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5321B]" />
            <span className="text-[#F2EFE6]/70 truncate max-w-[150px]">{MAGAZINE_THEME.editorial.classification}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#141416]/90 border border-[#FFD60A]/40 text-[#FFD60A] text-[10.5px] font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD60A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD60A]" />
            </span>
            <span>OPEN TO WORK</span>
          </div>
        </div>

        {/* ── 2. NAME: "MANOJ." SCALED TO ~90% OF SCREEN WIDTH, FULLY VISIBLE ── */}
        <div className="relative z-10 w-full my-2 text-center pointer-events-none select-none">
          <h2
            className="font-display uppercase tracking-tight text-[#FFD60A] leading-[0.88] mx-auto block"
            style={{
              fontSize: 'clamp(54px, 20vw, 86px)',
              width: '92%',
              textShadow: '0 4px 30px rgba(255, 214, 10, 0.35)',
              WebkitTextStroke: '1px rgba(255, 214, 10, 0.4)',
            }}
          >
            MANOJ.
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#F2EFE6]/60 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#FFD60A]" />
              {PORTFOLIO_DATA.personal.location}
            </span>
          </div>
        </div>

        {/* ── 3. BIG PHOTO: FULL WIDTH, ~50-55svh HIGH, CENTERED, BOTTOM FADED ── */}
        <div
          className="relative z-10 w-full my-2 flex items-center justify-center overflow-hidden"
          style={{ height: 'clamp(300px, 52svh, 440px)' }}
        >
          {/* Ambient Torch / Light Sweep behind photo */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{
              background: `radial-gradient(circle 160px at ${sweepX}% 40%, rgba(255, 214, 10, 0.18) 0%, transparent 70%)`,
              mixBlendMode: 'screen',
            }}
          />

          {/* Photo cutout */}
          <img
            src="/me.png"
            alt="Manoj Portrait"
            className="w-full h-full object-contain object-bottom pointer-events-none"
            style={{
              transform: `translate3d(${tilt.x * 8}px, ${tilt.y * 6}px, 0)`,
              transition: 'transform 0.25s ease-out',
              willChange: 'transform',
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.85)) drop-shadow(0 0 12px rgba(255,214,10,0.25))',
            }}
          />

          {/* Bottom gradient fade into page background */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: '35%',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(14,14,14,0.6) 50%, #0E0E0E 100%)',
            }}
          />
        </div>

        {/* ── 4. TEXT CONTENT (Seeking line, Tagline, Focus description) ── */}
        <div className="relative z-10 w-full space-y-3 mt-1">
          {/* Seeking Line */}
          <div className="p-3.5 rounded-2xl bg-[#141416]/95 backdrop-blur-md border-l-4 border-[#FFD60A] border-y border-r border-[#F2EFE6]/15 font-mono text-[12px] text-[#F2EFE6] leading-relaxed shadow-lg">
            <span className="text-[#FFD60A] font-bold">SEEKING:</span>{' '}
            <span className="text-white font-semibold">{PORTFOLIO_DATA.personal.targetRole}</span>{' '}
            <span className="text-[#F2EFE6]/40">·</span>{' '}
            <span className="text-[#FFD60A] font-medium">{PORTFOLIO_DATA.personal.internshipAvailability}</span>
          </div>

          {/* Tagline & Focus */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[clamp(20px,6vw,26px)] font-serif italic text-[#FFD60A] leading-tight">
              &ldquo;{MAGAZINE_THEME.editorial.tagline}&rdquo;
            </div>
            <p className="text-[14px] text-[#F2EFE6]/80 leading-relaxed font-sans">
              Specializing in scalable full-stack architectures, relational data warehousing, automated ETL pipelines, and high-performance intelligent interfaces.
            </p>
          </div>
        </div>

        {/* ── 5. STATS: 3-COLUMN ROW WITH SMALLER NUMBERS ── */}
        <div className="relative z-10 w-full mt-5 pt-4 border-t border-[#F2EFE6]/15 grid grid-cols-3 gap-2 text-left">
          {/* Stat 1: 38+ in Yellow */}
          <div className="flex flex-col items-start">
            <span
              className="font-display tracking-tight"
              style={{
                fontSize: 'clamp(26px, 7.5vw, 36px)',
                color: '#FFD400',
                borderBottom: '3px solid #FFD400',
                paddingBottom: '2px',
                lineHeight: 1,
                display: 'inline-block',
              }}
            >
              38+
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFD60A] mt-1.5 font-bold leading-tight">
              Tests Passed
            </span>
          </div>

          {/* Stat 2: Projects */}
          <div className="flex flex-col items-start">
            <span
              className="font-display text-[#F2EFE6] tracking-tight"
              style={{ fontSize: 'clamp(26px, 7.5vw, 36px)', lineHeight: 1 }}
            >
              {`0${TOTAL_PROJECTS_COUNT}`}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#F2EFE6]/70 mt-1.5 leading-tight">
              Systems
            </span>
          </div>

          {/* Stat 3: 2029 */}
          <div className="flex flex-col items-start">
            <span
              className="font-display text-[#F2EFE6] tracking-tight"
              style={{ fontSize: 'clamp(26px, 7.5vw, 36px)', lineHeight: 1 }}
            >
              2029
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#F2EFE6]/70 mt-1.5 leading-tight">
              B.Tech AI&DS
            </span>
          </div>
        </div>

        {/* ── 6. BUTTONS: FULL-WIDTH AND STACKED ── */}
        <div className="relative z-10 w-full mt-6 flex flex-col gap-3">
          <button
            onClick={scrollToCaseFiles}
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-[13px] font-bold tracking-wider uppercase transition-all active:scale-[0.98] shadow-[0_8px_30px_rgba(255,214,10,0.35)] cursor-pointer"
          >
            <span>View case files</span>
            <ArrowDownRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenResume}
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full bg-[#18181A]/95 text-[#F2EFE6] border-2 border-[#F2EFE6]/30 font-mono text-[13px] font-bold tracking-wider uppercase transition-all active:scale-[0.98] cursor-pointer backdrop-blur-sm"
          >
            <FileText className="w-4 h-4 text-[#FFD60A]" />
            <span>Download resume</span>
          </button>
        </div>
      </section>
    );
  }

  // ── DESKTOP LAYOUT (> 768px, UNTOUCHED) ───────────────────────
  return (
    <section
      id="subject"
      className="relative min-h-[100svh] bg-transparent text-[#F2EFE6] overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-20 flex flex-col justify-between selection:bg-[#FFD60A] selection:text-[#0E0E0E] pointer-events-none"
    >
      {/* Screen-reader heading for SEO and accessibility */}
      <h1 className="sr-only">
        {PORTFOLIO_DATA.personal.name} — {PORTFOLIO_DATA.personal.role}
      </h1>

      {/* Top Editorial Issue Ribbon */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-3 sm:mb-4 pointer-events-none">
        <div className="flex items-center justify-between gap-3 border-b border-[#F2EFE6]/15 pb-2.5 font-mono text-[11px] sm:text-[12px] tracking-widest text-[#F2EFE6]/70 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5321B]" />
            <span>{MAGAZINE_THEME.editorial.classification}</span>
          </div>

          <div className="flex items-center gap-3">
            <span>{MAGAZINE_THEME.editorial.est}</span>
            <span className="text-[#FFD60A]">●</span>
            <span>STATUS: ACTIVE</span>
          </div>
        </div>

        {/* Interactive Torch & Physics Guidance */}
        <div className="pt-2 flex items-center justify-between text-[11px] font-mono tracking-wider">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#141416]/90 border border-[#FFD60A]/35 text-[#FFD60A] text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#FFD60A]" />
            <span>SWEEP TORCH TO ILLUMINATE · 3D DYNAMIC WORKSPACE</span>
          </div>
          <div className="hidden lg:block text-[#F2EFE6]/40 text-[10px]">
            INTERACTIVE REACT THREE FIBER ENGINE
          </div>
        </div>
      </div>

      {/* Main Floating UI: Left Column Clean Hierarchy */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6 pointer-events-none">
          {/* Clearance for the giant 3D extruded "MANOJ." letters */}
          <div className="h-28 sm:h-36 lg:h-44 w-full pointer-events-none" aria-hidden="true" />

          {/* Status Chips Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416]/90 backdrop-blur-md border border-[#FFD60A]/40 text-[#F2EFE6] font-mono text-xs tracking-wider uppercase shadow-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD60A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD60A]" />
              </span>
              <span className="text-[#FFD60A] font-bold">OPEN TO WORK</span>
              <span className="text-[#F2EFE6]/30">·</span>
              <span className="text-[#F2EFE6]/80">{PORTFOLIO_DATA.personal.location}</span>
            </div>

            <a
              href="#toolkit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD60A] text-[#0E0E0E] font-mono text-[11px] font-bold tracking-wider uppercase transition-transform hover:scale-105 shadow-md"
            >
              <span>{MAGAZINE_THEME.editorial.primarySkillTag}</span>
            </a>
          </div>

          {/* 10-Second Recruiter Line */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#141416]/90 backdrop-blur-md border-l-4 border-[#FFD60A] border-y border-r border-[#F2EFE6]/15 font-mono text-xs sm:text-sm text-[#F2EFE6] leading-relaxed max-w-xl shadow-lg pointer-events-auto">
            <span className="text-[#FFD60A] font-bold">SEEKING:</span>{' '}
            <span className="text-white font-semibold">{PORTFOLIO_DATA.personal.targetRole}</span>{' '}
            <span className="text-[#F2EFE6]/40">·</span>{' '}
            <span className="text-[#FFD60A] font-medium">{PORTFOLIO_DATA.personal.internshipAvailability}</span>
          </div>

          {/* Tagline & Focus Description */}
          <div className="space-y-2 max-w-xl pointer-events-none">
            <div className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#FFD60A] drop-shadow-sm">
              <span>&ldquo;{MAGAZINE_THEME.editorial.tagline}&rdquo;</span>
            </div>

            <p className="text-xs sm:text-sm text-[#F2EFE6]/80 leading-relaxed font-sans max-w-lg">
              Specializing in scalable full-stack architectures, relational data warehousing, automated ETL pipelines, and high-performance intelligent interfaces.
            </p>
          </div>

          {/* Key Stats Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-[#F2EFE6]/15 max-w-xl pointer-events-auto">
            <div className="inline-flex flex-col items-start">
              <span
                className="font-display text-4xl sm:text-5xl tracking-tight"
                style={{
                  color: '#FFD400',
                  borderBottom: '3px solid #FFD400',
                  paddingBottom: '2px',
                  lineHeight: 1,
                  display: 'inline-block',
                }}
              >
                38+
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#FFD60A] mt-2 font-bold">
                Automated Tests Passed
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl text-[#F2EFE6] tracking-tight">
                {`0${TOTAL_PROJECTS_COUNT}`}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#F2EFE6]/70 mt-1">
                Engineering Systems
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl text-[#F2EFE6] tracking-tight">
                2029
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#F2EFE6]/70 mt-1">
                B.Tech AI &amp; DS
              </span>
            </div>
          </div>

          {/* TWO BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 pt-2 pointer-events-auto">
            <button
              onClick={scrollToCaseFiles}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-[13px] font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_8px_30px_rgba(255,214,10,0.35)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View case files</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#18181A]/90 hover:bg-[#222222] text-[#F2EFE6] border-2 border-[#F2EFE6]/30 hover:border-[#FFD60A] font-mono text-[13px] font-bold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
            >
              <FileText className="w-4 h-4 text-[#FFD60A]" />
              <span>Download resume</span>
            </button>
          </div>
        </div>

        {/* Right Column: space for 3D scene */}
        <div className="lg:col-span-5 hidden lg:block pointer-events-none" />
      </div>

      {/* Bottom Editorial Ticker Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8 pt-4 border-t border-[#F2EFE6]/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#F2EFE6]/50 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-[#FFD60A]">CHAPTER 01</span>
          <span>//</span>
          <span>SUBJECT PROFILE &amp; 3D WORKSPACE</span>
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
