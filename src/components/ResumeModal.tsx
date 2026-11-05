import React, { useEffect, useState } from 'react';
import { X, Printer, Copy, Check, ExternalLink } from 'lucide-react';
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
${PORTFOLIO_DATA.personal.name}
${PORTFOLIO_DATA.personal.role}
Location: ${PORTFOLIO_DATA.personal.location}
Email: ${PORTFOLIO_DATA.personal.email}
GitHub: ${PORTFOLIO_DATA.personal.github}
LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}
Availability: ${PORTFOLIO_DATA.personal.internshipAvailability}

EDUCATION:
- ${PORTFOLIO_DATA.education.degree} (${PORTFOLIO_DATA.education.currentStatus})
- Expected Graduation: ${PORTFOLIO_DATA.education.expectedGraduation}
- Key Focus: Data Structures, Algorithms, Mathematics, Relational Databases, Machine Learning Foundations

TECHNICAL SKILLS:
- Programming: Python, C++, JavaScript, TypeScript, SQL
- AI & Data Science: Machine Learning, Pandas, NumPy, Data Analysis, Feature Engineering, Model Evaluation
- Data Engineering: ETL Pipelines, Data Cleaning, Data Warehousing, Data Modeling
- Backend: FastAPI, Flask, Node.js, REST APIs
- Databases: PostgreSQL, SQLite
- Tools: Git, GitHub, VS Code

SELECTED PROJECTS:
1. DataPulse — AI-Powered Business Analytics Platform
   Stack: Python, FastAPI, React 19, TypeScript, PostgreSQL, SQLAlchemy, Tailwind CSS
   - Architected end-to-end sales intelligence platform with automated ETL and star schema data warehouse.
   - Verified 38/38 automated Pytests passed with 100% CI pass rate.

2. TaskFlow — AI-Powered Task Management SaaS
   Stack: React 19, Node.js, Express, SQLite, Google Gemini 1.5, JWT
   - Integrated Google Gemini 1.5 prompt pipeline for automated daily task synthesis and productivity analytics.
   - Deployed full-stack SaaS live on Render cloud platform.

3. Machine Learning Classification Project
   Stack: Python, Scikit-Learn, Pandas, NumPy, Matplotlib
   - Built comparative classification benchmark evaluating models using stratified 5-fold cross-validation.
   - Enforced strict data leakage boundaries with sub-millisecond inference latency.

4. Automated Data Pipeline
   Stack: Python, Pandas, SQLite, Logging, OS
   - Implemented streaming chunk processor with schema type validation, IQR outlier detection, and automated logs.
   - Deterministic transform logic preventing anomalous record ingestion.

