import React, { useState } from 'react';
import { EditorState, ASPECT_PRESETS, FILM_LOOKS, IMAGE_PRESETS } from '../presets';

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
      borderRadius: r, padding: '10px 8px', position: 'relative',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
        <div style={{ width: 80, height: 22, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#111' }} />
        </div>
      </div>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 20) }}>{children}</div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
        <div style={{ width: 80, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.25)' }} />
      </div>
    </div>
  );
};

const IPadFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{
    background: 'linear-gradient(160deg, #2d2d2f 0%, #1c1c1e 100%)',
    borderRadius: Math.max(br, 14) + 12, padding: '16px 10px', position: 'relative',
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)',
  }}>
    <div style={{ position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: '#333' }} />
    <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 8) }}>{children}</div>
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
      <div style={{ width: 60, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }} />
    </div>
  </div>
);

const IMacFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{
      background: 'linear-gradient(170deg, #2d2d2f 0%, #1c1c1e 100%)',
      borderRadius: Math.max(br, 10) + 8, padding: '10px 10px 28px', position: 'relative',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)',
    }}>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 6) }}>{children}</div>
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
      <span style={{ flex: 1, textAlign: 'center', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>bash — 80×24</span>
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

const SamsungFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => {
  const r = Math.max(br, 30) + 6;
  return (
    <div style={{
      background: 'linear-gradient(160deg, #1c1c1e 0%, #111 100%)',
      borderRadius: r, padding: '12px 7px', position: 'relative',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.5)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)' }} />
      </div>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 22) }}>{children}</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, paddingTop: 10 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ width: 20, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ width: 5, height: 5, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
      </div>
    </div>
  );
};

const MacBookFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{
      background: 'linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 100%)',
      borderRadius: `${Math.max(br, 6) + 8}px ${Math.max(br, 6) + 8}px 0 0`,
      padding: '8px 8px 0', width: '100%',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <div style={{ width: 14, height: 6, borderRadius: '0 0 4px 4px', background: '#1a1a1a' }} />
      </div>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 4), background: '#000' }}>{children}</div>
    </div>
    <div style={{
      width: '110%', height: 22,
      background: 'linear-gradient(180deg, #c8c8ca 0%, #b0b0b2 100%)',
      borderRadius: '2px 2px 8px 8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    }}>
      <div style={{ width: 50, height: 10, borderRadius: 3, background: 'rgba(0,0,0,0.1)', border: '0.5px solid rgba(0,0,0,0.15)' }} />
    </div>
  </div>
);

const PolaroidFrame: React.FC<{ children: React.ReactNode; br: number; caption?: string; labelColor?: string }> = ({ children, br, caption, labelColor }) => (
  <div style={{
    background: '#fff', padding: '14px 14px 44px',
    borderRadius: Math.max(br, 2) + 2,
    boxShadow: '0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.15)',
  }}>
    <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 2) }}>{children}</div>
    {caption && (
      <div style={{ textAlign: 'center', marginTop: 8, fontFamily: 'cursive', fontSize: 13, color: labelColor ?? '#555', paddingBottom: 4 }}>
        {caption}
      </div>
    )}
  </div>
);

const NewspaperFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 2, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '3px solid #111' }}>
    <div style={{ background: '#f5f0e8', borderBottom: '2px solid #111', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 6, height: 6, background: '#111', borderRadius: '50%' }} />
      <span style={{ fontSize: 9, fontFamily: 'Georgia, serif', fontWeight: 900, color: '#111', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Daily Press</span>
      <div style={{ flex: 1, height: 1, background: '#333', opacity: 0.3 }} />
      <span style={{ fontSize: 7, fontFamily: 'Georgia, serif', color: '#666' }}>Est. 2024</span>
    </div>
    {children}
    <div style={{ background: '#f5f0e8', borderTop: '1px solid #ccc', padding: '4px 10px' }}>
      <span style={{ fontSize: 7, fontFamily: 'Georgia, serif', color: '#888', letterSpacing: '0.05em' }}>All rights reserved · © 2025</span>
    </div>
  </div>
);

const SmartTVFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{
      background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
      borderRadius: Math.max(br, 6) + 6, padding: '12px 12px 16px',
      boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.06), 0 0 0 1px rgba(0,0,0,0.8)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }} />
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e', opacity: 0.7 }} />
      </div>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 4) }}>{children}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, paddingLeft: 8, paddingRight: 8 }}>
        {[0, 1].map(side => (
          <div key={side} style={{ display: 'flex', gap: 3 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 2, height: 8, borderRadius: 1, background: 'rgba(255,255,255,0.08)' }} />
            ))}
          </div>
        ))}
      </div>
    </div>
    <div style={{ width: 60, height: 20, background: 'linear-gradient(to bottom, #222, #111)', clipPath: 'polygon(30% 0%, 70% 0%, 85% 100%, 15% 100%)' }} />
    <div style={{ width: 100, height: 6, borderRadius: '0 0 4px 4px', background: 'linear-gradient(to bottom, #333, #222)', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }} />
  </div>
);

const KindleFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{
    background: 'linear-gradient(170deg, #f5f0eb 0%, #e8e3dc 100%)',
    borderRadius: Math.max(br, 8) + 6, padding: '14px 10px 20px',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.3)',
    position: 'relative',
  }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
      <div style={{ width: 32, height: 3, borderRadius: 2, background: 'rgba(0,0,0,0.15)' }} />
    </div>
    <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 4), background: '#f8f4ee' }}>
      <div style={{ filter: 'sepia(5%) contrast(95%) brightness(105%)' }}>{children}</div>
    </div>
    <div style={{ position: 'absolute', right: 6, bottom: 40, width: 5, height: 30, borderRadius: 3, background: 'rgba(0,0,0,0.08)' }} />
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.12)' }} />
    </div>
  </div>
);

const WindowsFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 4, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 0 0 1px rgba(0,0,0,0.2)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: '#202124', borderTopLeftRadius: br + 4, borderTopRightRadius: br + 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px 6px', background: '#35363a', borderRadius: '6px 6px 0 0', marginTop: 4, minWidth: 160 }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, background: 'linear-gradient(135deg, #4285f4, #34a853)' }} />
        <span style={{ fontSize: 10, fontFamily: 'Segoe UI, system-ui', color: 'rgba(255,255,255,0.75)', flex: 1 }}>New Tab</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>✕</span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex' }}>
        {['─', '□', '✕'].map((icon, i) => (
          <div key={i} style={{ width: 46, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: i === 2 ? 11 : 13, color: 'rgba(255,255,255,0.5)' }}>{icon}</div>
        ))}
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#35363a' }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {['←', '→'].map((a, i) => (
          <span key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', width: 20, textAlign: 'center' }}>{a}</span>
        ))}
      </div>
      <div style={{ flex: 1, height: 26, borderRadius: 14, background: '#202124', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
        <span style={{ fontSize: 11, fontFamily: 'Segoe UI, system-ui', color: 'rgba(255,255,255,0.3)' }}>https://</span>
      </div>
    </div>
    {children}
  </div>
);

/* ── NEW: Notion frame ───────────────────────────── */
const NotionFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 4, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#ffffff', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ width: 16, height: 16, borderRadius: 4, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 900, lineHeight: 1, fontFamily: 'serif' }}>N</span>
      </div>
      <span style={{ fontSize: 11, fontFamily: 'system-ui', color: '#37352f', fontWeight: 500, flex: 1 }}>Untitled</span>
      <div style={{ display: 'flex', gap: 4 }}>
        {['Share', '···'].map((t, i) => (
          <div key={i} style={{ padding: '3px 8px', borderRadius: 4, background: 'rgba(0,0,0,0.04)', fontSize: 9, fontFamily: 'system-ui', color: 'rgba(55,53,47,0.4)' }}>{t}</div>
        ))}
      </div>
    </div>
    {children}
  </div>
);

/* ── NEW: Retro CRT TV frame ─────────────────────── */
const RetroTVFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{
      background: 'linear-gradient(160deg, #c8b89a 0%, #a89070 100%)',
      borderRadius: 24, padding: '18px 22px 14px',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.4)',
      position: 'relative',
    }}>
      <div style={{ overflow: 'hidden', borderRadius: 12, boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4)', filter: 'contrast(105%) brightness(92%)' }}>
        {children}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1].map(i => (
            <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: 'linear-gradient(135deg, #777, #444)', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.4)' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{ width: 2, height: 16, borderRadius: 1, background: 'rgba(0,0,0,0.25)' }} />
          ))}
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 80, marginTop: -2 }}>
      {[0, 1].map(i => (
        <div key={i} style={{ width: 12, height: 18, background: 'linear-gradient(to bottom, #a89070, #7a6050)', borderRadius: '0 0 4px 4px', transform: i === 0 ? 'rotate(-5deg)' : 'rotate(5deg)', transformOrigin: 'top center' }} />
      ))}
    </div>
  </div>
);

/* ── NEW: Figma design frame ─────────────────────── */
const FigmaFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 4, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#1e1e1e' }}>
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', gap: 8, background: '#1e1e1e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <svg width="14" height="14" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
      </svg>
      <span style={{ fontSize: 11, fontFamily: 'system-ui', color: 'rgba(255,255,255,0.5)', flex: 1 }}>Design</span>
      <div style={{ display: 'flex', gap: 6 }}>
        {['V', 'F', 'P', 'T'].map((t, i) => (
          <div key={i} style={{ width: 24, height: 22, borderRadius: 4, background: i === 0 ? 'rgba(255,255,255,0.1)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>{t}</div>
        ))}
      </div>
    </div>
    <div style={{ position: 'relative', background: '#2c2c2c' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, padding: 20 }}>
        <div style={{ overflow: 'hidden', borderRadius: br, boxShadow: '0 0 0 1.5px rgba(80,160,255,0.6), 0 4px 16px rgba(0,0,0,0.4)' }}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

const IPhone15Frame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => {
  const r = Math.max(br, 36) + 8;
  return (
    <div style={{ background: 'linear-gradient(160deg, #2c2c2e 0%, #1a1a1c 100%)', borderRadius: r, padding: '12px 8px', position: 'relative', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 10 }}>
        <div style={{ width: 110, height: 32, borderRadius: 16, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#111', border: '1.5px solid #222' }} />
          <div style={{ width: 44, height: 12, borderRadius: 6, background: '#111' }} />
        </div>
      </div>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 24) }}>{children}</div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
        <div style={{ width: 100, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.3)' }} />
      </div>
    </div>
  );
};

const AndroidFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => {
  const r = Math.max(br, 20) + 10;
  return (
    <div style={{ background: 'linear-gradient(160deg, #1c1c1e 0%, #0d0d0f 100%)', borderRadius: r, padding: '10px 7px', position: 'relative', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)' }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: Math.max(br, 16) }}>
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#111', border: '2px solid #222', zIndex: 10 }} />
        {children}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 2, paddingLeft: 12, paddingRight: 12 }}>
        {['◁', '●', '□'].map((icon, i) => (
          <div key={i} style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', userSelect: 'none', fontFamily: 'system-ui' }}>{icon}</div>
        ))}
      </div>
    </div>
  );
};

const VisionProFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ background: 'linear-gradient(180deg, #1f1f1f 0%, #0a0a0a 100%)', borderRadius: Math.max(br, 36) + 16, padding: '22px 14px 18px', position: 'relative', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px rgba(0,0,0,0.8)' }}>
    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 12, alignItems: 'center', gap: 8 }}>
      <div style={{ width: 40, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
      <div style={{ width: 40, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }} />
    </div>
    <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 28), boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)' }}>{children}</div>
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 14 }}>
      <div style={{ width: 64, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />
    </div>
  </div>
);

const PosterFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ background: '#0a0a0a', padding: '16px 16px 20px', borderRadius: Math.max(br, 4), position: 'relative', boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.07)' }}>
    <div style={{ overflow: 'hidden', borderRadius: Math.max(br - 4, 0) }}>{children}</div>
    <div style={{ marginTop: 14 }}>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 8 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', whiteSpace: 'nowrap' }}>★  FEATURE PRESENTATION  ★</span>
        <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>
    </div>
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

/* ── Badge position helper ───────────────────────── */
function getBadgePositionStyle(pos: string): React.CSSProperties {
  switch (pos) {
    case 'tl': return { top: 12, left: 12 };
    case 'tc': return { top: 12, left: '50%', transform: 'translateX(-50%)' };
    case 'tr': return { top: 12, right: 12 };
    case 'bl': return { bottom: 12, left: 12 };
    case 'bc': return { bottom: 12, left: '50%', transform: 'translateX(-50%)' };
    case 'br': default: return { bottom: 12, right: 12 };
  }
}

/* ── Watermark position helper ───────────────────── */
function getWatermarkPositionStyle(pos: string): React.CSSProperties {
  switch (pos) {
    case 'tl': return { top: 12, left: 16 };
    case 'tc': return { top: 12, left: '50%', transform: 'translateX(-50%)' };
    case 'tr': return { top: 12, right: 16 };
    case 'bl': return { bottom: 12, left: 16 };
    case 'bc': return { bottom: 12, left: '50%', transform: 'translateX(-50%)' };
    case 'br': default: return { bottom: 12, right: 16 };
  }
}

/* ── Clip path helper ────────────────────────────── */
function getClipPath(shape: string): string {
  switch (shape) {
    case 'circle':  return 'circle(50%)';
    case 'hexagon': return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
    case 'diamond': return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
    case 'star':    return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    case 'arch':    return 'ellipse(50% 45% at 50% 55%)';
    case 'rounded': return 'inset(0% round 30%)';
    default: return '';
  }
}

