import React from 'react';
import { Twitter, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="border-t border-white/5 py-12 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="8" width="20" height="14" rx="2" fill="white" opacity="0.9" />
            <path d="M10 24h12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          </svg>
        </div>
        <span className="font-bold text-white/70">SnapFrame</span>
        <span className="text-xs text-white/20">v1.0</span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm text-white/30">
        <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
        <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
        <a href="#" className="hover:text-white/60 transition-colors">Support</a>
      </div>

      {/* Social */}
      <div className="flex items-center gap-4">
        <a href="#" className="text-white/20 hover:text-white/50 transition-colors">
          <Twitter className="w-4 h-4" />
        </a>
        <a href="#" className="text-white/20 hover:text-white/50 transition-colors">
          <Github className="w-4 h-4" />
        </a>
        <span className="text-xs text-white/20 flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> 
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
