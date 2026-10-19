import React, { useEffect, useState } from 'react';
import { X, Printer, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
MANOJ
Artificial Intelligence & Data Science Engineering Student
Expected Graduation: 2029 | Location: India
Email: ${PORTFOLIO_DATA.personal.email}
GitHub: ${PORTFOLIO_DATA.personal.github}
LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}

ACADEMIC EDUCATION:
- ${PORTFOLIO_DATA.education.degree} (${PORTFOLIO_DATA.education.timeline})
- Expected Graduation: ${PORTFOLIO_DATA.education.expectedGraduation}
- Key Focus: Data Structures, Algorithms, Mathematics, Database Systems, Machine Learning Foundations

TECHNICAL SKILLS:
- Programming: Python, JavaScript / TypeScript, C++
- Web: HTML, CSS, React, Tailwind CSS
- Data: SQL, Database Fundamentals, Exploratory Data Analysis
- Tools: Git, GitHub, VS Code
- AI: Machine Learning Fundamentals, AI Application Development

SELECTED PROJECTS:
1. DataPulse (React, Python, FastAPI, Pandas, PostgreSQL)
   Full-stack AI-assisted data analytics platform transforming sales data into business insights.
2. Exploratory Data Intelligence Pipeline (Python, SQL, Pandas)
   Modular pipeline for automated ingestion, outlier detection, and statistical profiling.
3. Predictive Classifier & Evaluation Lab (Python, Scikit-Learn)
   Systematic evaluation of classification algorithms with cross-validation benchmarks.
4. Minimalist Engineering Metrics Dashboard (React, TypeScript, Tailwind)
   Responsive web application visualizing algorithmic benchmarks.
5. Algorithms & Computational Graph Explorer (C++)
   Clean implementations of data structures, graph traversals, and complexity benchmarks.
`.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-black/[0.1] shadow-[0_24px_70px_rgba(0,0,0,0.18)] overflow-hidden max-h-[90vh] sm:max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with responsive button labels */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-black/[0.08] bg-[#FAFAFA] shrink-0 no-print gap-2">
          <div className="flex items-center space-x-2 min-w-0">
            <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#1D1D1F] font-semibold truncate">
              RESUME // {PORTFOLIO_DATA.personal.expectedGraduation}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 text-[11.5px] sm:text-[12px] font-medium text-[#1D1D1F] bg-[#FFFFFF] hover:bg-[#F5F5F7] border border-black/[0.08] rounded-full transition-colors cursor-pointer min-h-[36px]"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#6E6E73]" />
              <span className="sm:hidden">Print</span>
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={handleCopyText}
              className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 text-[11.5px] sm:text-[12px] font-medium text-[#1D1D1F] bg-[#FFFFFF] hover:bg-[#F5F5F7] border border-black/[0.08] rounded-full transition-colors cursor-pointer min-h-[36px]"
              title="Copy plain-text CV"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#6E6E73]" />
                  <span className="sm:hidden">Copy</span>
                  <span className="hidden sm:inline">Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 rounded-full text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.05] transition-colors cursor-pointer"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Document Content */}
        <div className="overflow-y-auto px-4 sm:px-8 md:px-12 py-6 sm:py-10 text-[#1D1D1F] space-y-6 sm:space-y-8 select-text">
          {/* Header */}
          <div className="border-b border-black/[0.08] pb-5 sm:pb-6">
            <h1 id="resume-title" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1D1D1F] break-words">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <p className="text-[14.5px] sm:text-[16px] text-[#424245] mt-1 font-medium break-words">
              {PORTFOLIO_DATA.personal.role}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] sm:text-[13px] text-[#6E6E73] mt-2.5 font-mono">
              <span className="break-all">{PORTFOLIO_DATA.personal.email}</span>
              <span>•</span>
              <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="hover:text-[#0071E3] underline">
                GitHub
              </a>
              <span>•</span>
              <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#0071E3] underline">
                LinkedIn
              </a>
              <span>•</span>
              <span>Graduation: {PORTFOLIO_DATA.personal.expectedGraduation}</span>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-2.5 sm:space-y-3">
            <h2 className="text-[11.5px] sm:text-[13px] font-mono uppercase tracking-wider text-[#86868B] border-b border-black/[0.06] pb-1.5">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1D1D1F] break-words">
                  {PORTFOLIO_DATA.education.degree}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#6E6E73] mt-0.5">
                  Academic Focus: Artificial Intelligence, Data Engineering, Software Systems
                </p>
              </div>
              <span className="text-[12px] sm:text-[13px] font-mono text-[#86868B] shrink-0 mt-0.5 sm:mt-0">
                {PORTFOLIO_DATA.education.timeline} (Exp. {PORTFOLIO_DATA.education.expectedGraduation})
              </span>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2.5 sm:space-y-3">
            <h2 className="text-[11.5px] sm:text-[13px] font-mono uppercase tracking-wider text-[#86868B] border-b border-black/[0.06] pb-1.5">
              Technical Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-[13.5px] sm:text-[14px]">
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5">
                  Programming:
                </strong>
                <p className="text-[#555558]">Python, JavaScript / TypeScript, C++</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5">
                  Web &amp; UI:
                </strong>
                <p className="text-[#555558]">HTML, CSS, React, Tailwind CSS</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5">
                  Data &amp; Databases:
                </strong>
                <p className="text-[#555558]">SQL, Database Fundamentals, Data Analysis</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5">
                  Tools &amp; Environment:
                </strong>
                <p className="text-[#555558]">Git, GitHub, VS Code, Linux basics</p>
              </div>
              <div className="sm:col-span-2">
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5">
                  Artificial Intelligence:
                </strong>
                <p className="text-[#555558]">
                  Machine learning fundamentals, model evaluation metrics, AI application development
                </p>
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-[11.5px] sm:text-[13px] font-mono uppercase tracking-wider text-[#86868B] border-b border-black/[0.06] pb-1.5">
              Selected Technical Projects
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                    <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-[#1D1D1F] break-words">
                      {proj.title}
                    </h3>
                    <span className="text-[11.5px] sm:text-[12px] font-mono text-[#86868B]">
                      {proj.technologies.slice(0, 3).join(' • ')}
                    </span>
                  </div>
                  <p className="text-[12.5px] sm:text-[13px] text-[#555558] leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Philosophy Note */}
          <div className="pt-3 sm:pt-4 border-t border-black/[0.06] text-[11.5px] sm:text-[12px] text-[#86868B] italic">
            This academic profile communicates active undergraduate coursework and engineering projects. No unsupported claims or unverified credentials.
          </div>
        </div>
      </div>
    </div>
  );
};
