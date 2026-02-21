import React, { useState } from 'react';
import { EditorState, ASPECT_PRESETS } from '../presets';

interface CanvasPreviewProps {
  state: EditorState;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

/* ── Frame components ───────────────────────────── */

const BrowserFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 4, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 14px', background: '#1e1e2e',
      borderTopLeftRadius: br + 4, borderTopRightRadius: br + 4,
    }}>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
      </div>
      <div style={{ flex: 1, height: 24, borderRadius: 6, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', marginRight: 6, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.02em' }}>https://</span>
      </div>
    </div>
    {children}
  </div>
);

const MacFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 4, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 16px', background: '#ececec',
      borderTopLeftRadius: br + 4, borderTopRightRadius: br + 4,
    }}>
      <div style={{ display: 'flex', gap: 7 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }} />
      </div>
    </div>
    {children}
  </div>
);

const PhoneFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => {
  const r = Math.max(br, 28) + 8;
  return (
    <div style={{
      background: 'linear-gradient(160deg, #2c2c2e 0%, #1a1a1c 100%)',
      borderRadius: r,
      padding: '10px 8px',
      position: 'relative',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
        <div style={{ width: 80, height: 22, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#111' }} />
        </div>
      </div>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 20) }}>
        {children}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
        <div style={{ width: 80, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.25)' }} />
      </div>
    </div>
  );
};

const IPadFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{
    background: 'linear-gradient(160deg, #2d2d2f 0%, #1c1c1e 100%)',
    borderRadius: Math.max(br, 14) + 12,
    padding: '16px 10px',
    position: 'relative',
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)',
  }}>
    <div style={{ position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: '#333' }} />
    <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 8) }}>
      {children}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
      <div style={{ width: 60, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }} />
    </div>
  </div>
);

const IMacFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{
      background: 'linear-gradient(170deg, #2d2d2f 0%, #1c1c1e 100%)',
      borderRadius: Math.max(br, 10) + 8,
      padding: '10px 10px 28px',
      position: 'relative',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)',
    }}>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 6) }}>
        {children}
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3a3a3c' }} />
      </div>
    </div>
    <div style={{ width: 56, height: 34, background: 'linear-gradient(to bottom, #6e6e73, #aeaeb2)', clipPath: 'polygon(25% 0%, 75% 0%, 90% 100%, 10% 100%)' }} />
    <div style={{ width: 110, height: 7, borderRadius: 4, background: 'linear-gradient(to bottom, #b0b0b5, #8e8e93)' }} />
  </div>
);

const TerminalFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 4, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#0d1117' }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 16px', background: '#161b22',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
      </div>
      <span style={{ flex: 1, textAlign: 'center', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>
        bash — 80×24
      </span>
    </div>
    {children}
  </div>
);

const ArcFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 6, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'rgba(240,237,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 14px', background: 'rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
      </div>
      <div style={{ flex: 1, height: 24, borderRadius: 8, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
        <span style={{ fontSize: 10, fontFamily: 'system-ui', color: 'rgba(255,255,255,0.28)' }}>arc://newtab</span>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff'].map((c, i) => (
          <div key={i} style={{ width: 13, height: 13, borderRadius: '50%', background: c, opacity: 0.75 }} />
        ))}
      </div>
    </div>
    {children}
  </div>
);

/* ── NEW: Samsung Galaxy frame ─────────────────── */
const SamsungFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => {
  const r = Math.max(br, 30) + 6;
  return (
    <div style={{
      background: 'linear-gradient(160deg, #1c1c1e 0%, #111 100%)',
      borderRadius: r,
      padding: '12px 7px',
      position: 'relative',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.5)',
    }}>
      {/* Punch-hole camera top-center */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)' }} />
      </div>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 22) }}>
        {children}
      </div>
      {/* Nav bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, paddingTop: 10 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ width: 20, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ width: 5, height: 5, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
      </div>
    </div>
  );
};

/* ── NEW: MacBook laptop frame ─────────────────── */
const MacBookFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {/* Screen lid */}
    <div style={{
      background: 'linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 100%)',
      borderRadius: `${Math.max(br, 6) + 8}px ${Math.max(br, 6) + 8}px 0 0`,
      padding: '8px 8px 0',
      width: '100%',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)',
    }}>
      {/* Notch */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <div style={{ width: 14, height: 6, borderRadius: '0 0 4px 4px', background: '#1a1a1a' }} />
      </div>
      {/* Screen */}
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 4), background: '#000' }}>
        {children}
      </div>
    </div>
    {/* Keyboard base */}
    <div style={{
      width: '110%', height: 22,
      background: 'linear-gradient(180deg, #c8c8ca 0%, #b0b0b2 100%)',
      borderRadius: '2px 2px 8px 8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    }}>
      {/* Trackpad hint */}
      <div style={{ width: 50, height: 10, borderRadius: 3, background: 'rgba(0,0,0,0.1)', border: '0.5px solid rgba(0,0,0,0.15)' }} />
    </div>
  </div>
);

/* ── NEW: Polaroid frame ───────────────────────── */
const PolaroidFrame: React.FC<{ children: React.ReactNode; br: number; caption?: string }> = ({ children, br, caption }) => (
  <div style={{
    background: '#fff',
    padding: '14px 14px 44px',
    borderRadius: Math.max(br, 2) + 2,
    boxShadow: '0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.15)',
  }}>
    <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 2) }}>
      {children}
    </div>
    {caption && (
      <div style={{
        textAlign: 'center', marginTop: 8,
        fontFamily: 'cursive', fontSize: 13, color: '#555',
        paddingBottom: 4,
      }}>
        {caption}
      </div>
    )}
  </div>
);

