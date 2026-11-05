import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Code2, Brain, Database, Server, HardDrive, Wrench, ArrowUpRight } from 'lucide-react';

export const Toolkit: React.FC = () => {
  const categoryIcons = [Code2, Brain, Database, Server, HardDrive, Wrench];

  // Highlights to emphasize primary strengths in yellow
  const primarySkills = new Set(['Python', 'Machine Learning', 'ETL Pipelines', 'FastAPI', 'PostgreSQL', 'Git']);

  return (
    <section
      id="toolkit"
      className="relative bg-[#F2EFE6] text-[#0E0E0E] py-20 sm:py-28 lg:py-36 border-t border-[#0E0E0E]/15 overflow-hidden selection:bg-[#0E0E0E] selection:text-[#F2EFE6]"
    >
      {/* Top Smooth Transition from Dark LiveProof to Cream Toolkit */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0E0E0E] via-[#0E0E0E]/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b-2 border-[#0E0E0E]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#6B6862] mb-3">
              <span className="w-2.5 h-2.5 bg-[#FFD60A] border border-[#0E0E0E]"></span>
              <span>CHAPTER 03 // TECHNICAL SKILLS</span>
            </div>

            <h2 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0E0E0E] leading-[0.95]">
              TECHNICAL{' '}
              <span className="font-serif italic font-normal text-[#0E0E0E] underline decoration-[#FFD60A] decoration-4 underline-offset-8">
                Skills.
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs sm:text-sm text-[#6B6862] max-w-sm uppercase tracking-wider leading-relaxed">
            Organized by discipline. Core competencies applied across machine learning, data engineering, and backend architectures.
          </p>
        </div>

        {/* 6 Clean Recruiter-Friendly Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];
            return (
              <div
                key={cat.title}
                className="rounded-3xl border-2 border-[#0E0E0E] bg-[#FFFFFF] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_32px_rgba(14,14,14,0.06)] hover:-translate-y-1"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#0E0E0E]/15 mb-5">
                    <span className="font-mono text-[10px] tracking-widest text-[#6B6862] font-bold">
                      0{idx + 1} // DOMAIN
                    </span>
                    <Icon className="w-4 h-4 text-[#0E0E0E]" />
                  </div>

                  <h3 className="font-display uppercase text-2xl sm:text-3xl text-[#0E0E0E] tracking-tight mb-2">
                    {cat.title}
                  </h3>

                  <p className="text-xs font-sans text-[#6B6862] mb-5 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Clean Skill Chips */}
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill) => {
                      const isPrimary = primarySkills.has(skill.name);
                      return (
                        <span
                          key={skill.name}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold border transition-all ${
                            isPrimary
                              ? 'bg-[#FFD60A] text-[#0E0E0E] border-[#0E0E0E] shadow-xs'
                              : 'bg-[#F9F7F1] text-[#0E0E0E] border-[#0E0E0E]/20 hover:border-[#0E0E0E]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPrimary ? 'bg-[#0E0E0E]' : 'bg-[#6B6862]'
                            }`}
                          />
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Card Footer Index */}
                <div className="pt-5 mt-6 border-t border-[#0E0E0E]/10 flex items-center justify-between font-mono text-[10px] text-[#6B6862] uppercase tracking-wider">
                  <span>CATEGORY 0{idx + 1}</span>
                  <span className="text-[#0E0E0E] font-bold">VERIFIED APPLIED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Subnote */}
        <div className="mt-12 sm:mt-16 p-6 rounded-2xl bg-[#0E0E0E] text-[#F2EFE6] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-widest text-[#FFD60A] uppercase font-bold">
              ENGINEERING RIGOR // 03
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-[#F2EFE6]">
              &ldquo;Writing maintainable, well-tested code with clean separation of concerns and reproducible pipelines.&rdquo;
            </p>
          </div>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-xs font-bold uppercase shrink-0 transition-transform hover:scale-105"
          >
            <span>Review Repositories on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Bottom Smooth Transition from Cream Toolkit to Yellow Record */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-[#FFD60A] pointer-events-none" />
    </section>
  );
};