5. Algorithmic Systems in C++
   Stack: Modern C++17, STL, Valgrind, Make / CMake
   - Developed leak-free balanced search trees and graph algorithms (BFS, DFS, Dijkstra) with Valgrind verification.
   - Benchmarked asymptotic time and spatial complexity across large datasets.
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
              RESUME // {PORTFOLIO_DATA.personal.name} ({PORTFOLIO_DATA.education.expectedGraduation})
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
            <h1 id="resume-title" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1D1D1F] break-words uppercase font-display">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <p className="text-[14.5px] sm:text-[16px] text-[#424245] mt-1 font-medium break-words">
              {PORTFOLIO_DATA.personal.role}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] sm:text-[13px] text-[#6E6E73] mt-2.5 font-mono">
              <span>Location: {PORTFOLIO_DATA.personal.location}</span>
              <span>•</span>
              <span>Status: {PORTFOLIO_DATA.education.currentStatus}</span>
              <span>•</span>
              <span className="break-all">{PORTFOLIO_DATA.personal.email}</span>
              <span>•</span>
              <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="hover:text-[#0E0E0E] underline inline-flex items-center gap-0.5">
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#0E0E0E] underline inline-flex items-center gap-0.5">
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="mt-2 text-xs font-mono text-[#0E0E0E] bg-[#FFD60A]/30 border border-[#FFD60A] px-2.5 py-1 rounded inline-block">
              {PORTFOLIO_DATA.personal.internshipAvailability}
            </div>
          </div>

          {/* Academic Education Section */}
          <div className="space-y-2.5 sm:space-y-3">
            <h2 className="text-[11.5px] sm:text-[13px] font-mono uppercase tracking-wider text-[#86868B] border-b border-black/[0.06] pb-1.5 font-bold">
              ACADEMIC EDUCATION
            </h2>
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1D1D1F] break-words">
                  {PORTFOLIO_DATA.education.degree}
                </h3>
                <span className="text-[12px] sm:text-[13px] font-mono text-[#86868B] shrink-0 mt-0.5 sm:mt-0 font-medium">
                  {PORTFOLIO_DATA.education.currentStatus} · Expected {PORTFOLIO_DATA.education.expectedGraduation}
                </span>
              </div>
              <p className="text-[13px] sm:text-[14px] text-[#555558] leading-relaxed">
                <strong className="text-[#1D1D1F] font-semibold">Key Focus:</strong> Data Structures, Algorithms, Discrete Mathematics, Relational Database Systems, Machine Learning Foundations
              </p>
            </div>
          </div>

          {/* Technical Skills: 6 Clean Categories */}
          <div className="space-y-2.5 sm:space-y-3">
            <h2 className="text-[11.5px] sm:text-[13px] font-mono uppercase tracking-wider text-[#86868B] border-b border-black/[0.06] pb-1.5 font-bold">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-[13.5px] sm:text-[14px]">
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Programming:
                </strong>
                <p className="text-[#555558]">Python, C++, JavaScript, TypeScript, SQL</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  AI &amp; Data Science:
                </strong>
                <p className="text-[#555558]">Machine Learning, Pandas, NumPy, Data Analysis, Feature Engineering, Model Evaluation</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Data Engineering:
                </strong>
                <p className="text-[#555558]">ETL Pipelines, Data Cleaning, Data Warehousing, Data Modeling</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Backend:
                </strong>
                <p className="text-[#555558]">FastAPI, Flask, Node.js, REST APIs</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Databases:
                </strong>
                <p className="text-[#555558]">PostgreSQL, SQLite</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Tools:
                </strong>
                <p className="text-[#555558]">Git, GitHub, VS Code</p>
              </div>
            </div>
          </div>

          {/* Selected Projects: 5 Prioritized Projects */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-[11.5px] sm:text-[13px] font-mono uppercase tracking-wider text-[#86868B] border-b border-black/[0.06] pb-1.5 font-bold">
              PRIORITIZED TECHNICAL PROJECTS
            </h2>
            <div className="space-y-3.5 sm:space-y-4">
              {PORTFOLIO_DATA.projects.map((proj, idx) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                    <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-[#1D1D1F] break-words">
                      {idx + 1}. {proj.title}
                    </h3>
                    <span className="text-[11.5px] sm:text-[12px] font-mono text-[#86868B]">
                      ({proj.technologies.slice(0, 4).join(', ')})
                    </span>
                  </div>
                  <p className="text-[12.5px] sm:text-[13px] text-[#555558] leading-relaxed">
                    {proj.tagline}
                  </p>
                  <p className="text-[12px] sm:text-[12.5px] text-[#1D1D1F] font-mono">
                    <span className="text-[#86868B]">Contribution:</span> {proj.keyContribution}
                    {proj.verifiedResults && (
                      <span className="text-emerald-700 font-semibold block sm:inline sm:ml-2">
                        · Result: {proj.verifiedResults}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Note */}
          <div className="pt-3 sm:pt-4 border-t border-black/[0.06] text-[11.5px] sm:text-[12px] text-[#86868B] italic">
            All codebases and reproducible execution environments are publicly available on GitHub (@Manoj-git17).
          </div>
        </div>
      </div>
    </div>
  );
};
