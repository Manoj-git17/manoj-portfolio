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
- Programming Languages: Python, C++, SQL, JavaScript, TypeScript
- AI & Machine Learning: Machine Learning, Scikit-Learn, Feature Engineering, Model Evaluation, Gemini API
- Data Science & Analytics: Exploratory Data Analysis, Pandas, NumPy, Data Cleaning, Statistical Analysis
- Data Engineering: ETL Pipelines, Star Schema Modeling, Data Ingestion, Data Warehousing Concepts
- Backend Development: FastAPI, Flask, Node.js, Express, REST APIs
- Databases: PostgreSQL, SQLite, SQLAlchemy
- Developer Tools: Git, GitHub, VS Code, Linux CLI

SELECTED PROJECTS:
1. DataPulse — AI-Powered Business Analytics Platform
   Stack: Python, FastAPI, React 19, TypeScript, PostgreSQL, SQLAlchemy, Pandas, Tailwind CSS
   - Problem: Eliminates manual spreadsheet calculations and disparate CSV reports.
   - Built: Full-stack analytics system with automated Python ingestion, a 3NF star-schema warehouse, async FastAPI REST endpoints, and an interactive React 19 dashboard.
   - Verified Results: 38/38 automated Pytests passed covering ETL validation, schema integrity, and API endpoint contracts.

2. TaskFlow — AI-Powered Task Management
   Stack: React.js, Vite, Node.js, Express.js, SQLite, Google Gemini API, JWT
   - Problem: Reduces manual scheduling friction by converting broad goals into structured daily tasks.
   - Built: Full-stack task management application with React.js frontend, Express.js backend, SQLite persistence, and Google Gemini API integration.
   - Verified Results: Deployed live on Render cloud platform with persistent SQLite database state and authenticated workflows.

3. Machine Learning Classification Project
   Stack: Python, Scikit-Learn, Pandas, NumPy, Matplotlib
   - Problem: Evaluates baseline classification models against standardized tabular datasets to compare predictive metrics.
   - Built: Python evaluation workbench implementing logistic regression, decision trees, and k-NN with stratified 5-fold cross-validation.
   - Verified Results: Benchmarked precision, recall, and ROC-AUC metrics with strict train/test split isolation.

4. Automated Data Pipeline
   Stack: Python, Pandas, NumPy, SQL, SQLite
   - Problem: Standardizes ingestion of heterogeneous tabular files to detect corrupted records before database loading.
   - Built: Modular Python ETL pipeline supporting streaming chunk processing, schema validation, and summary reporting.
   - Verified Results: Tested transformation logic and statistical anomaly detection on sample CSV datasets.

5. Algorithmic Systems in C++
   Stack: Modern C++17, STL, CMake
   - Problem: Explores fundamental data structures and graph traversal performance with low-level memory control.
   - Built: C++17 library of balanced search trees, graph representations, and pathfinding algorithms (BFS, DFS, Dijkstra).
   - Verified Results: Unit-tested pathfinding algorithms confirming asymptotic correctness and RAII resource safety.
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

          {/* Technical Skills: 7 Clean Categories */}
          <div className="space-y-2.5 sm:space-y-3">
            <h2 className="text-[11.5px] sm:text-[13px] font-mono uppercase tracking-wider text-[#86868B] border-b border-black/[0.06] pb-1.5 font-bold">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-[13.5px] sm:text-[14px]">
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Programming Languages:
                </strong>
                <p className="text-[#555558]">Python, C++, SQL, JavaScript, TypeScript</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  AI &amp; Machine Learning:
                </strong>
                <p className="text-[#555558]">Machine Learning, Scikit-Learn, Feature Engineering, Model Evaluation, Gemini API</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Data Science &amp; Analytics:
                </strong>
                <p className="text-[#555558]">Exploratory Data Analysis, Pandas, NumPy, Data Cleaning, Statistical Analysis</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Data Engineering:
                </strong>
                <p className="text-[#555558]">ETL Pipelines, Star Schema Modeling, Data Ingestion, Data Warehousing Concepts</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Backend Development:
                </strong>
                <p className="text-[#555558]">FastAPI, Flask, Node.js, Express, REST APIs</p>
              </div>
              <div>
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Databases:
                </strong>
                <p className="text-[#555558]">PostgreSQL, SQLite, SQLAlchemy</p>
              </div>
              <div className="sm:col-span-2">
                <strong className="font-semibold text-[#1D1D1F] block text-[12.5px] sm:text-[13px] mb-0.5 font-mono">
                  Developer Tools:
                </strong>
                <p className="text-[#555558]">Git, GitHub, VS Code, Linux CLI</p>
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
