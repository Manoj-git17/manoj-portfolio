import React from 'react';
import { ArrowLeft, FileQuestion, Terminal } from 'lucide-react';

interface NotFoundPageProps {
  onReturnHome?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onReturnHome }) => {
  const handleHome = () => {
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F2EFE6] flex flex-col justify-between p-6 sm:p-12 selection:bg-[#FFD60A] selection:text-[#0E0E0E]">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-[#F2EFE6]/10 pb-6">
        <div className="flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase">
          <Terminal className="w-4 h-4 text-[#FFD60A]" />
          <span className="font-bold text-white">MANOJ · ARCHIVAL SYSTEM</span>
        </div>
        <span className="font-mono text-xs text-[#FFD60A] bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#FFD60A]/30">
          ERROR // 404
        </span>
      </header>

      {/* Main Archival 404 Content */}
      <main className="max-w-3xl my-auto py-12 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5321B]/15 border border-[#E5321B]/30 text-[#E5321B] font-mono text-xs tracking-wider uppercase">
          <FileQuestion className="w-3.5 h-3.5" />
          <span>CASE FILE NOT FOUND</span>
        </div>

        <h1 className="font-display uppercase text-6xl sm:text-8xl md:text-9xl tracking-tight leading-[0.9] text-[#F2EFE6]">
          DOSSIER{' '}
          <span className="text-[#FFD60A] underline decoration-4 underline-offset-8">
            MISSING.
          </span>
        </h1>

        <p className="font-serif italic text-xl sm:text-2xl text-[#F2EFE6]/70 max-w-xl leading-relaxed">
          The requested archival record or route could not be verified in the candidate dossier.
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={handleHome}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe043] text-[#0E0E0E] font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Candidate Dossier</span>
          </button>

          <span className="font-mono text-xs text-[#F2EFE6]/40">
            REF: ARCHIVE_INDEX_FAULT
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#F2EFE6]/10 pt-6 flex flex-wrap items-center justify-between text-xs font-mono text-[#F2EFE6]/40">
        <span>MANOJ · PORTFOLIO DOSSIER 2026</span>
        <span>STATUS: 404 ROUTE INTERCEPTED</span>
      </footer>
    </div>
  );
};
