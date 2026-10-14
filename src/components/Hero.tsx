import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-20 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Introductory label */}
          <div className="inline-flex items-center space-x-2 mb-5 sm:mb-6 max-w-full">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071E3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071E3]" />
            </span>
            <span className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold tracking-[0.10em] sm:tracking-[0.16em] uppercase text-[#6E6E73] bg-[#F5F5F7] px-2.5 sm:px-3 py-1 rounded-full border border-black/[0.04] truncate sm:whitespace-normal">
              ARTIFICIAL INTELLIGENCE &amp; DATA SCIENCE
            </span>
          </div>

          {/* Main headline with responsive optical type scale */}
          <h1 className="text-[34px] xs:text-[40px] sm:text-6xl md:text-7xl lg:text-[80px] font-semibold text-[#1D1D1F] tracking-[-0.035em] sm:tracking-[-0.04em] leading-[1.08] sm:leading-[1.04] mb-5 sm:mb-8 text-balance break-words">
            Curiosity into code.
            <br />
            <span className="text-[#6E6E73]">Ideas into impact.</span>
          </h1>

          {/* Supporting paragraph */}
          <p className="text-[16px] sm:text-xl lg:text-[22px] font-normal text-[#424245] leading-[1.55] tracking-[-0.015em] mb-7 sm:mb-10 max-w-2xl text-pretty">
            {PORTFOLIO_DATA.personal.bioSubtitle}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-14">
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-7 py-3.5 min-h-[46px] bg-[#1D1D1F] text-white text-[14px] sm:text-[15px] font-medium rounded-full hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-7 py-3.5 min-h-[46px] bg-[#F5F5F7] text-[#1D1D1F] text-[14px] sm:text-[15px] font-medium rounded-full hover:bg-[#EAEAEA] border border-black/[0.06] transition-all duration-200 active:scale-[0.98] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Multi-mode interactive computational visual */}
        <div className="w-full mt-2">
          <HeroVisual />
        </div>

        {/* Editorial Specifications Strip */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-black/[0.06] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div className="space-y-0.5">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#86868B] font-mono">Specialization</p>
            <p className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] break-words">AI &amp; Data Science</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#86868B] font-mono">Graduation</p>
            <p className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] break-words">Class of {PORTFOLIO_DATA.personal.expectedGraduation}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#86868B] font-mono">Core Focus</p>
            <p className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] break-words">Algorithms &amp; Systems</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#86868B] font-mono">Status</p>
            <p className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] break-words">Undergraduate Eng.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
