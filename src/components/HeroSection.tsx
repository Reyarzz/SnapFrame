import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollToEditor: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToEditor }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-violet-900/[0.12] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-800/[0.08] rounded-full blur-[120px]" />
      </div>

      {/* Badge */}
      <div className="relative z-10 mb-8 animate-fade-in-up">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium
          text-white/50 border border-white/[0.08] bg-white/[0.03]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Free · No signup · Runs in your browser
        </span>
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-center max-w-3xl mx-auto mb-5 animate-fade-in-up">
        <span className="block text-[48px] sm:text-[62px] lg:text-[72px] font-black text-white leading-[1.05] tracking-[-0.03em]">
          Screenshot
        </span>
        <span className="block text-[48px] sm:text-[62px] lg:text-[72px] font-black leading-[1.05] tracking-[-0.03em] text-white/25">
          Beautifier
        </span>
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-center text-[15px] sm:text-[17px] text-white/45 max-w-lg mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.08s' }}>
        Drop a screenshot. Pick a background. Export.
        Gradient fills, device frames, shadows and more —
        zero friction.
      </p>

      {/* CTA */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 mb-20 animate-fade-in-up" style={{ animationDelay: '0.16s' }}>
        <button
          onClick={onScrollToEditor}
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white text-[15px]
            bg-[#7c3aed] hover:bg-[#6d28d9]
            transition-all duration-200 hover:shadow-xl hover:shadow-violet-900/50"
        >
          <Sparkles className="w-4 h-4" />
          Try it free
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
        <span className="text-[12px] text-white/25">No signup required</span>
      </div>

      {/* Before / After mockup */}
      <div className="relative z-10 w-full max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.24s' }}>
        <div className="rounded-xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/60">
          <div className="flex items-stretch">
            {/* Before */}
            <div className="flex-1 bg-[#111115] p-7 flex flex-col items-center justify-center border-r border-white/[0.05]">
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/20 font-semibold mb-5">Before</span>
              <div className="w-full max-w-[180px] rounded-md overflow-hidden bg-[#1e1e2e] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#252540]">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]/70" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]/70" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]/70" />
                </div>
                <div className="p-3 space-y-2">
                  <div className="h-1.5 bg-white/[0.07] rounded-full w-3/4" />
                  <div className="h-1.5 bg-white/[0.05] rounded-full w-full" />
                  <div className="h-1.5 bg-white/[0.07] rounded-full w-1/2" />
                  <div className="h-1.5 bg-white/[0.05] rounded-full w-5/6" />
                </div>
              </div>
            </div>

            {/* After */}
            <div className="flex-1 p-7 flex flex-col items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #0f2158 100%)' }}>
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-5">After</span>
              <div className="w-full max-w-[180px] rounded-xl overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-white/10">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#252540]">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                </div>
                <div className="p-3 space-y-2 bg-[#1e1e2e]">
                  <div className="h-1.5 bg-brand-400/35 rounded-full w-3/4" />
                  <div className="h-1.5 bg-violet-400/20 rounded-full w-full" />
                  <div className="h-1.5 bg-brand-400/25 rounded-full w-1/2" />
                  <div className="h-1.5 bg-violet-400/30 rounded-full w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={onScrollToEditor}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/15 hover:text-white/30 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  );
};

export default HeroSection;
