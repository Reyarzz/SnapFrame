import React from 'react';

const Footer: React.FC = () => (
  <footer className="flex flex-col items-center py-10 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
    <div className="w-full max-w-6xl flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#7c3aed] flex items-center justify-center flex-shrink-0">
          <svg width="10" height="10" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="7" width="24" height="16" rx="3" fill="white" opacity="0.9" />
            <path d="M9 26h14" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </svg>
        </div>
        <span className="text-[12px] font-semibold" style={{ color: 'rgba(228,228,231,0.35)' }}>SnapFrame</span>
      </div>

      <p className="text-[11px] text-center max-w-sm leading-relaxed" style={{ color: 'rgba(228,228,231,0.22)' }}>
        Free screenshot beautifier. No signup, no install, runs entirely in your browser.
      </p>

      <div className="flex items-center gap-5 text-[10px]" style={{ color: 'rgba(228,228,231,0.18)' }}>
        <span>PNG, JPEG, WebP</span>
        <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
        <span>2× resolution</span>
        <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
        <span>Client-side only</span>
      </div>
    </div>
  </footer>
);

export default Footer;
