import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Palette, Download, Sparkles, RotateCcw,
  Smartphone, Globe, MonitorSmartphone, X, Type,
  SlidersHorizontal, Maximize, Copy, Check,
  Undo2, Redo2, Wand2, ImagePlus, Trash2,
  RotateCw, Layers, Terminal,
  Monitor, Tablet, Share2, Shuffle,
  Camera, Newspaper, Laptop, Grid3X3,
  Tv2, BookOpen,
} from 'lucide-react';
import {
  EditorState, GRADIENT_PRESETS, MESH_PRESETS,
  SHADOW_COLORS, GLOW_COLORS, ASPECT_PRESETS,
  BG_PATTERNS, TITLE_FONTS, STYLE_TEMPLATES, FILM_LOOKS, IMAGE_PRESETS,
} from '../presets';

interface ControlsPanelProps {
  state: EditorState;
  onChange: (partial: Partial<EditorState>) => void;
  onExport: (format: 'png' | 'jpeg' | 'webp') => void;
  onCopy: () => void;
  copySuccess: boolean;
  onReset: () => void;
  onUpgrade: () => void;
  onRemoveImage: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isExporting: boolean;
}

const TABS = [
  { id: 'style',     label: 'Style',   Icon: Wand2 },
  { id: 'bg',        label: 'BG',      Icon: Palette },
  { id: 'layout',    label: 'Layout',  Icon: Maximize },
  { id: 'fx',        label: 'FX',      Icon: Layers },
  { id: 'adjust',    label: 'Adjust',  Icon: SlidersHorizontal },
  { id: 'transform', label: '3D',      Icon: RotateCw },
  { id: 'brand',     label: 'Brand',   Icon: Type },
  { id: 'export',    label: 'Export',  Icon: Download },
] as const;

type TabId = typeof TABS[number]['id'];

const GRADIENT_CATEGORIES = [
  { key: 'dark',    label: 'Dark' },
  { key: 'vibrant', label: 'Vibrant' },
  { key: 'pastel',  label: 'Pastel' },
  { key: 'warm',    label: 'Warm' },
  { key: 'special', label: 'Special' },
  { key: 'solid',   label: 'Solid' },
] as const;

/* ── Primitives ─────────────────────────────────── */

const Slider: React.FC<{
  label: string; value: number; min: number; max: number;
  step?: number; unit?: string; onChange: (v: number) => void;
}> = ({ label, value, min, max, step = 1, unit = '', onChange }) => {
  const [raw, setRaw] = useState(String(value));
  useEffect(() => { setRaw(String(value)); }, [value]);
  const pct = ((value - min) / (max - min) * 100).toFixed(1);

  const commit = useCallback((s: string) => {
    const n = parseFloat(s);
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
    setRaw(String(value));
  }, [min, max, onChange, value]);

  return (
    <div className="space-y-[6px]">
      <div className="flex items-center justify-between">
        <span className="text-[11.5px] text-white/50 tracking-tight font-medium">{label}</span>
        <div className="flex items-center gap-1">
          <input
            type="number" min={min} max={max} step={step}
            value={raw}
            onChange={e => setRaw(e.target.value)}
            onBlur={e => commit(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') commit((e.target as HTMLInputElement).value); }}
            className="no-spinner w-12 text-right text-[11px] text-white/75 font-mono tabular-nums
              bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded-lg outline-none
              focus:border-brand-500/50 focus:bg-white/[0.10] transition-all"
          />
          {unit && <span className="text-[10px] text-white/20 w-3 flex-shrink-0 select-none">{unit}</span>}
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => { const v = Number(e.target.value); setRaw(String(v)); onChange(v); }}
        className="w-full"
        style={{ '--track-fill': `linear-gradient(to right, #6d28d9 0%, #8b5cf6 ${pct}%, #1a1a30 ${pct}%)` } as React.CSSProperties}
      />
    </div>
  );
};

const Toggle: React.FC<{ label: string; value: boolean; onChange: (v: boolean) => void; desc?: string }> = ({ label, value, onChange, desc }) => (
  <div className="flex items-center justify-between gap-3 py-0.5">
    <div className="min-w-0">
      <span className="text-[12px] text-white/60 leading-none font-medium">{label}</span>
      {desc && <p className="text-[10px] text-white/25 leading-snug mt-0.5">{desc}</p>}
    </div>
    <button onClick={() => onChange(!value)} role="switch" aria-checked={value}
      className={`relative w-[38px] h-[22px] rounded-full transition-all duration-200 flex-shrink-0 ${
        value
          ? 'bg-gradient-to-r from-violet-700 to-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.4)]'
          : 'bg-white/[0.08] border border-white/[0.07]'
      }`}>
      <div className={`absolute top-[3px] w-[16px] h-[16px] rounded-full shadow-lg transition-all duration-200 ${
        value ? 'left-[19px] bg-white' : 'left-[3px] bg-white/50'}`} />
    </button>
  </div>
);

const SectionLabel: React.FC<{ children: React.ReactNode; action?: React.ReactNode }> = ({ children, action }) => (
  <div className="flex items-center gap-2 pb-1">
    <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-white/30 select-none shrink-0">{children}</p>
    {action ?? <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string; highlight?: boolean }> = ({ children, className = '', highlight = false }) => (
  <div className={`rounded-xl p-4 space-y-3.5 transition-all duration-150 ${
    highlight
      ? 'bg-violet-600/[0.08] ring-1 ring-violet-500/25 shadow-[inset_0_1px_0_rgba(139,92,246,0.12)]'
      : 'bg-white/[0.035] border border-white/[0.06] hover:bg-white/[0.055] hover:border-white/[0.10]'
  } ${className}`}>
    {children}
  </div>
);

const ResetBtn: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = 'Reset' }) => (
  <button onClick={onClick}
    className="w-full py-1.5 rounded-lg text-[9px] font-semibold text-white/18 hover:text-white/45 hover:bg-white/[0.04] transition-all flex items-center justify-center gap-1 border border-transparent hover:border-white/[0.05] tracking-wide uppercase">
    <span className="text-[10px] leading-none">↺</span> {label}
  </button>
);

const ColorDots: React.FC<{
  colors: { id: string; name: string; value: string }[];
  active: string; onSelect: (v: string) => void;
}> = ({ colors, active, onSelect }) => (
  <div className="flex gap-1.5 flex-wrap">
    {colors.map(c => (
      <button key={c.id} onClick={() => onSelect(c.value)} title={c.name}
        className={`w-5 h-5 rounded-full transition-all hover:scale-110 flex-shrink-0 ${
          active === c.value
            ? 'ring-2 ring-violet-400 ring-offset-1 ring-offset-[#0c0c18] shadow-[0_0_6px_rgba(139,92,246,0.5)]'
            : 'ring-1 ring-white/10 hover:ring-white/25'
        }`}
        style={{ background: c.value.replace(/[\d.]+\)$/, '1)') }} />
    ))}
  </div>
);