/* ── NEW: Newspaper frame ──────────────────────── */
const NewspaperFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 2, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '3px solid #111' }}>
    <div style={{
      background: '#f5f0e8', borderBottom: '2px solid #111',
      padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{ width: 6, height: 6, background: '#111', borderRadius: '50%' }} />
      <span style={{ fontSize: 9, fontFamily: 'Georgia, serif', fontWeight: 900, color: '#111', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Daily Press
      </span>
      <div style={{ flex: 1, height: 1, background: '#333', opacity: 0.3 }} />
      <span style={{ fontSize: 7, fontFamily: 'Georgia, serif', color: '#666' }}>Est. 2024</span>
    </div>
    {children}
    <div style={{
      background: '#f5f0e8', borderTop: '1px solid #ccc',
      padding: '4px 10px',
    }}>
      <span style={{ fontSize: 7, fontFamily: 'Georgia, serif', color: '#888', letterSpacing: '0.05em' }}>
        All rights reserved · © 2025
      </span>
    </div>
  </div>
);

const Watermark: React.FC = () => (
  <div style={{
    position: 'absolute', bottom: 12, right: 16, zIndex: 30,
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '5px 10px', borderRadius: 999,
    background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)',
  }}>
    <svg width="12" height="12" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="url(#wg2)" />
      <defs>
        <linearGradient id="wg2" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
    <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>SnapFrame</span>
  </div>
);

/* ── Pattern helpers ─────────────────────────────── */
function getPatternSvg(pattern: string, opacity: number, scale: number = 20): string {
  const o = opacity;
  const s = scale;
  const s2 = s * 2;
  switch (pattern) {
    case 'dots':      return `url("data:image/svg+xml,%3Csvg width='${s}' height='${s}' viewBox='0 0 ${s} ${s}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${s/2}' cy='${s/2}' r='1.5' fill='rgba(255,255,255,${o})'/%3E%3C/svg%3E")`;
    case 'grid':      return `url("data:image/svg+xml,%3Csvg width='${s2}' height='${s2}' viewBox='0 0 ${s2} ${s2}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h${s2}v${s2}H0z' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'lines':     return `url("data:image/svg+xml,%3Csvg width='${s2}' height='${s2}' viewBox='0 0 ${s2} ${s2}' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='${s2}' x2='${s2}' y2='${s2}' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'cross':     return `url("data:image/svg+xml,%3Csvg width='${s}' height='${s}' viewBox='0 0 ${s} ${s}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M${s/2} 0v${s}M0 ${s/2}h${s}' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'diagonal':  return `url("data:image/svg+xml,%3Csvg width='${s}' height='${s}' viewBox='0 0 ${s} ${s}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 ${s}L${s} 0' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'circles':   return `url("data:image/svg+xml,%3Csvg width='${s2}' height='${s2}' viewBox='0 0 ${s2} ${s2}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${s}' cy='${s}' r='${s*0.4}' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'chevron':   return `url("data:image/svg+xml,%3Csvg width='${s2}' height='${s2}' viewBox='0 0 ${s2} ${s2}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 ${s/2}l${s} ${s/2}L${s2} ${s/2}M0 ${s+s/2}l${s} ${s/2}L${s2} ${s+s/2}' stroke='rgba(255,255,255,${o})' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;
    case 'triangles': return `url("data:image/svg+xml,%3Csvg width='${s2}' height='${s2}' viewBox='0 0 ${s2} ${s2}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M${s} 3L${s+s*0.75} ${s+5}H${s-s*0.75}z' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'waves':     return `url("data:image/svg+xml,%3Csvg width='${s*3}' height='${s}' viewBox='0 0 ${s*3} ${s}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 ${s/2} Q${s*0.75} 0 ${s*1.5} ${s/2} Q${s*2.25} ${s} ${s*3} ${s/2}' stroke='rgba(255,255,255,${o})' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;
    case 'hexagons':  return `url("data:image/svg+xml,%3Csvg width='${s*1.732}' height='${s2}' viewBox='0 0 ${s*1.732} ${s2}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='${s*0.866} 0 ${s*1.732} ${s*0.5} ${s*1.732} ${s*1.5} ${s*0.866} ${s2} 0 ${s*1.5} 0 ${s*0.5}' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'bricks':    return `url("data:image/svg+xml,%3Csvg width='${s2}' height='${s}' viewBox='0 0 ${s2} ${s}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${s2}' height='${s}' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3Crect x='${s}' y='${s/2}' width='${s2}' height='${s}' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'plaid':     return `url("data:image/svg+xml,%3Csvg width='${s2}' height='${s2}' viewBox='0 0 ${s2} ${s2}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h${s2}v${s2}H0z' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3Cpath d='M${s} 0v${s2}M0 ${s}h${s2}' stroke='rgba(255,255,255,${o*0.5})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    default:          return 'none';
  }
}

/* ── Logo position helper ────────────────────────── */
function getLogoPositionStyle(pos: string, padding: number): React.CSSProperties {
  switch (pos) {
    case 'tl': return { top: padding, left: padding };
    case 'tc': return { top: padding, left: '50%', transform: 'translateX(-50%)' };
    case 'tr': return { top: padding, right: padding };
    case 'ml': return { top: '50%', left: padding, transform: 'translateY(-50%)' };
    case 'mc': return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    case 'mr': return { top: '50%', right: padding, transform: 'translateY(-50%)' };
    case 'bl': return { bottom: padding, left: padding };
    case 'bc': return { bottom: padding, left: '50%', transform: 'translateX(-50%)' };
    case 'br': default: return { bottom: padding, right: padding };
  }
}

/* ── Light leak position helper ──────────────────── */
function getLightLeakGradient(angle: number, intensity: number): string {
  const op = (intensity / 100 * 0.7).toFixed(2);
  const op2 = (intensity / 100 * 0.35).toFixed(2);
  // Map angle to corner positions
  const positions: Record<string, string> = {
    '315': `radial-gradient(ellipse 70% 70% at 0% 0%, rgba(255,200,80,${op}) 0%, rgba(255,120,0,${op2}) 30%, transparent 65%)`,
    '45':  `radial-gradient(ellipse 70% 70% at 100% 0%, rgba(255,200,80,${op}) 0%, rgba(255,120,0,${op2}) 30%, transparent 65%)`,
    '135': `radial-gradient(ellipse 70% 70% at 100% 100%, rgba(255,200,80,${op}) 0%, rgba(255,120,0,${op2}) 30%, transparent 65%)`,
    '225': `radial-gradient(ellipse 70% 70% at 0% 100%, rgba(255,200,80,${op}) 0%, rgba(255,120,0,${op2}) 30%, transparent 65%)`,
    '0':   `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,200,80,${op}) 0%, rgba(255,120,0,${op2}) 30%, transparent 65%)`,
    '90':  `radial-gradient(ellipse 50% 80% at 100% 50%, rgba(255,200,80,${op}) 0%, rgba(255,120,0,${op2}) 30%, transparent 65%)`,
    '180': `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,200,80,${op}) 0%, rgba(255,120,0,${op2}) 30%, transparent 65%)`,
    '270': `radial-gradient(ellipse 50% 80% at 0% 50%, rgba(255,200,80,${op}) 0%, rgba(255,120,0,${op2}) 30%, transparent 65%)`,
  };
  const key = String(angle);
  return positions[key] ?? positions['315'];
}

/* ── Main component ──────────────────────────────── */
const CanvasPreview: React.FC<CanvasPreviewProps> = ({ state, canvasRef }) => {
  const [imgNatural, setImgNatural] = useState<{ w: number; h: number } | null>(null);

  const {
    image, background, padding, borderRadius,
    shadow, shadowColor, shadowX, shadowY, shadowBlur,
    frame, watermark, tiltX, tiltY, scale, rotation, canvasRotation,
    skewX, skewY, flipY, perspectiveDistance,
    brightness, contrast, saturation, blur: imgBlur,
    sepia, grayscale, hueRotate, invert,
    temperature, fade, sharpness, highlights, shadows, noiseOnImage,
    duotone, duotoneHighlight, duotoneShadow,
    imageZoom, imagePanX, imagePanY,
    imageBorderRadius, imageFitMode,
    borderWidth, borderColor, borderStyle,
    bgPattern, bgPatternOpacity, bgNoise, bgOpacity, bgRadial, patternScale,
    titleText, titleSize, titleColor, titleFont, titlePosition, titleWeight,
    titleShadow, titleItalic, titleAllCaps, titleOpacity,
    titleGradient, titleGradientColor2,
    textAlign, letterSpacing, lineHeight,
    subtitleText, subtitleSize, subtitleColor,
    bodyText, bodySize, bodyColor,
    textBg, textBgColor, textBgOpacity, textStroke, textStrokeColor,
    aspectRatio, reflection, reflectionOpacity, reflectionHeight, bgImage,
    vignette, vignetteColor, flipX,
    glowIntensity, glowColor,
    colorOverlay, colorOverlayOpacity, colorOverlayBlendMode,
    scanlines, scanlinesSpacing, scanlinesColor,
    filmGrain, bgBlur, innerShadow,
    innerGlowIntensity, innerGlowColor,
    lightLeak, lightLeakAngle,
    chromaAberration, glitch, halftone,
    fog, stars, rain, lensFlare, lensFlareX, lensFlareY,
    spotlight, cornerDots, showRuleOfThirds,
    customBgColor1, customBgColor2, bgAngle,
    logoImage, logoPosition, logoSize, logoOpacity, logoPadding,
  } = state;

  if (!image) return null;

  const aspectPreset = ASPECT_PRESETS.find(a => a.id === aspectRatio);
  const canvasStyle: React.CSSProperties = {
    background: bgRadial
      ? background.replace(/^linear-gradient\([\d]+deg,/, `radial-gradient(ellipse at center,`).replace('linear-gradient(', 'radial-gradient(ellipse at center,')
      : background,
    padding,
    position: 'relative',
    overflow: 'hidden',
  };

  if (canvasRotation !== 0) {
    canvasStyle.transform = `rotate(${canvasRotation}deg)`;
  }

  if (aspectPreset && aspectPreset.id !== 'auto') {
    canvasStyle.width = '100%';
    canvasStyle.maxWidth = Math.min(aspectPreset.width, 900);
    canvasStyle.aspectRatio = `${aspectPreset.width} / ${aspectPreset.height}`;
    canvasStyle.display = 'flex';
    canvasStyle.flexDirection = 'column';
    canvasStyle.alignItems = 'center';
    canvasStyle.justifyContent = 'center';
  }

  /* ── Shadow / glow compositing ── */
  const buildShadow = (includeInner = false) => {
    const parts: string[] = [];
    const sx = shadowX ?? 0;
    const sy = shadowY ?? 0;
    const sb = shadowBlur > 0 ? shadowBlur : (shadow > 0 ? shadow * 2 : 0);
    if (shadow > 0) {
      parts.push(`${sx}px ${shadow + sy}px ${sb}px ${shadowColor}`);
      parts.push(`${sx * 0.5}px ${(shadow + sy) / 2}px ${shadow}px ${shadowColor.replace(/[\d.]+\)$/, m => `${parseFloat(m) * 0.5})`)}`);
    }
    if (glowIntensity > 0) {
      parts.push(`0 0 ${Math.round(glowIntensity * 0.5)}px ${glowColor}`);
      parts.push(`0 0 ${glowIntensity}px ${glowColor}`);
    }
    if (includeInner && innerShadow > 0) {
      const op = Math.min(innerShadow / 100 * 0.85, 0.75).toFixed(2);
      parts.push(`inset 0 ${Math.round(innerShadow * 0.3)}px ${innerShadow}px rgba(0,0,0,${op})`);
    }
    if ((innerGlowIntensity ?? 0) > 0) {
      parts.push(`inset 0 0 ${innerGlowIntensity}px ${innerGlowColor}`);
    }
    return parts.length > 0 ? parts.join(', ') : 'none';
  };

  /* ── CSS filter chain for image ── */
  const imageFilterParts: string[] = [];
  if (brightness !== 100) imageFilterParts.push(`brightness(${brightness}%)`);
  if (contrast !== 100)   imageFilterParts.push(`contrast(${contrast}%)`);
  if (saturation !== 100) imageFilterParts.push(`saturate(${saturation}%)`);
  if (imgBlur > 0)        imageFilterParts.push(`blur(${imgBlur}px)`);
  if ((sepia ?? 0) > 0)   imageFilterParts.push(`sepia(${sepia}%)`);
  // Temperature: warm = sepia + saturate + hue-rotate, cool = opposite
  if ((temperature ?? 0) > 0) {
    const t = temperature;
    imageFilterParts.push(`sepia(${t * 0.4}%) saturate(${100 + t * 0.6}%) hue-rotate(-${t * 0.2}deg)`);
  } else if ((temperature ?? 0) < 0) {
    const t = Math.abs(temperature);
    imageFilterParts.push(`hue-rotate(${t * 0.3}deg) saturate(${100 - t * 0.3}%)`);
  }
  // Fade/matte: lift blacks by reducing contrast + slight brightness
  if ((fade ?? 0) > 0) {
    imageFilterParts.push(`contrast(${100 - fade * 0.5}%) brightness(${100 + fade * 0.15}%)`);
  }
  // Sharpness: pseudo-sharpening via contrast
  if ((sharpness ?? 0) > 0) {
    imageFilterParts.push(`contrast(${100 + sharpness * 0.5}%)`);
  }
  // Highlights
  if ((highlights ?? 0) > 0) {
    imageFilterParts.push(`brightness(${100 + highlights * 0.25}%)`);
  } else if ((highlights ?? 0) < 0) {
    imageFilterParts.push(`brightness(${100 + highlights * 0.15}%)`);
  }
  // Shadows lift (simulated via brightness)
  if ((shadows ?? 0) > 0) {
    imageFilterParts.push(`brightness(${100 + shadows * 0.12}%)`);
  }
  if ((grayscale ?? 0) > 0 || duotone) imageFilterParts.push(`grayscale(${duotone ? 100 : grayscale}%)`);
  if ((hueRotate ?? 0) !== 0) imageFilterParts.push(`hue-rotate(${hueRotate}deg)`);
  if (invert) imageFilterParts.push('invert(100%)');
  // Chromatic aberration via drop-shadow filter
  if ((chromaAberration ?? 0) > 0) {
    const n = chromaAberration;
    imageFilterParts.push(`drop-shadow(${n}px 0 0 rgba(255,0,0,0.45)) drop-shadow(-${n}px 0 0 rgba(0,200,255,0.45))`);
  }
  const imageFilter = imageFilterParts.filter(Boolean).join(' ') || undefined;

  /* ── 3D transforms ── */
  const transformParts: string[] = [];
  if (flipX) transformParts.push('scaleX(-1)');
  if (flipY ?? false) transformParts.push('scaleY(-1)');
  if (tiltX !== 0 || tiltY !== 0) {
    const pd = perspectiveDistance ?? 1000;
    transformParts.push(`perspective(${pd}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
  }
  if ((skewX ?? 0) !== 0 || (skewY ?? 0) !== 0) {
    transformParts.push(`skew(${skewX ?? 0}deg, ${skewY ?? 0}deg)`);
  }
  if (scale !== 1) transformParts.push(`scale(${scale})`);
  if (rotation !== 0) transformParts.push(`rotate(${rotation}deg)`);
  const imageTransform = transformParts.length > 0 ? transformParts.join(' ') : undefined;

  const useGradientBorder = borderStyle === 'gradient' && borderWidth > 0;
  const regularBorder = borderWidth > 0 && !useGradientBorder ? `${borderWidth}px ${borderStyle} ${borderColor}` : undefined;

  const zoom = imageZoom ?? 1;
  const panX = imagePanX ?? 0;
  const panY = imagePanY ?? 0;
  const hasZoomPan = zoom !== 1 || panX !== 0 || panY !== 0;
  const imgBR = imageBorderRadius ?? 0;

  const frameBR = frame === 'phone'    ? Math.max(borderRadius, 28) + 8
    : frame === 'samsung' ? Math.max(borderRadius, 30) + 6
    : frame === 'arc'     ? borderRadius + 6
    : frame !== 'none'    ? borderRadius + 4 : borderRadius;

  /* ── Inner image element ── */
  const renderImageEl = (rawBorderRadius = 0) => {
    const fitStyle: React.CSSProperties = {
      borderRadius: rawBorderRadius || imgBR,
      filter: imageFilter,
    };

    if (!hasZoomPan) {
      return (
        <img src={image} alt="Screenshot" className="block w-full h-auto"
          style={fitStyle}
          onLoad={e => { const t = e.currentTarget; setImgNatural({ w: t.naturalWidth, h: t.naturalHeight }); }}
          draggable={false}
        />
      );
    }
    const ratio = imgNatural ? imgNatural.w / imgNatural.h : 16 / 9;
    const fitObj = imageFitMode === 'contain' ? 'contain' : imageFitMode === 'fill' ? 'fill' : 'cover';
    return (
      <div style={{ width: '100%', aspectRatio: String(ratio), overflow: 'hidden', borderRadius: rawBorderRadius || imgBR, position: 'relative' }}>
        <img src={image} alt="Screenshot" draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: fitObj,
            filter: imageFilter,
            transform: `translate(${panX}%, ${panY}%) scale(${zoom})`,
            transformOrigin: 'center center',
          }}
          onLoad={e => { const t = e.currentTarget; setImgNatural({ w: t.naturalWidth, h: t.naturalHeight }); }}
        />
      </div>
    );
  };

  /* ── Frame shell ── */
  const renderFrameShell = () => {
    switch (frame) {
      case 'browser':   return <BrowserFrame  br={borderRadius}>{renderImageEl(0)}</BrowserFrame>;
      case 'macos':     return <MacFrame      br={borderRadius}>{renderImageEl(0)}</MacFrame>;
      case 'phone':     return <PhoneFrame    br={borderRadius}>{renderImageEl(0)}</PhoneFrame>;
      case 'ipad':      return <IPadFrame     br={borderRadius}>{renderImageEl(0)}</IPadFrame>;
      case 'imac':      return <IMacFrame     br={borderRadius}>{renderImageEl(0)}</IMacFrame>;
      case 'terminal':  return <TerminalFrame br={borderRadius}>{renderImageEl(0)}</TerminalFrame>;
      case 'arc':       return <ArcFrame      br={borderRadius}>{renderImageEl(0)}</ArcFrame>;
      case 'samsung':   return <SamsungFrame  br={borderRadius}>{renderImageEl(0)}</SamsungFrame>;
      case 'macbook':   return <MacBookFrame  br={borderRadius}>{renderImageEl(0)}</MacBookFrame>;
      case 'polaroid':  return <PolaroidFrame br={borderRadius}>{renderImageEl(0)}</PolaroidFrame>;
      case 'newspaper': return <NewspaperFrame br={borderRadius}>{renderImageEl(0)}</NewspaperFrame>;
      default:          return renderImageEl(borderRadius);
    }
  };

  /* ── Color overlay ── */
  const colorOverlayEl = colorOverlayOpacity > 0 ? (
    <div style={{
      position: 'absolute', inset: 0,
      background: colorOverlay,
      opacity: colorOverlayOpacity / 100,
      borderRadius: frameBR,
      pointerEvents: 'none', zIndex: 10,
      mixBlendMode: (colorOverlayBlendMode ?? 'color') as React.CSSProperties['mixBlendMode'],
    }} />
  ) : null;

  /* ── Duotone overlays ── */
  const duotoneEls = duotone ? (
    <>
      <div style={{ position: 'absolute', inset: 0, background: duotoneShadow, mixBlendMode: 'multiply', borderRadius: frameBR, pointerEvents: 'none', zIndex: 11 }} />
      <div style={{ position: 'absolute', inset: 0, background: duotoneHighlight, mixBlendMode: 'screen', borderRadius: frameBR, pointerEvents: 'none', zIndex: 12 }} />
    </>
  ) : null;

  /* ── Final image render ── */
  const renderFinalImage = () => {
    const shell = renderFrameShell();

    if (useGradientBorder) {
      return (
        <div style={{
          padding: borderWidth,
          background: `linear-gradient(${bgAngle}deg, ${customBgColor1}, ${customBgColor2})`,
          borderRadius: frameBR + borderWidth,
          boxShadow: buildShadow(false),
          display: 'inline-flex', position: 'relative',
        }}>
          <div style={{ borderRadius: frameBR, overflow: 'hidden', position: 'relative', display: 'inline-flex' }}>
            {shell}{colorOverlayEl}{duotoneEls}
          </div>
        </div>
      );
    }

    if (frame !== 'none') {
      return (
        <div style={{ boxShadow: buildShadow(false), borderRadius: frameBR, border: regularBorder, display: 'inline-flex', position: 'relative' }}>
          {shell}{colorOverlayEl}{duotoneEls}
        </div>
      );
    }

    if (hasZoomPan) {
      return (
        <div style={{ position: 'relative', display: 'inline-flex', borderRadius, overflow: 'hidden', boxShadow: buildShadow(true), border: regularBorder }}>
          {shell}{colorOverlayEl}{duotoneEls}
        </div>
      );
    }

    return (
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <img src={image} alt="Screenshot" className="block w-full h-auto"
          style={{ borderRadius, boxShadow: buildShadow(true), filter: imageFilter, border: regularBorder }}
          onLoad={e => { const t = e.currentTarget; setImgNatural({ w: t.naturalWidth, h: t.naturalHeight }); }}
          draggable={false}
        />
        {colorOverlayEl}{duotoneEls}
      </div>
    );
  };

  /* ── Text rendering helpers ── */
  const textAlignVal = (textAlign ?? 'center') as React.CSSProperties['textAlign'];
  const lsVal = (letterSpacing ?? 0) > 0 ? `${letterSpacing}px` : undefined;
  const lhVal = lineHeight ?? 1.25;

  const getTextStyle = (size: number, color: string, weight = 400, isTitle = false): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: size,
      fontFamily: titleFont,
      fontWeight: weight,
      lineHeight: lhVal,
      letterSpacing: lsVal,
      textTransform: isTitle && (titleAllCaps ?? false) ? 'uppercase' : undefined,
      fontStyle: isTitle && (titleItalic ?? false) ? 'italic' : undefined,
      opacity: isTitle ? (titleOpacity ?? 100) / 100 : 1,
    };

    if (isTitle && (titleGradient ?? false)) {
      return {
        ...base,
        background: `linear-gradient(135deg, ${color}, ${titleGradientColor2})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        WebkitTextStroke: (textStroke ?? 0) > 0 ? `${textStroke}px ${textStrokeColor}` : undefined,
      };
    }

    return {
      ...base,
      color,
      WebkitTextStroke: isTitle && (textStroke ?? 0) > 0 ? `${textStroke}px ${textStrokeColor}` : undefined,
      textShadow: isTitle && (titleShadow ?? false)
        ? '0 2px 24px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.4)'
        : undefined,
    };
  };

  const renderTextBlock = (position: string) => {
    if ((!titleText && !subtitleText && !bodyText) || titlePosition !== position) return null;
    const hasTextBg = textBg && textBg !== 'none' && (titleText || subtitleText);

    const paddingStyle: React.CSSProperties = {
      paddingTop: position === 'below' ? 16 : 0,
      paddingBottom: position === 'above' ? 16 : 0,
      width: '100%',
      textAlign: textAlignVal,
    };

    const wrapperStyle: React.CSSProperties = hasTextBg ? {
      position: 'relative',
      display: 'inline-block',
      padding: textBg === 'pill' ? '6px 20px' : '8px 14px',
      borderRadius: textBg === 'pill' ? 999 : 8,
      background: `${textBgColor ?? '#000000'}${Math.round((textBgOpacity ?? 50) / 100 * 255).toString(16).padStart(2, '0')}`,
    } : {};

    return (
      <div className="relative z-[2]" style={paddingStyle}>
        <div style={wrapperStyle}>
          {titleText && (
            <div style={getTextStyle(titleSize, titleColor, titleWeight === 'normal' ? 400 : 700, true)}>
              {titleText}
            </div>
          )}
          {subtitleText && (
            <div style={getTextStyle(subtitleSize, subtitleColor.startsWith('rgba') ? subtitleColor : subtitleColor, 400)}>
              {subtitleText}
            </div>
          )}
          {bodyText && (
            <div style={{ fontSize: bodySize, color: bodyColor, fontFamily: titleFont, fontWeight: 400, marginTop: subtitleText ? 6 : titleText ? 4 : 0, lineHeight: lhVal }}>
              {bodyText}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ── Background processing ── */
  const patternBg = bgPattern !== 'none' ? getPatternSvg(bgPattern, bgPatternOpacity, patternScale ?? 20) : undefined;

  return (
    <div className="flex items-center justify-center w-full">
      {/* SVG filter defs for glitch effect */}
      {(glitch ?? 0) > 0 && (
        <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glitch-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.04 0.02" numOctaves="1" seed="8" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={glitch * 0.8} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}

      <div ref={canvasRef} className="relative inline-flex flex-col items-center justify-center" style={canvasStyle}>

        {/* BG opacity overlay */}
        {(bgOpacity ?? 100) < 100 && (
          <div className="absolute inset-0 pointer-events-none z-0" style={{ background, opacity: (bgOpacity ?? 100) / 100 }} />
        )}

        {/* Background image */}
        {bgImage && (
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            style={{
              filter: bgBlur > 0 ? `blur(${bgBlur}px)` : undefined,
              transform: bgBlur > 0 ? 'scale(1.08)' : undefined,
              opacity: (bgOpacity ?? 100) / 100,
            }}
            draggable={false}
          />
        )}

        {/* Pattern overlay */}
        {patternBg && (
          <div className="absolute inset-0 pointer-events-none z-[1]"
            style={{ backgroundImage: patternBg, backgroundRepeat: 'repeat' }} />
        )}

        {/* Noise overlay */}
        {bgNoise > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              opacity: bgNoise / 100,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }} />
        )}

        {/* Title above */}
        {renderTextBlock('above')}

        {/* Main image with transforms */}
        <div className="relative z-[2]" style={{
          transform: imageTransform,
          transition: 'transform 0.2s ease',
          maxWidth: (frame === 'phone' || frame === 'samsung') ? 320 : '100%',
          filter: (glitch ?? 0) > 0 ? `url(#glitch-filter)` : undefined,
        }}>
          {renderFinalImage()}

          {/* Reflection */}
          {reflection && (
            <div className="pointer-events-none overflow-hidden" style={{
              transform: 'scaleY(-1)',
              maskImage: `linear-gradient(to bottom, rgba(0,0,0,${(reflectionOpacity ?? 35) / 100 * 0.8}), transparent ${reflectionHeight ?? 60}%)`,
              WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,${(reflectionOpacity ?? 35) / 100 * 0.8}), transparent ${reflectionHeight ?? 60}%)`,
              maxHeight: (reflectionHeight ?? 60) * 2, marginTop: 2,
            }}>
              {renderFrameShell()}
            </div>
          )}
        </div>

        {/* Title center overlay */}
        {(titleText || subtitleText || bodyText) && titlePosition === 'center' && (
          <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none" style={{ textAlign: textAlignVal, padding: '0 24px' }}>
            {renderTextBlock('center')}
          </div>
        )}

        {/* Title below */}
        {renderTextBlock('below')}

        {/* Spotlight (center brightening) */}
        {(spotlight ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[19]" style={{
            background: `radial-gradient(ellipse 70% 70% at center, rgba(255,255,255,${(spotlight / 100 * 0.25).toFixed(2)}) 0%, transparent 70%)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Light leak */}
        {(lightLeak ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[20]" style={{
            background: getLightLeakGradient(lightLeakAngle ?? 315, lightLeak),
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Fog */}
        {(fog ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[20]" style={{
            background: `radial-gradient(ellipse 150% 150% at 50% 50%, rgba(220,230,240,${(fog / 100 * 0.55).toFixed(2)}) 0%, transparent 70%)`,
          }} />
        )}

        {/* Rain */}
        {(rain ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[21]" style={{
            backgroundImage: `repeating-linear-gradient(175deg, rgba(180,210,240,${(rain / 100 * 0.25).toFixed(2)}) 0px, transparent 1px, transparent ${Math.max(4, 18 - rain / 10)}px)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Stars */}
        {(stars ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[20]" style={{
            opacity: stars / 100,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px, 100px 100px, 40px 40px',
            backgroundPosition: '0 0, 30px 30px, 15px 45px',
          }} />
        )}

        {/* Halftone overlay */}
        {(halftone ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[20]" style={{
            opacity: halftone / 100 * 0.6,
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1px)`,
            backgroundSize: `${Math.max(3, 12 - halftone / 15)}px ${Math.max(3, 12 - halftone / 15)}px`,
            mixBlendMode: 'multiply',
          }} />
        )}

        {/* Lens flare */}
        {(lensFlare ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[22]" style={{ overflow: 'hidden' }}>
            {/* Main burst */}
            <div style={{
              position: 'absolute',
              left: `${lensFlareX ?? 20}%`, top: `${lensFlareY ?? 15}%`,
              transform: 'translate(-50%, -50%)',
              width: lensFlare * 3, height: lensFlare * 3,
              background: `radial-gradient(circle, rgba(255,255,240,${(lensFlare / 100 * 0.9).toFixed(2)}) 0%, rgba(255,220,100,${(lensFlare / 100 * 0.4).toFixed(2)}) 30%, transparent 70%)`,
              borderRadius: '50%',
              mixBlendMode: 'screen',
            }} />
            {/* Secondary rings */}
            <div style={{
              position: 'absolute',
              left: `${100 - (lensFlareX ?? 20)}%`, top: `${100 - (lensFlareY ?? 15)}%`,
              transform: 'translate(-50%, -50%)',
              width: lensFlare * 1.5, height: lensFlare * 1.5,
              background: `radial-gradient(circle, rgba(100,180,255,${(lensFlare / 100 * 0.4).toFixed(2)}) 0%, transparent 60%)`,
              borderRadius: '50%',
              mixBlendMode: 'screen',
            }} />
          </div>
        )}

        {/* Noise on image */}
        {(noiseOnImage ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[23]" style={{
            opacity: (noiseOnImage ?? 0) / 100 * 0.5,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
            mixBlendMode: 'overlay',
          }} />
        )}

        {/* Logo overlay */}
        {logoImage && (logoOpacity ?? 100) > 0 && (
          <div style={{
            position: 'absolute', zIndex: 26,
            opacity: (logoOpacity ?? 100) / 100,
            ...getLogoPositionStyle(logoPosition ?? 'br', logoPadding ?? 16),
          }}>
            <img src={logoImage} alt="Logo" draggable={false}
              style={{ width: logoSize ?? 60, height: logoSize ?? 60, objectFit: 'contain', display: 'block' }}
            />
          </div>
        )}

        {/* Vignette */}
        {vignette > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[25]" style={{
            background: `radial-gradient(ellipse at center, transparent ${Math.max(0, 70 - vignette * 0.5)}%, ${vignetteColor ?? '#000000'}${Math.round(vignette / 100 * 0.85 * 255).toString(16).padStart(2, '0')} 100%)`,
          }} />
        )}

        {/* Scanlines */}
        {scanlines > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[26]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${
              scanlinesColor === 'light' ? `rgba(255,255,255,${(scanlines / 100 * 0.3).toFixed(2)})` : `rgba(0,0,0,${(scanlines / 100 * 0.45).toFixed(2)})`
            } 0px, ${
              scanlinesColor === 'light' ? `rgba(255,255,255,${(scanlines / 100 * 0.3).toFixed(2)})` : `rgba(0,0,0,${(scanlines / 100 * 0.45).toFixed(2)})`
            } 1px, transparent 1px, transparent ${scanlinesSpacing ?? 4}px)`,
          }} />
        )}

        {/* Film grain */}
        {(filmGrain ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[27]" style={{
            opacity: (filmGrain ?? 0) / 100 * 0.55,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
            mixBlendMode: 'overlay',
          }} />
        )}

        {/* Corner dots decoration */}
        {cornerDots && (
          <>
            {([{ top: 10, left: 10 }, { top: 10, right: 10 }, { bottom: 10, left: 10 }, { bottom: 10, right: 10 }] as React.CSSProperties[]).map((pos, i) => (
              <div key={i} style={{
                position: 'absolute', zIndex: 28, ...pos,
                width: 8, height: 8, borderRadius: '50%',
                background: 'rgba(255,255,255,0.5)',
                boxShadow: '0 0 6px rgba(255,255,255,0.4)',
              }} />
            ))}
          </>
        )}

        {/* Rule of thirds */}
        {showRuleOfThirds && (
          <div className="absolute inset-0 pointer-events-none z-[29]">
            {[33.33, 66.66].map(p => (
              <React.Fragment key={p}>
                <div style={{ position: 'absolute', top: `${p}%`, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.25)' }} />
                <div style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.25)' }} />
              </React.Fragment>
            ))}
          </div>
        )}

        {watermark && <Watermark />}
      </div>
    </div>
  );
};

export default CanvasPreview;
