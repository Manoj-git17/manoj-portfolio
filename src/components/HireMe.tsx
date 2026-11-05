import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Copy, Check, ArrowUpRight, FileText, Send, MapPin, Calendar, Briefcase } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface HireMeProps {
  onOpenResume: () => void;
}

export const HireMe: React.FC<HireMeProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const email = PORTFOLIO_DATA.personal.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
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
          <span>CHAPTER 06 // DIRECT CONTACT &amp; ENGAGEMENT</span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-12 sm:mb-14">
          <h2 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0E0E0E] leading-[0.92]">
            LET&apos;S DISCUSS{' '}
            <span className="font-serif italic font-normal text-[#0E0E0E] bg-[#FFD60A] px-3 py-0.5 rounded-sm inline-block transform -rotate-1">
              opportunities
            </span>{' '}
            &amp; COLLABORATIONS.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#6B6862] mt-4 uppercase tracking-wider leading-relaxed">
            Actively exploring AI/ML, Data Science, and Software Engineering internship positions.
          </p>
        </div>

        {/* EXECUTIVE CONTACT DOSSIER CARD */}
        <div className="my-8 sm:my-10 p-6 sm:p-10 lg:p-12 rounded-3xl border-2 border-[#0E0E0E] bg-[#FFFFFF] shadow-[0_16px_50px_rgba(14,14,14,0.06)] space-y-8">
          {/* Top Status & Context Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8 border-b-2 border-[#0E0E0E]/10 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#F9F7F1] border border-[#0E0E0E]/10 space-y-1">
              <span className="text-[#6B6862] text-[10.5px] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Briefcase className="w-3.5 h-3.5 text-[#0E0E0E]" /> TARGET ROLE
              </span>
              <p className="text-[#0E0E0E] font-bold text-sm">
                AI/ML &amp; Data Science Intern
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F9F7F1] border border-[#0E0E0E]/10 space-y-1">
              <span className="text-[#6B6862] text-[10.5px] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Calendar className="w-3.5 h-3.5 text-[#0E0E0E]" /> AVAILABILITY
              </span>
              <p className="text-[#0E0E0E] font-bold text-sm">
                Open to Internship Roles
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F9F7F1] border border-[#0E0E0E]/10 space-y-1">
              <span className="text-[#6B6862] text-[10.5px] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#0E0E0E]" /> LOCATION &amp; MODALITY
              </span>
              <p className="text-[#0E0E0E] font-bold text-sm">
                Bengaluru · Remote / Hybrid / On-site
              </p>
            </div>
          </div>

          {/* Primary Dispatch Action Hero */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#0E0E0E] text-[#F2EFE6]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A] animate-pulse" />
                <span className="font-mono text-[10.5px] tracking-widest text-[#FFD60A] uppercase font-bold">
                  DIRECT RECRUITER INBOX · CHECKED DAILY
                </span>
              </div>
              <div className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-[#F2EFE6] break-all select-all">
                {email}
              </div>
              <p className="font-sans text-xs text-[#F2EFE6]/70">
                Preferred communication channel for interview invitations and project inquiries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md min-h-[46px]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#0E0E0E]" />
                    <span>Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#0E0E0E]" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#252525] text-[#F2EFE6] border border-[#F2EFE6]/20 font-mono text-xs font-bold uppercase tracking-wider transition-colors min-h-[46px]"
              >
                <Send className="w-3.5 h-3.5 text-[#FFD60A]" />
                <span>Open Mail App</span>
              </a>
            </div>
          </div>

          {/* Social Profiles & Academic CV Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border-2 border-[#0E0E0E] bg-[#FFFFFF] hover:bg-[#F9F7F1] flex items-center justify-between group transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0E0E0E] text-[#FFD60A]">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#0E0E0E] uppercase">
                    GitHub Profile
                  </div>
                  <div className="font-mono text-[11px] text-[#6B6862]">
                    @Manoj-git17
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#0E0E0E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border-2 border-[#0E0E0E] bg-[#FFFFFF] hover:bg-[#F9F7F1] flex items-center justify-between group transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0E0E0E] text-[#FFD60A]">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#0E0E0E] uppercase">
                    LinkedIn Network
                  </div>
                  <div className="font-mono text-[11px] text-[#6B6862]">
                    /in/manoj-aids
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#0E0E0E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={onOpenResume}
              className="p-5 rounded-2xl border-2 border-[#0E0E0E] bg-[#FFFFFF] hover:bg-[#F9F7F1] flex items-center justify-between group transition-all duration-200 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#FFD60A] text-[#0E0E0E]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#0E0E0E] uppercase">
                    Resume / CV
                  </div>
                  <div className="font-mono text-[11px] text-[#6B6862]">
                    ATS Printable PDF
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#0E0E0E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
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
            <span>ACADEMIC PORTFOLIO</span>
            <span>·</span>
            <span>EST. 2026</span>
          </div>

          <div className="flex items-center gap-2 text-center md:text-right">
            <span>Built with React 19, FastAPI &amp; PostgreSQL.</span>
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
