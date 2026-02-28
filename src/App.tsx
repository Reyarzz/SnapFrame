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
        scale: state.exportScale ?? 2,
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
  }, [state.fileName, state.exportScale]);

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
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#7c3aed] flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="7" width="24" height="16" rx="3" fill="white" opacity="0.92"/>
                <path d="M9 26h14" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </div>
            <span className="font-semibold text-[14px] text-white/90 tracking-tight">SnapFrame</span>
            {state.isPro && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/20">
                PRO
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!state.isPro && (
              <button
                onClick={handleUpgrade}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium
                  text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10 transition-all border border-amber-500/15 hover:border-amber-500/30"
              >
                <Sparkles className="w-3 h-3" />
                Upgrade
              </button>
            )}
            {!state.image && (
              <button
                onClick={scrollToEditor}
                className="px-3 py-1.5 rounded-md text-[12px] font-medium text-white/50
                  hover:text-white/80 hover:bg-white/[0.06] transition-all border border-white/[0.07] hover:border-white/[0.12]"
              >
                Try It
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      {!state.image && <HeroSection onScrollToEditor={scrollToEditor} />}

      {/* Editor */}
      <div ref={editorRef} className={`w-full ${state.image ? 'pt-[4.25rem]' : ''}`}>
        {!state.image ? (
          <section className="flex flex-col items-center w-full px-4 py-12">
            <div className="w-full max-w-2xl py-12">
              <DropZone onImageLoad={handleImageLoad} />
            </div>
          </section>
        ) : (
          /* Side-by-side layout: canvas left, controls right */
          <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-4.25rem)]">
            {/* Canvas preview area */}
            <div className="flex-1 min-w-0 flex flex-col bg-[#080809]">
              <div className="lg:sticky lg:top-[4.25rem] flex flex-col p-3 sm:p-4 gap-3">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 flex-shrink-0" />
                    <span className="text-[11px] text-white/40 font-mono truncate max-w-[180px]">{state.fileName || 'untitled'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {isExporting && (
                      <div className="flex items-center gap-1.5 text-[11px] text-white/40 mr-2">
                        <div className="w-3 h-3 border border-white/20 border-t-white/60 rounded-full animate-spin" />
                        Exporting…
                      </div>
                    )}
                    <button onClick={handleRemoveImage} title="New image"
                      className="px-2.5 py-1 rounded-md text-[10px] font-medium text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all border border-white/[0.06] hover:border-white/[0.10]">
                      ← New
                    </button>
                  </div>
                </div>

                {/* Preview container */}
                <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.07)] bg-[#0a0a0c]">
                  <div className="flex items-center justify-center min-h-[260px] sm:min-h-[420px] lg:min-h-[520px] p-4 sm:p-6">
                    <CanvasPreview state={state} canvasRef={canvasRef} />
                  </div>
                </div>
              </div>
            </div>

            {/* Controls sidebar */}
            <div className="lg:sticky lg:top-[4.25rem] lg:self-start shrink-0">
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
                isExporting={isExporting}
              />
            </div>
          </div>
        )}
      </div>

      {/* How it works */}
      {!state.image && (
        <>
          <section className="flex flex-col items-center py-20 px-4">
            <div className="w-full max-w-4xl">
              <div className="text-center mb-14">
                <h2 className="text-2xl font-bold text-white/90 mb-2">
                  Three steps. That's it.
                </h2>
                <p className="text-[14px] text-white/35">
                  No account. No learning curve. No waiting.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.05]">
                {[
                  {
                    step: '01',
                    title: 'Drop your screenshot',
                    desc: 'Drag & drop any image, or paste from clipboard with Ctrl+V.',
                  },
                  {
                    step: '02',
                    title: 'Apply a style',
                    desc: 'Choose from 20+ backgrounds, device frames, shadows, and effects.',
                  },
                  {
                    step: '03',
                    title: 'Export',
                    desc: 'Download as PNG, JPEG, or WebP at 2x resolution, or copy to clipboard.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0e0e12] p-8">
                    <span className="block text-[11px] font-bold text-brand-600/70 tracking-[0.15em] uppercase mb-4">{item.step}</span>
                    <h3 className="text-[15px] font-semibold text-white/85 mb-2">{item.title}</h3>
                    <p className="text-[13px] text-white/35 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="flex flex-col items-center py-16 px-4 border-t border-white/[0.04]">
            <div className="w-full max-w-3xl text-center">
              <p className="text-[11px] font-bold text-white/25 tracking-[0.15em] uppercase mb-6">Everything included, free</p>

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  '20+ gradients', 'Custom colors', 'Browser frames', 'macOS frames',
                  'iPhone mockup', 'Shadows & glows', 'Rounded corners', '3D tilt',
                  'Text overlay', 'Canvas presets', 'PNG / JPEG / WebP', '2× resolution',
                  'Quick styles', 'Copy to clipboard', 'Background images', 'Undo / Redo',
                  'Keyboard shortcuts',
                ].map((label, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-md text-[12px] text-white/40 bg-white/[0.03] border border-white/[0.05]">
                    {label}
                  </span>
                ))}
              </div>

              <p className="text-white/20 text-[12px] mt-6">
                Pay once ($9.99) to remove the watermark.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="flex flex-col items-center py-20 px-4">
            <div className="w-full max-w-sm text-center">
              <button
                onClick={scrollToEditor}
                className="group w-full px-6 py-3.5 rounded-xl font-semibold text-white text-[15px]
                  bg-[#7c3aed] hover:bg-[#6d28d9]
                  transition-all duration-200 hover:shadow-xl hover:shadow-violet-900/40
                  inline-flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-4 h-4" />
                Open Editor
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <p className="text-white/20 text-[11px] mt-3">No signup required</p>
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
