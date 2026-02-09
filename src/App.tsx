import React, { useState, useRef, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas-pro';
import { Sparkles, ArrowRight } from 'lucide-react';
import { DEFAULT_STATE, EditorState } from './presets';
import DropZone from './components/DropZone';
import CanvasPreview from './components/CanvasPreview';
import ControlsPanel from './components/ControlsPanel';
import PaywallModal from './components/PaywallModal';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

const MAX_HISTORY = 50;

const App: React.FC = () => {
  const [state, setState] = useState<EditorState>(() => {
    const savedLicense = localStorage.getItem('snapframe_license');
    if (savedLicense) {
      return { ...DEFAULT_STATE, isPro: true, watermark: false };
    }
    return { ...DEFAULT_STATE };
  });
  const [showPaywall, setShowPaywall] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Undo/Redo history
  const [history, setHistory] = useState<EditorState[]>([]);
  const [future, setFuture] = useState<EditorState[]>([]);
  const skipHistoryRef = useRef(false);

  const updateState = useCallback((partial: Partial<EditorState>) => {
    setState((prev) => {
      const next = { ...prev, ...partial };
      if (!skipHistoryRef.current) {
        setHistory((h) => [...h.slice(-MAX_HISTORY), prev]);
        setFuture([]);
      }
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      const rest = h.slice(0, -1);
      setState((current) => {
        setFuture((f) => [...f, current]);
        return prev;
      });
      return rest;
    });
  }, []);

  const redo = useCallback(() => {
    setFuture((f) => {
      if (f.length === 0) return f;
      const next = f[f.length - 1];
      const rest = f.slice(0, -1);
      setState((current) => {
        setHistory((h) => [...h, current]);
        return next;
      });
      return rest;
    });
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
    setState((prev) => {
      setHistory((h) => [...h.slice(-MAX_HISTORY), prev]);
      setFuture([]);
      return {
        ...DEFAULT_STATE,
        image: prev.image,
        fileName: prev.fileName,
        isPro: prev.isPro,
        watermark: prev.isPro ? false : true,
      };
    });
  }, []);

  const handleCopy = useCallback(async () => {
    if (!canvasRef.current) return;
    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        }
      }, 'image/png');
    } catch (err) {
      console.error('Copy failed:', err);
    }
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // Ctrl/Cmd+Z = Undo (not in input fields)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && !isInput) {
        e.preventDefault();
        undo();
        return;
      }

      // Ctrl/Cmd+Shift+Z or Ctrl/Cmd+Y = Redo
      if ((e.ctrlKey || e.metaKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y') && !isInput) {
        e.preventDefault();
        redo();
        return;
      }

      // Ctrl/Cmd+E = Export PNG
      if ((e.ctrlKey || e.metaKey) && e.key === 'e' && state.image) {
        e.preventDefault();
        handleExport('png');
        return;
      }

      // Ctrl/Cmd+Shift+C = Copy to clipboard
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C' && state.image) {
        e.preventDefault();
        handleCopy();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleExport, handleCopy, state.image]);

  return (
    <div className="noise w-full min-h-screen">
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
      <div ref={editorRef} className={`w-full ${state.image ? 'pt-20' : ''}`}>
        <section className="flex flex-col items-center w-full px-4 py-12">
          {!state.image ? (
            <div className="w-full max-w-2xl py-12">
              <DropZone onImageLoad={handleImageLoad} />
            </div>
          ) : (
            <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
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
              <div className="lg:border-l lg:border-white/10 lg:sticky lg:top-24 lg:self-start">
                <ControlsPanel
                  state={state}
                  onChange={updateState}
                  onExport={handleExport}
                  onCopy={handleCopy}
                  copySuccess={copySuccess}
                  onReset={handleReset}
                  onUpgrade={handleUpgrade}
                  onRemoveImage={handleRemoveImage}
                  onUndo={undo}
                  onRedo={redo}
                  canUndo={history.length > 0}
                  canRedo={future.length > 0}
                />
              </div>
            </div>
          )}
        </section>
      </div>

      {/* How it works */}
      {!state.image && (
        <>
          <section className="flex flex-col items-center py-24 px-4">
            <div className="w-full max-w-5xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Three steps. That's it.
                </h2>
                <p className="text-white/40 max-w-md mx-auto">
                  No account, no learning curve, no waiting.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    step: '1',
                    title: 'Drop your screenshot',
                    desc: 'Drag and drop any image, or paste directly from your clipboard with Ctrl+V.',
                  },
                  {
                    step: '2',
                    title: 'Pick a style',
                    desc: 'Choose from 20+ gradient backgrounds, add device frames, shadows, rounded corners.',
                  },
                  {
                    step: '3',
                    title: 'Export',
                    desc: 'Download as PNG, JPEG, or WebP at 2x resolution. Ready to share anywhere.',
                  },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-11 h-11 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center mx-auto mb-5">
                      <span className="text-sm font-bold text-white/60">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="flex flex-col items-center py-20 px-4 border-t border-white/5">
            <div className="w-full max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-white mb-8">
                All included, all free
              </h2>

              <div className="flex flex-wrap justify-center gap-3">
                {[
                  '20+ gradients', 'Custom colors', 'Browser frames', 'macOS frames',
                  'iPhone mockup', 'Shadows', 'Rounded corners', '3D tilt',
                  'Text overlay', 'Canvas presets', 'PNG / JPEG / WebP', '2x resolution',
                  'Quick styles', 'Copy to clipboard', 'Background images', 'Undo / Redo',
                  'Keyboard shortcuts',
                ].map((label, i) => (
                  <span key={i} className="px-4 py-2 rounded-full text-sm text-white/50 bg-white/[0.03] ring-1 ring-white/[0.06]">
                    {label}
                  </span>
                ))}
              </div>

              <p className="text-white/25 text-sm mt-6">
                Pay once to remove the watermark. That's it.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="flex flex-col items-center py-24 px-4">
            <div className="w-full max-w-md text-center">
              <button
                onClick={scrollToEditor}
                className="group px-8 py-4 rounded-2xl font-bold text-white text-lg
                  bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600
                  transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/25 hover:scale-105
                  inline-flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Try It Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-white/20 text-xs mt-4">No signup required</p>
            </div>
          </section>
        </>
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
