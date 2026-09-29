'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

/**
 * Generate irregular shard polygons that tile the full container.
 * We use a Voronoi-like grid approach: divide into a grid, jitter the centers,
 * then define each shard as a polygon clipped from the image.
 */
function generateShards(cols, rows) {
  const shards = [];
  const cellW = 100 / cols;
  const cellH = 100 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Base cell corners (in %)
      const x0 = c * cellW;
      const y0 = r * cellH;
      const x1 = (c + 1) * cellW;
      const y1 = (r + 1) * cellH;

      // Jitter interior edges for an irregular shattered look
      const jX = cellW * 0.18;
      const jY = cellH * 0.18;

      const tl = { x: x0 + (c > 0 ? rand(-jX, jX) : 0), y: y0 + (r > 0 ? rand(-jY, jY) : 0) };
      const tr = { x: x1 + (c < cols - 1 ? rand(-jX, jX) : 0), y: y0 + (r > 0 ? rand(-jY, jY) : 0) };
      const br = { x: x1 + (c < cols - 1 ? rand(-jX, jX) : 0), y: y1 + (r < rows - 1 ? rand(-jY, jY) : 0) };
      const bl = { x: x0 + (c > 0 ? rand(-jX, jX) : 0), y: y1 + (r < rows - 1 ? rand(-jY, jY) : 0) };

      // Clamp to 0–100
      const clamp = (v) => Math.max(0, Math.min(100, v));
      const points = [tl, tr, br, bl].map(p => ({
        x: clamp(p.x),
        y: clamp(p.y),
      }));

      const clipPath = `polygon(${points.map(p => `${p.x}% ${p.y}%`).join(', ')})`;

      // Center of the shard (for directional physics)
      const cx = (points[0].x + points[1].x + points[2].x + points[3].x) / 4;
      const cy = (points[0].y + points[1].y + points[2].y + points[3].y) / 4;

      shards.push({ clipPath, cx, cy, id: `${r}-${c}` });
    }
  }

  return shards;
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Transition({ images = [], targetUrl, onClose }) {
  const containerRef = useRef(null);
  const loadingRef = useRef(null);
  const shardsRef = useRef([]);
  const cracksRef = useRef(null);

  // Generate shard data once (5×4 grid = 20 shards)
  const shards = useMemo(() => generateShards(5, 4), []);

  useEffect(() => {
    if (!targetUrl) return;

    const shardEls = shardsRef.current.filter(Boolean);
    const cracksEl = cracksRef.current;
    const loadingEl = loadingRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        } catch (e) {
          console.error("Failed to open link:", e);
        }
        if (onClose) {
          onClose();
        }
      }
    });

    // Phase 1: Flash cracks overlay (the impact moment)
    if (cracksEl) {
      tl.fromTo(cracksEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: 'power4.in' },
        0
      );
    }

    // Phase 2: Shatter — each shard flies outward from center with rotation & gravity
    shardEls.forEach((el, i) => {
      const shard = shards[i];
      if (!shard || !el) return;

      // Direction from center (50, 50)
      const dx = shard.cx - 50;
      const dy = shard.cy - 50;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      // Normalized direction with randomized force
      const force = rand(120, 280);
      const moveX = (dx / dist) * force;
      const moveY = (dy / dist) * force + rand(40, 120); // gravity bias downward
      const rot = rand(-90, 90);

      // Stagger: shards closer to center break first
      const delay = 0.15 + (1 - dist / 70) * 0.12;

      tl.to(el, {
        x: `${moveX}%`,
        y: `${moveY}%`,
        rotation: rot,
        opacity: 0,
        scale: rand(0.5, 0.9),
        duration: rand(0.6, 0.9),
        ease: 'power2.in',
      }, delay);
    });

    // Phase 2b: Hide cracks overlay as shards scatter
    if (cracksEl) {
      tl.to(cracksEl, {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.out',
      }, 0.35);
    }

    // Phase 3: Reveal loading animation
    if (loadingEl) {
      tl.fromTo(loadingEl,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.7)' },
        0.25
      );

      // Hold loading visible
      tl.to(loadingEl, {
        opacity: 1,
        duration: 0.5,
      });
    }

    return () => {
      tl.kill();
    };
  }, [targetUrl, onClose, shards]);

  if (!targetUrl) return null;

  const imageSrc = images.length > 0 ? images[0] : null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-50 bg-[#151518] overflow-hidden flex items-center justify-center pointer-events-none"
    >
      {/* Loading animation (behind the shards) */}
      <div ref={loadingRef} className="absolute z-10 flex flex-col items-center opacity-0">
        {/* Pulsing glow ring */}
        <div className="relative w-12 h-12 mb-3">
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
              animationDuration: '1.2s',
            }}
          />
          <div className="absolute inset-0 border-[3px] border-blue-500/30 border-t-blue-400 rounded-full animate-spin" />
          <div
            className="absolute inset-1 border-2 border-transparent border-b-cyan-400 rounded-full animate-spin"
            style={{ animationDuration: '0.6s', animationDirection: 'reverse' }}
          />
        </div>
        <span className="text-xs font-bold tracking-[0.25em] text-blue-300/90 uppercase">
          Loading
        </span>
      </div>

      {/* Crack lines overlay — appears on impact before shards fly */}
      <svg
        ref={cracksRef}
        className="absolute inset-0 z-30 w-full h-full opacity-0 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Radial crack lines from center */}
        <line x1="50" y1="50" x2="0" y2="0" stroke="rgba(200,220,255,0.9)" strokeWidth="0.3" />
        <line x1="50" y1="50" x2="100" y2="0" stroke="rgba(200,220,255,0.9)" strokeWidth="0.3" />
        <line x1="50" y1="50" x2="0" y2="100" stroke="rgba(200,220,255,0.9)" strokeWidth="0.3" />
        <line x1="50" y1="50" x2="100" y2="100" stroke="rgba(200,220,255,0.9)" strokeWidth="0.3" />
        <line x1="50" y1="50" x2="50" y2="0" stroke="rgba(200,220,255,0.8)" strokeWidth="0.25" />
        <line x1="50" y1="50" x2="50" y2="100" stroke="rgba(200,220,255,0.8)" strokeWidth="0.25" />
        <line x1="50" y1="50" x2="0" y2="50" stroke="rgba(200,220,255,0.8)" strokeWidth="0.25" />
        <line x1="50" y1="50" x2="100" y2="50" stroke="rgba(200,220,255,0.8)" strokeWidth="0.25" />
        {/* Secondary cracks */}
        <line x1="50" y1="50" x2="25" y2="0" stroke="rgba(200,220,255,0.6)" strokeWidth="0.2" />
        <line x1="50" y1="50" x2="75" y2="0" stroke="rgba(200,220,255,0.6)" strokeWidth="0.2" />
        <line x1="50" y1="50" x2="0" y2="25" stroke="rgba(200,220,255,0.6)" strokeWidth="0.2" />
        <line x1="50" y1="50" x2="100" y2="25" stroke="rgba(200,220,255,0.6)" strokeWidth="0.2" />
        <line x1="50" y1="50" x2="0" y2="75" stroke="rgba(200,220,255,0.6)" strokeWidth="0.2" />
        <line x1="50" y1="50" x2="100" y2="75" stroke="rgba(200,220,255,0.6)" strokeWidth="0.2" />
        <line x1="50" y1="50" x2="25" y2="100" stroke="rgba(200,220,255,0.6)" strokeWidth="0.2" />
        <line x1="50" y1="50" x2="75" y2="100" stroke="rgba(200,220,255,0.6)" strokeWidth="0.2" />
        {/* Impact point glow */}
        <circle cx="50" cy="50" r="4" fill="rgba(200,220,255,0.5)" />
        <circle cx="50" cy="50" r="8" fill="none" stroke="rgba(200,220,255,0.3)" strokeWidth="0.4" />
      </svg>

      {/* Glass shards — each is a clipped copy of the image */}
      {shards.map((shard, i) => (
        <div
          key={shard.id}
          ref={(el) => { shardsRef.current[i] = el; }}
          className="absolute inset-0 z-20"
          style={{
            clipPath: shard.clipPath,
            willChange: 'transform, opacity',
          }}
        >
          {imageSrc && (
            <Image
              src={imageSrc}
              alt="Screen shard"
              fill
              sizes="400px"
              className="object-cover object-top"
            />
          )}
          {/* Glass edge highlight per shard */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(${rand(0, 360)}deg, rgba(200,220,255,0.12) 0%, transparent 60%)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
