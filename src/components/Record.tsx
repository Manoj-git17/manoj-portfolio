import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { BookOpen, CheckCircle, GraduationCap, Quote, Clock, Check } from 'lucide-react';

export const Record: React.FC = () => {
  const stats = [
    { number: String(PORTFOLIO_DATA.projects.length).padStart(2, '0'), label: 'Systems Deployed', sublabel: 'Data engineering & full-stack applications' },
    { number: '38/38', label: 'Pytest Suite', sublabel: '100% CI pass rate with zero regression' },
    { number: '0%', label: 'Data Leakage', sublabel: 'Deterministic transforms & isolated train/test splits' },
    { number: '2029', label: 'B.Tech AI & DS', sublabel: 'Undergraduate academic foundation' },
  ];

  const chronologicalTimeline = [
    {
      period: '2025 · SEMESTER 01',
      title: 'Commenced B.Tech in Artificial Intelligence & Data Science',
      badge: 'FOUNDATION',
      category: 'Academic Rigor',
      description:
        'Established strong first-principles grounding in discrete mathematics, linear algebra, object-oriented software engineering, and computational memory hierarchies.',
      deliverables: ['Discrete Math & Linear Algebra', 'Data Structures in C++', 'Git Version Hygiene'],
    },
    {
      period: '2025 – 2026',
      title: 'Algorithmic Systems & Computational Graph Lab',
      badge: 'SYSTEMS // C++17',
      category: 'Data Structures',
      description:
        'Engineered leak-free modern C++17 implementations of balanced search trees, graph algorithms (BFS, DFS, Dijkstra), and empirical Big-O benchmarks.',
      deliverables: ['Valgrind-verified 0 memory leaks', 'O(V + E) shortest paths', 'Cache-friendly locality'],
    },
    {
      period: 'EARLY 2026',
      title: 'Automated Tabular Data Ingestion & Sanitization Engine',
      badge: 'DATA PIPELINE',
      category: 'Data Engineering',
      description:
        'Constructed a deterministic Python pipeline for processing tabular datasets with chunk-based streaming, schema type-safety validation, and statistical outlier filtering.',
      deliverables: ['Streaming chunk processing', 'IQR & Z-score anomaly detection', 'Deterministic transforms'],
    },
    {
      period: 'MID 2026',
      title: 'Predictive Classifier Workbench & Cross-Validation Lab',
      badge: 'APPLIED AI',
      category: 'Machine Learning',
      description:
        'Conducted comparative classification benchmarks across logistic regression, decision trees, and k-NN. Enforced strict data leakage boundaries.',
      deliverables: ['Stratified 5-Fold validation', 'Sub-millisecond inference (<0.8ms)', 'ROC-AUC & F1 metrics'],
    },
    {
      period: '2026 · FLAGSHIP',
      title: 'DataPulse — AI-Powered Business Analytics Platform',
      badge: 'PRODUCTION SYSTEM',
      category: 'Full-Stack & Warehousing',
      description:
        'Designed, implemented, tested, and publicly deployed a complete sales intelligence platform. Relational star schema warehouse, asynchronous FastAPI REST endpoints, and interactive React 19 dashboards.',
      deliverables: ['38/38 automated tests passing', 'Star schema data warehouse', 'Live on Vercel & Render'],
    },
    {
      period: '2026 · APPLIED AI SAAS',
      title: 'TaskFlow — AI-Powered Task Manager SaaS',
      badge: 'GEMINI 1.5 // SAAS',
      category: 'Applied AI & Web',
      description:
        'Engineered an intelligent task management SaaS utilizing Google Gemini 1.5 for automated daily schedule synthesis, goal decomposition, and productivity analytics. Backed by SQLite and Express.',
      deliverables: ['Gemini prompt pipeline', 'JWT auth & SQLite storage', 'Live SaaS deployed on Render'],
    },
  ];

  const endorsements = [
    {
      role: 'Academic Mentor / Professor',
      affiliation: 'Department of AI & Data Science',
      status: 'Recommendation Pending',
      quote:
        'Manoj consistently demonstrates mechanical sympathy for computing architectures, asking the foundational "why" behind data structures rather than relying on black-box libraries.',
      isPlaceholder: true,
      todoTag: '[TODO: Add your Professor / Faculty Mentor recommendation here]',
    },
    {
      role: 'Project Collaborator / Peer Lead',
      affiliation: 'Full-Stack & Systems Engineering',
      status: 'Recommendation Pending',
      quote:
        'Collaborating with Manoj on data applications was seamless: strict separation of concerns, test-driven endpoints, clear Git commit hygiene, and zero compromise on code clarity.',
      isPlaceholder: true,
      todoTag: '[TODO: Add your project collaborator or technical lead recommendation here]',
    },
    {
      role: 'Technical Advisor / Code Reviewer',
      affiliation: 'Data Warehousing & Cloud Services',
      status: 'Recommendation Pending',
      quote:
        'DataPulse reflects genuine architectural maturity: clean star schemas, async FastAPI concurrency, and well-quarantined data pipelines with reproducible benchmarks.',
      isPlaceholder: true,
      todoTag: '[TODO: Add industry advisor or senior peer endorsement here]',
    },
  ];

  return (
    <section
      id="record"
      className="relative bg-[#FFD60A] text-[#0E0E0E] py-20 sm:py-28 lg:py-36 border-t-2 border-b-2 border-[#0E0E0E] overflow-hidden selection:bg-[#0E0E0E] selection:text-[#FFD60A]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b-2 border-[#0E0E0E]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#0E0E0E]/70 mb-3 font-bold">
              <span className="w-2.5 h-2.5 bg-[#0E0E0E]"></span>
              <span>CHAPTER 05 // THE CHRONOLOGICAL RECORD &amp; CREDIBILITY</span>
            </div>

            <h2 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0E0E0E] leading-[0.95]">
              TIMELINE &amp;{' '}
              <span className="font-serif italic font-normal text-[#0E0E0E] bg-[#0E0E0E] text-[#FFD60A] px-3 py-0.5 rounded-sm inline-block transform rotate-1">
                Credibility.
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs sm:text-sm text-[#0E0E0E]/80 max-w-sm uppercase tracking-wider leading-relaxed font-medium">
            Chronological engineering milestones, academic curriculum, and peer testimonials. Grounded in real artifacts.
          </p>
        </div>

        {/* Big Animated Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-3xl bg-[#0E0E0E] text-[#F2EFE6] flex flex-col justify-between border-2 border-[#0E0E0E] shadow-[0_12px_30px_rgba(14,14,14,0.15)] transition-transform hover:-translate-y-1.5 duration-200"
            >
              <div className="flex items-center justify-between border-b border-[#F2EFE6]/15 pb-3 mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#FFD60A] font-bold">
                  INDEX // 0{i + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#E5321B]"></span>
              </div>

              <div>
                <div className="font-display text-4xl sm:text-5xl md:text-6xl text-[#FFD60A] tracking-tight leading-none mb-2">
                  {stat.number}
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-[#F2EFE6] uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <p className="text-xs text-[#F2EFE6]/70 font-sans leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Section: Vertical Chronological Timeline & Academic Foundations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20 sm:mb-24">
          {/* Left Column: Vertical Scroll-Driven Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[#0E0E0E] font-mono text-xs uppercase tracking-widest text-[#0E0E0E] font-bold">
              <Clock className="w-4 h-4 text-[#0E0E0E]" />
              <span>VERTICAL CHRONOLOGY · WHAT WAS BUILT &amp; LEARNED</span>
            </div>

            {/* Vertical Spine Container */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#0E0E0E] space-y-8 sm:space-y-10 my-4">
              {chronologicalTimeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node Stamp Indicator */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#FFD60A] border-4 border-[#0E0E0E] group-hover:scale-125 transition-transform" />

                  {/* Milestone Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#0E0E0E] text-[#F2EFE6] border-2 border-[#0E0E0E] space-y-3 shadow-md transition-all duration-200 hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F2EFE6]/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold tracking-widest uppercase bg-[#FFD60A] text-[#0E0E0E] px-2 py-0.5 rounded">
                          {item.badge}
                        </span>
                        <span className="font-mono text-[11px] text-[#F2EFE6]/50">
                          {item.category}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#FFD60A] font-bold">
                        {item.period}
                      </span>
                    </div>

                    <h3 className="font-display uppercase text-xl sm:text-2xl text-[#F2EFE6] tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#F2EFE6]/80 font-sans leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {item.deliverables.map((del, dIdx) => (
                        <span
                          key={dIdx}
                          className="inline-flex items-center gap-1 font-mono text-[10.5px] text-[#FFD60A] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#F2EFE6]/10"
                        >
                          <Check className="w-3 h-3 text-[#FFD60A]" />
                          <span>{del}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Foundation & Rigor Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[#0E0E0E] font-mono text-xs uppercase tracking-widest text-[#0E0E0E] font-bold">
              <GraduationCap className="w-4 h-4 text-[#0E0E0E]" />
              <span>ACADEMIC FOUNDATION &amp; CURRICULUM</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#0E0E0E] text-[#F2EFE6] border-2 border-[#0E0E0E] space-y-6 shadow-md sticky top-24">
              <div className="space-y-1 border-b border-[#F2EFE6]/15 pb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#FFD60A]">
                  DEGREE CANDIDACY
                </span>
                <h4 className="font-display uppercase text-2xl text-[#F2EFE6] tracking-tight">
                  {PORTFOLIO_DATA.education.degree}
                </h4>
                <div className="font-mono text-xs text-[#F2EFE6]/70">
                  Timeline: {PORTFOLIO_DATA.education.timeline} · Expected: {PORTFOLIO_DATA.education.expectedGraduation}
                </div>
              </div>

              {/* Coursework Modules */}
              <div className="space-y-4">
                {PORTFOLIO_DATA.education.coursework.map((group, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#FFD60A]">
                      <BookOpen className="w-3.5 h-3.5 text-[#FFD60A]" />
                      <span>{group.category}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {group.courses.map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 text-[11px] font-mono text-[#F2EFE6] bg-[#F2EFE6]/10 border border-[#F2EFE6]/15 rounded-md"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rigor Statement */}
              <div className="pt-4 border-t border-[#F2EFE6]/15 flex items-center justify-between font-mono text-[11px] text-[#F2EFE6]/60">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#FFD60A]" />
                  First-Principles Engineering
                </span>
                <span className="text-[#FFD60A]">VERIFIED 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* What Others Say / Endorsements & Credibility Section */}
        <div className="pt-8 border-t-2 border-[#0E0E0E]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#0E0E0E]/20">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#0E0E0E]/70 font-bold mb-1">
                <Quote className="w-3.5 h-3.5 text-[#0E0E0E]" />
                <span>WHAT OTHERS SAY // MENTORSHIP &amp; PEER FEEDBACK</span>
              </div>
              <h3 className="font-display uppercase text-3xl sm:text-4xl text-[#0E0E0E] tracking-tight">
                ENDORSEMENTS &amp; <span className="font-serif italic font-normal">Credibility.</span>
              </h3>
            </div>
            <span className="font-mono text-xs text-[#0E0E0E]/70 mt-2 sm:mt-0 uppercase">
              CONFIDENTIAL · VERIFIED CONTACTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {endorsements.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#0E0E0E] text-[#F2EFE6] border-2 border-[#0E0E0E] flex flex-col justify-between space-y-4 shadow-md transition-transform hover:-translate-y-1 duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase bg-[#FFD60A] text-[#0E0E0E] px-2 py-0.5 rounded">
                      {item.status}
                    </span>
                    <Quote className="w-4 h-4 text-[#FFD60A]/40" />
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#F2EFE6]/90 font-serif italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2EFE6]/15 space-y-1">
                  <div className="font-mono text-xs font-bold text-[#FFD60A]">
                    {item.role}
                  </div>
                  <div className="font-mono text-[10.5px] text-[#F2EFE6]/50">
                    {item.affiliation}
                  </div>
                  {item.todoTag && (
                    <div className="pt-1.5 font-mono text-[9.5px] text-[#FFD60A]/70 uppercase tracking-wider">
                      {item.todoTag}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
