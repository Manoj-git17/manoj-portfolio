import React, { useState } from 'react';
import { ArrowUpRight, Layers, ExternalLink, CheckCircle, AlertCircle, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { GithubIcon } from './Icons';

export const CaseFiles: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // 5 Prioritized Projects as specified by technical recruiter & engineering guidelines
  const projects = PORTFOLIO_DATA.projects;

  return (
    <section
      id="case-files"
      className="relative bg-[#F2EFE6] text-[#0E0E0E] py-20 sm:py-28 lg:py-36 border-t border-[#0E0E0E]/15 overflow-hidden selection:bg-[#0E0E0E] selection:text-[#F2EFE6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b-2 border-[#0E0E0E]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#6B6862] mb-3">
              <span className="w-2.5 h-2.5 bg-[#FFD60A] border border-[#0E0E0E]"></span>
              <span>CHAPTER 02 // TECHNICAL PROJECTS</span>
            </div>

            <h2 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0E0E0E] leading-normal overflow-visible py-1">
              {projects.length} SYSTEMS.{' '}
              <span className="font-serif italic font-normal text-[#0E0E0E] bg-[#FFD60A] px-3 sm:px-4 py-1 rounded-sm inline-block transform -rotate-1 shadow-sm">
                Built &amp; Deployed.
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs sm:text-sm text-[#6B6862] max-w-sm uppercase tracking-wider leading-relaxed">
            Concise engineering breakdowns: core contributions, verified test results, live demos, and public repositories.
          </p>
        </div>

        {/* 5 Prioritized Project Panels with Consistent Formatting */}
        <div className="space-y-12 sm:space-y-16">
          {projects.map((project, index) => {
            const projectNumber = `0${index + 1}`;
            const isHovered = hoveredProject === project.id;

            return (
              <TiltCard key={project.id} className="rounded-3xl">
                <article
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="relative rounded-3xl border-2 border-[#0E0E0E] p-6 sm:p-8 lg:p-10 bg-[#FFFFFF] shadow-[0_12px_40px_rgba(14,14,14,0.06)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(14,14,14,0.12)] h-full"
                >
                  {/* Panel Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#0E0E0E]/15 mb-6 font-mono">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-3xl sm:text-4xl text-[#0E0E0E] tracking-tight">
                        /{projectNumber}
                      </span>
                      <div>
                        <span className="text-[10.5px] uppercase tracking-widest text-[#6B6862] block font-bold">
                          CASE FILE // {project.category}
                        </span>
                        <h3 className="font-display uppercase text-xl sm:text-2xl md:text-3xl text-[#0E0E0E] tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.badge && (
                        <span className="bg-[#0E0E0E] text-[#FFD60A] border border-[#FFD60A] font-bold text-[10px] tracking-widest px-2.5 py-1 rounded uppercase">
                          {project.badge}
                        </span>
                      )}
                      <span className="bg-[#FFD60A] text-[#0E0E0E] font-bold text-[10px] tracking-widest px-2.5 py-1 rounded uppercase">
                        VERIFIED CODE
                      </span>
                    </div>
                  </div>

                  {/* Concise 2-Column Engineering Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column (7 cols): One-sentence description, Problem solved, What was built, Key technical contribution, Architecture flow, Tech stack */}
                    <div className="lg:col-span-7 space-y-4">
                      {/* 1. One-Sentence Description */}
                      <div className="p-4 rounded-2xl bg-[#F9F7F1] border border-[#0E0E0E]/10 space-y-1">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#0E0E0E] font-bold block">
                          SYSTEM OVERVIEW
                        </span>
                        <p className="text-sm text-[#1D1D1F] leading-relaxed font-sans font-medium">
                          {project.tagline}
                        </p>
                      </div>

                      {/* 2. Problem Solved & What I Built Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                        <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#0E0E0E]/10 space-y-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B6862] font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-[#E5321B]" /> PROBLEM SOLVED
                          </span>
                          <p className="text-[#333336] leading-relaxed">
                            {project.problemSolved}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#0E0E0E]/10 space-y-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B6862] font-bold flex items-center gap-1">
                            <Cpu className="w-3 h-3 text-[#0E0E0E]" /> WHAT I BUILT
                          </span>
                          <p className="text-[#333336] leading-relaxed">
                            {project.whatIBuilt}
                          </p>
                        </div>
                      </div>

                      {/* 3. Key Engineering Contribution */}
                      <div className="p-4 rounded-2xl bg-[#F9F7F1] border border-[#0E0E0E]/10 space-y-1">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5321B] font-bold block">
                          KEY TECHNICAL CONTRIBUTION
                        </span>
                        <p className="text-sm text-[#424245] leading-relaxed font-sans">
                          {project.keyContribution}
                        </p>
                      </div>

                      {/* 4. Architecture Flow Diagram (with smooth mobile horizontal scroll) */}
                      {project.diagramSteps && project.diagramSteps.length > 0 && (
                        <div className="p-4 rounded-2xl bg-[#0E0E0E] text-[#F2EFE6] border border-[#0E0E0E] space-y-2">
                          <div className="flex items-center justify-between pb-1.5 border-b border-[#F2EFE6]/15">
                            <span className="font-mono text-[10px] tracking-widest uppercase text-[#FFD60A] font-bold flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5" />
                              PIPELINE ARCHITECTURE
                            </span>
                            <span className="font-mono text-[9px] text-[#F2EFE6]/50">DATA FLOW</span>
                          </div>

                          <div className="py-2 overflow-x-auto max-w-full mobile-scroll-x">
                            <div className="flex flex-nowrap items-center gap-2 text-xs font-mono" style={{ minWidth: 'max-content' }}>
                              {project.diagramSteps.map((step, idx) => (
                                <React.Fragment key={idx}>
                                  <div className="px-3 py-1.5 rounded-lg bg-[#1F1F22] border border-[#F2EFE6]/20 text-[#F2EFE6] text-center font-medium shrink-0 shadow-sm whitespace-nowrap text-[11px]">
                                    {step}
                                  </div>
                                  {idx < project.diagramSteps.length - 1 && (
                                    <div className="text-[#FFD60A] font-bold shrink-0">
                                      →
                                    </div>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 5. Tech Stack */}
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6862] font-bold block mb-2">
                          TECH STACK
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-mono font-medium text-[#0E0E0E] bg-[#E8E4D8] border border-[#0E0E0E]/15 rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column (5 cols): Preview window, Verified results, Demo & GitHub buttons */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-5 lg:border-l lg:border-[#0E0E0E]/15 lg:pl-8">
                      {/* Visual Window */}
                      <div className="relative rounded-2xl border-2 border-[#0E0E0E] bg-[#141416] overflow-hidden aspect-video flex flex-col justify-between shadow-inner">
                        <div className="px-3 py-1.5 bg-[#0E0E0E] border-b border-[#F2EFE6]/10 flex items-center justify-between font-mono text-[10px] text-[#F2EFE6]/60">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#E5321B]" />
                            <span className="w-2 h-2 rounded-full bg-[#FFD60A]" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="ml-1 font-bold text-[#F2EFE6]">{project.shortTitle.toLowerCase().replace(/[^a-z0-9]/g, '')}.sys</span>
                          </div>
                          <span className="text-[9px] uppercase tracking-wider text-[#FFD60A]">
                            {isHovered ? 'ACTIVE' : 'SYSTEM'}
                          </span>
                        </div>

                        <div className="relative flex-1 flex items-center justify-center p-4 bg-neutral-900 text-[#F2EFE6] text-center overflow-hidden">
                          {project.videoPreviewPath && (project.videoPreviewPath.endsWith('.png') || project.videoPreviewPath.endsWith('.jpg')) ? (
                            <img
                              src={project.videoPreviewPath}
                              alt={project.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : project.videoPreviewPath ? (
                            <video
                              src={project.videoPreviewPath}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="absolute inset-0 w-full h-full object-cover opacity-85"
                              onError={(e) => {
                                (e.target as HTMLVideoElement).style.display = 'none';
                              }}
                            />
                          ) : null}

                          <div className="relative z-10 space-y-1 text-center pointer-events-none p-3 bg-[#0E0E0E]/70 rounded-xl border border-[#F2EFE6]/10 backdrop-blur-xs">
                            <div className="font-mono text-xs font-bold text-[#FFD60A]">
                              {project.shortTitle}
                            </div>
                            <div className="font-mono text-[10px] text-[#F2EFE6]/70">
                              {project.category}
                            </div>
                          </div>
                        </div>

                        <div className="px-3 py-1 bg-[#0E0E0E]/90 border-t border-[#F2EFE6]/10 font-mono text-[9px] text-[#F2EFE6]/50 flex items-center justify-between">
                          <span>VERIFIED BUILD</span>
                          <span className="text-emerald-400">● STABLE</span>
                        </div>
                      </div>

                      {/* 6. Verified Results */}
                      <div className="p-4 rounded-2xl bg-[#0E0E0E] text-[#F2EFE6] space-y-2 border border-[#0E0E0E]">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#FFD60A] font-bold">
                          <CheckCircle className="w-3.5 h-3.5 text-[#FFD60A]" />
                          VERIFIED RESULTS
                        </div>
                        <p className="text-xs font-mono text-[#F2EFE6] leading-relaxed">
                          {project.verifiedResults}
                        </p>
                      </div>

                      {/* 7. Action Buttons: Live Demo + GitHub Repository */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-xs font-bold rounded-full uppercase transition-all shadow-sm min-h-[44px]"
                            aria-label={`Open live demo for ${project.title}`}
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#0E0E0E] hover:bg-[#1A1A1A] text-[#F2EFE6] border border-[#0E0E0E] font-mono text-xs font-bold rounded-full uppercase transition-all min-h-[44px]"
                          aria-label={`View GitHub repository for ${project.title}`}
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Repository</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
