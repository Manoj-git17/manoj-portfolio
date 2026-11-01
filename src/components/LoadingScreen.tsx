import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [shouldRender, setShouldRender] = useState<boolean>(
    () => typeof window !== 'undefined' && !sessionStorage.getItem('manoj_dossier_preloaded')
  );
  const [count, setCount] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    if (!shouldRender) {
      onComplete?.();
      return;
    }

    const duration = 1000; // 1s snappy intro
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        sessionStorage.setItem('manoj_dossier_preloaded', 'true');
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            setShouldRender(false);
            onComplete?.();
          }, 450); // fade out duration
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [shouldRender, onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0E0E0E] text-[#F2EFE6] flex flex-col justify-between p-6 sm:p-12 transition-all duration-500 select-none ${
        isDone ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100'
      }`}
    >
      {/* Top Editorial Bar */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[#F2EFE6]/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A] animate-pulse"></span>
          <span>MANOJ // PORTFOLIO 2.0</span>
        </div>
        <span>INITIALIZING 3D ENGINE</span>
      </div>

      {/* Center Counter */}
      <div className="my-auto flex flex-col items-center justify-center space-y-4">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#FFD60A]">
          DOSSIER ASSETS LOADING
        </div>

        <div className="font-display text-7xl sm:text-9xl md:text-[14rem] tracking-tight leading-none text-[#F2EFE6] tabular-nums">
          {String(count).padStart(3, '0')}
          <span className="text-[#FFD60A] text-4xl sm:text-6xl md:text-8xl">%</span>
        </div>

        {/* Progress Line */}
        <div className="w-64 sm:w-80 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-[#FFD60A] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(255,214,10,0.8)]"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>

      {/* Bottom Editorial Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#F2EFE6]/40 uppercase tracking-widest">
        <span>EST. 2026 · VERIFIED ARTIFACTS</span>
        <span>REACT 19 • THREE.JS • FASTAPI</span>
      </div>
    </div>
  );
};
