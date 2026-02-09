import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Image as ImageIcon,
  Share2,
  Star,
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px]" />
      </div>

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 ring-1 ring-white/10 mb-8 animate-fade-in-up">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span className="text-xs text-white/60 font-medium">Loved by 10,000+ creators</span>
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-center max-w-4xl mx-auto mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
          Make Your Screenshots
        </span>
        <span className="block text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight bg-gradient-to-r from-brand-400 via-pink-400 to-brand-400 bg-clip-text text-transparent animate-gradient">
          Look Incredible
        </span>
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-center text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Transform boring screenshots into stunning, share-worthy images in seconds.
        Add gorgeous backgrounds, device frames, and shadows — no design skills needed.
      </p>

      {/* CTA */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={onScrollToEditor}
          className="group px-8 py-4 rounded-2xl font-bold text-white text-lg
            bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600
            transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/25 hover:scale-105
            flex items-center gap-3"
        >
          <Sparkles className="w-5 h-5" />
          Start Beautifying — Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <span className="text-sm text-white/30">No signup required</span>
      </div>

      {/* Features row */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        {[
          { icon: <Zap className="w-5 h-5 text-amber-400" />, label: 'Instant export' },
          { icon: <ImageIcon className="w-5 h-5 text-brand-400" />, label: '20+ backgrounds' },
          { icon: <Share2 className="w-5 h-5 text-green-400" />, label: 'Share-ready' },
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm text-white/50">
            {feature.icon}
            {feature.label}
          </div>
        ))}
      </div>

      {/* Preview mockup */}
      <div className="relative z-10 w-full max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-brand-500/10">
          <div className="aspect-video bg-gradient-to-br from-brand-500/20 via-pink-500/10 to-brand-500/20 flex items-center justify-center p-8">
            {/* Fake screenshot preview */}
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-2xl shadow-black/40" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: 32,
            }}>
              <div className="rounded-lg overflow-hidden bg-[#1e1e2e] shadow-lg">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#2d2d4e]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-2 bg-brand-400/30 rounded w-3/4" />
                  <div className="h-2 bg-pink-400/20 rounded w-full" />
                  <div className="h-2 bg-brand-400/20 rounded w-1/2" />
                  <div className="h-2 bg-pink-400/30 rounded w-5/6" />
                  <div className="h-2 bg-brand-400/20 rounded w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 via-pink-500/20 to-brand-500/20 rounded-3xl blur-2xl -z-10" />
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