/* ── Light leak position helper ──────────────────── */
function getLightLeakGradient(angle: number, intensity: number): string {
  const op = (intensity / 100 * 0.7).toFixed(2);
  const op2 = (intensity / 100 * 0.35).toFixed(2);
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
    // Batch 2
    imageClipShape, imageOpacity, imageRotation,
    filmLook, vibrance,
    splitTone, splitToneHighlightColor, splitToneShadowColor,
    splitToneHighlightStrength, splitToneShadowStrength,
    tiltShift, tiltShiftBlur, tiltShiftCenter, tiltShiftRange,
    badge, badgePosition, badgeColor,
    emojiOverlay, emojiSize, emojiPositionX, emojiPositionY,
    neonTextGlow, neonGlowColor, neonGlowIntensity,
    textRotation, wordSpacing,
    prismEffect, sunburst, sunburstX, sunburstY, sunburstColor,
    shadowSpread,
    uniformPadding, paddingTop, paddingRight, paddingBottom, paddingLeft,
    // Batch 3
    watermarkText, watermarkOpacity, watermarkPosition, watermarkSize,
    doubleShadow, shadow2Color, shadow2X, shadow2Y, shadow2Blur,
    imageGlow, imageGlowColor,
    pixelate,
    bgTint, bgTintColor,
    cursorOverlay, cursorX, cursorY,
    burnEffect, bloomEffect,
    imageOutline, imageOutlineColor,
    spotlightX, spotlightY,
    textDropShadow, textShadowX, textShadowY, textShadowBlur, textShadowColor,
    paperTexture,
    reflectionGap,
    // Batch 4
    gradientMap, gradientMapColor1, gradientMapColor2,
    frameColor, frameOpacity,
    depthOfField, depthOfFieldRadius,
    retroWave, retroWaveOpacity, retroWaveAngle,
    gridLines, crosshair, crosshairColor,
    rainbowBorder,
    badgeSize, badgeRadius,
    imageBlendMode,
    bokehOverlay, bokehColor,
    stampEffect, stampColor,
    // Batch 5
    overlayPatternColor, overlayPatternOpacity, overlayPatternType,
    splitScreen, splitScreenColor1, splitScreenColor2, splitScreenAngle,
    textOutline, textOutlineColor,
    imagePreset,
    frameInnerPadding,
    accentColor, useAccentColor,
    warpEffect,
    subtitleAllCaps,
    borderRadiusTL, borderRadiusTR, borderRadiusBR, borderRadiusBL, usePerCornerRadius,
    // Batch 6
    glassEffect, glassColor,
    cornerAccents, cornerAccentColor, cornerAccentSize, cornerAccentThickness,
    frameGlow, frameGlowColor,
    mirrorMode,
    noiseType, noiseAmount,
    duotoneSplit, duotoneSplitColor1, duotoneSplitColor2, duotoneSplitMidpoint,
    shadowPreset,
    textGlitch, textGlitchColor1, textGlitchColor2,
    canvasBorderWidth, canvasBorderColor, canvasBorderStyle,
    // Batch 7
    titleUnderline, textBoxPadding, textGradientAngle,
    bgOverlayGradient, bgOverlayGradientOpacity,
    stickerText, stickerX, stickerY, stickerSize, stickerBg, stickerColor, stickerRadius,
    progressBar, progressBarValue, progressBarColor, progressBarBg, progressBarHeight, progressBarPosition,
    tagLine, tagLineColor, tagLineBg,
    canvasGradientOverlay, canvasGradientOverlayAngle, canvasGradientOverlayColor1, canvasGradientOverlayColor2, canvasGradientOverlayOpacity,
    overlayBlur,
    titleBackground, titleBackgroundColor, titleBackgroundPadding,
    // Batch 8
    lineAccent, lineAccentColor, lineAccentWidth, lineAccentHeight,
    logoRotation,
    imageColorShift, imageColorShiftAmount,
    bgPatternColor, bgPatternColorEnabled,
    textSpacingPreset,
    accentLine, accentLineColor, accentLinePosition, accentLineThickness,
    chipText, chipX, chipY, chipColor,
    imageInnerGlow, imageInnerGlowColor,
    canvasInsetShadow,
    vignetteShape,
    // Batch 9
    titleShadowBlur, titleShadowColor, titleShadowX, titleShadowY,
    subtitleOpacity,
    bodyTextColor, bodyTextSize,
    imageSepia, imageCoolTone, imageWarmTone,
    stripeBg, stripeBgColor1, stripeBgColor2, stripeBgAngle,
    frameDoubleBorder, frameDoubleBorderColor, frameDoubleBorderGap,
    cardStack, cardStackColor, cardStackOffset,
    overlayDots, overlayDotsColor, overlayDotsSize, overlayDotsOpacity,
    titleCaps,
    gradientText2, gradientText2Color1, gradientText2Color2,
    // Batch 10
    titleLetterSpacing,
    subtitleFont,
    overlayGrid, overlayGridColor, overlayGridSize, overlayGridOpacity,
    imageBorder, imageBorderColor, imageBorderWidth,
    pulseRing, pulseRingColor, pulseRingSize,
    cornerRibbon, cornerRibbonText, cornerRibbonColor, cornerRibbonBg, cornerRibbonCorner,
    textHighlight, textHighlightColor,
    imageRounded, imageRoundedAmount,
    countdownBadge, countdownValue, countdownColor, countdownBg,
    // Batch 11
    textBoxBorder, textBoxBorderColor, textBoxBorderWidth, textBoxBorderRadius,
    imageGrayscale,
    imageSaturationBoost,
    gradientOverlayBlend,
    splitPane, splitPaneRatio, splitPaneBg,
    floatingLabel, floatingLabelText, floatingLabelBg, floatingLabelColor,
    useCustomPadding, canvasPaddingTop, canvasPaddingBottom, canvasPaddingLeft, canvasPaddingRight,
    textShadowPreset,
    badgePulse,
    // Batch 12
    titleFont2, titleFont2Enabled,
    imageVignette, imageVignetteColor, imageVignetteSize,
    scrollingText, scrollingTextContent, scrollingTextColor, scrollingTextBg, scrollingTextSize,
    dividerLine, dividerLineColor, dividerLineHeight, dividerLineStyle,
    overlayHalftone, overlayHalftoneColor, overlayHalftoneDensity,
    imageOverlayText, imageOverlayTextColor, imageOverlayTextSize, imageOverlayTextOpacity,
    bgGradientColor3, bgGradientColor4, bgGradientStops,
    // Batch 13
    titleOutlineOnly, titleOutlineWidth, titleOutlineColor,
    imageTiltX, imageTiltY,
    noiseGrain, noiseGrainOpacity,
    photoTilt, photoTiltAngle,
    subtitleBold, subtitleItalic, subtitleUnderline,
    iconBar, iconBarStyle, iconBarColor,
    overlayLinear, overlayLinearColor1, overlayLinearColor2, overlayLinearOpacity,
    quoteStyle, quoteMarkColor,
    colorDuotoneMap, colorDuotoneMapColor1, colorDuotoneMapColor2,
    // Batch 17
    canvasStamp, canvasStampText, canvasStampColor, canvasStampBg,
    textNeonBorder, textNeonBorderColor,
    bgBubbles, bgBubblesColor, bgBubblesOpacity,
    imageTexture,
    overlayRetroLines, overlayRetroLinesColor, overlayRetroLinesOpacity,
    subtitleGradient, subtitleGradientColor2,
    imageSolarize,
    imageColorLeakTop, imageColorLeakColor,
    canvasRibbon, canvasRibbonText, canvasRibbonBg, canvasRibbonColor,
    // Batch 16
    overlayHaze, overlayHazeColor, overlayHazeOpacity,
    overlayBokeh, overlayBokehColor, overlayBokehOpacity,
    imageEdgeGlow, imageEdgeGlowColor, imageEdgeGlowBlur,
    textUpperBand, textUpperBandBg, textUpperBandColor, textUpperBandText,
    overlayPrismatic, overlayPrismaticOpacity,
    bgLayeredCards, bgLayeredCardsColor, bgLayeredCardsCount,
    titleDropCap,
    logoText, logoTextSize, logoTextColor,
    // Batch 15
    overlayRainbow, overlayRainbowOpacity,
    textNeonPulse, textNeonPulseColor, textNeonPulseIntensity,
    imageSkewX, imageSkewY,
    frameBadge, frameBadgeColor, frameBadgeBg,
    textBgGradient, textBgGradientColor1, textBgGradientColor2,
    overlayAurora, overlayAuroraColor1, overlayAuroraColor2, overlayAuroraOpacity,
    imageVintageFrame, imageVintageFrameColor,
    canvasGrain, canvasGrainOpacity,
    titleBoxShadow, titleBoxShadowColor,
    // Batch 14
    textReveal, textRevealColor,
    backdropBlurCard, backdropBlurCardBg, backdropBlurCardBlur, backdropBlurCardOpacity,
    imageShadow, imageShadowColor, imageShadowBlur,
    framePolaroidLabel, framePolaroidLabelColor,
    bgAnimatedGradient,
    imageHueShift,
    titleSkew,
    overlayVHS, overlayVHSIntensity,
    tiltShiftImage, tiltShiftImageBlur, tiltShiftImageCenter,
    imagePerspective,
    // Batch 36
    bgCracked, bgCrackedColor, bgCrackedOpacity,
    bgMalachite, bgMalachiteColor, bgMalachiteOpacity,
    bgTerrain, bgTerrainColor, bgTerrainOpacity,
    overlaySnowfall, overlaySnowfallOpacity,
    imageVibrant, titleOutline3D, titleOutline3DColor,
    frameBamboo, frameBambooColor,
    canvasWatermark, canvasWatermarkText, canvasWatermarkOpacity,
    bgGrid3D, bgGrid3DColor, bgGrid3DOpacity,
    textGlowSoft, bgSpiral2, bgSpiral2Color, bgSpiral2Opacity,
    // Batch 35
    bgSandstone, bgSandstoneColor, bgSandstoneOpacity,
    bgTopography, bgTopographyColor, bgTopographyOpacity,
    overlayGoldDust, overlayGoldDustOpacity,
    overlayFilmBurn, overlayFilmBurnOpacity,
    imageAnaglyph, titleBlink,
    bgPaperTear, bgPaperTearColor, bgPaperTearOpacity,
    frameWoven, frameWovenColor,
    canvasPolaroid, bgGlitchNoise, bgGlitchNoiseOpacity,
    bgHoneycomb2, bgHoneycomb2Color, bgHoneycomb2Opacity,
    // Batch 34
    bgSmoke, bgSmokeColor, bgSmokeOpacity,
    bgLavaLamp, bgLavaLampColor, bgLavaLampOpacity,
    bgCobblestone, bgCobblestoneColor, bgCobblestoneOpacity,
    overlayScratches, overlayScratchesOpacity,
    imageThermal, titleCinematic,
    bgIkat, bgIkatColor, bgIkatOpacity,
    textChromatic, frameRusted, frameRustedColor,
    canvasGritty, bgVHS, bgVHSOpacity,
    bgRetroLines, bgRetroLinesColor, bgRetroLinesOpacity,
    // Batch 33
    bgStitching, bgStitchingColor, bgStitchingOpacity,
    titleWave, bgSunrise, bgSunriseOpacity,
    frameGlow3D, frameGlow3DColor,
    bgMosaic, bgMosaicColor, bgMosaicOpacity,
    overlayVignette2, overlayVignette2Opacity,
    textOutlineDouble, textOutlineDoubleColor,
    bgGeometric3D, bgGeometric3DColor, bgGeometric3DOpacity,
    imageEnhance,
    // Batch 32
    bgKaleidoscope, bgKaleidoscopeColor, bgKaleidoscopeOpacity,
    overlaySparkle, overlaySparkleOpacity,
    imageSketch, titleNeonBox, titleNeonBoxColor,
    bgPavingStones, bgPavingStonesColor, bgPavingStonesOpacity,
    imageDaylight, bgFloral, bgFloralColor, bgFloralOpacity,
    textExtraBold, canvasSplash, canvasSplashColor,
    // Batch 31
    bgTieDye, bgTieDyeColor, bgTieDyeOpacity,
    overlayMatrix, overlayMatrixOpacity,
    imageNeonEdge, titleFlicker,
    bgCrystal, bgCrystalOpacity,
    imageBokeh,
    bgWoodGrain, bgWoodGrainColor, bgWoodGrainOpacity,
    textCursive, bgTartanPlaid, bgTartanPlaidColor, bgTartanPlaidOpacity,
    canvasBloom,
    // Batch 30
    bgTerrazzo, bgTerrazzoColor, bgTerrazzoOpacity,
    overlayPaintDrip, overlayPaintDripColor, overlayPaintDripOpacity,
    imageLensBlur, titleGhost, titleGhostColor,
    bgSnakeskin, bgSnakeskinColor, bgSnakeskinOpacity,
    overlayIce, overlayIceOpacity,
    bgDenim, bgDenimOpacity,
    textStencil, canvasOldPaper,
    // Batch 29
    bgMarble, bgMarbleColor, bgMarbleOpacity,
    imageDuotone, imageDuotoneColor,
    bgBrickWall, bgBrickWallColor, bgBrickWallOpacity,
    imageChalk, overlayFlare, overlayFlareOpacity,
    bgLattice, bgLatticeColor, bgLatticeOpacity,
    textUnderlineWave, canvasSepia,
    frameBezel, frameBezelColor,
    // Batch 28
    bgAurora, bgAuroraColor, bgAuroraOpacity,
    overlayStarburst, overlayStarburstOpacity,
    imageSatBoost, titleSplit, titleSplitColorB,
    canvasInnerGlow, canvasInnerGlowColor,
    bgScales, bgScalesColor, bgScalesOpacity,
    bgFibers, bgFibersColor, bgFibersOpacity,
    textItalicForce, frameCornerBrackets, frameCornerBracketsColor,
    // Batch 27
    bgCamo, bgCamoColor, bgCamoOpacity,
    bgHalftone, bgHalftoneColor, bgHalftoneOpacity,
    overlayNoise2, overlayNoise2Opacity,
    imageColorize, titleRainbow,
    framePaintStroke, framePaintStrokeColor,
    textShadowHard, textShadowHardColor,
    bgPolkaDots, bgPolkaDotsColor, bgPolkaDotsOpacity,
    canvasTapeCorners,
    // Batch 26
    overlayLightLeak2, overlayLightLeak2Opacity,
    imageOldPhoto, titleNeonPulse,
    frameDoubleStroke, frameDoubleStrokeColor,
    bgCircuitBoardColor,
    imageHolographic, overlayRaindrops, overlayRaindropsOpacity,
    bgWaveform, bgWaveformColor, bgWaveformOpacity,
    canvasFloatShadow, textSmallCaps,
    // Batch 25
    imageXRay, bgMandala, bgMandalaColor, bgMandalaOpacity,
    overlayGlare, overlayGlareOpacity,
    titleWordSpacingWide, frameVignetteMask, frameVignetteMaskColor,
    bgZigzagStripes, bgZigzagStripesColor, bgZigzagStripesOpacity,
    imageGlitchScan, overlayConfetti, overlayConfettiOpacity,
    titleBackdropBlur, titleBackdropBlurColor,
    bgPrismaticSheen, bgPrismaticSheenOpacity,
    imageCrossProcess2, canvasOutlineOnly,
    // Batch 24
    overlayPixelGrid, overlayPixelGridOpacity,
    imageFlatColor, titleBounce,
    bgCrossHatch, bgCrossHatchColor, bgCrossHatchOpacity,
    imagePastelTone, frameNeonTube, frameNeonTubeColor,
    overlayPaperFold, overlayPaperFoldOpacity,
    bgRipple, bgRippleColor, bgRippleOpacity,
    titleGradientAngle, textLetterboxBars, imageInfrared,
    canvasTiltedFrame, canvasTiltedFrameAngle,
    bgSpiralConic, bgSpiralConicColor, bgSpiralConicOpacity,
    // Batch 23
    bgTrianglePattern, bgTriangleColor, bgTriangleOpacity,
    overlayColorBurn, overlayColorBurnColor, overlayColorBurnOpacity,
    imageAquaEffect, titleShadowDouble, titleShadowDoubleColor,
    frameGoldLeaf, frameGoldLeafWidth,
    bgSpiral, bgSpiralColor, bgSpiralOpacity,
    imageWatercolor, textBoxGlass, textBoxGlassOpacity,
    overlayFogBottom, overlayFogBottomColor, overlayFogBottomOpacity,
    imageMirrorSplit,
    bgColorWash, bgColorWashColor, bgColorWashOpacity,
    // Batch 22
    bgSunburst, bgSunburstColor, bgSunburstOpacity,
    imageVaporwave, overlaySnow, overlaySnowOpacity,
    titleOutlineGlow, titleOutlineGlowColor,
    frameDiamondCut,
    bgStarfield, bgStarfieldOpacity,
    textUppercase, imageColorSplit,
    canvasGlassReflect, canvasGlassReflectOpacity,
    overlayHeatmap, overlayHeatmapOpacity,
    bgLinenTexture, bgLinenTextureOpacity,
    imageDreamGlow,
    // Batch 21
    titleStrikethrough, bgConcentricRings, bgConcentricRingsColor, bgConcentricRingsOpacity,
    overlayLightRays, overlayLightRaysOpacity,
    imageOilPaint, bgNebula, bgNebulaColor, bgNebulaOpacity,
    imagePosterize, titleFlipText,
    bgDotMatrix, bgDotMatrixColor, bgDotMatrixOpacity,
    textGlowBox, textGlowBoxColor,
    canvasRadialFade, canvasRadialFadeColor,
    overlayRetroGrid, overlayRetroGridOpacity,
    imageNoirEffect,
    // Batch 20
    bgGridLines, bgGridLinesColor, bgGridLinesOpacity,
    imageInkDrop,
    overlayDust, overlayDustOpacity,
    titleNeonSign, titleNeonSignColor,
    frameFilmStrip,
    bgCircuitBoard, bgCircuitBoardOpacity,
    imageChromeEffect,
    textKerningWide,
    overlayInkBleed, overlayInkBleedOpacity,
    bgHexGrid, bgHexGridColor, bgHexGridOpacity,
    // Batch 19
    titleGlitch, titleGlitchColor,
    bgDiamondPattern, bgDiamondOpacity,
    overlayHolographic, overlayHolographicOpacity,
    canvasBorderGlow, canvasBorderGlowColor,
    textHighlightBlock, textHighlightBlockColor,
    bgGlowOrb, bgGlowOrbColor, bgGlowOrbX, bgGlowOrbY,
    imageBloomLight, imageBloomLightColor,
    cardGlassOverlay, cardGlassOverlayBg,
    watermarkTiled, watermarkTiledText,
    // Batch 18
    imageLomo, imageXProcess,
    overlayGradientMesh, overlayGradientMeshOpacity,
    titleTypewriter, titleTypewriterColor,
    imageOverlayPattern, imageOverlayPatternOpacity,
    bgWaves, bgWavesColor, bgWavesOpacity,
    imageColorMap,
    frameMatte, frameMatteColor, frameMatteWidth,
    textOutlineStroke, textOutlineStrokeColor,
    canvasSpotlight, canvasSpotlightColor, canvasSpotlightStrength,
  } = state;

  if (!image) return null;

  const aspectPreset = ASPECT_PRESETS.find(a => a.id === aspectRatio);

  /* ── Accent color — overrides glow/shadow when enabled ── */
  const effGlowColor   = (useAccentColor ?? false) && (accentColor ?? '') ? accentColor : glowColor;
  const effShadowColor = (useAccentColor ?? false) && (accentColor ?? '') ? `${accentColor}80` : shadowColor;

  /* ── Effective canvas border radius ── */
  const canvasBR: React.CSSProperties['borderRadius'] = (usePerCornerRadius ?? false)
    ? `${borderRadiusTL ?? 12}px ${borderRadiusTR ?? 12}px ${borderRadiusBR ?? 12}px ${borderRadiusBL ?? 12}px`
    : borderRadius;

  /* ── Per-side padding ── */
  const paddingStyle: React.CSSProperties = (useCustomPadding ?? false)
    ? {
        paddingTop: canvasPaddingTop ?? padding,
        paddingRight: canvasPaddingRight ?? padding,
        paddingBottom: canvasPaddingBottom ?? padding,
        paddingLeft: canvasPaddingLeft ?? padding,
      }
    : uniformPadding !== false
      ? { padding }
      : {
          paddingTop: paddingTop ?? padding,
          paddingRight: paddingRight ?? padding,
          paddingBottom: paddingBottom ?? padding,
          paddingLeft: paddingLeft ?? padding,
        };

  const canvasStyle: React.CSSProperties = {
    background: bgRadial
      ? background.replace(/^linear-gradient\([\d]+deg,/, `radial-gradient(ellipse at center,`).replace('linear-gradient(', 'radial-gradient(ellipse at center,')
      : background,
    ...paddingStyle,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: canvasBR,
  };

  // Warp effect (positive = barrel rounded corners, negative = pincushion octagon clip)
  if ((warpEffect ?? 0) > 0) {
    canvasStyle.borderRadius = `${Math.min(38, (warpEffect ?? 0) / 2.5)}%`;
  } else if ((warpEffect ?? 0) < 0) {
    const pct = Math.abs(warpEffect ?? 0) * 0.15;
    canvasStyle.borderRadius = undefined;
    canvasStyle.clipPath = `polygon(${pct}% 0%,${100-pct}% 0%,100% ${pct}%,100% ${100-pct}%,${100-pct}% 100%,${pct}% 100%,0% ${100-pct}%,0% ${pct}%)`;
  }

  // Canvas outer border (Batch 6)
  if ((canvasBorderWidth ?? 0) > 0) {
    canvasStyle.border = `${canvasBorderWidth}px ${canvasBorderStyle ?? 'solid'} ${canvasBorderColor ?? '#ffffff'}`;
  }

  // Mirror mode (Batch 6)
  const mirrorTransformStr = (mirrorMode ?? 'none') === 'horizontal' ? 'scaleX(-1)'
    : (mirrorMode ?? 'none') === 'vertical'    ? 'scaleY(-1)'
    : (mirrorMode ?? 'none') === 'both'        ? 'scale(-1,-1)'
    : '';

  // Batch 13 — photo tilt (applied on top of rotation)
  const tiltStr = (photoTilt ?? false) && (photoTiltAngle ?? 0) !== 0
    ? `rotate(${photoTiltAngle ?? -3}deg)`
    : '';
  const rotStr = canvasRotation !== 0 ? `rotate(${canvasRotation}deg)` : '';
  const combinedTransform = [rotStr, mirrorTransformStr, tiltStr].filter(Boolean).join(' ');
  if (combinedTransform) canvasStyle.transform = combinedTransform;

  if (aspectPreset && aspectPreset.id !== 'auto') {
    canvasStyle.width = '100%';
    canvasStyle.maxWidth = Math.min(aspectPreset.width, 900);
    canvasStyle.aspectRatio = `${aspectPreset.width} / ${aspectPreset.height}`;
    canvasStyle.display = 'flex';
    canvasStyle.flexDirection = 'column';
    canvasStyle.alignItems = 'center';
    canvasStyle.justifyContent = 'center';
  }

  // Canvas inset shadow (Batch 8)
  if ((canvasInsetShadow ?? 0) > 0) {
    const cis = canvasInsetShadow ?? 0;
    canvasStyle.boxShadow = `inset 0 0 ${cis}px rgba(0,0,0,${Math.min(0.85, cis / 100 * 0.9).toFixed(2)})`;
  }
  // Batch 19 — canvas border glow (outer glow appended to boxShadow)
  if (canvasBorderGlow ?? false) {
    const cgc = canvasBorderGlowColor ?? '#8b5cf6';
    const glowStr = `0 0 20px ${cgc}80, 0 0 50px ${cgc}50, 0 0 80px ${cgc}30`;
    canvasStyle.boxShadow = canvasStyle.boxShadow
      ? `${canvasStyle.boxShadow}, ${glowStr}`
      : glowStr;
  }
  // Batch 22 — diamond cut angled corners clip
  if (frameDiamondCut ?? false) {
    canvasStyle.clipPath = 'polygon(22px 0%, calc(100% - 22px) 0%, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0% calc(100% - 22px), 0% 22px)';
    canvasStyle.borderRadius = undefined;
  }
  // Batch 31 — canvas bloom: soft center-glow overlay (applied via overlay div below)
  // (rendered as overlay, no canvasStyle mutation needed)
  // Batch 29 — bezel border: thick inset beveled shadow
  if (frameBezel ?? false) {
    const bc = frameBezelColor ?? '#c8a06e';
    const bezelShadow = `inset 0 0 0 6px ${bc}, inset 0 0 0 8px ${bc}60, inset 0 0 0 10px ${bc}30`;
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${bezelShadow}` : bezelShadow;
  }
  // Batch 28 — inner canvas glow: inset diffused glow
  if (canvasInnerGlow ?? false) {
    const igc = canvasInnerGlowColor ?? '#8b5cf6';
    const innerGlow = `inset 0 0 30px ${igc}50, inset 0 0 60px ${igc}20`;
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${innerGlow}` : innerGlow;
  }
  // Batch 27 — paint stroke: rough inset border with staggered shadows
  if (framePaintStroke ?? false) {
    const psc = framePaintStrokeColor ?? '#8b5cf6';
    const paintShadow = `inset 3px 3px 0 ${psc}, inset -3px -3px 0 ${psc}, inset 6px -2px 0 ${psc}80, inset -2px 6px 0 ${psc}80`;
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${paintShadow}` : paintShadow;
  }
  // Batch 36 — bamboo frame: green bamboo strip inset border
  if (frameBamboo ?? false) {
    const bc = frameBambooColor ?? '#6b8c42';
    const bambooShadow = `inset 0 0 0 6px ${bc}, inset 0 0 0 8px ${bc}60, inset 0 0 0 10px ${bc}30`;
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${bambooShadow}` : bambooShadow;
  }
  // Batch 35 — woven frame: basket-weave inset pattern border
  if (frameWoven ?? false) {
    const wc = frameWovenColor ?? '#8b6040';
    const wovenShadow = `inset 0 0 0 5px ${wc}, inset 0 0 0 8px ${wc}40, inset 0 0 0 11px ${wc}20`;
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${wovenShadow}` : wovenShadow;
  }
  // Batch 35 — polaroid: thick white bottom border like a polaroid photo
  if (canvasPolaroid ?? false) {
    canvasStyle.border = '12px solid #f5f0e8';
    canvasStyle.borderBottom = '44px solid #f5f0e8';
    canvasStyle.boxShadow = canvasStyle.boxShadow
      ? `${canvasStyle.boxShadow}, 0 8px 30px rgba(0,0,0,0.25)`
      : '0 8px 30px rgba(0,0,0,0.25)';
  }
  // Batch 34 — rusted frame: earthy inset shadow with corroded edge tones
  if (frameRusted ?? false) {
    const rc = frameRustedColor ?? '#8b4513';
    const rustedShadow = `inset 0 0 0 4px ${rc}, inset 0 0 12px ${rc}80, inset 0 0 0 6px #5c2d0880`;
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${rustedShadow}` : rustedShadow;
  }
  // Batch 33 — 3D glow frame: raised inset with multi-stop glow giving depth
  if (frameGlow3D ?? false) {
    const gc = frameGlow3DColor ?? '#8b5cf6';
    const glow3d = `inset 0 0 0 2px ${gc}, inset 2px 2px 8px ${gc}60, inset -2px -2px 8px ${gc}30, 0 0 20px ${gc}50, 0 0 40px ${gc}20`;
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${glow3d}` : glow3d;
  }
  // Batch 26 — double stroke: two concentric inset border rings
  if (frameDoubleStroke ?? false) {
    const dsc = frameDoubleStrokeColor ?? '#8b5cf6';
    const doubleShadow = `inset 0 0 0 3px ${dsc}, inset 0 0 0 7px ${dsc}40`;
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${doubleShadow}` : doubleShadow;
  }
  // Batch 26 — float shadow: deep layered drop shadow beneath canvas
  if (canvasFloatShadow ?? false) {
    const floatShadow = '0 24px 60px rgba(0,0,0,0.65), 0 8px 20px rgba(0,0,0,0.40)';
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${floatShadow}` : floatShadow;
  }
  // Batch 25 — canvas outline only (transparent bg)
  if (canvasOutlineOnly ?? false) {
    canvasStyle.background = 'transparent';
    if (!(canvasBorderWidth ?? 0)) {
      canvasStyle.border = '2px solid rgba(255,255,255,0.25)';
    }
  }
  // Batch 24 — neon tube inset glow border
  if (frameNeonTube ?? false) {
    const ntc = frameNeonTubeColor ?? '#00ffff';
    const neonShadow = `inset 0 0 0 3px ${ntc}, inset 0 0 12px ${ntc}80, 0 0 20px ${ntc}60`;
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${neonShadow}` : neonShadow;
  }
  // Batch 24 — tilted canvas frame slight rotation
  if (canvasTiltedFrame ?? false) {
    const angle = canvasTiltedFrameAngle ?? 3;
    const existing = canvasStyle.transform ?? '';
    canvasStyle.transform = existing ? `${existing} rotate(${angle}deg)` : `rotate(${angle}deg)`;
  }
  // Batch 23 — gold leaf inset border
  if (frameGoldLeaf ?? false) {
    const gw = frameGoldLeafWidth ?? 6;
    const goldShadow = `inset 0 0 0 ${gw}px #d4af37, inset 0 0 0 ${gw + 2}px #92400e60, inset 0 0 0 ${gw - 1}px #ffd70080`;
    canvasStyle.boxShadow = canvasStyle.boxShadow ? `${canvasStyle.boxShadow}, ${goldShadow}` : goldShadow;
  }
  // Batch 23 — mirror split: horizontal flip applied to canvas (scaleX on image handled via filter)
  if (imageMirrorSplit ?? false) {
    const existing = canvasStyle.transform ?? '';
    canvasStyle.transform = existing ? `${existing} scaleX(-1)` : 'scaleX(-1)';
  }

  /* ── Shadow / glow compositing ── */
  const buildShadow = (includeInner = false) => {
    const parts: string[] = [];
    const sx = shadowX ?? 0;
    const sy = shadowY ?? 0;
    const sb = shadowBlur > 0 ? shadowBlur : (shadow > 0 ? shadow * 2 : 0);
    const spread = shadowSpread ?? 0;
    if (shadow > 0) {
      parts.push(`${sx}px ${shadow + sy}px ${sb}px ${spread}px ${effShadowColor}`);
      parts.push(`${sx * 0.5}px ${(shadow + sy) / 2}px ${shadow}px 0px ${effShadowColor.replace(/[\d.]+\)$/, m => `${parseFloat(m) * 0.5})`)}`);
    }
    if (glowIntensity > 0) {
      parts.push(`0 0 ${Math.round(glowIntensity * 0.5)}px ${effGlowColor}`);
      parts.push(`0 0 ${glowIntensity}px ${effGlowColor}`);
    }
    // Double shadow (Batch 3)
    if (doubleShadow ?? false) {
      parts.push(`${shadow2X ?? 20}px ${shadow2Y ?? 20}px ${shadow2Blur ?? 40}px ${shadow2Color ?? 'rgba(0,0,0,0.3)'}`);
    }
    if (includeInner && innerShadow > 0) {
      const op = Math.min(innerShadow / 100 * 0.85, 0.75).toFixed(2);
      parts.push(`inset 0 ${Math.round(innerShadow * 0.3)}px ${innerShadow}px rgba(0,0,0,${op})`);
    }
    if ((innerGlowIntensity ?? 0) > 0) {
      parts.push(`inset 0 0 ${innerGlowIntensity}px ${innerGlowColor}`);
    }
    // Frame outer glow (Batch 6)
    if ((frameGlow ?? 0) > 0) {
      const fg = frameGlow ?? 0;
      const fc = frameGlowColor ?? '#8b5cf6';
      parts.push(`0 0 ${fg * 0.5}px ${fc}, 0 0 ${fg}px ${fc}, 0 0 ${fg * 2}px ${fc}40`);
    }
    // Shadow presets (Batch 6) – applied when no manual shadow/glow set
    if ((shadowPreset ?? 'none') !== 'none' && shadow === 0 && glowIntensity === 0 && parts.length === 0) {
      const presets: Record<string, string> = {
        soft:  `0 4px 24px rgba(0,0,0,0.18), 0 1px 6px rgba(0,0,0,0.12)`,
        hard:  `4px 8px 0px rgba(0,0,0,0.85)`,
        float: `0 20px 60px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15)`,
        neon:  `0 0 20px ${effGlowColor}, 0 0 40px ${effGlowColor}, 0 0 80px ${effGlowColor}40`,
        retro: `6px 6px 0 rgba(0,0,0,0.9), 12px 12px 0 rgba(0,0,0,0.4)`,
      };
      return presets[shadowPreset ?? ''] ?? 'none';
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
  if ((temperature ?? 0) > 0) {
    const t = temperature;
    imageFilterParts.push(`sepia(${t * 0.4}%) saturate(${100 + t * 0.6}%) hue-rotate(-${t * 0.2}deg)`);
  } else if ((temperature ?? 0) < 0) {
    const t = Math.abs(temperature);
    imageFilterParts.push(`hue-rotate(${t * 0.3}deg) saturate(${100 - t * 0.3}%)`);
  }
  if ((vibrance ?? 0) !== 0) imageFilterParts.push(`saturate(${100 + (vibrance ?? 0) * 0.8}%)`);
  if ((fade ?? 0) > 0) imageFilterParts.push(`contrast(${100 - fade * 0.5}%) brightness(${100 + fade * 0.15}%)`);
  if ((sharpness ?? 0) > 0) imageFilterParts.push(`contrast(${100 + sharpness * 0.5}%)`);
  if ((highlights ?? 0) > 0) imageFilterParts.push(`brightness(${100 + highlights * 0.25}%)`);
  else if ((highlights ?? 0) < 0) imageFilterParts.push(`brightness(${100 + highlights * 0.15}%)`);
  if ((shadows ?? 0) > 0) imageFilterParts.push(`brightness(${100 + shadows * 0.12}%)`);
  if ((grayscale ?? 0) > 0 || duotone) imageFilterParts.push(`grayscale(${duotone ? 100 : grayscale}%)`);
  if ((hueRotate ?? 0) !== 0) imageFilterParts.push(`hue-rotate(${hueRotate}deg)`);
  if (invert) imageFilterParts.push('invert(100%)');
  if ((chromaAberration ?? 0) > 0) {
    const n = chromaAberration;
    imageFilterParts.push(`drop-shadow(${n}px 0 0 rgba(255,0,0,0.45)) drop-shadow(-${n}px 0 0 rgba(0,200,255,0.45))`);
  }
  if (filmLook && filmLook !== 'none') {
    const look = FILM_LOOKS.find(f => f.id === filmLook);
    if (look?.filters) imageFilterParts.push(look.filters);
  }
  // Instagram-like image preset (Batch 5)
  if ((imagePreset ?? 'none') !== 'none') {
    const preset = IMAGE_PRESETS.find(p => p.id === imagePreset);
    if (preset?.filters) imageFilterParts.push(preset.filters);
  }
  // Image glow (Batch 3) — drop-shadow specifically on the image
  if ((imageGlow ?? 0) > 0) {
    imageFilterParts.push(`drop-shadow(0 0 ${imageGlow}px ${imageGlowColor ?? 'rgba(255,255,255,0.8)'})`);
  }
  // Batch 9 image tone filters
  if ((imageSepia ?? 0) > 0) imageFilterParts.push(`sepia(${imageSepia}%)`);
  if (imageCoolTone ?? false) imageFilterParts.push('hue-rotate(180deg) saturate(75%) brightness(102%)');
  if (imageWarmTone ?? false) imageFilterParts.push('sepia(30%) saturate(130%) brightness(104%)');
  // Batch 11 image filters
  if ((imageGrayscale ?? 0) > 0) imageFilterParts.push(`grayscale(${imageGrayscale}%)`);
  if ((imageSaturationBoost ?? 0) !== 0) imageFilterParts.push(`saturate(${100 + (imageSaturationBoost ?? 0)}%)`);
  // Batch 14 — hue shift + drop shadow
  if ((imageHueShift ?? 0) !== 0) imageFilterParts.push(`hue-rotate(${imageHueShift}deg)`);
  if (imageShadow ?? false) imageFilterParts.push(`drop-shadow(0 8px ${imageShadowBlur ?? 20}px ${imageShadowColor ?? '#000000'})`);
  // Batch 16 — edge glow halo
  if (imageEdgeGlow ?? false) imageFilterParts.push(`drop-shadow(0 0 ${imageEdgeGlowBlur ?? 24}px ${imageEdgeGlowColor ?? '#8b5cf6'}) drop-shadow(0 0 ${(imageEdgeGlowBlur ?? 24) * 0.5}px ${imageEdgeGlowColor ?? '#8b5cf6'})`);
  // Batch 17 — solarize approximation
  if (imageSolarize ?? false) imageFilterParts.push('contrast(150%) brightness(110%) invert(50%) saturate(180%) brightness(90%) invert(50%)');
  // Batch 36 — vibrant: hyper-saturated vivid pop
  if (imageVibrant ?? false) imageFilterParts.push('saturate(300%) contrast(120%) brightness(105%)');
  // Batch 35 — anaglyph: red-cyan 3D offset illusion
  if (imageAnaglyph ?? false) imageFilterParts.push('saturate(150%) contrast(110%) hue-rotate(-10deg)');
  // Batch 34 — thermal: false-color heat map approximation
  if (imageThermal ?? false) imageFilterParts.push('grayscale(100%) sepia(100%) saturate(400%) hue-rotate(300deg) brightness(90%) contrast(120%)');
  // Batch 33 — enhance: clarity boost with sharpened micro-contrast
  if (imageEnhance ?? false) imageFilterParts.push('contrast(118%) brightness(106%) saturate(115%) drop-shadow(0 0 0.5px rgba(0,0,0,0.3))');
  // Batch 32 — sketch: grayscale + high contrast edge look
  if (imageSketch ?? false) imageFilterParts.push('grayscale(100%) contrast(300%) brightness(140%) invert(100%) blur(0.4px)');
  // Batch 32 — daylight: bright vivid sunlit enhancement
  if (imageDaylight ?? false) imageFilterParts.push('brightness(115%) saturate(130%) contrast(105%)');
  // Batch 31 — neon edge: high-contrast invert approximation
  if (imageNeonEdge ?? false) imageFilterParts.push('contrast(400%) brightness(180%) invert(80%) hue-rotate(120deg) saturate(300%)');
  // Batch 31 — bokeh: soft dreamy light circles approximation
  if (imageBokeh ?? false) imageFilterParts.push('blur(0.6px) brightness(128%) contrast(88%) saturate(145%)');
  // Batch 30 — lens blur: subtle depth-of-field softening
  if (imageLensBlur ?? false) imageFilterParts.push('blur(1.8px) brightness(103%)');
  // Batch 29 — duotone: grayscale + hue-shift approximation
  if (imageDuotone ?? false) imageFilterParts.push('grayscale(100%) sepia(80%) saturate(300%) hue-rotate(220deg) brightness(95%)');
  // Batch 29 — chalk: bright soft matte pastel effect
  if (imageChalk ?? false) imageFilterParts.push('brightness(118%) saturate(55%) contrast(82%) blur(0.3px)');
  // Batch 28 — saturation boost: vivid punchy colors
  if (imageSatBoost ?? false) imageFilterParts.push('saturate(260%) contrast(108%)');
  // Batch 27 — colorize: warm sepia + rich saturation
  if (imageColorize ?? false) imageFilterParts.push('sepia(100%) saturate(200%) brightness(92%)');
  // Batch 26 — old photo: sepia + faded soft vintage
  if (imageOldPhoto ?? false) imageFilterParts.push('sepia(85%) contrast(88%) brightness(88%) saturate(80%)');
  // Batch 26 — holographic foil: rainbow hue + rich saturation
  if (imageHolographic ?? false) imageFilterParts.push('hue-rotate(30deg) saturate(180%) brightness(110%) contrast(108%)');
  // Batch 25 — X-ray negative invert
  if (imageXRay ?? false) imageFilterParts.push('invert(100%) contrast(150%) grayscale(100%)');
  // Batch 25 — glitch scan: vivid contrast shift
  if (imageGlitchScan ?? false) imageFilterParts.push('contrast(140%) hue-rotate(15deg) saturate(160%) brightness(95%)');
  // Batch 25 — cross process 2: green shadows variant
  if (imageCrossProcess2 ?? false) imageFilterParts.push('hue-rotate(-20deg) saturate(200%) contrast(115%) brightness(95%)');
  // Batch 24 — flat color pop: hard graphic contrast
  if (imageFlatColor ?? false) imageFilterParts.push('contrast(200%) saturate(130%) brightness(100%)');
  // Batch 24 — pastel tone: soft washed-out gentle colors
  if (imagePastelTone ?? false) imageFilterParts.push('brightness(112%) saturate(60%) contrast(88%)');
  // Batch 24 — infrared false-color: hue shift + extreme saturation
  if (imageInfrared ?? false) imageFilterParts.push('hue-rotate(130deg) saturate(220%) contrast(115%) brightness(95%)');
  // Batch 23 — aqua: cool teal/underwater tone
  if (imageAquaEffect ?? false) imageFilterParts.push('hue-rotate(175deg) saturate(130%) brightness(108%) contrast(105%)');
  // Batch 23 — watercolor: soft washed-out painterly
  if (imageWatercolor ?? false) imageFilterParts.push('brightness(115%) saturate(75%) contrast(82%)');
  // Batch 22 — vaporwave: pink+teal hue shift
  if (imageVaporwave ?? false) imageFilterParts.push('hue-rotate(300deg) saturate(180%) contrast(110%) brightness(105%)');
  // Batch 22 — dream glow: soft overexposed dreamy bloom
  if (imageDreamGlow ?? false) imageFilterParts.push('brightness(130%) contrast(80%) saturate(110%)');
  // Batch 22 — RGB color split: vivid channel contrast approximation
  if (imageColorSplit ?? false) imageFilterParts.push('saturate(160%) contrast(115%) hue-rotate(5deg)');
  // Batch 21 — oil paint simulation: rich saturation + contrast
  if (imageOilPaint ?? false) imageFilterParts.push('saturate(200%) contrast(130%) brightness(92%)');
  // Batch 21 — posterize approximation: extreme contrast + desaturate
  if (imagePosterize ?? false) imageFilterParts.push('contrast(200%) saturate(50%) brightness(95%)');
  // Batch 21 — noir: heavy B&W high contrast
  if (imageNoirEffect ?? false) imageFilterParts.push('grayscale(100%) contrast(180%) brightness(88%)');
  // Batch 20 — ink drop: high-contrast desaturated with sepia ink tones
  if (imageInkDrop ?? false) imageFilterParts.push('contrast(140%) saturate(40%) sepia(60%) brightness(95%)');
  // Batch 20 — chrome metallic: desaturate + max contrast + cool tone
  if (imageChromeEffect ?? false) imageFilterParts.push('grayscale(80%) contrast(160%) brightness(110%) saturate(20%) hue-rotate(200deg)');
  // Batch 18 — lomo film: boosted contrast/saturation + strong vignette via filter
  if (imageLomo ?? false) imageFilterParts.push('saturate(160%) contrast(125%) brightness(95%)');
  // Batch 18 — cross-process: push-processed look (cyan shadows, yellow highlights)
  if (imageXProcess ?? false) imageFilterParts.push('hue-rotate(10deg) saturate(180%) contrast(120%) brightness(105%)');
  // Batch 18 — color map: recolor via hue-rotate + saturation tricks
  if ((imageColorMap ?? 'none') !== 'none') {
    const colorMapFilters: Record<string, string> = {
      cyber:  'hue-rotate(180deg) saturate(200%) contrast(110%) brightness(90%)',
      matrix: 'grayscale(80%) hue-rotate(100deg) saturate(300%) brightness(85%)',
      fire:   'hue-rotate(-30deg) saturate(220%) contrast(115%) brightness(100%)',
      ice:    'hue-rotate(195deg) saturate(150%) brightness(108%) contrast(105%)',
    };
    const cmf = colorMapFilters[imageColorMap ?? ''];
    if (cmf) imageFilterParts.push(cmf);
  }
  // Image color shift (Batch 8) — boost one color channel via hue + saturate
  if ((imageColorShift ?? 'none') !== 'none' && (imageColorShiftAmount ?? 0) > 0) {
    const amt = imageColorShiftAmount ?? 40;
    const shiftMap: Record<string, string> = {
      red:     `hue-rotate(0deg) saturate(${100 + amt}%) brightness(${100 + amt * 0.15}%)`,
      green:   `hue-rotate(100deg) saturate(${100 + amt}%) hue-rotate(-100deg)`,
      blue:    `hue-rotate(220deg) saturate(${100 + amt}%) hue-rotate(-220deg)`,
      cyan:    `hue-rotate(175deg) saturate(${100 + amt}%) hue-rotate(-175deg)`,
      magenta: `hue-rotate(300deg) saturate(${100 + amt}%) hue-rotate(-300deg)`,
      yellow:  `hue-rotate(55deg) saturate(${100 + amt}%) hue-rotate(-55deg)`,
    };
    const sf = shiftMap[imageColorShift ?? ''];
    if (sf) imageFilterParts.push(sf);
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
  const clipPath = getClipPath(imageClipShape ?? 'none');
  const imgOpacity = (imageOpacity ?? 100) / 100;
  const imgRotation = imageRotation ?? 0;
  const imgOutlineStyle = (imageOutline ?? 0) > 0
    ? { outline: `${imageOutline}px solid ${imageOutlineColor ?? '#ffffff'}`, outlineOffset: '2px' }
    : {};

  const frameBR = frame === 'phone'    ? Math.max(borderRadius, 28) + 8
    : frame === 'samsung' ? Math.max(borderRadius, 30) + 6
    : frame === 'arc'     ? borderRadius + 6
    : frame !== 'none'    ? borderRadius + 4 : borderRadius;

  /* ── Pixelate SVG filter ── */
  const pixBlock = Math.max(2, Math.round((pixelate ?? 0) / 100 * 28 + 2));

  /* ── Inner image element ── */
  const renderImageEl = (rawBorderRadius = 0) => {
    const roundedBR = (imageRounded ?? false) ? `${imageRoundedAmount ?? 50}%` : undefined;
    const effectiveBR = roundedBR ?? rawBorderRadius ?? imgBR;
    const imageBorderStyle: React.CSSProperties = (imageBorder ?? false)
      ? { outline: `${imageBorderWidth ?? 2}px solid ${imageBorderColor ?? '#8b5cf6'}`, outlineOffset: '2px' }
      : {};
    const tiltTransform = ((imageTiltX ?? 0) !== 0 || (imageTiltY ?? 0) !== 0)
      ? `perspective(600px) rotateY(${imageTiltX ?? 0}deg) rotateX(${-(imageTiltY ?? 0)}deg)`
      : '';
    // Batch 15 — image skew
    const skewTransform = ((imageSkewX ?? 0) !== 0 || (imageSkewY ?? 0) !== 0)
      ? `skew(${imageSkewX ?? 0}deg, ${imageSkewY ?? 0}deg)`
      : '';
    // Batch 14 — imagePerspective preset
    const perspMap: Record<string, string> = {
      left:  'perspective(900px) rotateY(12deg)',
      right: 'perspective(900px) rotateY(-12deg)',
      up:    'perspective(900px) rotateX(-12deg)',
      down:  'perspective(900px) rotateX(12deg)',
    };
    const perspTransform = (imagePerspective ?? 'flat') !== 'flat' ? (perspMap[imagePerspective ?? ''] ?? '') : '';
    // Batch 14 — tilt-shift mask on image (fade top/bottom edges)
    const tsiCenter = tiltShiftImageCenter ?? 50;
    const tsiMask = (tiltShiftImage ?? false)
      ? `linear-gradient(to bottom, transparent 0%, black ${Math.max(0, tsiCenter - 28)}%, black ${Math.min(100, tsiCenter + 28)}%, transparent 100%)`
      : undefined;
    const fitStyle: React.CSSProperties = {
      borderRadius: effectiveBR,
      filter: imageFilter,
      opacity: imgOpacity,
      clipPath: clipPath || undefined,
      transform: [tiltTransform, perspTransform, skewTransform, imgRotation !== 0 ? `rotate(${imgRotation}deg)` : ''].filter(Boolean).join(' ') || undefined,
      maskImage: tsiMask,
      WebkitMaskImage: tsiMask,
      ...imgOutlineStyle,
      ...imageBorderStyle,
    };

    // Batch 17 — texture SVG patterns on image
    const textureOverlay: string | undefined = {
      paper:  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='t'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23t)' opacity='0.12'/%3E%3C/svg%3E")`,
      canvas: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M0 0h12v1H0zM0 6h12v1H0zM0 0v12h1V0zM6 0v12h1V0z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E")`,
      linen:  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M0 0h8v2H0zM0 4h8v2H0z' fill='rgba(0,0,0,0.05)'/%3E%3C/svg%3E")`,
    }[(imageTexture ?? 'none')] as string | undefined;

    if (!hasZoomPan) {
      return (
        <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
          <img src={image} alt="Screenshot" className="block w-full h-auto"
            style={fitStyle}
            onLoad={e => { const t = e.currentTarget; setImgNatural({ w: t.naturalWidth, h: t.naturalHeight }); }}
            draggable={false}
          />
          {textureOverlay && <div style={{ position: 'absolute', inset: 0, backgroundImage: textureOverlay, backgroundRepeat: 'repeat', pointerEvents: 'none', borderRadius: effectiveBR }} />}
          {(imageColorLeakTop ?? false) && <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 0% 0%, ${imageColorLeakColor ?? '#ff8c00'}60 0%, transparent 65%)`, pointerEvents: 'none', mixBlendMode: 'screen', borderRadius: effectiveBR }} />}
          {/* Batch 18 — image overlay pattern */}
          {(imageOverlayPattern ?? 'none') !== 'none' && <div style={{ position: 'absolute', inset: 0, backgroundImage: getPatternSvg(imageOverlayPattern ?? '', (imageOverlayPatternOpacity ?? 20) / 100, 18), backgroundRepeat: 'repeat', pointerEvents: 'none', borderRadius: effectiveBR }} />}
          {/* Batch 18 — frame matte: inset border inside image */}
          {(frameMatte ?? false) && <div style={{ position: 'absolute', inset: frameMatteWidth ?? 20, border: `${(frameMatteWidth ?? 20) * 0.4}px solid ${frameMatteColor ?? '#ffffff'}`, pointerEvents: 'none', borderRadius: Math.max(0, (typeof effectiveBR === 'number' ? effectiveBR : 0) - (frameMatteWidth ?? 20)) }} />}
        </div>
      );
    }
    const ratio = imgNatural ? imgNatural.w / imgNatural.h : 16 / 9;
    const fitObj = imageFitMode === 'contain' ? 'contain' : imageFitMode === 'fill' ? 'fill' : 'cover';
    return (
      <div style={{ width: '100%', aspectRatio: String(ratio), overflow: 'hidden', borderRadius: effectiveBR, position: 'relative', clipPath: clipPath || undefined, ...imgOutlineStyle }}>
        <img src={image} alt="Screenshot" draggable={false}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: fitObj, filter: imageFilter, opacity: imgOpacity,
            transform: `translate(${panX}%, ${panY}%) scale(${zoom})${imgRotation !== 0 ? ` rotate(${imgRotation}deg)` : ''}`,
            transformOrigin: 'center center',
          }}
          onLoad={e => { const t = e.currentTarget; setImgNatural({ w: t.naturalWidth, h: t.naturalHeight }); }}
        />
      </div>
    );
  };

  /* ── Frame shell ── */
  const renderFrameShell = () => {
    const innerPad = (frameInnerPadding ?? 0) > 0;
    const innerContent = innerPad
      ? <div style={{ padding: frameInnerPadding }}>{renderImageEl(0)}</div>
      : renderImageEl(0);
    switch (frame) {
      case 'browser':   return <BrowserFrame   br={borderRadius}>{innerContent}</BrowserFrame>;
      case 'macos':     return <MacFrame        br={borderRadius}>{innerContent}</MacFrame>;
      case 'phone':     return <PhoneFrame      br={borderRadius}>{innerContent}</PhoneFrame>;
      case 'ipad':      return <IPadFrame       br={borderRadius}>{innerContent}</IPadFrame>;
      case 'imac':      return <IMacFrame       br={borderRadius}>{innerContent}</IMacFrame>;
      case 'terminal':  return <TerminalFrame   br={borderRadius}>{innerContent}</TerminalFrame>;
      case 'arc':       return <ArcFrame        br={borderRadius}>{innerContent}</ArcFrame>;
      case 'samsung':   return <SamsungFrame    br={borderRadius}>{innerContent}</SamsungFrame>;
      case 'macbook':   return <MacBookFrame    br={borderRadius}>{innerContent}</MacBookFrame>;
      case 'polaroid':  return <PolaroidFrame   br={borderRadius} caption={framePolaroidLabel || undefined} labelColor={framePolaroidLabelColor}>{innerContent}</PolaroidFrame>;
      case 'newspaper': return <NewspaperFrame  br={borderRadius}>{innerContent}</NewspaperFrame>;
      case 'smarttv':   return <SmartTVFrame    br={borderRadius}>{innerContent}</SmartTVFrame>;
      case 'kindle':    return <KindleFrame     br={borderRadius}>{innerContent}</KindleFrame>;
      case 'windows':   return <WindowsFrame    br={borderRadius}>{innerContent}</WindowsFrame>;
      case 'notion':    return <NotionFrame     br={borderRadius}>{innerContent}</NotionFrame>;
      case 'retrotv':   return <RetroTVFrame    br={borderRadius}>{innerContent}</RetroTVFrame>;
      case 'figma':     return <FigmaFrame      br={borderRadius}>{innerContent}</FigmaFrame>;
      case 'iphone15':  return <IPhone15Frame   br={borderRadius}>{innerContent}</IPhone15Frame>;
      case 'android':   return <AndroidFrame    br={borderRadius}>{innerContent}</AndroidFrame>;
      case 'vision':    return <VisionProFrame  br={borderRadius}>{innerContent}</VisionProFrame>;
      case 'poster':    return <PosterFrame     br={borderRadius}>{innerContent}</PosterFrame>;
      default:          return renderImageEl(borderRadius);
    }
  };

  /* ── Color overlay ── */
  const colorOverlayEl = colorOverlayOpacity > 0 ? (
    <div style={{
      position: 'absolute', inset: 0, background: colorOverlay,
      opacity: colorOverlayOpacity / 100, borderRadius: frameBR,
      pointerEvents: 'none', zIndex: 10,
      mixBlendMode: (colorOverlayBlendMode ?? 'color') as React.CSSProperties['mixBlendMode'],
      backdropFilter: (overlayBlur ?? 0) > 0 ? `blur(${overlayBlur}px)` : undefined,
      WebkitBackdropFilter: (overlayBlur ?? 0) > 0 ? `blur(${overlayBlur}px)` : undefined,
    }} />
  ) : null;

  /* ── Duotone overlays ── */
  const duotoneEls = duotone ? (
    <>
      <div style={{ position: 'absolute', inset: 0, background: duotoneShadow, mixBlendMode: 'multiply', borderRadius: frameBR, pointerEvents: 'none', zIndex: 11 }} />
      <div style={{ position: 'absolute', inset: 0, background: duotoneHighlight, mixBlendMode: 'screen', borderRadius: frameBR, pointerEvents: 'none', zIndex: 12 }} />
    </>
  ) : null;

  /* ── Split tone overlays ── */
  const splitToneEls = splitTone ? (
    <>
      <div style={{ position: 'absolute', inset: 0, background: splitToneShadowColor ?? '#3366cc', opacity: (splitToneShadowStrength ?? 30) / 100 * 0.4, mixBlendMode: 'multiply', borderRadius: frameBR, pointerEvents: 'none', zIndex: 13 }} />
      <div style={{ position: 'absolute', inset: 0, background: splitToneHighlightColor ?? '#ffcc66', opacity: (splitToneHighlightStrength ?? 30) / 100 * 0.35, mixBlendMode: 'screen', borderRadius: frameBR, pointerEvents: 'none', zIndex: 14 }} />
    </>
  ) : null;

  /* ── Final image render ── */
  const renderFinalImage = () => {
    const shell = renderFrameShell();
    if (useGradientBorder) {
      return (
        <div style={{ padding: borderWidth, background: `linear-gradient(${bgAngle}deg, ${customBgColor1}, ${customBgColor2})`, borderRadius: frameBR + borderWidth, boxShadow: buildShadow(false), display: 'inline-flex', position: 'relative' }}>
          <div style={{ borderRadius: frameBR, overflow: 'hidden', position: 'relative', display: 'inline-flex' }}>
            {shell}{colorOverlayEl}{duotoneEls}{splitToneEls}
          </div>
        </div>
      );
    }
    if (frame !== 'none') {
      return (
        <div style={{ boxShadow: buildShadow(false), borderRadius: frameBR, border: regularBorder, display: 'inline-flex', position: 'relative' }}>
          {shell}{colorOverlayEl}{duotoneEls}{splitToneEls}
        </div>
      );
    }
    if (hasZoomPan) {
      return (
        <div style={{ position: 'relative', display: 'inline-flex', borderRadius, overflow: 'hidden', boxShadow: buildShadow(true), border: regularBorder }}>
          {shell}{colorOverlayEl}{duotoneEls}{splitToneEls}
        </div>
      );
    }
    return (
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <img src={image} alt="Screenshot" className="block w-full h-auto"
          style={{ borderRadius, boxShadow: buildShadow(true), filter: imageFilter, border: regularBorder, opacity: imgOpacity, clipPath: clipPath || undefined, transform: imgRotation !== 0 ? `rotate(${imgRotation}deg)` : undefined, ...imgOutlineStyle }}
          onLoad={e => { const t = e.currentTarget; setImgNatural({ w: t.naturalWidth, h: t.naturalHeight }); }}
          draggable={false}
        />
        {colorOverlayEl}{duotoneEls}{splitToneEls}
      </div>
    );
  };

  /* ── Text rendering helpers ── */
  const textAlignVal = (textAlign ?? 'center') as React.CSSProperties['textAlign'];
  const lsVal = (letterSpacing ?? 0) > 0 ? `${letterSpacing}px` : undefined;
  const lhVal = lineHeight ?? 1.25;
  const wsVal = (wordSpacing ?? 0) > 0 ? `${wordSpacing}px` : undefined;

  // Text spacing preset (Batch 8)
  const spacingPresetMap: Record<string, string | undefined> = {
    compact: '-0.02em', normal: undefined, wide: '0.08em', ultra: '0.2em',
  };
  const lsValFinal = lsVal ?? spacingPresetMap[textSpacingPreset ?? 'normal'];

  const getTextStyle = (size: number, color: string, weight = 400, isTitle = false): React.CSSProperties => {
    const neonShadow = isTitle && neonTextGlow
      ? `0 0 ${neonGlowIntensity ?? 60}px ${neonGlowColor ?? '#00ffff'}, 0 0 ${(neonGlowIntensity ?? 60) * 2}px ${neonGlowColor ?? '#00ffff'}, 0 0 4px ${neonGlowColor ?? '#00ffff'}`
      : undefined;
    const customDropShadow = isTitle && (textDropShadow ?? false)
      ? `${textShadowX ?? 2}px ${textShadowY ?? 2}px ${textShadowBlur ?? 8}px ${textShadowColor ?? 'rgba(0,0,0,0.6)'}`
      : undefined;

    // Batch 9 — title drop shadow (separate from neon/glitch/custom shadows)
    const titleBlurShadow = isTitle && (titleShadowBlur ?? 0) > 0
      ? `${titleShadowX ?? 0}px ${titleShadowY ?? 2}px ${titleShadowBlur}px ${titleShadowColor ?? '#000000'}`
      : undefined;

    const base: React.CSSProperties = {
      fontSize: size,
      fontFamily: isTitle && (titleFont2Enabled ?? false) && (titleFont2 ?? 'Inter') !== 'Inter'
        ? `${titleFont2}, ${titleFont}, sans-serif`
        : titleFont,
      fontWeight: weight,
      lineHeight: lhVal,
      letterSpacing: isTitle && (titleLetterSpacing ?? 0) !== 0
        ? `${(titleLetterSpacing ?? 0) / 100}em`
        : lsValFinal,
      wordSpacing: wsVal,
      textTransform: isTitle && ((titleAllCaps ?? false) || (titleCaps ?? false)) ? 'uppercase' : undefined,
      fontStyle: isTitle && (titleItalic ?? false) ? 'italic' : undefined,
      opacity: isTitle ? (titleOpacity ?? 100) / 100 : 1,
      // Batch 10 — text highlight behind title
      ...(isTitle && (textHighlight ?? false) ? {
        background: textHighlightColor ?? '#f59e0b',
        WebkitBackgroundClip: undefined,
        padding: '2px 6px',
        borderRadius: 4,
      } : {}),
    };

    // Batch 13 — outline-only title (transparent fill, stroke only)
    if (isTitle && (titleOutlineOnly ?? false)) {
      return {
        ...base,
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        WebkitTextStroke: `${titleOutlineWidth ?? 2}px ${titleOutlineColor ?? '#ffffff'}`,
      };
    }

    if (isTitle && (titleGradient ?? false)) {
      return {
        ...base,
        background: `linear-gradient(${isTitle ? (titleGradientAngle ?? textGradientAngle ?? 135) : (textGradientAngle ?? 135)}deg, ${color}, ${titleGradientColor2})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        WebkitTextStroke: (textStroke ?? 0) > 0 ? `${textStroke}px ${textStrokeColor}` : undefined,
        textDecoration: (titleUnderline ?? false) ? 'underline' : undefined,
      };
    }

    const strokeVal = isTitle && (textOutline ?? 0) > 0
      ? `${textOutline}px ${textOutlineColor ?? '#000000'}`
      : (isTitle && (textStroke ?? 0) > 0 ? `${textStroke}px ${textStrokeColor}` : undefined);

    // Text glitch chromatic shift (Batch 6)
    const glitchShadow = isTitle && (textGlitch ?? 0) > 0
      ? `${textGlitch}px 0 0 ${textGlitchColor1 ?? '#ff0000'}, -${textGlitch}px 0 0 ${textGlitchColor2 ?? '#00ffff'}`
      : undefined;

    return {
      ...base,
      color,
      WebkitTextStroke: strokeVal,
      textDecoration: isTitle && (titleUnderline ?? false) ? 'underline' : undefined,
      textShadow: glitchShadow ?? customDropShadow ?? titleBlurShadow ?? neonShadow
        // Batch 15 — neon pulse
        ?? (isTitle && (textNeonPulse ?? false)
          ? `0 0 ${(textNeonPulseIntensity ?? 60) * 0.3}px ${textNeonPulseColor ?? '#8b5cf6'}, 0 0 ${(textNeonPulseIntensity ?? 60) * 0.6}px ${textNeonPulseColor ?? '#8b5cf6'}, 0 0 ${textNeonPulseIntensity ?? 60}px ${textNeonPulseColor ?? '#8b5cf6'}80`
          : undefined)
        ?? (isTitle && (textShadowPreset ?? 'none') !== 'none' ? {
            soft:  '0 2px 8px rgba(0,0,0,0.5)',
            hard:  '2px 2px 0px rgba(0,0,0,0.9)',
            glow:  `0 0 20px ${glowColor ?? '#8b5cf6'}, 0 0 40px ${glowColor ?? '#8b5cf6'}60`,
            retro: '3px 3px 0 #000, -1px -1px 0 #000',
          }[textShadowPreset ?? ''] : undefined)
        ?? (isTitle && (titleShadow ?? false) ? '0 2px 24px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.4)' : undefined),
      // Batch 15 — box shadow on title
      ...(isTitle && (titleBoxShadow ?? false) ? {
        filter: `drop-shadow(0 4px 16px ${titleBoxShadowColor ?? '#8b5cf6'}80)`,
      } : {}),
    };
  };

  const renderTextBlock = (position: string) => {
    if ((!titleText && !subtitleText && !bodyText) || titlePosition !== position) return null;
    const hasTextBg = textBg && textBg !== 'none' && (titleText || subtitleText);

    const padStyle: React.CSSProperties = {
      paddingTop: position === 'below' ? 16 : 0,
      paddingBottom: position === 'above' ? 16 : 0,
      width: '100%', textAlign: textAlignVal,
    };
    const wrapperStyle: React.CSSProperties = hasTextBg ? {
      position: 'relative', display: 'inline-block',
      padding: textBg === 'pill' ? '6px 20px' : '8px 14px',
      borderRadius: textBg === 'pill' ? 999 : 8,
      background: `${textBgColor ?? '#000000'}${Math.round((textBgOpacity ?? 50) / 100 * 255).toString(16).padStart(2, '0')}`,
    } : (textBgGradient ?? false) ? {
      // Batch 15 — gradient behind text
      display: 'inline-block', padding: '8px 16px', borderRadius: 10,
      background: `linear-gradient(135deg, ${textBgGradientColor1 ?? '#8b5cf6'}80, ${textBgGradientColor2 ?? '#ec4899'}80)`,
    } : {};
    const rotateStyle: React.CSSProperties = (textRotation ?? 0) !== 0
      ? { transform: `rotate(${textRotation}deg)`, display: 'inline-block' }
      : {};
    // textBoxPadding: extra padding around the whole text block (Batch 7)
    const boxPadStyle: React.CSSProperties = {
      ...((textBoxPadding ?? 0) > 0
        ? { padding: textBoxPadding }
        : (titleBackground ? { padding: titleBackgroundPadding ?? 12 } : {})),
      ...(titleBackground ? { background: titleBackgroundColor ?? 'rgba(0,0,0,0.5)', width: '100%' } : {}),
      // Batch 11 — border around text box
      ...((textBoxBorder ?? false) ? {
        border: `${textBoxBorderWidth ?? 1}px solid ${textBoxBorderColor ?? '#8b5cf6'}`,
        borderRadius: textBoxBorderRadius ?? 8,
        padding: Math.max(textBoxPadding ?? 0, 8),
      } : {}),
      // Batch 17 — neon border glow on text box
      ...((textNeonBorder ?? false) ? {
        boxShadow: `0 0 12px ${textNeonBorderColor ?? '#8b5cf6'}, 0 0 24px ${textNeonBorderColor ?? '#8b5cf6'}40`,
        border: `1px solid ${textNeonBorderColor ?? '#8b5cf6'}70`,
        borderRadius: 8,
        padding: Math.max(textBoxPadding ?? 0, 8),
      } : {}),
      // Batch 18 — text outline stroke box
      ...((textOutlineStroke ?? false) ? {
        WebkitTextStroke: `1.5px ${textOutlineStrokeColor ?? '#8b5cf6'}`,
      } : {}),
      // Batch 19 — full-width highlight block behind title
      ...((textHighlightBlock ?? false) ? {
        background: `${textHighlightBlockColor ?? '#8b5cf6'}30`,
        borderLeft: `3px solid ${textHighlightBlockColor ?? '#8b5cf6'}`,
        paddingLeft: Math.max(textBoxPadding ?? 0, 10),
        paddingTop: 6, paddingBottom: 6,
        borderRadius: 4,
      } : {}),
      // Batch 21 — glow box around text block
      ...((textGlowBox ?? false) ? {
        boxShadow: `0 0 20px ${textGlowBoxColor ?? '#8b5cf6'}60, 0 0 50px ${textGlowBoxColor ?? '#8b5cf6'}30`,
      } : {}),
      // Batch 25 — blurred backdrop behind title area
      ...((titleBackdropBlur ?? false) ? {
        background: `${titleBackdropBlurColor ?? '#000000'}55`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: 8,
        padding: Math.max(textBoxPadding ?? 0, 10),
      } : {}),
      // Batch 23 — frosted glass panel behind text
      ...((textBoxGlass ?? false) ? {
        background: `rgba(255,255,255,${((textBoxGlassOpacity ?? 50) / 100) * 0.12})`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 12,
        padding: Math.max(textBoxPadding ?? 0, 12),
      } : {}),
    };

    return (
      <div className="relative z-[2]" style={padStyle}>
        {/* Tag line above title (Batch 7) */}
        {(tagLine ?? '') && (
          <div style={{ marginBottom: 8, textAlign: textAlignVal }}>
            <span style={{
              display: 'inline-block', padding: '3px 12px', borderRadius: 999,
              background: tagLineBg ?? '#8b5cf6', color: tagLineColor ?? '#ffffff',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}>{tagLine}</span>
          </div>
        )}
        <div style={boxPadStyle}>
          <div style={{ ...wrapperStyle, ...rotateStyle, ...((titleGlitch ?? false) ? { position: 'relative' } : {}) }}>
            {/* Quote style — large decorative marks (Batch 13) */}
            {(quoteStyle ?? false) && titleText && (
              <div style={{ fontSize: titleSize * 2.5, lineHeight: 0.6, color: quoteMarkColor ?? '#8b5cf6', opacity: 0.6, fontFamily: 'Georgia, serif', marginBottom: 4 }}>"</div>
            )}
            {titleText && (() => {
              const ts = getTextStyle(titleSize, titleColor, titleWeight === 'normal' ? 400 : 700, true);
              // Batch 36 — 3D extruded title: stacked offset shadows for depth
              if (titleOutline3D ?? false) {
                const c3 = titleOutline3DColor ?? '#8b5cf6';
                const existing = ts.textShadow ? `${ts.textShadow}, ` : '';
                ts.textShadow = `${existing}1px 1px 0 ${c3}, 2px 2px 0 ${c3}cc, 3px 3px 0 ${c3}99, 4px 4px 0 ${c3}66, 5px 5px 8px ${c3}44`;
              }
              // Batch 36 — soft glow: ambient bloom glow around text
              if (textGlowSoft ?? false) {
                const existing = ts.textShadow ? `${ts.textShadow}, ` : '';
                ts.textShadow = `${existing}0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor`;
                ts.filter = 'drop-shadow(0 0 8px currentColor)';
              }
              // Batch 35 — blink: slow pulsing opacity like a cursor
              if (titleBlink ?? false) ts.animation = 'flicker 1.5s step-start infinite';
              // Batch 34 — chromatic aberration: red/blue offset shadow illusion
              if (textChromatic ?? false) {
                const existingShadow = ts.textShadow ? `${ts.textShadow}, ` : '';
                ts.textShadow = `${existingShadow}-2px 0 3px rgba(255,0,80,0.8), 2px 0 3px rgba(0,200,255,0.8)`;
              }
              // Batch 33 — double outline: layered text-stroke trick for doubled ring
              if (textOutlineDouble ?? false) {
                const doc = textOutlineDoubleColor ?? '#8b5cf6';
                ts.WebkitTextStroke = `3px ${doc}`;
                ts.textShadow = `0 0 0 6px ${doc}60`;
                ts.paintOrder = 'stroke fill';
              }
              // Batch 32 — extra bold/black weight
              if (textExtraBold ?? false) ts.fontWeight = 900;
              // Batch 32 — neon glowing box around title
              if (titleNeonBox ?? false) {
                const nbc = titleNeonBoxColor ?? '#00ffff';
                ts.border = `2px solid ${nbc}`;
                ts.padding = '6px 14px';
                ts.boxShadow = `0 0 10px ${nbc}, 0 0 20px ${nbc}60, inset 0 0 10px ${nbc}20`;
                ts.borderRadius = 4;
              }
              // Batch 31 — cursive/script font on title
              if (textCursive ?? false) ts.fontFamily = 'Georgia, "Times New Roman", cursive, serif';
              // Batch 31 — flickering neon animation
              if (titleFlicker ?? false) ts.animation = 'flicker 3s linear infinite';
              // Batch 30 — stencil: wide tracking + uppercase
              if (textStencil ?? false) { ts.letterSpacing = '0.3em'; ts.textTransform = 'uppercase'; ts.fontWeight = 700; }
              // Batch 30 — ghost: phantom offset shadow behind title
              if (titleGhost ?? false) {
                const gc = titleGhostColor ?? '#8b5cf6';
                const existingShadow = ts.textShadow ? `${ts.textShadow}, ` : '';
                ts.textShadow = `${existingShadow}6px 6px 0px ${gc}55, 10px 10px 0px ${gc}22`;
              }
              // Batch 29 — wavy underline on title
              if (textUnderlineWave ?? false) ts.textDecoration = 'underline wavy';
              // Batch 28 — force italic on title
              if (textItalicForce ?? false) ts.fontStyle = 'italic';
              // Batch 28 — split two-tone title (early return, must be after skewStyle)
              // (handled below after skewStyle declaration)
              // Batch 27 — rainbow spectrum gradient on title
              if (titleRainbow ?? false) {
                ts.background = 'linear-gradient(90deg, #ff0000, #ff8c00, #ffd700, #00c800, #0088ff, #8800ff)';
                ts.WebkitBackgroundClip = 'text';
                ts.WebkitTextFillColor = 'transparent';
                ts.backgroundClip = 'text';
              }
              // Batch 27 — hard sharp drop shadow (no blur)
              if (textShadowHard ?? false) {
                const hsc = textShadowHardColor ?? '#000000';
                const existingShadow = ts.textShadow ? `${ts.textShadow}, ` : '';
                ts.textShadow = `${existingShadow}3px 3px 0px ${hsc}`;
              }
              // Batch 26 — neon pulse: soft animated glow cycle on title
              if (titleNeonPulse ?? false) {
                ts.textShadow = `0 0 8px #a78bfa, 0 0 20px #a78bfa80, 0 0 40px #7c3aed60`;
                ts.animation = 'neon-pulse 2.2s ease-in-out infinite';
              }
              // Batch 26 — small caps font variant
              if (textSmallCaps ?? false) ts.fontVariant = 'small-caps';
              // Batch 20 — neon sign glow on title
              if (titleNeonSign ?? false) {
                const nc = titleNeonSignColor ?? '#00ffff';
                ts.textShadow = `0 0 7px ${nc}, 0 0 14px ${nc}, 0 0 30px ${nc}, 0 0 60px ${nc}80`;
                ts.color = nc;
              }
              // Batch 20 — wide kerning preset
              if (textKerningWide ?? false) ts.letterSpacing = '0.25em';
              // Batch 23 — double layered text shadow for depth
              if (titleShadowDouble ?? false) {
                const sc = titleShadowDoubleColor ?? '#8b5cf6';
                const existing = ts.textShadow ? `${ts.textShadow}, ` : '';
                ts.textShadow = `${existing}2px 2px 0px ${sc}, 5px 5px 0px ${sc}60`;
              }
              // Batch 22 — glowing outline only (no fill)
              if (titleOutlineGlow ?? false) {
                const ogc = titleOutlineGlowColor ?? '#00ffff';
                ts.color = 'transparent';
                ts.WebkitTextStroke = `1.5px ${ogc}`;
                ts.textShadow = `0 0 8px ${ogc}, 0 0 20px ${ogc}80`;
              }
              // Batch 22 — force uppercase
              if (textUppercase ?? false) ts.textTransform = 'uppercase';
              // Batch 21 — strikethrough decoration
              if (titleStrikethrough ?? false) ts.textDecoration = 'line-through';
              // Batch 21 — flip title horizontally
              if (titleFlipText ?? false) ts.transform = 'scaleX(-1)';
              const skewStyle = (titleSkew ?? 0) !== 0 ? { transform: `skewX(${titleSkew}deg)`, display: 'inline-block' } : {};
              // Batch 34 — cinematic: letterbox bars above/below title text
              if (titleCinematic ?? false) {
                return (
                  <div style={{ ...ts, ...skewStyle, position: 'relative', padding: '12px 0' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: '#000000cc' }} />
                    {titleText}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 12, background: '#000000cc' }} />
                  </div>
                );
              }
              // Batch 33 — wave title: each character vertically offset in a sin wave
              if (titleWave ?? false) {
                const justify = textAlignVal === 'center' ? 'center' : textAlignVal === 'right' ? 'flex-end' : 'flex-start';
                return (
                  <div style={{ ...ts, ...skewStyle, display: 'flex', flexWrap: 'wrap', justifyContent: justify, background: undefined, WebkitBackgroundClip: undefined, WebkitTextFillColor: undefined }}>
                    {titleText.split('').map((ch, i) => (
                      <span key={i} style={{ display: 'inline-block', transform: `translateY(${(Math.sin(i * 1.2) * 6).toFixed(1)}px) rotate(${(Math.sin(i * 0.8) * 3).toFixed(1)}deg)` }}>
                        {ch === ' ' ? '\u00a0' : ch}
                      </span>
                    ))}
                  </div>
                );
              }
              // Batch 28 — split two-tone title (first half one color, second half another)
              if (titleSplit ?? false) {
                const half = Math.ceil(titleText.length / 2);
                const colorA = titleColor ?? '#ffffff';
                const colorB = titleSplitColorB ?? '#ec4899';
                return (
                  <span style={{ ...ts, ...skewStyle, background: undefined, WebkitBackgroundClip: undefined, WebkitTextFillColor: undefined, color: undefined }}>
                    <span style={{ color: colorA }}>{titleText.slice(0, half)}</span>
                    <span style={{ color: colorB }}>{titleText.slice(half)}</span>
                  </span>
                );
              }
              // Batch 25 — wide word spacing
              if (titleWordSpacingWide ?? false) ts.wordSpacing = '0.5em';
              // Batch 24 — bouncy wave baseline per character
              if (titleBounce ?? false) {
                const justify = textAlignVal === 'center' ? 'center' : textAlignVal === 'right' ? 'flex-end' : 'flex-start';
                return (
                  <div style={{ ...ts, ...skewStyle, display: 'flex', flexWrap: 'wrap', justifyContent: justify, background: undefined, WebkitBackgroundClip: undefined, WebkitTextFillColor: undefined }}>
                    {titleText.split('').map((ch, i) => (
                      <span key={i} style={{ display: 'inline-block', transform: `translateY(${(Math.sin(i * 0.85) * 5).toFixed(1)}px)` }}>
                        {ch === ' ' ? '\u00a0' : ch}
                      </span>
                    ))}
                  </div>
                );
              }
              if (titleDropCap ?? false) {
                const [first, ...rest] = titleText;
                return (
                  <div style={{ ...ts, ...skewStyle }}>
                    <span style={{ float: 'left', fontSize: titleSize * 2.2, lineHeight: 0.75, marginRight: 4, fontWeight: 900, paddingTop: 4 }}>{first}</span>
                    {rest.join('')}
                  </div>
                );
              }
              return <div style={{ ...ts, ...skewStyle }}>{titleText}</div>;
            })()}
            {(quoteStyle ?? false) && titleText && (
              <div style={{ fontSize: titleSize * 2.5, lineHeight: 0.6, color: quoteMarkColor ?? '#8b5cf6', opacity: 0.6, fontFamily: 'Georgia, serif', textAlign: 'right', marginTop: 4 }}>"</div>
            )}
            {/* Batch 19 — title glitch offset layers */}
            {(titleGlitch ?? false) && titleText && (() => {
              const ts = getTextStyle(titleSize, titleGlitchColor ?? '#ec4899', titleWeight === 'normal' ? 400 : 700, true);
              return (
                <>
                  <div style={{ ...ts, position: 'absolute', top: 0, left: 0, right: 0, transform: 'translate(-2px, 1px)', opacity: 0.6, mixBlendMode: 'screen', pointerEvents: 'none' }}>{titleText}</div>
                  <div style={{ ...ts, position: 'absolute', top: 0, left: 0, right: 0, transform: 'translate(2px, -1px)', opacity: 0.5, mixBlendMode: 'screen', filter: 'hue-rotate(180deg)', pointerEvents: 'none' }}>{titleText}</div>
                </>
              );
            })()}
            {/* Batch 18 — typewriter cursor underline */}
            {(titleTypewriter ?? false) && titleText && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <div style={{ flex: 1, height: 2, background: titleTypewriterColor ?? '#a78bfa', borderRadius: 1 }} />
                <div style={{ width: 10, height: titleSize * 0.9, background: titleTypewriterColor ?? '#a78bfa', opacity: 0.85, borderRadius: 1 }} />
              </div>
            )}
            {/* Text reveal bar (Batch 14) */}
            {(textReveal ?? false) && titleText && (
              <div style={{
                height: 3, borderRadius: 2,
                background: textRevealColor ?? '#8b5cf6',
                marginTop: 6, width: '40%',
                boxShadow: `0 0 12px ${textRevealColor ?? '#8b5cf6'}`,
              }} />
            )}
            {/* Line accent divider (Batch 8) */}
            {(lineAccent ?? false) && titleText && subtitleText && (
              <div style={{
                height: lineAccentHeight ?? 2,
                width: `${lineAccentWidth ?? 60}%`,
                background: lineAccentColor ?? '#ffffff',
                margin: '6px auto',
                borderRadius: 2,
              }} />
            )}
            {/* Subtitle — Batch 9 adds opacity + gradient2 option */}
            {subtitleText && (() => {
              const subStyle: React.CSSProperties = {
                ...getTextStyle(subtitleSize, subtitleColor, (subtitleBold ?? false) ? 700 : 400),
                textTransform: (subtitleAllCaps ?? false) ? 'uppercase' : undefined,
                opacity: (subtitleOpacity ?? 100) / 100,
                fontStyle: (subtitleItalic ?? false) ? 'italic' : undefined,
                textDecoration: (subtitleUnderline ?? false) ? 'underline' : undefined,
                // Batch 10 — separate subtitle font
                fontFamily: (subtitleFont ?? 'Inter') !== 'Inter' ? subtitleFont : undefined,
              };
              if (gradientText2 ?? false) {
                subStyle.background = `linear-gradient(135deg, ${gradientText2Color1 ?? '#ec4899'}, ${gradientText2Color2 ?? '#f59e0b'})`;
                subStyle.WebkitBackgroundClip = 'text';
                subStyle.WebkitTextFillColor = 'transparent';
                subStyle.backgroundClip = 'text';
              }
              // Batch 17 — subtitle gradient (separate from gradientText2)
              if (subtitleGradient ?? false) {
                subStyle.background = `linear-gradient(135deg, ${subtitleColor}, ${subtitleGradientColor2 ?? '#ec4899'})`;
                subStyle.WebkitBackgroundClip = 'text';
                subStyle.WebkitTextFillColor = 'transparent';
                subStyle.backgroundClip = 'text';
              }
              return <div style={subStyle}>{subtitleText}</div>;
            })()}
            {bodyText && <div style={{ fontSize: bodyTextSize ?? bodySize, color: bodyTextColor ?? bodyColor, fontFamily: titleFont, fontWeight: 400, marginTop: subtitleText ? 6 : titleText ? 4 : 0, lineHeight: lhVal, wordSpacing: wsVal }}>{bodyText}</div>}
          </div>
        </div>
      </div>
    );
  };

  /* ── Background processing ── */
  const patternBg = bgPattern !== 'none' ? getPatternSvg(bgPattern, bgPatternOpacity, patternScale ?? 20) : undefined;
  // Pattern color tint (Batch 8) — color overlay on top of pattern
  const patternColorTint = patternBg && (bgPatternColorEnabled ?? false) ? bgPatternColor ?? '#ffffff' : null;

  return (
    <div className="flex items-center justify-center w-full">
      {/* SVG filter defs */}
      {((glitch ?? 0) > 0 || (pixelate ?? 0) > 0) && (
        <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            {(glitch ?? 0) > 0 && (
              <filter id="glitch-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.04 0.02" numOctaves="1" seed="8" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale={glitch * 0.8} xChannelSelector="R" yChannelSelector="G" />
              </filter>
            )}
            {(pixelate ?? 0) > 0 && (
              <filter id="pixelate-filter">
                <feFlood x="4" y="4" height="2" width="2" />
                <feComposite width={pixBlock} height={pixBlock} />
                <feTile result="a" />
                <feComposite in="SourceGraphic" in2="a" operator="in" />
                <feMorphology operator="dilate" radius={Math.max(1, Math.floor(pixBlock / 2))} />
              </filter>
            )}
          </defs>
        </svg>
      )}

      {/* Layered cards behind canvas (Batch 16) */}
      {(bgLayeredCards ?? false) && (() => {
        const count = Math.min(bgLayeredCardsCount ?? 3, 4);
        const col = bgLayeredCardsColor ?? '#1a1a2e';
        return (
          <div style={{ position: 'absolute', width: canvasStyle.width, height: canvasStyle.height, pointerEvents: 'none' }}>
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} style={{
                position: 'absolute', inset: 0,
                background: col,
                borderRadius: canvasBR,
                transform: `translate(${(i + 1) * 6}px, ${(i + 1) * 6}px) scale(${1 - (i + 1) * 0.02})`,
                opacity: 0.45 - i * 0.1,
              }} />
            ))}
          </div>
        );
      })()}

      {/* Card stack behind canvas (Batch 9) */}
      {(cardStack ?? false) && (() => {
        const off = cardStackOffset ?? 8;
        const col = cardStackColor ?? '#1a1a2e';
        return (
          <div style={{ position: 'absolute', width: canvasStyle.width, height: canvasStyle.height, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: 0, background: col, borderRadius: canvasBR, transform: `translate(${off}px, ${off}px)`, opacity: 0.55 }} />
            <div style={{ position: 'absolute', inset: 0, background: col, borderRadius: canvasBR, transform: `translate(${off * 0.5}px, ${off * 0.5}px)`, opacity: 0.35 }} />
          </div>
        );
      })()}

      <div ref={canvasRef} className="relative inline-flex flex-col items-center justify-center" style={canvasStyle}>

        {/* BG opacity overlay */}
        {(bgOpacity ?? 100) < 100 && (
          <div className="absolute inset-0 pointer-events-none z-0" style={{ background, opacity: (bgOpacity ?? 100) / 100 }} />
        )}

        {/* Background image */}
        {bgImage && (
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            style={{ filter: bgBlur > 0 ? `blur(${bgBlur}px)` : undefined, transform: bgBlur > 0 ? 'scale(1.08)' : undefined, opacity: (bgOpacity ?? 100) / 100 }}
            draggable={false}
          />
        )}

        {/* Background tint (Batch 3) */}
        {(bgTint ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: bgTintColor ?? '#8b5cf6', opacity: (bgTint ?? 0) / 100, mixBlendMode: 'color' }} />
        )}

        {/* Animated gradient shimmer (Batch 14) — static 3-stop shimmer */}
        {(bgAnimatedGradient ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.07) 70%, transparent 100%)',
            mixBlendMode: 'overlay',
          }} />
        )}

        {/* Bubbles background (Batch 17) */}
        {(bgBubbles ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[2]" style={{
            backgroundImage: [
              `radial-gradient(circle 60px at 10% 30%, ${bgBubblesColor ?? '#ffffff'}25 0%, transparent 65%)`,
              `radial-gradient(circle 40px at 30% 70%, ${bgBubblesColor ?? '#ffffff'}18 0%, transparent 65%)`,
              `radial-gradient(circle 80px at 60% 15%, ${bgBubblesColor ?? '#ffffff'}12 0%, transparent 65%)`,
              `radial-gradient(circle 35px at 80% 60%, ${bgBubblesColor ?? '#ffffff'}20 0%, transparent 65%)`,
              `radial-gradient(circle 55px at 50% 85%, ${bgBubblesColor ?? '#ffffff'}15 0%, transparent 65%)`,
              `radial-gradient(circle 30px at 90% 25%, ${bgBubblesColor ?? '#ffffff'}22 0%, transparent 65%)`,
            ].join(', '),
            opacity: (bgBubblesOpacity ?? 15) / 100,
          }} />
        )}

        {/* Retro horizontal lines (Batch 17) */}
        {(overlayRetroLines ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 6px, ${overlayRetroLinesColor ?? '#ff6b6b'}60 6px, ${overlayRetroLinesColor ?? '#ff6b6b'}60 7px)`,
            opacity: (overlayRetroLinesOpacity ?? 20) / 100,
          }} />
        )}

        {/* Canvas stamp (Batch 17) */}
        {(canvasStamp ?? false) && (canvasStampText ?? '').length > 0 && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', zIndex: 42, pointerEvents: 'none',
            transform: 'translate(-50%,-50%) rotate(-25deg)',
            border: `4px solid ${canvasStampColor ?? '#ef4444'}`,
            borderRadius: 8,
            color: canvasStampColor ?? '#ef4444',
            background: (canvasStampBg ?? 'transparent') !== 'transparent' ? canvasStampBg : 'transparent',
            fontSize: 32, fontWeight: 900, letterSpacing: '0.12em',
            textTransform: 'uppercase', fontFamily: 'Inter, system-ui',
            padding: '6px 20px',
            opacity: 0.6,
            whiteSpace: 'nowrap',
          }}>
            {canvasStampText ?? 'APPROVED'}
          </div>
        )}

        {/* Canvas ribbon diagonal (Batch 17) */}
        {(canvasRibbon ?? false) && (canvasRibbonText ?? '').length > 0 && (() => {
          return (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 43, pointerEvents: 'none', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: '50%', left: '-60%', width: '220%',
                background: canvasRibbonBg ?? '#ec4899',
                color: canvasRibbonColor ?? '#ffffff',
                fontSize: 11, fontWeight: 800, letterSpacing: '0.15em',
                textTransform: 'uppercase', fontFamily: 'Inter, system-ui',
                padding: '7px 0', textAlign: 'center',
                transform: 'rotate(-15deg)',
                opacity: 0.85,
              }}>
                {Array(6).fill(canvasRibbonText ?? 'NEW').join('  ·  ')}
              </div>
            </div>
          );
        })()}

        {/* Color leak top-left (Batch 17) */}
        {(imageColorLeakTop ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[10]" style={{
            background: `radial-gradient(ellipse 55% 40% at 0% 0%, ${imageColorLeakColor ?? '#ff8c00'}50 0%, transparent 65%)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Haze overlay (Batch 16) */}
        {(overlayHaze ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[6]" style={{
            background: `radial-gradient(ellipse 100% 80% at 50% 100%, ${overlayHazeColor ?? '#c8d8ff'} 0%, transparent 70%)`,
            opacity: (overlayHazeOpacity ?? 30) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Bokeh overlay (Batch 16) */}
        {(overlayBokeh ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[7]" style={{
            backgroundImage: [
              `radial-gradient(circle 40px at 15% 20%, ${overlayBokehColor ?? '#ffffff'}40 0%, transparent 70%)`,
              `radial-gradient(circle 25px at 75% 15%, ${overlayBokehColor ?? '#ffffff'}30 0%, transparent 70%)`,
              `radial-gradient(circle 55px at 85% 55%, ${overlayBokehColor ?? '#ffffff'}20 0%, transparent 70%)`,
              `radial-gradient(circle 35px at 25% 75%, ${overlayBokehColor ?? '#ffffff'}35 0%, transparent 70%)`,
              `radial-gradient(circle 20px at 60% 85%, ${overlayBokehColor ?? '#ffffff'}25 0%, transparent 70%)`,
              `radial-gradient(circle 45px at 40% 40%, ${overlayBokehColor ?? '#ffffff'}15 0%, transparent 70%)`,
            ].join(', '),
            opacity: (overlayBokehOpacity ?? 20) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Prismatic overlay (Batch 16) */}
        {(overlayPrismatic ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[8]" style={{
            background: 'linear-gradient(135deg, rgba(255,0,128,0.15) 0%, rgba(255,128,0,0.1) 20%, rgba(255,255,0,0.08) 35%, rgba(0,255,128,0.1) 50%, rgba(0,128,255,0.12) 65%, rgba(128,0,255,0.15) 80%, rgba(255,0,255,0.1) 100%)',
            opacity: (overlayPrismaticOpacity ?? 25) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Upper band (Batch 16) */}
        {(textUpperBand ?? false) && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 41, pointerEvents: 'none',
            background: textUpperBandBg ?? '#8b5cf6',
            color: textUpperBandColor ?? '#ffffff',
            fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase', fontFamily: 'Inter, system-ui',
            padding: '6px 16px',
            textAlign: 'center',
          }}>
            {(textUpperBandText ?? '').length > 0 ? textUpperBandText : '★  ANNOUNCEMENT  ★'}
          </div>
        )}

        {/* Aurora overlay (Batch 15) */}
        {(overlayAurora ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[4]" style={{
            background: `radial-gradient(ellipse 120% 60% at 20% 0%, ${overlayAuroraColor1 ?? '#10b981'}60 0%, transparent 60%), radial-gradient(ellipse 100% 50% at 80% 10%, ${overlayAuroraColor2 ?? '#8b5cf6'}50 0%, transparent 55%)`,
            opacity: (overlayAuroraOpacity ?? 40) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Rainbow overlay (Batch 15) */}
        {(overlayRainbow ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[5]" style={{
            background: 'linear-gradient(135deg, #ff000022 0%, #ff7f0022 14%, #ffff0022 28%, #00ff0022 42%, #0000ff22 57%, #8b00ff22 71%, #ff00ff22 85%, #ff000022 100%)',
            opacity: (overlayRainbowOpacity ?? 30) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Canvas grain overlay (Batch 15) */}
        {(canvasGrain ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[40]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cg'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cg)'/%3E%3C/svg%3E")`,
            opacity: (canvasGrainOpacity ?? 20) / 100,
            mixBlendMode: 'overlay',
          }} />
        )}

        {/* Pattern overlay */}
        {patternBg && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{ backgroundImage: patternBg, backgroundRepeat: 'repeat' }} />
        )}
        {/* Pattern color tint (Batch 8) */}
        {patternColorTint && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: patternColorTint, opacity: 0.35, mixBlendMode: 'color' }} />
        )}

        {/* Stripe background (Batch 9) */}
        {(stripeBg ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `repeating-linear-gradient(${stripeBgAngle ?? 45}deg, ${stripeBgColor1 ?? '#1a1a2e'} 0px, ${stripeBgColor1 ?? '#1a1a2e'} 20px, ${stripeBgColor2 ?? '#16213e'} 20px, ${stripeBgColor2 ?? '#16213e'} 40px)`,
          }} />
        )}

        {/* Polka dot overlay (Batch 9) */}
        {(overlayDots ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[29]" style={{
            backgroundImage: `radial-gradient(circle, ${overlayDotsColor ?? '#ffffff'} ${overlayDotsSize ?? 4}px, transparent ${overlayDotsSize ?? 4}px)`,
            backgroundSize: `${(overlayDotsSize ?? 4) * 8}px ${(overlayDotsSize ?? 4) * 8}px`,
            opacity: (overlayDotsOpacity ?? 10) / 100,
          }} />
        )}

        {/* Noise overlay */}
        {bgNoise > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[1]"
            style={{ opacity: bgNoise / 100, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        )}

        {/* Title above */}
        {renderTextBlock('above')}

        {/* Main image with transforms */}
        <div className="relative z-[2]" style={{
          transform: imageTransform, transition: 'transform 0.2s ease',
          maxWidth: (frame === 'phone' || frame === 'samsung') ? 320 : '100%',
          filter: (pixelate ?? 0) > 0 ? `url(#pixelate-filter)` : ((glitch ?? 0) > 0 ? `url(#glitch-filter)` : undefined),
          mixBlendMode: (imageBlendMode ?? 'normal') !== 'normal' ? (imageBlendMode as React.CSSProperties['mixBlendMode']) : undefined,
        }}>
          {renderFinalImage()}

          {/* Reflection */}
          {reflection && (
            <div className="pointer-events-none overflow-hidden" style={{
              transform: 'scaleY(-1)',
              maskImage: `linear-gradient(to bottom, rgba(0,0,0,${(reflectionOpacity ?? 35) / 100 * 0.8}), transparent ${reflectionHeight ?? 60}%)`,
              WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,${(reflectionOpacity ?? 35) / 100 * 0.8}), transparent ${reflectionHeight ?? 60}%)`,
              maxHeight: (reflectionHeight ?? 60) * 2, marginTop: reflectionGap ?? 2,
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

        {/* Tilt shift effect (miniature) */}
        {(tiltShift ?? false) && (tiltShiftBlur ?? 0) > 0 && (
          <>
            <div className="absolute left-0 right-0 top-0 pointer-events-none z-[16]" style={{
              height: `${Math.max(0, (tiltShiftCenter ?? 50) - (tiltShiftRange ?? 30) / 2)}%`,
              backdropFilter: `blur(${tiltShiftBlur ?? 10}px)`, WebkitBackdropFilter: `blur(${tiltShiftBlur ?? 10}px)`,
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 80%, transparent 100%)',
            }} />
            <div className="absolute left-0 right-0 bottom-0 pointer-events-none z-[16]" style={{
              height: `${Math.max(0, 100 - (tiltShiftCenter ?? 50) - (tiltShiftRange ?? 30) / 2)}%`,
              backdropFilter: `blur(${tiltShiftBlur ?? 10}px)`, WebkitBackdropFilter: `blur(${tiltShiftBlur ?? 10}px)`,
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 80%, transparent 100%)',
            }} />
          </>
        )}

        {/* Depth of field (radial blur — edges blurred, center sharp) */}
        {(depthOfField ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[17]" style={{
            backdropFilter: `blur(${Math.round(16 - (depthOfFieldRadius ?? 40) * 0.12)}px)`,
            WebkitBackdropFilter: `blur(${Math.round(16 - (depthOfFieldRadius ?? 40) * 0.12)}px)`,
            maskImage: `radial-gradient(circle ${depthOfFieldRadius ?? 40}% at 50% 50%, transparent 0%, transparent ${Math.round((depthOfFieldRadius ?? 40) * 0.5)}%, black 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${depthOfFieldRadius ?? 40}% at 50% 50%, transparent 0%, transparent ${Math.round((depthOfFieldRadius ?? 40) * 0.5)}%, black 100%)`,
          }} />
        )}

        {/* Bloom effect (center glow) */}
        {(bloomEffect ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[18]" style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,${((bloomEffect ?? 0) / 100 * 0.3).toFixed(2)}) 0%, rgba(255,255,255,${((bloomEffect ?? 0) / 100 * 0.1).toFixed(2)}) 40%, transparent 70%)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Spotlight (center brightening) */}
        {(spotlight ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[19]" style={{
            background: `radial-gradient(ellipse 70% 70% at ${spotlightX ?? 50}% ${spotlightY ?? 50}%, rgba(255,255,255,${(spotlight / 100 * 0.25).toFixed(2)}) 0%, transparent 70%)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Burn effect (dark corners) */}
        {(burnEffect ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[19]" style={{
            background: `radial-gradient(ellipse 120% 120% at 50% 50%, transparent ${Math.max(0, 40 - (burnEffect ?? 0) * 0.4)}%, rgba(0,0,0,${Math.min(0.95, (burnEffect ?? 0) / 100 * 1.2).toFixed(2)}) 100%)`,
            mixBlendMode: 'multiply',
          }} />
        )}

        {/* Sunburst rays */}
        {(sunburst ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[19]" style={{
            background: `repeating-conic-gradient(from 0deg at ${sunburstX ?? 50}% ${sunburstY ?? 50}%, ${sunburstColor ?? '#ffee88'}${Math.round((sunburst ?? 0) / 100 * 60).toString(16).padStart(2, '0')} 0deg, transparent 4deg, transparent 9deg)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Light leak */}
        {(lightLeak ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[20]" style={{ background: getLightLeakGradient(lightLeakAngle ?? 315, lightLeak), mixBlendMode: 'screen' }} />
        )}

        {/* Prism / rainbow effect */}
        {(prismEffect ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[20]" style={{
            background: `linear-gradient(135deg, rgba(255,0,0,0.15), rgba(255,165,0,0.15), rgba(255,255,0,0.12), rgba(0,200,80,0.12), rgba(0,100,255,0.15), rgba(100,0,200,0.15), rgba(220,100,220,0.12))`,
            opacity: (prismEffect ?? 0) / 100, mixBlendMode: 'screen',
          }} />
        )}

        {/* Gradient map (tone-map dark→color1, light→color2) */}
        {(gradientMap ?? false) && (
          <>
            <div className="absolute inset-0 pointer-events-none z-[20]" style={{ background: gradientMapColor1 ?? '#000000', mixBlendMode: 'multiply' }} />
            <div className="absolute inset-0 pointer-events-none z-[20]" style={{ background: gradientMapColor2 ?? '#ffffff', mixBlendMode: 'screen' }} />
          </>
        )}

        {/* Retro wave / vaporwave gradient */}
        {(retroWave ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[20]" style={{
            background: `linear-gradient(${retroWaveAngle ?? 0}deg, rgba(255,0,255,0.35) 0%, rgba(0,200,255,0.3) 33%, rgba(120,0,255,0.3) 66%, rgba(255,100,0,0.3) 100%)`,
            opacity: (retroWaveOpacity ?? 60) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Fog */}
        {(fog ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[20]" style={{ background: `radial-gradient(ellipse 150% 150% at 50% 50%, rgba(220,230,240,${(fog / 100 * 0.55).toFixed(2)}) 0%, transparent 70%)` }} />
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

        {/* Paper texture (Batch 3) */}
        {(paperTexture ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[20]" style={{
            opacity: (paperTexture ?? 0) / 100 * 0.6,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            mixBlendMode: 'multiply',
          }} />
        )}

        {/* Lens flare */}
        {(lensFlare ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[22]" style={{ overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: `${lensFlareX ?? 20}%`, top: `${lensFlareY ?? 15}%`, transform: 'translate(-50%, -50%)', width: lensFlare * 3, height: lensFlare * 3, background: `radial-gradient(circle, rgba(255,255,240,${(lensFlare / 100 * 0.9).toFixed(2)}) 0%, rgba(255,220,100,${(lensFlare / 100 * 0.4).toFixed(2)}) 30%, transparent 70%)`, borderRadius: '50%', mixBlendMode: 'screen' }} />
            <div style={{ position: 'absolute', left: `${100 - (lensFlareX ?? 20)}%`, top: `${100 - (lensFlareY ?? 15)}%`, transform: 'translate(-50%, -50%)', width: lensFlare * 1.5, height: lensFlare * 1.5, background: `radial-gradient(circle, rgba(100,180,255,${(lensFlare / 100 * 0.4).toFixed(2)}) 0%, transparent 60%)`, borderRadius: '50%', mixBlendMode: 'screen' }} />
          </div>
        )}

        {/* Noise on image */}
        {(noiseOnImage ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[23]" style={{
            opacity: (noiseOnImage ?? 0) / 100 * 0.5,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px', mixBlendMode: 'overlay',
          }} />
        )}

        {/* Logo overlay */}
        {logoImage && (logoOpacity ?? 100) > 0 && (
          <div style={{ position: 'absolute', zIndex: 26, opacity: (logoOpacity ?? 100) / 100, ...getLogoPositionStyle(logoPosition ?? 'br', logoPadding ?? 16) }}>
            <img src={logoImage} alt="Logo" draggable={false} style={{ width: logoSize ?? 60, height: logoSize ?? 60, objectFit: 'contain', display: 'block', transform: (logoRotation ?? 0) !== 0 ? `rotate(${logoRotation}deg)` : undefined }} />
          </div>
        )}

        {/* Text-only logo (Batch 16) */}
        {(logoText ?? '').length > 0 && (
          <div style={{
            position: 'absolute', zIndex: 26,
            ...getLogoPositionStyle(logoPosition ?? 'br', logoPadding ?? 16),
            fontSize: logoTextSize ?? 13, fontWeight: 800,
            color: logoTextColor ?? '#ffffff',
            fontFamily: titleFont ?? 'Inter, system-ui',
            letterSpacing: '0.05em', opacity: (logoOpacity ?? 100) / 100,
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}>
            {logoText}
          </div>
        )}

        {/* Badge overlay */}
        {badge && badge.length > 0 && (
          <div style={{ position: 'absolute', zIndex: 27, ...getBadgePositionStyle(badgePosition ?? 'tr') }}>
            <div style={{
              padding: '4px 10px', borderRadius: badgeRadius ?? 6,
              background: badgeColor ?? '#8b5cf6', color: '#fff',
              fontSize: badgeSize ?? 10, fontWeight: 800, letterSpacing: '0.08em',
              textTransform: 'uppercase', fontFamily: 'Inter, system-ui, sans-serif',
              whiteSpace: 'nowrap',
              // Batch 11 — pulse ring on badge
              boxShadow: (badgePulse ?? false)
                ? `0 2px 8px ${badgeColor ?? '#8b5cf6'}80, 0 0 0 4px ${badgeColor ?? '#8b5cf6'}30, 0 0 0 8px ${badgeColor ?? '#8b5cf6'}15`
                : `0 2px 8px ${badgeColor ?? '#8b5cf6'}80`,
            }}>
              {badge}
            </div>
          </div>
        )}

        {/* Emoji sticker overlay */}
        {emojiOverlay && emojiOverlay.length > 0 && (
          <div style={{ position: 'absolute', zIndex: 27, left: `${emojiPositionX ?? 50}%`, top: `${emojiPositionY ?? 50}%`, transform: 'translate(-50%, -50%)', fontSize: emojiSize ?? 48, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
            {emojiOverlay}
          </div>
        )}

        {/* Cursor overlay (Batch 3) */}
        {(cursorOverlay ?? false) && (
          <div style={{ position: 'absolute', zIndex: 27, left: `${cursorX ?? 50}%`, top: `${cursorY ?? 50}%`, transform: 'translate(-10%, -10%)', pointerEvents: 'none' }}>
            <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L0 26L6.5 19.5L12 28.5L15 27L9.5 18H20Z" fill="white"/>
              <path d="M0 0L0 26L6.5 19.5L12 28.5L15 27L9.5 18H20Z" fill="none" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        {/* Vignette */}
        {vignette > 0 && (() => {
          const vc = `${vignetteColor ?? '#000000'}${Math.round(vignette / 100 * 0.85 * 255).toString(16).padStart(2, '0')}`;
          const vShape = vignetteShape ?? 'elliptical';
          const bg = vShape === 'linear-v'
            ? `linear-gradient(to bottom, ${vc} 0%, transparent ${Math.max(10, 40 - vignette * 0.3)}%, transparent ${Math.min(90, 60 + vignette * 0.3)}%, ${vc} 100%)`
            : vShape === 'linear-h'
            ? `linear-gradient(to right, ${vc} 0%, transparent ${Math.max(10, 40 - vignette * 0.3)}%, transparent ${Math.min(90, 60 + vignette * 0.3)}%, ${vc} 100%)`
            : `radial-gradient(ellipse at center, transparent ${Math.max(0, 70 - vignette * 0.5)}%, ${vc} 100%)`;
          return <div className="absolute inset-0 pointer-events-none z-[25]" style={{ background: bg }} />;
        })()}

        {/* Scanlines */}
        {scanlines > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[26]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${scanlinesColor === 'light' ? `rgba(255,255,255,${(scanlines / 100 * 0.3).toFixed(2)})` : `rgba(0,0,0,${(scanlines / 100 * 0.45).toFixed(2)})`} 0px, ${scanlinesColor === 'light' ? `rgba(255,255,255,${(scanlines / 100 * 0.3).toFixed(2)})` : `rgba(0,0,0,${(scanlines / 100 * 0.45).toFixed(2)})`} 1px, transparent 1px, transparent ${scanlinesSpacing ?? 4}px)`,
          }} />
        )}

        {/* Film grain */}
        {(filmGrain ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[27]" style={{
            opacity: (filmGrain ?? 0) / 100 * 0.55,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px', mixBlendMode: 'overlay',
          }} />
        )}

        {/* Corner dots decoration */}
        {cornerDots && (
          <>
            {([{ top: 10, left: 10 }, { top: 10, right: 10 }, { bottom: 10, left: 10 }, { bottom: 10, right: 10 }] as React.CSSProperties[]).map((pos, i) => (
              <div key={i} style={{ position: 'absolute', zIndex: 28, ...pos, width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', boxShadow: '0 0 6px rgba(255,255,255,0.4)' }} />
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

        {/* Grid lines overlay */}
        {(gridLines ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[29]" style={{
            opacity: (gridLines ?? 0) / 100 * 0.5,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        )}

        {/* Crosshair overlay */}
        {(crosshair ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[29]">
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke={crosshairColor ?? 'rgba(255,255,255,0.6)'} strokeWidth="1" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke={crosshairColor ?? 'rgba(255,255,255,0.6)'} strokeWidth="1" />
              <circle cx="50%" cy="50%" r="20" stroke={crosshairColor ?? 'rgba(255,255,255,0.6)'} strokeWidth="1" fill="none" />
              <circle cx="50%" cy="50%" r="4" fill={crosshairColor ?? 'rgba(255,255,255,0.6)'} />
            </svg>
          </div>
        )}

        {/* Rainbow border overlay */}
        {(rainbowBorder ?? false) && (
          <div className="absolute pointer-events-none z-[30]" style={{
            inset: 0, borderRadius,
            background: `conic-gradient(from 0deg, #ff0000, #ff7700, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)`,
            padding: 3,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }} />
        )}

        {/* Bokeh / bubble overlay */}
        {(bokehOverlay ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[20]">
            {Array.from({ length: Math.round((bokehOverlay ?? 0) / 8) + 2 }).map((_, i) => {
              const x = (i * 37 + 13) % 100;
              const y = (i * 53 + 29) % 100;
              const size = 16 + (i * 17) % 50;
              return (
                <div key={i} style={{
                  position: 'absolute', left: `${x}%`, top: `${y}%`,
                  width: size, height: size, borderRadius: '50%',
                  background: bokehColor ?? 'rgba(255,255,255,0.3)',
                  transform: 'translate(-50%, -50%)',
                  mixBlendMode: 'screen',
                  opacity: (bokehOverlay ?? 0) / 100 * 0.8,
                  filter: `blur(${Math.round(size * 0.3)}px)`,
                }} />
              );
            })}
          </div>
        )}

        {/* Stamp / ink effect */}
        {(stampEffect ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[29]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 160, height: 160, borderRadius: '50%',
              border: `8px solid ${stampColor ?? '#cc0000'}`,
              opacity: 0.65,
              boxShadow: `0 0 0 3px ${stampColor ?? '#cc0000'}30, inset 0 0 0 3px ${stampColor ?? '#cc0000'}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'rotate(-28deg)',
              filter: 'blur(0.4px)',
            }}>
              <div style={{ textAlign: 'center', color: stampColor ?? '#cc0000', fontFamily: 'Georgia, serif', fontWeight: 900 }}>
                <div style={{ fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase' }}>APPROVED</div>
                <div style={{ height: 1, background: stampColor ?? '#cc0000', margin: '4px 0', opacity: 0.5 }} />
                <div style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.7 }}>VERIFIED ★ 2025</div>
              </div>
            </div>
          </div>
        )}

        {/* Frame color tint overlay */}
        {frame !== 'none' && (frameColor ?? '') !== '' && (
          <div className="absolute inset-0 pointer-events-none z-[3]" style={{
            background: frameColor,
            opacity: 1 - (frameOpacity ?? 100) / 100,
            borderRadius: frameBR,
            mixBlendMode: 'color',
          }} />
        )}

        {/* Split screen diagonal overlay (Batch 5) */}
        {(splitScreen ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[28]" style={{ overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(${splitScreenAngle ?? 135}deg, ${splitScreenColor1 ?? '#000000'} 50%, transparent 50%)`,
              opacity: 0.35, mixBlendMode: 'overlay',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(${splitScreenAngle ?? 135}deg, transparent 50%, ${splitScreenColor2 ?? '#ffffff'} 50%)`,
              opacity: 0.25, mixBlendMode: 'screen',
            }} />
          </div>
        )}

        {/* Overlay pattern layer (Batch 5) */}
        {(overlayPatternType ?? 'none') !== 'none' && (overlayPatternOpacity ?? 0) > 0 && (() => {
          const col = overlayPatternColor ?? '#ffffff';
          const op = (overlayPatternOpacity ?? 30) / 100;
          const patternMap: Record<string, React.CSSProperties> = {
            dots2: {
              backgroundImage: `radial-gradient(circle, ${col} 1.5px, transparent 1.5px)`,
              backgroundSize: '20px 20px',
            },
            hearts: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M10 16s-7-5-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 17 7c0 4-7 9-7 9z' fill='${encodeURIComponent(col)}'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
            },
            stars2: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpolygon points='10,2 12.5,8 19,8 13.5,12 15.5,18 10,14 4.5,18 6.5,12 1,8 7.5,8' fill='${encodeURIComponent(col)}'/%3E%3C/svg%3E")`,
              backgroundSize: '28px 28px',
            },
            confetti: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='3' y='3' width='6' height='3' rx='1' fill='${encodeURIComponent(col)}' opacity='0.7' transform='rotate(30 6 4.5)'/%3E%3Crect x='20' y='15' width='5' height='2.5' rx='1' fill='${encodeURIComponent(col)}' opacity='0.5' transform='rotate(-20 22 16)'/%3E%3Crect x='28' y='4' width='4' height='2' rx='1' fill='${encodeURIComponent(col)}' opacity='0.6' transform='rotate(50 30 5)'/%3E%3Crect x='10' y='28' width='7' height='3' rx='1' fill='${encodeURIComponent(col)}' opacity='0.55' transform='rotate(-10 13 29)'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
            },
            snow: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Ccircle cx='5' cy='5' r='2' fill='${encodeURIComponent(col)}' opacity='0.8'/%3E%3Ccircle cx='20' cy='15' r='1.5' fill='${encodeURIComponent(col)}' opacity='0.6'/%3E%3Ccircle cx='12' cy='25' r='1' fill='${encodeURIComponent(col)}' opacity='0.5'/%3E%3Ccircle cx='27' cy='7' r='1' fill='${encodeURIComponent(col)}' opacity='0.7'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px',
            },
          };
          const ps = patternMap[overlayPatternType ?? ''] ?? {};
          return (
            <div className="absolute inset-0 pointer-events-none z-[28]" style={{
              opacity: op, backgroundRepeat: 'repeat', mixBlendMode: 'normal', ...ps,
            }} />
          );
        })()}

        {/* Frosted glass overlay (Batch 6) */}
        {(glassEffect ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[29]" style={{
            backdropFilter: `blur(${(glassEffect ?? 0) * 0.15}px)`,
            WebkitBackdropFilter: `blur(${(glassEffect ?? 0) * 0.15}px)`,
            background: `${glassColor ?? '#ffffff'}${Math.round((glassEffect ?? 0) / 100 * 0.25 * 255).toString(16).padStart(2, '0')}`,
            mixBlendMode: 'normal',
          }} />
        )}

        {/* Duotone horizontal split (Batch 6) */}
        {(duotoneSplit ?? false) && (
          <>
            <div className="absolute inset-0 pointer-events-none z-[29]" style={{
              background: `linear-gradient(to bottom, ${duotoneSplitColor1 ?? '#ff6600'} 0%, ${duotoneSplitColor1 ?? '#ff6600'} ${duotoneSplitMidpoint ?? 50}%, transparent ${duotoneSplitMidpoint ?? 50}%)`,
              mixBlendMode: 'multiply', opacity: 0.55,
            }} />
            <div className="absolute inset-0 pointer-events-none z-[29]" style={{
              background: `linear-gradient(to bottom, transparent 0%, transparent ${duotoneSplitMidpoint ?? 50}%, ${duotoneSplitColor2 ?? '#3300cc'} ${duotoneSplitMidpoint ?? 50}%, ${duotoneSplitColor2 ?? '#3300cc'} 100%)`,
              mixBlendMode: 'multiply', opacity: 0.55,
            }} />
          </>
        )}

        {/* Noise texture overlay (Batch 6) */}
        {(noiseType ?? 'none') !== 'none' && (noiseAmount ?? 0) > 0 && (() => {
          const amt = (noiseAmount ?? 40) / 100;
          const noiseMap: Record<string, React.CSSProperties> = {
            film: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px', mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
            },
            sand: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='s'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s)' opacity='0.8'/%3E%3C/svg%3E")`,
              backgroundSize: '250px 250px', mixBlendMode: 'soft-light' as React.CSSProperties['mixBlendMode'],
            },
            fabric: {
              backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px)`,
              mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
            },
            static: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.95' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
              backgroundSize: '120px 120px', mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'],
            },
          };
          const ns = noiseMap[noiseType ?? ''] ?? {};
          return (
            <div className="absolute inset-0 pointer-events-none z-[29]" style={{ opacity: amt, backgroundRepeat: 'repeat', ...ns }} />
          );
        })()}

        {/* Corner accent brackets (Batch 6) */}
        {(cornerAccents ?? false) && (() => {
          const sz = cornerAccentSize ?? 28;
          const th = cornerAccentThickness ?? 2;
          const col = cornerAccentColor ?? '#ffffff';
          const corners = [
            { top: 10, left: 10,   rotate: '0deg' },
            { top: 10, right: 10,  rotate: '90deg' },
            { bottom: 10, right: 10, rotate: '180deg' },
            { bottom: 10, left: 10,  rotate: '270deg' },
          ] as React.CSSProperties[];
          return (
            <div className="absolute inset-0 pointer-events-none z-[31]">
              {corners.map((pos, i) => (
                <div key={i} style={{ position: 'absolute', ...pos, width: sz, height: sz }}>
                  <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} fill="none">
                    <path d={`M ${th/2} ${sz} L ${th/2} ${th/2} L ${sz} ${th/2}`}
                      stroke={col} strokeWidth={th} strokeLinecap="round" />
                  </svg>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Canvas gradient overlay (Batch 7) */}
        {(canvasGradientOverlay ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[29]" style={{
            background: `linear-gradient(${canvasGradientOverlayAngle ?? 135}deg, ${canvasGradientOverlayColor1 ?? '#ff006680'}, ${canvasGradientOverlayColor2 ?? '#8338ec80'})`,
            opacity: (canvasGradientOverlayOpacity ?? 30) / 100,
            mixBlendMode: ((gradientOverlayBlend ?? 'screen') as React.CSSProperties['mixBlendMode']),
          }} />
        )}

        {/* Background overlay gradient (second BG layer, Batch 7) */}
        {(bgOverlayGradient ?? 'none') !== 'none' && (bgOverlayGradientOpacity ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[2]" style={{
            background: bgOverlayGradient,
            opacity: (bgOverlayGradientOpacity ?? 0) / 100,
          }} />
        )}

        {/* Progress bar (Batch 7) */}
        {(progressBar ?? false) && (
          <div style={{
            position: 'absolute', zIndex: 32,
            left: 0, right: 0,
            ...(progressBarPosition === 'top' ? { top: 0 } : { bottom: 0 }),
            height: progressBarHeight ?? 4,
            background: progressBarBg ?? 'rgba(255,255,255,0.15)',
          }}>
            <div style={{
              height: '100%',
              width: `${Math.min(100, Math.max(0, progressBarValue ?? 70))}%`,
              background: progressBarColor ?? '#8b5cf6',
              borderRadius: progressBarPosition === 'top' ? '0 0 2px 2px' : '2px 2px 0 0',
            }} />
          </div>
        )}

        {/* Custom sticker text label (Batch 7) */}
        {(stickerText ?? '').length > 0 && (
          <div style={{
            position: 'absolute', zIndex: 32,
            left: `${stickerX ?? 50}%`, top: `${stickerY ?? 80}%`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: stickerRadius ?? 999,
              background: stickerBg ?? '#8b5cf6',
              color: stickerColor ?? '#ffffff',
              fontSize: stickerSize ?? 16,
              fontWeight: 700,
              fontFamily: 'Inter, system-ui, sans-serif',
              whiteSpace: 'nowrap',
              boxShadow: `0 2px 8px ${stickerBg ?? '#8b5cf6'}80`,
            }}>{stickerText}</span>
          </div>
        )}

        {/* Accent line decoration (Batch 8) */}
        {(accentLine ?? false) && (() => {
          const pos = accentLinePosition ?? 'bottom';
          const th = accentLineThickness ?? 4;
          const posStyle: React.CSSProperties =
            pos === 'top'    ? { top: 0, left: 0, right: 0, height: th } :
            pos === 'left'   ? { top: 0, left: 0, bottom: 0, width: th } :
            pos === 'right'  ? { top: 0, right: 0, bottom: 0, width: th } :
                               { bottom: 0, left: 0, right: 0, height: th };
          return (
            <div style={{
              position: 'absolute', zIndex: 32,
              background: accentLineColor ?? '#8b5cf6',
              pointerEvents: 'none',
              ...posStyle,
            }} />
          );
        })()}

        {/* Image inner glow (Batch 8) — inset glow overlay */}
        {(imageInnerGlow ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[24]" style={{
            boxShadow: `inset 0 0 ${imageInnerGlow ?? 0}px ${imageInnerGlowColor ?? '#ffffff'}`,
            borderRadius: frameBR,
          }} />
        )}

        {/* Chip annotation (Batch 8) */}
        {(chipText ?? '').length > 0 && (
          <div style={{
            position: 'absolute', zIndex: 33,
            left: `${chipX ?? 60}%`, top: `${chipY ?? 30}%`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '4px 10px', borderRadius: 999,
              background: chipColor ?? '#f59e0b',
              color: '#fff', fontSize: 11, fontWeight: 700,
              fontFamily: 'Inter, system-ui, sans-serif',
              boxShadow: `0 2px 8px ${chipColor ?? '#f59e0b'}80`,
              whiteSpace: 'nowrap',
            }}>
              <span style={{ fontSize: 8 }}>▶</span>
              {chipText}
            </div>
          </div>
        )}

        {/* Split pane background (Batch 11) — right side colored panel */}
        {(splitPane ?? false) && (
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0,
            width: `${100 - (splitPaneRatio ?? 50)}%`,
            background: splitPaneBg ?? '#1a1a2e',
            pointerEvents: 'none', zIndex: 1,
          }} />
        )}

        {/* Floating label bar (Batch 11) */}
        {(floatingLabel ?? false) && (floatingLabelText ?? '').length > 0 && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 35,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '6px 12px',
            background: floatingLabelBg ?? '#8b5cf6',
            color: floatingLabelColor ?? '#ffffff',
            fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase', fontFamily: 'Inter, system-ui',
            pointerEvents: 'none',
          }}>
            {floatingLabelText}
          </div>
        )}

        {/* Linear gradient overlay — top-to-bottom fade (Batch 13) */}
        {(overlayLinear ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[3]" style={{
            background: `linear-gradient(to bottom, ${overlayLinearColor1 ?? '#000000'}, ${overlayLinearColor2 ?? '#00000000'})`,
            opacity: (overlayLinearOpacity ?? 60) / 100,
          }} />
        )}

        {/* Color duotone map (Batch 13) — grayscale + color tint layers */}
        {(colorDuotoneMap ?? false) && (
          <>
            <div className="absolute inset-0 pointer-events-none z-[22]" style={{ background: colorDuotoneMapColor1 ?? '#8b5cf6', mixBlendMode: 'multiply', opacity: 0.6 }} />
            <div className="absolute inset-0 pointer-events-none z-[23]" style={{ background: colorDuotoneMapColor2 ?? '#ec4899', mixBlendMode: 'screen', opacity: 0.4 }} />
          </>
        )}

        {/* Fine noise grain (Batch 13) */}
        {(noiseGrain ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[30]" style={{
            opacity: (noiseGrainOpacity ?? 20) / 100,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }} />
        )}

        {/* Icon bar (Batch 13) */}
        {(iconBar ?? false) && (() => {
          const iconMap: Record<string, string> = {
            stars:  '★ ★ ★ ★ ★',
            social: '🐦 📸 💼 ▶',
            arrows: '→ → → → →',
            dots:   '● ● ● ● ●',
          };
          return (
            <div style={{
              position: 'absolute', bottom: 12, left: 0, right: 0, zIndex: 33,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, fontSize: 14, color: iconBarColor ?? '#f59e0b',
              pointerEvents: 'none', letterSpacing: '0.15em',
              fontFamily: 'Inter, system-ui',
            }}>
              {iconMap[iconBarStyle ?? 'stars'] ?? iconMap.stars}
            </div>
          );
        })()}

        {/* Multi-stop gradient overlay (Batch 12) */}
        {(bgGradientStops ?? 2) >= 3 && (
          <div className="absolute inset-0 pointer-events-none z-[2]" style={{
            background: (bgGradientStops ?? 2) >= 4
              ? `linear-gradient(135deg, transparent 0%, ${bgGradientColor3 ?? '#f59e0b'}40 50%, ${bgGradientColor4 ?? '#10b981'}40 75%, transparent 100%)`
              : `linear-gradient(135deg, transparent 0%, ${bgGradientColor3 ?? '#f59e0b'}50 100%)`,
            mixBlendMode: 'overlay',
          }} />
        )}

        {/* Image vignette overlay (Batch 12) */}
        {(imageVignette ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[24]" style={{
            background: `radial-gradient(ellipse at center, transparent ${100 - (imageVignetteSize ?? 40)}%, ${imageVignetteColor ?? '#000000'} 100%)`,
          }} />
        )}

        {/* Halftone overlay (Batch 12) */}
        {(overlayHalftone ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[28]" style={{
            backgroundImage: `radial-gradient(circle, ${overlayHalftoneColor ?? '#000000'} ${overlayHalftoneDensity ?? 4}px, transparent ${overlayHalftoneDensity ?? 4}px)`,
            backgroundSize: `${(overlayHalftoneDensity ?? 4) * 5}px ${(overlayHalftoneDensity ?? 4) * 5}px`,
            opacity: 0.25,
          }} />
        )}

        {/* Image overlay text (Batch 12) — large diagonal text printed over image */}
        {(imageOverlayText ?? '').length > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[25] flex items-center justify-center overflow-hidden">
            <div style={{
              color: imageOverlayTextColor ?? '#ffffff',
              fontSize: imageOverlayTextSize ?? 24,
              fontWeight: 900,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: (imageOverlayTextOpacity ?? 30) / 100,
              transform: 'rotate(-30deg)',
              whiteSpace: 'nowrap',
              fontFamily: 'Inter, system-ui',
              userSelect: 'none',
              textShadow: 'none',
            }}>
              {Array(6).fill(imageOverlayText).join('  •  ')}
            </div>
          </div>
        )}

        {/* Grid overlay (Batch 10) */}
        {(overlayGrid ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[29]" style={{
            backgroundImage: [
              `linear-gradient(to right, ${overlayGridColor ?? '#ffffff'} 1px, transparent 1px)`,
              `linear-gradient(to bottom, ${overlayGridColor ?? '#ffffff'} 1px, transparent 1px)`,
            ].join(', '),
            backgroundSize: `${overlayGridSize ?? 40}px ${overlayGridSize ?? 40}px`,
            opacity: (overlayGridOpacity ?? 10) / 100,
          }} />
        )}

        {/* Pulse ring around image (Batch 10) */}
        {(pulseRing ?? false) && (() => {
          const pr = pulseRingSize ?? 8;
          const pc = pulseRingColor ?? '#8b5cf6';
          return (
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 25,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                width: `calc(100% - ${pr * 2}px)`, height: `calc(100% - ${pr * 2}px)`,
                borderRadius: (imageRounded ?? false) ? '50%' : imgBR,
                boxShadow: `0 0 0 ${pr}px ${pc}40, 0 0 0 ${pr * 2}px ${pc}20`,
              }} />
            </div>
          );
        })()}

        {/* Corner ribbon (Batch 10) */}
        {(cornerRibbon ?? false) && (() => {
          const corner = cornerRibbonCorner ?? 'tr';
          const posMap: Record<string, React.CSSProperties> = {
            tr: { top: 18, right: -28, transform: 'rotate(45deg)' },
            tl: { top: 18, left: -28, transform: 'rotate(-45deg)' },
            br: { bottom: 18, right: -28, transform: 'rotate(-45deg)' },
            bl: { bottom: 18, left: -28, transform: 'rotate(45deg)' },
          };
          return (
            <div style={{
              position: 'absolute', zIndex: 35, pointerEvents: 'none', overflow: 'hidden', inset: 0,
            }}>
              <div style={{
                position: 'absolute', width: 80,
                background: cornerRibbonBg ?? '#ec4899',
                color: cornerRibbonColor ?? '#ffffff',
                fontSize: 9, fontWeight: 800, textAlign: 'center',
                padding: '3px 0', letterSpacing: '0.1em',
                textTransform: 'uppercase', fontFamily: 'Inter, system-ui',
                ...posMap[corner],
              }}>
                {cornerRibbonText ?? 'NEW'}
              </div>
            </div>
          );
        })()}

        {/* Countdown badge (Batch 10) */}
        {(countdownBadge ?? false) && (
          <div style={{
            position: 'absolute', top: 12, left: 12, zIndex: 35,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 48, height: 48, borderRadius: '50%',
            background: countdownBg ?? '#8b5cf6',
            color: countdownColor ?? '#ffffff',
            fontSize: 20, fontWeight: 900, fontFamily: 'Inter, system-ui',
            boxShadow: `0 4px 16px ${countdownBg ?? '#8b5cf6'}60`,
            pointerEvents: 'none',
          }}>
            {countdownValue ?? 7}
          </div>
        )}

        {/* Divider line between image and text (Batch 12) */}
        {(dividerLine ?? false) && (
          <div style={{
            position: 'absolute', left: 0, right: 0, zIndex: 20,
            top: '50%', transform: 'translateY(-50%)',
            height: dividerLineHeight ?? 1,
            background: dividerLineColor ?? '#ffffff',
            borderStyle: (dividerLineStyle ?? 'solid') as React.CSSProperties['borderStyle'],
            pointerEvents: 'none',
            opacity: 0.6,
          }} />
        )}

        {/* Scrolling text ticker bar (Batch 12) */}
        {(scrollingText ?? false) && (scrollingTextContent ?? '').length > 0 && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 36,
            background: scrollingTextBg ?? '#8b5cf6',
            color: scrollingTextColor ?? '#ffffff',
            fontSize: scrollingTextSize ?? 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            padding: '5px 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            fontFamily: 'Inter, system-ui',
          }}>
            <span style={{ display: 'inline-block', paddingLeft: '100%', animation: undefined }}>
              {Array(4).fill(scrollingTextContent).join('  ')}
            </span>
          </div>
        )}

        {/* Frame double border (Batch 9) */}
        {(frameDoubleBorder ?? false) && (
          <div style={{
            position: 'absolute', inset: frameDoubleBorderGap ?? 4,
            borderRadius: `calc(${typeof canvasBR === 'string' ? canvasBR : `${canvasBR}px`} - ${frameDoubleBorderGap ?? 4}px)`,
            border: `2px solid ${frameDoubleBorderColor ?? '#8b5cf6'}`,
            pointerEvents: 'none', zIndex: 34,
            opacity: 0.7,
          }} />
        )}

        {/* Vintage image frame (Batch 15) — decorative border inset */}
        {(imageVintageFrame ?? false) && (
          <div style={{
            position: 'absolute', inset: 8, zIndex: 26, pointerEvents: 'none',
            border: `3px solid ${imageVintageFrameColor ?? '#c8a97e'}`,
            boxShadow: `inset 0 0 0 1px ${imageVintageFrameColor ?? '#c8a97e'}60, 0 0 0 1px ${imageVintageFrameColor ?? '#c8a97e'}40`,
            borderRadius: 2,
            opacity: 0.75,
          }} />
        )}

        {/* Frame badge (Batch 15) — status badge top-right */}
        {(frameBadge ?? '').length > 0 && (
          <div style={{
            position: 'absolute', top: 12, right: 12, zIndex: 40, pointerEvents: 'none',
            background: frameBadgeBg ?? '#ec4899',
            color: frameBadgeColor ?? '#ffffff',
            fontSize: 9, fontWeight: 800, letterSpacing: '0.08em',
            textTransform: 'uppercase', fontFamily: 'Inter, system-ui',
            padding: '3px 8px', borderRadius: 999,
            boxShadow: `0 2px 8px ${frameBadgeBg ?? '#ec4899'}60`,
          }}>
            {frameBadge}
          </div>
        )}

        {/* VHS overlay (Batch 14) — scanline + color bleed effect */}
        {(overlayVHS ?? false) && (() => {
          const vhsOp = ((overlayVHSIntensity ?? 40) / 100);
          return (
            <>
              {/* Horizontal scanlines */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 38, pointerEvents: 'none',
                backgroundImage: `repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,${(vhsOp * 0.45).toFixed(2)}) 2px, rgba(0,0,0,${(vhsOp * 0.45).toFixed(2)}) 4px)`,
                mixBlendMode: 'multiply',
              }} />
              {/* Color bleed */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 39, pointerEvents: 'none',
                background: `linear-gradient(90deg, rgba(255,0,0,${(vhsOp * 0.08).toFixed(2)}) 0%, transparent 30%, rgba(0,255,255,${(vhsOp * 0.06).toFixed(2)}) 70%, transparent 100%)`,
                mixBlendMode: 'screen',
              }} />
            </>
          );
        })()}

        {/* Backdrop blur card over text (Batch 14) */}
        {(backdropBlurCard ?? false) && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 37,
            height: '40%',
            background: backdropBlurCardBg ?? '#00000060',
            backdropFilter: `blur(${backdropBlurCardBlur ?? 12}px)`,
            WebkitBackdropFilter: `blur(${backdropBlurCardBlur ?? 12}px)`,
            opacity: (backdropBlurCardOpacity ?? 80) / 100,
            pointerEvents: 'none',
          }} />
        )}

        {/* Batch 36 — cracked earth: polygon crack line network */}
        {(bgCracked ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M50 0 L60 30 L80 20 L70 50 L100 45 L75 60 L90 80 L60 70 L50 100 L40 70 L10 80 L25 60 L0 50 L30 45 L20 20 L40 30 Z' fill='none' stroke='${encodeURIComponent(bgCrackedColor ?? '#8b6040')}' stroke-width='0.6' opacity='0.5'/%3E%3Cpath d='M50 30 L60 50 L50 70 L40 50 Z' fill='none' stroke='${encodeURIComponent(bgCrackedColor ?? '#8b6040')}' stroke-width='0.4' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgCrackedOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 36 — malachite: curved band mineral swirl */}
        {(bgMalachite ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='40'%3E%3Cpath d='M0 10 Q20 5 40 10 Q60 15 80 10' fill='none' stroke='${encodeURIComponent(bgMalachiteColor ?? '#2d8a4e')}' stroke-width='3' opacity='0.4'/%3E%3Cpath d='M0 20 Q20 15 40 20 Q60 25 80 20' fill='none' stroke='${encodeURIComponent(bgMalachiteColor ?? '#2d8a4e')}' stroke-width='5' opacity='0.3'/%3E%3Cpath d='M0 30 Q20 25 40 30 Q60 35 80 30' fill='none' stroke='${encodeURIComponent(bgMalachiteColor ?? '#2d8a4e')}' stroke-width='2' opacity='0.5'/%3E%3Cpath d='M0 38 Q20 33 40 38 Q60 43 80 38' fill='none' stroke='${encodeURIComponent(bgMalachiteColor ?? '#2d8a4e')}' stroke-width='4' opacity='0.25'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgMalachiteOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 36 — terrain: 3D terrain elevation curved lines */}
        {(bgTerrain ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='80'%3E%3Cpath d='M0 40 Q20 20 40 35 Q60 50 80 30 Q100 10 120 35 Q140 55 160 40' fill='none' stroke='${encodeURIComponent(bgTerrainColor ?? '#4a7c59')}' stroke-width='0.7' opacity='0.5'/%3E%3Cpath d='M0 55 Q25 35 50 50 Q75 65 100 45 Q125 25 150 50 Q155 55 160 52' fill='none' stroke='${encodeURIComponent(bgTerrainColor ?? '#4a7c59')}' stroke-width='0.5' opacity='0.35'/%3E%3Cpath d='M0 25 Q30 10 60 22 Q90 34 120 18 Q145 6 160 22' fill='none' stroke='${encodeURIComponent(bgTerrainColor ?? '#4a7c59')}' stroke-width='0.4' opacity='0.25'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgTerrainOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 36 — 3D grid: perspective vanishing point grid */}
        {(bgGrid3D ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cline x1='40' y1='40' x2='0' y2='80' stroke='${encodeURIComponent(bgGrid3DColor ?? '#8b5cf6')}' stroke-width='0.5' opacity='0.4'/%3E%3Cline x1='40' y1='40' x2='40' y2='80' stroke='${encodeURIComponent(bgGrid3DColor ?? '#8b5cf6')}' stroke-width='0.5' opacity='0.4'/%3E%3Cline x1='40' y1='40' x2='80' y2='80' stroke='${encodeURIComponent(bgGrid3DColor ?? '#8b5cf6')}' stroke-width='0.5' opacity='0.4'/%3E%3Cline x1='40' y1='40' x2='0' y2='60' stroke='${encodeURIComponent(bgGrid3DColor ?? '#8b5cf6')}' stroke-width='0.3' opacity='0.25'/%3E%3Cline x1='40' y1='40' x2='80' y2='60' stroke='${encodeURIComponent(bgGrid3DColor ?? '#8b5cf6')}' stroke-width='0.3' opacity='0.25'/%3E%3Cline x1='0' y1='60' x2='80' y2='60' stroke='${encodeURIComponent(bgGrid3DColor ?? '#8b5cf6')}' stroke-width='0.3' opacity='0.2'/%3E%3Cline x1='0' y1='80' x2='80' y2='80' stroke='${encodeURIComponent(bgGrid3DColor ?? '#8b5cf6')}' stroke-width='0.3' opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgGrid3DOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 36 — spiral 2: concentric spiral line pattern */}
        {(bgSpiral2 ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='10' fill='none' stroke='${encodeURIComponent(bgSpiral2Color ?? '#8b5cf6')}' stroke-width='0.5' opacity='0.5'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='${encodeURIComponent(bgSpiral2Color ?? '#8b5cf6')}' stroke-width='0.5' opacity='0.4'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='${encodeURIComponent(bgSpiral2Color ?? '#8b5cf6')}' stroke-width='0.5' opacity='0.3'/%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='${encodeURIComponent(bgSpiral2Color ?? '#8b5cf6')}' stroke-width='0.5' opacity='0.2'/%3E%3Ccircle cx='50' cy='50' r='48' fill='none' stroke='${encodeURIComponent(bgSpiral2Color ?? '#8b5cf6')}' stroke-width='0.4' opacity='0.15'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgSpiral2Opacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 36 — snowfall: white snowflake scatter */}
        {(overlaySnowfall ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ctext x='8' y='12' font-size='8' fill='%23ffffff' opacity='0.9'%3E❄%3C/text%3E%3Ctext x='45' y='25' font-size='5' fill='%23ffffff' opacity='0.6'%3E❄%3C/text%3E%3Ctext x='22' y='45' font-size='10' fill='%23ffffff' opacity='0.8'%3E❄%3C/text%3E%3Ctext x='62' y='55' font-size='6' fill='%23ffffff' opacity='0.5'%3E❄%3C/text%3E%3Ctext x='3' y='68' font-size='7' fill='%23ffffff' opacity='0.7'%3E❄%3C/text%3E%3Ctext x='50' y='75' font-size='4' fill='%23ffffff' opacity='0.6'%3E❄%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (overlaySnowfallOpacity ?? 30) / 100,
          }} />
        )}

        {/* Batch 36 — watermark: diagonal repeating text watermark */}
        {(canvasWatermark ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[10] overflow-hidden" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='80'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' font-weight='bold' fill='%23ffffff' opacity='${(canvasWatermarkOpacity ?? 8) / 100}' transform='rotate(-25 100 40)'%3E${encodeURIComponent(canvasWatermarkText ?? 'DRAFT')}%3C/text%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }} />
          </div>
        )}

        {/* Batch 35 — sandstone: sandy diagonal grain lines */}
        {(bgSandstone ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: [
              `repeating-linear-gradient(135deg, ${bgSandstoneColor ?? '#c4a882'}22 0px, ${bgSandstoneColor ?? '#c4a882'}22 1px, transparent 1px, transparent 6px)`,
              `repeating-linear-gradient(45deg, ${bgSandstoneColor ?? '#c4a882'}11 0px, ${bgSandstoneColor ?? '#c4a882'}11 1px, transparent 1px, transparent 9px)`,
            ].join(', '),
            opacity: (bgSandstoneOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 35 — topography: curved contour line map */}
        {(bgTopography ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Cpath d='M0 50 Q50 30 100 50 Q150 70 200 50' fill='none' stroke='${encodeURIComponent(bgTopographyColor ?? '#8b5cf6')}' stroke-width='0.6' opacity='0.5'/%3E%3Cpath d='M0 70 Q50 50 100 70 Q150 90 200 70' fill='none' stroke='${encodeURIComponent(bgTopographyColor ?? '#8b5cf6')}' stroke-width='0.5' opacity='0.35'/%3E%3Cpath d='M0 30 Q50 10 100 30 Q150 50 200 30' fill='none' stroke='${encodeURIComponent(bgTopographyColor ?? '#8b5cf6')}' stroke-width='0.5' opacity='0.35'/%3E%3Cpath d='M0 85 Q60 65 120 85 Q160 100 200 85' fill='none' stroke='${encodeURIComponent(bgTopographyColor ?? '#8b5cf6')}' stroke-width='0.4' opacity='0.25'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgTopographyOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 35 — honeycomb 2: tight dense hex grid */}
        {(bgHoneycomb2 ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='23'%3E%3Cpolygon points='10,1 19,6 19,17 10,22 1,17 1,6' fill='none' stroke='${encodeURIComponent(bgHoneycomb2Color ?? '#8b5cf6')}' stroke-width='0.6' opacity='0.6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgHoneycomb2Opacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 35 — paper tear: rough torn paper edge marks */}
        {(bgPaperTear ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[2]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='20'%3E%3Cpath d='M0 10 Q5 6 10 10 Q15 14 20 8 Q25 4 30 10 Q35 16 40 10 Q45 4 50 9 Q55 14 60 8 Q65 3 70 10 Q75 16 80 10 Q85 5 90 11 Q95 16 100 10' fill='none' stroke='${encodeURIComponent(bgPaperTearColor ?? '#f5e6d0')}' stroke-width='1.5' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: '0 bottom',
            opacity: (bgPaperTearOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 35 — glitch noise: RGB color block digital noise */}
        {(bgGlitchNoise ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[8]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='60'%3E%3Crect x='0' y='8' width='30' height='2' fill='%23ff0050' opacity='0.6'/%3E%3Crect x='50' y='8' width='30' height='2' fill='%230050ff' opacity='0.5'/%3E%3Crect x='10' y='22' width='40' height='1' fill='%2300ffcc' opacity='0.4'/%3E%3Crect x='0' y='35' width='20' height='3' fill='%23ff0050' opacity='0.5'/%3E%3Crect x='60' y='42' width='20' height='2' fill='%230050ff' opacity='0.4'/%3E%3Crect x='30' y='52' width='50' height='1' fill='%2300ffcc' opacity='0.35'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgGlitchNoiseOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 35 — gold dust: small shimmering gold particles */}
        {(overlayGoldDust ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='8' cy='10' r='1' fill='%23ffd700' opacity='0.9'/%3E%3Ccircle cx='28' cy='5' r='0.7' fill='%23d4af37' opacity='0.7'/%3E%3Ccircle cx='48' cy='18' r='1.2' fill='%23ffd700' opacity='0.8'/%3E%3Ccircle cx='15' cy='35' r='0.8' fill='%23f0c040' opacity='0.6'/%3E%3Ccircle cx='40' cy='40' r='1' fill='%23ffd700' opacity='0.9'/%3E%3Ccircle cx='55' cy='52' r='0.6' fill='%23d4af37' opacity='0.7'/%3E%3Ccircle cx='22' cy='55' r='0.9' fill='%23ffd700' opacity='0.8'/%3E%3Ccircle cx='5' cy='50' r='0.5' fill='%23f0c040' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (overlayGoldDustOpacity ?? 30) / 100,
          }} />
        )}

        {/* Batch 35 — film burn: warm orange corner vignette */}
        {(overlayFilmBurn ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            background: [
              'radial-gradient(ellipse 60% 50% at 0% 0%, rgba(255,120,0,0.5) 0%, transparent 55%)',
              'radial-gradient(ellipse 50% 60% at 100% 100%, rgba(200,60,0,0.4) 0%, transparent 50%)',
              'radial-gradient(ellipse 40% 40% at 100% 0%, rgba(255,160,0,0.25) 0%, transparent 45%)',
            ].join(', '),
            opacity: (overlayFilmBurnOpacity ?? 40) / 100,
          }} />
        )}

        {/* Batch 34 — smoke: layered wispy cloud radial gradients */}
        {(bgSmoke ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: [
              `radial-gradient(ellipse 70% 50% at 20% 30%, ${bgSmokeColor ?? '#aaaaaa'}88 0%, transparent 60%)`,
              `radial-gradient(ellipse 60% 60% at 75% 20%, ${bgSmokeColor ?? '#aaaaaa'}55 0%, transparent 55%)`,
              `radial-gradient(ellipse 80% 40% at 50% 70%, ${bgSmokeColor ?? '#aaaaaa'}44 0%, transparent 65%)`,
              `radial-gradient(ellipse 50% 50% at 85% 65%, ${bgSmokeColor ?? '#aaaaaa'}33 0%, transparent 50%)`,
            ].join(', '),
            opacity: (bgSmokeOpacity ?? 20) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 34 — lava lamp: floating blob circles */}
        {(bgLavaLamp ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='160'%3E%3Cellipse cx='60' cy='30' rx='28' ry='22' fill='${encodeURIComponent(bgLavaLampColor ?? '#ec4899')}' opacity='0.5'/%3E%3Cellipse cx='35' cy='80' rx='22' ry='28' fill='${encodeURIComponent(bgLavaLampColor ?? '#ec4899')}' opacity='0.4'/%3E%3Cellipse cx='85' cy='110' rx='26' ry='20' fill='${encodeURIComponent(bgLavaLampColor ?? '#ec4899')}' opacity='0.45'/%3E%3Cellipse cx='50' cy='148' rx='20' ry='16' fill='${encodeURIComponent(bgLavaLampColor ?? '#ec4899')}' opacity='0.35'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgLavaLampOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 34 — cobblestone: rounded rect paving grid */}
        {(bgCobblestone ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20'%3E%3Crect x='1' y='1' width='27' height='17' fill='none' stroke='${encodeURIComponent(bgCobblestoneColor ?? '#8b7355')}' stroke-width='0.8' rx='4'/%3E%3Crect x='3' y='3' width='23' height='13' fill='${encodeURIComponent(bgCobblestoneColor ?? '#8b7355')}' opacity='0.08' rx='3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgCobblestoneOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 34 — ikat: woven diamond textile pattern */}
        {(bgIkat ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpolygon points='15,2 28,15 15,28 2,15' fill='none' stroke='${encodeURIComponent(bgIkatColor ?? '#8b5cf6')}' stroke-width='1' opacity='0.6'/%3E%3Cpolygon points='15,7 23,15 15,23 7,15' fill='${encodeURIComponent(bgIkatColor ?? '#8b5cf6')}' opacity='0.25'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgIkatOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 34 — VHS scanlines: horizontal noise bands */}
        {(bgVHS ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[8]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
            backgroundSize: '100% 4px',
            opacity: (bgVHSOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 34 — retro ruled lines: horizontal ruled notebook lines */}
        {(bgRetroLines ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 27px, ${bgRetroLinesColor ?? '#8b5cf6'} 27px, ${bgRetroLinesColor ?? '#8b5cf6'} 28px)`,
            opacity: (bgRetroLinesOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 34 — film scratches: vertical scratch line marks */}
        {(overlayScratches ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='200'%3E%3Cline x1='15' y1='0' x2='14' y2='200' stroke='%23ffffff' stroke-width='0.5' opacity='0.5'/%3E%3Cline x1='42' y1='20' x2='41' y2='160' stroke='%23ffffff' stroke-width='0.3' opacity='0.3'/%3E%3Cline x1='70' y1='0' x2='71' y2='200' stroke='%23ffffff' stroke-width='0.4' opacity='0.4'/%3E%3Cline x1='88' y1='40' x2='89' y2='180' stroke='%23ffffff' stroke-width='0.3' opacity='0.25'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            opacity: (overlayScratchesOpacity ?? 25) / 100,
          }} />
        )}

        {/* Batch 34 — gritty canvas: diagonal urban texture */}
        {(canvasGritty ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[3]" style={{
            backgroundImage: [
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 6px)',
              'repeating-linear-gradient(-45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 8px)',
            ].join(', '),
          }} />
        )}

        {/* Batch 33 — stitching: dashed border stitched-edge pattern */}
        {(bgStitching ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[2]" style={{
            outline: `3px dashed ${bgStitchingColor ?? '#8b5cf6'}`,
            outlineOffset: '-10px',
            borderRadius: 4,
            opacity: (bgStitchingOpacity ?? 40) / 100,
          }} />
        )}

        {/* Batch 33 — sunrise gradient sky sweep */}
        {(bgSunrise ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: 'linear-gradient(to top, #ff6b35cc 0%, #f7931eaa 25%, #ffd700aa 50%, #87ceebaa 75%, #1a1a4e44 100%)',
            opacity: (bgSunriseOpacity ?? 30) / 100,
          }} />
        )}

        {/* Batch 33 — mosaic colored tile grid */}
        {(bgMosaic ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect x='0' y='0' width='9' height='9' fill='${encodeURIComponent(bgMosaicColor ?? '#8b5cf6')}' opacity='0.6'/%3E%3Crect x='11' y='0' width='9' height='9' fill='${encodeURIComponent(bgMosaicColor ?? '#8b5cf6')}' opacity='0.35'/%3E%3Crect x='0' y='11' width='9' height='9' fill='${encodeURIComponent(bgMosaicColor ?? '#8b5cf6')}' opacity='0.4'/%3E%3Crect x='11' y='11' width='9' height='9' fill='${encodeURIComponent(bgMosaicColor ?? '#8b5cf6')}' opacity='0.6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgMosaicOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 33 — geometric 3D isometric grid */}
        {(bgGeometric3D ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpolygon points='30,5 55,20 55,50 30,65 5,50 5,20' fill='none' stroke='${encodeURIComponent(bgGeometric3DColor ?? '#8b5cf6')}' stroke-width='0.8' opacity='0.6'/%3E%3Cline x1='30' y1='5' x2='30' y2='35' stroke='${encodeURIComponent(bgGeometric3DColor ?? '#8b5cf6')}' stroke-width='0.4' opacity='0.3'/%3E%3Cline x1='5' y1='20' x2='30' y2='35' stroke='${encodeURIComponent(bgGeometric3DColor ?? '#8b5cf6')}' stroke-width='0.4' opacity='0.3'/%3E%3Cline x1='55' y1='20' x2='30' y2='35' stroke='${encodeURIComponent(bgGeometric3DColor ?? '#8b5cf6')}' stroke-width='0.4' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgGeometric3DOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 33 — vignette 2: dark edges soft radial fade */}
        {(overlayVignette2 ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)',
            opacity: (overlayVignette2Opacity ?? 50) / 100,
          }} />
        )}

        {/* Batch 32 — kaleidoscope radial symmetry */}
        {(bgKaleidoscope ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: [
              `conic-gradient(from 0deg at 50% 50%, ${bgKaleidoscopeColor ?? '#8b5cf6'}88 0deg, transparent 30deg, ${bgKaleidoscopeColor ?? '#8b5cf6'}55 60deg, transparent 90deg, ${bgKaleidoscopeColor ?? '#8b5cf6'}88 120deg, transparent 150deg, ${bgKaleidoscopeColor ?? '#8b5cf6'}55 180deg, transparent 210deg, ${bgKaleidoscopeColor ?? '#8b5cf6'}88 240deg, transparent 270deg, ${bgKaleidoscopeColor ?? '#8b5cf6'}55 300deg, transparent 330deg, ${bgKaleidoscopeColor ?? '#8b5cf6'}88 360deg)`,
            ].join(', '),
            opacity: (bgKaleidoscopeOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 32 — floral petal radial pattern */}
        {(bgFloral ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cellipse cx='30' cy='12' rx='6' ry='10' fill='${encodeURIComponent(bgFloralColor ?? '#ec4899')}' opacity='0.5' transform='rotate(0 30 30)'/%3E%3Cellipse cx='30' cy='12' rx='6' ry='10' fill='${encodeURIComponent(bgFloralColor ?? '#ec4899')}' opacity='0.5' transform='rotate(60 30 30)'/%3E%3Cellipse cx='30' cy='12' rx='6' ry='10' fill='${encodeURIComponent(bgFloralColor ?? '#ec4899')}' opacity='0.5' transform='rotate(120 30 30)'/%3E%3Cellipse cx='30' cy='12' rx='6' ry='10' fill='${encodeURIComponent(bgFloralColor ?? '#ec4899')}' opacity='0.5' transform='rotate(180 30 30)'/%3E%3Cellipse cx='30' cy='12' rx='6' ry='10' fill='${encodeURIComponent(bgFloralColor ?? '#ec4899')}' opacity='0.5' transform='rotate(240 30 30)'/%3E%3Cellipse cx='30' cy='12' rx='6' ry='10' fill='${encodeURIComponent(bgFloralColor ?? '#ec4899')}' opacity='0.5' transform='rotate(300 30 30)'/%3E%3Ccircle cx='30' cy='30' r='5' fill='${encodeURIComponent(bgFloralColor ?? '#ec4899')}' opacity='0.7'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgFloralOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 32 — paving stone grid */}
        {(bgPavingStones ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25'%3E%3Crect x='1' y='1' width='38' height='23' fill='none' stroke='${encodeURIComponent(bgPavingStonesColor ?? '#8b5cf6')}' stroke-width='0.8' rx='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgPavingStonesOpacity ?? 12) / 100,
          }} />
        )}

        {/* Batch 32 — sparkle star dots */}
        {(overlaySparkle ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ctext x='10' y='15' font-size='10' fill='%23ffffff' opacity='0.9'%3E✦%3C/text%3E%3Ctext x='55' y='30' font-size='7' fill='%23ffffff' opacity='0.6'%3E✧%3C/text%3E%3Ctext x='25' y='55' font-size='12' fill='%23ffffff' opacity='0.8'%3E✦%3C/text%3E%3Ctext x='65' y='65' font-size='8' fill='%23ffffff' opacity='0.5'%3E✦%3C/text%3E%3Ctext x='5' y='70' font-size='6' fill='%23ffffff' opacity='0.7'%3E✧%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (overlaySparkleOpacity ?? 30) / 100,
          }} />
        )}

        {/* Batch 32 — ink splash corner accent */}
        {(canvasSplash ?? false) && (
          <div className="absolute pointer-events-none z-[3]" style={{
            top: 0, left: 0, width: '35%', height: '35%',
            background: `radial-gradient(ellipse 80% 80% at 0% 0%, ${canvasSplashColor ?? '#8b5cf6'}60 0%, ${canvasSplashColor ?? '#8b5cf6'}20 40%, transparent 70%)`,
          }} />
        )}

        {/* Batch 31 — tie-dye radial swirl */}
        {(bgTieDye ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: [
              `radial-gradient(ellipse 60% 60% at 30% 40%, ${bgTieDyeColor ?? '#8b5cf6'}cc 0%, transparent 50%)`,
              `radial-gradient(ellipse 50% 50% at 70% 30%, #ff6eb4cc 0%, transparent 45%)`,
              `radial-gradient(ellipse 55% 55% at 50% 75%, #00c8a0aa 0%, transparent 50%)`,
              `radial-gradient(ellipse 40% 40% at 80% 70%, #ffd700aa 0%, transparent 40%)`,
              `radial-gradient(ellipse 45% 45% at 15% 70%, #ff4500aa 0%, transparent 45%)`,
            ].join(', '),
            opacity: (bgTieDyeOpacity ?? 25) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 31 — tartan plaid crosshatch */}
        {(bgTartanPlaid ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: [
              `repeating-linear-gradient(0deg, ${bgTartanPlaidColor ?? '#8b5cf6'}55 0px, ${bgTartanPlaidColor ?? '#8b5cf6'}55 4px, transparent 4px, transparent 20px)`,
              `repeating-linear-gradient(90deg, ${bgTartanPlaidColor ?? '#8b5cf6'}55 0px, ${bgTartanPlaidColor ?? '#8b5cf6'}55 4px, transparent 4px, transparent 20px)`,
              `repeating-linear-gradient(0deg, ${bgTartanPlaidColor ?? '#8b5cf6'}22 0px, ${bgTartanPlaidColor ?? '#8b5cf6'}22 2px, transparent 2px, transparent 10px)`,
              `repeating-linear-gradient(90deg, ${bgTartanPlaidColor ?? '#8b5cf6'}22 0px, ${bgTartanPlaidColor ?? '#8b5cf6'}22 2px, transparent 2px, transparent 10px)`,
            ].join(', '),
            opacity: (bgTartanPlaidOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 31 — wood grain ripple lines */}
        {(bgWoodGrain ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='8'%3E%3Cpath d='M0 4 Q50 2 100 4 Q150 6 200 4' fill='none' stroke='${encodeURIComponent(bgWoodGrainColor ?? '#8b6040')}' stroke-width='0.7' opacity='0.5'/%3E%3Cpath d='M0 7 Q50 5 100 7 Q150 9 200 7' fill='none' stroke='${encodeURIComponent(bgWoodGrainColor ?? '#8b6040')}' stroke-width='0.4' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgWoodGrainOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 31 — crystal/gem geometric facets */}
        {(bgCrystal ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpolygon points='25,2 48,15 48,35 25,48 2,35 2,15' fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.4'/%3E%3Cpolygon points='25,10 40,20 40,32 25,42 10,32 10,20' fill='none' stroke='%23ffffff' stroke-width='0.3' opacity='0.25'/%3E%3Cline x1='2' y1='15' x2='25' y2='25' stroke='%23ffffff' stroke-width='0.3' opacity='0.2'/%3E%3Cline x1='48' y1='15' x2='25' y2='25' stroke='%23ffffff' stroke-width='0.3' opacity='0.2'/%3E%3Cline x1='25' y1='48' x2='25' y2='25' stroke='%23ffffff' stroke-width='0.3' opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgCrystalOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 31 — matrix binary characters */}
        {(overlayMatrix ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='80'%3E%3Ctext x='5' y='12' font-family='monospace' font-size='10' fill='%2300ff41' opacity='0.8'%3E1%3C/text%3E%3Ctext x='20' y='28' font-family='monospace' font-size='10' fill='%2300ff41' opacity='0.5'%3E0%3C/text%3E%3Ctext x='38' y='16' font-family='monospace' font-size='10' fill='%2300ff41' opacity='0.7'%3E1%3C/text%3E%3Ctext x='10' y='44' font-family='monospace' font-size='10' fill='%2300ff41' opacity='0.4'%3E0%3C/text%3E%3Ctext x='42' y='50' font-family='monospace' font-size='10' fill='%2300ff41' opacity='0.6'%3E1%3C/text%3E%3Ctext x='2' y='65' font-family='monospace' font-size='10' fill='%2300ff41' opacity='0.5'%3E0%3C/text%3E%3Ctext x='28' y='72' font-family='monospace' font-size='10' fill='%2300ff41' opacity='0.7'%3E1%3C/text%3E%3Ctext x='50' y='78' font-family='monospace' font-size='10' fill='%2300ff41' opacity='0.4'%3E0%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (overlayMatrixOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 31 — canvas bloom: soft center glow */}
        {(canvasBloom ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[6]" style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 30 — terrazzo scattered pebble pattern */}
        {(bgTerrazzo ?? false) && (() => {
          const tc = encodeURIComponent(bgTerrazzoColor ?? '#8b5cf6');
          const pebbles = [
            [10,8,4,2],[28,15,3,1.5],[45,6,5,2.5],[62,20,3,1.5],[80,10,4,2],
            [18,30,3,1.5],[35,40,5,2.5],[55,28,4,2],[72,35,3,1.5],[88,25,4,2],
            [8,55,5,2.5],[25,62,3,1.5],[42,50,4,2],[60,65,3,1.5],[78,55,5,2.5],
            [15,80,4,2],[32,75,3,1.5],[50,85,5,2.5],[68,78,4,2],[85,70,3,1.5],
          ] as [number,number,number,number][];
          const shapes = pebbles.map(([cx,cy,rx,ry]) =>
            `%3Cellipse cx='${cx}' cy='${cy}' rx='${rx}' ry='${ry}' fill='${tc}' opacity='0.6'/%3E`
          ).join('');
          return (
            <div className="absolute inset-0 pointer-events-none z-[1]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E${shapes}%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              opacity: (bgTerrazzoOpacity ?? 18) / 100,
            }} />
          );
        })()}

        {/* Batch 30 — snakeskin diamond-scale pattern */}
        {(bgSnakeskin ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20'%3E%3Cpolygon points='15,1 29,10 15,19 1,10' fill='none' stroke='${encodeURIComponent(bgSnakeskinColor ?? '#8b5cf6')}' stroke-width='0.7' opacity='0.6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgSnakeskinOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 30 — denim diagonal weave */}
        {(bgDenim ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cline x1='0' y1='8' x2='8' y2='0' stroke='%23ffffff' stroke-width='0.5' opacity='0.4'/%3E%3Cline x1='4' y1='8' x2='8' y2='4' stroke='%23ffffff' stroke-width='0.3' opacity='0.2'/%3E%3Cline x1='0' y1='4' x2='4' y2='0' stroke='%23ffffff' stroke-width='0.3' opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgDenimOpacity ?? 12) / 100,
          }} />
        )}

        {/* Batch 30 — ice/frost blue tint overlay */}
        {(overlayIce ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[5]" style={{
            background: `radial-gradient(ellipse at 30% 20%, rgba(180,220,255,${((overlayIceOpacity ?? 25) / 100) * 0.6}) 0%, rgba(200,230,255,${((overlayIceOpacity ?? 25) / 100) * 0.3}) 50%, transparent 80%)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 30 — paint drip from top edge */}
        {(overlayPaintDrip ?? false) && (() => {
          const dc = encodeURIComponent(overlayPaintDripColor ?? '#8b5cf6');
          const drips = [
            `M5,0 Q6,12 5,20 Q4,30 6,35 L4,35 Q3,30 4,20 Q5,12 3,0Z`,
            `M20,0 Q22,18 20,28 Q18,38 21,45 L19,45 Q17,38 19,28 Q21,18 18,0Z`,
            `M40,0 Q41,10 40,18 Q39,25 41,30 L39,30 Q38,25 39,18 Q40,10 38,0Z`,
            `M65,0 Q67,20 65,32 Q63,42 66,50 L64,50 Q62,42 64,32 Q66,20 63,0Z`,
            `M85,0 Q86,14 85,22 Q84,30 86,36 L84,36 Q83,30 84,22 Q85,14 83,0Z`,
          ].map(d => `%3Cpath d='${d}' fill='${dc}'/%3E`).join('');
          return (
            <div className="absolute inset-0 pointer-events-none z-[38]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='60' viewBox='0 0 100 60'%3E${drips}%3C/svg%3E")`,
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'top',
              backgroundSize: '100px 60px',
              opacity: (overlayPaintDripOpacity ?? 60) / 100,
            }} />
          );
        })()}

        {/* Batch 30 — aged warm parchment tint */}
        {(canvasOldPaper ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[4]" style={{
            background: 'rgba(180,140,80,0.12)',
            mixBlendMode: 'multiply',
          }} />
        )}

        {/* Batch 29 — marble swirl vein background */}
        {(bgMarble ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: [
              `linear-gradient(135deg, ${bgMarbleColor ?? '#c8a0d8'}55 0%, transparent 40%)`,
              `linear-gradient(45deg, transparent 30%, ${bgMarbleColor ?? '#c8a0d8'}33 50%, transparent 70%)`,
              `linear-gradient(160deg, transparent 20%, ${bgMarbleColor ?? '#c8a0d8'}44 45%, transparent 65%)`,
              `linear-gradient(80deg, ${bgMarbleColor ?? '#c8a0d8'}22 0%, transparent 35%, ${bgMarbleColor ?? '#c8a0d8'}33 70%, transparent 100%)`,
            ].join(', '),
            opacity: (bgMarbleOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 29 — brick wall SVG pattern */}
        {(bgBrickWall ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='30'%3E%3Crect x='1' y='1' width='58' height='13' fill='none' stroke='${encodeURIComponent(bgBrickWallColor ?? '#8b5cf6')}' stroke-width='0.8' rx='1'/%3E%3Crect x='-29' y='15' width='58' height='13' fill='none' stroke='${encodeURIComponent(bgBrickWallColor ?? '#8b5cf6')}' stroke-width='0.8' rx='1'/%3E%3Crect x='31' y='15' width='58' height='13' fill='none' stroke='${encodeURIComponent(bgBrickWallColor ?? '#8b5cf6')}' stroke-width='0.8' rx='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgBrickWallOpacity ?? 12) / 100,
          }} />
        )}

        {/* Batch 29 — diagonal lattice/mesh grid */}
        {(bgLattice ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cline x1='0' y1='0' x2='20' y2='20' stroke='${encodeURIComponent(bgLatticeColor ?? '#8b5cf6')}' stroke-width='0.6' opacity='0.7'/%3E%3Cline x1='20' y1='0' x2='0' y2='20' stroke='${encodeURIComponent(bgLatticeColor ?? '#8b5cf6')}' stroke-width='0.6' opacity='0.7'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgLatticeOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 29 — lens flare radial spot */}
        {(overlayFlare ?? false) && (
          <div className="absolute pointer-events-none z-[6]" style={{
            top: '-10%', right: '-5%',
            width: '50%', height: '50%',
            background: `radial-gradient(ellipse at 70% 30%, rgba(255,255,255,${((overlayFlareOpacity ?? 40) / 100) * 0.8}) 0%, rgba(255,220,100,${((overlayFlareOpacity ?? 40) / 100) * 0.4}) 20%, transparent 60%)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 29 — whole-canvas sepia tint */}
        {(canvasSepia ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[4]" style={{
            background: 'rgba(100,60,20,0.18)',
            mixBlendMode: 'multiply',
          }} />
        )}

        {/* Batch 28 — aurora borealis multi-color gradient */}
        {(bgAurora ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: [
              `radial-gradient(ellipse 80% 40% at 20% 30%, ${bgAuroraColor ?? '#00c8a0'}cc 0%, transparent 60%)`,
              `radial-gradient(ellipse 60% 35% at 70% 20%, #7c3aed99 0%, transparent 55%)`,
              `radial-gradient(ellipse 70% 30% at 50% 80%, ${bgAuroraColor ?? '#00c8a0'}88 0%, transparent 50%)`,
              `radial-gradient(ellipse 50% 40% at 10% 70%, #0ea5e944 0%, transparent 50%)`,
            ].join(', '),
            opacity: (bgAuroraOpacity ?? 25) / 100,
          }} />
        )}

        {/* Batch 28 — fish-scale / arc overlap background */}
        {(bgScales ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='40' r='20' fill='none' stroke='${encodeURIComponent(bgScalesColor ?? '#8b5cf6')}' stroke-width='1'/%3E%3Ccircle cx='0' cy='40' r='20' fill='none' stroke='${encodeURIComponent(bgScalesColor ?? '#8b5cf6')}' stroke-width='1'/%3E%3Ccircle cx='40' cy='40' r='20' fill='none' stroke='${encodeURIComponent(bgScalesColor ?? '#8b5cf6')}' stroke-width='1'/%3E%3Ccircle cx='20' cy='20' r='20' fill='none' stroke='${encodeURIComponent(bgScalesColor ?? '#8b5cf6')}' stroke-width='1' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgScalesOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 28 — diagonal fiber/line texture */}
        {(bgFibers ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cline x1='0' y1='12' x2='12' y2='0' stroke='${encodeURIComponent(bgFibersColor ?? '#8b5cf6')}' stroke-width='0.6' opacity='0.6'/%3E%3Cline x1='6' y1='12' x2='12' y2='6' stroke='${encodeURIComponent(bgFibersColor ?? '#8b5cf6')}' stroke-width='0.4' opacity='0.35'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgFibersOpacity ?? 12) / 100,
          }} />
        )}

        {/* Batch 28 — starburst conic overlay */}
        {(overlayStarburst ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[6]" style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,${((overlayStarburstOpacity ?? 15) / 100) * 0.3}) 4deg, transparent 8deg, transparent 16deg, rgba(255,255,255,${((overlayStarburstOpacity ?? 15) / 100) * 0.2}) 20deg, transparent 24deg, transparent 32deg, rgba(255,255,255,${((overlayStarburstOpacity ?? 15) / 100) * 0.25}) 36deg, transparent 40deg)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 28 — corner bracket decorations */}
        {(frameCornerBrackets ?? false) && (
          <>
            {([
              { top: 8, left: 8, borderTop: true, borderLeft: true },
              { top: 8, right: 8, borderTop: true, borderRight: true },
              { bottom: 8, left: 8, borderBottom: true, borderLeft: true },
              { bottom: 8, right: 8, borderBottom: true, borderRight: true },
            ] as { top?: number; bottom?: number; left?: number; right?: number; borderTop?: boolean; borderBottom?: boolean; borderLeft?: boolean; borderRight?: boolean }[]).map((c, i) => (
              <div key={i} className="absolute pointer-events-none z-[50]" style={{
                top: c.top, bottom: c.bottom, left: c.left, right: c.right,
                width: 20, height: 20,
                borderTop: c.borderTop ? `2px solid ${frameCornerBracketsColor ?? '#8b5cf6'}` : undefined,
                borderBottom: c.borderBottom ? `2px solid ${frameCornerBracketsColor ?? '#8b5cf6'}` : undefined,
                borderLeft: c.borderLeft ? `2px solid ${frameCornerBracketsColor ?? '#8b5cf6'}` : undefined,
                borderRight: c.borderRight ? `2px solid ${frameCornerBracketsColor ?? '#8b5cf6'}` : undefined,
              }} />
            ))}
          </>
        )}

        {/* Batch 27 — polka dot circle background */}
        {(bgPolkaDots ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='7' fill='${encodeURIComponent(bgPolkaDotsColor ?? '#8b5cf6')}'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgPolkaDotsOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 27 — halftone dot grid background */}
        {(bgHalftone ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='3.5' fill='${encodeURIComponent(bgHalftoneColor ?? '#8b5cf6')}'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgHalftoneOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 27 — organic camo blob pattern */}
        {(bgCamo ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: [
              `radial-gradient(ellipse 42% 22% at 25% 28%, ${bgCamoColor ?? '#4a6741'} 0%, transparent 100%)`,
              `radial-gradient(ellipse 30% 28% at 70% 18%, ${bgCamoColor ?? '#4a6741'}cc 0%, transparent 100%)`,
              `radial-gradient(ellipse 48% 30% at 50% 68%, ${bgCamoColor ?? '#4a6741'} 0%, transparent 100%)`,
              `radial-gradient(ellipse 28% 38% at 15% 78%, ${bgCamoColor ?? '#4a6741'}aa 0%, transparent 100%)`,
              `radial-gradient(ellipse 36% 22% at 85% 82%, ${bgCamoColor ?? '#4a6741'}dd 0%, transparent 100%)`,
              `radial-gradient(ellipse 22% 32% at 88% 35%, ${bgCamoColor ?? '#4a6741'}88 0%, transparent 100%)`,
            ].join(', '),
            opacity: (bgCamoOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 27 — secondary fine grain noise */}
        {(overlayNoise2 ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[7]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='1' cy='1' r='0.6' fill='%23fff' opacity='0.4'/%3E%3Ccircle cx='3' cy='3' r='0.4' fill='%23fff' opacity='0.25'/%3E%3Ccircle cx='1' cy='3' r='0.5' fill='%23000' opacity='0.15'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (overlayNoise2Opacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 27 — tape corner stickers */}
        {(canvasTapeCorners ?? false) && (
          <>
            {([
              { pos: { top: 10, left: 10 }, angle: -45 },
              { pos: { top: 10, right: 10 }, angle: 45 },
              { pos: { bottom: 10, left: 10 }, angle: 45 },
              { pos: { bottom: 10, right: 10 }, angle: -45 },
            ] as { pos: React.CSSProperties; angle: number }[]).map(({ pos, angle }, i) => (
              <div key={i} className="absolute pointer-events-none z-[50]" style={{
                ...pos,
                width: 36, height: 14,
                background: 'rgba(255,240,180,0.75)',
                transform: `rotate(${angle}deg)`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            ))}
          </>
        )}

        {/* Batch 26 — waveform/equalizer bars background */}
        {(bgWaveform ?? false) && (() => {
          const wc = encodeURIComponent(bgWaveformColor ?? '#8b5cf6');
          const heights = [20, 35, 50, 28, 42, 55, 32, 48, 22, 40, 58, 30, 45, 25, 52];
          const bars = heights.map((h, i) => `%3Crect x='${i * 8 + 2}' y='${60 - h}' width='5' height='${h}' fill='${wc}' rx='2'/%3E`).join('');
          return (
            <div className="absolute inset-0 pointer-events-none z-[1]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='124' height='60'%3E${bars}%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              opacity: (bgWaveformOpacity ?? 15) / 100,
            }} />
          );
        })()}

        {/* Batch 26 — warm orange second light leak */}
        {(overlayLightLeak2 ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[6]" style={{
            background: `linear-gradient(135deg, rgba(255,180,50,${((overlayLightLeak2Opacity ?? 35) / 100) * 0.7}) 0%, rgba(255,100,30,${((overlayLightLeak2Opacity ?? 35) / 100) * 0.5}) 30%, transparent 60%)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 26 — raindrop dots SVG overlay */}
        {(overlayRaindrops ?? false) && (() => {
          const drops = [
            [8, 12, 3], [24, 5, 2], [40, 18, 4], [55, 8, 2.5], [70, 22, 3.5],
            [85, 6, 2], [15, 35, 2.5], [32, 42, 3], [48, 30, 2], [65, 38, 4],
            [80, 28, 2.5], [5, 55, 3], [22, 60, 2], [38, 50, 3.5], [52, 58, 2],
            [68, 52, 4], [82, 62, 2.5], [12, 75, 3], [28, 80, 2], [45, 72, 3],
          ] as [number, number, number][];
          const circles = drops.map(([cx, cy, r]) =>
            `%3Ccircle cx='${cx}' cy='${cy}' r='${r}' fill='%23ffffff' opacity='0.35'/%3E`
          ).join('');
          return (
            <div className="absolute inset-0 pointer-events-none z-[9]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E${circles}%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              opacity: (overlayRaindropsOpacity ?? 20) / 100,
            }} />
          );
        })()}

        {/* Watermark (supports custom text + position, Batch 3) */}
        {/* Batch 25 — zigzag stripe background */}
        {(bgZigzagStripes ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: [
              `linear-gradient(135deg, ${bgZigzagStripesColor ?? '#8b5cf6'}60 25%, transparent 25%)`,
              `linear-gradient(225deg, ${bgZigzagStripesColor ?? '#8b5cf6'}60 25%, transparent 25%)`,
              `linear-gradient(315deg, ${bgZigzagStripesColor ?? '#8b5cf6'}60 25%, transparent 25%)`,
              `linear-gradient(45deg, ${bgZigzagStripesColor ?? '#8b5cf6'}60 25%, transparent 25%)`,
            ].join(', '),
            backgroundSize: '30px 30px',
            opacity: (bgZigzagStripesOpacity ?? 12) / 100,
          }} />
        )}

        {/* Batch 25 — mandala radial SVG pattern */}
        {(bgMandala ?? false) && (() => {
          const mc = encodeURIComponent(bgMandalaColor ?? '#8b5cf6');
          const petals = Array.from({ length: 8 }, (_, i) =>
            `<ellipse cx="0" cy="-28" rx="8" ry="22" fill="none" stroke="${mc}" stroke-width="0.7" opacity="0.6" transform="rotate(${i * 45})"/>`
          ).join('');
          const svg = encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><g transform='translate(50,50)'>${petals}<circle cx='0' cy='0' r='10' fill='none' stroke='${mc}' stroke-width='0.7' opacity='0.8'/><circle cx='0' cy='0' r='40' fill='none' stroke='${mc}' stroke-width='0.5' opacity='0.4'/></g></svg>`
          );
          return (
            <div className="absolute inset-0 pointer-events-none z-[1]" style={{
              backgroundImage: `url("data:image/svg+xml,${svg}")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              opacity: (bgMandalaOpacity ?? 12) / 100,
            }} />
          );
        })()}

        {/* Batch 25 — prismatic iridescent sheen */}
        {(bgPrismaticSheen ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: 'linear-gradient(135deg, rgba(255,0,128,0.2) 0%, rgba(0,255,200,0.15) 25%, rgba(100,0,255,0.2) 50%, rgba(255,200,0,0.15) 75%, rgba(255,0,128,0.2) 100%)',
            opacity: (bgPrismaticSheenOpacity ?? 20) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 25 — vignette mask on image/canvas edges */}
        {(frameVignetteMask ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[5]" style={{
            background: `radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, ${frameVignetteMaskColor ?? '#000000'}dd 100%)`,
          }} />
        )}

        {/* Batch 25 — directional glare/shine band */}
        {(overlayGlare ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[6]" style={{
            background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.25) 42%, rgba(255,255,255,0.28) 46%, transparent 55%)',
            opacity: (overlayGlareOpacity ?? 30) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 25 — colorful confetti dots */}
        {(overlayConfetti ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[38]" style={{
            backgroundImage: [
              'radial-gradient(circle, rgba(255,80,80,0.85) 1.5px, transparent 1.5px)',
              'radial-gradient(circle, rgba(80,220,80,0.85) 1.5px, transparent 1.5px)',
              'radial-gradient(circle, rgba(80,100,255,0.85) 1.5px, transparent 1.5px)',
              'radial-gradient(circle, rgba(255,220,0,0.85) 1.5px, transparent 1.5px)',
              'radial-gradient(circle, rgba(255,80,200,0.85) 1.5px, transparent 1.5px)',
            ].join(', '),
            backgroundSize: '22px 22px, 30px 30px, 26px 26px, 35px 35px, 18px 18px',
            backgroundPosition: '0 0, 11px 8px, 4px 16px, 18px 3px, 8px 20px',
            opacity: (overlayConfettiOpacity ?? 25) / 100,
          }} />
        )}

        {/* Batch 24 — crosshatch pen-stroke background */}
        {(bgCrossHatch ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: [
              `repeating-linear-gradient(45deg, ${bgCrossHatchColor ?? '#8b5cf6'} 0 1px, transparent 1px 10px)`,
              `repeating-linear-gradient(-45deg, ${bgCrossHatchColor ?? '#8b5cf6'} 0 1px, transparent 1px 10px)`,
            ].join(', '),
            opacity: (bgCrossHatchOpacity ?? 12) / 100,
          }} />
        )}

        {/* Batch 24 — water ripple concentric rings */}
        {(bgRipple ?? false) && (() => {
          const rc = encodeURIComponent(bgRippleColor ?? '#8b5cf6');
          const rings = Array.from({ length: 12 }, (_, i) => {
            const r = (i + 1) * 7;
            return `<circle cx="50%" cy="50%" r="${r}%" fill="none" stroke="${rc}" stroke-width="0.6" opacity="0.6"/>`;
          }).join('');
          return (
            <div className="absolute inset-0 pointer-events-none z-[1]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E${encodeURIComponent(rings)}%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              opacity: (bgRippleOpacity ?? 15) / 100,
            }} />
          );
        })()}

        {/* Batch 24 — tight conic spiral-like pattern */}
        {(bgSpiralConic ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 1.5deg, ${bgSpiralConicColor ?? '#8b5cf6'}50 1.5deg 3deg)`,
            opacity: (bgSpiralConicOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 24 — paper fold diagonal crease */}
        {(overlayPaperFold ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[38]" style={{
            background: 'linear-gradient(to bottom-right, transparent calc(50% - 1px), rgba(255,255,255,0.35) calc(50% - 1px), rgba(255,255,255,0.35) calc(50% + 1px), transparent calc(50% + 1px))',
            opacity: (overlayPaperFoldOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 24 — pixel art grid overlay */}
        {(overlayPixelGrid ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[38]" style={{
            backgroundImage: [
              'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px)',
              'linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '6px 6px',
            opacity: (overlayPixelGridOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 24 — cinematic letterbox bars */}
        {(textLetterboxBars ?? false) && (
          <>
            <div className="absolute inset-x-0 top-0 pointer-events-none z-[40]" style={{ height: '11%', background: '#000000' }} />
            <div className="absolute inset-x-0 bottom-0 pointer-events-none z-[40]" style={{ height: '11%', background: '#000000' }} />
          </>
        )}

        {/* Batch 23 — translucent color wash over background */}
        {(bgColorWash ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: bgColorWashColor ?? '#8b5cf6',
            opacity: (bgColorWashOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 23 — triangle tessellation background */}
        {(bgTrianglePattern ?? false) && (() => {
          const tc = encodeURIComponent(bgTriangleColor ?? '#8b5cf6');
          return (
            <div className="absolute inset-0 pointer-events-none z-[1]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='44'%3E%3Cpolygon points='25,2 48,42 2,42' fill='none' stroke='${tc}' stroke-width='0.8' opacity='0.7'/%3E%3Cpolygon points='0,44 50,44 25,4' fill='none' stroke='${tc}' stroke-width='0.8' opacity='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '50px 44px',
              opacity: (bgTriangleOpacity ?? 10) / 100,
            }} />
          );
        })()}

        {/* Batch 23 — animated spiral on background (SVG path) */}
        {(bgSpiral ?? false) && (() => {
          const sc = encodeURIComponent(bgSpiralColor ?? '#8b5cf6');
          const steps = 200, turns = 3;
          const pts: string[] = [];
          for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * turns * 2 * Math.PI;
            const r = (i / steps) * 44;
            pts.push(`${(50 + r * Math.cos(t)).toFixed(1)},${(50 + r * Math.sin(t)).toFixed(1)}`);
          }
          const d = encodeURIComponent('M' + pts.join('L'));
          return (
            <div className="absolute inset-0 pointer-events-none z-[1]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='${d}' fill='none' stroke='${sc}' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              opacity: (bgSpiralOpacity ?? 15) / 100,
            }} />
          );
        })()}

        {/* Batch 23 — color-burn dark overlay */}
        {(overlayColorBurn ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            background: overlayColorBurnColor ?? '#1a0a2e',
            mixBlendMode: 'multiply',
            opacity: (overlayColorBurnOpacity ?? 40) / 100,
          }} />
        )}

        {/* Batch 23 — bottom fog bank */}
        {(overlayFogBottom ?? false) && (
          <div className="absolute inset-x-0 bottom-0 pointer-events-none z-[35]" style={{
            height: '45%',
            background: `linear-gradient(to top, ${overlayFogBottomColor ?? '#ffffff'} 0%, ${overlayFogBottomColor ?? '#ffffff'}80 30%, transparent 80%)`,
            opacity: (overlayFogBottomOpacity ?? 40) / 100,
          }} />
        )}

        {/* Batch 22 — radial sunburst rays on background */}
        {(bgSunburst ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 5deg, ${bgSunburstColor ?? '#f59e0b'}40 5deg 10deg)`,
            opacity: (bgSunburstOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 22 — tiny dot starfield */}
        {(bgStarfield ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            backgroundPosition: '0 0, 14px 14px',
            opacity: (bgStarfieldOpacity ?? 30) / 100,
          }} />
        )}

        {/* Batch 22 — linen cloth texture */}
        {(bgLinenTexture ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: [
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0 1px, transparent 1px 6px)',
              'repeating-linear-gradient(-45deg, rgba(255,255,255,0.1) 0 1px, transparent 1px 6px)',
            ].join(', '),
            opacity: (bgLinenTextureOpacity ?? 12) / 100,
          }} />
        )}

        {/* Batch 22 — glass reflection diagonal sheen */}
        {(canvasGlassReflect ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[6]" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 45%, rgba(255,255,255,0.06) 100%)',
            opacity: (canvasGlassReflectOpacity ?? 25) / 100,
          }} />
        )}

        {/* Batch 22 — heatmap warm glow overlay */}
        {(overlayHeatmap ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,100,0,0.6) 0%, rgba(255,50,0,0.35) 45%, transparent 75%)',
            opacity: (overlayHeatmapOpacity ?? 30) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 22 — snow/static particle overlay */}
        {(overlaySnow ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[38]" style={{
            backgroundImage: [
              'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
              'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '20px 25px, 35px 40px',
            backgroundPosition: '0 0, 10px 12px',
            opacity: (overlaySnowOpacity ?? 20) / 100,
          }} />
        )}

        {/* Batch 21 — concentric rings background pattern */}
        {(bgConcentricRings ?? false) && (() => {
          const rc = encodeURIComponent(bgConcentricRingsColor ?? '#8b5cf6');
          const rings = [15, 25, 37, 51, 67, 85].map(r =>
            `<circle cx="50%" cy="50%" r="${r}%" fill="none" stroke="${rc}" stroke-width="0.8" opacity="0.7"/>`
          ).join('');
          return (
            <div className="absolute inset-0 pointer-events-none z-[1]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E${encodeURIComponent(rings)}%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              opacity: (bgConcentricRingsOpacity ?? 12) / 100,
            }} />
          );
        })()}

        {/* Batch 21 — dot matrix background */}
        {(bgDotMatrix ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `radial-gradient(circle, ${bgDotMatrixColor ?? '#8b5cf6'} 1px, transparent 1px)`,
            backgroundSize: '8px 8px',
            opacity: (bgDotMatrixOpacity ?? 10) / 100,
          }} />
        )}

        {/* Batch 21 — soft nebula cloud overlay */}
        {(bgNebula ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: [
              `radial-gradient(ellipse 70% 60% at 25% 35%, ${bgNebulaColor ?? '#7c3aed'}50 0%, transparent 60%)`,
              `radial-gradient(ellipse 55% 65% at 75% 65%, ${bgNebulaColor ?? '#7c3aed'}35 0%, transparent 55%)`,
              `radial-gradient(ellipse 80% 45% at 50% 50%, ${bgNebulaColor ?? '#7c3aed'}20 0%, transparent 65%)`,
            ].join(', '),
            opacity: (bgNebulaOpacity ?? 40) / 100,
          }} />
        )}

        {/* Batch 21 — radial edge fade vignette */}
        {(canvasRadialFade ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[5]" style={{
            background: `radial-gradient(ellipse 65% 65% at 50% 50%, transparent 30%, ${canvasRadialFadeColor ?? '#000000'}cc 100%)`,
          }} />
        )}

        {/* Batch 21 — conic-gradient light rays */}
        {(overlayLightRays ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            background: 'repeating-conic-gradient(from 0deg at 50% -10%, transparent 0deg 8deg, rgba(255,255,255,0.12) 8deg 9deg, transparent 9deg 17deg)',
            maskImage: 'radial-gradient(ellipse 90% 100% at 50% 0%, black 20%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 100% at 50% 0%, black 20%, transparent 85%)',
            opacity: (overlayLightRaysOpacity ?? 20) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 21 — 80s retrowave perspective floor grid */}
        {(overlayRetroGrid ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[8] overflow-hidden">
            <div style={{
              position: 'absolute', left: '-30%', right: '-30%', bottom: 0, height: '120%',
              backgroundImage: [
                `repeating-linear-gradient(90deg, rgba(255,0,180,0.6) 0 1px, transparent 1px 80px)`,
                `repeating-linear-gradient(0deg, rgba(255,0,180,0.5) 0 1px, transparent 1px 50px)`,
              ].join(', '),
              transform: 'perspective(350px) rotateX(55deg)',
              transformOrigin: '50% 100%',
              opacity: (overlayRetroGridOpacity ?? 30) / 100,
              maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)',
            }} />
          </div>
        )}

        {/* Batch 20 — colored background grid lines */}
        {(bgGridLines ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: [
              `linear-gradient(to right, ${bgGridLinesColor ?? '#8b5cf6'} 1px, transparent 1px)`,
              `linear-gradient(to bottom, ${bgGridLinesColor ?? '#8b5cf6'} 1px, transparent 1px)`,
            ].join(', '),
            backgroundSize: '40px 40px',
            opacity: (bgGridLinesOpacity ?? 12) / 100,
          }} />
        )}

        {/* Batch 20 — hex grid background */}
        {(bgHexGrid ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='60'%3E%3Cpolygon points='26 2 50 15 50 45 26 58 2 45 2 15' fill='none' stroke='${encodeURIComponent(bgHexGridColor ?? '#a78bfa')}' stroke-width='0.8' opacity='0.7'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgHexGridOpacity ?? 12) / 100,
          }} />
        )}

        {/* Batch 20 — circuit board trace pattern (color updated Batch 26) */}
        {(bgCircuitBoard ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M10 10 H30 V30 H50 M10 50 H20 V40 H40 V50 H55 M30 10 V5 M50 30 H55 M20 40 H5' fill='none' stroke='${encodeURIComponent(bgCircuitBoardColor ?? '#00ff64')}' stroke-width='0.8' opacity='0.7'/%3E%3Ccircle cx='30' cy='30' r='2.5' fill='${encodeURIComponent(bgCircuitBoardColor ?? '#00ff64')}' opacity='0.7'/%3E%3Ccircle cx='10' cy='10' r='2' fill='${encodeURIComponent(bgCircuitBoardColor ?? '#00ff64')}' opacity='0.6'/%3E%3Ccircle cx='20' cy='40' r='2' fill='${encodeURIComponent(bgCircuitBoardColor ?? '#00ff64')}' opacity='0.6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgCircuitBoardOpacity ?? 12) / 100,
          }} />
        )}

        {/* Batch 19 — large glow orb behind everything */}
        {(bgGlowOrb ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: `radial-gradient(ellipse 70% 70% at ${bgGlowOrbX ?? 50}% ${bgGlowOrbY ?? 50}%, ${bgGlowOrbColor ?? '#7c3aed'}70 0%, ${bgGlowOrbColor ?? '#7c3aed'}20 40%, transparent 70%)`,
          }} />
        )}

        {/* Batch 19 — diamond/argyle background pattern */}
        {(bgDiamondPattern ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='rgba(255,255,255,0.15)' stroke-width='0.8'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (bgDiamondOpacity ?? 15) / 100,
          }} />
        )}

        {/* Batch 18 — background waves SVG */}
        {(bgWaves ?? false) && (() => {
          const wc = encodeURIComponent(bgWavesColor ?? '#7c3aed');
          return (
            <div className="absolute inset-0 pointer-events-none z-[2]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E.wave%7Bfill:none;stroke:${wc};stroke-width:1.5;stroke-opacity:0.6%7D%3C/style%3E%3C/defs%3E%3Cpath class='wave' d='M0 40 Q80 20 160 40 Q240 60 320 40 Q400 20 480 40 Q560 60 640 40'/%3E%3Cpath class='wave' d='M0 80 Q80 60 160 80 Q240 100 320 80 Q400 60 480 80 Q560 100 640 80'/%3E%3Cpath class='wave' d='M0 120 Q80 100 160 120 Q240 140 320 120 Q400 100 480 120 Q560 140 640 120'/%3E%3Cpath class='wave' d='M0 160 Q80 140 160 160 Q240 180 320 160 Q400 140 480 160 Q560 180 640 160'/%3E%3Cpath class='wave' d='M0 200 Q80 180 160 200 Q240 220 320 200 Q400 180 480 200 Q560 220 640 200'/%3E%3Cpath class='wave' d='M0 240 Q80 220 160 240 Q240 260 320 240 Q400 220 480 240 Q560 260 640 240'/%3E%3Cpath class='wave' d='M0 280 Q80 260 160 280 Q240 300 320 280 Q400 260 480 280 Q560 300 640 280'/%3E%3Cpath class='wave' d='M0 320 Q80 300 160 320 Q240 340 320 320 Q400 300 480 320 Q560 340 640 320'/%3E%3C/svg%3E")`,
              opacity: (bgWavesOpacity ?? 20) / 100,
            }} />
          );
        })()}

        {/* Batch 18 — gradient mesh overlay */}
        {(overlayGradientMesh ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[8]" style={{
            background: [
              `radial-gradient(ellipse 60% 50% at 20% 30%, rgba(139,92,246,0.55) 0%, transparent 60%)`,
              `radial-gradient(ellipse 50% 60% at 80% 70%, rgba(236,72,153,0.45) 0%, transparent 55%)`,
              `radial-gradient(ellipse 55% 45% at 60% 10%, rgba(6,182,212,0.35) 0%, transparent 50%)`,
              `radial-gradient(ellipse 40% 50% at 10% 80%, rgba(245,158,11,0.3) 0%, transparent 50%)`,
            ].join(', '),
            opacity: (overlayGradientMeshOpacity ?? 40) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 20 — dust and scratches overlay */}
        {(overlayDust ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[38]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cline x1='10' y1='30' x2='15' y2='32' stroke='rgba(255,255,255,0.6)' stroke-width='0.5'/%3E%3Cline x1='80' y1='5' x2='82' y2='140' stroke='rgba(255,255,255,0.3)' stroke-width='0.4'/%3E%3Cline x1='150' y1='20' x2='152' y2='100' stroke='rgba(255,255,255,0.2)' stroke-width='0.3'/%3E%3Ccircle cx='50' cy='80' r='1' fill='rgba(255,255,255,0.4)'/%3E%3Ccircle cx='130' cy='150' r='0.8' fill='rgba(255,255,255,0.3)'/%3E%3Cline x1='40' y1='170' x2='43' y2='195' stroke='rgba(255,255,255,0.25)' stroke-width='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: (overlayDustOpacity ?? 25) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 20 — ink bleed grunge overlay */}
        {(overlayInkBleed ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='ib'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4' seed='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 8 -4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ib)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px',
            opacity: (overlayInkBleedOpacity ?? 30) / 100,
            mixBlendMode: 'multiply',
          }} />
        )}

        {/* Batch 20 — film strip perforations */}
        {(frameFilmStrip ?? false) && (() => {
          const holes = Array.from({ length: 8 });
          return (
            <>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 22, background: '#0a0a0a', zIndex: 36, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', paddingTop: 8, paddingBottom: 8 }}>
                {holes.map((_, i) => <div key={i} style={{ width: 10, height: 8, borderRadius: 2, background: '#222', border: '1px solid #444' }} />)}
              </div>
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 22, background: '#0a0a0a', zIndex: 36, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', paddingTop: 8, paddingBottom: 8 }}>
                {holes.map((_, i) => <div key={i} style={{ width: 10, height: 8, borderRadius: 2, background: '#222', border: '1px solid #444' }} />)}
              </div>
            </>
          );
        })()}

        {/* Batch 19 — holographic iridescent overlay */}
        {(overlayHolographic ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[9]" style={{
            background: `conic-gradient(from 0deg at 50% 50%, rgba(255,0,128,0.18) 0deg, rgba(255,128,0,0.14) 45deg, rgba(255,255,0,0.12) 90deg, rgba(0,255,128,0.14) 135deg, rgba(0,200,255,0.16) 180deg, rgba(100,0,255,0.14) 225deg, rgba(255,0,200,0.16) 270deg, rgba(255,0,128,0.18) 360deg)`,
            opacity: (overlayHolographicOpacity ?? 35) / 100,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 19 — image bloom light from top */}
        {(imageBloomLight ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[7]" style={{
            background: `radial-gradient(ellipse 80% 40% at 50% 0%, ${imageBloomLightColor ?? '#ffffff'}40 0%, transparent 65%)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 19 — card glass overlay panel */}
        {(cardGlassOverlay ?? false) && (
          <div className="absolute pointer-events-none z-[37]" style={{
            left: '5%', right: '5%', bottom: '5%',
            height: '45%',
            background: cardGlassOverlayBg ?? '#ffffff18',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
          }} />
        )}

        {/* Batch 18 — canvas spotlight radial */}
        {(canvasSpotlight ?? false) && (
          <div className="absolute inset-0 pointer-events-none z-[6]" style={{
            background: `radial-gradient(ellipse 55% 55% at 50% 45%, ${canvasSpotlightColor ?? '#ffffff'}${Math.round((canvasSpotlightStrength ?? 50) / 100 * 80).toString(16).padStart(2,'0')} 0%, transparent 70%)`,
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Batch 19 — tiled diagonal watermark text */}
        {(watermarkTiled ?? false) && (watermarkTiledText ?? '').length > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[25] overflow-hidden" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            {Array.from({ length: 6 }).map((_, row) => (
              <div key={row} style={{ display: 'flex', gap: 40, transform: `translateX(${row % 2 === 0 ? 0 : -80}px) rotate(-25deg)`, whiteSpace: 'nowrap', opacity: 0.12 }}>
                {Array.from({ length: 5 }).map((_, col) => (
                  <span key={col} style={{ fontSize: 13, fontWeight: 700, color: '#ffffff', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, system-ui', userSelect: 'none' }}>
                    {watermarkTiledText}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        {watermark && (
          <div style={{
            position: 'absolute', zIndex: 30,
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 10px', borderRadius: 999,
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)',
            opacity: (watermarkOpacity ?? 70) / 100,
            ...getWatermarkPositionStyle(watermarkPosition ?? 'br'),
          }}>
            {!(watermarkText ?? '') ? (
              <>
                <svg width="12" height="12" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#wg2)" />
                  <defs>
                    <linearGradient id="wg2" x1="0" y1="0" x2="32" y2="32">
                      <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <span style={{ fontSize: watermarkSize ?? 10, fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>SnapFrame</span>
              </>
            ) : (
              <span style={{ fontSize: watermarkSize ?? 11, fontWeight: 500, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em', fontFamily: 'Inter, system-ui' }}>{watermarkText}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasPreview;
