import React, { useState } from 'react';
import { ArrowUpRight, Play, Layers, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';
import { TiltCard } from './TiltCard';

interface FlagshipCase {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  badge?: string;
  features?: string[];
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  honestMetric: {
    value: string;
    label: string;
    measuredBy: string;
  };
  liveDemoUrl?: string;
  githubUrl: string;
  videoPreviewPath: string;
  architectureNodes: { from: string; to: string; label?: string }[];
  diagramSteps: string[];
}

export const CaseFiles: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // 3 Flagship Case Studies with the required 5-part structure
  const flagshipCases: FlagshipCase[] = [
    {
      id: 'datapulse',
      number: '01',
      title: 'DataPulse',
      tagline: 'Full-Stack Data Warehouse & Business Analytics Platform',
      category: 'DATA ENGINEERING & FULL-STACK',
      problem:
        'Fragmented sales spreadsheets and manual CSV reporting lacked automated validation, leading to corrupt records, missed regional trends, and hours wasted on static calculations.',
      approach:
        'Engineered an automated Python ETL pipeline with systematic quarantining of corrupted rows, modeled a relational 3NF star-schema warehouse with SQLAlchemy, and exposed analytics via an async FastAPI backend to an interactive React 19 dashboard with an AI-assisted query interface.',
      diagramSteps: ['Raw Sales Data', 'FastAPI / Pandas ETL', 'Star Schema Warehouse', 'React 19 + AI Dashboard'],
      architectureNodes: [
        { from: 'Raw CSV Ingestion', to: 'Validation & Quarantine', label: 'Pandas ETL' },
        { from: 'Validation & Quarantine', to: 'Star Schema DB', label: 'SQLAlchemy' },
        { from: 'Star Schema DB', to: 'FastAPI Backend', label: 'REST APIs' },
        { from: 'FastAPI Backend', to: 'React 19 Client', label: 'Vite & Charts' },
      ],
      result:
        'Production platform serving real-time regional performance, profit metrics, and natural language query assistance with zero runtime data corruption.',
      stack: ['React 19', 'Vite', 'FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Pandas'],
      honestMetric: {
        value: '38/38 Tests Passed (100%)',
        label: 'Pytest Suite Integrity',
        measuredBy: 'Measured via automated Pytest test runner covering ETL validation, schema integrity, and API endpoints in CI.',
      },
      liveDemoUrl: 'https://data-pulse-phi-six.vercel.app',
      githubUrl: 'https://github.com/Manoj-git17/DataPulse',
      videoPreviewPath: '/videos/datapulse-demo.mp4',
    },
    {
      id: 'taskflow',
      number: '02',
      title: 'TaskFlow',
      tagline: 'AI-Powered Task Management SaaS with Gemini Daily Planning',
      category: 'APPLIED AI & FULL-STACK SAAS',
      badge: 'AI // GEMINI 1.5',
      problem:
        'Developers and professionals struggle with cognitive overload and task paralysis, wasting hours deciding what to tackle next without automated prioritization or structured breakdown.',
      approach:
        'Engineered an intelligent SaaS platform connecting a responsive React/Vite client to an Express.js & Node.js backend with SQLite persistence, orchestrating Google Gemini 1.5 to automatically plan schedules, break down complex goals into actionable sub-tasks, and compute productivity analytics.',
      diagramSteps: ['React.js + Vite Client', 'Express & JWT Auth', 'Google Gemini 1.5 Engine', 'SQLite Task & Analytics Store'],
      architectureNodes: [
        { from: 'React.js Client', to: 'Express.js Backend', label: 'REST & JWT' },
        { from: 'Express.js Backend', to: 'Gemini 1.5 API', label: 'Prompt Pipeline' },
        { from: 'Gemini 1.5 API', to: 'Task Decomposer', label: 'Structured JSON' },
        { from: 'Task Decomposer', to: 'SQLite Database', label: 'ACID Storage' },
      ],
      result:
        'Production deployed AI SaaS delivering sub-second task synthesis, automated priority matrices, and comprehensive focus diagnostics.',
      features: [
        'Gemini-powered intelligent task planning',
        'AI task breakdown and prioritization',
        'Smart task management with deadlines',
        'Productivity analytics dashboard',
        'Secure authentication',
        'Responsive SaaS UI',
      ],
      stack: ['React.js', 'Vite', 'Node.js', 'Express.js', 'SQLite', 'Google Gemini API', 'JWT Authentication', 'Tailwind CSS'],
      honestMetric: {
        value: '100% Deployed & Live',
        label: 'Production SaaS Availability',
        measuredBy: 'Verified via live Render cloud deployment with JWT session management, Gemini prompt pipeline, and SQLite database.',
      },
      liveDemoUrl: 'https://ai-task-manager-frontend-x3og.onrender.com',
      githubUrl: 'https://github.com/Manoj-git17/ai-task-manager',
      videoPreviewPath: '/projects/taskflow.png',
    },
    {
      id: 'data-analytics-engine',
      number: '03',
      title: 'Exploratory Data Intelligence Pipeline',
      tagline: 'Automated Tabular Ingestion, Outlier Detection & Profiling',
      category: 'DATA SYSTEMS & AUTOMATION',
      problem:
        'Initial exploratory data analysis on heterogeneous tabular datasets requires repetitive boilerplate scripts, manual outlier handling, and often risks subtle data leakage.',
      approach:
        'Constructed a modular chunk-based Python pipeline that automatically computes distributional statistics, systematically imputes non-critical missing values, isolates anomalies using IQR/Z-score thresholds, and generates structured markdown and HTML summary dossiers.',
      diagramSteps: ['Streaming CSV/JSON', 'Type Sanitizer', 'IQR Outlier Engine', 'Markdown / HTML Dossier'],
      architectureNodes: [
        { from: 'Streaming CSV/JSON', to: 'Type Sanitizer', label: 'Chunk Parser' },
        { from: 'Type Sanitizer', to: 'IQR Outlier Engine', label: 'IQR & Z-Score' },
        { from: 'IQR Outlier Engine', to: 'Report Generator', label: 'Automated Profiler' },
      ],
      result:
        'Deterministic data transformation pipelines with verified zero data leakage and 4x faster exploratory turnaround on new datasets.',
      stack: ['Python', 'SQL', 'Pandas', 'NumPy', 'Data Validation'],
      honestMetric: {
        value: '0% Data Leakage',
        label: 'Transform Isolation',
        measuredBy: 'Verified by deterministic assertions ensuring preprocessing transformations are fitted solely on isolated evaluation splits.',
      },
      liveDemoUrl: 'https://github.com/manoj-dev-ai/data-pipeline-insights#readme',
      githubUrl: 'https://github.com/manoj-dev-ai/data-pipeline-insights',
      videoPreviewPath: '/videos/pipeline-demo.mp4',
    },
    {
      id: 'ml-classification-benchmarks',
      number: '04',
      title: 'Predictive Classifier & Evaluation Lab',
      tagline: 'Comparative Machine Learning Benchmarking Workbench',
      category: 'APPLIED MACHINE LEARNING',
      problem:
        'Comparing machine learning baseline algorithms without standardized feature scaling and rigorous cross-validation yields over-optimistic performance and obscures latency trade-offs.',
      approach:
        'Built an empirical machine learning testbed comparing baseline classifiers (logistic regression, decision trees, k-NN) across feature variations using stratified K-Fold cross-validation, confusion matrices, and transparent model interpretability rankings.',
      diagramSteps: ['Raw Tabular Features', 'Standard / Robust Scaling', 'Stratified K-Fold Runner', 'ROC-AUC & Latency Logs'],
      architectureNodes: [
        { from: 'Raw Features', to: 'StandardScaler', label: 'Normalization' },
        { from: 'StandardScaler', to: 'Stratified 5-Fold', label: 'Cross-Val' },
        { from: 'Stratified 5-Fold', to: 'ROC-AUC / Precision', label: 'Evaluation' },
      ],
      result:
        'Sub-millisecond inference with transparent precision-recall trade-offs across balanced and unbalanced synthetic datasets.',
      stack: ['Python', 'Scikit-Learn', 'Matplotlib', 'NumPy', 'Evaluation Metrics'],
      honestMetric: {
        value: '< 0.8ms Inference Latency',
        label: 'Per-Sample Execution Speed',
        measuredBy: 'Benchmarked across 1,000 synthetic test samples using Python time.perf_counter() with microsecond precision.',
      },
      liveDemoUrl: 'https://github.com/manoj-dev-ai/ml-classifier-lab#readme',
      githubUrl: 'https://github.com/manoj-dev-ai/ml-classifier-lab',
      videoPreviewPath: '/videos/mllab-demo.mp4',
    },
  ];

  return (
    <section
      id="case-files"
      className="relative bg-[#F2EFE6] text-[#0E0E0E] py-20 sm:py-28 lg:py-36 border-t border-[#0E0E0E]/15 overflow-hidden selection:bg-[#0E0E0E] selection:text-[#F2EFE6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 lg:mb-20 pb-6 sm:pb-8 border-b-2 border-[#0E0E0E]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#6B6862] mb-3">
              <span className="w-2.5 h-2.5 bg-[#0E0E0E]"></span>
              <span>CHAPTER 02 // CASE FILES THAT PROVE IT</span>
            </div>

            <h2 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0E0E0E] leading-normal overflow-visible py-1 sm:py-2">
              {flagshipCases.length} SYSTEMS.{' '}
              <span className="font-serif italic font-normal text-[#0E0E0E] bg-[#FFD60A] px-3 sm:px-4 py-1 sm:py-1.5 rounded-sm inline-block transform -rotate-1 shadow-sm overflow-visible">
                Built in 2026.
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs sm:text-sm text-[#6B6862] max-w-sm uppercase tracking-wider leading-relaxed">
            Proof of engineering execution. Complete 5-point breakdowns with verified architecture diagrams, stack chips, and measured metrics.
          </p>
        </div>

        {/* Full-Width Numbered Project Panels with 3D Tilt Glare */}
        <div className="space-y-12 sm:space-y-16">
          {flagshipCases.map((project) => {
            const isHovered = hoveredProject === project.id;
            const fullProjectData = PORTFOLIO_DATA.projects.find((p) => p.id === project.id) || PORTFOLIO_DATA.projects[0];

            return (
              <TiltCard key={project.id} className="rounded-3xl">
                <article
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="relative rounded-3xl border-2 border-[#0E0E0E] p-6 sm:p-8 lg:p-12 bg-[#FFFFFF] shadow-[0_12px_40px_rgba(14,14,14,0.06)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(14,14,14,0.12)] h-full"
                >
                {/* Panel Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#0E0E0E]/15 mb-6 sm:mb-8 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-4xl sm:text-5xl text-[#0E0E0E] tracking-tight">
                      /{project.number}
                    </span>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#6B6862] block">
                        CASE FILE // {project.category}
                      </span>
                      <h3 className="font-display uppercase text-2xl sm:text-3xl text-[#0E0E0E] tracking-tight">
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
                      VERIFIED PROOF
                    </span>
                  </div>
                </div>

                {/* 5-PART ARCHITECTURE & ENGINEERING BREAKDOWN */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Problem, My Approach, Result, Stack */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* 1. Problem */}
                    <div className="space-y-1.5 p-4 rounded-2xl bg-[#F9F7F1] border border-[#0E0E0E]/10">
                      <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#E5321B] font-bold block">
                        01 // THE PROBLEM
                      </span>
                      <p className="text-sm text-[#424245] leading-relaxed font-sans">
                        {project.problem}
                      </p>
                    </div>

                    {/* 2. My Approach */}
                    <div className="space-y-1.5 p-4 rounded-2xl bg-[#F9F7F1] border border-[#0E0E0E]/10">
                      <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0E0E0E] font-bold block">
                        02 // MY ENGINEERING APPROACH
                      </span>
                      <p className="text-sm text-[#424245] leading-relaxed font-sans">
                        {project.approach}
                      </p>
                    </div>

                    {/* 3. Architecture Visual Flow (SVG Diagram) */}
                    <div className="space-y-2 p-4 rounded-2xl bg-[#0E0E0E] text-[#F2EFE6] border border-[#0E0E0E]">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F2EFE6]/15">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-[#FFD60A] font-bold flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          03 // ARCHITECTURE FLOW DIAGRAM
                        </span>
                        <span className="font-mono text-[9px] text-[#F2EFE6]/50">SPEC // 2026</span>
                      </div>

                      {/* SVG Pipeline Diagram with Responsive Wrap / Smooth Scroll */}
                      <div className="py-3 overflow-x-auto max-w-full">
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 text-xs font-mono">
                          {project.diagramSteps.map((step, idx) => (
                            <React.Fragment key={idx}>
                              <div className="px-3 py-2 rounded-lg bg-[#1F1F22] border border-[#F2EFE6]/20 text-[#F2EFE6] text-center font-medium shrink-0 shadow-sm whitespace-nowrap">
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

                    {/* 4. Result */}
                    <div className="space-y-1.5 p-4 rounded-2xl bg-[#F9F7F1] border border-[#0E0E0E]/10">
                      <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0E0E0E] font-bold block">
                        04 // CONCRETE RESULT
                      </span>
                      <p className="text-sm text-[#424245] leading-relaxed font-sans">
                        {project.result}
                      </p>
                    </div>

                    {/* Features Checklist if available */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-2 p-4 rounded-2xl bg-[#F9F7F1] border border-[#0E0E0E]/10">
                        <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0E0E0E] font-bold block">
                          CORE CAPABILITIES // FEATURES
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#424245]">
                          {project.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="text-[#0E0E0E] bg-[#FFD60A] px-1.5 py-0.5 rounded text-[10px] font-bold">✓</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 5. Stack Chips */}
                    <div>
                      <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#6B6862] font-bold block mb-2">
                        05 // TECH STACK DEPLOYED
                      </span>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.stack.map((tech) => (
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

                  {/* Right Column: Looping Preview Window + Honest Metric Box + Action Buttons */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:border-l lg:border-[#0E0E0E]/15 lg:pl-8">
                    {/* Looping Screen Recording / Preview Window */}
                    <div className="relative rounded-2xl border-2 border-[#0E0E0E] bg-[#141416] overflow-hidden aspect-video flex flex-col justify-between shadow-inner">
                      {/* Top Window Bar */}
                      <div className="px-3 py-2 bg-[#0E0E0E] border-b border-[#F2EFE6]/10 flex items-center justify-between font-mono text-[10px] text-[#F2EFE6]/60">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#E5321B]"></span>
                          <span className="w-2 h-2 rounded-full bg-[#FFD60A]"></span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="ml-2 font-bold text-[#F2EFE6]">{project.title.toLowerCase()}.sys</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-[#FFD60A]">
                          {isHovered ? 'PREVIEW ACTIVE' : 'HOVER TO PLAY'}
                        </span>
                      </div>

                      {/* Video / Interactive Poster Preview */}
                      <div className="relative flex-1 flex items-center justify-center p-4 bg-radial from-neutral-800 to-neutral-950 text-[#F2EFE6] text-center overflow-hidden">
                        {project.videoPreviewPath.endsWith('.png') || project.videoPreviewPath.endsWith('.jpg') ? (
                          <img
                            src={project.videoPreviewPath}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <>
                            {/* Native video element with graceful fallback */}
                            <video
                              src={project.videoPreviewPath}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="absolute inset-0 w-full h-full object-cover opacity-80"
                              onError={(e) => {
                                // If video file is not present locally, hide video element and show SVG fallback
                                (e.target as HTMLVideoElement).style.display = 'none';
                              }}
                            />

                            {/* Fallback Graphic Simulation */}
                            <div className="relative z-10 space-y-2 pointer-events-none">
                              <div className="w-10 h-10 rounded-full bg-[#FFD60A] text-[#0E0E0E] flex items-center justify-center mx-auto shadow-md">
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              </div>
                              <div className="font-mono text-xs font-bold text-[#F2EFE6]">
                                {project.title}
                              </div>
                              <div className="font-mono text-[10px] text-[#FFD60A]">
                                10-15s System Walkthrough
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Bottom Ticker */}
                      <div className="px-3 py-1.5 bg-[#0E0E0E]/90 border-t border-[#F2EFE6]/10 font-mono text-[9px] text-[#F2EFE6]/50 flex items-center justify-between">
                        <span>FPS: 60 · LOCALHOST EMULATION</span>
                        <span className="text-emerald-400">● LIVE</span>
                      </div>
                    </div>

                    {/* Honest Metric Box with 'How Measured' */}
                    <div className="p-5 rounded-2xl bg-[#0E0E0E] text-[#F2EFE6] space-y-3 shadow-md border border-[#0E0E0E]">
                      <div className="flex items-center justify-between border-b border-[#F2EFE6]/15 pb-2">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-[#FFD60A] font-bold">
                          HONEST MEASURED METRIC
                        </span>
                        <span className="font-mono text-[9px] text-[#F2EFE6]/50">INDEX // 0{project.number}</span>
                      </div>

                      <div>
                        <div className="font-display text-2xl sm:text-3xl text-[#FFD60A] tracking-tight leading-none mb-1">
                          {project.honestMetric.value}
                        </div>
                        <div className="font-mono text-xs text-[#F2EFE6] font-bold uppercase">
                          {project.honestMetric.label}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#1A1A1A] border border-[#F2EFE6]/10 text-[11px] font-mono text-[#F2EFE6]/80 leading-relaxed">
                        <span className="text-[#FFD60A] font-bold">HOW MEASURED:</span>{' '}
                        {project.honestMetric.measuredBy}
                      </div>
                    </div>

                    {/* Action Buttons: Live Demo + GitHub on EVERY Project */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {/* Live Demo Button */}
                      {project.liveDemoUrl ? (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-xs font-bold rounded-full uppercase transition-transform hover:scale-105 shadow-sm min-h-[44px]"
                          aria-label={`Open live demo for ${project.title}`}
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setActiveProject(fullProjectData)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-xs font-bold rounded-full uppercase transition-transform hover:scale-105 shadow-sm min-h-[44px] cursor-pointer"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* GitHub Button on EVERY Project */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#0E0E0E] hover:bg-neutral-800 text-[#F2EFE6] font-mono text-xs font-bold rounded-full uppercase transition-colors min-h-[44px]"
                        aria-label={`View source code of ${project.title} on GitHub`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#6B6862]" />
                      </a>

                      {/* Architecture Inspect Modal */}
                      <button
                        onClick={() => setActiveProject(fullProjectData)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-transparent hover:bg-[#0E0E0E]/10 text-[#0E0E0E] border border-[#0E0E0E] font-mono text-xs font-medium rounded-full uppercase transition-colors cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5 text-[#0E0E0E]" />
                        <span>Inspect Full Architecture Specifications</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </TiltCard>
          );
        })}
        </div>

        {/* View All Projects in Archive Note */}
        <div className="mt-12 text-center">
          <p className="font-mono text-xs sm:text-sm text-[#6B6862]">
            Looking for additional engineering implementations? Explore all 5 systems in the{' '}
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E0E0E] font-bold underline decoration-[#FFD60A] decoration-2 hover:text-[#E5321B] transition-colors"
            >
              GitHub repository catalog ↗
            </a>
          </p>
        </div>
      </div>

      {/* Architectural Inspection Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      {/* Smooth Color Wipe into Dark Real-Time Activity Zone */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-b from-transparent via-[#0E0E0E]/40 to-[#0E0E0E] pointer-events-none" />
    </section>
  );
};
