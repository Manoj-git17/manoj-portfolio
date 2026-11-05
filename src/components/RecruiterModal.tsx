import React, { useState, useEffect } from 'react';
import { X, Check, Copy, FileText, ExternalLink, Mail, MapPin, Calendar, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const RecruiterModal: React.FC<RecruiterModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const scrollToProjects = () => {
    onClose();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const flagshipProject = PORTFOLIO_DATA.projects[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E0E0E]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#121212] border-2 border-[#FFD60A] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="px-5 sm:px-7 py-4 bg-[#18181A] border-b border-[#F2EFE6]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A] animate-pulse"></span>
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#FFD60A] font-bold block">
                RECRUITER OVERVIEW · 30-SECOND DOSSIER
              </span>
              <h2 className="font-display uppercase text-2xl sm:text-3xl text-[#F2EFE6] tracking-tight leading-none mt-0.5">
                {PORTFOLIO_DATA.personal.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#222222] hover:bg-[#333333] text-[#F2EFE6]/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Executive Summary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Candidate Profile Details Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#1A1A1A] border border-[#F2EFE6]/10 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-[#F2EFE6]/50 text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-[#FFD60A]" /> Candidate
              </span>
              <p className="text-[#F2EFE6] font-bold">{PORTFOLIO_DATA.personal.name}</p>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-[#F2EFE6]/50 text-[10px] uppercase tracking-wider flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-[#FFD60A]" /> Degree &amp; Status
              </span>
              <p className="text-[#F2EFE6] font-bold">
                {PORTFOLIO_DATA.education.degree} ({PORTFOLIO_DATA.education.currentStatus})
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[#F2EFE6]/50 text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#FFD60A]" /> Expected Graduation
              </span>
              <p className="text-[#FFD60A] font-bold">{PORTFOLIO_DATA.education.expectedGraduation}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#F2EFE6]/50 text-[10px] uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#FFD60A]" /> Location
              </span>
              <p className="text-[#F2EFE6] font-bold">{PORTFOLIO_DATA.personal.location}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#F2EFE6]/50 text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-[#FFD60A]" /> Work Preferences
              </span>
              <p className="text-[#FFD60A] font-bold">{PORTFOLIO_DATA.personal.workPreferences}</p>
            </div>
          </div>

          {/* Interested Roles Banner */}
          <div className="p-4 rounded-2xl bg-[#18181A] border border-[#FFD60A]/30 space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFD60A] font-bold block">
              TARGET INTERNSHIP ROLES
            </span>
            <p className="font-mono text-xs sm:text-sm text-[#F2EFE6] font-semibold">
              {PORTFOLIO_DATA.personal.interestedRoles}
            </p>
            <p className="text-xs text-[#F2EFE6]/60">
              Availability: {PORTFOLIO_DATA.personal.internshipAvailability}
            </p>
          </div>

          {/* Flagship Project Highlight */}
          {flagshipProject && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1C1C1C] to-[#141414] border-2 border-[#FFD60A]/40 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFD60A]" />
                  <span className="font-mono text-[11px] font-bold text-[#FFD60A] uppercase tracking-wider">
                    FLAGSHIP PROJECT:
                  </span>
                  <span className="font-bold text-white text-sm sm:text-base">
                    {flagshipProject.shortTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {flagshipProject.liveDemoUrl && (
                    <a
                      href={flagshipProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD60A] text-[#0E0E0E] font-mono text-[11px] font-bold uppercase transition-transform hover:scale-105"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <a
                    href={flagshipProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#2A2A2A] text-[#F2EFE6] hover:text-[#FFD60A] font-mono text-[11px] font-medium uppercase transition-colors"
                  >
                    <span>Code</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[#F2EFE6]/90 leading-relaxed font-sans">
                {flagshipProject.tagline}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {flagshipProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-[#0E0E0E] text-[#F2EFE6]/80 border border-[#F2EFE6]/10 font-mono text-[10px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Direct Links Strip */}
          <div className="space-y-2">
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#F2EFE6]/60 font-bold block">
              PRIMARY CHANNELS &amp; ARTIFACTS
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-[#F2EFE6]/10 flex items-center justify-between transition-colors text-[#F2EFE6] hover:text-[#FFD60A]"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-[#FFD60A]" />
                  <span>GitHub</span>
                </div>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-[#F2EFE6]/10 flex items-center justify-between transition-colors text-[#F2EFE6] hover:text-[#FFD60A]"
              >
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-[#FFD60A]" />
                  <span>LinkedIn</span>
                </div>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={scrollToProjects}
                className="p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-[#F2EFE6]/10 flex items-center justify-between transition-colors text-[#F2EFE6] hover:text-[#FFD60A] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFD60A]" />
                  <span>Projects (5)</span>
                </div>
                <ExternalLink className="w-3 h-3" />
              </button>

              <button
                onClick={handleCopyEmail}
                className="p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-[#F2EFE6]/10 flex items-center justify-between transition-colors text-[#F2EFE6] hover:text-[#FFD60A] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#FFD60A]" />
                  <span>{copied ? 'Copied!' : 'Email'}</span>
                </div>
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions Strip: Copy Email, Download CV, Direct Mail */}
        <div className="p-4 sm:p-5 bg-[#18181A] border-t border-[#F2EFE6]/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#222222] hover:bg-[#2A2A2A] text-[#F2EFE6] border border-[#F2EFE6]/20 font-mono text-xs font-bold uppercase transition-all duration-150 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#FFD60A]" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <span className="hidden sm:inline font-mono text-xs text-[#F2EFE6]/50">
              {PORTFOLIO_DATA.personal.email}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#222222] hover:bg-[#2e2e2e] text-[#F2EFE6] font-mono text-xs font-medium uppercase transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFD60A]" />
              <span>Send Mail</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenResume();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105 cursor-pointer shadow-md"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download Resume / CV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Animated Toast Banner */}
      {copied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-[#FFD60A] text-[#0E0E0E] px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider uppercase shadow-[0_10px_40px_rgba(255,214,10,0.5)] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-[#0E0E0E]" />
          <span>COPIED TO CLIPBOARD: {PORTFOLIO_DATA.personal.email}</span>
        </div>
      )}
    </div>
  );
};
