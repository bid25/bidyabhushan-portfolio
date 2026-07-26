"use client";

import React, { useRef, useEffect, CSSProperties } from 'react';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLSpanElement>('span'));
    if (!items.length) return;

    // Centers are cached and only recomputed on resize — reading
    // getBoundingClientRect() per item on every pointermove forces a
    // synchronous layout on every mouse tick, which gets very expensive
    // once the grid has hundreds/thousands of items.
    let centers: { x: number; y: number }[] = [];
    const recomputeCenters = () => {
      centers = items.map(item => {
        const rect = item.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      });
    };
    recomputeCenters();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    let pointer = { x: centers[Math.floor(items.length / 2)].x, y: centers[Math.floor(items.length / 2)].y };
    let rafId: number | null = null;

    const applyRotation = () => {
      rafId = null;
      if (prefersReducedMotion.matches) return; // Skip if user prefers reduced motion
      
      for (let i = 0; i < items.length; i++) {
        const center = centers[i];
        const b = pointer.x - center.x;
        const a = pointer.y - center.y;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > center.y ? 1 : -1);
        items[i].style.transform = `rotate(${r}deg)`;
      }
    };

    // Batch to at most one recompute per animation frame, no matter how
    // many pointermove events land within that frame.
    const scheduleUpdate = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(applyRotation);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      scheduleUpdate();
    };

    const handleResize = () => {
      recomputeCenters();
      scheduleUpdate();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);
    scheduleUpdate();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        transform: `rotate(${baseAngle}deg)`,
        willChange: 'transform'
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
};

export default MagnetLines;
