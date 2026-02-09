import React, { useState, useRef, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas-pro';
import { Sparkles } from 'lucide-react';
import { DEFAULT_STATE, EditorState } from './presets';
import DropZone from './components/DropZone';
import CanvasPreview from './components/CanvasPreview';
import ControlsPanel from './components/ControlsPanel';
import PaywallModal from './components/PaywallModal';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [state, setState] = useState<EditorState>({ ...DEFAULT_STATE });
  const [showPaywall, setShowPaywall] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const updateState = useCallback((partial: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleImageLoad = useCallback((dataUrl: string, fileName: string) => {
    updateState({ image: dataUrl, fileName });
  }, [updateState]);

  const handleExport = useCallback(async (format: 'png' | 'jpeg' | 'webp') => {
    if (!canvasRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
      const quality = format === 'jpeg' ? 0.95 : undefined;
      const dataUrl = canvas.toDataURL(mimeType, quality);

      const link = document.createElement('a');
      const baseName = state.fileName ? state.fileName.replace(/\.[^.]+$/, '') : 'screenshot';
      link.download = `${baseName}-snapframe.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  }, [state.fileName]);

  const handleReset = useCallback(() => {
    setState((prev) => ({
      ...DEFAULT_STATE,
      image: prev.image,
      fileName: prev.fileName,
      isPro: prev.isPro,
      watermark: prev.isPro ? false : true,
    }));
  }, []);

  const handleUpgrade = useCallback(() => {
    setShowPaywall(true);
  }, []);

  const handleActivatePro = useCallback(() => {
    updateState({ isPro: true, watermark: false });
  }, [updateState]);

  const handleRemoveImage = useCallback(() => {
    updateState({ image: null, fileName: '' });
  }, [updateState]);

  const scrollToEditor = useCallback(() => {
    editorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Global paste handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              if (ev.target?.result) {
                handleImageLoad(ev.target.result as string, 'clipboard-image.png');
              }
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleImageLoad]);

  return (
    <div className="noise">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="8" width="20" height="14" rx="2" fill="white" opacity="0.9" />
                <path d="M10 24h12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              </svg>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">SnapFrame</span>
            {state.isPro && (
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 text-[10px] font-bold ring-1 ring-amber-500/30">
                PRO
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!state.isPro && (
              <button
                onClick={handleUpgrade}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
                  bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-300
                  hover:from-amber-500/20 hover:to-orange-500/20 transition-all
                  ring-1 ring-amber-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Go Pro
              </button>
            )}
            <button
              onClick={scrollToEditor}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-500/20 text-brand-300
                hover:bg-brand-500/30 transition-all"
            >
              Open Editor
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      {!state.image && <HeroSection onScrollToEditor={scrollToEditor} />}

      {/* Editor */}
      <div ref={editorRef} className={`${state.image ? 'pt-20' : ''}`}>
        <section className="max-w-7xl mx-auto px-4 py-12">
          {!state.image ? (
            <div className="py-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2" id="editor">
                  Start Here
                </h2>
                <p className="text-white/40">
                  Drop an image or paste from clipboard to get started
                </p>
              </div>
              <DropZone onImageLoad={handleImageLoad} />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Canvas preview area */}
              <div className="flex-1 min-w-0">
                <div className="sticky top-20">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      {state.fileName || 'Untitled'}
                    </div>
                    {isExporting && (
                      <div className="flex items-center gap-2 text-sm text-brand-400">
                        <div className="w-3 h-3 border-2 border-brand-400/30 border-t-brand-400 rounded-full animate-spin" />
                        Exporting...
                      </div>
                    )}
                  </div>

                  {/* Preview container */}
                  <div className="rounded-xl overflow-hidden ring-1 ring-white/10 bg-[#0a0a1a] checkerboard">
                    <div className="flex items-center justify-center min-h-[400px] p-4">
                      <CanvasPreview state={state} canvasRef={canvasRef} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls sidebar */}
              <div className="lg:border-l lg:border-white/10">
                <ControlsPanel
                  state={state}
                  onChange={updateState}
                  onExport={handleExport}
                  onReset={handleReset}
                  onUpgrade={handleUpgrade}
                  onRemoveImage={handleRemoveImage}
                />
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Social proof section */}
      {!state.image && (
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">
                Why creators love SnapFrame
              </h2>
              <p className="text-white/40 max-w-xl mx-auto">
                Join thousands of developers, designers, and marketers who make their content shine
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Lightning Fast',
                  desc: 'Drop an image, pick a style, export. Done in under 5 seconds.',
                  gradient: 'from-amber-500/10 to-orange-500/10',
                  borderColor: 'ring-amber-500/20',
                  emoji: '⚡',
                },
                {
                  title: 'Gorgeous Results',
                  desc: '20+ hand-crafted gradients, device frames, and shadow presets.',
                  gradient: 'from-brand-500/10 to-pink-500/10',
                  borderColor: 'ring-brand-500/20',
                  emoji: '✨',
                },
                {
                  title: 'No Design Skills',
                  desc: 'Beautiful screenshots without Photoshop. Just drag, drop, and share.',
                  gradient: 'from-green-500/10 to-emerald-500/10',
                  borderColor: 'ring-green-500/20',
                  emoji: '🎨',
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 bg-gradient-to-br ${card.gradient} ring-1 ${card.borderColor}
                    hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-3xl mb-4">{card.emoji}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-white/50">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="mt-16 text-center">
              <div className="inline-block  max-w-lg rounded-2xl p-8 bg-white/[0.03] ring-1 ring-white/10">
                <p className="text-white/60 italic mb-4">
                  "I used to spend 10 minutes in Figma for every screenshot. Now it takes me 5 seconds with SnapFrame. Absolute game changer."
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-pink-500" />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white/80">Sarah Chen</div>
                    <div className="text-xs text-white/30">Developer Advocate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onActivate={handleActivatePro}
      />
    </div>
  );
};

export default App;
