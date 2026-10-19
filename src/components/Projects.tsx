import React, { useState } from 'react';
import { ArrowUpRight, Info, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = [
    'All',
    'AI & Machine Learning',
    'Data Engineering',
    'Web Development',
    'Systems & Algorithms',
  ];

  const filteredProjects =
    selectedFilter === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="py-14 sm:py-24 lg:py-32 bg-[#FBFBFD] border-y border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 pb-6 sm:pb-8 border-b border-black/[0.06]">
          <div>
            <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#86868B] block mb-2 sm:mb-3">
              03 // SELECTED WORK
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1D1D1F] tracking-[-0.035em]">
              Explorations &amp; Projects.
            </h2>
          </div>

          <p className="mt-3 md:mt-0 text-[14px] sm:text-[15px] text-[#6E6E73] max-w-md font-normal leading-relaxed">
            Hands-on implementations demonstrating clean code, computational algorithms, reproducible machine learning experiments, and modern web interfaces.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10" role="tablist" aria-label="Project filter categories">
          {categories.map((category) => {
            const isSelected = selectedFilter === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedFilter(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 min-h-[38px] text-[12px] sm:text-[13px] font-medium rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] flex items-center ${
                  isSelected
                    ? 'bg-[#1D1D1F] text-white shadow-xs'
                    : 'bg-[#FFFFFF] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] border border-black/[0.06]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Responsive Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-black/[0.07] p-5 sm:p-7 lg:p-9 flex flex-col justify-between transition-all duration-300 hover:border-black/[0.18] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
            >
              <div>
                {/* Meta category & index */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/[0.08] px-2.5 py-0.5 rounded-full font-medium">
                    {project.category}
                  </span>
                  <span className="text-[12px] font-mono text-[#86868B]">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight mb-2 group-hover:text-[#0071E3] transition-colors duration-200 break-words">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-[13.5px] sm:text-[14px] font-medium text-[#6E6E73] mb-3 sm:mb-4">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-[13.5px] sm:text-[14px] text-[#424245] leading-relaxed mb-5 sm:mb-6">
                  {project.description}
                </p>

                {/* Concrete Architectural Highlights Preview */}
                <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-[#FAFAFA] border border-black/[0.04] space-y-2">
                  <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#86868B] block">
                    Core Architectural Decisions
                  </span>
                  <ul className="space-y-1.5">
                    {project.architecture.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-[12.5px] sm:text-[13px] text-[#424245]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0071E3] shrink-0 mt-0.5" />
                        <span className="line-clamp-2 xs:line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6 pt-3 sm:pt-4 border-t border-black/[0.04]">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11.5px] sm:text-[12px] font-mono text-[#555558] bg-[#F5F5F7] rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons (responsive stack on narrow screens) */}
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center space-x-1.5 text-[13px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-sm cursor-pointer min-h-[40px]"
                  >
                    <Info className="w-4 h-4 text-[#86868B]" />
                    <span>View Architecture</span>
                  </button>

                  <div className="flex flex-wrap items-center gap-2">
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 text-[13px] font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] min-h-[40px] shadow-xs"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 text-[13px] font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#EAEAEA] border border-black/[0.06] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] min-h-[40px]"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Repository</span>
                      <ArrowUpRight className="w-3 h-3 text-[#86868B]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub exploratory note */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-[13px] sm:text-[14px] text-[#86868B]">
            More lab exercises and algorithmic problem solving are cataloged on my{' '}
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D1D1F] underline decoration-black/20 hover:decoration-[#0071E3] hover:text-[#0071E3] transition-colors font-medium inline-flex items-center space-x-1"
            >
              <span>GitHub profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 inline" />
            </a>
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
