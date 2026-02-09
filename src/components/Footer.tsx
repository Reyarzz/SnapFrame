import React from 'react';

const Footer: React.FC = () => (
  <footer className="flex flex-col items-center border-t border-white/5 py-12 px-4">
    <div className="w-full max-w-6xl flex flex-col items-center gap-5">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="8" width="20" height="14" rx="2" fill="white" opacity="0.9" />
            <path d="M10 24h12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          </svg>
        </div>
        <span className="font-semibold text-white/50">SnapFrame</span>
      </div>

      <p className="text-sm text-white/25 text-center max-w-md leading-relaxed">
        Free screenshot beautifier. No signup, no install, runs entirely in your browser.
      </p>

      <div className="flex items-center gap-6 text-xs text-white/15">
        <span>PNG, JPEG, WebP</span>
        <span className="w-1 h-1 rounded-full bg-white/10" />
        <span>2x resolution</span>
        <span className="w-1 h-1 rounded-full bg-white/10" />
        <span>Client-side only</span>
      </div>
    </div>
  </footer>
);

export default Footer;
