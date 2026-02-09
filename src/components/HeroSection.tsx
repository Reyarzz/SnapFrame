import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Image as ImageIcon,
  Clipboard,
  ChevronDown,
} from 'lucide-react';

interface HeroSectionProps {
  onScrollToEditor: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToEditor }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-center max-w-4xl mx-auto mb-6 animate-fade-in-up">
        <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
          Screenshot Beautifier
        </span>
        <span className="block text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight bg-gradient-to-r from-brand-400 via-pink-400 to-brand-400 bg-clip-text text-transparent animate-gradient">
          That Just Works
        </span>
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-center text-lg sm:text-xl text-white/50 max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Drop a screenshot, pick a background, export. Backgrounds, device frames,
        shadows, and more — no signup, no Figma, no fuss.
      </p>

      {/* CTA */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <button
          onClick={onScrollToEditor}
          className="group px-8 py-4 rounded-2xl font-bold text-white text-lg
            bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600
            transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/25 hover:scale-105
            flex items-center gap-3"
        >
          <Sparkles className="w-5 h-5" />
          Try It Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <span className="text-sm text-white/30">No signup required</span>
      </div>

      {/* Features row */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        {[
          { icon: <Zap className="w-5 h-5 text-amber-400" />, label: 'Export in one click' },
          { icon: <ImageIcon className="w-5 h-5 text-brand-400" />, label: '20+ backgrounds' },
          { icon: <Clipboard className="w-5 h-5 text-green-400" />, label: 'Paste from clipboard' },
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm text-white/50">
            {feature.icon}
            {feature.label}
          </div>
        ))}
      </div>

      {/* Preview: before/after concept */}
      <div className="relative z-10 w-full max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-brand-500/10">
          <div className="flex items-stretch">
            {/* Before: plain screenshot */}
            <div className="flex-1 bg-[#1a1a2e] p-6 flex flex-col items-center justify-center border-r border-white/5">
              <span className="text-[10px] uppercase tracking-widest text-white/20 font-semibold mb-4">Before</span>
              <div className="w-full max-w-[200px] rounded-md overflow-hidden bg-[#1e1e2e] ring-1 ring-white/5">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#252540]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="p-3 space-y-1.5">
                  <div className="h-1.5 bg-white/10 rounded w-3/4" />
                  <div className="h-1.5 bg-white/7 rounded w-full" />
                  <div className="h-1.5 bg-white/10 rounded w-1/2" />
                  <div className="h-1.5 bg-white/7 rounded w-5/6" />
                </div>
              </div>
            </div>

            {/* After: beautified */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-4">After</span>
              <div className="w-full max-w-[200px] rounded-xl overflow-hidden shadow-2xl shadow-black/40">
                <div className="rounded-lg overflow-hidden bg-[#1e1e2e]">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#252540]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="p-3 space-y-1.5">
                    <div className="h-1.5 bg-brand-400/30 rounded w-3/4" />
                    <div className="h-1.5 bg-pink-400/20 rounded w-full" />
                    <div className="h-1.5 bg-brand-400/20 rounded w-1/2" />
                    <div className="h-1.5 bg-pink-400/30 rounded w-5/6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={onScrollToEditor}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/20 hover:text-white/40 transition-colors"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSection;
