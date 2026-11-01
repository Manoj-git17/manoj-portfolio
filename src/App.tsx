import React, { useState, useEffect, Suspense, lazy } from 'react';
import { StickyNav } from './components/StickyNav';
import { HeroSubject } from './components/HeroSubject';
import { CaseFiles } from './components/CaseFiles';
import { LiveProof } from './components/LiveProof';
import { Toolkit } from './components/Toolkit';
import { Record } from './components/Record';
import { HireMe } from './components/HireMe';
import { ResumeModal } from './components/ResumeModal';
import { RecruiterModal } from './components/RecruiterModal';
import { ProjectModal } from './components/ProjectModal';
import { AskPortfolioChat } from './components/AskPortfolioChat';
import { NotFoundPage } from './components/NotFoundPage';
import { SmoothScroll } from './components/SmoothScroll';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { SkillsMarquee } from './components/SkillsMarquee';
import type { Project } from './data/portfolioData';
import { trackEvent } from './utils/analytics';

const CinematicCanvas = lazy(() => import('./components/three/CinematicCanvas'));

export const App: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isNotFound, setIsNotFound] = useState(() => {
    const path = window.location.pathname;
    return path !== '/' && path !== '' && path !== '/index.html';
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        setRecruiterOpen((prev) => {
          const next = !prev;
          if (next) trackEvent('recruiter_summary_opened', { trigger: 'keyboard_shortcut' });
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenResume = () => {
    trackEvent('resume_opened');
    setResumeOpen(true);
  };

  const handleOpenRecruiter = () => {
    trackEvent('recruiter_summary_opened', { trigger: 'button_click' });
    setRecruiterOpen(true);
  };

  if (isNotFound) {
    return (
      <NotFoundPage
        onReturnHome={() => {
          window.history.pushState({}, '', '/');
          setIsNotFound(false);
        }}
      />
    );
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#0E0E0E] text-[#F2EFE6] antialiased selection:bg-[#FFD60A] selection:text-[#0E0E0E]">
        {/* Full-Screen Cinematic 3D Canvas Fixed in Background */}
        <Suspense fallback={null}>
          <CinematicCanvas
            onSelectProject={(proj) => {
              trackEvent('project_opened', { project: proj.title, source: '3d_ring' });
              setActiveProject(proj);
            }}
            onOpenHireMe={() => setRecruiterOpen(true)}
          />
        </Suspense>

        {/* Loading Screen Counter 000-100 */}
        <LoadingScreen />

        {/* Magnetic Custom Cursor */}
        <CustomCursor />

        {/* Chapter 00: Small Sticky Nav (Top-Left) */}
        <StickyNav
          onOpenResume={handleOpenResume}
          onOpenRecruiter={handleOpenRecruiter}
        />

        {/* Main Magazine Chapters (relative z-10) */}
        <main className="relative z-10">
          {/* CHAPTER 01: SUBJECT (Hero, Dark / 3D Layered) */}
          <HeroSubject onOpenResume={handleOpenResume} />

          {/* INFINITE SKILLS MARQUEE TRANSITION */}
          <SkillsMarquee />

          {/* CHAPTER 02: CASE FILES (Numbered Panels, Cream) */}
          <CaseFiles />

          {/* CHAPTER 03: LIVE PROOF (Live GitHub API Commits & Activity, Dark) */}
          <LiveProof />

          {/* CHAPTER 04: TOOLKIT (Typographic Stacks, Cream) */}
          <Toolkit />

          {/* CHAPTER 05: RECORD & CREDIBILITY (Chronology & Testimonials, Full-Bleed Yellow) */}
          <Record />

          {/* CHAPTER 06: HIRE ME (Interactive Puppet String Button, Cream) */}
          <HireMe onOpenResume={handleOpenResume} />
        </main>

        {/* Discreet Academic Resume Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        {/* 1-Screen Executive Recruiter Modal (? shortcut) */}
        <RecruiterModal
          isOpen={recruiterOpen}
          onClose={() => setRecruiterOpen(false)}
          onOpenResume={() => {
            setRecruiterOpen(false);
            handleOpenResume();
          }}
        />

        {/* Project Inspection Modal (accessible from 3D screens or CaseFiles) */}
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}

        {/* Floating Ask Portfolio AI Chat Widget */}
        <AskPortfolioChat />
      </div>
    </SmoothScroll>
  );
};

export default App;
