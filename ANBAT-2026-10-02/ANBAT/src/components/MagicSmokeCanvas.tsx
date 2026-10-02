/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface MagicSmokeCanvasProps {
  isSummoning: boolean;
  durationSeconds?: number;
  isFullScreen?: boolean;
  onSummonPeak?: () => void;
  onSummonComplete?: () => void;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: string;
  type: 'smoke' | 'ember' | 'spark';
  angle: number;
  angularVelocity: number;
  distanceFromCenter: number;
}

export const MagicSmokeCanvas: React.FC<MagicSmokeCanvasProps> = ({
  isSummoning,
  durationSeconds = 2.6,
  isFullScreen = false,
  onSummonPeak,
  onSummonComplete,
  className = 'w-full h-full'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const stateRef = useRef({
    isSummoning: false,
    duration: durationSeconds,
    startTime: 0,
    peakTriggered: false,
    completeTriggered: false
  });

  useEffect(() => {
    stateRef.current.isSummoning = isSummoning;
    stateRef.current.duration = durationSeconds;
    if (isSummoning) {
      stateRef.current.startTime = performance.now();
      stateRef.current.peakTriggered = false;
      stateRef.current.completeTriggered = false;
    }
  }, [isSummoning, durationSeconds]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Thick magical cyan and golden smoke particles as specified
    const smokeColors = [
      'rgba(6, 182, 212, ', // Bright Cyan
      'rgba(14, 165, 233, ', // Sky Cyan
      'rgba(245, 158, 11, ', // Radiant Gold
      'rgba(217, 119, 6, ', // Warm Amber Gold
      'rgba(253, 230, 138, ', // Luminous Pale Gold
      'rgba(20, 184, 166, ' // Teal / Cyan Oasis
    ];

    const emberColors = [
      '#06B6D4', // Cyan
      '#22D3EE', // Light Cyan
      '#F59E0B', // Gold
      '#FBBF24', // Amber
      '#FDE68A', // Pale Gold
      '#FFFFFF'  // White Diamond
    ];

    const originX = () => width / 2;
    const originY = () => (isFullScreen ? height * 0.54 : height * 0.72);

    const spawnParticle = (forceSummonMode = false) => {
      const isHighPower = stateRef.current.isSummoning || forceSummonMode;
      const typeRand = Math.random();
      const type: 'smoke' | 'ember' | 'spark' =
        typeRand > 0.35 ? 'smoke' : typeRand > 0.12 ? 'ember' : 'spark';

      const ox = originX() + (Math.random() - 0.5) * (isHighPower ? 50 : 15);
      const oy = originY() + (Math.random() - 0.5) * 20;

      const baseLife = isHighPower ? 65 + Math.random() * 50 : 35 + Math.random() * 25;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (isHighPower ? 35 : 8);

      const colorPrefix = smokeColors[Math.floor(Math.random() * smokeColors.length)];
      const emberColor = emberColors[Math.floor(Math.random() * emberColors.length)];

      particlesRef.current.push({
        x: ox,
        y: oy,
        vx: (Math.random() - 0.5) * (isHighPower ? 4.2 : 0.8),
        vy: isHighPower ? -(4.0 + Math.random() * 6.0) : -(0.8 + Math.random() * 1.2),
        radius: isHighPower
          ? type === 'smoke'
            ? 22 + Math.random() * 38
            : 3 + Math.random() * 4
          : type === 'smoke'
          ? 8 + Math.random() * 14
          : 2,
        maxRadius: isHighPower ? (type === 'smoke' ? 95 + Math.random() * 85 : 6) : 30,
        alpha: 0.05,
        maxAlpha: isHighPower ? (type === 'smoke' ? 0.52 + Math.random() * 0.3 : 0.98) : 0.2,
        life: 0,
        maxLife: baseLife,
        color: type === 'smoke' ? colorPrefix : emberColor,
        type,
        angle,
        angularVelocity: (Math.random() - 0.5) * (isHighPower ? 0.14 : 0.03),
        distanceFromCenter: dist
      });
    };

    let lastTime = performance.now();

    const render = (now: number) => {
      lastTime = now;
      ctx.clearRect(0, 0, width, height);

      // Manage summoning lifecycle
      if (stateRef.current.isSummoning) {
        const elapsed = (now - stateRef.current.startTime) / 1000;
        const totalDuration = stateRef.current.duration;

        // Peak trigger at ~50% of duration (1.2s - 1.4s)
        if (elapsed >= totalDuration * 0.5 && !stateRef.current.peakTriggered) {
          stateRef.current.peakTriggered = true;
          onSummonPeak?.();
        }

        // Complete trigger at 100% of duration (2.5s)
        if (elapsed >= totalDuration && !stateRef.current.completeTriggered) {
          stateRef.current.completeTriggered = true;
          onSummonComplete?.();
        }

        // Spawn dense thick cyan and golden clouds
        const spawnCount = elapsed < totalDuration * 0.75 ? 14 : 6;
        for (let i = 0; i < spawnCount; i++) {
          spawnParticle(true);
        }
      } else {
        // Ambient soft incense curl
        if (Math.random() < 0.22) {
          spawnParticle(false);
        }
      }

      // Update and draw particles
      ctx.save();

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life++;

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;

        // Dynamic vortex physics (swirl around vertical axis like a genie emerging from a lamp)
        p.angle += p.angularVelocity;
        const vortexExpansion = 1 + progress * 3.4;
        const swirlX = Math.cos(p.angle) * p.distanceFromCenter * vortexExpansion;

        p.x += p.vx + swirlX * 0.08;
        p.y += p.vy;

        p.vy *= 0.985;
        p.vx *= 0.985;

        const curRadius = p.radius + (p.maxRadius - p.radius) * progress;

        let curAlpha = p.maxAlpha;
        if (progress < 0.2) {
          curAlpha = (progress / 0.2) * p.maxAlpha;
        } else {
          curAlpha = (1 - (progress - 0.2) / 0.8) * p.maxAlpha;
        }

        if (p.type === 'smoke') {
          ctx.globalCompositeOperation = 'lighter';
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            Math.max(1, curRadius)
          );
          grad.addColorStop(0, `${p.color}${curAlpha})`);
          grad.addColorStop(0.45, `${p.color}${curAlpha * 0.55})`);
          grad.addColorStop(1, `${p.color}0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, curRadius), 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Ember or spark
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = p.color;
          ctx.globalAlpha = curAlpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          // Sparkle star cross
          if (p.type === 'spark') {
            ctx.strokeStyle = '#FDE68A';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x - 4, p.y);
            ctx.lineTo(p.x + 4, p.y);
            ctx.moveTo(p.x, p.y - 4);
            ctx.lineTo(p.x, p.y + 4);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [onSummonPeak, onSummonComplete, isFullScreen]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-20 ${className}`}
    />
  );
};