const QuickChip: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button onClick={onClick}
    className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-semibold transition-all duration-100 leading-none ${
      active
        ? 'bg-violet-600/20 text-violet-300 border border-violet-500/40 shadow-[0_0_6px_rgba(139,92,246,0.2)]'
        : 'bg-white/[0.03] text-white/30 border border-white/[0.06] hover:bg-white/[0.07] hover:text-white/55 hover:border-white/[0.12]'
    }`}>
    {children}
  </button>
);

/* ── Main component ──────────────────────────────── */

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  state, onChange, onExport, onCopy, copySuccess,
  onReset, onUpgrade, onRemoveImage, onUndo, onRedo,
  canUndo, canRedo, isExporting,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('style');
  const bgImageInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  type Stop = { color: string; position: number };
  const [gradientStops, setGradientStops] = useState<Stop[]>([
    { color: state.customBgColor1, position: 0 },
    { color: state.customBgColor2, position: 100 },
  ]);
  const [showMultiStop, setShowMultiStop] = useState(false);

  useEffect(() => {
    if (state.backgroundId !== 'custom') {
      setGradientStops([{ color: state.customBgColor1, position: 0 }, { color: state.customBgColor2, position: 100 }]);
      setShowMultiStop(false);
    }
  }, [state.backgroundId, state.customBgColor1, state.customBgColor2]);

  const applyStops = useCallback((stops: Stop[]) => {
    const sorted = [...stops].sort((a, b) => a.position - b.position);
    const css = `linear-gradient(${state.bgAngle}deg, ${sorted.map(s => `${s.color} ${s.position}%`).join(', ')})`;
    onChange({ background: css, backgroundId: 'custom', bgImage: null });
  }, [state.bgAngle, onChange]);

  const updateStop = (i: number, key: keyof Stop, val: string | number) => {
    const next = gradientStops.map((s, idx) => idx === i ? { ...s, [key]: val } : s);
    setGradientStops(next);
    applyStops(next);
  };

  const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { if (ev.target?.result) onChange({ bgImage: ev.target.result as string, backgroundId: 'image' }); };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { if (ev.target?.result) onChange({ logoImage: ev.target.result as string }); };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRandomize = () => {
    const gradients = [...GRADIENT_PRESETS, ...MESH_PRESETS];
    const randGrad = gradients[Math.floor(Math.random() * gradients.length)];
    const randFrame = ['none', 'none', 'none', 'browser', 'macos', 'phone', 'ipad', 'terminal', 'arc', 'samsung', 'macbook'][Math.floor(Math.random() * 11)];
    const randPattern = ['none', 'none', 'dots', 'grid', 'diagonal', 'waves', 'hexagons'][Math.floor(Math.random() * 7)];
    onChange({
      background: randGrad.css, backgroundId: randGrad.id,
      frame: randFrame,
      padding: [32, 48, 64, 80, 96][Math.floor(Math.random() * 5)],
      borderRadius: [0, 8, 12, 16, 24][Math.floor(Math.random() * 5)],
      shadow: Math.floor(Math.random() * 80),
      tiltX: (Math.random() - 0.5) * 16,
      tiltY: (Math.random() - 0.5) * 20,
      scale: 0.85 + Math.random() * 0.2,
      rotation: (Math.random() - 0.5) * 10,
      bgPattern: randPattern,
      bgPatternOpacity: Math.random() * 0.15,
      borderWidth: Math.random() > 0.6 ? Math.floor(Math.random() * 4) : 0,
      glowIntensity: Math.random() > 0.6 ? Math.floor(Math.random() * 60) : 0,
      vignette: Math.floor(Math.random() * 40),
    });
  };

  const handleAutoEnhance = () => {
    onChange({
      brightness: 103, contrast: 105, saturation: 110,
      sharpness: 20, fade: 0, temperature: 5,
      vignette: 15, shadow: 50,
    });
  };

  /* ── Style tab ─────────────────────────────────── */
  const renderStyleTab = () => (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={handleRandomize}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium
            bg-white/[0.05] text-white/50 ring-1 ring-white/[0.08] hover:bg-brand-500/10 hover:text-brand-300
            hover:ring-brand-500/30 transition-all">
          <Shuffle className="w-3 h-3" /> Randomize
        </button>
        <button onClick={handleAutoEnhance}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium
            bg-white/[0.05] text-white/50 ring-1 ring-white/[0.08] hover:bg-amber-500/10 hover:text-amber-300
            hover:ring-amber-500/30 transition-all">
          <Sparkles className="w-3 h-3" /> Auto-Enhance
        </button>
      </div>

      <Card>
        <SectionLabel>Quick Styles</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {STYLE_TEMPLATES.map(tmpl => (
            <button key={tmpl.id} onClick={() => onChange(tmpl.overrides)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-[10px] font-medium
                bg-white/[0.03] text-white/50 ring-1 ring-white/[0.06]
                hover:bg-white/[0.08] hover:text-white/80 hover:ring-brand-500/25
                transition-all active:scale-95">
              <span className="text-xl leading-none">{tmpl.emoji}</span>
              <span className="truncate w-full text-center px-1">{tmpl.name}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Device Frame</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'none',      name: 'None',     Icon: X },
            { id: 'browser',   name: 'Browser',  Icon: Globe },
            { id: 'macos',     name: 'macOS',    Icon: MonitorSmartphone },
            { id: 'phone',     name: 'iPhone',   Icon: Smartphone },
            { id: 'ipad',      name: 'iPad',     Icon: Tablet },
            { id: 'imac',      name: 'iMac',     Icon: Monitor },
            { id: 'terminal',  name: 'Terminal', Icon: Terminal },
            { id: 'arc',       name: 'Arc',      Icon: Globe },
            { id: 'samsung',   name: 'Galaxy',   Icon: Smartphone },
            { id: 'macbook',   name: 'MacBook',  Icon: Laptop },
            { id: 'polaroid',  name: 'Polaroid', Icon: Camera },
            { id: 'newspaper', name: 'News',     Icon: Newspaper },
            { id: 'smarttv',   name: 'Smart TV', Icon: Tv2 },
            { id: 'kindle',    name: 'Kindle',   Icon: BookOpen },
            { id: 'windows',   name: 'Windows',  Icon: Monitor },
            { id: 'notion',    name: 'Notion',   Icon: BookOpen },
            { id: 'retrotv',   name: 'Retro TV', Icon: Tv2 },
            { id: 'figma',     name: 'Figma',    Icon: Layers },
            { id: 'iphone15',  name: 'iPhone 15',Icon: Smartphone },
            { id: 'android',   name: 'Android',  Icon: Smartphone },
            { id: 'vision',    name: 'Vision',   Icon: MonitorSmartphone },
            { id: 'poster',    name: 'Poster',   Icon: Camera },
          ].map(f => (
            <button key={f.id} onClick={() => onChange({ frame: f.id })}
              className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl text-[9px] font-medium transition-all ring-1 ${
                state.frame === f.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                  : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.08] hover:text-white/60'
              }`}>
              <f.Icon className="w-3.5 h-3.5" />
              <span>{f.name}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Canvas Size</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {ASPECT_PRESETS.map(a => (
            <button key={a.id} onClick={() => onChange({ aspectRatio: a.id })}
              className={`px-1 py-2 rounded-xl text-[10px] font-medium transition-all flex flex-col items-center gap-0.5 ring-1 ${
                state.aspectRatio === a.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                  : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.08] hover:text-white/60'
              }`}>
              <span className="font-bold">{a.name}</span>
              <span className="text-[8px] opacity-50 leading-tight text-center">{a.label}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );

  /* ── BG tab ─────────────────────────────────────── */
  const renderBgTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Mesh Gradients</SectionLabel>
        <div className="grid grid-cols-6 gap-1.5">
          {MESH_PRESETS.map(m => (
            <button key={m.id}
              onClick={() => onChange({ background: m.css, backgroundId: m.id, bgImage: null })}
              className={`swatch-tip w-full aspect-square rounded-xl transition-all duration-150 hover:scale-110 ring-1 ${
                state.backgroundId === m.id
                  ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-[#0c0c18] scale-110'
                  : 'ring-white/10 hover:ring-white/30'
              }`}
              style={{ background: m.css }}
              data-name={m.name}
            />
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Gradients</SectionLabel>
        <div className="space-y-2.5">
          {GRADIENT_CATEGORIES.map(cat => {
            const presets = GRADIENT_PRESETS.filter(p => p.category === cat.key);
            return (
              <div key={cat.key}>
                <p className="text-[8.5px] font-semibold uppercase tracking-[0.1em] text-white/20 mb-1.5 px-0.5">{cat.label}</p>
                <div className="grid grid-cols-8 gap-1">
                  {presets.map(p => (
                    <button key={p.id}
                      onClick={() => onChange({ background: p.css, backgroundId: p.id, bgImage: null })}
                      className={`swatch-tip w-full aspect-square rounded-lg transition-all hover:scale-110 ring-1 ${
                        state.backgroundId === p.id
                          ? 'ring-2 ring-brand-500 ring-offset-1 ring-offset-[#0c0c18] scale-110'
                          : 'ring-white/10 hover:ring-white/25'
                      } ${p.id === 'transparent' ? 'checkerboard' : ''}`}
                      style={{ background: p.id === 'transparent' ? undefined : p.style }}
                      data-name={p.name}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <SectionLabel
          action={
            <button onClick={() => setShowMultiStop(v => !v)}
              className="text-[9px] text-brand-400 hover:text-brand-300 font-semibold uppercase tracking-wider transition-colors">
              {showMultiStop ? '2-stop' : 'Multi-stop'}
            </button>
          }
        >
          Custom Gradient
        </SectionLabel>

        {!showMultiStop ? (
          <div className="flex items-center gap-2">
            <input type="color" value={state.customBgColor1}
              onChange={e => {
                const bg = `linear-gradient(${state.bgAngle}deg, ${e.target.value} 0%, ${state.customBgColor2} 100%)`;
                onChange({ customBgColor1: e.target.value, background: bg, backgroundId: 'custom', bgImage: null });
              }}
              className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent flex-shrink-0" />
            <div className="flex-1 h-9 rounded-xl ring-1 ring-white/10"
              style={{ background: `linear-gradient(90deg, ${state.customBgColor1}, ${state.customBgColor2})` }} />
            <input type="color" value={state.customBgColor2}
              onChange={e => {
                const bg = `linear-gradient(${state.bgAngle}deg, ${state.customBgColor1} 0%, ${e.target.value} 100%)`;
                onChange({ customBgColor2: e.target.value, background: bg, backgroundId: 'custom', bgImage: null });
              }}
              className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent flex-shrink-0" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-full h-9 rounded-xl ring-1 ring-white/10"
              style={{ background: state.backgroundId === 'custom' ? state.background : `linear-gradient(${state.bgAngle}deg, ${gradientStops.map(s => `${s.color} ${s.position}%`).join(', ')})` }} />
            {gradientStops.map((stop, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="color" value={stop.color}
                  onChange={e => updateStop(i, 'color', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent flex-shrink-0" />
                <input type="range" min={0} max={100} value={stop.position}
                  onChange={e => updateStop(i, 'position', Number(e.target.value))}
                  className="flex-1" />
                <span className="text-[10px] text-white/30 font-mono w-7 text-right">{stop.position}%</span>
                {gradientStops.length > 2 && (
                  <button onClick={() => { const next = gradientStops.filter((_, idx) => idx !== i); setGradientStops(next); applyStops(next); }}
                    className="text-white/20 hover:text-red-400 text-sm transition-colors">×</button>
                )}
              </div>
            ))}
            {gradientStops.length < 5 && (
              <button onClick={() => { const next = [...gradientStops, { color: '#ffffff', position: 50 }]; setGradientStops(next); applyStops(next); }}
                className="w-full py-1.5 rounded-lg text-[10px] text-white/25 hover:text-white/50 bg-white/[0.03] hover:bg-white/[0.06] ring-1 ring-white/[0.06] transition-all">
                + Add Color Stop
              </button>
            )}
          </div>
        )}

        <Slider label="Angle" value={state.bgAngle} min={0} max={360} unit="°"
          onChange={v => {
            if (state.backgroundId === 'custom') {
              if (showMultiStop) {
                const sorted = [...gradientStops].sort((a, b) => a.position - b.position);
                onChange({ bgAngle: v, background: `linear-gradient(${v}deg, ${sorted.map(s => `${s.color} ${s.position}%`).join(', ')})` });
              } else {
                onChange({ bgAngle: v, background: `linear-gradient(${v}deg, ${state.customBgColor1} 0%, ${state.customBgColor2} 100%)` });
              }
            } else {
              onChange({ bgAngle: v });
            }
          }} />
        <Toggle label="Radial Gradient" value={state.bgRadial ?? false} onChange={v => onChange({ bgRadial: v })} desc="Renders gradient as radial instead of linear" />
        <Slider label="Opacity" value={state.bgOpacity ?? 100} min={10} max={100} unit="%" onChange={v => onChange({ bgOpacity: v })} />
      </Card>

      <Card>
        <SectionLabel>Background Image</SectionLabel>
        <input ref={bgImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleBgImageUpload} />
        <div className="flex gap-2">
          <button onClick={() => bgImageInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs
              bg-white/[0.04] text-white/45 ring-1 ring-white/[0.06] hover:bg-white/[0.08] hover:text-white/70 transition-all">
            <ImagePlus className="w-3.5 h-3.5" />
            {state.bgImage ? 'Change' : 'Upload'}
          </button>
          {state.bgImage && (
            <button onClick={() => onChange({ bgImage: null, backgroundId: GRADIENT_PRESETS[6].id, background: GRADIENT_PRESETS[6].css })}
              className="px-3 py-2.5 rounded-xl text-xs bg-white/[0.04] text-red-400/50 hover:bg-red-500/10 hover:text-red-400 transition-all ring-1 ring-white/[0.06]">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {state.bgImage && (
          <Slider label="Blur" value={state.bgBlur} min={0} max={20} unit="px" onChange={v => onChange({ bgBlur: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Patterns & Texture</SectionLabel>
        <div className="grid grid-cols-5 gap-1.5">
          {BG_PATTERNS.map(p => (
            <button key={p.id} onClick={() => onChange({ bgPattern: p.id })}
              className={`px-1 py-2 rounded-lg text-[9px] font-medium transition-all ring-1 ${
                state.bgPattern === p.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                  : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.07]'
              }`}>
              {p.name}
            </button>
          ))}
        </div>
        {state.bgPattern !== 'none' && (
          <>
            <Slider label="Pattern Opacity" value={Math.round(state.bgPatternOpacity * 100)} min={1} max={60}
              onChange={v => onChange({ bgPatternOpacity: v / 100 })} />
            <Slider label="Pattern Scale" value={state.patternScale ?? 20} min={6} max={80} unit="px"
              onChange={v => onChange({ patternScale: v })} />
            <Toggle label="Pattern Color Tint" value={state.bgPatternColorEnabled ?? false}
              onChange={v => onChange({ bgPatternColorEnabled: v })} desc="Apply a color tint to the pattern" />
            {(state.bgPatternColorEnabled ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/35">Tint</span>
                <input type="color" value={state.bgPatternColor ?? '#ffffff'}
                  onChange={e => onChange({ bgPatternColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                <div className="flex gap-1.5 ml-auto">
                  {['#ffffff', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'].map(c => (
                    <button key={c} onClick={() => onChange({ bgPatternColor: c })}
                      className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        <Slider label="Noise Texture" value={state.bgNoise} min={0} max={60} onChange={v => onChange({ bgNoise: v })} />
      </Card>

      <Card>
        <SectionLabel>Background Tint</SectionLabel>
        <Slider label="Intensity" value={state.bgTint ?? 0} min={0} max={100}
          onChange={v => onChange({ bgTint: v })} />
        {(state.bgTint ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.bgTintColor ?? '#8b5cf6'}
              onChange={e => onChange({ bgTintColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'].map(c => (
                <button key={c} onClick={() => onChange({ bgTintColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c }} />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );

  /* ── Layout tab ─────────────────────────────────── */
  const renderLayoutTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel
          action={
            <button onClick={() => onChange({ uniformPadding: !(state.uniformPadding ?? true) })}
              className="text-[9px] text-brand-400 hover:text-brand-300 font-semibold uppercase tracking-wider transition-colors">
              {(state.uniformPadding ?? true) ? 'Per Side' : 'Uniform'}
            </button>
          }
        >
          Padding
        </SectionLabel>

        {(state.uniformPadding ?? true) ? (
          <>
            <Slider label="Size" value={state.padding} min={0} max={200} unit="px" onChange={v => onChange({ padding: v })} />
            <div className="flex gap-1.5 flex-wrap">
              {[0, 24, 48, 64, 96, 128, 160].map(v => (
                <QuickChip key={v} active={state.padding === v} onClick={() => onChange({ padding: v })}>{v}</QuickChip>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Slider label="Top"    value={state.paddingTop    ?? state.padding} min={0} max={200} unit="px" onChange={v => onChange({ paddingTop: v })} />
            <Slider label="Right"  value={state.paddingRight  ?? state.padding} min={0} max={200} unit="px" onChange={v => onChange({ paddingRight: v })} />
            <Slider label="Bottom" value={state.paddingBottom ?? state.padding} min={0} max={200} unit="px" onChange={v => onChange({ paddingBottom: v })} />
            <Slider label="Left"   value={state.paddingLeft   ?? state.padding} min={0} max={200} unit="px" onChange={v => onChange({ paddingLeft: v })} />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Corner Radius</SectionLabel>
        <Slider label="Canvas Radius" value={state.borderRadius} min={0} max={80} unit="px" onChange={v => onChange({ borderRadius: v })} />
        <div className="flex gap-1.5 flex-wrap">
          {[0, 4, 8, 12, 16, 24, 32, 48].map(v => (
            <QuickChip key={v} active={state.borderRadius === v} onClick={() => onChange({ borderRadius: v })}>{v}</QuickChip>
          ))}
        </div>
        <Slider label="Image Radius" value={state.imageBorderRadius ?? 0} min={0} max={60} unit="px"
          onChange={v => onChange({ imageBorderRadius: v })} />
        <Toggle label="Per-Corner Radius" value={state.usePerCornerRadius ?? false}
          onChange={v => onChange({ usePerCornerRadius: v })}
          desc="Override each corner independently" />
        {(state.usePerCornerRadius ?? false) && (
          <div className="grid grid-cols-2 gap-2">
            <Slider label="↖ TL" value={state.borderRadiusTL ?? 12} min={0} max={80} unit="px"
              onChange={v => onChange({ borderRadiusTL: v })} />
            <Slider label="↗ TR" value={state.borderRadiusTR ?? 12} min={0} max={80} unit="px"
              onChange={v => onChange({ borderRadiusTR: v })} />
            <Slider label="↙ BL" value={state.borderRadiusBL ?? 12} min={0} max={80} unit="px"
              onChange={v => onChange({ borderRadiusBL: v })} />
            <Slider label="↘ BR" value={state.borderRadiusBR ?? 12} min={0} max={80} unit="px"
              onChange={v => onChange({ borderRadiusBR: v })} />
          </div>
        )}
      </Card>

      {/* Batch 11 layout controls */}
      <Card>
        <SectionLabel>Custom Canvas Padding</SectionLabel>
        <Toggle label="Per-side Padding" value={state.useCustomPadding ?? false}
          onChange={v => onChange({ useCustomPadding: v })} desc="Set each side independently" />
        {(state.useCustomPadding ?? false) && (
          <div className="grid grid-cols-2 gap-2">
            <Slider label="Top" value={state.canvasPaddingTop ?? 40} min={0} max={120} unit="px"
              onChange={v => onChange({ canvasPaddingTop: v })} />
            <Slider label="Bottom" value={state.canvasPaddingBottom ?? 40} min={0} max={120} unit="px"
              onChange={v => onChange({ canvasPaddingBottom: v })} />
            <Slider label="Left" value={state.canvasPaddingLeft ?? 40} min={0} max={120} unit="px"
              onChange={v => onChange({ canvasPaddingLeft: v })} />
            <Slider label="Right" value={state.canvasPaddingRight ?? 40} min={0} max={120} unit="px"
              onChange={v => onChange({ canvasPaddingRight: v })} />
          </div>
        )}
      </Card>

      {/* Batch 14 layout controls */}
      <Card>
        <SectionLabel>Polaroid Label</SectionLabel>
        <input
          type="text"
          placeholder="Caption text (Polaroid frame only)..."
          value={state.framePolaroidLabel ?? ''}
          onChange={e => onChange({ framePolaroidLabel: e.target.value })}
          className="w-full bg-white/[0.06] text-white/70 text-[11px] rounded-xl px-3 py-2 outline-none border border-white/[0.08] focus:border-brand-500/50 placeholder-white/20"
        />
        {(state.framePolaroidLabel ?? '').length > 0 && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-white/35">Label Color</span>
            <input type="color" value={state.framePolaroidLabelColor ?? '#333333'}
              onChange={e => onChange({ framePolaroidLabelColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
          </div>
        )}
      </Card>

      {/* Batch 13 layout controls */}
      <Card>
        <SectionLabel>Photo Tilt</SectionLabel>
        <Toggle label="Enable" value={state.photoTilt ?? false} onChange={v => onChange({ photoTilt: v })}
          desc="Slight Polaroid-style canvas tilt" />
        {(state.photoTilt ?? false) && (
          <Slider label="Angle" value={state.photoTiltAngle ?? -3} min={-15} max={15} unit="°"
            onChange={v => onChange({ photoTiltAngle: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Text Box Border</SectionLabel>
        <Toggle label="Enable" value={state.textBoxBorder ?? false}
          onChange={v => onChange({ textBoxBorder: v })} desc="Border around the text block" />
        {(state.textBoxBorder ?? false) && (
          <>
            <Slider label="Width" value={state.textBoxBorderWidth ?? 1} min={1} max={6} unit="px"
              onChange={v => onChange({ textBoxBorderWidth: v })} />
            <Slider label="Radius" value={state.textBoxBorderRadius ?? 8} min={0} max={32} unit="px"
              onChange={v => onChange({ textBoxBorderRadius: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.textBoxBorderColor ?? '#8b5cf6'}
                onChange={e => onChange({ textBoxBorderColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6','#ec4899','#f59e0b','#10b981','#ffffff','#000000'].map(c => (
                  <button key={c} onClick={() => onChange({ textBoxBorderColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Clip Shape</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'none',    label: 'None' },
            { id: 'circle',  label: 'Circle' },
            { id: 'hexagon', label: 'Hex' },
            { id: 'diamond', label: 'Diamond' },
            { id: 'star',    label: 'Star' },
            { id: 'arch',    label: 'Arch' },
            { id: 'rounded', label: 'Rounded' },
          ].map(s => (
            <QuickChip key={s.id} active={(state.imageClipShape ?? 'none') === s.id}
              onClick={() => onChange({ imageClipShape: s.id })}>
              {s.label}
            </QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Image Zoom & Pan</SectionLabel>
        <Slider label="Zoom" value={Math.round((state.imageZoom ?? 1) * 100)} min={100} max={300} unit="%"
          onChange={v => onChange({ imageZoom: v / 100 })} />
        {(state.imageZoom ?? 1) > 1 && (
          <>
            <Slider label="Pan X" value={state.imagePanX ?? 0} min={-50} max={50}
              onChange={v => onChange({ imagePanX: v })} />
            <Slider label="Pan Y" value={state.imagePanY ?? 0} min={-50} max={50}
              onChange={v => onChange({ imagePanY: v })} />
            <ResetBtn onClick={() => onChange({ imageZoom: 1, imagePanX: 0, imagePanY: 0 })} label="Reset Zoom" />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Transform</SectionLabel>
        <Slider label="Opacity" value={state.imageOpacity ?? 100} min={0} max={100} unit="%"
          onChange={v => onChange({ imageOpacity: v })} />
        <Slider label="Rotation" value={state.imageRotation ?? 0} min={-180} max={180} unit="°"
          onChange={v => onChange({ imageRotation: v })} />
      </Card>

      <Card>
        <SectionLabel>Image Fit Mode</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'cover',   label: 'Cover' },
            { id: 'contain', label: 'Contain' },
            { id: 'fill',    label: 'Fill' },
          ].map(m => (
            <QuickChip key={m.id} active={(state.imageFitMode ?? 'cover') === m.id}
              onClick={() => onChange({ imageFitMode: m.id })}>
              {m.label}
            </QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Image Outline Ring</SectionLabel>
        <Slider label="Width" value={state.imageOutline ?? 0} min={0} max={20} unit="px"
          onChange={v => onChange({ imageOutline: v })} />
        {(state.imageOutline ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.imageOutlineColor ?? '#ffffff'}
              onChange={e => onChange({ imageOutlineColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#ffffff', '#000000', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map(c => (
                <button key={c} onClick={() => onChange({ imageOutlineColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Canvas Options</SectionLabel>
        <Slider label="Canvas Rotation" value={state.canvasRotation ?? 0} min={-15} max={15} unit="°"
          onChange={v => onChange({ canvasRotation: v })} />
        <Slider label="Spotlight" value={state.spotlight ?? 0} min={0} max={100}
          onChange={v => onChange({ spotlight: v })} />
        {(state.spotlight ?? 0) > 0 && (
          <>
            <Slider label="Spotlight X" value={state.spotlightX ?? 50} min={0} max={100} unit="%"
              onChange={v => onChange({ spotlightX: v })} />
            <Slider label="Spotlight Y" value={state.spotlightY ?? 50} min={0} max={100} unit="%"
              onChange={v => onChange({ spotlightY: v })} />
          </>
        )}
        <Toggle label="Rule of Thirds" value={state.showRuleOfThirds ?? false} onChange={v => onChange({ showRuleOfThirds: v })}
          desc="Composition guide overlay (preview only)" />
        <Toggle label="Corner Dots" value={state.cornerDots ?? false} onChange={v => onChange({ cornerDots: v })} />
      </Card>
    </div>
  );

  /* ── FX tab ─────────────────────────────────────── */
  const renderFxTab = () => (
    <div className="space-y-3">
      {state.frame !== 'none' && (
        <Card>
          <SectionLabel>Frame Tint</SectionLabel>
          <p className="text-[8.5px] text-white/20">Apply a color tone to the frame chrome</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.frameColor || '#8b5cf6'}
              onChange={e => onChange({ frameColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            {(state.frameColor ?? '') !== '' && (
              <button onClick={() => onChange({ frameColor: '' })} className="text-[10px] text-white/25 hover:text-white/50 ml-auto">Clear</button>
            )}
          </div>
          {(state.frameColor ?? '') !== '' && (
            <Slider label="Strength" value={100 - (state.frameOpacity ?? 100)} min={0} max={80} unit="%"
              onChange={v => onChange({ frameOpacity: 100 - v })} />
          )}
        </Card>
      )}

      {state.frame !== 'none' && (
        <Card>
          <SectionLabel>Frame Inner Padding</SectionLabel>
          <Slider label="Padding" value={state.frameInnerPadding ?? 0} min={0} max={32} unit="px"
            onChange={v => onChange({ frameInnerPadding: v })} />
          <p className="text-[8.5px] text-white/20">Adds space between frame chrome and image</p>
        </Card>
      )}

      <Card>
        <SectionLabel>Accent Color</SectionLabel>
        <Toggle label="Use Accent Color" value={state.useAccentColor ?? false}
          onChange={v => onChange({ useAccentColor: v })}
          desc="Overrides shadow and glow with accent color" />
        {(state.useAccentColor ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.accentColor ?? '#8b5cf6'}
              onChange={e => onChange({ accentColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'].map(c => (
                <button key={c} onClick={() => onChange({ accentColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c, boxShadow: `0 0 6px ${c}80` }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Shadow Preset</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'none',  l: 'Off' },
            { id: 'soft',  l: 'Soft' },
            { id: 'hard',  l: 'Hard' },
            { id: 'float', l: 'Float' },
            { id: 'neon',  l: 'Neon' },
            { id: 'retro', l: 'Retro' },
          ].map(p => (
            <QuickChip key={p.id} active={(state.shadowPreset ?? 'none') === p.id}
              onClick={() => onChange({ shadowPreset: p.id })}>{p.l}</QuickChip>
          ))}
        </div>
        <p className="text-[8.5px] text-white/20">Applies when shadow &amp; glow are both 0</p>
      </Card>

      <Card>
        <SectionLabel>Glass Effect</SectionLabel>
        <Slider label="Intensity" value={state.glassEffect ?? 0} min={0} max={100}
          onChange={v => onChange({ glassEffect: v })} />
        {(state.glassEffect ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Tint</span>
            <input type="color" value={state.glassColor ?? '#ffffff'}
              onChange={e => onChange({ glassColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#ffffff', '#a8d8ff', '#d4a8ff', '#a8ffd4', '#ffd4a8', '#ffb3c6'].map(c => (
                <button key={c} onClick={() => onChange({ glassColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Frame Glow</SectionLabel>
        <Slider label="Intensity" value={state.frameGlow ?? 0} min={0} max={100}
          onChange={v => onChange({ frameGlow: v })} />
        {(state.frameGlow ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.frameGlowColor ?? '#8b5cf6'}
              onChange={e => onChange({ frameGlowColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#8b5cf6', '#ec4899', '#00ffff', '#00ff00', '#ffff00', '#ff6600'].map(c => (
                <button key={c} onClick={() => onChange({ frameGlowColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Corner Accents</SectionLabel>
        <Toggle label="Enable" value={state.cornerAccents ?? false} onChange={v => onChange({ cornerAccents: v })}
          desc="Decorative brackets in each corner" />
        {(state.cornerAccents ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.cornerAccentColor ?? '#ffffff'}
                onChange={e => onChange({ cornerAccentColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#ffffff', '#000000', '#8b5cf6', '#ec4899', '#f59e0b', '#00ffff'].map(c => (
                  <button key={c} onClick={() => onChange({ cornerAccentColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Slider label="Size" value={state.cornerAccentSize ?? 28} min={10} max={60} unit="px"
                onChange={v => onChange({ cornerAccentSize: v })} />
              <Slider label="Thickness" value={state.cornerAccentThickness ?? 2} min={1} max={6} unit="px"
                onChange={v => onChange({ cornerAccentThickness: v })} />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Mirror Mode</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'none',       l: 'Off' },
            { id: 'horizontal', l: 'Horiz.' },
            { id: 'vertical',   l: 'Vert.' },
            { id: 'both',       l: 'Both' },
          ].map(m => (
            <QuickChip key={m.id} active={(state.mirrorMode ?? 'none') === m.id}
              onClick={() => onChange({ mirrorMode: m.id })}>{m.l}</QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Canvas Border</SectionLabel>
        <Slider label="Width" value={state.canvasBorderWidth ?? 0} min={0} max={12} unit="px"
          onChange={v => onChange({ canvasBorderWidth: v })} />
        {(state.canvasBorderWidth ?? 0) > 0 && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.canvasBorderColor ?? '#ffffff'}
                onChange={e => onChange({ canvasBorderColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#ffffff', '#000000', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map(c => (
                  <button key={c} onClick={() => onChange({ canvasBorderColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {['solid', 'dashed', 'dotted'].map(s => (
                <QuickChip key={s} active={(state.canvasBorderStyle ?? 'solid') === s}
                  onClick={() => onChange({ canvasBorderStyle: s })}>{s}</QuickChip>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Blend Mode</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'normal',    l: 'Normal' },
            { id: 'multiply',  l: 'Multiply' },
            { id: 'screen',    l: 'Screen' },
            { id: 'overlay',   l: 'Overlay' },
            { id: 'luminosity',l: 'Luma' },
            { id: 'color',     l: 'Color' },
          ].map(m => (
            <QuickChip key={m.id} active={(state.imageBlendMode ?? 'normal') === m.id}
              onClick={() => onChange({ imageBlendMode: m.id })}>{m.l}</QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Drop Shadow</SectionLabel>
        <Slider label="Intensity"   value={state.shadow}              min={0}   max={120}      onChange={v => onChange({ shadow: v })} />
        <Slider label="X Offset"    value={state.shadowX ?? 0}        min={-60} max={60}  unit="px" onChange={v => onChange({ shadowX: v })} />
        <Slider label="Y Offset"    value={state.shadowY ?? 0}        min={-60} max={60}  unit="px" onChange={v => onChange({ shadowY: v })} />
        <Slider label="Blur Radius" value={state.shadowBlur ?? 0}     min={0}   max={120} unit="px" onChange={v => onChange({ shadowBlur: v })} />
        <Slider label="Spread"      value={state.shadowSpread ?? 0}   min={-20} max={60}  unit="px" onChange={v => onChange({ shadowSpread: v })} />
        <ColorDots colors={SHADOW_COLORS} active={state.shadowColor} onSelect={v => onChange({ shadowColor: v })} />
      </Card>

      <Card>
        <SectionLabel>Outer Glow</SectionLabel>
        <Slider label="Intensity" value={state.glowIntensity} min={0} max={120} onChange={v => onChange({ glowIntensity: v })} />
        {state.glowIntensity > 0 && (
          <ColorDots colors={GLOW_COLORS} active={state.glowColor} onSelect={v => onChange({ glowColor: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Inner Shadow & Glow</SectionLabel>
        <Slider label="Inner Shadow" value={state.innerShadow} min={0} max={100} onChange={v => onChange({ innerShadow: v })} />
        <Slider label="Inner Glow"   value={state.innerGlowIntensity ?? 0} min={0} max={100} onChange={v => onChange({ innerGlowIntensity: v })} />
        {(state.innerGlowIntensity ?? 0) > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color"
              value={state.innerGlowColor?.startsWith('rgba') ? '#ffffff' : (state.innerGlowColor ?? '#ffffff')}
              onChange={e => onChange({ innerGlowColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <ColorDots colors={GLOW_COLORS} active={state.innerGlowColor ?? ''} onSelect={v => onChange({ innerGlowColor: v })} />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Border</SectionLabel>
        <Slider label="Width" value={state.borderWidth} min={0} max={24} unit="px" onChange={v => onChange({ borderWidth: v })} />
        {state.borderWidth > 0 && (
          <>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { id: 'solid', label: '—' }, { id: 'dashed', label: '╌' },
                { id: 'dotted', label: '···' }, { id: 'double', label: '═' }, { id: 'gradient', label: '🌈' },
              ].map(s => (
                <button key={s.id} onClick={() => onChange({ borderStyle: s.id })}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ring-1 ${
                    state.borderStyle === s.id
                      ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                      : 'bg-white/[0.03] text-white/45 ring-white/[0.06] hover:bg-white/[0.07]'
                  }`}>
                  {s.label}
                </button>
              ))}
            </div>
            {state.borderStyle !== 'gradient' ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-white/35">Color</span>
                <input type="color"
                  value={state.borderColor.startsWith('rgba') ? '#ffffff' : state.borderColor}
                  onChange={e => onChange({ borderColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent flex-shrink-0" />
                <div className="flex gap-1.5 ml-auto">
                  {['#ffffff', '#000000', '#8b5cf6', '#ec4899', '#38bdf8', '#f59e0b'].map(c => (
                    <button key={c} onClick={() => onChange({ borderColor: c })}
                      className={`w-6 h-6 rounded-full ring-1 transition-all hover:scale-110 ${
                        state.borderColor === c ? 'ring-2 ring-brand-400 ring-offset-1 ring-offset-[#0c0c18]' : 'ring-white/15'
                      }`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[9px] text-white/25">Uses your custom gradient colors from the BG tab.</p>
            )}
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Color Overlay</SectionLabel>
        <Slider label="Opacity" value={state.colorOverlayOpacity} min={0} max={100} unit="%" onChange={v => onChange({ colorOverlayOpacity: v })} />
        {state.colorOverlayOpacity > 0 && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.colorOverlay}
                onChange={e => onChange({ colorOverlay: e.target.value })}
                className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-9 rounded-xl ring-1 ring-white/10" style={{ background: state.colorOverlay }} />
            </div>
            <div>
              <p className="text-[9.5px] text-white/25 mb-1.5">Blend Mode</p>
              <div className="grid grid-cols-4 gap-1.5">
                {['color', 'multiply', 'screen', 'overlay'].map(m => (
                  <QuickChip key={m} active={(state.colorOverlayBlendMode ?? 'color') === m}
                    onClick={() => onChange({ colorOverlayBlendMode: m })}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </QuickChip>
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Atmospheric</SectionLabel>
        <Slider label="Vignette"   value={state.vignette}       min={0} max={100} onChange={v => onChange({ vignette: v })} />
        {state.vignette > 0 && (
          <>
            <div className="grid grid-cols-3 gap-1.5">
              {[{ id: 'elliptical', l: 'Radial' }, { id: 'linear-v', l: 'Top/Bot' }, { id: 'linear-h', l: 'Left/Right' }].map(s => (
                <QuickChip key={s.id} active={(state.vignetteShape ?? 'elliptical') === s.id}
                  onClick={() => onChange({ vignetteShape: s.id })}>{s.l}</QuickChip>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.vignetteColor ?? '#000000'}
                onChange={e => onChange({ vignetteColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#000000', '#ffffff', '#1a0a3e', '#0a1a3e', '#1a0a0a'].map(c => (
                  <button key={c} onClick={() => onChange({ vignetteColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
        <Slider label="Scanlines"  value={state.scanlines}      min={0} max={100} onChange={v => onChange({ scanlines: v })} />
        {state.scanlines > 0 && (
          <>
            <Slider label="Line Spacing" value={state.scanlinesSpacing ?? 4} min={2} max={12}
              onChange={v => onChange({ scanlinesSpacing: v })} />
            <div className="grid grid-cols-2 gap-1.5">
              <QuickChip active={(state.scanlinesColor ?? 'dark') === 'dark'} onClick={() => onChange({ scanlinesColor: 'dark' })}>Dark Lines</QuickChip>
              <QuickChip active={(state.scanlinesColor ?? 'dark') === 'light'} onClick={() => onChange({ scanlinesColor: 'light' })}>Light Lines</QuickChip>
            </div>
          </>
        )}
        <Slider label="Film Grain" value={state.filmGrain ?? 0} min={0} max={100} onChange={v => onChange({ filmGrain: v })} />
      </Card>

      <Card>
        <SectionLabel>Overlays</SectionLabel>
        <Slider label="Light Leak" value={state.lightLeak ?? 0} min={0} max={100} onChange={v => onChange({ lightLeak: v })} />
        {(state.lightLeak ?? 0) > 0 && (
          <div>
            <p className="text-[9.5px] text-white/25 mb-1.5">Leak Position</p>
            <div className="grid grid-cols-4 gap-1.5">
              {[{ v: 315, l: '↖ TL' }, { v: 45, l: '↗ TR' }, { v: 225, l: '↙ BL' }, { v: 135, l: '↘ BR' }, { v: 0, l: '↑ Top' }, { v: 90, l: '→ Right' }, { v: 180, l: '↓ Bot' }, { v: 270, l: '← Left' }].map(p => (
                <QuickChip key={p.v} active={(state.lightLeakAngle ?? 315) === p.v} onClick={() => onChange({ lightLeakAngle: p.v })}>{p.l}</QuickChip>
              ))}
            </div>
          </div>
        )}
        <Slider label="Prism Effect" value={state.prismEffect ?? 0} min={0} max={100} onChange={v => onChange({ prismEffect: v })} />
        <Slider label="Fog / Haze"   value={state.fog ?? 0}          min={0} max={100} onChange={v => onChange({ fog: v })} />
        <Slider label="Stars"        value={state.stars ?? 0}        min={0} max={100} onChange={v => onChange({ stars: v })} />
        <Slider label="Rain"         value={state.rain ?? 0}         min={0} max={100} onChange={v => onChange({ rain: v })} />
        <Slider label="Halftone"     value={state.halftone ?? 0}     min={0} max={100} onChange={v => onChange({ halftone: v })} />
        <Slider label="Lens Flare"   value={state.lensFlare ?? 0}    min={0} max={100} onChange={v => onChange({ lensFlare: v })} />
        {(state.lensFlare ?? 0) > 0 && (
          <>
            <Slider label="Flare X" value={state.lensFlareX ?? 20} min={0} max={100} unit="%" onChange={v => onChange({ lensFlareX: v })} />
            <Slider label="Flare Y" value={state.lensFlareY ?? 15} min={0} max={100} unit="%" onChange={v => onChange({ lensFlareY: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Sunburst Rays</SectionLabel>
        <Slider label="Intensity" value={state.sunburst ?? 0} min={0} max={100} onChange={v => onChange({ sunburst: v })} />
        {(state.sunburst ?? 0) > 0 && (
          <>
            <Slider label="Origin X" value={state.sunburstX ?? 50} min={0} max={100} unit="%" onChange={v => onChange({ sunburstX: v })} />
            <Slider label="Origin Y" value={state.sunburstY ?? 50} min={0} max={100} unit="%" onChange={v => onChange({ sunburstY: v })} />
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35">Ray Color</span>
              <input type="color" value={state.sunburstColor ?? '#ffee88'}
                onChange={e => onChange({ sunburstColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#ffee88', '#ffffff', '#ffa500', '#ff6600', '#aaffaa'].map(c => (
                  <button key={c} onClick={() => onChange({ sunburstColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Glitch & Distortion</SectionLabel>
        <Slider label="Glitch"            value={state.glitch ?? 0}           min={0} max={100} onChange={v => onChange({ glitch: v })} />
        <Slider label="Chroma Aberration" value={state.chromaAberration ?? 0} min={0} max={20}  onChange={v => onChange({ chromaAberration: v })} />
      </Card>

      <Card>
        <SectionLabel>Double Shadow</SectionLabel>
        <Toggle label="Enable" value={state.doubleShadow ?? false} onChange={v => onChange({ doubleShadow: v })}
          desc="Adds a second colored shadow layer" />
        {(state.doubleShadow ?? false) && (
          <>
            <Slider label="X Offset" value={state.shadow2X ?? 20} min={-60} max={60} unit="px"
              onChange={v => onChange({ shadow2X: v })} />
            <Slider label="Y Offset" value={state.shadow2Y ?? 20} min={-60} max={60} unit="px"
              onChange={v => onChange({ shadow2Y: v })} />
            <Slider label="Blur" value={state.shadow2Blur ?? 40} min={0} max={120} unit="px"
              onChange={v => onChange({ shadow2Blur: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.shadow2Color?.startsWith('rgba') ? '#8b5cf6' : (state.shadow2Color ?? '#8b5cf6')}
                onChange={e => onChange({ shadow2Color: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6', '#ec4899', '#3b82f6', '#f59e0b', '#10b981', '#ef4444'].map(c => (
                  <button key={c} onClick={() => onChange({ shadow2Color: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Glow</SectionLabel>
        <Slider label="Glow Size" value={state.imageGlow ?? 0} min={0} max={60} unit="px"
          onChange={v => onChange({ imageGlow: v })} />
        {(state.imageGlow ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.imageGlowColor?.startsWith('rgba') ? '#ffffff' : (state.imageGlowColor ?? '#ffffff')}
              onChange={e => onChange({ imageGlowColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#ffffff', '#8b5cf6', '#ec4899', '#38bdf8', '#fbbf24', '#34d399'].map(c => (
                <button key={c} onClick={() => onChange({ imageGlowColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Burn & Bloom</SectionLabel>
        <Slider label="Burn (Dark Edges)" value={state.burnEffect ?? 0} min={0} max={100}
          onChange={v => onChange({ burnEffect: v })} />
        <Slider label="Bloom (Center Glow)" value={state.bloomEffect ?? 0} min={0} max={100}
          onChange={v => onChange({ bloomEffect: v })} />
      </Card>

      <Card>
        <SectionLabel>Cursor Overlay</SectionLabel>
        <Toggle label="Show Cursor" value={state.cursorOverlay ?? false} onChange={v => onChange({ cursorOverlay: v })}
          desc="Adds a mouse pointer overlay to the canvas" />
        {(state.cursorOverlay ?? false) && (
          <>
            <Slider label="Position X" value={state.cursorX ?? 50} min={0} max={100} unit="%"
              onChange={v => onChange({ cursorX: v })} />
            <Slider label="Position Y" value={state.cursorY ?? 50} min={0} max={100} unit="%"
              onChange={v => onChange({ cursorY: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Paper Texture</SectionLabel>
        <Slider label="Intensity" value={state.paperTexture ?? 0} min={0} max={100}
          onChange={v => onChange({ paperTexture: v })} />
        {(state.paperTexture ?? 0) > 0 && <p className="text-[8.5px] text-white/20">Adds a subtle paper grain overlay</p>}
      </Card>

      <Card>
        <SectionLabel>Gradient Map</SectionLabel>
        <Toggle label="Enable" value={state.gradientMap ?? false} onChange={v => onChange({ gradientMap: v })}
          desc="Maps image shadows & highlights to custom colors" />
        {(state.gradientMap ?? false) && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35 w-20">Shadows</span>
              <input type="color" value={state.gradientMapColor1 ?? '#000000'}
                onChange={e => onChange({ gradientMapColor1: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-8 rounded-lg ring-1 ring-white/10" style={{ background: `linear-gradient(to right, ${state.gradientMapColor1 ?? '#000000'}, ${state.gradientMapColor2 ?? '#ffffff'})` }} />
              <input type="color" value={state.gradientMapColor2 ?? '#ffffff'}
                onChange={e => onChange({ gradientMapColor2: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <span className="text-[10px] text-white/35 w-20 text-right">Highlights</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { c1: '#000000', c2: '#ffffff', l: 'B&W' },
                { c1: '#0a0033', c2: '#ff6600', l: 'Sunset' },
                { c1: '#001a4a', c2: '#00ffcc', l: 'Ocean' },
                { c1: '#1a0033', c2: '#ff00ff', l: 'Neon' },
                { c1: '#000a00', c2: '#00ff88', l: 'Matrix' },
                { c1: '#330000', c2: '#ff4400', l: 'Ember' },
              ].map(p => (
                <button key={p.l}
                  onClick={() => onChange({ gradientMapColor1: p.c1, gradientMapColor2: p.c2 })}
                  className="py-2 rounded-lg text-[9px] text-white/40 ring-1 ring-white/[0.06] hover:bg-white/[0.07] transition-all overflow-hidden relative">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${p.c1}, ${p.c2})` }} />
                  <span className="relative z-10 font-medium text-white/80">{p.l}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Retro Wave</SectionLabel>
        <Toggle label="Enable" value={state.retroWave ?? false} onChange={v => onChange({ retroWave: v })}
          desc="Vaporwave / synthwave color gradient overlay" />
        {(state.retroWave ?? false) && (
          <>
            <Slider label="Intensity" value={state.retroWaveOpacity ?? 60} min={10} max={100} unit="%"
              onChange={v => onChange({ retroWaveOpacity: v })} />
            <Slider label="Angle" value={state.retroWaveAngle ?? 0} min={0} max={360} unit="°"
              onChange={v => onChange({ retroWaveAngle: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Depth of Field</SectionLabel>
        <Toggle label="Enable" value={state.depthOfField ?? false} onChange={v => onChange({ depthOfField: v })}
          desc="Blurs edges, keeps center sharp (simulated DoF)" />
        {(state.depthOfField ?? false) && (
          <Slider label="Sharp Radius" value={state.depthOfFieldRadius ?? 40} min={10} max={80} unit="%"
            onChange={v => onChange({ depthOfFieldRadius: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Canvas Decorations</SectionLabel>
        <Slider label="Grid Lines" value={state.gridLines ?? 0} min={0} max={100}
          onChange={v => onChange({ gridLines: v })} />
        <Toggle label="Crosshair" value={state.crosshair ?? false} onChange={v => onChange({ crosshair: v })}
          desc="Reticle overlay at canvas center" />
        {(state.crosshair ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.crosshairColor?.startsWith('rgba') ? '#ffffff' : (state.crosshairColor ?? '#ffffff')}
              onChange={e => onChange({ crosshairColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
          </div>
        )}
        <Toggle label="Rainbow Border" value={state.rainbowBorder ?? false} onChange={v => onChange({ rainbowBorder: v })}
          desc="Conic-gradient rainbow frame around canvas" />
      </Card>

      <Card>
        <SectionLabel>Bokeh Overlay</SectionLabel>
        <Slider label="Intensity" value={state.bokehOverlay ?? 0} min={0} max={100}
          onChange={v => onChange({ bokehOverlay: v })} />
        {(state.bokehOverlay ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.bokehColor?.startsWith('rgba') ? '#ffffff' : (state.bokehColor ?? '#ffffff')}
              onChange={e => onChange({ bokehColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#ffffff', '#8b5cf6', '#ec4899', '#38bdf8', '#fbbf24', '#34d399'].map(c => (
                <button key={c} onClick={() => onChange({ bokehColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c, boxShadow: `0 0 4px ${c}` }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Stamp Effect</SectionLabel>
        <Toggle label="Enable" value={state.stampEffect ?? false} onChange={v => onChange({ stampEffect: v })}
          desc="Rubber stamp / ink seal overlay" />
        {(state.stampEffect ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.stampColor ?? '#cc0000'}
              onChange={e => onChange({ stampColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#cc0000', '#0033cc', '#006600', '#cc6600', '#660066', '#000000'].map(c => (
                <button key={c} onClick={() => onChange({ stampColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Overlay Pattern</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'none',     l: 'None' },
            { id: 'dots2',    l: 'Dots' },
            { id: 'hearts',   l: 'Hearts' },
            { id: 'stars2',   l: 'Stars' },
            { id: 'confetti', l: 'Confetti' },
            { id: 'snow',     l: 'Snow' },
          ].map(p => (
            <QuickChip key={p.id} active={(state.overlayPatternType ?? 'none') === p.id}
              onClick={() => onChange({ overlayPatternType: p.id })}>{p.l}</QuickChip>
          ))}
        </div>
        {(state.overlayPatternType ?? 'none') !== 'none' && (
          <>
            <Slider label="Opacity" value={state.overlayPatternOpacity ?? 30} min={5} max={100}
              onChange={v => onChange({ overlayPatternOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.overlayPatternColor ?? '#ffffff'}
                onChange={e => onChange({ overlayPatternColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#ffffff', '#000000', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map(c => (
                  <button key={c} onClick={() => onChange({ overlayPatternColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Split Screen</SectionLabel>
        <Toggle label="Enable" value={state.splitScreen ?? false} onChange={v => onChange({ splitScreen: v })}
          desc="Diagonal two-tone color overlay" />
        {(state.splitScreen ?? false) && (
          <>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] text-white/35">Color 1</span>
                <input type="color" value={state.splitScreenColor1 ?? '#000000'}
                  onChange={e => onChange({ splitScreenColor1: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] text-white/35">Color 2</span>
                <input type="color" value={state.splitScreenColor2 ?? '#ffffff'}
                  onChange={e => onChange({ splitScreenColor2: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            </div>
            <Slider label="Angle" value={state.splitScreenAngle ?? 135} min={0} max={360} unit="°"
              onChange={v => onChange({ splitScreenAngle: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Canvas Gradient Overlay</SectionLabel>
        <Toggle label="Enable" value={state.canvasGradientOverlay ?? false}
          onChange={v => onChange({ canvasGradientOverlay: v })}
          desc="Multi-color gradient over entire canvas" />
        {(state.canvasGradientOverlay ?? false) && (
          <>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] text-white/35">Color 1</span>
                <input type="color"
                  value={(state.canvasGradientOverlayColor1 ?? '#ff006680').slice(0, 7)}
                  onChange={e => onChange({ canvasGradientOverlayColor1: e.target.value + '80' })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] text-white/35">Color 2</span>
                <input type="color"
                  value={(state.canvasGradientOverlayColor2 ?? '#8338ec80').slice(0, 7)}
                  onChange={e => onChange({ canvasGradientOverlayColor2: e.target.value + '80' })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            </div>
            <Slider label="Angle" value={state.canvasGradientOverlayAngle ?? 135} min={0} max={360} unit="°"
              onChange={v => onChange({ canvasGradientOverlayAngle: v })} />
            <Slider label="Opacity" value={state.canvasGradientOverlayOpacity ?? 30} min={5} max={100}
              onChange={v => onChange({ canvasGradientOverlayOpacity: v })} />
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { c1: '#ff006680', c2: '#8338ec80', l: 'Sunset' },
                { c1: '#00b4d880', c2: '#0077b680', l: 'Ocean' },
                { c1: '#38ef7d80', c2: '#11998e80', l: 'Mint' },
                { c1: '#f7971e80', c2: '#ffd20080', l: 'Gold' },
                { c1: '#fc466b80', c2: '#3f5efb80', l: 'Candy' },
                { c1: '#ffffff40', c2: '#00000040', l: 'Soft' },
              ].map(p => (
                <button key={p.l}
                  onClick={() => onChange({ canvasGradientOverlayColor1: p.c1, canvasGradientOverlayColor2: p.c2 })}
                  className="py-2 rounded-lg text-[9px] text-white/70 ring-1 ring-white/[0.06] overflow-hidden relative hover:ring-white/20 transition-all">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.c1}, ${p.c2})` }} />
                  <span className="relative z-10 font-medium">{p.l}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Overlay Blur</SectionLabel>
        <Slider label="Blur" value={state.overlayBlur ?? 0} min={0} max={20} unit="px"
          onChange={v => onChange({ overlayBlur: v })} />
        <p className="text-[8.5px] text-white/20">Adds backdrop blur to the color overlay</p>
      </Card>

      {/* Batch 12 — extra gradient stops */}
      <Card highlight>
        <SectionLabel>Extra Gradient Stops</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { v: 2, l: '2 Stops' },
            { v: 3, l: '3 Stops' },
            { v: 4, l: '4 Stops' },
          ].map(({ v, l }) => (
            <QuickChip key={v} active={(state.bgGradientStops ?? 2) === v}
              onClick={() => onChange({ bgGradientStops: v })}>{l}</QuickChip>
          ))}
        </div>
        {(state.bgGradientStops ?? 2) >= 3 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-white/35">Stop 3</span>
            <input type="color" value={state.bgGradientColor3 ?? '#f59e0b'}
              onChange={e => onChange({ bgGradientColor3: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            {(state.bgGradientStops ?? 2) >= 4 && (
              <>
                <span className="text-[10px] text-white/35 ml-2">Stop 4</span>
                <input type="color" value={state.bgGradientColor4 ?? '#10b981'}
                  onChange={e => onChange({ bgGradientColor4: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </>
            )}
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Text Sticker</SectionLabel>
        <input type="text" placeholder="e.g. ✨ NEW, 🔥 HOT TAKE…" value={state.stickerText ?? ''}
          onChange={e => onChange({ stickerText: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
        {(state.stickerText ?? '').length > 0 && (
          <>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] text-white/35">BG</span>
                <input type="color" value={state.stickerBg ?? '#8b5cf6'}
                  onChange={e => onChange({ stickerBg: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] text-white/35">Text</span>
                <input type="color" value={state.stickerColor ?? '#ffffff'}
                  onChange={e => onChange({ stickerColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Slider label="X" value={state.stickerX ?? 50} min={5} max={95} unit="%"
                onChange={v => onChange({ stickerX: v })} />
              <Slider label="Y" value={state.stickerY ?? 80} min={5} max={95} unit="%"
                onChange={v => onChange({ stickerY: v })} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Slider label="Font Size" value={state.stickerSize ?? 16} min={10} max={36} unit="px"
                onChange={v => onChange({ stickerSize: v })} />
              <Slider label="Radius" value={state.stickerRadius ?? 999} min={0} max={999}
                onChange={v => onChange({ stickerRadius: v })} />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Progress Bar</SectionLabel>
        <Toggle label="Enable" value={state.progressBar ?? false} onChange={v => onChange({ progressBar: v })}
          desc="Horizontal progress bar decoration" />
        {(state.progressBar ?? false) && (
          <>
            <Slider label="Value" value={state.progressBarValue ?? 70} min={0} max={100} unit="%"
              onChange={v => onChange({ progressBarValue: v })} />
            <Slider label="Height" value={state.progressBarHeight ?? 4} min={2} max={16} unit="px"
              onChange={v => onChange({ progressBarHeight: v })} />
            <div className="grid grid-cols-2 gap-1.5">
              <QuickChip active={(state.progressBarPosition ?? 'bottom') === 'top'}
                onClick={() => onChange({ progressBarPosition: 'top' })}>Top</QuickChip>
              <QuickChip active={(state.progressBarPosition ?? 'bottom') === 'bottom'}
                onClick={() => onChange({ progressBarPosition: 'bottom' })}>Bottom</QuickChip>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.progressBarColor ?? '#8b5cf6'}
                onChange={e => onChange({ progressBarColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'].map(c => (
                  <button key={c} onClick={() => onChange({ progressBarColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Accent Line */}
      <Card>
        <SectionLabel>Accent Line</SectionLabel>
        <Toggle label="Enable" value={state.accentLine ?? false} onChange={v => onChange({ accentLine: v })}
          desc="Bold edge accent stripe" />
        {(state.accentLine ?? false) && (
          <>
            <div className="grid grid-cols-3 gap-1.5">
              {(['left','right','top','bottom'] as const).map(pos => (
                <QuickChip key={pos} active={(state.accentLinePosition ?? 'left') === pos}
                  onClick={() => onChange({ accentLinePosition: pos })}>
                  {pos.charAt(0).toUpperCase() + pos.slice(1)}
                </QuickChip>
              ))}
            </div>
            <Slider label="Thickness" value={state.accentLineThickness ?? 4} min={1} max={20} unit="px"
              onChange={v => onChange({ accentLineThickness: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.accentLineColor ?? '#8b5cf6'}
                onChange={e => onChange({ accentLineColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6','#ec4899','#f59e0b','#10b981','#ef4444','#ffffff'].map(c => (
                  <button key={c} onClick={() => onChange({ accentLineColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Image Inner Glow */}
      <Card>
        <SectionLabel>Image Inner Glow</SectionLabel>
        <Toggle label="Enable" value={(state.imageInnerGlow ?? 0) > 0} onChange={v => onChange({ imageInnerGlow: v ? 40 : 0 })}
          desc="Soft inset glow on image edges" />
        {(state.imageInnerGlow ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.imageInnerGlowColor ?? '#8b5cf6'}
              onChange={e => onChange({ imageInnerGlowColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#8b5cf6','#ec4899','#f59e0b','#3b82f6','#ffffff','#000000'].map(c => (
                <button key={c} onClick={() => onChange({ imageInnerGlowColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Canvas Inset Shadow */}
      <Card>
        <SectionLabel>Canvas Inset Shadow</SectionLabel>
        <Toggle label="Enable" value={(state.canvasInsetShadow ?? 0) > 0} onChange={v => onChange({ canvasInsetShadow: v ? 30 : 0 })}
          desc="Deep inset shadow inside canvas border" />
      </Card>

      {/* Chip Annotation */}
      <Card>
        <SectionLabel>Chip Annotation</SectionLabel>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. #viral"
            value={state.chipText ?? ''}
            onChange={e => onChange({ chipText: e.target.value })}
            className="flex-1 bg-white/[0.06] rounded-xl px-3 py-2 text-[11px] text-white/80 placeholder:text-white/25 border border-white/[0.07] focus:outline-none focus:border-brand-500/50"
          />
        </div>
        {(state.chipText ?? '') !== '' && (
          <>
            <Slider label="X Position" value={state.chipX ?? 50} min={0} max={100} unit="%"
              onChange={v => onChange({ chipX: v })} />
            <Slider label="Y Position" value={state.chipY ?? 90} min={0} max={100} unit="%"
              onChange={v => onChange({ chipY: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.chipColor ?? '#8b5cf6'}
                onChange={e => onChange({ chipColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6','#ec4899','#f59e0b','#10b981','#ffffff','#000000'].map(c => (
                  <button key={c} onClick={() => onChange({ chipColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Batch 9 FX */}
      <Card>
        <SectionLabel>Stripe Background</SectionLabel>
        <Toggle label="Enable" value={state.stripeBg ?? false} onChange={v => onChange({ stripeBg: v })}
          desc="Diagonal stripe pattern background" />
        {(state.stripeBg ?? false) && (
          <>
            <Slider label="Angle" value={state.stripeBgAngle ?? 45} min={0} max={180} unit="°"
              onChange={v => onChange({ stripeBgAngle: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color A</span>
              <input type="color" value={state.stripeBgColor1 ?? '#1a1a2e'}
                onChange={e => onChange({ stripeBgColor1: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <span className="text-[10px] text-white/35 ml-2">Color B</span>
              <input type="color" value={state.stripeBgColor2 ?? '#16213e'}
                onChange={e => onChange({ stripeBgColor2: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Polka Dot Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayDots ?? false} onChange={v => onChange({ overlayDots: v })}
          desc="Repeating dot grid over canvas" />
        {(state.overlayDots ?? false) && (
          <>
            <Slider label="Dot Size" value={state.overlayDotsSize ?? 4} min={1} max={12} unit="px"
              onChange={v => onChange({ overlayDotsSize: v })} />
            <Slider label="Opacity" value={state.overlayDotsOpacity ?? 10} min={2} max={60} unit="%"
              onChange={v => onChange({ overlayDotsOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.overlayDotsColor ?? '#ffffff'}
                onChange={e => onChange({ overlayDotsColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#ffffff','#000000','#8b5cf6','#ec4899','#f59e0b','#10b981'].map(c => (
                  <button key={c} onClick={() => onChange({ overlayDotsColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Double Border</SectionLabel>
        <Toggle label="Enable" value={state.frameDoubleBorder ?? false} onChange={v => onChange({ frameDoubleBorder: v })}
          desc="Inner accent ring inside frame border" />
        {(state.frameDoubleBorder ?? false) && (
          <>
            <Slider label="Gap" value={state.frameDoubleBorderGap ?? 4} min={2} max={20} unit="px"
              onChange={v => onChange({ frameDoubleBorderGap: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.frameDoubleBorderColor ?? '#8b5cf6'}
                onChange={e => onChange({ frameDoubleBorderColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6','#ec4899','#f59e0b','#ffffff','#10b981','#000000'].map(c => (
                  <button key={c} onClick={() => onChange({ frameDoubleBorderColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Card Stack</SectionLabel>
        <Toggle label="Enable" value={state.cardStack ?? false} onChange={v => onChange({ cardStack: v })}
          desc="Stacked card shadow behind canvas" />
        {(state.cardStack ?? false) && (
          <>
            <Slider label="Offset" value={state.cardStackOffset ?? 8} min={2} max={24} unit="px"
              onChange={v => onChange({ cardStackOffset: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.cardStackColor ?? '#1a1a2e'}
                onChange={e => onChange({ cardStackColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      {/* Batch 10 FX */}
      <Card>
        <SectionLabel>Grid Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayGrid ?? false} onChange={v => onChange({ overlayGrid: v })}
          desc="Repeating grid line overlay" />
        {(state.overlayGrid ?? false) && (
          <>
            <Slider label="Grid Size" value={state.overlayGridSize ?? 40} min={10} max={100} unit="px"
              onChange={v => onChange({ overlayGridSize: v })} />
            <Slider label="Opacity" value={state.overlayGridOpacity ?? 10} min={2} max={60} unit="%"
              onChange={v => onChange({ overlayGridOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.overlayGridColor ?? '#ffffff'}
                onChange={e => onChange({ overlayGridColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Border</SectionLabel>
        <Toggle label="Enable" value={state.imageBorder ?? false} onChange={v => onChange({ imageBorder: v })}
          desc="Accent outline around the image" />
        {(state.imageBorder ?? false) && (
          <>
            <Slider label="Width" value={state.imageBorderWidth ?? 2} min={1} max={8} unit="px"
              onChange={v => onChange({ imageBorderWidth: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.imageBorderColor ?? '#8b5cf6'}
                onChange={e => onChange({ imageBorderColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6','#ec4899','#f59e0b','#10b981','#ffffff','#000000'].map(c => (
                  <button key={c} onClick={() => onChange({ imageBorderColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Shape</SectionLabel>
        <Toggle label="Rounded / Circle" value={state.imageRounded ?? false} onChange={v => onChange({ imageRounded: v })}
          desc="Apply border-radius to image" />
        {(state.imageRounded ?? false) && (
          <Slider label="Roundness" value={state.imageRoundedAmount ?? 50} min={5} max={50} unit="%"
            onChange={v => onChange({ imageRoundedAmount: v })} />
        )}
        <Toggle label="Pulse Ring" value={state.pulseRing ?? false} onChange={v => onChange({ pulseRing: v })}
          desc="Glowing ring around image" />
        {(state.pulseRing ?? false) && (
          <>
            <Slider label="Ring Size" value={state.pulseRingSize ?? 8} min={2} max={24} unit="px"
              onChange={v => onChange({ pulseRingSize: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.pulseRingColor ?? '#8b5cf6'}
                onChange={e => onChange({ pulseRingColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ffffff'].map(c => (
                  <button key={c} onClick={() => onChange({ pulseRingColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Corner Ribbon</SectionLabel>
        <Toggle label="Enable" value={state.cornerRibbon ?? false} onChange={v => onChange({ cornerRibbon: v })}
          desc="Diagonal banner in canvas corner" />
        {(state.cornerRibbon ?? false) && (
          <>
            <input type="text" placeholder="Ribbon text…" value={state.cornerRibbonText ?? 'NEW'}
              onChange={e => onChange({ cornerRibbonText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.06] text-white text-sm placeholder:text-white/20 ring-1 ring-white/[0.09] focus:outline-none" />
            <div className="grid grid-cols-4 gap-1.5">
              {(['tr','tl','br','bl'] as const).map(c => (
                <QuickChip key={c} active={(state.cornerRibbonCorner ?? 'tr') === c}
                  onClick={() => onChange({ cornerRibbonCorner: c })}>{c.toUpperCase()}</QuickChip>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">BG</span>
              <input type="color" value={state.cornerRibbonBg ?? '#ec4899'}
                onChange={e => onChange({ cornerRibbonBg: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#ec4899','#8b5cf6','#f59e0b','#10b981','#3b82f6','#ef4444'].map(c => (
                  <button key={c} onClick={() => onChange({ cornerRibbonBg: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Countdown Badge</SectionLabel>
        <Toggle label="Enable" value={state.countdownBadge ?? false} onChange={v => onChange({ countdownBadge: v })}
          desc="Number badge overlay (days/count)" />
        {(state.countdownBadge ?? false) && (
          <>
            <Slider label="Value" value={state.countdownValue ?? 7} min={1} max={99} unit=""
              onChange={v => onChange({ countdownValue: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">BG</span>
              <input type="color" value={state.countdownBg ?? '#8b5cf6'}
                onChange={e => onChange({ countdownBg: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444'].map(c => (
                  <button key={c} onClick={() => onChange({ countdownBg: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Batch 11 FX */}
      <Card>
        <SectionLabel>Text Shadow Preset</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'none',  l: 'None' },
            { id: 'soft',  l: 'Soft' },
            { id: 'hard',  l: 'Hard' },
            { id: 'glow',  l: 'Glow' },
            { id: 'retro', l: 'Retro' },
          ].map(t => (
            <QuickChip key={t.id} active={(state.textShadowPreset ?? 'none') === t.id}
              onClick={() => onChange({ textShadowPreset: t.id })}>{t.l}</QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Floating Label</SectionLabel>
        <Toggle label="Enable" value={state.floatingLabel ?? false} onChange={v => onChange({ floatingLabel: v })}
          desc="Top banner label bar" />
        {(state.floatingLabel ?? false) && (
          <>
            <input type="text" placeholder="Label text…" value={state.floatingLabelText ?? ''}
              onChange={e => onChange({ floatingLabelText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.06] text-white text-sm placeholder:text-white/20 ring-1 ring-white/[0.09] focus:outline-none" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">BG</span>
              <input type="color" value={state.floatingLabelBg ?? '#8b5cf6'}
                onChange={e => onChange({ floatingLabelBg: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#000000'].map(c => (
                  <button key={c} onClick={() => onChange({ floatingLabelBg: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Split Pane</SectionLabel>
        <Toggle label="Enable" value={state.splitPane ?? false} onChange={v => onChange({ splitPane: v })}
          desc="Two-panel canvas layout" />
        {(state.splitPane ?? false) && (
          <>
            <Slider label="Split %" value={state.splitPaneRatio ?? 50} min={20} max={80} unit="%"
              onChange={v => onChange({ splitPaneRatio: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Panel BG</span>
              <input type="color" value={state.splitPaneBg ?? '#1a1a2e'}
                onChange={e => onChange({ splitPaneBg: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Gradient Overlay Blend</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {['normal','screen','overlay','multiply','soft-light','hard-light'].map(m => (
            <QuickChip key={m} active={(state.gradientOverlayBlend ?? 'normal') === m}
              onClick={() => onChange({ gradientOverlayBlend: m })}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Badge Pulse Ring</SectionLabel>
        <Toggle label="Enable" value={state.badgePulse ?? false} onChange={v => onChange({ badgePulse: v })}
          desc="Glowing ring around badge label" />
      </Card>

      {/* Batch 12 FX controls */}
      <Card>
        <SectionLabel>Image Vignette</SectionLabel>
        <Toggle label="Enable" value={state.imageVignette ?? false} onChange={v => onChange({ imageVignette: v })}
          desc="Radial vignette on image specifically" />
        {(state.imageVignette ?? false) && (
          <>
            <Slider label="Size" value={state.imageVignetteSize ?? 40} min={5} max={90} unit="%"
              onChange={v => onChange({ imageVignetteSize: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.imageVignetteColor ?? '#000000'}
                onChange={e => onChange({ imageVignetteColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Halftone Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayHalftone ?? false} onChange={v => onChange({ overlayHalftone: v })}
          desc="Classic halftone dot pattern" />
        {(state.overlayHalftone ?? false) && (
          <>
            <Slider label="Density" value={state.overlayHalftoneDensity ?? 4} min={2} max={12} unit="px"
              onChange={v => onChange({ overlayHalftoneDensity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.overlayHalftoneColor ?? '#000000'}
                onChange={e => onChange({ overlayHalftoneColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Divider Line</SectionLabel>
        <Toggle label="Enable" value={state.dividerLine ?? false} onChange={v => onChange({ dividerLine: v })}
          desc="Horizontal line across canvas midpoint" />
        {(state.dividerLine ?? false) && (
          <>
            <Slider label="Thickness" value={state.dividerLineHeight ?? 1} min={1} max={8} unit="px"
              onChange={v => onChange({ dividerLineHeight: v })} />
            <div className="grid grid-cols-4 gap-1.5">
              {(['solid','dashed','dotted','double'] as const).map(s => (
                <QuickChip key={s} active={(state.dividerLineStyle ?? 'solid') === s}
                  onClick={() => onChange({ dividerLineStyle: s })}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </QuickChip>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.dividerLineColor ?? '#ffffff'}
                onChange={e => onChange({ dividerLineColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Scrolling Ticker</SectionLabel>
        <Toggle label="Enable" value={state.scrollingText ?? false} onChange={v => onChange({ scrollingText: v })}
          desc="Scrolling text bar at bottom" />
        {(state.scrollingText ?? false) && (
          <>
            <input type="text" placeholder="Ticker text…" value={state.scrollingTextContent ?? ''}
              onChange={e => onChange({ scrollingTextContent: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.06] text-white text-sm placeholder:text-white/20 ring-1 ring-white/[0.09] focus:outline-none" />
            <Slider label="Text Size" value={state.scrollingTextSize ?? 11} min={8} max={20} unit="px"
              onChange={v => onChange({ scrollingTextSize: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">BG</span>
              <input type="color" value={state.scrollingTextBg ?? '#8b5cf6'}
                onChange={e => onChange({ scrollingTextBg: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#000000'].map(c => (
                  <button key={c} onClick={() => onChange({ scrollingTextBg: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Overlay Text</SectionLabel>
        <input type="text" placeholder="Watermark text over image…" value={state.imageOverlayText ?? ''}
          onChange={e => onChange({ imageOverlayText: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-white/[0.06] text-white text-sm placeholder:text-white/20 ring-1 ring-white/[0.09] focus:outline-none" />
        {(state.imageOverlayText ?? '').length > 0 && (
          <>
            <Slider label="Size" value={state.imageOverlayTextSize ?? 24} min={12} max={60} unit="px"
              onChange={v => onChange({ imageOverlayTextSize: v })} />
            <Slider label="Opacity" value={state.imageOverlayTextOpacity ?? 30} min={5} max={80} unit="%"
              onChange={v => onChange({ imageOverlayTextOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.imageOverlayTextColor ?? '#ffffff'}
                onChange={e => onChange({ imageOverlayTextColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      {/* Batch 13 FX controls */}
      <Card>
        <SectionLabel>Film Grain (Fine)</SectionLabel>
        <Toggle label="Enable" value={state.noiseGrain ?? false} onChange={v => onChange({ noiseGrain: v })}
          desc="Fine noise grain across whole canvas" />
        {(state.noiseGrain ?? false) && (
          <Slider label="Opacity" value={state.noiseGrainOpacity ?? 20} min={5} max={70} unit="%"
            onChange={v => onChange({ noiseGrainOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Linear Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayLinear ?? false} onChange={v => onChange({ overlayLinear: v })}
          desc="Top-to-bottom gradient fade overlay" />
        {(state.overlayLinear ?? false) && (
          <>
            <Slider label="Opacity" value={state.overlayLinearOpacity ?? 60} min={10} max={100} unit="%"
              onChange={v => onChange({ overlayLinearOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Top</span>
              <input type="color" value={state.overlayLinearColor1 ?? '#000000'}
                onChange={e => onChange({ overlayLinearColor1: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <span className="text-[10px] text-white/35 ml-2">Bottom</span>
              <input type="color" value={state.overlayLinearColor2?.replace(/00$/, '') ?? '#000000'}
                onChange={e => onChange({ overlayLinearColor2: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Duotone Color Map</SectionLabel>
        <Toggle label="Enable" value={state.colorDuotoneMap ?? false} onChange={v => onChange({ colorDuotoneMap: v })}
          desc="Two-color duotone blend over image" />
        {(state.colorDuotoneMap ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Shadow</span>
            <input type="color" value={state.colorDuotoneMapColor1 ?? '#8b5cf6'}
              onChange={e => onChange({ colorDuotoneMapColor1: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <span className="text-[10px] text-white/35 ml-2">Highlight</span>
            <input type="color" value={state.colorDuotoneMapColor2 ?? '#ec4899'}
              onChange={e => onChange({ colorDuotoneMapColor2: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Icon Bar</SectionLabel>
        <Toggle label="Enable" value={state.iconBar ?? false} onChange={v => onChange({ iconBar: v })}
          desc="Decorative icon row at canvas bottom" />
        {(state.iconBar ?? false) && (
          <>
            <div className="grid grid-cols-4 gap-1.5">
              {(['stars','social','arrows','dots'] as const).map(s => (
                <QuickChip key={s} active={(state.iconBarStyle ?? 'stars') === s}
                  onClick={() => onChange({ iconBarStyle: s })}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </QuickChip>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.iconBarColor ?? '#f59e0b'}
                onChange={e => onChange({ iconBarColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      {/* Batch 14 FX controls */}
      <Card>
        <SectionLabel>VHS Effect</SectionLabel>
        <Toggle label="Enable" value={state.overlayVHS ?? false} onChange={v => onChange({ overlayVHS: v })}
          desc="Retro CRT scanlines + color bleed" />
        {(state.overlayVHS ?? false) && (
          <Slider label="Intensity" value={state.overlayVHSIntensity ?? 40} min={10} max={100} unit="%"
            onChange={v => onChange({ overlayVHSIntensity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Backdrop Blur Card</SectionLabel>
        <Toggle label="Enable" value={state.backdropBlurCard ?? false} onChange={v => onChange({ backdropBlurCard: v })}
          desc="Frosted glass panel behind text area" />
        {(state.backdropBlurCard ?? false) && (
          <>
            <Slider label="Blur" value={state.backdropBlurCardBlur ?? 12} min={2} max={40} unit="px"
              onChange={v => onChange({ backdropBlurCardBlur: v })} />
            <Slider label="Opacity" value={state.backdropBlurCardOpacity ?? 80} min={10} max={100} unit="%"
              onChange={v => onChange({ backdropBlurCardOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Card Bg</span>
              <input type="color" value={(state.backdropBlurCardBg ?? '#000000').slice(0, 7)}
                onChange={e => onChange({ backdropBlurCardBg: e.target.value + '60' })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Shadow</SectionLabel>
        <Toggle label="Enable" value={state.imageShadow ?? false} onChange={v => onChange({ imageShadow: v })}
          desc="Drop shadow beneath image element" />
        {(state.imageShadow ?? false) && (
          <>
            <Slider label="Blur" value={state.imageShadowBlur ?? 20} min={4} max={60} unit="px"
              onChange={v => onChange({ imageShadowBlur: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Shadow Color</span>
              <input type="color" value={state.imageShadowColor ?? '#000000'}
                onChange={e => onChange({ imageShadowColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Animated BG Shimmer</SectionLabel>
        <Toggle label="Enable Shimmer" value={state.bgAnimatedGradient ?? false}
          onChange={v => onChange({ bgAnimatedGradient: v })} desc="Light shimmer overlay on background" />
      </Card>

      {/* Batch 15 FX controls */}
      <Card>
        <SectionLabel>Rainbow Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayRainbow ?? false} onChange={v => onChange({ overlayRainbow: v })}
          desc="Full-spectrum rainbow gradient over canvas" />
        {(state.overlayRainbow ?? false) && (
          <Slider label="Opacity" value={state.overlayRainbowOpacity ?? 30} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayRainbowOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Aurora Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayAurora ?? false} onChange={v => onChange({ overlayAurora: v })}
          desc="Northern lights radial gradient effect" />
        {(state.overlayAurora ?? false) && (
          <>
            <Slider label="Opacity" value={state.overlayAuroraOpacity ?? 40} min={10} max={100} unit="%"
              onChange={v => onChange({ overlayAuroraOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color 1</span>
              <input type="color" value={state.overlayAuroraColor1 ?? '#10b981'}
                onChange={e => onChange({ overlayAuroraColor1: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <span className="text-[10px] text-white/35">Color 2</span>
              <input type="color" value={state.overlayAuroraColor2 ?? '#8b5cf6'}
                onChange={e => onChange({ overlayAuroraColor2: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Canvas Grain</SectionLabel>
        <Toggle label="Enable" value={state.canvasGrain ?? false} onChange={v => onChange({ canvasGrain: v })}
          desc="Fine grain texture over entire canvas" />
        {(state.canvasGrain ?? false) && (
          <Slider label="Opacity" value={state.canvasGrainOpacity ?? 20} min={5} max={60} unit="%"
            onChange={v => onChange({ canvasGrainOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Frame Badge</SectionLabel>
        <input
          type="text"
          placeholder="Badge text (e.g. NEW, SALE)..."
          value={state.frameBadge ?? ''}
          onChange={e => onChange({ frameBadge: e.target.value })}
          className="w-full bg-white/[0.06] text-white/70 text-[11px] rounded-xl px-3 py-2 outline-none border border-white/[0.08] focus:border-brand-500/50 placeholder-white/20"
        />
        {(state.frameBadge ?? '').length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Bg</span>
            <input type="color" value={state.frameBadgeBg ?? '#ec4899'}
              onChange={e => onChange({ frameBadgeBg: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <span className="text-[10px] text-white/35">Text</span>
            <input type="color" value={state.frameBadgeColor ?? '#ffffff'}
              onChange={e => onChange({ frameBadgeColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#ec4899','#8b5cf6','#f59e0b','#10b981','#3b82f6','#ef4444'].map(c => (
                <button key={c} onClick={() => onChange({ frameBadgeBg: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Vintage Image Frame</SectionLabel>
        <Toggle label="Enable" value={state.imageVintageFrame ?? false} onChange={v => onChange({ imageVintageFrame: v })}
          desc="Decorative inset border on image" />
        {(state.imageVintageFrame ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Frame Color</span>
            <input type="color" value={state.imageVintageFrameColor ?? '#c8a97e'}
              onChange={e => onChange({ imageVintageFrameColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#c8a97e','#ffffff','#d4af37','#8b7355','#a0522d','#deb887'].map(c => (
                <button key={c} onClick={() => onChange({ imageVintageFrameColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Batch 16 FX controls */}
      <Card>
        <SectionLabel>Haze Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayHaze ?? false} onChange={v => onChange({ overlayHaze: v })}
          desc="Dreamy bottom fog/haze radial glow" />
        {(state.overlayHaze ?? false) && (
          <>
            <Slider label="Opacity" value={state.overlayHazeOpacity ?? 30} min={5} max={80} unit="%"
              onChange={v => onChange({ overlayHazeOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Haze Color</span>
              <input type="color" value={state.overlayHazeColor ?? '#c8d8ff'}
                onChange={e => onChange({ overlayHazeColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Bokeh Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayBokeh ?? false} onChange={v => onChange({ overlayBokeh: v })}
          desc="Soft blurred light circles over canvas" />
        {(state.overlayBokeh ?? false) && (
          <>
            <Slider label="Opacity" value={state.overlayBokehOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ overlayBokehOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Bokeh Color</span>
              <input type="color" value={state.overlayBokehColor ?? '#ffffff'}
                onChange={e => onChange({ overlayBokehColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Prismatic Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayPrismatic ?? false} onChange={v => onChange({ overlayPrismatic: v })}
          desc="Iridescent color-spectrum light overlay" />
        {(state.overlayPrismatic ?? false) && (
          <Slider label="Opacity" value={state.overlayPrismaticOpacity ?? 25} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayPrismaticOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Upper Text Band</SectionLabel>
        <Toggle label="Enable" value={state.textUpperBand ?? false} onChange={v => onChange({ textUpperBand: v })}
          desc="Colored announcement bar at canvas top" />
        {(state.textUpperBand ?? false) && (
          <>
            <input
              type="text"
              placeholder="Band text..."
              value={state.textUpperBandText ?? ''}
              onChange={e => onChange({ textUpperBandText: e.target.value })}
              className="w-full bg-white/[0.06] text-white/70 text-[11px] rounded-xl px-3 py-2 outline-none border border-white/[0.08] focus:border-brand-500/50 placeholder-white/20"
            />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Bg</span>
              <input type="color" value={state.textUpperBandBg ?? '#8b5cf6'}
                onChange={e => onChange({ textUpperBandBg: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <span className="text-[10px] text-white/35">Text</span>
              <input type="color" value={state.textUpperBandColor ?? '#ffffff'}
                onChange={e => onChange({ textUpperBandColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Layered Cards BG</SectionLabel>
        <Toggle label="Enable" value={state.bgLayeredCards ?? false} onChange={v => onChange({ bgLayeredCards: v })}
          desc="Stacked card layers behind canvas" />
        {(state.bgLayeredCards ?? false) && (
          <>
            <Slider label="Layers" value={state.bgLayeredCardsCount ?? 3} min={1} max={4}
              onChange={v => onChange({ bgLayeredCardsCount: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Card Color</span>
              <input type="color" value={state.bgLayeredCardsColor ?? '#1a1a2e'}
                onChange={e => onChange({ bgLayeredCardsColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      {/* Batch 17 FX controls */}
      <Card>
        <SectionLabel>Canvas Stamp</SectionLabel>
        <Toggle label="Enable" value={state.canvasStamp ?? false} onChange={v => onChange({ canvasStamp: v })}
          desc="Diagonal approval/sale stamp overlay" />
        {(state.canvasStamp ?? false) && (
          <>
            <input type="text" placeholder="Stamp text (e.g. APPROVED, SOLD)..."
              value={state.canvasStampText ?? ''} onChange={e => onChange({ canvasStampText: e.target.value })}
              className="w-full bg-white/[0.06] text-white/70 text-[11px] rounded-xl px-3 py-2 outline-none border border-white/[0.08] focus:border-brand-500/50 placeholder-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.canvasStampColor ?? '#ef4444'}
                onChange={e => onChange({ canvasStampColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#ef4444','#10b981','#8b5cf6','#f59e0b','#3b82f6','#ffffff'].map(c => (
                  <button key={c} onClick={() => onChange({ canvasStampColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Diagonal Ribbon</SectionLabel>
        <Toggle label="Enable" value={state.canvasRibbon ?? false} onChange={v => onChange({ canvasRibbon: v })}
          desc="Diagonal text ribbon across canvas" />
        {(state.canvasRibbon ?? false) && (
          <>
            <input type="text" placeholder="Ribbon text..."
              value={state.canvasRibbonText ?? ''} onChange={e => onChange({ canvasRibbonText: e.target.value })}
              className="w-full bg-white/[0.06] text-white/70 text-[11px] rounded-xl px-3 py-2 outline-none border border-white/[0.08] focus:border-brand-500/50 placeholder-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Bg</span>
              <input type="color" value={state.canvasRibbonBg ?? '#ec4899'}
                onChange={e => onChange({ canvasRibbonBg: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <span className="text-[10px] text-white/35">Text</span>
              <input type="color" value={state.canvasRibbonColor ?? '#ffffff'}
                onChange={e => onChange({ canvasRibbonColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Retro Lines Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayRetroLines ?? false} onChange={v => onChange({ overlayRetroLines: v })}
          desc="Horizontal colored stripes for retro TV look" />
        {(state.overlayRetroLines ?? false) && (
          <>
            <Slider label="Opacity" value={state.overlayRetroLinesOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ overlayRetroLinesOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.overlayRetroLinesColor ?? '#ff6b6b'}
                onChange={e => onChange({ overlayRetroLinesColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Background Bubbles</SectionLabel>
        <Toggle label="Enable" value={state.bgBubbles ?? false} onChange={v => onChange({ bgBubbles: v })}
          desc="Soft circular orbs scattered in background" />
        {(state.bgBubbles ?? false) && (
          <>
            <Slider label="Opacity" value={state.bgBubblesOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgBubblesOpacity: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Bubble Color</span>
              <input type="color" value={state.bgBubblesColor ?? '#ffffff'}
                onChange={e => onChange({ bgBubblesColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Neon Text Border</SectionLabel>
        <Toggle label="Enable" value={state.textNeonBorder ?? false} onChange={v => onChange({ textNeonBorder: v })}
          desc="Neon glow border around text block" />
        {(state.textNeonBorder ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Glow Color</span>
            <input type="color" value={state.textNeonBorderColor ?? '#8b5cf6'}
              onChange={e => onChange({ textNeonBorderColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#8b5cf6','#ec4899','#00ffcc','#ff6600','#00aaff','#ffff00'].map(c => (
                <button key={c} onClick={() => onChange({ textNeonBorderColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Batch 38 FX controls */}
      <Card>
        <SectionLabel>Desert</SectionLabel>
        <Toggle label="Enable" value={state.bgDesert ?? false} onChange={v => onChange({ bgDesert: v })}
          desc="Sand dune wave ripple pattern" />
        {(state.bgDesert ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgDesertColor ?? '#c4a055'}
                onChange={e => onChange({ bgDesertColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgDesertOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ bgDesertOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Arctic</SectionLabel>
        <Toggle label="Enable" value={state.bgArctic ?? false} onChange={v => onChange({ bgArctic: v })}
          desc="Ice crystal geometric frost pattern" />
        {(state.bgArctic ?? false) && (
          <Slider label="Opacity" value={state.bgArcticOpacity ?? 20} min={5} max={70} unit="%"
            onChange={v => onChange({ bgArcticOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Jungle</SectionLabel>
        <Toggle label="Enable" value={state.bgJungle ?? false} onChange={v => onChange({ bgJungle: v })}
          desc="Tropical leaf silhouette pattern" />
        {(state.bgJungle ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgJungleColor ?? '#2d6a1e'}
                onChange={e => onChange({ bgJungleColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgJungleOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgJungleOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Coral Reef</SectionLabel>
        <Toggle label="Enable" value={state.bgCoral ?? false} onChange={v => onChange({ bgCoral: v })}
          desc="Organic coral branching pattern" />
        {(state.bgCoral ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgCoralColor ?? '#e8735a'}
                onChange={e => onChange({ bgCoralColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgCoralOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgCoralOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Obsidian</SectionLabel>
        <Toggle label="Enable" value={state.bgObsidian ?? false} onChange={v => onChange({ bgObsidian: v })}
          desc="Dark glass shard polygon facets" />
        {(state.bgObsidian ?? false) && (
          <Slider label="Opacity" value={state.bgObsidianOpacity ?? 15} min={5} max={60} unit="%"
            onChange={v => onChange({ bgObsidianOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Parchment</SectionLabel>
        <Toggle label="Enable" value={state.bgParchment ?? false} onChange={v => onChange({ bgParchment: v })}
          desc="Aged paper fibrous texture" />
        {(state.bgParchment ?? false) && (
          <Slider label="Opacity" value={state.bgParchmentOpacity ?? 20} min={5} max={60} unit="%"
            onChange={v => onChange({ bgParchmentOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Aurora 2</SectionLabel>
        <Toggle label="Enable" value={state.overlayAurora2 ?? false} onChange={v => onChange({ overlayAurora2: v })}
          desc="Northern lights curtain bands overlay" />
        {(state.overlayAurora2 ?? false) && (
          <Slider label="Opacity" value={state.overlayAurora2Opacity ?? 30} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayAurora2Opacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Fog</SectionLabel>
        <Toggle label="Enable" value={state.overlayFog ?? false} onChange={v => onChange({ overlayFog: v })}
          desc="Dense ground-level fog layer at bottom" />
        {(state.overlayFog ?? false) && (
          <Slider label="Opacity" value={state.overlayFogOpacity ?? 35} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayFogOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Vine Frame</SectionLabel>
        <Toggle label="Enable" value={state.frameVine ?? false} onChange={v => onChange({ frameVine: v })}
          desc="Green vine leaf inset border frame" />
        {(state.frameVine ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameVineColor ?? '#4a7c2f'}
              onChange={e => onChange({ frameVineColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Bevel</SectionLabel>
        <Toggle label="Enable" value={state.canvasBevel ?? false} onChange={v => onChange({ canvasBevel: v })}
          desc="3D raised beveled edge highlight" />
      </Card>

      {/* Batch 37 FX controls */}
      <Card>
        <SectionLabel>Ocean</SectionLabel>
        <Toggle label="Enable" value={state.bgOcean ?? false} onChange={v => onChange({ bgOcean: v })}
          desc="Ocean wave ripple line pattern" />
        {(state.bgOcean ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgOceanColor ?? '#0077be'}
                onChange={e => onChange({ bgOceanColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgOceanOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ bgOceanOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Lightning</SectionLabel>
        <Toggle label="Enable" value={state.bgLightning ?? false} onChange={v => onChange({ bgLightning: v })}
          desc="Lightning bolt zigzag pattern" />
        {(state.bgLightning ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgLightningColor ?? '#f0e040'}
                onChange={e => onChange({ bgLightningColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgLightningOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgLightningOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Clouds</SectionLabel>
        <Toggle label="Enable" value={state.bgCloud ?? false} onChange={v => onChange({ bgCloud: v })}
          desc="Fluffy cloud silhouette formations" />
        {(state.bgCloud ?? false) && (
          <Slider label="Opacity" value={state.bgCloudOpacity ?? 20} min={5} max={60} unit="%"
            onChange={v => onChange({ bgCloudOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Volcanic</SectionLabel>
        <Toggle label="Enable" value={state.bgVolcanic ?? false} onChange={v => onChange({ bgVolcanic: v })}
          desc="Volcanic hexagonal lava rock grid" />
        {(state.bgVolcanic ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgVolcanicColor ?? '#ff4500'}
                onChange={e => onChange({ bgVolcanicColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgVolcanicOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgVolcanicOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Forest</SectionLabel>
        <Toggle label="Enable" value={state.bgForest ?? false} onChange={v => onChange({ bgForest: v })}
          desc="Pine tree silhouette pattern" />
        {(state.bgForest ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgForestColor ?? '#2d5a27'}
                onChange={e => onChange({ bgForestColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgForestOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgForestOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Astro</SectionLabel>
        <Toggle label="Enable" value={state.bgAstro ?? false} onChange={v => onChange({ bgAstro: v })}
          desc="Galaxy star cluster scatter pattern" />
        {(state.bgAstro ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgAstroColor ?? '#ffffff'}
                onChange={e => onChange({ bgAstroColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgAstroOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ bgAstroOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Bloom 2</SectionLabel>
        <Toggle label="Enable" value={state.overlayBloom2 ?? false} onChange={v => onChange({ overlayBloom2: v })}
          desc="Soft radial light bloom at center" />
        {(state.overlayBloom2 ?? false) && (
          <Slider label="Opacity" value={state.overlayBloom2Opacity ?? 40} min={10} max={90} unit="%"
            onChange={v => onChange({ overlayBloom2Opacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Natural Frame</SectionLabel>
        <Toggle label="Enable" value={state.frameNatural ?? false} onChange={v => onChange({ frameNatural: v })}
          desc="Natural stone/wood rounded frame" />
        {(state.frameNatural ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameNaturalColor ?? '#8b6040'}
              onChange={e => onChange({ frameNaturalColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Outer Glow 2</SectionLabel>
        <Toggle label="Enable" value={state.canvasGlow2 ?? false} onChange={v => onChange({ canvasGlow2: v })}
          desc="Wide soft outer halo around canvas" />
        {(state.canvasGlow2 ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.canvasGlow2Color ?? '#8b5cf6'}
              onChange={e => onChange({ canvasGlow2Color: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      {/* Batch 36 FX controls */}
      <Card>
        <SectionLabel>Cracked Earth</SectionLabel>
        <Toggle label="Enable" value={state.bgCracked ?? false} onChange={v => onChange({ bgCracked: v })}
          desc="Cracked dry earth polygon network" />
        {(state.bgCracked ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgCrackedColor ?? '#8b6040'}
                onChange={e => onChange({ bgCrackedColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgCrackedOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgCrackedOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Malachite</SectionLabel>
        <Toggle label="Enable" value={state.bgMalachite ?? false} onChange={v => onChange({ bgMalachite: v })}
          desc="Malachite stone curved band swirl" />
        {(state.bgMalachite ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgMalachiteColor ?? '#2d8a4e'}
                onChange={e => onChange({ bgMalachiteColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgMalachiteOpacity ?? 20} min={5} max={60} unit="%"
              onChange={v => onChange({ bgMalachiteOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Terrain</SectionLabel>
        <Toggle label="Enable" value={state.bgTerrain ?? false} onChange={v => onChange({ bgTerrain: v })}
          desc="3D terrain elevation contour lines" />
        {(state.bgTerrain ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgTerrainColor ?? '#4a7c59'}
                onChange={e => onChange({ bgTerrainColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgTerrainOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgTerrainOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>3D Grid</SectionLabel>
        <Toggle label="Enable" value={state.bgGrid3D ?? false} onChange={v => onChange({ bgGrid3D: v })}
          desc="Perspective vanishing-point 3D grid" />
        {(state.bgGrid3D ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgGrid3DColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgGrid3DColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgGrid3DOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgGrid3DOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Spiral 2</SectionLabel>
        <Toggle label="Enable" value={state.bgSpiral2 ?? false} onChange={v => onChange({ bgSpiral2: v })}
          desc="Concentric spiral ring pattern" />
        {(state.bgSpiral2 ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgSpiral2Color ?? '#8b5cf6'}
                onChange={e => onChange({ bgSpiral2Color: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgSpiral2Opacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgSpiral2Opacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Snowfall</SectionLabel>
        <Toggle label="Enable" value={state.overlaySnowfall ?? false} onChange={v => onChange({ overlaySnowfall: v })}
          desc="Scattered snowflake overlay" />
        {(state.overlaySnowfall ?? false) && (
          <Slider label="Opacity" value={state.overlaySnowfallOpacity ?? 30} min={5} max={80} unit="%"
            onChange={v => onChange({ overlaySnowfallOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Bamboo Frame</SectionLabel>
        <Toggle label="Enable" value={state.frameBamboo ?? false} onChange={v => onChange({ frameBamboo: v })}
          desc="Green bamboo strip inset frame" />
        {(state.frameBamboo ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameBambooColor ?? '#6b8c42'}
              onChange={e => onChange({ frameBambooColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Watermark</SectionLabel>
        <Toggle label="Enable" value={state.canvasWatermark ?? false} onChange={v => onChange({ canvasWatermark: v })}
          desc="Diagonal repeating text watermark" />
        {(state.canvasWatermark ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Text</span>
              <input type="text" value={state.canvasWatermarkText ?? 'DRAFT'}
                onChange={e => onChange({ canvasWatermarkText: e.target.value })}
                className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white/80" />
            </div>
            <Slider label="Opacity" value={state.canvasWatermarkOpacity ?? 8} min={2} max={30} unit="%"
              onChange={v => onChange({ canvasWatermarkOpacity: v })} />
          </>
        )}
      </Card>

      {/* Batch 35 FX controls */}
      <Card>
        <SectionLabel>Sandstone</SectionLabel>
        <Toggle label="Enable" value={state.bgSandstone ?? false} onChange={v => onChange({ bgSandstone: v })}
          desc="Sandy diagonal grain texture" />
        {(state.bgSandstone ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgSandstoneColor ?? '#c4a882'}
                onChange={e => onChange({ bgSandstoneColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgSandstoneOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ bgSandstoneOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Topography</SectionLabel>
        <Toggle label="Enable" value={state.bgTopography ?? false} onChange={v => onChange({ bgTopography: v })}
          desc="Topographic contour map lines" />
        {(state.bgTopography ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgTopographyColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgTopographyColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgTopographyOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgTopographyOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Honeycomb 2</SectionLabel>
        <Toggle label="Enable" value={state.bgHoneycomb2 ?? false} onChange={v => onChange({ bgHoneycomb2: v })}
          desc="Dense tight honeycomb hex grid" />
        {(state.bgHoneycomb2 ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgHoneycomb2Color ?? '#8b5cf6'}
                onChange={e => onChange({ bgHoneycomb2Color: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgHoneycomb2Opacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgHoneycomb2Opacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Paper Tear</SectionLabel>
        <Toggle label="Enable" value={state.bgPaperTear ?? false} onChange={v => onChange({ bgPaperTear: v })}
          desc="Torn paper ragged edge at bottom" />
        {(state.bgPaperTear ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgPaperTearColor ?? '#f5e6d0'}
                onChange={e => onChange({ bgPaperTearColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgPaperTearOpacity ?? 20} min={5} max={60} unit="%"
              onChange={v => onChange({ bgPaperTearOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Glitch Noise</SectionLabel>
        <Toggle label="Enable" value={state.bgGlitchNoise ?? false} onChange={v => onChange({ bgGlitchNoise: v })}
          desc="RGB digital glitch noise blocks" />
        {(state.bgGlitchNoise ?? false) && (
          <Slider label="Opacity" value={state.bgGlitchNoiseOpacity ?? 20} min={5} max={70} unit="%"
            onChange={v => onChange({ bgGlitchNoiseOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Gold Dust</SectionLabel>
        <Toggle label="Enable" value={state.overlayGoldDust ?? false} onChange={v => onChange({ overlayGoldDust: v })}
          desc="Shimmering gold particle overlay" />
        {(state.overlayGoldDust ?? false) && (
          <Slider label="Opacity" value={state.overlayGoldDustOpacity ?? 30} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayGoldDustOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Film Burn</SectionLabel>
        <Toggle label="Enable" value={state.overlayFilmBurn ?? false} onChange={v => onChange({ overlayFilmBurn: v })}
          desc="Warm orange edge film burn corners" />
        {(state.overlayFilmBurn ?? false) && (
          <Slider label="Opacity" value={state.overlayFilmBurnOpacity ?? 40} min={10} max={90} unit="%"
            onChange={v => onChange({ overlayFilmBurnOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Woven Frame</SectionLabel>
        <Toggle label="Enable" value={state.frameWoven ?? false} onChange={v => onChange({ frameWoven: v })}
          desc="Woven basket-weave inset frame" />
        {(state.frameWoven ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameWovenColor ?? '#8b6040'}
              onChange={e => onChange({ frameWovenColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Polaroid</SectionLabel>
        <Toggle label="Enable" value={state.canvasPolaroid ?? false} onChange={v => onChange({ canvasPolaroid: v })}
          desc="Thick white polaroid photo border" />
      </Card>

      {/* Batch 34 FX controls */}
      <Card>
        <SectionLabel>Smoke</SectionLabel>
        <Toggle label="Enable" value={state.bgSmoke ?? false} onChange={v => onChange({ bgSmoke: v })}
          desc="Wispy smoke cloud radial overlay" />
        {(state.bgSmoke ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgSmokeColor ?? '#aaaaaa'}
                onChange={e => onChange({ bgSmokeColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgSmokeOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ bgSmokeOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Lava Lamp</SectionLabel>
        <Toggle label="Enable" value={state.bgLavaLamp ?? false} onChange={v => onChange({ bgLavaLamp: v })}
          desc="Floating blob lava-lamp circles" />
        {(state.bgLavaLamp ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgLavaLampColor ?? '#ec4899'}
                onChange={e => onChange({ bgLavaLampColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgLavaLampOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ bgLavaLampOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Cobblestone</SectionLabel>
        <Toggle label="Enable" value={state.bgCobblestone ?? false} onChange={v => onChange({ bgCobblestone: v })}
          desc="Rounded cobblestone paving pattern" />
        {(state.bgCobblestone ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgCobblestoneColor ?? '#8b7355'}
                onChange={e => onChange({ bgCobblestoneColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgCobblestoneOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgCobblestoneOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Ikat</SectionLabel>
        <Toggle label="Enable" value={state.bgIkat ?? false} onChange={v => onChange({ bgIkat: v })}
          desc="Woven ikat diamond textile pattern" />
        {(state.bgIkat ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgIkatColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgIkatColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgIkatOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgIkatOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>VHS</SectionLabel>
        <Toggle label="Enable" value={state.bgVHS ?? false} onChange={v => onChange({ bgVHS: v })}
          desc="VHS scanline horizontal noise bands" />
        {(state.bgVHS ?? false) && (
          <Slider label="Opacity" value={state.bgVHSOpacity ?? 20} min={5} max={70} unit="%"
            onChange={v => onChange({ bgVHSOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Retro Lines</SectionLabel>
        <Toggle label="Enable" value={state.bgRetroLines ?? false} onChange={v => onChange({ bgRetroLines: v })}
          desc="Horizontal ruled notebook line pattern" />
        {(state.bgRetroLines ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgRetroLinesColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgRetroLinesColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgRetroLinesOpacity ?? 15} min={3} max={50} unit="%"
              onChange={v => onChange({ bgRetroLinesOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Film Scratches</SectionLabel>
        <Toggle label="Enable" value={state.overlayScratches ?? false} onChange={v => onChange({ overlayScratches: v })}
          desc="Vertical film scratch marks overlay" />
        {(state.overlayScratches ?? false) && (
          <Slider label="Opacity" value={state.overlayScratchesOpacity ?? 25} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayScratchesOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Gritty</SectionLabel>
        <Toggle label="Enable" value={state.canvasGritty ?? false} onChange={v => onChange({ canvasGritty: v })}
          desc="Urban diagonal gritty texture overlay" />
      </Card>

      <Card>
        <SectionLabel>Rusted Frame</SectionLabel>
        <Toggle label="Enable" value={state.frameRusted ?? false} onChange={v => onChange({ frameRusted: v })}
          desc="Corroded rusted inset border effect" />
        {(state.frameRusted ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameRustedColor ?? '#8b4513'}
              onChange={e => onChange({ frameRustedColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      {/* Batch 33 FX controls */}
      <Card>
        <SectionLabel>Stitching</SectionLabel>
        <Toggle label="Enable" value={state.bgStitching ?? false} onChange={v => onChange({ bgStitching: v })}
          desc="Dashed stitched-border craft effect" />
        {(state.bgStitching ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgStitchingColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgStitchingColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgStitchingOpacity ?? 40} min={10} max={80} unit="%"
              onChange={v => onChange({ bgStitchingOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Sunrise</SectionLabel>
        <Toggle label="Enable" value={state.bgSunrise ?? false} onChange={v => onChange({ bgSunrise: v })}
          desc="Warm sunrise color gradient sky overlay" />
        {(state.bgSunrise ?? false) && (
          <Slider label="Opacity" value={state.bgSunriseOpacity ?? 30} min={5} max={70} unit="%"
            onChange={v => onChange({ bgSunriseOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Mosaic</SectionLabel>
        <Toggle label="Enable" value={state.bgMosaic ?? false} onChange={v => onChange({ bgMosaic: v })}
          desc="Colored tile mosaic background pattern" />
        {(state.bgMosaic ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgMosaicColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgMosaicColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgMosaicOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgMosaicOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Geo 3D</SectionLabel>
        <Toggle label="Enable" value={state.bgGeometric3D ?? false} onChange={v => onChange({ bgGeometric3D: v })}
          desc="Isometric hexagonal 3D geometric grid" />
        {(state.bgGeometric3D ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgGeometric3DColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgGeometric3DColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgGeometric3DOpacity ?? 15} min={5} max={60} unit="%"
              onChange={v => onChange({ bgGeometric3DOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Vignette 2</SectionLabel>
        <Toggle label="Enable" value={state.overlayVignette2 ?? false} onChange={v => onChange({ overlayVignette2: v })}
          desc="Dark edge radial vignette overlay" />
        {(state.overlayVignette2 ?? false) && (
          <Slider label="Opacity" value={state.overlayVignette2Opacity ?? 50} min={10} max={90} unit="%"
            onChange={v => onChange({ overlayVignette2Opacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Glow 3D Frame</SectionLabel>
        <Toggle label="Enable" value={state.frameGlow3D ?? false} onChange={v => onChange({ frameGlow3D: v })}
          desc="3D-depth multi-glow inset frame" />
        {(state.frameGlow3D ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameGlow3DColor ?? '#8b5cf6'}
              onChange={e => onChange({ frameGlow3DColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      {/* Batch 32 FX controls */}
      <Card>
        <SectionLabel>Kaleidoscope</SectionLabel>
        <Toggle label="Enable" value={state.bgKaleidoscope ?? false} onChange={v => onChange({ bgKaleidoscope: v })}
          desc="Kaleidoscope conic radial background" />
        {(state.bgKaleidoscope ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgKaleidoscopeColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgKaleidoscopeColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgKaleidoscopeOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ bgKaleidoscopeOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Floral BG</SectionLabel>
        <Toggle label="Enable" value={state.bgFloral ?? false} onChange={v => onChange({ bgFloral: v })}
          desc="Floral petal radial pattern background" />
        {(state.bgFloral ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgFloralColor ?? '#ec4899'}
                onChange={e => onChange({ bgFloralColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgFloralOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgFloralOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Paving Stones</SectionLabel>
        <Toggle label="Enable" value={state.bgPavingStones ?? false} onChange={v => onChange({ bgPavingStones: v })}
          desc="Paving stone rectangular grid background" />
        {(state.bgPavingStones ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgPavingStonesColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgPavingStonesColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgPavingStonesOpacity ?? 12} min={3} max={50} unit="%"
              onChange={v => onChange({ bgPavingStonesOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Sparkle</SectionLabel>
        <Toggle label="Enable" value={state.overlaySparkle ?? false} onChange={v => onChange({ overlaySparkle: v })}
          desc="Sparkle star dots overlay" />
        {(state.overlaySparkle ?? false) && (
          <Slider label="Opacity" value={state.overlaySparkleOpacity ?? 30} min={5} max={80} unit="%"
            onChange={v => onChange({ overlaySparkleOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Ink Splash</SectionLabel>
        <Toggle label="Enable" value={state.canvasSplash ?? false} onChange={v => onChange({ canvasSplash: v })}
          desc="Ink/paint splash corner accent" />
        {(state.canvasSplash ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.canvasSplashColor ?? '#8b5cf6'}
              onChange={e => onChange({ canvasSplashColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      {/* Batch 31 FX controls */}
      <Card>
        <SectionLabel>Tie Dye</SectionLabel>
        <Toggle label="Enable" value={state.bgTieDye ?? false} onChange={v => onChange({ bgTieDye: v })}
          desc="Tie-dye radial swirl background" />
        {(state.bgTieDye ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgTieDyeColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgTieDyeColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgTieDyeOpacity ?? 25} min={5} max={70} unit="%"
              onChange={v => onChange({ bgTieDyeOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Tartan Plaid</SectionLabel>
        <Toggle label="Enable" value={state.bgTartanPlaid ?? false} onChange={v => onChange({ bgTartanPlaid: v })}
          desc="Tartan plaid crosshatch background" />
        {(state.bgTartanPlaid ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgTartanPlaidColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgTartanPlaidColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgTartanPlaidOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgTartanPlaidOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Wood Grain</SectionLabel>
        <Toggle label="Enable" value={state.bgWoodGrain ?? false} onChange={v => onChange({ bgWoodGrain: v })}
          desc="Wood grain ripple line background" />
        {(state.bgWoodGrain ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgWoodGrainColor ?? '#8b6040'}
                onChange={e => onChange({ bgWoodGrainColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgWoodGrainOpacity ?? 20} min={3} max={70} unit="%"
              onChange={v => onChange({ bgWoodGrainOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Crystal</SectionLabel>
        <Toggle label="Enable" value={state.bgCrystal ?? false} onChange={v => onChange({ bgCrystal: v })}
          desc="Crystal/gem geometric facets background" />
        {(state.bgCrystal ?? false) && (
          <Slider label="Opacity" value={state.bgCrystalOpacity ?? 15} min={3} max={60} unit="%"
            onChange={v => onChange({ bgCrystalOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Matrix</SectionLabel>
        <Toggle label="Enable" value={state.overlayMatrix ?? false} onChange={v => onChange({ overlayMatrix: v })}
          desc="Matrix binary character overlay" />
        {(state.overlayMatrix ?? false) && (
          <Slider label="Opacity" value={state.overlayMatrixOpacity ?? 20} min={5} max={70} unit="%"
            onChange={v => onChange({ overlayMatrixOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Bloom</SectionLabel>
        <Toggle label="Enable" value={state.canvasBloom ?? false} onChange={v => onChange({ canvasBloom: v })}
          desc="Soft bloom glow in canvas center" />
      </Card>

      {/* Batch 30 FX controls */}
      <Card>
        <SectionLabel>Terrazzo</SectionLabel>
        <Toggle label="Enable" value={state.bgTerrazzo ?? false} onChange={v => onChange({ bgTerrazzo: v })}
          desc="Terrazzo scattered pebble background" />
        {(state.bgTerrazzo ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgTerrazzoColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgTerrazzoColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgTerrazzoOpacity ?? 18} min={3} max={60} unit="%"
              onChange={v => onChange({ bgTerrazzoOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Snakeskin</SectionLabel>
        <Toggle label="Enable" value={state.bgSnakeskin ?? false} onChange={v => onChange({ bgSnakeskin: v })}
          desc="Diamond snakeskin scale background" />
        {(state.bgSnakeskin ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgSnakeskinColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgSnakeskinColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgSnakeskinOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgSnakeskinOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Denim Weave</SectionLabel>
        <Toggle label="Enable" value={state.bgDenim ?? false} onChange={v => onChange({ bgDenim: v })}
          desc="Denim diagonal weave texture background" />
        {(state.bgDenim ?? false) && (
          <Slider label="Opacity" value={state.bgDenimOpacity ?? 12} min={3} max={60} unit="%"
            onChange={v => onChange({ bgDenimOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Ice Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayIce ?? false} onChange={v => onChange({ overlayIce: v })}
          desc="Ice/frost blue tint overlay" />
        {(state.overlayIce ?? false) && (
          <Slider label="Intensity" value={state.overlayIceOpacity ?? 25} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayIceOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Paint Drip</SectionLabel>
        <Toggle label="Enable" value={state.overlayPaintDrip ?? false} onChange={v => onChange({ overlayPaintDrip: v })}
          desc="Paint drip drops from top edge" />
        {(state.overlayPaintDrip ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.overlayPaintDripColor ?? '#8b5cf6'}
                onChange={e => onChange({ overlayPaintDripColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.overlayPaintDripOpacity ?? 60} min={10} max={100} unit="%"
              onChange={v => onChange({ overlayPaintDripOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Old Paper</SectionLabel>
        <Toggle label="Enable" value={state.canvasOldPaper ?? false} onChange={v => onChange({ canvasOldPaper: v })}
          desc="Aged warm parchment tint on canvas" />
      </Card>

      {/* Batch 29 FX controls */}
      <Card>
        <SectionLabel>Marble BG</SectionLabel>
        <Toggle label="Enable" value={state.bgMarble ?? false} onChange={v => onChange({ bgMarble: v })}
          desc="Marble swirl vein background" />
        {(state.bgMarble ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgMarbleColor ?? '#c8a0d8'}
                onChange={e => onChange({ bgMarbleColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgMarbleOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ bgMarbleOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Brick Wall</SectionLabel>
        <Toggle label="Enable" value={state.bgBrickWall ?? false} onChange={v => onChange({ bgBrickWall: v })}
          desc="Brick wall pattern background" />
        {(state.bgBrickWall ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgBrickWallColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgBrickWallColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgBrickWallOpacity ?? 12} min={3} max={60} unit="%"
              onChange={v => onChange({ bgBrickWallOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Lattice BG</SectionLabel>
        <Toggle label="Enable" value={state.bgLattice ?? false} onChange={v => onChange({ bgLattice: v })}
          desc="Diagonal lattice/diamond mesh background" />
        {(state.bgLattice ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgLatticeColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgLatticeColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgLatticeOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgLatticeOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Lens Flare</SectionLabel>
        <Toggle label="Enable" value={state.overlayFlare ?? false} onChange={v => onChange({ overlayFlare: v })}
          desc="Lens flare radial glow spot overlay" />
        {(state.overlayFlare ?? false) && (
          <Slider label="Intensity" value={state.overlayFlareOpacity ?? 40} min={5} max={90} unit="%"
            onChange={v => onChange({ overlayFlareOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Canvas Sepia</SectionLabel>
        <Toggle label="Enable" value={state.canvasSepia ?? false} onChange={v => onChange({ canvasSepia: v })}
          desc="Warm sepia multiply tint on whole canvas" />
      </Card>

      <Card>
        <SectionLabel>Bezel Frame</SectionLabel>
        <Toggle label="Enable" value={state.frameBezel ?? false} onChange={v => onChange({ frameBezel: v })}
          desc="Thick beveled inset bezel border" />
        {(state.frameBezel ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameBezelColor ?? '#c8a06e'}
              onChange={e => onChange({ frameBezelColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      {/* Batch 28 FX controls */}
      <Card>
        <SectionLabel>Aurora BG</SectionLabel>
        <Toggle label="Enable" value={state.bgAurora ?? false} onChange={v => onChange({ bgAurora: v })}
          desc="Aurora borealis multi-color gradient" />
        {(state.bgAurora ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgAuroraColor ?? '#00c8a0'}
                onChange={e => onChange({ bgAuroraColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgAuroraOpacity ?? 25} min={5} max={70} unit="%"
              onChange={v => onChange({ bgAuroraOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Scales BG</SectionLabel>
        <Toggle label="Enable" value={state.bgScales ?? false} onChange={v => onChange({ bgScales: v })}
          desc="Fish-scale arc overlap background" />
        {(state.bgScales ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgScalesColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgScalesColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgScalesOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgScalesOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Fibers BG</SectionLabel>
        <Toggle label="Enable" value={state.bgFibers ?? false} onChange={v => onChange({ bgFibers: v })}
          desc="Diagonal fiber/line texture background" />
        {(state.bgFibers ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgFibersColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgFibersColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgFibersOpacity ?? 12} min={3} max={60} unit="%"
              onChange={v => onChange({ bgFibersOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Starburst</SectionLabel>
        <Toggle label="Enable" value={state.overlayStarburst ?? false} onChange={v => onChange({ overlayStarburst: v })}
          desc="Sunray conic-gradient starburst overlay" />
        {(state.overlayStarburst ?? false) && (
          <Slider label="Intensity" value={state.overlayStarburstOpacity ?? 15} min={3} max={60} unit="%"
            onChange={v => onChange({ overlayStarburstOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Inner Glow</SectionLabel>
        <Toggle label="Enable" value={state.canvasInnerGlow ?? false} onChange={v => onChange({ canvasInnerGlow: v })}
          desc="Inward diffused canvas glow" />
        {(state.canvasInnerGlow ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.canvasInnerGlowColor ?? '#8b5cf6'}
              onChange={e => onChange({ canvasInnerGlowColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Corner Brackets</SectionLabel>
        <Toggle label="Enable" value={state.frameCornerBrackets ?? false} onChange={v => onChange({ frameCornerBrackets: v })}
          desc="L-shaped corner bracket decorations" />
        {(state.frameCornerBrackets ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameCornerBracketsColor ?? '#8b5cf6'}
              onChange={e => onChange({ frameCornerBracketsColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      {/* Batch 27 FX controls */}
      <Card>
        <SectionLabel>Polka Dots</SectionLabel>
        <Toggle label="Enable" value={state.bgPolkaDots ?? false} onChange={v => onChange({ bgPolkaDots: v })}
          desc="Polka dot circle background pattern" />
        {(state.bgPolkaDots ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgPolkaDotsColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgPolkaDotsColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgPolkaDotsOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgPolkaDotsOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Halftone</SectionLabel>
        <Toggle label="Enable" value={state.bgHalftone ?? false} onChange={v => onChange({ bgHalftone: v })}
          desc="Halftone dot grid background" />
        {(state.bgHalftone ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgHalftoneColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgHalftoneColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgHalftoneOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgHalftoneOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Camo Pattern</SectionLabel>
        <Toggle label="Enable" value={state.bgCamo ?? false} onChange={v => onChange({ bgCamo: v })}
          desc="Organic camouflage blob background" />
        {(state.bgCamo ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgCamoColor ?? '#4a6741'}
                onChange={e => onChange({ bgCamoColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgCamoOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ bgCamoOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Noise 2</SectionLabel>
        <Toggle label="Enable" value={state.overlayNoise2 ?? false} onChange={v => onChange({ overlayNoise2: v })}
          desc="Secondary fine grain noise overlay" />
        {(state.overlayNoise2 ?? false) && (
          <Slider label="Opacity" value={state.overlayNoise2Opacity ?? 20} min={5} max={70} unit="%"
            onChange={v => onChange({ overlayNoise2Opacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Paint Stroke</SectionLabel>
        <Toggle label="Enable" value={state.framePaintStroke ?? false} onChange={v => onChange({ framePaintStroke: v })}
          desc="Rough painted brush-stroke border" />
        {(state.framePaintStroke ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.framePaintStrokeColor ?? '#8b5cf6'}
              onChange={e => onChange({ framePaintStrokeColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Tape Corners</SectionLabel>
        <Toggle label="Enable" value={state.canvasTapeCorners ?? false} onChange={v => onChange({ canvasTapeCorners: v })}
          desc="Tape sticker strips on canvas corners" />
      </Card>

      {/* Batch 26 FX controls */}
      <Card>
        <SectionLabel>Waveform BG</SectionLabel>
        <Toggle label="Enable" value={state.bgWaveform ?? false} onChange={v => onChange({ bgWaveform: v })}
          desc="Audio waveform bars background pattern" />
        {(state.bgWaveform ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgWaveformColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgWaveformColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgWaveformOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgWaveformOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Light Leak 2</SectionLabel>
        <Toggle label="Enable" value={state.overlayLightLeak2 ?? false} onChange={v => onChange({ overlayLightLeak2: v })}
          desc="Warm orange/amber second light leak overlay" />
        {(state.overlayLightLeak2 ?? false) && (
          <Slider label="Intensity" value={state.overlayLightLeak2Opacity ?? 35} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayLightLeak2Opacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Raindrops</SectionLabel>
        <Toggle label="Enable" value={state.overlayRaindrops ?? false} onChange={v => onChange({ overlayRaindrops: v })}
          desc="Simulated raindrop dot texture overlay" />
        {(state.overlayRaindrops ?? false) && (
          <Slider label="Opacity" value={state.overlayRaindropsOpacity ?? 20} min={5} max={60} unit="%"
            onChange={v => onChange({ overlayRaindropsOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Double Stroke</SectionLabel>
        <Toggle label="Enable" value={state.frameDoubleStroke ?? false} onChange={v => onChange({ frameDoubleStroke: v })}
          desc="Two concentric border stroke rings" />
        {(state.frameDoubleStroke ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameDoubleStrokeColor ?? '#8b5cf6'}
              onChange={e => onChange({ frameDoubleStrokeColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Float Shadow</SectionLabel>
        <Toggle label="Enable" value={state.canvasFloatShadow ?? false} onChange={v => onChange({ canvasFloatShadow: v })}
          desc="Deep layered drop shadow beneath canvas" />
      </Card>

      <Card>
        <SectionLabel>Circuit Color</SectionLabel>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
          <input type="color" value={state.bgCircuitBoardColor ?? '#00ff64'}
            onChange={e => onChange({ bgCircuitBoardColor: e.target.value })}
            className="w-8 h-8 rounded-lg cursor-pointer" />
        </div>
      </Card>

      {/* Batch 25 FX controls */}
      <Card>
        <SectionLabel>Zigzag Stripes</SectionLabel>
        <Toggle label="Enable" value={state.bgZigzagStripes ?? false} onChange={v => onChange({ bgZigzagStripes: v })}
          desc="Zigzag chevron stripe background" />
        {(state.bgZigzagStripes ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgZigzagStripesColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgZigzagStripesColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgZigzagStripesOpacity ?? 12} min={3} max={50} unit="%"
              onChange={v => onChange({ bgZigzagStripesOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Mandala</SectionLabel>
        <Toggle label="Enable" value={state.bgMandala ?? false} onChange={v => onChange({ bgMandala: v })}
          desc="Radial mandala/flower pattern" />
        {(state.bgMandala ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgMandalaColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgMandalaColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgMandalaOpacity ?? 12} min={3} max={60} unit="%"
              onChange={v => onChange({ bgMandalaOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Prismatic Sheen</SectionLabel>
        <Toggle label="Enable" value={state.bgPrismaticSheen ?? false} onChange={v => onChange({ bgPrismaticSheen: v })}
          desc="Iridescent rainbow sheen on background" />
        {(state.bgPrismaticSheen ?? false) && (
          <Slider label="Opacity" value={state.bgPrismaticSheenOpacity ?? 20} min={5} max={70} unit="%"
            onChange={v => onChange({ bgPrismaticSheenOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Vignette Mask</SectionLabel>
        <Toggle label="Enable" value={state.frameVignetteMask ?? false} onChange={v => onChange({ frameVignetteMask: v })}
          desc="Soft dark vignette at canvas edges" />
        {(state.frameVignetteMask ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameVignetteMaskColor ?? '#000000'}
              onChange={e => onChange({ frameVignetteMaskColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Glare / Shine</SectionLabel>
        <Toggle label="Enable" value={state.overlayGlare ?? false} onChange={v => onChange({ overlayGlare: v })}
          desc="Directional glare reflection band" />
        {(state.overlayGlare ?? false) && (
          <Slider label="Opacity" value={state.overlayGlareOpacity ?? 30} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayGlareOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Confetti</SectionLabel>
        <Toggle label="Enable" value={state.overlayConfetti ?? false} onChange={v => onChange({ overlayConfetti: v })}
          desc="Colorful confetti dot overlay" />
        {(state.overlayConfetti ?? false) && (
          <Slider label="Opacity" value={state.overlayConfettiOpacity ?? 25} min={5} max={70} unit="%"
            onChange={v => onChange({ overlayConfettiOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Outline Canvas</SectionLabel>
        <Toggle label="Enable" value={state.canvasOutlineOnly ?? false} onChange={v => onChange({ canvasOutlineOnly: v })}
          desc="Transparent canvas with outline border only" />
      </Card>

      {/* Batch 24 FX controls */}
      <Card>
        <SectionLabel>Crosshatch</SectionLabel>
        <Toggle label="Enable" value={state.bgCrossHatch ?? false} onChange={v => onChange({ bgCrossHatch: v })}
          desc="Diagonal pen-stroke crosshatch background" />
        {(state.bgCrossHatch ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgCrossHatchColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgCrossHatchColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgCrossHatchOpacity ?? 12} min={3} max={50} unit="%"
              onChange={v => onChange({ bgCrossHatchOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Water Ripple</SectionLabel>
        <Toggle label="Enable" value={state.bgRipple ?? false} onChange={v => onChange({ bgRipple: v })}
          desc="Concentric water ripple rings" />
        {(state.bgRipple ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgRippleColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgRippleColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgRippleOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgRippleOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Conic Spiral</SectionLabel>
        <Toggle label="Enable" value={state.bgSpiralConic ?? false} onChange={v => onChange({ bgSpiralConic: v })}
          desc="Tight conic-gradient spiral pattern" />
        {(state.bgSpiralConic ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgSpiralConicColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgSpiralConicColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgSpiralConicOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgSpiralConicOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Paper Fold</SectionLabel>
        <Toggle label="Enable" value={state.overlayPaperFold ?? false} onChange={v => onChange({ overlayPaperFold: v })}
          desc="Diagonal paper fold crease line" />
        {(state.overlayPaperFold ?? false) && (
          <Slider label="Opacity" value={state.overlayPaperFoldOpacity ?? 20} min={5} max={70} unit="%"
            onChange={v => onChange({ overlayPaperFoldOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Pixel Grid</SectionLabel>
        <Toggle label="Enable" value={state.overlayPixelGrid ?? false} onChange={v => onChange({ overlayPixelGrid: v })}
          desc="Pixel art scale grid overlay" />
        {(state.overlayPixelGrid ?? false) && (
          <Slider label="Opacity" value={state.overlayPixelGridOpacity ?? 15} min={3} max={60} unit="%"
            onChange={v => onChange({ overlayPixelGridOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Letterbox Bars</SectionLabel>
        <Toggle label="Enable" value={state.textLetterboxBars ?? false} onChange={v => onChange({ textLetterboxBars: v })}
          desc="Cinematic black bars top and bottom" />
      </Card>

      <Card>
        <SectionLabel>Neon Tube Frame</SectionLabel>
        <Toggle label="Enable" value={state.frameNeonTube ?? false} onChange={v => onChange({ frameNeonTube: v })}
          desc="Glowing neon tube inset border" />
        {(state.frameNeonTube ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.frameNeonTubeColor ?? '#00ffff'}
              onChange={e => onChange({ frameNeonTubeColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Tilted Frame</SectionLabel>
        <Toggle label="Enable" value={state.canvasTiltedFrame ?? false} onChange={v => onChange({ canvasTiltedFrame: v })}
          desc="Slight rotation tilt on entire canvas" />
        {(state.canvasTiltedFrame ?? false) && (
          <Slider label="Angle" value={state.canvasTiltedFrameAngle ?? 3} min={-10} max={10} unit="°"
            onChange={v => onChange({ canvasTiltedFrameAngle: v })} />
        )}
      </Card>

      {/* Batch 23 FX controls */}
      <Card>
        <SectionLabel>Color Wash</SectionLabel>
        <Toggle label="Enable" value={state.bgColorWash ?? false} onChange={v => onChange({ bgColorWash: v })}
          desc="Translucent tint wash over background" />
        {(state.bgColorWash ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgColorWashColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgColorWashColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgColorWashOpacity ?? 20} min={3} max={70} unit="%"
              onChange={v => onChange({ bgColorWashOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Triangle Pattern</SectionLabel>
        <Toggle label="Enable" value={state.bgTrianglePattern ?? false} onChange={v => onChange({ bgTrianglePattern: v })}
          desc="Triangular geometric tessellation" />
        {(state.bgTrianglePattern ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgTriangleColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgTriangleColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgTriangleOpacity ?? 10} min={3} max={50} unit="%"
              onChange={v => onChange({ bgTriangleOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Spiral</SectionLabel>
        <Toggle label="Enable" value={state.bgSpiral ?? false} onChange={v => onChange({ bgSpiral: v })}
          desc="Archimedean spiral on background" />
        {(state.bgSpiral ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgSpiralColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgSpiralColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgSpiralOpacity ?? 15} min={3} max={60} unit="%"
              onChange={v => onChange({ bgSpiralOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Color Burn</SectionLabel>
        <Toggle label="Enable" value={state.overlayColorBurn ?? false} onChange={v => onChange({ overlayColorBurn: v })}
          desc="Dark multiply blend overlay" />
        {(state.overlayColorBurn ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.overlayColorBurnColor ?? '#1a0a2e'}
                onChange={e => onChange({ overlayColorBurnColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.overlayColorBurnOpacity ?? 40} min={5} max={80} unit="%"
              onChange={v => onChange({ overlayColorBurnOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Fog Bottom</SectionLabel>
        <Toggle label="Enable" value={state.overlayFogBottom ?? false} onChange={v => onChange({ overlayFogBottom: v })}
          desc="Dense fog bank rising from bottom" />
        {(state.overlayFogBottom ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.overlayFogBottomColor ?? '#ffffff'}
                onChange={e => onChange({ overlayFogBottomColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.overlayFogBottomOpacity ?? 40} min={5} max={80} unit="%"
              onChange={v => onChange({ overlayFogBottomOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Gold Leaf Frame</SectionLabel>
        <Toggle label="Enable" value={state.frameGoldLeaf ?? false} onChange={v => onChange({ frameGoldLeaf: v })}
          desc="Metallic gold inset border frame" />
        {(state.frameGoldLeaf ?? false) && (
          <Slider label="Width" value={state.frameGoldLeafWidth ?? 6} min={2} max={20} unit="px"
            onChange={v => onChange({ frameGoldLeafWidth: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Mirror Split</SectionLabel>
        <Toggle label="Enable" value={state.imageMirrorSplit ?? false} onChange={v => onChange({ imageMirrorSplit: v })}
          desc="Horizontally mirror the canvas" />
      </Card>

      {/* Batch 22 FX controls */}
      <Card>
        <SectionLabel>Sunburst</SectionLabel>
        <Toggle label="Enable" value={state.bgSunburst ?? false} onChange={v => onChange({ bgSunburst: v })}
          desc="Radial sunburst ray pattern on background" />
        {(state.bgSunburst ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgSunburstColor ?? '#f59e0b'}
                onChange={e => onChange({ bgSunburstColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgSunburstOpacity ?? 20} min={5} max={70} unit="%"
              onChange={v => onChange({ bgSunburstOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Starfield</SectionLabel>
        <Toggle label="Enable" value={state.bgStarfield ?? false} onChange={v => onChange({ bgStarfield: v })}
          desc="Tiny white dot starfield on background" />
        {(state.bgStarfield ?? false) && (
          <Slider label="Opacity" value={state.bgStarfieldOpacity ?? 30} min={5} max={80} unit="%"
            onChange={v => onChange({ bgStarfieldOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Linen Texture</SectionLabel>
        <Toggle label="Enable" value={state.bgLinenTexture ?? false} onChange={v => onChange({ bgLinenTexture: v })}
          desc="Subtle woven cloth texture on background" />
        {(state.bgLinenTexture ?? false) && (
          <Slider label="Opacity" value={state.bgLinenTextureOpacity ?? 12} min={3} max={50} unit="%"
            onChange={v => onChange({ bgLinenTextureOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Glass Reflect</SectionLabel>
        <Toggle label="Enable" value={state.canvasGlassReflect ?? false} onChange={v => onChange({ canvasGlassReflect: v })}
          desc="Diagonal glass reflection sheen on canvas" />
        {(state.canvasGlassReflect ?? false) && (
          <Slider label="Opacity" value={state.canvasGlassReflectOpacity ?? 25} min={5} max={80} unit="%"
            onChange={v => onChange({ canvasGlassReflectOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Heatmap</SectionLabel>
        <Toggle label="Enable" value={state.overlayHeatmap ?? false} onChange={v => onChange({ overlayHeatmap: v })}
          desc="Warm orange/red heatmap glow overlay" />
        {(state.overlayHeatmap ?? false) && (
          <Slider label="Opacity" value={state.overlayHeatmapOpacity ?? 30} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayHeatmapOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Snow</SectionLabel>
        <Toggle label="Enable" value={state.overlaySnow ?? false} onChange={v => onChange({ overlaySnow: v })}
          desc="White particle snow overlay on canvas" />
        {(state.overlaySnow ?? false) && (
          <Slider label="Opacity" value={state.overlaySnowOpacity ?? 20} min={3} max={60} unit="%"
            onChange={v => onChange({ overlaySnowOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Diamond Cut</SectionLabel>
        <Toggle label="Enable" value={state.frameDiamondCut ?? false} onChange={v => onChange({ frameDiamondCut: v })}
          desc="Angled diamond-cut corners on canvas" />
      </Card>

      {/* Batch 21 FX controls */}
      <Card>
        <SectionLabel>Concentric Rings</SectionLabel>
        <Toggle label="Enable" value={state.bgConcentricRings ?? false} onChange={v => onChange({ bgConcentricRings: v })}
          desc="Concentric circle rings on background" />
        {(state.bgConcentricRings ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgConcentricRingsColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgConcentricRingsColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgConcentricRingsOpacity ?? 12} min={3} max={60} unit="%"
              onChange={v => onChange({ bgConcentricRingsOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Dot Matrix</SectionLabel>
        <Toggle label="Enable" value={state.bgDotMatrix ?? false} onChange={v => onChange({ bgDotMatrix: v })}
          desc="Dense dot matrix background pattern" />
        {(state.bgDotMatrix ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgDotMatrixColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgDotMatrixColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgDotMatrixOpacity ?? 10} min={3} max={50} unit="%"
              onChange={v => onChange({ bgDotMatrixOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Nebula Background</SectionLabel>
        <Toggle label="Enable" value={state.bgNebula ?? false} onChange={v => onChange({ bgNebula: v })}
          desc="Soft multi-radial space nebula overlay" />
        {(state.bgNebula ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgNebulaColor ?? '#7c3aed'}
                onChange={e => onChange({ bgNebulaColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgNebulaOpacity ?? 40} min={10} max={100} unit="%"
              onChange={v => onChange({ bgNebulaOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Light Rays</SectionLabel>
        <Toggle label="Enable" value={state.overlayLightRays ?? false} onChange={v => onChange({ overlayLightRays: v })}
          desc="Conic-gradient light beam rays overlay" />
        {(state.overlayLightRays ?? false) && (
          <Slider label="Opacity" value={state.overlayLightRaysOpacity ?? 20} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayLightRaysOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Radial Vignette</SectionLabel>
        <Toggle label="Enable" value={state.canvasRadialFade ?? false} onChange={v => onChange({ canvasRadialFade: v })}
          desc="Radial fade to color at canvas edges" />
        {(state.canvasRadialFade ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.canvasRadialFadeColor ?? '#000000'}
              onChange={e => onChange({ canvasRadialFadeColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Retro Grid</SectionLabel>
        <Toggle label="Enable" value={state.overlayRetroGrid ?? false} onChange={v => onChange({ overlayRetroGrid: v })}
          desc="80s synthwave perspective floor grid" />
        {(state.overlayRetroGrid ?? false) && (
          <Slider label="Opacity" value={state.overlayRetroGridOpacity ?? 30} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayRetroGridOpacity: v })} />
        )}
      </Card>

      {/* Batch 20 FX controls */}
      <Card>
        <SectionLabel>Dust & Scratches</SectionLabel>
        <Toggle label="Enable" value={state.overlayDust ?? false} onChange={v => onChange({ overlayDust: v })}
          desc="Vintage film dust and scratch marks" />
        {(state.overlayDust ?? false) && (
          <Slider label="Intensity" value={state.overlayDustOpacity ?? 25} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayDustOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Ink Bleed</SectionLabel>
        <Toggle label="Enable" value={state.overlayInkBleed ?? false} onChange={v => onChange({ overlayInkBleed: v })}
          desc="Ink bleeding grunge texture overlay" />
        {(state.overlayInkBleed ?? false) && (
          <Slider label="Intensity" value={state.overlayInkBleedOpacity ?? 30} min={5} max={80} unit="%"
            onChange={v => onChange({ overlayInkBleedOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Film Strip</SectionLabel>
        <Toggle label="Enable" value={state.frameFilmStrip ?? false} onChange={v => onChange({ frameFilmStrip: v })}
          desc="Film strip perforations on left/right edges" />
      </Card>

      <Card>
        <SectionLabel>Background Grid</SectionLabel>
        <Toggle label="Enable" value={state.bgGridLines ?? false} onChange={v => onChange({ bgGridLines: v })}
          desc="Colored grid lines on background" />
        {(state.bgGridLines ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgGridLinesColor ?? '#8b5cf6'}
                onChange={e => onChange({ bgGridLinesColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgGridLinesOpacity ?? 12} min={3} max={60} unit="%"
              onChange={v => onChange({ bgGridLinesOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Hex Grid</SectionLabel>
        <Toggle label="Enable" value={state.bgHexGrid ?? false} onChange={v => onChange({ bgHexGrid: v })}
          desc="Hexagonal tile grid over background" />
        {(state.bgHexGrid ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgHexGridColor ?? '#a78bfa'}
                onChange={e => onChange({ bgHexGridColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgHexGridOpacity ?? 12} min={3} max={60} unit="%"
              onChange={v => onChange({ bgHexGridOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Circuit Board</SectionLabel>
        <Toggle label="Enable" value={state.bgCircuitBoard ?? false} onChange={v => onChange({ bgCircuitBoard: v })}
          desc="PCB trace pattern over background" />
        {(state.bgCircuitBoard ?? false) && (
          <Slider label="Opacity" value={state.bgCircuitBoardOpacity ?? 12} min={3} max={60} unit="%"
            onChange={v => onChange({ bgCircuitBoardOpacity: v })} />
        )}
      </Card>

      {/* Batch 19 FX controls */}
      <Card>
        <SectionLabel>Holographic Overlay</SectionLabel>
        <Toggle label="Enable" value={state.overlayHolographic ?? false} onChange={v => onChange({ overlayHolographic: v })}
          desc="Iridescent rainbow sheen overlay" />
        {(state.overlayHolographic ?? false) && (
          <Slider label="Opacity" value={state.overlayHolographicOpacity ?? 35} min={5} max={100} unit="%"
            onChange={v => onChange({ overlayHolographicOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Canvas Border Glow</SectionLabel>
        <Toggle label="Enable" value={state.canvasBorderGlow ?? false} onChange={v => onChange({ canvasBorderGlow: v })}
          desc="Outer glow pulsing around the canvas" />
        {(state.canvasBorderGlow ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.canvasBorderGlowColor ?? '#8b5cf6'}
              onChange={e => onChange({ canvasBorderGlowColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Glow Orb</SectionLabel>
        <Toggle label="Enable" value={state.bgGlowOrb ?? false} onChange={v => onChange({ bgGlowOrb: v })}
          desc="Large radial glow orb in background" />
        {(state.bgGlowOrb ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgGlowOrbColor ?? '#7c3aed'}
                onChange={e => onChange({ bgGlowOrbColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="X Position" value={state.bgGlowOrbX ?? 50} min={0} max={100} unit="%"
              onChange={v => onChange({ bgGlowOrbX: v })} />
            <Slider label="Y Position" value={state.bgGlowOrbY ?? 50} min={0} max={100} unit="%"
              onChange={v => onChange({ bgGlowOrbY: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Bloom Light</SectionLabel>
        <Toggle label="Enable" value={state.imageBloomLight ?? false} onChange={v => onChange({ imageBloomLight: v })}
          desc="Bloom light haze from top of canvas" />
        {(state.imageBloomLight ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
            <input type="color" value={state.imageBloomLightColor ?? '#ffffff'}
              onChange={e => onChange({ imageBloomLightColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Card Glass Overlay</SectionLabel>
        <Toggle label="Enable" value={state.cardGlassOverlay ?? false} onChange={v => onChange({ cardGlassOverlay: v })}
          desc="Frosted glass panel in front of image" />
        {(state.cardGlassOverlay ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Tint</span>
            <input type="color" value={(state.cardGlassOverlayBg ?? '#ffffff18').slice(0, 7)}
              onChange={e => onChange({ cardGlassOverlayBg: e.target.value + '18' })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Diamond Pattern</SectionLabel>
        <Toggle label="Enable" value={state.bgDiamondPattern ?? false} onChange={v => onChange({ bgDiamondPattern: v })}
          desc="Argyle diamond tile on background" />
        {(state.bgDiamondPattern ?? false) && (
          <Slider label="Opacity" value={state.bgDiamondOpacity ?? 15} min={3} max={60} unit="%"
            onChange={v => onChange({ bgDiamondOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Tiled Watermark</SectionLabel>
        <Toggle label="Enable" value={state.watermarkTiled ?? false} onChange={v => onChange({ watermarkTiled: v })}
          desc="Repeated diagonal watermark text" />
        {(state.watermarkTiled ?? false) && (
          <input type="text" placeholder="Watermark text..."
            value={state.watermarkTiledText ?? 'CONFIDENTIAL'}
            onChange={e => onChange({ watermarkTiledText: e.target.value })}
            className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-[12px] text-white/80 placeholder-white/25 outline-none focus:border-brand-500/50" />
        )}
      </Card>

      {/* Batch 18 FX controls */}
      <Card>
        <SectionLabel>Gradient Mesh</SectionLabel>
        <Toggle label="Enable" value={state.overlayGradientMesh ?? false} onChange={v => onChange({ overlayGradientMesh: v })}
          desc="Multi-color radial mesh overlay" />
        {(state.overlayGradientMesh ?? false) && (
          <Slider label="Opacity" value={state.overlayGradientMeshOpacity ?? 40} min={5} max={100} unit="%"
            onChange={v => onChange({ overlayGradientMeshOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Canvas Spotlight</SectionLabel>
        <Toggle label="Enable" value={state.canvasSpotlight ?? false} onChange={v => onChange({ canvasSpotlight: v })}
          desc="Radial light beam over the canvas" />
        {(state.canvasSpotlight ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.canvasSpotlightColor ?? '#ffffff'}
                onChange={e => onChange({ canvasSpotlightColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Strength" value={state.canvasSpotlightStrength ?? 50} min={10} max={100} unit="%"
              onChange={v => onChange({ canvasSpotlightStrength: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Background Waves</SectionLabel>
        <Toggle label="Enable" value={state.bgWaves ?? false} onChange={v => onChange({ bgWaves: v })}
          desc="Wavy line pattern over background" />
        {(state.bgWaves ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.bgWavesColor ?? '#7c3aed'}
                onChange={e => onChange({ bgWavesColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Opacity" value={state.bgWavesOpacity ?? 20} min={5} max={80} unit="%"
              onChange={v => onChange({ bgWavesOpacity: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Edge Glow</SectionLabel>
        <Toggle label="Enable" value={state.imageEdgeGlow ?? false} onChange={v => onChange({ imageEdgeGlow: v })}
          desc="Glowing halo around the image" />
        {(state.imageEdgeGlow ?? false) && (
          <>
            <Slider label="Blur Radius" value={state.imageEdgeGlowBlur ?? 24} min={4} max={60} unit="px"
              onChange={v => onChange({ imageEdgeGlowBlur: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Glow Color</span>
              <input type="color" value={state.imageEdgeGlowColor ?? '#8b5cf6'}
                onChange={e => onChange({ imageEdgeGlowColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6','#ec4899','#00ffcc','#ff6600','#3b82f6','#ffffff'].map(c => (
                  <button key={c} onClick={() => onChange({ imageEdgeGlowColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <ResetBtn
        onClick={() => onChange({
          shadow: 0, shadowX: 0, shadowY: 0, shadowBlur: 0, shadowSpread: 0,
          glowIntensity: 0, innerShadow: 0, innerGlowIntensity: 0,
          borderWidth: 0, colorOverlayOpacity: 0,
          vignette: 0, scanlines: 0, filmGrain: 0,
          lightLeak: 0, fog: 0, stars: 0, rain: 0, halftone: 0,
          lensFlare: 0, glitch: 0, chromaAberration: 0, spotlight: 0,
          prismEffect: 0, sunburst: 0,
        })}
        label="Clear All Effects"
      />
    </div>
  );

  /* ── Adjust tab ─────────────────────────────────── */
  const renderAdjustTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Tone</SectionLabel>
        <Slider label="Brightness" value={state.brightness}        min={50}  max={150} unit="%" onChange={v => onChange({ brightness: v })} />
        <Slider label="Contrast"   value={state.contrast}          min={50}  max={150} unit="%" onChange={v => onChange({ contrast: v })} />
        <Slider label="Saturation" value={state.saturation}        min={0}   max={200} unit="%" onChange={v => onChange({ saturation: v })} />
        <Slider label="Vibrance"   value={state.vibrance ?? 0}     min={-100} max={100}          onChange={v => onChange({ vibrance: v })} />
        <Slider label="Blur"       value={state.blur}              min={0}   max={20}  step={0.5} unit="px" onChange={v => onChange({ blur: v })} />
        <ResetBtn onClick={() => onChange({ brightness: 100, contrast: 100, saturation: 100, blur: 0, vibrance: 0 })} label="Reset Tone" />
      </Card>

      <Card>
        <SectionLabel>Advanced Tone</SectionLabel>
        <Slider label="Temperature" value={state.temperature ?? 0} min={-100} max={100} onChange={v => onChange({ temperature: v })} />
        <p className="text-[8.5px] text-white/20 -mt-1">
          {(state.temperature ?? 0) > 0 ? 'Warm →' : (state.temperature ?? 0) < 0 ? '← Cool' : 'Neutral'}
        </p>
        <Slider label="Highlights"   value={state.highlights ?? 0}   min={-100} max={100} onChange={v => onChange({ highlights: v })} />
        <Slider label="Shadows"      value={state.shadows ?? 0}      min={-100} max={100} onChange={v => onChange({ shadows: v })} />
        <Slider label="Fade / Matte" value={state.fade ?? 0}         min={0}    max={100} onChange={v => onChange({ fade: v })} />
        <Slider label="Sharpness"    value={state.sharpness ?? 0}    min={0}    max={100} onChange={v => onChange({ sharpness: v })} />
        <Slider label="Image Noise"  value={state.noiseOnImage ?? 0} min={0}    max={100} onChange={v => onChange({ noiseOnImage: v })} />
        <ResetBtn onClick={() => onChange({ temperature: 0, highlights: 0, shadows: 0, fade: 0, sharpness: 0, noiseOnImage: 0 })} label="Reset Advanced" />
      </Card>

      <Card>
        <SectionLabel>Film Look</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {FILM_LOOKS.map(f => (
            <button key={f.id} onClick={() => onChange({ filmLook: f.id })}
              className={`py-2 rounded-lg text-[9px] font-medium transition-all ring-1 ${
                (state.filmLook ?? 'none') === f.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                  : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.08]'
              }`}>
              {f.name}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Photo Presets</SectionLabel>
        <p className="text-[8.5px] text-white/20">Instagram-style filter presets</p>
        <div className="grid grid-cols-4 gap-1.5">
          {IMAGE_PRESETS.map(p => (
            <button key={p.id} onClick={() => onChange({ imagePreset: p.id })}
              className={`py-2 rounded-lg text-[9px] font-medium transition-all ring-1 ${
                (state.imagePreset ?? 'none') === p.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                  : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.08]'
              }`}>
              {p.name}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Filters</SectionLabel>
        <Slider label="Sepia"      value={state.sepia ?? 0}     min={0}    max={100} unit="%" onChange={v => onChange({ sepia: v })} />
        <Slider label="Grayscale"  value={state.grayscale ?? 0} min={0}    max={100} unit="%" onChange={v => onChange({ grayscale: v })} />
        <Slider label="Hue Shift"  value={state.hueRotate ?? 0} min={-180} max={180} unit="°" onChange={v => onChange({ hueRotate: v })} />
        <Toggle label="Invert Colors"   value={state.invert ?? false}  onChange={v => onChange({ invert: v })} />
        <Toggle label="Flip Horizontal" value={state.flipX}            onChange={v => onChange({ flipX: v })} />
        <Toggle label="Flip Vertical"   value={state.flipY ?? false}   onChange={v => onChange({ flipY: v })} />
        <ResetBtn onClick={() => onChange({ sepia: 0, grayscale: 0, hueRotate: 0, invert: false, flipX: false, flipY: false })} label="Reset Filters" />
      </Card>

      <Card>
        <SectionLabel>Duotone</SectionLabel>
        <Toggle label="Enable Duotone" value={state.duotone ?? false} onChange={v => onChange({ duotone: v })}
          desc="Converts to grayscale then maps two colors" />
        {state.duotone && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35 w-20">Highlight</span>
              <input type="color" value={state.duotoneHighlight ?? '#ff6600'}
                onChange={e => onChange({ duotoneHighlight: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-8 rounded-lg ring-1 ring-white/10" style={{ background: state.duotoneHighlight }} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35 w-20">Shadow</span>
              <input type="color" value={state.duotoneShadow ?? '#3300cc'}
                onChange={e => onChange({ duotoneShadow: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-8 rounded-lg ring-1 ring-white/10" style={{ background: state.duotoneShadow }} />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { h: '#ff6600', s: '#3300cc', l: 'Sunset' },
                { h: '#00ffcc', s: '#003366', l: 'Ocean' },
                { h: '#ff00ff', s: '#111100', l: 'Neon' },
                { h: '#ffdd00', s: '#660066', l: 'Gold' },
                { h: '#ffffff', s: '#000066', l: 'Mono' },
                { h: '#ff3366', s: '#003300', l: 'Rose' },
              ].map(p => (
                <button key={p.l}
                  onClick={() => onChange({ duotoneHighlight: p.h, duotoneShadow: p.s })}
                  className="py-2 rounded-lg text-[9px] text-white/40 ring-1 ring-white/[0.06] hover:bg-white/[0.07] transition-all overflow-hidden relative">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.s}, ${p.h})` }} />
                  <span className="relative z-10 font-medium text-white/80">{p.l}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Split Tone</SectionLabel>
        <Toggle label="Enable Split Tone" value={state.splitTone ?? false} onChange={v => onChange({ splitTone: v })}
          desc="Tints highlights & shadows with different colors" />
        {(state.splitTone ?? false) && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35 w-20">Highlights</span>
              <input type="color" value={state.splitToneHighlightColor ?? '#ffcc66'}
                onChange={e => onChange({ splitToneHighlightColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-8 rounded-lg ring-1 ring-white/10" style={{ background: state.splitToneHighlightColor }} />
            </div>
            <Slider label="Highlight Strength" value={state.splitToneHighlightStrength ?? 30} min={0} max={100}
              onChange={v => onChange({ splitToneHighlightStrength: v })} />
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35 w-20">Shadows</span>
              <input type="color" value={state.splitToneShadowColor ?? '#3366cc'}
                onChange={e => onChange({ splitToneShadowColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-8 rounded-lg ring-1 ring-white/10" style={{ background: state.splitToneShadowColor }} />
            </div>
            <Slider label="Shadow Strength" value={state.splitToneShadowStrength ?? 30} min={0} max={100}
              onChange={v => onChange({ splitToneShadowStrength: v })} />
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { h: '#ffcc66', s: '#3366cc', l: 'Classic' },
                { h: '#ff9966', s: '#6633cc', l: 'Warm/Cool' },
                { h: '#ffeeaa', s: '#2244aa', l: 'Sepia/Blue' },
                { h: '#aaffcc', s: '#334488', l: 'Teal/Navy' },
                { h: '#ffccff', s: '#224422', l: 'Pink/Grn' },
                { h: '#ffffff', s: '#334466', l: 'White/Blue' },
              ].map(p => (
                <button key={p.l}
                  onClick={() => onChange({ splitToneHighlightColor: p.h, splitToneShadowColor: p.s })}
                  className="py-2 rounded-lg text-[9px] text-white/40 ring-1 ring-white/[0.06] hover:bg-white/[0.07] transition-all overflow-hidden relative">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.s}, ${p.h})` }} />
                  <span className="relative z-10 font-medium text-white/80">{p.l}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Tilt Shift (Miniature)</SectionLabel>
        <Toggle label="Enable Tilt Shift" value={state.tiltShift ?? false} onChange={v => onChange({ tiltShift: v })}
          desc="Blurs top & bottom, leaving a sharp band in the middle" />
        {(state.tiltShift ?? false) && (
          <>
            <Slider label="Blur Amount" value={state.tiltShiftBlur ?? 10}   min={1}  max={30}  unit="px" onChange={v => onChange({ tiltShiftBlur: v })} />
            <Slider label="Center"      value={state.tiltShiftCenter ?? 50} min={10} max={90} unit="%"  onChange={v => onChange({ tiltShiftCenter: v })} />
            <Slider label="Sharp Range" value={state.tiltShiftRange ?? 30}  min={5}  max={80} unit="%"  onChange={v => onChange({ tiltShiftRange: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Pixel Art</SectionLabel>
        <Slider label="Pixelate" value={state.pixelate ?? 0} min={0} max={40}
          onChange={v => onChange({ pixelate: v })} />
        {(state.pixelate ?? 0) > 0 && <p className="text-[8.5px] text-white/20">Higher = larger pixels, more blocky look</p>}
      </Card>

      <Card>
        <SectionLabel>Color Channel Shift</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'none',    l: 'Off' },
            { id: 'red',     l: 'Red' },
            { id: 'green',   l: 'Green' },
            { id: 'blue',    l: 'Blue' },
            { id: 'cyan',    l: 'Cyan' },
            { id: 'magenta', l: 'Magenta' },
            { id: 'yellow',  l: 'Yellow' },
          ].map(c => (
            <QuickChip key={c.id} active={(state.imageColorShift ?? 'none') === c.id}
              onClick={() => onChange({ imageColorShift: c.id })}>{c.l}</QuickChip>
          ))}
        </div>
        {(state.imageColorShift ?? 'none') !== 'none' && (
          <Slider label="Amount" value={state.imageColorShiftAmount ?? 40} min={5} max={100}
            onChange={v => onChange({ imageColorShiftAmount: v })} />
        )}
      </Card>

      {/* Batch 9 image tone */}
      <Card>
        <SectionLabel>Image Tone</SectionLabel>
        <Slider label="Sepia" value={state.imageSepia ?? 0} min={0} max={100} unit="%"
          onChange={v => onChange({ imageSepia: v })} />
        <div className="grid grid-cols-2 gap-1.5">
          <QuickChip active={state.imageCoolTone ?? false}
            onClick={() => onChange({ imageCoolTone: !(state.imageCoolTone ?? false), imageWarmTone: false })}>
            Cool Tone
          </QuickChip>
          <QuickChip active={state.imageWarmTone ?? false}
            onClick={() => onChange({ imageWarmTone: !(state.imageWarmTone ?? false), imageCoolTone: false })}>
            Warm Tone
          </QuickChip>
        </div>
      </Card>

      {/* Batch 17 adjust controls */}
      <Card>
        <SectionLabel>Solarize Effect</SectionLabel>
        <Toggle label="Enable" value={state.imageSolarize ?? false} onChange={v => onChange({ imageSolarize: v })}
          desc="Partially invert bright tones for surreal look" />
      </Card>

      <Card>
        <SectionLabel>Image Texture</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {(['none','paper','canvas','linen'] as const).map(t => (
            <QuickChip key={t} active={(state.imageTexture ?? 'none') === t}
              onClick={() => onChange({ imageTexture: t })}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Color Leak</SectionLabel>
        <Toggle label="Enable Top Leak" value={state.imageColorLeakTop ?? false}
          onChange={v => onChange({ imageColorLeakTop: v })} desc="Warm light leak from top-left corner" />
        {(state.imageColorLeakTop ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Leak Color</span>
            <input type="color" value={state.imageColorLeakColor ?? '#ff8c00'}
              onChange={e => onChange({ imageColorLeakColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#ff8c00','#ff4500','#ff69b4','#ffd700','#00bfff','#7fff00'].map(c => (
                <button key={c} onClick={() => onChange({ imageColorLeakColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c }} />
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Batch 38 adjust controls */}
      <Card>
        <SectionLabel>Dawn</SectionLabel>
        <Toggle label="Enable" value={state.imageDawn ?? false} onChange={v => onChange({ imageDawn: v })}
          desc="Warm golden dawn hour photo filter" />
      </Card>

      {/* Batch 37 adjust controls */}
      <Card>
        <SectionLabel>HDR</SectionLabel>
        <Toggle label="Enable" value={state.imageHDR ?? false} onChange={v => onChange({ imageHDR: v })}
          desc="High dynamic range tone boost" />
      </Card>

      {/* Batch 36 adjust controls */}
      <Card>
        <SectionLabel>Vibrant</SectionLabel>
        <Toggle label="Enable" value={state.imageVibrant ?? false} onChange={v => onChange({ imageVibrant: v })}
          desc="Hyper-saturated vivid color pop" />
      </Card>

      {/* Batch 35 adjust controls */}
      <Card>
        <SectionLabel>Anaglyph</SectionLabel>
        <Toggle label="Enable" value={state.imageAnaglyph ?? false} onChange={v => onChange({ imageAnaglyph: v })}
          desc="Red-cyan 3D anaglyph color shift" />
      </Card>

      {/* Batch 34 adjust controls */}
      <Card>
        <SectionLabel>Thermal</SectionLabel>
        <Toggle label="Enable" value={state.imageThermal ?? false} onChange={v => onChange({ imageThermal: v })}
          desc="Thermal camera false-color filter" />
      </Card>

      {/* Batch 33 adjust controls */}
      <Card>
        <SectionLabel>Enhance</SectionLabel>
        <Toggle label="Enable" value={state.imageEnhance ?? false} onChange={v => onChange({ imageEnhance: v })}
          desc="Clarity + contrast micro-enhancement filter" />
      </Card>

      {/* Batch 32 adjust controls */}
      <Card>
        <SectionLabel>Sketch</SectionLabel>
        <Toggle label="Enable" value={state.imageSketch ?? false} onChange={v => onChange({ imageSketch: v })}
          desc="Pencil sketch outline filter" />
      </Card>

      <Card>
        <SectionLabel>Daylight</SectionLabel>
        <Toggle label="Enable" value={state.imageDaylight ?? false} onChange={v => onChange({ imageDaylight: v })}
          desc="Bright vivid daylight enhancement" />
      </Card>

      {/* Batch 31 adjust controls */}
      <Card>
        <SectionLabel>Neon Edge</SectionLabel>
        <Toggle label="Enable" value={state.imageNeonEdge ?? false} onChange={v => onChange({ imageNeonEdge: v })}
          desc="Neon edge-detection invert filter" />
      </Card>

      <Card>
        <SectionLabel>Bokeh</SectionLabel>
        <Toggle label="Enable" value={state.imageBokeh ?? false} onChange={v => onChange({ imageBokeh: v })}
          desc="Dreamy bokeh soft-light blur effect" />
      </Card>

      {/* Batch 30 adjust controls */}
      <Card>
        <SectionLabel>Lens Blur</SectionLabel>
        <Toggle label="Enable" value={state.imageLensBlur ?? false} onChange={v => onChange({ imageLensBlur: v })}
          desc="Subtle depth-of-field blur on image" />
      </Card>

      {/* Batch 29 adjust controls */}
      <Card>
        <SectionLabel>Duotone</SectionLabel>
        <Toggle label="Enable" value={state.imageDuotone ?? false} onChange={v => onChange({ imageDuotone: v })}
          desc="Duotone two-color image filter" />
        {(state.imageDuotone ?? false) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Hue</span>
            <input type="color" value={state.imageDuotoneColor ?? '#8b5cf6'}
              onChange={e => onChange({ imageDuotoneColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Chalk</SectionLabel>
        <Toggle label="Enable" value={state.imageChalk ?? false} onChange={v => onChange({ imageChalk: v })}
          desc="Soft chalk/matte pastel image effect" />
      </Card>

      {/* Batch 28 adjust controls */}
      <Card>
        <SectionLabel>Sat Boost</SectionLabel>
        <Toggle label="Enable" value={state.imageSatBoost ?? false} onChange={v => onChange({ imageSatBoost: v })}
          desc="Strong saturation boost for vivid colors" />
      </Card>

      {/* Batch 27 adjust controls */}
      <Card>
        <SectionLabel>Colorize</SectionLabel>
        <Toggle label="Enable" value={state.imageColorize ?? false} onChange={v => onChange({ imageColorize: v })}
          desc="Warm sepia colorize on image" />
      </Card>

      {/* Batch 26 adjust controls */}
      <Card>
        <SectionLabel>Old Photo</SectionLabel>
        <Toggle label="Enable" value={state.imageOldPhoto ?? false} onChange={v => onChange({ imageOldPhoto: v })}
          desc="Aged sepia vintage photo filter" />
      </Card>

      <Card>
        <SectionLabel>Holographic</SectionLabel>
        <Toggle label="Enable" value={state.imageHolographic ?? false} onChange={v => onChange({ imageHolographic: v })}
          desc="Holographic rainbow foil look" />
      </Card>

      {/* Batch 25 adjust controls */}
      <Card>
        <SectionLabel>X-Ray</SectionLabel>
        <Toggle label="Enable" value={state.imageXRay ?? false} onChange={v => onChange({ imageXRay: v })}
          desc="Inverted negative X-ray effect" />
      </Card>

      <Card>
        <SectionLabel>Glitch Scan</SectionLabel>
        <Toggle label="Enable" value={state.imageGlitchScan ?? false} onChange={v => onChange({ imageGlitchScan: v })}
          desc="Glitchy scan-line color contrast" />
      </Card>

      <Card>
        <SectionLabel>Cross Process 2</SectionLabel>
        <Toggle label="Enable" value={state.imageCrossProcess2 ?? false} onChange={v => onChange({ imageCrossProcess2: v })}
          desc="Green-shadows alternate cross-process" />
      </Card>

      {/* Batch 24 adjust controls */}
      <Card>
        <SectionLabel>Flat Color Pop</SectionLabel>
        <Toggle label="Enable" value={state.imageFlatColor ?? false} onChange={v => onChange({ imageFlatColor: v })}
          desc="Hard graphic contrast color pop" />
      </Card>

      <Card>
        <SectionLabel>Pastel Tone</SectionLabel>
        <Toggle label="Enable" value={state.imagePastelTone ?? false} onChange={v => onChange({ imagePastelTone: v })}
          desc="Soft washed-out pastel color treatment" />
      </Card>

      <Card>
        <SectionLabel>Infrared</SectionLabel>
        <Toggle label="Enable" value={state.imageInfrared ?? false} onChange={v => onChange({ imageInfrared: v })}
          desc="False-color infrared hue shift" />
      </Card>

      {/* Batch 23 adjust controls */}
      <Card>
        <SectionLabel>Aqua Effect</SectionLabel>
        <Toggle label="Enable" value={state.imageAquaEffect ?? false} onChange={v => onChange({ imageAquaEffect: v })}
          desc="Cool teal underwater blue-green tone" />
      </Card>

      <Card>
        <SectionLabel>Watercolor</SectionLabel>
        <Toggle label="Enable" value={state.imageWatercolor ?? false} onChange={v => onChange({ imageWatercolor: v })}
          desc="Soft washed-out watercolor look" />
      </Card>

      {/* Batch 22 adjust controls */}
      <Card>
        <SectionLabel>Vaporwave</SectionLabel>
        <Toggle label="Enable" value={state.imageVaporwave ?? false} onChange={v => onChange({ imageVaporwave: v })}
          desc="Pink+teal vaporwave color treatment" />
      </Card>

      <Card>
        <SectionLabel>Dream Glow</SectionLabel>
        <Toggle label="Enable" value={state.imageDreamGlow ?? false} onChange={v => onChange({ imageDreamGlow: v })}
          desc="Soft dreamy overexposed bloom" />
      </Card>

      <Card>
        <SectionLabel>Color Split</SectionLabel>
        <Toggle label="Enable" value={state.imageColorSplit ?? false} onChange={v => onChange({ imageColorSplit: v })}
          desc="Vivid RGB channel-split aberration look" />
      </Card>

      {/* Batch 21 adjust controls */}
      <Card>
        <SectionLabel>Oil Paint</SectionLabel>
        <Toggle label="Enable" value={state.imageOilPaint ?? false} onChange={v => onChange({ imageOilPaint: v })}
          desc="Rich saturated oil painting simulation" />
      </Card>

      <Card>
        <SectionLabel>Posterize</SectionLabel>
        <Toggle label="Enable" value={state.imagePosterize ?? false} onChange={v => onChange({ imagePosterize: v })}
          desc="High-contrast posterize color reduction" />
      </Card>

      <Card>
        <SectionLabel>Noir Effect</SectionLabel>
        <Toggle label="Enable" value={state.imageNoirEffect ?? false} onChange={v => onChange({ imageNoirEffect: v })}
          desc="Heavy B&W high-contrast noir look" />
      </Card>

      {/* Batch 20 adjust controls */}
      <Card>
        <SectionLabel>Ink Drop</SectionLabel>
        <Toggle label="Enable" value={state.imageInkDrop ?? false} onChange={v => onChange({ imageInkDrop: v })}
          desc="Ink-washed desaturated sepia look" />
      </Card>

      <Card>
        <SectionLabel>Chrome Effect</SectionLabel>
        <Toggle label="Enable" value={state.imageChromeEffect ?? false} onChange={v => onChange({ imageChromeEffect: v })}
          desc="Metallic chrome color treatment" />
      </Card>

      {/* Batch 18 adjust controls */}
      <Card>
        <SectionLabel>Lomo Film</SectionLabel>
        <Toggle label="Enable" value={state.imageLomo ?? false} onChange={v => onChange({ imageLomo: v })}
          desc="High-contrast saturated lomo look" />
      </Card>

      <Card>
        <SectionLabel>Cross Process</SectionLabel>
        <Toggle label="Enable" value={state.imageXProcess ?? false} onChange={v => onChange({ imageXProcess: v })}
          desc="Pushed-process chemical cross-develop" />
      </Card>

      <Card>
        <SectionLabel>Color Map</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {(['none','cyber','matrix','fire','ice'] as const).map(cm => (
            <button key={cm}
              onClick={() => onChange({ imageColorMap: cm })}
              className={`py-1.5 rounded-lg text-[10px] font-semibold capitalize transition-all ${
                (state.imageColorMap ?? 'none') === cm
                  ? 'bg-brand-600/40 text-brand-300 ring-1 ring-brand-500/50'
                  : 'bg-white/[0.05] text-white/50 hover:bg-white/10'
              }`}
            >{cm === 'none' ? 'None' : cm.charAt(0).toUpperCase() + cm.slice(1)}</button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Image Overlay Pattern</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {(['none','dots','lines','cross'] as const).map(p => (
            <button key={p}
              onClick={() => onChange({ imageOverlayPattern: p })}
              className={`py-1.5 rounded-lg text-[10px] font-semibold capitalize transition-all ${
                (state.imageOverlayPattern ?? 'none') === p
                  ? 'bg-brand-600/40 text-brand-300 ring-1 ring-brand-500/50'
                  : 'bg-white/[0.05] text-white/50 hover:bg-white/10'
              }`}
            >{p.charAt(0).toUpperCase() + p.slice(1)}</button>
          ))}
        </div>
        {(state.imageOverlayPattern ?? 'none') !== 'none' && (
          <Slider label="Opacity" value={state.imageOverlayPatternOpacity ?? 20} min={5} max={70} unit="%"
            onChange={v => onChange({ imageOverlayPatternOpacity: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Frame Matte</SectionLabel>
        <Toggle label="Enable" value={state.frameMatte ?? false} onChange={v => onChange({ frameMatte: v })}
          desc="Inset matte border inside the image" />
        {(state.frameMatte ?? false) && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
              <input type="color" value={state.frameMatteColor ?? '#ffffff'}
                onChange={e => onChange({ frameMatteColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer" />
            </div>
            <Slider label="Width" value={state.frameMatteWidth ?? 20} min={4} max={60} unit="px"
              onChange={v => onChange({ frameMatteWidth: v })} />
          </>
        )}
      </Card>

      {/* Batch 15 adjust controls */}
      <Card>
        <SectionLabel>Image Skew</SectionLabel>
        <Slider label="Skew X" value={state.imageSkewX ?? 0} min={-20} max={20} unit="°"
          onChange={v => onChange({ imageSkewX: v })} />
        <Slider label="Skew Y" value={state.imageSkewY ?? 0} min={-20} max={20} unit="°"
          onChange={v => onChange({ imageSkewY: v })} />
        {((state.imageSkewX ?? 0) !== 0 || (state.imageSkewY ?? 0) !== 0) && (
          <button onClick={() => onChange({ imageSkewX: 0, imageSkewY: 0 })}
            className="text-[9px] text-white/25 hover:text-white/50">Reset</button>
        )}
      </Card>

      {/* Batch 14 adjust controls */}
      <Card>
        <SectionLabel>Image Hue Shift</SectionLabel>
        <Slider label="Hue Shift" value={state.imageHueShift ?? 0} min={-180} max={180} unit="°"
          onChange={v => onChange({ imageHueShift: v })} />
        <p className="text-[8.5px] text-white/20">Rotate all image colors around the hue wheel</p>
        {(state.imageHueShift ?? 0) !== 0 && (
          <button onClick={() => onChange({ imageHueShift: 0 })}
            className="text-[9px] text-white/25 hover:text-white/50">Reset</button>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Perspective</SectionLabel>
        <div className="grid grid-cols-5 gap-1">
          {(['flat','left','right','up','down'] as const).map(p => (
            <QuickChip key={p} active={(state.imagePerspective ?? 'flat') === p}
              onClick={() => onChange({ imagePerspective: p })}>
              {p === 'flat' ? 'Flat' : p.charAt(0).toUpperCase() + p.slice(1)}
            </QuickChip>
          ))}
        </div>
        <p className="text-[8.5px] text-white/20">3D perspective angle for the image</p>
      </Card>

      <Card>
        <SectionLabel>Tilt Shift (Image)</SectionLabel>
        <Toggle label="Enable" value={state.tiltShiftImage ?? false} onChange={v => onChange({ tiltShiftImage: v })}
          desc="Fade top & bottom edges for depth-of-field look" />
        {(state.tiltShiftImage ?? false) && (
          <>
            <Slider label="Focus Center" value={state.tiltShiftImageCenter ?? 50} min={10} max={90} unit="%"
              onChange={v => onChange({ tiltShiftImageCenter: v })} />
            <Slider label="Blur Strength" value={state.tiltShiftImageBlur ?? 8} min={2} max={20} unit="px"
              onChange={v => onChange({ tiltShiftImageBlur: v })} />
          </>
        )}
      </Card>

      {/* Batch 13 adjust controls */}
      <Card>
        <SectionLabel>Image 3D Tilt</SectionLabel>
        <Slider label="Tilt X (Left/Right)" value={state.imageTiltX ?? 0} min={-20} max={20} unit="°"
          onChange={v => onChange({ imageTiltX: v })} />
        <Slider label="Tilt Y (Up/Down)" value={state.imageTiltY ?? 0} min={-20} max={20} unit="°"
          onChange={v => onChange({ imageTiltY: v })} />
        {((state.imageTiltX ?? 0) !== 0 || (state.imageTiltY ?? 0) !== 0) && (
          <button onClick={() => onChange({ imageTiltX: 0, imageTiltY: 0 })}
            className="text-[9px] text-white/25 hover:text-white/50">Reset</button>
        )}
      </Card>

      {/* Batch 11 adjust controls */}
      <Card>
        <SectionLabel>Image Grayscale</SectionLabel>
        <Slider label="Grayscale" value={state.imageGrayscale ?? 0} min={0} max={100} unit="%"
          onChange={v => onChange({ imageGrayscale: v })} />
        <Slider label="Saturation Boost" value={state.imageSaturationBoost ?? 0} min={-100} max={100} unit="%"
          onChange={v => onChange({ imageSaturationBoost: v })} />
      </Card>

      <Card>
        <SectionLabel>Warp / Distortion</SectionLabel>
        <Slider label="Warp" value={state.warpEffect ?? 0} min={-100} max={100}
          onChange={v => onChange({ warpEffect: v })} />
        <p className="text-[8.5px] text-white/20">
          {(state.warpEffect ?? 0) > 0 ? 'Barrel distortion →' : (state.warpEffect ?? 0) < 0 ? '← Diamond / pincushion' : 'No distortion'}
        </p>
        {(state.warpEffect ?? 0) !== 0 && (
          <button onClick={() => onChange({ warpEffect: 0 })}
            className="text-[9px] text-white/25 hover:text-white/50">Reset</button>
        )}
      </Card>

      <Card>
        <SectionLabel>Noise Texture</SectionLabel>
        <div className="grid grid-cols-5 gap-1">
          {[
            { id: 'none',   l: 'Off' },
            { id: 'film',   l: 'Film' },
            { id: 'sand',   l: 'Sand' },
            { id: 'fabric', l: 'Fabric' },
            { id: 'static', l: 'Static' },
          ].map(t => (
            <QuickChip key={t.id} active={(state.noiseType ?? 'none') === t.id}
              onClick={() => onChange({ noiseType: t.id })}>{t.l}</QuickChip>
          ))}
        </div>
        {(state.noiseType ?? 'none') !== 'none' && (
          <Slider label="Amount" value={state.noiseAmount ?? 40} min={5} max={100}
            onChange={v => onChange({ noiseAmount: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Duotone Split</SectionLabel>
        <Toggle label="Enable" value={state.duotoneSplit ?? false} onChange={v => onChange({ duotoneSplit: v })}
          desc="Top/bottom halves tinted with different colors" />
        {(state.duotoneSplit ?? false) && (
          <>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] text-white/35">Top</span>
                <input type="color" value={state.duotoneSplitColor1 ?? '#ff6600'}
                  onChange={e => onChange({ duotoneSplitColor1: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] text-white/35">Bottom</span>
                <input type="color" value={state.duotoneSplitColor2 ?? '#3300cc'}
                  onChange={e => onChange({ duotoneSplitColor2: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            </div>
            <Slider label="Split Point" value={state.duotoneSplitMidpoint ?? 50} min={10} max={90} unit="%"
              onChange={v => onChange({ duotoneSplitMidpoint: v })} />
          </>
        )}
      </Card>
    </div>
  );

  /* ── 3D tab ─────────────────────────────────────── */
  const renderTransformTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>3D Transform</SectionLabel>
        <Slider label="Tilt X"   value={state.tiltX}                    min={-30} max={30}  unit="°"  onChange={v => onChange({ tiltX: v })} />
        <Slider label="Tilt Y"   value={state.tiltY}                    min={-30} max={30}  unit="°"  onChange={v => onChange({ tiltY: v })} />
        <Slider label="Scale"    value={Math.round(state.scale * 100)}  min={50}  max={150} unit="%"  onChange={v => onChange({ scale: v / 100 })} />
        <Slider label="Rotation" value={state.rotation}                 min={-45} max={45}  unit="°"  onChange={v => onChange({ rotation: v })} />
        <Slider label="Skew X"   value={state.skewX ?? 0}               min={-30} max={30}  unit="°"  onChange={v => onChange({ skewX: v })} />
        <Slider label="Skew Y"   value={state.skewY ?? 0}               min={-30} max={30}  unit="°"  onChange={v => onChange({ skewY: v })} />
        <Slider label="Perspective" value={state.perspectiveDistance ?? 1000} min={300} max={2000} unit="px"
          onChange={v => onChange({ perspectiveDistance: v })} />
        <ResetBtn onClick={() => onChange({ tiltX: 0, tiltY: 0, scale: 1, rotation: 0, skewX: 0, skewY: 0, perspectiveDistance: 1000 })} label="Reset Transform" />
      </Card>

      <Card>
        <SectionLabel>Perspective Presets</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: 'Flat',       tiltX: 0,   tiltY: 0,   skewX: 0 },
            { name: 'Left',       tiltX: 0,   tiltY: 12,  skewX: 0 },
            { name: 'Right',      tiltX: 0,   tiltY: -12, skewX: 0 },
            { name: 'Top',        tiltX: -12, tiltY: 0,   skewX: 0 },
            { name: 'Bottom',     tiltX: 12,  tiltY: 0,   skewX: 0 },
            { name: 'Corner',     tiltX: 6,   tiltY: -9,  skewX: 0 },
            { name: 'Isometric',  tiltX: 15,  tiltY: -15, skewX: 0 },
            { name: 'Dramatic',   tiltX: 20,  tiltY: -20, skewX: 0 },
            { name: 'Cinematic',  tiltX: 5,   tiltY: -5,  skewX: 3 },
          ].map(p => (
            <QuickChip key={p.name}
              active={state.tiltX === p.tiltX && state.tiltY === p.tiltY && (state.skewX ?? 0) === p.skewX}
              onClick={() => onChange({ tiltX: p.tiltX, tiltY: p.tiltY, skewX: p.skewX })}>
              {p.name}
            </QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Reflection</SectionLabel>
        <Toggle label="Mirror Reflection" value={state.reflection} onChange={v => onChange({ reflection: v })} />
        {state.reflection && (
          <>
            <Slider label="Opacity" value={state.reflectionOpacity ?? 35} min={5} max={100} unit="%"
              onChange={v => onChange({ reflectionOpacity: v })} />
            <Slider label="Height"  value={state.reflectionHeight ?? 60}  min={10} max={100} unit="%"
              onChange={v => onChange({ reflectionHeight: v })} />
            <Slider label="Gap"     value={state.reflectionGap ?? 2}      min={0}  max={40}  unit="px"
              onChange={v => onChange({ reflectionGap: v })} />
          </>
        )}
      </Card>
    </div>
  );

  /* ── Brand tab ──────────────────────────────────── */
  const renderBrandTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Text Overlay</SectionLabel>
        <input type="text" placeholder="Title…" value={state.titleText}
          onChange={e => onChange({ titleText: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
        <input type="text" placeholder="Subtitle / tagline…" value={state.subtitleText}
          onChange={e => onChange({ subtitleText: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
        <input type="text" placeholder="Body text / description…" value={state.bodyText ?? ''}
          onChange={e => onChange({ bodyText: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
      </Card>

      {(state.titleText || state.subtitleText || state.bodyText) && (
        <>
          <Card>
            <SectionLabel>Position & Alignment</SectionLabel>
            <div className="grid grid-cols-3 gap-1.5">
              {[{ id: 'above', name: 'Above' }, { id: 'center', name: 'Center' }, { id: 'below', name: 'Below' }].map(p => (
                <QuickChip key={p.id} active={state.titlePosition === p.id} onClick={() => onChange({ titlePosition: p.id })}>
                  {p.name}
                </QuickChip>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[{ id: 'left', name: '⬅ Left' }, { id: 'center', name: '↔ Center' }, { id: 'right', name: 'Right ➡' }].map(a => (
                <QuickChip key={a.id} active={(state.textAlign ?? 'center') === a.id} onClick={() => onChange({ textAlign: a.id })}>
                  {a.name}
                </QuickChip>
              ))}
            </div>
          </Card>

          <Card>
            <SectionLabel>Typography</SectionLabel>
            <Slider label="Title Size"     value={state.titleSize}           min={12} max={96} unit="px" onChange={v => onChange({ titleSize: v })} />
            <Slider label="Subtitle Size"  value={state.subtitleSize}        min={10} max={48} unit="px" onChange={v => onChange({ subtitleSize: v })} />
            {state.bodyText && (
              <Slider label="Body Size" value={state.bodySize ?? 14} min={10} max={36} unit="px" onChange={v => onChange({ bodySize: v })} />
            )}
            <div>
              <p className="text-[9.5px] text-white/25 mb-1.5">Spacing Preset</p>
              <div className="grid grid-cols-4 gap-1.5">
                {[{ id: 'compact', l: 'Tight' }, { id: 'normal', l: 'Normal' }, { id: 'wide', l: 'Wide' }, { id: 'ultra', l: 'Ultra' }].map(p => (
                  <QuickChip key={p.id} active={(state.textSpacingPreset ?? 'normal') === p.id}
                    onClick={() => onChange({ textSpacingPreset: p.id })}>{p.l}</QuickChip>
                ))}
              </div>
            </div>
            <Slider label="Letter Spacing" value={state.letterSpacing ?? 0}  min={0}  max={20} unit="px" onChange={v => onChange({ letterSpacing: v })} />
            <Slider label="Word Spacing"   value={state.wordSpacing ?? 0}    min={0}  max={20} unit="px" onChange={v => onChange({ wordSpacing: v })} />
            <Slider label="Line Height"    value={state.lineHeight ?? 1.25}  min={1}  max={3}  step={0.05}
              onChange={v => onChange({ lineHeight: v })} />
            <Slider label="Title Opacity"  value={state.titleOpacity ?? 100} min={10} max={100} unit="%"
              onChange={v => onChange({ titleOpacity: v })} />
            <Slider label="Text Rotation"  value={state.textRotation ?? 0}   min={-45} max={45} unit="°"
              onChange={v => onChange({ textRotation: v })} />
            <div className="grid grid-cols-4 gap-1.5 mt-1">
              {TITLE_FONTS.map(f => (
                <button key={f.id} onClick={() => onChange({ titleFont: f.id })}
                  className={`px-1.5 py-2 rounded-lg text-[10px] font-medium transition-all ring-1 ${
                    state.titleFont === f.id
                      ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                      : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.08]'
                  }`}
                  style={{ fontFamily: f.id }}>
                  {f.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[{ id: 'bold', name: 'Bold' }, { id: 'normal', name: 'Regular' }].map(w => (
                <QuickChip key={w.id} active={(state.titleWeight ?? 'bold') === w.id}
                  onClick={() => onChange({ titleWeight: w.id })}>
                  <span style={{ fontWeight: w.id === 'bold' ? 700 : 400 }}>{w.name}</span>
                </QuickChip>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <Toggle label="Italic"   value={state.titleItalic ?? false}  onChange={v => onChange({ titleItalic: v })} />
              <Toggle label="All Caps" value={state.titleAllCaps ?? false} onChange={v => onChange({ titleAllCaps: v })} />
            </div>
            <Toggle label="Text Shadow" value={state.titleShadow ?? false} onChange={v => onChange({ titleShadow: v })} />
          </Card>

          <Card>
            <SectionLabel>Neon Glow Text</SectionLabel>
            <Toggle label="Enable Neon Glow" value={state.neonTextGlow ?? false} onChange={v => onChange({ neonTextGlow: v })}
              desc="Adds a glowing neon effect to the title text" />
            {(state.neonTextGlow ?? false) && (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/35">Glow Color</span>
                  <input type="color" value={state.neonGlowColor ?? '#00ffff'}
                    onChange={e => onChange({ neonGlowColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <div className="flex gap-1.5 ml-auto">
                    {['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff6600', '#ffffff'].map(c => (
                      <button key={c} onClick={() => onChange({ neonGlowColor: c })}
                        className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                        style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                    ))}
                  </div>
                </div>
                <Slider label="Glow Intensity" value={state.neonGlowIntensity ?? 60} min={10} max={120}
                  onChange={v => onChange({ neonGlowIntensity: v })} />
              </>
            )}
          </Card>

          <Card>
            <SectionLabel>Text Drop Shadow</SectionLabel>
            <Toggle label="Enable" value={state.textDropShadow ?? false} onChange={v => onChange({ textDropShadow: v })}
              desc="Custom drop shadow on title text (overrides default shadow)" />
            {(state.textDropShadow ?? false) && (
              <>
                <Slider label="X Offset" value={state.textShadowX ?? 2} min={-20} max={20} unit="px"
                  onChange={v => onChange({ textShadowX: v })} />
                <Slider label="Y Offset" value={state.textShadowY ?? 2} min={-20} max={20} unit="px"
                  onChange={v => onChange({ textShadowY: v })} />
                <Slider label="Blur" value={state.textShadowBlur ?? 8} min={0} max={40} unit="px"
                  onChange={v => onChange({ textShadowBlur: v })} />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/35">Color</span>
                  <input type="color"
                    value={state.textShadowColor?.startsWith('rgba') ? '#000000' : (state.textShadowColor ?? '#000000')}
                    onChange={e => onChange({ textShadowColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <div className="flex gap-1.5 ml-auto">
                    {['#000000', '#ffffff', '#8b5cf6', '#ec4899', '#1a1a2e', '#0a0a0a'].map(c => (
                      <button key={c} onClick={() => onChange({ textShadowColor: c })}
                        className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                        style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </Card>

          <Card>
            <SectionLabel>Text Style</SectionLabel>
            <Slider label="Stroke Width" value={state.textStroke ?? 0} min={0} max={8} unit="px"
              onChange={v => onChange({ textStroke: v })} />
            {(state.textStroke ?? 0) > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/35">Stroke</span>
                <input type="color" value={state.textStrokeColor ?? '#000000'}
                  onChange={e => onChange({ textStrokeColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            )}
            <div>
              <p className="text-[9.5px] text-white/25 mb-1.5">Text Background</p>
              <div className="grid grid-cols-3 gap-1.5">
                {[{ id: 'none', l: 'None' }, { id: 'pill', l: 'Pill' }, { id: 'box', l: 'Box' }].map(t => (
                  <QuickChip key={t.id} active={(state.textBg ?? 'none') === t.id}
                    onClick={() => onChange({ textBg: t.id })}>{t.l}</QuickChip>
                ))}
              </div>
            </div>
            {(state.textBg ?? 'none') !== 'none' && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/35">BG Color</span>
                  <input type="color" value={state.textBgColor ?? '#000000'}
                    onChange={e => onChange({ textBgColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <div className="flex gap-1.5 ml-auto">
                    {['#000000', '#ffffff', '#1a1a2e', '#8b5cf6', '#ec4899', '#f59e0b'].map(c => (
                      <button key={c} onClick={() => onChange({ textBgColor: c })}
                        className="w-5 h-5 rounded-full ring-1 ring-white/15" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <Slider label="BG Opacity" value={state.textBgOpacity ?? 50} min={10} max={100} unit="%"
                  onChange={v => onChange({ textBgOpacity: v })} />
              </>
            )}
            <Toggle label="Gradient Text" value={state.titleGradient ?? false} onChange={v => onChange({ titleGradient: v })} />
            {(state.titleGradient ?? false) && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/35">2nd Color</span>
                <input type="color" value={state.titleGradientColor2 ?? '#ec4899'}
                  onChange={e => onChange({ titleGradientColor2: e.target.value })}
                  className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent" />
                <div className="flex-1 h-9 rounded-xl ring-1 ring-white/10"
                  style={{ background: `linear-gradient(135deg, ${state.titleColor}, ${state.titleGradientColor2 ?? '#ec4899'})` }} />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Text Outline</SectionLabel>
            <Slider label="Outline Width" value={state.textOutline ?? 0} min={0} max={10} unit="px"
              onChange={v => onChange({ textOutline: v })} />
            {(state.textOutline ?? 0) > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/35">Color</span>
                <input type="color" value={state.textOutlineColor ?? '#000000'}
                  onChange={e => onChange({ textOutlineColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                <div className="flex gap-1.5 ml-auto">
                  {['#000000', '#ffffff', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444'].map(c => (
                    <button key={c} onClick={() => onChange({ textOutlineColor: c })}
                      className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
            )}
            <Toggle label="Subtitle All Caps" value={state.subtitleAllCaps ?? false}
              onChange={v => onChange({ subtitleAllCaps: v })}
              desc="Transforms subtitle/tagline to uppercase" />
          </Card>

          <Card>
            <SectionLabel>Text Glitch</SectionLabel>
            <Slider label="Offset" value={state.textGlitch ?? 0} min={0} max={20} unit="px"
              onChange={v => onChange({ textGlitch: v })} />
            {(state.textGlitch ?? 0) > 0 && (
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-[10px] text-white/35">Color 1</span>
                  <input type="color" value={state.textGlitchColor1 ?? '#ff0000'}
                    onChange={e => onChange({ textGlitchColor1: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-[10px] text-white/35">Color 2</span>
                  <input type="color" value={state.textGlitchColor2 ?? '#00ffff'}
                    onChange={e => onChange({ textGlitchColor2: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                </div>
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Title Extras</SectionLabel>
            <Toggle label="Underline" value={state.titleUnderline ?? false}
              onChange={v => onChange({ titleUnderline: v })} desc="Underline the title text" />
            {(state.titleGradient ?? false) && (
              <Slider label="Gradient Angle" value={state.textGradientAngle ?? 135} min={0} max={360} unit="°"
                onChange={v => onChange({ textGradientAngle: v })} />
            )}
            <Toggle label="Title Band" value={state.titleBackground ?? false}
              onChange={v => onChange({ titleBackground: v })} desc="Colored band behind title text" />
            {(state.titleBackground ?? false) && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/35">Band Color</span>
                  <input type="color"
                    value={state.titleBackgroundColor?.startsWith('rgba') ? '#000000' : (state.titleBackgroundColor ?? '#000000')}
                    onChange={e => onChange({ titleBackgroundColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                </div>
                <Slider label="Band Padding" value={state.titleBackgroundPadding ?? 12} min={4} max={40} unit="px"
                  onChange={v => onChange({ titleBackgroundPadding: v })} />
              </>
            )}
            <Slider label="Text Box Padding" value={state.textBoxPadding ?? 0} min={0} max={40} unit="px"
              onChange={v => onChange({ textBoxPadding: v })} />
            <Toggle label="Title/Subtitle Divider" value={state.lineAccent ?? false}
              onChange={v => onChange({ lineAccent: v })} desc="Decorative line between title and subtitle" />
            {(state.lineAccent ?? false) && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/35">Color</span>
                  <input type="color" value={state.lineAccentColor ?? '#ffffff'}
                    onChange={e => onChange({ lineAccentColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <div className="flex gap-1.5 ml-auto">
                    {['#ffffff', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map(c => (
                      <button key={c} onClick={() => onChange({ lineAccentColor: c })}
                        className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                        style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Slider label="Width" value={state.lineAccentWidth ?? 60} min={10} max={100} unit="%"
                    onChange={v => onChange({ lineAccentWidth: v })} />
                  <Slider label="Height" value={state.lineAccentHeight ?? 2} min={1} max={6} unit="px"
                    onChange={v => onChange({ lineAccentHeight: v })} />
                </div>
              </>
            )}
          </Card>

          <Card>
            <SectionLabel>Tag Line</SectionLabel>
            <input type="text" placeholder="e.g. NEW FEATURE, COMING SOON…" value={state.tagLine ?? ''}
              onChange={e => onChange({ tagLine: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
                placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
                focus:bg-white/[0.09] outline-none transition-all" />
            {(state.tagLine ?? '').length > 0 && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/35">BG</span>
                  <input type="color" value={state.tagLineBg ?? '#8b5cf6'}
                    onChange={e => onChange({ tagLineBg: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <span className="text-[10px] text-white/35 ml-2">Text</span>
                  <input type="color" value={state.tagLineColor ?? '#ffffff'}
                    onChange={e => onChange({ tagLineColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <div className="flex gap-1.5 ml-auto">
                    {['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#3b82f6'].map(c => (
                      <button key={c} onClick={() => onChange({ tagLineBg: c })}
                        className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                        style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </Card>

          {/* Batch 9 text controls */}
          <Card>
            <SectionLabel>Title Shadow</SectionLabel>
            <Slider label="Blur" value={state.titleShadowBlur ?? 0} min={0} max={40} unit="px"
              onChange={v => onChange({ titleShadowBlur: v })} />
            {(state.titleShadowBlur ?? 0) > 0 && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <Slider label="X" value={state.titleShadowX ?? 0} min={-20} max={20} unit="px"
                    onChange={v => onChange({ titleShadowX: v })} />
                  <Slider label="Y" value={state.titleShadowY ?? 2} min={-20} max={20} unit="px"
                    onChange={v => onChange({ titleShadowY: v })} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/35">Color</span>
                  <input type="color" value={state.titleShadowColor ?? '#000000'}
                    onChange={e => onChange({ titleShadowColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <div className="flex gap-1.5 ml-auto">
                    {['#000000','#8b5cf6','#ec4899','#f59e0b','#3b82f6','#ffffff'].map(c => (
                      <button key={c} onClick={() => onChange({ titleShadowColor: c })}
                        className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                        style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </Card>

          <Card>
            <SectionLabel>Subtitle Style</SectionLabel>
            <Slider label="Opacity" value={state.subtitleOpacity ?? 100} min={0} max={100} unit="%"
              onChange={v => onChange({ subtitleOpacity: v })} />
            <Toggle label="Gradient Subtitle" value={state.gradientText2 ?? false}
              onChange={v => onChange({ gradientText2: v })} desc="Apply gradient color to subtitle" />
            {(state.gradientText2 ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/35">From</span>
                <input type="color" value={state.gradientText2Color1 ?? '#ec4899'}
                  onChange={e => onChange({ gradientText2Color1: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                <span className="text-[10px] text-white/35">To</span>
                <input type="color" value={state.gradientText2Color2 ?? '#f59e0b'}
                  onChange={e => onChange({ gradientText2Color2: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            )}
            <Toggle label="Force Uppercase" value={state.titleCaps ?? false}
              onChange={v => onChange({ titleCaps: v })} desc="Force all caps on title" />
          </Card>

          <Card>
            <SectionLabel>Body Text Style</SectionLabel>
            <Slider label="Size" value={state.bodyTextSize ?? 13} min={9} max={24} unit="px"
              onChange={v => onChange({ bodyTextSize: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.bodyTextColor ?? '#ffffff'}
                onChange={e => onChange({ bodyTextColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#ffffff','#cccccc','#999999','#8b5cf6','#ec4899','#000000'].map(c => (
                  <button key={c} onClick={() => onChange({ bodyTextColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </Card>

          {/* Batch 10 text controls */}
          <Card highlight>
            <SectionLabel>Title Letter Spacing</SectionLabel>
            <Slider label="Spacing" value={state.titleLetterSpacing ?? 0} min={-10} max={50} unit=""
              onChange={v => onChange({ titleLetterSpacing: v })} />
            <p className="text-[8.5px] text-white/20">Overrides global spacing for title only</p>
          </Card>

          {/* Batch 13 text controls */}
          <Card>
            <SectionLabel>Title Outline Only</SectionLabel>
            <Toggle label="Outline Mode" value={state.titleOutlineOnly ?? false}
              onChange={v => onChange({ titleOutlineOnly: v })} desc="Transparent fill, stroke outline only" />
            {(state.titleOutlineOnly ?? false) && (
              <>
                <Slider label="Stroke Width" value={state.titleOutlineWidth ?? 2} min={1} max={8} unit="px"
                  onChange={v => onChange({ titleOutlineWidth: v })} />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/35">Color</span>
                  <input type="color" value={state.titleOutlineColor ?? '#ffffff'}
                    onChange={e => onChange({ titleOutlineColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <div className="flex gap-1.5 ml-auto">
                    {['#ffffff','#000000','#8b5cf6','#ec4899','#f59e0b','#10b981'].map(c => (
                      <button key={c} onClick={() => onChange({ titleOutlineColor: c })}
                        className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                        style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </Card>

          <Card>
            <SectionLabel>Quote Style</SectionLabel>
            <Toggle label="Large Quote Marks" value={state.quoteStyle ?? false}
              onChange={v => onChange({ quoteStyle: v })} desc='Decorative " marks around title' />
            {(state.quoteStyle ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/35">Mark Color</span>
                <input type="color" value={state.quoteMarkColor ?? '#8b5cf6'}
                  onChange={e => onChange({ quoteMarkColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Subtitle Extras</SectionLabel>
            <div className="grid grid-cols-3 gap-1.5">
              <QuickChip active={state.subtitleBold ?? false}
                onClick={() => onChange({ subtitleBold: !(state.subtitleBold ?? false) })}>Bold</QuickChip>
              <QuickChip active={state.subtitleItalic ?? false}
                onClick={() => onChange({ subtitleItalic: !(state.subtitleItalic ?? false) })}>Italic</QuickChip>
              <QuickChip active={state.subtitleUnderline ?? false}
                onClick={() => onChange({ subtitleUnderline: !(state.subtitleUnderline ?? false) })}>Underline</QuickChip>
            </div>
          </Card>

          {/* Batch 17 text controls */}
          <Card>
            <SectionLabel>Subtitle Gradient</SectionLabel>
            <Toggle label="Enable" value={state.subtitleGradient ?? false} onChange={v => onChange({ subtitleGradient: v })}
              desc="Gradient fill on subtitle text" />
            {(state.subtitleGradient ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/35">From subtitle color →</span>
                <input type="color" value={state.subtitleGradientColor2 ?? '#ec4899'}
                  onChange={e => onChange({ subtitleGradientColor2: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            )}
          </Card>

          {/* Batch 38 text controls */}
          <Card>
            <SectionLabel>Soft Shadow</SectionLabel>
            <Toggle label="Enable" value={state.textShadowSoft ?? false} onChange={v => onChange({ textShadowSoft: v })}
              desc="Diffused ambient bloom shadow on title" />
            {(state.textShadowSoft ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.textShadowSoftColor ?? '#8b5cf6'}
                  onChange={e => onChange({ textShadowSoftColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          {/* Batch 37 text controls */}
          <Card>
            <SectionLabel>Pop Art</SectionLabel>
            <Toggle label="Enable" value={state.titlePop ?? false} onChange={v => onChange({ titlePop: v })}
              desc="Chunky pop-art bold outlined title" />
          </Card>

          <Card>
            <SectionLabel>Disco</SectionLabel>
            <Toggle label="Enable" value={state.textDisco ?? false} onChange={v => onChange({ textDisco: v })}
              desc="Rainbow disco gradient on title text" />
          </Card>

          {/* Batch 36 text controls */}
          <Card>
            <SectionLabel>3D Outline</SectionLabel>
            <Toggle label="Enable" value={state.titleOutline3D ?? false} onChange={v => onChange({ titleOutline3D: v })}
              desc="3D extruded offset shadow on title" />
            {(state.titleOutline3D ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.titleOutline3DColor ?? '#8b5cf6'}
                  onChange={e => onChange({ titleOutline3DColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Soft Glow</SectionLabel>
            <Toggle label="Enable" value={state.textGlowSoft ?? false} onChange={v => onChange({ textGlowSoft: v })}
              desc="Ambient soft bloom glow on title" />
          </Card>

          {/* Batch 35 text controls */}
          <Card>
            <SectionLabel>Blink</SectionLabel>
            <Toggle label="Enable" value={state.titleBlink ?? false} onChange={v => onChange({ titleBlink: v })}
              desc="Slow blinking cursor pulse on title" />
          </Card>

          {/* Batch 34 text controls */}
          <Card>
            <SectionLabel>Cinematic</SectionLabel>
            <Toggle label="Enable" value={state.titleCinematic ?? false} onChange={v => onChange({ titleCinematic: v })}
              desc="Letterbox bars above/below title" />
          </Card>

          <Card>
            <SectionLabel>Chromatic</SectionLabel>
            <Toggle label="Enable" value={state.textChromatic ?? false} onChange={v => onChange({ textChromatic: v })}
              desc="Chromatic aberration red/blue text split" />
          </Card>

          {/* Batch 33 text controls */}
          <Card>
            <SectionLabel>Wave Title</SectionLabel>
            <Toggle label="Enable" value={state.titleWave ?? false} onChange={v => onChange({ titleWave: v })}
              desc="Each character in a flowing wave pattern" />
          </Card>

          <Card>
            <SectionLabel>Double Outline</SectionLabel>
            <Toggle label="Enable" value={state.textOutlineDouble ?? false} onChange={v => onChange({ textOutlineDouble: v })}
              desc="Doubled ring outline stroke on title" />
            {(state.textOutlineDouble ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.textOutlineDoubleColor ?? '#8b5cf6'}
                  onChange={e => onChange({ textOutlineDoubleColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          {/* Batch 32 text controls */}
          <Card>
            <SectionLabel>Extra Bold</SectionLabel>
            <Toggle label="Enable" value={state.textExtraBold ?? false} onChange={v => onChange({ textExtraBold: v })}
              desc="Extra bold/black font weight on title" />
          </Card>

          <Card>
            <SectionLabel>Neon Box</SectionLabel>
            <Toggle label="Enable" value={state.titleNeonBox ?? false} onChange={v => onChange({ titleNeonBox: v })}
              desc="Glowing neon border box around title" />
            {(state.titleNeonBox ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.titleNeonBoxColor ?? '#00ffff'}
                  onChange={e => onChange({ titleNeonBoxColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          {/* Batch 31 text controls */}
          <Card>
            <SectionLabel>Flicker</SectionLabel>
            <Toggle label="Enable" value={state.titleFlicker ?? false} onChange={v => onChange({ titleFlicker: v })}
              desc="Flickering neon animation on title" />
          </Card>

          <Card>
            <SectionLabel>Cursive Font</SectionLabel>
            <Toggle label="Enable" value={state.textCursive ?? false} onChange={v => onChange({ textCursive: v })}
              desc="Script/cursive serif font on title" />
          </Card>

          {/* Batch 30 text controls */}
          <Card>
            <SectionLabel>Ghost Shadow</SectionLabel>
            <Toggle label="Enable" value={state.titleGhost ?? false} onChange={v => onChange({ titleGhost: v })}
              desc="Phantom offset ghost shadow behind title" />
            {(state.titleGhost ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.titleGhostColor ?? '#8b5cf6'}
                  onChange={e => onChange({ titleGhostColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Stencil</SectionLabel>
            <Toggle label="Enable" value={state.textStencil ?? false} onChange={v => onChange({ textStencil: v })}
              desc="Stencil-style wide tracked uppercase title" />
          </Card>

          {/* Batch 29 text controls */}
          <Card>
            <SectionLabel>Wavy Underline</SectionLabel>
            <Toggle label="Enable" value={state.textUnderlineWave ?? false} onChange={v => onChange({ textUnderlineWave: v })}
              desc="Wavy underline decoration on title" />
          </Card>

          {/* Batch 28 text controls */}
          <Card>
            <SectionLabel>Split Title</SectionLabel>
            <Toggle label="Enable" value={state.titleSplit ?? false} onChange={v => onChange({ titleSplit: v })}
              desc="Title split in two halves with different colors" />
            {(state.titleSplit ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color B</span>
                <input type="color" value={state.titleSplitColorB ?? '#ec4899'}
                  onChange={e => onChange({ titleSplitColorB: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Force Italic</SectionLabel>
            <Toggle label="Enable" value={state.textItalicForce ?? false} onChange={v => onChange({ textItalicForce: v })}
              desc="Force italic style on title text" />
          </Card>

          {/* Batch 27 text controls */}
          <Card>
            <SectionLabel>Rainbow Title</SectionLabel>
            <Toggle label="Enable" value={state.titleRainbow ?? false} onChange={v => onChange({ titleRainbow: v })}
              desc="Rainbow spectrum gradient on title" />
          </Card>

          <Card>
            <SectionLabel>Hard Shadow</SectionLabel>
            <Toggle label="Enable" value={state.textShadowHard ?? false} onChange={v => onChange({ textShadowHard: v })}
              desc="Hard sharp drop shadow on title" />
            {(state.textShadowHard ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.textShadowHardColor ?? '#000000'}
                  onChange={e => onChange({ textShadowHardColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          {/* Batch 26 text controls */}
          <Card>
            <SectionLabel>Neon Pulse</SectionLabel>
            <Toggle label="Enable" value={state.titleNeonPulse ?? false} onChange={v => onChange({ titleNeonPulse: v })}
              desc="Animated neon glow pulse on title" />
          </Card>

          <Card>
            <SectionLabel>Small Caps</SectionLabel>
            <Toggle label="Enable" value={state.textSmallCaps ?? false} onChange={v => onChange({ textSmallCaps: v })}
              desc="Small-caps font variant on title" />
          </Card>

          {/* Batch 25 text controls */}
          <Card>
            <SectionLabel>Wide Word Spacing</SectionLabel>
            <Toggle label="Enable" value={state.titleWordSpacingWide ?? false} onChange={v => onChange({ titleWordSpacingWide: v })}
              desc="Extra word spacing on title" />
          </Card>

          <Card>
            <SectionLabel>Backdrop Blur</SectionLabel>
            <Toggle label="Enable" value={state.titleBackdropBlur ?? false} onChange={v => onChange({ titleBackdropBlur: v })}
              desc="Blurred backdrop behind title text" />
            {(state.titleBackdropBlur ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.titleBackdropBlurColor ?? '#000000'}
                  onChange={e => onChange({ titleBackdropBlurColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          {/* Batch 24 text controls */}
          <Card>
            <SectionLabel>Bounce Title</SectionLabel>
            <Toggle label="Enable" value={state.titleBounce ?? false} onChange={v => onChange({ titleBounce: v })}
              desc="Sine-wave character bounce on title" />
          </Card>

          <Card>
            <SectionLabel>Gradient Angle</SectionLabel>
            <Slider label="Angle" value={state.titleGradientAngle ?? 135} min={0} max={360} unit="°"
              onChange={v => onChange({ titleGradientAngle: v })} />
          </Card>

          {/* Batch 23 text controls */}
          <Card>
            <SectionLabel>Double Shadow</SectionLabel>
            <Toggle label="Enable" value={state.titleShadowDouble ?? false} onChange={v => onChange({ titleShadowDouble: v })}
              desc="Double layered depth shadow on title" />
            {(state.titleShadowDouble ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.titleShadowDoubleColor ?? '#8b5cf6'}
                  onChange={e => onChange({ titleShadowDoubleColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Text Box Glass</SectionLabel>
            <Toggle label="Enable" value={state.textBoxGlass ?? false} onChange={v => onChange({ textBoxGlass: v })}
              desc="Frosted glass panel behind text block" />
            {(state.textBoxGlass ?? false) && (
              <Slider label="Opacity" value={state.textBoxGlassOpacity ?? 50} min={10} max={100} unit="%"
                onChange={v => onChange({ textBoxGlassOpacity: v })} />
            )}
          </Card>

          {/* Batch 22 text controls */}
          <Card>
            <SectionLabel>Outline Glow</SectionLabel>
            <Toggle label="Enable" value={state.titleOutlineGlow ?? false} onChange={v => onChange({ titleOutlineGlow: v })}
              desc="Glowing stroke outline, no fill on title" />
            {(state.titleOutlineGlow ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.titleOutlineGlowColor ?? '#00ffff'}
                  onChange={e => onChange({ titleOutlineGlowColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Force Uppercase</SectionLabel>
            <Toggle label="Enable" value={state.textUppercase ?? false} onChange={v => onChange({ textUppercase: v })}
              desc="Transform all title text to uppercase" />
          </Card>

          {/* Batch 21 text controls */}
          <Card>
            <SectionLabel>Strikethrough</SectionLabel>
            <Toggle label="Enable" value={state.titleStrikethrough ?? false} onChange={v => onChange({ titleStrikethrough: v })}
              desc="Strikethrough line across title text" />
          </Card>

          <Card>
            <SectionLabel>Flip Title</SectionLabel>
            <Toggle label="Enable" value={state.titleFlipText ?? false} onChange={v => onChange({ titleFlipText: v })}
              desc="Mirror the title horizontally" />
          </Card>

          <Card>
            <SectionLabel>Text Glow Box</SectionLabel>
            <Toggle label="Enable" value={state.textGlowBox ?? false} onChange={v => onChange({ textGlowBox: v })}
              desc="Glowing aura around the text block" />
            {(state.textGlowBox ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.textGlowBoxColor ?? '#8b5cf6'}
                  onChange={e => onChange({ textGlowBoxColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          {/* Batch 20 text controls */}
          <Card>
            <SectionLabel>Neon Sign</SectionLabel>
            <Toggle label="Enable" value={state.titleNeonSign ?? false} onChange={v => onChange({ titleNeonSign: v })}
              desc="Multi-layer neon glow on title" />
            {(state.titleNeonSign ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.titleNeonSignColor ?? '#00ffff'}
                  onChange={e => onChange({ titleNeonSignColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Wide Kerning</SectionLabel>
            <Toggle label="Enable" value={state.textKerningWide ?? false} onChange={v => onChange({ textKerningWide: v })}
              desc="Extreme letter spacing on title" />
          </Card>

          {/* Batch 19 text controls */}
          <Card>
            <SectionLabel>Title Glitch</SectionLabel>
            <Toggle label="Enable" value={state.titleGlitch ?? false} onChange={v => onChange({ titleGlitch: v })}
              desc="Offset color glitch layers on title" />
            {(state.titleGlitch ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.titleGlitchColor ?? '#ec4899'}
                  onChange={e => onChange({ titleGlitchColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Text Highlight Block</SectionLabel>
            <Toggle label="Enable" value={state.textHighlightBlock ?? false} onChange={v => onChange({ textHighlightBlock: v })}
              desc="Colored block highlight behind title" />
            {(state.textHighlightBlock ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.textHighlightBlockColor ?? '#8b5cf6'}
                  onChange={e => onChange({ textHighlightBlockColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          {/* Batch 18 text controls */}
          <Card>
            <SectionLabel>Typewriter Effect</SectionLabel>
            <Toggle label="Enable" value={state.titleTypewriter ?? false} onChange={v => onChange({ titleTypewriter: v })}
              desc="Typewriter cursor underline under title" />
            {(state.titleTypewriter ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.titleTypewriterColor ?? '#a78bfa'}
                  onChange={e => onChange({ titleTypewriterColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Text Outline Stroke</SectionLabel>
            <Toggle label="Enable" value={state.textOutlineStroke ?? false} onChange={v => onChange({ textOutlineStroke: v })}
              desc="Stroke outline applied to all text" />
            {(state.textOutlineStroke ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50 w-16 flex-shrink-0">Color</span>
                <input type="color" value={state.textOutlineStrokeColor ?? '#8b5cf6'}
                  onChange={e => onChange({ textOutlineStrokeColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer" />
              </div>
            )}
          </Card>

          {/* Batch 16 text controls */}
          <Card>
            <SectionLabel>Drop Cap</SectionLabel>
            <Toggle label="Enable" value={state.titleDropCap ?? false} onChange={v => onChange({ titleDropCap: v })}
              desc="Enlarge the first letter of the title" />
          </Card>

          {/* Batch 15 text controls */}
          <Card>
            <SectionLabel>Neon Text Glow</SectionLabel>
            <Toggle label="Enable" value={state.textNeonPulse ?? false} onChange={v => onChange({ textNeonPulse: v })}
              desc="Neon glow effect on title text" />
            {(state.textNeonPulse ?? false) && (
              <>
                <Slider label="Intensity" value={state.textNeonPulseIntensity ?? 60} min={10} max={120} unit="px"
                  onChange={v => onChange({ textNeonPulseIntensity: v })} />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/35">Glow Color</span>
                  <input type="color" value={state.textNeonPulseColor ?? '#8b5cf6'}
                    onChange={e => onChange({ textNeonPulseColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <div className="flex gap-1.5 ml-auto">
                    {['#8b5cf6','#ec4899','#00ffcc','#ff6600','#00aaff','#ffff00'].map(c => (
                      <button key={c} onClick={() => onChange({ textNeonPulseColor: c })}
                        className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                        style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </Card>

          <Card>
            <SectionLabel>Text Background Gradient</SectionLabel>
            <Toggle label="Enable" value={state.textBgGradient ?? false} onChange={v => onChange({ textBgGradient: v })}
              desc="Gradient fill behind title text block" />
            {(state.textBgGradient ?? false) && (
              <div className="flex items-center gap-2">
                <input type="color" value={state.textBgGradientColor1 ?? '#8b5cf6'}
                  onChange={e => onChange({ textBgGradientColor1: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                <span className="text-[10px] text-white/25">→</span>
                <input type="color" value={state.textBgGradientColor2 ?? '#ec4899'}
                  onChange={e => onChange({ textBgGradientColor2: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Title Drop Glow</SectionLabel>
            <Toggle label="Enable" value={state.titleBoxShadow ?? false} onChange={v => onChange({ titleBoxShadow: v })}
              desc="Drop glow filter under title element" />
            {(state.titleBoxShadow ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/35">Glow Color</span>
                <input type="color" value={state.titleBoxShadowColor ?? '#8b5cf6'}
                  onChange={e => onChange({ titleBoxShadowColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            )}
          </Card>

          {/* Batch 14 text controls */}
          <Card>
            <SectionLabel>Text Reveal Bar</SectionLabel>
            <Toggle label="Enable" value={state.textReveal ?? false} onChange={v => onChange({ textReveal: v })}
              desc="Glowing bar accent under title" />
            {(state.textReveal ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/35">Bar Color</span>
                <input type="color" value={state.textRevealColor ?? '#8b5cf6'}
                  onChange={e => onChange({ textRevealColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                <div className="flex gap-1.5 ml-auto">
                  {['#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444'].map(c => (
                    <button key={c} onClick={() => onChange({ textRevealColor: c })}
                      className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Title Skew</SectionLabel>
            <Slider label="Skew Angle" value={state.titleSkew ?? 0} min={-20} max={20} unit="°"
              onChange={v => onChange({ titleSkew: v })} />
            <p className="text-[8.5px] text-white/20">Horizontal italic-like slant on title</p>
          </Card>

          {/* Batch 12 text controls */}
          <Card>
            <SectionLabel>Title Secondary Font</SectionLabel>
            <Toggle label="Enable Mix Font" value={state.titleFont2Enabled ?? false}
              onChange={v => onChange({ titleFont2Enabled: v })} desc="Blend a second font into the title stack" />
            {(state.titleFont2Enabled ?? false) && (
              <div className="grid grid-cols-2 gap-1.5">
                {['Playfair Display','Space Grotesk','Roboto Mono',"'Oswald'","'Dancing Script'","'Cinzel'"].map(f => {
                  const label = f.replace(/['"]/g,'').split(' ').slice(0,2).join(' ');
                  return (
                    <QuickChip key={f} active={(state.titleFont2 ?? 'Inter') === f}
                      onClick={() => onChange({ titleFont2: f })}>{label}
                    </QuickChip>
                  );
                })}
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Subtitle Font</SectionLabel>
            <div className="grid grid-cols-2 gap-1.5">
              {['Inter','Playfair Display','Space Grotesk','Roboto Mono',"'Oswald'","'Dancing Script'"].map(f => {
                const label = f.replace(/['"]/g,'').split(' ').slice(0,2).join(' ');
                return (
                  <QuickChip key={f} active={(state.subtitleFont ?? 'Inter') === f}
                    onClick={() => onChange({ subtitleFont: f })}>{label}
                  </QuickChip>
                );
              })}
            </div>
          </Card>

          <Card>
            <SectionLabel>Text Highlight</SectionLabel>
            <Toggle label="Enable" value={state.textHighlight ?? false}
              onChange={v => onChange({ textHighlight: v })} desc="Colored highlight band behind title" />
            {(state.textHighlight ?? false) && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/35">Color</span>
                <input type="color" value={state.textHighlightColor ?? '#f59e0b'}
                  onChange={e => onChange({ textHighlightColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                <div className="flex gap-1.5 ml-auto">
                  {['#f59e0b','#ec4899','#10b981','#3b82f6','#8b5cf6','#ef4444'].map(c => (
                    <button key={c} onClick={() => onChange({ textHighlightColor: c })}
                      className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Text Colors</SectionLabel>
            {[
              { label: 'Title',    val: state.titleColor,    key: 'titleColor' },
              { label: 'Subtitle', val: state.subtitleColor.startsWith('rgba') ? '#999999' : state.subtitleColor, key: 'subtitleColor' },
              ...(state.bodyText ? [{ label: 'Body', val: state.bodyColor?.startsWith('rgba') ? '#888888' : (state.bodyColor ?? '#888888'), key: 'bodyColor' }] : []),
            ].map(({ label, val, key }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-[10px] text-white/35 w-14 flex-shrink-0">{label}</span>
                <input type="color" value={val}
                  onChange={e => onChange({ [key]: e.target.value } as Partial<EditorState>)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                <div className="flex gap-1.5 ml-auto">
                  {['#ffffff', '#000000', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map(c => (
                    <button key={c} onClick={() => onChange({ [key]: c } as Partial<EditorState>)}
                      className="w-6 h-6 rounded-full ring-1 ring-white/10 hover:scale-110 transition-all"
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </>
      )}

      <Card>
        <SectionLabel>Badge / Label</SectionLabel>
        <input type="text" placeholder="Badge text (e.g. NEW, BETA, PRO)…" value={state.badge ?? ''}
          onChange={e => onChange({ badge: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
        {(state.badge ?? '').length > 0 && (
          <>
            <div className="grid grid-cols-3 gap-1.5">
              <p className="col-span-3 text-[9.5px] text-white/25">Quick Labels</p>
              {['NEW', 'HOT', 'PRO', 'BETA', 'SALE', '🔥'].map(b => (
                <QuickChip key={b} active={state.badge === b} onClick={() => onChange({ badge: b })}>{b}</QuickChip>
              ))}
            </div>
            <div>
              <p className="text-[9.5px] text-white/25 mb-1.5">Position</p>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'tl', label: '↖ TL' }, { id: 'tc', label: '↑ TC' }, { id: 'tr', label: '↗ TR' },
                  { id: 'bl', label: '↙ BL' }, { id: 'bc', label: '↓ BC' }, { id: 'br', label: '↘ BR' },
                ].map(p => (
                  <QuickChip key={p.id} active={(state.badgePosition ?? 'tr') === p.id}
                    onClick={() => onChange({ badgePosition: p.id })}>{p.label}</QuickChip>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.badgeColor ?? '#8b5cf6'}
                onChange={e => onChange({ badgeColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#3b82f6'].map(c => (
                  <button key={c} onClick={() => onChange({ badgeColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Slider label="Font Size" value={state.badgeSize ?? 10} min={7} max={20} unit="px"
                onChange={v => onChange({ badgeSize: v })} />
              <Slider label="Radius" value={state.badgeRadius ?? 6} min={0} max={24} unit="px"
                onChange={v => onChange({ badgeRadius: v })} />
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Emoji Sticker</SectionLabel>
        <input type="text" placeholder="Paste an emoji (e.g. 🔥 🎉 ✨)…" value={state.emojiOverlay ?? ''}
          onChange={e => onChange({ emojiOverlay: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-2xl
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
        {(state.emojiOverlay ?? '').length > 0 && (
          <>
            <div className="grid grid-cols-6 gap-1.5">
              {['🔥', '✨', '🎉', '💎', '🚀', '⚡', '❤️', '🌊', '🎯', '💫', '🏆', '👑'].map(e => (
                <button key={e} onClick={() => onChange({ emojiOverlay: e })}
                  className="py-2 text-xl rounded-lg ring-1 ring-white/[0.06] hover:bg-white/[0.08] transition-all">
                  {e}
                </button>
              ))}
            </div>
            <Slider label="Size"    value={state.emojiSize ?? 48}      min={16} max={160} unit="px" onChange={v => onChange({ emojiSize: v })} />
            <Slider label="X Pos"   value={state.emojiPositionX ?? 50} min={0}  max={100} unit="%"  onChange={v => onChange({ emojiPositionX: v })} />
            <Slider label="Y Pos"   value={state.emojiPositionY ?? 50} min={0}  max={100} unit="%"  onChange={v => onChange({ emojiPositionY: v })} />
          </>
        )}
      </Card>

      {state.watermark && (
        <Card>
          <SectionLabel>Watermark Customization</SectionLabel>
          <input type="text" placeholder="Custom text (blank = SnapFrame logo)…" value={state.watermarkText ?? ''}
            onChange={e => onChange({ watermarkText: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
              placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
              focus:bg-white/[0.09] outline-none transition-all" />
          <Slider label="Opacity" value={state.watermarkOpacity ?? 70} min={10} max={100} unit="%"
            onChange={v => onChange({ watermarkOpacity: v })} />
          <Slider label="Size" value={state.watermarkSize ?? 11} min={8} max={24} unit="px"
            onChange={v => onChange({ watermarkSize: v })} />
          <div>
            <p className="text-[9.5px] text-white/25 mb-1.5">Position</p>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'tl', l: '↖ TL' }, { id: 'tc', l: '↑ TC' }, { id: 'tr', l: '↗ TR' },
                { id: 'bl', l: '↙ BL' }, { id: 'bc', l: '↓ BC' }, { id: 'br', l: '↘ BR' },
              ].map(p => (
                <QuickChip key={p.id} active={(state.watermarkPosition ?? 'br') === p.id}
                  onClick={() => onChange({ watermarkPosition: p.id })}>{p.l}</QuickChip>
              ))}
            </div>
          </div>
        </Card>
      )}

      <Card>
        <SectionLabel>Logo / Watermark</SectionLabel>
        <input ref={logoInputRef} type="file" accept="image/*,.svg" className="hidden" onChange={handleLogoUpload} />
        <div className="flex gap-2">
          <button onClick={() => logoInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs
              bg-white/[0.04] text-white/45 ring-1 ring-white/[0.06] hover:bg-white/[0.08] hover:text-white/70 transition-all">
            <ImagePlus className="w-3.5 h-3.5" />
            {state.logoImage ? 'Change Logo' : 'Upload Logo'}
          </button>
          {state.logoImage && (
            <button onClick={() => onChange({ logoImage: null })}
              className="px-3 rounded-xl bg-white/[0.04] text-red-400/50 hover:bg-red-500/10 hover:text-red-400 transition-all ring-1 ring-white/[0.06]">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {state.logoImage && (
          <>
            <Slider label="Size"     value={state.logoSize ?? 60}      min={16} max={200} unit="px" onChange={v => onChange({ logoSize: v })} />
            <Slider label="Opacity"  value={state.logoOpacity ?? 100}   min={10} max={100} unit="%" onChange={v => onChange({ logoOpacity: v })} />
            <Slider label="Padding"  value={state.logoPadding ?? 16}    min={4}  max={48}  unit="px" onChange={v => onChange({ logoPadding: v })} />
            <Slider label="Rotation" value={state.logoRotation ?? 0}    min={-180} max={180} unit="°" onChange={v => onChange({ logoRotation: v })} />
            <div>
              <p className="text-[9.5px] text-white/25 mb-2">Position</p>
              <div className="grid grid-cols-3 gap-1.5 max-w-[160px]">
                {[
                  { id: 'tl', label: '↖' }, { id: 'tc', label: '↑' }, { id: 'tr', label: '↗' },
                  { id: 'ml', label: '←' }, { id: 'mc', label: '⊕' }, { id: 'mr', label: '→' },
                  { id: 'bl', label: '↙' }, { id: 'bc', label: '↓' }, { id: 'br', label: '↘' },
                ].map(p => (
                  <button key={p.id} onClick={() => onChange({ logoPosition: p.id })}
                    className={`py-2 rounded-lg text-sm transition-all ring-1 ${
                      (state.logoPosition ?? 'br') === p.id
                        ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                        : 'bg-white/[0.03] text-white/40 ring-white/[0.06] hover:bg-white/[0.08]'
                    }`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Batch 16 — text logo */}
      <Card>
        <SectionLabel>Text Logo</SectionLabel>
        <input
          type="text"
          placeholder="Logo text (e.g. @handle, Brand)..."
          value={state.logoText ?? ''}
          onChange={e => onChange({ logoText: e.target.value })}
          className="w-full bg-white/[0.06] text-white/70 text-[11px] rounded-xl px-3 py-2 outline-none border border-white/[0.08] focus:border-brand-500/50 placeholder-white/20"
        />
        {(state.logoText ?? '').length > 0 && (
          <>
            <Slider label="Size" value={state.logoTextSize ?? 13} min={8} max={28} unit="px"
              onChange={v => onChange({ logoTextSize: v })} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.logoTextColor ?? '#ffffff'}
                onChange={e => onChange({ logoTextColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#ffffff','#000000','#8b5cf6','#ec4899','#f59e0b','#10b981'].map(c => (
                  <button key={c} onClick={() => onChange({ logoTextColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
        <p className="text-[8.5px] text-white/20">Position uses the same Logo Position setting above</p>
      </Card>
    </div>
  );

  /* ── Export tab ─────────────────────────────────── */
  const renderExportTab = () => {
    const fmt = state.exportFormat ?? 'png';
    const handleWebShare = async () => {
      if (!navigator.share) { alert('Web Share not supported in this browser.'); return; }
      try {
        await navigator.share({ title: 'SnapFrame Export', text: 'Created with SnapFrame' });
      } catch { /* user cancelled */ }
    };

    return (
      <div className="space-y-3">
        <Card>
          <SectionLabel>Format</SectionLabel>
          <div className="grid grid-cols-3 gap-1.5">
            {(['png', 'jpeg', 'webp'] as const).map(f => (
              <button key={f} onClick={() => onChange({ exportFormat: f })}
                className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ring-1 ${
                  fmt === f
                    ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                    : 'bg-white/[0.04] text-white/35 ring-white/[0.06] hover:bg-white/[0.08]'
                }`}>
                {f}
              </button>
            ))}
          </div>
          <div className="text-[9px] text-white/20">
            {fmt === 'png'  && 'Lossless · best for text & UI · supports transparency'}
            {fmt === 'jpeg' && 'Smaller file · no transparency · great for photos'}
            {fmt === 'webp' && 'Best compression · modern browsers only'}
          </div>
          {fmt === 'png' && (
            <Toggle label="Transparent Background" value={state.exportTransparent ?? false}
              onChange={v => onChange({ exportTransparent: v })}
              desc="Exports with no background (alpha channel)" />
          )}
          {(fmt === 'jpeg' || fmt === 'webp') && (
            <Slider label="Quality" value={state.exportQuality ?? 92} min={50} max={100} unit="%"
              onChange={v => onChange({ exportQuality: v })} />
          )}
        </Card>

        <Card>
          <SectionLabel>Resolution</SectionLabel>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <button key={s} onClick={() => onChange({ exportScale: s })}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all ring-1 ${
                  (state.exportScale ?? 2) === s
                    ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                    : 'bg-white/[0.04] text-white/35 ring-white/[0.06] hover:bg-white/[0.08]'
                }`}>
                {s}×
              </button>
            ))}
          </div>
          <p className="text-[9px] text-white/20">
            {(state.exportScale ?? 2)}× = ~{(state.exportScale ?? 2) * 1200} × {(state.exportScale ?? 2) * 800} px typical
          </p>
        </Card>

        <Card>
          <SectionLabel>Filename</SectionLabel>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="snapframe-export"
              value={state.exportFilename ?? ''}
              onChange={e => onChange({ exportFilename: e.target.value })}
              className="flex-1 px-3 py-2 rounded-xl bg-white/[0.06] text-white text-xs
                placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
                focus:bg-white/[0.09] outline-none transition-all"
            />
            <span className="text-[10px] text-white/25">.{fmt}</span>
          </div>
        </Card>

        <Card>
          <SectionLabel>Actions</SectionLabel>
          <button onClick={() => onExport(fmt)} disabled={isExporting}
            className="w-full py-3 rounded-2xl font-semibold text-white text-sm
              bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600
              transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30
              flex items-center justify-center gap-2 active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed">
            {isExporting ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Exporting…</>
            ) : (
              <><Download className="w-4 h-4" />Export {fmt.toUpperCase()}</>
            )}
          </button>
          <div className="grid grid-cols-2 gap-1.5">
            <button onClick={onCopy}
              className={`py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ring-1 ${
                copySuccess
                  ? 'bg-green-500/20 text-green-300 ring-green-500/30'
                  : 'bg-white/[0.05] text-white/45 ring-white/[0.08] hover:bg-white/[0.09] hover:text-white/70'
              }`}>
              {copySuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={handleWebShare}
              className="py-2.5 rounded-xl text-xs font-medium bg-white/[0.05] text-white/45 ring-1 ring-white/[0.08]
                hover:bg-white/[0.09] hover:text-white/70 transition-all flex items-center justify-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </Card>

        {state.watermark && (
          <button onClick={onUpgrade}
            className="w-full py-2.5 rounded-2xl text-sm font-semibold
              bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-300
              hover:from-amber-500/25 hover:to-orange-500/25 transition-all
              flex items-center justify-center gap-2 ring-1 ring-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Remove Watermark — $9.99
          </button>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'style':     return renderStyleTab();
      case 'bg':        return renderBgTab();
      case 'layout':    return renderLayoutTab();
      case 'fx':        return renderFxTab();
      case 'adjust':    return renderAdjustTab();
      case 'transform': return renderTransformTab();
      case 'brand':     return renderBrandTab();
      case 'export':    return renderExportTab();
    }
  };

  const fmt = state.exportFormat ?? 'png';

  return (
    <div className="w-full lg:w-[24rem] xl:w-[26rem] shrink-0 flex flex-col sf-panel
      lg:border-l border-white/[0.06] lg:h-[calc(100vh-4.25rem)] lg:overflow-hidden">

      {/* ── Header ── */}
      <div className="shrink-0 px-5 pt-5 pb-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          {/* Logomark */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-pink-500 flex items-center justify-center shadow-lg shadow-brand-600/30 flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="7" width="24" height="16" rx="3" fill="white" opacity="0.92"/>
              <circle cx="11" cy="15" r="4" fill="none" stroke="rgba(100,50,200,0.9)" strokeWidth="2"/>
              <rect x="18" y="12" width="7" height="1.5" rx="0.75" fill="rgba(100,50,200,0.7)"/>
              <rect x="18" y="15.5" width="5" height="1.5" rx="0.75" fill="rgba(100,50,200,0.5)"/>
              <path d="M9 25h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-black text-[15px] text-white tracking-[-0.02em] leading-none">SnapFrame</span>
            <span className="text-[9px] text-white/25 tracking-[0.1em] uppercase leading-tight">Studio</span>
          </div>
          {state.isPro && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[8.5px] font-bold ring-1 ring-amber-500/25">
              PRO
            </span>
          )}
          <div className="flex-1" />
          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5 bg-white/[0.04] rounded-xl p-1">
            <button onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)"
              className="w-6 h-6 flex items-center justify-center rounded-lg text-white/35 hover:text-white/75 hover:bg-white/[0.07] transition-all disabled:opacity-20 disabled:pointer-events-none">
              <Undo2 className="w-3 h-3" />
            </button>
            <button onClick={onRedo} disabled={!canRedo} title="Redo"
              className="w-6 h-6 flex items-center justify-center rounded-lg text-white/35 hover:text-white/75 hover:bg-white/[0.07] transition-all disabled:opacity-20 disabled:pointer-events-none">
              <Redo2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="shrink-0 flex bg-[#04040c] border-b border-white/[0.05] overflow-x-auto no-scrollbar px-2 py-1.5 gap-1">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`relative flex-1 min-w-[3rem] flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all duration-150 ${
                isActive
                  ? 'bg-violet-600/15 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.15)]'
                  : 'text-white/22 hover:text-white/50 hover:bg-white/[0.04]'
              }`}>
              <Icon className={`w-[14px] h-[14px] ${isActive ? 'text-violet-400' : ''}`} />
              <span className={`text-[7.5px] font-bold uppercase tracking-[0.12em] leading-none ${isActive ? 'text-violet-300/90' : ''}`}>{label}</span>
              {isActive && (
                <div className="absolute bottom-0.5 left-3 right-3 h-[1.5px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-70" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 lg:overflow-y-auto overflow-x-hidden px-3 py-3.5 space-y-2.5">
        {renderTabContent()}
      </div>

      {/* ── Bottom action bar ── */}
      {activeTab !== 'export' && (
        <div className="shrink-0 border-t border-white/[0.05] px-3 pt-3 pb-3.5 space-y-2 bg-[#04040c]">
          {/* Primary export row */}
          <button onClick={() => onExport(fmt)} disabled={isExporting}
            className="w-full py-2.5 rounded-xl font-bold text-white text-[12.5px]
              bg-gradient-to-r from-violet-700 via-violet-600 to-fuchsia-600
              hover:from-violet-600 hover:via-violet-500 hover:to-fuchsia-500
              transition-all duration-200 shadow-[0_4px_20px_rgba(109,40,217,0.35)] hover:shadow-[0_4px_24px_rgba(109,40,217,0.5)]
              flex items-center justify-center gap-2 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed tracking-tight">
            {isExporting ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Exporting…</>
            ) : (
              <><Download className="w-4 h-4" />Export Image</>
            )}
          </button>
          {/* Secondary row */}
          <div className="flex gap-1.5">
            <button onClick={onCopy} title="Copy to clipboard"
              className={`flex-1 py-2 rounded-lg text-[10.5px] font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                copySuccess
                  ? 'bg-emerald-500/12 text-emerald-300 border-emerald-500/25'
                  : 'bg-white/[0.04] text-white/35 border-white/[0.07] hover:bg-white/[0.08] hover:text-white/60 hover:border-white/[0.12]'
              }`}>
              {copySuccess ? <><Check className="w-3.5 h-3.5" />Copied</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
            </button>
            <button onClick={() => setActiveTab('export')} title="Export settings"
              className="px-2.5 py-2 rounded-lg text-[11px] bg-white/[0.04] text-white/30
                border border-white/[0.07] hover:bg-white/[0.08] hover:text-white/55 transition-all">
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button onClick={onReset} title="Reset all settings"
              className="px-2.5 py-2 rounded-lg text-[11px] bg-white/[0.04] text-white/25
                border border-white/[0.07] hover:bg-white/[0.08] hover:text-white/50 transition-all">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button onClick={onRemoveImage} title="Remove image"
              className="px-2.5 py-2 rounded-lg text-[11px] bg-white/[0.04] text-white/22
                border border-white/[0.07] hover:bg-red-500/08 hover:text-red-400/60 hover:border-red-500/20 transition-all">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          {state.watermark && (
            <button onClick={onUpgrade}
              className="w-full py-2 rounded-xl text-[10.5px] font-semibold
                bg-amber-500/10 text-amber-300/80 hover:bg-amber-500/18 transition-all
                flex items-center justify-center gap-1.5 ring-1 ring-amber-500/20">
              <Sparkles className="w-3 h-3" /> Remove Watermark — $9.99
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ControlsPanel;
