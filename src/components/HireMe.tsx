import React, { useState, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Copy, Check, ArrowUpRight, Mail, FileText, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface HireMeProps {
  onOpenResume: () => void;
}

export const HireMe: React.FC<HireMeProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [magneticOffset, setMagneticOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const email = PORTFOLIO_DATA.personal.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;
    setMagneticOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="hire-me"
      className="relative bg-[#F2EFE6] text-[#0E0E0E] pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 overflow-hidden selection:bg-[#0E0E0E] selection:text-[#F2EFE6]"
    >
      {/* Top Smooth Transition from Yellow Record into Cream HireMe */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#FFD60A] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Ribbon */}
        <div className="flex items-center gap-2 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#6B6862] mb-4">
          <span className="w-2.5 h-2.5 bg-[#E5321B]"></span>
          <span>CHAPTER 05 // DIRECT CONTACT &amp; ENGAGEMENT</span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <h2 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0E0E0E] leading-[0.92]">
            LET&apos;S TALK ABOUT{' '}
            <span className="font-serif italic font-normal text-[#0E0E0E] bg-[#FFD60A] px-3 py-0.5 rounded-sm inline-block transform -rotate-1">
              what I can build
            </span>{' '}
            FOR YOU.
          </h2>
          <p className="font-mono text-sm sm:text-base text-[#6B6862] mt-4 uppercase tracking-wider">
            Available for software engineering, data systems architecture, and intelligent application initiatives.
          </p>
        </div>

        {/* INTERACTIVE EDITORIAL PUPPET CANVAS */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative my-8 sm:my-14 py-16 sm:py-24 px-6 rounded-3xl border-2 border-[#0E0E0E] bg-[#FFFFFF] shadow-[0_16px_50px_rgba(14,14,14,0.06)] overflow-hidden flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px]"
        >
          {/* SCATTERED ROTATED HEAVY WORDS */}
          <div className="absolute top-6 left-6 sm:top-10 sm:left-12 font-display text-3xl sm:text-5xl lg:text-6xl text-[#0E0E0E]/20 select-none pointer-events-none transform -rotate-12">
            SHIP.
          </div>

          <div className="absolute top-10 right-6 sm:top-12 sm:right-16 font-display text-4xl sm:text-6xl lg:text-7xl text-[#0E0E0E]/25 select-none pointer-events-none transform rotate-12">
            TOGETHER
          </div>

          {/* HELLO Sticker Badge with Gentle Float */}
          <div
            style={{ ['--sticker-rot' as any]: '-6deg' }}
            className="animate-float-gentle absolute bottom-10 left-8 sm:bottom-14 sm:left-16 font-display text-2xl sm:text-4xl lg:text-5xl text-[#FFD60A] bg-[#0E0E0E] px-3.5 py-1 rounded-sm select-none pointer-events-none shadow-md z-10"
          >
            HELLO
          </div>

          {/* LET'S BUILD Sticker with Gentle Float */}
          <div
            style={{ ['--sticker-rot' as any]: '6deg' }}
            className="animate-float-gentle absolute bottom-8 right-6 sm:bottom-12 sm:right-16 font-display text-2xl sm:text-4xl lg:text-5xl text-[#0E0E0E]/40 select-none pointer-events-none z-10"
          >
            LET&apos;S BUILD
          </div>

          {/* "TALK" IN SIGNATURE RED - Placed fully inside the card with clean margins */}
          <div className="absolute top-1/3 left-6 sm:left-12 font-display text-4xl sm:text-6xl text-[#E5321B] select-none pointer-events-none transform -rotate-6 opacity-75">
            TALK!
          </div>

          {/* HAND-DRAWN LINE-ART SVG OF HAND PULLING BUTTON BY STRINGS */}
          <div className="relative z-10 flex flex-col items-center">
            {/* The Puppet Hand & Suspension Strings SVG */}
            <svg
              className="w-48 sm:w-64 h-32 sm:h-40 text-[#0E0E0E] overflow-visible"
              viewBox="0 0 200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Hand Outline */}
              <g stroke="#0E0E0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Arm / Wrist */}
                <path d="M 85 0 L 85 28 C 85 36, 75 42, 65 48" />
                <path d="M 115 0 L 115 28 C 115 36, 125 42, 135 48" />

                {/* Palm */}
                <path d="M 65 48 C 55 54, 52 64, 58 72 C 64 78, 75 78, 85 76" />
                <path d="M 135 48 C 145 54, 148 64, 142 72 C 136 78, 125 78, 115 76" />

                {/* Fingers curled gripping string dowel */}
                <path d="M 72 74 C 70 82, 78 86, 84 82 C 90 78, 88 72, 85 68" />
                <path d="M 86 72 C 86 82, 96 85, 102 80 C 106 76, 102 70, 98 66" />
                <path d="M 102 68 C 104 80, 114 82, 118 76 C 122 72, 118 66, 114 64" />
                <path d="M 116 66 C 120 76, 130 76, 132 70 C 134 66, 130 60, 126 58" />

                {/* Wooden Control Cross / Dowel */}
                <line x1="45" y1="78" x2="155" y2="78" stroke="#0E0E0E" strokeWidth="3.5" />
                <circle cx="100" cy="78" r="3.5" fill="#FFD60A" stroke="#0E0E0E" strokeWidth="2" />
              </g>

              {/* Taut Strings running from dowel down to the button */}
              <g stroke="#0E0E0E" strokeWidth="1.4" strokeDasharray="3 2" opacity="0.75">
                <line x1="58" y1="80" x2="70" y2="120" />
                <line x1="90" y1="80" x2="94" y2="120" />
                <line x1="110" y1="80" x2="106" y2="120" />
                <line x1="142" y1="80" x2="130" y2="120" />
              </g>
            </svg>

            {/* MAGNETIC HIRE ME PILL BUTTON */}
            <div
              className="mt-2 transition-transform duration-100 ease-out"
              style={{
                transform: `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)`,
              }}
            >
              <button
                ref={buttonRef}
                onClick={handleCopyEmail}
                className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-[#0E0E0E] text-[#F2EFE6] hover:bg-[#FFD60A] hover:text-[#0E0E0E] border-2 border-[#0E0E0E] shadow-[0_12px_40px_rgba(14,14,14,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-mono"
                aria-label="Hire Manoj - Copy Email"
              >
                <span className="w-3 h-3 rounded-full bg-[#E5321B] group-hover:bg-[#0E0E0E] animate-ping" />
                <span className="font-display uppercase text-2xl sm:text-3xl tracking-wider">
                  HIRE ME
                </span>
                <span className="text-sm">↗</span>
              </button>
            </div>

            {/* Status note under button */}
            <div className="mt-5 font-mono text-[11px] sm:text-[12px] tracking-wider uppercase text-[#6B6862] flex items-center gap-2">
              <span>{copied ? 'EMAIL COPIED TO CLIPBOARD!' : 'CLICK TO COPY DIRECT DISPATCH'}</span>
              {copied && <Check className="w-3.5 h-3.5 text-[#E5321B]" />}
            </div>
          </div>
        </div>

        {/* EMAIL & SOCIAL DISPATCH CHANNELS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-12">
          {/* Email Copy Card */}
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-[#0E0E0E] bg-[#FFFFFF] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[#6B6862] uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5 font-bold text-[#0E0E0E]">
                  <Mail className="w-3.5 h-3.5" />
                  PRIMARY DISPATCH
                </span>
                <span>INBOX CHECKED DAILY</span>
              </div>
              <div className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-[#0E0E0E] break-all">
                {email}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#0E0E0E] text-[#F2EFE6] hover:bg-[#FFD60A] hover:text-[#0E0E0E] font-mono text-xs font-bold uppercase transition-colors cursor-pointer min-h-[44px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#E5321B]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-transparent border border-[#0E0E0E] hover:bg-[#0E0E0E]/10 font-mono text-xs font-bold uppercase transition-colors min-h-[44px]"
              >
                <span>Launch Mail</span>
                <Send className="w-3 h-3 text-[#6B6862]" />
              </a>
            </div>
          </div>

          {/* Social Profiles & Academic CV */}
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-[#0E0E0E] bg-[#FFFFFF] flex flex-col justify-between space-y-4">
            <div>
              <span className="font-mono text-xs text-[#6B6862] uppercase tracking-wider block mb-2 font-bold">
                PROFILES &amp; VERIFIED RECORDS
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#424245]">
                Direct links to public repositories, professional networking, and academic credentials.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 pt-2">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-[#F2EFE6] font-mono text-xs font-bold uppercase transition-all min-h-[44px]"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-[#F2EFE6] font-mono text-xs font-bold uppercase transition-all min-h-[44px]"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#FFD60A] text-[#0E0E0E] hover:bg-[#ffe043] font-mono text-xs font-bold uppercase transition-all cursor-pointer shadow-xs min-h-[44px]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Academic CV</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* EDITORIAL FOOTER COLOPHON */}
        <footer className="mt-16 pt-8 border-t-2 border-[#0E0E0E] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#6B6862]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5321B]"></span>
            <span className="text-[#0E0E0E] font-bold">{PORTFOLIO_DATA.personal.name}</span>
            <span>·</span>
            <span>{PORTFOLIO_DATA.personal.location.toUpperCase()}</span>
            <span>·</span>
            <span>EDITORIAL DOSSIER VOL. 01</span>
            <span>·</span>
            <span>EST. 2026</span>
          </div>

          <div className="flex items-center gap-2 text-center md:text-right">
            <span>Built with React 19, FastAPI, Postgres.</span>
            <span>·</span>
            <a
              href="https://github.com/Manoj-git17/manoj-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E0E0E] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Source on GitHub</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};
