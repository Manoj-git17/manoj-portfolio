import React from 'react';
import { GraduationCap, BookOpen, Compass, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Education: React.FC = () => {
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-14 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 pb-6 sm:pb-8 border-b border-black/[0.06]">
          <div>
            <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#86868B] block mb-2 sm:mb-3">
              04 // ACADEMIC FOUNDATION
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1D1D1F] tracking-[-0.035em]">
              Education &amp; Studies.
            </h2>
          </div>

          <p className="mt-3 md:mt-0 text-[14px] sm:text-[15px] text-[#6E6E73] max-w-md font-normal leading-relaxed">
            Building strong foundational engineering fundamentals through rigorous study of computational systems, mathematics, and data sciences.
          </p>
        </div>

        {/* Education Hero Card */}
        <div className="bg-[#FFFFFF] border border-black/[0.07] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 mb-8 sm:mb-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center space-x-2 text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/[0.08] px-3 py-1 rounded-full font-medium">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Undergraduate Degree</span>
              </div>

              <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-[#1D1D1F] tracking-tight leading-tight break-words">
                {education.degree}
              </h3>

              <p className="text-[14.5px] sm:text-[16px] text-[#424245] leading-relaxed max-w-2xl">
                {education.overview}
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#F5F5F7] p-4 sm:p-6 rounded-2xl border border-black/[0.04] space-y-3 sm:space-y-4">
              <div>
                <p className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#86868B]">Timeline</p>
                <p className="text-[15px] sm:text-[16px] font-semibold text-[#1D1D1F] mt-0.5">{education.timeline}</p>
              </div>

              <div>
                <p className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#86868B]">Expected Graduation</p>
                <p className="text-[15px] sm:text-[16px] font-semibold text-[#1D1D1F] mt-0.5">{education.expectedGraduation}</p>
              </div>

              <div>
                <p className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#86868B]">Discipline</p>
                <p className="text-[13.5px] sm:text-[14px] font-medium text-[#424245] mt-0.5 break-words">Engineering &amp; Computational Sciences</p>
              </div>
            </div>
          </div>

          {/* Academic Coursework Grid */}
          <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-black/[0.06]">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h4 className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#86868B] flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#0071E3]" />
                <span>Core Coursework &amp; Academic Disciplines</span>
              </h4>
              <span className="text-[11px] font-mono text-[#86868B] hidden sm:inline">3 CORE PILLARS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {education.coursework.map((group) => (
                <div
                  key={group.category}
                  className="p-4 sm:p-6 rounded-2xl bg-[#FAFAFA] border border-black/[0.04] flex flex-col justify-between"
                >
                  <div>
                    <h5 className="text-[14.5px] sm:text-[15px] font-semibold text-[#1D1D1F] mb-1">
                      {group.category}
                    </h5>
                    <p className="text-[11.5px] sm:text-[12px] text-[#86868B] mb-3 sm:mb-4">
                      {group.description}
                    </p>
                  </div>
                  <ul className="space-y-2 pt-2 border-t border-black/[0.04]">
                    {group.courses.map((course) => (
                      <li
                        key={course}
                        className="text-[12.5px] sm:text-[13px] text-[#424245] flex items-center space-x-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] shrink-0" />
                        <span className="break-words">{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Philosophy */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl bg-[#FBFBFD] border border-black/[0.04]">
            <div className="flex items-center space-x-2 text-[12.5px] sm:text-[13px] font-semibold text-[#1D1D1F] mb-3">
              <Compass className="w-4 h-4 text-[#0071E3]" />
              <span>Academic Philosophy &amp; Engineering Discipline</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-[12.5px] sm:text-[13px] text-[#6E6E73]">
              {education.approach.map((point, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0071E3] shrink-0 mt-0.5" />
                  <span className="break-words">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
