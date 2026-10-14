import React, { useEffect, useRef, useState } from 'react';

type VisualMode = 'neural' | 'waveform' | 'gradient';

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  isSpecial?: boolean;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<VisualMode>('neural');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Mouse / touch coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 120,
    };

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let ripples: Ripple[] = [];

    const initPoints = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for mobile GPU performance

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      points = [];
      const cols = Math.max(5, Math.floor(width / (width < 640 ? 55 : 70)));
      const rows = Math.max(4, Math.floor(height / (height < 320 ? 50 : 60)));

      const stepX = width / (cols + 1);
      const stepY = height / (rows + 1);

      for (let i = 1; i <= cols; i++) {
        for (let j = 1; j <= rows; j++) {
          const offsetX = Math.sin(i * 1.4 + j) * 6;
          const offsetY = Math.cos(j * 1.4 + i) * 6;
          const x = i * stepX + offsetX;
          const y = j * stepY + offsetY;

          const isSpecial = (i * cols + j) % 6 === 0;

          points.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            radius: isSpecial ? (width < 640 ? 2.4 : 2.8) : (width < 640 ? 1.4 : 1.7),
            phase: Math.random() * Math.PI * 2,
            isSpecial,
          });
        }
      }
    };

    initPoints();

    const handleResize = () => {
      initPoints();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: Math.min(160, width * 0.4),
        alpha: 0.6,
      });
    };

    // Touch support that NEVER blocks vertical scrolling
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;
        mouse.targetX = touchX;
        mouse.targetY = touchY;

        ripples.push({
          x: touchX,
          y: touchY,
          radius: 0,
          maxRadius: Math.min(140, width * 0.35),
          alpha: 0.5,
        });
      }
    };

    const handleTouchEnd = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.014;

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Render Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 2.8;
        rip.alpha *= 0.95;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 113, 227, ${rip.alpha * 0.4})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      if (mode === 'neural') {
        // --- 1. NEURAL LATTICE MODE ---
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const driftX = Math.sin(time + p.phase) * 2.5;
          const driftY = Math.cos(time * 0.9 + p.phase) * 2.5;

          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let pushX = 0;
          let pushY = 0;

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 16;
            pushX = (dx / dist) * force;
            pushY = (dy / dist) * force;
          }

          const targetX = p.originX + driftX + pushX;
          const targetY = p.originY + driftY + pushY;

          p.x += (targetX - p.x) * 0.12;
          p.y += (targetY - p.y) * 0.12;
        }

        // Draw connections
        const maxDist = width < 640 ? 75 : 92;
        for (let i = 0; i < points.length; i++) {
          const p1 = points[i];
          for (let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.14;
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              const isNearMouse = Math.hypot(midX - mouse.x, midY - mouse.y) < 90;

              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);

              if (isNearMouse) {
                ctx.strokeStyle = `rgba(0, 113, 227, ${alpha * 2.4})`;
                ctx.lineWidth = 1.0;
              } else if (p1.isSpecial || p2.isSpecial) {
                ctx.strokeStyle = `rgba(29, 29, 31, ${alpha * 1.3})`;
                ctx.lineWidth = 0.8;
              } else {
                ctx.strokeStyle = `rgba(142, 142, 147, ${alpha})`;
                ctx.lineWidth = 0.6;
              }
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const isHovered = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 70;

          ctx.beginPath();
          ctx.arc(p.x, p.y, isHovered ? p.radius * 1.4 : p.radius, 0, Math.PI * 2);

          if (p.isSpecial) {
            ctx.fillStyle = isHovered ? '#0071E3' : '#1D1D1F';
            ctx.fill();

            // Concentric orbit ring
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius + 3.2 + Math.sin(time * 2 + p.phase) * 0.7, 0, Math.PI * 2);
            ctx.strokeStyle = isHovered ? 'rgba(0, 113, 227, 0.35)' : 'rgba(29, 29, 31, 0.12)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          } else {
            ctx.fillStyle = isHovered ? '#0071E3' : 'rgba(110, 110, 115, 0.65)';
            ctx.fill();
          }
        }
      } else if (mode === 'waveform') {
        // --- 2. HARMONIC DATA WAVEFORM MODE ---
        const waveCount = width < 640 ? 4 : 5;
        const centerY = height / 2;

        for (let w = 0; w < waveCount; w++) {
          const freq = (width < 640 ? 0.012 : 0.008) + w * 0.004;
          const amp = (width < 640 ? 22 : 32) + w * 10;
          const speed = (w + 1) * 0.6;

          ctx.beginPath();
          for (let x = 0; x <= width; x += 6) {
            const mouseDist = Math.abs(x - mouse.x);
            const mouseEffect = mouseDist < 100 ? (1 - mouseDist / 100) * 16 : 0;
            const y =
              centerY +
              Math.sin(x * freq + time * speed) * amp +
              Math.cos(x * freq * 0.5 + time) * 8 -
              mouseEffect;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          if (w === 2) {
            ctx.strokeStyle = 'rgba(0, 113, 227, 0.5)';
            ctx.lineWidth = 1.6;
          } else {
            ctx.strokeStyle = `rgba(29, 29, 31, ${0.1 + w * 0.04})`;
            ctx.lineWidth = 0.8;
          }
          ctx.stroke();
        }
      } else if (mode === 'gradient') {
        // --- 3. GRADIENT DESCENT VECTOR FIELD MODE ---
        const gridStep = width < 640 ? 36 : 42;
        for (let x = 20; x < width - 10; x += gridStep) {
          for (let y = 20; y < height - 10; y += gridStep) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.hypot(dx, dy);

            let angle = Math.atan2(dy, dx);
            if (dist > 140) {
              angle = Math.sin(x * 0.01 + time) + Math.cos(y * 0.01 + time);
            }

            const len = Math.min(12, Math.max(5, 18 - dist * 0.05));
            const endX = x + Math.cos(angle) * len;
            const endY = y + Math.sin(angle) * len;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);

            if (dist < 100) {
              ctx.strokeStyle = 'rgba(0, 113, 227, 0.6)';
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = 'rgba(110, 110, 115, 0.2)';
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(endX, endY, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = dist < 100 ? '#0071E3' : '#86868B';
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] xs:h-[320px] sm:h-[380px] md:h-[430px] lg:h-[480px] rounded-2xl sm:rounded-3xl bg-[#FBFBFD] border border-black/[0.07] overflow-hidden shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] transition-all"
      aria-label="Interactive computational neural lattice visualization"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair touch-pan-y"
      />

      {/* Top subtle vignette */}
      <div className="absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-[#FBFBFD] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-[#FBFBFD] to-transparent pointer-events-none" />

      {/* Apple-style Responsive Mode Switcher */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex items-center bg-[#FFFFFF]/92 backdrop-blur-md p-0.5 sm:p-1 rounded-full border border-black/[0.08] shadow-xs max-w-[calc(100%-24px)] overflow-x-auto">
        <button
          onClick={() => setMode('neural')}
          className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-[12px] font-medium rounded-full transition-all cursor-pointer whitespace-nowrap min-h-[30px] flex items-center ${
            mode === 'neural'
              ? 'bg-[#1D1D1F] text-white shadow-xs'
              : 'text-[#6E6E73] hover:text-[#1D1D1F]'
          }`}
        >
          <span className="sm:hidden">Lattice</span>
          <span className="hidden sm:inline">Neural Lattice</span>
        </button>
        <button
          onClick={() => setMode('waveform')}
          className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-[12px] font-medium rounded-full transition-all cursor-pointer whitespace-nowrap min-h-[30px] flex items-center ${
            mode === 'waveform'
              ? 'bg-[#1D1D1F] text-white shadow-xs'
              : 'text-[#6E6E73] hover:text-[#1D1D1F]'
          }`}
        >
          <span className="sm:hidden">Waves</span>
          <span className="hidden sm:inline">Harmonic Wave</span>
        </button>
        <button
          onClick={() => setMode('gradient')}
          className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-[12px] font-medium rounded-full transition-all cursor-pointer whitespace-nowrap min-h-[30px] flex items-center ${
            mode === 'gradient'
              ? 'bg-[#1D1D1F] text-white shadow-xs'
              : 'text-[#6E6E73] hover:text-[#1D1D1F]'
          }`}
        >
          <span className="sm:hidden">Field</span>
          <span className="hidden sm:inline">Vector Field</span>
        </button>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 flex items-center justify-between pointer-events-none text-[10px] sm:text-[11px] font-mono text-[#86868B] select-none">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] animate-pulse" />
          <span className="text-[#1D1D1F] font-medium">MODE: {mode.toUpperCase()}</span>
          <span className="hidden xs:inline text-[#A1A1A6]">| TAP TO PULSE</span>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-[#A1A1A6]">
          <span>60 FPS</span>
          <span>•</span>
          <span>CONTINUOUS</span>
        </div>
      </div>
    </div>
  );
};
