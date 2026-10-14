import React, { useEffect } from 'react';
import { X, CheckCircle2, Layers, Cpu, ArrowUpRight, Gauge, FileCode } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-black/[0.08] shadow-[0_24px_70px_rgba(0,0,0,0.18)] overflow-hidden max-h-[88vh] sm:max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 sm:px-7 py-3.5 sm:py-4 border-b border-black/[0.06] bg-[#FAFAFA] shrink-0">
          <div className="flex items-center space-x-2 min-w-0">
            <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/[0.08] px-2.5 py-0.5 rounded-full font-medium truncate">
              {project.category}
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#86868B] font-mono shrink-0">• {project.status}</span>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body with responsive scroll */}
        <div className="overflow-y-auto px-4 sm:px-7 py-5 sm:py-6 space-y-5 sm:space-y-6">
          <div>
            <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#86868B] block mb-1">
              {project.badge}
            </span>
            <h2
              id="modal-project-title"
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1D1D1F] tracking-tight mb-2 break-words"
            >
              {project.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#6E6E73] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Key Metrics Strip */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 p-3 sm:p-3.5 rounded-xl bg-[#F5F5F7] border border-black/[0.04]">
              {project.metrics.map((metric, i) => (
                <div key={i} className="flex items-center space-x-2 text-[11.5px] sm:text-[12px] font-mono text-[#1D1D1F]">
                  <Gauge className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                  <span className="truncate">{metric}</span>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="space-y-1.5 sm:space-y-2">
            <h3 className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#86868B]">
              Project Overview
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#333336] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem & Motivation */}
          <div className="p-3.5 sm:p-5 rounded-xl bg-[#FAFAFA] border border-black/[0.05] space-y-1.5">
            <h4 className="text-[12.5px] sm:text-[13px] font-semibold text-[#1D1D1F] flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#0071E3] shrink-0" />
              <span>Engineering Motivation</span>
            </h4>
            <p className="text-[13px] sm:text-[14px] text-[#555558] leading-relaxed">
              {project.problemSolved}
            </p>
          </div>

          {/* Architecture Highlights */}
          <div className="space-y-2.5 sm:space-y-3">
            <h3 className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#86868B] flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Architectural Breakdown</span>
            </h3>
            <ul className="space-y-2">
              {project.architecture.map((item, i) => (
                <li key={i} className="flex items-start space-x-2 text-[13px] sm:text-[14px] text-[#424245]">
                  <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-2.5 sm:space-y-3">
            <h3 className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#86868B]">
              Key Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-2.5 sm:p-3 rounded-lg border border-black/[0.05] bg-[#FFFFFF] text-[12.5px] sm:text-[13px] text-[#424245]"
                >
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Technologies used */}
          <div className="space-y-2 pt-1">
            <h3 className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#86868B] flex items-center space-x-1.5">
              <FileCode className="w-3.5 h-3.5" />
              <span>Tech Stack</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#F5F5F7] text-[#1D1D1F] text-[11.5px] sm:text-[12px] font-medium rounded-md border border-black/[0.04]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions with responsive layout */}
        <div className="px-4 sm:px-7 py-3.5 sm:py-4 border-t border-black/[0.06] bg-[#FAFAFA] flex flex-col-reverse xs:flex-row xs:items-center justify-between gap-2.5 shrink-0">
          <button
            onClick={onClose}
            className="w-full xs:w-auto min-h-[44px] px-4 py-2 text-[13.5px] sm:text-[14px] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer text-center"
          >
            Close
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full xs:w-auto min-h-[44px] inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-[#1D1D1F] text-white text-[13px] font-medium rounded-full hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>View Source Code</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
