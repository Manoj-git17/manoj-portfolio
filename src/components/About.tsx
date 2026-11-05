import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-14 sm:py-24 lg:py-32 bg-[#FBFBFD] border-y border-black/[0.04]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Section heading column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#86868B] block mb-2 sm:mb-3">
              01 // BACKGROUND &amp; PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1D1D1F] tracking-[-0.035em] leading-tight">
              A little about me.
            </h2>
            <div className="mt-4 sm:mt-6 text-[13px] sm:text-[14px] text-[#6E6E73] space-y-1 font-normal">
              <p>Undergraduate in AI &amp; Data Science</p>
              <p>Class of {PORTFOLIO_DATA.personal.expectedGraduation}</p>
              <div className="pt-2 sm:pt-3">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-black/[0.06] text-[11px] sm:text-[12px] font-mono text-[#1D1D1F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
                  <span>FIRST-PRINCIPLES MINDSET</span>
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Content column */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* Bold Apple lead statement */}
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-medium text-[#1D1D1F] tracking-[-0.025em] leading-[1.35] text-balance break-words">
              {PORTFOLIO_DATA.personal.bioHeadline}
            </p>

            {/* Core editorial paragraphs */}
            <div className="space-y-4 sm:space-y-6 text-[15px] sm:text-lg lg:text-[20px] text-[#424245] leading-[1.65] font-normal tracking-[-0.012em]">
              <p className="text-pretty">
                {PORTFOLIO_DATA.personal.description}
              </p>
            </div>

            {/* Guiding Principles in Responsive Cards */}
            <div className="pt-8 sm:pt-10 mt-6 sm:mt-10 border-t border-black/[0.08]">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <h3 className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#86868B]">
                  Guiding Engineering Principles
                </h3>
                <span className="text-[11px] sm:text-[12px] font-mono text-[#86868B]">KEY MILESTONES</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {PORTFOLIO_DATA.achievements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-black/[0.06] hover:border-black/[0.12] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2"
                  >
                    <span className="text-[11px] font-mono text-[#0071E3] font-medium block">
                      {item.category}
                    </span>
                    <h4 className="text-[15px] font-semibold text-[#1D1D1F] tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-[#6E6E73] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
