import React, { useEffect, useState } from 'react';

const LAYERS = [
  { text: '[ NETWORK GATEWAY ]', delay: 0 },
  { text: '[ TRAFFIC INSPECTION ]', delay: 320 },
  { text: '[ THREAT ANALYSIS ]', delay: 640 },
  { text: '[ ACCESS VALIDATION ]', delay: 960 },
  { text: '[ INFRASTRUCTURE VERIFIED ]', delay: 1280 },
];

const SCAN_MS = 900;      // scan line duration
const LAYERS_MS = 1900;   // time until ACCESS GRANTED (after scan)
const FADE_MS  = 800;     // delay before fade starts (after granted)
const FADE_DUR = 1000;    // fade-out duration
const TOTAL_MS = SCAN_MS + LAYERS_MS + FADE_MS + FADE_DUR + 100;

const FirewallAnimation: React.FC = () => {
  const [phase, setPhase] = useState<'scanning' | 'layers' | 'granted'>('scanning');
  const [visibleLayers, setVisibleLayers] = useState<number[]>([]);
  const [scanY, setScanY] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [mounted, setMounted] = useState(true);

  // Single effect — runs once on mount, all timers relative to t=0.
  // No phase-change cleanup races: every timer is cancelled only on unmount.
  useEffect(() => {
    let raf: number;
    let start: number | null = null;

    // Scan-line rAF
    const animateScan = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / SCAN_MS, 1);
      setScanY(progress * 100);
      if (progress < 1) {
        raf = requestAnimationFrame(animateScan);
      } else {
        setPhase('layers');
      }
    };
    raf = requestAnimationFrame(animateScan);

    // Layer reveal timers
    const layerTimers = LAYERS.map((layer, i) =>
      setTimeout(() => setVisibleLayers(prev => [...prev, i]), SCAN_MS + layer.delay)
    );

    // Transition timers
    const t1 = setTimeout(() => setPhase('granted'),      SCAN_MS + LAYERS_MS);
    const t2 = setTimeout(() => setOverlayOpacity(0),     SCAN_MS + LAYERS_MS + FADE_MS);
    const t3 = setTimeout(() => setMounted(false),         TOTAL_MS);

    return () => {
      cancelAnimationFrame(raf);
      layerTimers.forEach(clearTimeout);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []); // empty deps — intentional, runs once

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#070b14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: overlayOpacity,
        transition: `opacity ${FADE_DUR}ms ease`,
        pointerEvents: overlayOpacity < 1 ? 'none' : 'all',
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(71,139,163,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(71,139,163,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Scan line */}
      {phase === 'scanning' && (
        <div style={{
          position: 'absolute',
          top: `${scanY}%`,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(71,193,226,0.6), rgba(71,193,226,0.9), rgba(71,193,226,0.6), transparent)',
          boxShadow: '0 0 24px rgba(71,193,226,0.5), 0 0 48px rgba(71,193,226,0.2)',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Horizontal scanlines texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
        pointerEvents: 'none',
        opacity: 0.5,
      }} />

      {/* Main content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        fontFamily: '"IBM Plex Mono", "Courier New", monospace',
        textAlign: 'center',
        padding: '0 24px',
      }}>
        {/* Logo mark */}
        <div style={{
          width: '48px',
          height: '48px',
          border: '1px solid rgba(71,193,226,0.3)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          position: 'relative',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" stroke="rgba(71,193,226,0.7)" strokeWidth="1.5" fill="none"/>
            <circle cx="12" cy="12" r="3" stroke="rgba(71,193,226,0.5)" strokeWidth="1" fill="none"/>
          </svg>
          <div style={{
            position: 'absolute',
            inset: -4,
            border: '1px solid rgba(71,193,226,0.1)',
            borderRadius: '6px',
            animation: 'pulse 2s infinite',
          }}/>
        </div>

        {/* Layer texts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '180px', justifyContent: 'center' }}>
          {LAYERS.map((layer, i) => (
            <div
              key={i}
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: visibleLayers.includes(i) ? 'rgba(71,193,226,0.85)' : 'transparent',
                transition: 'color 0.4s ease, opacity 0.4s ease',
                opacity: visibleLayers.includes(i) ? 1 : 0,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: visibleLayers.includes(i) ? 'rgba(71,193,226,0.8)' : 'transparent',
                boxShadow: visibleLayers.includes(i) ? '0 0 8px rgba(71,193,226,0.6)' : 'none',
                flexShrink: 0,
              }}/>
              {layer.text}
            </div>
          ))}
        </div>

        {/* Access granted */}
        <div style={{
          marginTop: '32px',
          fontSize: '13px',
          letterSpacing: '0.3em',
          color: phase === 'granted' ? 'rgba(255,255,255,0.9)' : 'transparent',
          transition: 'color 0.5s ease',
          fontWeight: 500,
          textTransform: 'uppercase',
        }}>
          ACCESS GRANTED
        </div>

        {/* Divider line */}
        <div style={{
          width: phase === 'granted' ? '200px' : '0px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(71,193,226,0.5), transparent)',
          transition: 'width 0.6s ease',
          marginTop: '12px',
        }}/>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default FirewallAnimation;
