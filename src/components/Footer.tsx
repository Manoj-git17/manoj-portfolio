import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = 2026;

  return (
    <footer className="bg-[#FFFFFF] border-t border-black/[0.08] py-12 sm:py-16 lg:py-24 text-[#6E6E73]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 sm:gap-10 mb-10 sm:mb-14">
          {/* Brand & Wordmark */}
          <div className="space-y-2.5 max-w-sm">
            <div className="flex items-center space-x-1">
              <span className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-[#1D1D1F]">
                {PORTFOLIO_DATA.personal.wordmark}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] mb-0.5" />
            </div>
            <p className="text-[13.5px] sm:text-[14px] text-[#6E6E73] leading-relaxed">
              Artificial Intelligence &amp; Data Science Engineering student. Dedicated to craftsmanship, strong mathematical fundamentals, and practical software systems.
            </p>
            <p className="text-[11.5px] sm:text-[12px] font-mono text-[#86868B]">
              Expected Graduation: {PORTFOLIO_DATA.personal.expectedGraduation}
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6 sm:gap-14 text-[13.5px] sm:text-[14px]">
            <div>
              <p className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#1D1D1F] font-semibold mb-2.5 sm:mb-3.5">
                Navigation
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="hover:text-[#1D1D1F] transition-colors inline-block py-0.5">
                    About
                  </a>
                </li>
                <li>
                  <a href="#expertise" className="hover:text-[#1D1D1F] transition-colors inline-block py-0.5">
                    Expertise
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-[#1D1D1F] transition-colors inline-block py-0.5">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#education" className="hover:text-[#1D1D1F] transition-colors inline-block py-0.5">
                    Education
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#1D1D1F] transition-colors inline-block py-0.5">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#1D1D1F] font-semibold mb-2.5 sm:mb-3.5">
                Connect
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href={PORTFOLIO_DATA.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1D1D1F] transition-colors inline-block py-0.5"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={PORTFOLIO_DATA.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1D1D1F] transition-colors inline-block py-0.5"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    className="hover:text-[#1D1D1F] transition-colors inline-block py-0.5 break-all"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[12px] sm:text-[13px] text-center sm:text-left">
          <p className="text-[#86868B]">
            © {currentYear} Manoj. Crafted with Apple-inspired minimalist design principles.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1.5 text-[12.5px] sm:text-[13px] text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-md py-1.5 px-2.5 cursor-pointer min-h-[38px]"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
