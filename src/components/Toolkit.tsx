import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Terminal, Cpu, Database, Server, Wrench, ArrowUpRight } from 'lucide-react';

export const Toolkit: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('Python');

  const categories = [
    {
      name: 'Programming Languages',
      tag: '01 // CODE',
      icon: Terminal,
      skills: [
        { name: 'Python', isPrimary: true, note: 'Primary · Ingestion, Pandas, ML pipelines & automation' },
        { name: 'TypeScript', isPrimary: false, note: 'Strict typing, state interfaces & robust frontend contracts' },
        { name: 'JavaScript', isPrimary: false, note: 'Modern ES6+, DOM manipulation & async event flows' },
        { name: 'C++', isPrimary: false, note: 'Memory layout, pointer arithmetic & algorithmic optimization' },
        { name: 'SQL', isPrimary: true, note: 'Complex analytical joins, window functions & star-schema queries' },
      ],
    },
    {
      name: 'AI & Machine Learning',
      tag: '02 // INTELLIGENCE',
      icon: Cpu,
      skills: [
        { name: 'Google Gemini API', isPrimary: true, note: 'Daily plan synthesis, prompt engineering & structured task decomposition' },
        { name: 'Machine Learning Foundations', isPrimary: true, note: 'Mathematical cost functions, gradient descent & regularization' },
        { name: 'Classification Benchmarks', isPrimary: false, note: 'Stratified cross-validation, precision-recall & ROC-AUC auditing' },
        { name: 'Feature Engineering', isPrimary: false, note: 'Robust scaling, IQR outlier filtration & zero-leakage splits' },
      ],
    },
    {
      name: 'Data Systems & Warehousing',
      tag: '03 // SYSTEMS',
      icon: Database,
      skills: [
        { name: 'Pandas & NumPy ETL', isPrimary: true, note: 'Vectorized aggregations, data sanitization & memory profiling' },
        { name: 'Star-Schema Modeling', isPrimary: true, note: 'Normalized dimension tables & fact sales indexing' },
        { name: 'Database Fundamentals & SQLite', isPrimary: false, note: 'Relational ACID integrity, 3NF normalization & foreign keys' },
        { name: 'Exploratory Data Analysis', isPrimary: false, note: 'Statistical distribution profiling & correlation matrix reporting' },
      ],
    },
    {
      name: 'Backend & Infrastructure',
      tag: '04 // SERVING',
      icon: Server,
      skills: [
        { name: 'FastAPI & Express.js', isPrimary: true, note: 'Asynchronous Python REST APIs and Node.js backend services' },
        { name: 'PostgreSQL & SQLite', isPrimary: true, note: 'Dual-target relational storage with migration compatibility' },
        { name: 'SQLAlchemy ORM', isPrimary: false, note: 'Declarative transactional models & session connection pooling' },
        { name: 'JWT Authentication', isPrimary: true, note: 'Token-based authentication, salted hashing & protected routes' },
      ],
    },
    {
      name: 'Engineering Tooling',
      tag: '05 // WORKFLOW',
      icon: Wrench,
      skills: [
        { name: 'Git & GitHub', isPrimary: true, note: 'Conventional commit hygiene, branch isolation & automated CI runs' },
        { name: 'VS Code & Tooling', isPrimary: false, note: 'Integrated debugging, Oxlint configuration & terminal workflows' },
        { name: 'Vite & Tailwind CSS v4', isPrimary: true, note: 'Instant HMR, production tree-shaking & minimal CSS footprint' },
      ],
    },
  ];

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
              <span>CHAPTER 03 // TECHNICAL TOOLKIT</span>
            </div>

            <h2 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0E0E0E] leading-[0.95]">
              ENGINEERING{' '}
              <span className="font-serif italic font-normal text-[#0E0E0E] underline decoration-[#FFD60A] decoration-4 underline-offset-8">
                Arsenal.
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs sm:text-sm text-[#6B6862] max-w-sm uppercase tracking-wider leading-relaxed">
            Large typographic stacks organized by discipline. Primary specialization highlighted in signature yellow.
          </p>
        </div>

        {/* Categories Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="rounded-3xl border-2 border-[#0E0E0E] bg-[#FFFFFF] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_32px_rgba(14,14,14,0.06)] hover:-translate-y-1"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#0E0E0E]/15 mb-6">
                    <span className="font-mono text-[10px] tracking-widest text-[#6B6862] font-bold">
                      {cat.tag}
                    </span>
                    <Icon className="w-4 h-4 text-[#0E0E0E]" />
                  </div>

                  <h3 className="font-display uppercase text-2xl sm:text-3xl text-[#0E0E0E] tracking-tight mb-6">
                    {cat.name}
                  </h3>

                  {/* Skills List as Typographic Stacks */}
                  <div className="space-y-3">
                    {cat.skills.map((skill) => {
                      const isSelected = selectedTech === skill.name;
                      return (
                        <div
                          key={skill.name}
                          onClick={() => setSelectedTech(skill.name)}
                          className={`group p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                            skill.isPrimary
                              ? 'bg-[#FFD60A] border-[#0E0E0E] shadow-sm'
                              : isSelected
                              ? 'bg-[#0E0E0E] text-[#F2EFE6] border-[#0E0E0E]'
                              : 'bg-[#F9F7F1] border-[#0E0E0E]/10 hover:border-[#0E0E0E]/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-mono text-sm sm:text-base font-bold ${
                                skill.isPrimary
                                  ? 'text-[#0E0E0E]'
                                  : isSelected
                                  ? 'text-[#FFD60A]'
                                  : 'text-[#0E0E0E]'
                              }`}
                            >
                              {skill.name}
                            </span>

                            {skill.isPrimary && (
                              <span className="font-mono text-[9px] font-bold tracking-widest uppercase bg-[#0E0E0E] text-[#FFD60A] px-2 py-0.5 rounded-full">
                                PRIMARY
                              </span>
                            )}
                          </div>

                          <p
                            className={`text-xs mt-1.5 font-sans leading-relaxed ${
                              skill.isPrimary
                                ? 'text-[#0E0E0E]/85 font-medium'
                                : isSelected
                                ? 'text-[#F2EFE6]/80'
                                : 'text-[#6B6862]'
                            }`}
                          >
                            {skill.note}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Footer Index */}
                <div className="pt-6 mt-6 border-t border-[#0E0E0E]/10 flex items-center justify-between font-mono text-[10px] text-[#6B6862] uppercase tracking-wider">
                  <span>DISCIPLINE 0{idx + 1}</span>
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
              SYSTEM PHILOSOPHY // 03
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-[#F2EFE6]">
              &ldquo;Writing maintainable, well-structured, readable code with strict separation of concerns that solves concrete, real-world problems.&rdquo;
            </p>
          </div>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-xs font-bold uppercase shrink-0 transition-transform hover:scale-105"
          >
            <span>Review Commits on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Bottom Smooth Transition from Cream Toolkit to Yellow Record */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-[#FFD60A] pointer-events-none" />
    </section>
  );
};
