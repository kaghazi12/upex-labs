import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export const AuroraCanvas = () => {
  const canvasRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    let animationFrameId;

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        W = canvas.width = w;
        H = canvas.height = h;
      }
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Orbs parameters
    const orbs = [
      { ax: 0.18, ay: 0.25, r: 0.65, periodX: 38000, periodY: 29000, ampX: 0.12, ampY: 0.10, color: [128, 44, 110], alpha: 0.15 },
      { ax: 0.72, ay: 0.20, r: 0.58, periodX: 44000, periodY: 35000, ampX: 0.10, ampY: 0.12, color: [160, 110, 180], alpha: 0.14 },
      { ax: 0.50, ay: 0.68, r: 0.62, periodX: 32000, periodY: 41000, ampX: 0.14, ampY: 0.09, color: [140, 140, 180], alpha: 0.14 },
      { ax: 0.82, ay: 0.72, r: 0.50, periodX: 50000, periodY: 28000, ampX: 0.08, ampY: 0.11, color: [180, 100, 140], alpha: 0.12 },
    ];

    let lastTime = 0;
    let elapsed = 0;

    function draw(timestamp) {
      if (!timestamp) timestamp = performance.now();
      if (!lastTime) lastTime = timestamp;
      let delta = timestamp - lastTime;
      if (delta > 100) delta = 16.67; 
      lastTime = timestamp;
      elapsed += delta;

      if (!isDarkMode) {
        // Light background base
        ctx.fillStyle = '#eae9ea';
        ctx.fillRect(0, 0, W, H);

        ctx.globalCompositeOperation = 'source-over';

        orbs.forEach(orb => {
          const px = (orb.ax + Math.sin((elapsed / orb.periodX) * Math.PI * 2) * orb.ampX) * W;
          const py = (orb.ay + Math.cos((elapsed / orb.periodY) * Math.PI * 2) * orb.ampY) * H;
          const radius = orb.r * Math.max(W, H);

          const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
          const [r, g, b] = orb.color;
          grad.addColorStop(0, `rgba(${r},${g},${b},${orb.alpha})`);
          grad.addColorStop(0.5, `rgba(${r},${g},${b},${orb.alpha * 0.4})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Light veil
        ctx.fillStyle = 'rgba(234, 233, 234, 0.45)';
        ctx.fillRect(0, 0, W, H);
      } else {
        // For dark mode, we just clear the canvas since CSS handles the background gradient
        ctx.clearRect(0, 0, W, H);
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      id="aurora-canvas" 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};
