import React from 'react';

const SKILLS_LIST = [
  'PYTHON',
  'GOOGLE GEMINI API',
  'FASTAPI',
  'REACT 19',
  'NODE.JS & EXPRESS',
  'SQLITE & POSTGRESQL',
  'JWT AUTHENTICATION',
  'STAR SCHEMA',
  'PANDAS',
  'SQLAlchemy',
  'C++17',
  'MACHINE LEARNING',
  'ETL PIPELINES',
  'TAILWIND CSS',
  'VITE',
  'DETERMINISTIC SYSTEMS',
  'THREE.JS',
  'VALGRIND VERIFIED',
];

export const SkillsMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-[#FFD60A] text-[#0E0E0E] py-3.5 border-y-2 border-[#0E0E0E] select-none z-10">
      <div className="flex w-max animate-marquee">
        {/* Track 1 */}
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase pr-6 sm:pr-10">
          {SKILLS_LIST.map((skill, i) => (
            <React.Fragment key={`t1-${i}`}>
              <span>{skill}</span>
              <span className="w-2 h-2 rounded-full bg-[#0E0E0E]" />
            </React.Fragment>
          ))}
        </div>

        {/* Track 2 (Clone for infinite seamless loop) */}
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase pr-6 sm:pr-10" aria-hidden="true">
          {SKILLS_LIST.map((skill, i) => (
            <React.Fragment key={`t2-${i}`}>
              <span>{skill}</span>
              <span className="w-2 h-2 rounded-full bg-[#0E0E0E]" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
